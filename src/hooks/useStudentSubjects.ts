import { useAuth } from '../context/AuthContext';
import { userStudentSubjectIds, studentEnrolledSubjectIds } from '../data/mockData';

export function useStudentSubjectIds(): string[] {
  const { user } = useAuth();
  if (!user?.email) return studentEnrolledSubjectIds;
  return userStudentSubjectIds[user.email] ?? studentEnrolledSubjectIds;
}
