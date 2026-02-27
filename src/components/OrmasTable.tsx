import React from 'react';
import { OrmasData } from '../types';
import { Search, Filter } from 'lucide-react';

interface OrmasTableProps {
  data: OrmasData[];
}

export const OrmasTable: React.FC<OrmasTableProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-slate-800">Daftar Sebaran Organisasi Kemasyarakatan</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Cari ormas..." 
              className="pl-10 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 outline-none w-64"
            />
          </div>
          <button className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50">
            <Filter size={18} />
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Nama Organisasi</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Ketua</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Kategori</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Wilayah</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Anggota</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((ormas) => (
              <tr key={ormas.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-semibold text-slate-800">{ormas.name}</div>
                  <div className="text-[10px] text-slate-400">Alamat: {ormas.address || '-'}</div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-700 font-medium">{ormas.leaderName || '-'}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-medium">
                    {ormas.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">{ormas.district}</td>
                <td className="px-6 py-4 text-sm text-slate-600 font-medium">{ormas.memberCount.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                    ormas.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {ormas.status === 'Active' ? 'Aktif' : 'Non-Aktif'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 border-t border-slate-100 bg-slate-50 text-center">
        <button className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">Lihat Semua Data</button>
      </div>
    </div>
  );
};
