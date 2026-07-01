import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppDataProvider } from './context/AppDataContext';
import { ChatbotProvider } from './context/ChatbotContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { GuestRoute } from './components/GuestRoute';
import { RoleLayout } from './components/layout/RoleLayout';
import { ChatbotWidget } from './components/chatbot/ChatbotWidget';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { superAdminNav, registrarNav, facultyNav, studentNav } from './config/navigation';

import {
  SuperAdminDashboard,
  UserManagement,
  AcademicSettings,
  SchoolYearSemester,
  AllSchedules,
  SystemReports,
  BackupRestore,
} from './roles/super-admin';

import {
  RegistrarDashboard,
  CreateSchedule,
  AssignInstructors,
  AssignClassrooms,
  ManageSections,
  ConflictResolution,
  TimetableReports,
} from './roles/registrar';

import {
  FacultyDashboard,
  TeachingSchedule,
  AssignedSubjects,
  AssignedClassrooms,
  ClassList,
  ReportConflict,
} from './roles/faculty';

import {
  StudentDashboard,
  ClassSchedule,
  EnrolledSubjects,
  ClassroomAssignments,
  InstructorInfo,
  ExamSchedule,
  PrintTimetable,
} from './roles/student';

function App() {
  return (
    <AppDataProvider>
      <AuthProvider>
        <BrowserRouter>
          <ChatbotProvider>
            <Routes>
            <Route path="/" element={<GuestRoute><HomePage /></GuestRoute>} />
            <Route path="/login" element={<GuestRoute><LoginPage /></GuestRoute>} />

            <Route
              path="/super-admin"
              element={
                <ProtectedRoute allowedRoles={['super-admin']}>
                  <RoleLayout navItems={superAdminNav} basePath="/super-admin" />
                </ProtectedRoute>
              }
            >
              <Route index element={<SuperAdminDashboard />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="academic-settings" element={<AcademicSettings />} />
              <Route path="school-year" element={<SchoolYearSemester />} />
              <Route path="schedules" element={<AllSchedules />} />
              <Route path="reports" element={<SystemReports />} />
              <Route path="backup" element={<BackupRestore />} />
            </Route>

            <Route
              path="/registrar"
              element={
                <ProtectedRoute allowedRoles={['registrar']}>
                  <RoleLayout navItems={registrarNav} basePath="/registrar" />
                </ProtectedRoute>
              }
            >
              <Route index element={<RegistrarDashboard />} />
              <Route path="create-schedule" element={<CreateSchedule />} />
              <Route path="assign-instructors" element={<AssignInstructors />} />
              <Route path="assign-classrooms" element={<AssignClassrooms />} />
              <Route path="sections" element={<ManageSections />} />
              <Route path="conflicts" element={<ConflictResolution />} />
              <Route path="timetable-reports" element={<TimetableReports />} />
            </Route>

            <Route
              path="/faculty"
              element={
                <ProtectedRoute allowedRoles={['faculty']}>
                  <RoleLayout navItems={facultyNav} basePath="/faculty" />
                </ProtectedRoute>
              }
            >
              <Route index element={<FacultyDashboard />} />
              <Route path="teaching-schedule" element={<TeachingSchedule />} />
              <Route path="subjects" element={<AssignedSubjects />} />
              <Route path="classrooms" element={<AssignedClassrooms />} />
              <Route path="class-list" element={<ClassList />} />
              <Route path="report-conflict" element={<ReportConflict />} />
            </Route>

            <Route
              path="/student"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <RoleLayout navItems={studentNav} basePath="/student" />
                </ProtectedRoute>
              }
            >
              <Route index element={<StudentDashboard />} />
              <Route path="class-schedule" element={<ClassSchedule />} />
              <Route path="enrolled-subjects" element={<EnrolledSubjects />} />
              <Route path="classrooms" element={<ClassroomAssignments />} />
              <Route path="instructors" element={<InstructorInfo />} />
              <Route path="exam-schedule" element={<ExamSchedule />} />
              <Route path="print-timetable" element={<PrintTimetable />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <ChatbotWidget />
          </ChatbotProvider>
        </BrowserRouter>
      </AuthProvider>
    </AppDataProvider>
  );
}

export default App;
