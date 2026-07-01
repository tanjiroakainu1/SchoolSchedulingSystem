import { PageHeader } from '../../components/ui/StatsCard';
import { Card } from '../../components/ui/Card';
import { DataTable } from '../../components/ui/DataTable';
import { useAppData } from '../../context/AppDataContext';

import { useFacultyId } from '../../hooks/useFacultyId';

const mockStudents = [
  { id: 'st1', name: 'Ana Cruz', email: 'acruz@student.edu', program: 'BSIT' },
  { id: 'st2', name: 'James Lim', email: 'jlim@student.edu', program: 'BSIT' },
  { id: 'st3', name: 'Sofia Reyes', email: 'sreyes@student.edu', program: 'BSCS' },
  { id: 'st4', name: 'Miguel Tan', email: 'mtan@student.edu', program: 'BSIT' },
  { id: 'st5', name: 'Ella Santos', email: 'esantos@student.edu', program: 'BSCS' },
];

export function ClassList() {
  const facultyId = useFacultyId();
  const { sections, subjects } = useAppData();
  const mySections = sections.filter((s) => s.instructorId === facultyId);

  return (
    <div>
      <PageHeader title="Class List" description="Students enrolled in your classes" />
      {mySections.map((sec) => {
        const subj = subjects.find((s) => s.id === sec.subjectId);
        return (
          <Card key={sec.id} title={`${sec.code} — ${subj?.name}`} subtitle={`${sec.enrolled} students enrolled`} className="mb-4">
            <DataTable
              columns={[
                { key: 'name', label: 'Name' },
                { key: 'email', label: 'Email' },
                { key: 'program', label: 'Program' },
              ]}
              data={mockStudents.slice(0, Math.min(sec.enrolled, 5)).map((st) => ({
                name: st.name,
                email: st.email,
                program: st.program,
              }))}
            />
          </Card>
        );
      })}
    </div>
  );
}
