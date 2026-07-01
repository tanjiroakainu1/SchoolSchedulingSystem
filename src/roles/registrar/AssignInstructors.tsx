import { useState } from 'react';
import { Save } from 'lucide-react';
import { PageHeader } from '../../components/ui/StatsCard'
import { PageShell } from '../../components/ui/PageShell';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { DataTable, selectClass } from '../../components/ui/DataTable';
import { useAppData } from '../../context/AppDataContext';
import { useToast } from '../../hooks/useToast';

export function AssignInstructors() {
  const { sections, setSections, faculty, subjects } = useAppData();
  const { showToast, ToastHost } = useToast();
  const [assignments, setAssignments] = useState<Record<string, string>>(
    Object.fromEntries(sections.map((s) => [s.id, s.instructorId]))
  );

  const handleSave = (sectionId: string) => {
    const instructorId = assignments[sectionId];
    setSections((prev) =>
      prev.map((s) => (s.id === sectionId ? { ...s, instructorId } : s))
    );
    const inst = faculty.find((f) => f.id === instructorId);
    showToast(`Instructor assigned: ${inst?.name}`);
  };

  const tableData = sections.map((sec) => {
    const subj = subjects.find((s) => s.id === sec.subjectId);
    return {
      section: sec.code,
      subject: subj?.name ?? '—',
      instructor: (
        <select
          className={selectClass}
          value={assignments[sec.id] ?? ''}
          onChange={(e) => setAssignments({ ...assignments, [sec.id]: e.target.value })}
        >
          {faculty.map((f) => (
            <option key={f.id} value={f.id}>{f.name} (load: {f.workload}u)</option>
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
    <PageShell>
      <PageHeader title="Assign Instructors" description="Assign faculty to class sections" />
      <Card>
        <DataTable
          columns={[
            { key: 'section', label: 'Section' },
            { key: 'subject', label: 'Subject' },
            { key: 'instructor', label: 'Instructor' },
            { key: 'action', label: 'Action' },
          ]}
          data={tableData}
        />
      </Card>
      <ToastHost />
    </PageShell>
  );
}
