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
      border border-glass bg-glass shadow-glass backdrop-blur-glass
      ${paddingStyles[padding]}
      ${hover ? 'hover:bg-white/5 hover:border-white/40 hover:shadow-lg hover:shadow-black/20' : ''}
      ${className}
    `;

    return (
      <div
        ref={ref}
        className={baseStyles}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = 'GlassCard';