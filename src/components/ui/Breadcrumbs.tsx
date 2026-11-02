import Link from "next/link";
import { breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "./JsonLd";

export type Crumb = { name: string; path: string };

export function Breadcrumbs({
  items,
  tone = "light",
}: {
  items: Crumb[];
  tone?: "light" | "dark";
}) {
  const all = [{ name: "Home", path: "/" }, ...items];
  const color = tone === "light" ? "text-white/65" : "text-graphite";
  const current = tone === "light" ? "text-white" : "text-ink";
  return (
    <>
      <nav aria-label="Breadcrumb" className={`eyebrow ${color}`}>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className={current}>
                    {c.name}
                  </span>
                ) : (
                  <>
                    <Link href={c.path} className="link-draw hover:text-level">
                      {c.name}
                    </Link>
                    <span aria-hidden className="text-level">
                      /
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(all)} />
    </>
  );
}
