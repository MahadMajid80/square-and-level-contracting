import { whyChooseUs } from "@/data/content";
import { getProject } from "@/data/projects";
import { Media } from "../ui/Media";

/** Native <details> accordion: keyboard and screen-reader friendly with zero JS. */
export function WhyChooseUs({ index = "06" }: { index?: string }) {
  const img = getProject("gregory-residence")?.cover;
  return (
    <section aria-labelledby="why-title" className="on-light bg-paper-2 text-ink py-24 md:py-36">
      <div className="container-x grid gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="eyebrow text-graphite mb-6 flex items-center gap-4">
            <span className="text-ink">{index}</span>
            <span className="bg-ink/20 h-px w-10" />
            <span>Why Square &amp; Level</span>
          </div>
          <h2 id="why-title" className="display-md" data-reveal>
            No “close <span className="serif-em">enough.</span>”
          </h2>
          {img && (
            <div className="crop-marks mt-12 hidden md:block" data-reveal-clip>
              <Media
                src={img}
                alt="Gregory Residence by Square and Level Contracting"
                sizes="40vw"
                className="aspect-[4/3]"
              />
            </div>
          )}
        </div>
        <div className="md:col-span-6 md:col-start-7">
          {whyChooseUs.map((item, i) => (
            <details
              key={item.q}
              className="group border-ink/15 border-b first:border-t [&_summary::-webkit-details-marker]:hidden"
              open={i === 0}
              data-reveal
              style={{ ["--reveal-delay" as string]: i * 80 }}
            >
              <summary className="font-display flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-6 font-semibold tracking-tight text-[length:var(--step-1)]">
                <span className="flex gap-5">
                  <span className="eyebrow text-graphite mt-1.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.q}
                </span>
                <span
                  aria-hidden
                  className="border-ink/20 group-open:bg-ink group-open:text-paper relative grid size-9 shrink-0 place-items-center rounded-full border transition-colors"
                >
                  <span className="absolute h-px w-3 bg-current" />
                  <span className="absolute h-3 w-px bg-current transition-transform duration-300 group-open:scale-y-0" />
                </span>
              </summary>
              <p className="text-graphite max-w-xl pb-8 pl-12">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
