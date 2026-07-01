import { Code2, Heart, Sparkles, Terminal } from 'lucide-react';
import { DEVELOPER, SITE } from '../../config/site';

type DeveloperCreditVariant =
  | 'footer'
  | 'footer-dark'
  | 'sidebar'
  | 'sidebar-collapsed'
  | 'card'
  | 'badge'
  | 'inline'
  | 'hero'
  | 'dark';

interface DeveloperCreditProps {
  variant?: DeveloperCreditVariant;
  className?: string;
}

export function DeveloperCredit({ variant = 'footer', className = '' }: DeveloperCreditProps) {
  if (variant === 'badge') {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary-50 to-accent-50 border border-primary-100/80 shadow-sm ${className}`}>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500" />
        </span>
        <Code2 size={12} className="text-primary-600" />
        <span className="text-[11px] font-semibold text-gray-600">
          Built by <span className="dev-name text-primary-700">{DEVELOPER.name}</span>
        </span>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <p className={`text-xs text-gray-500 ${className}`}>
        Developed by{' '}
        <span className="dev-name font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">
          {DEVELOPER.name}
        </span>
        <span className="text-gray-400"> · {DEVELOPER.title}</span>
      </p>
    );
  }

  if (variant === 'hero') {
    return (
      <div className={`inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 ${className}`}>
        <div className="relative">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-400 to-accent-500 blur-lg opacity-40 animate-pulse" />
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-primary-500 via-accent-500 to-accent-600 flex items-center justify-center text-white font-extrabold text-lg sm:text-xl shadow-xl ring-2 ring-white/20">
            {DEVELOPER.initials}
          </div>
          <Sparkles size={14} className="absolute -top-1 -right-1 text-amber-300" />
        </div>
        <div className="text-center sm:text-left">
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-primary-300 mb-0.5">
            {DEVELOPER.role}
          </p>
          <p className="text-xl sm:text-2xl font-extrabold text-white dev-name-glow">
            {DEVELOPER.name}
          </p>
          <p className="text-sm text-primary-200/80 mt-0.5">{DEVELOPER.title}</p>
          <p className="text-xs text-primary-300/60 mt-1 flex items-center justify-center sm:justify-start gap-1">
            <Terminal size={11} /> {DEVELOPER.stack}
          </p>
        </div>
      </div>
    );
  }

  if (variant === 'dark') {
    return (
      <div className={`text-center ${className}`}>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 ring-1 ring-white/10 backdrop-blur-sm">
          <Code2 size={14} className="text-primary-300" />
          <span className="text-xs text-primary-200/80">
            {DEVELOPER.role}: <span className="font-bold text-white">{DEVELOPER.name}</span>
          </span>
        </div>
      </div>
    );
  }

  if (variant === 'sidebar') {
    return (
      <div className={`mx-3 mb-2 p-2.5 rounded-xl bg-gradient-to-br from-gray-50 to-primary-50/50 border border-gray-100 ${className}`}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0 shadow-md">
            {DEVELOPER.initials}
          </div>
          <div className="min-w-0">
            <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">{DEVELOPER.role}</p>
            <p className="text-xs font-bold text-gray-800 truncate dev-name">{DEVELOPER.name}</p>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'sidebar-collapsed') {
    return (
      <div className={`flex justify-center mb-2 ${className}`} title={`${DEVELOPER.role}: ${DEVELOPER.name}`}>
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-600 flex items-center justify-center text-[10px] font-bold text-white shadow-md ring-2 ring-primary-100">
          {DEVELOPER.initials}
        </div>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-950 via-primary-900 to-accent-950 p-6 sm:p-10 text-white ${className}`}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-500/20 rounded-full blur-3xl" />
          <div className="absolute inset-0 dev-grid opacity-30" />
        </div>
        <div className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <DeveloperCredit variant="hero" />
          <div className="flex-1 text-center lg:text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 ring-1 ring-white/20 text-xs font-medium text-primary-200">
              <Heart size={12} className="text-rose-400 fill-rose-400" />
              {DEVELOPER.tagline}
            </div>
            <p className="text-primary-100/80 text-sm sm:text-base leading-relaxed max-w-xl">
              Every pixel, every schedule, every role dashboard — designed and engineered by{' '}
              <strong className="text-white">{DEVELOPER.name}</strong> to make academic scheduling
              beautiful, intuitive, and powerful for everyone.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-2">
              {['React', 'TypeScript', 'Tailwind', 'Vite', 'Scheduly AI'].map((tech) => (
                <span key={tech} className="px-3 py-1 rounded-lg bg-white/10 text-xs font-semibold text-primary-100 ring-1 ring-white/10">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // footer (default)
  const isDark = variant === 'footer-dark';
  return (
    <div className={`flex flex-col items-center gap-3 pt-4 border-t ${isDark ? 'border-white/10' : 'border-gray-200/80'} ${className}`}>
      <div className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl ${isDark ? 'bg-white/5 ring-1 ring-white/10' : 'bg-gradient-to-r from-primary-50/80 to-accent-50/80 ring-1 ring-primary-100/50'}`}>
        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-600 flex items-center justify-center text-xs font-bold text-white shadow-lg ${isDark ? 'shadow-primary-900/50' : 'shadow-primary-500/25'}`}>
          {DEVELOPER.initials}
        </div>
        <div className="text-left">
          <p className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-primary-300' : 'text-primary-600'}`}>
            {DEVELOPER.role}
          </p>
          <p className={`text-sm font-bold dev-name ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {DEVELOPER.name}
          </p>
          <p className={`text-[10px] ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{DEVELOPER.title}</p>
        </div>
        <Code2 size={18} className={isDark ? 'text-primary-400 ml-1' : 'text-primary-400 ml-1'} />
      </div>
      <p className={`text-center text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
        © {new Date().getFullYear()} {SITE.name} — {SITE.description}
      </p>
    </div>
  );
}
