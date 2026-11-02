/**
 * Resolves a WordPress media path (relative to /wp-content/uploads/) to a URL.
 *
 * remote (default): served from the live WordPress media library and optimised by next/image.
 * local:            served from /public/media/<same path> after `npm run assets:download`.
 */
const WP_UPLOADS = "https://squareandlevelcontracting.com/wp-content/uploads/";

export const assetMode: "remote" | "local" =
  process.env.NEXT_PUBLIC_ASSET_MODE === "local" ? "local" : "remote";

export function media(path: string) {
  const clean = path.replace(/^\/+/, "");
  return assetMode === "local" ? `/media/${clean}` : `${WP_UPLOADS}${clean}`;
}

export const brand = {
  logo: "2026/03/logo.jpeg",
  favicon: "2026/04/cropped-logo-1-270x270.webp",
} as const;
