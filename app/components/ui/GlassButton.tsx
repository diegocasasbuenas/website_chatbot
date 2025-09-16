import { ReactNode, forwardRef, ButtonHTMLAttributes } from 'react';

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: 'rectangular' | 'circular';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: ReactNode;
}

export const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ 
    children, 
    variant = 'rectangular', 
    size = 'md', 
    className = '', 
    icon,
    ...props 
  }, ref) => {
    
    // Definir estilos según variante
    const variantStyles = {
      rectangular: 'rounded-[24px]',
      circular: 'rounded-full aspect-square'
    };

    // Definir tamaños
    const sizeStyles = {
      sm: variant === 'circular' ? 'w-10 h-10' : 'px-4 py-2 text-sm',
      md: variant === 'circular' ? 'w-12 h-12' : 'px-6 py-3 text-base',
      lg: variant === 'circular' ? 'w-16 h-16' : 'px-8 py-4 text-lg'
    };

    const baseStyles = `
      inline-flex items-center justify-center
      font-medium text-white
      transition-all duration-200 ease-out
      hover:scale-105 hover:bg-white/15 hover:shadow-lg hover:shadow-white/10 active:scale-95
      focus:outline-none focus:ring-2 focus:ring-white/30
      disabled:opacity-50 disabled:cursor-not-allowed
      cursor-pointer
      ${variantStyles[variant]}
      ${sizeStyles[size]}
      ${className}
    `;

    const glassStyle = {
      border: '1px solid rgba(255, 255, 255, 0.25)',
      background: 'linear-gradient(91deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.05) 100%)',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.15)',
      backdropFilter: 'blur(12px)',
    };

    return (
      <button
        ref={ref}
        className={baseStyles}
        style={glassStyle}
        {...props}
      >
        {icon && (
          <span className={`${variant === 'rectangular' && children ? 'mr-2' : ''}`}>
            {icon}
          </span>
        )}
        {children}
      </button>
    );
  }
);

GlassButton.displayName = 'GlassButton';