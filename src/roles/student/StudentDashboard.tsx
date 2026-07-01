import { Calendar, BookOpen, Bell, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StatsCard, PageHeader, EmptyState, PageShell, statsGridClass, contentGridClass } from '../../components/ui';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { AnalyticsSectionHeader, StudentDashboardCharts } from '../../components/charts';
import { useAppData } from '../../context/AppDataContext';
import { useAuth } from '../../context/AuthContext';
import { useStudentSubjectIds } from '../../hooks/useStudentSubjects';

export function StudentDashboard() {
  const subjectIds = useStudentSubjectIds();
  const { sections, subjects, notifications } = useAppData();
  const { user } = useAuth();
  const enrolledSections = sections.filter((s) => subjectIds.includes(s.subjectId));
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <PageShell>
      <PageHeader
        title="Student Dashboard"
        description={`Welcome back, ${user?.name}`}
      />

      <div className={statsGridClass}>
        <StatsCard label="Enrolled Subjects" value={subjectIds.length} icon={BookOpen} color="amber" />
        <StatsCard label="Weekly Classes" value={enrolledSections.length} icon={Calendar} color="teal" />
        <StatsCard label="Notifications" value={unread} icon={Bell} color="accent" change="Unread" />
        <StatsCard label="Classrooms" value={new Set(enrolledSections.map((s) => s.classroomId)).size} icon={MapPin} color="green" />
      </div>

      <AnalyticsSectionHeader
        title="My Academic Analytics"
        description="Your weekly class load and enrollment insights"
      />
      <StudentDashboardCharts subjectIds={subjectIds} />

      <div className={contentGridClass}>
        <Card title="Upcoming Classes" hover>
          {enrolledSections.length === 0 ? (
            <EmptyState
              title="No classes yet"
              description="You are not enrolled in any sections. Contact the registrar to enroll."
            />
          ) : (
            <div className="space-y-3">
              {enrolledSections.slice(0, 4).map((s) => {
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
            <Link to="/student/class-schedule"><Button variant="secondary" className="w-full">Class Schedule</Button></Link>
            <Link to="/student/enrolled-subjects"><Button variant="secondary" className="w-full">My Subjects</Button></Link>
            <Link to="/student/exam-schedule"><Button variant="secondary" className="w-full">Exam Schedule</Button></Link>
            <Link to="/student/print-timetable"><Button variant="secondary" className="w-full">Print Timetable</Button></Link>
          </div>
        </Card>
      </div>
    </PageShell>
  );
}
