import Link from "next/link";
import { services } from "@/data/services";
import { nav, site } from "@/lib/site";
import { Logo } from "./Logo";
import { Arrow } from "../ui/Arrow";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink relative overflow-hidden text-white">
      <div className="blueprint pointer-events-none absolute inset-0 text-white" />
      <div className="container-x relative pt-20 pb-10 md:pt-28">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-8 max-w-sm text-white/65">
              Custom design/build on {site.address.locality}, {site.address.regionName}. Drafting
              and design, project management, custom woodworking, renovations and additions.
            </p>
            <Link
              href="/contact"
              className="group font-display text-level mt-8 inline-flex items-center gap-3 text-2xl font-semibold tracking-tight"
            >
              <span className="link-draw">Discuss your project</span> <Arrow />
            </Link>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 md:col-span-7">
            <div>
              <h2 className="eyebrow mb-5 text-white/60">Explore</h2>
              <ul className="space-y-2.5 text-[0.95rem]">
                <li>
                  <Link className="link-draw hover:text-level" href="/">
                    Home
                  </Link>
                </li>
                {nav.map((n) => (
                  <li key={n.href}>
                    <Link className="link-draw hover:text-level" href={n.href}>
                      {n.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link className="link-draw hover:text-level" href="/contact">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="eyebrow mb-5 text-white/60">Services</h2>
              <ul className="space-y-2.5 text-[0.95rem]">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link className="link-draw hover:text-level" href={`/services/${s.slug}`}>
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <address className="not-italic">
              <h2 className="eyebrow mb-5 text-white/60">Contact</h2>
              <ul className="space-y-2.5 text-[0.95rem]">
                <li className="text-white/65">{site.contactPerson}</li>
                <li>
                  <a className="link-draw hover:text-level" href={`tel:${site.phone.e164}`}>
                    {site.phone.display}
                  </a>
                </li>
                <li>
                  <a className="link-draw hover:text-level break-all" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                </li>
                <li className="text-white/65">
                  {site.address.street}
                  <br />
                  {site.address.locality}, {site.address.region} {site.address.postalCode}
                </li>
              </ul>
            </address>
          </div>
        </div>

        <p
          aria-hidden
          className="font-display pointer-events-none mt-20 text-[clamp(3rem,13.2vw,13.5rem)] leading-[0.8] font-bold tracking-[-0.06em] whitespace-nowrap text-white/[0.06] select-none"
        >
          Square&nbsp;&amp;&nbsp;Level
        </p>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/12 pt-6 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link className="hover:text-white" href="/privacy-policy">
                Privacy policy
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/sitemap.xml" prefetch={false}>
                Sitemap
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
