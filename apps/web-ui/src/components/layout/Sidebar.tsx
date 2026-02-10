import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-white text-gray-800 flex flex-col min-h-screen">
      <div className="p-4 text-2xl font-bold border-b border-gray-200">
        Edupulse Admin
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <Link to="/" className="block p-2 rounded hover:bg-gray-100">
          Dashboard
        </Link>
        <Link to="/admin/students" className="block p-2 rounded hover:bg-gray-100">
          Students
        </Link>
        <Link to="/admin/biometric" className="block p-2 rounded hover:bg-gray-100">
          Attendance
        </Link>
        <Link to="/admin/report-cards" className="block p-2 rounded hover:bg-gray-100">
          Report Cards
        </Link>
        <Link to="/admin/timetable" className="block p-2 rounded hover:bg-gray-100">
          Timetable
        </Link>
        <Link to="/admin/staff" className="block p-2 rounded hover:bg-gray-100">
          Staff
        </Link>
      </nav>
      <div className="p-4 border-t border-gray-200 text-sm text-gray-500">
        © 2023 Edupulse
      </div>
    </div>
  );
};

export default Sidebar;
