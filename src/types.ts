export interface IncidentDetail {
  location: string;
  time: string;
  description: string;
  remarks: string;
}

export interface CaseDetail {
  location: string;
  time: string;
  description: string;
  action: string;
  remarks: string;
}

export interface ConflictData {
  id: string;
  district: string;
  level: 'Low' | 'Medium' | 'High';
  incidents: number;
  description: string;
  locationDetail?: string;
  incidentTime?: string;
  participantsCount?: number;
  details?: IncidentDetail[];
}

export interface ConflictHandlingData {
  id: string;
  district: string;
  status: 'Resolved' | 'In Progress' | 'Pending';
  cases: number;
  lastAction: string;
  locationDetail?: string;
  incidentTime?: string;
  participantsCount?: number;
  details?: CaseDetail[];
}

export interface ForeignerData {
  id: string;
  district: string;
  count: number;
  institutions: number;
  locationDetail?: string;
  activityDescription?: string;
}

export interface OrmasData {
  id: string;
  name: string;
  category: string;
  district: string;
  status: 'Active' | 'Inactive';
  memberCount: number;
  leaderName?: string;
  address?: string;
}

export interface DashboardStats {
  totalOrmas: number;
  activeConflicts: number;
  activitiesThisMonth: number;
  budgetUtilization: number;
}

export type View = 'dashboard' | 'map' | 'handling' | 'ormas' | 'input';
