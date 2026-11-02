# Performance report

## Lab results (Lighthouse 12, local production build, 2026-11-02)

Measured against `next start` on the build machine with `NEXT_PUBLIC_ASSET_MODE=local`, using **stand-in images** of similar dimensions. The real photographs couldn't be downloaded in that environment.

These are lab numbers, not field data. Re-measure on the deployed site with real photos.

| Page | Device | Performance | Accessibility | Best practices | SEO* | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|---|
| `/` | Mobile (simulated 4G) | **91** | 100 | 100 | 69* | 1.0 s | 0 | 370 ms |
| `/portfolio/gregory-residence` | Mobile | **99** | 100 | 100 | 69* | 1.1 s | 0 | 120 ms |
| `/contact` | Mobile | **99** | 100 | 100 | 69* | 0.8 s | 0 | 120 ms |
| `/` | Desktop | **100** | — | — | — | 0.3 s | 0.001 | — |

\* SEO is 69 only because the "Page is blocked from indexing" audit fails. That's intentional: indexing is off on any build without `NEXT_PUBLIC_ALLOW_INDEXING=true`. No other SEO audits failed.

## What drives these numbers

- **LCP:** the hero image is `priority`. It is served as AVIF/WebP at a responsive size and is never lazy-loaded or hidden behind an animation. The entrance animation only scales the image.
- **SSR visibility:** reveal styles only apply after JS opts in (`data-reveal-ready`). The route transition skips the first load, so the server HTML is fully visible.
- **CLS 0:** every image sits in an aspect-ratio frame (`fill` + sized parent). Fonts are self-hosted with `swap` and preloaded.
- **JavaScript:** GSAP is dynamically imported only on wide, fine-pointer, motion-OK screens, so mobile never downloads it. Motion is used only in interactive client components.
  - The home page's 370 ms TBT is mostly React hydration plus Motion.
  - Reduce it further by lazy-mounting the testimonial carousel with `next/dynamic` if needed.
- **Third parties:** none load by default. GA4 loads only after consent, Google Maps only on click, and Turnstile only if configured.
- **Caching:** `/media/*` is served `immutable` for one year. The optimised image cache is 30 days.

## Real-photo considerations

- The original WebP and JPEG files are full resolution. `next/image` resizes and compresses them on request, and the first request for each size is slower until cached.
- On Vercel, image optimisation counts toward plan limits. About 560 source images × a few widths stays well within normal usage, but check your plan.

## To measure after deploy

- PageSpeed Insights (field + lab): <https://pagespeed.web.dev/>
- Search Console → Core Web Vitals, once field data accrues (around 28 days).

## Preloader (added 2026-11-02)

A branded preloader runs on the **first page of each visit** only. It is skipped on later pages, on reloads in the same browser session, and for visitors with reduced motion turned on.

Lighthouse always simulates a first visit, so it measures the preloader every time:

| Metric (`/`, mobile, stand-in images) | Before | With preloader |
|---|---|---|
| Performance score | 91 | 74 |
| LCP | 1.0 s | 1.1 s |
| CLS | 0 | 0 |
| Speed Index | — | 5.9 s |

The score drops because the page is covered for about 2–3 seconds, not because it loads slower.

To remove the preloader, delete `<Preloader />` and its boot `<script>` in `src/app/layout.tsx`.
