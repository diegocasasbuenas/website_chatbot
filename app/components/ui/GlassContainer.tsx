import { ReactNode, forwardRef } from 'react';

interface GlassContainerProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'aside';
  style?: React.CSSProperties;
}

export const GlassContainer = forwardRef<HTMLDivElement, GlassContainerProps>(
  ({ children, className = '', as: Component = 'div', style, ...props }, ref) => {
    const glassStyles = {
      border: '1px solid rgba(255, 255, 255, 0.25)',
      background: 'linear-gradient(91deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.05) 100%)',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.15)',
      backdropFilter: 'blur(12px)',
      ...style,
    };

    return (
      <Component
        ref={ref}
        className={`glass-effect ${className}`}
        style={glassStyles}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

GlassContainer.displayName = 'GlassContainer';