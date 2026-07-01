import type { ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
};

export function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div
        className={`relative bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl w-full ${sizes[size]} max-h-[92dvh] sm:max-h-[90vh] overflow-hidden animate-slide-up ring-1 ring-gray-100`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50/80 to-white sticky top-0 z-10">
          <h2 className="text-base sm:text-lg font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(92dvh-4rem)]">{children}</div>
      </div>
    </div>
  );
}
