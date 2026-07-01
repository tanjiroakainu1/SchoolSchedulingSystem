import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color?: 'blue' | 'green' | 'amber' | 'purple' | 'red' | 'emerald';
  change?: string;
}

const colors = {
  blue: 'bg-blue-50 text-blue-600 ring-blue-100',
  green: 'bg-green-50 text-green-600 ring-green-100',
  amber: 'bg-amber-50 text-amber-600 ring-amber-100',
  purple: 'bg-purple-50 text-purple-600 ring-purple-100',
  red: 'bg-red-50 text-red-600 ring-red-100',
  emerald: 'bg-emerald-50 text-emerald-600 ring-emerald-100',
};

export function StatsCard({ label, value, icon: Icon, color = 'blue', change }: StatsCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs sm:text-sm text-gray-500 font-medium truncate">{label}</p>
          <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mt-1 truncate">{value}</p>
          {change && <p className="text-[10px] sm:text-xs text-gray-400 mt-1">{change}</p>}
        </div>
        <div className={`p-2.5 sm:p-3 rounded-xl ring-1 shrink-0 ${colors[color]}`}>
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
    <div className="flex flex-col gap-4 mb-5 sm:mb-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">{title}</h1>
          {description && <p className="text-sm sm:text-base text-gray-500 mt-1">{description}</p>}
        </div>
        {action && <div className="shrink-0 flex flex-wrap gap-2">{action}</div>}
      </div>
    </div>
  );
}

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="text-center py-10 sm:py-14 px-4">
      <h3 className="text-base sm:text-lg font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
