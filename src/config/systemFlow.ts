import {
  UserPlus,
  LogIn,
  LayoutDashboard,
  Calendar,
  Bell,
  BarChart3,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface FlowStep {
  step: number;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

export const systemFlowSteps: FlowStep[] = [
  {
    step: 1,
    title: 'Visit & Explore',
    description: 'Browse the home page to understand roles, features, and how the scheduling system works for your institution.',
    icon: LayoutDashboard,
    color: 'text-primary-700',
    bgColor: 'bg-primary-50',
  },
  {
    step: 2,
    title: 'Register or Login',
    description: 'Create a new account or sign in with your email. Choose your role — Super Admin, Registrar, Faculty, or Student.',
    icon: UserPlus,
    color: 'text-accent-700',
    bgColor: 'bg-accent-50',
  },
  {
    step: 3,
    title: 'Role Dashboard',
    description: 'Land on your personalized dashboard with stats, quick actions, and a sidebar tailored to your role permissions.',
    icon: LogIn,
    color: 'text-primary-700',
    bgColor: 'bg-primary-50',
  },
  {
    step: 4,
    title: 'Manage Schedules',
    description: 'Registrars create class schedules, assign instructors and rooms. Admins configure academic settings and school years.',
    icon: Calendar,
    color: 'text-teal-700',
    bgColor: 'bg-teal-50',
  },
  {
    step: 5,
    title: 'View & Notify',
    description: 'Faculty and students view timetables, receive schedule updates. System detects conflicts and generates reports.',
    icon: Bell,
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-50',
  },
  {
    step: 6,
    title: 'Reports & Analytics',
    description: 'Generate workload, utilization, and timetable reports. Super Admins monitor the entire institution from one place.',
    icon: BarChart3,
    color: 'text-amber-700',
    bgColor: 'bg-amber-50',
  },
];

export const systemFeatures = [
  'User registration & role-based access control',
  'School year & semester management',
  'Class schedule creation with conflict detection',
  'Instructor & classroom assignment',
  'Student timetable & exam schedules',
  'Schedule change notifications',
  'Faculty workload & utilization reports',
  'Data backup & system administration',
];

export const roleCapabilities: Record<string, string[]> = {
  'super-admin': [
    'Manage users and roles',
    'Configure academic settings',
    'Manage school year & semesters',
    'View all schedules system-wide',
    'Generate reports & backup data',
  ],
  registrar: [
    'Create class schedules',
    'Assign instructors to subjects',
    'Assign classrooms to sections',
    'Detect & resolve conflicts',
    'Generate timetable reports',
  ],
  faculty: [
    'View teaching schedule',
    'View assigned subjects & rooms',
    'Print teaching schedule',
    'View class list',
    'Report schedule conflicts',
  ],
  student: [
    'View class schedule',
    'View enrolled subjects',
    'View instructor information',
    'Receive schedule updates',
    'Print personal timetable & exams',
  ],
};
