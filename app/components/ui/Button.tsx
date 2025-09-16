/**
 * Componente Button reutilizable
 */

import { cn } from "@/app/lib/utils";
import { styleConstants } from "@/app/constants/theme";
import type { VariantProps, InteractiveProps } from "@/app/types";

interface ButtonProps extends VariantProps, InteractiveProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  target?: string;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  className,
  href,
  target,
  type = 'button',
  ...props
}: ButtonProps) {
  
  const baseClasses = styleConstants.button.base;
  const variantClasses = styleConstants.button[variant as keyof typeof styleConstants.button] || styleConstants.button.primary;
  const sizeClasses = styleConstants.button.sizes[size];
  
  const buttonClasses = cn(
    baseClasses,
    variantClasses,
    sizeClasses,
    disabled && 'opacity-50 cursor-not-allowed',
    loading && 'cursor-wait',
    className
  );

  const handleClick = () => {
    if (!disabled && !loading && onClick) {
      onClick();
    }
  };

  if (href) {
    return (
      <a
        href={href}
        target={target}
        className={buttonClasses}
        onClick={handleClick}
      >
        {loading && <span className="mr-2">⏳</span>}
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={handleClick}
      className={buttonClasses}
    >
      {loading && <span className="mr-2">⏳</span>}
      {children}
    </button>
  );
}