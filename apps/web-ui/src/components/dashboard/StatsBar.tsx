import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, color }) => {
  return (
    <div className={`flex-1 ${color} rounded-lg shadow-md p-4 flex flex-col items-center justify-center text-white`}>
      <p className="text-sm font-medium opacity-80">{title}</p>
      <p className="text-3xl font-bold mt-1">{value}</p>
    </div>
  );
};

interface StatsBarProps {
  totalStudents?: number;
  attendanceRate?: string; // e.g., "95%"
  activeTeachers?: number;
  pendingReports?: number;
}

const StatsBar: React.FC<StatsBarProps> = ({
  totalStudents = 1200,
  attendanceRate = "92%",
  activeTeachers = 75,
  pendingReports = 15,
}) => {
  return (
    <div className="w-full flex flex-col sm:flex-row gap-4 p-4">
      <StatCard title="Total Students" value={totalStudents} color="bg-blue-600" />
      <StatCard title="Attendance Rate" value={attendanceRate} color="bg-emerald-500" />
      <StatCard title="Active Teachers" value={activeTeachers} color="bg-purple-600" />
      <StatCard title="Pending Reports" value={pendingReports} color="bg-orange-500" />
    </div>
  );
};

export default StatsBar;
