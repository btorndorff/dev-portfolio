import { useState, useEffect } from "react";
import { Dialog } from "@base-ui-components/react/dialog";
import { resizedImage } from "@/lib/image";

// Full-res variant shown in the modal; 960 covers ~half-width at 2x DPR.
const MODAL_RENDER_WIDTH = 960;
// Matches PhotoCard's CARD_RENDER_WIDTH: this variant is already cached from the
// grid, so it paints instantly as a placeholder while the full-res loads.
const PLACEHOLDER_RENDER_WIDTH = 560;

interface PhotoModalProps {
  // The photo's original (full-res) source URL, or null when closed.
  src: string | null;
  alt?: string;
  onClose: () => void;
}

// A single-photo viewer. No carousel: the modal shows only the photo that was
// opened; the user closes it to pick another.
export default function PhotoModal({ src, alt, onClose }: PhotoModalProps) {
  // Track whether the full-res image has loaded so we can crossfade from the
  // cached placeholder instead of showing a blank box on open.
  const [fullLoaded, setFullLoaded] = useState(false);
  useEffect(() => {
    setFullLoaded(false);
  }, [src]);

  return (
    <Dialog.Root
      open={src !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Dialog.Portal>
        {/* Blurred scrim that fades in/out. A paper-toned tint over the blur
            mutes the scattered cards behind into an even wash instead of
            recognizable smears around odd-shaped photos. data-* styles are set
            by Base UI during the enter/exit transitions. */}
        <Dialog.Backdrop
          className="fixed inset-0 z-[100] bg-[#f2f1e8]/50 backdrop-blur-md transition-opacity duration-300 ease-out data-[starting-style]:opacity-0 data-[ending-style]:opacity-0"
        />
        <Dialog.Popup
          className="fixed inset-0 z-[101] flex items-center justify-center p-6 outline-none transition-all duration-300 ease-out data-[starting-style]:opacity-0 data-[starting-style]:scale-95 data-[ending-style]:opacity-0 data-[ending-style]:scale-95"
          // Clicking the empty area around the image closes the modal.
          onClick={onClose}
        >
          {src && (
            <div
              className="relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Cached placeholder (card-size, already loaded): paints instantly
                  and defines the box so there's no blank/lag on open. */}
              <img
                src={resizedImage(src, { width: PLACEHOLDER_RENDER_WIDTH })}
                alt={alt || "Photo"}
                // Fit within half-width AND 80vh; object-contain keeps aspect
                // ratio without padding the box for portrait/odd ratios.
                className="block max-w-[50vw] max-h-[80vh] w-auto h-auto object-contain"
                decoding="async"
              />
              {/* Full-res on top; crossfades in once decoded. */}
              <img
                src={resizedImage(src, { width: MODAL_RENDER_WIDTH })}
                alt=""
                aria-hidden
                className="absolute inset-0 w-full h-full object-contain transition-opacity duration-200"
                style={{ opacity: fullLoaded ? 1 : 0 }}
                decoding="async"
                onLoad={() => setFullLoaded(true)}
              />
            </div>
          )}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
