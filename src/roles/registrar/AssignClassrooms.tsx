import { useState } from 'react';
import { Save } from 'lucide-react';
import { PageHeader } from '../../components/ui/StatsCard';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { DataTable, selectClass } from '../../components/ui/DataTable';
import { useAppData } from '../../context/AppDataContext';
import { useToast } from '../../hooks/useToast';

export function AssignClassrooms() {
  const { sections, setSections, classrooms, subjects, addNotification } = useAppData();
  const { showToast, ToastHost } = useToast();
  const [assignments, setAssignments] = useState<Record<string, string>>(
    Object.fromEntries(sections.map((s) => [s.id, s.classroomId]))
  );

  const handleSave = (sectionId: string) => {
    const classroomId = assignments[sectionId];
    const room = classrooms.find((c) => c.id === classroomId);
    setSections((prev) =>
      prev.map((s) => (s.id === sectionId ? { ...s, classroomId } : s))
    );
    addNotification('Room Change', `Section moved to ${room?.code}.`, 'room-change');
    showToast(`Classroom assigned: ${room?.code}`);
  };

  const tableData = sections.map((sec) => {
    const subj = subjects.find((s) => s.id === sec.subjectId);
    return {
      section: sec.code,
      subject: subj?.name ?? '—',
      schedule: `${sec.day} ${sec.startTime}–${sec.endTime}`,
      classroom: (
        <select
          className={selectClass}
          value={assignments[sec.id] ?? ''}
          onChange={(e) => setAssignments({ ...assignments, [sec.id]: e.target.value })}
        >
          {classrooms.map((c) => (
            <option key={c.id} value={c.id}>
              {c.code} — {c.building} (cap: {c.capacity}) {c.isAvailable ? '' : '[Busy]'}
            </option>
          ))}
        </select>
      ),
      action: (
        <Button size="sm" onClick={() => handleSave(sec.id)}>
          <Save size={14} /> Save
        </Button>
      ),
    };
  });

  return (
    <div>
      <PageHeader title="Assign Classrooms" description="Assign rooms to class sections" />
      <Card>
        <DataTable
          columns={[
            { key: 'section', label: 'Section' },
            { key: 'subject', label: 'Subject' },
            { key: 'schedule', label: 'Schedule' },
            { key: 'classroom', label: 'Classroom' },
            { key: 'action', label: 'Action' },
          ]}
          data={tableData}
        />
      </Card>
      <ToastHost />
    </div>
  );
}
