import type { ReactNode } from 'react';
import { Sparkles } from 'lucide-react';

type ChartAccent = 'primary' | 'teal' | 'green' | 'amber' | 'rose' | 'accent';

const accentStyles: Record<ChartAccent, string> = {
  primary: 'from-primary-500/20 via-emerald-500/10 to-primary-500/5 border-primary-200/60',
  teal: 'from-teal-500/20 via-emerald-500/10 to-teal-500/5 border-teal-200/60',
  green: 'from-emerald-500/20 via-green-500/10 to-teal-500/5 border-emerald-200/60',
  amber: 'from-accent-500/20 via-yellow-500/10 to-accent-500/5 border-accent-200/60',
  rose: 'from-rose-500/20 via-pink-500/10 to-red-500/5 border-rose-200/60',
  accent: 'from-accent-500/20 via-amber-500/10 to-yellow-500/5 border-accent-200/60',
};

const dotStyles: Record<ChartAccent, string> = {
  primary: 'bg-primary-500 shadow-primary-500/50',
  teal: 'bg-teal-500 shadow-teal-500/50',
  green: 'bg-emerald-500 shadow-emerald-500/50',
  amber: 'bg-accent-500 shadow-accent-500/50',
  rose: 'bg-rose-500 shadow-rose-500/50',
  accent: 'bg-accent-400 shadow-accent-400/50',
};

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  accent?: ChartAccent;
  className?: string;
  height?: number;
}

export function ChartCard({
  title,
  subtitle,
  children,
  accent = 'primary',
  className = '',
  height = 280,
}: ChartCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border bg-gradient-to-br ${accentStyles[accent]} bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${className}`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-40 pointer-events-none bg-gradient-to-br from-primary-200/0 to-accent-200/30" />
      <div className="relative px-4 sm:px-5 pt-4 sm:pt-5 pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`w-2 h-2 rounded-full shadow-lg ${dotStyles[accent]} animate-pulse`} />
              <h3 className="text-sm sm:text-base font-bold text-gray-900 truncate">{title}</h3>
            </div>
            {subtitle && <p className="text-[11px] sm:text-xs text-gray-500 pl-4">{subtitle}</p>}
          </div>
          <Sparkles size={14} className="text-accent-400 shrink-0 mt-0.5" />
        </div>
      </div>
      <div className="relative px-2 sm:px-3 pb-3 sm:pb-4" style={{ height }}>
        {children}
      </div>
    </div>
  );
}

function ChartGradients() {
  return (
    <defs>
      <linearGradient id="areaUsers" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#10b981" stopOpacity={0.45} />
        <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
      </linearGradient>
      <linearGradient id="areaSchedules" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.45} />
        <stop offset="100%" stopColor="#14b8a6" stopOpacity={0} />
      </linearGradient>
      <linearGradient id="areaConflicts" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.35} />
        <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
      </linearGradient>
      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#059669" />
        <stop offset="100%" stopColor="#10b981" />
      </linearGradient>
      <linearGradient id="facultyGradient" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#f59e0b" />
      </linearGradient>
    </defs>
  );
}

export { ChartGradients };
