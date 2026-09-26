import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = '',
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

    const sizeStyles = {
      sm: 'text-xs px-3.5 py-2 gap-1.5',
      md: 'text-sm px-5 py-2.5 gap-2',
      lg: 'text-base px-6 py-3.5 gap-2.5',
    };

    const variantStyles = {
      primary:
        'bg-[#1E3A8A] hover:bg-[#17245F] text-white focus:ring-[#1E3A8A] shadow-sm hover:shadow-md',
      secondary:
        'border border-[#1E3A8A] text-[#1E3A8A] bg-transparent hover:bg-[#EAF0FF] focus:ring-[#1E3A8A]',
      accent:
        'bg-[#F59E0B] hover:bg-[#D97706] text-white focus:ring-[#F59E0B] shadow-sm hover:shadow-md',
      outline:
        'border border-[#E5E7EB] bg-white text-[#172033] hover:bg-[#F7F9FC] hover:border-[#CBD5E1] focus:ring-gray-300',
      ghost:
        'text-[#667085] hover:text-[#172033] hover:bg-black/5 focus:ring-gray-200',
      danger:
        'bg-[#DC2626] hover:bg-[#B91C1C] text-white focus:ring-[#DC2626]',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current" />
        ) : (
          leftIcon
        )}
        <span>{children}</span>
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
