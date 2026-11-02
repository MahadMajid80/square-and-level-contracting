# QA checklist

✅ = tested in the build environment (2026-11-02). ☐ = to do after deployment.

## Technical

- ✅ `tsc --noEmit` (strict, `noUncheckedIndexedAccess`) — 0 errors
- ✅ ESLint (`eslint-config-next` core-web-vitals + TypeScript) — 0 errors/warnings
- ✅ `next build` — 36 routes, all pages statically prerendered
- ✅ Internal link crawl (`scripts/check-links.mjs`) — 32 URLs, 0 broken
- ✅ Automated accessibility (axe-core 4, WCAG 2.0/2.1/2.2 A+AA rules) — 0 violations on `/`, `/about`, `/services`, `/services/project-management`, `/portfolio`, `/portfolio/mills-cabin`, `/testimonials`, `/contact`, `/privacy-policy` (one contrast issue found and fixed)
- ✅ Lighthouse — see `performance-report.md`
- ✅ No browser console errors on 7 key pages at desktop and mobile
- ☐ Rich Results Test / schema.org validator on deployed URLs (unreachable from the build environment)

## HTTP / SEO

- ✅ All pages 200. Unknown URL and unknown project slug return 404 with the custom page.
- ✅ `/em_portfolios/<slug>/` and `/em_portfolios/<slug>` return a single 301 to `/portfolio/<slug>`.
- ✅ `/contact/`, `/portfolio/` and other trailing-slash URLs return a single 301.
- ✅ `/home/<attachment>/` → `/portfolio`, `/wp-sitemap.xml` → `/sitemap.xml`.
- ✅ Exactly one H1 on each tested template.
- ✅ Canonical, title and description present and unique.
- ✅ robots.txt and meta robots block indexing when `NEXT_PUBLIC_ALLOW_INDEXING` ≠ `true`.
- ☐ On production with `ALLOW_INDEXING=true`: confirm robots.txt allows crawling and lists the sitemap.

## Functional

- ✅ Portfolio filter: "Woodworking and Landscapes" shows 4; announces the count to screen readers.
- ✅ Lightbox:
  - opens, and ArrowRight advances (1→2 of 26)
  - focus is trapped inside
  - Esc closes and returns focus to the trigger
- ✅ Contact form, client side: an empty submit flags 4 fields as `aria-invalid`, shows an alert summary and focuses the first invalid field.
- ✅ Contact API:
  - invalid payload → 422 with field messages
  - foreign `Origin` → 403
  - missing SMTP settings → 503 with phone/email fallback text
- ✅ Mobile menu: opens full-screen, `aria-expanded` toggles, Esc closes.
- ☐ Real email delivery (needs SMTP credentials). Submit a test enquiry after configuring.
- ☐ Turnstile (if enabled).
- ☐ GA4 events `generate_lead`, `click_to_call`, `click_to_email` appear in GA4 DebugView (needs a Measurement ID).

## Responsive (screenshots taken)

- ✅ No horizontal overflow at 320, 390, 768, 1024, 1440, 1920 px (7 pages checked at 390 and 1440).
- ✅ Hero headline lines stay intact at 320 px and 1920 px (a clipping bug was found and fixed).
- ✅ Footer wordmark no longer clipped. Map panel proportion fixed on desktop.
- ☐ Real-device check on iOS Safari and Android Chrome with real photos.
- ☐ Review hero and cover crops with the real photographs (`object-cover` framing).

## Accessibility (manual, to do)

- ☐ Full keyboard pass on a deployed URL (Tab order, visible focus, skip link)
- ☐ VoiceOver / NVDA pass on the menu, filter, lightbox and carousel
- ☐ Reduced motion: enable the OS setting and confirm no parallax, pinning or reveals
