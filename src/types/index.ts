export type UserRole = 'super-admin' | 'registrar' | 'faculty' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  avatar?: string;
}

export interface SchoolYear {
  id: string;
  label: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface Semester {
  id: string;
  name: string;
  schoolYearId: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  units: number;
  department: string;
  prerequisites?: string[];
}

export interface Classroom {
  id: string;
  code: string;
  building: string;
  capacity: number;
  type: 'lecture' | 'lab' | 'auditorium';
  isAvailable: boolean;
}

export interface FacultyMember {
  id: string;
  name: string;
  email: string;
  department: string;
  subjects: string[];
  workload: number;
}

export interface ClassSection {
  id: string;
  code: string;
  subjectId: string;
  instructorId: string;
  classroomId: string;
  day: string;
  startTime: string;
  endTime: string;
  semesterId: string;
  enrolled: number;
  maxCapacity: number;
}

export interface ScheduleConflict {
  id: string;
  type: 'room' | 'instructor' | 'student';
  description: string;
  sectionIds: string[];
  status: 'pending' | 'resolved';
  reportedBy?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'schedule' | 'cancellation' | 'room-change' | 'announcement';
  read: boolean;
  createdAt: string;
}

export interface ExamSchedule {
  id: string;
  subjectId: string;
  date: string;
  startTime: string;
  endTime: string;
  room: string;
  type: 'midterm' | 'final';
}

export interface NavItem {
  label: string;
  path: string;
  icon?: string;
}

export interface ReportMetric {
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
}
