import { Calendar, BookOpen, Bell, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StatsCard, PageHeader } from '../../components/ui/StatsCard';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
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
    <div className="animate-fade-in">
      <PageHeader
        title="Student Dashboard"
        description={`Welcome, ${user?.name}`}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-5 sm:mb-6">
        <StatsCard label="Enrolled Subjects" value={subjectIds.length} icon={BookOpen} color="amber" />
        <StatsCard label="Weekly Classes" value={enrolledSections.length} icon={Calendar} color="blue" />
        <StatsCard label="Notifications" value={unread} icon={Bell} color="purple" change="Unread" />
        <StatsCard label="Classrooms" value={new Set(enrolledSections.map((s) => s.classroomId)).size} icon={MapPin} color="green" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card title="Upcoming Classes" hover>
          <div className="space-y-3">
            {enrolledSections.slice(0, 4).map((s) => {
              const subj = subjects.find((sub) => sub.id === s.subjectId);
              return (
                <div key={s.id} className="flex justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{subj?.name}</p>
                    <p className="text-sm text-gray-500">{s.day} · {s.startTime}–{s.endTime}</p>
                  </div>
                  <span className="text-xs text-gray-500">{s.code}</span>
                </div>
              );
            })}
          </div>
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
    </div>
  );
}
