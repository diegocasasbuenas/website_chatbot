"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useEffect } from "react";

function Blobs() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const scrollProgressRef = useRef(0);

  // Usar useEffect para el scroll listener directo sin useState
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
    handleScroll(); // Ejecutar inmediatamente
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      // Siempre mantener el tiempo corriendo para animaciones fluidas
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      
      // Usar el ref directamente sin causar re-renders
      materialRef.current.uniforms.uScroll.value = scrollProgressRef.current;
      
      // Log solo ocasionalmente
      if (Math.floor(state.clock.elapsedTime) % 3 === 0 && Math.floor(state.clock.elapsedTime * 10) % 10 === 0) {
        console.log('📍 Scroll:', scrollProgressRef.current.toFixed(3), 'Tiempo:', state.clock.elapsedTime.toFixed(1));
      }
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={{
          uTime: { value: 0 },
          uScroll: { value: 0 },
        }}
        fragmentShader={`
          varying vec2 vUv;
          uniform float uTime;
          uniform float uScroll;

          float field(vec2 uv, vec2 center, float baseRadius, float time) {
            vec2 pos = uv - center;
            float d = length(pos);
            float deform = 0.05 * sin(time * 0.4 + uv.x * 8.0 + uv.y * 8.0);
            return (baseRadius + deform) / (d * 3.0 + 0.05);
          }

          void main() {
            vec2 uv = vUv;

            // Scroll más suave y continuo
            float smoothScroll = uScroll;
            
            // Posiciones que nunca se superponen completamente
            vec2 greenCenter = vec2(0.25 + 0.1 * smoothScroll, 0.75 - 0.1 * smoothScroll);
            vec2 orangeCenter = vec2(0.75 - 0.1 * smoothScroll, 0.25 + 0.1 * smoothScroll);
            
            // Deformación mínima
            float greenDeform = 0.03 + 0.02 * smoothScroll;
            float orangeDeform = 0.03 + 0.02 * smoothScroll;

            float gField = field(uv, greenCenter, 0.2 + greenDeform, uTime * 0.8);
            float oField = field(uv, orangeCenter, 0.2 + orangeDeform, uTime * 1.2 + 2.0);

            // Colores más brillantes pero seguros
            vec3 green = vec3(0.3, 0.8, 0.5);        // Verde más brillante
            vec3 orange = vec3(0.8, 0.4, 0.15);      // Naranja más brillante
            vec3 background = vec3(0.02, 0.02, 0.02); // Fondo muy sutil

            // Máscaras un poco más intensas
            float gMask = smoothstep(0.1, 0.3, gField) * 0.8; // máximo 80%
            float oMask = smoothstep(0.1, 0.3, oField) * 0.8; // máximo 80%

            // Usar max() en lugar de suma para evitar saturación
            vec3 color = background;
            color = mix(color, green, gMask);
            color = max(color, orange * oMask); // usar max en lugar de suma

            gl_FragColor = vec4(color, 1.0);
          }
        `}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
      />
    </mesh>
  );
}

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
        zIndex: -20,
      }}
    >
      <Blobs />
    </Canvas>
  );
}