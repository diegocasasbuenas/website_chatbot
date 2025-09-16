# 🌟 Website Chatbot - Background Animations

## 📋 Estructura del Proyecto

```
app/
├── components/animations/
│   ├── BackgroundCanvas.tsx    # Canvas principal con blobs animados
│   ├── NoiseOverlay.tsx       # Overlay de textura
│   └── shaders.ts            # Shaders GLSL separados
├── ClientRoot.tsx            # Wrapper principal del cliente
├── page.tsx                  # Página principal con secciones
└── globals.css              # Estilos con scroll-snap

hooks/
└── useSimpleScroll.ts       # Hook optimizado para scroll
```

## 🎨 Sistema de Animaciones

### Background Canvas
- **Blobs animados**: Dos formas orgánicas (verde y naranja) que responden al scroll
- **Shader personalizado**: Renderizado GPU para performance óptima
- **Scroll responsivo**: Movimiento suave sin congelación

### Scroll Behavior
- **Scroll-snap**: Navegación sección por sección automática
- **Detección optimizada**: Sin re-renders de React para mantener fluidez
- **5 secciones**: Hero, About, Skills, Projects, Services

## 🔧 Componentes Principales

### `BackgroundCanvas.tsx`
```tsx
// Canvas fijo que renderiza blobs animados
// - Posición: fixed, z-index: -20 (fondo)
// - Responde al scroll automáticamente
// - Usa shaders externos para mantenibilidad
```

### `useSimpleScroll.ts`
```tsx
// Hook optimizado para scroll detection
// - Retorna scrollProgress (0-1)
// - Usa passive listeners para performance
// - Incluye ref para acceso sin re-renders
```

### `shaders.ts`
```glsl
// Shaders GLSL separados y documentados
// - backgroundVertexShader: transformación básica
// - backgroundFragmentShader: lógica de blobs
// - backgroundUniforms: configuración inicial
```

## 🎯 Configuración de Scroll

### CSS (globals.css)
```css
html {
  scroll-snap-type: y mandatory;  /* Snap automático */
  scroll-behavior: smooth;        /* Transiciones suaves */
}

section {
  scroll-snap-align: start;       /* Alineación al inicio */
}
```

### Secciones (page.tsx)
- **Altura**: `h-screen` (100vh cada una)
- **Animaciones**: Framer Motion con `fadeInUp`
- **IDs únicos**: Para navegación y debugging

## 🚀 Performance

### Optimizaciones Aplicadas
1. **No re-renders**: Scroll detection usando refs
2. **Passive listeners**: Mejor performance en scroll
3. **Shader GPU**: Animaciones renderizadas en GPU
4. **Componentes separados**: Mejor tree shaking

### Evitar Problemas
- ❌ No usar `useState` en componentes Three.js
- ❌ No mezclar lógica React con useFrame
- ✅ Usar refs para valores que cambian frecuentemente
- ✅ Separar shaders en archivos externos

## 🛠️ Desarrollo

### Agregar Nueva Sección
1. Añadir `motion.section` en `page.tsx`
2. Usar clase `h-screen`
3. Aplicar animación `{...fadeInUp}`
4. El background responderá automáticamente

### Modificar Colores del Background
1. Editar `shaders.ts`
2. Cambiar valores en `backgroundFragmentShader`
3. Variables: `green`, `orange`, `background`

### Ajustar Velocidad de Animación
1. En `shaders.ts`, función `field()`
2. Modificar multiplicadores: `uTime * 0.8`, `uTime * 1.2`
3. Cambiar `deform` para más/menos movimiento

## 🐛 Debugging

### Logs de Desarrollo
- Scroll progress se muestra en consola
- Activar logs en `BackgroundCanvas.tsx` si es necesario

### Problemas Comunes
1. **Background se congela**: Verificar que no hay useState en useFrame
2. **Scroll no funciona**: Revisar scroll-snap en CSS
3. **Performance lenta**: Verificar passive listeners

## 📦 Dependencias Clave
- `@react-three/fiber`: Canvas WebGL
- `framer-motion`: Animaciones de UI
- `three`: Biblioteca 3D base
- `tailwindcss`: Estilos utilitarios

## 🎨 Personalización Rápida

### Cambiar Colores de Blobs
```glsl
// En shaders.ts
vec3 green = vec3(0.3, 0.8, 0.5);   // RGB (0-1)
vec3 orange = vec3(0.8, 0.4, 0.15); // RGB (0-1)
```

### Ajustar Movimiento
```glsl
// Posiciones de blobs
vec2 greenCenter = vec2(0.25 + 0.1 * smoothScroll, 0.75 - 0.1 * smoothScroll);
// Cambiar 0.1 por mayor amplitud de movimiento
```

### Modificar Velocidad de Deformación
```glsl
// Velocidades diferentes para cada blob
float gField = field(uv, greenCenter, 0.2 + greenDeform, uTime * 0.8);  // Más lento
float oField = field(uv, orangeCenter, 0.2 + orangeDeform, uTime * 1.2); // Más rápido
```