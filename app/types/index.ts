/**
 * Tipos y interfaces globales del proyecto
 * 
 * Define todas las estructuras de datos reutilizables
 * para mantener consistencia y type safety.
 */

import { MotionProps } from "framer-motion";

// ============================================================================
// SECTION TYPES
// ============================================================================

/**
 * Identificadores únicos para cada sección de la página
 */
export type SectionId = 'hero' | 'about' | 'skills' | 'projects' | 'services';

/**
 * Configuración base para una sección de la página
 */
export interface SectionConfig {
  id: SectionId;
  title?: string;
  subtitle?: string;
  className?: string;
  fullHeight?: boolean;
}

/**
 * Props para componentes de sección
 */
export interface SectionProps extends SectionConfig {
  children?: React.ReactNode;
  animation?: MotionProps;
}

// ============================================================================
// ANIMATION TYPES
// ============================================================================

/**
 * Tipos de animaciones disponibles
 */
export type AnimationType = 'fadeIn' | 'fadeInUp' | 'slideInLeft' | 'slideInRight' | 'scale';

/**
 * Configuración de animación reutilizable
 */
export interface AnimationConfig {
  type: AnimationType;
  duration?: number;
  delay?: number;
  once?: boolean;
  amount?: number;
}

/**
 * Configuraciones predefindas de animaciones
 */
export interface AnimationPresets {
  fadeIn: MotionProps;
  fadeInUp: MotionProps;
  slideInLeft: MotionProps;
  slideInRight: MotionProps;
  scale: MotionProps;
}

// ============================================================================
// CONTENT TYPES
// ============================================================================

/**
 * Estructura para skill/tecnología
 */
export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'devops' | 'ai' | 'design';
  level: 1 | 2 | 3 | 4 | 5;
  icon?: string;
  description?: string;
}

/**
 * Posición de un nodo en el gráfico de skills
 */
export interface NodePosition {
  x: number;
  y: number;
}

/**
 * Nodo hijo en el gráfico de skills (estructura simple sin posición)
 */
export interface SkillChildNode {
  id: string;
  title: string;
}

/**
 * Nodo padre en el gráfico de skills (estructura simple sin posición)
 */
export interface SkillParentNode {
  id: string;
  title: string;
  children: SkillChildNode[];
}

/**
 * Estructura de datos simple para el gráfico de skills (sin posiciones)
 */
export interface SkillsGraphData {
  centerNode: string;
  parentNodes: SkillParentNode[];
}

/**
 * Nodo con posición calculada (resultado del algoritmo de layout)
 */
export interface CalculatedSkillNode {
  id: string;
  title: string;
  position: NodePosition;
  children: CalculatedSkillNode[];
}

/**
 * Estructura para proyecto
 */
export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription?: string;
  tags: string[];
  image?: string;
  github?: string;
  demo?: string;
  featured?: boolean;
  year: number;
}

/**
 * Estructura para servicio
 */
export interface Service {
  id: string;
  title: string;
  description: string;
  icon?: string;
  features?: string[];
  price?: string;
  popular?: boolean;
}

// ============================================================================
// LAYOUT TYPES
// ============================================================================

/**
 * Props para componentes de layout
 */
export interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: boolean;
}

/**
 * Configuración de contenedor responsivo
 */
export interface ContainerConfig {
  maxWidth: LayoutProps['maxWidth'];
  padding: {
    x: string;
    y: string;
  };
  className?: string;
}

// ============================================================================
// THEME TYPES
// ============================================================================

/**
 * Configuración de colores del tema
 */
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: {
    primary: string;
    secondary: string;
    muted: string;
  };
}

/**
 * Configuración completa del tema
 */
export interface Theme {
  colors: ThemeColors;
  fonts: {
    heading: string;
    body: string;
  };
  spacing: {
    section: string;
    container: string;
  };
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Props comunes para componentes con variantes
 */
export interface VariantProps {
  variant?: 'default' | 'outlined' | 'ghost' | 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * Props para componentes interactivos
 */
export interface InteractiveProps {
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

/**
 * Tipo utilitario para hacer todas las propiedades opcionales excepto las especificadas
 */
export type PartialExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>;