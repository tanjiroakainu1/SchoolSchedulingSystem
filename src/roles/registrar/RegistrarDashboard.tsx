import { Calendar, Users, Building, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StatsCard, PageHeader } from '../../components/ui/StatsCard';
import { PageShell, statsGridClass } from '../../components/ui/PageShell';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { RegistrarOverviewCharts, AnalyticsSectionHeader } from '../../components/charts';
import { useAppData } from '../../context/AppDataContext';

export function RegistrarDashboard() {
  const { sections, conflicts, faculty, classrooms } = useAppData();
  const pending = conflicts.filter((c) => c.status === 'pending').length;

  return (
    <PageShell>
      <PageHeader
        title="Registrar Dashboard"
        description="Schedule creation and academic coordination"
      />

      <div className={statsGridClass}>
        <StatsCard label="Class Sections" value={sections.length} icon={Calendar} color="teal" />
        <StatsCard label="Instructors" value={faculty.length} icon={Users} color="green" />
        <StatsCard label="Classrooms" value={classrooms.length} icon={Building} color="accent" />
        <StatsCard label="Conflicts" value={pending} icon={AlertTriangle} color="red" change="Needs attention" />
      </div>

      <AnalyticsSectionHeader title="Scheduling Analytics" description="Weekly density, enrollment, conflicts & room usage" />
      <RegistrarOverviewCharts />

      <Card title="Quick Actions" hover>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
          <Link to="/registrar/create-schedule"><Button variant="secondary" className="w-full">Create Schedule</Button></Link>
          <Link to="/registrar/assign-instructors"><Button variant="secondary" className="w-full">Assign Instructors</Button></Link>
          <Link to="/registrar/assign-classrooms"><Button variant="secondary" className="w-full">Assign Classrooms</Button></Link>
          <Link to="/registrar/sections"><Button variant="secondary" className="w-full">Manage Sections</Button></Link>
          <Link to="/registrar/conflicts"><Button variant="secondary" className="w-full">Resolve Conflicts</Button></Link>
          <Link to="/registrar/timetable-reports"><Button variant="secondary" className="w-full">Timetable Reports</Button></Link>
        </div>
      </Card>
    </PageShell>
  );
}
