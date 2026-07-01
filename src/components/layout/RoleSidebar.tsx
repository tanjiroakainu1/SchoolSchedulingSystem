import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Settings,
  Calendar,
  CalendarRange,
  FileText,
  Database,
  CalendarPlus,
  UserCheck,
  Building,
  Layers,
  AlertTriangle,
  FileSpreadsheet,
  BookOpen,
  MapPin,
  AlertCircle,
  GraduationCap,
  ClipboardList,
  Printer,
  LogOut,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAppData } from '../../context/AppDataContext';
import { useSidebar } from '../../context/SidebarContext';
import { getRoleConfig, roleConfigs, rolePaths } from '../../config/roles';
import { DeveloperCredit } from '../ui/DeveloperCredit';
import type { NavItem, UserRole } from '../../types';

const iconMap: Record<string, LucideIcon> = {
  'layout-dashboard': LayoutDashboard,
  users: Users,
  settings: Settings,
  calendar: Calendar,
  'calendar-range': CalendarRange,
  'file-text': FileText,
  database: Database,
  'calendar-plus': CalendarPlus,
  'user-check': UserCheck,
  building: Building,
  layers: Layers,
  'alert-triangle': AlertTriangle,
  'file-spreadsheet': FileSpreadsheet,
  'book-open': BookOpen,
  'map-pin': MapPin,
  'alert-circle': AlertCircle,
  'graduation-cap': GraduationCap,
  'clipboard-list': ClipboardList,
  printer: Printer,
};

interface RoleSidebarProps {
  navItems: NavItem[];
  basePath: string;
}

export function RoleSidebar({ navItems, basePath }: RoleSidebarProps) {
  const { user, logout, switchToRole } = useAuth();
  const { users } = useAppData();
  const { isOpen, isCollapsed, close, toggleCollapse } = useSidebar();
  const navigate = useNavigate();

  const roleConfig = user ? getRoleConfig(user.role) : null;

  const handleLogout = () => {
    close();
    logout();
    navigate('/');
  };

  const handleRoleSwitch = (role: UserRole) => {
    switchToRole(role);
    navigate(rolePaths[role]);
    close();
  };

  const getIcon = (iconName?: string) => {
    const Icon = iconName ? iconMap[iconName] ?? LayoutDashboard : LayoutDashboard;
    return Icon;
  };

  const sidebarContent = (
    <>
      {/* Brand */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-gray-100 ${isCollapsed ? 'justify-center px-2' : ''}`}>
        <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl shadow-md shadow-primary-600/20 shrink-0">
          <GraduationCap className="text-white" size={20} />
        </div>
        {!isCollapsed && (
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-gray-900 leading-tight truncate">School Scheduling</p>
            {roleConfig && (
              <p className={`text-xs font-medium truncate ${roleConfig.color}`}>{roleConfig.label}</p>
            )}
          </div>
        )}
        {!isCollapsed && (
          <button
            onClick={toggleCollapse}
            className="hidden lg:flex p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors shrink-0"
            aria-label="Collapse sidebar"
          >
            <ChevronLeft size={18} />
          </button>
        )}
      </div>

      {/* User card */}
      {user && !isCollapsed && (
        <div className="mx-3 mt-4 p-3 rounded-xl bg-gray-50 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${roleConfig?.bgColor} ${roleConfig?.color}`}>
              {user.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
              <p className="text-[11px] text-gray-400 truncate">{user.email}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {!isCollapsed && (
          <p className="px-3 mb-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Menu</p>
        )}
        {navItems.map((item) => {
          const Icon = getIcon(item.icon);
          return (
            <NavLink
              key={item.path}
              to={`${basePath}${item.path}`}
              end={item.path === '' || item.path === '/'}
              onClick={close}
              title={isCollapsed ? item.label : undefined}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isCollapsed ? 'justify-center' : ''
                } ${
                  isActive
                    ? 'bg-primary-600 text-white shadow-md shadow-primary-600/25'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`
              }
            >
              <Icon size={18} className="shrink-0" />
              {!isCollapsed && <span className="truncate">{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Quick access roles */}
      <div className="px-3 py-4 border-t border-gray-100">
        {!isCollapsed && (
          <p className="px-3 mb-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Quick Access</p>
        )}
        <div className={`space-y-1 ${isCollapsed ? 'flex flex-col items-center' : ''}`}>
          {roleConfigs.map((role) => {
            const Icon = role.icon;
            const isActive = user?.role === role.value;
            const demoUser = users.find((u) => u.role === role.value);
            return (
              <button
                key={role.value}
                onClick={() => handleRoleSwitch(role.value)}
                title={demoUser ? `${demoUser.name} — ${demoUser.email}` : role.label}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border ${
                  isCollapsed ? 'justify-center w-10 h-10 p-0' : ''
                } ${
                  isActive
                    ? `${role.bgColor} ${role.color} ${role.borderColor}`
                    : 'bg-white text-gray-600 border-gray-100 hover:bg-gray-50'
                }`}
              >
                <Icon size={16} className="shrink-0" />
                {!isCollapsed && <span className="truncate">{role.shortLabel}</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="px-0 py-3 border-t border-gray-100 space-y-1">
        {isCollapsed ? (
          <DeveloperCredit variant="sidebar-collapsed" />
        ) : (
          <DeveloperCredit variant="sidebar" />
        )}
        {isCollapsed && (
          <button
            onClick={toggleCollapse}
            className="hidden lg:flex w-full items-center justify-center p-2.5 rounded-xl hover:bg-gray-100 text-gray-500 transition-colors"
            aria-label="Expand sidebar"
          >
            <ChevronRight size={18} />
          </button>
        )}
        <button
          onClick={handleLogout}
          title={isCollapsed ? 'Logout' : undefined}
          className={`mx-3 w-[calc(100%-1.5rem)] flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors ${
            isCollapsed ? 'justify-center mx-auto w-auto' : ''
          }`}
        >
          <LogOut size={18} className="shrink-0" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={close}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full bg-white border-r border-gray-200 shadow-xl
          flex flex-col transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:relative lg:translate-x-0 lg:shadow-none lg:shrink-0 lg:z-auto
          ${isCollapsed ? 'lg:w-[72px]' : 'w-72'}
        `}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
