# Asset manifest

All paths are relative to `https://squareandlevelcontracting.com/wp-content/uploads/`.

## How assets are served

| Mode | Setting | Source |
|---|---|---|
| Remote (default) | `NEXT_PUBLIC_ASSET_MODE=remote` | The live WordPress media library, optimised by `next/image` (AVIF/WebP, responsive sizes) |
| Local | `NEXT_PUBLIC_ASSET_MODE=local` | `/public/media/<same path>` |

**Before the WordPress site is switched off**, run:

```bash
npm run assets:download        # copies every referenced file into public/media (skips existing)
```

Then set `NEXT_PUBLIC_ASSET_MODE=local` and redeploy. The script writes `docs/asset-download-report.md` listing any failures.

The build environment's network blocked downloads from the domain, so this step could not be run here.

## Brand

| Asset | Path | Notes |
|---|---|---|
| Logo | `2026/03/logo.jpeg` | Only a JPEG exists on the site, shown on a white plate so it reads on dark and light backgrounds. **Request the original vector (SVG/AI/EPS).** It was not traced or redrawn. |
| Favicon / app icon | `2026/04/cropped-logo-1-270x270.webp` | Used as icon and apple-touch icon |
| BC Housing logo | `2026/03/bch-logo.png-e1773747057898.png` | **Not used.** The credential still needs verifying before any badge is shown. |
| Other badges | `Big-Logo-Bold-1-…png`, `Untitled-design-Photoroom-…png` (×2) | Not used. Purpose unknown, so these need identifying. |
| Service icons | `output-onlinepngtools*.png` | Not used. Replaced by typographic numbering. |
| Testimonial avatar | `no-dp-image-1.webp` | Not used. A generic silhouette, so no portraits were invented. |

## Colour

| Token | Value | Status |
|---|---|---|
| `--color-level` | `#FEC010` | From the brief. Verify against the logo artwork. |
| `--color-ink` | `#121314` | Supporting neutral |
| `--color-paper` | `#F4F2EC` | Supporting neutral |
| `--color-graphite` | `#565A5E` | Body-secondary text. Passes 4.5:1 on paper. |

## Photography

- **About image:** `2024/01/resized_image2.jpg`, used on Home and About.
- **Project galleries:** defined in `src/data/projects.ts`. Image order and project membership match the original site.

### De-duplication rule

WordPress held several re-uploads of the same frame, such as `…-11.webp` and `…-11-1.webp`. Where a plain-numbered file exists, the suffixed copy is dropped. Where only suffixed copies exist, the first is kept. The project's chosen cover is always kept.

**Dropped as likely duplicates** (verify visually; re-add to the gallery array if any differ):

- Early Projects: `-13-1`, `-25-1`
- Ostlund: `-11-1`, `-16-1`
- Fraser Residence: `-3-1`, `-4-1`, `-5-1`
- Square + Level Shop: `-2-1-1`, `-21-1`
- Reeve: `-11-1`
- Gregory: `-1-1-1`, `-2-1`, `-17-1`, `-18-1`, `-20-1`, `-21-1`, `-22-1`, `-23-1`, `-49-1`
- Mosely: `-1-1`
- Allan: `-1-1`
- Dos Santos: `-1-1`
- Owen: `-1-1`, `-16-1`
- Checkwitch: `-17-1`
- Mills: `-8-1`
- Woodworking 1: `-1-1-1`, `-19-1`
- Woodworking 3: `-1-3`, `-10-2`, `-18-3`, `-20-2`, `-22-2`
- Woodworking 4: `-16-2`

### Excluded as misattributed

- `2026/03/Fraser-Workshop-22.webp` appeared in the Reeve Residence gallery. It was excluded there; the Fraser Workshop gallery already includes its own `-22`.

### Kept but flagged

- Woodworking 2 includes `WOODWORKING-AND-LANDSCAPES-SECTION-1-1-1-1-1.webp` and `…-1-1-1-2.webp`. The filenames say Section 1, but on the original site they sit only in Section 2's gallery.
- Snee Cottage includes `17.webp` and `Adobe-Express-file-3.webp` (generic filenames).

### Not used

`IMG_1050.jpeg` and `IMG_1064.jpeg` appear only in the old footer gallery and belong to no project.

## Hero choice

The homepage hero uses the **Reeve Residence** cover. The six featured projects on the homepage were chosen from the projects with the most supporting content.

These were picked without seeing the photographs, because image downloads were blocked. Change `heroImage` and `featuredSlugs` in `src/data/projects.ts` to the strongest images.
