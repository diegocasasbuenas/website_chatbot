import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface GlassInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

interface GlassTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
  ({ 
    className = '', 
    label,
    error,
    fullWidth = false,
    ...props 
  }, ref) => {
    
    const baseStyles = `
      rounded-[24px]
      px-6 py-4
      text-white placeholder-white/60
      transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-white/30
      disabled:opacity-50 disabled:cursor-not-allowed
      border bg-glass shadow-glass backdrop-blur-glass
      ${fullWidth ? 'w-full' : ''}
      ${error ? 'border-red-400/50' : 'border-glass'}
      ${className}
    `;

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label className="block text-sm font-medium text-white/80 mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={baseStyles}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

export const GlassTextarea = forwardRef<HTMLTextAreaElement, GlassTextareaProps>(
  ({ 
    className = '', 
    label,
    error,
    fullWidth = false,
    rows = 4,
    ...props 
  }, ref) => {
    
    const baseStyles = `
      rounded-[24px]
      px-6 py-4
      text-white placeholder-white/60
      transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-white/30
      disabled:opacity-50 disabled:cursor-not-allowed
      resize-none
      border bg-glass shadow-glass backdrop-blur-glass
      ${fullWidth ? 'w-full' : ''}
      ${error ? 'border-red-400/50' : 'border-glass'}
      ${className}
    `;

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label className="block text-sm font-medium text-white/80 mb-2">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          rows={rows}
          className={baseStyles}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

GlassInput.displayName = 'GlassInput';
GlassTextarea.displayName = 'GlassTextarea';