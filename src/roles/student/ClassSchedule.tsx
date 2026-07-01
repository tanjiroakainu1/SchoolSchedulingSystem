import { PageHeader } from '../../components/ui/StatsCard';
import { Card } from '../../components/ui/Card';
import { DataTable } from '../../components/ui/DataTable';
import { useAppData } from '../../context/AppDataContext';
import { useStudentSubjectIds } from '../../hooks/useStudentSubjects';

export function ClassSchedule() {
  const subjectIds = useStudentSubjectIds();
  const { sections, subjects, faculty, classrooms } = useAppData();
  const enrolled = sections.filter((s) => subjectIds.includes(s.subjectId));

  return (
    <div>
      <PageHeader title="Class Schedule" description="Your weekly class timetable" />
      <Card>
        <DataTable
          columns={[
            { key: 'subject', label: 'Subject' },
            { key: 'section', label: 'Section' },
            { key: 'instructor', label: 'Instructor' },
            { key: 'room', label: 'Room' },
            { key: 'day', label: 'Day' },
            { key: 'time', label: 'Time' },
          ]}
          data={enrolled.map((s) => {
            const subj = subjects.find((sub) => sub.id === s.subjectId);
            const inst = faculty.find((f) => f.id === s.instructorId);
            const room = classrooms.find((c) => c.id === s.classroomId);
            return {
              subject: subj?.name ?? '—',
              section: s.code,
              instructor: inst?.name ?? '—',
              room: room?.code ?? '—',
              day: s.day,
              time: `${s.startTime} – ${s.endTime}`,
            };
          })}
        />
      </Card>
    </div>
  );
}
