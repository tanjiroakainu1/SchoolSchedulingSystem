import { useEffect } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col gap-2">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(toast.id), 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  const icons = {
    success: <CheckCircle size={18} className="text-green-500" />,
    error: <XCircle size={18} className="text-red-500" />,
    info: <Info size={18} className="text-primary-500" />,
  };

  const bg = {
    success: 'border-green-200 bg-green-50',
    error: 'border-red-200 bg-red-50',
    info: 'border-primary-200 bg-primary-50',
  };

  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg min-w-[280px] ${bg[toast.type]}`}>
      {icons[toast.type]}
      <span className="text-sm text-gray-800 flex-1">{toast.message}</span>
      <button onClick={() => onRemove(toast.id)} className="text-gray-400 hover:text-gray-600">
        <X size={16} />
      </button>
    </div>
  );
}
