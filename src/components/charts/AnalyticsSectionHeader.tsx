import { BarChart3 } from 'lucide-react';

interface AnalyticsSectionHeaderProps {
  title?: string;
  description?: string;
}

export function AnalyticsSectionHeader({
  title = 'Live Analytics',
  description = 'Real-time charts powered by your system data',
}: AnalyticsSectionHeaderProps) {
  return (
    <div className="flex items-center gap-3 mb-4 sm:mb-5">
      <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/25">
        <BarChart3 size={18} />
      </div>
      <div>
        <h2 className="text-base sm:text-lg font-bold text-gray-900">{title}</h2>
        <p className="text-xs sm:text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}
