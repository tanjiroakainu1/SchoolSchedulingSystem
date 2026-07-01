import { PageHeader } from '../../components/ui/StatsCard'
import { PageShell } from '../../components/ui/PageShell';
import { Card } from '../../components/ui/Card';
import { DataTable } from '../../components/ui/DataTable';
import { useAppData } from '../../context/AppDataContext';
import { useStudentSubjectIds } from '../../hooks/useStudentSubjects';

export function ClassroomAssignments() {
  const subjectIds = useStudentSubjectIds();
  const { sections, subjects, classrooms } = useAppData();
  const enrolled = sections.filter((s) => subjectIds.includes(s.subjectId));

  return (
    <PageShell>
      <PageHeader title="Classroom Assignments" description="Rooms for your enrolled classes" />
      <Card>
        <DataTable
          columns={[
            { key: 'subject', label: 'Subject' },
            { key: 'section', label: 'Section' },
            { key: 'room', label: 'Room' },
            { key: 'building', label: 'Building' },
            { key: 'schedule', label: 'Schedule' },
          ]}
          data={enrolled.map((s) => {
            const subj = subjects.find((sub) => sub.id === s.subjectId);
            const room = classrooms.find((c) => c.id === s.classroomId);
            return {
              subject: subj?.name ?? '—',
              section: s.code,
              room: room?.code ?? '—',
              building: room?.building ?? '—',
              schedule: `${s.day} ${s.startTime}–${s.endTime}`,
            };
          })}
        />
      </Card>
    </PageShell>
  );
}
