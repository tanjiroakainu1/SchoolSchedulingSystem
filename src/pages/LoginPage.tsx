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
  Mail,
  Lock,
  User as UserIcon,
  Building2,
  Sparkles,
  Zap,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAppData } from '../context/AppDataContext';
import { Button } from '../components/ui/Button';
import { roleConfigs, rolePaths, DEMO_PASSWORD } from '../config/roles';
import { PublicLayout } from '../components/layout/PublicLayout';
import { DeveloperCredit } from '../components/ui/DeveloperCredit';
import { AuthField } from '../components/public';
import { PublicMeshBackground } from '../components/public';
import type { UserRole, User } from '../types';

type AuthTab = 'login' | 'register';

const roleIcons = {
  'super-admin': Shield,
  registrar: ClipboardList,
  faculty: GraduationCap,
  student: UserCircle,
};

const brandFeatures = [
  { icon: Zap, text: 'One-click demo access for all 4 roles' },
  { icon: Shield, text: 'Secure role-based dashboards' },
  { icon: Sparkles, text: 'Scheduly AI assistant on every page' },
];

export function LoginPage() {
  const { login, loginAsUser, register, isAuthenticated, user } = useAuth();
  const { users } = useAppData();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

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

  const switchTab = (next: AuthTab) => {
    setTab(next);
    setSearchParams(next === 'register' ? { tab: 'register' } : {});
    clearMessages();
  };

  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  const handleQuickAccess = (demoUser: User) => {
    loginAsUser(demoUser);
    navigate(rolePaths[demoUser.role]);
  };

  const fillLogin = (demoUser: User) => {
    switchTab('login');
    setLoginForm({ email: demoUser.email, password: DEMO_PASSWORD });
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
    <PublicLayout variant="dark" className="bg-slate-950">
      <div className="relative min-h-[calc(100dvh-8rem)] overflow-hidden">
        <PublicMeshBackground />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 lg:py-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-200/80 hover:text-white transition-colors mb-6 sm:mb-8 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to Home
          </Link>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 xl:gap-10 items-start">
            {/* Brand panel */}
            <div className="xl:col-span-5 space-y-6 animate-fade-in">
              <div className="inline-flex p-3.5 rounded-2xl bg-gradient-to-br from-primary-500 to-indigo-600 shadow-xl shadow-primary-900/40 ring-1 ring-white/20">
                <GraduationCap className="text-white" size={28} />
              </div>
              <div>
                <p className="text-primary-300 text-sm font-bold uppercase tracking-widest mb-2">Welcome</p>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.1]">
                  Sign in to your
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-300 via-sky-300 to-indigo-300 mt-1">
                    academic workspace
                  </span>
                </h1>
                <p className="mt-4 text-primary-100/70 text-sm sm:text-base leading-relaxed max-w-md">
                  Login, create an account, or jump straight into any role dashboard with our demo quick-access cards.
                </p>
              </div>

              <ul className="space-y-3">
                {brandFeatures.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-3 text-sm text-primary-100/80">
                    <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-white/10 ring-1 ring-white/15 shrink-0">
                      <Icon size={15} className="text-primary-300" />
                    </span>
                    {text}
                  </li>
                ))}
              </ul>

              <div className="hidden lg:flex p-4 rounded-2xl bg-white/5 ring-1 ring-white/10 backdrop-blur-sm">
                <p className="text-xs text-primary-200/60 leading-relaxed">
                  <span className="text-white font-semibold">Demo tip:</span> All accounts use password{' '}
                  <code className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-primary-200">{DEMO_PASSWORD}</code>
                  {' '}— click any quick-access card to explore instantly.
                </p>
              </div>
            </div>

            {/* Auth + quick access */}
            <div className="xl:col-span-7 space-y-5 sm:space-y-6 animate-slide-up">
              {/* Auth card */}
              <div className="bg-white rounded-3xl shadow-2xl shadow-black/30 ring-1 ring-white/20 overflow-hidden">
                <div className="p-1.5 bg-gray-50 border-b border-gray-100">
                  <div className="grid grid-cols-2 gap-1">
                    <button
                      type="button"
                      onClick={() => switchTab('login')}
                      className={`flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold transition-all ${
                        tab === 'login'
                          ? 'bg-white text-primary-700 shadow-md shadow-primary-100 ring-1 ring-primary-100'
                          : 'text-gray-500 hover:text-gray-700 hover:bg-white/60'
                      }`}
                    >
                      <LogIn size={16} /> Sign In
                    </button>
                    <button
                      type="button"
                      onClick={() => switchTab('register')}
                      className={`flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold transition-all ${
                        tab === 'register'
                          ? 'bg-white text-primary-700 shadow-md shadow-primary-100 ring-1 ring-primary-100'
                          : 'text-gray-500 hover:text-gray-700 hover:bg-white/60'
                      }`}
                    >
                      <UserPlus size={16} /> Register
                    </button>
                  </div>
                </div>

                <div className="p-5 sm:p-8">
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900">
                      {tab === 'login' ? 'Sign in to your account' : 'Create your account'}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {tab === 'login'
                        ? 'Enter your credentials or use quick access below.'
                        : 'Join the system and get your own role dashboard.'}
                    </p>
                  </div>

                  {error && (
                    <div className="mb-5 p-3.5 bg-rose-50 border border-rose-100 rounded-xl text-sm text-rose-600 font-medium flex items-start gap-2 animate-fade-in">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                      {error}
                    </div>
                  )}
                  {success && (
                    <div className="mb-5 p-3.5 bg-emerald-50 border border-emerald-100 rounded-xl text-sm text-emerald-700 font-medium flex items-center gap-2 animate-fade-in">
                      <CheckCircle2 size={16} className="shrink-0" />
                      {success}
                    </div>
                  )}

                  {tab === 'login' ? (
                    <form onSubmit={handleLogin}>
                      <AuthField
                        label="Email Address"
                        type="email"
                        required
                        icon={<Mail size={16} />}
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                        placeholder="you@school.edu"
                        autoComplete="email"
                      />
                      <AuthField
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        icon={<Lock size={16} />}
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        placeholder="Enter password"
                        autoComplete="current-password"
                        hint={`Demo password: ${DEMO_PASSWORD}`}
                        suffix={
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                          >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        }
                      />
                      <Button type="submit" className="w-full" size="lg">
                        <LogIn size={18} /> Sign In
                      </Button>
                    </form>
                  ) : (
                    <form onSubmit={handleRegister}>
                      <AuthField
                        label="Full Name"
                        required
                        icon={<UserIcon size={16} />}
                        value={registerForm.name}
                        onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                        placeholder="Juan Dela Cruz"
                      />
                      <AuthField
                        label="Email Address"
                        type="email"
                        required
                        icon={<Mail size={16} />}
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                        placeholder="you@school.edu"
                      />
                      <div className="mb-4">
                        <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">
                          Select Role <span className="text-rose-500">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {roleConfigs.map((role) => {
                            const Icon = role.icon;
                            const selected = registerForm.role === role.value;
                            return (
                              <button
                                key={role.value}
                                type="button"
                                onClick={() => setRegisterForm({ ...registerForm, role: role.value })}
                                className={`flex items-center gap-2.5 p-3 rounded-xl border-2 text-left transition-all ${
                                  selected
                                    ? `${role.borderColor} ${role.bgColor} ring-2 ring-offset-1 ring-primary-200`
                                    : 'border-gray-100 bg-gray-50/50 hover:border-gray-200 hover:bg-white'
                                }`}
                              >
                                <span className={`p-2 rounded-lg ${role.bgColor} ${role.color}`}>
                                  <Icon size={16} />
                                </span>
                                <span className="min-w-0">
                                  <span className="block text-xs font-bold text-gray-900 truncate">{role.shortLabel}</span>
                                  <span className="block text-[10px] text-gray-500 truncate">{role.description}</span>
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      <AuthField
                        label="Department / Program"
                        icon={<Building2 size={16} />}
                        value={registerForm.department}
                        onChange={(e) => setRegisterForm({ ...registerForm, department: e.target.value })}
                        placeholder="e.g. BSIT, Computer Science"
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                        <AuthField
                          label="Password"
                          type="password"
                          required
                          icon={<Lock size={16} />}
                          value={registerForm.password}
                          onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                          placeholder="Min. 6 characters"
                        />
                        <AuthField
                          label="Confirm Password"
                          type="password"
                          required
                          icon={<Lock size={16} />}
                          value={registerForm.confirmPassword}
                          onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                          placeholder="Repeat password"
                        />
                      </div>
                      <Button type="submit" className="w-full mt-2" size="lg">
                        <UserPlus size={18} /> Create Account
                      </Button>
                    </form>
                  )}
                </div>
              </div>

              {/* Quick access */}
              <div className="rounded-3xl bg-white/8 backdrop-blur-xl ring-1 ring-white/15 p-5 sm:p-6 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-5">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary-300 mb-1">Quick Access</p>
                    <h3 className="text-lg sm:text-xl font-bold text-white">Try every role instantly</h3>
                    <p className="text-sm text-primary-200/60 mt-1">One-click demo login — no form needed</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-bold ring-1 ring-emerald-400/25 w-fit">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live demos
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {roleConfigs.map((role, i) => {
                    const demoUser = users.find((u) => u.role === role.value);
                    const Icon = roleIcons[role.value];
                    if (!demoUser) return null;
                    return (
                      <div
                        key={role.value}
                        className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 animate-slide-up"
                        style={{ animationDelay: `${i * 70}ms` }}
                      >
                        <div className={`h-1.5 bg-gradient-to-r ${role.value === 'super-admin' ? 'from-purple-500 to-violet-600' : role.value === 'registrar' ? 'from-blue-500 to-cyan-500' : role.value === 'faculty' ? 'from-emerald-500 to-teal-500' : 'from-amber-500 to-orange-500'}`} />
                        <div className="p-4 sm:p-5">
                          <div className="flex items-start gap-3">
                            <div className={`p-2.5 rounded-xl ${role.bgColor} ${role.color} shrink-0 shadow-sm`}>
                              <Icon size={20} />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-bold text-gray-900">{role.label}</p>
                              <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{role.description}</p>
                            </div>
                          </div>

                          <div className="mt-4 p-3 rounded-xl bg-gray-50 border border-gray-100 space-y-0.5">
                            <p className="text-sm font-semibold text-gray-800 truncate">{demoUser.name}</p>
                            <p className="text-xs text-gray-500 truncate">{demoUser.email}</p>
                            {demoUser.department && (
                              <p className="text-[10px] text-gray-400 truncate">{demoUser.department}</p>
                            )}
                          </div>

                          <div className="mt-4 flex gap-2">
                            <Button size="sm" className="flex-1" onClick={() => handleQuickAccess(demoUser)}>
                              Enter <ArrowRight size={14} />
                            </Button>
                            <Button size="sm" variant="secondary" onClick={() => fillLogin(demoUser)}>
                              Fill Form
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-center pb-4">
                <DeveloperCredit variant="dark" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
