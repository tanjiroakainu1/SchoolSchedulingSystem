import { Mail } from 'lucide-react';
import { PageHeader } from '../../components/ui/StatsCard'
import { PageShell } from '../../components/ui/PageShell';
import { Card } from '../../components/ui/Card';
import { useAppData } from '../../context/AppDataContext';
import { useStudentSubjectIds } from '../../hooks/useStudentSubjects';

export function InstructorInfo() {
  const subjectIds = useStudentSubjectIds();
  const { sections, subjects, faculty } = useAppData();
  const enrolled = sections.filter((s) => subjectIds.includes(s.subjectId));
  const instructorIds = [...new Set(enrolled.map((s) => s.instructorId))];

  return (
    <PageShell>
      <PageHeader title="Instructor Information" description="Faculty teaching your enrolled subjects" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {instructorIds.map((id) => {
          const inst = faculty.find((f) => f.id === id)!;
          const taught = enrolled.filter((s) => s.instructorId === id);
          const subjectNames = taught.map((s) => subjects.find((sub) => sub.id === s.subjectId)?.name).join(', ');
          return (
            <Card key={id}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-lg">
                  {inst.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{inst.name}</p>
                  <p className="text-sm text-gray-500">{inst.department}</p>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-1"><Mail size={14} /> {inst.email}</p>
                  <p className="text-xs text-gray-400 mt-2">Teaching: {subjectNames}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </PageShell>
  );
}
