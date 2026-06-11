// Canvas 2D implementation of SpriteRenderer — the ONLY file that knows how
// sprites get onto the screen. The sim hands it positions/states; everything
// here is "which frame of the sheet, drawn where". To port to Three.js later,
// write a threeRenderer.ts with the same four methods (sprites as textured
// quads, frame selection as UV offsets) and swap it in useSpriteSim.ts.

import { BLINK_DURATION, BLINK_PERIOD } from "./config";
import type {
  SheetMeta,
  SheetRow,
  Sprite,
  SpriteRenderer,
  SpriteSheet,
} from "./types";

export function createCanvasRenderer(sheets: SpriteSheet[]): SpriteRenderer {
  let canvas: HTMLCanvasElement | null = null;
  let ctx: CanvasRenderingContext2D | null = null;

  return {
    init(container) {
      canvas = document.createElement("canvas");
      canvas.style.position = "absolute";
      canvas.style.inset = "0";
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      container.appendChild(canvas);
      ctx = canvas.getContext("2d");
    },

    resize(width, height, dpr) {
      if (!canvas || !ctx) return;
      // Backing store at device resolution, CSS size unchanged (it's 100%).
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      // Scale the context so all drawing happens in CSS px coordinates.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    },

    render(state) {
      if (!canvas || !ctx) return;
      // Clear in raw device pixels (identity transform), then restore the
      // dpr transform for drawing.
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.restore();

      for (const sprite of state.sprites) {
        drawSprite(ctx, sprite, sheets[sprite.variant % sheets.length]);
      }
    },

    dispose() {
      canvas?.remove();
      canvas = null;
      ctx = null;
    },
  };
}

function drawSprite(
  ctx: CanvasRenderingContext2D,
  sprite: Sprite,
  sheet: SpriteSheet,
) {
  const { meta } = sheet;
  const row = rowFor(sprite, meta);
  const frame = Math.floor(sprite.animTime * row.fps) % row.frames;
  const drawW = meta.frameW * meta.scale;
  const drawH = meta.frameH * meta.scale;

  ctx.save();
  // Nearest-neighbor keeps pixel art crisp; smooth art wants bilinear.
  ctx.imageSmoothingEnabled = sheet.smooth;
  // Round to whole CSS px so the pixel art never lands on a blurry half-pixel.
  ctx.translate(Math.round(sprite.x), Math.round(sprite.y));

  // Spawn pop-in: grow from nothing over the spawn state's duration.
  if (sprite.state === "spawn") {
    const progress = Math.min(1, sprite.stateTime / sprite.stateDuration);
    ctx.scale(progress, progress);
  }

  // The sheet faces right; flip horizontally to face left.
  ctx.scale(sprite.facing, 1);

  ctx.drawImage(
    sheet.image,
    frame * meta.frameW,
    row.index * meta.frameH,
    meta.frameW,
    meta.frameH,
    -drawW / 2,
    -drawH / 2,
    drawW,
    drawH,
  );
  ctx.restore();
}

// Which animation row to play. This mapping is renderer-side on purpose: the
// sim only tracks behavior (state + alerted + a clock), never frames.
function rowFor(sprite: Sprite, meta: SheetMeta): SheetRow {
  if (sprite.state === "flee" || sprite.alerted) return meta.rows.surprised;
  if (sprite.state === "walk") return meta.rows.walk;
  // Idle (and spawn): close the eyes for a beat every few seconds. Each
  // sprite's random blinkPhase keeps the group from blinking in unison.
  const blinkClock = (sprite.animTime + sprite.blinkPhase) % BLINK_PERIOD;
  if (blinkClock < BLINK_DURATION) return meta.rows.blink;
  return meta.rows.idle;
}
