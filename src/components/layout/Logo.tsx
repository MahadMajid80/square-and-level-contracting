import Image from "next/image";
import Link from "next/link";
import { brand, media } from "@/lib/images";
import { site } from "@/lib/site";

/**
 * The original logo file (JPEG) shown on a white plate so it reads on both light and dark
 * backgrounds without altering the artwork. Replace with a vector original when supplied.
 */
export function Logo({
  tone = "light",
  onClick,
}: {
  tone?: "light" | "dark";
  onClick?: () => void;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="group flex items-center gap-3"
      aria-label={`${site.name} — home`}
    >
      <span className="relative block size-11 shrink-0 overflow-hidden rounded-[6px] bg-white shadow-[0_0_0_1px_rgba(0,0,0,.06)] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-[-4deg]">
        <Image
          src={media(brand.logo)}
          alt=""
          fill
          sizes="44px"
          className="object-contain p-0.5"
          priority
        />
      </span>
      <span
        className={`xs:block hidden leading-none ${tone === "light" ? "text-white" : "text-ink"}`}
      >
        <span className="font-display block text-[1.02rem] font-bold tracking-[-0.02em]">
          Square &amp; Level
        </span>
        <span className="eyebrow mt-1 block text-[0.6rem] opacity-70">Contracting</span>
      </span>
    </Link>
  );
}
