import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Bot,
  X,
  Send,
  Sparkles,
  Minimize2,
  Maximize2,
  Trash2,
  Zap,
  Globe,
  BookOpen,
} from 'lucide-react';
import { useChatbot } from '../../context/ChatbotContext';
import { useAuth } from '../../context/AuthContext';
import { getQuickQuestions, getContextLabel } from '../../config/chatbotQuickQuestions';
import { generateChatResponse, type ChatMessage } from '../../services/chatbotEngine';
import { getRoleConfig } from '../../config/roles';
import { DEVELOPER } from '../../config/site';
import type { ChatbotContext } from '../../config/chatbotQuickQuestions';

function formatContent(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-bold text-gray-900">{part.slice(2, -2)}</strong>;
    }
    return part.split('\n').map((line, j) => (
      <span key={`${i}-${j}`}>
        {j > 0 && <br />}
        {line}
      </span>
    ));
  });
}

const WELCOME_MESSAGES: Record<ChatbotContext, string> = {
  guest: "Welcome! I'm **Scheduly AI** 🎓✨ Ask me about the School Scheduling System, how to register, roles, or anything about education!",
  login: "Hey there! Ready to sign in? I can help with **demo accounts**, passwords, quick access, or registration steps!",
  'super-admin': "Hello, Admin! 🛡️ I have full system knowledge — users, schedules, reports, backups. Ask anything!",
  registrar: "Hi Registrar! 📋 I can help with schedules, instructor/room assignments, conflicts, and timetable reports.",
  faculty: "Hello, Professor! 👨‍🏫 Ask about your teaching schedule, subjects, class lists, or report conflicts.",
  student: "Hey student! 🎓 I know your schedule, subjects, exams, and instructors. Ask me anything!",
};

export function FloatingChatbot() {
  const { isOpen, toggle, close, context } = useChatbot();
  const { user } = useAuth();
  const [minimized, setMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [showQuickQuestions, setShowQuickQuestions] = useState(true);
  const [questionFilter, setQuestionFilter] = useState<'all' | 'system' | 'role' | 'general'>('all');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickQuestions = getQuickQuestions(context);
  const filteredQuestions = questionFilter === 'all'
    ? quickQuestions
    : quickQuestions.filter((q) => q.category === questionFilter);
  const roleConfig = context !== 'guest' && context !== 'login' ? getRoleConfig(context) : null;
  const contextLabel = getContextLabel(context);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing, scrollToBottom]);

  useEffect(() => {
    if (isOpen && !minimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, minimized]);

  // Reset welcome when context changes
  useEffect(() => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: WELCOME_MESSAGES[context],
        timestamp: new Date().toISOString(),
      },
    ]);
    setShowQuickQuestions(true);
    setQuestionFilter('all');
  }, [context]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || typing) return;

      const userMsg: ChatMessage = {
        id: `u-${Date.now()}`,
        role: 'user',
        content: trimmed,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput('');
      setShowQuickQuestions(false);
      setTyping(true);

      // Simulate AI thinking delay
      await new Promise((r) => setTimeout(r, 600 + Math.random() * 800));

      const response = generateChatResponse(trimmed, {
        context,
        userName: user?.name,
        userEmail: user?.email,
      });

      const botMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, botMsg]);
      setTyping(false);
    },
    [typing, context, user]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'assistant',
        content: WELCOME_MESSAGES[context],
        timestamp: new Date().toISOString(),
      },
    ]);
    setShowQuickQuestions(true);
    setQuestionFilter('all');
  };

  if (!isOpen) {
    return (
      <button
        onClick={toggle}
        className="fixed bottom-5 right-5 z-[100] group"
        aria-label="Open AI Chatbot"
      >
        {/* Pulse rings */}
        <span className="absolute inset-0 rounded-full bg-primary-500/30 animate-ping" />
        <span className="absolute inset-0 rounded-full bg-primary-500/20 animate-pulse" />

        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-primary-500 via-accent-500 to-accent-600 shadow-2xl shadow-primary-600/40 flex items-center justify-center transition-transform group-hover:scale-110 group-active:scale-95 ring-4 ring-white">
          <Bot size={28} className="text-white" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
            <Sparkles size={10} className="text-white" />
          </span>
        </div>

        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 hidden sm:group-hover:block whitespace-nowrap bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg">
          Ask Scheduly AI ✨
        </span>
      </button>
    );
  }

  return (
    <div
      className={`fixed z-[100] flex flex-col bg-white shadow-2xl border border-gray-200/80 overflow-hidden transition-all duration-300 ${
        minimized
          ? 'bottom-5 right-5 w-72 h-14 rounded-2xl'
          : 'bottom-0 right-0 sm:bottom-5 sm:right-5 w-full sm:w-[420px] h-[100dvh] sm:h-[640px] sm:max-h-[88dvh] rounded-none sm:rounded-3xl'
      }`}
    >
      {/* Header */}
      <div className="relative shrink-0 bg-gradient-to-r from-primary-600 via-accent-600 to-accent-600 px-4 py-3 flex items-center gap-3">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMS41Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
        <div className="relative flex items-center gap-3 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center shrink-0 ring-2 ring-white/30">
            <Bot size={22} className="text-white" />
          </div>
          {!minimized && (
            <div className="min-w-0">
              <p className="text-white font-bold text-sm leading-tight flex items-center gap-1.5">
                Scheduly AI <Sparkles size={12} className="text-yellow-300" />
              </p>
              <p className="text-primary-200 text-[11px] truncate">
                {contextLabel} mode · System + World knowledge
              </p>
            </div>
          )}
        </div>
        <div className="relative flex items-center gap-1 shrink-0">
          {!minimized && (
            <button onClick={clearChat} className="p-1.5 rounded-lg hover:bg-white/20 text-white/80 transition-colors" title="Clear chat">
              <Trash2 size={16} />
            </button>
          )}
          <button
            onClick={() => setMinimized(!minimized)}
            className="p-1.5 rounded-lg hover:bg-white/20 text-white/80 transition-colors"
            aria-label={minimized ? 'Expand' : 'Minimize'}
          >
            {minimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
          </button>
          <button onClick={close} className="p-1.5 rounded-lg hover:bg-white/20 text-white/80 transition-colors" aria-label="Close">
            <X size={16} />
          </button>
        </div>
      </div>

      {!minimized && (
        <>
          {/* Quick questions */}
          {showQuickQuestions && (
            <div className="shrink-0 border-b border-gray-100 bg-gradient-to-b from-gray-50 to-white p-3">
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Zap size={12} className="text-amber-500 shrink-0" />
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider truncate">
                    Quick Questions — {contextLabel} ({quickQuestions.length})
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowQuickQuestions(false)}
                  className="text-[10px] text-gray-400 hover:text-gray-600 shrink-0"
                >
                  Hide
                </button>
              </div>

              {/* Category filters */}
              <div className="flex gap-1 mb-2 overflow-x-auto pb-0.5">
                {([
                  { key: 'all' as const, label: 'All', count: quickQuestions.length },
                  { key: 'system' as const, label: 'System', count: quickQuestions.filter((q) => q.category === 'system').length },
                  { key: 'role' as const, label: 'Role', count: quickQuestions.filter((q) => q.category === 'role').length },
                  { key: 'general' as const, label: 'World', count: quickQuestions.filter((q) => q.category === 'general').length },
                ]).map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setQuestionFilter(tab.key)}
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap transition-all ${
                      questionFilter === tab.key
                        ? 'bg-primary-600 text-white shadow-sm'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {tab.label} ({tab.count})
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5 max-h-[140px] sm:max-h-[160px] overflow-y-auto pr-1">
                {filteredQuestions.map((q) => (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => sendMessage(q.question)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all hover:scale-105 active:scale-95 border ${
                      q.category === 'general'
                        ? 'bg-accent-50 text-accent-700 border-accent-100 hover:bg-accent-100'
                        : q.category === 'role'
                          ? `${roleConfig?.bgColor ?? 'bg-primary-50'} ${roleConfig?.color ?? 'text-primary-700'} ${roleConfig?.borderColor ?? 'border-primary-100'}`
                          : 'bg-primary-50 text-primary-700 border-primary-100 hover:bg-primary-100'
                    }`}
                  >
                    {q.category === 'general' ? <Globe size={10} /> : q.category === 'role' ? <BookOpen size={10} /> : <Zap size={10} />}
                    {q.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {!showQuickQuestions && (
            <button
              type="button"
              onClick={() => setShowQuickQuestions(true)}
              className="shrink-0 px-3 py-2 text-xs font-semibold text-primary-600 bg-primary-50 border-b border-primary-100 hover:bg-primary-100 transition-colors"
            >
              Show {quickQuestions.length} quick questions
            </button>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-white to-gray-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <Bot size={14} className="text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-br from-primary-600 to-accent-500 text-white rounded-br-md shadow-md'
                      : 'bg-white text-gray-700 border border-gray-100 rounded-bl-md shadow-sm'
                  }`}
                >
                  {msg.role === 'assistant' ? formatContent(msg.content) : msg.content}
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shrink-0">
                  <Bot size={14} className="text-white" />
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-accent-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="shrink-0 p-3 border-t border-gray-100 bg-white">
            <div className="flex gap-2 items-center">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about the system or anything..."
                className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all"
                disabled={typing}
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                className="p-2.5 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 text-white shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
                aria-label="Send"
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-[10px] text-gray-400 text-center mt-2">
              Scheduly AI · Built by <span className="font-semibold text-primary-600">{DEVELOPER.name}</span>
            </p>
          </form>
        </>
      )}
    </div>
  );
}
