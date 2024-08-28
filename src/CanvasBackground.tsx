import React, { useEffect, useRef, useState } from "react";

const DOT_COLOR_LIGHT_MODE = "#7d7071";
const DOT_COLOR_DARK_MODE = "#7d7071";
const DOT_RADIUS = 1 * window.devicePixelRatio;

const CanvasBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dotColor, setDotColor] = useState(DOT_COLOR_LIGHT_MODE);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const resizeCanvas = (canvas: HTMLCanvasElement) => {
    const devicePixelRatio = window.devicePixelRatio || 1;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
  };

  const clearCanvas = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  };

  const drawDot = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    const distance = Math.sqrt((x - mousePos.x) ** 2 + (y - mousePos.y) ** 2);
    const effectRadius = 100;
    const radius =
      DOT_RADIUS +
      2 *
        window.devicePixelRatio *
        ((effectRadius - Math.min(distance, effectRadius)) / effectRadius);
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = dotColor;
    ctx.fill();
  };

  const drawPattern = (ctx: CanvasRenderingContext2D) => {
    clearCanvas(ctx);
    for (let x = 0; x < ctx.canvas.width; x += 10 * window.devicePixelRatio) {
      for (
        let y = 0;
        y < ctx.canvas.height;
        y += 10 * window.devicePixelRatio
      ) {
        drawDot(ctx, x, y);
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      resizeCanvas(canvas);
      drawPattern(ctx);
    };

    const handleMouseMove = (event: MouseEvent) => {
      setMousePos({
        x: event.clientX * window.devicePixelRatio,
        y: event.clientY * window.devicePixelRatio,
      });
      drawPattern(ctx);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    if (window.matchMedia) {
      const query = window.matchMedia("(prefers-color-scheme: dark)");
      setDotColor(query.matches ? DOT_COLOR_DARK_MODE : DOT_COLOR_LIGHT_MODE);

      query.addEventListener("change", (event) => {
        setDotColor(event.matches ? DOT_COLOR_DARK_MODE : DOT_COLOR_LIGHT_MODE);
        drawPattern(ctx);
      });
    }

    resizeCanvas(canvas);
    drawPattern(ctx);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mousePos, dotColor]);

  return (
    <canvas
      ref={canvasRef}
      id="bg"
      className="absolute top-0 left-0 w-full h-full"
    />
  );
};

export default CanvasBackground;
