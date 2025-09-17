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
     * Actualiza las dimensiones del viewport con overscan
     */
    const updateDimensions = () => {
      // Obtener dimensiones reales de la pantalla incluyendo Safari iPhone
      const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      const viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
      
      // Usar un factor de overscan para asegurar cobertura completa
      const overscanFactor = 1.2; // 20% extra en cada dirección para Safari iPhone
      const width = Math.ceil(viewportWidth * overscanFactor);
      const height = Math.ceil(viewportHeight * overscanFactor);
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

    // Escuchar cambios de tamaño de ventana y orientación
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleResize, { passive: true });
    // Para Safari iPhone cuando aparecen/desaparecen las barras
    window.addEventListener("scroll", handleResize, { passive: true });

    // Cleanup del event listener
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      window.removeEventListener("scroll", handleResize);
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
        minHeight: '100dvh', // Para Safari iPhone
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