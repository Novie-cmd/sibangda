export interface ConflictData {
  district: string;
  level: 'Low' | 'Medium' | 'High';
  incidents: number;
  description: string;
}

export interface ConflictHandlingData {
  district: string;
  status: 'Resolved' | 'In Progress' | 'Pending';
  cases: number;
  lastAction: string;
}

export interface ForeignerData {
  district: string;
  count: number;
  institutions: number;
}

export interface OrmasData {
  id: string;
  name: string;
  category: string;
  district: string;
  status: 'Active' | 'Inactive';
  memberCount: number;
}

export interface DashboardStats {
  totalOrmas: number;
  activeConflicts: number;
  activitiesThisMonth: number;
  budgetUtilization: number;
}

export type View = 'dashboard' | 'map' | 'handling' | 'ormas' | 'input';
