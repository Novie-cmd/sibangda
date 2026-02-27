import React from 'react';
import { ConflictData } from '../types';

interface ConflictMapProps {
  data: ConflictData[];
}

export const ConflictMap: React.FC<ConflictMapProps> = ({ data }) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-amber-500';
      case 'Low': return 'bg-emerald-500';
      default: return 'bg-slate-500';
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-slate-800">Peta Potensi Konflik Horizontal</h2>
        <div className="flex space-x-4 text-xs">
          <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-red-500 mr-1"></span> Tinggi</div>
          <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-amber-500 mr-1"></span> Sedang</div>
          <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-emerald-500 mr-1"></span> Rendah</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {data.map((item) => (
          <div 
            key={item.district}
            className="p-4 rounded-xl border border-slate-100 bg-slate-50 hover:shadow-md transition-shadow cursor-default"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm font-bold text-slate-700">{item.district}</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase ${getLevelColor(item.level)}`}>
                {item.level}
              </span>
            </div>
            <div className="text-2xl font-bold text-slate-900 mb-1">{item.incidents}</div>
            <p className="text-[10px] text-slate-500 leading-tight">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Visual Map Placeholder */}
      <div className="mt-8 h-64 bg-slate-100 rounded-xl flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="text-slate-400 font-medium flex flex-col items-center">
          <svg className="w-24 h-24 mb-2 opacity-20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          Visualisasi Peta NTB (Interactive SVG)
        </div>
      </div>
    </div>
  );
};
