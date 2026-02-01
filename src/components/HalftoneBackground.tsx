import { HalftoneDots } from "@paper-design/shaders-react";

export default function HalftoneBackground() {
  return (
    <HalftoneDots
      contrast={0.38}
      originalColors={false}
      inverted={false}
      grid="hex"
      radius={1.2}
      size={0.32}
      scale={1}
      image="https://workers.paper.design/file-assets/01KG97JP6TNZCG55EKH9NAVX8H/01KG987SRK1GB0037X01GXQ3NK.jpg"
      grainSize={0.5}
      type="gooey"
      fit="cover"
      grainOverlay={0.28}
      grainMixer={0.24}
      colorFront="#2B2B2B"
      colorBack="#00000000"
      style={{
        backgroundColor: "#F2F1E8",
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
    />
  );
}
