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

const PhotosMobile = () => {
  const [index, setIndex] = useState(-1);
  const { setTooltip } = useCursorTooltip();

  const shuffledPhotos = useMemo(
    () => [...photos].sort(() => Math.random() - 0.5),
    [photos],
  );

  return (
    <div className="flex flex-col gap-8">
      <span className="text-black">shot on film</span>

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
            onMouseEnter: () =>
              setTooltip(<MagnifyingGlassPlusIcon size={16} weight="bold" />),
            onMouseLeave: () => setTooltip(null),
          },
        }}
      />

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={shuffledPhotos.map((photo) => ({
          src: photo.src,
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
