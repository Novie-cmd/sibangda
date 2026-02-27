import { ConflictData, OrmasData, ConflictHandlingData, ForeignerData } from './types';

export const INITIAL_CONFLICT_DATA: ConflictData[] = [
  { 
    district: 'Mataram', 
    level: 'Low', 
    incidents: 2, 
    description: 'Situasi kondusif',
    details: [
      { location: 'Kec. Mataram', time: '12 Feb 2024', description: 'Gesekan kecil antar pedagang', remarks: 'Selesai dimediasi' },
      { location: 'Kec. Ampenan', time: '20 Feb 2024', description: 'Kericuhan parkir', remarks: 'Terkendali' }
    ]
  },
  { district: 'Lombok Barat', level: 'Low', incidents: 1, description: 'Stabil' },
  { 
    district: 'Lombok Tengah', 
    level: 'Medium', 
    incidents: 5, 
    description: 'Potensi sengketa lahan',
    details: [
      { location: 'Desa Kuta', time: '10 Feb 2024', description: 'Klaim lahan sirkuit', remarks: 'Proses negosiasi' },
      { location: 'Kec. Pujut', time: '15 Feb 2024', description: 'Protes warga lokal', remarks: 'Pendampingan aparat' }
    ]
  },
  { district: 'Lombok Timur', level: 'Medium', incidents: 4, description: 'Gesekan antar pemuda' },
  { district: 'Lombok Utara', level: 'Low', incidents: 0, description: 'Aman' },
  { district: 'Sumbawa Barat', level: 'Low', incidents: 1, description: 'Terkendali' },
  { district: 'Sumbawa', level: 'Medium', incidents: 3, description: 'Isu lingkungan' },
  { district: 'Dompu', level: 'High', incidents: 8, description: 'Konflik batas wilayah' },
  { district: 'Bima', level: 'High', incidents: 12, description: 'Rawan konflik sosial' },
  { district: 'Kota Bima', level: 'Medium', incidents: 6, description: 'Aksi unjuk rasa' },
];

export const INITIAL_CONFLICT_HANDLING_DATA: ConflictHandlingData[] = [
  { 
    district: 'Mataram', 
    status: 'Resolved', 
    cases: 2, 
    lastAction: 'Mediasi selesai',
    details: [
      { location: 'Pasar Mandalika', time: '14 Feb 2024', description: 'Sengketa lapak', action: 'Mediasi Polsek', remarks: 'Selesai' }
    ]
  },
  { district: 'Lombok Barat', status: 'Resolved', cases: 1, lastAction: 'Koordinasi aparat' },
  { 
    district: 'Lombok Tengah', 
    status: 'In Progress', 
    cases: 5, 
    lastAction: 'Tim terpadu turun',
    details: [
      { location: 'Kawasan Mandalika', time: '11 Feb 2024', description: 'Pemblokiran jalan', action: 'Dialog persuasif', remarks: 'Jalan dibuka' },
      { location: 'Desa Rembitan', time: '18 Feb 2024', description: 'Sengketa waris', action: 'Pendampingan hukum', remarks: 'Berjalan' }
    ]
  },
  { district: 'Lombok Timur', status: 'In Progress', cases: 4, lastAction: 'Dialog komunitas' },
  { district: 'Lombok Utara', status: 'Resolved', cases: 0, lastAction: 'Pemantauan rutin' },
  { district: 'Sumbawa Barat', status: 'Resolved', cases: 1, lastAction: 'Sosialisasi' },
  { district: 'Sumbawa', status: 'Pending', cases: 3, lastAction: 'Identifikasi awal' },
  { district: 'Dompu', status: 'In Progress', cases: 8, lastAction: 'Pengamanan lokasi' },
  { district: 'Bima', status: 'In Progress', cases: 12, lastAction: 'Operasi gabungan' },
  { district: 'Kota Bima', status: 'Resolved', cases: 6, lastAction: 'Kesepakatan damai' },
];

export const INITIAL_FOREIGNER_DATA: ForeignerData[] = [
  { district: 'Mataram', count: 120, institutions: 15 },
  { district: 'Lombok Barat', count: 450, institutions: 8 },
  { district: 'Lombok Tengah', count: 320, institutions: 12 },
  { district: 'Lombok Timur', count: 85, institutions: 4 },
  { district: 'Lombok Utara', count: 600, institutions: 25 },
  { district: 'Sumbawa Barat', count: 150, institutions: 2 },
  { district: 'Sumbawa', count: 40, institutions: 3 },
  { district: 'Dompu', count: 12, institutions: 1 },
  { district: 'Bima', count: 8, institutions: 1 },
  { district: 'Kota Bima', count: 25, institutions: 2 },
];

export const INITIAL_ORMAS_DATA: OrmasData[] = [
  { id: '1', name: 'Paguyuban NTB Bersatu', category: 'Sosial', district: 'Mataram', status: 'Active', memberCount: 150 },
  { id: '2', name: 'LSM Suara Rakyat', category: 'Politik', district: 'Lombok Timur', status: 'Active', memberCount: 80 },
  { id: '3', name: 'Yayasan Pendidikan Islam', category: 'Keagamaan', district: 'Lombok Tengah', status: 'Active', memberCount: 300 },
  { id: '4', name: 'Forum Pemuda Kreatif', category: 'Kepemudaan', district: 'Sumbawa', status: 'Active', memberCount: 45 },
  { id: '5', name: 'Himpunan Nelayan', category: 'Ekonomi', district: 'Bima', status: 'Inactive', memberCount: 120 },
];
