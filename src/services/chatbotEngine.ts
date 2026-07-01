import type { ChatbotContext } from '../config/chatbotQuickQuestions';
import {
  demoUsers,
  initialSchoolYears,
  initialSemesters,
  initialSubjects,
  initialClassrooms,
  initialFaculty,
  initialSections,
  initialConflicts,
  initialExams,
  initialNotifications,
  studentEnrolledSubjectIds,
} from '../data/mockData';
import { roleCapabilities, systemFeatures, systemFlowSteps } from '../config/systemFlow';
import { DEMO_PASSWORD } from '../config/roles';
import { DEVELOPER } from '../config/site';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface ChatbotDataContext {
  context: ChatbotContext;
  userName?: string;
  userEmail?: string;
}

interface KnowledgeEntry {
  keywords: string[];
  response: string | ((ctx: ChatbotDataContext, message: string) => string);
  priority?: number;
}

function buildSystemSnapshot(): string {
  const activeYear = initialSchoolYears.find((y) => y.isActive);
  const activeSem = initialSemesters.find((s) => s.isActive);
  const pendingConflicts = initialConflicts.filter((c) => c.status === 'pending').length;

  const scheduleList = initialSections.map((sec) => {
    const subj = initialSubjects.find((s) => s.id === sec.subjectId);
    const inst = initialFaculty.find((f) => f.id === sec.instructorId);
    const room = initialClassrooms.find((c) => c.id === sec.classroomId);
    return `• ${sec.code} — ${subj?.name} | ${inst?.name} | ${room?.code} | ${sec.day} ${sec.startTime}–${sec.endTime} | ${sec.enrolled}/${sec.maxCapacity} students`;
  }).join('\n');

  return `📊 **Live System Data (2025-2026)**
• Active School Year: ${activeYear?.label} (${activeYear?.startDate} to ${activeYear?.endDate})
• Active Semester: ${activeSem?.name}
• Total Users: ${demoUsers.length} | Subjects: ${initialSubjects.length} | Sections: ${initialSections.length}
• Classrooms: ${initialClassrooms.length} (${initialClassrooms.filter((c) => c.isAvailable).length} available)
• Faculty: ${initialFaculty.length} | Pending Conflicts: ${pendingConflicts}

**Class Schedules:**
${scheduleList}`;
}

function facultyScheduleFor(email?: string): string {
  const fac = initialFaculty.find((f) => f.email === email) ?? initialFaculty[0];
  const sections = initialSections.filter((s) => s.instructorId === fac.id);
  const lines = sections.map((sec) => {
    const subj = initialSubjects.find((s) => s.id === sec.subjectId);
    const room = initialClassrooms.find((c) => c.id === sec.classroomId);
    return `• ${subj?.name} (${sec.code}) — ${sec.day} ${sec.startTime}–${sec.endTime} @ ${room?.code} — ${sec.enrolled} students`;
  });
  return `👨‍🏫 **Teaching Schedule for ${fac.name}**
Department: ${fac.department} | Workload: ${fac.workload} units
Subjects: ${fac.subjects.join(', ')}

${lines.length ? lines.join('\n') : 'No classes assigned.'}`;
}

function studentScheduleFor(email?: string): string {
  const subjectIds = email === 'acruz@student.edu' ? studentEnrolledSubjectIds : studentEnrolledSubjectIds;
  const sections = initialSections.filter((s) => subjectIds.includes(s.subjectId));
  const totalUnits = initialSubjects.filter((s) => subjectIds.includes(s.id)).reduce((sum, s) => sum + s.units, 0);
  const lines = sections.map((sec) => {
    const subj = initialSubjects.find((s) => s.id === sec.subjectId);
    const inst = initialFaculty.find((f) => f.id === sec.instructorId);
    const room = initialClassrooms.find((c) => c.id === sec.classroomId);
    return `• ${subj?.name} (${sec.code}) — ${sec.day} ${sec.startTime}–${sec.endTime} @ ${room?.code} — Prof. ${inst?.name}`;
  });
  return `🎓 **Student Schedule** (${totalUnits} units)
${lines.join('\n')}

**Exams:**
${initialExams.filter((e) => subjectIds.includes(e.subjectId)).map((e) => {
    const subj = initialSubjects.find((s) => s.id === e.subjectId);
    return `• ${subj?.name} ${e.type}: ${e.date} ${e.startTime}–${e.endTime} @ ${e.room}`;
  }).join('\n')}`;
}

const knowledgeBase: KnowledgeEntry[] = [
  // Greetings
  { keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'], priority: 10,
    response: (ctx) => `Hello${ctx.userName ? `, ${ctx.userName}` : ''}! 👋 I'm **Scheduly AI**, your intelligent assistant for the School Scheduling System. I know everything about this platform AND I can help with general education topics too!\n\nYou're currently browsing as **${ctx.context}**. Pick a quick question below or ask me anything!` },

  { keywords: ['thank', 'thanks', 'salamat'], priority: 10,
    response: "You're welcome! 😊 Feel free to ask more — whether it's about schedules, your role, or anything in the world of education!" },

  { keywords: ['who are you', 'what are you', 'your name'], priority: 10,
    response: "I'm **Scheduly AI** 🤖✨ — the floating intelligence built into the School Scheduling System. I have deep knowledge of:\n\n• All system data (schedules, users, rooms, conflicts)\n• Every role's features and workflows\n• Education, study tips, careers & general knowledge\n\nThink of me as your 24/7 academic assistant!" },

  { keywords: ['who built', 'who made', 'who created', 'who developed', 'developer', 'raminder', 'jangao', 'who designed'], priority: 10,
    response: `👨‍💻 This entire **School Scheduling System** was designed and developed by **${DEVELOPER.name}** — ${DEVELOPER.title}!

**Crafted with:**
• React + TypeScript + Vite
• Tailwind CSS for beautiful UI
• Role-based dashboards for 4 user types
• Scheduly AI chatbot (that's me! 🤖)

${DEVELOPER.tagline} ✨

You'll find ${DEVELOPER.name}'s credit in the footer, sidebar, home page, and throughout the system!` },

  // System overview
  { keywords: ['what is the school scheduling', 'what is this system', 'what does this system', 'about this system', 'tell me about the system'], priority: 9,
    response: `🏫 **School Scheduling System** automates class schedule creation, management, and monitoring for educational institutions.

**Core Purpose:**
Organize subjects, classrooms, instructors, and student timetables while preventing scheduling conflicts.

**4 User Roles:** Super Admin, Registrar, Faculty, Student

**Key Features:**
${systemFeatures.map((f) => `• ${f}`).join('\n')}

**System Flow:**
${systemFlowSteps.map((s) => `${s.step}. ${s.title} — ${s.description}`).join('\n')}` },

  { keywords: ['how do i register', 'create account', 'sign up', 'registration'], priority: 9,
    response: `📝 **How to Register:**

1. Go to **Home** → click **Create Account** or **Register**
2. Or visit \`/login?tab=register\`
3. Fill in: Full Name, Email, Role, Department, Password
4. Click **Create Account** → you'll be redirected to your role dashboard!

**Demo alternative:** Use Quick Access cards on the login page for instant access with pre-loaded accounts.` },

  { keywords: ['how do i login', 'how to login', 'sign in', 'log in'], priority: 9,
    response: `🔐 **How to Login:**

1. Go to **Login** page (\`/login\`)
2. Enter your email address
3. Enter password: \`${DEMO_PASSWORD}\` (demo mode)
4. Click **Sign In**

**Quick Access:** Click any role card → **Enter Dashboard** for one-click login!

**Demo Accounts:**
${demoUsers.map((u) => `• **${u.role}**: ${u.email} — ${u.name}`).join('\n')}` },

  { keywords: ['demo password', 'password', 'demo account'], priority: 9,
    response: `🔑 **Demo Credentials:**

Password for ALL accounts: \`${DEMO_PASSWORD}\`

**Accounts:**
${demoUsers.map((u) => `• **${u.role.replace('-', ' ')}** — ${u.email}\n  Name: ${u.name}${u.department ? ` | ${u.department}` : ''}`).join('\n\n')}` },

  { keywords: ['quick access', 'one click', 'one-click'], priority: 8,
    response: `⚡ **Quick Access** lets you instantly enter any role's dashboard:

1. On Login page → see 4 role cards (Admin, Registrar, Faculty, Student)
2. Click **Enter Dashboard** → logged in immediately with that role's data
3. Inside any dashboard → **Quick Access** bar in sidebar switches roles instantly

No typing needed — perfect for demos and exploration!` },

  { keywords: ['what roles', 'available roles', 'user roles', 'four roles', '4 roles'], priority: 9,
    response: `👥 **4 System Roles:**

${Object.entries(roleCapabilities).map(([role, caps]) => `**${role.replace('-', ' ').toUpperCase()}**
${caps.map((c) => `  • ${c}`).join('\n')}`).join('\n\n')}` },

  { keywords: ['system flow', 'how it works', 'workflow', 'complete flow'], priority: 8,
    response: () => `🔄 **Complete System Flow:**

${systemFlowSteps.map((s) => `**Step ${s.step}: ${s.title}**\n${s.description}`).join('\n\n')}

Start at the **Home page** → Register/Login → Your **Role Dashboard** → Use the **sidebar** to navigate features!` },

  { keywords: ['features', 'main features', 'key features', 'what can'], priority: 8,
    response: () => `✨ **System Features:**

${systemFeatures.map((f, i) => `${i + 1}. ${f}`).join('\n')}

Plus: floating AI assistant (that's me! 🤖), responsive design, notifications, and role-based quick access.` },

  { keywords: ['conflict', 'conflicts', 'scheduling conflict'], priority: 8,
    response: () => {
      const pending = initialConflicts.filter((c) => c.status === 'pending');
      return `⚠️ **Schedule Conflict Detection:**

The system automatically detects:
• **Room conflicts** — same room, same time
• **Instructor conflicts** — faculty double-booked
• **Student conflicts** — enrollment overlaps

**Current Pending Conflicts (${pending.length}):**
${pending.map((c) => `• [${c.type}] ${c.description}`).join('\n') || 'None — all clear!'}

**Resolve:** Registrar → Conflicts → click **Resolve**`;
    }},

  { keywords: ['all schedules', 'class schedules', 'current schedules', 'list all class'], priority: 8,
    response: () => buildSystemSnapshot() },

  { keywords: ['list all registered users', 'all users', 'system users'], priority: 8,
    response: () => `👤 **Registered Users (${demoUsers.length}):**\n${demoUsers.map((u) => `• **${u.name}** — ${u.email} | Role: ${u.role}${u.department ? ` | ${u.department}` : ''}`).join('\n')}` },

  { keywords: ['classroom', 'room availability', 'classrooms available'], priority: 7,
    response: () => `🏢 **Classrooms (${initialClassrooms.length} total):**\n${initialClassrooms.map((c) => `• **${c.code}** — ${c.building} | ${c.type} | Capacity: ${c.capacity} | ${c.isAvailable ? '✅ Available' : '❌ Busy'}`).join('\n')}` },

  { keywords: ['faculty workload', 'workload distribution'], priority: 7,
    response: () => `📈 **Faculty Workload:**\n${initialFaculty.map((f) => `• **${f.name}** — ${f.workload} units | Subjects: ${f.subjects.join(', ')} | ${f.department}`).join('\n')}` },

  { keywords: ['school year', 'semester', 'activate'], priority: 7,
    response: () => `📅 **Academic Calendar:**

**School Years:**
${initialSchoolYears.map((y) => `• ${y.label} — ${y.isActive ? '🟢 Active' : '⚪ Inactive'} (${y.startDate} to ${y.endDate})`).join('\n')}

**Semesters:**
${initialSemesters.map((s) => `• ${s.name} — ${s.isActive ? '🟢 Active' : '⚪ Inactive'} (${s.startDate} to ${s.endDate})`).join('\n')}` },

  { keywords: ['subjects', 'all subjects', 'course list'], priority: 7,
    response: () => `📚 **Subjects (${initialSubjects.length}):**\n${initialSubjects.map((s) => `• **${s.code}** — ${s.name} | ${s.units} units | ${s.department}${s.prerequisites?.length ? ` | Prereq: ${s.prerequisites.join(', ')}` : ''}`).join('\n')}` },

  // Role-specific
  { keywords: ['super admin', 'what can i do as super admin', 'my permissions'], priority: 8,
    response: () => `🛡️ **Super Admin Powers:**

${roleCapabilities['super-admin'].map((c) => `• ${c}`).join('\n')}

**Navigate via sidebar:** Users & Roles, Academic Settings, School Year, All Schedules, Reports, Backup

${buildSystemSnapshot()}` },

  { keywords: ['registrar', 'create schedule', 'assign instructor', 'assign classroom', 'timetable report'], priority: 8,
    response: () => `📋 **Registrar Guide:**

${roleCapabilities.registrar.map((c) => `• ${c}`).join('\n')}

**Create Schedule:** Registrar → Create Schedule → fill section, subject, instructor, room, day, time → system checks conflicts automatically!

${buildSystemSnapshot()}` },

  { keywords: ['teaching schedule', 'my schedule', 'my class schedule'], priority: 8,
    response: (ctx) => {
      if (ctx.context === 'faculty') return facultyScheduleFor(ctx.userEmail);
      if (ctx.context === 'student') return studentScheduleFor(ctx.userEmail);
      return `${facultyScheduleFor()}\n\n---\n\n${studentScheduleFor()}`;
    }},

  { keywords: ['enrolled subjects', 'my subjects', 'credit units', 'total units'], priority: 8,
    response: () => {
      const enrolled = initialSubjects.filter((s) => studentEnrolledSubjectIds.includes(s.id));
      const units = enrolled.reduce((sum, s) => sum + s.units, 0);
      return `📖 **Enrolled Subjects (${units} units):**\n${enrolled.map((s) => `• **${s.code}** — ${s.name} | ${s.units} units | ${s.department}`).join('\n')}`;
    }},

  { keywords: ['exam schedule', 'midterm', 'final exam', 'exams'], priority: 8,
    response: () => `📝 **Exam Schedule:**\n${initialExams.map((e) => {
      const subj = initialSubjects.find((s) => s.id === e.subjectId);
      return `• **${subj?.name}** — ${e.type.toUpperCase()} | ${e.date} | ${e.startTime}–${e.endTime} | Room: ${e.room}`;
    }).join('\n')}` },

  { keywords: ['instructor', 'my instructors', 'who teaches'], priority: 7,
    response: () => `👨‍🏫 **Faculty Directory:**\n${initialFaculty.map((f) => `• **${f.name}** — ${f.email} | ${f.department} | Teaches: ${f.subjects.join(', ')}`).join('\n')}` },

  { keywords: ['cs101', 'cs201', 'cs301', 'math101'], priority: 7,
    response: (_ctx, message) => {
      const lower = message.toLowerCase();
      const code = ['cs101', 'cs201', 'cs301', 'math101'].find((c) => lower.includes(c)) ?? 'cs101';
      const subj = initialSubjects.find((s) => s.code.toLowerCase() === code) ?? initialSubjects[0];
      const sec = initialSections.find((s) => s.subjectId === subj.id);
      if (!sec) return `No section found for ${subj.code}.`;
      const inst = initialFaculty.find((f) => f.id === sec.instructorId)!;
      const room = initialClassrooms.find((c) => c.id === sec.classroomId)!;
      return `📌 **${subj.code} — ${subj.name}**
Section: ${sec.code} | ${sec.day} ${sec.startTime}–${sec.endTime}
Instructor: ${inst.name} | Room: ${room.code} (${room.building})
Enrolled: ${sec.enrolled}/${sec.maxCapacity} students | ${subj.units} credit units`;
    }},

  { keywords: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'], priority: 6,
    response: () => {
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
      return days.map((day) => {
        const daySections = initialSections.filter((s) => s.day === day);
        const lines = daySections.map((sec) => {
          const subj = initialSubjects.find((s) => s.id === sec.subjectId);
          return `  • ${sec.startTime} ${subj?.code} @ ${initialClassrooms.find((c) => c.id === sec.classroomId)?.code}`;
        });
        return `**${day}:**\n${lines.length ? lines.join('\n') : '  No classes'}`;
      }).join('\n\n');
    }},

  { keywords: ['backup', 'restore', 'report'], priority: 7,
    response: `💾 **Admin Tools:**

**Reports:** Faculty workload, room utilization, student schedules, conflict reports, dashboard analytics
**Backup:** Super Admin → Backup → Create Backup Now (saves all users, schedules, academic data)
**Restore:** Upload backup file → Restore System` },

  { keywords: ['notification', 'alerts', 'schedule change'], priority: 6,
    response: `🔔 **Notification System:**

• Schedule change alerts
• Class cancellation notices
• Room change notifications
• Academic announcements

Click the **bell icon** 🔔 in the header to view notifications. Unread count shows as a red badge.` },

  { keywords: ['sidebar', 'hamburger', 'navigation', 'menu'], priority: 6,
    response: `🍔 **Navigation:**

• **Hamburger button** (☰) — opens/closes sidebar on mobile; collapses on desktop
• **Sidebar** — all role features and quick access to switch roles
• **Header** — notifications bell, user info, and **Logout** button` },

  { keywords: ['forgot password', 'reset password'], priority: 7,
    response: `🔑 In **demo mode**, all accounts use password: \`${DEMO_PASSWORD}\`\n\nFor a real deployment, password reset would email a secure link. Try logging in with the demo password or use **Quick Access** for instant entry!` },

  // General / outside world
  { keywords: ['what is ai', 'artificial intelligence', 'machine learning'], priority: 7,
    response: `🧠 **Artificial Intelligence (AI)** is technology that enables computers to perform tasks requiring human-like intelligence — understanding language, learning patterns, making decisions.

**In Education:** AI powers personalized learning, automated scheduling (like this system!), plagiarism detection, and intelligent tutoring.

**Machine Learning** is a subset where systems learn from data rather than being explicitly programmed.

I'm an example of AI — I understand your questions and respond with relevant knowledge! 🤖` },

  { keywords: ['study tip', 'study technique', 'how to study'], priority: 7,
    response: `📚 **Study Tips for College Students:**

1. **Pomodoro Technique** — 25 min focus, 5 min break
2. **Active recall** — test yourself instead of re-reading
3. **Spaced repetition** — review material over increasing intervals
4. **Study groups** — explain concepts to peers
5. **Use your schedule** — block study time between classes
6. **Sleep 7-8 hours** — memory consolidation happens during sleep
7. **Minimize distractions** — phone away during study blocks

Check your class schedule in the system to plan study sessions around your timetable!` },

  { keywords: ['philippine', 'philippines education', 'ched', 'k-12', 'k to 12'], priority: 7,
    response: `🇵🇭 **Philippine Education System:**

**K-12 Program:** 12 years basic education (Kinder + 6 elementary + 4 junior high + 2 senior high)

**Higher Education:** Regulated by **CHED** (Commission on Higher Education)
• Bachelor's degrees (4-5 years) — BSIT, BSCS, etc.
• Trimester/Semester systems vary by institution

**This System** models a typical Philippine university semester schedule with school years like 2025-2026, credit units, and CHED-style program structures (BSIT).` },

  { keywords: ['stem', 'what does stem stand'], priority: 6,
    response: `🔬 **STEM** = **S**cience, **T**echnology, **E**ngineering, **M**athematics

STEM education focuses on critical thinking, problem-solving, and innovation. Programs like **BSIT** and **BSCS** in this system are STEM-aligned courses preparing students for tech careers.` },

  { keywords: ['career', 'bsit', 'it career', 'job'], priority: 7,
    response: `💼 **BSIT Career Paths:**

• Software Developer / Engineer
• Web & Mobile App Developer
• Database Administrator
• Network Administrator
• IT Project Manager
• Cybersecurity Analyst
• Data Analyst / Scientist
• Cloud Solutions Architect
• UI/UX Designer
• IT Support Specialist

Build skills in programming (CS101), data structures (CS201), and databases (CS301) — all in your schedule!` },

  { keywords: ['lms', 'learning management'], priority: 6,
    response: `📱 **Learning Management System (LMS)** — platforms like Moodle, Canvas, or Google Classroom for delivering courses online, submitting assignments, and tracking grades. This Scheduling System complements an LMS by managing **when** and **where** classes happen!` },

  { keywords: ['cybersecurity', 'security tip'], priority: 6,
    response: `🔒 **Cybersecurity Tips for School Systems:**

1. Use strong, unique passwords
2. Enable role-based access control (like this system!)
3. Regular data backups
4. Keep software updated
5. Train staff on phishing awareness
6. Audit logs for suspicious activity
7. Encrypt sensitive student data
8. Limit admin access to necessary personnel` },

  { keywords: ['edtech', 'education technology', 'trends'], priority: 6,
    response: `🚀 **EdTech Trends 2025-2026:**

• AI-powered tutoring & chatbots (like Scheduly AI!)
• Automated academic scheduling
• Hybrid/blended learning models
• Learning analytics & dashboards
• Mobile-first student portals
• Cloud-based campus management
• VR/AR for immersive learning
• Micro-credentials & skill badges` },

  { keywords: ['teaching tip', 'classroom teaching'], priority: 6,
    response: `👨‍🏫 **Effective Teaching Tips:**

1. Start with clear learning objectives
2. Mix lecture with hands-on activities
3. Use real-world examples (industry cases)
4. Encourage questions and discussion
5. Provide timely feedback on assignments
6. Use the class list feature to know your students
7. Report schedule conflicts early to the registrar
8. Print your teaching schedule and keep it visible` },

  { keywords: ['time management', 'manage time'], priority: 6,
    response: `⏰ **Time Management for Students:**

1. Review your weekly timetable (Print Timetable feature!)
2. Color-code subjects by difficulty
3. Prep materials the night before
4. Arrive 10 minutes early to each class
5. Use gaps between classes for review
6. Set assignment deadlines in a planner
7. Balance academics with rest and social time` },

  { keywords: ['weather', 'temperature today'], priority: 5,
    response: `🌤️ I don't have live weather data, but I can tell you it's a great day to check your class schedule and stay prepared! For real-time weather, check your local weather app. Bring an umbrella during rainy season in the Philippines! ☔` },

  { keywords: ['calculate', 'math', 'plus', 'minus', 'multiply'], priority: 5,
    response: () => {
      const units = initialSubjects.filter((s) => studentEnrolledSubjectIds.includes(s.id)).reduce((sum, s) => sum + s.units, 0);
      return `🧮 I can solve math! Try "What is 15 + 27?" or ask about your ${units} enrolled credit units this semester.`;
    }},

  { keywords: ['programming', 'learn to code', 'coding'], priority: 6,
    response: `💻 **Learning Programming:**

Start with **CS101 — Introduction to Programming** in this system!

**Recommended path:**
1. CS101 — Programming fundamentals
2. CS201 — Data Structures (prereq: CS101)
3. CS301 — Database Systems (prereq: CS201)

**Tips:** Practice daily, build small projects, use online resources (freeCodeCamp, MDN), and join coding communities.` },

  { keywords: ['help', 'what can you help', 'what can you do'], priority: 8,
    response: (ctx) => `🤖 **I can help with:**

**📌 This System:**
• Schedules, subjects, rooms, faculty, exams
• Role-specific guides (${ctx.context})
• Login, registration, navigation
• Live data from the database

**🌍 General Knowledge:**
• Study & teaching tips
• Philippine education system
• IT careers & programming
• EdTech trends & AI concepts

**Try the quick questions below** or ask anything in your own words!` },

  // Extended knowledge for new quick questions
  { keywords: ['scheduly ai', 'chatbot', 'ai assistant', 'floating bot'], priority: 9,
    response: `🤖 **Scheduly AI** is the floating intelligent assistant built into every page of this system!

**Features:**
• Ask about schedules, users, roles, conflicts — live data
• 20+ quick questions per role (system, role, general)
• General education knowledge (study tips, careers, EdTech)
• Available on Home, Login, Register, and all 4 dashboards

**How to use:** Click the floating bot button (bottom-right) → pick a quick question or type your own!` },

  { keywords: ['mobile', 'responsive', 'phone', 'tablet'], priority: 7,
    response: `📱 **Yes — fully responsive!**

• **Mobile:** Hamburger opens slide-in sidebar, card-style tables, full-screen chatbot
• **Tablet:** 2-column grids, scrollable navigation
• **Desktop:** Persistent sidebar, collapsible via hamburger, full data tables

Works on all screen sizes with touch-friendly buttons and spacing.` },

  { keywords: ['fill button', 'fill login'], priority: 7,
    response: `📝 The **Fill** button on Quick Access cards auto-fills the login form with that role's demo email and password (\`${DEMO_PASSWORD}\`). Click **Sign In** to login manually after reviewing the credentials.` },

  { keywords: ['choose role', 'role when registering', 'pick role'], priority: 7,
    response: `👤 When registering, select your role from the dropdown:\n• **Super Admin** — full system control\n• **Registrar** — schedule management\n• **Faculty** — teaching schedule\n• **Student** — personal timetable\n\nYour dashboard and sidebar will match your selected role.` },

  { keywords: ['after login', 'after logging in', 'what happens after'], priority: 7,
    response: `✅ **After Login:**\n1. Redirected to your **role dashboard**\n2. Sidebar shows role-specific menu items\n3. Quick Access bar lets you switch roles\n4. Notifications bell shows alerts\n5. Scheduly AI adapts to your role with tailored quick questions` },

  { keywords: ['switch role', 'switch between role', 'change role'], priority: 7,
    response: `🔄 **Switch Roles:**\n• **Sidebar** → Quick Access buttons (Admin, Registrar, Faculty, Student)\n• **Login page** → Quick Access cards\n\nClick any role to instantly login as that demo user and navigate to their dashboard.` },

  { keywords: ['maria santos', 'registrar account'], priority: 8,
    response: `👩‍💼 **Maria Santos** — Registrar Demo Account\n• Email: registrar@school.edu\n• Role: Registrar / Academic Scheduler\n• Department: Registrar Office\n• Password: \`${DEMO_PASSWORD}\`\n\nCan create schedules, assign instructors/rooms, resolve conflicts, and generate reports.` },

  { keywords: ['ana cruz', 'student enrolled', 'student account subjects'], priority: 8,
    response: () => {
      const enrolled = initialSubjects.filter((s) => studentEnrolledSubjectIds.includes(s.id));
      const units = enrolled.reduce((sum, s) => sum + s.units, 0);
      return `🎓 **Ana Cruz** — Student Demo Account\n• Email: acruz@student.edu | BSIT | Password: \`${DEMO_PASSWORD}\`\n\n**Enrolled (${units} units):**\n${enrolled.map((s) => `• ${s.code} — ${s.name} (${s.units}u)`).join('\n')}`;
    }},

  { keywords: ['dr. john reyes', 'john reyes account', 'faculty account'], priority: 8,
    response: () => `${facultyScheduleFor('jreyes@school.edu')}\n\nDemo login: jreyes@school.edu | Password: \`${DEMO_PASSWORD}\`` },

  { keywords: ['admin@school', 'super admin account', 'super admin email'], priority: 8,
    response: `🛡️ **Super Admin Demo:**\n• Email: admin@school.edu\n• Name: Admin User\n• Department: IT Administration\n• Password: \`${DEMO_PASSWORD}\`\n\nFull access to users, settings, school year, all schedules, reports, and backup.` },

  { keywords: ['back to home', 'go home', 'home page'], priority: 7,
    response: `🏠 Go to **Home** via:\n• Navbar → **Home** link\n• Login page → "← Back to Home"\n• Logout → returns to home page\n• URL: \`/\`` },

  { keywords: ['ched meaning', 'what is ched'], priority: 7,
    response: `🏛️ **CHED** = **Commission on Higher Education** — the Philippine government agency overseeing colleges and universities. It sets policies on curricula, credit units, program accreditation, and academic calendars.` },

  { keywords: ['delete user', 'remove user', 'delete users'], priority: 7,
    response: `🗑️ **Delete Users:** Super Admin → Users & Roles → click the **trash icon** on any user row → user is removed from the system immediately.` },

  { keywords: ['enrollment stats', 'enrollment numbers', 'enrolled per section'], priority: 7,
    response: () => `📊 **Enrollment per Section:**\n${initialSections.map((s) => {
      const subj = initialSubjects.find((sub) => sub.id === s.subjectId);
      const pct = Math.round((s.enrolled / s.maxCapacity) * 100);
      return `• ${s.code} (${subj?.code}) — ${s.enrolled} enrolled / ${s.maxCapacity} max (${pct}% full)`;
    }).join('\n')}` },

  { keywords: ['dashboard stats', 'dashboard show', 'dashboard overview'], priority: 7,
    response: (ctx) => {
      const maps: Record<string, string> = {
        'super-admin': `📊 **Super Admin Dashboard:**\n• Total Users: ${demoUsers.length}\n• Active Schedules: ${initialSections.length}\n• Subjects: ${initialSubjects.length}\n• Pending Conflicts: ${initialConflicts.filter((c) => c.status === 'pending').length}\n• Quick actions: Users, School Year, Schedules, Reports, Backup`,
        registrar: `📊 **Registrar Dashboard:**\n• Class Sections: ${initialSections.length}\n• Instructors: ${initialFaculty.length}\n• Classrooms: ${initialClassrooms.length}\n• Conflicts: ${initialConflicts.filter((c) => c.status === 'pending').length}\n• Quick actions: Create Schedule, Assign, Conflicts, Reports`,
        faculty: `📊 **Faculty Dashboard:**\n• Teaching load, subjects, classrooms, notifications\n• Today's schedule preview\n• Quick actions: Schedule, Subjects, Class List, Report Conflict`,
        student: `📊 **Student Dashboard:**\n• Enrolled subjects, weekly classes, notifications, classrooms\n• Upcoming classes preview\n• Quick actions: Schedule, Subjects, Exams, Print Timetable`,
      };
      return maps[ctx.context] ?? maps['super-admin'];
    }},

  { keywords: ['audit log', 'activity monitoring', 'audit logs'], priority: 7,
    response: `📋 **Audit Logs** (Super Admin feature):\nTrack user actions — logins, schedule changes, user edits, settings updates. Navigate: Super Admin → System Administration → Audit Logs.\n\nIn this demo, audit logging is configured in Academic Settings with activity monitoring enabled.` },

  { keywords: ['max units', 'units per semester'], priority: 7,
    response: `📐 **Academic Setting:** Max units per semester = **24** (configurable in Super Admin → Academic Settings). Students typically enroll in 11-18 units per semester. Ana Cruz (demo student) has ${initialSubjects.filter((s) => studentEnrolledSubjectIds.includes(s.id)).reduce((sum, s) => sum + s.units, 0)} units.` },

  { keywords: ['lab-101 conflict', 'lab-101 room conflict', 'room conflict'], priority: 8,
    response: () => {
      const c = initialConflicts.find((x) => x.type === 'room');
      return `⚠️ **Room Conflict:**\n${c?.description ?? 'No room conflicts'}\n\nStatus: ${c?.status ?? '—'}\nResolve at: Registrar → Conflicts → Resolve`;
    }},

  { keywords: ['instructor conflict', 'john reyes conflict', 'reyes overlapping'], priority: 8,
    response: () => {
      const c = initialConflicts.find((x) => x.type === 'instructor');
      return `⚠️ **Instructor Conflict:**\n${c?.description ?? 'No instructor conflicts'}\n\nStatus: ${c?.status ?? '—'}`;
    }},

  { keywords: ['required when creating', 'fields required', 'new schedule fields'], priority: 7,
    response: `📋 **Create Schedule — Required Fields:**\n• Section Code (e.g. CS101-A)\n• Subject\n• Instructor\n• Classroom\n• Day of week\n• Start & End Time\n• Max Capacity\n\nSystem auto-checks for room conflicts before saving!` },

  { keywords: ['scheduling best practice', 'best practices for academic'], priority: 7,
    response: `📋 **Academic Scheduling Best Practices:**\n1. Schedule labs in lab rooms, lectures in lecture halls\n2. Avoid back-to-back rooms far apart\n3. Balance faculty workload evenly\n4. Leave buffer time between sessions\n5. Run conflict checks before publishing\n6. Notify faculty and students of changes promptly\n7. Review room utilization reports regularly` },

  { keywords: ['room utilization', 'improve classroom'], priority: 7,
    response: () => `📊 **Room Utilization:**\n${initialClassrooms.map((c) => {
      const used = initialSections.filter((s) => s.classroomId === c.id).length;
      return `• ${c.code} — ${used} sections scheduled | Capacity: ${c.capacity}`;
    }).join('\n')}\n\nTip: Consolidate small sections and use AUD-01 for large lectures to improve utilization.` },

  { keywords: ['enrollment open', '2nd semester enrollment', 'enrollment period'], priority: 7,
    response: `📢 **Enrollment Announcement:**\nEnrollment for 2nd semester opens **July 15** (from system notifications).\n\nActive semester: 1st Semester 2025-2026. Check Academic Settings for enrollment deadline.` },

  { keywords: ['conflict types can i report', 'types of schedule conflicts report'], priority: 7,
    response: `⚠️ **Reportable Conflict Types (Faculty):**\n• **Instructor Conflict** — you're double-booked\n• **Room Conflict** — room unavailable or wrong type\n• **Student Conflict** — enrollment overlap issues\n\nGo to: Faculty → Report Conflict → select section, type, and describe the issue.` },

  { keywords: ['unread notification', 'unread notifications', 'any notifications'], priority: 7,
    response: () => {
      const unread = initialNotifications.filter((n) => !n.read);
      return `🔔 **Unread Notifications (${unread.length}):**\n${unread.map((n) => `• **${n.title}** — ${n.message}`).join('\n') || 'All caught up!'}`;
    }},

  { keywords: ['cancelled class', 'class cancelled', 'class canceled'], priority: 8,
    response: () => {
      const cancel = initialNotifications.find((n) => n.type === 'cancellation');
      return `❌ **Class Cancellation:**\n${cancel ? `${cancel.title}: ${cancel.message}` : 'No cancellations at this time.'}`;
    }},

  { keywords: ['room change', 'classroom change', 'room changes'], priority: 8,
    response: () => {
      const change = initialNotifications.find((n) => n.type === 'room-change');
      return `🔄 **Room Change Alert:**\n${change ? `${change.title}: ${change.message}` : 'No recent room changes.'}`;
    }},

  { keywords: ['eng101', 'technical writing'], priority: 7,
    response: () => {
      const subj = initialSubjects.find((s) => s.code === 'ENG101');
      const enrolled = studentEnrolledSubjectIds.includes('sub4');
      return `📝 **ENG101 — Technical Writing**\n${subj?.units} units | ${subj?.department}\n${enrolled ? '✅ Ana Cruz (demo student) IS enrolled in ENG101.' : 'Not in demo student enrollment.'}`;
    }},

  { keywords: ['midterm examination', 'midterm exam', 'my midterm'], priority: 8,
    response: () => {
      const mids = initialExams.filter((e) => e.type === 'midterm');
      return `📝 **Midterm Exams:**\n${mids.map((e) => {
        const subj = initialSubjects.find((s) => s.id === e.subjectId);
        return `• ${subj?.name} — ${e.date} ${e.startTime}–${e.endTime} @ ${e.room}`;
      }).join('\n')}`;
    }},

  { keywords: ['final examination', 'final exam', 'my final'], priority: 8,
    response: () => {
      const finals = initialExams.filter((e) => e.type === 'final');
      return `📝 **Final Exams:**\n${finals.map((e) => {
        const subj = initialSubjects.find((s) => s.id === e.subjectId);
        return `• ${subj?.name} — ${e.date} ${e.startTime}–${e.endTime} @ ${e.room}`;
      }).join('\n') || 'Check exam schedule closer to finals week.'}`;
    }},

  { keywords: ['teaches me', 'john reyes teaches', 'reyes teaches'], priority: 8,
    response: () => {
      const fac = initialFaculty.find((f) => f.name.includes('John Reyes'))!;
      const studentSecs = initialSections.filter((s) => studentEnrolledSubjectIds.includes(s.subjectId) && s.instructorId === fac.id);
      return `👨‍🏫 **Dr. John Reyes teaches you:**\n${studentSecs.map((s) => {
        const subj = initialSubjects.find((sub) => sub.id === s.subjectId);
        return `• ${subj?.name} (${s.code}) — ${s.day} ${s.startTime}–${s.endTime}`;
      }).join('\n') || 'No overlapping subjects in demo enrollment.'}`;
    }},

  { keywords: ['students in cs101', 'cs101 students', 'how many in cs101'], priority: 8,
    response: () => {
      const sec = initialSections.find((s) => s.code === 'CS101-A');
      return sec ? `👥 **CS101-A:** ${sec.enrolled} students enrolled out of ${sec.maxCapacity} capacity (${Math.round(sec.enrolled / sec.maxCapacity * 100)}% full).` : 'Section not found.';
    }},

  { keywords: ['lab-101 room', 'which classes use lab'], priority: 7,
    response: () => {
      const secs = initialSections.filter((s) => s.classroomId === 'rm1');
      return `🏢 **LAB-101 Classes:**\n${secs.map((s) => {
        const subj = initialSubjects.find((sub) => sub.id === s.subjectId);
        const inst = initialFaculty.find((f) => f.id === s.instructorId);
        return `• ${subj?.code} (${s.code}) — ${inst?.name} | ${s.day} ${s.startTime}–${s.endTime}`;
      }).join('\n')}`;
    }},

  { keywords: ['active learning', 'what is active learning'], priority: 6,
    response: `🎯 **Active Learning** engages students through discussion, problem-solving, and hands-on activities rather than passive lectures. Examples: think-pair-share, live coding demos, group projects, and classroom polls.` },

  { keywords: ['grading tip', 'grading and feedback', 'best practices for grading'], priority: 6,
    response: `✅ **Grading Best Practices:**\n1. Use clear rubrics shared in advance\n2. Return feedback within 1-2 weeks\n3. Mix formative (quizzes) and summative (exams) assessments\n4. Comment on strengths, not just errors\n5. Offer office hours for grade discussions` },

  { keywords: ['internship tip', 'prepare for internship', 'it internship'], priority: 7,
    response: `💼 **IT Internship Tips:**\n1. Build a portfolio (GitHub) with class projects\n2. Learn Git, SQL, and one framework (React, Laravel)\n3. Practice coding interviews on LeetCode\n4. Get certifications (AWS, Cisco, CompTIA)\n5. Network at campus career fairs\n6. Apply skills from CS101, CS201, CS301!` },

  { keywords: ['programming courses in order', 'programming path', 'courses should i take'], priority: 7,
    response: () => `💻 **Recommended CS Path:**\n${initialSubjects.filter((s) => s.department === 'Computer Science').map((s) => `• ${s.code} — ${s.name}${s.prerequisites?.length ? ` (needs: ${s.prerequisites.join(', ')})` : ''}`).join('\n')}\n\nStart with CS101, then CS201, then CS301 after completing prerequisites.` },

  { keywords: ['data privacy', 'protect student data', 'student data privacy'], priority: 6,
    response: `🔐 **Student Data Privacy:**\n• Role-based access — students only see their own schedules\n• Encrypt data in transit (HTTPS) and at rest\n• Comply with Data Privacy Act (Philippines)\n• Limit data collection to what's necessary\n• Regular backups with access controls\n• Train staff on handling PII` },

  { keywords: ['cloud vs on-premise', 'on-premise', 'cloud school system'], priority: 6,
    response: `☁️ **Cloud vs On-Premise:**\n\n**Cloud:** Lower upfront cost, auto-updates, access anywhere, scalable — but needs internet.\n\n**On-Premise:** Full data control, works offline, customizable — but higher maintenance cost.\n\nMost modern schools choose cloud or hybrid models.` },
];

function scoreMatch(message: string, keywords: string[]): number {
  const lower = message.toLowerCase();
  let score = 0;
  for (const kw of keywords) {
    if (lower.includes(kw.toLowerCase())) {
      score += kw.split(' ').length;
    }
  }
  return score;
}

function tryMathEval(message: string): string | null {
  const match = message.match(/(?:what is|calculate|compute|solve)\s+([\d\s+\-*/().]+)/i);
  if (!match) return null;
  try {
    const expr = match[1].replace(/[^0-9+\-*/().\s]/g, '').trim();
    if (!expr || !/^[\d\s+\-*/().]+$/.test(expr)) return null;
    // eslint-disable-next-line no-new-func
    const result = Function(`"use strict"; return (${expr})`)();
    if (typeof result === 'number' && isFinite(result)) {
      return `🧮 **${expr}** = **${result}**`;
    }
  } catch { /* ignore */ }
  return null;
}

export function generateChatResponse(message: string, ctx: ChatbotDataContext): string {
  const trimmed = message.trim();
  if (!trimmed) return "Please type a question and I'll do my best to help! 💬";

  const mathResult = tryMathEval(trimmed);
  if (mathResult) return mathResult;

  let bestScore = 0;
  let bestResponse: string | null = null;

  for (const entry of knowledgeBase) {
    const score = scoreMatch(trimmed, entry.keywords);
    const weighted = score * (entry.priority ?? 1);
    if (weighted > bestScore) {
      bestScore = weighted;
      bestResponse = typeof entry.response === 'function' ? entry.response(ctx, trimmed) : entry.response;
    }
  }

  if (bestScore >= 1 && bestResponse) return bestResponse;

  // Context-aware fallback
  const contextHints: Record<ChatbotContext, string> = {
    guest: 'Try asking about system features, roles, registration, or how the scheduling flow works!',
    login: 'Try asking about demo accounts, passwords, quick access, or how to register!',
    'super-admin': 'Try asking about users, reports, school year, backups, or system-wide schedules!',
    registrar: 'Try asking about creating schedules, assigning instructors/rooms, or resolving conflicts!',
    faculty: 'Try asking about your teaching schedule, subjects, class list, or reporting conflicts!',
    student: 'Try asking about your class schedule, enrolled subjects, exams, or instructors!',
  };

  return `Hmm, I'm not 100% sure about that one! 🤔

As **Scheduly AI**, I specialize in:
• This School Scheduling System (schedules, roles, features, live data)
• Education topics (study tips, careers, Philippine education)
• General knowledge (AI, programming, EdTech)

${contextHints[ctx.context]}

**Quick tip:** Use the suggested questions below — they're tailored for your current role!`;
}

/** Self-test for chatbot engine — run via npm run test:chatbot */
export function runChatbotSelfTest(): { passed: number; failed: number; results: string[] } {
  const tests: { q: string; ctx: ChatbotDataContext; mustInclude: string[] }[] = [
    { q: 'Hello!', ctx: { context: 'guest' }, mustInclude: ['Scheduly AI'] },
    { q: 'What is this system?', ctx: { context: 'guest' }, mustInclude: ['School Scheduling'] },
    { q: 'Demo password?', ctx: { context: 'login' }, mustInclude: [DEMO_PASSWORD] },
    { q: 'How do I register?', ctx: { context: 'guest' }, mustInclude: ['Register'] },
    { q: 'What roles are available?', ctx: { context: 'guest' }, mustInclude: ['Super Admin'] },
    { q: 'My teaching schedule', ctx: { context: 'faculty', userEmail: 'jreyes@school.edu' }, mustInclude: ['John Reyes'] },
    { q: 'My class schedule', ctx: { context: 'student', userEmail: 'acruz@student.edu' }, mustInclude: ['units'] },
    { q: 'Pending conflicts?', ctx: { context: 'registrar' }, mustInclude: ['conflict'] },
    { q: 'List all users', ctx: { context: 'super-admin' }, mustInclude: ['admin@school.edu'] },
    { q: 'What is AI?', ctx: { context: 'guest' }, mustInclude: ['Artificial Intelligence'] },
    { q: 'Study tips', ctx: { context: 'student' }, mustInclude: ['Pomodoro'] },
    { q: 'BSIT career paths', ctx: { context: 'student' }, mustInclude: ['Software Developer'] },
    { q: 'What is 10 + 5?', ctx: { context: 'guest' }, mustInclude: ['15'] },
    { q: 'Classroom availability', ctx: { context: 'registrar' }, mustInclude: ['LAB-101'] },
    { q: 'Exam schedule', ctx: { context: 'student' }, mustInclude: ['midterm'] },
    { q: 'Scheduly AI chatbot?', ctx: { context: 'guest' }, mustInclude: ['Scheduly AI'] },
    { q: 'Maria Santos registrar account', ctx: { context: 'login' }, mustInclude: ['Maria Santos'] },
    { q: 'Enrollment stats per section', ctx: { context: 'super-admin' }, mustInclude: ['enrolled'] },
    { q: 'LAB-101 room conflict', ctx: { context: 'registrar' }, mustInclude: ['LAB-101'] },
    { q: 'How many students in CS101', ctx: { context: 'faculty' }, mustInclude: ['38'] },
    { q: 'Midterm examinations', ctx: { context: 'student' }, mustInclude: ['midterm'] },
    { q: 'Internship tips for IT', ctx: { context: 'student' }, mustInclude: ['portfolio'] },
    { q: 'Is the system mobile friendly?', ctx: { context: 'guest' }, mustInclude: ['responsive'] },
    { q: 'What is CHED?', ctx: { context: 'login' }, mustInclude: ['Commission on Higher Education'] },
  ];

  const results: string[] = [];
  let passed = 0;
  let failed = 0;

  for (const t of tests) {
    const response = generateChatResponse(t.q, t.ctx);
    const ok = t.mustInclude.every((s) => response.toLowerCase().includes(s.toLowerCase()));
    if (ok) {
      passed++;
      results.push(`✅ PASS: "${t.q}"`);
    } else {
      failed++;
      results.push(`❌ FAIL: "${t.q}" — expected ${t.mustInclude.join(', ')}`);
    }
  }

  return { passed, failed, results };
}
