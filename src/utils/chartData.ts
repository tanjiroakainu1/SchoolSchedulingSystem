import type {
  User,
  ClassSection,
  ScheduleConflict,
  FacultyMember,
  Classroom,
  Subject,
} from '../types';
import { ROLE_CHART_COLORS, DAY_ORDER, CHART_COLORS } from '../config/chartTheme';

export function getUsersByRole(users: User[]) {
  const counts: Record<string, number> = {
    'super-admin': 0,
    registrar: 0,
    faculty: 0,
    student: 0,
  };
  users.forEach((u) => {
    counts[u.role] = (counts[u.role] ?? 0) + 1;
  });
  return Object.entries(counts)
    .filter(([, v]) => v > 0)
    .map(([role, value]) => ({
      name: role.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      value,
      fill: ROLE_CHART_COLORS[role] ?? CHART_COLORS.indigo,
    }));
}

export function getDepartmentDistribution(users: User[]) {
  const map = new Map<string, number>();
  users.forEach((u) => {
    const dept = u.department ?? 'Unassigned';
    map.set(dept, (map.get(dept) ?? 0) + 1);
  });
  const palette = Object.values(CHART_COLORS);
  return Array.from(map.entries()).map(([name, value], i) => ({
    name,
    value,
    fill: palette[i % palette.length],
  }));
}

export function getEnrollmentBySection(sections: ClassSection[]) {
  return sections.map((s, i) => ({
    name: s.code,
    enrolled: s.enrolled,
    capacity: s.maxCapacity,
    utilization: Math.round((s.enrolled / s.maxCapacity) * 100),
    fill: Object.values(CHART_COLORS)[i % Object.values(CHART_COLORS).length],
  }));
}

export function getScheduleByDay(sections: ClassSection[]) {
  return DAY_ORDER.map((day, i) => ({
    name: day.slice(0, 3),
    fullDay: day,
    classes: sections.filter((s) => s.day === day).length,
    students: sections.filter((s) => s.day === day).reduce((sum, s) => sum + s.enrolled, 0),
    fill: Object.values(CHART_COLORS)[i % Object.values(CHART_COLORS).length],
  }));
}

export function getConflictBreakdown(conflicts: ScheduleConflict[]) {
  const pending = conflicts.filter((c) => c.status === 'pending').length;
  const resolved = conflicts.filter((c) => c.status === 'resolved').length;
  return [
    { name: 'Pending', value: pending, fill: CHART_COLORS.rose },
    { name: 'Resolved', value: resolved, fill: CHART_COLORS.emerald },
  ].filter((d) => d.value > 0);
}

export function getConflictByType(conflicts: ScheduleConflict[]) {
  const types = ['room', 'instructor', 'time'] as const;
  return types
    .map((type, i) => ({
      name: type.charAt(0).toUpperCase() + type.slice(1),
      count: conflicts.filter((c) => c.type === type).length,
      fill: Object.values(CHART_COLORS)[i % Object.values(CHART_COLORS).length],
    }))
    .filter((d) => d.count > 0);
}

export function getFacultyWorkload(faculty: FacultyMember[]) {
  return faculty.map((f, i) => ({
    name: f.name.split(' ').pop() ?? f.name,
    fullName: f.name,
    workload: f.workload,
    subjects: f.subjects.length,
    fill: Object.values(CHART_COLORS)[i % Object.values(CHART_COLORS).length],
  }));
}

export function getRoomUtilization(classrooms: Classroom[], sections: ClassSection[]) {
  return classrooms.map((room, i) => {
    const roomSections = sections.filter((s) => s.classroomId === room.id);
    const totalEnrolled = roomSections.reduce((sum, s) => sum + s.enrolled, 0);
    const utilization = room.capacity > 0 ? Math.min(100, Math.round((totalEnrolled / room.capacity) * 100)) : 0;
    return {
      name: room.code,
      utilization,
      capacity: room.capacity,
      sessions: roomSections.length,
      fill: Object.values(CHART_COLORS)[i % Object.values(CHART_COLORS).length],
    };
  });
}

export function getSubjectPopularity(sections: ClassSection[], subjects: Subject[]) {
  return subjects.map((sub, i) => {
    const subSections = sections.filter((s) => s.subjectId === sub.id);
    const enrolled = subSections.reduce((sum, s) => sum + s.enrolled, 0);
    return {
      name: sub.code,
      fullName: sub.name,
      enrolled,
      sections: subSections.length,
      fill: Object.values(CHART_COLORS)[i % Object.values(CHART_COLORS).length],
    };
  });
}

export function getFacultyWeeklyLoad(sections: ClassSection[], facultyId: string) {
  const mySections = sections.filter((s) => s.instructorId === facultyId);
  return DAY_ORDER.map((day, i) => {
    const daySections = mySections.filter((s) => s.day === day);
    const hours = daySections.reduce((sum, s) => {
      const start = parseInt(s.startTime.split(':')[0], 10);
      const end = parseInt(s.endTime.split(':')[0], 10);
      return sum + Math.max(0, end - start);
    }, 0);
    return {
      name: day.slice(0, 3),
      classes: daySections.length,
      hours,
      fill: Object.values(CHART_COLORS)[i % Object.values(CHART_COLORS).length],
    };
  });
}

export function getSystemTrendData() {
  return [
    { month: 'Jan', users: 12, schedules: 8, conflicts: 5 },
    { month: 'Feb', users: 18, schedules: 12, conflicts: 4 },
    { month: 'Mar', users: 24, schedules: 18, conflicts: 6 },
    { month: 'Apr', users: 28, schedules: 22, conflicts: 3 },
    { month: 'May', users: 32, schedules: 28, conflicts: 2 },
    { month: 'Jun', users: 36, schedules: 32, conflicts: 2 },
  ];
}

export function getUserGrowthData(users: User[]) {
  const base = [
    { month: 'Jan', count: 2 },
    { month: 'Feb', count: 4 },
    { month: 'Mar', count: 6 },
    { month: 'Apr', count: 8 },
    { month: 'May', count: 10 },
    { month: 'Jun', count: Math.max(users.length, 12) },
  ];
  return base.map((d, i) => ({
    ...d,
    count: i === base.length - 1 ? users.length : d.count,
  }));
}
