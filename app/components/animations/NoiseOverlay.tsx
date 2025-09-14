"use client";
import { useEffect, useRef } from "react";

export default function NoiseOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Dibujar ruido una sola vez
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const val = Math.random() * 255; // gris aleatorio
      data[i] = val;     // R
      data[i + 1] = val; // G
      data[i + 2] = val; // B
      data[i + 3] = 30;  // Alpha (0–255) → más fuerte que antes
    }

    ctx.putImageData(imageData, 0, 0);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-5 pointer-events-none"
    />
  );
}