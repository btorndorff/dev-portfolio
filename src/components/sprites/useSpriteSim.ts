// React glue: owns the lifecycle of the sim + renderer pair. Everything
// created after mount registers a cleanup, and the effect teardown runs them
// all — this must stay airtight because StrictMode double-mounts in dev and
// AnimatePresence unmounts the page on every navigation.

import { useEffect, type RefObject } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { MAX_DT, STEP } from "./config";
import { createCanvasRenderer } from "./canvasRenderer";
import { createSim, setBounds, setCursor, stepSim } from "./sim";
import {
  createPlaceholderSheet,
  loadCharacterSheet,
  PALETTES,
} from "./spriteSheet";
import type { SpriteSheet } from "./types";

export function useSpriteSim(containerRef: RefObject<HTMLDivElement>) {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    const container = containerRef.current;
    // The container is pointer-events-none, so cursor tracking listens on its
    // parent (the relative wrapper around the page content).
    const host = container?.parentElement;
    if (!container || !host) return;

    let disposed = false;
    const cleanups: Array<() => void> = [];

    // Sheet loading is async (it decodes an image), so setup continues in an
    // async block. `disposed` guards the gap: if the component unmounts while
    // the image is still loading, we bail before creating anything.
    (async () => {
      let sheets: SpriteSheet[];
      try {
        sheets = [await loadCharacterSheet()];
      } catch {
        // Image missing or failed to decode — fall back to generated art.
        sheets = PALETTES.map(createPlaceholderSheet);
      }
      if (disposed) return;

      const renderer = createCanvasRenderer(sheets);
      renderer.init(container);
      cleanups.push(() => renderer.dispose());

      const sim = createSim({
        width: host.clientWidth,
        height: host.clientHeight,
      });
      renderer.resize(host.clientWidth, host.clientHeight, window.devicePixelRatio);

      // Reduced motion: no wandering, no animation loop — just one static
      // frame of sprites standing around (re-drawn if the layout resizes).
      if (reducedMotion) {
        for (const sprite of sim.sprites) {
          sprite.state = "idle";
        }
        renderer.render(sim);

        const resizeObserver = new ResizeObserver(() => {
          renderer.resize(host.clientWidth, host.clientHeight, window.devicePixelRatio);
          setBounds(sim, host.clientWidth, host.clientHeight);
          renderer.render(sim);
        });
        resizeObserver.observe(host);
        cleanups.push(() => resizeObserver.disconnect());
        return;
      }

      // --- Full animated path ---

      const onPointerMove = (event: PointerEvent) => {
        // Fresh rect every event: the paper card animates in via a transform,
        // so a cached rect would be wrong during the drop.
        const rect = host.getBoundingClientRect();
        setCursor(sim, event.clientX - rect.left, event.clientY - rect.top, true);
      };
      const onPointerLeave = () => setCursor(sim, 0, 0, false);
      host.addEventListener("pointermove", onPointerMove);
      host.addEventListener("pointerleave", onPointerLeave);
      cleanups.push(() => {
        host.removeEventListener("pointermove", onPointerMove);
        host.removeEventListener("pointerleave", onPointerLeave);
      });

      const resizeObserver = new ResizeObserver(() => {
        renderer.resize(host.clientWidth, host.clientHeight, window.devicePixelRatio);
        setBounds(sim, host.clientWidth, host.clientHeight);
      });
      resizeObserver.observe(host);
      cleanups.push(() => resizeObserver.disconnect());

      // Fixed-timestep loop: real elapsed time accumulates, and the sim always
      // advances in identical STEP-sized increments. This keeps behavior the
      // same on any refresh rate and makes resumes (tab switch) predictable.
      let rafId = 0;
      let running = false;
      let last = 0;
      let accumulator = 0;

      const frame = (now: number) => {
        accumulator += Math.min((now - last) / 1000, MAX_DT);
        last = now;
        while (accumulator >= STEP) {
          stepSim(sim, STEP);
          accumulator -= STEP;
        }
        renderer.render(sim);
        rafId = requestAnimationFrame(frame);
      };

      const start = () => {
        if (running) return;
        running = true;
        last = performance.now();
        rafId = requestAnimationFrame(frame);
      };
      const stop = () => {
        running = false;
        cancelAnimationFrame(rafId);
      };
      cleanups.push(stop);

      // Pause outright while the tab is hidden (rAF wouldn't fire anyway, but
      // an explicit stop/start resets the clock cleanly on return).
      const onVisibilityChange = () => {
        if (document.hidden) stop();
        else start();
      };
      document.addEventListener("visibilitychange", onVisibilityChange);
      cleanups.push(() =>
        document.removeEventListener("visibilitychange", onVisibilityChange),
      );

      start();
    })();

    return () => {
      disposed = true;
      for (const cleanup of cleanups) cleanup();
    };
  }, [containerRef, reducedMotion]);
}
