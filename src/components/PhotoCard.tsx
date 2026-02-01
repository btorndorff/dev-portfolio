import { motion } from "motion/react";
import { forwardRef, useCallback, useState } from "react";
import type { Photo } from "react-photo-album";
import { useCursorTooltip } from "@/context/CursorTooltipContext";
import { MagnifyingGlassPlusIcon } from "@phosphor-icons/react";

interface PhotoCardProps {
  photo: Photo;
  index: number;
  style?: React.CSSProperties;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  onClick?: () => void;
  onDoubleClick?: () => void;
  isDragging?: boolean;
}

const PhotoCard = forwardRef<HTMLDivElement, PhotoCardProps>(
  (
    {
      photo,
      style,
      onDragStart,
      onDragEnd,
      onClick,
      onDoubleClick,
      isDragging,
    },
    ref,
  ) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const { setTooltip } = useCursorTooltip();

    const handleMouseEnter = useCallback(() => {
      setTooltip(
        <div className="flex items-center gap-1">
          <MagnifyingGlassPlusIcon size={16} weight="bold" />
          <span className="text-xs font-bold">x2</span>
        </div>,
      );
    }, [setTooltip]);

    const handleMouseLeave = useCallback(() => {
      setTooltip(null);
    }, [setTooltip]);

    return (
      <motion.div
        ref={ref}
        className="absolute will-change-transform"
        style={{
          ...style,
          cursor: isDragging ? "grabbing" : "grab",
        }}
        drag
        dragElastic={0.1}
        dragMomentum={false}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        whileDrag={{ scale: 1.05 }}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="relative overflow-hidden rounded-sm"
          style={{
            boxShadow: isDragging
              ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
              : "0 10px 30px -5px rgba(0, 0, 0, 0.3)",
          }}
        >
          <img
            src={photo.src}
            alt={photo.alt || "Photo"}
            className="block w-full h-auto"
            style={{
              opacity: isLoaded ? 1 : 0,
              transition: "opacity 0.3s ease-in-out",
            }}
            onLoad={() => setIsLoaded(true)}
            draggable={false}
          />
          {!isLoaded && (
            <div
              className="absolute inset-0 bg-gray-200 animate-pulse"
              style={{
                aspectRatio: `${photo.width} / ${photo.height}`,
              }}
            />
          )}
        </div>
      </motion.div>
    );
  },
);

PhotoCard.displayName = "PhotoCard";

export default PhotoCard;
