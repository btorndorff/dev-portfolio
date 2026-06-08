import { cn } from "@/lib/utils";

interface PaperProps {
  children: React.ReactNode;
  className?: string;
}

export default function Paper({ children, className = "" }: PaperProps) {
  return (
    <div
      className={cn(
        "relative bg-white paper-texture w-[95%] sm:w-[85%] lg:w-[60%] max-w-3xl min-h-[92vh] flex flex-col shadow-lg p-6 pb-3",
        "after:absolute after:top-[calc(100%-1px)] after:left-0 after:right-0 after:h-screen after:bg-white",
        className,
      )}
    >
      {/*
        Ink-bleed filter: feTurbulence makes noise, feDisplacementMap warps the
        text edges by it so letterforms feather into the paper like wicking ink.
        scale is kept low so body text stays legible.
      */}
      <svg className="absolute h-0 w-0" aria-hidden="true">
        <filter id="ink-bleed">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="0.8"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
      <div className="ink-bleed-scope flex flex-1 flex-col">{children}</div>
    </div>
  );
}
