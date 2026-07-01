import { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { PageHeader } from '../../components/ui/StatsCard'
import { PageShell } from '../../components/ui/PageShell';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { DataTable, FormField, inputClass } from '../../components/ui/DataTable';
import { useAppData } from '../../context/AppDataContext';
import { useToast } from '../../hooks/useToast';

export function ManageSections() {
  const { sections, setSections, subjects } = useAppData();
  const { showToast, ToastHost } = useToast();
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ code: '', maxCapacity: '' });

  const openEdit = (id: string) => {
    const sec = sections.find((s) => s.id === id);
    if (sec) {
      setEditId(id);
      setForm({ code: sec.code, maxCapacity: String(sec.maxCapacity) });
    }
  };

  const handleSave = () => {
    if (!editId) return;
    setSections((prev) =>
      prev.map((s) =>
        s.id === editId ? { ...s, code: form.code, maxCapacity: parseInt(form.maxCapacity) } : s
      )
    );
    showToast('Section updated');
    setEditId(null);
  };

  const handleDelete = (id: string) => {
    setSections((prev) => prev.filter((s) => s.id !== id));
    showToast('Section removed', 'info');
  };

  const tableData = sections.map((sec) => {
    const subj = subjects.find((s) => s.id === sec.subjectId);
    return {
      code: sec.code,
      subject: subj?.name ?? '—',
      enrolled: `${sec.enrolled}/${sec.maxCapacity}`,
      schedule: `${sec.day} ${sec.startTime}–${sec.endTime}`,
      actions: (
        <div className="flex gap-2">
          <button onClick={() => openEdit(sec.id)} className="p-1 text-primary-600 hover:bg-primary-50 rounded"><Edit size={16} /></button>
          <button onClick={() => handleDelete(sec.id)} className="p-1 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
        </div>
      ),
    };
  });

  return (
    <PageShell>
      <PageHeader title="Manage Class Sections" description="Update and manage class section details" />
      <Card>
        <DataTable
          columns={[
            { key: 'code', label: 'Section' },
            { key: 'subject', label: 'Subject' },
            { key: 'enrolled', label: 'Enrolled' },
            { key: 'schedule', label: 'Schedule' },
            { key: 'actions', label: 'Actions' },
          ]}
          data={tableData}
        />
      </Card>

      <Modal isOpen={!!editId} onClose={() => setEditId(null)} title="Edit Section">
        <FormField label="Section Code"><input className={inputClass} value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} /></FormField>
        <FormField label="Max Capacity"><input className={inputClass} type="number" value={form.maxCapacity} onChange={(e) => setForm({ ...form, maxCapacity: e.target.value })} /></FormField>
        <div className="flex justify-end gap-3"><Button variant="secondary" onClick={() => setEditId(null)}>Cancel</Button><Button onClick={handleSave}>Save</Button></div>
      </Modal>
      <ToastHost />
    </PageShell>
  );
}
