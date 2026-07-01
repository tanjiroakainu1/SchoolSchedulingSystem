import type {
  User,
  SchoolYear,
  Semester,
  Subject,
  Classroom,
  FacultyMember,
  ClassSection,
  ScheduleConflict,
  Notification,
  ExamSchedule,
} from '../types';

export const demoUsers: User[] = [
  { id: '1', name: 'Admin User', email: 'admin@school.edu', role: 'super-admin', department: 'IT Administration' },
  { id: '2', name: 'Maria Santos', email: 'registrar@school.edu', role: 'registrar', department: 'Registrar Office' },
  { id: '3', name: 'Dr. John Reyes', email: 'jreyes@school.edu', role: 'faculty', department: 'Computer Science' },
  { id: '4', name: 'Ana Cruz', email: 'acruz@student.edu', role: 'student', department: 'BSIT' },
];

/** Per-student enrolled subject IDs keyed by email */
export const userStudentSubjectIds: Record<string, string[]> = {
  'acruz@student.edu': ['sub1', 'sub2', 'sub3', 'sub4'],
};

export const initialSchoolYears: SchoolYear[] = [
  { id: 'sy1', label: '2025-2026', startDate: '2025-08-01', endDate: '2026-05-31', isActive: true },
  { id: 'sy2', label: '2024-2025', startDate: '2024-08-01', endDate: '2025-05-31', isActive: false },
];

export const initialSemesters: Semester[] = [
  { id: 'sem1', name: '1st Semester', schoolYearId: 'sy1', startDate: '2025-08-15', endDate: '2025-12-15', isActive: true },
  { id: 'sem2', name: '2nd Semester', schoolYearId: 'sy1', startDate: '2026-01-10', endDate: '2026-05-20', isActive: false },
];

export const initialSubjects: Subject[] = [
  { id: 'sub1', code: 'CS101', name: 'Introduction to Programming', units: 3, department: 'Computer Science' },
  { id: 'sub2', code: 'CS201', name: 'Data Structures', units: 3, department: 'Computer Science', prerequisites: ['CS101'] },
  { id: 'sub3', code: 'MATH101', name: 'College Algebra', units: 3, department: 'Mathematics' },
  { id: 'sub4', code: 'ENG101', name: 'Technical Writing', units: 2, department: 'Languages' },
  { id: 'sub5', code: 'CS301', name: 'Database Systems', units: 3, department: 'Computer Science', prerequisites: ['CS201'] },
];

export const initialClassrooms: Classroom[] = [
  { id: 'rm1', code: 'LAB-101', building: 'Science Building', capacity: 40, type: 'lab', isAvailable: true },
  { id: 'rm2', code: 'RM-201', building: 'Main Building', capacity: 50, type: 'lecture', isAvailable: true },
  { id: 'rm3', code: 'AUD-01', building: 'Auditorium Wing', capacity: 120, type: 'auditorium', isAvailable: false },
  { id: 'rm4', code: 'LAB-102', building: 'Science Building', capacity: 35, type: 'lab', isAvailable: true },
];

export const initialFaculty: FacultyMember[] = [
  { id: 'fac1', name: 'Dr. John Reyes', email: 'jreyes@school.edu', department: 'Computer Science', subjects: ['CS101', 'CS201'], workload: 18 },
  { id: 'fac2', name: 'Prof. Lisa Tan', email: 'ltan@school.edu', department: 'Mathematics', subjects: ['MATH101'], workload: 12 },
  { id: 'fac3', name: 'Dr. Mark Lim', email: 'mlim@school.edu', department: 'Computer Science', subjects: ['CS301'], workload: 15 },
];

export const initialSections: ClassSection[] = [
  { id: 'sec1', code: 'CS101-A', subjectId: 'sub1', instructorId: 'fac1', classroomId: 'rm1', day: 'Monday', startTime: '08:00', endTime: '10:00', semesterId: 'sem1', enrolled: 38, maxCapacity: 40 },
  { id: 'sec2', code: 'CS201-A', subjectId: 'sub2', instructorId: 'fac1', classroomId: 'rm2', day: 'Wednesday', startTime: '10:00', endTime: '12:00', semesterId: 'sem1', enrolled: 45, maxCapacity: 50 },
  { id: 'sec3', code: 'MATH101-A', subjectId: 'sub3', instructorId: 'fac2', classroomId: 'rm2', day: 'Tuesday', startTime: '13:00', endTime: '15:00', semesterId: 'sem1', enrolled: 48, maxCapacity: 50 },
  { id: 'sec4', code: 'CS301-A', subjectId: 'sub5', instructorId: 'fac3', classroomId: 'rm4', day: 'Thursday', startTime: '08:00', endTime: '11:00', semesterId: 'sem1', enrolled: 30, maxCapacity: 35 },
];

export const initialConflicts: ScheduleConflict[] = [
  { id: 'conf1', type: 'room', description: 'LAB-101 double-booked on Monday 08:00-10:00', sectionIds: ['sec1'], status: 'pending' },
  { id: 'conf2', type: 'instructor', description: 'Dr. John Reyes has overlapping classes on Wednesday', sectionIds: ['sec1', 'sec2'], status: 'pending' },
];

export const initialNotifications: Notification[] = [
  { id: 'n1', title: 'Schedule Update', message: 'CS201-A moved to Room RM-203 starting next week.', type: 'room-change', read: false, createdAt: '2026-06-28T09:00:00' },
  { id: 'n2', title: 'Class Cancelled', message: 'MATH101-A session on July 3 is cancelled.', type: 'cancellation', read: false, createdAt: '2026-06-29T14:30:00' },
  { id: 'n3', title: 'Academic Announcement', message: 'Enrollment for 2nd semester opens July 15.', type: 'announcement', read: true, createdAt: '2026-06-25T08:00:00' },
];

export const initialExams: ExamSchedule[] = [
  { id: 'ex1', subjectId: 'sub1', date: '2026-10-15', startTime: '08:00', endTime: '10:00', room: 'LAB-101', type: 'midterm' },
  { id: 'ex2', subjectId: 'sub2', date: '2026-10-17', startTime: '13:00', endTime: '15:00', room: 'RM-201', type: 'midterm' },
  { id: 'ex3', subjectId: 'sub1', date: '2026-12-10', startTime: '08:00', endTime: '10:00', room: 'LAB-101', type: 'final' },
  { id: 'ex4', subjectId: 'sub3', date: '2026-10-16', startTime: '10:00', endTime: '12:00', room: 'RM-201', type: 'midterm' },
];

export const studentEnrolledSubjectIds = ['sub1', 'sub2', 'sub3', 'sub4'];
