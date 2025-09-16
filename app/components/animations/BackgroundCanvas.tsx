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
    const updateGeometry = () => {
      if (meshRef.current) {
        const aspectRatio = window.innerWidth / window.innerHeight;
        
        // Calcular dimensiones que aseguren cobertura completa
        let width = 2;
        let height = 2;
        
        if (aspectRatio > 1) {
          // Pantalla más ancha que alta
          width = 2 * aspectRatio * 1.2; // Factor extra para asegurar cobertura
        } else {
          // Pantalla más alta que ancha
          height = 2 / aspectRatio * 1.2; // Factor extra para asegurar cobertura
        }
        
        // Actualizar geometría
        meshRef.current.geometry.dispose();
        meshRef.current.geometry = new THREE.PlaneGeometry(width, height);
      }
    };

    // Inicializar geometría
    updateGeometry();

    // Escuchar cambios de tamaño
    window.addEventListener("resize", updateGeometry, { passive: true });
    
    return () => window.removeEventListener("resize", updateGeometry);
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
        objectFit: "cover",
        objectPosition: "center"
      }}
    >
      <AnimatedBlobs />
    </Canvas>
  );
}