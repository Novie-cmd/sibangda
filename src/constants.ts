import { ConflictData, OrmasData, ConflictHandlingData, ForeignerData } from './types';

export const INITIAL_CONFLICT_DATA: ConflictData[] = [
  { district: 'Mataram', level: 'Low', incidents: 2, description: 'Situasi kondusif' },
  { district: 'Lombok Barat', level: 'Low', incidents: 1, description: 'Stabil' },
  { district: 'Lombok Tengah', level: 'Medium', incidents: 5, description: 'Potensi sengketa lahan' },
  { district: 'Lombok Timur', level: 'Medium', incidents: 4, description: 'Gesekan antar pemuda' },
  { district: 'Lombok Utara', level: 'Low', incidents: 0, description: 'Aman' },
  { district: 'Sumbawa Barat', level: 'Low', incidents: 1, description: 'Terkendali' },
  { district: 'Sumbawa', level: 'Medium', incidents: 3, description: 'Isu lingkungan' },
  { district: 'Dompu', level: 'High', incidents: 8, description: 'Konflik batas wilayah' },
  { district: 'Bima', level: 'High', incidents: 12, description: 'Rawan konflik sosial' },
  { district: 'Kota Bima', level: 'Medium', incidents: 6, description: 'Aksi unjuk rasa' },
];

export const INITIAL_CONFLICT_HANDLING_DATA: ConflictHandlingData[] = [
  { district: 'Mataram', status: 'Resolved', cases: 2, lastAction: 'Mediasi selesai' },
  { district: 'Lombok Barat', status: 'Resolved', cases: 1, lastAction: 'Koordinasi aparat' },
  { district: 'Lombok Tengah', status: 'In Progress', cases: 5, lastAction: 'Tim terpadu turun' },
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
