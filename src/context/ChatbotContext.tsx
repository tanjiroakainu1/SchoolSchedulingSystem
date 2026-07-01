import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import type { ChatbotContext } from '../config/chatbotQuickQuestions';
import type { UserRole } from '../types';

interface ChatbotUIContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  context: ChatbotContext;
}

const ChatbotUIContext = createContext<ChatbotUIContextType | null>(null);

function resolveContext(pathname: string, userRole?: UserRole): ChatbotContext {
  if (userRole) return userRole;
  if (pathname === '/login') return 'login';
  return 'guest';
}

export function ChatbotProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  const context = resolveContext(
    location.pathname,
    isAuthenticated ? user?.role : undefined
  );

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  return (
    <ChatbotUIContext.Provider value={{ isOpen, open, close, toggle, context }}>
      {children}
    </ChatbotUIContext.Provider>
  );
}

export function useChatbot() {
  const ctx = useContext(ChatbotUIContext);
  if (!ctx) throw new Error('useChatbot must be used within ChatbotProvider');
  return ctx;
}
