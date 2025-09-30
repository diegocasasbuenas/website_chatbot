/**
 * Shaders para el background animado con blobs
 * 
 * El fragment shader crea dos blobs (verde y naranja) que se mueven
 * suavemente según el scroll progress y mantienen animaciones continuas.
 */

export const backgroundVertexShader = `
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const backgroundFragmentShader = `
  varying vec2 vUv;
  uniform float uTime;            // Tiempo transcurrido para animaciones
  uniform float uScroll;          // Progreso de scroll (0-1)
  uniform float uBlobScale;       // Escala global de los blobs
  uniform float uNoiseStrength;   // Intensidad de las deformaciones
  uniform float uMotionStrength;  // Fuerza del movimiento general

  /**
   * Genera un campo de distancia para crear formas orgánicas tipo blob
   * @param uv - Coordenadas UV
   * @param center - Centro del blob
   * @param baseRadius - Radio base del blob
   * @param time - Tiempo para animación
   */
  float field(vec2 uv, vec2 center, float baseRadius, float time) {
    vec2 pos = uv - center;
    float d = length(pos);

    // Ondas combinadas para blobs más visibles en pantallas pequeñas
    float waveA = sin(time * 0.8 + uv.x * 8.0 + uv.y * 8.0);
    float waveB = cos(time * 0.6 + uv.x * 5.0 - uv.y * 6.0);
    float deform = 0.05 * uNoiseStrength * (waveA + waveB * 0.6);

    float radius = baseRadius * uBlobScale + deform;
    return radius / (d * 3.0 + 0.05);
  }

  void main() {
    vec2 uv = vUv;

    // Distorsión global adicional para resaltar movimiento en móviles
    float motionPhase = uTime * 0.3;
    uv += 0.02 * uMotionStrength * vec2(
      sin(motionPhase + uv.y * 4.0),
      cos(motionPhase * 1.2 + uv.x * 4.0)
    );

    // Movimiento suave basado en scroll (sin saltos)
    float smoothScroll = uScroll;

    // Posiciones que nunca se superponen completamente
    // Verde: esquina superior izquierda → se mueve hacia centro-derecha
    vec2 greenCenter = vec2(
      0.25 + 0.1 * smoothScroll * uMotionStrength,
      0.75 - 0.1 * smoothScroll * uMotionStrength
    );

    // Naranja: esquina inferior derecha → se mueve hacia centro-izquierda  
    vec2 orangeCenter = vec2(
      0.75 - 0.1 * smoothScroll * uMotionStrength,
      0.25 + 0.1 * smoothScroll * uMotionStrength
    );

    // Deformación que aumenta con scroll y responde a la intensidad global
    float greenDeform = (0.03 + 0.02 * smoothScroll) * uNoiseStrength;
    float orangeDeform = (0.03 + 0.02 * smoothScroll) * uNoiseStrength;

    // Generar campos de los blobs con diferentes velocidades de animación (velocidad moderada)
    float gField = field(uv, greenCenter, 0.22 + greenDeform, uTime * 1.4);
    float oField = field(uv, orangeCenter, 0.22 + orangeDeform, uTime * 1.8 + 2.0);

    // Colores optimizados (brillantes pero no saturados)
    vec3 green = vec3(0.3, 0.8, 0.5);        // Verde vibrante
    vec3 orange = vec3(0.8, 0.4, 0.15);      // Naranja cálido
    vec3 background = vec3(0.02, 0.02, 0.02); // Gris muy oscuro

    // Máscaras con límite del 85% para un brillo controlado
    float gMask = smoothstep(0.1, 0.32, gField) * 0.85;
    float oMask = smoothstep(0.1, 0.32, oField) * 0.85;

    // Aplicar colores usando mix() y max() para evitar saturación
    vec3 color = background;
    color = mix(color, green, gMask);
    color = max(color, orange * oMask); // max() previene suma excesiva

    gl_FragColor = vec4(color, 1.0);
  }
`;

/**
 * Genera un objeto de uniformes independiente para cada instancia del shader
 */
export const createBackgroundUniforms = () => ({
  uTime: { value: 0 },
  uScroll: { value: 0 },
  uBlobScale: { value: 1 },
  uNoiseStrength: { value: 1 },
  uMotionStrength: { value: 1 },
});
