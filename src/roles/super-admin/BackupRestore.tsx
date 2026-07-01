import { useState } from 'react';
import { Database, Upload, Download, RotateCcw } from 'lucide-react';
import { PageHeader } from '../../components/ui/StatsCard';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../hooks/useToast';

export function BackupRestore() {
  const { showToast, ToastHost } = useToast();
  const [lastBackup, setLastBackup] = useState('2026-06-25 14:30:00');
  const [restoring, setRestoring] = useState(false);

  const handleBackup = () => {
    setLastBackup(new Date().toLocaleString());
    showToast('System backup created successfully');
  };

  const handleRestore = () => {
    setRestoring(true);
    setTimeout(() => {
      setRestoring(false);
      showToast('System restored from backup', 'info');
    }, 2000);
  };

  return (
    <div>
      <PageHeader title="Backup & Restore" description="Manage system data backup and recovery" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Create Backup">
          <div className="text-center py-6">
            <div className="inline-flex p-4 bg-blue-50 rounded-full text-blue-600 mb-4">
              <Database size={32} />
            </div>
            <p className="text-sm text-gray-500 mb-1">Last backup: {lastBackup}</p>
            <p className="text-sm text-gray-400 mb-6">Includes users, schedules, and academic data</p>
            <Button onClick={handleBackup}><Download size={16} /> Create Backup Now</Button>
          </div>
        </Card>

        <Card title="Restore Data">
          <div className="text-center py-6">
            <div className="inline-flex p-4 bg-amber-50 rounded-full text-amber-600 mb-4">
              <RotateCcw size={32} />
            </div>
            <p className="text-sm text-gray-500 mb-6">Restore system from a previous backup file</p>
            <div className="flex flex-col gap-3">
              <label className="cursor-pointer">
                <input type="file" className="hidden" accept=".json,.sql" onChange={() => showToast('Backup file selected', 'info')} />
                <span className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                  <Upload size={16} /> Select Backup File
                </span>
              </label>
              <Button variant="danger" onClick={handleRestore} disabled={restoring}>
                {restoring ? 'Restoring...' : 'Restore System'}
              </Button>
            </div>
          </div>
        </Card>
      </div>
      <ToastHost />
    </div>
  );
}
