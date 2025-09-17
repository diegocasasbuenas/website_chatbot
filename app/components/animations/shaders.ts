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
  uniform float uTime;    // Tiempo transcurrido para animaciones
  uniform float uScroll;  // Progreso de scroll (0-1)

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
    
    // Deformación sinusoidal para movimiento orgánico (velocidad moderada)
    float deform = 0.05 * sin(time * 0.8 + uv.x * 8.0 + uv.y * 8.0);
    
    return (baseRadius + deform) / (d * 3.0 + 0.05);
  }

  void main() {
    vec2 uv = vUv;

    // Movimiento suave basado en scroll (sin saltos)
    float smoothScroll = uScroll;
    
    // Posiciones que nunca se superponen completamente
    // Verde: esquina superior izquierda → se mueve hacia centro-derecha
    vec2 greenCenter = vec2(0.25 + 0.1 * smoothScroll, 0.75 - 0.1 * smoothScroll);
    
    // Naranja: esquina inferior derecha → se mueve hacia centro-izquierda  
    vec2 orangeCenter = vec2(0.75 - 0.1 * smoothScroll, 0.25 + 0.1 * smoothScroll);
    
    // Deformación mínima que aumenta ligeramente con scroll
    float greenDeform = 0.03 + 0.02 * smoothScroll;
    float orangeDeform = 0.03 + 0.02 * smoothScroll;

    // Generar campos de los blobs con diferentes velocidades de animación (velocidad moderada)
    float gField = field(uv, greenCenter, 0.2 + greenDeform, uTime * 1.4);
    float oField = field(uv, orangeCenter, 0.2 + orangeDeform, uTime * 1.8 + 2.0);

    // Colores optimizados (brillantes pero no saturados)
    vec3 green = vec3(0.3, 0.8, 0.5);        // Verde vibrante
    vec3 orange = vec3(0.8, 0.4, 0.15);      // Naranja cálido
    vec3 background = vec3(0.02, 0.02, 0.02); // Gris muy oscuro

    // Máscaras con límite del 80% para evitar saturación
    float gMask = smoothstep(0.1, 0.3, gField) * 0.8;
    float oMask = smoothstep(0.1, 0.3, oField) * 0.8;

    // Aplicar colores usando mix() y max() para evitar saturación
    vec3 color = background;
    color = mix(color, green, gMask);
    color = max(color, orange * oMask); // max() previene suma excesiva

    gl_FragColor = vec4(color, 1.0);
  }
`;

/**
 * Uniformes del shader con valores iniciales
 */
export const backgroundUniforms = {
  uTime: { value: 0 },
  uScroll: { value: 0 },
};