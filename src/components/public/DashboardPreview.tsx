import { Calendar, Users, Bell, LayoutDashboard, BarChart3 } from 'lucide-react';

export function DashboardPreview() {
  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-none animate-slide-up">
      <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/30 to-accent-500/30 rounded-[2rem] blur-2xl opacity-60" />
      <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl ring-1 ring-white/20 shadow-2xl overflow-hidden">
        {/* Mock browser chrome */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-black/20">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <div className="flex-1 mx-2 h-6 rounded-lg bg-white/10 text-[10px] text-primary-200/60 flex items-center justify-center font-medium">
            school-scheduling.app/dashboard
          </div>
        </div>

        <div className="flex min-h-[280px] sm:min-h-[320px]">
          {/* Mock sidebar */}
          <div className="hidden sm:flex flex-col w-16 lg:w-20 border-r border-white/10 bg-black/10 p-2 gap-2">
            <div className="w-10 h-10 mx-auto rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <LayoutDashboard size={16} className="text-white" />
            </div>
            {[Calendar, Users, BarChart3, Bell].map((Icon, i) => (
              <div
                key={i}
                className={`w-10 h-10 mx-auto rounded-xl flex items-center justify-center ${
                  i === 0 ? 'bg-white/20 text-white' : 'text-primary-300/50'
                }`}
              >
                <Icon size={16} />
              </div>
            ))}
          </div>

          {/* Mock content */}
          <div className="flex-1 p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-bold text-sm sm:text-base">Dashboard</p>
                <p className="text-primary-300/60 text-[10px] sm:text-xs">Live scheduling overview</p>
              </div>
              <span className="px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-[10px] font-bold ring-1 ring-emerald-400/30">
                Online
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {[
                { label: 'Sections', value: '24', color: 'from-primary-500/30 to-primary-600/10' },
                { label: 'Faculty', value: '18', color: 'from-emerald-500/30 to-emerald-600/10' },
                { label: 'Rooms', value: '12', color: 'from-accent-500/30 to-accent-600/10' },
                { label: 'Alerts', value: '3', color: 'from-amber-500/30 to-amber-600/10' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className={`rounded-xl bg-gradient-to-br ${stat.color} p-3 ring-1 ring-white/10`}
                >
                  <p className="text-lg sm:text-xl font-bold text-white">{stat.value}</p>
                  <p className="text-[10px] text-primary-200/70">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-3">
              <p className="text-[10px] font-semibold text-primary-200/80 mb-2">Weekly schedule load</p>
              <div className="flex items-end gap-1.5 h-16">
                {[40, 65, 45, 80, 55, 30, 20].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-md bg-gradient-to-t from-primary-600 to-primary-400 opacity-90"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating badges */}
      <div className="absolute -left-2 sm:-left-6 top-1/4 px-3 py-2 rounded-xl bg-white shadow-xl shadow-black/20 text-xs font-bold text-gray-800 animate-fade-in ring-1 ring-gray-100">
        <span className="text-primary-600">4</span> Role dashboards
      </div>
      <div className="absolute -right-2 sm:-right-4 bottom-8 px-3 py-2 rounded-xl bg-gradient-to-r from-primary-600 to-accent-500 text-white shadow-xl text-xs font-bold animate-fade-in">
        Scheduly AI ✨
      </div>
    </div>
  );
}
