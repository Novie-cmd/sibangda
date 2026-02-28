import React, { useState } from 'react';
import { ConflictData } from '../types';
import { X, Info, AlertTriangle, Upload, Image as ImageIcon } from 'lucide-react';

interface ConflictMapProps {
  data: ConflictData[];
  customMapImage?: string | null;
  onMapImageUpload?: (url: string) => void;
}

export const ConflictMap: React.FC<ConflictMapProps> = ({ data, customMapImage, onMapImageUpload }) => {
  const [selectedDistrict, setSelectedDistrict] = useState<ConflictData | null>(null);

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
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg cursor-pointer transition-all border border-slate-200 text-[10px] font-bold uppercase tracking-widest">
              <Upload size={14} />
              <span>Import Foto Peta</span>
              <input type="file" className="hidden" accept="image/*" onChange={handleMapUpload} />
            </label>
            <div className="flex space-x-4 text-xs">
              <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-red-500 mr-1"></span> Tinggi</div>
              <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-amber-500 mr-1"></span> Sedang</div>
              <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-emerald-500 mr-1"></span> Rendah</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
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
              {/* District Dots positioned relative to the wikimedia map coordinates */}
              {data.map((item, idx) => {
                // Coordinates calibrated for the Wikimedia NTB location map (1280x512 approx)
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
                const pos = positions[item.district] || {x: 0, y: 0};
                const isSelected = selectedDistrict?.district === item.district;
                
                return (
                  <g key={idx} onClick={() => setSelectedDistrict(item)} className="cursor-pointer group">
                    {/* Pulse Effect for High Level */}
                    {item.level === 'High' && (
                      <circle 
                        cx={pos.x} cy={pos.y} r={isSelected ? 25 : 15}
                        className="fill-red-500/30 animate-ping"
                      />
                    )}
                    
                    {/* Main Dot */}
                    <circle 
                      cx={pos.x} cy={pos.y} 
                      r={isSelected ? 14 : 10}
                      className={`${getLevelColor(item.level)} stroke-white stroke-[3px] transition-all duration-300 group-hover:r-16 shadow-xl`}
                    />
                    
                    {/* Label (Visible on hover or selection) */}
                    <g className={`${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-300`}>
                      <rect 
                        x={pos.x + 15} y={pos.y - 35} 
                        width={120} height={30} 
                        rx={8} 
                        className="fill-slate-900/90"
                      />
                      <text 
                        x={pos.x + 25} y={pos.y - 15} 
                        className="fill-white text-[12px] font-bold pointer-events-none"
                      >
                        {item.district}
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>
          
          <div className="mt-8 flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-red-500 shadow-lg shadow-red-200"></div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Potensi Tinggi</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-amber-500 shadow-lg shadow-amber-200"></div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Potensi Sedang</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-emerald-500 shadow-lg shadow-emerald-200"></div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Potensi Rendah</span>
            </div>
          </div>
          <p className="mt-4 text-slate-400 text-[10px] font-medium uppercase tracking-[0.2em]">Arahkan kursor atau klik titik wilayah untuk detail</p>
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

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Lokasi Terakhir</p>
              <p className="text-sm font-bold text-slate-800 truncate">{selectedDistrict.locationDetail || 'N/A'}</p>
              <p className="text-[10px] text-slate-400">{selectedDistrict.incidentTime || 'Waktu tidak tercatat'}</p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Massa Terlibat</p>
              <p className="text-xl font-bold text-slate-900">{selectedDistrict.participantsCount || 0} <span className="text-[10px] font-normal text-slate-400 uppercase ml-1">Orang</span></p>
            </div>
          </div>

          <div className="space-y-6">
            {((selectedDistrict.mediaUrls && selectedDistrict.mediaUrls.length > 0) || selectedDistrict.imageUrl) && (
              <div className="grid grid-cols-2 gap-3">
                {selectedDistrict.imageUrl && (
                  <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm h-64 col-span-2">
                    <img src={selectedDistrict.imageUrl} alt="Incident" className="w-full h-full object-cover" />
                  </div>
                )}
                {selectedDistrict.mediaUrls?.map((url, idx) => (
                  <div key={idx} className={`rounded-2xl overflow-hidden border border-slate-100 shadow-sm h-48 ${selectedDistrict.mediaUrls?.length === 1 ? 'col-span-2' : ''}`}>
                    <img src={url} alt={`Incident ${idx}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
            
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Analisis Situasi</p>
              <p className="text-slate-700 leading-relaxed">{selectedDistrict.description}</p>
            </div>

            {/* Detailed Incident List */}
            {selectedDistrict.details && selectedDistrict.details.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                <div className="px-6 py-4 bg-slate-50 border-b border-slate-100">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest">Daftar Detail Kejadian</h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50/50">
                        <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Lokasi</th>
                        <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Waktu</th>
                        <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Uraian Kejadian</th>
                        <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Keterangan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {selectedDistrict.details.map((detail, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 text-sm font-bold text-slate-700">{detail.location}</td>
                          <td className="px-6 py-4 text-sm text-slate-600">{detail.time}</td>
                          <td className="px-6 py-4 text-sm text-slate-600">{detail.description}</td>
                          <td className="px-6 py-4 text-sm text-slate-500 italic">{detail.remarks}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
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
