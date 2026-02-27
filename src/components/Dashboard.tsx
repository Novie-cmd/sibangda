import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { ConflictData, OrmasData, ForeignerData } from '../types';
import { TrendingUp, Users, AlertTriangle, Calendar, Globe, Building2, Filter } from 'lucide-react';

interface DashboardProps {
  conflictData: ConflictData[];
  ormasData: OrmasData[];
  foreignerData: ForeignerData[];
}

export const Dashboard: React.FC<DashboardProps> = ({ conflictData, ormasData, foreignerData }) => {
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Semua Wilayah');

  const districts = ['Semua Wilayah', ...Array.from(new Set(conflictData.map(d => d.district)))];

  const filteredConflict = selectedDistrict === 'Semua Wilayah' 
    ? conflictData 
    : conflictData.filter(d => d.district === selectedDistrict);

  const filteredOrmas = selectedDistrict === 'Semua Wilayah' 
    ? ormasData 
    : ormasData.filter(d => d.district === selectedDistrict);

  const filteredForeigner = selectedDistrict === 'Semua Wilayah' 
    ? foreignerData 
    : foreignerData.filter(d => d.district === selectedDistrict);

  const totalForeigners = filteredForeigner.reduce((acc, curr) => acc + curr.count, 0);
  const totalInstitutions = filteredForeigner.reduce((acc, curr) => acc + curr.institutions, 0);

  const stats = [
    { label: 'Total Ormas', value: filteredOrmas.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Konflik Aktif', value: filteredConflict.filter(c => c.level === 'High').length, icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Orang Asing', value: totalForeigners, icon: Globe, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Lembaga Asing', value: totalInstitutions, icon: Building2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6'];

  const conflictChartData = React.useMemo(() => {
    if (selectedDistrict === 'Semua Wilayah') {
      return conflictData.map(d => ({ 
        name: d.district, 
        incidents: d.incidents,
        isDrillDown: false 
      }));
    } else {
      const districtData = conflictData.find(d => d.district === selectedDistrict);
      if (districtData && districtData.details && districtData.details.length > 0) {
        const grouped = districtData.details.reduce((acc: Record<string, number>, curr) => {
          acc[curr.location] = (acc[curr.location] || 0) + 1;
          return acc;
        }, {});
        return Object.entries(grouped).map(([name, incidents]) => ({ 
          name, 
          incidents,
          isDrillDown: true 
        }));
      }
      return [{ 
        name: selectedDistrict, 
        incidents: districtData?.incidents || 0,
        isDrillDown: true 
      }];
    }
  }, [selectedDistrict, conflictData]);

  const ormasByCategory = filteredOrmas.reduce((acc: any[], curr) => {
    const existing = acc.find(a => a.name === curr.category);
    if (existing) existing.value++;
    else acc.push({ name: curr.category, value: 1 });
    return acc;
  }, []);

  return (
    <div className="space-y-6">
      {/* Filter Section */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
            <Filter size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800">Filter Dashboard</h4>
            <p className="text-[10px] text-slate-500">Saring data berdasarkan Kabupaten/Kota</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <select 
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none transition-all min-w-[200px]"
          >
            {districts.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4">
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900">{stat.value.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-800">
              {selectedDistrict === 'Semua Wilayah' ? 'Insiden Konflik per Wilayah' : `Detail Insiden: ${selectedDistrict}`}
            </h3>
            {selectedDistrict !== 'Semua Wilayah' && (
              <button 
                onClick={() => setSelectedDistrict('Semua Wilayah')}
                className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest hover:underline"
              >
                Kembali ke Provinsi
              </button>
            )}
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={conflictChartData}
                onClick={(data) => {
                  if (data && data.activePayload && !data.activePayload[0].payload.isDrillDown) {
                    setSelectedDistrict(data.activePayload[0].payload.name);
                  }
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#f8fafc' }}
                />
                <Bar 
                  dataKey="incidents" 
                  fill={selectedDistrict === 'Semua Wilayah' ? '#10b981' : '#f59e0b'} 
                  radius={[4, 4, 0, 0]} 
                  barSize={30}
                  className="cursor-pointer"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-[10px] text-slate-400 text-center italic">
            {selectedDistrict === 'Semua Wilayah' ? 'Klik pada batang grafik untuk melihat detail per Kecamatan' : 'Menampilkan data berdasarkan lokasi kejadian (Kecamatan/Desa)'}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Kategori Ormas</h3>
          <div className="h-80 flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ormasByCategory}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {ormasByCategory.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="w-1/3 space-y-2">
              {ormasByCategory.map((entry: any, index: number) => (
                <div key={entry.name} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  <span className="text-xs text-slate-600 font-medium">{entry.name} ({entry.value})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Integrated Wasnas Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-semibold text-slate-800 mb-6">Pemantauan Orang Asing & Lembaga Asing per Wilayah</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={filteredForeigner}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="district" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11}} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: '20px' }} />
              <Bar name="Orang Asing" dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
              <Bar name="Lembaga Asing" dataKey="institutions" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
