import React, { useState } from 'react';
import { ConflictData, OrmasData, ForeignerData, ConflictHandlingData } from '../types';
import { Save, AlertCircle, Globe, ShieldAlert, Users, Map } from 'lucide-react';

interface DataFormProps {
  onUpdateConflict: (data: ConflictData) => void;
  onAddOrmas: (data: OrmasData) => void;
  onUpdateWasnas: (data: ForeignerData) => void;
  onUpdateHandling: (data: ConflictHandlingData) => void;
  conflictData: ConflictData[];
  ormasData: OrmasData[];
  wasnasData: ForeignerData[];
  handlingData: ConflictHandlingData[];
}

export const DataForm: React.FC<DataFormProps> = ({ 
  onUpdateConflict, 
  onAddOrmas,
  onUpdateWasnas,
  onUpdateHandling,
  conflictData,
  ormasData,
  wasnasData,
  handlingData
}) => {
  const [activeTab, setActiveTab] = useState<'conflict' | 'ormas' | 'wasnas' | 'handling'>('conflict');
  
  const districts = ['Mataram', 'Lombok Barat', 'Lombok Tengah', 'Lombok Timur', 'Lombok Utara', 'Sumbawa Barat', 'Sumbawa', 'Dompu', 'Bima', 'Kota Bima'];

  // Forms State
  const [conflictForm, setConflictForm] = useState<ConflictData>({ 
    district: 'Mataram', 
    level: 'Low', 
    incidents: 0, 
    description: '',
    locationDetail: '',
    incidentTime: '',
    participantsCount: 0
  });
  const [ormasForm, setOrmasForm] = useState<Partial<OrmasData>>({ 
    name: '', 
    category: 'Sosial', 
    district: 'Mataram', 
    status: 'Active', 
    memberCount: 0,
    leaderName: '',
    address: ''
  });
  const [wasnasForm, setWasnasForm] = useState<ForeignerData>({ 
    district: 'Mataram', 
    count: 0, 
    institutions: 0,
    locationDetail: '',
    activityDescription: ''
  });
  const [handlingForm, setHandlingForm] = useState<ConflictHandlingData>({ 
    district: 'Mataram', 
    status: 'Pending', 
    cases: 0, 
    lastAction: '',
    locationDetail: '',
    incidentTime: '',
    participantsCount: 0
  });

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
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Wilayah (Kab/Kota)</label>
                  <select value={conflictForm.district} onChange={(e) => setConflictForm({...conflictForm, district: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all">
                    {districts.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Lokasi Detail (Desa/Kel/Kec)</label>
                  <input type="text" value={conflictForm.locationDetail} onChange={(e) => setConflictForm({...conflictForm, locationDetail: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="Contoh: Desa Kuta, Kec. Pujut" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Waktu Kejadian</label>
                  <input type="text" value={conflictForm.incidentTime} onChange={(e) => setConflictForm({...conflictForm, incidentTime: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="Contoh: 20 Feb 2024, 10:00 WITA" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tingkat Potensi</label>
                  <select value={conflictForm.level} onChange={(e) => setConflictForm({...conflictForm, level: e.target.value as any})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all">
                    <option value="Low">Rendah</option><option value="Medium">Sedang</option><option value="High">Tinggi</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Jumlah Insiden</label>
                  <input type="number" value={conflictForm.incidents} onChange={(e) => setConflictForm({...conflictForm, incidents: parseInt(e.target.value)})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Jumlah Orang Aksi (Jika ada)</label>
                  <input type="number" value={conflictForm.participantsCount} onChange={(e) => setConflictForm({...conflictForm, participantsCount: parseInt(e.target.value)})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Uraian Kejadian / Keterangan Situasi</label>
                <textarea value={conflictForm.description} onChange={(e) => setConflictForm({...conflictForm, description: e.target.value})} rows={3} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="Detail kondisi lapangan..." />
              </div>
              <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-200 transition-all flex items-center justify-center space-x-2">
                <Save size={20} /><span>Simpan Data Potensi</span>
              </button>
            </form>
          )}

          {activeTab === 'handling' && (
            <form onSubmit={(e) => handleSubmit('handling', e)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Wilayah (Kab/Kota)</label>
                  <select value={handlingForm.district} onChange={(e) => setHandlingForm({...handlingForm, district: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all">
                    {districts.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Lokasi Detail (Desa/Kel/Kec)</label>
                  <input type="text" value={handlingForm.locationDetail} onChange={(e) => setHandlingForm({...handlingForm, locationDetail: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="Contoh: Desa Kuta, Kec. Pujut" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Waktu Kejadian</label>
                  <input type="text" value={handlingForm.incidentTime} onChange={(e) => setHandlingForm({...handlingForm, incidentTime: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="Contoh: 20 Feb 2024" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status Penanganan</label>
                  <select value={handlingForm.status} onChange={(e) => setHandlingForm({...handlingForm, status: e.target.value as any})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all">
                    <option value="Resolved">Selesai</option><option value="In Progress">Dalam Proses</option><option value="Pending">Menunggu</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Jumlah Kasus Ditangani</label>
                  <input type="number" value={handlingForm.cases} onChange={(e) => setHandlingForm({...handlingForm, cases: parseInt(e.target.value)})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Jumlah Orang Aksi</label>
                  <input type="number" value={handlingForm.participantsCount} onChange={(e) => setHandlingForm({...handlingForm, participantsCount: parseInt(e.target.value)})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tindakan Terakhir / Langkah Penanganan</label>
                <input type="text" value={handlingForm.lastAction} onChange={(e) => setHandlingForm({...handlingForm, lastAction: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="Contoh: Mediasi warga, koordinasi aparat..." />
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center space-x-2">
                <Save size={20} /><span>Update Status Penanganan</span>
              </button>
            </form>
          )}

          {activeTab === 'wasnas' && (
            <form onSubmit={(e) => handleSubmit('wasnas', e)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Wilayah Pemantauan</label>
                  <select value={wasnasForm.district} onChange={(e) => setWasnasForm({...wasnasForm, district: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all">
                    {districts.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Lokasi Detail (Kec/Desa)</label>
                  <input type="text" value={wasnasForm.locationDetail} onChange={(e) => setWasnasForm({...wasnasForm, locationDetail: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="Lokasi spesifik..." />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Jumlah Orang Asing</label>
                  <input type="number" value={wasnasForm.count} onChange={(e) => setWasnasForm({...wasnasForm, count: parseInt(e.target.value)})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Jumlah Lembaga Asing</label>
                  <input type="number" value={wasnasForm.institutions} onChange={(e) => setWasnasForm({...wasnasForm, institutions: parseInt(e.target.value)})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Uraian Aktivitas / Keterangan</label>
                <textarea value={wasnasForm.activityDescription} onChange={(e) => setWasnasForm({...wasnasForm, activityDescription: e.target.value})} rows={2} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="Tujuan kunjungan, kegiatan, dll..." />
              </div>
              <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-purple-200 transition-all flex items-center justify-center space-x-2">
                <Save size={20} /><span>Update Data Wasnas</span>
              </button>
            </form>
          )}

          {activeTab === 'ormas' && (
            <form onSubmit={(e) => handleSubmit('ormas', e)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nama Organisasi</label>
                  <input type="text" required value={ormasForm.name} onChange={(e) => setOrmasForm({...ormasForm, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="Nama lengkap ormas..." />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nama Ketua / Pimpinan</label>
                  <input type="text" value={ormasForm.leaderName} onChange={(e) => setOrmasForm({...ormasForm, leaderName: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="Nama ketua..." />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kategori</label>
                  <select value={ormasForm.category} onChange={(e) => setOrmasForm({...ormasForm, category: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all">
                    <option value="Sosial">Sosial</option><option value="Keagamaan">Keagamaan</option><option value="Kepemudaan">Kepemudaan</option><option value="Politik">Politik</option><option value="Ekonomi">Ekonomi</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Wilayah (Kab/Kota)</label>
                  <select value={ormasForm.district} onChange={(e) => setOrmasForm({...ormasForm, district: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all">
                    {districts.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Jumlah Anggota</label>
                  <input type="number" value={ormasForm.memberCount} onChange={(e) => setOrmasForm({...ormasForm, memberCount: parseInt(e.target.value)})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Alamat Sekretariat</label>
                <textarea value={ormasForm.address} onChange={(e) => setOrmasForm({...ormasForm, address: e.target.value})} rows={2} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="Alamat lengkap..." />
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

      {/* Data Tables */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Data Terdaftar: {tabs.find(t => t.id === activeTab)?.label}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Wilayah</th>
                {activeTab === 'conflict' && (
                  <>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Lokasi Detail</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Waktu</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tingkat</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Aksi (Orang)</th>
                  </>
                )}
                {activeTab === 'handling' && (
                  <>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Lokasi Detail</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kasus</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tindakan</th>
                  </>
                )}
                {activeTab === 'wasnas' && (
                  <>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Lokasi</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Orang Asing</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Lembaga</th>
                  </>
                )}
                {activeTab === 'ormas' && (
                  <>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nama</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ketua</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kategori</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Anggota</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {activeTab === 'conflict' && conflictData.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-700">{item.district}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{item.locationDetail || '-'}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{item.incidentTime || '-'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase ${
                      item.level === 'High' ? 'bg-red-500' : item.level === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}>
                      {item.level}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{item.participantsCount || 0}</td>
                </tr>
              ))}
              {activeTab === 'handling' && handlingData.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-700">{item.district}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{item.locationDetail || '-'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase ${
                      item.status === 'Resolved' ? 'bg-emerald-500' : item.status === 'In Progress' ? 'bg-amber-500' : 'bg-slate-400'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{item.cases}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{item.lastAction}</td>
                </tr>
              ))}
              {activeTab === 'wasnas' && wasnasData.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-700">{item.district}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{item.locationDetail || '-'}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{item.count}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{item.institutions}</td>
                </tr>
              ))}
              {activeTab === 'ormas' && ormasData.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-700">{item.district}</td>
                  <td className="px-6 py-4 text-sm text-slate-700 font-bold">{item.name}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{item.leaderName || '-'}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{item.category}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{item.memberCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
