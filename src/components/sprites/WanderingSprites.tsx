import { useRef } from "react";
import { useSpriteSim } from "./useSpriteSim";

// Overlay of little wandering pixel characters. Mount it inside a
// `position: relative` wrapper alongside the content it should roam over;
// the layer is pointer-events-none so everything underneath stays clickable.
const WanderingSprites = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useSpriteSim(containerRef);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 z-10 pointer-events-none"
    />
  );
};

export default WanderingSprites;
