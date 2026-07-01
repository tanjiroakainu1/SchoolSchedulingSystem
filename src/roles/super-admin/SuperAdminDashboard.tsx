import { Users, Calendar, BookOpen, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StatsCard, PageHeader } from '../../components/ui/StatsCard';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { SuperAdminCharts, AnalyticsSectionHeader } from '../../components/charts';
import { useAppData } from '../../context/AppDataContext';

export function SuperAdminDashboard() {
  const { users, sections, conflicts, schoolYears, subjects } = useAppData();
  const pendingConflicts = conflicts.filter((c) => c.status === 'pending').length;

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Super Admin Dashboard"
        description="Full system overview and administration"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-5 sm:mb-6">
        <StatsCard label="Total Users" value={users.length} icon={Users} color="purple" />
        <StatsCard label="Active Schedules" value={sections.length} icon={Calendar} color="blue" />
        <StatsCard label="Subjects" value={subjects.length} icon={BookOpen} color="green" />
        <StatsCard label="Pending Conflicts" value={pendingConflicts} icon={AlertTriangle} color="red" />
      </div>

      <AnalyticsSectionHeader title="System Analytics" description="Growth trends, roles, enrollment & weekly density" />
      <SuperAdminCharts />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card title="Quick Actions" hover>
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3">
            <Link to="/super-admin/users"><Button variant="secondary" className="w-full">Manage Users</Button></Link>
            <Link to="/super-admin/school-year"><Button variant="secondary" className="w-full">School Year</Button></Link>
            <Link to="/super-admin/schedules"><Button variant="secondary" className="w-full">View Schedules</Button></Link>
            <Link to="/super-admin/reports"><Button variant="secondary" className="w-full">Generate Reports</Button></Link>
            <Link to="/super-admin/backup"><Button variant="secondary" className="w-full">Backup Data</Button></Link>
            <Link to="/super-admin/academic-settings"><Button variant="secondary" className="w-full">Settings</Button></Link>
          </div>
        </Card>

        <Card title="Active School Year">
          {schoolYears.filter((sy) => sy.isActive).map((sy) => (
            <div key={sy.id} className="space-y-2">
              <p className="text-lg font-semibold text-gray-900">{sy.label}</p>
              <p className="text-sm text-gray-500">{sy.startDate} — {sy.endDate}</p>
              <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">Active</span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
