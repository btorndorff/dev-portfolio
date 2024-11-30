import type { Photo } from "react-photo-album";

const photos = [
  {
    asset: "/images/photography/11.jpeg",
    width: 1280,
    height: 857,
    alt: "Second image description",
  },
  {
    asset: "/images/photography/1.jpeg",
    width: 856,
    height: 1280,
    alt: "First image description",
  },
  {
    asset: "/images/photography/2.jpeg",
    width: 1280,
    height: 845,
    alt: "Second image description",
  },
  {
    asset: "/images/photography/3.jpeg",
    width: 1280,
    height: 864,
    alt: "Third image description",
  },
  {
    asset: "/images/photography/4.jpeg",
    width: 1280,
    height: 1261,
    alt: "First image description",
  },
  {
    asset: "/images/photography/5.jpeg",
    width: 1280,
    height: 849,
    alt: "Second image description",
  },
  {
    asset: "/images/photography/6.jpeg",
    width: 1280,
    height: 848,
    alt: "Third image description",
  },
  {
    asset: "/images/photography/7.jpeg",
    width: 1280,
    height: 849,
    alt: "First image description",
  },
  {
    asset: "/images/photography/8.jpeg",
    width: 1000,
    height: 1280,
    alt: "Second image description",
  },
  {
    asset: "/images/photography/9.jpeg",
    width: 1280,
    height: 1261,
    alt: "Third image description",
  },
  {
    asset: "/images/photography/10.jpeg",
    width: 1280,
    height: 849,
    alt: "First image description",
  },
  
  {
    asset: "/images/photography/12.jpeg",
    width: 1280,
    height: 849,
    alt: "Third image description",
  },
  {
    asset: "/images/photography/13.jpeg",
    width: 1280,
    height: 849,
    alt: "Third image description",
  },
  {
    asset: "/images/photography/14.jpeg",
    width: 1280,
    height: 920,
    alt: "Third image description",
  },
].map(
  ({ asset, alt, width, height }) =>
    ({
      src: asset,
      alt,
      width,
      height,
    } as Photo)
);

export default photos;