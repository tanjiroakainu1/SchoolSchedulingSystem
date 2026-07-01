import type { ReactNode } from 'react';
import { Sparkles } from 'lucide-react';

type ChartAccent = 'purple' | 'blue' | 'green' | 'amber' | 'rose' | 'indigo';

const accentStyles: Record<ChartAccent, string> = {
  purple: 'from-violet-500/20 via-purple-500/10 to-fuchsia-500/5 border-violet-200/60',
  blue: 'from-blue-500/20 via-cyan-500/10 to-sky-500/5 border-blue-200/60',
  green: 'from-emerald-500/20 via-green-500/10 to-teal-500/5 border-emerald-200/60',
  amber: 'from-amber-500/20 via-orange-500/10 to-yellow-500/5 border-amber-200/60',
  rose: 'from-rose-500/20 via-pink-500/10 to-red-500/5 border-rose-200/60',
  indigo: 'from-indigo-500/20 via-blue-500/10 to-violet-500/5 border-indigo-200/60',
};

const dotStyles: Record<ChartAccent, string> = {
  purple: 'bg-violet-500 shadow-violet-500/50',
  blue: 'bg-blue-500 shadow-blue-500/50',
  green: 'bg-emerald-500 shadow-emerald-500/50',
  amber: 'bg-amber-500 shadow-amber-500/50',
  rose: 'bg-rose-500 shadow-rose-500/50',
  indigo: 'bg-indigo-500 shadow-indigo-500/50',
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
  accent = 'indigo',
  className = '',
  height = 280,
}: ChartCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border bg-gradient-to-br ${accentStyles[accent]} bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${className}`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-40 pointer-events-none bg-gradient-to-br from-white/0 to-current" />
      <div className="relative px-4 sm:px-5 pt-4 sm:pt-5 pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`w-2 h-2 rounded-full shadow-lg ${dotStyles[accent]} animate-pulse`} />
              <h3 className="text-sm sm:text-base font-bold text-gray-900 truncate">{title}</h3>
            </div>
            {subtitle && <p className="text-[11px] sm:text-xs text-gray-500 pl-4">{subtitle}</p>}
          </div>
          <Sparkles size={14} className="text-gray-300 shrink-0 mt-0.5" />
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
        <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.45} />
        <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
      </linearGradient>
      <linearGradient id="areaSchedules" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.45} />
        <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
      </linearGradient>
      <linearGradient id="areaConflicts" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.35} />
        <stop offset="100%" stopColor="#f43f5e" stopOpacity={0} />
      </linearGradient>
      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
      <linearGradient id="facultyGradient" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#06b6d4" />
      </linearGradient>
    </defs>
  );
}

export { ChartGradients };
