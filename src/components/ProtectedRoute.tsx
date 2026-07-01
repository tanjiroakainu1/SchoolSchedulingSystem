import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { rolePaths } from '../config/roles';
import type { UserRole } from '../types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to={rolePaths[user.role]} replace />;
  }

  return <>{children}</>;
}
