import { Calendar, BookOpen, Building, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StatsCard, PageHeader } from '../../components/ui/StatsCard';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
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
    <div className="animate-fade-in">
      <PageHeader
        title="Faculty Dashboard"
        description={`Welcome back, ${user?.name}`}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-5 sm:mb-6">
        <StatsCard label="Teaching Load" value={`${mySections.length} classes`} icon={Calendar} color="green" />
        <StatsCard label="Subjects" value={mySubjects.length} icon={BookOpen} color="blue" />
        <StatsCard label="Classrooms" value={new Set(mySections.map((s) => s.classroomId)).size} icon={Building} color="purple" />
        <StatsCard label="Notifications" value={unread} icon={Bell} color="amber" change="Unread" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card title="Today's Schedule" hover>
          {mySections.length === 0 ? (
            <p className="text-gray-500 text-sm">No classes scheduled</p>
          ) : (
            <div className="space-y-3">
              {mySections.map((s) => {
                const subj = subjects.find((sub) => sub.id === s.subjectId);
                return (
                  <div key={s.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{subj?.name}</p>
                      <p className="text-sm text-gray-500">{s.day} · {s.startTime}–{s.endTime}</p>
                    </div>
                    <span className="text-xs text-gray-500">{s.code}</span>
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
    </div>
  );
}
