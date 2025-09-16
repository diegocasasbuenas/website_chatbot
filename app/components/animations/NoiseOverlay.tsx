"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Overlay de ruido que se ajusta automáticamente al tamaño de la ventana
 * 
 * Genera ruido visual sutil que cubre toda la pantalla y se redimensiona
 * automáticamente cuando cambia el tamaño de la ventana del navegador.
 */
export default function NoiseOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /**
     * Actualiza las dimensiones del viewport
     */
    const updateDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setDimensions({ width, height });
    };

    /**
     * Genera el patrón de ruido en el canvas
     */
    const generateNoise = (width: number, height: number) => {
      // Actualizar dimensiones del canvas
      canvas.width = width;
      canvas.height = height;

      // Generar ruido visual
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const val = Math.random() * 120; // gris oscuro aleatorio (0-120)
        data[i] = val;     // R
        data[i + 1] = val; // G
        data[i + 2] = val; // B
        data[i + 3] = 35;  // Alpha (sutil pero visible)
      }

      ctx.putImageData(imageData, 0, 0);
    };

    /**
     * Handler para el evento resize con debounce mínimo
     */
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        updateDimensions();
      }, 10); // Debounce muy corto para responsividad
    };

    // Inicializar dimensiones
    updateDimensions();

    // Escuchar cambios de tamaño de ventana
    window.addEventListener("resize", handleResize, { passive: true });

    // Cleanup del event listener
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Regenerar ruido cuando cambien las dimensiones
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0 || dimensions.height === 0) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Actualizar dimensiones del canvas
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // Generar ruido visual
    const imageData = ctx.createImageData(dimensions.width, dimensions.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const val = Math.random() * 120; // gris oscuro aleatorio (0-120)
      data[i] = val;     // R
      data[i + 1] = val; // G
      data[i + 2] = val; // B
      data[i + 3] = 35;  // Alpha (sutil pero visible)
    }

    ctx.putImageData(imageData, 0, 0);
  }, [dimensions]);

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -10,
        pointerEvents: 'none'
      }}
    />
  );
}