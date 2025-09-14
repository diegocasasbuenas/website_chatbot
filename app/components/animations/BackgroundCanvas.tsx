"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";

function Blobs() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={{
          uTime: { value: 0 },
        }}
        fragmentShader={`
          varying vec2 vUv;
          uniform float uTime;

          float field(vec2 uv, vec2 center, float baseRadius, float time) {
            vec2 pos = uv - center;
            float d = length(pos);

            // Deformación más suave y redondeada
            float deform = 0.05 * sin(time * 0.4 + uv.x * 8.0 + uv.y * 8.0);

            // float pulse = 0.03 * sin(time * 0.2);

            return (baseRadius + deform) / (d * 3.0 + 0.05);
          }

          void main() {
            vec2 uv = vUv;

            // Blob verde
            float gField = field(uv, vec2(0.20, 0.70), 0.33, uTime * 0.8);
            vec3 green = vec3(0.376, 0.988, 0.722);

            // Blob naranja
            float oField = field(uv, vec2(0.80, 0.30), 0.33, uTime * 1.2 + 2.0);
            vec3 orange = vec3(1.0, 0.604, 0.267);

            // Bordes más suaves (menos puntas)
            float gMask = smoothstep(0.20, 0.50, gField);
            float oMask = smoothstep(0.20, 0.50, oField);

            // Color final
            vec3 color = green * gMask + orange * oMask;

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

export default function Background() {
  return (
    <Canvas
      camera={{ position: [0, 0, 1], fov: 50 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
      }}
    >
      <Blobs />
    </Canvas>
  );
}
