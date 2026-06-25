import {
  HandPointingIcon,
  LinkIcon,
  MagnifyingGlassPlusIcon,
} from "@phosphor-icons/react";

// Shared cursor-tooltip content so the same intent renders identically
// everywhere. One-off tooltips (email paper-plane, playful text) stay inline
// at their call site.

// Internal navigation (react-router links within the site).
export const INTERNAL_TOOLTIP = <HandPointingIcon size={16} weight="bold" />;

// Strip protocol and trailing slash so the URL reads cleanly in the tooltip,
// e.g. "https://www.replo.app/" -> "replo.app".
const displayUrl = (href: string) =>
  href.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");

// External links (off-site, target=_blank): link icon + the destination URL.
export const externalTooltip = (href: string) => (
  <span className="flex items-center gap-1.5">
    <LinkIcon size={16} weight="bold" />
    <span>{displayUrl(href)}</span>
  </span>
);

// Photo cards / grid: double-click (desktop) or tap (mobile) to open lightbox.
export const PHOTO_TOOLTIP = (
  <span className="flex items-center gap-1">
    <MagnifyingGlassPlusIcon size={16} weight="bold" />
    <span className="text-xs font-bold">double-click</span>
  </span>
);
