import React, { useState } from 'react';
import { ConflictData, OrmasData, ForeignerData, ConflictHandlingData } from '../types';
import { Save, AlertCircle, Globe, ShieldAlert, Users, Map } from 'lucide-react';

interface DataFormProps {
  onUpdateConflict: (data: ConflictData) => void;
  onAddOrmas: (data: OrmasData) => void;
  onUpdateWasnas: (data: ForeignerData) => void;
  onUpdateHandling: (data: ConflictHandlingData) => void;
}

export const DataForm: React.FC<DataFormProps> = ({ 
  onUpdateConflict, 
  onAddOrmas,
  onUpdateWasnas,
  onUpdateHandling
}) => {
  const [activeTab, setActiveTab] = useState<'conflict' | 'ormas' | 'wasnas' | 'handling'>('conflict');
  
  const districts = ['Mataram', 'Lombok Barat', 'Lombok Tengah', 'Lombok Timur', 'Lombok Utara', 'Sumbawa Barat', 'Sumbawa', 'Dompu', 'Bima', 'Kota Bima'];

  // Forms State
  const [conflictForm, setConflictForm] = useState<ConflictData>({ district: 'Mataram', level: 'Low', incidents: 0, description: '' });
  const [ormasForm, setOrmasForm] = useState<Partial<OrmasData>>({ name: '', category: 'Sosial', district: 'Mataram', status: 'Active', memberCount: 0 });
  const [wasnasForm, setWasnasForm] = useState<ForeignerData>({ district: 'Mataram', count: 0, institutions: 0 });
  const [handlingForm, setHandlingForm] = useState<ConflictHandlingData>({ district: 'Mataram', status: 'Pending', cases: 0, lastAction: '' });

  const handleSubmit = (type: string, e: React.FormEvent) => {
    e.preventDefault();
    switch(type) {
      case 'conflict': onUpdateConflict(conflictForm); break;
      case 'ormas': onAddOrmas({ ...ormasForm, id: Math.random().toString(36).substr(2, 9) } as OrmasData); break;
      case 'wasnas': onUpdateWasnas(wasnasForm); break;
      case 'handling': onUpdateHandling(handlingForm); break;
    }
    alert('Data berhasil diperbarui!');
  };

  const tabs = [
    { id: 'conflict', label: 'Potensi Konflik', icon: ShieldAlert },
    { id: 'handling', label: 'Penanganan Konflik', icon: Map },
    { id: 'wasnas', label: 'Data Wasnas', icon: Globe },
    { id: 'ormas', label: 'Data Ormas', icon: Users },
  ];

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="flex bg-slate-50/50 border-b border-slate-100 p-2 gap-2">
        {tabs.map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-xs font-bold transition-all ${
              activeTab === tab.id 
                ? 'bg-white text-emerald-600 shadow-sm border border-slate-100' 
                : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'
            }`}
          >
            <tab.icon size={16} />
            <span className="hidden md:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="p-8">
        {activeTab === 'conflict' && (
          <form onSubmit={(e) => handleSubmit('conflict', e)} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Wilayah</label>
                <select value={conflictForm.district} onChange={(e) => setConflictForm({...conflictForm, district: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all">
                  {districts.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tingkat Potensi</label>
                <select value={conflictForm.level} onChange={(e) => setConflictForm({...conflictForm, level: e.target.value as any})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all">
                  <option value="Low">Rendah</option><option value="Medium">Sedang</option><option value="High">Tinggi</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Jumlah Insiden</label>
              <input type="number" value={conflictForm.incidents} onChange={(e) => setConflictForm({...conflictForm, incidents: parseInt(e.target.value)})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Keterangan Situasi</label>
              <textarea value={conflictForm.description} onChange={(e) => setConflictForm({...conflictForm, description: e.target.value})} rows={3} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="Detail kondisi lapangan..." />
            </div>
            <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-200 transition-all flex items-center justify-center space-x-2">
              <Save size={20} /><span>Simpan Data Potensi</span>
            </button>
          </form>
        )}

        {activeTab === 'handling' && (
          <form onSubmit={(e) => handleSubmit('handling', e)} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Wilayah</label>
                <select value={handlingForm.district} onChange={(e) => setHandlingForm({...handlingForm, district: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all">
                  {districts.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status Penanganan</label>
                <select value={handlingForm.status} onChange={(e) => setHandlingForm({...handlingForm, status: e.target.value as any})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all">
                  <option value="Resolved">Selesai</option><option value="In Progress">Dalam Proses</option><option value="Pending">Menunggu</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Jumlah Kasus Ditangani</label>
              <input type="number" value={handlingForm.cases} onChange={(e) => setHandlingForm({...handlingForm, cases: parseInt(e.target.value)})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tindakan Terakhir</label>
              <input type="text" value={handlingForm.lastAction} onChange={(e) => setHandlingForm({...handlingForm, lastAction: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="Contoh: Mediasi warga..." />
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center space-x-2">
              <Save size={20} /><span>Update Status Penanganan</span>
            </button>
          </form>
        )}

        {activeTab === 'wasnas' && (
          <form onSubmit={(e) => handleSubmit('wasnas', e)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Wilayah Pemantauan</label>
              <select value={wasnasForm.district} onChange={(e) => setWasnasForm({...wasnasForm, district: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all">
                {districts.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Jumlah Orang Asing</label>
                <input type="number" value={wasnasForm.count} onChange={(e) => setWasnasForm({...wasnasForm, count: parseInt(e.target.value)})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Jumlah Lembaga Asing</label>
                <input type="number" value={wasnasForm.institutions} onChange={(e) => setWasnasForm({...wasnasForm, institutions: parseInt(e.target.value)})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
              </div>
            </div>
            <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-purple-200 transition-all flex items-center justify-center space-x-2">
              <Save size={20} /><span>Update Data Wasnas</span>
            </button>
          </form>
        )}

        {activeTab === 'ormas' && (
          <form onSubmit={(e) => handleSubmit('ormas', e)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nama Organisasi</label>
              <input type="text" required value={ormasForm.name} onChange={(e) => setOrmasForm({...ormasForm, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="Nama lengkap ormas..." />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kategori</label>
                <select value={ormasForm.category} onChange={(e) => setOrmasForm({...ormasForm, category: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all">
                  <option value="Sosial">Sosial</option><option value="Keagamaan">Keagamaan</option><option value="Kepemudaan">Kepemudaan</option><option value="Politik">Politik</option><option value="Ekonomi">Ekonomi</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Wilayah</label>
                <select value={ormasForm.district} onChange={(e) => setOrmasForm({...ormasForm, district: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all">
                  {districts.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>
            <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-200 transition-all flex items-center justify-center space-x-2">
              <Save size={20} /><span>Daftarkan Ormas Baru</span>
            </button>
          </form>
        )}
      </div>
      
      <div className="bg-slate-50 p-6 border-t border-slate-100 flex items-start space-x-3">
        <AlertCircle className="text-amber-500 shrink-0" size={20} />
        <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
          Sistem ini mencatat setiap perubahan data untuk keperluan audit. Pastikan informasi yang dimasukkan akurat dan sesuai dengan laporan resmi dari lapangan.
        </p>
      </div>
    </div>
  );
};
