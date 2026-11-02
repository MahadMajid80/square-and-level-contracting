import Link from "next/link";
import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="bg-ink relative isolate flex min-h-[100svh] items-center overflow-hidden pt-[var(--header-h)] text-white">
      <div aria-hidden className="blueprint absolute inset-0 -z-10 text-white" />
      <div className="container-x grid gap-12 md:grid-cols-12">
        <div className="md:col-span-8">
          <p className="eyebrow text-level">Error 404 — out of plumb</p>
          <h1 className="display-lg mt-6">
            This page isn’t <span className="serif-em text-level">square.</span>
          </h1>
          <p className="lede mt-8 max-w-xl text-white/70">
            The page you were looking for has moved or doesn’t exist. Old project links from our
            previous site should redirect automatically — if one didn’t, the portfolio has
            everything.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/portfolio">View the portfolio</ButtonLink>
            <ButtonLink href="/" variant="ghost-light">
              Back to home
            </ButtonLink>
          </div>
        </div>
        <nav aria-label="Services" className="md:col-span-4">
          <p className="eyebrow mb-4 text-white/50">Services</p>
          <ul className="space-y-2">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="link-draw hover:text-level">
                  {s.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="link-draw hover:text-level">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}
