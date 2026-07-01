import { useNavigate } from 'react-router-dom';
import { LogOut, Bell, Menu, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAppData } from '../../context/AppDataContext';
import { useSidebar } from '../../context/SidebarContext';
import { getRoleConfig } from '../../config/roles';
import { useMediaQuery } from '../../hooks/useMediaQuery';

export function RoleHeader() {
  const { user, logout } = useAuth();
  const { notifications, setNotifications } = useAppData();
  const { isOpen, toggle, toggleCollapse } = useSidebar();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  const roleConfig = user ? getRoleConfig(user.role) : null;
  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleMenuClick = () => {
    if (isDesktop) {
      toggleCollapse();
    } else {
      toggle();
    }
  };

  return (
    <header className="glass border-b border-gray-200/80 sticky top-0 z-20 shrink-0">
      <div className="px-3 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2">
          {/* Left: Hamburger + page context */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={handleMenuClick}
              className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all active:scale-95 lg:hover:bg-primary-50 lg:hover:text-primary-700"
              aria-label={!isDesktop && isOpen ? 'Close sidebar' : 'Toggle sidebar'}
              aria-expanded={!isDesktop ? isOpen : undefined}
            >
              {!isDesktop && isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <div className="min-w-0 lg:hidden">
              <p className="text-sm font-bold text-gray-900 truncate">School Scheduling</p>
              {roleConfig && (
                <p className={`text-[10px] font-medium truncate ${roleConfig.color}`}>{roleConfig.label}</p>
              )}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2.5 rounded-xl hover:bg-gray-100 text-gray-600 transition-colors"
                aria-label="Notifications"
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 min-w-[16px] h-4 bg-red-500 text-white text-[9px] rounded-full flex items-center justify-center px-1 font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] max-w-80 bg-white rounded-2xl border border-gray-100 shadow-xl z-50 animate-fade-in">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50">
                    <span className="font-bold text-sm">Notifications</span>
                    <button onClick={markAllRead} className="text-xs text-primary-600 hover:underline font-semibold">
                      Mark all read
                    </button>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="text-sm text-gray-500 p-4 text-center">No notifications</p>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`px-4 py-3 border-b border-gray-50 last:border-0 ${!n.read ? 'bg-primary-50/40' : ''}`}
                        >
                          <p className="text-sm font-semibold text-gray-900">{n.title}</p>
                          <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-gray-200">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${roleConfig?.bgColor} ${roleConfig?.color}`}>
                {user?.name.charAt(0)}
              </div>
              <div className="text-right hidden md:block min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate max-w-[140px]">{user?.name}</p>
                <p className="text-[10px] text-gray-400 truncate max-w-[140px]">{user?.email}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-2.5 rounded-xl hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors sm:hidden"
              title="Logout"
              aria-label="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
