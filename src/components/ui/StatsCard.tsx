import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Inbox } from 'lucide-react';

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color?: 'teal' | 'green' | 'amber' | 'accent' | 'red' | 'emerald';
  change?: string;
}

const colors = {
  teal: 'from-teal-500 to-primary-500 bg-teal-50 text-teal-700 ring-teal-100',
  green: 'from-emerald-500 to-teal-500 bg-emerald-50 text-emerald-600 ring-emerald-100',
  amber: 'from-accent-500 to-amber-500 bg-accent-50 text-accent-700 ring-accent-100',
  accent: 'from-accent-400 to-yellow-500 bg-accent-50 text-accent-700 ring-accent-100',
  red: 'from-rose-500 to-red-500 bg-rose-50 text-rose-600 ring-rose-100',
  emerald: 'from-primary-500 to-emerald-500 bg-primary-50 text-primary-700 ring-primary-100',
};

const iconGradients = {
  teal: 'from-teal-500 to-primary-500',
  green: 'from-emerald-500 to-teal-500',
  amber: 'from-accent-500 to-amber-500',
  accent: 'from-accent-400 to-yellow-500',
  red: 'from-rose-500 to-red-500',
  emerald: 'from-primary-500 to-emerald-500',
};

export function StatsCard({ label, value, icon: Icon, color = 'emerald', change }: StatsCardProps) {
  return (
    <div className="group relative bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-sm hover:shadow-lg hover:border-primary-100 transition-all duration-300 overflow-hidden">
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${iconGradients[color]} opacity-80`} />
      <div className="flex items-center justify-between gap-3 pt-1">
        <div className="min-w-0 flex-1">
          <p className="text-xs sm:text-sm text-gray-500 font-semibold truncate">{label}</p>
          <p className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 mt-1 truncate tracking-tight">{value}</p>
          {change && (
            <p className="text-[10px] sm:text-xs text-primary-600 font-medium mt-1">{change}</p>
          )}
        </div>
        <div className={`p-2.5 sm:p-3 rounded-xl ring-1 shrink-0 ${colors[color]} group-hover:scale-105 transition-transform`}>
          <Icon size={20} className="sm:w-[22px] sm:h-[22px]" />
        </div>
      </div>
    </div>
  );
}

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
      <div className="min-w-0">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 leading-tight tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-sm sm:text-base text-gray-500 mt-1.5 leading-relaxed">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0 flex flex-wrap gap-2">{action}</div>}
    </div>
  );
}

interface EmptyStateProps {
  title?: string;
  description: string;
  action?: ReactNode;
  icon?: LucideIcon;
}

export function EmptyState({
  title = 'Nothing here yet',
  description,
  action,
  icon: Icon = Inbox,
}: EmptyStateProps) {
  return (
    <div className="text-center py-10 sm:py-14 px-4">
      <div className="inline-flex p-4 rounded-2xl bg-gray-50 ring-1 ring-gray-100 mb-4">
        <Icon size={28} className="text-gray-300" />
      </div>
      <h3 className="text-base sm:text-lg font-bold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-500 mt-1.5 max-w-sm mx-auto leading-relaxed">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
