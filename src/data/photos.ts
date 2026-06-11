import type { Photo } from "react-photo-album";

const photos = [
  {
    asset: "https://assets.benorndorff.xyz/11.jpeg",
    width: 1280,
    height: 857,
    alt: "1 image",
  },
  {
    asset: "https://assets.benorndorff.xyz/1.jpeg",
    width: 856,
    height: 1280,
    alt: "2 image",
  },
  {
    asset: "https://assets.benorndorff.xyz/2.jpeg",
    width: 1280,
    height: 845,
    alt: "3 image",
  },
  {
    asset: "https://assets.benorndorff.xyz/3.jpeg",
    width: 1280,
    height: 864,
    alt: "4 image",
  },
  {
    asset: "https://assets.benorndorff.xyz/4.jpeg",
    width: 1280,
    height: 1261,
    alt: "5 image",
  },
  {
    asset: "https://assets.benorndorff.xyz/5.jpeg",
    width: 1280,
    height: 849,
    alt: "6 image",
  },
  {
    asset: "https://assets.benorndorff.xyz/6.jpeg",
    width: 1280,
    height: 848,
    alt: "7 image",
  },
  {
    asset: "https://assets.benorndorff.xyz/7.jpeg",
    width: 1280,
    height: 849,
    alt: "8 image",
  },
  {
    asset: "https://assets.benorndorff.xyz/8.jpeg",
    width: 1000,
    height: 1280,
    alt: "9 image",
  },
  {
    asset: "https://assets.benorndorff.xyz/9.jpeg",
    width: 1280,
    height: 1261,
    alt: "10 image",
  },
  {
    asset: "https://assets.benorndorff.xyz/10.jpeg",
    width: 1280,
    height: 849,
    alt: "11 image",
  },

  {
    asset: "https://assets.benorndorff.xyz/12.jpeg",
    width: 1280,
    height: 849,
    alt: "12 image",
  },
  {
    asset: "https://assets.benorndorff.xyz/13.jpeg",
    width: 1280,
    height: 849,
    alt: "13 image",
  },
  {
    asset: "https://assets.benorndorff.xyz/14.jpeg",
    width: 1280,
    height: 920,
    alt: "14 image",
  },
  {
    asset: "https://assets.benorndorff.xyz/15.jpeg",
    width: 1280,
    height: 856,
    alt: "15 image",
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
