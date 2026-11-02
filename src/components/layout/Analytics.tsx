"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { CONSENT_KEY, GA_ID, track } from "@/lib/analytics";

type Consent = "granted" | "denied" | null;

function readConsent(): Consent {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

/**
 * GA4 loads only when a Measurement ID is configured AND the visitor accepts.
 * Also wires click-to-call / click-to-email events site-wide.
 */
export function Analytics() {
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Reading localStorage must happen after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConsent(readConsent());
    setReady(true);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      const href = a?.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) track("click_to_call", { link_url: href });
      else if (href.startsWith("mailto:")) track("click_to_email", { link_url: href });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!GA_ID) return null;

  const decide = (v: "granted" | "denied") => {
    try {
      localStorage.setItem(CONSENT_KEY, v);
    } catch {}
    setConsent(v);
  };

  return (
    <>
      {consent === "granted" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
      {ready && consent === null && (
        <div
          role="region"
          aria-label="Cookie preferences"
          className="bg-ink fixed inset-x-3 bottom-3 z-[70] mx-auto max-w-xl rounded-2xl p-5 text-sm text-white shadow-2xl sm:inset-x-6 sm:bottom-6"
        >
          <p className="text-white/80">
            We use analytics cookies to understand how visitors use this site. No advertising, no
            selling of data.
          </p>
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={() => decide("granted")}
              className="bg-level text-ink min-h-11 rounded-full px-5 font-semibold"
            >
              Accept analytics
            </button>
            <button
              type="button"
              onClick={() => decide("denied")}
              className="min-h-11 rounded-full border border-white/30 px-5 font-semibold"
            >
              Decline
            </button>
          </div>
        </div>
      )}
    </>
  );
}
