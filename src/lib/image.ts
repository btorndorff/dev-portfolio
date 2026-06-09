/**
 * Cloudflare Image Resizing helper.
 *
 * assets.benorndorff.me is an R2 bucket fronted by Cloudflare with Image
 * Resizing enabled, so we can request resized/reformatted variants on the fly
 * via the /cdn-cgi/image/<options>/<source-path> endpoint. `format=auto` lets
 * Cloudflare negotiate AVIF/WebP per the browser's Accept header, which cuts a
 * full-res JPEG (~300-400KB) down to ~10-40KB at display sizes.
 *
 * Only assets served from the R2 host can be transformed; anything else is
 * returned unchanged.
 */
const RESIZE_HOST = "assets.benorndorff.me";

interface ResizeOptions {
  /** Target intrinsic width in CSS pixels. Multiply by DPR at the call site. */
  width: number;
  quality?: number;
  /** "auto" negotiates AVIF/WebP; defaults to that. */
  format?: "auto" | "webp" | "avif" | "jpeg";
  /** Cloudflare fit mode; "scale-down" never upscales past the source. */
  fit?: "scale-down" | "contain" | "cover";
}

export function resizedImage(
  src: string,
  { width, quality = 80, format = "auto", fit = "scale-down" }: ResizeOptions,
): string {
  let url: URL;
  try {
    url = new URL(src);
  } catch {
    return src;
  }

  if (url.hostname !== RESIZE_HOST) return src;
  // Already a transform URL — don't double-wrap.
  if (url.pathname.startsWith("/cdn-cgi/image/")) return src;

  const opts = `width=${width},quality=${quality},format=${format},fit=${fit}`;
  // Relative-source form: /cdn-cgi/image/<opts>/<path>
  return `${url.origin}/cdn-cgi/image/${opts}${url.pathname}`;
}
