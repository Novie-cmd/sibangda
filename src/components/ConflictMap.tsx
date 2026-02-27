import React, { useState } from 'react';
import { ConflictData } from '../types';
import { X, Info, AlertTriangle } from 'lucide-react';

interface ConflictMapProps {
  data: ConflictData[];
}

export const ConflictMap: React.FC<ConflictMapProps> = ({ data }) => {
  const [selectedDistrict, setSelectedDistrict] = useState<ConflictData | null>(null);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-amber-500';
      case 'Low': return 'bg-emerald-500';
      default: return 'bg-slate-500';
    }
  };

  return (
    <div className="space-y-6">
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
              onClick={() => setSelectedDistrict(item)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                selectedDistrict?.district === item.district 
                  ? 'border-emerald-500 bg-emerald-50 shadow-md scale-[1.02]' 
                  : 'border-slate-100 bg-slate-50 hover:shadow-md hover:bg-white'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-bold text-slate-700">{item.district}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase ${getLevelColor(item.level)}`}>
                  {item.level}
                </span>
              </div>
              <div className="text-2xl font-bold text-slate-900 mb-1">{item.incidents}</div>
              <p className="text-[10px] text-slate-500 leading-tight line-clamp-2">{item.description}</p>
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

      {/* Detail Panel */}
      {selectedDistrict && (
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-emerald-100 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${getLevelColor(selectedDistrict.level)}`}>
                <AlertTriangle size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Detail Wilayah: {selectedDistrict.district}</h3>
                <p className="text-sm text-slate-500">Laporan analisis potensi konflik terkini</p>
              </div>
            </div>
            <button 
              onClick={() => setSelectedDistrict(null)}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X size={20} className="text-slate-400" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Tingkat Ancaman</p>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${getLevelColor(selectedDistrict.level)}`}></div>
                <span className="text-lg font-bold text-slate-800">{selectedDistrict.level === 'High' ? 'Tinggi' : selectedDistrict.level === 'Medium' ? 'Sedang' : 'Rendah'}</span>
              </div>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Total Insiden</p>
              <p className="text-2xl font-black text-slate-900">{selectedDistrict.incidents} <span className="text-sm font-normal text-slate-400 uppercase ml-1">Kejadian</span></p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Status Verifikasi</p>
              <div className="flex items-center space-x-2 text-emerald-600">
                <Info size={16} />
                <span className="text-sm font-bold">Terverifikasi Lapangan</span>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Analisis Situasi</p>
            <p className="text-slate-700 leading-relaxed">{selectedDistrict.description}</p>
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <button className="px-6 py-3 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
              Cetak Laporan
            </button>
            <button className="px-6 py-3 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-lg shadow-emerald-200 transition-all">
              Tindak Lanjut Lapangan
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
