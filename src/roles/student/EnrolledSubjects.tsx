import { PageHeader, EmptyState } from '../../components/ui/StatsCard';
import { PageShell, cardGridClass } from '../../components/ui/PageShell';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { useAppData } from '../../context/AppDataContext';
import { useStudentSubjectIds } from '../../hooks/useStudentSubjects';

export function EnrolledSubjects() {
  const subjectIds = useStudentSubjectIds();
  const { subjects } = useAppData();
  const enrolled = subjects.filter((s) => subjectIds.includes(s.id));
  const totalUnits = enrolled.reduce((sum, s) => sum + s.units, 0);

  return (
    <PageShell>
      <PageHeader title="Enrolled Subjects" description={`${enrolled.length} subjects · ${totalUnits} total units`} />
      <div className={cardGridClass}>
        {enrolled.length === 0 ? (
          <Card className="md:col-span-2">
            <EmptyState
              title="No enrolled subjects"
              description="You are not enrolled in any subjects for this semester."
            />
          </Card>
        ) : (
          enrolled.map((s) => (
            <Card key={s.id} hover>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-bold text-gray-900">{s.name}</p>
                  <p className="text-sm font-medium text-primary-600 mt-0.5">{s.code}</p>
                  <p className="text-sm text-gray-500 mt-2">{s.department} · {s.units} units</p>
                </div>
                <Badge variant="warning">Enrolled</Badge>
              </div>
            </Card>
          ))
        )}
      </div>
    </PageShell>
  );
}
