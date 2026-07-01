import { Calendar, Users, Building, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StatsCard, PageHeader } from '../../components/ui/StatsCard';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useAppData } from '../../context/AppDataContext';

export function RegistrarDashboard() {
  const { sections, conflicts, faculty, classrooms } = useAppData();
  const pending = conflicts.filter((c) => c.status === 'pending').length;

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Registrar Dashboard"
        description="Schedule creation and academic coordination"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-5 sm:mb-6">
        <StatsCard label="Class Sections" value={sections.length} icon={Calendar} color="blue" />
        <StatsCard label="Instructors" value={faculty.length} icon={Users} color="green" />
        <StatsCard label="Classrooms" value={classrooms.length} icon={Building} color="purple" />
        <StatsCard label="Conflicts" value={pending} icon={AlertTriangle} color="red" change="Needs attention" />
      </div>

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
    </div>
  );
}
