import React from 'react';
import { LayoutDashboard, Map, Users, PlusCircle, LogOut, ShieldAlert, Globe } from 'lucide-react';
import { View } from '../types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const menuItems = [
    { id: 'dashboard' as View, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'map' as View, label: 'Peta Konflik', icon: ShieldAlert },
    { id: 'handling' as View, label: 'Penanganan Konflik', icon: Map },
    { id: 'ormas' as View, label: 'Sebaran Ormas', icon: Users },
    { id: 'input' as View, label: 'Input Data', icon: PlusCircle },
  ];

  return (
    <div className="w-64 bg-slate-900 h-screen text-white flex flex-col fixed left-0 top-0">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-lg font-bold tracking-tight text-emerald-400 leading-tight">BAKESBANGPOLDAGRI NTB</h1>
        <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest">Provinsi Nusa Tenggara Barat</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={cn(
              "w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200",
              currentView === item.id 
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/20" 
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            )}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button className="w-full flex items-center space-x-3 px-4 py-3 text-slate-400 hover:text-red-400 transition-colors">
          <LogOut size={20} />
          <span className="font-medium">Keluar</span>
        </button>
      </div>
    </div>
  );
};
