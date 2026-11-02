# SEO migration map — WordPress → Next.js

## Implementation

- Redirects live in `src/data/redirects.ts` and are applied server-side by `next.config.ts`.
- Every redirect is a **single 301 hop**. Legacy URLs are matched both with and without the trailing slash.
- `skipTrailingSlashRedirect` is enabled so Next.js doesn't insert its own 308 first.
- Canonical form for all new URLs: **no trailing slash**. Any other `/<path>/` gets a 301 to `/<path>`.

## Map

| Original URL | Destination | Status | Verified locally |
|---|---|---|---|
| `/` | `/` | 200 | ✅ |
| `/contact/` | `/contact` | 301 | ✅ 301 → /contact |
| `/#about`, `/#services`, `/#portfolio`, `/#testimonials` | Fragments never reach the server. The homepage still has matching sections. | n/a | — |
| `/portfolio/` (linked from old footer) | `/portfolio` | 301 | ✅ |
| `/em_portfolios/fraser-workshop/` | `/portfolio/fraser-workshop` | 301 | ✅ (pattern) |
| `/em_portfolios/early-projects-1994-2001/` | `/portfolio/early-projects-1994-2001` | 301 | ✅ (pattern) |
| `/em_portfolios/simpson-residence/` | `/portfolio/simpson-residence` | 301 | ✅ (pattern) |
| `/em_portfolios/scarfo-residence/` | `/portfolio/scarfo-residence` | 301 | ✅ (pattern) |
| `/em_portfolios/ostlund-residence/` | `/portfolio/ostlund-residence` | 301 | ✅ (pattern) |
| `/em_portfolios/fraser-residence/` | `/portfolio/fraser-residence` | 301 | ✅ (pattern) |
| `/em_portfolios/square-level-shop/` | `/portfolio/square-level-shop` | 301 | ✅ (pattern) |
| `/em_portfolios/reeve-residence/` | `/portfolio/reeve-residence` | 301 | ✅ |
| `/em_portfolios/gregory-residence/` | `/portfolio/gregory-residence` | 301 | ✅ (pattern) |
| `/em_portfolios/mills-cabin/` | `/portfolio/mills-cabin` | 301 | ✅ |
| `/em_portfolios/allan-residence/` | `/portfolio/allan-residence` | 301 | ✅ (pattern) |
| `/em_portfolios/checkwitch-cabin/` | `/portfolio/checkwitch-cabin` | 301 | ✅ (pattern) |
| `/em_portfolios/mosely-residence/` | `/portfolio/mosely-residence` | 301 | ✅ (pattern) |
| `/em_portfolios/dos-santos-residence/` | `/portfolio/dos-santos-residence` | 301 | ✅ (pattern) |
| `/em_portfolios/owen-residence/` | `/portfolio/owen-residence` | 301 | ✅ (pattern) |
| `/em_portfolios/snee-cottage/` | `/portfolio/snee-cottage` | 301 | ✅ (pattern) |
| `/em_portfolios/woodworking-and-landscapes-section-1/` … `-4/` | `/portfolio/woodworking-and-landscapes-section-1` … `-4` | 301 | ✅ (section-4 tested) |
| `/em_portfolios/<anything else>/` | `/portfolio` | 301 | ✅ |
| `/em_portfolios/` | `/portfolio` | 301 | — |
| `/home/<attachment>/` (old footer gallery) | `/portfolio` | 301 | ✅ |
| `/wp-sitemap.xml`, `/sitemap_index.xml` | `/sitemap.xml` | 301 | ✅ |
| `/feed/` | `/` | 301 | — |

The original slugs are kept unchanged. Only the folder changes from `/em_portfolios/` to `/portfolio/`.

## Metadata carried over

Old titles were generic, so new titles and descriptions are written per page (see `seo-audit.md`). Project names and the business name are unchanged.

## After launch

1. In Google Search Console, submit `https://squareandlevelcontracting.com/sitemap.xml`.
2. Use URL Inspection on `/em_portfolios/mills-cabin/` to confirm the live 301.
3. Watch **Pages → Not found (404)** for two to four weeks and add any missing legacy URLs to `src/data/redirects.ts`.
4. Keep the redirects permanently.
