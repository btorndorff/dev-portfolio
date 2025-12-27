import { useMemo, useState } from "react";
import { MasonryPhotoAlbum } from "react-photo-album";
import "react-photo-album/masonry.css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import photos from "@/data/photos";
import { useCursorTooltip } from "@/context/CursorTooltipContext";
import { MagnifyingGlassPlusIcon } from "@phosphor-icons/react";

const Photos = () => {
  const [index, setIndex] = useState(-1);
  const { setTooltip } = useCursorTooltip();

  const shuffledPhotos = useMemo(
    () => [...photos].sort(() => Math.random() - 0.5),
    [photos]
  );

  return (
    <main className="px-6 h-screen relative">
      <div className="h-full overflow-y-auto no-scrollbar pt-24 pb-16 space-y-8">
        <span>shot on film</span>

        <MasonryPhotoAlbum
          photos={shuffledPhotos}
          columns={(containerWidth) => {
            if (containerWidth < 480) return 1;
            return 2;
          }}
          onClick={({ index }) => setIndex(index)}
          spacing={8}
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
    </main>
  );
};

export default Photos;
