# 🌟 Website Chatbot - Portfolio Personal

Un portfolio moderno y interactivo construido con **Next.js 15**, **React 19**, **Three.js** y **Framer Motion**. Presenta animaciones de background fluidas con WebGL shaders y una arquitectura modular escalable.

## 🚀 Características Principales

- ✨ **Animaciones Avanzadas**: Background animado con blobs WebGL que responden al scroll
- 🎨 **Diseño Modular**: Arquitectura componentizada para máxima reutilización
- 📱 **Responsive Design**: Optimizado para todos los dispositivos y aspect ratios
- ⚡ **Performance**: Renderizado GPU con Three.js y optimizaciones React
- 🎭 **Smooth Animations**: Transiciones fluidas con Framer Motion
- 📦 **TypeScript**: Type safety completo en todo el proyecto

## 🏗️ Arquitectura del Proyecto

```
app/
├── components/
│   ├── animations/     # Animaciones WebGL y efectos
│   │   ├── BackgroundCanvas.tsx
│   │   ├── NoiseOverlay.tsx
│   │   └── shaders.ts
│   ├── layout/         # Wrappers y contenedores
│   │   └── Section.tsx
│   ├── sections/       # Componentes de cada sección
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   └── ServicesSection.tsx
│   └── ui/            # Componentes básicos reutilizables
│       ├── Button.tsx
│       └── index.ts
├── constants/         # Configuraciones y datos
│   ├── animations.ts  # Presets de animaciones
│   ├── content.ts     # Contenido estático
│   ├── theme.ts       # Tema y estilos
│   └── index.ts
├── hooks/            # Custom hooks
│   └── useSimpleScroll.ts
├── lib/              # Utilidades
│   └── utils.ts
├── types/            # Definiciones TypeScript
│   └── index.ts
├── ClientRoot.tsx    # Wrapper principal
├── layout.tsx        # Layout raíz
└── page.tsx          # Página principal
```

## 🎯 Principios de Diseño

### **1. Separación de Responsabilidades**
- **Components**: Lógica de UI y presentación
- **Constants**: Datos estáticos y configuraciones
- **Types**: Definiciones de TypeScript
- **Lib**: Funciones utilitarias reutilizables

### **2. Reutilización Máxima**
- Componentes base (`Button`, `Card`, `SectionWrapper`)
- Presets de animaciones reutilizables
- Sistema de temas consistente
- Hooks personalizados optimizados

### **3. Type Safety**
- Interfaces completas para todas las estructuras
- Props tipadas en todos los componentes
- Configuraciones con tipos específicos

## 🛠️ Stack Tecnológico

### **Core**
- **Next.js 15.5.3**: Framework React con App Router
- **React 19.1.0**: Biblioteca de UI con últimas características
- **TypeScript 5**: Type safety y mejor DX

### **Styling & Animation**
- **Tailwind CSS 4.0**: Framework CSS utilitario
- **Framer Motion 12**: Animaciones declarativas
- **clsx + tailwind-merge**: Gestión inteligente de clases

### **3D & Graphics**
- **Three.js**: Biblioteca 3D para WebGL
- **React Three Fiber**: Renderer React para Three.js
- **Custom GLSL Shaders**: Efectos visuales optimizados

### **Performance**
- **Turbopack**: Bundler ultra-rápido
- **Passive Event Listeners**: Scroll optimization
- **Memory Management**: Cleanup correcto de Three.js

## 🚀 Getting Started

### **Prerequisitos**
- Node.js 18+
- npm o yarn

### **Instalación**

```bash
# Clonar el repositorio
git clone https://github.com/diegocasasbuenas/website_chatbot.git

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build
npm start
```

## 📁 Guía de Uso

### **Añadir Nueva Sección**

1. **Crear el componente**:
```tsx
// app/components/sections/NewSection.tsx
export function NewSection() {
  return (
    <SectionWrapper
      id="new-section"
      title="Nueva Sección"
      subtitle="Descripción de la sección"
      animationType="fadeInUp"
    >
      {/* Contenido de la sección */}
    </SectionWrapper>
  );
}
```

2. **Agregar contenido**:
```tsx
// app/constants/content.ts
export const newSectionContent = {
  title: "Nueva Sección",
  items: [...]
};
```

3. **Incluir en la página**:
```tsx
// app/page.tsx
import { NewSection } from "@/app/components/sections";

export default function Home() {
  return (
    <main>
      {/* ... otras secciones */}
      <NewSection />
    </main>
  );
}
```

### **Personalizar Animaciones**

```tsx
// Usar preset existente
<SectionWrapper animationType="slideInLeft" />

// Crear animación personalizada
import { createAnimation } from "@/app/constants/animations";

const customAnimation = createAnimation('fadeIn', {
  duration: 1.0,
  delay: 0.3
});
```

### **Modificar Contenido**

Todo el contenido estático está centralizado en `app/constants/content.ts`:

```tsx
// Actualizar datos de proyectos
export const projectsData: Project[] = [
  {
    id: 'new-project',
    title: 'Mi Nuevo Proyecto',
    // ... resto de la configuración
  }
];
```

## 🎨 Customización

### **Tema y Colores**
Modificar `app/constants/theme.ts`:

```tsx
export const theme: Theme = {
  colors: {
    primary: '#3B82F6',    // Cambiar color primario
    secondary: '#8B5CF6',  // Cambiar color secundario
    // ...
  }
};
```

### **Animaciones del Background**
Editar `app/components/animations/shaders.ts`:

```glsl
// Cambiar colores de los blobs
vec3 green = vec3(0.3, 0.8, 0.5);   // RGB (0-1)
vec3 orange = vec3(0.8, 0.4, 0.15); // RGB (0-1)
```


## 📝 Documentación Adicional

- [Guía de Animaciones](./ANIMATION_DOCS.md) - Documentación completa del sistema de animaciones
- [Configuración de TypeScript](./tsconfig.json) - Setup de tipos
- [Configuración de Tailwind](./tailwind.config.ts) - Personalización de estilos

---

⭐ Si este proyecto te resulta útil, ¡no olvides darle una estrella!