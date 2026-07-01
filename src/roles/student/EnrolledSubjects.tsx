import { PageHeader } from '../../components/ui/StatsCard';
import { Card } from '../../components/ui/Card';
import { useAppData } from '../../context/AppDataContext';
import { useStudentSubjectIds } from '../../hooks/useStudentSubjects';

export function EnrolledSubjects() {
  const subjectIds = useStudentSubjectIds();
  const { subjects } = useAppData();
  const enrolled = subjects.filter((s) => subjectIds.includes(s.id));
  const totalUnits = enrolled.reduce((sum, s) => sum + s.units, 0);

  return (
    <div>
      <PageHeader title="Enrolled Subjects" description={`${enrolled.length} subjects · ${totalUnits} total units`} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {enrolled.map((s) => (
          <Card key={s.id}>
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-gray-900">{s.name}</p>
                <p className="text-sm text-gray-500">{s.code}</p>
                <p className="text-sm text-gray-500 mt-1">{s.department} · {s.units} units</p>
              </div>
              <span className="px-2 py-1 text-xs bg-amber-100 text-amber-700 rounded-full">Enrolled</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
