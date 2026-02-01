import { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Photo } from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import PhotoCard from "@/components/PhotoCard";
import {
  generateScatterPositions,
  getStackCenter,
  type ScatterPosition,
} from "@/lib/scatterPositions";

interface ScatteredPhotosProps {
  photos: Photo[];
  isExiting?: boolean;
}

const CARD_WIDTH = 280;
const CARD_HEIGHT = 320;

export default function ScatteredPhotos({
  photos,
  isExiting = false,
}: ScatteredPhotosProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [zIndexOrder, setZIndexOrder] = useState<number[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Shuffle photos once on mount
  const shuffledPhotos = useMemo(
    () => [...photos].sort(() => Math.random() - 0.5),
    [photos],
  );

  // Initialize z-index order
  useEffect(() => {
    setZIndexOrder(shuffledPhotos.map((_, i) => i));
  }, [shuffledPhotos]);

  // Track viewport dimensions
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Generate scatter positions based on viewport
  const scatterPositions = useMemo<ScatterPosition[]>(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return [];

    return generateScatterPositions({
      viewportWidth: dimensions.width,
      viewportHeight: dimensions.height,
      cardCount: shuffledPhotos.length,
      cardWidth: CARD_WIDTH,
      cardHeight: CARD_HEIGHT,
    });
  }, [dimensions, shuffledPhotos.length]);

  // Stack center for entrance/exit animation
  const stackCenter = useMemo(() => {
    if (dimensions.width === 0 || dimensions.height === 0) {
      return { x: 0, y: 0 };
    }
    return getStackCenter(
      dimensions.width,
      dimensions.height,
      CARD_WIDTH,
      CARD_HEIGHT,
    );
  }, [dimensions]);

  // Handle drag start - bring card to top
  const handleDragStart = useCallback((index: number) => {
    setDraggedIndex(index);
    setZIndexOrder((prev) => {
      const maxZ = Math.max(...prev);
      const newOrder = [...prev];
      newOrder[index] = maxZ + 1;
      return newOrder;
    });
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedIndex(null);
  }, []);

  // Single click brings card to top
  const handleCardClick = useCallback(
    (index: number) => {
      if (draggedIndex === null) {
        setZIndexOrder((prev) => {
          const maxZ = Math.max(...prev);
          const newOrder = [...prev];
          newOrder[index] = maxZ + 1;
          return newOrder;
        });
      }
    },
    [draggedIndex],
  );

  // Double click opens lightbox
  const handleCardDoubleClick = useCallback(
    (index: number) => {
      if (draggedIndex === null) {
        setLightboxIndex(index);
      }
    },
    [draggedIndex],
  );

  if (scatterPositions.length === 0) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 overflow-hidden z-[5]">
        <AnimatePresence>
          {shuffledPhotos.map((photo, index) => {
            const position = scatterPositions[index];
            if (!position) return null;

            return (
              <motion.div
                key={photo.src}
                initial={{
                  x: stackCenter.x,
                  y: stackCenter.y,
                  rotate: 0,
                  opacity: 0,
                }}
                animate={
                  isExiting
                    ? {
                        x: stackCenter.x,
                        y: stackCenter.y,
                        rotate: 0,
                        opacity: 0,
                      }
                    : {
                        x: position.x,
                        y: position.y,
                        rotate: position.rotation,
                        opacity: 1,
                      }
                }
                exit={{
                  x: stackCenter.x,
                  y: stackCenter.y,
                  rotate: 0,
                  opacity: 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  delay: isExiting
                    ? (shuffledPhotos.length - index - 1) * 0.03
                    : index * 0.05,
                }}
                style={{
                  position: "absolute",
                  zIndex: zIndexOrder[index] ?? index,
                  width: CARD_WIDTH,
                }}
              >
                <PhotoCard
                  photo={photo}
                  index={index}
                  isDragging={draggedIndex === index}
                  onDragStart={() => handleDragStart(index)}
                  onDragEnd={handleDragEnd}
                  onClick={() => handleCardClick(index)}
                  onDoubleClick={() => handleCardDoubleClick(index)}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        slides={shuffledPhotos.map((photo) => ({
          src: photo.src,
          alt: photo.alt,
        }))}
        index={lightboxIndex}
        styles={{
          container: { backgroundColor: "rgba(0, 0, 0, .9)" },
        }}
      />
    </>
  );
}
