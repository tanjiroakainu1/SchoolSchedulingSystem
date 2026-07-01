import type { ReactNode } from 'react';

interface CardProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  action?: ReactNode;
  hover?: boolean;
}

export function Card({ title, subtitle, children, className = '', action, hover = false }: CardProps) {
  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden ${
        hover ? 'transition-all duration-200 hover:shadow-md hover:border-gray-200 hover:-translate-y-0.5' : ''
      } ${className}`}
    >
      {(title || action) && (
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 px-4 sm:px-6 py-4 border-b border-gray-50">
          <div className="min-w-0">
            {title && <h3 className="text-base sm:text-lg font-bold text-gray-900 truncate">{title}</h3>}
            {subtitle && <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{subtitle}</p>}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      <div className="p-4 sm:p-6">{children}</div>
    </div>
  );
}
