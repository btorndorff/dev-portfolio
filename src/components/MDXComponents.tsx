import type { MDXComponents } from "mdx/types";
import { NoiLogo } from "@/components/NoiLogo";

interface VideoProps {
  src: string;
  href?: string;
  className?: string;
}

export const Video = ({ src, href, className }: VideoProps) => {
  const video = (
    <video
      src={src}
      autoPlay
      loop
      muted
      className={className ?? "w-full h-auto"}
      playsInline
    />
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {video}
      </a>
    );
  }

  return video;
};

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

// MDX component overrides - minimal, let typography plugin handle most
export const mdxComponents: MDXComponents = {
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary hover:underline"
    >
      {children}
    </a>
  ),
};

// Custom components available in MDX files
export const customComponents = {
  NoiLogo,
  Video,
  LoomVideo,
  File,
};
