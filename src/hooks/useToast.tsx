import { useState, useCallback } from 'react';
import { ToastContainer, type Toast } from '../components/ui/Toast';

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: Toast['type'] = 'success') => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const ToastHost = useCallback(
    () => <ToastContainer toasts={toasts} onRemove={removeToast} />,
    [toasts, removeToast]
  );

  return { showToast, ToastHost };
}
