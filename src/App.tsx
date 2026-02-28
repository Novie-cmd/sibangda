import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { ConflictMap } from './components/ConflictMap';
import { ConflictHandlingMap } from './components/ConflictHandlingMap';
import { OrmasTable } from './components/OrmasTable';
import { WasnasTable } from './components/WasnasTable';
import { DataForm } from './components/DataForm';
import { View, ConflictData, OrmasData, ForeignerData, ConflictHandlingData } from './types';
import { INITIAL_CONFLICT_DATA, INITIAL_ORMAS_DATA, INITIAL_CONFLICT_HANDLING_DATA, INITIAL_FOREIGNER_DATA } from './constants';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, User, Search } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [conflictData, setConflictData] = useState<ConflictData[]>(INITIAL_CONFLICT_DATA);
  const [ormasData, setOrmasData] = useState<OrmasData[]>(INITIAL_ORMAS_DATA);
  const [handlingData, setHandlingData] = useState<ConflictHandlingData[]>(INITIAL_CONFLICT_HANDLING_DATA);
  const [foreignerData, setForeignerData] = useState<ForeignerData[]>(INITIAL_FOREIGNER_DATA);
  const [customMapImage, setCustomMapImage] = useState<string | null>(null);
  const [customHandlingMapImage, setCustomHandlingMapImage] = useState<string | null>(null);

  const handleUpdateConflict = (newData: ConflictData) => {
    setConflictData(prev => {
      const exists = prev.find(item => item.id === newData.id);
      if (exists) {
        return prev.map(item => item.id === newData.id ? newData : item);
      }
      return [newData, ...prev];
    });
  };

  const handleDeleteConflict = (id: string) => {
    setConflictData(prev => prev.filter(item => item.id !== id));
  };

  const handleAddOrmas = (newOrmas: OrmasData) => {
    setOrmasData(prev => {
      const exists = prev.find(item => item.id === newOrmas.id);
      if (exists) {
        return prev.map(item => item.id === newOrmas.id ? newOrmas : item);
      }
      return [newOrmas, ...prev];
    });
  };

  const handleDeleteOrmas = (id: string) => {
    setOrmasData(prev => prev.filter(item => item.id !== id));
  };

  const handleUpdateWasnas = (newData: ForeignerData) => {
    setForeignerData(prev => {
      const exists = prev.find(item => item.id === newData.id);
      if (exists) {
        return prev.map(item => item.id === newData.id ? newData : item);
      }
      return [newData, ...prev];
    });
  };

  const handleDeleteWasnas = (id: string) => {
    setForeignerData(prev => prev.filter(item => item.id !== id));
  };

  const handleUpdateHandling = (newData: ConflictHandlingData) => {
    setHandlingData(prev => {
      const exists = prev.find(item => item.id === newData.id);
      if (exists) {
        return prev.map(item => item.id === newData.id ? newData : item);
      }
      return [newData, ...prev];
    });
  };

  const handleDeleteHandling = (id: string) => {
    setHandlingData(prev => prev.filter(item => item.id !== id));
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard conflictData={conflictData} ormasData={ormasData} foreignerData={foreignerData} />;
      case 'map': return <ConflictMap data={conflictData} customMapImage={customMapImage} onMapImageUpload={setCustomMapImage} />;
      case 'handling': return <ConflictHandlingMap data={handlingData} customMapImage={customHandlingMapImage} onMapImageUpload={setCustomHandlingMapImage} />;
      case 'ormas': return <OrmasTable data={ormasData} />;
      case 'wasnas': return <WasnasTable data={foreignerData} />;
      case 'input': return (
        <DataForm 
          onUpdateConflict={handleUpdateConflict} 
          onDeleteConflict={handleDeleteConflict}
          onAddOrmas={handleAddOrmas}
          onDeleteOrmas={handleDeleteOrmas}
          onUpdateWasnas={handleUpdateWasnas}
          onDeleteWasnas={handleDeleteWasnas}
          onUpdateHandling={handleUpdateHandling}
          onDeleteHandling={handleDeleteHandling}
          conflictData={conflictData}
          ormasData={ormasData}
          wasnasData={foreignerData}
          handlingData={handlingData}
        />
      );
      default: return <Dashboard conflictData={conflictData} ormasData={ormasData} foreignerData={foreignerData} />;
    }
  };

  const getViewTitle = () => {
    switch (currentView) {
      case 'dashboard': return 'Dashboard SIBANGDA';
      case 'map': return 'Peta Potensi Konflik';
      case 'handling': return 'Status Penanganan Konflik';
      case 'ormas': return 'Data Sebaran Ormas';
      case 'wasnas': return 'Data Sebaran Wasnas';
      case 'input': return 'Update Data Lapangan';
      default: return 'Dashboard SIBANGDA';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{getViewTitle()}</h2>
            <p className="text-slate-500 text-sm">Sistem Informasi BAKESBANGPOLDAGRI</p>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Cari data..." 
                className="pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-emerald-500 outline-none w-64 transition-all"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-slate-400 hover:text-slate-600 bg-white rounded-xl border border-slate-200">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <div className="flex items-center space-x-3 pl-4 border-l border-slate-200">
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900">Admin Wasbang</p>
                  <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Super Admin</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <User size={20} />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-slate-200 flex justify-between items-center text-slate-400 text-xs">
          <p>© 2024 Bakesbangpoldagri NTB - Bidang Wawasan Kebangsaan</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-slate-600">Panduan Pengguna</a>
            <a href="#" className="hover:text-slate-600">Kebijakan Privasi</a>
            <a href="#" className="hover:text-slate-600">Kontak Bantuan</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
