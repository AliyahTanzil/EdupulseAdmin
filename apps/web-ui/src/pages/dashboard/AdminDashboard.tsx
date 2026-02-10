import React from 'react';
import { Link } from 'react-router-dom';

// Placeholder Icons (replace with actual icon library like Font Awesome, Material Icons, etc.)
const StudentIcon = () => (
  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h-5m-9 0h9m-9 0A5 5 0 0110 5h4a5 5 0 010 15m-5-3h3m-3-11h3a2 2 0 110 4h-3a2 2 0 110-4z"></path>
  </svg>
);
const BiometricIcon = () => (
  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.369a12.071 12.071 0 01-2.913-1.205A12.072 12.072 0 015 19c0-8.314 6.692-14 15-14 1.162 0 2.298.175 3.371.513z"></path>
  </svg>
);
const ReportCardIcon = () => (
  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
  </svg>
);
const TimetableIcon = () => (
  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
  </svg>
);
const StaffIcon = () => (
  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h-5m-9 0h9m-9 0a5 5 0 010-10h9m-9 0a5 5 0 010-10h9m-4 10a5 5 0 00-5-5h-5M4 16v-2a5 5 0 015-5h5a5 5 0 015 5v2m-5 0v2a5 5 0 01-5-5h-5a5 5 0 01-5-5v-2"></path>
  </svg>
);

interface DashboardCardProps {
  title: string;
  icon: React.ReactNode;
  color: string;
  link: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, icon, color, link }) => {
  return (
    <Link to={link} className={`block ${color} rounded-lg shadow-md p-6 text-white text-center transform transition-transform duration-300 hover:scale-105`}>
      <div className="flex flex-col items-center justify-center space-y-4">
        {icon}
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
    </Link>
  );
};

const AdminDashboard: React.FC = () => {
  const cardData = [
    {
      title: 'Student Management',
      icon: <StudentIcon />,
      color: 'bg-blue-600',
      link: '/admin/students',
    },
    {
      title: 'Biometric Attendance',
      icon: <BiometricIcon />,
      color: 'bg-emerald-500',
      link: '/admin/biometric',
    },
    {
      title: 'Report Cards',
      icon: <ReportCardIcon />,
      color: 'bg-amber-500',
      link: '/admin/report-cards',
    },
    {
      title: 'Timetable',
      icon: <TimetableIcon />,
      color: 'bg-rose-500',
      link: '/admin/timetable',
    },
    {
      title: 'Staff Records',
      icon: <StaffIcon />,
      color: 'bg-indigo-600',
      link: '/admin/staff',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cardData.map((card, index) => (
          <DashboardCard
            key={index}
            title={card.title}
            icon={card.icon}
            color={card.color}
            link={card.link}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
