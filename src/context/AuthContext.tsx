import { createContext, useContext, useState, type ReactNode } from 'react';
import type { User, UserRole } from '../types';
import { useAppData } from './AppDataContext';
import { DEMO_PASSWORD } from '../config/roles';

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  department?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => { success: boolean; error?: string };
  loginAsUser: (user: User) => void;
  register: (data: RegisterData) => { success: boolean; error?: string };
  switchToRole: (role: UserRole) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { users, setUsers } = useAppData();
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    const found = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (!found) {
      return { success: false, error: 'No account found with this email. Register or use quick access.' };
    }
    if (password !== DEMO_PASSWORD) {
      return { success: false, error: 'Invalid password. Demo password: password123' };
    }
    setUser(found);
    return { success: true };
  };

  const loginAsUser = (target: User) => {
    setUser(target);
  };

  const register = (data: RegisterData) => {
    const email = data.email.trim().toLowerCase();
    if (!data.name || !email || !data.password) {
      return { success: false, error: 'Please fill in all required fields.' };
    }
    if (users.some((u) => u.email.toLowerCase() === email)) {
      return { success: false, error: 'An account with this email already exists.' };
    }
    if (data.password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }
    const newUser: User = {
      id: `u${Date.now()}`,
      name: data.name.trim(),
      email,
      role: data.role,
      department: data.department?.trim(),
    };
    setUsers((prev) => [...prev, newUser]);
    setUser(newUser);
    return { success: true };
  };

  const switchToRole = (role: UserRole) => {
    const found = users.find((u) => u.role === role);
    if (!found) return false;
    setUser(found);
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider
      value={{ user, login, loginAsUser, register, switchToRole, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
