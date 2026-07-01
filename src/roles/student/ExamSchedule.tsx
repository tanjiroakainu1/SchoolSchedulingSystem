import { PageHeader } from '../../components/ui/StatsCard';
import { Card } from '../../components/ui/Card';
import { DataTable } from '../../components/ui/DataTable';
import { useAppData } from '../../context/AppDataContext';
import { useStudentSubjectIds } from '../../hooks/useStudentSubjects';

export function ExamSchedule() {
  const subjectIds = useStudentSubjectIds();
  const { exams, subjects } = useAppData();
  const studentExams = exams.filter((e) => subjectIds.includes(e.subjectId));

  return (
    <div>
      <PageHeader title="Examination Schedule" description="Midterm and final exam dates" />
      <Card>
        <DataTable
          columns={[
            { key: 'subject', label: 'Subject' },
            { key: 'type', label: 'Type' },
            { key: 'date', label: 'Date' },
            { key: 'time', label: 'Time' },
            { key: 'room', label: 'Room' },
          ]}
          data={studentExams.map((e) => {
            const subj = subjects.find((s) => s.id === e.subjectId);
            return {
              subject: subj?.name ?? '—',
              type: (
                <span className={`px-2 py-1 text-xs rounded-full capitalize ${
                  e.type === 'midterm' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                }`}>{e.type}</span>
              ),
              date: e.date,
              time: `${e.startTime} – ${e.endTime}`,
              room: e.room,
            };
          })}
        />
      </Card>
    </div>
  );
}
