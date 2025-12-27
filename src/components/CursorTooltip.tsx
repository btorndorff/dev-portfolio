import { useEffect, useState } from "react";
import { useCursorTooltip } from "../context/CursorTooltipContext";

const CursorTooltip = () => {
  const { tooltip } = useCursorTooltip();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <span
      className="hidden md:block fixed bg-primary text-white text-sm px-2 py-1 rounded-full pointer-events-none z-50 transition-opacity duration-300"
      style={{
        left: position.x + 12,
        top: position.y - 24,
        opacity: tooltip ? 1 : 0,
      }}
    >
      {tooltip}
    </span>
  );
};

export default CursorTooltip;
