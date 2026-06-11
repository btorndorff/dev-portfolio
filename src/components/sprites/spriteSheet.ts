// Generates a placeholder sprite sheet at runtime: a little CRT-monitor
// character drawn with fillRect on a chunky pixel grid.
//
// SHEET CONTRACT (for swapping in real art later):
//   - One image, 4 columns x 4 rows of 40x37 px frames (160x148 total).
//   - Transparent background, character faces RIGHT.
//   - Rows: 0 = idle (2 frames), 1 = blink (2), 2 = walk (4), 3 = surprised (2).
//   To use a real PNG, load it with `new Image()` (await onload) and return
//   { image, meta: SHEET_META } instead of the generated canvas — nothing
//   else in the system changes.
//
// Debug tip: append the sheet to the page to eyeball the frames —
//   document.body.appendChild(createPlaceholderSheet().image as HTMLCanvasElement)

import { FRAME_W, FRAME_H, SCALE } from "./config";
import type { SheetMeta, SpriteSheet } from "./types";

export const SHEET_META: SheetMeta = {
  frameW: FRAME_W,
  frameH: FRAME_H,
  cols: 4,
  scale: SCALE,
  rows: {
    idle: { index: 0, frames: 2, fps: 4 },
    blink: { index: 1, frames: 2, fps: 8 },
    walk: { index: 2, frames: 4, fps: 10 },
    surprised: { index: 3, frames: 2, fps: 8 },
  },
};

interface Palette {
  body: string;
  screen: string;
  face: string;
}

// Matches the site's beige-paper / black-ink look.
export const PALETTES: Palette[] = [
  { body: "#1a1a1a", screen: "#f2f1e8", face: "#1a1a1a" },
  { body: "#4b5563", screen: "#f2f1e8", face: "#1a1a1a" },
  { body: "#1a1a1a", screen: "#dcd9c8", face: "#1a1a1a" },
];

interface Pose {
  /** Body shifts down 1px — the idle breathing bob. */
  bob?: boolean;
  eyes?: "open" | "closed" | "wide";
  mouth?: "flat" | "open";
  /** Which leg is lifted mid-step. */
  lift?: "left" | "right";
}

export function createPlaceholderSheet(palette: Palette): SpriteSheet {
  const meta = SHEET_META;
  const canvas = document.createElement("canvas");
  canvas.width = meta.frameW * meta.cols;
  canvas.height = meta.frameH * 4;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get 2d context for sprite sheet");

  const frame = (col: number, row: number, pose: Pose) =>
    drawCharacter(ctx, col * meta.frameW, row * meta.frameH, pose, palette);

  // Row 0: idle — gentle bob between two frames.
  frame(0, 0, {});
  frame(1, 0, { bob: true });
  // Row 1: blink — eyes shut (both frames closed; the renderer only visits
  // this row for a fraction of a second).
  frame(0, 1, { eyes: "closed" });
  frame(1, 1, { eyes: "closed", bob: true });
  // Row 2: walk — alternate lifted legs with a bob on the passing frames.
  frame(0, 2, { lift: "left" });
  frame(1, 2, { bob: true });
  frame(2, 2, { lift: "right" });
  frame(3, 2, { bob: true });
  // Row 3: surprised — wide eyes, open mouth, trembling bob.
  frame(0, 3, { eyes: "wide", mouth: "open" });
  frame(1, 3, { eyes: "wide", mouth: "open", bob: true });

  return { image: canvas, meta, smooth: false };
}

// --- Real character art ---
// The shipped sheet (public/images/spritesheet.webp) is an 8x9 grid of
// 192x208 cells of pre-rendered frames — more frames than we need, in an
// order that doesn't match our row contract. So we composite at load time:
// hand-picked cells are copied onto a normalized in-memory sheet that DOES
// match the contract, and nothing downstream knows the difference.

export const CHARACTER_SHEET_URL = "/images/spritesheet.webp";

const SOURCE_GRID = { cols: 8, rows: 9 };

// Which source cells feed each animation, as [row, col] in the source grid.
// Picked by eyeballing the sheet: row 0 is front-facing idle (cell 0,2 is a
// half-lid blink), row 1 is the right-facing walk cycle, row 5 has squinty
// "who goes there" faces that serve as the alert/flee reaction.
const CHARACTER_PICKS: Record<keyof SheetMeta["rows"], [number, number][]> = {
  idle: [
    [0, 0],
    [0, 1],
  ],
  blink: [
    [0, 2],
    [0, 2],
  ],
  walk: [
    [1, 0],
    [1, 1],
    [1, 2],
    [1, 3],
    [1, 4],
    [1, 5],
    [1, 6],
    [1, 7],
  ],
  surprised: [
    [5, 0],
    [5, 1],
  ],
};

// Normalized frames are composited at 2x their on-screen size (scale: 0.5)
// so retina displays — where the canvas backing store is 2x CSS size — get a
// 1:1 pixel-perfect draw instead of upscaling a small frame.
const CHAR_FRAME_W = 160;
const CHAR_FRAME_H = 148;
const CHAR_SCALE = 0.5;

export async function loadCharacterSheet(): Promise<SpriteSheet> {
  const img = new Image();
  img.src = CHARACTER_SHEET_URL;
  await img.decode();

  // Cell size in source pixels — ratio-based, so re-exporting the source
  // image at a different resolution needs no code change.
  const cellW = img.naturalWidth / SOURCE_GRID.cols;
  const cellH = img.naturalHeight / SOURCE_GRID.rows;

  const meta: SheetMeta = {
    frameW: CHAR_FRAME_W,
    frameH: CHAR_FRAME_H,
    cols: CHARACTER_PICKS.walk.length,
    scale: CHAR_SCALE,
    rows: {
      idle: { index: 0, frames: CHARACTER_PICKS.idle.length, fps: 4 },
      blink: { index: 1, frames: CHARACTER_PICKS.blink.length, fps: 8 },
      walk: { index: 2, frames: CHARACTER_PICKS.walk.length, fps: 12 },
      surprised: { index: 3, frames: CHARACTER_PICKS.surprised.length, fps: 8 },
    },
  };

  const canvas = document.createElement("canvas");
  canvas.width = meta.frameW * meta.cols;
  canvas.height = meta.frameH * 4;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get 2d context for sprite sheet");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  // Fit each source cell into its destination frame, anchored bottom-center
  // so every pose keeps its feet on the same baseline.
  const fit = Math.min(meta.frameW / cellW, meta.frameH / cellH);
  const order: (keyof SheetMeta["rows"])[] = [
    "idle",
    "blink",
    "walk",
    "surprised",
  ];
  for (const name of order) {
    const rowIndex = meta.rows[name].index;
    CHARACTER_PICKS[name].forEach(([row, col], i) => {
      ctx.drawImage(
        img,
        col * cellW,
        row * cellH,
        cellW,
        cellH,
        i * meta.frameW + (meta.frameW - cellW * fit) / 2,
        rowIndex * meta.frameH + (meta.frameH - cellH * fit),
        cellW * fit,
        cellH * fit,
      );
    });
  }

  return { image: canvas, meta, smooth: true };
}

// Draws one 40x37 frame at (originX, originY). The character is built from
// 4px "virtual pixels": a monitor body (rows 0-5 of the grid) on two stubby
// legs (rows 6-8), with the face drawn on the screen.
function drawCharacter(
  ctx: CanvasRenderingContext2D,
  originX: number,
  originY: number,
  pose: Pose,
  palette: Palette,
) {
  const rect = (x: number, y: number, w: number, h: number, color: string) => {
    ctx.fillStyle = color;
    ctx.fillRect(originX + x, originY + y, w, h);
  };

  const bob = pose.bob ? 1 : 0;
  const eyes = pose.eyes ?? "open";
  const mouth = pose.mouth ?? "flat";

  // Legs first so the body overlaps where they meet. A lifted leg is drawn
  // shorter from the bottom, as if pulled up off the ground.
  const leftLift = pose.lift === "left" ? 4 : 0;
  const rightLift = pose.lift === "right" ? 4 : 0;
  rect(10, 24, 6, 12 - leftLift, palette.body);
  rect(24, 24, 6, 12 - rightLift, palette.body);

  // Monitor body and screen.
  rect(4, 0 + bob, 32, 24, palette.body);
  rect(8, 4 + bob, 24, 16, palette.screen);

  // Eyes.
  if (eyes === "open") {
    rect(12, 8 + bob, 4, 4, palette.face);
    rect(24, 8 + bob, 4, 4, palette.face);
  } else if (eyes === "closed") {
    rect(12, 10 + bob, 4, 2, palette.face);
    rect(24, 10 + bob, 4, 2, palette.face);
  } else {
    rect(11, 7 + bob, 6, 6, palette.face);
    rect(23, 7 + bob, 6, 6, palette.face);
  }

  // Mouth.
  if (mouth === "flat") {
    rect(16, 15 + bob, 8, 2, palette.face);
  } else {
    rect(17, 14 + bob, 6, 5, palette.face);
  }
}
