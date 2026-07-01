type BadgeVariant = 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'accent' | 'primary';

const variants: Record<BadgeVariant, string> = {
  neutral: 'bg-gray-100 text-gray-700 ring-gray-200',
  success: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  warning: 'bg-accent-50 text-accent-700 ring-accent-200',
  danger: 'bg-rose-50 text-rose-700 ring-rose-200',
  info: 'bg-teal-50 text-teal-700 ring-teal-200',
  accent: 'bg-accent-50 text-accent-800 ring-accent-200',
  primary: 'bg-primary-50 text-primary-700 ring-primary-200',
};

import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({ children, variant = 'neutral', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full ring-1 ring-inset capitalize ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
