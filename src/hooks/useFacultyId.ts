import { useAuth } from '../context/AuthContext';
import { useAppData } from '../context/AppDataContext';

export function useFacultyId(): string {
  const { user } = useAuth();
  const { faculty } = useAppData();
  return faculty.find((f) => f.email === user?.email)?.id ?? faculty[0]?.id ?? 'fac1';
}
