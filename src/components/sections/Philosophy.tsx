import { principles } from "@/data/content";
import { SplitLines } from "../animations/SplitLines";

export function Philosophy() {
  return (
    <section
      aria-labelledby="philosophy-title"
      className="bg-ink relative overflow-hidden pt-8 pb-24 text-white md:pb-36"
    >
      <div className="container-x">
        <div className="border-t border-white/15 pt-16 md:pt-24">
          <div className="eyebrow mb-8 flex items-center gap-4 text-white/60">
            <span className="text-level">04</span>
            <span data-reveal-line className="h-px w-10 bg-white/25" />
            <span>Craftsmanship &amp; philosophy</span>
          </div>
          <SplitLines
            id="philosophy-title"
            className="display-lg max-w-[18ch]"
            lines={[
              "Our name is",
              <>
                our <span className="serif-em text-level">promise.</span>
              </>,
            ]}
          />
          <p className="lede mt-10 max-w-2xl text-white/70" data-reveal>
            In contracting, “square and level” are the foundations of quality. We don’t believe in
            “close enough.” We apply rigorous precision to every measurement and structural detail —
            so the work isn’t only good to look at, but sound for decades.
          </p>
        </div>

        <ol className="mt-20 grid gap-px overflow-hidden bg-white/12 md:grid-cols-3">
          {principles.map((p, i) => (
            <li
              key={p.word}
              className="group bg-ink hover:bg-ink-2 relative p-8 transition-colors duration-500 md:p-10"
              data-reveal
              style={{ ["--reveal-delay" as string]: i * 120 }}
            >
              <span className="eyebrow text-white/60">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-display mt-16 leading-none font-semibold tracking-[-0.04em] text-[length:var(--step-4)]">
                {p.word}
                <span className="text-level">.</span>
              </h3>
              <p className="mt-5 max-w-xs text-white/65">{p.text}</p>
              <span
                aria-hidden
                className="bg-level absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
