"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useEffect, useState } from "react";
import { 
  backgroundVertexShader, 
  backgroundFragmentShader, 
  backgroundUniforms 
} from "./shaders";
import { getViewportMetrics, type ViewportMetrics } from "@/app/lib/viewport";

/**
 * Componente que renderiza los blobs animados del background
 * 
 * Maneja:
 * - Detección de scroll sin causar re-renders
 * - Animaciones continuas del shader
 * - Actualización de uniformes en cada frame
 * - Geometría responsive según aspect ratio
 */
function AnimatedBlobs() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const scrollProgressRef = useRef(0);

  // Detectar scroll directamente sin useState para evitar re-renders
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const docHeight = scrollHeight - windowHeight;
      
      if (docHeight <= 0) {
        scrollProgressRef.current = 0;
        return;
      }
      
      scrollProgressRef.current = Math.min(Math.max(scrollTop / docHeight, 0), 1);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Inicializar
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ajustar geometría según aspect ratio
  useEffect(() => {
    let rafId: number | null = null;

    const refreshGeometry = () => {
      if (meshRef.current) {
        // Obtener dimensiones reales del viewport, considerando visualViewport y safe areas
        const metrics = getViewportMetrics();
        const effectiveWidth = metrics.width + metrics.safeArea.left + metrics.safeArea.right;
        const effectiveHeight = metrics.height + metrics.safeArea.top + metrics.safeArea.bottom;
        const aspectRatio = effectiveWidth / effectiveHeight;
        
        // Calcular dimensiones que aseguren cobertura completa
        let width = 2;
        let height = 2;
        
        if (aspectRatio > 1) {
          // Pantalla más ancha que alta
          width = 2 * aspectRatio * 1.5; // Factor extra para asegurar cobertura
        } else {
          // Pantalla más alta que ancha
          height = 2 / aspectRatio * 1.5; // Factor extra para asegurar cobertura
        }
        
        // Actualizar geometría
        meshRef.current.geometry.dispose();
        meshRef.current.geometry = new THREE.PlaneGeometry(width, height);
      }
    };

    const scheduleGeometryUpdate = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        refreshGeometry();
      });
    };

    // Inicializar geometría
    refreshGeometry();

    // Escuchar cambios de tamaño y orientación
    window.addEventListener("resize", scheduleGeometryUpdate, { passive: true });
    window.addEventListener("orientationchange", scheduleGeometryUpdate, { passive: true });

    // Responder a cambios en el visual viewport (por ejemplo, barras del browser en móviles)
    const visualViewport = typeof window !== 'undefined' ? window.visualViewport : null;
    if (visualViewport) {
      visualViewport.addEventListener("resize", scheduleGeometryUpdate);
    }

    return () => {
      window.removeEventListener("resize", scheduleGeometryUpdate);
      window.removeEventListener("orientationchange", scheduleGeometryUpdate);
      if (visualViewport) {
        visualViewport.removeEventListener("resize", scheduleGeometryUpdate);
      }
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  // Actualizar uniformes en cada frame de Three.js
  useFrame((state) => {
    if (materialRef.current) {
      // Tiempo siempre corriendo para animaciones fluidas
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      
      // Scroll progress sin causar re-renders de React
      materialRef.current.uniforms.uScroll.value = scrollProgressRef.current;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={backgroundUniforms}
        fragmentShader={backgroundFragmentShader}
        vertexShader={backgroundVertexShader}
      />
    </mesh>
  );
}

/**
 * Canvas principal del background animado
 * 
 * Renderiza blobs que responden al scroll de forma fluida.
 * Posicionado como fondo fijo detrás del contenido.
 * Usa geometría responsive y CSS object-fit para cobertura total.
 */
export default function BackgroundCanvas() {
  const [viewport, setViewport] = useState<ViewportMetrics>({
    width: 0,
    height: 0,
    safeArea: { top: 0, bottom: 0, left: 0, right: 0 },
  });
  const OVERSCAN_FACTOR = 1.1;
  const pendingRaf = useRef<number | null>(null);
  const metricsRef = useRef(viewport);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateViewport = () => {
      const metrics = getViewportMetrics();

      const prev = metricsRef.current;
      const hasMeaningfulChange =
        Math.abs(metrics.width - prev.width) >= 1 ||
        Math.abs(metrics.height - prev.height) >= 1 ||
        Math.abs(metrics.safeArea.top - prev.safeArea.top) >= 1 ||
        Math.abs(metrics.safeArea.bottom - prev.safeArea.bottom) >= 1 ||
        Math.abs(metrics.safeArea.left - prev.safeArea.left) >= 1 ||
        Math.abs(metrics.safeArea.right - prev.safeArea.right) >= 1;

      if (!hasMeaningfulChange) {
        return;
      }

      metricsRef.current = metrics;
      setViewport(metrics);
    };

    const scheduleUpdate = () => {
      if (pendingRaf.current !== null) return;
      pendingRaf.current = requestAnimationFrame(() => {
        pendingRaf.current = null;
        updateViewport();
      });
    };

    updateViewport();
    window.addEventListener("resize", scheduleUpdate, { passive: true });
    window.addEventListener("orientationchange", scheduleUpdate, { passive: true });

    const visualViewport = window.visualViewport;
    if (visualViewport) {
      visualViewport.addEventListener("resize", scheduleUpdate);
    }

    return () => {
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("orientationchange", scheduleUpdate);
      if (visualViewport) {
        visualViewport.removeEventListener("resize", scheduleUpdate);
      }
      if (pendingRaf.current !== null) {
        cancelAnimationFrame(pendingRaf.current);
        pendingRaf.current = null;
      }
    };
  }, []);

  const totalWidth = viewport.width + viewport.safeArea.left + viewport.safeArea.right;
  const totalHeight = viewport.height + viewport.safeArea.top + viewport.safeArea.bottom;
  const overscannedWidth = totalWidth ? totalWidth * OVERSCAN_FACTOR : 0;
  const overscannedHeight = totalHeight ? totalHeight * OVERSCAN_FACTOR : 0;
  const overscanOffsetX = overscannedWidth ? (overscannedWidth - totalWidth) / 2 : 0;
  const overscanOffsetY = overscannedHeight ? (overscannedHeight - totalHeight) / 2 : 0;

  const canvasWidth = overscannedWidth ? `${Math.round(overscannedWidth)}px` : "100vw";
  const canvasHeight = overscannedHeight ? `${Math.round(overscannedHeight)}px` : "100vh";

  return (
    <Canvas
      camera={{ position: [0, 0, 1], fov: 50 }}
      style={{
        position: "fixed",
        top: -(viewport.safeArea.top + overscanOffsetY),
        left: -(viewport.safeArea.left + overscanOffsetX),
        width: canvasWidth,
        height: canvasHeight,
        minHeight: canvasHeight,
        minWidth: canvasWidth,
        zIndex: -20, // Detrás de todo el contenido
        objectFit: "cover",
        objectPosition: "center",
        // Asegura que cubra toda la pantalla
        transform: "translateZ(0)", // Fuerza hardware acceleration
        backfaceVisibility: "hidden" // Optimización
      }}
    >
      <AnimatedBlobs />
    </Canvas>
  );
}
