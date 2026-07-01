export const CHART_COLORS = {
  emerald: '#10b981',
  teal: '#14b8a6',
  green: '#22c55e',
  amber: '#f59e0b',
  yellow: '#eab308',
  lime: '#84cc16',
  orange: '#f97316',
  rose: '#f43f5e',
} as const;

export const CHART_GRADIENTS = [
  { id: 'gradEmerald', from: '#059669', to: '#34d399' },
  { id: 'gradAmber', from: '#f59e0b', to: '#fbbf24' },
  { id: 'gradTeal', from: '#0d9488', to: '#2dd4bf' },
  { id: 'gradLime', from: '#65a30d', to: '#a3e635' },
  { id: 'gradOrange', from: '#ea580c', to: '#fb923c' },
  { id: 'gradYellow', from: '#ca8a04', to: '#fde047' },
] as const;

export const ROLE_CHART_COLORS: Record<string, string> = {
  'super-admin': CHART_COLORS.emerald,
  registrar: CHART_COLORS.teal,
  faculty: CHART_COLORS.green,
  student: CHART_COLORS.amber,
};

export const DAY_ORDER = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const chartTooltipStyle = {
  contentStyle: {
    borderRadius: '12px',
    border: '1px solid #d1fae5',
    boxShadow: '0 10px 25px -5px rgba(5, 150, 105, 0.12)',
    fontSize: '12px',
    fontWeight: 600,
  },
};
