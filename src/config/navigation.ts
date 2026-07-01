import type { NavItem } from '../types';

export const superAdminNav: NavItem[] = [
  { label: 'Dashboard', path: '', icon: 'layout-dashboard' },
  { label: 'Users & Roles', path: '/users', icon: 'users' },
  { label: 'Academic Settings', path: '/academic-settings', icon: 'settings' },
  { label: 'School Year', path: '/school-year', icon: 'calendar-range' },
  { label: 'All Schedules', path: '/schedules', icon: 'calendar' },
  { label: 'Reports', path: '/reports', icon: 'file-text' },
  { label: 'Backup', path: '/backup', icon: 'database' },
];

export const registrarNav: NavItem[] = [
  { label: 'Dashboard', path: '', icon: 'layout-dashboard' },
  { label: 'Create Schedule', path: '/create-schedule', icon: 'calendar-plus' },
  { label: 'Assign Instructors', path: '/assign-instructors', icon: 'user-check' },
  { label: 'Assign Classrooms', path: '/assign-classrooms', icon: 'building' },
  { label: 'Sections', path: '/sections', icon: 'layers' },
  { label: 'Conflicts', path: '/conflicts', icon: 'alert-triangle' },
  { label: 'Timetable Reports', path: '/timetable-reports', icon: 'file-spreadsheet' },
];

export const facultyNav: NavItem[] = [
  { label: 'Dashboard', path: '', icon: 'layout-dashboard' },
  { label: 'Teaching Schedule', path: '/teaching-schedule', icon: 'calendar' },
  { label: 'Subjects', path: '/subjects', icon: 'book-open' },
  { label: 'Classrooms', path: '/classrooms', icon: 'map-pin' },
  { label: 'Class List', path: '/class-list', icon: 'users' },
  { label: 'Report Conflict', path: '/report-conflict', icon: 'alert-circle' },
];

export const studentNav: NavItem[] = [
  { label: 'Dashboard', path: '', icon: 'layout-dashboard' },
  { label: 'Class Schedule', path: '/class-schedule', icon: 'calendar' },
  { label: 'Enrolled Subjects', path: '/enrolled-subjects', icon: 'book-open' },
  { label: 'Classrooms', path: '/classrooms', icon: 'map-pin' },
  { label: 'Instructors', path: '/instructors', icon: 'graduation-cap' },
  { label: 'Exam Schedule', path: '/exam-schedule', icon: 'clipboard-list' },
  { label: 'Print Timetable', path: '/print-timetable', icon: 'printer' },
];
