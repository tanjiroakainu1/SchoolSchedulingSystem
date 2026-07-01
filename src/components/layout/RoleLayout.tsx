import { Outlet } from 'react-router-dom';
import { RoleHeader } from './RoleHeader';
import { RoleSidebar } from './RoleSidebar';
import { SidebarProvider } from '../../context/SidebarContext';
import { DeveloperCredit } from '../ui/DeveloperCredit';
import type { NavItem } from '../../types';

interface RoleLayoutProps {
  navItems: NavItem[];
  basePath: string;
}

function RoleLayoutInner({ navItems, basePath }: RoleLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-gray-100 flex">
      <RoleSidebar navItems={navItems} basePath={basePath} />

      <div className="flex-1 flex flex-col min-w-0 lg:min-h-screen">
        <RoleHeader />
        <main className="flex-1 px-3 sm:px-6 py-4 sm:py-6 lg:py-8 max-w-7xl w-full mx-auto flex flex-col">
          <div className="flex-1">
            <Outlet />
          </div>
          <DeveloperCredit variant="inline" className="mt-8 pt-4 border-t border-gray-200/60 text-center no-print" />
        </main>
      </div>
    </div>
  );
}

export function RoleLayout({ navItems, basePath }: RoleLayoutProps) {
  return (
    <SidebarProvider>
      <RoleLayoutInner navItems={navItems} basePath={basePath} />
    </SidebarProvider>
  );
}
