import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactSchema, type FieldErrors } from "@/lib/contact-schema";
import { site } from "@/lib/site";

export const runtime = "nodejs";

/* ── Rate limiting ───────────────────────────────────────────────────────
 * In-memory sliding window per IP: 5 submissions / 15 minutes. This is per server instance —
 * on serverless platforms it limits bursts within an instance only. For stronger guarantees,
 * swap in a shared store (e.g. Upstash Redis); Turnstile below covers most bot traffic. */
const WINDOW_MS = 15 * 60 * 1000;
const MAX_HITS = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t > WINDOW_MS)) hits.delete(k);
  }
  return recent.length > MAX_HITS;
}

function clientIp(req: Request) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

async function verifyTurnstile(token: string | undefined, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // Turnstile not configured
  if (!token) return false;
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({ secret, response: token, remoteip: ip }),
  });
  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}

const esc = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

function sameOrigin(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin) return true; // some privacy tools strip Origin; other checks still apply
  try {
    const host = new URL(origin).host;
    return host === req.headers.get("host") || host === new URL(site.url).host;
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  const ip = clientIp(req);

  if (!sameOrigin(req)) {
    return NextResponse.json({ ok: false, error: "Invalid request origin." }, { status: 403 });
  }
  if (rateLimited(ip)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Too many messages from this connection. Please try again later, or call us.",
      },
      { status: 429 },
    );
  }

  const len = Number(req.headers.get("content-length") ?? 0);
  if (len > 20_000) {
    return NextResponse.json({ ok: false, error: "Message is too large." }, { status: 413 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: FieldErrors = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof FieldErrors;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    // Honeypot tripped: pretend success so bots learn nothing.
    if (fieldErrors.company) return NextResponse.json({ ok: true });
    return NextResponse.json(
      { ok: false, error: "Please check the highlighted fields.", fieldErrors },
      { status: 422 },
    );
  }

  const data = parsed.data;

  // Timing trap: humans take more than ~3 seconds to fill in the form; tokens older than a day are stale.
  const elapsed = Date.now() - data.startedAt;
  if (elapsed < 3000 || elapsed > 24 * 60 * 60 * 1000) {
    return NextResponse.json({ ok: true });
  }

  // Cheap content heuristic for link spam.
  if ((data.message.match(/https?:\/\//gi) ?? []).length > 3) {
    return NextResponse.json(
      { ok: false, error: "Please remove some links from your message." },
      { status: 422 },
    );
  }

  if (!(await verifyTurnstile(data.turnstileToken, ip))) {
    return NextResponse.json(
      { ok: false, error: "Spam check failed. Please try again." },
      { status: 400 },
    );
  }

  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_SECURE,
    SMTP_USER,
    SMTP_PASS,
    CONTACT_FROM_EMAIL,
    CONTACT_TO_EMAIL,
  } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_FROM_EMAIL || !CONTACT_TO_EMAIL) {
    console.error("[contact] SMTP is not configured — see .env.example");
    return NextResponse.json(
      {
        ok: false,
        error: `Our form isn't accepting messages right now. Please email ${site.email} or call ${site.phone.display}.`,
      },
      { status: 503 },
    );
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 465),
    secure: (SMTP_SECURE ?? "true") === "true",
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const rows: [string, string][] = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone || "—"],
    ["Project type", data.service],
  ];
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${data.message}\n\n— Sent from the ${site.name} website`;
  const html = `<table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="color:#666">${esc(k)}</td><td><strong>${esc(v)}</strong></td></tr>`,
    )
    .join(
      "",
    )}</table><p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap">${esc(data.message)}</p><p style="font-family:Arial,sans-serif;font-size:12px;color:#888">Sent from the ${esc(site.name)} website</p>`;

  try {
    await transporter.sendMail({
      from: { name: `${site.name} website`, address: CONTACT_FROM_EMAIL },
      to: CONTACT_TO_EMAIL.split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      replyTo: { name: data.name, address: data.email },
      subject: `New project enquiry: ${data.service} — ${data.name}`
        .replace(/[\r\n]+/g, " ")
        .slice(0, 200),
      text,
      html,
    });
  } catch (err) {
    console.error("[contact] send failed", err);
    return NextResponse.json(
      {
        ok: false,
        error: `We couldn't send your message. Please email ${site.email} or call ${site.phone.display}.`,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

export function GET() {
  return NextResponse.json(
    { ok: false, error: "Method not allowed" },
    { status: 405, headers: { Allow: "POST" } },
  );
}
