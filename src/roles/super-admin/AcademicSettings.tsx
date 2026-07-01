import { useState } from 'react';
import { Save } from 'lucide-react';
import { PageHeader } from '../../components/ui/StatsCard'
import { PageShell } from '../../components/ui/PageShell';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { FormField, inputClass } from '../../components/ui/DataTable';
import { useToast } from '../../hooks/useToast';

export function AcademicSettings() {
  const { showToast, ToastHost } = useToast();
  const [settings, setSettings] = useState({
    schoolName: 'State University',
    maxUnitsPerSemester: '24',
    classDuration: '120',
    conflictCheckEnabled: true,
    autoNotifyOnChange: true,
    enrollmentDeadline: '2026-07-15',
  });

  const handleSave = () => {
    showToast('Academic settings saved successfully');
  };

  return (
    <PageShell>
      <PageHeader
        title="Academic Settings"
        description="Configure institution-wide academic parameters"
        action={<Button onClick={handleSave}><Save size={16} /> Save Settings</Button>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="General">
          <FormField label="School Name">
            <input className={inputClass} value={settings.schoolName} onChange={(e) => setSettings({ ...settings, schoolName: e.target.value })} />
          </FormField>
          <FormField label="Max Units Per Semester">
            <input className={inputClass} type="number" value={settings.maxUnitsPerSemester} onChange={(e) => setSettings({ ...settings, maxUnitsPerSemester: e.target.value })} />
          </FormField>
          <FormField label="Default Class Duration (minutes)">
            <input className={inputClass} type="number" value={settings.classDuration} onChange={(e) => setSettings({ ...settings, classDuration: e.target.value })} />
          </FormField>
        </Card>

        <Card title="Scheduling">
          <label className="flex items-center gap-3 mb-4 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.conflictCheckEnabled}
              onChange={(e) => setSettings({ ...settings, conflictCheckEnabled: e.target.checked })}
              className="w-4 h-4 rounded border-gray-300 text-primary-600"
            />
            <span className="text-sm text-gray-700">Enable automatic conflict detection</span>
          </label>
          <label className="flex items-center gap-3 mb-4 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.autoNotifyOnChange}
              onChange={(e) => setSettings({ ...settings, autoNotifyOnChange: e.target.checked })}
              className="w-4 h-4 rounded border-gray-300 text-primary-600"
            />
            <span className="text-sm text-gray-700">Auto-notify users on schedule changes</span>
          </label>
          <FormField label="Enrollment Deadline">
            <input className={inputClass} type="date" value={settings.enrollmentDeadline} onChange={(e) => setSettings({ ...settings, enrollmentDeadline: e.target.value })} />
          </FormField>
        </Card>
      </div>
      <ToastHost />
    </PageShell>
  );
}
