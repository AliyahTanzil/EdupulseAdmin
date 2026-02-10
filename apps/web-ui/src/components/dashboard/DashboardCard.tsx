import React from 'react';
import { Link } from 'react-router-dom';

interface DashboardCardProps {
  label: string;
  icon: React.ReactNode;
  link: string;
  iconBgColor: string; // New prop for icon background color
  iconTextColor: string; // New prop for icon text color
}

const DashboardCard: React.FC<DashboardCardProps> = ({ label, icon, link, iconBgColor, iconTextColor }) => {
  return (
    <Link
      to={link}
      className="group aspect-square bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center p-4 transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer"
    >
      <div className={`flex items-center justify-center w-12 h-12 rounded-full ${iconBgColor} ${iconTextColor} mb-3 transition-colors duration-300 group-hover:bg-opacity-80`}>
        {icon}
      </div>
      <span className="font-semibold text-sm text-slate-700">{label}</span>
    </Link>
  );
};

export default DashboardCard;