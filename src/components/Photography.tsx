import React, { useState } from "react";
import { MasonryPhotoAlbum } from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "react-photo-album/masonry.css";

import photos from "./photos.ts";

export default function Photography() {
  const [index, setIndex] = useState(-1);

  return (
    <div
      className="w-4/5 md:w-3/4 transition-opacity duration-500 ease-in-out overflow-y-auto hide-scrollbar"
      style={{
        animation: "fadeIn 0.5s forwards",
      }}
    >
      <div className="flex flex-col">
        <MasonryPhotoAlbum
          photos={photos}
          columns={(containerWidth) => {
            if (containerWidth < 768) return 1;
            return 2;
          }}
          onClick={({ index }) => setIndex(index)}
        />

        <div className="my-3" />
      </div>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={photos.map((img) => ({ src: img.src, alt: img.alt }))}
        index={index}
      />
    </div>
  );
}
