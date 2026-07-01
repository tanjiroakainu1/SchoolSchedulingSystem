import type { ReactNode, InputHTMLAttributes } from 'react';

interface AuthFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: ReactNode;
  suffix?: ReactNode;
  required?: boolean;
  hint?: string;
}

export function AuthField({ label, icon, suffix, required, hint, className = '', ...props }: AuthFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">
        {label}
        {required && <span className="text-rose-500 ml-0.5">*</span>}
      </label>
      <div className="relative group">
        {icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-500 transition-colors pointer-events-none">
            {icon}
          </div>
        )}
        <input
          className={`auth-input w-full ${icon ? 'pl-10' : 'pl-4'} ${suffix ? 'pr-11' : 'pr-4'} py-3 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 ${className}`}
          {...props}
        />
        {suffix && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">{suffix}</div>
        )}
      </div>
      {hint && <p className="mt-1.5 text-[11px] text-gray-400">{hint}</p>}
    </div>
  );
}

interface AuthSelectProps {
  label: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
}

export function AuthSelect({ label, required, value, onChange, children }: AuthSelectProps) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">
        {label}
        {required && <span className="text-rose-500 ml-0.5">*</span>}
      </label>
      <select
        className="auth-input w-full px-4 py-3 rounded-xl text-sm text-gray-900"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {children}
      </select>
    </div>
  );
}
