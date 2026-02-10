import React from 'react';
import {
  Calendar as CalendarIcon, // Renamed to avoid conflict with CalendarClock
  UserCheck,
  BookOpen,
  CreditCard,
  Video,
  Library,
  UserPlus,
  ClipboardList,
  FileText,
  MessageCircle,
  Trophy,
  Monitor,
  Fingerprint,
  PenTool,
  School,
  CheckSquare,
  Clock,
  Users,
  GraduationCap,
  Megaphone,
} from 'lucide-react';
import DashboardCard from '../../components/dashboard/DashboardCard';


const AdminDashboard: React.FC = () => {
  const dashboardItems = [
    { label: 'Online Appointment', icon: <CalendarIcon size={24} />, link: '#', iconBgColor: 'bg-blue-50', iconTextColor: 'text-blue-600' },
    { label: 'SIS', icon: <UserCheck size={24} />, link: '#', iconBgColor: 'bg-emerald-50', iconTextColor: 'text-emerald-600' },
    { label: 'Course', icon: <BookOpen size={24} />, link: '#', iconBgColor: 'bg-amber-50', iconTextColor: 'text-amber-600' },
    { label: 'Fee Management', icon: <CreditCard size={24} />, link: '#', iconBgColor: 'bg-rose-50', iconTextColor: 'text-rose-600' },
    { label: 'Live Classroom', icon: <Video size={24} />, link: '#', iconBgColor: 'bg-indigo-50', iconTextColor: 'text-indigo-600' },
    { label: 'Library', icon: <Library size={24} />, link: '#', iconBgColor: 'bg-cyan-50', iconTextColor: 'text-cyan-600' },
    { label: 'Online Admission', icon: <UserPlus size={24} />, link: '#', iconBgColor: 'bg-lime-50', iconTextColor: 'text-lime-600' },
    { label: 'Gradebook', icon: <ClipboardList size={24} />, link: '#', iconBgColor: 'bg-fuchsia-50', iconTextColor: 'text-fuchsia-600' },
    { label: 'Exam Scheduling', icon: <FileText size={24} />, link: '#', iconBgColor: 'bg-orange-50', iconTextColor: 'text-orange-600' },
    { label: 'Whatsapp', icon: <MessageCircle size={24} />, link: '#', iconBgColor: 'bg-green-50', iconTextColor: 'text-green-600' },
    { label: 'Achievement', icon: <Trophy size={24} />, link: '#', iconBgColor: 'bg-yellow-50', iconTextColor: 'text-yellow-600' },
    { label: 'LMS', icon: <Monitor size={24} />, link: '#', iconBgColor: 'bg-purple-50', iconTextColor: 'text-purple-600' },
    { label: 'Attendance Tracking', icon: <Fingerprint size={24} />, link: '#', iconBgColor: 'bg-pink-50', iconTextColor: 'text-pink-600' },
    { label: 'Assignment', icon: <PenTool size={24} />, link: '#', iconBgColor: 'bg-sky-50', iconTextColor: 'text-sky-600' },
    { label: 'Campus', icon: <School size={24} />, link: '#', iconBgColor: 'bg-red-50', iconTextColor: 'text-red-600' },
    { label: 'OMR', icon: <CheckSquare size={24} />, link: '#', iconBgColor: 'bg-gray-50', iconTextColor: 'text-gray-600' },
    { label: 'TimeTable', icon: <Clock size={24} />, link: '#', iconBgColor: 'bg-teal-50', iconTextColor: 'text-teal-600' },
    { label: 'Faculty', icon: <Users size={24} />, link: '#', iconBgColor: 'bg-violet-50', iconTextColor: 'text-violet-600' },
    { label: 'Alumni', icon: <GraduationCap size={24} />, link: '#', iconBgColor: 'bg-stone-50', iconTextColor: 'text-stone-600' },
    { label: 'Marketing', icon: <Megaphone size={24} />, link: '#', iconBgColor: 'bg-rose-50', iconTextColor: 'text-rose-600' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-5 gap-6">
        {dashboardItems.map((item, index) => (
          <DashboardCard
            key={index}
            label={item.label}
            icon={item.icon}
            link={item.link}
            iconBgColor={item.iconBgColor}
            iconTextColor={item.iconTextColor}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
