import type { UserRole } from '../types';
import { Shield, ClipboardList, GraduationCap, UserCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface RoleConfig {
  value: UserRole;
  label: string;
  shortLabel: string;
  path: string;
  color: string;
  bgColor: string;
  borderColor: string;
  hoverBg: string;
  icon: LucideIcon;
  description: string;
}

export const roleConfigs: RoleConfig[] = [
  {
    value: 'super-admin',
    label: 'Super Admin',
    shortLabel: 'Admin',
    path: '/super-admin',
    color: 'text-primary-800',
    bgColor: 'bg-primary-50',
    borderColor: 'border-primary-200',
    hoverBg: 'hover:bg-primary-100',
    icon: Shield,
    description: 'Full system access & administration',
  },
  {
    value: 'registrar',
    label: 'Registrar',
    shortLabel: 'Registrar',
    path: '/registrar',
    color: 'text-teal-700',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-200',
    hoverBg: 'hover:bg-teal-100',
    icon: ClipboardList,
    description: 'Schedule creation & coordination',
  },
  {
    value: 'faculty',
    label: 'Faculty',
    shortLabel: 'Faculty',
    path: '/faculty',
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    hoverBg: 'hover:bg-emerald-100',
    icon: GraduationCap,
    description: 'Teaching schedule & class management',
  },
  {
    value: 'student',
    label: 'Student',
    shortLabel: 'Student',
    path: '/student',
    color: 'text-accent-700',
    bgColor: 'bg-accent-50',
    borderColor: 'border-accent-200',
    hoverBg: 'hover:bg-accent-100',
    icon: UserCircle,
    description: 'Personal timetable & enrollment',
  },
];

export const rolePaths: Record<UserRole, string> = Object.fromEntries(
  roleConfigs.map((r) => [r.value, r.path])
) as Record<UserRole, string>;

export function getRoleConfig(role: UserRole) {
  return roleConfigs.find((r) => r.value === role)!;
}

export const DEMO_PASSWORD = 'password123';
