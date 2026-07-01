import { CheckCircle } from 'lucide-react';
import { PageHeader } from '../../components/ui/StatsCard';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { DataTable } from '../../components/ui/DataTable';
import { useAppData } from '../../context/AppDataContext';
import { useToast } from '../../hooks/useToast';

export function ConflictResolution() {
  const { conflicts, setConflicts } = useAppData();
  const { showToast, ToastHost } = useToast();

  const resolve = (id: string) => {
    setConflicts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'resolved' as const } : c))
    );
    showToast('Conflict marked as resolved');
  };

  const tableData = conflicts.map((c) => ({
    type: (
      <span className={`px-2 py-1 text-xs rounded-full capitalize ${
        c.type === 'room' ? 'bg-red-100 text-red-700' :
        c.type === 'instructor' ? 'bg-amber-100 text-amber-700' :
        'bg-blue-100 text-blue-700'
      }`}>{c.type}</span>
    ),
    description: c.description,
    status: c.status === 'pending' ? (
      <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full">Pending</span>
    ) : (
      <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">Resolved</span>
    ),
    action: c.status === 'pending' ? (
      <Button size="sm" onClick={() => resolve(c.id)}><CheckCircle size={14} /> Resolve</Button>
    ) : (
      <span className="text-sm text-gray-400">—</span>
    ),
  }));

  return (
    <div>
      <PageHeader title="Schedule Conflicts" description="Detect and resolve scheduling conflicts" />
      <Card>
        <DataTable
          columns={[
            { key: 'type', label: 'Type' },
            { key: 'description', label: 'Description' },
            { key: 'status', label: 'Status' },
            { key: 'action', label: 'Action' },
          ]}
          data={tableData}
        />
      </Card>
      <ToastHost />
    </div>
  );
}
