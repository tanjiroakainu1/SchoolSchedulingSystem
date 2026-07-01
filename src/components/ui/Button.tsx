import type { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline' | 'outline-light';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

const variants = {
  primary:
    'bg-primary-600 text-white hover:bg-primary-700 active:scale-[0.98] shadow-md shadow-primary-600/20 hover:shadow-lg hover:shadow-primary-600/25',
  secondary:
    'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 active:scale-[0.98] shadow-sm',
  danger:
    'bg-red-600 text-white hover:bg-red-700 active:scale-[0.98] shadow-md shadow-red-600/20',
  ghost:
    'text-gray-600 hover:bg-gray-100 active:scale-[0.98]',
  outline:
    'border-2 border-primary-200 text-primary-700 bg-primary-50/50 hover:bg-primary-50 active:scale-[0.98]',
  'outline-light':
    'border-2 border-white/30 text-white bg-white/10 hover:bg-white/20 active:scale-[0.98]',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs sm:text-sm rounded-lg',
  md: 'px-4 py-2.5 text-sm rounded-xl',
  lg: 'px-6 py-3.5 text-base rounded-xl',
};

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
