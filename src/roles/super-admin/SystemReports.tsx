import { Download, FileText } from 'lucide-react';
import { PageHeader } from '../../components/ui/StatsCard';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { SystemReportsCharts, AnalyticsSectionHeader } from '../../components/charts';
import { useAppData } from '../../context/AppDataContext';
import { useToast } from '../../hooks/useToast';

const reportTypes = [
  { id: 'faculty-workload', label: 'Faculty Workload Report', description: 'Teaching hours and subject assignments per instructor' },
  { id: 'room-utilization', label: 'Classroom Utilization Report', description: 'Room usage and availability statistics' },
  { id: 'student-schedule', label: 'Student Schedule Report', description: 'Enrollment and timetable summary' },
  { id: 'conflict', label: 'Schedule Conflict Report', description: 'Pending and resolved scheduling conflicts' },
  { id: 'dashboard', label: 'Dashboard Analytics', description: 'System-wide metrics and trends' },
];

export function SystemReports() {
  const { faculty, classrooms, sections, conflicts } = useAppData();
  const { showToast, ToastHost } = useToast();

  const generateReport = (type: string) => {
    showToast(`${type.replace(/-/g, ' ')} generated and downloaded`, 'success');
  };

  return (
    <div>
      <PageHeader title="System Reports" description="Generate system-wide reports and analytics" />

      <AnalyticsSectionHeader title="Report Analytics" description="Workload, rooms, subjects, conflicts & system trends" />
      <SystemReportsCharts />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {reportTypes.map((r) => (
          <Card key={r.id} className="!p-0">
            <div className="p-5 flex items-start justify-between gap-4">
              <div className="flex gap-3">
                <div className="p-2 bg-primary-50 rounded-lg text-primary-600">
                  <FileText size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{r.label}</h3>
                  <p className="text-sm text-gray-500 mt-1">{r.description}</p>
                </div>
              </div>
              <Button size="sm" variant="secondary" onClick={() => generateReport(r.id)}>
                <Download size={14} />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Card title="Quick Stats">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div><p className="text-2xl font-bold text-gray-900">{faculty.length}</p><p className="text-sm text-gray-500">Faculty</p></div>
          <div><p className="text-2xl font-bold text-gray-900">{classrooms.length}</p><p className="text-sm text-gray-500">Classrooms</p></div>
          <div><p className="text-2xl font-bold text-gray-900">{sections.length}</p><p className="text-sm text-gray-500">Sections</p></div>
          <div><p className="text-2xl font-bold text-gray-900">{conflicts.filter((c) => c.status === 'pending').length}</p><p className="text-sm text-gray-500">Conflicts</p></div>
        </div>
      </Card>
      <ToastHost />
    </div>
  );
}
