/**
 * Crawls a running site and reports broken internal links and legacy redirect results.
 *   npm run build && npm start   (in another terminal)
 *   npm run check:links -- http://localhost:3000
 */
const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const seen = new Set();
const queue = ["/"];
const broken = [];

while (queue.length) {
  const path = queue.shift();
  if (seen.has(path)) continue;
  seen.add(path);
  const res = await fetch(base + path, { redirect: "manual" });
  if (res.status >= 400) {
    broken.push(`${res.status} ${path}`);
    continue;
  }
  if (!(res.headers.get("content-type") ?? "").includes("text/html")) continue;
  const html = await res.text();
  for (const m of html.matchAll(/href="(\/[^"#?]*)/g)) {
    const href = m[1];
    if (href.startsWith("/_next") || href.startsWith("/media")) continue;
    if (!seen.has(href)) queue.push(href);
  }
}

const legacy = [
  "/em_portfolios/mills-cabin/",
  "/em_portfolios/reeve-residence",
  "/contact/",
  "/home/img_1064/",
  "/wp-sitemap.xml",
];
const redirects = [];
for (const path of legacy) {
  const res = await fetch(base + path, { redirect: "manual" });
  redirects.push(`${res.status} ${path} → ${res.headers.get("location") ?? "-"}`);
}

console.log(`Crawled ${seen.size} internal URLs.`);
console.log(broken.length ? `BROKEN:\n${broken.join("\n")}` : "No broken internal links.");
console.log(`Legacy URLs:\n${redirects.join("\n")}`);
if (broken.length) process.exitCode = 1;
