import type { ReactNode } from 'react';

interface DataTableProps {
  columns: { key: string; label: string; className?: string }[];
  data: Record<string, ReactNode>[];
  emptyMessage?: string;
}

export function DataTable({ columns, data, emptyMessage = 'No data available' }: DataTableProps) {
  if (data.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 text-sm">{emptyMessage}</div>
    );
  }

  return (
    <>
      {/* Mobile card view */}
      <div className="sm:hidden space-y-3">
        {data.map((row, i) => (
          <div key={i} className="bg-gray-50 rounded-xl p-4 space-y-2.5 border border-gray-100">
            {columns.map((col) => (
              <div key={col.key} className="flex justify-between items-start gap-3 text-sm">
                <span className="text-gray-500 font-medium shrink-0">{col.label}</span>
                <span className="text-gray-800 text-right break-words min-w-0">{row[col.key]}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Desktop table view */}
      <div className="hidden sm:block overflow-x-auto -mx-4 sm:mx-0">
        <div className="inline-block min-w-full align-middle px-4 sm:px-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`text-left py-3 px-3 lg:px-4 font-semibold text-gray-500 text-xs uppercase tracking-wide whitespace-nowrap ${col.className ?? ''}`}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/80 transition-colors">
                  {columns.map((col) => (
                    <td key={col.key} className={`py-3.5 px-3 lg:px-4 text-gray-700 ${col.className ?? ''}`}>
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
}

export function FormField({ label, children, required }: FormFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

export const inputClass =
  'w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm bg-white transition-all focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 placeholder:text-gray-400';

export const selectClass =
  'w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm bg-white transition-all focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500';
