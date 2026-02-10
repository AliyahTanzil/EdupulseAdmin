import React from 'react';
import {
  Calendar,
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

interface DashboardItem {
  label: string;
  icon: React.ElementType;
  link: string;
  iconBgColor: string;
}

const dashboardItems: DashboardItem[] = [
  { label: 'Achievement', icon: Trophy, link: '#', iconBgColor: 'bg-yellow-50' },
  { label: 'Alumni', icon: GraduationCap, link: '#', iconBgColor: 'bg-stone-50' },
  { label: 'Assignment', icon: PenTool, link: '#', iconBgColor: 'bg-sky-50' },
  { label: 'Attendance Tracking', icon: Fingerprint, link: '#', iconBgColor: 'bg-pink-50' },
  { label: 'Campus', icon: School, link: '#', iconBgColor: 'bg-red-50' },
  { label: 'Course', icon: BookOpen, link: '#', iconBgColor: 'bg-amber-50' },
  { label: 'Exam Scheduling', icon: FileText, link: '#', iconBgColor: 'bg-orange-50' },
  { label: 'Faculty', icon: Users, link: '#', iconBgColor: 'bg-violet-50' },
  { label: 'Fee Management', icon: CreditCard, link: '#', iconBgColor: 'bg-rose-50' },
  { label: 'Gradebook', icon: ClipboardList, link: '#', iconBgColor: 'bg-fuchsia-50' },
  { label: 'Library', icon: Library, link: '#', iconBgColor: 'bg-cyan-50' },
  { label: 'Live Classroom', icon: Video, link: '#', iconBgColor: 'bg-indigo-50' },
  { label: 'LMS', icon: Monitor, link: '#', iconBgColor: 'bg-purple-50' },
  { label: 'Marketing', icon: Megaphone, link: '#', iconBgColor: 'bg-rose-50' },
  { label: 'OMR', icon: CheckSquare, link: '#', iconBgColor: 'bg-gray-50' },
  { label: 'Online Admission', icon: UserPlus, link: '#', iconBgColor: 'bg-lime-50' },
  { label: 'Online Appointment', icon: Calendar, link: '#', iconBgColor: 'bg-blue-50' },
  { label: 'SIS', icon: UserCheck, link: '#', iconBgColor: 'bg-emerald-50' },
  { label: 'TimeTable', icon: Clock, link: '#', iconBgColor: 'bg-teal-50' },
  { label: 'Whatsapp', icon: MessageCircle, link: '#', iconBgColor: 'bg-green-50' },
];

const AdminDashboard: React.FC = () => {
  return (
    <>
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {dashboardItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div
              key={index}
              className="aspect-square bg-white rounded-[12px] shadow-sm flex flex-col items-center justify-center text-center p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
            >
              <div className={`p-3 rounded-full ${item.iconBgColor}`}>
                <IconComponent size={24} className="text-gray-600" />
              </div>
              <p className="text-[14px] font-semibold text-[#334155] mt-4">{item.label}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AdminDashboard;
