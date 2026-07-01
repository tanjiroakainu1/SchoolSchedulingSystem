import { Calendar, BookOpen, Building, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StatsCard, PageHeader, EmptyState } from '../../components/ui/StatsCard';
import { PageShell, statsGridClass, contentGridClass } from '../../components/ui/PageShell';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { FacultyDashboardCharts, AnalyticsSectionHeader } from '../../components/charts';
import { useAppData } from '../../context/AppDataContext';
import { useAuth } from '../../context/AuthContext';
import { useFacultyId } from '../../hooks/useFacultyId';

export function FacultyDashboard() {
  const facultyId = useFacultyId();
  const { sections, subjects, notifications } = useAppData();
  const { user } = useAuth();
  const mySections = sections.filter((s) => s.instructorId === facultyId);
  const mySubjects = subjects.filter((s) => mySections.some((sec) => sec.subjectId === s.id));
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <PageShell>
      <PageHeader
        title="Faculty Dashboard"
        description={`Welcome back, ${user?.name}`}
      />

      <div className={statsGridClass}>
        <StatsCard label="Teaching Load" value={`${mySections.length} classes`} icon={Calendar} color="green" />
        <StatsCard label="Subjects" value={mySubjects.length} icon={BookOpen} color="teal" />
        <StatsCard label="Classrooms" value={new Set(mySections.map((s) => s.classroomId)).size} icon={Building} color="accent" />
        <StatsCard label="Notifications" value={unread} icon={Bell} color="amber" change="Unread" />
      </div>

      <AnalyticsSectionHeader title="Teaching Analytics" description="Your weekly load, class fill rates & schedule insights" />
      {facultyId && <FacultyDashboardCharts facultyId={facultyId} />}

      <div className={contentGridClass}>
        <Card title="Today's Schedule" hover>
          {mySections.length === 0 ? (
            <EmptyState
              title="No classes scheduled"
              description="Your teaching schedule will appear here once sections are assigned."
            />
          ) : (
            <div className="space-y-3">
              {mySections.map((s) => {
                const subj = subjects.find((sub) => sub.id === s.subjectId);
                return (
                  <div key={s.id} className="flex justify-between items-center p-3.5 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:border-primary-100 transition-colors">
                    <div>
                      <p className="font-semibold text-gray-900">{subj?.name}</p>
                      <p className="text-sm text-gray-500">{s.day} · {s.startTime}–{s.endTime}</p>
                    </div>
                    <span className="text-xs font-bold text-primary-600 bg-primary-50 px-2 py-1 rounded-lg">{s.code}</span>
                  </div>
                );
              })}
            </div>
          )}
        </Card>

        <Card title="Quick Actions" hover>
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3">
            <Link to="/faculty/teaching-schedule"><Button variant="secondary" className="w-full">View Schedule</Button></Link>
            <Link to="/faculty/subjects"><Button variant="secondary" className="w-full">My Subjects</Button></Link>
            <Link to="/faculty/class-list"><Button variant="secondary" className="w-full">Class List</Button></Link>
            <Link to="/faculty/report-conflict"><Button variant="secondary" className="w-full">Report Conflict</Button></Link>
          </div>
        </Card>
      </div>
    </PageShell>
  );
}
