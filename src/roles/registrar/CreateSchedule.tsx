import { useState } from 'react';
import { Plus } from 'lucide-react';
import { PageHeader } from '../../components/ui/StatsCard';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { FormField, inputClass, selectClass } from '../../components/ui/DataTable';
import { useAppData } from '../../context/AppDataContext';
import { useToast } from '../../hooks/useToast';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function CreateSchedule() {
  const { subjects, faculty, classrooms, sections, setSections, addNotification } = useAppData();
  const { showToast, ToastHost } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    code: '',
    subjectId: '',
    instructorId: '',
    classroomId: '',
    day: 'Monday',
    startTime: '08:00',
    endTime: '10:00',
    maxCapacity: '40',
  });

  const checkConflict = () => {
    const conflict = sections.find(
      (s) =>
        s.classroomId === form.classroomId &&
        s.day === form.day &&
        s.startTime === form.startTime
    );
    return !!conflict;
  };

  const handleCreate = () => {
    if (!form.code || !form.subjectId || !form.instructorId || !form.classroomId) {
      showToast('Please complete all required fields', 'error');
      return;
    }
    if (checkConflict()) {
      showToast('Schedule conflict detected! Room is already booked.', 'error');
      return;
    }
    const newSection = {
      id: `sec${Date.now()}`,
      code: form.code,
      subjectId: form.subjectId,
      instructorId: form.instructorId,
      classroomId: form.classroomId,
      day: form.day,
      startTime: form.startTime,
      endTime: form.endTime,
      semesterId: 'sem1',
      enrolled: 0,
      maxCapacity: parseInt(form.maxCapacity),
    };
    setSections((prev) => [...prev, newSection]);
    addNotification('New Schedule', `${form.code} has been scheduled on ${form.day}.`, 'schedule');
    showToast('Class schedule created successfully');
    setModalOpen(false);
    setForm({ code: '', subjectId: '', instructorId: '', classroomId: '', day: 'Monday', startTime: '08:00', endTime: '10:00', maxCapacity: '40' });
  };

  return (
    <div>
      <PageHeader
        title="Create Class Schedule"
        description="Add new class sections to the timetable"
        action={<Button onClick={() => setModalOpen(true)}><Plus size={16} /> New Schedule</Button>}
      />

      <Card title="Recently Created">
        <div className="space-y-3">
          {sections.slice(-3).reverse().map((s) => {
            const subj = subjects.find((sub) => sub.id === s.subjectId);
            const inst = faculty.find((f) => f.id === s.instructorId);
            return (
              <div key={s.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{s.code} — {subj?.name}</p>
                  <p className="text-sm text-gray-500">{inst?.name} · {s.day} {s.startTime}–{s.endTime}</p>
                </div>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">Active</span>
              </div>
            );
          })}
        </div>
      </Card>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Create Class Schedule" size="lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          <FormField label="Section Code" required>
            <input className={inputClass} value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} placeholder="CS101-A" />
          </FormField>
          <FormField label="Subject" required>
            <select className={selectClass} value={form.subjectId} onChange={(e) => setForm({ ...form, subjectId: e.target.value })}>
              <option value="">Select subject</option>
              {subjects.map((s) => <option key={s.id} value={s.id}>{s.code} — {s.name}</option>)}
            </select>
          </FormField>
          <FormField label="Instructor" required>
            <select className={selectClass} value={form.instructorId} onChange={(e) => setForm({ ...form, instructorId: e.target.value })}>
              <option value="">Select instructor</option>
              {faculty.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
            </select>
          </FormField>
          <FormField label="Classroom" required>
            <select className={selectClass} value={form.classroomId} onChange={(e) => setForm({ ...form, classroomId: e.target.value })}>
              <option value="">Select classroom</option>
              {classrooms.filter((c) => c.isAvailable).map((c) => <option key={c.id} value={c.id}>{c.code} (cap: {c.capacity})</option>)}
            </select>
          </FormField>
          <FormField label="Day" required>
            <select className={selectClass} value={form.day} onChange={(e) => setForm({ ...form, day: e.target.value })}>
              {days.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </FormField>
          <FormField label="Max Capacity">
            <input className={inputClass} type="number" value={form.maxCapacity} onChange={(e) => setForm({ ...form, maxCapacity: e.target.value })} />
          </FormField>
          <FormField label="Start Time">
            <input className={inputClass} type="time" value={form.startTime} onChange={(e) => setForm({ ...form, startTime: e.target.value })} />
          </FormField>
          <FormField label="End Time">
            <input className={inputClass} type="time" value={form.endTime} onChange={(e) => setForm({ ...form, endTime: e.target.value })} />
          </FormField>
        </div>
        <div className="flex justify-end gap-3 mt-4">
          <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button onClick={handleCreate}>Create Schedule</Button>
        </div>
      </Modal>
      <ToastHost />
    </div>
  );
}
