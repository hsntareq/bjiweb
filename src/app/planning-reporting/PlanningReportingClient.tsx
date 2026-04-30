'use client';

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { 
  Target, Users, BookOpen, Layers, Coins, Calendar, ChevronLeft, ChevronRight, Save, Building, FileText, Printer,
  Megaphone, LayoutGrid, Library, CalendarCheck, Users2, UserPlus, GraduationCap, MapPin, HandCoins, MessagesSquare,
  Heart, Award, HeartHandshake, Stethoscope, Building2, Scale, PhoneCall, Flag, Vote, Wallet, Home, Radio, ClipboardList,
  PieChart, User
} from 'lucide-react';
import { ReportAccordionSection } from '../../components/Reporting/ReportAccordionSection';
import { UnitDawatModal } from '../../components/Reporting/Modals/UnitDawatModal';
import { PersonalDawatModal } from '../../components/Reporting/Modals/PersonalDawatModal';
import { BaitulmalModal } from '../../components/Reporting/Modals/BaitulmalModal';
import { RemarksModal } from '../../components/Reporting/Modals/RemarksModal';
import { DepartmentalInfoModal } from '../../components/Reporting/Modals/DepartmentalInfoModal';
import { MeetingsTrainingModal } from '../../components/Reporting/Modals/MeetingsTrainingModal';
import { SocialWorkModal } from '../../components/Reporting/Modals/SocialWorkModal';
import { MiscellaneousModal } from '../../components/Reporting/Modals/MiscellaneousModal';
import { DawatTablighModal } from '../../components/Reporting/Modals/DawatTablighModal';
import { DawahPublicationModal } from '../../components/Reporting/Modals/DawahPublicationModal';
import { ProgramImplementationModal } from '../../components/Reporting/Modals/ProgramImplementationModal';
import { ManpowerModal } from '../../components/Reporting/Modals/ManpowerModal';
import { DeptManpowerModal } from '../../components/Reporting/Modals/DeptManpowerModal';
import { DawahFamilyUnitModal } from '../../components/Reporting/Modals/DawahFamilyUnitModal';
import { StudentJoiningModal } from '../../components/Reporting/Modals/StudentJoiningModal';
import { SafarModal } from '../../components/Reporting/Modals/SafarModal';
import { DonorModal } from '../../components/Reporting/Modals/DonorModal';
import { OrgMeetingModal } from '../../components/Reporting/Modals/OrgMeetingModal';
import { TarbiyatModal } from '../../components/Reporting/Modals/TarbiyatModal';
import { HRDModal } from '../../components/Reporting/Modals/HRDModal';
import { SocialPersonalModal } from '../../components/Reporting/Modals/SocialPersonalModal';
import { SocialGroupModal } from '../../components/Reporting/Modals/SocialGroupModal';
import { SocialHealthModal } from '../../components/Reporting/Modals/SocialHealthModal';
import { SocialInstModal } from '../../components/Reporting/Modals/SocialInstModal';
import { PoliticalCommunicationModal } from '../../components/Reporting/Modals/PoliticalCommunicationModal';
import { PoliticalProgramModal } from '../../components/Reporting/Modals/PoliticalProgramModal';
import { NationalDayModal } from '../../components/Reporting/Modals/NationalDayModal';
import { ElectionActivityModal } from '../../components/Reporting/Modals/ElectionActivityModal';

interface Organization {
  id: number;
  name: string;
  type: string;
  children?: Organization[];
}

export default function PlanningReportingClient({ accessToken }: { accessToken: string }) {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [organizations, setOrganizations] = useState<{id: number, name: string, type: string}[]>([]);
  const [selectedOrgId, setSelectedOrgId] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  const [activeTab, setActiveTab] = useState<'plan' | 'report' | 'comprehensive'>('comprehensive');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Initialize from localStorage after mount
  useEffect(() => {
    const savedYear = localStorage.getItem('reporting_year');
    const savedMonth = localStorage.getItem('reporting_month');
    const savedOrgId = localStorage.getItem('reporting_org_id');

    if (savedYear) setYear(parseInt(savedYear));
    if (savedMonth) setMonth(parseInt(savedMonth));
    if (savedOrgId) setSelectedOrgId(parseInt(savedOrgId));
    
    setIsMounted(true);
  }, []);
  
  // Basic Planning state
  const [plan, setPlan] = useState<any>({
    year, month, dawatTarget: 0, dawatAchieved: 0, activistTarget: 0, activistAchieved: 0,
    memberTarget: 0, memberAchieved: 0, programTarget: 0, programAchieved: 0,
    programDetails: '', donationTarget: 0, donationAchieved: 0
  });

  // Comprehensive Report state
  const [compReport, setCompReport] = useState<any>({
    headerInfo: {},
    unitDawat: {},
    personalDawat: {},
    generalMeeting: {},
    publicRelations: {},
    prCampaign: {},
    departmentalInfo: {},
    dawahPublication: {},
    programs: {},
    manpower: {},
    deptManpower: {},
    unitStats: {},
    studentJoining: {},
    safar: {},
    donors: {},
    orgMeetings: {},
    training: {},
    socialWork: {},
    political: {},
    finance: {},
    miscellaneous: {},
    remarks: {}
  });

  const [isUnitDawatModalOpen, setIsUnitDawatModalOpen] = useState(false);
  const [isPersonalDawatModalOpen, setIsPersonalDawatModalOpen] = useState(false);
  const [isBaitulmalModalOpen, setIsBaitulmalModalOpen] = useState(false);
  const [isRemarksModalOpen, setIsRemarksModalOpen] = useState(false);
  const [isDeptModalOpen, setIsDeptModalOpen] = useState(false);
  const [isMeetingsModalOpen, setIsMeetingsModalOpen] = useState(false);
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);
  const [isMiscModalOpen, setIsMiscModalOpen] = useState(false);
  const [isDawatTablighModalOpen, setIsDawatTablighModalOpen] = useState(false);
  const [isDawahPubModalOpen, setIsDawahPubModalOpen] = useState(false);
  const [isProgramModalOpen, setIsProgramModalOpen] = useState(false);
  const [isManpowerModalOpen, setIsManpowerModalOpen] = useState(false);
  const [isDeptManpowerModalOpen, setIsDeptManpowerModalOpen] = useState(false);
  const [isUnitModalOpen, setIsUnitModalOpen] = useState(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [isSafarModalOpen, setIsSafarModalOpen] = useState(false);
  const [isDonorModalOpen, setIsDonorModalOpen] = useState(false);
  const [isOrgMeetingModalOpen, setIsOrgMeetingModalOpen] = useState(false);
  const [isTarbiyatModalOpen, setIsTarbiyatModalOpen] = useState(false);
  const [isHRDModalOpen, setIsHRDModalOpen] = useState(false);
  const [isSocialPersonalModalOpen, setIsSocialPersonalModalOpen] = useState(false);
  const [isSocialGroupModalOpen, setIsSocialGroupModalOpen] = useState(false);
  const [isSocialHealthModalOpen, setIsSocialHealthModalOpen] = useState(false);
  const [isSocialInstModalOpen, setIsSocialInstModalOpen] = useState(false);
  const [isPoliticalCommModalOpen, setIsPoliticalCommModalOpen] = useState(false);
  const [isPoliticalProgModalOpen, setIsPoliticalProgModalOpen] = useState(false);
  const [isNationalDayModalOpen, setIsNationalDayModalOpen] = useState(false);
  const [isElectionModalOpen, setIsElectionModalOpen] = useState(false);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const flattenOrganizations = (orgs: Organization[]): {id: number, name: string, type: string}[] => {
    let result: {id: number, name: string, type: string}[] = [];
    for (const org of orgs) {
      result.push({ id: org.id, name: org.name, type: org.type });
      if (org.children && org.children.length > 0) {
        result = result.concat(flattenOrganizations(org.children));
      }
    }
    return result;
  };

  // Persistence effects
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('reporting_year', year.toString());
      localStorage.setItem('reporting_month', month.toString());
    }
  }, [year, month, isMounted]);

  useEffect(() => {
    if (isMounted && selectedOrgId) {
      localStorage.setItem('reporting_org_id', selectedOrgId.toString());
    }
  }, [selectedOrgId, isMounted]);

  useEffect(() => {
    const fetchOrgs = async () => {
      try {
        const response = await fetch('http://localhost:3001/organization/hierarchy/tree', {
          headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
        });
        if (response.status === 401 || response.status === 403) {
           console.error("Unauthorized access to organizations");
           window.location.href = "/login";
           return;
        }
        if (response.ok) {
          const text = await response.text();
          const data = text ? JSON.parse(text) : null;
          if (data) {
            const flatList = flattenOrganizations(data);
            setOrganizations(flatList);
            if (flatList.length > 0 && !selectedOrgId) {
              setSelectedOrgId(flatList[0].id);
            }
          }
        }
      } catch (err) {
        console.error("Failed to fetch organizations", err);
      }
    };
    fetchOrgs();
  }, [accessToken]);

  const isFuture = year > new Date().getFullYear() || (year === new Date().getFullYear() && month > new Date().getMonth() + 1);

  const fetchData = async () => {
    if (!selectedOrgId) return;
    setLoading(true);
    // Clear previous data while loading
    setPlan({ year, month, dawatTarget: 0, dawatAchieved: 0, activistTarget: 0, activistAchieved: 0, memberTarget: 0, memberAchieved: 0, programTarget: 0, programAchieved: 0, programDetails: '', donationTarget: 0, donationAchieved: 0 });
    setCompReport({ unitDawat: {}, personalDawat: {}, generalMeeting: {}, publicRelations: {}, departmentalInfo: {}, dawahPublication: {}, finance: {}, miscellaneous: {}, prCampaign: {} });
    
    try {
      // Fetch Basic Plan (Allowed for future)
      const planRes = await fetch(`http://localhost:3001/planning/organization/${selectedOrgId}?year=${year}&month=${month}`, {
        headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {}
      });
      if (planRes.status === 401 || planRes.status === 403) {
        window.location.href = "/login";
        return;
      }
      if (planRes.ok) {
        const text = await planRes.text();
        const data = text ? JSON.parse(text) : null;
        if (data && data.length > 0) setPlan(data[0]);
      }

      // Skip Comprehensive Report for future months
      if (isFuture) {
        setCompReport({ unitDawat: {}, personalDawat: {}, generalMeeting: {}, publicRelations: {}, departmentalInfo: {}, dawahPublication: {}, finance: {}, miscellaneous: {}, prCampaign: {} });
      } else {
        const compRes = await fetch(`http://localhost:3001/comprehensive-report/organization/${selectedOrgId}?year=${year}&month=${month}`, {
          headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {}
        });
        if (compRes.status === 401 || compRes.status === 403) {
           window.location.href = "/login";
           return;
        }
        if (compRes.ok) {
          const text = await compRes.text();
          const data = text ? JSON.parse(text) : null;
          if (data) setCompReport(data);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isMounted) {
      fetchData();
    }
  }, [selectedOrgId, year, month, accessToken, isMounted]);

  const handleSavePlan = async () => {
    // Planning for future is usually allowed, but if the user wants to block all "writing" upfront:
    // If they meant only "Report", I'll keep Plan allowed. If they meant both, I'll block both.
    // Given the request "report of after current month", I will only block Comp Report and Basic Achievements.
    if (!selectedOrgId) return;
    try {
      setSaving(true);
      const res = await fetch(`http://localhost:3001/planning`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}) },
        body: JSON.stringify({ organizationId: selectedOrgId, ...plan })
      });
      if (res.status === 401 || res.status === 403) {
        toast.error("Session expired. Please login again.");
        window.location.href = "/login";
        return;
      }
      if (res.ok) {
        const text = await res.text();
        const data = text ? JSON.parse(text) : null;
        if (data) {
          setPlan(data);
          toast.success("Plan saved successfully!");
        }
      } else {
        const text = await res.text();
        toast.error(`Failed to save plan: ${res.status} ${text}`);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveCompSection = async (sectionName: string, sectionData: any) => {
    const isFuture = year > new Date().getFullYear() || (year === new Date().getFullYear() && month > new Date().getMonth() + 1);
    if (isFuture) {
      toast.error('Reporting for future months is not allowed.');
      return;
    }
    if (!selectedOrgId) {
      toast.error('Error: No organization selected!');
      return;
    }
    try {
      setSaving(true);
      const res = await fetch(`http://localhost:3001/comprehensive-report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}) },
        body: JSON.stringify({
          organizationId: selectedOrgId,
          year,
          month,
          [sectionName]: sectionData
        })
      });
      if (res.status === 401 || res.status === 403) {
        toast.error("Session expired. Please login again.");
        window.location.href = "/login";
        return;
      }
      if (res.ok) {
        const text = await res.text();
        const data = text ? JSON.parse(text) : null;
        if (data) setCompReport(data);
        
        setIsUnitDawatModalOpen(false);
        setIsPersonalDawatModalOpen(false);
        setIsBaitulmalModalOpen(false);
        setIsDeptModalOpen(false);
        setIsMeetingsModalOpen(false);
        setIsSocialModalOpen(false);
        setIsMiscModalOpen(false);
        setIsDawatTablighModalOpen(false);
        setIsDawahPubModalOpen(false);
        setIsProgramModalOpen(false);
        setIsManpowerModalOpen(false);
        setIsDeptManpowerModalOpen(false);
        setIsUnitModalOpen(false);
        setIsStudentModalOpen(false);
        setIsSafarModalOpen(false);
        setIsDonorModalOpen(false);
        setIsOrgMeetingModalOpen(false);
        setIsTarbiyatModalOpen(false);
        setIsHRDModalOpen(false);
        setIsSocialPersonalModalOpen(false);
        setIsSocialGroupModalOpen(false);
        setIsSocialHealthModalOpen(false);
        setIsSocialInstModalOpen(false);
        setIsPoliticalCommModalOpen(false);
        setIsPoliticalProgModalOpen(false);
        setIsNationalDayModalOpen(false);
        setIsElectionModalOpen(false);
        setIsBaitulmalModalOpen(false);
        setIsRemarksModalOpen(false);
        toast.success(`${sectionName} saved successfully!`);
      } else {
        const errorText = await res.text();
        console.error('Save failed:', res.status, errorText);
        toast.error(`Failed to save! Status: ${res.status}. Error: ${errorText}`);
      }
    } catch (e) {
      console.error(e);
      toast.error('An error occurred while saving.');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveMultipleCompSections = async (updates: any) => {
    if (!selectedOrgId) {
      toast.error('Error: No organization selected!');
      return;
    }
    try {
      setSaving(true);
      const res = await fetch(`http://localhost:3001/comprehensive-report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}) },
        body: JSON.stringify({
          organizationId: selectedOrgId,
          year,
          month,
          ...updates
        })
      });
      if (res.status === 401 || res.status === 403) {
        toast.error("Session expired. Please login again.");
        window.location.href = "/login";
        return;
      }
      if (res.ok) {
        const text = await res.text();
        const data = text ? JSON.parse(text) : null;
        if (data) setCompReport(data);
        setIsDawatTablighModalOpen(false);
        toast.success("Saved successfully!");
      } else {
        const errorText = await res.text();
        console.error('Save failed:', res.status, errorText);
        toast.error(`Failed to save! Status: ${res.status}. Error: ${errorText}`);
      }
    } catch (e) {
      console.error(e);
      toast.error('An error occurred while saving.');
    } finally {
      setSaving(false);
    }
  };

  const prevMonth = () => { if (month === 1) { setMonth(12); setYear(y => y - 1); } else setMonth(m => m - 1); };
  const nextMonth = () => { 
    if (month === 12) { setMonth(1); setYear(y => y + 1); } else setMonth(m => m + 1); 
  };

  const handleMonthInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value; // YYYY-MM
    if (!val) return;
    const [y, m] = val.split('-').map(Number);
    setYear(y);
    setMonth(m);
  };

  const setToday = () => {
    const d = new Date();
    setYear(d.getFullYear());
    setMonth(d.getMonth() + 1);
  };

  const formatVal = (val: any) => (val === 0 || val === undefined || val === null) ? '-' : val;

  if (!isMounted) return <div className="flex justify-center p-12"><div className="animate-spin w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full"></div></div>;

  return (
    <div className="space-y-6">
      {/* Header Selectors */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
            <Building className="w-5 h-5 shrink-0" />
          </div>
          <div className="flex-1">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">Organization</label>
            <select value={selectedOrgId || ''} onChange={e => setSelectedOrgId(Number(e.target.value))} className="w-full sm:min-w-[250px] border-none bg-transparent text-gray-900 font-medium text-lg focus:ring-0 p-0 cursor-pointer">
              {organizations.map(org => <option key={org.id} value={org.id}>{org.name} ({org.type})</option>)}
            </select>
          </div>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {!(year === new Date().getFullYear() && month === new Date().getMonth() + 1) && (
            <button 
              onClick={setToday}
              className="px-3 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-bold hover:bg-indigo-100 transition-colors"
            >
              This Month
            </button>
          )}
          <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-xl p-1 flex-1 sm:flex-none justify-between">
            <button onClick={prevMonth} className="p-2 hover:bg-white rounded-lg text-gray-500 transition-colors shadow-sm"><ChevronLeft className="w-4 h-4 shrink-0" /></button>
            <div className="relative group">
              <input 
                type="month" 
                value={`${year}-${month.toString().padStart(2, '0')}`}
                onChange={handleMonthInputChange}
                className="bg-transparent border-none text-gray-700 font-bold text-sm focus:ring-0 cursor-pointer p-1 min-w-[160px] text-center"
              />
            </div>
            <button onClick={nextMonth} className="p-2 hover:bg-white rounded-lg transition-colors shadow-sm text-gray-500"><ChevronRight className="w-4 h-4 shrink-0" /></button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        {/* Tabs */}
        <div className="flex border-b border-gray-100 bg-gray-50/50 p-2 gap-2">
          <button onClick={() => setActiveTab('comprehensive')} className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${activeTab === 'comprehensive' ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-gray-200/50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}>Comprehensive Report</button>
          <button onClick={() => setActiveTab('plan')} className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${activeTab === 'plan' ? 'bg-white text-emerald-600 shadow-sm ring-1 ring-gray-200/50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}>Monthly Plan</button>
          <button onClick={() => setActiveTab('report')} className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${activeTab === 'report' ? 'bg-white text-rose-600 shadow-sm ring-1 ring-gray-200/50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}>Basic Achievements</button>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex justify-center p-12"><div className="animate-spin w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full"></div></div>
          ) : (
            <>
              {isFuture && (activeTab === 'comprehensive' || activeTab === 'report') && (
                <div className="mb-6 bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-4 animate-in fade-in slide-in-from-top-2 duration-500">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                    <Calendar className="w-6 h-6 shrink-0" />
                  </div>
                  <div>
                    <h4 className="font-bold text-amber-900">Reporting Not Available</h4>
                    <p className="text-sm text-amber-700">You cannot modify or submit reports for future months. Please wait until <strong>{monthNames[month - 1]} {year}</strong> arrives to enter achievement data.</p>
                  </div>
                </div>
              )}
              {(activeTab === 'plan' || activeTab === 'report') && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                      <h4 className="font-bold text-gray-800 mb-2">Dawat (Invitation)</h4>
                      <input 
                        type="number" 
                        value={activeTab === 'plan' ? plan.dawatTarget : plan.dawatAchieved} 
                        onChange={e => setPlan({...plan, [activeTab === 'plan' ? 'dawatTarget' : 'dawatAchieved']: parseInt(e.target.value) || 0})} 
                        disabled={isFuture && activeTab === 'report'}
                        className={`w-full border border-gray-200 rounded-lg p-3 ${isFuture && activeTab === 'report' ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`} 
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button 
                      onClick={handleSavePlan}
                      disabled={saving || (isFuture && activeTab === 'report')}
                      className={`flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold transition-all shadow-lg ${saving || (isFuture && activeTab === 'report') ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                    >
                      <Save className="w-5 h-5 shrink-0" />
                      {saving ? 'Saving...' : 'Save Data'}
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'comprehensive' && (
                <div className="space-y-6">
                  <div className="flex justify-end mb-4">
                    <button 
                      onClick={() => window.open(`/planning-reporting/print?orgId=${selectedOrgId}&year=${year}&month=${month}&token=${accessToken}`, '_blank')}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition-colors shadow-lg"
                    >
                      <Printer className="w-4 h-4 shrink-0" />
                      Print Ward Report
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                     <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100">
                        <p className="text-xs font-bold text-indigo-400 uppercase mb-1">মোট দাওয়াত</p>
                        <p className="text-2xl font-black text-indigo-700">{compReport.headerInfo?.totalReachedCount || 0}</p>
                     </div>
                     <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
                        <p className="text-xs font-bold text-emerald-400 uppercase mb-1">মোট জনসংখ্যা</p>
                        <p className="text-2xl font-black text-emerald-700">{compReport.headerInfo?.totalPopulationCount || 0}</p>
                     </div>
                     <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100">
                        <p className="text-xs font-bold text-amber-400 uppercase mb-1">মাসিক টার্গেট</p>
                        <p className="text-2xl font-black text-amber-700">{compReport.headerInfo?.monthlyTargetCount || 0}</p>
                     </div>
                  </div>

                  <ReportAccordionSection title="১. দাওয়াত" defaultOpen={true} icon={Megaphone}>
                    <div className="space-y-6">
                      <ReportAccordionSection 
                        title="ক) জনসাধারণের মাঝে সর্বমোট দাওয়াত" 
                        onEdit={isFuture ? undefined : () => setIsDawatTablighModalOpen(true)} 
                        defaultOpen={true}
                        buttonText="দাওয়াত এডিট"
                        icon={Users}
                      >
                    <div className="space-y-8">
                      {/* Section 1 */}
                      <div>
                        <h4 className="text-sm font-bold text-gray-700 mb-3">১. ইউনিটে নিয়মিত গ্রুপভিত্তিক দাওয়াত:</h4>
                        <table className="w-full border-collapse border border-gray-200 text-sm">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="border border-gray-200 p-2">কতটি গ্রুপ বের হয়েছে</th>
                              <th className="border border-gray-200 p-2">অংশগ্রহণকারীর সংখ্যা</th>
                              <th className="border border-gray-200 p-2">পৌঁছানো হয়েছে</th>
                              <th className="border border-gray-200 p-2">সহযোগী সদস্য হয়েছেন</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border border-gray-200 p-2 text-center">{formatVal(compReport.unitDawat?.groupCount)}</td>
                              <td className="border border-gray-200 p-2 text-center">{formatVal(compReport.unitDawat?.participantCount)}</td>
                              <td className="border border-gray-200 p-2 text-center">{formatVal(compReport.unitDawat?.reachedCount)}</td>
                              <td className="border border-gray-200 p-2 text-center">{formatVal(compReport.unitDawat?.associateCount)}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* Section 2 */}
                      <div>
                        <h4 className="text-sm font-bold text-gray-700 mb-3">২. ব্যক্তিগত ও টার্গেটভিত্তিক দাওয়াত:</h4>
                        <table className="w-full border-collapse border border-gray-200 text-sm">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="border border-gray-200 p-2">বিবরণ</th>
                              <th className="border border-gray-200 p-2">সদস্য (রুকন)</th>
                              <th className="border border-gray-200 p-2">কর্মী</th>
                              <th className="border border-gray-200 p-2">বিবরণ</th>
                              <th className="border border-gray-200 p-2">মোট সংখ্যা</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border border-gray-200 p-2">ব্যক্তিগতভাবে কাজ করেছেন</td>
                              <td className="border border-gray-200 p-2 text-center">{formatVal(compReport.personalDawat?.rokonWorked)}</td>
                              <td className="border border-gray-200 p-2 text-center">{formatVal(compReport.personalDawat?.karmiWorked)}</td>
                              <td className="border border-gray-200 p-2">পৌঁছানো হয়েছে (মোট)</td>
                              <td className="border border-gray-200 p-2 text-center">{formatVal((compReport.unitDawat?.reachedCount || 0) + (compReport.generalMeeting?.totalReached || 0))}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* Section 3 */}
                      <div>
                        <h4 className="text-sm font-bold text-gray-700 mb-3">৩. সাধারণ সভা/দাওয়াতী সভা:</h4>
                        <table className="w-full border-collapse border border-gray-200 text-sm">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="border border-gray-200 p-2">মোট কতজনকে দাওয়াত প্রদান করা হয়েছে</th>
                              <th className="border border-gray-200 p-2">কতজন সহযোগী সদস্য হয়েছেন</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border border-gray-200 p-2 text-center">{formatVal(compReport.generalMeeting?.totalReached)}</td>
                              <td className="border border-gray-200 p-2 text-center">{formatVal(compReport.generalMeeting?.associateCount)}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* Section 4 */}
                      <div>
                        <h4 className="text-sm font-bold text-gray-700 mb-3">৪. গণসংযোগ ও দাওয়াতী অভিযান পালন:</h4>
                        <div className="overflow-x-auto border border-gray-200 rounded-lg">
                          <table className="w-full border-collapse text-sm text-center">
                            <thead>
                              <tr className="bg-gray-50">
                                <th className="border-b border-gray-200 p-2 text-left">বিবরণ</th>
                                <th className="border-b border-l border-gray-200 p-2">মোট গ্রুপ সংখ্যা</th>
                                <th className="border-b border-l border-gray-200 p-2">মোট অংশগ্রহণকারী</th>
                                <th className="border-b border-l border-gray-200 p-2">পৌঁছানো হয়েছে</th>
                                <th className="border-b border-l border-gray-200 p-2">সহযোগী সদস্য</th>
                              </tr>
                            </thead>
                            <tbody>
                              {[
                                { id: 'prDecade', label: 'গণসংযোগ দশক/পক্ষ' },
                                { id: 'districtCampaign', label: 'জেলা/মহঃ ঘোষিত অভিযান' },
                                { id: 'electionWeek', label: 'নির্বাচনী আসনে গণসংযোগ সপ্তাহ' },
                                { id: 'proWeek', label: 'উলামা/পেশাজীবী গণসংযোগ সপ্তাহ' },
                                { id: 'other', label: 'অন্যান্য' }
                              ].map(row => (
                                <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                                  <td className="border-b border-gray-200 p-2 text-left font-medium">{row.label}</td>
                                  <td className="border-b border-l border-gray-200 p-2">{formatVal(compReport.prCampaign?.[row.id]?.groupCount)}</td>
                                  <td className="border-b border-l border-gray-200 p-2">{formatVal(compReport.prCampaign?.[row.id]?.participantCount)}</td>
                                  <td className="border-b border-l border-gray-200 p-2">{formatVal(compReport.prCampaign?.[row.id]?.reachedCount)}</td>
                                  <td className="border-b border-l border-gray-200 p-2">{formatVal(compReport.prCampaign?.[row.id]?.associateCount)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </ReportAccordionSection>

                  {/* Section: Departmental Info */}
                  <ReportAccordionSection title="খ) বিভাগ ভিত্তিক তথ্য" onEdit={isFuture ? undefined : () => setIsDeptModalOpen(true)} buttonText="বিভাগ তথ্য এডিট" icon={LayoutGrid}>
                    <div className="space-y-8">
                      {/* 1. Quran Talim */}
                      <div>
                        <h4 className="text-sm font-bold text-gray-700 mb-3 underline">১. তা&apos;লীমুল কুরআনের মাধ্যমে দাওয়াত:</h4>
                        <table className="w-full border-collapse border border-gray-200 text-sm">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="border border-gray-200 p-2 text-left">বিবরণ</th>
                              <th className="border border-gray-200 p-2">রুকন</th>
                              <th className="border border-gray-200 p-2">কর্মী</th>
                              <th className="border border-gray-200 p-2">মোট</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border border-gray-200 p-2 text-left">কুরআন শিক্ষা প্রদান করেছেন</td>
                              <td className="border border-gray-200 p-2 text-center">{formatVal(compReport.departmentalInfo?.quranTalim?.rokonTeacherCount)}</td>
                              <td className="border border-gray-200 p-2 text-center">{formatVal(compReport.departmentalInfo?.quranTalim?.karmiTeacherCount)}</td>
                              <td className="border border-gray-200 p-2 text-center font-bold">{formatVal((compReport.departmentalInfo?.quranTalim?.rokonTeacherCount || 0) + (compReport.departmentalInfo?.quranTalim?.karmiTeacherCount || 0))}</td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                           <div className="bg-gray-50 p-3 rounded-lg border border-gray-100"><p className="text-xs text-gray-500">গ্রুপ সংখ্যা</p><p className="font-bold">{formatVal(compReport.departmentalInfo?.quranTalim?.groupCount)}</p></div>
                           <div className="bg-gray-50 p-3 rounded-lg border border-gray-100"><p className="text-xs text-gray-500">মক্তব সংখ্যা</p><p className="font-bold">{formatVal(compReport.departmentalInfo?.quranTalim?.maktubCount)}</p></div>
                           <div className="bg-gray-50 p-3 rounded-lg border border-gray-100"><p className="text-xs text-gray-500">তিলওয়াত শিখেছেন</p><p className="font-bold">{formatVal(compReport.departmentalInfo?.quranTalim?.sahihLearnedCount)}</p></div>
                           <div className="bg-gray-50 p-3 rounded-lg border border-gray-100"><p className="text-xs text-gray-500">মুয়াল্লিম</p><p className="font-bold">{formatVal(compReport.departmentalInfo?.quranTalim?.muallimCount)}</p></div>
                        </div>
                      </div>

                      {/* 2. Mahalla */}
                      <div>
                        <h4 className="text-sm font-bold text-gray-700 mb-3 underline">২. মহল্লাভিত্তিক দাওয়াত:</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                           <div className="bg-amber-50 p-3 rounded-lg border border-amber-100"><p className="text-xs text-amber-600">মহল্লা সংখ্যা</p><p className="font-bold">{formatVal(compReport.departmentalInfo?.mahalla?.govtCount)}</p></div>
                           <div className="bg-amber-50 p-3 rounded-lg border border-amber-100"><p className="text-xs text-amber-600">কমিটি সংখ্যা</p><p className="font-bold">{formatVal(compReport.departmentalInfo?.mahalla?.committeeCount)}</p></div>
                           <div className="bg-amber-50 p-3 rounded-lg border border-amber-100"><p className="text-xs text-amber-600">দাওয়াতী মহল্লা</p><p className="font-bold">{formatVal(compReport.departmentalInfo?.mahalla?.specialDawatCount)}</p></div>
                           <div className="bg-amber-50 p-3 rounded-lg border border-amber-100"><p className="text-xs text-amber-600">পৌঁছানো হয়েছে</p><p className="font-bold">{formatVal(compReport.departmentalInfo?.mahalla?.reachedCount)}</p></div>
                           <div className="bg-amber-50 p-3 rounded-lg border border-amber-100"><p className="text-xs text-amber-600">সহযোগী</p><p className="font-bold">{formatVal(compReport.departmentalInfo?.mahalla?.associateCount)}</p></div>
                        </div>
                      </div>

                      {/* 3. Youth */}
                      <div>
                        <h4 className="text-sm font-bold text-gray-700 mb-3 underline">৩. যুব সমাজের মাঝে দাওয়াত:</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                           <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100"><p className="text-xs text-emerald-600">পৌঁছানো হয়েছে</p><p className="font-bold">{formatVal(compReport.departmentalInfo?.youth?.reachedCount)}</p></div>
                           <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100"><p className="text-xs text-emerald-600">সহযোগী</p><p className="font-bold">{formatVal(compReport.departmentalInfo?.youth?.associateCount)}</p></div>
                           <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100"><p className="text-xs text-emerald-600">যুব কমিটি</p><p className="font-bold">{formatVal(compReport.departmentalInfo?.youth?.committeeCount)}</p></div>
                           <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100"><p className="text-xs text-emerald-600">নতুন সমিতি/ক্লাব</p><p className="font-bold">{formatVal(compReport.departmentalInfo?.youth?.clubCount)}</p></div>
                        </div>
                      </div>

                      {/* 4. Professions */}
                      <div>
                        <h4 className="text-sm font-bold text-gray-700 mb-3 underline">৪. বিভিন্ন শ্রেণী-পেশার মানুষের মাঝে দাওয়াত:</h4>
                        <table className="w-full border-collapse border border-gray-200 text-sm text-center">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="border border-gray-200 p-2 text-left">বিবরণ</th>
                              <th className="border border-gray-200 p-2">পৌঁছানো হয়েছে</th>
                              <th className="border border-gray-200 p-2">সহযোগী সদস্য</th>
                              <th className="border border-gray-200 p-2">টার্গেট</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { id: 'political', label: 'রাজনৈতিক ও বিশিষ্ট ব্যক্তিবর্গ' },
                              { id: 'professional', label: 'পেশাজীবী/উলামা-মাশায়েখ' },
                              { id: 'laborer', label: 'শ্রমজীবী' },
                              { id: 'marginalized', label: 'প্রান্তিক জনগোষ্ঠী (অতি দরিদ্র)' },
                              { id: 'nonMuslim', label: 'ভিন্নধর্মাবলম্বী/মিডিয়া কর্মী' }
                            ].map(row => (
                              <tr key={row.id}>
                                <td className="border border-gray-200 p-2 text-left">{row.label}</td>
                                <td className="border border-gray-200 p-2">{formatVal(compReport.departmentalInfo?.professions?.[row.id]?.reached)}</td>
                                <td className="border border-gray-200 p-2">{formatVal(compReport.departmentalInfo?.professions?.[row.id]?.associate)}</td>
                                <td className="border border-gray-200 p-2">{formatVal(compReport.departmentalInfo?.professions?.[row.id]?.target)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* 5, 6, 7 Combined */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div>
                            <h4 className="text-sm font-bold text-gray-700 mb-3 underline">৫. পরিবার ভিত্তিক:</h4>
                            <div className="flex gap-4">
                               <div className="flex-1 bg-gray-50 p-3 rounded-lg border border-gray-100"><p className="text-xs text-gray-500">অংশগ্রহণকারী পরিবার</p><p className="font-bold">{formatVal(compReport.departmentalInfo?.family?.totalCount)}</p></div>
                               <div className="flex-1 bg-gray-50 p-3 rounded-lg border border-gray-100"><p className="text-xs text-gray-500">নতুন পরিবারে দাওয়াত</p><p className="font-bold">{formatVal(compReport.departmentalInfo?.family?.newCount)}</p></div>
                            </div>
                         </div>
                         <div>
                            <h4 className="text-sm font-bold text-gray-700 mb-3 underline">৭. তথ্যপ্রযুক্তি:</h4>
                            <div className="flex gap-4">
                               <div className="flex-1 bg-cyan-50 p-3 rounded-lg border border-cyan-100"><p className="text-xs text-cyan-600">উপযুক্ত জনশক্তি</p><p className="font-bold">{formatVal(compReport.departmentalInfo?.it?.manpowerCount)}</p></div>
                               <div className="flex-1 bg-cyan-50 p-3 rounded-lg border border-cyan-100"><p className="text-xs text-cyan-600">অংশগ্রহণকারী</p><p className="font-bold">{formatVal(compReport.departmentalInfo?.it?.participantCount)}</p></div>
                            </div>
                         </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-gray-700 mb-3 underline">৬. মসজিদ/দাওয়াহ সেন্টার ভিত্তিক দাওয়াত:</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                           <div className="bg-rose-50 p-3 rounded-lg border border-rose-100"><p className="text-xs text-rose-600">মসজিদ সংখ্যা</p><p className="font-bold">{formatVal(compReport.departmentalInfo?.mosque?.totalCount)}</p></div>
                           <div className="bg-rose-50 p-3 rounded-lg border border-rose-100"><p className="text-xs text-rose-600">দাওয়াতী মসজিদ</p><p className="font-bold">{formatVal(compReport.departmentalInfo?.mosque?.dawatCount)}</p></div>
                           <div className="bg-rose-50 p-3 rounded-lg border border-rose-100"><p className="text-xs text-rose-600">দাওয়াহ সেন্টার</p><p className="font-bold">{formatVal(compReport.departmentalInfo?.mosque?.centerCount)}</p></div>
                           <div className="bg-rose-50 p-3 rounded-lg border border-rose-100"><p className="text-xs text-rose-600">তথ্যসেবা কেন্দ্র</p><p className="font-bold">{formatVal(compReport.departmentalInfo?.mosque?.infoCenterCount)}</p></div>
                        </div>
                      </div>
                    </div>
                  </ReportAccordionSection>

                  {/* Section: Dawah & Publication */}
                  <ReportAccordionSection title="গ) দাওয়াহ ও প্রকাশনা:*সংগঠন অনুমোদিত:" onEdit={isFuture ? undefined : () => setIsDawahPubModalOpen(true)} buttonText="দাওয়াহ এডিট" icon={Library}>
                     <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-200 text-sm">
                           <thead>
                              <tr className="bg-gray-50 text-gray-700">
                                 <th className="border border-gray-200 p-2 text-left">বিবরণ</th>
                                 <th className="border border-gray-200 p-2">মোট সংখ্যা</th>
                                 <th className="border border-gray-200 p-2">বৃদ্ধি</th>
                                 <th className="border border-gray-200 p-2 text-left">বিবরণ</th>
                                 <th className="border border-gray-200 p-2">মোট সংখ্যা</th>
                              </tr>
                           </thead>
                           <tbody>
                              <tr>
                                 <td className="border border-gray-200 p-2">পাঠাগার/ বই/ বই বিলি</td>
                                 <td className="border border-gray-200 p-2 text-center">{formatVal(compReport.dawahPublication?.libraryCount)} / {formatVal(compReport.dawahPublication?.bookCount)} / {formatVal(compReport.dawahPublication?.bookDistributedCount)}</td>
                                 <td className="border border-gray-200 p-2 text-center">{formatVal(compReport.dawahPublication?.libraryIncrease)} / {formatVal(compReport.dawahPublication?.bookIncrease)} / {formatVal(compReport.dawahPublication?.bookDistributedIncrease)}</td>
                                 <td className="border border-gray-200 p-2">বইয়ের সফট কপি বিলি</td>
                                 <td className="border border-gray-200 p-2 text-center font-bold">{formatVal(compReport.dawahPublication?.softCopyDistributed)}</td>
                              </tr>
                              <tr>
                                 <td className="border border-gray-200 p-2 text-left">ইউনিটে বই বিলিকেন্দ্র/বই বিলি</td>
                                 <td className="border border-gray-200 p-2 text-center">{formatVal(compReport.dawahPublication?.unitCenterCount)} / {formatVal(compReport.dawahPublication?.unitBookDistributed)}</td>
                                 <td className="border border-gray-200 p-2 text-center">{formatVal(compReport.dawahPublication?.unitCenterIncrease)} / {formatVal(compReport.dawahPublication?.unitBookDistributedIncrease)}</td>
                                 <td className="border border-gray-200 p-2">দাওয়াতী লিংক বিতরণ</td>
                                 <td className="border border-gray-200 p-2 text-center font-bold">{formatVal(compReport.dawahPublication?.dawatLinkDistributed)}</td>
                              </tr>
                              <tr>
                                 <td className="border border-gray-200 p-2 text-left">ওয়ার্ডে বই বিক্রয় কেন্দ্র /বই বিক্রয়</td>
                                 <td className="border border-gray-200 p-2 text-center">{formatVal(compReport.dawahPublication?.wardCenterCount)} / {formatVal(compReport.dawahPublication?.wardBookSold)}</td>
                                 <td className="border border-gray-200 p-2 text-center">{formatVal(compReport.dawahPublication?.wardCenterIncrease)} / {formatVal(compReport.dawahPublication?.wardBookSoldIncrease)}</td>
                                 <td className="border border-gray-200 p-2">সোনার বাংলা/সংগ্রাম/পৃথিবী</td>
                                 <td className="border border-gray-200 p-2 text-center font-bold">{formatVal(compReport.dawahPublication?.sonarBanglaCount)} / {formatVal(compReport.dawahPublication?.sangramCount)} / {formatVal(compReport.dawahPublication?.prithibiCount)}</td>
                              </tr>
                           </tbody>
                        </table>
                     </div>
                  </ReportAccordionSection>

                  {/* Section: Program Implementation */}
                  <ReportAccordionSection title="ঘ) কর্মসূচি বাস্তবায়ন" onEdit={isFuture ? undefined : () => setIsProgramModalOpen(true)} buttonText="কর্মসূচি এডিট" icon={CalendarCheck}>
                     <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-200 text-sm">
                           <thead>
                              <tr className="bg-gray-50 text-gray-700">
                                 <th className="border border-gray-200 p-2 text-left">ক্রম</th>
                                 <th className="border border-gray-200 p-2 text-left">কর্মসূচীর বিবরণ</th>
                                 <th className="border border-gray-200 p-2">মোট সংখ্যা</th>
                                 <th className="border border-gray-200 p-2">টার্গেট</th>
                                 <th className="border border-gray-200 p-2">গড় উপস্থিতি</th>
                              </tr>
                           </thead>
                           <tbody>
                              {[
                                 { id: 'monthlyMeeting', sl: '১.', label: 'ইউনিটে মাসিক সাধারণ সভা/পারিবারিক সভা', fields: ['general', 'family'] },
                                 { id: 'dawahMeeting', sl: '২.', label: 'দাওয়াতী সভা/আলোচনা সভা/সুধী সমাবেশ', fields: ['dawah', 'discussion', 'gathering'] },
                                 { id: 'siratunnabi', sl: '৩.', label: 'সীরাতুন্নবী (সাঃ) মাহফিল/ ঈদ পুনর্মিলনী', fields: ['sirat', 'eid'] },
                                 { id: 'darsTafsir', sl: '৪.', label: 'দারস্/তাফসীর/দাওয়াতি জনসভা', fields: ['dars', 'tafsir', 'public'] },
                                 { id: 'iftar', sl: '৫.', label: 'ইফতার মাহফিল (ব্যক্তিগত/সাংগঠনিক)', fields: ['personal', 'org'] },
                                 { id: 'teaCircle', sl: '৬.', label: 'চা চক্র/সামষ্টিক খাওয়া/শিক্ষা সফর', fields: ['tea', 'lunch', 'tour'] },
                                 { id: 'competition', sl: '৭.', label: 'কিরাত/হামদ না’ত প্রতিযোগিতা/ অন্যান্য', fields: ['comp', 'other'] }
                              ].map(row => (
                                 <tr key={row.id}>
                                    <td className="border border-gray-200 p-2 text-center">{row.sl}</td>
                                    <td className="border border-gray-200 p-2">{row.label}</td>
                                    <td className="border border-gray-200 p-2 text-center">
                                       {row.fields.map((f, idx) => (
                                          <React.Fragment key={f}>
                                             {idx > 0 && ' / '}
                                             {formatVal(compReport.programs?.[row.id]?.total?.[f])}
                                          </React.Fragment>
                                       ))}
                                    </td>
                                    <td className="border border-gray-200 p-2 text-center">
                                       {row.fields.map((f, idx) => (
                                          <React.Fragment key={f}>
                                             {idx > 0 && ' / '}
                                             {formatVal(compReport.programs?.[row.id]?.target?.[f])}
                                          </React.Fragment>
                                       ))}
                                    </td>
                                    <td className="border border-gray-200 p-2 text-center">
                                       {row.fields.map((f, idx) => (
                                          <React.Fragment key={f}>
                                             {idx > 0 && ' / '}
                                             {formatVal(compReport.programs?.[row.id]?.avgAttendance?.[f])}
                                          </React.Fragment>
                                       ))}
                                    </td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                  </ReportAccordionSection>
                    </div>
                  </ReportAccordionSection>

                  <ReportAccordionSection title="২. সংগঠনঃ" icon={Users2}>
                    <div className="space-y-6">
                      <ReportAccordionSection title="১. জনশক্তি" onEdit={isFuture ? undefined : () => setIsManpowerModalOpen(true)} buttonText="জনশক্তি এডিট" icon={UserPlus}>
                         <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-gray-200 text-sm text-center">
                               <thead>
                                  <tr className="bg-gray-50 text-gray-700">
                                     <th className="border border-gray-200 p-2 text-left">জনশক্তির ধরণ</th>
                                     <th className="border border-gray-200 p-2">বিগত সংখ্যা</th>
                                     <th className="border border-gray-200 p-2">বর্তমান সংখ্যা</th>
                                     <th className="border border-gray-200 p-2">বৃদ্ধি (মানোন্নয়ন / আগত)</th>
                                     <th className="border border-gray-200 p-2">ঘাটতি</th>
                                     <th className="border border-gray-200 p-2">টার্গেট</th>
                                  </tr>
                               </thead>
                               <tbody>
                                  {[
                                     { id: 'rokon', label: 'সর্বমোট সদস্য (রুকন)' },
                                     { id: 'rokonCandidate', label: 'সর্বমোট সদস্য(রুকন) প্রার্থী' },
                                     { id: 'karmi', label: 'সর্বমোট কর্মী' },
                                     { id: 'associate', label: 'সর্বমোট সক্রিয় সহযোগী সদস্য' }
                                  ].map(row => (
                                     <tr key={row.id}>
                                        <td className="border border-gray-200 p-2 text-left">{row.label}</td>
                                        <td className="border border-gray-200 p-2">{formatVal(compReport.manpower?.[row.id]?.previousCount)}</td>
                                        <td className="border border-gray-200 p-2">{formatVal(compReport.manpower?.[row.id]?.currentCount)}</td>
                                        <td className="border border-gray-200 p-2">{formatVal(compReport.manpower?.[row.id]?.promotionIncrease)} / {formatVal(compReport.manpower?.[row.id]?.arrivedIncrease)}</td>
                                        <td className="border border-gray-200 p-2">{formatVal(compReport.manpower?.[row.id]?.deficit)}</td>
                                        <td className="border border-gray-200 p-2">{formatVal(compReport.manpower?.[row.id]?.target)}</td>
                                     </tr>
                                  ))}
                               </tbody>
                            </table>
                         </div>
                      </ReportAccordionSection>

                      <ReportAccordionSection title="৩. বিভাগভিত্তিক তথ্য" onEdit={isFuture ? undefined : () => setIsDeptManpowerModalOpen(true)} buttonText="বিভাগীয় জনশক্তি এডিট" icon={PieChart}>
                         <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-gray-200 text-xs text-center">
                               <thead>
                                  <tr className="bg-gray-50 text-gray-700">
                                     <th className="border border-gray-200 p-2 text-left">বিভাগসমূহ</th>
                                     <th className="border border-gray-200 p-2 text-left">জনশক্তির ধরণ</th>
                                     <th className="border border-gray-200 p-2">বিগত সংখ্যা</th>
                                     <th className="border border-gray-200 p-2">বর্তমান সংখ্যা</th>
                                     <th className="border border-gray-200 p-2">বৃদ্ধি</th>
                                     <th className="border border-gray-200 p-2">ঘাটতি</th>
                                     <th className="border border-gray-200 p-2">টার্গেট</th>
                                  </tr>
                               </thead>
                               <tbody>
                                  {[
                                     { id: 'labor', label: 'শ্রম' },
                                     { id: 'ulama', label: 'উলামা' },
                                     { id: 'pro', label: 'পেশাজীবী' },
                                     { id: 'youth', label: 'যুব' },
                                     { id: 'nonMuslim', label: 'ভিন্নধর্মাবলম্বী' }
                                  ].map(dept => (
                                     <React.Fragment key={dept.id}>
                                        {[
                                           { id: 'rokon', label: 'সদস্য (রুকন)' },
                                           { id: 'karmi', label: 'কর্মী' },
                                           { id: 'associate', label: 'সহযোগী সদস্য' }
                                        ].map((type, tIdx) => (
                                           <tr key={`${dept.id}-${type.id}`}>
                                              {tIdx === 0 && (
                                                 <td className="border border-gray-200 p-2 text-left font-bold bg-gray-50/30" rowSpan={3}>{dept.label}</td>
                                              )}
                                              <td className="border border-gray-200 p-2 text-left font-medium">{type.label}</td>
                                              <td className="border border-gray-200 p-2">{formatVal(compReport.deptManpower?.[dept.id]?.[type.id]?.previousCount)}</td>
                                              <td className="border border-gray-200 p-2">{formatVal(compReport.deptManpower?.[dept.id]?.[type.id]?.currentCount)}</td>
                                              <td className="border border-gray-200 p-2">{formatVal(compReport.deptManpower?.[dept.id]?.[type.id]?.increase)}</td>
                                              <td className="border border-gray-200 p-2">{formatVal(compReport.deptManpower?.[dept.id]?.[type.id]?.deficit)}</td>
                                              <td className="border border-gray-200 p-2">{formatVal(compReport.deptManpower?.[dept.id]?.[type.id]?.target)}</td>
                                           </tr>
                                        ))}
                                     </React.Fragment>
                                  ))}
                               </tbody>
                            </table>
                         </div>
                      </ReportAccordionSection>

                      {/* ৫. দাওয়াতী ও পারিবারিক ইউনিট */}
                      <ReportAccordionSection title="৫. দাওয়াতী ও পারিবারিক ইউনিট" onEdit={isFuture ? undefined : () => setIsUnitModalOpen(true)} buttonText="ইউনিট তথ্য এডিট" icon={Home}>
                         <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-gray-200 text-sm text-center">
                               <thead>
                                  <tr className="bg-gray-50 text-gray-700">
                                     <th className="border border-gray-200 p-2 text-left">ইউনিটের ধরণ</th>
                                     <th className="border border-gray-200 p-2">বিগত সংখ্যা</th>
                                     <th className="border border-gray-200 p-2">বর্তমান সংখ্যা</th>
                                     <th className="border border-gray-200 p-2">বৃদ্ধি</th>
                                     <th className="border border-gray-200 p-2">ঘাটতি</th>
                                     <th className="border border-gray-200 p-2">টার্গেট</th>
                                  </tr>
                               </thead>
                               <tbody>
                                  {['dawahUnit', 'familyUnit'].map(id => (
                                     <tr key={id}>
                                        <td className="border border-gray-200 p-2 text-left">{id === 'dawahUnit' ? 'দাওয়াতী ইউনিট' : 'পারিবারিক ইউনিট'}</td>
                                        <td className="border border-gray-200 p-2">{formatVal(compReport.unitStats?.[id]?.previousCount)}</td>
                                        <td className="border border-gray-200 p-2">{formatVal(compReport.unitStats?.[id]?.currentCount)}</td>
                                        <td className="border border-gray-200 p-2">{formatVal(compReport.unitStats?.[id]?.increase)}</td>
                                        <td className="border border-gray-200 p-2">{formatVal(compReport.unitStats?.[id]?.deficit)}</td>
                                        <td className="border border-gray-200 p-2">{formatVal(compReport.unitStats?.[id]?.target)}</td>
                                     </tr>
                                  ))}
                               </tbody>
                            </table>
                         </div>
                      </ReportAccordionSection>

                      {/* ৬. বিদায়ী ছাত্র জনশক্তি */}
                      <ReportAccordionSection title="৬. বিদায়ী ছাত্র জনশক্তির সংগঠনে যোগদান:" onEdit={isFuture ? undefined : () => setIsStudentModalOpen(true)} buttonText="ছাত্র তথ্য এডিট" icon={GraduationCap}>
                         <div className="grid grid-cols-3 gap-4">
                            <div className="bg-white p-4 border rounded shadow-sm text-center">
                               <div className="text-xs text-gray-500 font-bold uppercase mb-1">সদস্য</div>
                               <div className="text-xl font-bold">{formatVal(compReport.studentJoining?.rokonCount)}</div>
                            </div>
                            <div className="bg-white p-4 border rounded shadow-sm text-center">
                               <div className="text-xs text-gray-500 font-bold uppercase mb-1">সাথী</div>
                               <div className="text-xl font-bold">{formatVal(compReport.studentJoining?.companionCount)}</div>
                            </div>
                            <div className="bg-white p-4 border rounded shadow-sm text-center">
                               <div className="text-xs text-gray-500 font-bold uppercase mb-1">কর্মী</div>
                               <div className="text-xl font-bold">{formatVal(compReport.studentJoining?.karmiCount)}</div>
                            </div>
                         </div>
                      </ReportAccordionSection>

                      {/* ৭. সফর */}
                      <ReportAccordionSection title="৭. সফর:" onEdit={isFuture ? undefined : () => setIsSafarModalOpen(true)} buttonText="সফর এডিট" icon={MapPin}>
                         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="flex justify-between items-center p-3 border rounded bg-white">
                               <span className="text-sm font-medium">উর্ধ্বতন দায়িত্বশীলদের সফর:</span>
                               <span className="font-bold text-lg">{formatVal(compReport.safar?.higherAuthoritySafar)}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 border rounded bg-white">
                               <span className="text-sm font-medium">ওয়ার্ড সভাপতির সফর:</span>
                               <span className="font-bold text-lg">{formatVal(compReport.safar?.wardPresidentSafar)}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 border rounded bg-white">
                               <span className="text-sm font-medium">টিম সদস্যদের সফর:</span>
                               <span className="font-bold text-lg">{formatVal(compReport.safar?.teamMemberSafar)}</span>
                            </div>
                         </div>
                      </ReportAccordionSection>

                      {/* ৮. ইয়ানত দাতা */}
                      <ReportAccordionSection title="৮. ইয়ানত দাতা (সহযোগী সদস্য/সুধী):" onEdit={isFuture ? undefined : () => setIsDonorModalOpen(true)} buttonText="দাতা তথ্য এডিট" icon={HandCoins}>
                         <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col items-center p-4 border rounded bg-amber-50/30">
                               <span className="text-xs text-amber-700 font-bold uppercase mb-2">নতুন ইয়ানত দাতা (সংখ্যা)</span>
                               <span className="text-2xl font-bold">{formatVal(compReport.donors?.newCount)}</span>
                            </div>
                            <div className="flex flex-col items-center p-4 border rounded bg-emerald-50/30">
                               <span className="text-xs text-emerald-700 font-bold uppercase mb-2">অর্থের পরিমাণ</span>
                               <span className="text-2xl font-bold">{formatVal(compReport.donors?.amount)} ৳</span>
                            </div>
                         </div>
                      </ReportAccordionSection>

                      {/* ৯. সাংগঠনিক বৈঠকাদি */}
                      <ReportAccordionSection title="৯. সাংগঠনিক বৈঠকাদি:" onEdit={isFuture ? undefined : () => setIsOrgMeetingModalOpen(true)} buttonText="বৈঠক এডিট" icon={MessagesSquare}>
                         <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-gray-200 text-xs text-center">
                               <thead>
                                  <tr className="bg-gray-50 text-gray-700">
                                     <th className="border border-gray-200 p-2 text-left">ক্রম</th>
                                     <th className="border border-gray-200 p-2 text-left">বৈঠকের ধরণ</th>
                                     <th className="border border-gray-200 p-2">সংখ্যা</th>
                                     <th className="border border-gray-200 p-2">টার্গেট</th>
                                     <th className="border border-gray-200 p-2">গড় উপস্থিতি</th>
                                  </tr>
                               </thead>
                               <tbody>
                                  {[
                                     { id: 'wardTeam', sl: '১.', label: 'ওয়ার্ড টিম বৈঠক', f: ['val'] },
                                     { id: 'wardMeeting', sl: '২.', label: 'ওয়ার্ড বৈঠক (মাসিক ইউনিট দায়িত্বশীল)', f: ['val'] },
                                     { id: 'memberMeeting', sl: '৩.', label: 'ওয়ার্ডভিত্তিক মাসিক সদস্য (রুকন)', f: ['val'] },
                                     { id: 'karmiMeeting', sl: '৪.', label: 'ইউনিটে কর্মী বৈঠক/পারিবারিক বৈঠক', f: ['karmi', 'family'] },
                                     { id: 'karmiConference', sl: '৫.', label: 'ওয়ার্ড পর্যায়ে কর্মী সম্মেলন', f: ['val'] },
                                     { id: 'deptMeeting', sl: '৬.', label: 'উলামা/যুব/শ্রমিক বৈঠক/সমাবেশ', f: ['ulama', 'youth', 'labor'] },
                                     { id: 'associateGathering', sl: '৭.', label: 'সহযোগী সদস্য সমাবেশ/সম্মেলন', f: ['val'] },
                                     { id: 'activeAssociateGathering', sl: '৮.', label: 'সক্রিয় সহযোগী সদস্য সমাবেশ', f: ['val'] },
                                     { id: 'others', sl: '৯.', label: 'অন্যান্য', f: ['val'] }
                                  ].map(row => (
                                     <tr key={row.id}>
                                        <td className="border border-gray-200 p-2 text-center">{row.sl}</td>
                                        <td className="border border-gray-200 p-2 text-left">{row.label}</td>
                                        <td className="border border-gray-200 p-2">
                                           {row.f.map((sub, idx) => (
                                              <React.Fragment key={sub}>
                                                 {idx > 0 && ' / '}
                                                 {formatVal(compReport.orgMeetings?.[row.id]?.count?.[sub])}
                                              </React.Fragment>
                                           ))}
                                        </td>
                                        <td className="border border-gray-200 p-2">
                                           {row.f.map((sub, idx) => (
                                              <React.Fragment key={sub}>
                                                 {idx > 0 && ' / '}
                                                 {formatVal(compReport.orgMeetings?.[row.id]?.target?.[sub])}
                                              </React.Fragment>
                                           ))}
                                        </td>
                                        <td className="border border-gray-200 p-2">
                                           {row.f.map((sub, idx) => (
                                              <React.Fragment key={sub}>
                                                 {idx > 0 && ' / '}
                                                 {formatVal(compReport.orgMeetings?.[row.id]?.avgAttendance?.[sub])}
                                              </React.Fragment>
                                           ))}
                                        </td>
                                     </tr>
                                  ))}
                               </tbody>
                            </table>
                         </div>
                      </ReportAccordionSection>
                    </div>
                  </ReportAccordionSection>

                  <ReportAccordionSection title="৩. প্রশিক্ষণঃ" icon={GraduationCap}>
                    <div className="space-y-6">
                      <ReportAccordionSection title="ক) তারবিয়াত (নৈতিক শিক্ষা ও সাংগঠনিক প্রশিক্ষণ):" onEdit={isFuture ? undefined : () => setIsTarbiyatModalOpen(true)} buttonText="তারবিয়াত এডিট" icon={Heart}>
                         <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-gray-200 text-xs text-center">
                               <thead>
                                  <tr className="bg-gray-50 text-gray-700">
                                     <th className="border border-gray-200 p-2 text-left">ক্রম</th>
                                     <th className="border border-gray-200 p-2 text-left">বৈঠকের ধরণ</th>
                                     <th className="border border-gray-200 p-2">সংখ্যা</th>
                                     <th className="border border-gray-200 p-2">টার্গেট</th>
                                     <th className="border border-gray-200 p-2">গড় উপস্থিতি</th>
                                  </tr>
                               </thead>
                               <tbody>
                                  {[
                                     { id: 'unitTarbiyat', sl: '১.', label: 'ইউনিটে তারবিয়াতী বৈঠক', f: ['val'] },
                                     { id: 'wardTarbiyat', sl: '২.', label: 'ওয়ার্ডভিত্তিক কর্মীদের শিক্ষা বৈঠক', f: ['val'] },
                                     { id: 'higherTarbiyat', sl: '৩.', label: 'উর্ধ্বতন সংগঠনের শিক্ষা শিবির/বৈঠক', f: ['val'] },
                                     { id: 'publicTarbiyat', sl: '৪.', label: 'গণশিক্ষা বৈঠক/ গণ নৈশ ইবাদত', f: ['val'] },
                                     { id: 'discussionCircle', sl: '৫.', label: 'আলোচনা চক্র', f: ['group', 'session'] },
                                     { id: 'quranDars', sl: '৬.', label: 'দারস/সহীহ কুরআন তিলাওয়াত অনুশীলন', f: ['program'] },
                                     { id: 'others', sl: '৭.', label: 'অন্যান্য', f: ['val'] }
                                  ].map(row => (
                                     <tr key={row.id}>
                                        <td className="border border-gray-200 p-2 text-center">{row.sl}</td>
                                        <td className="border border-gray-200 p-2 text-left">{row.label}</td>
                                        <td className="border border-gray-200 p-2">
                                           {row.f.map((sub, idx) => (
                                              <React.Fragment key={sub}>
                                                 {idx > 0 && ' / '}
                                                 {formatVal(compReport.training?.tarbiyat?.[row.id]?.count?.[sub])}
                                              </React.Fragment>
                                           ))}
                                        </td>
                                        <td className="border border-gray-200 p-2">
                                           {row.f.map((sub, idx) => (
                                              <React.Fragment key={sub}>
                                                 {idx > 0 && ' / '}
                                                 {formatVal(compReport.training?.tarbiyat?.[row.id]?.target?.[sub])}
                                              </React.Fragment>
                                           ))}
                                        </td>
                                        <td className="border border-gray-200 p-2">
                                           {row.f.map((sub, idx) => (
                                              <React.Fragment key={sub}>
                                                 {idx > 0 && ' / '}
                                                 {formatVal(compReport.training?.tarbiyat?.[row.id]?.avgAttendance?.[sub])}
                                              </React.Fragment>
                                           ))}
                                        </td>
                                     </tr>
                                  ))}
                               </tbody>
                            </table>
                         </div>
                      </ReportAccordionSection>

                      <ReportAccordionSection title="খ) মানবসম্পদ উন্নয়ন কোর্স সমূহ:" onEdit={isFuture ? undefined : () => setIsHRDModalOpen(true)} buttonText="কোর্স এডিট" icon={Award}>
                         <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-gray-200 text-xs text-center">
                               <thead>
                                  <tr className="bg-gray-50 text-gray-700">
                                     <th className="border border-gray-200 p-2 text-left">ক্রম</th>
                                     <th className="border border-gray-200 p-2 text-left">প্রশিক্ষণ কোর্সের নাম</th>
                                     <th className="border border-gray-200 p-2">পরিচালিত কোর্স সংখ্যা</th>
                                     <th className="border border-gray-200 p-2">কোর্স সম্পন্নকারী সংখ্যা</th>
                                     <th className="border border-gray-200 p-2">অন্য প্রতিষ্ঠান হতে</th>
                                     <th className="border border-gray-200 p-2">মোট কতজন</th>
                                  </tr>
                               </thead>
                               <tbody>
                                  {[
                                     { id: 'dawah', sl: '১.', label: 'দাওয়াহ' },
                                     { id: 'social', sl: '২.', label: 'সমাজকর্ম' },
                                     { id: 'media', sl: '৩.', label: 'মিডিয়া' },
                                     { id: 'it', sl: '৪.', label: 'আইসিটি' },
                                     { id: 'finance', sl: '৫.', label: 'অফিস/ফিন্যান্সিয়াল ম্যানেজমেন্ট' },
                                     { id: 'english', sl: '৬.', label: 'ইংরেজি ভাষা' },
                                     { id: 'arabic', sl: '৭.', label: 'আরবী ভাষা' },
                                     { id: 'technical', sl: '৮.', label: 'ট্রেডভিত্তিক কারিগরি প্রশিক্ষণ' }
                                  ].map(row => (
                                     <tr key={row.id}>
                                        <td className="border border-gray-200 p-2 text-center">{row.sl}</td>
                                        <td className="border border-gray-200 p-2 text-left font-medium">{row.label}</td>
                                        <td className="border border-gray-200 p-2">{formatVal(compReport.training?.hrd?.[row.id]?.conductedCount)}</td>
                                        <td className="border border-gray-200 p-2">{formatVal(compReport.training?.hrd?.[row.id]?.completedCount)}</td>
                                        <td className="border border-gray-200 p-2">{formatVal(compReport.training?.hrd?.[row.id]?.othersCompletedCount)}</td>
                                        <td className="border border-gray-200 p-2 font-bold">{formatVal(compReport.training?.hrd?.[row.id]?.totalCount)}</td>
                                     </tr>
                                  ))}
                               </tbody>
                            </table>
                         </div>
                      </ReportAccordionSection>
                    </div>
                  </ReportAccordionSection>

                  <ReportAccordionSection title="৪. সমাজ সংস্কার ও সমাজ সেবাঃ" icon={HeartHandshake}>
                    <div className="space-y-6">
                      <ReportAccordionSection title="১. ব্যক্তিগত উদ্যোগে সামাজিক কাজ:" onEdit={isFuture ? undefined : () => setIsSocialPersonalModalOpen(true)} buttonText="ব্যক্তিগত কাজ এডিট" icon={User}>
                         <div className="grid grid-cols-2 gap-4">
                            <div className="bg-blue-50/30 p-4 border rounded text-center">
                               <div className="text-xs text-blue-700 font-bold uppercase mb-1">মোট অংশগ্রহণকারী</div>
                               <div className="text-2xl font-bold">{formatVal(compReport.socialWork?.personal?.workerCount)}</div>
                            </div>
                            <div className="bg-emerald-50/30 p-4 border rounded text-center">
                               <div className="text-xs text-emerald-700 font-bold uppercase mb-1">মোট সেবাপ্রাপ্ত</div>
                               <div className="text-2xl font-bold">{formatVal(compReport.socialWork?.personal?.beneficiaryCount)}</div>
                            </div>
                         </div>
                      </ReportAccordionSection>

                      <ReportAccordionSection title="২. সামষ্টিক/সেবা টীমের মাধ্যমে সামাজিক কাজ:" onEdit={isFuture ? undefined : () => setIsSocialGroupModalOpen(true)} buttonText="সামষ্টিক কাজ এডিট" icon={Users}>
                         <div className="space-y-4">
                            <div className="grid grid-cols-3 gap-2">
                               <div className="p-2 border rounded bg-gray-50 text-center">
                                  <div className="text-xs font-bold text-gray-500 uppercase">সাধারণ টীম</div>
                                  <div className="font-bold">{formatVal(compReport.socialWork?.group?.generalTeamCount)}</div>
                               </div>
                               <div className="p-2 border rounded bg-gray-50 text-center">
                                  <div className="text-xs font-bold text-gray-500 uppercase">টেকনিক্যাল টীম</div>
                                  <div className="font-bold">{formatVal(compReport.socialWork?.group?.technicalTeamCount)}</div>
                               </div>
                               <div className="p-2 border rounded bg-gray-50 text-center">
                                  <div className="text-xs font-bold text-gray-500 uppercase">স্বেচ্ছাসেবক টীম</div>
                                  <div className="font-bold">{formatVal(compReport.socialWork?.group?.volunteerTeamCount)}</div>
                               </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                               <table className="w-full border-collapse border border-gray-100 text-xs">
                                  <tbody>
                                     {[
                                        { id: 'smallDev', label: 'উন্নয়নমূলক কাজ/বিরোধ মীমাংসা', f: ['v1', 'v2'] },
                                        { id: 'socialEvent', label: 'সামাজিক অনুষ্ঠান অংশগ্রহণ/সহায়তা', f: ['v1', 'v2'] },
                                        { id: 'humanitarian', label: 'মানবিক সহায়তা/কর্জে হাসানা', f: ['v1', 'v2'] },
                                        { id: 'cleaning', label: 'পরিষ্কার-পরিচ্ছন্নতা/মশক নিধন', f: ['v1', 'v2'] },
                                        { id: 'patientCare', label: 'রোগীর পরিচর্চা/চিকিৎসা সহায়তা', f: ['v1', 'v2'] },
                                        { id: 'bloodDonation', label: 'স্বেচ্ছায় রক্ত দান', f: ['v1', 'v2'] },
                                        { id: 'maternityCare', label: 'মাতৃত্বকালীন সময়ে সেবা', f: ['val'] },
                                        { id: 'newbornGift', label: 'নবজাতক গিফট প্রদান', f: ['val'] },
                                        { id: 'mobileSchool', label: 'ভ্রাম্যমান স্কুল/মক্তব চালু', f: ['val'] },
                                        { id: 'others', label: 'অন্যান্য', f: ['val'] }
                                     ].map(row => (
                                        <tr key={row.id} className="border-b border-gray-100">
                                           <td className="p-1.5 text-left text-gray-600 font-medium">{row.label}</td>
                                           <td className="p-1.5 text-right font-bold">
                                              {row.f.map((sub, idx) => (
                                                 <React.Fragment key={sub}>
                                                    {idx > 0 && ' / '}
                                                    {formatVal(compReport.socialWork?.group?.activities?.[row.id]?.[sub])}
                                                 </React.Fragment>
                                              ))}
                                           </td>
                                        </tr>
                                     ))}
                                  </tbody>
                                </table>
                                <table className="w-full border-collapse border border-gray-100 text-xs">
                                  <tbody>
                                     {[
                                        { id: 'eduHelp', label: 'শিক্ষা সহায়তা প্রদান', f: ['val'] },
                                        { id: 'techService', label: 'টেকনিক্যাল সেবা প্রদান', f: ['v1', 'v2'] },
                                        { id: 'onlineService', label: 'অনলাইনের মাধ্যমে সেবা প্রদান', f: ['val'] },
                                        { id: 'planting', label: 'বৃক্ষরোপণ (মোট কতটি)', f: ['val'] },
                                        { id: 'awareness', label: 'জনসচেতনতামূলক প্রোগ্রাম', f: ['val'] },
                                        { id: 'disasterHelp', label: 'দুর্যোগকালীন সহায়তা প্রদান', f: ['val'] },
                                        { id: 'relief', label: 'ত্রাণ বিতরণ / গোশত বিতরণ', f: ['val'] },
                                        { id: 'nonMuslimService', label: 'ভিন্নধর্মাবলম্বীদের সেবা প্রদান', f: ['v1', 'v2'] },
                                        { id: 'funeral', label: 'মাইয়্যেতের গোসল / জানাযায়', f: ['v1', 'v2'] },
                                        { id: 'employment', label: 'স্বল্প পুঁজিতে কর্মসংস্থান সহায়তা', f: ['val'] }
                                     ].map(row => (
                                        <tr key={row.id} className="border-b border-gray-100">
                                           <td className="p-1.5 text-left text-gray-600 font-medium">{row.label}</td>
                                           <td className="p-1.5 text-right font-bold">
                                              {row.f.map((sub, idx) => (
                                                 <React.Fragment key={sub}>
                                                    {idx > 0 && ' / '}
                                                    {formatVal(compReport.socialWork?.group?.activities?.[row.id]?.[sub])}
                                                 </React.Fragment>
                                              ))}
                                           </td>
                                        </tr>
                                     ))}
                                  </tbody>
                                </table>
                            </div>
                         </div>
                      </ReportAccordionSection>

                      <ReportAccordionSection title="৩. স্বাস্থ্য ও পরিবার কল্যাণমূলক কাজ:" onEdit={isFuture ? undefined : () => setIsSocialHealthModalOpen(true)} buttonText="স্বাস্থ্যসেবা এডিট" icon={Stethoscope}>
                         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="p-3 border rounded bg-amber-50/30">
                               <div className="text-xs font-bold text-amber-700 uppercase">স্বাস্থ্যকর্মী প্রশিক্ষণ</div>
                               <div className="text-xl font-bold">{formatVal(compReport.socialWork?.health?.trainingParticipantCount)}</div>
                            </div>
                            <div className="p-3 border rounded bg-white">
                               <div className="text-xs font-bold text-gray-500 uppercase">সেবায়ে অংশগ্রহণ</div>
                               <div className="text-xl font-bold">{formatVal(compReport.socialWork?.health?.serviceParticipantCount)}</div>
                            </div>
                            <div className="p-3 border rounded bg-white">
                               <div className="text-xs font-bold text-gray-500 uppercase">সেবাপ্রাপ্ত সংখ্যা</div>
                               <div className="text-xl font-bold">{formatVal(compReport.socialWork?.health?.beneficiaryCount)}</div>
                            </div>
                         </div>
                      </ReportAccordionSection>

                      <ReportAccordionSection title="৪. প্রাতিষ্ঠানিক উদ্যোগে সামাজিক কাজ:" onEdit={isFuture ? undefined : () => setIsSocialInstModalOpen(true)} buttonText="প্রতিষ্ঠান এডিট" icon={Building2}>
                         <div className="grid grid-cols-3 gap-4">
                            <div className="p-3 border rounded bg-indigo-50/30 text-center">
                               <div className="text-xs font-bold text-indigo-700 uppercase">মোট প্রতিষ্ঠান</div>
                               <div className="text-xl font-bold">{formatVal(compReport.socialWork?.inst?.totalInstitutions)}</div>
                            </div>
                            <div className="p-3 border rounded bg-white text-center">
                               <div className="text-xs font-bold text-gray-500 uppercase">কাজ হয়েছে</div>
                               <div className="text-xl font-bold">{formatVal(compReport.socialWork?.inst?.activeInstitutions)}</div>
                            </div>
                            <div className="p-3 border rounded bg-white text-center">
                               <div className="text-xs font-bold text-gray-500 uppercase">নতুন চালু</div>
                               <div className="text-xl font-bold">{formatVal(compReport.socialWork?.inst?.newInstitutions)}</div>
                            </div>
                         </div>
                      </ReportAccordionSection>
                    </div>
                  </ReportAccordionSection>

                  <ReportAccordionSection title="৫. রাষ্ট্রীয় সংস্কার ও সংশোধনঃ" icon={Scale}>
                    <div className="space-y-6">
                      <ReportAccordionSection title="১. রাজনৈতিক ও প্রশাসনিক যোগাযোগ:" onEdit={isFuture ? undefined : () => setIsPoliticalCommModalOpen(true)} buttonText="যোগাযোগ এডিট" icon={PhoneCall}>
                         <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-gray-200 text-xs text-center">
                               <thead>
                                  <tr className="bg-gray-50 text-gray-700">
                                     <th className="border border-gray-200 p-2 text-left">যোগাযোগের ধরণ</th>
                                     <th className="border border-gray-200 p-2">মোট কতজন করেছেন</th>
                                     <th className="border border-gray-200 p-2">কতজনের সাথে হয়েছে</th>
                                  </tr>
                               </thead>
                               <tbody>
                                  {[
                                     { id: 'political', label: 'রাজনৈতিক ব্যক্তিবর্গ' },
                                     { id: 'admin', label: 'প্রশাসনিক ব্যক্তিবর্গ' }
                                  ].map(row => (
                                     <tr key={row.id}>
                                        <td className="border border-gray-200 p-2 text-left font-medium">{row.label}</td>
                                        <td className="border border-gray-200 p-2 font-bold">{formatVal(compReport.political?.comm?.[row.id]?.communicatedCount)}</td>
                                        <td className="border border-gray-200 p-2 font-bold">{formatVal(compReport.political?.comm?.[row.id]?.reachedCount)}</td>
                                     </tr>
                                  ))}
                               </tbody>
                            </table>
                         </div>
                      </ReportAccordionSection>

                      <ReportAccordionSection title="২. কর্মসূচি বাস্তবায়ন:" onEdit={isFuture ? undefined : () => setIsPoliticalProgModalOpen(true)} buttonText="কর্মসূচি এডিট" icon={Flag}>
                         <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-gray-200 text-xs text-center">
                               <thead>
                                  <tr className="bg-gray-50 text-gray-700">
                                     <th className="border border-gray-200 p-2 text-left">কর্মসূচির বিবরণ</th>
                                     <th className="border border-gray-200 p-2">মোট সংখ্যা</th>
                                     <th className="border border-gray-200 p-2">গড় উপস্থিতি</th>
                                  </tr>
                               </thead>
                               <tbody>
                                  {[
                                     { id: 'centerProgram', label: 'কেন্দ্র ঘোষিত রাজনৈতিক কর্মসূচি পালন', f: ['val'] },
                                     { id: 'localProgram', label: 'স্থানীয়ভাবে ঘোষিত কর্মসূচি: জনসভা/সমাবেশ/মিছিল', f: ['gathering', 'meeting', 'procession'] },
                                     { id: 'distribution', label: 'পোস্টার/লিফলেট/বুকলেট/স্মারকলিপি বিতরণ', f: ['poster', 'leaflet', 'booklet', 'memorandum'] }
                                  ].map(row => (
                                     <tr key={row.id}>
                                        <td className="border border-gray-200 p-2 text-left font-medium">{row.label}</td>
                                        <td className="border border-gray-200 p-2">
                                           {row.f.map((sub, idx) => (
                                              <React.Fragment key={sub}>
                                                 {idx > 0 && ' / '}
                                                 {formatVal(compReport.political?.prog?.[row.id]?.count?.[sub])}
                                              </React.Fragment>
                                           ))}
                                        </td>
                                        <td className="border border-gray-200 p-2 font-bold">
                                           {row.f.map((sub, idx) => (
                                              <React.Fragment key={sub}>
                                                 {idx > 0 && ' / '}
                                                 {formatVal(compReport.political?.prog?.[row.id]?.avgAttendance?.[sub])}
                                              </React.Fragment>
                                           ))}
                                        </td>
                                     </tr>
                                  ))}
                               </tbody>
                            </table>
                         </div>
                      </ReportAccordionSection>

                      <ReportAccordionSection title="৩. জাতীয় ও আন্তর্জাতিক দিবস পালন:" onEdit={isFuture ? undefined : () => setIsNationalDayModalOpen(true)} buttonText="দিবস তথ্য এডিট" icon={Calendar}>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                               { id: 'independenceDay', label: 'স্বাধীনতা ও জাতীয় দিবস' },
                               { id: 'victoryDay', label: 'বিজয় দিবস' },
                               { id: 'motherLanguageDay', label: 'আন্তর্জাতিক মাতৃভাষা দিবস' },
                               { id: 'others', label: 'অন্যান্য' }
                            ].map(row => (
                               <div key={row.id} className="p-2 border rounded bg-white flex justify-between items-center text-xs">
                                  <span className="font-medium">{row.label}</span>
                                  <div className="flex gap-4">
                                     <div className="text-center">
                                        <div className="text-xs text-gray-500 uppercase">প্রোগ্রাম</div>
                                        <div className="font-bold">{formatVal(compReport.political?.nationalDay?.[row.id]?.programCount)}</div>
                                     </div>
                                     <div className="text-center">
                                        <div className="text-xs text-gray-500 uppercase">উপস্থিতি</div>
                                        <div className="font-bold">{formatVal(compReport.political?.nationalDay?.[row.id]?.avgAttendance)}</div>
                                     </div>
                                  </div>
                               </div>
                            ))}
                         </div>
                      </ReportAccordionSection>

                      <ReportAccordionSection title="৪. জাতীয় ও স্থানীয় নির্বাচনভিত্তিক কার্যক্রম:" onEdit={isFuture ? undefined : () => setIsElectionModalOpen(true)} buttonText="নির্বাচন এডিট" icon={Vote}>
                         <div className="space-y-4">
                            <div className="p-3 border rounded bg-blue-50/30">
                               <div className="text-xs font-bold text-blue-700 uppercase mb-2">কাউন্সিলর নির্বাচন</div>
                               <div className="grid grid-cols-3 gap-2 text-center">
                                  <div><div className="text-xs text-gray-500 uppercase">প্রার্থী</div><div className="font-bold">{formatVal(compReport.political?.election?.councilor?.candidateCount?.val)}</div></div>
                                  <div><div className="text-xs text-gray-500 uppercase">নির্বাচিত</div><div className="font-bold">{formatVal(compReport.political?.election?.councilor?.electedCount?.val)}</div></div>
                                  <div><div className="text-xs text-gray-500 uppercase">২য় অবস্থান</div><div className="font-bold">{formatVal(compReport.political?.election?.councilor?.secondPlaceCount?.val)}</div></div>
                               </div>
                            </div>
                            <div className="overflow-x-auto">
                               <table className="w-full border-collapse border border-gray-200 text-xs text-center">
                                  <thead>
                                     <tr className="bg-gray-50 text-gray-700">
                                        <th className="border border-gray-200 p-2 text-left">প্রস্তুতিমূলক কার্যক্রম</th>
                                        <th className="border border-gray-200 p-2">সংখ্যা</th>
                                        <th className="border border-gray-200 p-2">বৃদ্ধি</th>
                                        <th className="border border-gray-200 p-2">টার্গেট</th>
                                     </tr>
                                  </thead>
                                  <tbody>
                                     {[
                                        { id: 'voteCenter', label: 'ভোট কেন্দ্র (জাতীয়/স্থানীয়)' },
                                        { id: 'voteCenterCommittee', label: 'ভোট কেন্দ্র কমিটি/কেন্দ্র/বুথভিত্তিক ইউনিট' }
                                     ].map(row => (
                                        <tr key={row.id}>
                                           <td className="border border-gray-200 p-2 text-left font-medium">{row.label}</td>
                                           <td className="border border-gray-200 p-2 font-bold">{formatVal(compReport.political?.election?.preparatory?.[row.id]?.count)}</td>
                                           <td className="border border-gray-200 p-2 font-bold">{formatVal(compReport.political?.election?.preparatory?.[row.id]?.increase)}</td>
                                           <td className="border border-gray-200 p-2 font-bold">{formatVal(compReport.political?.election?.preparatory?.[row.id]?.target)}</td>
                                        </tr>
                                     ))}
                                  </tbody>
                               </table>
                            </div>
                            <div className="p-3 border rounded bg-emerald-50/30 flex justify-between items-center">
                               <span className="text-xs font-bold text-emerald-800 uppercase">নির্বাচন পরিচালনা কমিটির বৈঠক সংখ্যা:</span>
                               <span className="text-xl font-bold">{formatVal(compReport.political?.election?.electionCommitteeMeetingCount)}</span>
                            </div>
                         </div>
                      </ReportAccordionSection>
                    </div>
                  </ReportAccordionSection>

                  <ReportAccordionSection title="৬. বায়তুলমাল" onEdit={isFuture ? undefined : () => setIsBaitulmalModalOpen(true)} buttonText="ফিন্যান্স এডিট" icon={Wallet}>
                    <div className="space-y-4">
                       <div className="flex justify-between font-bold text-xs text-gray-600 bg-gray-50 p-2 rounded">
                          <span>ধার্যকৃত নিছাব: {formatVal(compReport.finance?.nisab?.allocated)} /=</span>
                          <span>ওয়াদাকৃত নিছাব: {formatVal(compReport.finance?.nisab?.promised)} /=</span>
                       </div>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {/* Income View */}
                          <div className="space-y-1">
                             <div className="text-center font-bold text-xs bg-emerald-50 text-emerald-700 py-1 rounded">আয়ের বিবরণ</div>
                             {[
                                { id: 'receivedNisab', label: 'প্রাপ্ত নিছাব' },
                                { id: 'directIanat', label: 'সরাসরি ইয়ানত' },
                                { id: 'oneTime', label: 'এককালীন /জরুরী' },
                                { id: 'electionFund', label: 'নির্বাচনী ফান্ড' },
                                { id: 'shahidFund', label: 'শহীদ ফান্ড' },
                                { id: 'floodCollection', label: 'বিশেষ ও বন্যার্তদের কালেকশন' },
                                { id: 'socialWork', label: 'সমাজকল্যাণ ও সমাজসেবা' },
                                { id: 'zakat', label: 'যাকাত' },
                                { id: 'fitra', label: 'ফিতরা' },
                                { id: 'iftar', label: 'ইফতার' },
                                { id: 'delegateFee', label: 'ডেলিগেট ফি' }
                             ].map(item => (
                                <div key={item.id} className="flex justify-between text-xs border-b border-gray-50 py-1">
                                   <span>{item.label}</span>
                                   <span className="font-medium">{formatVal(compReport.finance?.income?.[item.id])}</span>
                                </div>
                             ))}
                             <div className="flex justify-between text-xs font-bold text-emerald-700 pt-1">
                                <span>মোট আয় =</span>
                                <span>{formatVal(compReport.finance?.income?.totalIncome)} /=</span>
                             </div>
                             <div className="flex justify-between text-xs py-1">
                                <span>গত মাসের উদ্বৃত্ত =</span>
                                <span>{formatVal(compReport.finance?.income?.previousMonthSurplus)} /=</span>
                             </div>
                             <div className="flex justify-between text-xs font-bold bg-emerald-100 p-1.5 rounded">
                                <span>সর্বমোট আয় =</span>
                                <span>{formatVal(compReport.finance?.income?.grandTotalIncome)} /=</span>
                             </div>
                          </div>

                          {/* Expense View */}
                          <div className="space-y-1">
                             <div className="text-center font-bold text-xs bg-red-50 text-red-700 py-1 rounded">ব্যয়ের বিবরণ</div>
                             {[
                                { id: 'nisabPaid', label: 'নিসাব পরিশোধ' },
                                { id: 'localExpense', label: 'স্থানীয় খরচ' },
                                { id: 'oneTime', label: 'এককালীন /জরুরী' },
                                { id: 'electionFund', label: 'নির্বাচনী ফান্ড' },
                                { id: 'shahidFund', label: 'শহীদ ফান্ড' },
                                { id: 'floodCollection', label: 'বিশেষ ও বন্যার্তদের কালেকশন' },
                                { id: 'socialWork', label: 'সমাজকল্যাণ ও সমাজসেবা' },
                                { id: 'zakat', label: 'যাকাত' },
                                { id: 'fitra', label: 'ফিতরা' },
                                { id: 'iftar', label: 'ইফতার' },
                                { id: 'delegateFee', label: 'ডেলিগেট ফি' }
                             ].map(item => (
                                <div key={item.id} className="flex justify-between text-xs border-b border-gray-50 py-1">
                                   <span>{item.label}</span>
                                   <span className="font-medium">{formatVal(compReport.finance?.expense?.[item.id])}</span>
                                </div>
                             ))}
                             <div className="flex justify-between text-xs font-bold text-red-700 pt-1">
                                <span>মোট ব্যয় =</span>
                                <span>{formatVal(compReport.finance?.expense?.totalExpense)} /=</span>
                             </div>
                             <div className="flex justify-between text-xs py-1 font-medium text-blue-600">
                                <span>এ মাসের উদ্বৃত্ত =</span>
                                <span className="font-bold">{formatVal(compReport.finance?.expense?.monthlySurplus)} /=</span>
                             </div>
                             <div className="flex justify-between text-xs font-bold bg-red-100 p-1.5 rounded">
                                <span>সর্বমোট ব্যয় =</span>
                                <span>{formatVal(compReport.finance?.income?.grandTotalIncome)} /=</span>
                             </div>
                          </div>
                       </div>
                    </div>
                  </ReportAccordionSection>

                  <ReportAccordionSection title="৭. ওয়ার্ড সভাপতির মন্তব্যঃ" onEdit={isFuture ? undefined : () => setIsRemarksModalOpen(true)} buttonText="মন্তব্য এডিট" icon={ClipboardList}>
                    <div className="space-y-6">
                       <p className="text-xs italic text-gray-500 border-l-2 border-gray-100 pl-3 py-1">
                          এ মাসের মাসিক প্রতিবেদন পেশ করতে সক্ষম হওয়ায় মহান রবের দরবারে শুকরিয়া আদায় করছি। পরিকল্পনা অনুযায়ী যেসব কাজ সম্পন্ন হয়েছে, তা একান্তই মহান প্রভুর রহমতেই সম্ভব হয়েছে। আর যেসব কাজ এখনো সম্পন্ন করা সম্ভব হয়নি, সেক্ষেত্রে প্রধান দায়িত্বশীল হিসেবে আমার সীমাবদ্ধতা ও দুর্বলতাই মূলত দায়ী। পাশাপাশি যে সকল বাস্তব কারণ প্রতিবন্ধকতা সৃষ্টি করেছে, সেগুলোর বিবরণ এবং ময়দানের বিদ্যমান সম্ভাবনাসমূহ নিচে উল্লেখ করা হলো।
                       </p>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-2">
                             <h4 className="font-bold text-xs text-red-700 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-red-500 shrink-0"></span>
                                সমস্যাঃ
                             </h4>
                             <ul className="space-y-1 text-xs text-gray-600">
                                {(compReport.remarks?.problems || ['-', '-', '-', '-', '-']).map((val: string, idx: number) => (
                                   <li key={idx} className="flex gap-2 p-1.5 bg-red-50/30 rounded">
                                      <span className="font-bold text-red-300">{idx + 1}.</span>
                                      <span>{val || '-'}</span>
                                   </li>
                                ))}
                             </ul>
                          </div>
                          <div className="space-y-2">
                             <h4 className="font-bold text-xs text-emerald-700 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                                সম্ভাবনাঃ
                             </h4>
                             <ul className="space-y-1 text-xs text-gray-600">
                                {(compReport.remarks?.opportunities || ['-', '-', '-', '-', '-']).map((val: string, idx: number) => (
                                   <li key={idx} className="flex gap-2 p-1.5 bg-emerald-50/30 rounded">
                                      <span className="font-bold text-emerald-300">{idx + 1}.</span>
                                      <span>{val || '-'}</span>
                                   </li>
                                ))}
                             </ul>
                          </div>
                       </div>
                       <p className="text-xs text-center text-gray-400 font-medium pt-4 border-t border-gray-50 italic">
                          মহান আল্লাহ আমাদের সব সমস্যার ঊর্ধ্বে ওঠার তাওফিক দান করুন, সম্ভাবনাগুলোকে যথাযথভাবে কাজে লাগানোর বুদ্ধি দিন, সুপরিকল্পনা গ্রহণ ও তা বাস্তবায়নে সদা সচেষ্ট রাখুন এবং ময়দানে সিসা ঢালার ন্যায় দৃঢ় ও ঐক্যবদ্ধ হয়ে কেবল তাঁর সন্তুষ্টি অর্জনের চেষ্টা করার তাওফিক দিয়ে আমাদের কবুল করুন। আমিন!
                       </p>
                    </div>
                  </ReportAccordionSection>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      <UnitDawatModal 
        isOpen={isUnitDawatModalOpen} 
        onClose={() => setIsUnitDawatModalOpen(false)} 
        onSave={(data) => handleSaveCompSection('unitDawat', data)}
        initialData={compReport.unitDawat}
        saving={saving}
      />

      <PersonalDawatModal 
        isOpen={isPersonalDawatModalOpen} 
        onClose={() => setIsPersonalDawatModalOpen(false)} 
        onSave={(data) => handleSaveCompSection('personalDawat', data)}
        initialData={compReport.personalDawat}
        saving={saving}
      />

      <BaitulmalModal 
        isOpen={isBaitulmalModalOpen} 
        onClose={() => setIsBaitulmalModalOpen(false)} 
        onSave={(data) => handleSaveCompSection('finance', data)}
        initialData={compReport.finance}
        saving={saving}
      />

      <DepartmentalInfoModal 
        isOpen={isDeptModalOpen} 
        onClose={() => setIsDeptModalOpen(false)} 
        onSave={(data) => handleSaveCompSection('departmentalInfo', data)}
        initialData={compReport.departmentalInfo}
        saving={saving}
      />

      <MeetingsTrainingModal 
        isOpen={isMeetingsModalOpen} 
        onClose={() => setIsMeetingsModalOpen(false)} 
        onSave={(data) => handleSaveCompSection('departmentalInfo', data)} 
        initialData={compReport.departmentalInfo}
        saving={saving}
      />

      <SocialWorkModal 
        isOpen={isSocialModalOpen} 
        onClose={() => setIsSocialModalOpen(false)} 
        onSave={(data) => handleSaveCompSection('departmentalInfo', data)} 
        initialData={compReport.departmentalInfo}
        saving={saving}
      />

      <MiscellaneousModal 
        isOpen={isMiscModalOpen} 
        onClose={() => setIsMiscModalOpen(false)} 
        onSave={(data) => handleSaveCompSection('miscellaneous', data)} 
        initialData={compReport.miscellaneous}
        saving={saving}
      />

      <DawatTablighModal 
        isOpen={isDawatTablighModalOpen} 
        onClose={() => setIsDawatTablighModalOpen(false)} 
        onSave={(data) => {
          handleSaveMultipleCompSections({
            headerInfo: data.headerInfo,
            unitDawat: data.unitDawat,
            personalDawat: data.personalDawat,
            generalMeeting: data.generalMeeting,
            prCampaign: data.prCampaign
          });
        }}
        initialData={{
          headerInfo: compReport.headerInfo,
          unitDawat: compReport.unitDawat,
          personalDawat: compReport.personalDawat,
          generalMeeting: compReport.generalMeeting,
          prCampaign: compReport.prCampaign
        }}
        saving={saving}
      />

      <DawahPublicationModal 
        isOpen={isDawahPubModalOpen} 
        onClose={() => setIsDawahPubModalOpen(false)} 
        onSave={(data) => handleSaveCompSection('dawahPublication', data.publication)}
        initialData={{ publication: compReport.dawahPublication }}
        saving={saving}
      />

      <ProgramImplementationModal 
        isOpen={isProgramModalOpen} 
        onClose={() => setIsProgramModalOpen(false)} 
        onSave={(data) => handleSaveCompSection('programs', data)}
        initialData={compReport.programs}
        saving={saving}
      />

      <ManpowerModal 
        isOpen={isManpowerModalOpen} 
        onClose={() => setIsManpowerModalOpen(false)} 
        onSave={(data) => handleSaveCompSection('manpower', data)}
        initialData={compReport.manpower}
        saving={saving}
      />

      <DeptManpowerModal 
        isOpen={isDeptManpowerModalOpen} 
        onClose={() => setIsDeptManpowerModalOpen(false)} 
        onSave={(data) => handleSaveCompSection('deptManpower', data)}
        initialData={compReport.deptManpower}
        saving={saving}
      />

      <DawahFamilyUnitModal 
        isOpen={isUnitModalOpen} 
        onClose={() => setIsUnitModalOpen(false)} 
        onSave={(data) => handleSaveCompSection('unitStats', data)}
        initialData={compReport.unitStats}
        saving={saving}
      />

      <StudentJoiningModal 
        isOpen={isStudentModalOpen} 
        onClose={() => setIsStudentModalOpen(false)} 
        onSave={(data) => handleSaveCompSection('studentJoining', data)}
        initialData={compReport.studentJoining}
        saving={saving}
      />

      <SafarModal 
        isOpen={isSafarModalOpen} 
        onClose={() => setIsSafarModalOpen(false)} 
        onSave={(data) => handleSaveCompSection('safar', data)}
        initialData={compReport.safar}
        saving={saving}
      />

      <DonorModal 
        isOpen={isDonorModalOpen} 
        onClose={() => setIsDonorModalOpen(false)} 
        onSave={(data) => handleSaveCompSection('donors', data)}
        initialData={compReport.donors}
        saving={saving}
      />

      <OrgMeetingModal 
        isOpen={isOrgMeetingModalOpen} 
        onClose={() => setIsOrgMeetingModalOpen(false)} 
        onSave={(data) => handleSaveCompSection('orgMeetings', data)}
        initialData={compReport.orgMeetings}
        saving={saving}
      />

      <TarbiyatModal 
        isOpen={isTarbiyatModalOpen} 
        onClose={() => setIsTarbiyatModalOpen(false)} 
        onSave={(data) => handleSaveCompSection('training', { ...compReport.training, tarbiyat: data })}
        initialData={compReport.training?.tarbiyat}
        saving={saving}
      />

      <HRDModal 
        isOpen={isHRDModalOpen} 
        onClose={() => setIsHRDModalOpen(false)} 
        onSave={(data) => handleSaveCompSection('training', { ...compReport.training, hrd: data })}
        initialData={compReport.training?.hrd}
        saving={saving}
      />

      <SocialPersonalModal 
        isOpen={isSocialPersonalModalOpen} 
        onClose={() => setIsSocialPersonalModalOpen(false)} 
        onSave={(data) => handleSaveCompSection('socialWork', { ...compReport.socialWork, personal: data })}
        initialData={compReport.socialWork?.personal}
        saving={saving}
      />

      <SocialGroupModal 
        isOpen={isSocialGroupModalOpen} 
        onClose={() => setIsSocialGroupModalOpen(false)} 
        onSave={(data) => handleSaveCompSection('socialWork', { ...compReport.socialWork, group: data })}
        initialData={compReport.socialWork?.group}
        saving={saving}
      />

      <SocialHealthModal 
        isOpen={isSocialHealthModalOpen} 
        onClose={() => setIsSocialHealthModalOpen(false)} 
        onSave={(data) => handleSaveCompSection('socialWork', { ...compReport.socialWork, health: data })}
        initialData={compReport.socialWork?.health}
        saving={saving}
      />

      <SocialInstModal 
        isOpen={isSocialInstModalOpen} 
        onClose={() => setIsSocialInstModalOpen(false)} 
        onSave={(data) => handleSaveCompSection('socialWork', { ...compReport.socialWork, inst: data })}
        initialData={compReport.socialWork?.inst}
        saving={saving}
      />

      <PoliticalCommunicationModal 
        isOpen={isPoliticalCommModalOpen} 
        onClose={() => setIsPoliticalCommModalOpen(false)} 
        onSave={(data) => handleSaveCompSection('political', { ...compReport.political, comm: data })}
        initialData={compReport.political?.comm}
        saving={saving}
      />

      <PoliticalProgramModal 
        isOpen={isPoliticalProgModalOpen} 
        onClose={() => setIsPoliticalProgModalOpen(false)} 
        onSave={(data) => handleSaveCompSection('political', { ...compReport.political, prog: data })}
        initialData={compReport.political?.prog}
        saving={saving}
      />

      <NationalDayModal 
        isOpen={isNationalDayModalOpen} 
        onClose={() => setIsNationalDayModalOpen(false)} 
        onSave={(data) => handleSaveCompSection('political', { ...compReport.political, nationalDay: data })}
        initialData={compReport.political?.nationalDay}
        saving={saving}
      />

      <ElectionActivityModal 
        isOpen={isElectionModalOpen} 
        onClose={() => setIsElectionModalOpen(false)} 
        onSave={(data) => handleSaveCompSection('political', { ...compReport.political, election: data })}
        initialData={compReport.political?.election}
        saving={saving}
      />

      <BaitulmalModal 
        isOpen={isBaitulmalModalOpen} 
        onClose={() => setIsBaitulmalModalOpen(false)} 
        onSave={(data) => handleSaveCompSection('finance', data)}
        initialData={compReport.finance}
        saving={saving}
      />

      <RemarksModal 
        isOpen={isRemarksModalOpen} 
        onClose={() => setIsRemarksModalOpen(false)} 
        onSave={(data) => handleSaveCompSection('remarks', data)}
        initialData={compReport.remarks}
        saving={saving}
      />
    </div>
  );
}
