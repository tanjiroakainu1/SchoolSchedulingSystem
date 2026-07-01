import type { ReactNode } from 'react';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  action?: ReactNode;
  light?: boolean;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  action,
  light = false,
}: SectionHeaderProps) {
  const centered = align === 'center';

  return (
    <div
      className={`mb-10 sm:mb-14 flex flex-col gap-4 ${
        centered ? 'text-center items-center max-w-2xl mx-auto' : 'text-left items-start max-w-3xl'
      } ${action ? 'sm:flex-row sm:items-end sm:justify-between sm:max-w-none sm:text-left' : ''}`}
    >
      <div className={centered && !action ? 'mx-auto' : ''}>
        <p
          className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] mb-3 ${
            light ? 'text-primary-300' : 'text-primary-600'
          }`}
        >
          <span className={`w-8 h-px ${light ? 'bg-primary-400/50' : 'bg-primary-300'}`} />
          {eyebrow}
          <span className={`w-8 h-px ${light ? 'bg-primary-400/50' : 'bg-primary-300'}`} />
        </p>
        <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight ${light ? 'text-white' : 'text-gray-900'}`}>
          {title}
        </h2>
        {description && (
          <p className={`mt-3 text-sm sm:text-base leading-relaxed ${light ? 'text-primary-100/75' : 'text-gray-500'}`}>
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
