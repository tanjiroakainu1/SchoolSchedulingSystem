import type { ReactNode } from 'react';
import { EmptyState } from './StatsCard';

interface DataTableProps {
  columns: { key: string; label: string; className?: string }[];
  data: Record<string, ReactNode>[];
  emptyTitle?: string;
  emptyMessage?: string;
}

export function DataTable({
  columns,
  data,
  emptyTitle = 'No records found',
  emptyMessage = 'There is no data to display yet.',
}: DataTableProps) {
  if (data.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyMessage} />;
  }

  return (
    <>
      <div className="sm:hidden space-y-3">
        {data.map((row, i) => (
          <div
            key={i}
            className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 space-y-2.5 border border-gray-100 shadow-sm"
          >
            {columns.map((col) => (
              <div key={col.key} className="flex justify-between items-start gap-3 text-sm">
                <span className="text-gray-500 font-semibold shrink-0 text-xs uppercase tracking-wide">{col.label}</span>
                <span className="text-gray-800 text-right break-words min-w-0 font-medium">{row[col.key]}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="hidden sm:block overflow-x-auto -mx-4 sm:mx-0">
        <div className="inline-block min-w-full align-middle px-4 sm:px-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-100">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`text-left py-3.5 px-3 lg:px-4 font-bold text-gray-400 text-[11px] uppercase tracking-wider whitespace-nowrap ${col.className ?? ''}`}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.map((row, i) => (
                <tr key={i} className="hover:bg-primary-50/30 transition-colors">
                  {columns.map((col) => (
                    <td key={col.key} className={`py-3.5 px-3 lg:px-4 text-gray-700 font-medium ${col.className ?? ''}`}>
                      {row[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

interface FormFieldProps {
  label: string;
  children: ReactNode;
  required?: boolean;
  hint?: string;
}

export function FormField({ label, children, required, hint }: FormFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">
        {label}
        {required && <span className="text-rose-500 ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-[11px] text-gray-400">{hint}</p>}
    </div>
  );
}

export const inputClass =
  'w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50/50 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500/25 focus:border-primary-500 focus:bg-white placeholder:text-gray-400 hover:border-gray-300';

export const selectClass =
  'w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50/50 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500/25 focus:border-primary-500 focus:bg-white hover:border-gray-300';
