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
  BarChart3,
  Zap,
  LayoutDashboard,
} from 'lucide-react';
import { PublicLayout } from '../components/layout/PublicLayout';
import { Button } from '../components/ui/Button';
import { DeveloperCredit } from '../components/ui/DeveloperCredit';
import { SectionHeader, DashboardPreview, PublicMeshBackground } from '../components/public';
import { roleConfigs } from '../config/roles';
import { systemFlowSteps, systemFeatures, roleCapabilities } from '../config/systemFlow';

const trustBadges = [
  { icon: Shield, label: 'Role-based security' },
  { icon: Zap, label: 'Instant demo access' },
  { icon: BarChart3, label: 'Live analytics' },
  { icon: Bot, label: 'AI assistant' },
];

export function HomePage() {
  return (
    <PublicLayout variant="light" className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden brand-mesh-dark text-white">
        <PublicMeshBackground />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Copy */}
            <div className="text-center lg:text-left animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 ring-1 ring-white/20 text-sm font-semibold text-primary-200 mb-6">
                <Sparkles size={14} className="text-amber-300" />
                Academic Scheduling Made Simple
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.08]">
                School Scheduling
                <span className="block brand-gradient-text mt-2">
                  System
                </span>
              </h1>
              <p className="mt-5 text-base sm:text-lg text-primary-100/75 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Automate class schedules, manage roles, detect conflicts, and give every student and faculty member a beautiful dashboard — all in one place.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3">
                <Link to="/login">
                  <Button size="lg" className="w-full sm:w-auto min-w-[170px] shadow-xl shadow-primary-600/30">
                    <LogIn size={18} /> Get Started
                  </Button>
                </Link>
                <Link to="/login?tab=register">
                  <Button size="lg" variant="outline-light" className="w-full sm:w-auto min-w-[170px]">
                    <UserPlus size={18} /> Create Account
                  </Button>
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3">
                {trustBadges.map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/8 ring-1 ring-white/15 text-xs font-semibold text-primary-100/90"
                  >
                    <Icon size={13} className="text-primary-300" />
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* Preview */}
            <div className="lg:pl-4">
              <DashboardPreview />
            </div>
          </div>

          {/* Hero stats */}
          <div className="mt-14 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { label: 'User Roles', value: '4', icon: Users, grad: 'from-primary-500/25 to-accent-500/10' },
              { label: 'Schedule Tools', value: '20+', icon: Calendar, grad: 'from-emerald-500/20 to-teal-600/5' },
              { label: 'Conflict Checks', value: 'Auto', icon: Shield, grad: 'from-accent-500/20 to-accent-600/5' },
              { label: 'Notifications', value: 'Live', icon: Bell, grad: 'from-primary-400/20 to-accent-400/5' },
            ].map((stat) => (
              <div
                key={stat.label}
                className={`bg-gradient-to-br ${stat.grad} backdrop-blur-sm rounded-2xl p-4 sm:p-5 ring-1 ring-white/15 text-center hover:ring-white/25 hover:bg-white/5 transition-all duration-300 group`}
              >
                <stat.icon size={22} className="mx-auto text-primary-300 mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xl sm:text-2xl font-extrabold">{stat.value}</p>
                <p className="text-xs sm:text-sm text-primary-200/70 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-16 sm:py-24 bg-gray-50 scroll-mt-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader
            eyebrow="System Flow"
            title="How the System Works"
            description="From first visit to daily scheduling — here is the complete journey through the School Scheduling System."
          />

          <div className="relative">
            <div className="hidden lg:block absolute top-14 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {systemFlowSteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.step}
                    className="relative bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-primary-100 transition-all duration-300 animate-slide-up group"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`relative shrink-0 w-12 h-12 rounded-2xl ${step.bgColor} ${step.color} flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform`}>
                        <Icon size={22} />
                        <span className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-primary-600 to-accent-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-md">
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

          <div className="mt-12 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {['Visit Home', 'Login / Register', 'Role Dashboard', 'Manage & View'].map((label, i, arr) => (
              <span key={label} className="flex items-center gap-2 sm:gap-3">
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-gray-100 text-xs sm:text-sm font-semibold text-gray-700 shadow-sm">
                  <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                  {label}
                </span>
                {i < arr.length - 1 && <ChevronRight size={16} className="text-gray-300 hidden sm:block" />}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader
            eyebrow="Roles"
            title="Built for Every User"
            description="Each role gets a dedicated dashboard, sidebar navigation, and tools matched to their responsibilities."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {roleConfigs.map((role) => {
              const Icon = role.icon;
              const caps = roleCapabilities[role.value] ?? [];
              const topGrad =
                role.value === 'super-admin'
                  ? 'from-primary-600 to-primary-800'
                  : role.value === 'registrar'
                    ? 'from-teal-500 to-emerald-600'
                    : role.value === 'faculty'
                      ? 'from-emerald-500 to-primary-600'
                      : 'from-accent-400 to-accent-600';
              return (
                <div
                  key={role.value}
                  className={`relative rounded-2xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-white group`}
                >
                  <div className={`h-1 bg-gradient-to-r ${topGrad}`} />
                  <div className="p-5 sm:p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-2xl ${role.bgColor} ${role.color} shrink-0 shadow-sm group-hover:scale-105 transition-transform`}>
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
                        <Link
                          to="/login"
                          className="inline-flex items-center gap-1.5 mt-5 px-4 py-2 rounded-xl text-sm font-bold text-primary-700 bg-primary-50 hover:bg-primary-100 transition-colors"
                        >
                          Access as {role.shortLabel} <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
        <PublicMeshBackground variant="light" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <SectionHeader
                align="left"
                eyebrow="Features"
                title="Everything Your Institution Needs"
                description="From academic calendar setup to student timetables — the system covers the full scheduling lifecycle with conflict prevention and real-time updates."
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {systemFeatures.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-start gap-2.5 p-3.5 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-primary-100 transition-all"
                  >
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[
                { icon: Calendar, label: 'Schedule Management', desc: 'Create & update class timetables', color: 'bg-primary-50 text-primary-600' },
                { icon: Users, label: 'User Management', desc: 'Roles, registration & profiles', color: 'bg-primary-50 text-primary-700' },
                { icon: Building2, label: 'Classroom Tracking', desc: 'Capacity & availability', color: 'bg-emerald-50 text-emerald-600' },
                { icon: LayoutDashboard, label: 'Live Dashboards', desc: 'Charts & analytics per role', color: 'bg-amber-50 text-amber-600' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className={`p-2.5 ${item.color} rounded-xl w-fit mb-3`}>
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
      <section className="py-16 sm:py-24 bg-gradient-to-br from-primary-950 via-primary-900 to-accent-950 text-white relative overflow-hidden">
        <PublicMeshBackground />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <SectionHeader
                align="left"
                light
                eyebrow="Scheduly AI"
                title="Your 24/7 Intelligent Guide"
                description="Click the floating AI chatbot on any page — home, login, register, or inside any role dashboard. Ask about schedules, roles, demo accounts, or education topics."
              />
              <ul className="space-y-3">
                {[
                  '20+ quick questions per role — one tap answers',
                  'Live system data: schedules, users, rooms, conflicts',
                  'General knowledge: study tips, careers, EdTech, AI',
                  'Available on every page for guests and all 4 roles',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-primary-100/90 p-3 rounded-xl bg-white/5 ring-1 ring-white/10">
                    <MessageCircle size={16} className="text-primary-300 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl ring-1 ring-white/20 p-6 sm:p-8 shadow-2xl animate-float">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center shadow-lg ring-2 ring-white/20">
                  <Bot size={24} className="text-white" />
                </div>
                <div>
                  <p className="font-bold text-lg">Scheduly AI</p>
                  <p className="text-xs text-emerald-300 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online · Ready to help
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="bg-white/10 rounded-2xl rounded-bl-md p-3.5 text-sm text-primary-100 leading-relaxed">
                  Hi! Ask me about the system, your schedule, or anything about education! 🎓
                </div>
                <div className="bg-gradient-to-br from-primary-500/40 to-accent-500/40 rounded-2xl rounded-br-md p-3.5 text-sm text-white ml-6 ring-1 ring-white/10">
                  What roles are available?
                </div>
                <div className="bg-white/10 rounded-2xl rounded-bl-md p-3.5 text-sm text-primary-100 leading-relaxed">
                  4 roles: Super Admin, Registrar, Faculty & Student — each with a dedicated dashboard! 👥
                </div>
              </div>
              <p className="text-center text-xs text-primary-300/60 mt-5 flex items-center justify-center gap-1">
                Floating bot at bottom-right <ArrowRight size={12} />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Developer */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <SectionHeader
            eyebrow="Meet the Creator"
            title="Built by a Developer Who Cares"
            description="Crafted with passion by Raminder Jangao — every dashboard, chart, and AI feature designed for real academic workflows."
          />
          <DeveloperCredit variant="card" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-accent-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-400/25 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex p-4 rounded-2xl bg-white/10 ring-1 ring-white/20 mb-5">
            <GraduationCap size={36} className="text-primary-200" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">Ready to Get Started?</h2>
          <p className="mt-4 text-primary-100/80 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Register a new account or sign in with a demo role to explore the full system.
            Use quick-access on the login page to jump into any dashboard instantly.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/login">
              <Button size="lg" variant="secondary" className="min-w-[180px] shadow-xl">
                <LogIn size={18} /> Sign In
              </Button>
            </Link>
            <Link to="/login?tab=register">
              <Button size="lg" className="min-w-[180px] !bg-white !text-primary-700 hover:!bg-primary-50 shadow-xl">
                <UserPlus size={18} /> Register Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
