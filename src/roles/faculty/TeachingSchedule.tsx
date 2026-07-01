import { Printer } from 'lucide-react';
import { PageHeader } from '../../components/ui/StatsCard';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { DataTable } from '../../components/ui/DataTable';
import { useAppData } from '../../context/AppDataContext';
import { useToast } from '../../hooks/useToast';
import { useFacultyId } from '../../hooks/useFacultyId';

export function TeachingSchedule() {
  const facultyId = useFacultyId();
  const { sections, subjects, classrooms } = useAppData();
  const { showToast, ToastHost } = useToast();
  const mySections = sections.filter((s) => s.instructorId === facultyId);

  const handlePrint = () => {
    window.print();
    showToast('Print dialog opened', 'info');
  };

  return (
    <div>
      <PageHeader
        title="Teaching Schedule"
        description="Your weekly class timetable"
        action={<Button variant="secondary" onClick={handlePrint}><Printer size={16} /> Print Schedule</Button>}
      />
      <Card>
        <DataTable
          columns={[
            { key: 'subject', label: 'Subject' },
            { key: 'section', label: 'Section' },
            { key: 'day', label: 'Day' },
            { key: 'time', label: 'Time' },
            { key: 'room', label: 'Room' },
            { key: 'students', label: 'Students' },
          ]}
          data={mySections.map((s) => {
            const subj = subjects.find((sub) => sub.id === s.subjectId);
            const room = classrooms.find((c) => c.id === s.classroomId);
            return {
              subject: subj?.name ?? '—',
              section: s.code,
              day: s.day,
              time: `${s.startTime} – ${s.endTime}`,
              room: room?.code ?? '—',
              students: `${s.enrolled}/${s.maxCapacity}`,
            };
          })}
        />
      </Card>
      <ToastHost />
    </div>
  );
}
