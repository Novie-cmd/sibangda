import React from 'react';
import { ConflictHandlingData } from '../types';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface ConflictHandlingMapProps {
  data: ConflictHandlingData[];
}

export const ConflictHandlingMap: React.FC<ConflictHandlingMapProps> = ({ data }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved': return 'bg-emerald-500';
      case 'In Progress': return 'bg-amber-500';
      case 'Pending': return 'bg-slate-400';
      default: return 'bg-slate-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Resolved': return <CheckCircle2 size={14} className="text-emerald-500" />;
      case 'In Progress': return <Clock size={14} className="text-amber-500" />;
      case 'Pending': return <AlertCircle size={14} className="text-slate-400" />;
      default: return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Peta Penanganan Konflik</h2>
          <p className="text-xs text-slate-500">Status penyelesaian konflik sosial di setiap wilayah</p>
        </div>
        <div className="flex space-x-4 text-[10px] font-bold uppercase tracking-wider">
          <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span> Selesai</div>
          <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-amber-500 mr-2"></span> Proses</div>
          <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-slate-400 mr-2"></span> Menunggu</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {data.map((item) => (
          <div 
            key={item.district}
            className="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 group"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-bold text-slate-800">{item.district}</span>
              <div className={`w-2 h-2 rounded-full ${getStatusColor(item.status)}`}></div>
            </div>
            
            <div className="flex items-baseline space-x-1 mb-3">
              <span className="text-3xl font-black text-slate-900">{item.cases}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Kasus</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-600">
                {getStatusIcon(item.status)}
                <span className="uppercase tracking-wide">{item.status === 'Resolved' ? 'Selesai' : item.status === 'In Progress' ? 'Dalam Proses' : 'Menunggu'}</span>
              </div>
              <p className="text-[10px] text-slate-500 italic line-clamp-1 group-hover:line-clamp-none transition-all">
                "{item.lastAction}"
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 p-6 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <h5 className="text-sm font-bold text-emerald-900">Efektivitas Penanganan</h5>
            <p className="text-xs text-emerald-700">Rata-rata penyelesaian konflik meningkat 12% dari bulan lalu.</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-white text-emerald-600 text-xs font-bold rounded-lg border border-emerald-200 hover:bg-emerald-50 transition-colors">
          Unduh Laporan Lengkap
        </button>
      </div>
    </div>
  );
};
