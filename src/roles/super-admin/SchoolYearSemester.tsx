import { useState } from 'react';
import { Plus, Check } from 'lucide-react';
import { PageHeader } from '../../components/ui/StatsCard';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { DataTable, FormField, inputClass } from '../../components/ui/DataTable';
import { useAppData } from '../../context/AppDataContext';
import { useToast } from '../../hooks/useToast';

export function SchoolYearSemester() {
  const { schoolYears, setSchoolYears, semesters, setSemesters } = useAppData();
  const { showToast, ToastHost } = useToast();
  const [syModal, setSyModal] = useState(false);
  const [semModal, setSemModal] = useState(false);
  const [syForm, setSyForm] = useState({ label: '', startDate: '', endDate: '' });
  const [semForm, setSemForm] = useState({ name: '', startDate: '', endDate: '', schoolYearId: 'sy1' });

  const activateSchoolYear = (id: string) => {
    setSchoolYears((prev) => prev.map((sy) => ({ ...sy, isActive: sy.id === id })));
    showToast('School year activated');
  };

  const activateSemester = (id: string) => {
    setSemesters((prev) => prev.map((s) => ({ ...s, isActive: s.id === id })));
    showToast('Semester activated');
  };

  const addSchoolYear = () => {
    if (!syForm.label) return;
    setSchoolYears((prev) => [...prev, { id: `sy${Date.now()}`, ...syForm, isActive: false }]);
    setSyModal(false);
    setSyForm({ label: '', startDate: '', endDate: '' });
    showToast('School year added');
  };

  const addSemester = () => {
    if (!semForm.name) return;
    setSemesters((prev) => [...prev, { id: `sem${Date.now()}`, ...semForm, isActive: false }]);
    setSemModal(false);
    setSemForm({ name: '', startDate: '', endDate: '', schoolYearId: 'sy1' });
    showToast('Semester added');
  };

  return (
    <div>
      <PageHeader title="School Year & Semester" description="Manage academic calendar periods" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card
          title="School Years"
          action={<Button size="sm" onClick={() => setSyModal(true)}><Plus size={14} /> Add</Button>}
        >
          <DataTable
            columns={[
              { key: 'label', label: 'Year' },
              { key: 'period', label: 'Period' },
              { key: 'status', label: 'Status' },
              { key: 'action', label: '' },
            ]}
            data={schoolYears.map((sy) => ({
              label: sy.label,
              period: `${sy.startDate} — ${sy.endDate}`,
              status: sy.isActive ? (
                <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">Active</span>
              ) : (
                <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">Inactive</span>
              ),
              action: !sy.isActive ? (
                <Button size="sm" variant="ghost" onClick={() => activateSchoolYear(sy.id)}>
                  <Check size={14} /> Activate
                </Button>
              ) : null,
            }))}
          />
        </Card>

        <Card
          title="Semesters"
          action={<Button size="sm" onClick={() => setSemModal(true)}><Plus size={14} /> Add</Button>}
        >
          <DataTable
            columns={[
              { key: 'name', label: 'Semester' },
              { key: 'period', label: 'Period' },
              { key: 'status', label: 'Status' },
              { key: 'action', label: '' },
            ]}
            data={semesters.map((s) => ({
              name: s.name,
              period: `${s.startDate} — ${s.endDate}`,
              status: s.isActive ? (
                <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">Active</span>
              ) : (
                <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">Inactive</span>
              ),
              action: !s.isActive ? (
                <Button size="sm" variant="ghost" onClick={() => activateSemester(s.id)}>
                  <Check size={14} /> Activate
                </Button>
              ) : null,
            }))}
          />
        </Card>
      </div>

      <Modal isOpen={syModal} onClose={() => setSyModal(false)} title="Add School Year">
        <FormField label="Label" required><input className={inputClass} value={syForm.label} onChange={(e) => setSyForm({ ...syForm, label: e.target.value })} placeholder="2026-2027" /></FormField>
        <FormField label="Start Date"><input className={inputClass} type="date" value={syForm.startDate} onChange={(e) => setSyForm({ ...syForm, startDate: e.target.value })} /></FormField>
        <FormField label="End Date"><input className={inputClass} type="date" value={syForm.endDate} onChange={(e) => setSyForm({ ...syForm, endDate: e.target.value })} /></FormField>
        <div className="flex justify-end gap-3"><Button variant="secondary" onClick={() => setSyModal(false)}>Cancel</Button><Button onClick={addSchoolYear}>Add</Button></div>
      </Modal>

      <Modal isOpen={semModal} onClose={() => setSemModal(false)} title="Add Semester">
        <FormField label="Name" required><input className={inputClass} value={semForm.name} onChange={(e) => setSemForm({ ...semForm, name: e.target.value })} placeholder="1st Semester" /></FormField>
        <FormField label="Start Date"><input className={inputClass} type="date" value={semForm.startDate} onChange={(e) => setSemForm({ ...semForm, startDate: e.target.value })} /></FormField>
        <FormField label="End Date"><input className={inputClass} type="date" value={semForm.endDate} onChange={(e) => setSemForm({ ...semForm, endDate: e.target.value })} /></FormField>
        <div className="flex justify-end gap-3"><Button variant="secondary" onClick={() => setSemModal(false)}>Cancel</Button><Button onClick={addSemester}>Add</Button></div>
      </Modal>
      <ToastHost />
    </div>
  );
}
