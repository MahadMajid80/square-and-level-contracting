# Square and Level Contracting — website

A Next.js rebuild of [squareandlevelcontracting.com](https://squareandlevelcontracting.com), replacing the WordPress/Elementor "Constre" theme site. It is a custom design/build company on Salt Spring Island, BC.

**Stack:**

- Next.js 16 (App Router, Turbopack), React 19, TypeScript (strict)
- Tailwind CSS 4
- Motion for React and GSAP ScrollTrigger
- Zod and Nodemailer
- Self-hosted fonts: Archivo, Manrope, Instrument Serif

## Quick start

```bash
npm install
cp .env.example .env.local     # then fill in values (see below)
npm run dev                    # http://localhost:3000
```

| Script                                         | Purpose                                                               |
| ---------------------------------------------- | --------------------------------------------------------------------- |
| `npm run dev`                                  | Development server                                                    |
| `npm run build` / `npm start`                  | Production build / serve                                              |
| `npm run typecheck`                            | TypeScript, no emit                                                   |
| `npm run lint`                                 | ESLint                                                                |
| `npm run assets:download`                      | Copy every photo from the WordPress media library into `public/media` |
| `npm run check:links -- http://localhost:3000` | Crawl a running build for broken links and check legacy redirects     |

Requires Node 22.18+ (`assets:download` runs a TypeScript file natively).

## Project structure

```
src/
  app/                 routes: /, about, services(/[slug]), portfolio(/[slug]), testimonials,
                       contact, privacy-policy, api/contact, sitemap.ts, robots.ts, not-found
  components/
    layout/            Header (+ mobile menu), Footer, Logo, Analytics/consent
    sections/          Hero, PageHero, ServicesIndex, FeaturedWork, PortfolioGrid, ProjectGallery,
                       ProjectCard, ProcessTimeline, WhyChooseUs, TestimonialCarousel, ContactForm, …
    animations/        RevealRoot, SplitLines, Parallax (GSAP), Magnetic, LevelProgress
    ui/                ButtonLink, Media, Breadcrumbs, SectionHeading, JsonLd, Arrow
  data/                ← edit content here
    projects.ts        all 20 portfolio projects and their galleries
    services.ts        4 services
    testimonials.ts    8 testimonials (verbatim)
    content.ts         About text, principles, FAQ, process steps
    redirects.ts       legacy WordPress → new URL 301s
  lib/
    site.ts            ← business name, phone, email, address (single source of truth)
    images.ts          remote/local media switch
    seo.ts             metadata + JSON-LD builders
  styles/globals.css   design tokens, type scale, reveal system
docs/                  audit, inventory, asset manifest, SEO, performance, QA, review list
scripts/               asset download, link checker
```

**Editing content:** change the files in `src/data/`. Components never hardcode business details. The registry is plain typed data, so a CMS can replace it later by changing only these modules.

## Environment variables

See `.env.example` for the full list.

| Variable                                                          | Required     | Notes                                                                                 |
| ----------------------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                                            | yes          | `https://squareandlevelcontracting.com`                                               |
| `NEXT_PUBLIC_ALLOW_INDEXING`                                      | prod only    | `true` on production **only**. Anything else gives noindex plus robots `Disallow: /`. |
| `NEXT_PUBLIC_ASSET_MODE`                                          | —            | `remote` (default) or `local`                                                         |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS` | for the form | Any SMTP provider                                                                     |
| `CONTACT_FROM_EMAIL`                                              | for the form | A mailbox your SMTP account can send as                                               |
| `CONTACT_TO_EMAIL`                                                | for the form | Comma-separated recipients (default `squareandlevel@telus.net`)                       |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`          | optional     | Cloudflare Turnstile bot check                                                        |
| `NEXT_PUBLIC_GA_ID`                                               | optional     | GA4 ID. Loaded only after cookie consent.                                             |
| `NEXT_PUBLIC_GSC_VERIFICATION`                                    | optional     | Search Console HTML-tag token                                                         |

`NEXT_PUBLIC_*` values are baked in at build time, so redeploy after changing them.

## Contact form

`POST /api/contact` sends the enquiry via SMTP, with `Reply-To` set to the visitor so you can answer directly.

Protections:

- Zod validation, shared between client and server
- Same-origin check and a 20 KB body limit
- Honeypot field and a minimum fill time of 3 seconds
- Link-spam heuristic
- Optional Turnstile
- Per-IP rate limit (5 per 15 minutes)

The rate limit is in-memory, so on serverless it applies per instance. Add Upstash Redis if you need a global limit.

If SMTP isn't configured, the form shows the phone and email instead of failing silently.

**Setting up delivery:**

1. Create or choose a mailbox to send from, e.g. `website@squareandlevelcontracting.com` on the domain's mail host. If the domain has no mail, use a transactional provider: Postmark, Mailgun, SendGrid, Resend SMTP or Brevo.
2. Put its SMTP host, port and credentials in the environment variables.
3. Set `CONTACT_FROM_EMAIL` to that mailbox and `CONTACT_TO_EMAIL` to where enquiries should land.
4. Make sure the sending domain has SPF/DKIM records for the provider, or messages may go to spam.
5. Submit a test enquiry on the live site.

## Deployment

### Vercel (recommended)

1. Push this folder to a GitHub repository and import it in Vercel. The framework is detected automatically.
2. Add the environment variables in **Project → Settings → Environment Variables**. Set `NEXT_PUBLIC_ALLOW_INDEXING=true` for **Production** only.
3. Deploy and check the `*.vercel.app` URL. It will be noindex, as intended.
4. Before pointing the domain, run `npm run assets:download` locally, commit `public/media`, set `NEXT_PUBLIC_ASSET_MODE=local`, and redeploy. This removes the dependency on WordPress.
5. **Domain:** add `squareandlevelcontracting.com` and `www` in Vercel → Domains, then update DNS at the registrar as Vercel instructs. Choose one canonical host (apex is assumed) and redirect the other.

### Any Node host

`npm ci && npm run build && npm start` on Node 22+, behind HTTPS. The contact API needs a Node server.

A static export is not possible without moving the form to another handler.

## Post-launch checklist

- [ ] `npm run assets:download` done; `NEXT_PUBLIC_ASSET_MODE=local` live; no images load from `/wp-content/`
- [ ] `NEXT_PUBLIC_ALLOW_INDEXING=true` on production; `/robots.txt` shows the sitemap line
- [ ] Spot-check old URLs, e.g. `/em_portfolios/mills-cabin/` → 301 → `/portfolio/mills-cabin`
- [ ] Test enquiry received at `CONTACT_TO_EMAIL`
- [ ] Search Console: verify the property (DNS or HTML tag), submit `/sitemap.xml`, inspect the homepage and one old URL
- [ ] GA4: create the property, set `NEXT_PUBLIC_GA_ID`, mark `generate_lead` as a key event, and confirm `click_to_call` / `click_to_email` in DebugView
- [ ] Rich Results Test on `/`, a service page and a project page
- [ ] PageSpeed Insights on mobile for `/` with real photos
- [ ] Google Business Profile: website URL updated, NAP matches the footer
- [ ] Work through `docs/content-review-required.md`
- [ ] Keep the WordPress site and its media accessible until assets are downloaded, then retire it

## Docs

| File                              | Contents                                                                    |
| --------------------------------- | --------------------------------------------------------------------------- |
| `docs/source-website-audit.md`    | What was found on the old site, including template content that was removed |
| `docs/content-inventory.md`       | Old URL → new URL, titles, sources                                          |
| `docs/asset-manifest.md`          | Logo, colour, photography, de-duplication                                   |
| `docs/seo-migration-map.md`       | Redirect map and tests                                                      |
| `docs/seo-audit.md`               | Keyword map, on-page, technical, schema                                     |
| `docs/design-direction.md`        | Design system and motion language                                           |
| `docs/performance-report.md`      | Lighthouse results and method                                               |
| `docs/qa-checklist.md`            | What was tested and what remains                                            |
| `docs/content-review-required.md` | **Items the owner needs to confirm**                                        |
