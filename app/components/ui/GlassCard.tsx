import { ReactNode, forwardRef, HTMLAttributes } from 'react';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ 
    children, 
    className = '', 
    padding = 'md',
    hover = true,
    ...props 
  }, ref) => {
    
    // Definir padding
    const paddingStyles = {
      none: '',
      sm: 'p-3',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-12'
    };

    const baseStyles = `
      rounded-[24px]
      transition-all duration-300
      ${paddingStyles[padding]}
      ${hover ? 'hover:bg-white/5 hover:border-white/40 hover:shadow-lg hover:shadow-black/20' : ''}
      ${className}
    `;

    const glassStyle = {
      border: '1px solid rgba(255, 255, 255, 0.25)',
      background: 'linear-gradient(91deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.05) 100%)',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.15)',
      backdropFilter: 'blur(12px)',
    };

    return (
      <div
        ref={ref}
        className={baseStyles}
        style={glassStyle}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = 'GlassCard';