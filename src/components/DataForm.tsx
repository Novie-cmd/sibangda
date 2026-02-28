import React, { useState } from 'react';
import { ConflictData, OrmasData, ForeignerData, ConflictHandlingData, ForeignIndividual, ForeignInstitution } from '../types';
import { Save, AlertCircle, Globe, ShieldAlert, Users, Map, Edit2, Trash2, X, UserCheck, Landmark } from 'lucide-react';

interface DataFormProps {
  onUpdateConflict: (data: ConflictData) => void;
  onDeleteConflict: (id: string) => void;
  onAddOrmas: (data: OrmasData) => void;
  onDeleteOrmas: (id: string) => void;
  onUpdateWasnas: (data: ForeignerData) => void;
  onDeleteWasnas: (id: string) => void;
  onUpdateHandling: (data: ConflictHandlingData) => void;
  onDeleteHandling: (id: string) => void;
  onUpdateForeignIndividual: (data: ForeignIndividual) => void;
  onDeleteForeignIndividual: (id: string) => void;
  onUpdateForeignInstitution: (data: ForeignInstitution) => void;
  onDeleteForeignInstitution: (id: string) => void;
  conflictData: ConflictData[];
  ormasData: OrmasData[];
  wasnasData: ForeignerData[];
  handlingData: ConflictHandlingData[];
  foreignIndividuals: ForeignIndividual[];
  foreignInstitutions: ForeignInstitution[];
}

export const DataForm: React.FC<DataFormProps> = ({ 
  onUpdateConflict, 
  onDeleteConflict,
  onAddOrmas,
  onDeleteOrmas,
  onUpdateWasnas,
  onDeleteWasnas,
  onUpdateHandling,
  onDeleteHandling,
  onUpdateForeignIndividual,
  onDeleteForeignIndividual,
  onUpdateForeignInstitution,
  onDeleteForeignInstitution,
  conflictData,
  ormasData,
  wasnasData,
  handlingData,
  foreignIndividuals,
  foreignInstitutions
}) => {
  const [activeTab, setActiveTab] = useState<'conflict' | 'ormas' | 'wasnas' | 'handling' | 'foreign_individual' | 'foreign_institution'>('conflict');
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
    participantsCount: 0
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
    participantsCount: 0
  };

  const initialForeignIndividual: ForeignIndividual = {
    id: '',
    name: '',
    country: '',
    address: '',
    gender: 'Laki-laki',
    occupation: '',
    stayExpiry: '',
    description: '',
    action: '',
    district: 'Mataram'
  };

  const initialForeignInstitution: ForeignInstitution = {
    id: '',
    name: '',
    address: '',
    country: '',
    businessField: '',
    foreignWorkerCount: 0,
    description: '',
    action: '',
    district: 'Mataram'
  };

  // Forms State
  const [conflictForm, setConflictForm] = useState<ConflictData>(initialConflict);
  const [ormasForm, setOrmasForm] = useState<Partial<OrmasData>>(initialOrmas);
  const [wasnasForm, setWasnasForm] = useState<ForeignerData>(initialWasnas);
  const [handlingForm, setHandlingForm] = useState<ConflictHandlingData>(initialHandling);
  const [foreignIndividualForm, setForeignIndividualForm] = useState<ForeignIndividual>(initialForeignIndividual);
  const [foreignInstitutionForm, setForeignInstitutionForm] = useState<ForeignInstitution>(initialForeignInstitution);

  const resetForms = () => {
    setConflictForm(initialConflict);
    setOrmasForm(initialOrmas);
    setWasnasForm(initialWasnas);
    setHandlingForm(initialHandling);
    setForeignIndividualForm(initialForeignIndividual);
    setForeignInstitutionForm(initialForeignInstitution);
    setEditingId(null);
  };

  const handleEdit = (type: string, data: any) => {
    setEditingId(data.id);
    switch(type) {
      case 'conflict': setConflictForm(data); break;
      case 'ormas': setOrmasForm(data); break;
      case 'wasnas': setWasnasForm(data); break;
      case 'handling': setHandlingForm(data); break;
      case 'foreign_individual': setForeignIndividualForm(data); break;
      case 'foreign_institution': setForeignInstitutionForm(data); break;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (type: string, id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      switch(type) {
        case 'conflict': onDeleteConflict(id); break;
        case 'ormas': onDeleteOrmas(id); break;
        case 'wasnas': onDeleteWasnas(id); break;
        case 'handling': onDeleteHandling(id); break;
        case 'foreign_individual': onDeleteForeignIndividual(id); break;
        case 'foreign_institution': onDeleteForeignInstitution(id); break;
      }
    }
  };

  const handleSubmit = (type: string, e: React.FormEvent) => {
    e.preventDefault();
    const id = editingId || Math.random().toString(36).substr(2, 9);
    switch(type) {
      case 'conflict': onUpdateConflict({ ...conflictForm, id }); break;
      case 'ormas': onAddOrmas({ ...ormasForm, id } as OrmasData); break;
      case 'wasnas': onUpdateWasnas({ ...wasnasForm, id }); break;
      case 'handling': onUpdateHandling({ ...handlingForm, id }); break;
      case 'foreign_individual': onUpdateForeignIndividual({ ...foreignIndividualForm, id }); break;
      case 'foreign_institution': onUpdateForeignInstitution({ ...foreignInstitutionForm, id }); break;
    }
    resetForms();
    alert(editingId ? 'Data berhasil diperbarui!' : 'Data berhasil ditambahkan!');
  };

  const tabs = [
    { id: 'conflict', label: 'Potensi Konflik', icon: ShieldAlert },
    { id: 'handling', label: 'Penanganan Konflik', icon: Map },
    { id: 'wasnas', label: 'Ringkasan Wasnas', icon: Globe },
    { id: 'foreign_individual', label: 'Orang Asing', icon: UserCheck },
    { id: 'foreign_institution', label: 'Lembaga Asing', icon: Landmark },
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

          {activeTab === 'foreign_individual' && (
            <form onSubmit={(e) => handleSubmit('foreign_individual', e)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nama Lengkap</label>
                  <input type="text" required value={foreignIndividualForm.name} onChange={(e) => setForeignIndividualForm({...foreignIndividualForm, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Asal Negara</label>
                  <input type="text" value={foreignIndividualForm.country} onChange={(e) => setForeignIndividualForm({...foreignIndividualForm, country: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Jenis Kelamin</label>
                  <select value={foreignIndividualForm.gender} onChange={(e) => setForeignIndividualForm({...foreignIndividualForm, gender: e.target.value as any})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all">
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pekerjaan</label>
                  <input type="text" value={foreignIndividualForm.occupation} onChange={(e) => setForeignIndividualForm({...foreignIndividualForm, occupation: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Masa Akhir Tinggal</label>
                  <input type="text" value={foreignIndividualForm.stayExpiry} onChange={(e) => setForeignIndividualForm({...foreignIndividualForm, stayExpiry: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="Contoh: 31 Des 2024" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Wilayah (Kab/Kota)</label>
                  <select value={foreignIndividualForm.district} onChange={(e) => setForeignIndividualForm({...foreignIndividualForm, district: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all">
                    {districts.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Alamat di Indonesia</label>
                <textarea value={foreignIndividualForm.address} onChange={(e) => setForeignIndividualForm({...foreignIndividualForm, address: e.target.value})} rows={2} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Uraian</label>
                  <input type="text" value={foreignIndividualForm.description} onChange={(e) => setForeignIndividualForm({...foreignIndividualForm, description: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tindakan</label>
                  <input type="text" value={foreignIndividualForm.action} onChange={(e) => setForeignIndividualForm({...foreignIndividualForm, action: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                </div>
              </div>
              <div className="flex gap-4">
                <button type="submit" className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center space-x-2">
                  <Save size={20} /><span>{editingId ? 'Perbarui Data' : 'Simpan Data Orang Asing'}</span>
                </button>
                {editingId && (
                  <button type="button" onClick={resetForms} className="px-6 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-4 rounded-2xl transition-all flex items-center justify-center">
                    <X size={20} />
                  </button>
                )}
              </div>
            </form>
          )}

          {activeTab === 'foreign_institution' && (
            <form onSubmit={(e) => handleSubmit('foreign_institution', e)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nama Lembaga</label>
                  <input type="text" required value={foreignInstitutionForm.name} onChange={(e) => setForeignInstitutionForm({...foreignInstitutionForm, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Asal Negara</label>
                  <input type="text" value={foreignInstitutionForm.country} onChange={(e) => setForeignInstitutionForm({...foreignInstitutionForm, country: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Bidang Usaha</label>
                  <input type="text" value={foreignInstitutionForm.businessField} onChange={(e) => setForeignInstitutionForm({...foreignInstitutionForm, businessField: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Jumlah Tenaga Asing</label>
                  <input type="number" value={foreignInstitutionForm.foreignWorkerCount} onChange={(e) => setForeignInstitutionForm({...foreignInstitutionForm, foreignWorkerCount: parseInt(e.target.value)})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Wilayah (Kab/Kota)</label>
                  <select value={foreignInstitutionForm.district} onChange={(e) => setForeignInstitutionForm({...foreignInstitutionForm, district: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all">
                    {districts.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Alamat Lembaga</label>
                <textarea value={foreignInstitutionForm.address} onChange={(e) => setForeignInstitutionForm({...foreignInstitutionForm, address: e.target.value})} rows={2} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Uraian</label>
                  <input type="text" value={foreignInstitutionForm.description} onChange={(e) => setForeignInstitutionForm({...foreignInstitutionForm, description: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tindakan</label>
                  <input type="text" value={foreignInstitutionForm.action} onChange={(e) => setForeignInstitutionForm({...foreignInstitutionForm, action: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                </div>
              </div>
              <div className="flex gap-4">
                <button type="submit" className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-teal-200 transition-all flex items-center justify-center space-x-2">
                  <Save size={20} /><span>{editingId ? 'Perbarui Data' : 'Simpan Data Lembaga Asing'}</span>
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
              <div className="flex gap-4">
                <button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-200 transition-all flex items-center justify-center space-x-2">
                  <Save size={20} /><span>{editingId ? 'Perbarui Data' : 'Daftarkan Ormas Baru'}</span>
                </button>
                {editingId && (
                  <button type="button" onClick={resetForms} className="px-6 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-4 rounded-2xl transition-all flex items-center justify-center">
                    <X size={20} />
                  </button>
                )}
              </div>
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
                {activeTab === 'wasnas' && (
                  <>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Lokasi</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Orang Asing</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Lembaga</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Aksi</th>
                  </>
                )}
                {activeTab === 'foreign_individual' && (
                  <>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nama</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Negara</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Masa Berlaku</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Wilayah</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Aksi</th>
                  </>
                )}
                {activeTab === 'foreign_institution' && (
                  <>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Lembaga</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Negara</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Bidang</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">TKA</th>
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
              {activeTab === 'wasnas' && wasnasData.map((item, idx) => (
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
              {activeTab === 'foreign_individual' && foreignIndividuals.map((item, idx) => (
                <tr key={item.id || idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-slate-800">{item.name}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{item.country}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{item.stayExpiry}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{item.district}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <button onClick={() => handleEdit('foreign_individual', item)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => handleDelete('foreign_individual', item.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {activeTab === 'foreign_institution' && foreignInstitutions.map((item, idx) => (
                <tr key={item.id || idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-slate-800">{item.name}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{item.country}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{item.businessField}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{item.foreignWorkerCount}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <button onClick={() => handleEdit('foreign_institution', item)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => handleDelete('foreign_institution', item.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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
