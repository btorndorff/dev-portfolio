import WanderingSprites from "./WanderingSprites";

const SpritePlayground = () => {
  return (
    <div
      className="relative min-h-[65vh] overflow-hidden"
      aria-label="Wandering sprites playground"
    >
      <WanderingSprites />
    </div>
  );
};

export default SpritePlayground;
