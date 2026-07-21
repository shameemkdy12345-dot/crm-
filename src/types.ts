export type LeadStatus = 'New' | 'Contacted' | 'Demo Scheduled' | 'Follow-up' | 'Enrolled' | 'Lost';
export type LeadPriority = 'Low' | 'Medium' | 'High';
export type LeadSource = 'Instagram' | 'Facebook Ad' | 'School Campaign' | 'Direct Referral' | 'Website Inquiry' | 'Google Search';
export type BudgetPreference = 'Low' | 'Medium' | 'High' | 'Needs EMI';
export type AcademicBackground = 'Excellent' | 'Average' | 'Needs Support';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  whatsapp: string;
  parentName: string;
  parentPhone?: string;
  parentOccupation?: string;
  isGulfParent?: boolean; // Extremely relevant for Kerala (high concentration of Gulf NRIs)
  board?: 'SCERT (State)' | 'CBSE' | 'ICSE'; // Main curriculum boards in Kerala
  email: string;
  district: KeralaDistrict;
  course: string;
  status: LeadStatus;
  priority: LeadPriority;
  leadSource: LeadSource;
  schoolCollege: string;
  notes: string;
  assignedCounselor: string;
  score: number; // Lead qualification score (0-100)
  scoreReason?: string; // AI generated reason
  createdAt: string;
  updatedAt: string;
  followUpDate?: string;
  budgetPreference: BudgetPreference;
  academicBackground: AcademicBackground;
}

export type KeralaDistrict =
  | 'Alappuzha'
  | 'Ernakulam'
  | 'Idukki'
  | 'Kannur'
  | 'Kasaragod'
  | 'Kollam'
  | 'Kottayam'
  | 'Kozhikode'
  | 'Malappuram'
  | 'Palakkad'
  | 'Pathanamthitta'
  | 'Thiruvananthapuram'
  | 'Thrissur'
  | 'Wayanad';

export const KERALA_DISTRICTS: KeralaDistrict[] = [
  'Alappuzha',
  'Ernakulam',
  'Idukki',
  'Kannur',
  'Kasaragod',
  'Kollam',
  'Kottayam',
  'Kozhikode',
  'Malappuram',
  'Palakkad',
  'Pathanamthitta',
  'Thiruvananthapuram',
  'Thrissur',
  'Wayanad'
];

export interface CallLog {
  id: string;
  leadId: string;
  counselorName: string;
  date: string;
  outcome: string;
  notes: string;
}

export interface Task {
  id: string;
  leadId: string;
  leadName: string;
  title: string;
  dueDate: string;
  status: 'Pending' | 'Completed';
  priority: LeadPriority;
}

export interface Batch {
  id: string;
  name: string;
  course: string;
  startDate: string;
  capacity: number;
  filled: number;
  fee: number;
  counselor: string;
}

export interface AIScriptResult {
  score: number;
  scoreReason: string;
  counselingScript: string; // The English/Malayalam counseling roadmap
  whatsappTemplate: string; // Dynamic WhatsApp template with copy button
  suggestedAction: string;
}
