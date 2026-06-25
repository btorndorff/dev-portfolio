import type { MDXComponents } from "mdx/types";
import { NoiLogo } from "@/components/NoiLogo";
import { useCursorTooltip } from "@/context/CursorTooltipContext";
import { externalTooltip } from "@/lib/tooltips";

interface VideoProps {
  src: string;
  className?: string;
}

export const Video = ({ src, className }: VideoProps) => (
  <video
    src={src}
    autoPlay
    loop
    muted
    className={className ?? "w-full h-auto"}
    playsInline
  />
);

interface LoomVideoProps {
  src: string;
  title?: string;
}

export const LoomVideo = ({ src, title }: LoomVideoProps) => (
  <div className="relative pt-[56.25%] rounded-lg overflow-hidden">
    <iframe
      className="absolute top-0 left-0 w-full h-full"
      src={src}
      title={title || "Video"}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  </div>
);

// Inline filename reference, e.g. <File>USER.md</File>. Reads as a named file,
// not code — mono with a faint chip, no backtick chrome.
export const File = ({ children }: { children: React.ReactNode }) => (
  <code className="not-prose font-mono text-[0.85em] text-default bg-black/[0.06] rounded px-1 py-0.5">
    {children}
  </code>
);

// Prose links are external (open in a new tab); show the standard external
// tooltip (link icon + URL) like every other off-site link on the site.
const ProseLink = ({
  href,
  children,
}: {
  href?: string;
  children?: React.ReactNode;
}) => {
  const { setTooltip } = useCursorTooltip();
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary hover:underline"
      onMouseEnter={() => href && setTooltip(externalTooltip(href))}
      onMouseLeave={() => setTooltip(null)}
    >
      {children}
    </a>
  );
};

// MDX component overrides - minimal, let typography plugin handle most
export const mdxComponents: MDXComponents = {
  a: ProseLink,
};

// Custom components available in MDX files
export const customComponents = {
  NoiLogo,
  Video,
  LoomVideo,
  File,
};
