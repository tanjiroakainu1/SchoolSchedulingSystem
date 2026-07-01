import { Users, Calendar, BookOpen, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StatsCard, PageHeader } from '../../components/ui/StatsCard';
import { PageShell, statsGridClass, contentGridClass } from '../../components/ui/PageShell';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { SuperAdminCharts, AnalyticsSectionHeader } from '../../components/charts';
import { useAppData } from '../../context/AppDataContext';

export function SuperAdminDashboard() {
  const { users, sections, conflicts, schoolYears, subjects } = useAppData();
  const pendingConflicts = conflicts.filter((c) => c.status === 'pending').length;

  return (
    <PageShell>
      <PageHeader
        title="Super Admin Dashboard"
        description="Full system overview and administration"
      />

      <div className={statsGridClass}>
        <StatsCard label="Total Users" value={users.length} icon={Users} color="emerald" />
        <StatsCard label="Active Schedules" value={sections.length} icon={Calendar} color="teal" />
        <StatsCard label="Subjects" value={subjects.length} icon={BookOpen} color="green" />
        <StatsCard label="Pending Conflicts" value={pendingConflicts} icon={AlertTriangle} color="red" />
      </div>

      <AnalyticsSectionHeader title="System Analytics" description="Growth trends, roles, enrollment & weekly density" />
      <SuperAdminCharts />

      <div className={contentGridClass}>
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
              <Badge variant="success">Active</Badge>
            </div>
          ))}
        </Card>
      </div>
    </PageShell>
  );
}
