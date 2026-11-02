/** Arrow that slides out and back in on parent hover (parent needs the `group` class). */
export function Arrow({
  className = "",
  direction = "right",
}: {
  className?: string;
  direction?: "right" | "left" | "up-right";
}) {
  const rotate = direction === "left" ? "rotate-180" : direction === "up-right" ? "-rotate-45" : "";
  return (
    <span
      aria-hidden
      className={`relative inline-flex size-[1em] overflow-hidden ${rotate} ${className}`}
    >
      <svg
        viewBox="0 0 16 16"
        className="absolute inset-0 size-full transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-full"
      >
        <path d="M1 8h13M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <svg
        viewBox="0 0 16 16"
        className="absolute inset-0 size-full -translate-x-full transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-0"
      >
        <path d="M1 8h13M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </span>
  );
}
