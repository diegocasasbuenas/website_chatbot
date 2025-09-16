/**
 * Componente Section reutilizable
 * 
 * Wrapper base para todas las secciones de la página.
 * Maneja animaciones, scroll-snap, y estilos consistentes.
 */

import { motion } from "framer-motion";
import { cn } from "@/app/lib/utils";
import { animationPresets } from "@/app/constants/animations";
import { styleConstants } from "@/app/constants/theme";
import type { SectionProps, AnimationType } from "@/app/types";

interface SectionWrapperProps extends Omit<SectionProps, 'animation'> {
  children: React.ReactNode;
  animationType?: AnimationType;
  className?: string;
  containerClassName?: string;
  fullHeight?: boolean;
  title?: string;
  subtitle?: string;
}

/**
 * Wrapper principal para secciones con animaciones y estilos consistentes
 */
export function SectionWrapper({
  id,
  title,
  subtitle,
  children,
  animationType = 'fadeInUp',
  className,
  containerClassName,
  fullHeight = true,
  ...props
}: SectionWrapperProps) {
  
  const sectionClasses = cn(
    styleConstants.section.base,
    fullHeight && styleConstants.section.fullHeight,
    styleConstants.section.padding,
    className
  );

  const containerClasses = cn(
    styleConstants.container.base,
    containerClassName
  );

  return (
    <motion.section
      id={id}
      className={sectionClasses}
      {...animationPresets[animationType]}
      {...props}
    >
      <div className={containerClasses}>
        {(title || subtitle) && (
          <div className="text-center mb-16">
            {title && (
              <motion.h2 
                className={cn(styleConstants.typography.h2, "mb-4")}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {title}
              </motion.h2>
            )}
            {subtitle && (
              <motion.p 
                className={cn(styleConstants.typography.body, "text-gray-400 max-w-2xl mx-auto")}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        )}
        
        {children}
      </div>
    </motion.section>
  );
}

/**
 * Componente Container reutilizable para contenido responsivo
 */
interface ContainerProps {
  children: React.ReactNode;
  size?: 'narrow' | 'default' | 'wide' | 'full';
  className?: string;
}

export function Container({ 
  children, 
  size = 'default', 
  className 
}: ContainerProps) {
  const containerClasses = cn(
    styleConstants.container[size] || styleConstants.container.base,
    className
  );

  return (
    <div className={containerClasses}>
      {children}
    </div>
  );
}

/**
 * Grid responsivo para mostrar elementos en cuadrícula
 */
interface GridProps {
  children: React.ReactNode;
  cols?: { base?: number; md?: number; lg?: number };
  gap?: number;
  className?: string;
}

export function Grid({ 
  children, 
  cols = { base: 1, md: 2, lg: 3 }, 
  gap = 6,
  className 
}: GridProps) {
  const gridClasses = cn(
    'grid',
    `grid-cols-${cols.base || 1}`,
    cols.md && `md:grid-cols-${cols.md}`,
    cols.lg && `lg:grid-cols-${cols.lg}`,
    `gap-${gap}`,
    className
  );

  return (
    <div className={gridClasses}>
      {children}
    </div>
  );
}

/**
 * Card component reutilizable
 */
interface CardProps {
  children: React.ReactNode;
  hover?: boolean;
  className?: string;
  onClick?: () => void;
}

export function Card({ 
  children, 
  hover = true, 
  className,
  onClick 
}: CardProps) {
  const cardClasses = cn(
    'bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6',
    hover && 'hover:bg-gray-800/50 hover:border-gray-700 transition-all duration-300 hover:shadow-xl',
    onClick && 'cursor-pointer',
    className
  );

  return (
    <div className={cardClasses} onClick={onClick}>
      {children}
    </div>
  );
}