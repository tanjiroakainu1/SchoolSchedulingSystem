import { PageHeader } from '../../components/ui/StatsCard';
import { Card } from '../../components/ui/Card';
import { DataTable } from '../../components/ui/DataTable';
import { useAppData } from '../../context/AppDataContext';

export function AllSchedules() {
  const { sections, subjects, faculty, classrooms } = useAppData();

  const getSubject = (id: string) => subjects.find((s) => s.id === id);
  const getFaculty = (id: string) => faculty.find((f) => f.id === id);
  const getRoom = (id: string) => classrooms.find((c) => c.id === id);

  return (
    <div>
      <PageHeader title="All Schedules" description="System-wide class schedule overview" />
      <Card>
        <DataTable
          columns={[
            { key: 'section', label: 'Section' },
            { key: 'subject', label: 'Subject' },
            { key: 'instructor', label: 'Instructor' },
            { key: 'room', label: 'Room' },
            { key: 'schedule', label: 'Schedule' },
            { key: 'enrolled', label: 'Enrolled' },
          ]}
          data={sections.map((sec) => ({
            section: sec.code,
            subject: getSubject(sec.subjectId)?.name ?? '—',
            instructor: getFaculty(sec.instructorId)?.name ?? '—',
            room: getRoom(sec.classroomId)?.code ?? '—',
            schedule: `${sec.day} ${sec.startTime}–${sec.endTime}`,
            enrolled: `${sec.enrolled}/${sec.maxCapacity}`,
          }))}
        />
      </Card>
    </div>
  );
}
