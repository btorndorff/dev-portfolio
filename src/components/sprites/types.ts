// Shared types for the wandering-sprites system. Deliberately free of React
// and DOM-rendering imports: the simulation (sim.ts) works purely on these
// data shapes, and any renderer that can read them can draw the sprites.

export type SpriteStateName = "spawn" | "idle" | "walk" | "flee";

export interface Sprite {
  /** Center position in CSS px, relative to the sim bounds. */
  x: number;
  y: number;
  state: SpriteStateName;
  /** Seconds spent in the current state. */
  stateTime: number;
  /** When timed states (spawn, idle) end, in seconds. */
  stateDuration: number;
  /** Where a walking/fleeing sprite is headed. */
  target: { x: number; y: number } | null;
  /** 1 = facing right (the sheet's native direction), -1 = flipped. */
  facing: 1 | -1;
  /** Cursor is near (but not close enough to flee) — show the surprised face. */
  alerted: boolean;
  /** Total animation clock; the renderer derives frame indices from this. */
  animTime: number;
  /** Random offset so sprites don't all blink in sync. */
  blinkPhase: number;
  /** Which color-variant sheet to draw with. */
  variant: number;
}

export interface SimState {
  sprites: Sprite[];
  bounds: { width: number; height: number };
  cursor: { x: number; y: number; active: boolean };
}

// --- Sprite sheet ---

export interface SheetRow {
  /** Row position in the sheet grid (0 = top). */
  index: number;
  /** How many frames this animation has, left to right. */
  frames: number;
  /** Playback speed in frames per second. */
  fps: number;
}

export interface SheetMeta {
  frameW: number;
  frameH: number;
  cols: number;
  /** On-screen size multiplier the renderer applies to frames. */
  scale: number;
  rows: {
    idle: SheetRow;
    blink: SheetRow;
    walk: SheetRow;
    surprised: SheetRow;
  };
}

export interface SpriteSheet {
  image: CanvasImageSource;
  meta: SheetMeta;
  /**
   * true = bilinear sampling (smooth/pre-rendered art),
   * false = nearest-neighbor (crisp pixel art).
   */
  smooth: boolean;
}

// --- Renderer boundary ---
// Anything that implements this interface can draw the sim. The Canvas 2D
// renderer is the only implementation today; a Three.js one (textured quads,
// UV offsets into the same sheet) would slot in here without touching sim.ts.
export interface SpriteRenderer {
  /** Create the canvas (the renderer owns it) and append it to `container`. */
  init(container: HTMLElement): void;
  /** Match the canvas to the container's CSS size and device pixel ratio. */
  resize(width: number, height: number, dpr: number): void;
  /** Draw one frame of the current sim state. */
  render(state: SimState): void;
  /** Remove the canvas and release everything init() created. */
  dispose(): void;
}
