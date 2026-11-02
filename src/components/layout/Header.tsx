"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { nav, site } from "@/lib/site";
import { services } from "@/data/services";
import { LevelProgress } from "../animations/LevelProgress";
import { Logo } from "./Logo";
import { Arrow } from "../ui/Arrow";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        setScrolled(y > 40);
        setHidden(y > 480 && y > lastY.current + 4);
        if (y < lastY.current - 4 || y < 480) setHidden(false);
        lastY.current = y;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  // Close the menu whenever the route changes.
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }

  // Lock scroll, trap focus, close on Escape.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const toggle = toggleRef.current;
    const panel = panelRef.current;
    const focusables = () =>
      Array.from(panel?.querySelectorAll<HTMLElement>("a,button") ?? []).filter(
        (el) => !el.hasAttribute("disabled"),
      );
    requestAnimationFrame(() => focusables()[0]?.focus());
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab") {
        const els = [toggle, ...focusables()].filter(Boolean) as HTMLElement[];
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [open]);

  const solid = scrolled && !open;
  const tone = solid ? "dark" : "light";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,color,box-shadow] duration-500 ease-[var(--ease-out-expo)] ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${solid ? "on-light bg-paper/85 text-ink shadow-[0_1px_0_rgba(18,19,20,.08)] backdrop-blur-xl" : "text-white"}`}
      >
        <div className="container-x relative z-[60] flex h-[var(--header-h)] items-center justify-between gap-6">
          <Logo tone={tone} onClick={close} />

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className="group relative py-2 text-[0.92rem] font-medium tracking-tight"
                >
                  {item.label}
                  <span
                    className={`bg-level absolute -bottom-0.5 left-0 h-[2px] w-full origin-left transition-transform duration-500 ease-[var(--ease-out-expo)] ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-5">
            <LevelProgress />
            <Link
              href="/contact"
              className={`group hidden min-h-11 items-center gap-2.5 rounded-full px-5 text-[0.9rem] font-semibold transition-colors duration-300 sm:inline-flex ${
                solid
                  ? "bg-ink text-paper hover:bg-level hover:text-ink"
                  : "bg-level text-ink hover:bg-white"
              }`}
            >
              Start your project <Arrow />
            </Link>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="relative -mr-2 grid size-11 place-items-center lg:hidden"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span aria-hidden className="relative block h-3 w-6">
                <span
                  className={`absolute top-0 left-0 h-[1.5px] w-full bg-current transition-transform duration-500 ease-[var(--ease-out-expo)] ${open ? "translate-y-[5.5px] rotate-45" : ""}`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-[1.5px] bg-current transition-all duration-500 ease-[var(--ease-out-expo)] ${open ? "w-full -translate-y-[5px] -rotate-45" : "w-2/3"}`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Rendered outside <header>: the header's transform would otherwise trap this fixed panel inside it. */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="bg-ink fixed inset-0 z-40 flex flex-col text-white lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="blueprint pointer-events-none absolute inset-0 text-white" />
            <nav
              aria-label="Mobile"
              className="container-x relative flex flex-1 flex-col justify-center pt-[var(--header-h)]"
            >
              <ul className="space-y-1">
                {[{ href: "/", label: "Home" }, ...nav, { href: "/contact", label: "Contact" }].map(
                  (item, i) => (
                    <li key={item.href} className="overflow-hidden">
                      <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{
                          duration: 0.8,
                          delay: 0.18 + i * 0.06,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        <Link
                          href={item.href}
                          onClick={close}
                          aria-current={pathname === item.href ? "page" : undefined}
                          className="group font-display flex items-baseline gap-4 py-1.5 text-[clamp(2.2rem,9vw,3.6rem)] leading-none font-semibold tracking-[-0.04em]"
                        >
                          <span className="eyebrow text-level w-6">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="transition-transform duration-500 group-hover:translate-x-2">
                            {item.label}
                          </span>
                        </Link>
                      </motion.div>
                    </li>
                  ),
                )}
              </ul>
              <motion.div
                className="mt-10 grid gap-6 border-t border-white/15 pt-8 text-sm text-white/70 sm:grid-cols-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <div>
                  <p className="eyebrow mb-3 text-white/60">Services</p>
                  <ul className="space-y-1.5">
                    {services.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/services/${s.slug}`}
                          onClick={close}
                          className="hover:text-level"
                        >
                          {s.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-1.5">
                  <p className="eyebrow mb-3 text-white/60">Get in touch</p>
                  <a href={`tel:${site.phone.e164}`} className="hover:text-level block text-white">
                    {site.phone.display}
                  </a>
                  <a
                    href={`mailto:${site.email}`}
                    className="hover:text-level block break-all text-white"
                  >
                    {site.email}
                  </a>
                  <p>
                    {site.address.locality}, {site.address.region}
                  </p>
                </div>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
