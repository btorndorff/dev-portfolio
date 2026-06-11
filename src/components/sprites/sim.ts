// The behavior brain: a tiny state machine per sprite plus cursor reactions.
// This module is pure data-in, data-out — no canvas, no React, no DOM — so a
// different renderer (e.g. Three.js) can reuse it untouched.
//
// Each sprite cycles spawn -> idle -> walk -> idle -> ... forever. Two things
// interrupt that loop, both driven by cursor distance:
//   - inside ALERT_RADIUS: the sprite looks surprised and watches the cursor
//   - inside FLEE_RADIUS:  it runs directly away until the cursor backs off

import {
  ALERT_RADIUS,
  ARRIVE_DISTANCE,
  BLINK_PERIOD,
  FLEE_DISTANCE,
  FLEE_EXIT_RADIUS,
  FLEE_RADIUS,
  FLEE_SPEED,
  FRAME_H,
  FRAME_W,
  IDLE_MAX,
  IDLE_MIN,
  SCALE,
  SPAWN_DURATION,
  SPAWN_STAGGER,
  SPRITE_COUNT,
  VARIANT_COUNT,
  WALK_SPEED,
} from "./config";
import type { SimState, Sprite } from "./types";

type Bounds = { width: number; height: number };

export function createSim(bounds: Bounds): SimState {
  return {
    sprites: Array.from({ length: SPRITE_COUNT }, (_, i) =>
      createSprite(bounds, i),
    ),
    bounds: { ...bounds },
    cursor: { x: 0, y: 0, active: false },
  };
}

export function setCursor(
  sim: SimState,
  x: number,
  y: number,
  active: boolean,
) {
  sim.cursor.x = x;
  sim.cursor.y = y;
  sim.cursor.active = active;
}

export function setBounds(sim: SimState, width: number, height: number) {
  sim.bounds.width = width;
  sim.bounds.height = height;
  // Pull anything that ended up outside the new bounds back in.
  for (const sprite of sim.sprites) {
    const clamped = clampToBounds(sprite.x, sprite.y, sim.bounds);
    sprite.x = clamped.x;
    sprite.y = clamped.y;
    if (sprite.target) {
      sprite.target = clampToBounds(sprite.target.x, sprite.target.y, sim.bounds);
    }
  }
}

/** Advance every sprite by one fixed timestep of `dt` seconds. */
export function stepSim(sim: SimState, dt: number) {
  for (const sprite of sim.sprites) {
    stepSprite(sprite, sim, dt);
  }
}

function stepSprite(sprite: Sprite, sim: SimState, dt: number) {
  sprite.stateTime += dt;
  sprite.animTime += dt;

  const cursorDist = sim.cursor.active
    ? Math.hypot(sprite.x - sim.cursor.x, sprite.y - sim.cursor.y)
    : Infinity;

  sprite.alerted = cursorDist < ALERT_RADIUS;

  // Cursor got too close: drop whatever we were doing and run.
  if (sprite.state !== "spawn" && sprite.state !== "flee") {
    if (cursorDist < FLEE_RADIUS) {
      enterState(sprite, "flee");
    } else if (sprite.alerted && sprite.state === "idle") {
      // Nervously watch the cursor while standing.
      sprite.facing = sim.cursor.x > sprite.x ? 1 : -1;
    }
  }

  switch (sprite.state) {
    case "spawn":
      if (sprite.stateTime >= sprite.stateDuration) {
        enterState(sprite, "idle");
      }
      break;

    case "idle":
      if (sprite.stateTime >= sprite.stateDuration) {
        sprite.target = randomPoint(sim.bounds);
        enterState(sprite, "walk");
      }
      break;

    case "walk":
      if (moveTowardTarget(sprite, WALK_SPEED, dt)) {
        enterState(sprite, "idle");
      }
      break;

    case "flee":
      if (cursorDist > FLEE_EXIT_RADIUS) {
        enterState(sprite, "idle");
        break;
      }
      // Retarget every step so the sprite always runs away from where the
      // cursor is NOW, not where it was when the chase started.
      sprite.target = fleeTarget(sprite, sim);
      moveTowardTarget(sprite, FLEE_SPEED, dt);
      break;
  }
}

function enterState(sprite: Sprite, state: Sprite["state"]) {
  sprite.state = state;
  sprite.stateTime = 0;
  if (state === "idle") {
    sprite.stateDuration = IDLE_MIN + Math.random() * (IDLE_MAX - IDLE_MIN);
    sprite.target = null;
  }
}

/**
 * Move toward sprite.target at `speed` px/s, updating `facing` from the
 * horizontal direction. Returns true once the sprite has arrived.
 */
function moveTowardTarget(sprite: Sprite, speed: number, dt: number): boolean {
  if (!sprite.target) return true;
  const dx = sprite.target.x - sprite.x;
  const dy = sprite.target.y - sprite.y;
  const dist = Math.hypot(dx, dy);

  // Close enough that this step would overshoot: snap to the target.
  if (dist <= Math.max(ARRIVE_DISTANCE, speed * dt)) {
    sprite.x = sprite.target.x;
    sprite.y = sprite.target.y;
    return true;
  }

  if (Math.abs(dx) > 1) sprite.facing = dx > 0 ? 1 : -1;
  sprite.x += (dx / dist) * speed * dt;
  sprite.y += (dy / dist) * speed * dt;
  return false;
}

/** A point FLEE_DISTANCE away from the cursor, clamped inside the bounds. */
function fleeTarget(sprite: Sprite, sim: SimState) {
  let dx = sprite.x - sim.cursor.x;
  let dy = sprite.y - sim.cursor.y;
  const dist = Math.hypot(dx, dy);
  if (dist < 1) {
    // Cursor is exactly on top of us — just run the way we're facing.
    dx = sprite.facing;
    dy = 0;
  } else {
    dx /= dist;
    dy /= dist;
  }
  return clampToBounds(
    sprite.x + dx * FLEE_DISTANCE,
    sprite.y + dy * FLEE_DISTANCE,
    sim.bounds,
  );
}

function createSprite(bounds: Bounds, index: number): Sprite {
  const start = randomPoint(bounds);
  return {
    x: start.x,
    y: start.y,
    state: "spawn",
    stateTime: 0,
    // Stagger spawns so the group doesn't pop in as one.
    stateDuration: SPAWN_DURATION + Math.random() * SPAWN_STAGGER,
    target: null,
    facing: Math.random() < 0.5 ? 1 : -1,
    alerted: false,
    animTime: Math.random() * 10,
    blinkPhase: Math.random() * BLINK_PERIOD,
    variant: index % VARIANT_COUNT,
  };
}

// Sprites are positioned by their center, so keep them at least half a
// drawn sprite away from every edge — nothing ever clips the card.
function randomPoint(bounds: Bounds) {
  const insetX = (FRAME_W * SCALE) / 2;
  const insetY = (FRAME_H * SCALE) / 2;
  return {
    x: insetX + Math.random() * Math.max(1, bounds.width - insetX * 2),
    y: insetY + Math.random() * Math.max(1, bounds.height - insetY * 2),
  };
}

function clampToBounds(x: number, y: number, bounds: Bounds) {
  const insetX = (FRAME_W * SCALE) / 2;
  const insetY = (FRAME_H * SCALE) / 2;
  return {
    x: Math.min(Math.max(x, insetX), Math.max(insetX, bounds.width - insetX)),
    y: Math.min(Math.max(y, insetY), Math.max(insetY, bounds.height - insetY)),
  };
}
