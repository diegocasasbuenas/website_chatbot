"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useEffect } from "react";
import { useSimpleScroll } from "@/hooks/useSimpleScroll";
import { 
  backgroundVertexShader, 
  backgroundFragmentShader, 
  backgroundUniforms 
} from "./shaders";

/**
 * Componente que renderiza los blobs animados del background
 * 
 * Maneja:
 * - Detección de scroll sin causar re-renders
 * - Animaciones continuas del shader
 * - Actualización de uniformes en cada frame
 */
function AnimatedBlobs() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
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
    <mesh>
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
 */
export default function BackgroundCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 1], fov: 50 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -20, // Detrás de todo el contenido
      }}
    >
      <AnimatedBlobs />
    </Canvas>
  );
}