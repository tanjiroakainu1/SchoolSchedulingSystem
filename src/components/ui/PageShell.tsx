import type { ReactNode } from 'react';

interface PageShellProps {
  children: ReactNode;
  className?: string;
}

/** Standard spacing wrapper for all role dashboard pages */
export function PageShell({ children, className = '' }: PageShellProps) {
  return (
    <div className={`space-y-5 sm:space-y-6 animate-fade-in ${className}`}>
      {children}
    </div>
  );
}

export const statsGridClass = 'grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4';
export const contentGridClass = 'grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6';
export const cardGridClass = 'grid grid-cols-1 md:grid-cols-2 gap-4';
