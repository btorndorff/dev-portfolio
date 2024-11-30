import { useMemo, useState } from "react";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import photos from "../data/photos";

const Photos = () => {
  const [index, setIndex] = useState(-1);

  const shuffledPhotos = useMemo(() => [...photos].sort(() => Math.random() - 0.5), [photos]);

  return (
    <main className="max-w-3xl mx-auto px-6 h-[calc(100vh-64px)] mt-16 relative">
      <div className="h-full overflow-y-auto no-scrollbar">
        <h1 className="text-5xl font-bold mb-20 dark:text-white pt-8">
          Film Photography
        </h1>
        
        <div className="mb-8">
          <PhotoAlbum
            photos={shuffledPhotos}
            layout="masonry"
            columns={(containerWidth) => {
              if (containerWidth < 480) return 1;
              return 2;
            }}
            onClick={({ index }) => setIndex(index)}
            componentsProps={{
              imageProps: { 
                className: "cursor-pointer rounded-lg transition-opacity hover:opacity-90" 
              },
            }}
            spacing={8}
          />
        </div>

        <Lightbox
          open={index >= 0}
          close={() => setIndex(-1)}
          slides={photos.map((photo) => ({ src: photo.src, alt: photo.alt }))}
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