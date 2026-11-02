"use client";

import Script from "next/script";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { contactSchema, serviceOptions, type FieldErrors } from "@/lib/contact-schema";
import { track } from "@/lib/analytics";
import { site } from "@/lib/site";
import { Arrow } from "../ui/Arrow";

const TURNSTILE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm({ defaultService }: { defaultService?: string }) {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const [startedAt, setStartedAt] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});

  useEffect(() => {
    // Timestamp must come from the browser after hydration (timing-based spam check).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStartedAt(Date.now());
  }, []);

  const id = (name: string) => `${uid}-${name}`;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      service: String(fd.get("service") ?? ""),
      message: String(fd.get("message") ?? ""),
      company: String(fd.get("company") ?? ""),
      startedAt,
      turnstileToken: String(fd.get("cf-turnstile-response") ?? "") || undefined,
    };

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const fe: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof FieldErrors;
        if (k && !fe[k]) fe[k] = issue.message;
      }
      setErrors(fe);
      setStatus("error");
      setError("Please check the highlighted fields.");
      requestAnimationFrame(() => {
        const first = Object.keys(fe)[0];
        (formRef.current?.querySelector(`[name="${first}"]`) as HTMLElement | null)?.focus();
      });
      return;
    }

    setErrors({});
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok: boolean; error?: string; fieldErrors?: FieldErrors };
      if (!res.ok || !data.ok) {
        setErrors(data.fieldErrors ?? {});
        setError(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        requestAnimationFrame(() => summaryRef.current?.focus());
        return;
      }
      setStatus("sent");
      track("generate_lead", { form: "contact", project_type: payload.service });
      formRef.current?.reset();
    } catch {
      setError(
        `We couldn't reach the server. Please email ${site.email} or call ${site.phone.display}.`,
      );
      setStatus("error");
      requestAnimationFrame(() => summaryRef.current?.focus());
    }
  }

  const field =
    "peer w-full border-0 border-b border-ink/25 bg-transparent px-0 pb-3 pt-7 text-[1.05rem] outline-none transition-colors placeholder:text-transparent focus:border-ink focus:ring-0 aria-[invalid=true]:border-red-700";
  const label =
    "pointer-events-none absolute left-0 top-7 origin-left text-graphite transition-all duration-300 ease-[var(--ease-out-expo)] peer-focus:top-0 peer-focus:scale-[0.8] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:scale-[0.8]";

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {status === "sent" ? (
          <motion.div
            key="sent"
            role="status"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="border-ink/15 bg-paper border p-10"
          >
            <span className="bg-level grid size-14 place-items-center rounded-full text-2xl">
              ✓
            </span>
            <h2 className="display-sm mt-8">Thank you — message received.</h2>
            <p className="text-graphite mt-4 max-w-md">
              {site.contactPerson} will be in touch. If your project is time-sensitive, call{" "}
              {site.phone.display}.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="group mt-8 inline-flex items-center gap-3 font-semibold"
            >
              <span className="link-draw">Send another message</span> <Arrow />
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            onSubmit={onSubmit}
            noValidate
            aria-describedby={error ? `${uid}-summary` : undefined}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid gap-x-8 gap-y-7 sm:grid-cols-2"
          >
            {error && (
              <div
                ref={summaryRef}
                id={`${uid}-summary`}
                tabIndex={-1}
                role="alert"
                className="border-l-2 border-red-700 bg-red-50 px-4 py-3 text-sm text-red-900 sm:col-span-2"
              >
                {error}
              </div>
            )}

            {(
              [
                ["name", "Your name", "text", "name", true],
                ["email", "Email address", "email", "email", true],
                ["phone", "Phone (optional)", "tel", "tel", false],
              ] as const
            ).map(([name, text, type, auto, req]) => (
              <div key={name} className={`relative ${name === "phone" ? "" : ""}`}>
                <input
                  id={id(name)}
                  name={name}
                  type={type}
                  autoComplete={auto}
                  required={req}
                  placeholder={text}
                  aria-invalid={errors[name] ? true : undefined}
                  aria-describedby={errors[name] ? id(`${name}-err`) : undefined}
                  inputMode={type === "tel" ? "tel" : undefined}
                  className={field}
                />
                <label htmlFor={id(name)} className={label}>
                  {text}
                  {req && (
                    <span aria-hidden className="text-level">
                      {" "}
                      *
                    </span>
                  )}
                </label>
                {errors[name] && (
                  <p id={id(`${name}-err`)} className="mt-2 text-sm text-red-800">
                    {errors[name]}
                  </p>
                )}
              </div>
            ))}

            <div className="relative">
              <label
                htmlFor={id("service")}
                className="text-graphite block origin-left scale-[0.8]"
              >
                Type of project
                <span aria-hidden className="text-level">
                  {" "}
                  *
                </span>
              </label>
              <select
                id={id("service")}
                name="service"
                required
                defaultValue={defaultService ?? ""}
                aria-invalid={errors.service ? true : undefined}
                aria-describedby={errors.service ? id("service-err") : undefined}
                className="border-ink/25 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 16 16%22><path d=%22M3 6l5 5 5-5%22 fill=%22none%22 stroke=%22%23121314%22 stroke-width=%221.5%22/></svg>')] focus:border-ink mt-1 w-full appearance-none border-0 border-b bg-transparent bg-[length:16px] bg-[right_center] bg-no-repeat px-0 pt-2 pb-3 text-[1.05rem] outline-none focus:ring-0 aria-[invalid=true]:border-red-700"
              >
                <option value="" disabled>
                  Choose one…
                </option>
                {serviceOptions.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
              {errors.service && (
                <p id={id("service-err")} className="mt-2 text-sm text-red-800">
                  {errors.service}
                </p>
              )}
            </div>

            <div className="relative sm:col-span-2">
              <textarea
                id={id("message")}
                name="message"
                required
                rows={5}
                placeholder="Tell us about your project"
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={errors.message ? id("message-err") : id("message-hint")}
                className={`${field} resize-y`}
              />
              <label htmlFor={id("message")} className={label}>
                Tell us about your project
                <span aria-hidden className="text-level">
                  {" "}
                  *
                </span>
              </label>
              {errors.message ? (
                <p id={id("message-err")} className="mt-2 text-sm text-red-800">
                  {errors.message}
                </p>
              ) : (
                <p id={id("message-hint")} className="text-graphite mt-2 text-sm">
                  What you’d like to build or change, where it is, and roughly when.
                </p>
              )}
            </div>

            {/* Honeypot — hidden from people and assistive tech, tempting to bots. */}
            <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor={id("company")}>Company</label>
              <input
                id={id("company")}
                name="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {TURNSTILE_KEY && (
              <div className="sm:col-span-2">
                <Script
                  src="https://challenges.cloudflare.com/turnstile/v0/api.js"
                  strategy="lazyOnload"
                />
                <div className="cf-turnstile" data-sitekey={TURNSTILE_KEY} data-theme="light" />
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-6 sm:col-span-2">
              <p className="text-graphite max-w-sm text-sm">
                We only use your details to reply to your enquiry. See our{" "}
                <a href="/privacy-policy" className="hover:text-ink underline underline-offset-4">
                  privacy policy
                </a>
                .
              </p>
              <button
                type="submit"
                disabled={status === "sending"}
                className="group bg-ink text-paper hover:bg-level hover:text-ink inline-flex min-h-14 items-center gap-3 rounded-full px-8 font-semibold transition-colors disabled:cursor-wait disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Send enquiry"}
                <Arrow />
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
