/**
 * Configuraciones de animaciones reutilizables
 * 
 * Define todos los presets de animación que se pueden usar
 * en cualquier componente del proyecto.
 */

import type { AnimationPresets, AnimationType } from '@/app/types';

/**
 * Configuraciones base de animaciones con Framer Motion
 */
export const animationPresets: AnimationPresets = {
  fadeIn: {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.6, ease: "easeOut" }
  },

  fadeInUp: {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.6, ease: "easeOut" }
  },

  slideInLeft: {
    initial: { opacity: 0, x: -60 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.6, ease: "easeOut" }
  },

  slideInRight: {
    initial: { opacity: 0, x: 60 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.6, ease: "easeOut" }
  },

  scale: {
    initial: { opacity: 0, scale: 0.8 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

/**
 * Función para crear animaciones personalizadas
 */
export function createAnimation(
  type: AnimationType,
  options?: {
    duration?: number;
    delay?: number;
    once?: boolean;
    amount?: number;
  }
) {
  const base = animationPresets[type];
  const customOptions = options || {};

  return {
    ...base,
    viewport: {
      once: customOptions.once ?? true,
      amount: customOptions.amount ?? 0.3
    },
    transition: {
      ...base.transition,
      duration: customOptions.duration ?? 0.6,
      delay: customOptions.delay ?? 0
    }
  };
}

/**
 * Animaciones especiales para hero section
 */
export const heroAnimations = {
  title: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: 0.2 }
  },
  
  subtitle: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: 0.5 }
  },

  cta: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.6, delay: 0.8 }
  }
};

/**
 * Animaciones para stagger (elementos en secuencia)
 */
export const staggerAnimations = {
  container: {
    initial: {},
    whileInView: {},
    viewport: { once: true, amount: 0.3 },
    transition: { staggerChildren: 0.1 }
  },

  item: {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }
};