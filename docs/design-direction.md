# Design direction — "Architectural editorial × cinematic craftsmanship"

## Idea

The company name is the brief: *square* and *level*. The design uses drafting-room vocabulary throughout:

- fine 12-column rule lines behind sections (`.blueprint`)
- crop and registration marks on framed photographs (`.crop-marks`)
- a spirit-level scroll indicator in the header, whose yellow bubble travels the vial as you scroll

Yellow is used like a builder's chalk line: thin rules, the level bubble, primary CTAs and one serif-italic accent word per headline. It never fills a background.

## Typography

| Role | Face | Why |
|---|---|---|
| Display / headings | **Archivo** (variable, width + weight axes) | Engineered grotesk with a technical, slightly industrial character. The width axis gives expanded uppercase labels a drafting-stamp feel. |
| Body | **Manrope** (variable) | Open, highly legible, warm |
| Accent | **Instrument Serif** *italic* | One editorial word per headline ("*level.*", "*promise.*") adds craft and warmth without a second display face |

All three are self-hosted through `next/font/local` from `@fontsource`. There are no Google Fonts requests at runtime, and the body text uses `font-display: swap`.

Type sizes use a fluid `clamp()` scale (`--step--1` … `--step-6`).

Space Grotesk was considered and passed over: it is now so widespread on AI-generated and template sites that it would undercut the bespoke brief.

## Colour tokens (in `src/styles/globals.css`)

- `paper #F4F2EC` and `paper-2 #EBE8E0` for warm light sections
- `ink #121314` for dark sections
- `graphite #565A5E` for secondary text
- `level #FEC010` for the accent

The site is light-led, with dark sections alternating at the hero, selected work, philosophy, testimonials, CTA and footer.

## Layout

- 12-column grid with deliberately asymmetric spans (7/5, 5/7, 6/offset-7).
- Large section indexes ("01 — About the company") on a ruled line.
- Generous vertical rhythm: 6–9rem per section on desktop.

## Motion language

**Timing:** one expo-out ease (`cubic-bezier(.16,1,.3,1)`) for entrances and one quart in-out for wipes. Durations run 0.6–1.4s.

**Libraries:**

| Library | Used for | Notes |
|---|---|---|
| CSS + IntersectionObserver | Headline line-mask reveals, fade-ups, clip-path image reveals, drawn rules | Progressive enhancement: content is visible in the server HTML and only hidden once JS opts in |
| GSAP ScrollTrigger | Image parallax and the pinned horizontal selected-work row | Lazy-loaded only on wide, fine-pointer, motion-OK devices, so phones never download it |
| Motion for React | Mobile menu, portfolio filter pill and layout reflow, lightbox, testimonial carousel, route-change wipe | — |

**Signature interactions:**

- the cursor-following image in the services index
- the spirit-level scroll indicator
- the pinned horizontal "Selected work" row
- the process timeline line drawing itself as you scroll

**Reduced motion:** `prefers-reduced-motion` disables reveals, parallax, pinning, drag and the route transition.

## Mobile

- Hero type is sized so each line stays whole at 320px.
- Services show inline images instead of the cursor follower.
- Selected work becomes a native swipe/scroll-snap row instead of the pinned section.
- Project cards show their info overlay without hover.
- The mobile menu is a full-screen sheet with a focus trap and Esc to close.
- Every touch target is at least 44px.
