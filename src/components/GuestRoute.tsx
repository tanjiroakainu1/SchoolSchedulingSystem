import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { rolePaths } from '../config/roles';

interface GuestRouteProps {
  children: React.ReactNode;
}

export function GuestRoute({ children }: GuestRouteProps) {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated && user) {
    return <Navigate to={rolePaths[user.role]} replace />;
  }

  return <>{children}</>;
}
