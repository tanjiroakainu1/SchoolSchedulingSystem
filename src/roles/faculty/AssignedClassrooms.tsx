import { PageHeader } from '../../components/ui/StatsCard';
import { Card } from '../../components/ui/Card';
import { DataTable } from '../../components/ui/DataTable';
import { useAppData } from '../../context/AppDataContext';

import { useFacultyId } from '../../hooks/useFacultyId';

export function AssignedClassrooms() {
  const facultyId = useFacultyId();
  const { sections, classrooms, subjects } = useAppData();
  const mySections = sections.filter((s) => s.instructorId === facultyId);
  const roomIds = [...new Set(mySections.map((s) => s.classroomId))];

  return (
    <div>
      <PageHeader title="Assigned Classrooms" description="Rooms assigned to your classes" />
      <Card>
        <DataTable
          columns={[
            { key: 'room', label: 'Room' },
            { key: 'building', label: 'Building' },
            { key: 'type', label: 'Type' },
            { key: 'capacity', label: 'Capacity' },
            { key: 'usedFor', label: 'Used For' },
          ]}
          data={roomIds.map((rid) => {
            const room = classrooms.find((c) => c.id === rid)!;
            const secs = mySections.filter((s) => s.classroomId === rid);
            const usedFor = secs.map((s) => {
              const subj = subjects.find((sub) => sub.id === s.subjectId);
              return `${subj?.code} (${s.day})`;
            }).join(', ');
            return {
              room: room.code,
              building: room.building,
              type: <span className="capitalize">{room.type}</span>,
              capacity: room.capacity,
              usedFor,
            };
          })}
        />
      </Card>
    </div>
  );
}
