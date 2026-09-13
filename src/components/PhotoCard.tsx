import { motion } from "motion/react";
import { forwardRef, useState } from "react";
import type { Photo } from "react-photo-album";
import { resizedImage } from "@/lib/image";

// Cards render at 280px (see CARD_WIDTH in ScatteredPhotos); 560px covers 2x DPR.
const CARD_RENDER_WIDTH = 560;

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

    return (
      <motion.div
        ref={ref}
        className="absolute will-change-transform"
        style={{
          ...style,
          cursor: isDragging
            ? "var(--cursor-grabbing)"
            : "var(--cursor-grab)",
        }}
        drag
        dragElastic={0.1}
        dragMomentum={false}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        whileDrag={{ scale: 1.05 }}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
      >
        <div
          className="relative overflow-hidden"
          style={{
            boxShadow: isDragging
              ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
              : "0 10px 30px -5px rgba(0, 0, 0, 0.3)",
          }}
        >
          <img
            src={resizedImage(photo.src, { width: CARD_RENDER_WIDTH })}
            alt={photo.alt || "Photo"}
            className="block w-full h-auto"
            style={{
              opacity: isLoaded ? 1 : 0,
              transition: "opacity 0.3s ease-in-out",
              cursor: "inherit",
            }}
            decoding="async"
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
