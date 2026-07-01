import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { PageHeader } from '../../components/ui/StatsCard'
import { PageShell } from '../../components/ui/PageShell';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { FormField, inputClass, selectClass } from '../../components/ui/DataTable';
import { useAppData } from '../../context/AppDataContext';
import { useToast } from '../../hooks/useToast';

import { useFacultyId } from '../../hooks/useFacultyId';

export function ReportConflict() {
  const facultyId = useFacultyId();
  const { sections, subjects, setConflicts } = useAppData();
  const { showToast, ToastHost } = useToast();
  const mySections = sections.filter((s) => s.instructorId === facultyId);
  const [form, setForm] = useState({ sectionId: '', type: 'instructor' as const, description: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.sectionId || !form.description) {
      showToast('Please complete all fields', 'error');
      return;
    }
    setConflicts((prev) => [
      ...prev,
      {
        id: `conf${Date.now()}`,
        type: form.type,
        description: form.description,
        sectionIds: [form.sectionId],
        status: 'pending',
        reportedBy: facultyId,
      },
    ]);
    showToast('Conflict report submitted to registrar');
    setForm({ sectionId: '', type: 'instructor', description: '' });
  };

  return (
    <PageShell>
      <PageHeader title="Report Schedule Conflict" description="Notify the registrar of scheduling issues" />
      <Card>
        <form onSubmit={handleSubmit} className="max-w-lg">
          <FormField label="Affected Section" required>
            <select className={selectClass} value={form.sectionId} onChange={(e) => setForm({ ...form, sectionId: e.target.value })}>
              <option value="">Select section</option>
              {mySections.map((s) => {
                const subj = subjects.find((sub) => sub.id === s.subjectId);
                return <option key={s.id} value={s.id}>{s.code} — {subj?.name}</option>;
              })}
            </select>
          </FormField>
          <FormField label="Conflict Type" required>
            <select className={selectClass} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as typeof form.type })}>
              <option value="instructor">Instructor Conflict</option>
              <option value="room">Room Conflict</option>
              <option value="student">Student Conflict</option>
            </select>
          </FormField>
          <FormField label="Description" required>
            <textarea
              className={`${inputClass} min-h-[100px]`}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Describe the scheduling conflict..."
            />
          </FormField>
          <Button type="submit"><AlertTriangle size={16} /> Submit Report</Button>
        </form>
      </Card>
      <ToastHost />
    </PageShell>
  );
}
