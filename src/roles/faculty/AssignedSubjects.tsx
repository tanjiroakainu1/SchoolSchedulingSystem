import { PageHeader } from '../../components/ui/StatsCard'
import { PageShell } from '../../components/ui/PageShell';
import { Card } from '../../components/ui/Card';
import { useAppData } from '../../context/AppDataContext';

import { useFacultyId } from '../../hooks/useFacultyId';

export function AssignedSubjects() {
  const facultyId = useFacultyId();
  const { sections, subjects } = useAppData();
  const mySubjectIds = [...new Set(sections.filter((s) => s.instructorId === facultyId).map((s) => s.subjectId))];
  const mySubjects = subjects.filter((s) => mySubjectIds.includes(s.id));

  return (
    <PageShell>
      <PageHeader title="Assigned Subjects" description="Subjects you are teaching this semester" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mySubjects.map((s) => (
          <Card key={s.id}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-lg font-semibold text-gray-900">{s.name}</p>
                <p className="text-sm text-gray-500">{s.code} · {s.department}</p>
                <p className="text-sm text-gray-500 mt-1">{s.units} credit units</p>
              </div>
              <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">Active</span>
            </div>
            {s.prerequisites && s.prerequisites.length > 0 && (
              <p className="text-xs text-gray-400 mt-3">Prerequisites: {s.prerequisites.join(', ')}</p>
            )}
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
