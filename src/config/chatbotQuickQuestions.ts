import type { UserRole } from '../types';

export type ChatbotContext = 'guest' | 'login' | UserRole;

export interface QuickQuestion {
  id: string;
  label: string;
  question: string;
  category: 'system' | 'role' | 'general';
}

export const guestQuickQuestions: QuickQuestion[] = [
  { id: 'g1', label: 'What is this system?', question: 'What is the School Scheduling System and what does it do?', category: 'system' },
  { id: 'g2', label: 'How to register?', question: 'How do I register for an account in this system?', category: 'system' },
  { id: 'g3', label: 'Available roles?', question: 'What user roles are available in the system?', category: 'system' },
  { id: 'g4', label: 'System flow?', question: 'Explain the complete system flow from home to dashboard.', category: 'system' },
  { id: 'g5', label: 'Demo accounts?', question: 'What are the demo login accounts and passwords?', category: 'system' },
  { id: 'g6', label: 'Key features?', question: 'What are the main features of this scheduling system?', category: 'system' },
  { id: 'g7', label: 'Conflict detection?', question: 'How does automatic schedule conflict detection work?', category: 'system' },
  { id: 'g8', label: 'Who uses it?', question: 'Who can use this system — students, faculty, or admins?', category: 'system' },
  { id: 'g9', label: 'AI chatbot?', question: 'What is Scheduly AI and how does the chatbot work?', category: 'system' },
  { id: 'g10', label: 'Sidebar navigation?', question: 'How does the sidebar and hamburger menu work?', category: 'system' },
  { id: 'g11', label: 'Notifications?', question: 'How does the notification system work?', category: 'system' },
  { id: 'g12', label: 'All subjects?', question: 'List all subjects and credit units in the system.', category: 'system' },
  { id: 'g13', label: 'Classrooms?', question: 'How many classrooms are in the system and their capacity?', category: 'system' },
  { id: 'g14', label: 'School year?', question: 'What is the active school year and semester?', category: 'system' },
  { id: 'g15', label: 'Mobile friendly?', question: 'Is this system responsive on mobile devices?', category: 'system' },
  { id: 'g16', label: 'What is AI?', question: 'What is artificial intelligence in simple terms?', category: 'general' },
  { id: 'g17', label: 'Study tips?', question: 'Give me effective study tips for college students.', category: 'general' },
  { id: 'g18', label: 'Philippines education?', question: 'Tell me about the Philippine higher education system.', category: 'general' },
  { id: 'g19', label: 'Time management?', question: 'How can students manage time between classes?', category: 'general' },
  { id: 'g20', label: 'Learn programming?', question: 'How do I start learning programming as a student?', category: 'general' },
  { id: 'g21', label: 'What is STEM?', question: 'What does STEM stand for in education?', category: 'general' },
  { id: 'g22', label: 'EdTech trends?', question: 'What are current education technology trends?', category: 'general' },
  { id: 'g23', label: 'Who built this?', question: 'Who developed and built the School Scheduling System?', category: 'system' },
];

export const loginQuickQuestions: QuickQuestion[] = [
  { id: 'l1', label: 'How to login?', question: 'How do I login to the School Scheduling System?', category: 'system' },
  { id: 'l2', label: 'Demo password?', question: 'What is the demo password for all accounts?', category: 'system' },
  { id: 'l3', label: 'Quick access?', question: 'How does quick access login work for each role?', category: 'system' },
  { id: 'l4', label: 'Register steps?', question: 'What are the steps to create a new account?', category: 'system' },
  { id: 'l5', label: 'Admin account?', question: 'What is the Super Admin demo account email?', category: 'system' },
  { id: 'l6', label: 'Student account?', question: 'What is the Student demo account and enrolled subjects?', category: 'system' },
  { id: 'l7', label: 'Faculty account?', question: 'What is the Faculty demo account and teaching load?', category: 'system' },
  { id: 'l8', label: 'Registrar account?', question: 'What can the Registrar demo account do?', category: 'system' },
  { id: 'l9', label: 'Forgot password?', question: 'I forgot my password, what should I do in demo mode?', category: 'system' },
  { id: 'l10', label: 'Fill login form?', question: 'What does the Fill button do on quick access cards?', category: 'system' },
  { id: 'l11', label: 'Choose role?', question: 'How do I choose my role when registering?', category: 'system' },
  { id: 'l12', label: 'After login?', question: 'What happens after I login successfully?', category: 'system' },
  { id: 'l13', label: 'Switch roles?', question: 'Can I switch between roles after logging in?', category: 'system' },
  { id: 'l14', label: 'Maria Santos?', question: 'Who is Maria Santos and what is her registrar account?', category: 'system' },
  { id: 'l15', label: 'Ana Cruz subjects?', question: 'What subjects is student Ana Cruz enrolled in?', category: 'system' },
  { id: 'l16', label: 'Back to home?', question: 'How do I go back to the home page from login?', category: 'system' },
  { id: 'l17', label: 'What is AI?', question: 'What is artificial intelligence in simple terms?', category: 'general' },
  { id: 'l18', label: 'What is STEM?', question: 'What does STEM stand for in education?', category: 'general' },
  { id: 'l19', label: 'CHED meaning?', question: 'What is CHED in Philippine education?', category: 'general' },
  { id: 'l20', label: 'Study tips?', question: 'Give me effective study tips for college students.', category: 'general' },
  { id: 'l21', label: 'Who built this?', question: 'Who is the developer of this School Scheduling System?', category: 'system' },
];

export const superAdminQuickQuestions: QuickQuestion[] = [
  { id: 'sa1', label: 'My permissions?', question: 'What can I do as Super Admin in this system?', category: 'role' },
  { id: 'sa2', label: 'Manage users?', question: 'How do I add or edit users and assign roles?', category: 'role' },
  { id: 'sa3', label: 'Delete users?', question: 'How do I remove a user from the system?', category: 'role' },
  { id: 'sa4', label: 'School year?', question: 'How do I activate a school year and semester?', category: 'role' },
  { id: 'sa5', label: 'All schedules?', question: 'Show me all current class schedules in the system.', category: 'role' },
  { id: 'sa6', label: 'Pending conflicts?', question: 'How many schedule conflicts are pending right now?', category: 'role' },
  { id: 'sa7', label: 'Generate reports?', question: 'What reports can I generate as Super Admin?', category: 'role' },
  { id: 'sa8', label: 'Backup data?', question: 'How do I backup and restore system data?', category: 'role' },
  { id: 'sa9', label: 'Academic settings?', question: 'What academic settings can I configure?', category: 'role' },
  { id: 'sa10', label: 'System users list?', question: 'List all registered users in the system.', category: 'role' },
  { id: 'sa11', label: 'Classroom stats?', question: 'How many classrooms are available and their capacity?', category: 'role' },
  { id: 'sa12', label: 'Faculty workload?', question: 'What is the current faculty workload distribution?', category: 'role' },
  { id: 'sa13', label: 'All subjects?', question: 'List all subjects and prerequisites in the system.', category: 'role' },
  { id: 'sa14', label: 'Enrollment stats?', question: 'What are the enrollment numbers per class section?', category: 'role' },
  { id: 'sa15', label: 'Dashboard stats?', question: 'What statistics are shown on the Super Admin dashboard?', category: 'role' },
  { id: 'sa16', label: 'Audit logs?', question: 'Does the system have audit logs and activity monitoring?', category: 'role' },
  { id: 'sa17', label: 'Max units setting?', question: 'What is the max units per semester academic setting?', category: 'role' },
  { id: 'sa18', label: 'Switch to registrar?', question: 'How do I use quick access to switch to Registrar role?', category: 'role' },
  { id: 'sa19', label: 'Cybersecurity tips?', question: 'Give me cybersecurity tips for school admin systems.', category: 'general' },
  { id: 'sa20', label: 'EdTech trends?', question: 'What are current education technology trends?', category: 'general' },
  { id: 'sa21', label: 'Data privacy?', question: 'How should schools protect student data privacy?', category: 'general' },
  { id: 'sa22', label: 'Cloud vs on-premise?', question: 'What are pros of cloud vs on-premise school systems?', category: 'general' },
];

export const registrarQuickQuestions: QuickQuestion[] = [
  { id: 'r1', label: 'Create schedule?', question: 'How do I create a new class schedule as Registrar?', category: 'role' },
  { id: 'r2', label: 'Assign instructors?', question: 'How do I assign instructors to class sections?', category: 'role' },
  { id: 'r3', label: 'Assign classrooms?', question: 'How do I assign classrooms to sections?', category: 'role' },
  { id: 'r4', label: 'Resolve conflicts?', question: 'How do I detect and resolve schedule conflicts?', category: 'role' },
  { id: 'r5', label: 'Current conflicts?', question: 'What schedule conflicts exist right now?', category: 'role' },
  { id: 'r6', label: 'Manage sections?', question: 'How do I edit or delete class sections?', category: 'role' },
  { id: 'r7', label: 'Timetable report?', question: 'How do I export a class timetable report?', category: 'role' },
  { id: 'r8', label: 'All sections?', question: 'List all class sections with instructors and rooms.', category: 'role' },
  { id: 'r9', label: 'Faculty workload?', question: 'What is the current faculty workload distribution?', category: 'role' },
  { id: 'r10', label: 'Room availability?', question: 'Which classrooms are available right now?', category: 'role' },
  { id: 'r11', label: 'CS101 section?', question: 'Show details for CS101-A section schedule.', category: 'role' },
  { id: 'r12', label: 'Wednesday classes?', question: 'What classes are scheduled on Wednesday?', category: 'role' },
  { id: 'r13', label: 'Room conflict?', question: 'Tell me about the LAB-101 room conflict.', category: 'role' },
  { id: 'r14', label: 'Instructor conflict?', question: 'Tell me about Dr. John Reyes instructor conflict.', category: 'role' },
  { id: 'r15', label: 'Add new section?', question: 'What fields are required when creating a new schedule?', category: 'role' },
  { id: 'r16', label: 'Notify on change?', question: 'Are users notified when schedules are changed?', category: 'role' },
  { id: 'r17', label: 'Print timetable?', question: 'How do I print the class timetable report?', category: 'role' },
  { id: 'r18', label: 'Dashboard overview?', question: 'What does the Registrar dashboard show?', category: 'role' },
  { id: 'r19', label: 'Scheduling best practices?', question: 'What are best practices for academic scheduling?', category: 'general' },
  { id: 'r20', label: 'K-12 vs college?', question: 'What is the difference between K-12 and college scheduling?', category: 'general' },
  { id: 'r21', label: 'Room utilization?', question: 'How can I improve classroom utilization?', category: 'general' },
  { id: 'r22', label: 'Enrollment period?', question: 'When does 2nd semester enrollment open?', category: 'general' },
];

export const facultyQuickQuestions: QuickQuestion[] = [
  { id: 'f1', label: 'My schedule?', question: 'What is my teaching schedule this semester?', category: 'role' },
  { id: 'f2', label: 'My subjects?', question: 'What subjects am I assigned to teach?', category: 'role' },
  { id: 'f3', label: 'My classrooms?', question: 'Which classrooms are assigned to my classes?', category: 'role' },
  { id: 'f4', label: 'Class list?', question: 'How do I view my class list and enrolled students?', category: 'role' },
  { id: 'f5', label: 'Report conflict?', question: 'How do I report a schedule conflict to the registrar?', category: 'role' },
  { id: 'f6', label: 'Print schedule?', question: 'How do I print my teaching schedule?', category: 'role' },
  { id: 'f7', label: 'Notifications?', question: 'How do schedule change notifications work for faculty?', category: 'role' },
  { id: 'f8', label: 'Teaching load?', question: 'What is my current teaching load in units?', category: 'role' },
  { id: 'f9', label: 'CS101 schedule?', question: 'When and where is CS101-A scheduled?', category: 'role' },
  { id: 'f10', label: 'CS201 schedule?', question: 'When and where is CS201-A scheduled?', category: 'role' },
  { id: 'f11', label: 'Student count?', question: 'How many students are enrolled in my classes?', category: 'role' },
  { id: 'f12', label: 'Monday classes?', question: 'What classes do I teach on Monday?', category: 'role' },
  { id: 'f13', label: 'LAB-101 room?', question: 'Which of my classes use LAB-101?', category: 'role' },
  { id: 'f14', label: 'CS101 students?', question: 'How many students are in my CS101-A class?', category: 'role' },
  { id: 'f15', label: 'Conflict types?', question: 'What types of schedule conflicts can I report?', category: 'role' },
  { id: 'f16', label: 'Dashboard stats?', question: 'What statistics are on my Faculty dashboard?', category: 'role' },
  { id: 'f17', label: 'Unread notifications?', question: 'Do I have any unread schedule notifications?', category: 'role' },
  { id: 'f18', label: 'Switch to student?', question: 'How do I switch to Student role using quick access?', category: 'role' },
  { id: 'f19', label: 'Teaching tips?', question: 'Give me tips for effective classroom teaching.', category: 'general' },
  { id: 'f20', label: 'What is LMS?', question: 'What is a Learning Management System?', category: 'general' },
  { id: 'f21', label: 'Active learning?', question: 'What is active learning in teaching?', category: 'general' },
  { id: 'f22', label: 'Grading tips?', question: 'What are best practices for grading and feedback?', category: 'general' },
];

export const studentQuickQuestions: QuickQuestion[] = [
  { id: 's1', label: 'My schedule?', question: 'What is my class schedule this semester?', category: 'role' },
  { id: 's2', label: 'Enrolled subjects?', question: 'What subjects am I enrolled in and how many units?', category: 'role' },
  { id: 's3', label: 'My classrooms?', question: 'Where are my classes held — room and building?', category: 'role' },
  { id: 's4', label: 'My instructors?', question: 'Who are my instructors for enrolled subjects?', category: 'role' },
  { id: 's5', label: 'Exam schedule?', question: 'When are my midterm and final exams?', category: 'role' },
  { id: 's6', label: 'Print timetable?', question: 'How do I print my personal timetable?', category: 'role' },
  { id: 's7', label: 'Notifications?', question: 'How do I receive schedule change notifications?', category: 'role' },
  { id: 's8', label: 'CS201 details?', question: 'Tell me about my CS201 class schedule and instructor.', category: 'role' },
  { id: 's9', label: 'Total units?', question: 'How many total credit units am I taking?', category: 'role' },
  { id: 's10', label: 'Monday classes?', question: 'What classes do I have on Monday?', category: 'role' },
  { id: 's11', label: 'Wednesday classes?', question: 'What classes do I have on Wednesday?', category: 'role' },
  { id: 's12', label: 'MATH101 info?', question: 'When is MATH101-A and who is the instructor?', category: 'role' },
  { id: 's13', label: 'ENG101 info?', question: 'Am I enrolled in ENG101 Technical Writing?', category: 'role' },
  { id: 's14', label: 'Midterm exams?', question: 'When are my midterm examinations?', category: 'role' },
  { id: 's15', label: 'Final exams?', question: 'When are my final examinations?', category: 'role' },
  { id: 's16', label: 'Dr. John Reyes?', question: 'Which subjects does Dr. John Reyes teach me?', category: 'role' },
  { id: 's17', label: 'Cancelled class?', question: 'Are any of my classes cancelled?', category: 'role' },
  { id: 's18', label: 'Room changes?', question: 'Have any of my classroom assignments changed?', category: 'role' },
  { id: 's19', label: 'Study techniques?', question: 'What are the best study techniques for IT students?', category: 'general' },
  { id: 's20', label: 'Career in IT?', question: 'What career paths are available for BSIT graduates?', category: 'general' },
  { id: 's21', label: 'Internship tips?', question: 'How do I prepare for IT internships while studying?', category: 'general' },
  { id: 's22', label: 'Programming path?', question: 'What programming courses should I take in order?', category: 'general' },
];

export function getQuickQuestions(context: ChatbotContext): QuickQuestion[] {
  switch (context) {
    case 'guest': return guestQuickQuestions;
    case 'login': return loginQuickQuestions;
    case 'super-admin': return superAdminQuickQuestions;
    case 'registrar': return registrarQuickQuestions;
    case 'faculty': return facultyQuickQuestions;
    case 'student': return studentQuickQuestions;
    default: return guestQuickQuestions;
  }
}

export function getContextLabel(context: ChatbotContext): string {
  const labels: Record<ChatbotContext, string> = {
    guest: 'Visitor',
    login: 'Login',
    'super-admin': 'Super Admin',
    registrar: 'Registrar',
    faculty: 'Faculty',
    student: 'Student',
  };
  return labels[context];
}

export function countQuickQuestions(context: ChatbotContext): number {
  return getQuickQuestions(context).length;
}
