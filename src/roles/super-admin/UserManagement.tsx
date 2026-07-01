import { useState } from 'react';
import { Plus, Trash2, Edit } from 'lucide-react';
import { PageHeader } from '../../components/ui/StatsCard';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { DataTable, FormField, inputClass, selectClass } from '../../components/ui/DataTable';
import { UserManagementCharts, AnalyticsSectionHeader } from '../../components/charts';
import { useAppData } from '../../context/AppDataContext';
import { useToast } from '../../hooks/useToast';
import type { UserRole } from '../../types';

const roleOptions: { value: UserRole; label: string }[] = [
  { value: 'super-admin', label: 'Super Admin' },
  { value: 'registrar', label: 'Registrar' },
  { value: 'faculty', label: 'Faculty' },
  { value: 'student', label: 'Student' },
];

export function UserManagement() {
  const { users, setUsers } = useAppData();
  const { showToast, ToastHost } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', role: 'student' as UserRole });

  const openCreate = () => {
    setEditingId(null);
    setForm({ name: '', email: '', role: 'student' });
    setModalOpen(true);
  };

  const openEdit = (id: string) => {
    const user = users.find((u) => u.id === id);
    if (user) {
      setEditingId(id);
      setForm({ name: user.name, email: user.email, role: user.role });
      setModalOpen(true);
    }
  };

  const handleSave = () => {
    if (!form.name || !form.email) {
      showToast('Please fill in all fields', 'error');
      return;
    }
    if (editingId) {
      setUsers((prev) =>
        prev.map((u) => (u.id === editingId ? { ...u, ...form } : u))
      );
      showToast('User updated successfully');
    } else {
      setUsers((prev) => [...prev, { id: `u${Date.now()}`, ...form }]);
      showToast('User created successfully');
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    showToast('User removed', 'info');
  };

  const tableData = users.map((u) => ({
    name: u.name,
    email: u.email,
    role: (
      <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700 capitalize">
        {u.role.replace('-', ' ')}
      </span>
    ),
    actions: (
      <div className="flex gap-2">
        <button onClick={() => openEdit(u.id)} className="p-1 text-blue-600 hover:bg-blue-50 rounded">
          <Edit size={16} />
        </button>
        <button onClick={() => handleDelete(u.id)} className="p-1 text-red-600 hover:bg-red-50 rounded">
          <Trash2 size={16} />
        </button>
      </div>
    ),
  }));

  return (
    <div>
      <PageHeader
        title="User & Role Management"
        description="Register users and assign roles"
        action={<Button onClick={openCreate}><Plus size={16} /> Add User</Button>}
      />

      <AnalyticsSectionHeader title="User Analytics" description="Role mix, department spread & registration growth" />
      <UserManagementCharts />

      <Card>
        <DataTable
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'email', label: 'Email' },
            { key: 'role', label: 'Role' },
            { key: 'actions', label: 'Actions' },
          ]}
          data={tableData}
        />
      </Card>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingId ? 'Edit User' : 'Add User'}>
        <FormField label="Full Name" required>
          <input className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </FormField>
        <FormField label="Email" required>
          <input className={inputClass} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </FormField>
        <FormField label="Role" required>
          <select className={selectClass} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as UserRole })}>
            {roleOptions.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
        </FormField>
        <div className="flex gap-3 justify-end mt-4">
          <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </Modal>
      <ToastHost />
    </div>
  );
}
