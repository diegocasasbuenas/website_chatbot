"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";

function Blobs({ scroll }: { scroll: number }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uScroll.value = scroll;
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

            // Aumentar la amplitud del movimiento para que el scroll sea más notorio
            // Adaptar el movimiento a saltos discretos de scroll
            float stepScroll = floor(uScroll * 4.99) / 4.0; // 0, 0.25, 0.5, 0.75, 1
            // Ajustar amplitudes para que los blobs no se crucen
            float speed = 2.5; // factor de velocidad
            float greenAmplitude = 0.18;
            float greenVerticalAmp = 0.18;
            float orangeAmplitude = 0.18;
            float orangeVerticalAmp = 0.18;
            // El verde se mueve en la parte superior izquierda
            vec2 greenCenter = vec2(0.20 + greenAmplitude * stepScroll * speed, 0.70 - greenVerticalAmp * stepScroll * speed);
            float greenDeform = 0.05 + 0.25 * stepScroll * speed;
            // El naranja se mueve en la parte inferior derecha
            vec2 orangeCenter = vec2(0.80 - orangeAmplitude * stepScroll * speed, 0.30 + orangeVerticalAmp * stepScroll * speed);
            float orangeDeform = 0.05 + 0.25 * stepScroll * speed;
            float orangeVisibility = 1.0;

            float gField = field(uv, greenCenter, 0.33 + greenDeform, uTime * 0.8);
            vec3 green = vec3(0.376, 0.988, 0.722);

            float oField = field(uv, orangeCenter, 0.33 + orangeDeform, uTime * 1.2 + 2.0);
            vec3 orange = vec3(1.0, 0.604, 0.267);

            float gMask = smoothstep(0.20, 0.50, gField);
            float oMask = smoothstep(0.20, 0.50, oField) * orangeVisibility;

            // El blend solo en la sección central
            float blend = stepScroll == 0.5 ? 1.0 : 0.0;
            float deformBlend = mix(0.0, 0.25, blend);
            float gFieldBlend = field(uv, mix(greenCenter, orangeCenter, blend), 0.33 + deformBlend, uTime);
            float gMaskBlend = smoothstep(0.20, 0.50, gFieldBlend) * blend;

            vec3 color = green * gMask + orange * oMask + mix(green, orange, blend) * gMaskBlend;

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

export default function Background({ scroll }: { scroll: number }) {
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
      <Blobs scroll={scroll} />
    </Canvas>
  );
}
