import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
  GraduationCap,
  LogIn,
  UserPlus,
  Shield,
  ClipboardList,
  UserCircle,
  ArrowRight,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAppData } from '../context/AppDataContext';
import { Button } from '../components/ui/Button';
import { FormField, inputClass, selectClass } from '../components/ui/DataTable';
import { roleConfigs, rolePaths, DEMO_PASSWORD } from '../config/roles';
import { PublicLayout } from '../components/layout/PublicLayout';
import { DeveloperCredit } from '../components/ui/DeveloperCredit';
import type { UserRole, User } from '../types';

type AuthTab = 'login' | 'register';

const roleIcons = {
  'super-admin': Shield,
  registrar: ClipboardList,
  faculty: GraduationCap,
  student: UserCircle,
};

export function LoginPage() {
  const { login, loginAsUser, register, isAuthenticated, user } = useAuth();
  const { users } = useAppData();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [tab, setTab] = useState<AuthTab>(
    searchParams.get('tab') === 'register' ? 'register' : 'login'
  );
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [loginForm, setLoginForm] = useState({ email: '', password: DEMO_PASSWORD });
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student' as UserRole,
    department: '',
  });

  useEffect(() => {
    if (searchParams.get('tab') === 'register') setTab('register');
    if (searchParams.get('tab') === 'login') setTab('login');
  }, [searchParams]);

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(rolePaths[user.role], { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  if (isAuthenticated) return null;

  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  const handleQuickAccess = (demoUser: User) => {
    loginAsUser(demoUser);
    navigate(rolePaths[demoUser.role]);
  };

  const fillLogin = (demoUser: User) => {
    setTab('login');
    setLoginForm({ email: demoUser.email, password: DEMO_PASSWORD });
    clearMessages();
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();
    const result = login(loginForm.email, loginForm.password);
    if (result.success) {
      const found = users.find((u) => u.email.toLowerCase() === loginForm.email.trim().toLowerCase());
      if (found) navigate(rolePaths[found.role]);
    } else {
      setError(result.error ?? 'Login failed');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();
    if (registerForm.password !== registerForm.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    const result = register({
      name: registerForm.name,
      email: registerForm.email,
      password: registerForm.password,
      role: registerForm.role,
      department: registerForm.department,
    });
    if (result.success) {
      setSuccess('Account created! Redirecting to your dashboard...');
      setTimeout(() => navigate(rolePaths[registerForm.role]), 800);
    } else {
      setError(result.error ?? 'Registration failed');
    }
  };

  return (
    <PublicLayout variant="dark" className="bg-gradient-to-br from-slate-900 via-primary-900 to-indigo-950">
      <div className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-600/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 animate-fade-in">
          {/* Page header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex p-3 sm:p-4 bg-white/10 backdrop-blur-sm rounded-2xl mb-4 ring-1 ring-white/20">
              <GraduationCap className="text-white" size={32} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Welcome Back
            </h1>
            <p className="text-primary-200/80 mt-2 text-sm sm:text-base">
              <Link to="/" className="hover:text-white underline underline-offset-2 transition-colors">← Back to Home</Link>
              <span className="mx-2 opacity-40">·</span>
              Login, register, or quick-access any role
            </p>
          </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
          {/* Auth form panel */}
          <div className="lg:col-span-2 bg-white rounded-2xl sm:rounded-3xl shadow-2xl shadow-black/20 overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-gray-100">
              <button
                onClick={() => { setTab('login'); clearMessages(); }}
                className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-bold transition-all ${
                  tab === 'login'
                    ? 'text-primary-700 border-b-2 border-primary-600 bg-primary-50/50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <LogIn size={16} /> Login
              </button>
              <button
                onClick={() => { setTab('register'); clearMessages(); }}
                className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-bold transition-all ${
                  tab === 'register'
                    ? 'text-primary-700 border-b-2 border-primary-600 bg-primary-50/50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <UserPlus size={16} /> Register
              </button>
            </div>

            <div className="p-5 sm:p-7">
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600 font-medium animate-fade-in">
                  {error}
                </div>
              )}
              {success && (
                <div className="mb-4 p-3 bg-green-50 border border-green-100 rounded-xl text-sm text-green-600 font-medium animate-fade-in">
                  {success}
                </div>
              )}

              {tab === 'login' ? (
                <form onSubmit={handleLogin} className="space-y-1">
                  <FormField label="Email Address" required>
                    <input
                      className={inputClass}
                      type="email"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      placeholder="you@school.edu"
                      autoComplete="email"
                    />
                  </FormField>
                  <FormField label="Password" required>
                    <div className="relative">
                      <input
                        className={`${inputClass} pr-10`}
                        type={showPassword ? 'text' : 'password'}
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        placeholder="Enter password"
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </FormField>
                  <p className="text-[11px] text-gray-400 mb-4">
                    Demo password for all accounts: <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-gray-600">{DEMO_PASSWORD}</code>
                  </p>
                  <Button type="submit" className="w-full" size="lg">
                    <LogIn size={18} /> Sign In
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleRegister} className="space-y-1">
                  <FormField label="Full Name" required>
                    <input
                      className={inputClass}
                      value={registerForm.name}
                      onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                      placeholder="Juan Dela Cruz"
                    />
                  </FormField>
                  <FormField label="Email Address" required>
                    <input
                      className={inputClass}
                      type="email"
                      value={registerForm.email}
                      onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                      placeholder="you@school.edu"
                    />
                  </FormField>
                  <FormField label="Role" required>
                    <select
                      className={selectClass}
                      value={registerForm.role}
                      onChange={(e) => setRegisterForm({ ...registerForm, role: e.target.value as UserRole })}
                    >
                      {roleConfigs.map((r) => (
                        <option key={r.value} value={r.value}>{r.label}</option>
                      ))}
                    </select>
                  </FormField>
                  <FormField label="Department / Program">
                    <input
                      className={inputClass}
                      value={registerForm.department}
                      onChange={(e) => setRegisterForm({ ...registerForm, department: e.target.value })}
                      placeholder="e.g. BSIT, Computer Science"
                    />
                  </FormField>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <FormField label="Password" required>
                      <input
                        className={inputClass}
                        type="password"
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                        placeholder="Min. 6 characters"
                      />
                    </FormField>
                    <FormField label="Confirm Password" required>
                      <input
                        className={inputClass}
                        type="password"
                        value={registerForm.confirmPassword}
                        onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                        placeholder="Repeat password"
                      />
                    </FormField>
                  </div>
                  <Button type="submit" className="w-full mt-2" size="lg">
                    <UserPlus size={18} /> Create Account
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Quick access panel */}
          <div className="lg:col-span-3 flex flex-col gap-3 sm:gap-4">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl ring-1 ring-white/20 p-4 sm:p-6">
              <h2 className="text-white font-bold text-base sm:text-lg mb-1">Quick Access — All Roles</h2>
              <p className="text-primary-200/70 text-xs sm:text-sm mb-4">
                One-click login with pre-loaded system accounts. Click a card to enter that dashboard instantly.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {roleConfigs.map((role, i) => {
                  const demoUser = users.find((u) => u.role === role.value);
                  const Icon = roleIcons[role.value];
                  if (!demoUser) return null;
                  return (
                    <div
                      key={role.value}
                      className={`group bg-white rounded-2xl p-4 sm:p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slide-up border-2 ${role.borderColor} border-opacity-0 hover:border-opacity-100`}
                      style={{ animationDelay: `${i * 80}ms` }}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2.5 rounded-xl ${role.bgColor} ${role.color} shrink-0`}>
                          <Icon size={20} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-gray-900 text-sm sm:text-base">{role.label}</p>
                          <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{role.description}</p>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-gray-100 space-y-1">
                        <p className="text-sm font-semibold text-gray-800 truncate">{demoUser.name}</p>
                        <p className="text-xs text-gray-500 truncate">{demoUser.email}</p>
                        {demoUser.department && (
                          <p className="text-[10px] text-gray-400 truncate">{demoUser.department}</p>
                        )}
                      </div>

                      <div className="mt-3 flex gap-2">
                        <Button
                          size="sm"
                          className="flex-1"
                          onClick={() => handleQuickAccess(demoUser)}
                        >
                          Enter Dashboard <ArrowRight size={14} />
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => fillLogin(demoUser)}
                          title="Fill login form"
                        >
                          Fill
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <p className="text-center text-primary-300/60 text-[10px] sm:text-xs px-4">
              All demo accounts use password: <span className="font-mono text-primary-200">{DEMO_PASSWORD}</span>
            </p>
            <div className="flex justify-center px-4 pb-8 pt-4">
              <DeveloperCredit variant="dark" />
            </div>
          </div>
        </div>
        </div>
      </div>
    </PublicLayout>
  );
}
