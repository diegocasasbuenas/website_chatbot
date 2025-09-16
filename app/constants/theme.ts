/**
 * Configuración del tema y estilos del proyecto
 * 
 * Define colores, tipografías, espaciados y otras
 * configuraciones visuales reutilizables.
 */

import type { Theme, ContainerConfig } from '@/app/types';

/**
 * Tema principal del proyecto
 */
export const theme: Theme = {
  colors: {
    primary: '#3B82F6',    // Blue-500
    secondary: '#8B5CF6',  // Violet-500
    accent: '#F59E0B',     // Amber-500
    background: '#000000', // Black
    surface: '#111111',    // Near black
    text: {
      primary: '#FFFFFF',   // White
      secondary: '#D1D5DB', // Gray-300
      muted: '#9CA3AF'      // Gray-400
    }
  },
  
  fonts: {
    heading: 'var(--font-satoshi)',
    body: 'var(--font-general)'
  },

  spacing: {
    section: '5rem',      // 80px
    container: '2rem'     // 32px
  }
};

/**
 * Configuraciones de contenedor responsivo
 */
export const containerConfigs: Record<string, ContainerConfig> = {
  default: {
    maxWidth: 'lg',
    padding: { x: '1.5rem', y: '2rem' },
    className: 'mx-auto'
  },

  wide: {
    maxWidth: 'xl',
    padding: { x: '1.5rem', y: '2rem' },
    className: 'mx-auto'
  },

  narrow: {
    maxWidth: 'md',
    padding: { x: '1rem', y: '1.5rem' },
    className: 'mx-auto'
  },

  full: {
    maxWidth: 'full',
    padding: { x: '1rem', y: '2rem' },
    className: ''
  }
};

/**
 * Clases CSS reutilizables
 */
export const styleConstants = {
  // Secciones
  section: {
    base: 'min-h-screen flex items-center justify-center relative',
    fullHeight: 'h-screen',
    padding: 'py-20 px-4',
    snap: 'scroll-snap-align-start'
  },

  // Contenedores
  container: {
    base: 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8',
    default: 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8',
    narrow: 'mx-auto max-w-4xl px-4 sm:px-6',
    wide: 'mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8',
    full: 'w-full px-4 sm:px-6 lg:px-8'
  },

  // Tipografía
  typography: {
    h1: 'text-4xl md:text-6xl font-bold leading-tight',
    h2: 'text-3xl md:text-5xl font-bold leading-tight',
    h3: 'text-2xl md:text-4xl font-bold leading-tight',
    h4: 'text-xl md:text-2xl font-semibold',
    body: 'text-base md:text-lg leading-relaxed',
    small: 'text-sm md:text-base'
  },

  // Botones
  button: {
    base: 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200',
    primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700',
    ghost: 'hover:bg-gray-100 text-gray-900',
    sizes: {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2.5 text-base',
      lg: 'px-6 py-3 text-lg',
      xl: 'px-8 py-4 text-xl'
    }
  },

  // Grid systems
  grid: {
    responsive: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
    skills: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4',
    projects: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
  }
};

/**
 * Configuraciones para componentes específicos
 */
export const componentStyles = {
  card: {
    base: 'bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6',
    hover: 'hover:bg-gray-800/50 hover:border-gray-700 transition-all duration-300',
    shadow: 'shadow-lg hover:shadow-xl'
  },

  badge: {
    base: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
    primary: 'bg-blue-100 text-blue-800',
    secondary: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800'
  },

  input: {
    base: 'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
    error: 'border-red-300 focus:ring-red-500 focus:border-red-500'
  }
};