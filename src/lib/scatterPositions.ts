export interface ScatterPosition {
  x: number;
  y: number;
  rotation: number;
}

interface ScatterConfig {
  viewportWidth: number;
  viewportHeight: number;
  cardCount: number;
  cardWidth: number;
  cardHeight: number;
  reservedBottomPercent?: number;
}

/**
 * Generate scattered positions for photo cards using a grid-based approach with jitter.
 * Places card centers at cell centers across the full viewport for even distribution.
 */
export function generateScatterPositions({
  viewportWidth,
  viewportHeight,
  cardCount,
  cardWidth,
  cardHeight,
}: ScatterConfig): ScatterPosition[] {
  const positions: ScatterPosition[] = [];
  const edgePadding = 20; // Minimum distance from viewport edge

  // Calculate grid dimensions based on viewport aspect ratio
  const aspectRatio = viewportWidth / viewportHeight;
  const cols = Math.ceil(Math.sqrt(cardCount * aspectRatio));
  const rows = Math.ceil(cardCount / cols);

  // Cell size fills the entire viewport
  const cellWidth = viewportWidth / cols;
  const cellHeight = viewportHeight / rows;

  // Jitter limited to keep cards in bounds
  const maxJitterX = Math.min(cellWidth * 0.4, (cellWidth - cardWidth) / 2);
  const maxJitterY = Math.min(cellHeight * 0.4, (cellHeight - cardHeight) / 2);

  for (let i = 0; i < cardCount; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);

    // Place card CENTER at cell CENTER
    const cellCenterX = (col + 0.5) * cellWidth;
    const cellCenterY = (row + 0.5) * cellHeight;

    // Convert to top-left position (what CSS needs)
    let x = cellCenterX - cardWidth / 2;
    let y = cellCenterY - cardHeight / 2;

    // Apply jitter
    x += (Math.random() - 0.5) * maxJitterX * 2;
    y += (Math.random() - 0.5) * maxJitterY * 2;

    // Clamp to keep card fully visible
    x = Math.max(edgePadding, Math.min(x, viewportWidth - cardWidth - edgePadding));
    y = Math.max(edgePadding, Math.min(y, viewportHeight - cardHeight - edgePadding));

    const rotation = (Math.random() - 0.5) * 24;

    positions.push({ x, y, rotation });
  }

  return positions;
}

/**
 * Get the center position for stacked cards (used as starting point for entrance animation)
 */
export function getStackCenter(
  viewportWidth: number,
  viewportHeight: number,
  cardWidth: number,
  cardHeight: number,
): { x: number; y: number } {
  return {
    x: viewportWidth / 2 - cardWidth / 2,
    y: viewportHeight + 50, // Start below the viewport
  };
}
