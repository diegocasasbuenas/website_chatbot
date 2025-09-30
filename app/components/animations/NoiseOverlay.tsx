"use client";
import { useEffect, useRef, useState } from "react";
import { getViewportMetrics } from "@/app/lib/viewport";

/**
 * Overlay de ruido que se ajusta automáticamente al tamaño de la ventana
 * 
 * Genera ruido visual sutil que cubre toda la pantalla y se redimensiona
 * automáticamente cuando cambia el tamaño de la ventana del navegador.
 */
type OverlayDimensions = {
  width: number;
  height: number;
  safeAreaTop: number;
  safeAreaLeft: number;
  overscanOffsetX: number;
  overscanOffsetY: number;
};

export default function NoiseOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState<OverlayDimensions>({
    width: 0,
    height: 0,
    safeAreaTop: 0,
    safeAreaLeft: 0,
    overscanOffsetX: 0,
    overscanOffsetY: 0,
  });
  const OVERSCAN_FACTOR = 1.2;
  const pendingRaf = useRef<number | null>(null);

  const drawNoise = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const val = Math.random() * 120;
      data[i] = val;
      data[i + 1] = val;
      data[i + 2] = val;
      data[i + 3] = 35;
    }

    ctx.putImageData(imageData, 0, 0);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /**
     * Actualiza las dimensiones del viewport con overscan
     */
    const updateDimensions = () => {
      const metrics = getViewportMetrics();
      const baseWidth = metrics.width + metrics.safeArea.left + metrics.safeArea.right;
      const baseHeight = metrics.height + metrics.safeArea.top + metrics.safeArea.bottom;

      const width = Math.ceil(baseWidth * OVERSCAN_FACTOR);
      const height = Math.ceil(baseHeight * OVERSCAN_FACTOR);
      const overscanOffsetX = (width - baseWidth) / 2;
      const overscanOffsetY = (height - baseHeight) / 2;

      setDimensions(prev => {
        const hasMeaningfulChange =
          Math.abs(prev.width - width) >= 1 ||
          Math.abs(prev.height - height) >= 1 ||
          Math.abs(prev.safeAreaTop - metrics.safeArea.top) >= 1 ||
          Math.abs(prev.safeAreaLeft - metrics.safeArea.left) >= 1 ||
          Math.abs(prev.overscanOffsetX - overscanOffsetX) >= 1 ||
          Math.abs(prev.overscanOffsetY - overscanOffsetY) >= 1;

        if (!hasMeaningfulChange) {
          return prev;
        }

        return {
          width,
          height,
          safeAreaTop: metrics.safeArea.top,
          safeAreaLeft: metrics.safeArea.left,
          overscanOffsetX,
          overscanOffsetY,
        };
      });
    };

    /**
     * Genera el patrón de ruido en el canvas
     */
    /**
     * Handler para el evento resize con debounce mínimo
     */
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (pendingRaf.current !== null) return;
        pendingRaf.current = requestAnimationFrame(() => {
          pendingRaf.current = null;
          updateDimensions();
        });
      }, 25);
    };

    // Inicializar dimensiones
    updateDimensions();

    // Escuchar cambios de tamaño de ventana y orientación
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleResize, { passive: true });

    const visualViewport = window.visualViewport;
    if (visualViewport) {
      visualViewport.addEventListener("resize", handleResize);
    }

    // Cleanup del event listener
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      if (visualViewport) {
        visualViewport.removeEventListener("resize", handleResize);
      }
      clearTimeout(resizeTimeout);
      if (pendingRaf.current !== null) {
        cancelAnimationFrame(pendingRaf.current);
        pendingRaf.current = null;
      }
    };
  }, []);

  // Regenerar ruido cuando cambien las dimensiones
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0 || dimensions.height === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (canvas.width !== dimensions.width || canvas.height !== dimensions.height) {
      canvas.width = dimensions.width;
      canvas.height = dimensions.height;
    }

    drawNoise(ctx, dimensions.width, dimensions.height);
  }, [dimensions]);

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      style={{
        position: 'fixed',
        top: -(dimensions.safeAreaTop + dimensions.overscanOffsetY),
        left: -(dimensions.safeAreaLeft + dimensions.overscanOffsetX),
        width: dimensions.width ? `${dimensions.width}px` : '100vw',
        height: dimensions.height ? `${dimensions.height}px` : '100vh',
        zIndex: -10,
        pointerEvents: 'none',
        objectFit: 'cover',
        objectPosition: 'center',
        // Asegura que cubra toda la pantalla
        transform: "translateZ(0)", // Fuerza hardware acceleration
        backfaceVisibility: "hidden" // Optimización
      }}
    />
  );
}
