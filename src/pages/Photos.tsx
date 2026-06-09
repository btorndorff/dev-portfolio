import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { MasonryPhotoAlbum } from "react-photo-album";
import "react-photo-album/masonry.css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import photos from "@/data/photos";
import { useCursorTooltip } from "@/context/CursorTooltipContext";
import { MagnifyingGlassPlusIcon } from "@phosphor-icons/react";
import { useIsDesktop } from "@/hooks/useMediaQuery";
import ScatteredPhotos from "@/components/ScatteredPhotos";
import { resizedImage } from "@/lib/image";

// Mobile grid is 1-2 columns inside the narrow Paper; 720px covers 2x DPR.
const GRID_RENDER_WIDTH = 720;
// Lightbox can fill the screen; cap at the source's native 1280 but still
// reformat to AVIF/WebP via format=auto.
const LIGHTBOX_RENDER_WIDTH = 1280;

const PhotosMobile = () => {
  const [index, setIndex] = useState(-1);
  const { setTooltip } = useCursorTooltip();

  const shuffledPhotos = useMemo(
    () =>
      [...photos]
        .sort(() => Math.random() - 0.5)
        .map((photo) => ({
          ...photo,
          src: resizedImage(photo.src, { width: GRID_RENDER_WIDTH }),
          // Preserve the original R2 URL so the lightbox can request a
          // higher-res variant than the grid thumbnail.
          originalSrc: photo.src,
        })),
    [],
  );

  return (
    <div className="flex flex-col gap-8">
      <span className="text-black">shot on film</span>

      {/*
        photo-grid opts out of the ink-bleed filter: mobile Safari blanks the
        whole filtered subtree when this tall image grid is under the SVG
        url() filter. See .ink-bleed-scope in src/index.css.
      */}
      <div className="photo-grid">
        <MasonryPhotoAlbum
          photos={shuffledPhotos}
          columns={(containerWidth) => {
            if (containerWidth < 480) return 1;
            return 2;
          }}
          onClick={({ index }) => setIndex(index)}
          spacing={12}
          componentsProps={{
            image: {
              loading: "lazy",
              decoding: "async",
              onMouseEnter: () =>
                setTooltip(<MagnifyingGlassPlusIcon size={16} weight="bold" />),
              onMouseLeave: () => setTooltip(null),
            },
          }}
        />
      </div>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={shuffledPhotos.map((photo) => ({
          src: resizedImage(photo.originalSrc, {
            width: LIGHTBOX_RENDER_WIDTH,
          }),
          alt: photo.alt,
        }))}
        index={index}
        styles={{
          container: { backgroundColor: "rgba(0, 0, 0, .9)" },
        }}
      />
    </div>
  );
};

const PhotosDesktop = () => {
  // Use portal to render outside Paper's transform context
  // This ensures position:fixed works relative to viewport, not transformed parent
  return createPortal(<ScatteredPhotos photos={photos} />, document.body);
};

export default function Photos() {
  const isDesktop = useIsDesktop();

  if (!isDesktop) {
    return <PhotosMobile />;
  }

  return <PhotosDesktop />;
}
