import React, { useState, useMemo } from 'react';
import { ConflictHandlingData } from '../types';
import { CheckCircle2, Clock, AlertCircle, X, FileText, History, Upload, MapPin, Users, Calendar } from 'lucide-react';

interface ConflictHandlingMapProps {
  data: ConflictHandlingData[];
  customMapImage?: string | null;
  onMapImageUpload?: (url: string) => void;
}

export const ConflictHandlingMap: React.FC<ConflictHandlingMapProps> = ({ data, customMapImage, onMapImageUpload }) => {
  const [selectedDistrictName, setSelectedDistrictName] = useState<string | null>(null);

  const groupedData = useMemo(() => {
    const groups: Record<string, ConflictHandlingData[]> = {};
    data.forEach(item => {
      if (!groups[item.district]) {
        groups[item.district] = [];
      }
      groups[item.district].push(item);
    });
    return groups;
  }, [data]);

  const selectedDistrictData = selectedDistrictName ? groupedData[selectedDistrictName] : null;

  const handleMapUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onMapImageUpload) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onMapImageUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Peta Penanganan Konflik</h2>
            <p className="text-xs text-slate-500">Status penyelesaian konflik sosial di setiap wilayah</p>
          </div>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg cursor-pointer transition-all border border-slate-200 text-[10px] font-bold uppercase tracking-widest">
              <Upload size={14} />
              <span>Import Foto Peta</span>
              <input type="file" className="hidden" accept="image/*" onChange={handleMapUpload} />
            </label>
            <div className="flex space-x-4 text-[10px] font-bold uppercase tracking-wider">
              <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span> Selesai</div>
              <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-amber-500 mr-2"></span> Proses</div>
              <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-slate-400 mr-2"></span> Menunggu</div>
            </div>
          </div>
        </div>

        {/* Visual Map - Lombok & Sumbawa Image with Interactive Dots */}
        <div className="mt-8 p-4 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col items-center justify-center min-h-[500px] relative overflow-hidden">
          <div className="w-full max-w-5xl relative aspect-[2.5/1]">
            {/* Map Image Background */}
            <img 
              src={customMapImage || "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Indonesia_West_Nusa_Tenggara_location_map.svg/1280px-Indonesia_West_Nusa_Tenggara_location_map.svg.png"} 
              alt="Peta NTB" 
              className="w-full h-full object-contain opacity-80 mix-blend-multiply"
              referrerPolicy="no-referrer"
            />
            
            {/* Interactive Overlay Layer */}
            <svg viewBox="0 0 1280 512" className="absolute inset-0 w-full h-full">
              {Object.entries(groupedData).map(([district, items], idx) => {
                const positions: Record<string, {x: number, y: number}> = {
                  'Mataram': {x: 135, y: 275},
                  'Lombok Barat': {x: 125, y: 315},
                  'Lombok Tengah': {x: 190, y: 345},
                  'Lombok Timur': {x: 255, y: 305},
                  'Lombok Utara': {x: 195, y: 215},
                  'Sumbawa Barat': {x: 410, y: 325},
                  'Sumbawa': {x: 590, y: 285},
                  'Dompu': {x: 840, y: 315},
                  'Bima': {x: 1010, y: 305},
                  'Kota Bima': {x: 1000, y: 275},
                };
                const pos = positions[district] || {x: 0, y: 0};
                const isSelected = selectedDistrictName === district;
                
                // Determine overall status for the dot
                const statuses = items.map(i => i.status);
                let overallStatus: 'Pending' | 'In Progress' | 'Resolved' = 'Resolved';
                if (statuses.includes('Pending')) overallStatus = 'Pending';
                else if (statuses.includes('In Progress')) overallStatus = 'In Progress';

                const totalCases = items.reduce((acc, curr) => acc + curr.cases, 0);
                
                return (
                  <g key={idx} onClick={() => setSelectedDistrictName(district)} className="cursor-pointer group">
                    {/* Main Dot */}
                    <circle 
                      cx={pos.x} cy={pos.y} 
                      r={isSelected ? 14 : 10}
                      className={`${getStatusColor(overallStatus)} stroke-white stroke-[3px] transition-all duration-300 group-hover:r-16 shadow-xl`}
                    />
                    
                    {/* Label */}
                    <g className={`${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-300`}>
                      <rect 
                        x={pos.x + 15} y={pos.y - 35} 
                        width={140} height={40} 
                        rx={8} 
                        className="fill-slate-900/90"
                      />
                      <text 
                        x={pos.x + 25} y={pos.y - 18} 
                        className="fill-white text-[12px] font-bold pointer-events-none"
                      >
                        {district}
                      </text>
                      <text 
                        x={pos.x + 25} y={pos.y - 4} 
                        className="fill-slate-300 text-[9px] font-medium pointer-events-none uppercase tracking-widest"
                      >
                        {totalCases} Kasus
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>
          <p className="mt-8 text-slate-400 text-[10px] font-medium uppercase tracking-[0.2em]">Klik titik wilayah untuk detail penanganan kasus</p>
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

      {/* Detail Panel */}
      {selectedDistrictName && selectedDistrictData && (
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-blue-100 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center space-x-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg bg-slate-800`}>
                <FileText size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Log Penanganan: {selectedDistrictName}</h3>
                <p className="text-sm text-slate-500">Menampilkan {selectedDistrictData.length} data penanganan konflik</p>
              </div>
            </div>
            <button 
              onClick={() => setSelectedDistrictName(null)}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X size={20} className="text-slate-400" />
            </button>
          </div>

          <div className="space-y-12">
            {selectedDistrictData.map((item, itemIdx) => (
              <div key={item.id || itemIdx} className="relative pl-8 border-l-2 border-slate-100 pb-12 last:pb-0">
                <div className={`absolute -left-[11px] top-0 w-5 h-5 rounded-full border-4 border-white shadow-sm ${getStatusColor(item.status)}`}></div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`px-3 py-1 rounded-lg text-[10px] font-bold text-white uppercase ${getStatusColor(item.status)}`}>
                          {item.status === 'Resolved' ? 'Selesai' : item.status === 'In Progress' ? 'Proses' : 'Menunggu'}
                        </div>
                        <span className="text-xs text-slate-400 font-medium">ID: {item.id || `NEW-${itemIdx}`}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Lokasi Kejadian</p>
                        <div className="flex items-center space-x-2">
                          <MapPin size={14} className="text-slate-400" />
                          <p className="text-sm font-bold text-slate-700">{item.locationDetail || '-'}</p>
                        </div>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Waktu Kejadian</p>
                        <div className="flex items-center space-x-2">
                          <Calendar size={14} className="text-slate-400" />
                          <p className="text-sm font-bold text-slate-700">{item.incidentTime || '-'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Tindakan Terakhir</p>
                      <div className="flex items-start space-x-3">
                        <History size={16} className="text-blue-500 mt-0.5" />
                        <p className="text-sm text-slate-700 leading-relaxed font-medium">
                          {item.lastAction}
                        </p>
                      </div>
                    </div>

                    {((item.mediaUrls && item.mediaUrls.length > 0) || item.imageUrl) && (
                      <div className="grid grid-cols-3 gap-2">
                        {item.imageUrl && (
                          <div className="rounded-xl overflow-hidden border border-slate-100 shadow-sm h-24">
                            <img src={item.imageUrl} alt="Handling" className="w-full h-full object-cover" />
                          </div>
                        )}
                        {item.mediaUrls?.map((url, idx) => (
                          <div key={idx} className="rounded-xl overflow-hidden border border-slate-100 shadow-sm h-24">
                            <img src={url} alt={`Doc ${idx}`} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-6">
                    <div className="bg-slate-900 p-6 rounded-2xl text-white relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-10">
                        <CheckCircle2 size={60} />
                      </div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-4">Ringkasan Kasus</p>
                      <div className="grid grid-cols-2 gap-4 relative z-10">
                        <div className="border-b border-slate-800 pb-2">
                          <span className="text-slate-400 text-[10px] block mb-1">Total Kasus</span>
                          <span className="text-xl font-black">{item.cases}</span>
                        </div>
                        <div className="border-b border-slate-800 pb-2">
                          <span className="text-slate-400 text-[10px] block mb-1">Massa Terlibat</span>
                          <span className="text-xl font-black">{item.participantsCount || 0}</span>
                        </div>
                      </div>
                    </div>

                    {item.details && item.details.length > 0 && (
                      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                        <div className="px-4 py-3 bg-slate-50 border-b border-slate-100">
                          <h4 className="text-[10px] font-bold text-slate-800 uppercase tracking-widest">Detail Penanganan</h4>
                        </div>
                        <div className="max-h-48 overflow-y-auto">
                          <table className="w-full text-left text-[11px]">
                            <thead className="sticky top-0 bg-slate-50 z-10">
                              <tr>
                                <th className="px-4 py-2 font-bold text-slate-400 uppercase">Lokasi</th>
                                <th className="px-4 py-2 font-bold text-slate-400 uppercase">Tindakan</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {item.details.map((detail, idx) => (
                                <tr key={idx} className="hover:bg-slate-50">
                                  <td className="px-4 py-2 font-bold text-slate-700">{detail.location}</td>
                                  <td className="px-4 py-2 text-blue-600 font-medium">{detail.action}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-slate-100 flex justify-end space-x-4">
            <button className="px-6 py-3 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
              Unduh Laporan Wilayah
            </button>
            <button className="px-6 py-3 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-lg transition-all">
              Tutup Detail
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
