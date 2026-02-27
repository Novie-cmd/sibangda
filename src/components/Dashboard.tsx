import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { ConflictData, OrmasData, ForeignerData } from '../types';
import { TrendingUp, Users, AlertTriangle, Calendar, Globe, Building2 } from 'lucide-react';

interface DashboardProps {
  conflictData: ConflictData[];
  ormasData: OrmasData[];
  foreignerData: ForeignerData[];
}

export const Dashboard: React.FC<DashboardProps> = ({ conflictData, ormasData, foreignerData }) => {
  const totalForeigners = foreignerData.reduce((acc, curr) => acc + curr.count, 0);
  const totalInstitutions = foreignerData.reduce((acc, curr) => acc + curr.institutions, 0);

  const stats = [
    { label: 'Total Ormas', value: ormasData.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Konflik Aktif', value: conflictData.filter(c => c.level === 'High').length, icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Orang Asing', value: totalForeigners, icon: Globe, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Lembaga Asing', value: totalInstitutions, icon: Building2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6'];

  const ormasByCategory = ormasData.reduce((acc: any[], curr) => {
    const existing = acc.find(a => a.name === curr.category);
    if (existing) existing.value++;
    else acc.push({ name: curr.category, value: 1 });
    return acc;
  }, []);

  return (
    <div className="space-y-6">
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
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Insiden Konflik per Wilayah</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={conflictData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="district" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#f8fafc' }}
                />
                <Bar dataKey="incidents" fill="#10b981" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
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
            <BarChart data={foreignerData}>
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
