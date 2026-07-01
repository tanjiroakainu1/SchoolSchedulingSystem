import { Printer } from 'lucide-react';
import { PageHeader } from '../../components/ui/StatsCard';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useAppData } from '../../context/AppDataContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../hooks/useToast';
import { useStudentSubjectIds } from '../../hooks/useStudentSubjects';

export function PrintTimetable() {
  const subjectIds = useStudentSubjectIds();
  const { sections, subjects, faculty, classrooms } = useAppData();
  const { user } = useAuth();
  const { showToast, ToastHost } = useToast();
  const enrolled = sections.filter((s) => subjectIds.includes(s.subjectId));

  const handlePrint = () => {
    window.print();
    showToast('Print dialog opened', 'info');
  };

  return (
    <div>
      <PageHeader
        title="Print Personal Timetable"
        description="Preview and print your class schedule"
        action={<Button onClick={handlePrint}><Printer size={16} /> Print Timetable</Button>}
      />

      <Card className="print:shadow-none print:border-none">
        <div className="text-center mb-6 print:mb-4">
          <h2 className="text-xl font-bold text-gray-900">State University</h2>
          <p className="text-gray-500">Personal Class Timetable — 1st Semester 2025-2026</p>
          <p className="text-sm text-gray-600 mt-2">{user?.name} · {user?.email}</p>
        </div>

        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="text-left py-2 px-3">Subject</th>
              <th className="text-left py-2 px-3">Section</th>
              <th className="text-left py-2 px-3">Instructor</th>
              <th className="text-left py-2 px-3">Room</th>
              <th className="text-left py-2 px-3">Day</th>
              <th className="text-left py-2 px-3">Time</th>
            </tr>
          </thead>
          <tbody>
            {enrolled.map((s) => {
              const subj = subjects.find((sub) => sub.id === s.subjectId);
              const inst = faculty.find((f) => f.id === s.instructorId);
              const room = classrooms.find((c) => c.id === s.classroomId);
              return (
                <tr key={s.id} className="border-b border-gray-200">
                  <td className="py-2 px-3">{subj?.name}</td>
                  <td className="py-2 px-3">{s.code}</td>
                  <td className="py-2 px-3">{inst?.name}</td>
                  <td className="py-2 px-3">{room?.code}</td>
                  <td className="py-2 px-3">{s.day}</td>
                  <td className="py-2 px-3">{s.startTime} – {s.endTime}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
      <ToastHost />
    </div>
  );
}
