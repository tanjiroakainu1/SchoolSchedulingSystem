export const CHART_COLORS = {
  purple: '#8b5cf6',
  indigo: '#6366f1',
  blue: '#3b82f6',
  cyan: '#06b6d4',
  emerald: '#10b981',
  amber: '#f59e0b',
  rose: '#f43f5e',
  pink: '#ec4899',
  violet: '#7c3aed',
} as const;

export const CHART_GRADIENTS = [
  { id: 'gradPurple', from: '#8b5cf6', to: '#6366f1' },
  { id: 'gradBlue', from: '#3b82f6', to: '#06b6d4' },
  { id: 'gradGreen', from: '#10b981', to: '#34d399' },
  { id: 'gradAmber', from: '#f59e0b', to: '#fbbf24' },
  { id: 'gradRose', from: '#f43f5e', to: '#fb7185' },
  { id: 'gradPink', from: '#ec4899', to: '#a855f7' },
] as const;

export const ROLE_CHART_COLORS: Record<string, string> = {
  'super-admin': CHART_COLORS.purple,
  registrar: CHART_COLORS.blue,
  faculty: CHART_COLORS.emerald,
  student: CHART_COLORS.amber,
};

export const DAY_ORDER = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const chartTooltipStyle = {
  contentStyle: {
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
    fontSize: '12px',
    fontWeight: 600,
  },
};
