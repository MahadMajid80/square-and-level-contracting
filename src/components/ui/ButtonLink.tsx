import Link from "next/link";
import type { ReactNode } from "react";
import { Magnetic } from "../animations/Magnetic";
import { Arrow } from "./Arrow";

type Variant = "level" | "ink" | "ghost-light" | "ghost-dark";

const styles: Record<Variant, string> = {
  level: "bg-level text-ink hover:bg-white",
  ink: "bg-ink text-paper hover:bg-ink-3",
  "ghost-light":
    "border border-white/35 text-white hover:border-white hover:bg-white hover:text-ink",
  "ghost-dark": "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper",
};

export function ButtonLink({
  href,
  children,
  variant = "level",
  magnetic = true,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  magnetic?: boolean;
  className?: string;
}) {
  const el = (
    <Link
      href={href}
      className={`group inline-flex min-h-12 items-center gap-3 rounded-full px-6 py-3 text-[0.95rem] font-semibold tracking-tight transition-colors duration-300 ${styles[variant]} ${className}`}
    >
      <span>{children}</span>
      <Arrow className="text-[0.95em]" />
    </Link>
  );
  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}
