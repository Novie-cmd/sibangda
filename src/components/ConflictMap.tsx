import React, { useState } from 'react';
import { ConflictData } from '../types';
import { X, Info, AlertTriangle } from 'lucide-react';

interface ConflictMapProps {
  data: ConflictData[];
}

export const ConflictMap: React.FC<ConflictMapProps> = ({ data }) => {
  const [selectedDistrict, setSelectedDistrict] = useState<ConflictData | null>(null);

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
          <div className="flex space-x-4 text-xs">
            <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-red-500 mr-1"></span> Tinggi</div>
            <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-amber-500 mr-1"></span> Sedang</div>
            <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-emerald-500 mr-1"></span> Rendah</div>
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

        {/* Visual Map Placeholder - Interactive SVG */}
        <div className="mt-8 p-8 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-full max-w-4xl">
            <svg viewBox="0 0 1000 400" className="w-full h-auto drop-shadow-2xl">
              {/* Simplified NTB Map Shapes */}
              {/* Lombok Island */}
              <g transform="translate(50, 50)">
                <path 
                  d="M100,50 L250,30 L320,150 L280,300 L120,320 L50,200 Z" 
                  fill={selectedDistrict?.district.includes('Lombok') || selectedDistrict?.district === 'Mataram' ? '#10b981' : '#e2e8f0'} 
                  className="transition-all duration-500 cursor-pointer hover:fill-emerald-400"
                  stroke="#fff" strokeWidth="4"
                />
                <text x="180" y="180" className="text-xs font-bold fill-slate-600 pointer-events-none">LOMBOK</text>
              </g>
              {/* Sumbawa Island */}
              <g transform="translate(400, 50)">
                <path 
                  d="M50,100 L200,50 L350,80 L550,40 L580,150 L500,280 L300,320 L100,250 Z" 
                  fill={selectedDistrict?.district.includes('Sumbawa') || selectedDistrict?.district.includes('Bima') || selectedDistrict?.district === 'Dompu' ? '#10b981' : '#e2e8f0'} 
                  className="transition-all duration-500 cursor-pointer hover:fill-emerald-400"
                  stroke="#fff" strokeWidth="4"
                />
                <text x="300" y="180" className="text-xs font-bold fill-slate-600 pointer-events-none">SUMBAWA</text>
              </g>
              
              {/* District Dots */}
              {data.map((item, idx) => {
                // Approximate positions
                const positions: Record<string, {x: number, y: number}> = {
                  'Mataram': {x: 180, y: 180},
                  'Lombok Barat': {x: 160, y: 220},
                  'Lombok Tengah': {x: 220, y: 230},
                  'Lombok Timur': {x: 280, y: 200},
                  'Lombok Utara': {x: 220, y: 100},
                  'Sumbawa Barat': {x: 480, y: 200},
                  'Sumbawa': {x: 600, y: 180},
                  'Dompu': {x: 750, y: 200},
                  'Bima': {x: 880, y: 180},
                  'Kota Bima': {x: 900, y: 150},
                };
                const pos = positions[item.district] || {x: 0, y: 0};
                return (
                  <circle 
                    key={idx}
                    cx={pos.x} cy={pos.y} r={selectedDistrict?.district === item.district ? 12 : 8}
                    className={`${getLevelColor(item.level)} cursor-pointer transition-all duration-300 hover:r-14`}
                    onClick={() => setSelectedDistrict(item)}
                  >
                    <title>{item.district}: {item.incidents} Insiden</title>
                  </circle>
                );
              })}
            </svg>
          </div>
          <p className="mt-6 text-slate-400 text-xs font-medium uppercase tracking-widest">Klik wilayah atau titik untuk detail kejadian</p>
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
