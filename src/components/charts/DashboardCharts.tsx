import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  Line,
  RadialBarChart,
  RadialBar,
  ComposedChart,
} from 'recharts';
import { ChartCard, ChartGradients } from './ChartCard';
import { chartTooltipStyle, CHART_COLORS, DAY_ORDER } from '../../config/chartTheme';
import {
  getUsersByRole,
  getDepartmentDistribution,
  getEnrollmentBySection,
  getScheduleByDay,
  getConflictBreakdown,
  getConflictByType,
  getFacultyWorkload,
  getRoomUtilization,
  getSubjectPopularity,
  getFacultyWeeklyLoad,
  getSystemTrendData,
  getUserGrowthData,
} from '../../utils/chartData';
import { useAppData } from '../../context/AppDataContext';

// ─── Super Admin / System ───────────────────────────────────────────────────

export function UsersByRoleChart() {
  const { users } = useAppData();
  const data = getUsersByRole(users);
  return (
    <ChartCard title="Users by Role" subtitle="Role distribution across the system" accent="amber">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={4}
            dataKey="value"
            strokeWidth={0}
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip {...chartTooltipStyle} />
          <Legend iconType="circle" wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function SystemTrendChart() {
  const data = getSystemTrendData();
  return (
    <ChartCard title="System Growth Pulse" subtitle="Users, schedules & conflicts over time" accent="primary" height={300}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <ChartGradients />
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <Tooltip {...chartTooltipStyle} />
          <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
          <Area type="monotone" dataKey="users" stroke="#10b981" fill="url(#areaUsers)" strokeWidth={2} name="Users" />
          <Area type="monotone" dataKey="schedules" stroke="#14b8a6" fill="url(#areaSchedules)" strokeWidth={2} name="Schedules" />
          <Line type="monotone" dataKey="conflicts" stroke="#f43f5e" strokeWidth={2} dot={{ r: 4, fill: '#f43f5e' }} name="Conflicts" />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function EnrollmentCapacityChart() {
  const { sections } = useAppData();
  const data = getEnrollmentBySection(sections);
  return (
    <ChartCard title="Section Enrollment" subtitle="Enrolled vs capacity per section" accent="teal">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <Tooltip {...chartTooltipStyle} />
          <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
          <Bar dataKey="enrolled" fill="#14b8a6" radius={[6, 6, 0, 0]} name="Enrolled" />
          <Bar dataKey="capacity" fill="#c7d2fe" radius={[6, 6, 0, 0]} name="Capacity" />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function ScheduleHeatmapChart() {
  const { sections } = useAppData();
  const data = getScheduleByDay(sections);
  return (
    <ChartCard title="Weekly Schedule Density" subtitle="Classes and students per day" accent="green">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <YAxis yAxisId="left" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <Tooltip {...chartTooltipStyle} />
          <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
          <Bar yAxisId="left" dataKey="classes" fill="#10b981" radius={[6, 6, 0, 0]} name="Classes" />
          <Line yAxisId="right" type="monotone" dataKey="students" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} name="Students" />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function ConflictStatusChart() {
  const { conflicts } = useAppData();
  const data = getConflictBreakdown(conflicts);
  if (data.length === 0) {
    return (
      <ChartCard title="Conflict Status" subtitle="No conflicts recorded" accent="rose">
        <div className="flex items-center justify-center h-full text-sm text-gray-400">All clear ✨</div>
      </ChartCard>
    );
  }
  return (
    <ChartCard title="Conflict Status" subtitle="Pending vs resolved conflicts" accent="rose">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" outerRadius={85} dataKey="value" strokeWidth={0} label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip {...chartTooltipStyle} />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

// ─── User Management ──────────────────────────────────────────────────────────

export function DepartmentUsersChart() {
  const { users } = useAppData();
  const data = getDepartmentDistribution(users);
  return (
    <ChartCard title="Users by Department" subtitle="Department headcount breakdown" accent="amber">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 16, left: 4, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
          <XAxis type="number" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: '#64748b' }} width={90} axisLine={false} tickLine={false} />
          <Tooltip {...chartTooltipStyle} />
          <Bar dataKey="value" radius={[0, 8, 8, 0]} name="Users">
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function UserGrowthChart() {
  const { users } = useAppData();
  const data = getUserGrowthData(users);
  return (
    <ChartCard title="User Growth Wave" subtitle="Monthly registration trend" accent="amber">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <ChartGradients />
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <Tooltip {...chartTooltipStyle} />
          <Area type="monotone" dataKey="count" stroke="#10b981" fill="url(#areaUsers)" strokeWidth={3} name="Total Users" />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

// ─── Reports ────────────────────────────────────────────────────────────────

export function FacultyWorkloadChart() {
  const { faculty } = useAppData();
  const data = getFacultyWorkload(faculty);
  return (
    <ChartCard title="Faculty Workload" subtitle="Teaching hours per instructor" accent="green" height={300}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <ChartGradients />
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <Tooltip {...chartTooltipStyle} formatter={(value, _name, props) => [`${value} hrs`, (props.payload as { fullName: string }).fullName]} />
          <Bar dataKey="workload" fill="url(#facultyGradient)" radius={[8, 8, 0, 0]} name="Hours" />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function RoomUtilizationChart() {
  const { classrooms, sections } = useAppData();
  const data = getRoomUtilization(classrooms, sections);
  return (
    <ChartCard title="Room Utilization" subtitle="Capacity usage per classroom" accent="teal">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={data} startAngle={180} endAngle={0}>
          <RadialBar background dataKey="utilization" cornerRadius={8}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.fill} />
            ))}
          </RadialBar>
          <Tooltip {...chartTooltipStyle} formatter={(value) => [`${value}%`, 'Utilization']} />
          <Legend iconType="circle" wrapperStyle={{ fontSize: 10 }} />
        </RadialBarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function SubjectPopularityChart() {
  const { sections, subjects } = useAppData();
  const data = getSubjectPopularity(sections, subjects);
  return (
    <ChartCard title="Subject Popularity" subtitle="Total enrollment by subject" accent="primary">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <Tooltip {...chartTooltipStyle} formatter={(value, _name, props) => [value, (props.payload as { fullName: string }).fullName]} />
          <Bar dataKey="enrolled" radius={[8, 8, 0, 0]} name="Enrolled">
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function ConflictTypeChart() {
  const { conflicts } = useAppData();
  const data = getConflictByType(conflicts);
  return (
    <ChartCard title="Conflicts by Type" subtitle="Room, instructor & time overlaps" accent="rose">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} allowDecimals={false} />
          <Tooltip {...chartTooltipStyle} />
          <Bar dataKey="count" fill="#f43f5e" radius={[8, 8, 0, 0]} name="Conflicts" />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

// ─── Registrar ──────────────────────────────────────────────────────────────

export function RegistrarOverviewCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
      <ScheduleHeatmapChart />
      <EnrollmentCapacityChart />
      <ConflictStatusChart />
      <RoomUtilizationChart />
    </div>
  );
}

// ─── Faculty ────────────────────────────────────────────────────────────────

interface FacultyLoadChartProps {
  facultyId: string;
}

export function FacultyWeeklyLoadChart({ facultyId }: FacultyLoadChartProps) {
  const { sections } = useAppData();
  const data = getFacultyWeeklyLoad(sections, facultyId);
  return (
    <ChartCard title="My Weekly Load" subtitle="Classes & teaching hours per day" accent="green">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <YAxis yAxisId="left" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} allowDecimals={false} />
          <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <Tooltip {...chartTooltipStyle} />
          <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
          <Bar yAxisId="left" dataKey="classes" fill="#10b981" radius={[6, 6, 0, 0]} name="Classes" />
          <Line yAxisId="right" type="monotone" dataKey="hours" stroke="#10b981" strokeWidth={2} dot={{ r: 4, fill: '#10b981' }} name="Hours" />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function FacultySubjectRadialChart({ facultyId }: FacultyLoadChartProps) {
  const { sections, subjects } = useAppData();
  const mySections = sections.filter((s) => s.instructorId === facultyId);
  const data = mySections.map((s, i) => {
    const sub = subjects.find((subj) => subj.id === s.subjectId);
    const palette = ['#10b981', '#14b8a6', '#eab308', '#f59e0b'];
    return {
      name: sub?.code ?? s.code,
      enrolled: s.enrolled,
      utilization: Math.round((s.enrolled / s.maxCapacity) * 100),
      fill: palette[i % palette.length],
    };
  });

  if (data.length === 0) {
    return (
      <ChartCard title="Class Fill Rate" subtitle="Enrollment per your section" accent="teal">
        <div className="flex items-center justify-center h-full text-sm text-gray-400">No sections assigned</div>
      </ChartCard>
    );
  }

  return (
    <ChartCard title="Class Fill Rate" subtitle="Enrollment utilization per section" accent="teal">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart cx="50%" cy="50%" innerRadius="25%" outerRadius="90%" data={data} startAngle={90} endAngle={-270}>
          <RadialBar background dataKey="utilization" cornerRadius={6}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.fill} />
            ))}
          </RadialBar>
          <Tooltip {...chartTooltipStyle} formatter={(value, _name, props) => [`${value}% (${(props.payload as { enrolled: number }).enrolled} students)`, 'Fill Rate']} />
          <Legend iconType="circle" wrapperStyle={{ fontSize: 10 }} />
        </RadialBarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

// ─── Layout helpers ─────────────────────────────────────────────────────────

export function SuperAdminCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
      <SystemTrendChart />
      <UsersByRoleChart />
      <EnrollmentCapacityChart />
      <ScheduleHeatmapChart />
    </div>
  );
}

export function UserManagementCharts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 mb-5 sm:mb-6">
      <UsersByRoleChart />
      <UserGrowthChart />
      <DepartmentUsersChart />
    </div>
  );
}

export function SystemReportsCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
      <FacultyWorkloadChart />
      <RoomUtilizationChart />
      <SubjectPopularityChart />
      <ConflictTypeChart />
      <SystemTrendChart />
      <ConflictStatusChart />
    </div>
  );
}

export function FacultyDashboardCharts({ facultyId }: FacultyLoadChartProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
      <FacultyWeeklyLoadChart facultyId={facultyId} />
      <FacultySubjectRadialChart facultyId={facultyId} />
      <EnrollmentCapacityChart />
      <ScheduleHeatmapChart />
    </div>
  );
}

interface StudentChartsProps {
  subjectIds: string[];
}

export function StudentWeeklyChart({ subjectIds }: StudentChartsProps) {
  const { sections } = useAppData();
  const mySections = sections.filter((s) => subjectIds.includes(s.subjectId));
  const data = DAY_ORDER.map((day, i) => ({
    name: day.slice(0, 3),
    classes: mySections.filter((s) => s.day === day).length,
    fill: Object.values(CHART_COLORS)[i % Object.values(CHART_COLORS).length],
  }));

  return (
    <ChartCard title="My Class Week" subtitle="Your enrolled classes per day" accent="amber">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} allowDecimals={false} />
          <Tooltip {...chartTooltipStyle} />
          <Bar dataKey="classes" radius={[8, 8, 0, 0]} name="Classes">
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function StudentDashboardCharts({ subjectIds }: StudentChartsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
      <StudentWeeklyChart subjectIds={subjectIds} />
      <EnrollmentCapacityChart />
      <SubjectPopularityChart />
      <ScheduleHeatmapChart />
    </div>
  );
}
