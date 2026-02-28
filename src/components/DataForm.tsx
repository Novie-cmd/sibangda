import React, { useState } from 'react';
import { ConflictData, OrmasData, ForeignerData, ConflictHandlingData } from '../types';
import { Save, AlertCircle, Globe, ShieldAlert, Users, Map, Edit2, Trash2, X, Image as ImageIcon, Upload, User, Building2 } from 'lucide-react';

interface DataFormProps {
  initialTab?: 'conflict' | 'ormas' | 'wasnas_summary' | 'foreigner' | 'institution' | 'handling';
  onUpdateConflict: (data: ConflictData) => void;
  onDeleteConflict: (id: string) => void;
  onAddOrmas: (data: OrmasData) => void;
  onDeleteOrmas: (id: string) => void;
  onUpdateWasnas: (data: ForeignerData) => void;
  onDeleteWasnas: (id: string) => void;
  onUpdateHandling: (data: ConflictHandlingData) => void;
  onDeleteHandling: (id: string) => void;
  conflictData: ConflictData[];
  ormasData: OrmasData[];
  wasnasData: ForeignerData[];
  handlingData: ConflictHandlingData[];
}

export const DataForm: React.FC<DataFormProps> = ({ 
  initialTab = 'conflict',
  onUpdateConflict, 
  onDeleteConflict,
  onAddOrmas,
  onDeleteOrmas,
  onUpdateWasnas,
  onDeleteWasnas,
  onUpdateHandling,
  onDeleteHandling,
  conflictData,
  ormasData,
  wasnasData,
  handlingData
}) => {
  const [activeTab, setActiveTab] = useState<'conflict' | 'ormas' | 'wasnas_summary' | 'foreigner' | 'institution' | 'handling'>(initialTab);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const districts = ['Mataram', 'Lombok Barat', 'Lombok Tengah', 'Lombok Timur', 'Lombok Utara', 'Sumbawa Barat', 'Sumbawa', 'Dompu', 'Bima', 'Kota Bima'];

  const initialConflict: ConflictData = { 
    id: '',
    district: 'Mataram', 
    level: 'Low', 
    incidents: 0, 
    description: '',
    locationDetail: '',
    incidentTime: '',
    participantsCount: 0,
    imageUrl: ''
  };

  const initialOrmas: Partial<OrmasData> = { 
    id: '',
    name: '', 
    category: 'Sosial', 
    district: 'Mataram', 
    status: 'Active', 
    memberCount: 0,
    leaderName: '',
    address: ''
  };

  const initialWasnas: ForeignerData = { 
    id: '',
    district: 'Mataram', 
    count: 0, 
    institutions: 0,
    locationDetail: '',
    activityDescription: ''
  };

  const initialHandling: ConflictHandlingData = { 
    id: '',
    district: 'Mataram', 
    status: 'Pending', 
    cases: 0, 
    lastAction: '',
    locationDetail: '',
    incidentTime: '',
    participantsCount: 0,
    imageUrl: ''
  };

  // Forms State
  const [conflictForm, setConflictForm] = useState<ConflictData>(initialConflict);
  const [ormasForm, setOrmasForm] = useState<Partial<OrmasData>>(initialOrmas);
  const [wasnasForm, setWasnasForm] = useState<ForeignerData>(initialWasnas);
  const [handlingForm, setHandlingForm] = useState<ConflictHandlingData>(initialHandling);

  const resetForms = () => {
    setConflictForm(initialConflict);
    setOrmasForm(initialOrmas);
    setWasnasForm(initialWasnas);
    setHandlingForm(initialHandling);
    setEditingId(null);
  };

  const handleEdit = (type: string, data: any) => {
    setEditingId(data.id);
    switch(type) {
      case 'conflict': setConflictForm(data); break;
      case 'ormas': setOrmasForm(data); break;
      case 'wasnas': 
      case 'wasnas_summary':
      case 'foreigner':
      case 'institution':
        setWasnasForm(data); break;
      case 'handling': setHandlingForm(data); break;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (type: string, id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      switch(type) {
        case 'conflict': onDeleteConflict(id); break;
        case 'ormas': onDeleteOrmas(id); break;
        case 'wasnas':
        case 'wasnas_summary':
        case 'foreigner':
        case 'institution':
          onDeleteWasnas(id); break;
        case 'handling': onDeleteHandling(id); break;
      }
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        if (type === 'conflict') setConflictForm({ ...conflictForm, imageUrl: base64String });
        if (type === 'handling') setHandlingForm({ ...handlingForm, imageUrl: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (type: string, e: React.FormEvent) => {
    e.preventDefault();
    const id = editingId || Math.random().toString(36).substr(2, 9);
    switch(type) {
      case 'conflict': onUpdateConflict({ ...conflictForm, id }); break;
      case 'ormas': onAddOrmas({ ...ormasForm, id } as OrmasData); break;
      case 'wasnas':
      case 'wasnas_summary':
      case 'foreigner':
      case 'institution':
        onUpdateWasnas({ ...wasnasForm, id }); break;
      case 'handling': onUpdateHandling({ ...handlingForm, id }); break;
    }
    resetForms();
    alert(editingId ? 'Data berhasil diperbarui!' : 'Data berhasil ditambahkan!');
  };

  const tabs = [
    { id: 'conflict', label: 'Potensi Konflik', icon: ShieldAlert },
    { id: 'handling', label: 'Penanganan Konflik', icon: Map },
    { id: 'wasnas_summary', label: 'Ringkasan Wasnas', icon: Globe },
    { id: 'foreigner', label: 'Orang Asing', icon: User },
    { id: 'institution', label: 'Lembaga Asing', icon: Building2 },
    { id: 'ormas', label: 'Data Ormas', icon: Users, isSpecial: true },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="flex bg-white border-b border-slate-100 p-4 gap-2 overflow-x-auto">
          {tabs.map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-3 py-4 px-6 rounded-2xl text-[11px] font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id 
                  ? tab.isSpecial 
                    ? 'bg-white text-emerald-600 border-2 border-emerald-500/20 shadow-lg shadow-emerald-100'
                    : 'bg-slate-50 text-slate-900'
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50/50'
              } ${tab.isSpecial && activeTab !== tab.id ? 'border border-slate-100' : ''}`}
            >
              <tab.icon size={18} className={activeTab === tab.id ? 'text-emerald-500' : ''} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="p-12">
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

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Lampiran Foto Kejadian</label>
                <div className="flex items-center space-x-4">
                  <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-50 transition-all overflow-hidden relative group">
                    {conflictForm.imageUrl ? (
                      <>
                        <img src={conflictForm.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <Upload className="text-white" size={20} />
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <ImageIcon className="text-slate-300 mb-2" size={24} />
                        <p className="text-[8px] font-bold text-slate-400 uppercase">Upload Foto</p>
                      </div>
                    )}
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'conflict')} />
                  </label>
                  {conflictForm.imageUrl && (
                    <button 
                      type="button" 
                      onClick={() => setConflictForm({ ...conflictForm, imageUrl: '' })}
                      className="text-[10px] font-bold text-red-500 uppercase tracking-widest hover:underline"
                    >
                      Hapus Foto
                    </button>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-200 transition-all flex items-center justify-center space-x-2">
                  <Save size={20} /><span>{editingId ? 'Perbarui Data' : 'Simpan Data Potensi'}</span>
                </button>
                {editingId && (
                  <button type="button" onClick={resetForms} className="px-6 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-4 rounded-2xl transition-all flex items-center justify-center">
                    <X size={20} />
                  </button>
                )}
              </div>
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

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Dokumentasi Penanganan</label>
                <div className="flex items-center space-x-4">
                  <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-50 transition-all overflow-hidden relative group">
                    {handlingForm.imageUrl ? (
                      <>
                        <img src={handlingForm.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <Upload className="text-white" size={20} />
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <ImageIcon className="text-slate-300 mb-2" size={24} />
                        <p className="text-[8px] font-bold text-slate-400 uppercase">Upload Foto</p>
                      </div>
                    )}
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'handling')} />
                  </label>
                  {handlingForm.imageUrl && (
                    <button 
                      type="button" 
                      onClick={() => setHandlingForm({ ...handlingForm, imageUrl: '' })}
                      className="text-[10px] font-bold text-red-500 uppercase tracking-widest hover:underline"
                    >
                      Hapus Foto
                    </button>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center space-x-2">
                  <Save size={20} /><span>{editingId ? 'Perbarui Status' : 'Update Status Penanganan'}</span>
                </button>
                {editingId && (
                  <button type="button" onClick={resetForms} className="px-6 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-4 rounded-2xl transition-all flex items-center justify-center">
                    <X size={20} />
                  </button>
                )}
              </div>
            </form>
          )}

          {(activeTab === 'wasnas_summary' || activeTab === 'foreigner' || activeTab === 'institution') && (
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
                {(activeTab === 'wasnas_summary' || activeTab === 'foreigner') && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Jumlah Orang Asing</label>
                    <input type="number" value={wasnasForm.count} onChange={(e) => setWasnasForm({...wasnasForm, count: parseInt(e.target.value)})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                  </div>
                )}
                {(activeTab === 'wasnas_summary' || activeTab === 'institution') && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Jumlah Lembaga Asing</label>
                    <input type="number" value={wasnasForm.institutions} onChange={(e) => setWasnasForm({...wasnasForm, institutions: parseInt(e.target.value)})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Uraian Aktivitas / Keterangan</label>
                <textarea value={wasnasForm.activityDescription} onChange={(e) => setWasnasForm({...wasnasForm, activityDescription: e.target.value})} rows={2} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="Tujuan kunjungan, kegiatan, dll..." />
              </div>
              <div className="flex gap-4">
                <button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-purple-200 transition-all flex items-center justify-center space-x-2">
                  <Save size={20} /><span>{editingId ? 'Perbarui Data' : 'Update Data Wasnas'}</span>
                </button>
                {editingId && (
                  <button type="button" onClick={resetForms} className="px-6 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-4 rounded-2xl transition-all flex items-center justify-center">
                    <X size={20} />
                  </button>
                )}
              </div>
            </form>
          )}

          {activeTab === 'ormas' && (
            <form onSubmit={(e) => handleSubmit('ormas', e)} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nama Organisasi</label>
                  <input type="text" required value={ormasForm.name} onChange={(e) => setOrmasForm({...ormasForm, name: e.target.value})} className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all bg-slate-50/30 text-slate-700 placeholder:text-slate-300" placeholder="Nama lengkap ormas..." />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nama Ketua / Pimpinan</label>
                  <input type="text" value={ormasForm.leaderName} onChange={(e) => setOrmasForm({...ormasForm, leaderName: e.target.value})} className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all bg-slate-50/30 text-slate-700 placeholder:text-slate-300" placeholder="Nama ketua..." />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kategori</label>
                  <select value={ormasForm.category} onChange={(e) => setOrmasForm({...ormasForm, category: e.target.value})} className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all bg-slate-50/30 text-slate-700">
                    <option value="Sosial">Sosial</option><option value="Keagamaan">Keagamaan</option><option value="Kepemudaan">Kepemudaan</option><option value="Politik">Politik</option><option value="Ekonomi">Ekonomi</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Wilayah (Kab/Kota)</label>
                  <select value={ormasForm.district} onChange={(e) => setOrmasForm({...ormasForm, district: e.target.value})} className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all bg-slate-50/30 text-slate-700">
                    {districts.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Jumlah Anggota</label>
                  <input type="number" value={ormasForm.memberCount} onChange={(e) => setOrmasForm({...ormasForm, memberCount: parseInt(e.target.value)})} className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all bg-slate-50/30 text-slate-700" />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Alamat Sekretariat</label>
                <textarea value={ormasForm.address} onChange={(e) => setOrmasForm({...ormasForm, address: e.target.value})} rows={3} className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all bg-slate-50/30 text-slate-700 placeholder:text-slate-300" placeholder="Alamat lengkap..." />
              </div>
              <div className="pt-4">
                <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-5 rounded-2xl shadow-xl shadow-emerald-200 transition-all flex items-center justify-center space-x-3 text-sm">
                  <Save size={20} /><span>{editingId ? 'Perbarui Data' : 'Daftarkan Ormas Baru'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
        
        <div className="bg-slate-50/50 p-8 border-t border-slate-100 flex items-start space-x-4">
          <div className="p-2 bg-amber-100 rounded-lg">
            <AlertCircle className="text-amber-600" size={20} />
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed font-medium pt-1">
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
                {(activeTab === 'conflict' || activeTab === 'handling') && (
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Foto</th>
                )}
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Wilayah</th>
                {activeTab === 'conflict' && (
                  <>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Lokasi Detail</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Waktu</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tingkat</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Aksi (Orang)</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Aksi</th>
                  </>
                )}
                {activeTab === 'handling' && (
                  <>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Lokasi Detail</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kasus</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tindakan</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Aksi</th>
                  </>
                )}
                {(activeTab === 'wasnas_summary' || activeTab === 'foreigner' || activeTab === 'institution') && (
                  <>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Lokasi</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Orang Asing</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Lembaga</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Aksi</th>
                  </>
                )}
                {activeTab === 'ormas' && (
                  <>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nama</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ketua</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kategori</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Anggota</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Aksi</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {activeTab === 'conflict' && conflictData.map((item, idx) => (
                <tr key={item.id || idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt="Incident" className="w-10 h-10 rounded-lg object-cover border border-slate-200" />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-300">
                        <ImageIcon size={16} />
                      </div>
                    )}
                  </td>
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
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <button onClick={() => handleEdit('conflict', item)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => handleDelete('conflict', item.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {activeTab === 'handling' && handlingData.map((item, idx) => (
                <tr key={item.id || idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt="Handling" className="w-10 h-10 rounded-lg object-cover border border-slate-200" />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-300">
                        <ImageIcon size={16} />
                      </div>
                    )}
                  </td>
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
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <button onClick={() => handleEdit('handling', item)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => handleDelete('handling', item.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {(activeTab === 'wasnas_summary' || activeTab === 'foreigner' || activeTab === 'institution') && wasnasData.map((item, idx) => (
                <tr key={item.id || idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-700">{item.district}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{item.locationDetail || '-'}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{item.count}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{item.institutions}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <button onClick={() => handleEdit('wasnas', item)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => handleDelete('wasnas', item.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {activeTab === 'ormas' && ormasData.map((item, idx) => (
                <tr key={item.id || idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-700">{item.district}</td>
                  <td className="px-6 py-4 text-sm text-slate-700 font-bold">{item.name}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{item.leaderName || '-'}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{item.category}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{item.memberCount}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <button onClick={() => handleEdit('ormas', item)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => handleDelete('ormas', item.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
