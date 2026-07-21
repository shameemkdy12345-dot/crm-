import React, { useState, useEffect } from 'react';
import {
  Users,
  Calendar as CalendarIcon,
  TrendingUp,
  Layers,
  Plus,
  Phone,
  MessageSquare,
  MapPin,
  Search,
  Filter,
  Sparkles,
  Check,
  X,
  ChevronRight,
  Clock,
  ArrowLeft,
  Copy,
  ExternalLink,
  CheckCircle2,
  Trash2,
  Globe,
  Award,
  DollarSign,
  Smartphone,
  Monitor,
  CalendarDays,
  UserCheck,
  Send,
  AlertTriangle,
  RotateCcw,
  BookOpen
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Lead, LeadStatus, LeadPriority, LeadSource, KeralaDistrict, KERALA_DISTRICTS, Task, Batch, AIScriptResult, BudgetPreference, AcademicBackground } from './types';

// Initial Mock Data for Kerala Learning CRM
const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-1',
    name: 'Fathima Zahra',
    phone: '+91 94471 23456',
    whatsapp: '919447123456',
    parentName: 'Abdul Rahman',
    parentOccupation: 'Business (Retail Outlet, Dubai)',
    isGulfParent: true,
    board: 'CBSE',
    email: 'fathima.zahra@gmail.com',
    district: 'Malappuram',
    course: 'NEET Foundation Pro',
    status: 'Follow-up',
    priority: 'High',
    leadSource: 'Instagram',
    schoolCollege: 'M.S.P. Higher Secondary School, Malappuram',
    notes: 'Father is in Dubai. Wants classes after 6:30 PM (IST) so father can also join weekly reviews on Zoom. Student is very bright in Science.',
    assignedCounselor: 'Anjali Nair',
    score: 92,
    scoreReason: 'High score due to active parent interest, CBSE curriculum background, and strong financial paying capacity (Gulf NRI). Extremely positive feedback on initial session.',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    followUpDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    budgetPreference: 'High',
    academicBackground: 'Excellent'
  },
  {
    id: 'lead-2',
    name: 'Amal Dev P. R.',
    phone: '+91 98462 87654',
    whatsapp: '919846287654',
    parentName: 'Radhakrishnan P. R.',
    parentOccupation: 'Government Servant (KSEB Assistant)',
    isGulfParent: false,
    board: 'SCERT (State)',
    email: 'amaldev.pr@yahoo.com',
    district: 'Kozhikode',
    course: 'Class 10 State Board Exam Crash',
    status: 'New',
    priority: 'Medium',
    leadSource: 'School Campaign',
    schoolCollege: 'Silver Hills Public School, Kozhikode',
    notes: 'Inquired during our school visit. Mother is highly concerned about Maths board exam marks. Needs support with past state board question papers.',
    assignedCounselor: 'Anjali Nair',
    score: 75,
    scoreReason: 'Good school feedback, state-board curriculum. Decent local stability. Urgent need due to approaching board exams, but price sensitive.',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    followUpDate: new Date().toISOString().split('T')[0],
    budgetPreference: 'Medium',
    academicBackground: 'Average'
  },
  {
    id: 'lead-3',
    name: 'Gautham Krishna',
    phone: '+91 85920 11223',
    whatsapp: '918592011223',
    parentName: 'Dr. Suresh Krishna',
    parentOccupation: 'Pediatrician (Aster Medcity)',
    isGulfParent: false,
    board: 'CBSE',
    email: 'sureshkrish@gmail.com',
    district: 'Ernakulam',
    course: 'KEAM & JEE Ultimate Coach',
    status: 'Demo Scheduled',
    priority: 'High',
    leadSource: 'Google Search',
    schoolCollege: 'Bhavans Adarsha Vidyalaya, Kakkanad',
    notes: 'Demo schedule booked for computer screen testing. Parents are doctors, want elite performance coaching and top percentile preparation material.',
    assignedCounselor: 'Siddharth Menon',
    score: 95,
    scoreReason: 'Elite lead. Highly educated parents with strong paying capability. Target is high-tier KEAM coaching. Clear commitment to quality over price.',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    followUpDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    budgetPreference: 'High',
    academicBackground: 'Excellent'
  },
  {
    id: 'lead-4',
    name: 'Ananya Ramesh',
    phone: '+91 70123 98765',
    whatsapp: '917012398765',
    parentName: 'Ramesh Kumar',
    parentOccupation: 'Teacher (Government High School)',
    isGulfParent: false,
    board: 'SCERT (State)',
    email: 'ananya.ramesh@gmail.com',
    district: 'Thiruvananthapuram',
    course: 'Class 12 state-board science prep',
    status: 'Enrolled',
    priority: 'Low',
    leadSource: 'Direct Referral',
    schoolCollege: 'Cotton Hill Girls Higher Secondary School',
    notes: 'Referred by active current student. Enrolled with annual plan + offline notes bundle. First EMI received.',
    assignedCounselor: 'Siddharth Menon',
    score: 100,
    scoreReason: 'Fully enrolled. Referrer influence was high. Successfully completed first registration transaction.',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    budgetPreference: 'Medium',
    academicBackground: 'Excellent'
  },
  {
    id: 'lead-5',
    name: 'Roshan George',
    phone: '+91 97444 55566',
    whatsapp: '919744455566',
    parentName: 'George Joseph',
    parentOccupation: 'Structural Engineer (Sharjah)',
    isGulfParent: true,
    board: 'ICSE',
    email: 'georgeroshan@hotmail.com',
    district: 'Thrissur',
    course: 'JEE Main Foundation + Python AI',
    status: 'Contacted',
    priority: 'Medium',
    leadSource: 'Facebook Ad',
    schoolCollege: 'St. Thomas College Higher Secondary, Thrissur',
    notes: 'Father is in Sharjah, UAE. Student wants to combine coding classes with standard school curriculum. Highly technical interest.',
    assignedCounselor: 'Anjali Nair',
    score: 82,
    scoreReason: 'Strong technical inclination, Gulf-based parent with budget. ICSE board represents good learning habits. Main obstacle is student study time management.',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    followUpDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    budgetPreference: 'High',
    academicBackground: 'Excellent'
  },
  {
    id: 'lead-6',
    name: 'Meenakshi Vinod',
    phone: '+91 90721 34567',
    whatsapp: '919072134567',
    parentName: 'Vinod Nair',
    parentOccupation: 'Agriculture / Rubber Plantation Owner',
    isGulfParent: false,
    board: 'SCERT (State)',
    email: 'meenavinod@gmail.com',
    district: 'Kottayam',
    course: 'SCERT Class 11 Maths & Physics',
    status: 'Lost',
    priority: 'Low',
    leadSource: 'Instagram',
    schoolCollege: 'M.D. Seminary Higher Secondary School, Kottayam',
    notes: 'Too far for physical hybrid centers, and family has heavy internet connectivity issues at their rubber estate site. Prefers offline tuition.',
    assignedCounselor: 'Siddharth Menon',
    score: 30,
    scoreReason: 'Lost lead due to severe infrastructure constraints (internet coverage) and strong preference for local, physical home tution.',
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    budgetPreference: 'Low',
    academicBackground: 'Average'
  }
];

const INITIAL_TASKS: Task[] = [
  {
    id: 'task-1',
    leadId: 'lead-1',
    leadName: 'Fathima Zahra',
    title: 'Call Father (Dubai Number) at 7:30 PM IST',
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'Pending',
    priority: 'High'
  },
  {
    id: 'task-2',
    leadId: 'lead-2',
    leadName: 'Amal Dev P. R.',
    title: 'Share Board Exam Previous Math Paper PDF',
    dueDate: new Date().toISOString().split('T')[0],
    status: 'Pending',
    priority: 'Medium'
  },
  {
    id: 'task-3',
    leadId: 'lead-3',
    leadName: 'Gautham Krishna',
    title: 'Setup Zoom Class demo with Math Expert Teacher',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'Pending',
    priority: 'High'
  }
];

const INITIAL_BATCHES: Batch[] = [
  {
    id: 'batch-1',
    name: 'NEET Alpha (Super 40)',
    course: 'NEET Foundation Pro',
    startDate: '2026-08-01',
    capacity: 40,
    filled: 34,
    fee: 28000,
    counselor: 'Anjali Nair'
  },
  {
    id: 'batch-2',
    name: 'KEAM Crash Squad (Batch E)',
    course: 'KEAM & JEE Ultimate Coach',
    startDate: '2026-08-10',
    capacity: 50,
    filled: 41,
    fee: 18000,
    counselor: 'Siddharth Menon'
  },
  {
    id: 'batch-3',
    name: 'State SCERT Board Toppers',
    course: 'Class 12 state-board science prep',
    startDate: '2026-08-15',
    capacity: 35,
    filled: 12,
    fee: 12500,
    counselor: 'Siddharth Menon'
  }
];

const KERALA_COURSES = [
  'NEET Foundation Pro',
  'KEAM & JEE Ultimate Coach',
  'Class 10 State Board Exam Crash',
  'Class 12 state-board science prep',
  'JEE Main Foundation + Python AI',
  'SCERT Class 11 Maths & Physics'
];

export default function App() {
  // App Setup
  const [displayMode, setDisplayMode] = useState<'android' | 'responsive'>('android');
  const [activeTab, setActiveTab] = useState<'leads' | 'tasks' | 'batches' | 'analytics'>('leads');

  // Leads state
  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = localStorage.getItem('kerala_crm_leads');
    return saved ? JSON.parse(saved) : INITIAL_LEADS;
  });

  // Tasks state
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('kerala_crm_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  // Batches state
  const [batches, setBatches] = useState<Batch[]>(() => {
    const saved = localStorage.getItem('kerala_crm_batches');
    return saved ? JSON.parse(saved) : INITIAL_BATCHES;
  });

  // Selected details
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  
  // Edit & Add Modal State
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingLead, setEditingLead] = useState<Partial<Lead> | null>(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [districtFilter, setDistrictFilter] = useState<string>('All');
  const [boardFilter, setBoardFilter] = useState<string>('All');
  const [gulfFilter, setGulfFilter] = useState<string>('All');

  // AI Script Generation states
  const [aiAnalyzing, setAiAnalyzing] = useState<boolean>(false);
  const [aiResult, setAiResult] = useState<AIScriptResult | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('kerala_crm_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('kerala_crm_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('kerala_crm_batches', JSON.stringify(batches));
  }, [batches]);

  // Handle adding/saving lead
  const handleSaveLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLead?.name || !editingLead?.phone || !editingLead?.parentName) {
      alert('Please fill out all required fields: Student Name, Phone, and Parent Name.');
      return;
    }

    const defaultValues: Partial<Lead> = {
      district: 'Malappuram',
      course: 'NEET Foundation Pro',
      status: 'New',
      priority: 'Medium',
      leadSource: 'Instagram',
      schoolCollege: 'Government School, Kerala',
      board: 'CBSE',
      isGulfParent: false,
      notes: '',
      email: '',
      assignedCounselor: 'Anjali Nair',
      score: 50,
      scoreReason: 'Newly created lead. Pending deep AI analysis and first phone contact.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      budgetPreference: 'Medium',
      academicBackground: 'Average',
      whatsapp: editingLead.phone.replace(/[^0-9]/g, '')
    };

    if (editingLead.id) {
      // Edit
      const updated = leads.map(l => {
        if (l.id === editingLead.id) {
          const uLead = { ...l, ...editingLead, updatedAt: new Date().toISOString() } as Lead;
          // Sync with currently selected details sheet
          if (selectedLead?.id === l.id) {
            setSelectedLead(uLead);
          }
          return uLead;
        }
        return l;
      });
      setLeads(updated);
    } else {
      // Add
      const newLead: Lead = {
        ...defaultValues,
        ...editingLead,
        id: `lead-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Lead;
      setLeads([newLead, ...leads]);

      // Add default follow up task
      if (newLead.followUpDate) {
        const newTask: Task = {
          id: `task-${Date.now()}`,
          leadId: newLead.id,
          leadName: newLead.name,
          title: `First follow-up session: ${newLead.name}`,
          dueDate: newLead.followUpDate,
          status: 'Pending',
          priority: newLead.priority
        };
        setTasks([newTask, ...tasks]);
      }
    }

    setIsEditing(false);
    setEditingLead(null);
  };

  // Delete lead
  const handleDeleteLead = (id: string) => {
    if (confirm('Are you sure you want to delete this lead?')) {
      setLeads(leads.filter(l => l.id !== id));
      setTasks(tasks.filter(t => t.leadId !== id));
      setSelectedLead(null);
    }
  };

  // Toggle Task Completion
  const toggleTaskStatus = (taskId: string) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: t.status === 'Completed' ? 'Pending' : 'Completed' } : t));
  };

  // Quick Action: Update Status from detailed sheet
  const handleQuickStatusChange = (leadId: string, newStatus: LeadStatus) => {
    const updated = leads.map(l => {
      if (l.id === leadId) {
        const updatedLead = { ...l, status: newStatus, updatedAt: new Date().toISOString() };
        setSelectedLead(updatedLead);
        return updatedLead;
      }
      return l;
    });
    setLeads(updated);
  };

  // Reset Lead Data back to initial mock for testing
  const handleResetData = () => {
    if (confirm('Are you sure you want to reset the CRM database back to initial Malayalam context leads?')) {
      setLeads(INITIAL_LEADS);
      setTasks(INITIAL_TASKS);
      setBatches(INITIAL_BATCHES);
      setSelectedLead(null);
      setAiResult(null);
      setAiError(null);
    }
  };

  // Call API to analyze lead using Gemini
  const handleAnalyzeWithAI = async (lead: Lead) => {
    setAiAnalyzing(true);
    setAiResult(null);
    setAiError(null);

    try {
      const response = await fetch('/api/analyze-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ lead })
      });

      if (!response.ok) {
        throw new Error('Failed to reach AI analysis server.');
      }

      const result = await response.json();
      setAiResult(result);

      // Save the generated score & reason back into the lead's state
      setLeads(prevLeads => prevLeads.map(l => {
        if (l.id === lead.id) {
          const updatedLead = {
            ...l,
            score: result.score,
            scoreReason: result.scoreReason,
            notes: l.notes + `\n\n[AI Update ${new Date().toLocaleDateString()}]: ${result.suggestedAction}`
          };
          // Sync with the active selected view
          setSelectedLead(updatedLead);
          return updatedLead;
        }
        return l;
      }));

    } catch (err: any) {
      console.error(err);
      setAiError(err.message || 'Error executing intelligence pipeline.');
    } finally {
      setAiAnalyzing(false);
    }
  };

  // Filter logic
  const filteredLeads = leads.filter(l => {
    const matchesSearch =
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.phone.includes(searchQuery) ||
      l.parentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.schoolCollege.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || l.status === statusFilter;
    const matchesDistrict = districtFilter === 'All' || l.district === districtFilter;
    const matchesBoard = boardFilter === 'All' || l.board === boardFilter;
    
    let matchesGulf = true;
    if (gulfFilter === 'Yes') matchesGulf = l.isGulfParent === true;
    if (gulfFilter === 'No') matchesGulf = l.isGulfParent !== true;

    return matchesSearch && matchesStatus && matchesDistrict && matchesBoard && matchesGulf;
  });

  // Math Metrics calculations for local Analytics Tab
  const leadSourceData = () => {
    const counts: { [key: string]: number } = {};
    leads.forEach(l => {
      counts[l.leadSource] = (counts[l.leadSource] || 0) + 1;
    });
    return Object.keys(counts).map(key => ({ name: key, value: counts[key] }));
  };

  const districtData = () => {
    const counts: { [key: string]: number } = {};
    leads.forEach(l => {
      counts[l.district] = (counts[l.district] || 0) + 1;
    });
    return Object.keys(counts).map(key => ({ name: key, count: counts[key] })).sort((a,b) => b.count - a.count);
  };

  const statusPieData = () => {
    const counts: { [key: string]: number } = {};
    leads.forEach(l => {
      counts[l.status] = (counts[l.status] || 0) + 1;
    });
    return Object.keys(counts).map(key => ({ name: key, value: counts[key] }));
  };

  const totalLeadsCount = leads.length;
  const enrolledCount = leads.filter(l => l.status === 'Enrolled').length;
  const conversionRate = totalLeadsCount > 0 ? Math.round((enrolledCount / totalLeadsCount) * 100) : 0;
  const highPriorityCount = leads.filter(l => l.priority === 'High' && l.status !== 'Enrolled' && l.status !== 'Lost').length;
  const gulfParentCount = leads.filter(l => l.isGulfParent).length;

  const STATUS_COLORS: { [key in LeadStatus]: string } = {
    'New': '#3b82f6', // blue
    'Contacted': '#a855f7', // purple
    'Demo Scheduled': '#f59e0b', // orange
    'Follow-up': '#eab308', // yellow
    'Enrolled': '#22c55e', // green
    'Lost': '#ef4444' // red
  };

  const PIE_COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#a855f7', '#06b6d4'];

  // Clock widget for Kerala Local Time (IST is GMT+5.30)
  const [keralaTime, setKeralaTime] = useState('');
  useEffect(() => {
    const updateTime = () => {
      // Calculate IST from server / client time
      const date = new Date();
      const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
      const istOffset = 5.5; // IST is UTC+5:30
      const istDate = new Date(utc + (3600000 * istOffset));
      
      const timeStr = istDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      setKeralaTime(timeStr);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col items-center justify-start p-2 sm:p-6 select-none">
      
      {/* Top Banner with Settings Toggles */}
      <header className="w-full max-w-6xl mb-6 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-800 p-4 rounded-2xl border border-slate-700 shadow-xl" id="header_controls">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-600 text-white rounded-xl shadow-md shadow-indigo-600/30">
            <Award className="w-6 h-6" id="app_logo_icon" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-display tracking-tight text-white flex items-center gap-2">
              Kerala Learn CRM <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/30 font-mono font-normal">v2.1</span>
            </h1>
            <p className="text-xs text-slate-400">Educational Sales Counselors App (Kerala Regional)</p>
          </div>
        </div>

        {/* Real-time Kerala clock & Global Database controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* IST Clock Widget */}
          <div className="bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-700/50 flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400 animate-pulse" />
            <div className="text-right">
              <span className="text-xs text-slate-400 block leading-none font-mono">Kochi Time (IST)</span>
              <span className="text-sm font-semibold text-emerald-300 font-mono">{keralaTime || "05:30 PM"}</span>
            </div>
          </div>

          {/* Reset Mock DB button */}
          <button 
            onClick={handleResetData}
            title="Reset Local Database"
            className="p-2 bg-slate-700/50 hover:bg-rose-500/15 text-slate-300 hover:text-rose-300 rounded-xl border border-slate-600/50 hover:border-rose-500/20 transition-all text-xs flex items-center gap-1.5 cursor-pointer"
            id="reset_database_btn"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset DB</span>
          </button>

          {/* UI Mode Selector */}
          <div className="bg-slate-950 p-1 rounded-xl border border-slate-700 flex gap-1">
            <button
              onClick={() => setDisplayMode('android')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${displayMode === 'android' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
              id="android_mode_toggle"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Android App</span>
            </button>
            <button
              onClick={() => setDisplayMode('responsive')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${displayMode === 'responsive' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
              id="fullscreen_mode_toggle"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Wide Web View</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main CRM Platform content */}
      <div className={`w-full transition-all duration-300 ${displayMode === 'android' ? 'max-w-md' : 'max-w-6xl'}`} id="app_frame_container">
        
        {/* ANDROID DEVICE WRAPPER */}
        {displayMode === 'android' ? (
          <div className="relative bg-slate-950 p-4 rounded-[42px] border-[10px] border-slate-800 shadow-2xl ring-1 ring-slate-700/50" id="android_phone_shell">
            {/* Speaker & Sensor Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-5 w-36 bg-slate-800 rounded-b-2xl z-40 flex items-center justify-center gap-1.5">
              <div className="w-12 h-1 bg-slate-900 rounded-full"></div>
              <div className="w-2.5 h-2.5 bg-slate-900 rounded-full"></div>
            </div>

            {/* Android Screen Area */}
            <div className="bg-slate-900 rounded-[30px] overflow-hidden border border-slate-800 relative min-h-[700px] flex flex-col z-10" id="android_inner_screen">
              
              {/* Android Top Status Bar */}
              <div className="h-9 bg-slate-950 px-5 flex justify-between items-center text-[11px] font-medium tracking-tight text-slate-300 select-none z-30 pt-1">
                <span className="font-semibold font-mono">9:41</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-slate-400 font-mono">5G</span>
                  {/* Signal bars */}
                  <div className="flex items-end gap-0.5 h-2.5">
                    <div className="w-0.5 h-1 bg-slate-300 rounded-full"></div>
                    <div className="w-0.5 h-1.5 bg-slate-300 rounded-full"></div>
                    <div className="w-0.5 h-2 bg-slate-300 rounded-full"></div>
                    <div className="w-0.5 h-2.5 bg-indigo-400 rounded-full"></div>
                  </div>
                  {/* Wi-Fi Icon representation */}
                  <Globe className="w-3 h-3 text-slate-300" />
                  {/* Battery */}
                  <div className="w-5.5 h-2.5 border border-slate-400 rounded-sm p-0.5 flex items-center justify-start gap-0.5">
                    <div className="w-3.5 h-full bg-emerald-400 rounded-2xs"></div>
                  </div>
                </div>
              </div>

              {/* Android Mobile Header */}
              <div className="bg-slate-900 px-4 py-3.5 border-b border-slate-800 flex justify-between items-center">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-indigo-400 font-semibold block leading-none font-display">LearnerCRM</span>
                  <span className="text-sm font-bold text-white mt-0.5 block leading-tight">
                    {activeTab === 'leads' && 'Counselor Leads'}
                    {activeTab === 'tasks' && 'Follow-up Tasks'}
                    {activeTab === 'batches' && 'Syllabus Batches'}
                    {activeTab === 'analytics' && 'Performance Hub'}
                  </span>
                </div>
                {activeTab === 'leads' && (
                  <button
                    onClick={() => {
                      setEditingLead({});
                      setIsEditing(true);
                    }}
                    className="p-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition-all shadow-lg cursor-pointer"
                    id="add_lead_mobile_fab"
                    title="Add Lead"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Screen Main Content Wrapper (Scrollable) */}
              <div className="flex-1 overflow-y-auto px-3 py-3 pb-20 custom-scrollbar relative">
                {renderTabContent()}
              </div>

              {/* Android Software Navigation Keys Bar (Sticky Bottom) */}
              <div className="absolute bottom-12 left-0 right-0 h-10 bg-slate-950/90 backdrop-blur-md border-t border-slate-800/80 flex justify-around items-center z-30">
                <button
                  onClick={() => setActiveTab('leads')}
                  className={`flex flex-col items-center justify-center w-12 py-1 transition-all cursor-pointer ${activeTab === 'leads' ? 'text-indigo-400' : 'text-slate-400'}`}
                >
                  <Users className="w-4 h-4" />
                  <span className="text-[9px] mt-0.5">Leads</span>
                </button>
                <button
                  onClick={() => setActiveTab('tasks')}
                  className={`flex flex-col items-center justify-center w-12 py-1 transition-all cursor-pointer ${activeTab === 'tasks' ? 'text-indigo-400' : 'text-slate-400'}`}
                >
                  <CalendarIcon className="w-4 h-4" />
                  <span className="text-[9px] mt-0.5">Tasks</span>
                </button>
                <button
                  onClick={() => setActiveTab('batches')}
                  className={`flex flex-col items-center justify-center w-12 py-1 transition-all cursor-pointer ${activeTab === 'batches' ? 'text-indigo-400' : 'text-slate-400'}`}
                >
                  <Layers className="w-4 h-4" />
                  <span className="text-[9px] mt-0.5">Batches</span>
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`flex flex-col items-center justify-center w-12 py-1 transition-all cursor-pointer ${activeTab === 'analytics' ? 'text-indigo-400' : 'text-slate-400'}`}
                >
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-[9px] mt-0.5">Analytics</span>
                </button>
              </div>

              {/* Native Gestures Bar Pill */}
              <div className="absolute bottom-1 left-0 right-0 h-6 bg-slate-950 flex justify-center items-center z-40">
                <div className="w-28 h-1 bg-slate-700 rounded-full"></div>
              </div>

            </div>
          </div>
        ) : (
          /* RESPONSIVE FULLSCREEN DESKTOP VIEW */
          <div className="bg-slate-800/50 rounded-3xl border border-slate-700/80 shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[680px]" id="desktop_layout_container">
            
            {/* Desktop Left Sidebar Navigation */}
            <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-700/60 p-4 flex flex-col gap-6">
              <div className="px-2">
                <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest block leading-none">Kerala Learning Network</span>
                <span className="text-lg font-bold text-white mt-1 block">Sales CRM Portal</span>
              </div>

              <nav className="flex flex-col gap-1.5 flex-1" id="desktop_nav_links">
                <button
                  onClick={() => { setActiveTab('leads'); setSelectedLead(null); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left cursor-pointer ${activeTab === 'leads' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
                >
                  <Users className="w-4.5 h-4.5" />
                  <span>Couseling Leads</span>
                  <span className="ml-auto bg-slate-800 text-slate-400 px-2 py-0.5 rounded-md text-[10px] font-mono">{leads.length}</span>
                </button>

                <button
                  onClick={() => { setActiveTab('tasks'); setSelectedLead(null); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left cursor-pointer ${activeTab === 'tasks' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
                >
                  <CalendarIcon className="w-4.5 h-4.5" />
                  <span>Tasks & Followups</span>
                  <span className="ml-auto bg-amber-500/15 text-amber-300 px-2 py-0.5 rounded-md text-[10px] font-mono">{tasks.filter(t=>t.status==='Pending').length}</span>
                </button>

                <button
                  onClick={() => { setActiveTab('batches'); setSelectedLead(null); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left cursor-pointer ${activeTab === 'batches' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
                >
                  <Layers className="w-4.5 h-4.5" />
                  <span>Syllabus Batches</span>
                  <span className="ml-auto bg-emerald-500/15 text-emerald-300 px-2 py-0.5 rounded-md text-[10px] font-mono">{batches.length}</span>
                </button>

                <button
                  onClick={() => { setActiveTab('analytics'); setSelectedLead(null); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left cursor-pointer ${activeTab === 'analytics' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
                >
                  <TrendingUp className="w-4.5 h-4.5" />
                  <span>Analytics Summary</span>
                </button>
              </nav>

              <div className="border-t border-slate-800 pt-4 px-2 text-xs text-slate-400 space-y-1">
                <div className="flex justify-between">
                  <span>Enrolled Rate:</span>
                  <span className="font-semibold text-emerald-400">{conversionRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Gulf (NRI) Leads:</span>
                  <span className="font-semibold text-indigo-400">{gulfParentCount}</span>
                </div>
              </div>
            </aside>

            {/* Desktop Center content section */}
            <main className="flex-1 bg-slate-900/45 p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white capitalize font-display">
                    {activeTab === 'leads' && 'Counselor Master CRM Registry'}
                    {activeTab === 'tasks' && 'Follow-up & Dialing Tasklist'}
                    {activeTab === 'batches' && 'Curriculum Course Batches'}
                    {activeTab === 'analytics' && 'Operational KPI Analytics'}
                  </h2>
                  <p className="text-xs text-slate-400">Manage, qualify, and score Kerala leads using Gemini intelligence.</p>
                </div>
                {activeTab === 'leads' && (
                  <button
                    onClick={() => {
                      setEditingLead({});
                      setIsEditing(true);
                    }}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/15 cursor-pointer text-sm"
                    id="add_lead_desktop_btn"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Counseling Lead</span>
                  </button>
                )}
              </div>

              {renderTabContent()}
            </main>
          </div>
        )}

      </div>

      {/* DETAILED LEAD VIEW (BOTTOM SHEET IN MOBILE / SIDE PANEL IN DESKTOP) */}
      {selectedLead && (
        <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs flex items-end sm:items-center justify-center z-50 p-0 sm:p-4 animate-fade-in" id="lead_detail_modal">
          <div className="bg-slate-900 w-full max-w-2xl rounded-t-[28px] sm:rounded-2xl border border-slate-700/60 shadow-2xl flex flex-col max-h-[90vh] sm:max-h-[85vh] overflow-hidden">
            
            {/* Modal Title bar */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600/25 border border-indigo-500/40 flex items-center justify-center text-indigo-300 font-bold font-display text-base">
                  {selectedLead.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white leading-tight">{selectedLead.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono border border-slate-700/50 flex items-center gap-1">
                      <MapPin className="w-2.5 h-2.5 text-rose-400" />
                      {selectedLead.district}
                    </span>
                    <span className="text-[10px] bg-slate-800 text-indigo-300 px-2 py-0.5 rounded font-medium border border-indigo-500/20">
                      {selectedLead.board || 'CBSE'}
                    </span>
                    {selectedLead.isGulfParent && (
                      <span className="text-[10px] bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded font-bold border border-amber-500/20 flex items-center gap-1 animate-pulse">
                        <Globe className="w-2.5 h-2.5 text-amber-400" />
                        GULF NRI PARENT
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={() => { setSelectedLead(null); setAiResult(null); setAiError(null); }}
                className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-full transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Modal Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 custom-scrollbar bg-slate-900/50">
              
              {/* Grid with core status / parameters */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase font-mono tracking-wider">Lead Status</span>
                  <select
                    value={selectedLead.status}
                    onChange={(e) => handleQuickStatusChange(selectedLead.id, e.target.value as LeadStatus)}
                    className="bg-transparent text-xs font-semibold text-white mt-1 border-0 focus:ring-0 p-0 cursor-pointer block w-full outline-hidden"
                    style={{ color: STATUS_COLORS[selectedLead.status] }}
                  >
                    <option value="New" className="bg-slate-900">New</option>
                    <option value="Contacted" className="bg-slate-900">Contacted</option>
                    <option value="Demo Scheduled" className="bg-slate-900">Demo Scheduled</option>
                    <option value="Follow-up" className="bg-slate-900">Follow-up</option>
                    <option value="Enrolled" className="bg-slate-900">Enrolled</option>
                    <option value="Lost" className="bg-slate-900">Lost</option>
                  </select>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase font-mono tracking-wider">Priority</span>
                  <span className={`text-xs font-semibold mt-1 block ${selectedLead.priority === 'High' ? 'text-rose-400' : selectedLead.priority === 'Medium' ? 'text-amber-400' : 'text-slate-400'}`}>
                    {selectedLead.priority} Priority
                  </span>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase font-mono tracking-wider">Target Course</span>
                  <span className="text-xs font-semibold text-indigo-300 mt-1 block truncate" title={selectedLead.course}>
                    {selectedLead.course}
                  </span>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase font-mono tracking-wider">Academic Record</span>
                  <span className={`text-xs font-semibold mt-1 block ${selectedLead.academicBackground === 'Excellent' ? 'text-emerald-400' : selectedLead.academicBackground === 'Average' ? 'text-amber-400' : 'text-rose-400'}`}>
                    {selectedLead.academicBackground}
                  </span>
                </div>
              </div>

              {/* Lead Details block */}
              <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-semibold text-slate-300 border-b border-slate-800 pb-2">Academic & Contact Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-300">
                  <div className="flex justify-between py-1 border-b border-slate-900">
                    <span className="text-slate-400">Parent Name:</span>
                    <span className="font-semibold">{selectedLead.parentName}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-900">
                    <span className="text-slate-400">Parent Occupation:</span>
                    <span className="font-semibold text-right max-w-[200px] truncate">{selectedLead.parentOccupation || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-900">
                    <span className="text-slate-400">Student Phone:</span>
                    <span className="font-mono font-semibold">{selectedLead.phone}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-900">
                    <span className="text-slate-400">Syllabus Board:</span>
                    <span className="font-semibold text-indigo-400">{selectedLead.board || 'CBSE'}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-900 col-span-1 md:col-span-2">
                    <span className="text-slate-400">School / College:</span>
                    <span className="font-semibold text-slate-200 text-right truncate max-w-[300px]">{selectedLead.schoolCollege}</span>
                  </div>
                </div>
              </div>

              {/* CRM Lead Notes block */}
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Counselor Internal Log Notes</span>
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-300 font-sans leading-relaxed whitespace-pre-wrap">
                  {selectedLead.notes || "No log entries captured yet."}
                </div>
              </div>

              {/* THE INTELLIGENT AI SEGMENT - GEMINI COUNSELOR INSIGHTS */}
              <div className="bg-gradient-to-br from-indigo-950/60 to-slate-950 p-4 sm:p-5 rounded-2xl border border-indigo-500/30 space-y-4">
                
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-indigo-500/20 text-indigo-400 rounded-lg">
                      <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-1.5 font-display">
                        Gemini AI Counseling Co-Pilot
                      </h4>
                      <p className="text-[11px] text-slate-400 leading-none">Generate localized, high-conversion enrollment roadmaps</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAnalyzeWithAI(selectedLead)}
                    disabled={aiAnalyzing}
                    className={`px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 text-white font-medium rounded-xl text-xs transition-all flex items-center gap-1.5 shadow-lg shadow-indigo-600/10 cursor-pointer ${aiAnalyzing ? 'animate-pulse' : ''}`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{aiAnalyzing ? 'Analyzing Lead...' : 'Analyze Lead (Gemini)'}</span>
                  </button>
                </div>

                {/* AI Error Alert */}
                {aiError && (
                  <div className="p-3 bg-rose-500/10 text-rose-300 border border-rose-500/20 rounded-xl text-xs flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>{aiError} (Running fallback demo model)</span>
                  </div>
                )}

                {/* AI Loading State */}
                {aiAnalyzing && (
                  <div className="py-8 flex flex-col items-center justify-center gap-3">
                    <div className="relative w-12 h-12">
                      <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full"></div>
                      <div className="absolute inset-0 border-4 border-t-indigo-400 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                    </div>
                    <div className="text-center">
                      <span className="text-xs text-indigo-300 font-semibold block">Calculating Qualification Score...</span>
                      <p className="text-[10px] text-slate-500 mt-1">Sieving board dynamics & NRI timezone constraints</p>
                    </div>
                  </div>
                )}

                {/* LEAD SCORE GAUGE RING AND EVALUATION */}
                {!aiAnalyzing && (selectedLead.scoreReason || aiResult) && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="flex flex-col md:flex-row gap-4 items-center bg-slate-900/80 p-3.5 rounded-xl border border-slate-800/80">
                      
                      {/* Qualification Score Gauge Circular representation */}
                      <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="#1e293b"
                            strokeWidth="5"
                            fill="transparent"
                          />
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke={selectedLead.score > 80 ? '#10b981' : selectedLead.score > 55 ? '#f59e0b' : '#ef4444'}
                            strokeWidth="5"
                            fill="transparent"
                            strokeDasharray={175}
                            strokeDashoffset={175 - (175 * (aiResult?.score || selectedLead.score)) / 100}
                            className="transition-all duration-1000"
                          />
                        </svg>
                        <span className="absolute text-sm font-bold text-white font-mono">{aiResult?.score || selectedLead.score}%</span>
                      </div>

                      <div className="text-center md:text-left">
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">Lead Qualification Rating</span>
                        <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                          {aiResult?.scoreReason || selectedLead.scoreReason}
                        </p>
                      </div>
                    </div>

                    {/* Counseling script and WhatsApp copy fields */}
                    {aiResult && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        {/* Custom dialogue Counseling Script */}
                        <div className="space-y-1.5 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
                          <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                            <span className="font-bold text-indigo-300 flex items-center gap-1.5">
                              <Phone className="w-3.5 h-3.5 text-indigo-400" />
                              Counseling Guide (English/Malayalam)
                            </span>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(aiResult.counselingScript);
                                alert('Counseling roadmap script copied to clipboard!');
                              }}
                              className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white rounded transition-all flex items-center gap-1 text-[10px]"
                              title="Copy Script"
                            >
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </button>
                          </div>
                          <div className="space-y-2 mt-2 max-h-[180px] overflow-y-auto pr-1 text-slate-300 scrollbar-thin whitespace-pre-wrap leading-relaxed">
                            {aiResult.counselingScript}
                          </div>
                        </div>

                        {/* Malayalam friendly WhatsApp template */}
                        <div className="space-y-1.5 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
                          <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                            <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                              WhatsApp Broadcaster Template
                            </span>
                            <div className="flex gap-1.5">
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(aiResult.whatsappTemplate);
                                  alert('WhatsApp template copied to clipboard!');
                                }}
                                className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white rounded transition-all flex items-center gap-1 text-[10px]"
                                title="Copy Template"
                              >
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </button>
                              <a
                                href={`https://wa.me/${selectedLead.whatsapp}?text=${encodeURIComponent(aiResult.whatsappTemplate)}`}
                                target="_blank"
                                rel="noreferrer"
                                className="p-1 bg-emerald-600/35 hover:bg-emerald-600 hover:text-white text-emerald-400 rounded transition-all flex items-center gap-1 text-[10px]"
                                title="Broadcast WhatsApp"
                              >
                                <ExternalLink className="w-3 h-3" />
                                <span>Send</span>
                              </a>
                            </div>
                          </div>
                          <div className="space-y-2 mt-2 max-h-[180px] overflow-y-auto pr-1 text-slate-300 scrollbar-thin whitespace-pre-wrap leading-relaxed">
                            {aiResult.whatsappTemplate}
                          </div>
                        </div>

                        {/* Suggested action chip */}
                        {aiResult.suggestedAction && (
                          <div className="col-span-1 md:col-span-2 bg-indigo-950/30 px-3 py-2 rounded-lg border border-indigo-500/20 text-xs text-indigo-300 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="bg-indigo-500 text-white font-mono px-1.5 py-0.5 rounded text-[9px] font-bold">NEXT KEY STEP</span>
                              <span className="font-medium text-slate-200">{aiResult.suggestedAction}</span>
                            </div>
                          </div>
                        )}

                      </div>
                    )}

                  </div>
                )}

              </div>

            </div>

            {/* Close footer sheet bar */}
            <div className="p-4 bg-slate-950 border-t border-slate-800/80 flex justify-between gap-3 flex-wrap">
              <button
                onClick={() => handleDeleteLead(selectedLead.id)}
                className="px-3.5 py-2 hover:bg-rose-950/40 text-rose-400 hover:text-rose-300 rounded-xl border border-slate-800 hover:border-rose-900/50 transition-all text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Lead</span>
              </button>

              <div className="flex gap-2 ml-auto">
                <button
                  onClick={() => {
                    setEditingLead(selectedLead);
                    setIsEditing(true);
                  }}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition-all cursor-pointer border border-slate-700"
                >
                  Edit Information
                </button>
                <button
                  onClick={() => { setSelectedLead(null); setAiResult(null); setAiError(null); }}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition-all cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* EDIT / CREATE LEAD DIALOG (BOTTOM SHEET OR CENTER MODAL) */}
      {isEditing && (
        <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs flex items-end sm:items-center justify-center z-50 p-0 sm:p-4 animate-fade-in" id="add_edit_lead_modal">
          <form onSubmit={handleSaveLead} className="bg-slate-900 w-full max-w-xl rounded-t-[28px] sm:rounded-2xl border border-slate-700/60 shadow-2xl flex flex-col max-h-[90vh] sm:max-h-[85vh] overflow-hidden">
            
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Users className="w-4.5 h-4.5 text-indigo-400" />
                <span>{editingLead?.id ? 'Modify Counseling Lead' : 'Register New Learner Inquiry'}</span>
              </h3>
              <button
                type="button"
                onClick={() => { setIsEditing(false); setEditingLead(null); }}
                className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white rounded-full transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Edit Scrollable Fields */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 custom-scrollbar text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Student Name */}
                <div className="space-y-1">
                  <label className="text-slate-400 block font-semibold">Student Name *</label>
                  <input
                    type="text"
                    required
                    value={editingLead?.name || ''}
                    onChange={(e) => setEditingLead({ ...editingLead, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3.5 py-2 text-white outline-hidden font-medium"
                    placeholder="e.g. Anandhu Krishnan"
                  />
                </div>

                {/* Target Course */}
                <div className="space-y-1">
                  <label className="text-slate-400 block font-semibold">Target Course / Product *</label>
                  <select
                    value={editingLead?.course || 'NEET Foundation Pro'}
                    onChange={(e) => setEditingLead({ ...editingLead, course: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3 py-2 text-white outline-hidden font-medium"
                  >
                    {KERALA_COURSES.map(course => (
                      <option key={course} value={course}>{course}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Student Phone */}
                <div className="space-y-1">
                  <label className="text-slate-400 block font-semibold">Phone Contact *</label>
                  <input
                    type="tel"
                    required
                    value={editingLead?.phone || ''}
                    onChange={(e) => setEditingLead({ ...editingLead, phone: e.target.value, whatsapp: e.target.value.replace(/[^0-9]/g, '') })}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3.5 py-2 text-white outline-hidden font-mono"
                    placeholder="e.g. +91 9845X XXXXX"
                  />
                </div>

                {/* Email address */}
                <div className="space-y-1">
                  <label className="text-slate-400 block font-semibold">Email Address</label>
                  <input
                    type="email"
                    value={editingLead?.email || ''}
                    onChange={(e) => setEditingLead({ ...editingLead, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3.5 py-2 text-white outline-hidden font-medium"
                    placeholder="e.g. student@gmail.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Kerala District selection */}
                <div className="space-y-1">
                  <label className="text-slate-400 block font-semibold">Kerala District *</label>
                  <select
                    value={editingLead?.district || 'Malappuram'}
                    onChange={(e) => setEditingLead({ ...editingLead, district: e.target.value as KeralaDistrict })}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-2.5 py-2 text-white outline-hidden font-medium"
                  >
                    {KERALA_DISTRICTS.map(dist => (
                      <option key={dist} value={dist}>{dist}</option>
                    ))}
                  </select>
                </div>

                {/* Board */}
                <div className="space-y-1">
                  <label className="text-slate-400 block font-semibold">Syllabus Board</label>
                  <select
                    value={editingLead?.board || 'CBSE'}
                    onChange={(e) => setEditingLead({ ...editingLead, board: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-2.5 py-2 text-white outline-hidden font-medium"
                  >
                    <option value="CBSE">CBSE</option>
                    <option value="SCERT (State)">SCERT (State)</option>
                    <option value="ICSE">ICSE</option>
                  </select>
                </div>

                {/* Gulf NRI status */}
                <div className="space-y-1">
                  <label className="text-slate-400 block font-semibold">Gulf Parent (NRI)?</label>
                  <select
                    value={editingLead?.isGulfParent ? 'Yes' : 'No'}
                    onChange={(e) => setEditingLead({ ...editingLead, isGulfParent: e.target.value === 'Yes' })}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-2.5 py-2 text-white outline-hidden font-medium"
                  >
                    <option value="No">No (Local Resident)</option>
                    <option value="Yes">Yes (Gulf NRI Family)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Parent Name */}
                <div className="space-y-1 sm:col-span-1">
                  <label className="text-slate-400 block font-semibold">Parent / Guardian Name *</label>
                  <input
                    type="text"
                    required
                    value={editingLead?.parentName || ''}
                    onChange={(e) => setEditingLead({ ...editingLead, parentName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3.5 py-2 text-white outline-hidden font-medium"
                    placeholder="e.g. Ramesh Kumar"
                  />
                </div>

                {/* Parent Occupation */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-slate-400 block font-semibold">Parent Occupation</label>
                  <input
                    type="text"
                    value={editingLead?.parentOccupation || ''}
                    onChange={(e) => setEditingLead({ ...editingLead, parentOccupation: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3.5 py-2 text-white outline-hidden font-medium"
                    placeholder="e.g. Civil Engineer, UAE / Rubber Farmer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Budget Preference */}
                <div className="space-y-1">
                  <label className="text-slate-400 block font-semibold">Paying Capacity</label>
                  <select
                    value={editingLead?.budgetPreference || 'Medium'}
                    onChange={(e) => setEditingLead({ ...editingLead, budgetPreference: e.target.value as BudgetPreference })}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-2.5 py-2 text-white outline-hidden font-medium"
                  >
                    <option value="Low">Low (Needs heavy discounts)</option>
                    <option value="Medium">Medium (Standard EMI ok)</option>
                    <option value="High">High (Single payment ok)</option>
                    <option value="Needs EMI">Needs EMI Support</option>
                  </select>
                </div>

                {/* Academic profile */}
                <div className="space-y-1">
                  <label className="text-slate-400 block font-semibold">Academic Rating</label>
                  <select
                    value={editingLead?.academicBackground || 'Average'}
                    onChange={(e) => setEditingLead({ ...editingLead, academicBackground: e.target.value as AcademicBackground })}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-2.5 py-2 text-white outline-hidden font-medium"
                  >
                    <option value="Excellent">Excellent (Topper material)</option>
                    <option value="Average">Average (Needs regular monitoring)</option>
                    <option value="Needs Support">Needs Support (Needs basics clear)</option>
                  </select>
                </div>

                {/* School/College Name */}
                <div className="space-y-1">
                  <label className="text-slate-400 block font-semibold">School Name / School Town</label>
                  <input
                    type="text"
                    value={editingLead?.schoolCollege || ''}
                    onChange={(e) => setEditingLead({ ...editingLead, schoolCollege: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3.5 py-2 text-white outline-hidden font-medium"
                    placeholder="e.g. Cotton Hill Girls School, TVM"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Lead Source */}
                <div className="space-y-1">
                  <label className="text-slate-400 block font-semibold">Lead Source</label>
                  <select
                    value={editingLead?.leadSource || 'Instagram'}
                    onChange={(e) => setEditingLead({ ...editingLead, leadSource: e.target.value as LeadSource })}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-2.5 py-2 text-white outline-hidden font-medium"
                  >
                    <option value="Instagram">Instagram</option>
                    <option value="Facebook Ad">Facebook Ad</option>
                    <option value="School Campaign">School Campaign</option>
                    <option value="Direct Referral">Direct Referral</option>
                    <option value="Website Inquiry">Website Inquiry</option>
                    <option value="Google Search">Google Search</option>
                  </select>
                </div>

                {/* Lead Priority */}
                <div className="space-y-1">
                  <label className="text-slate-400 block font-semibold">Follow-up Urgency</label>
                  <select
                    value={editingLead?.priority || 'Medium'}
                    onChange={(e) => setEditingLead({ ...editingLead, priority: e.target.value as LeadPriority })}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-2.5 py-2 text-white outline-hidden font-medium"
                  >
                    <option value="Low">Low (Cold Interest)</option>
                    <option value="Medium">Medium (Regular Warm)</option>
                    <option value="High">High (Immediate Hot Dial)</option>
                  </select>
                </div>

                {/* Next Follow-up Date */}
                <div className="space-y-1">
                  <label className="text-slate-400 block font-semibold font-mono">Follow-up Date</label>
                  <input
                    type="date"
                    value={editingLead?.followUpDate || ''}
                    onChange={(e) => setEditingLead({ ...editingLead, followUpDate: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-2.5 py-2 text-white outline-hidden font-mono"
                  />
                </div>
              </div>

              {/* CRM Remarks/Notes */}
              <div className="space-y-1">
                <label className="text-slate-400 block font-semibold">Counselor Log Notes (Concerns, Malayalam Remarks)</label>
                <textarea
                  rows={3}
                  value={editingLead?.notes || ''}
                  onChange={(e) => setEditingLead({ ...editingLead, notes: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3.5 py-2 text-white outline-hidden font-medium resize-none leading-relaxed"
                  placeholder="e.g. Parents require class reviews in Malayalam. Father will pay complete tuition via credit card next week."
                />
              </div>

            </div>

            {/* Form actions footer */}
            <div className="p-4 bg-slate-950 border-t border-slate-800/80 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => { setIsEditing(false); setEditingLead(null); }}
                className="px-4 py-2 hover:bg-slate-800 text-slate-300 rounded-xl font-semibold transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all cursor-pointer shadow-md"
              >
                {editingLead?.id ? 'Save Updates' : 'Add Lead to Database'}
              </button>
            </div>

          </form>
        </div>
      )}

    </div>
  );

  // Tab routing renderer
  function renderTabContent() {
    switch (activeTab) {
      case 'leads':
        return renderLeadsTab();
      case 'tasks':
        return renderTasksTab();
      case 'batches':
        return renderBatchesTab();
      case 'analytics':
        return renderAnalyticsTab();
      default:
        return renderLeadsTab();
    }
  }

  // SUB-TAB: LEADS
  function renderLeadsTab() {
    return (
      <div className="space-y-4" id="leads_tab_panel">
        
        {/* Search and Advanced filtering row */}
        <div className="bg-slate-800/55 p-3 rounded-2xl border border-slate-700/60 space-y-3">
          
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-400 outline-hidden focus:border-indigo-500 font-medium"
              placeholder="Search by student, parent name, course, school..."
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 p-0.5 bg-slate-800 rounded-full hover:bg-slate-700 transition-all cursor-pointer"
              >
                <X className="w-3 h-3 text-slate-300" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[11px]">
            
            {/* Status Filter */}
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">Status</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-slate-950 border border-slate-850 rounded-lg px-2 py-1.5 text-white font-medium outline-hidden"
              >
                <option value="All">All Statuses</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Demo Scheduled">Demo Scheduled</option>
                <option value="Follow-up">Follow-up</option>
                <option value="Enrolled">Enrolled</option>
                <option value="Lost">Lost</option>
              </select>
            </div>

            {/* Kerala District Filter */}
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">Kerala District</span>
              <select
                value={districtFilter}
                onChange={(e) => setDistrictFilter(e.target.value)}
                className="w-full bg-slate-950 border border-slate-850 rounded-lg px-2 py-1.5 text-white font-medium outline-hidden"
              >
                <option value="All">All Kerala (14)</option>
                {KERALA_DISTRICTS.map(dist => (
                  <option key={dist} value={dist}>{dist}</option>
                ))}
              </select>
            </div>

            {/* Board Filter */}
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">School Board</span>
              <select
                value={boardFilter}
                onChange={(e) => setBoardFilter(e.target.value)}
                className="w-full bg-slate-950 border border-slate-850 rounded-lg px-2 py-1.5 text-white font-medium outline-hidden"
              >
                <option value="All">All Syllabus Boards</option>
                <option value="CBSE">CBSE Board</option>
                <option value="SCERT (State)">SCERT (State) Board</option>
                <option value="ICSE">ICSE Board</option>
              </select>
            </div>

            {/* Gulf Parent Filter */}
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">Gulf Parent (NRI)</span>
              <select
                value={gulfFilter}
                onChange={(e) => setGulfFilter(e.target.value)}
                className="w-full bg-slate-950 border border-slate-850 rounded-lg px-2 py-1.5 text-white font-medium outline-hidden"
              >
                <option value="All">All Families</option>
                <option value="Yes">Gulf NRI Only</option>
                <option value="No">Local Residents Only</option>
              </select>
            </div>

          </div>

          {/* Quick reset of filter row */}
          {(statusFilter !== 'All' || districtFilter !== 'All' || boardFilter !== 'All' || gulfFilter !== 'All' || searchQuery !== '') && (
            <div className="flex justify-end pt-1">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('All');
                  setDistrictFilter('All');
                  setBoardFilter('All');
                  setGulfFilter('All');
                }}
                className="text-[10px] text-indigo-400 hover:text-indigo-300 font-bold transition-all flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            </div>
          )}

        </div>

        {/* Lead lists display */}
        <div className="space-y-2" id="leads_registry_list">
          <div className="flex justify-between items-center px-1">
            <span className="text-xs font-bold text-slate-400">Showing {filteredLeads.length} of {leads.length} leads</span>
          </div>

          {filteredLeads.length === 0 ? (
            <div className="bg-slate-800/20 p-8 rounded-2xl border border-slate-800 text-center space-y-2">
              <Users className="w-10 h-10 text-slate-600 mx-auto" />
              <span className="text-xs font-bold text-slate-400 block">No counseling leads match filters</span>
              <p className="text-[11px] text-slate-500">Try adjusting your filters or search terms.</p>
            </div>
          ) : (
            filteredLeads.map(lead => (
              <div
                key={lead.id}
                onClick={() => setSelectedLead(lead)}
                className="bg-slate-800 hover:bg-slate-750 p-3.5 rounded-2xl border border-slate-700/50 hover:border-indigo-500/20 transition-all cursor-pointer flex justify-between items-center group relative overflow-hidden"
              >
                {/* Left high-priority color marker strip */}
                <div 
                  className="absolute left-0 top-0 bottom-0 w-1" 
                  style={{ backgroundColor: STATUS_COLORS[lead.status] }}
                ></div>

                <div className="space-y-1.5 pl-2 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors truncate max-w-[150px] sm:max-w-xs">{lead.name}</h4>
                    <span 
                      className="text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider scale-95"
                      style={{ 
                        backgroundColor: STATUS_COLORS[lead.status] + '20', 
                        color: STATUS_COLORS[lead.status],
                        border: `1px solid ${STATUS_COLORS[lead.status]}30`
                      }}
                    >
                      {lead.status}
                    </span>
                    {lead.isGulfParent && (
                      <span className="text-[9px] bg-amber-500/10 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/20 flex items-center gap-1 font-mono">
                        <Globe className="w-2.5 h-2.5 text-amber-400" />
                        GULF
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-[10px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-rose-400" />
                      {lead.district}
                    </span>
                    <span className="bg-slate-900 px-1.5 py-0.5 rounded font-mono text-slate-300 border border-slate-800">
                      {lead.course}
                    </span>
                    {lead.board && (
                      <span className="text-slate-300 font-semibold">{lead.board}</span>
                    )}
                  </div>

                  {lead.notes && (
                    <p className="text-[10px] text-slate-500 truncate line-clamp-1 italic">
                      "{lead.notes.split('\n')[0]}"
                    </p>
                  )}
                </div>

                {/* Score badge indicator and right pointer */}
                <div className="flex items-center gap-2.5 shrink-0 ml-2">
                  <div className="text-right">
                    <span className="text-[9px] text-slate-400 block uppercase font-mono leading-none">Score</span>
                    <span className={`text-xs font-extrabold font-mono ${lead.score >= 85 ? 'text-emerald-400' : lead.score >= 60 ? 'text-amber-400' : 'text-rose-400'}`}>
                      {lead.score || '--'}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-transform group-hover:translate-x-0.5" />
                </div>

              </div>
            ))
          )}

        </div>
      </div>
    );
  }

  // SUB-TAB: TASKS
  function renderTasksTab() {
    const pendingTasks = tasks.filter(t => t.status === 'Pending');
    const completedTasks = tasks.filter(t => t.status === 'Completed');

    return (
      <div className="space-y-4" id="tasks_tab_panel">
        
        {/* Quick Task Creation mini-form */}
        <div className="bg-slate-850 p-4 rounded-2xl border border-slate-700/60 space-y-3">
          <span className="text-xs font-bold text-white flex items-center gap-1.5 font-display">
            <CalendarDays className="w-4 h-4 text-indigo-400" />
            <span>Create Action Reminder</span>
          </span>

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const title = (form.elements.namedItem('taskTitle') as HTMLInputElement).value;
              const leadId = (form.elements.namedItem('taskLeadId') as HTMLSelectElement).value;
              const dueDate = (form.elements.namedItem('taskDueDate') as HTMLInputElement).value;
              const priority = (form.elements.namedItem('taskPriority') as HTMLSelectElement).value as LeadPriority;

              if (!title || !dueDate) {
                alert('Please enter a task title and due date.');
                return;
              }

              const selectedL = leads.find(l => l.id === leadId);

              const newTask: Task = {
                id: `task-${Date.now()}`,
                leadId,
                leadName: selectedL ? selectedL.name : 'General Task',
                title,
                dueDate,
                status: 'Pending',
                priority
              };

              setTasks([newTask, ...tasks]);
              form.reset();
            }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            <div className="space-y-1 col-span-1 sm:col-span-2">
              <label className="text-[10px] text-slate-400 font-semibold block uppercase">Action Title *</label>
              <input
                type="text"
                name="taskTitle"
                required
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg px-3 py-1.5 text-xs text-white outline-hidden"
                placeholder="e.g. Call Fathima's mother to clarify SCERT EMI pricing schedule"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 font-semibold block uppercase">Link to Counseling Student</label>
              <select
                name="taskLeadId"
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg px-2 py-1.5 text-xs text-white outline-hidden"
              >
                <option value="">General (No specific student)</option>
                {leads.map(l => (
                  <option key={l.id} value={l.id}>{l.name} ({l.district})</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-semibold block uppercase font-mono">Due Date *</label>
                <input
                  type="date"
                  name="taskDueDate"
                  required
                  defaultValue={new Date().toISOString().split('T')[0]}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg px-2 py-1.5 text-xs text-white outline-hidden font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-semibold block uppercase">Dial Urgency</label>
                <select
                  name="taskPriority"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg px-2 py-1.5 text-xs text-white outline-hidden"
                >
                  <option value="High">High Priority</option>
                  <option value="Medium" selected>Medium Priority</option>
                  <option value="Low">Low Priority</option>
                </select>
              </div>
            </div>

            <div className="col-span-1 sm:col-span-2 flex justify-end">
              <button
                type="submit"
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs transition-all cursor-pointer shadow-md"
              >
                Save Alarm Task
              </button>
            </div>
          </form>
        </div>

        {/* Task lists pending/completed */}
        <div className="space-y-4" id="counselor_tasklist">
          
          {/* Pending items */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-300 px-1 block">Active Followups ({pendingTasks.length})</span>
            {pendingTasks.length === 0 ? (
              <div className="bg-slate-800/10 p-6 rounded-2xl border border-slate-800 text-center text-xs text-slate-500">
                Excellent! All student dialed list is fully completed.
              </div>
            ) : (
              pendingTasks.map(task => (
                <div 
                  key={task.id}
                  className="bg-slate-800 p-3 rounded-xl border border-slate-700/50 flex items-start gap-3 hover:border-slate-600 transition-all"
                >
                  <button
                    onClick={() => toggleTaskStatus(task.id)}
                    className="p-1 mt-0.5 hover:bg-indigo-500/10 text-slate-500 hover:text-indigo-400 rounded-md border border-slate-700 hover:border-indigo-500/30 transition-all cursor-pointer shrink-0"
                    title="Mark Completed"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-slate-200 leading-snug">{task.title}</h4>
                    <div className="flex flex-wrap items-center gap-y-1 gap-x-2.5 text-[10px] text-slate-400 mt-1">
                      {task.leadId && (
                        <span className="text-indigo-400 font-semibold">
                          Student: {task.leadName}
                        </span>
                      )}
                      <span className="flex items-center gap-1 font-mono text-slate-300">
                        <Clock className="w-3 h-3 text-slate-400" />
                        Due: {task.dueDate}
                      </span>
                      <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${task.priority === 'High' ? 'bg-rose-500/10 text-rose-300 border border-rose-500/20' : 'bg-slate-900 text-slate-400 border border-slate-800'}`}>
                        {task.priority} Priority
                      </span>
                    </div>
                  </div>

                  {/* WhatsApp Launcher direct from task if mapped */}
                  {task.leadId && (
                    <button
                      onClick={() => {
                        const targetLead = leads.find(l => l.id === task.leadId);
                        if (targetLead) setSelectedLead(targetLead);
                      }}
                      className="p-1.5 bg-slate-900 text-slate-400 hover:text-white rounded-lg border border-slate-800 hover:border-slate-700 transition-all shrink-0 cursor-pointer text-xs"
                      title="View Student"
                    >
                      View
                    </button>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Completed items */}
          {completedTasks.length > 0 && (
            <div className="space-y-2 opacity-65">
              <span className="text-xs font-bold text-slate-400 px-1 block">Recently Closed ({completedTasks.length})</span>
              <div className="space-y-1.5">
                {completedTasks.map(task => (
                  <div 
                    key={task.id}
                    className="bg-slate-850/60 p-2 rounded-lg border border-slate-800 flex items-center gap-2.5 text-xs"
                  >
                    <button
                      onClick={() => toggleTaskStatus(task.id)}
                      className="p-0.5 text-indigo-400 rounded cursor-pointer shrink-0"
                      title="Undo status"
                    >
                      <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 fill-emerald-500/10" />
                    </button>
                    <span className="text-slate-400 line-through truncate flex-1 leading-none">{task.title}</span>
                    <button
                      onClick={() => setTasks(tasks.filter(t => t.id !== task.id))}
                      className="p-1 text-slate-500 hover:text-rose-400 rounded transition-colors cursor-pointer shrink-0"
                      title="Purge log"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    );
  }

  // SUB-TAB: BATCHES
  function renderBatchesTab() {
    return (
      <div className="space-y-4" id="batches_tab_panel">
        
        {/* Quick Batch Registration Card */}
        <div className="bg-slate-850 p-4 rounded-2xl border border-slate-700/60 space-y-3">
          <span className="text-xs font-bold text-white flex items-center gap-1.5 font-display">
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span>Open New Syllabus Batch</span>
          </span>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const name = (form.elements.namedItem('batchName') as HTMLInputElement).value;
              const course = (form.elements.namedItem('batchCourse') as HTMLSelectElement).value;
              const startDate = (form.elements.namedItem('batchStart') as HTMLInputElement).value;
              const capacity = parseInt((form.elements.namedItem('batchCapacity') as HTMLInputElement).value) || 30;
              const fee = parseInt((form.elements.namedItem('batchFee') as HTMLInputElement).value) || 15000;

              if (!name || !startDate) {
                alert('Please enter a batch name and start date.');
                return;
              }

              const newBatch: Batch = {
                id: `batch-${Date.now()}`,
                name,
                course,
                startDate,
                capacity,
                filled: 0,
                fee,
                counselor: 'Anjali Nair'
              };

              setBatches([...batches, newBatch]);
              form.reset();
            }}
            className="grid grid-cols-2 gap-2 text-xs"
          >
            <div className="col-span-2 space-y-1">
              <label className="text-[10px] text-slate-400 font-semibold block">Batch Identifier Name *</label>
              <input
                type="text"
                name="batchName"
                required
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg px-2.5 py-1 text-white outline-hidden"
                placeholder="e.g. KEAM Alpha (Super 40)"
              />
            </div>

            <div className="col-span-2 space-y-1">
              <label className="text-[10px] text-slate-400 font-semibold block">Target Course Program *</label>
              <select
                name="batchCourse"
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg px-2 py-1 text-white outline-hidden"
              >
                {KERALA_COURSES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 font-semibold block font-mono">Launch Date *</label>
              <input
                type="date"
                name="batchStart"
                required
                defaultValue="2026-08-01"
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg px-2 py-1 text-white outline-hidden font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-semibold block">Capacity</label>
                <input
                  type="number"
                  name="batchCapacity"
                  defaultValue={40}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg px-1.5 py-1 text-white outline-hidden"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-semibold block font-mono">Fee (₹)</label>
                <input
                  type="number"
                  name="batchFee"
                  defaultValue={22000}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg px-1.5 py-1 text-white outline-hidden font-mono"
                />
              </div>
            </div>

            <div className="col-span-2 flex justify-end pt-1">
              <button
                type="submit"
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all cursor-pointer shadow-md"
              >
                Create Batch
              </button>
            </div>
          </form>
        </div>

        {/* Batches dashboard cards list */}
        <div className="space-y-3" id="batches_registration_list">
          {batches.map(batch => {
            const pct = Math.round((batch.filled / batch.capacity) * 100);
            return (
              <div 
                key={batch.id}
                className="bg-slate-800 p-4 rounded-2xl border border-slate-700/60 space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xs font-bold text-white">{batch.name}</h4>
                    <span className="text-[10px] text-indigo-400 font-medium block mt-0.5 truncate max-w-[250px]">{batch.course}</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 font-mono">
                    ₹{batch.fee.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Progress bar representing batch fill up */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Filled Capacity: <strong className="text-slate-200">{batch.filled} / {batch.capacity}</strong></span>
                    <span className="font-semibold font-mono">{pct}% Full</span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-900">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${pct > 85 ? 'bg-rose-500' : pct > 60 ? 'bg-amber-400' : 'bg-indigo-500'}`}
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex justify-between text-[10px] text-slate-400 border-t border-slate-700/40 pt-2 font-mono">
                  <span>Start: {batch.startDate}</span>
                  <span className="text-slate-300">Lead Advisor: {batch.counselor}</span>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    );
  }

  // SUB-TAB: ANALYTICS (MD3 Dashboard)
  function renderAnalyticsTab() {
    return (
      <div className="space-y-6" id="analytics_dashboard_panel">
        
        {/* KPI Score Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          
          <div className="bg-slate-850 p-3.5 rounded-2xl border border-slate-700/60 relative overflow-hidden flex flex-col justify-between">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">Total Leads Managed</span>
            <span className="text-xl font-bold font-mono text-white mt-2">{totalLeadsCount}</span>
            <p className="text-[10px] text-slate-500 mt-1">Acquired Kerala wide</p>
          </div>

          <div className="bg-slate-850 p-3.5 rounded-2xl border border-slate-700/60 relative overflow-hidden flex flex-col justify-between">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">Enrolled Students</span>
            <span className="text-xl font-bold font-mono text-emerald-400 mt-2">{enrolledCount}</span>
            <p className="text-[10px] text-emerald-500/80 mt-1 flex items-center gap-1">
              <span>Conversion Rate:</span>
              <strong className="font-mono">{conversionRate}%</strong>
            </p>
          </div>

          <div className="bg-slate-850 p-3.5 rounded-2xl border border-slate-700/60 relative overflow-hidden flex flex-col justify-between">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">Gulf Parents (NRI)</span>
            <span className="text-xl font-bold font-mono text-amber-300 mt-2">{gulfParentCount}</span>
            <p className="text-[10px] text-slate-500 mt-1">Premium tuition budgets</p>
          </div>

          <div className="bg-slate-850 p-3.5 rounded-2xl border border-slate-700/60 relative overflow-hidden flex flex-col justify-between">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">Pending Followups</span>
            <span className="text-xl font-bold font-mono text-indigo-400 mt-2">
              {tasks.filter(t => t.status === 'Pending').length}
            </span>
            <p className="text-[10px] text-slate-500 mt-1">To dial evening shift</p>
          </div>

        </div>

        {/* Charts block container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Chart 1: Status Distribution */}
          <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-700/60 space-y-3">
            <span className="text-xs font-bold text-white block">Lead Status Breakdown</span>
            <div className="h-44 flex items-center justify-center">
              {leads.length === 0 ? (
                <span className="text-xs text-slate-500">No leads captured yet</span>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusPieData()}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={65}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {statusPieData().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px', fontSize: '11px', color: '#fff' }} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
            {/* Custom mini legend */}
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[9px] text-slate-400 mt-1.5">
              {statusPieData().map((item, idx) => (
                <div key={item.name} className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: PIE_COLORS[idx % PIE_COLORS.length] }}></div>
                  <span>{item.name} ({item.value})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Chart 2: Lead Source Performance */}
          <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-700/60 space-y-3">
            <span className="text-xs font-bold text-white block">Top Lead Sources (Kerala App)</span>
            <div className="h-44 flex items-center justify-center">
              {leads.length === 0 ? (
                <span className="text-xs text-slate-500">No source statistics found</span>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={leadSourceData()} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={9} tickLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={9} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px', fontSize: '11px', color: '#fff' }} />
                    <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]}>
                      {leadSourceData().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[(index + 2) % PIE_COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Regional Districts table */}
          <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-700/60 col-span-1 md:col-span-2 space-y-2">
            <span className="text-xs font-bold text-white block">Regional Distribution (Top Districts)</span>
            <div className="overflow-x-auto text-[11px]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-700/60 text-slate-400 font-mono">
                    <th className="py-2 font-semibold">District Name</th>
                    <th className="py-2 text-right font-semibold">Lead Volume</th>
                    <th className="py-2 text-right font-semibold">Market Share (%)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {districtData().map(item => {
                    const pctShare = Math.round((item.count / leads.length) * 100);
                    return (
                      <tr key={item.name} className="hover:bg-slate-750/30">
                        <td className="py-2 flex items-center gap-1.5 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-rose-400" />
                          <span>{item.name} District</span>
                        </td>
                        <td className="py-2 text-right font-semibold font-mono">{item.count} leads</td>
                        <td className="py-2 text-right font-semibold font-mono text-indigo-400">{pctShare}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    );
  }
}
