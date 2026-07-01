import { Link } from 'react-router-dom';
import {
  GraduationCap,
  ArrowRight,
  LogIn,
  UserPlus,
  Calendar,
  Users,
  Building2,
  Bell,
  Shield,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Bot,
  MessageCircle,
} from 'lucide-react';
import { PublicLayout } from '../components/layout/PublicLayout';
import { Button } from '../components/ui/Button';
import { DeveloperCredit } from '../components/ui/DeveloperCredit';
import { roleConfigs } from '../config/roles';
import { systemFlowSteps, systemFeatures, roleCapabilities } from '../config/systemFlow';

export function HomePage() {
  return (
    <PublicLayout variant="light" className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-primary-900 to-indigo-950 text-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMS41Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-60" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-32">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 ring-1 ring-white/20 text-sm font-medium text-primary-200 mb-6">
              <Sparkles size={14} />
              Academic Scheduling Made Simple
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              School Scheduling
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-indigo-300 mt-1">
                System
              </span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-primary-100/80 leading-relaxed max-w-2xl mx-auto">
              Automate the creation, management, and monitoring of class schedules.
              Organize subjects, classrooms, instructors, and student timetables — all in one place.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link to="/login">
                <Button size="lg" className="w-full sm:w-auto min-w-[160px] shadow-xl shadow-primary-600/30">
                  <LogIn size={18} /> Get Started
                </Button>
              </Link>
              <Link to="/login?tab=register">
                <Button size="lg" variant="outline-light" className="w-full sm:w-auto min-w-[160px]">
                  <UserPlus size={18} /> Create Account
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-xs sm:text-sm text-primary-300/60">
              4 roles · Conflict detection · Real-time notifications · Reports
            </p>
            <div className="mt-8 flex justify-center">
              <DeveloperCredit variant="dark" />
            </div>
          </div>

          {/* Hero stats */}
          <div className="mt-14 sm:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
            {[
              { label: 'User Roles', value: '4', icon: Users },
              { label: 'Schedule Tools', value: '20+', icon: Calendar },
              { label: 'Conflict Checks', value: 'Auto', icon: Shield },
              { label: 'Notifications', value: 'Live', icon: Bell },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 ring-1 ring-white/15 text-center hover:bg-white/15 transition-colors"
              >
                <stat.icon size={22} className="mx-auto text-primary-300 mb-2" />
                <p className="text-xl sm:text-2xl font-bold">{stat.value}</p>
                <p className="text-xs sm:text-sm text-primary-200/70 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works — System Flow */}
      <section id="how-it-works" className="py-16 sm:py-24 bg-gray-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <p className="text-sm font-bold text-primary-600 uppercase tracking-wider mb-2">System Flow</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">How the System Works</h2>
            <p className="mt-4 text-gray-500 text-sm sm:text-base leading-relaxed">
              From first visit to daily scheduling — here is the complete journey through the School Scheduling System.
            </p>
          </div>

          <div className="relative">
            {/* Connector line — desktop */}
            <div className="hidden lg:block absolute top-12 left-[8%] right-[8%] h-0.5 bg-gradient-to-r from-primary-200 via-primary-400 to-primary-200" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {systemFlowSteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.step}
                    className="relative bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-slide-up"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`relative shrink-0 w-12 h-12 rounded-2xl ${step.bgColor} ${step.color} flex items-center justify-center font-bold text-lg shadow-sm`}>
                        <Icon size={22} />
                        <span className="absolute -top-2 -right-2 w-6 h-6 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-md">
                          {step.step}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-gray-900 text-base sm:text-lg">{step.title}</h3>
                        <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Flow summary arrow */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-gray-500">
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 size={16} className="text-green-500" /> Visit Home
            </span>
            <ChevronRight size={16} className="hidden sm:block text-gray-300" />
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 size={16} className="text-green-500" /> Login / Register
            </span>
            <ChevronRight size={16} className="hidden sm:block text-gray-300" />
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 size={16} className="text-green-500" /> Role Dashboard
            </span>
            <ChevronRight size={16} className="hidden sm:block text-gray-300" />
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 size={16} className="text-green-500" /> Manage & View
            </span>
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-sm font-bold text-primary-600 uppercase tracking-wider mb-2">Roles</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Built for Every User</h2>
            <p className="mt-4 text-gray-500 text-sm sm:text-base">
              Each role gets a dedicated dashboard, sidebar navigation, and tools matched to their responsibilities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {roleConfigs.map((role) => {
              const Icon = role.icon;
              const caps = roleCapabilities[role.value] ?? [];
              return (
                <div
                  key={role.value}
                  className={`rounded-2xl border-2 ${role.borderColor} p-5 sm:p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-2xl ${role.bgColor} ${role.color} shrink-0`}>
                      <Icon size={24} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-bold text-gray-900">{role.label}</h3>
                      <p className="text-sm text-gray-500 mt-0.5">{role.description}</p>
                      <ul className="mt-4 space-y-2">
                        {caps.map((cap) => (
                          <li key={cap} className="flex items-start gap-2 text-sm text-gray-600">
                            <CheckCircle2 size={14} className={`shrink-0 mt-0.5 ${role.color}`} />
                            {cap}
                          </li>
                        ))}
                      </ul>
                      <Link to="/login" className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-primary-600 hover:text-primary-700">
                        Access as {role.shortLabel} <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <p className="text-sm font-bold text-primary-600 uppercase tracking-wider mb-2">Features</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Everything Your Institution Needs</h2>
              <p className="mt-4 text-gray-500 leading-relaxed">
                From academic calendar setup to student timetables — the system covers the full scheduling lifecycle with conflict prevention and real-time updates.
              </p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {systemFeatures.map((feature) => (
                  <div key={feature} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-gray-100 shadow-sm">
                    <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[
                { icon: Calendar, label: 'Schedule Management', desc: 'Create & update class timetables' },
                { icon: Users, label: 'User Management', desc: 'Roles, registration & profiles' },
                { icon: Building2, label: 'Classroom Tracking', desc: 'Capacity & availability' },
                { icon: Bell, label: 'Notifications', desc: 'Alerts for schedule changes' },
              ].map((item) => (
                <div key={item.label} className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-2.5 bg-primary-50 text-primary-600 rounded-xl w-fit mb-3">
                    <item.icon size={20} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base">{item.label}</h3>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI Chatbot */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-indigo-950 via-primary-900 to-purple-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 ring-1 ring-white/20 text-sm font-medium text-primary-200 mb-4">
                <Bot size={16} /> Scheduly AI Assistant
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold">Your 24/7 Intelligent Guide</h2>
              <p className="mt-4 text-primary-100/80 leading-relaxed text-sm sm:text-base">
                Click the floating <strong className="text-white">AI chatbot</strong> on any page — home, login, register, or inside any role dashboard. Ask about schedules, your role, demo accounts, or general education topics.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  '20+ quick questions per role — one tap answers',
                  'Live system data: schedules, users, rooms, conflicts',
                  'General knowledge: study tips, careers, EdTech, AI',
                  'Available on every page for guests and all 4 roles',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-primary-100">
                    <MessageCircle size={16} className="text-primary-300 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-3xl ring-1 ring-white/20 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-400 to-indigo-500 flex items-center justify-center shadow-lg">
                  <Bot size={24} className="text-white" />
                </div>
                <div>
                  <p className="font-bold">Scheduly AI</p>
                  <p className="text-xs text-primary-200">Online · Ready to help</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="bg-white/10 rounded-2xl rounded-bl-md p-3 text-sm text-primary-100">
                  Hi! Ask me about the system, your schedule, or anything about education! 🎓
                </div>
                <div className="bg-primary-500/30 rounded-2xl rounded-br-md p-3 text-sm text-white ml-8">
                  What roles are available?
                </div>
                <div className="bg-white/10 rounded-2xl rounded-bl-md p-3 text-sm text-primary-100">
                  4 roles: Super Admin, Registrar, Faculty & Student — each with a dedicated dashboard! 👥
                </div>
              </div>
              <p className="text-center text-xs text-primary-300/60 mt-4">
                Look for the floating bot button at the bottom-right corner →
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Developer spotlight */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles size={12} />
              Meet the Creator
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Built by a Developer Who Cares
            </h2>
          </div>
          <DeveloperCredit variant="card" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-primary-600 to-indigo-700 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <GraduationCap size={40} className="mx-auto text-primary-200 mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold">Ready to Get Started?</h2>
          <p className="mt-4 text-primary-100/80 text-sm sm:text-base leading-relaxed">
            Register a new account or sign in with a demo role to explore the full system.
            Use quick-access on the login page to jump into any dashboard instantly.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/login">
              <Button size="lg" variant="secondary" className="min-w-[160px] shadow-xl">
                <LogIn size={18} /> Sign In
              </Button>
            </Link>
            <Link to="/login?tab=register">
              <Button size="lg" className="min-w-[160px] !bg-white !text-primary-700 hover:!bg-primary-50 shadow-xl">
                <UserPlus size={18} /> Register Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
