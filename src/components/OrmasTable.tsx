import React from 'react';
import { OrmasData } from '../types';
import { Search, Filter } from 'lucide-react';

interface OrmasTableProps {
  data: OrmasData[];
}

export const OrmasTable: React.FC<OrmasTableProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-[32px] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
      <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight">Daftar Sebaran Organisasi Kemasyarakatan</h2>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input 
              type="text" 
              placeholder="Cari ormas..." 
              className="pl-12 pr-6 py-3 rounded-2xl border border-slate-100 bg-slate-50/50 text-sm focus:ring-2 focus:ring-emerald-500 outline-none w-80 transition-all placeholder:text-slate-300"
            />
          </div>
          <button className="p-3 rounded-2xl border border-slate-100 bg-slate-50/50 text-slate-400 hover:bg-white hover:text-emerald-600 hover:shadow-md transition-all">
            <Filter size={20} />
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-8 py-6 text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em]">Nama Organisasi</th>
              <th className="px-8 py-6 text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em]">Ketua</th>
              <th className="px-8 py-6 text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em]">Kategori</th>
              <th className="px-8 py-6 text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em]">Wilayah</th>
              <th className="px-8 py-6 text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em]">Anggota</th>
              <th className="px-8 py-6 text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em]">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((ormas) => (
              <tr key={ormas.id} className="hover:bg-slate-50/80 transition-all group">
                <td className="px-8 py-7">
                  <div className="font-bold text-slate-700 text-[15px] mb-1 group-hover:text-emerald-700 transition-colors">{ormas.name}</div>
                  <div className="text-[11px] text-slate-400 font-medium">Alamat: {ormas.address || '-'}</div>
                </td>
                <td className="px-8 py-7 text-sm text-slate-500 font-medium">{ormas.leaderName || '-'}</td>
                <td className="px-8 py-7">
                  <span className="px-4 py-1.5 rounded-xl bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                    {ormas.category}
                  </span>
                </td>
                <td className="px-8 py-7 text-sm text-slate-500 font-medium">{ormas.district}</td>
                <td className="px-8 py-7 text-sm text-slate-600 font-bold">{ormas.memberCount.toLocaleString()}</td>
                <td className="px-8 py-7">
                  <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-[0.1em] ${
                    ormas.status === 'Active' 
                      ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                      : 'bg-slate-50 text-slate-400 border border-slate-100'
                  }`}>
                    {ormas.status === 'Active' ? 'Aktif' : 'Non-Aktif'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-8 border-t border-slate-100 bg-white text-center">
        <button className="text-sm font-bold text-emerald-600 hover:text-emerald-700 hover:underline transition-all tracking-wide">Lihat Semua Data</button>
      </div>
    </div>
  );
};
