import { Download, Printer } from 'lucide-react';
import { PageHeader } from '../../components/ui/StatsCard'
import { PageShell } from '../../components/ui/PageShell';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { DataTable } from '../../components/ui/DataTable';
import { useAppData } from '../../context/AppDataContext';
import { useToast } from '../../hooks/useToast';

export function TimetableReports() {
  const { sections, subjects, faculty, classrooms } = useAppData();
  const { showToast, ToastHost } = useToast();

  const getSubject = (id: string) => subjects.find((s) => s.id === id);
  const getFaculty = (id: string) => faculty.find((f) => f.id === id);
  const getRoom = (id: string) => classrooms.find((c) => c.id === id);

  const handleExport = () => showToast('Timetable report exported as PDF');
  const handlePrint = () => {
    window.print();
    showToast('Print dialog opened', 'info');
  };

  return (
    <PageShell>
      <PageHeader
        title="Class Timetable Reports"
        description="Generate and export class timetable reports"
        action={
          <div className="flex gap-2">
            <Button variant="secondary" onClick={handlePrint}><Printer size={16} /> Print</Button>
            <Button onClick={handleExport}><Download size={16} /> Export PDF</Button>
          </div>
        }
      />
      <Card title="Current Semester Timetable">
        <DataTable
          columns={[
            { key: 'section', label: 'Section' },
            { key: 'subject', label: 'Subject' },
            { key: 'instructor', label: 'Instructor' },
            { key: 'room', label: 'Room' },
            { key: 'day', label: 'Day' },
            { key: 'time', label: 'Time' },
          ]}
          data={sections.map((sec) => ({
            section: sec.code,
            subject: getSubject(sec.subjectId)?.name ?? '—',
            instructor: getFaculty(sec.instructorId)?.name ?? '—',
            room: getRoom(sec.classroomId)?.code ?? '—',
            day: sec.day,
            time: `${sec.startTime} – ${sec.endTime}`,
          }))}
        />
      </Card>
      <ToastHost />
    </PageShell>
  );
}
