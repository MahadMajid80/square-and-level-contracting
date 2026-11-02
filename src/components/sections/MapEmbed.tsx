"use client";

import { useState } from "react";
import { fullAddress, site } from "@/lib/site";
import { Arrow } from "../ui/Arrow";

/**
 * Click-to-load map. Google Maps is a heavy third-party embed that sets cookies, so it only
 * loads when the visitor asks for it. The address is always available as text and a link.
 */
export function MapEmbed() {
  const [load, setLoad] = useState(false);
  return (
    <div className="bg-ink relative aspect-[4/3] overflow-hidden text-white md:aspect-[21/8]">
      {load ? (
        <iframe
          title={`Map showing ${fullAddress}`}
          src={site.mapsEmbedUrl}
          className="absolute inset-0 size-full grayscale"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col justify-between p-8">
          <div aria-hidden className="blueprint absolute inset-0 text-white" />
          <div aria-hidden className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="absolute top-1/2 left-1/2 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
            <span className="absolute top-1/2 left-1/2 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15" />
            <span className="bg-level relative block size-4 rounded-full shadow-[0_0_0_8px_rgba(254,192,16,.18)]" />
          </div>
          <p className="eyebrow relative text-white/60">
            {site.address.locality}, {site.address.regionName}
          </p>
          <div className="relative flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setLoad(true)}
              className="group text-ink hover:bg-level inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold"
            >
              Load interactive map
            </button>
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-white/30 px-5 text-sm font-semibold hover:border-white"
            >
              Open in Google Maps <Arrow direction="up-right" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
