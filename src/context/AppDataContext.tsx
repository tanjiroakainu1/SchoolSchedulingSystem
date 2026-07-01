import { createContext, useContext, useState, type ReactNode } from 'react';
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
import {
  demoUsers,
  initialSchoolYears,
  initialSemesters,
  initialSubjects,
  initialClassrooms,
  initialFaculty,
  initialSections,
  initialConflicts,
  initialNotifications,
  initialExams,
} from '../data/mockData';

interface AppDataContextType {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  schoolYears: SchoolYear[];
  setSchoolYears: React.Dispatch<React.SetStateAction<SchoolYear[]>>;
  semesters: Semester[];
  setSemesters: React.Dispatch<React.SetStateAction<Semester[]>>;
  subjects: Subject[];
  setSubjects: React.Dispatch<React.SetStateAction<Subject[]>>;
  classrooms: Classroom[];
  setClassrooms: React.Dispatch<React.SetStateAction<Classroom[]>>;
  faculty: FacultyMember[];
  setFaculty: React.Dispatch<React.SetStateAction<FacultyMember[]>>;
  sections: ClassSection[];
  setSections: React.Dispatch<React.SetStateAction<ClassSection[]>>;
  conflicts: ScheduleConflict[];
  setConflicts: React.Dispatch<React.SetStateAction<ScheduleConflict[]>>;
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  exams: ExamSchedule[];
  setExams: React.Dispatch<React.SetStateAction<ExamSchedule[]>>;
  addNotification: (title: string, message: string, type: Notification['type']) => void;
}

const AppDataContext = createContext<AppDataContextType | null>(null);

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState(demoUsers);
  const [schoolYears, setSchoolYears] = useState(initialSchoolYears);
  const [semesters, setSemesters] = useState(initialSemesters);
  const [subjects, setSubjects] = useState(initialSubjects);
  const [classrooms, setClassrooms] = useState(initialClassrooms);
  const [faculty, setFaculty] = useState(initialFaculty);
  const [sections, setSections] = useState(initialSections);
  const [conflicts, setConflicts] = useState(initialConflicts);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [exams, setExams] = useState(initialExams);

  const addNotification = (title: string, message: string, type: Notification['type']) => {
    setNotifications((prev) => [
      {
        id: `n${Date.now()}`,
        title,
        message,
        type,
        read: false,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  return (
    <AppDataContext.Provider
      value={{
        users,
        setUsers,
        schoolYears,
        setSchoolYears,
        semesters,
        setSemesters,
        subjects,
        setSubjects,
        classrooms,
        setClassrooms,
        faculty,
        setFaculty,
        sections,
        setSections,
        conflicts,
        setConflicts,
        notifications,
        setNotifications,
        exams,
        setExams,
        addNotification,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error('useAppData must be used within AppDataProvider');
  return ctx;
}
