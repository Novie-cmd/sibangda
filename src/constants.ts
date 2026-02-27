import { ConflictData, OrmasData, ConflictHandlingData, ForeignerData } from './types';

export const INITIAL_CONFLICT_DATA: ConflictData[] = [
  { 
    id: 'c1',
    district: 'Mataram', 
    level: 'Low', 
    incidents: 2, 
    description: 'Situasi kondusif',
    details: [
      { location: 'Kec. Mataram', time: '12 Feb 2024', description: 'Gesekan kecil antar pedagang', remarks: 'Selesai dimediasi' },
      { location: 'Kec. Ampenan', time: '20 Feb 2024', description: 'Kericuhan parkir', remarks: 'Terkendali' }
    ]
  },
  { id: 'c2', district: 'Lombok Barat', level: 'Low', incidents: 1, description: 'Stabil' },
  { 
    id: 'c3',
    district: 'Lombok Tengah', 
    level: 'Medium', 
    incidents: 5, 
    description: 'Potensi sengketa lahan',
    details: [
      { location: 'Desa Kuta', time: '10 Feb 2024', description: 'Klaim lahan sirkuit', remarks: 'Proses negosiasi' },
      { location: 'Kec. Pujut', time: '15 Feb 2024', description: 'Protes warga lokal', remarks: 'Pendampingan aparat' }
    ]
  },
  { id: 'c4', district: 'Lombok Timur', level: 'Medium', incidents: 4, description: 'Gesekan antar pemuda' },
  { id: 'c5', district: 'Lombok Utara', level: 'Low', incidents: 0, description: 'Aman' },
  { id: 'c6', district: 'Sumbawa Barat', level: 'Low', incidents: 1, description: 'Terkendali' },
  { id: 'c7', district: 'Sumbawa', level: 'Medium', incidents: 3, description: 'Isu lingkungan' },
  { id: 'c8', district: 'Dompu', level: 'High', incidents: 8, description: 'Konflik batas wilayah' },
  { id: 'c9', district: 'Bima', level: 'High', incidents: 12, description: 'Rawan konflik sosial' },
  { id: 'c10', district: 'Kota Bima', level: 'Medium', incidents: 6, description: 'Aksi unjuk rasa' },
];

export const INITIAL_CONFLICT_HANDLING_DATA: ConflictHandlingData[] = [
  { 
    id: 'h1',
    district: 'Mataram', 
    status: 'Resolved', 
    cases: 2, 
    lastAction: 'Mediasi selesai',
    details: [
      { location: 'Pasar Mandalika', time: '14 Feb 2024', description: 'Sengketa lapak', action: 'Mediasi Polsek', remarks: 'Selesai' }
    ]
  },
  { id: 'h2', district: 'Lombok Barat', status: 'Resolved', cases: 1, lastAction: 'Koordinasi aparat' },
  { 
    id: 'h3',
    district: 'Lombok Tengah', 
    status: 'In Progress', 
    cases: 5, 
    lastAction: 'Tim terpadu turun',
    details: [
      { location: 'Kawasan Mandalika', time: '11 Feb 2024', description: 'Pemblokiran jalan', action: 'Dialog persuasif', remarks: 'Jalan dibuka' },
      { location: 'Desa Rembitan', time: '18 Feb 2024', description: 'Sengketa waris', action: 'Pendampingan hukum', remarks: 'Berjalan' }
    ]
  },
  { id: 'h4', district: 'Lombok Timur', status: 'In Progress', cases: 4, lastAction: 'Dialog komunitas' },
  { id: 'h5', district: 'Lombok Utara', status: 'Resolved', cases: 0, lastAction: 'Pemantauan rutin' },
  { id: 'h6', district: 'Sumbawa Barat', status: 'Resolved', cases: 1, lastAction: 'Sosialisasi' },
  { id: 'h7', district: 'Sumbawa', status: 'Pending', cases: 3, lastAction: 'Identifikasi awal' },
  { id: 'h8', district: 'Dompu', status: 'In Progress', cases: 8, lastAction: 'Pengamanan lokasi' },
  { id: 'h9', district: 'Bima', status: 'In Progress', cases: 12, lastAction: 'Operasi gabungan' },
  { id: 'h10', district: 'Kota Bima', status: 'Resolved', cases: 6, lastAction: 'Kesepakatan damai' },
];

export const INITIAL_FOREIGNER_DATA: ForeignerData[] = [
  { id: 'f1', district: 'Mataram', count: 120, institutions: 15 },
  { id: 'f2', district: 'Lombok Barat', count: 450, institutions: 8 },
  { id: 'f3', district: 'Lombok Tengah', count: 320, institutions: 12 },
  { id: 'f4', district: 'Lombok Timur', count: 85, institutions: 4 },
  { id: 'f5', district: 'Lombok Utara', count: 600, institutions: 25 },
  { id: 'f6', district: 'Sumbawa Barat', count: 150, institutions: 2 },
  { id: 'f7', district: 'Sumbawa', count: 40, institutions: 3 },
  { id: 'f8', district: 'Dompu', count: 12, institutions: 1 },
  { id: 'f9', district: 'Bima', count: 8, institutions: 1 },
  { id: 'f10', district: 'Kota Bima', count: 25, institutions: 2 },
];

export const INITIAL_ORMAS_DATA: OrmasData[] = [
  { id: '1', name: 'Paguyuban NTB Bersatu', category: 'Sosial', district: 'Mataram', status: 'Active', memberCount: 150 },
  { id: '2', name: 'LSM Suara Rakyat', category: 'Politik', district: 'Lombok Timur', status: 'Active', memberCount: 80 },
  { id: '3', name: 'Yayasan Pendidikan Islam', category: 'Keagamaan', district: 'Lombok Tengah', status: 'Active', memberCount: 300 },
  { id: '4', name: 'Forum Pemuda Kreatif', category: 'Kepemudaan', district: 'Sumbawa', status: 'Active', memberCount: 45 },
  { id: '5', name: 'Himpunan Nelayan', category: 'Ekonomi', district: 'Bima', status: 'Inactive', memberCount: 120 },
];
