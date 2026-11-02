/**
 * Copies every photograph and brand file the site uses from the current WordPress media library
 * into /public/media, preserving paths. Run this BEFORE the WordPress site is switched off,
 * then set NEXT_PUBLIC_ASSET_MODE=local.
 *
 *   npm run assets:download
 *
 * Re-running skips files that already exist. A report is written to docs/asset-download-report.md.
 */
import { mkdir, stat, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { projects } from "../src/data/projects.ts";
import { aboutImage } from "../src/data/content.ts";
import { brand } from "../src/lib/images.ts";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public", "media");
const BASE = "https://squareandlevelcontracting.com/wp-content/uploads/";

const paths = [
  ...new Set([
    brand.logo,
    brand.favicon,
    aboutImage,
    ...projects.flatMap((p) => [p.cover, ...p.images]),
  ]),
];

const exists = async (f: string) => !!(await stat(f).catch(() => null));

const ok: string[] = [];
const skipped: string[] = [];
const failed: { path: string; reason: string }[] = [];

async function get(path: string) {
  const dest = join(OUT, path);
  if (await exists(dest)) return skipped.push(path);
  try {
    const res = await fetch(BASE + path);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await mkdir(dirname(dest), { recursive: true });
    await writeFile(dest, Buffer.from(await res.arrayBuffer()));
    ok.push(path);
  } catch (e) {
    failed.push({ path, reason: (e as Error).message });
  }
}

console.log(`Downloading ${paths.length} files to public/media …`);
const queue = [...paths];
await Promise.all(
  Array.from({ length: 6 }, async () => {
    while (queue.length) {
      await get(queue.shift()!);
      process.stdout.write(".");
    }
  }),
);

const report = `# Asset download report\n\nRun: ${new Date().toISOString()}\n\n- Downloaded: ${ok.length}\n- Already present: ${skipped.length}\n- Failed: ${failed.length}\n\n${
  failed.length
    ? `## Failed\n\n${failed.map((f) => `- \`${f.path}\` — ${f.reason}`).join("\n")}\n`
    : ""
}`;
await writeFile(join(ROOT, "docs", "asset-download-report.md"), report);
console.log(
  `\n${ok.length} downloaded, ${skipped.length} already present, ${failed.length} failed. See docs/asset-download-report.md`,
);
if (failed.length) process.exitCode = 1;
