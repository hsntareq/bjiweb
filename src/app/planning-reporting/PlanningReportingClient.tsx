'use client';

import { DawahFamilyUnitModal } from "@/components/Reporting/Modals/DawahFamilyUnitModal";
import { DawahPublicationModal } from "@/components/Reporting/Modals/DawahPublicationModal";
import { DawatTablighModal } from "@/components/Reporting/Modals/DawatTablighModal";
import { DepartmentalInfoModal } from "@/components/Reporting/Modals/DepartmentalInfoModal";
import { DeptManpowerModal } from "@/components/Reporting/Modals/DeptManpowerModal";
import { DonorModal } from "@/components/Reporting/Modals/DonorModal";
import { ElectionActivityModal } from "@/components/Reporting/Modals/ElectionActivityModal";
import { HRDModal } from "@/components/Reporting/Modals/HRDModal";
import { ManpowerModal } from "@/components/Reporting/Modals/ManpowerModal";
import { MiscellaneousModal } from "@/components/Reporting/Modals/MiscellaneousModal";
import { NationalDayModal } from "@/components/Reporting/Modals/NationalDayModal";
import { OrgMeetingModal } from "@/components/Reporting/Modals/OrgMeetingModal";
import { PersonalDawatModal } from "@/components/Reporting/Modals/PersonalDawatModal";
import { PoliticalCommunicationModal } from "@/components/Reporting/Modals/PoliticalCommunicationModal";
import { PoliticalProgramModal } from "@/components/Reporting/Modals/PoliticalProgramModal";
import { ProgramImplementationModal } from "@/components/Reporting/Modals/ProgramImplementationModal";
import { RemarksModal } from "@/components/Reporting/Modals/RemarksModal";
import { SafarModal } from "@/components/Reporting/Modals/SafarModal";
import { SocialHealthModal } from "@/components/Reporting/Modals/SocialHealthModal";
import { SocialInstModal } from "@/components/Reporting/Modals/SocialInstModal";
import { SocialPersonalModal } from "@/components/Reporting/Modals/SocialPersonalModal";
import { SocialWorkModal } from "@/components/Reporting/Modals/SocialWorkModal";
import { StudentJoiningModal } from "@/components/Reporting/Modals/StudentJoiningModal";
import { TarbiyatModal } from "@/components/Reporting/Modals/TarbiyatModal";
import { UnitDawatModal } from "@/components/Reporting/Modals/UnitDawatModal";
import { UnitOrganizationModal } from "@/components/Reporting/Modals/UnitOrganizationModal";
import { ReportAccordionSection } from "@/components/Reporting/ReportAccordionSection";
import {
	BookOpen,
	Building,
	Calendar,
	CalendarCheck,
	ChevronLeft, ChevronRight,
	Flag,
	GraduationCap,
	HandCoins,
	HeartHandshake,
	Layers,
	LayoutGrid, Library, MapPin, Megaphone, MessagesSquare, PhoneCall, PieChart, Printer, Save, Scale, Stethoscope, User, UserPlus, Users, Users2, Vote, Wallet
} from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BaitulmalModal } from "./Modals/BaitulmalModal";

export default function PlanningReportingClient({ accessToken }: { accessToken: string }) {
	// Social sub-section modal states
	const [isSocialPersonalModalOpen, setIsSocialPersonalModalOpen] = useState(false);
	const [isSocialWorkModalOpen, setIsSocialWorkModalOpen] = useState(false);
	const [isSocialHealthModalOpen, setIsSocialHealthModalOpen] = useState(false);
	const [isSocialInstModalOpen, setIsSocialInstModalOpen] = useState(false);
	const [year, setYear] = useState(new Date().getFullYear());
	const [month, setMonth] = useState(new Date().getMonth() + 1);
	const [organizations, setOrganizations] = useState<{ id: number, name: string, type: string }[]>([]);
	const [selectedOrgId, setSelectedOrgId] = useState<number | null>(null);
	const [isMounted, setIsMounted] = useState(false);

	const [activeTab, setActiveTab] = useState<'plan' | 'report' | 'comprehensive'>('comprehensive');
	const [loading, setLoading] = useState(false);
	const [saving, setSaving] = useState(false);

	// Initialize from localStorage or URL after mount
	useEffect(() => {
		const searchParams = new URLSearchParams(window.location.search);
		const urlOrgId = searchParams.get('orgId');

		const savedYear = localStorage.getItem('reporting_year');
		const savedMonth = localStorage.getItem('reporting_month');
		const savedOrgId = localStorage.getItem('reporting_org_id');

		if (savedYear) setYear(parseInt(savedYear));
		if (savedMonth) setMonth(parseInt(savedMonth));

		if (urlOrgId) {
			setSelectedOrgId(parseInt(urlOrgId));
		} else if (savedOrgId) {
			setSelectedOrgId(parseInt(savedOrgId));
		}

		setIsMounted(true);
	}, []);

	// Update URL and localStorage when selection changes
	useEffect(() => {
		if (isMounted) {
			const url = new URL(window.location.href);
			if (selectedOrgId) {
				url.searchParams.set('orgId', selectedOrgId.toString());
				localStorage.setItem('reporting_org_id', selectedOrgId.toString());
			}
			url.searchParams.set('year', year.toString());
			url.searchParams.set('month', month.toString());

			localStorage.setItem('reporting_year', year.toString());
			localStorage.setItem('reporting_month', month.toString());

			window.history.replaceState({}, '', url.toString());
		}
	}, [selectedOrgId, year, month, isMounted]);

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
	const [isUnitOrgModalOpen, setIsUnitOrgModalOpen] = useState(false);
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
	const [isPoliticalCommModalOpen, setIsPoliticalCommModalOpen] = useState(false);
	const [isPoliticalProgModalOpen, setIsPoliticalProgModalOpen] = useState(false);
	const [isNationalDayModalOpen, setIsNationalDayModalOpen] = useState(false);
	const [isElectionModalOpen, setIsElectionModalOpen] = useState(false);

	const monthNames = [
		"January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
	];

	const flattenOrganizations = (orgs: Organization[]): { id: number, name: string, type: string }[] => {
		let result: { id: number, name: string, type: string }[] = [];
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
		try {
			const [compRes, planRes] = await Promise.all([
				fetch(`http://localhost:3001/comprehensive-report/organization/${selectedOrgId}?year=${year}&month=${month}`, {
					headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
				}),
				fetch(`http://localhost:3001/monthly-plan?month=${year}-${String(month).padStart(2, '0')}`, {
					headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
				})
			]);
			if (compRes.status === 401 || compRes.status === 403) {
				window.location.href = "/login";
				return;
			}
			if (compRes.ok) {
				const text = await compRes.text();
				const data = text ? JSON.parse(text) : null;
				if (data) setCompReport(data);
			}
			if (planRes.ok) {
				const text = await planRes.text();
				const data = text ? JSON.parse(text) : null;
				if (data) setPlan(data);
			}
		} catch (err) {
			console.error("Failed to fetch data", err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (isMounted && selectedOrgId) {
			fetchData();
		}
	}, [selectedOrgId, year, month, isMounted]);

	const handleSaveCompSection = async (section: string, data: any) => {
		if (!selectedOrgId) {
			toast.error('Error: No organization selected!');
			return;
		}
		try {
			setSaving(true);
			const res = await fetch(`http://localhost:3001/comprehensive-report`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}) },
				body: JSON.stringify({ organizationId: selectedOrgId, year, month, [section]: data })
			});
			if (res.status === 401 || res.status === 403) {
				toast.error("Session expired. Please login again.");
				window.location.href = "/login";
				return;
			}
			if (res.ok) {
				const text = await res.text();
				const responseData = text ? JSON.parse(text) : null;
				if (responseData) setCompReport(responseData);
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

	const handleSavePlan = async () => {
		if (!selectedOrgId) {
			toast.error('Error: No organization selected!');
			return;
		}
		try {
			setSaving(true);
			const res = await fetch(`http://localhost:3001/monthly-plan`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}) },
				body: JSON.stringify({ organizationId: selectedOrgId, year, month, ...plan })
			});
			if (res.status === 401 || res.status === 403) {
				toast.error("Session expired. Please login again.");
				window.location.href = "/login";
				return;
			}
			if (res.ok) {
				const text = await res.text();
				const data = text ? JSON.parse(text) : null;
				if (data) setPlan(data);
				toast.success("Plan saved successfully!");
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
		const val = e.target.value;
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
		<div className="space-y-2 sm:space-y-4">
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
												onChange={e => setPlan({ ...plan, [activeTab === 'plan' ? 'dawatTarget' : 'dawatAchieved']: parseInt(e.target.value) || 0 })}
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
											<p className="text-2xl font-black text-indigo-700">
												{compReport.headerInfo?.totalReachedCount || 0}
												<span className="text-[10px] text-indigo-300 ml-2 font-normal italic">{"{{"}totalDawahReached{"}}"}</span>
											</p>
										</div>
										<div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
											<p className="text-xs font-bold text-emerald-400 uppercase mb-1">মোট জনসংখ্যা</p>
											<p className="text-2xl font-black text-emerald-700">
												{compReport.headerInfo?.totalPopulationCount || 0}
												<span className="text-[10px] text-emerald-300 ml-2 font-normal italic">{"{{"}totalPopulationReached{"}}"}</span>
											</p>
										</div>
										<div className="bg-rose-50/50 p-4 rounded-2xl border border-rose-100">
											<p className="text-xs font-bold text-rose-400 uppercase mb-1">মোট সহযোগী সদস্য</p>
											<p className="text-2xl font-black text-rose-700">
												{compReport.headerInfo?.totalAssociateCount || 0}
												<span className="text-[10px] text-rose-300 ml-2 font-normal italic">{"{{"}totalAssociateReached{"}}"}</span>
											</p>
										</div>
									</div>

									<ReportAccordionSection title="১. দাওয়াতঃ" icon={Megaphone}>
										<div className="space-y-4">
										<ReportAccordionSection title="ক) জনসাধারণের মাঝে সর্বমোট দাওয়াত" onEdit={isFuture ? undefined : () => setIsDawatTablighModalOpen(true)} buttonText="দাওয়াত এডিট" icon={Megaphone}>
											<div className="space-y-8">
												{/* Section 1 */}
												<div>
													<h4 className="text-sm font-bold text-gray-700 mb-3 underline">১. ইউনিটের দাওয়াতী গ্রুপ:</h4>
													<table className="w-full border-collapse border border-gray-200 text-sm">
														<thead>
															<tr className="bg-gray-50">
																<th className="border border-gray-200 p-2 text-left">বিবরণ</th>
																<th className="border border-gray-200 p-2">মোট গ্রুপ সংখ্যা</th>
																<th className="border border-gray-200 p-2">মোট অংশগ্রহণকারী</th>
																<th className="border border-gray-200 p-2">পৌঁছানো হয়েছে</th>
																<th className="border border-gray-200 p-2">সহযোগী সদস্য</th>
															</tr>
														</thead>
														<tbody>
															<tr>
																<td className="border border-gray-200 p-2 text-left font-medium">ইউনিটের দাওয়াতী গ্রুপ কাজ</td>
																<td className="border border-gray-200 p-2 text-center">
																	{formatVal(compReport.unitDawat?.groupCount)}
																	<div className="text-[10px] text-gray-400 mt-1">{"{{"}groupDawahCount{"}}"}</div>
																</td>
																<td className="border border-gray-200 p-2 text-center">
																	{formatVal(compReport.unitDawat?.participantCount)}
																	<div className="text-[10px] text-gray-400 mt-1">{"{{"}groupDawahParticipants{"}}"}</div>
																</td>
																<td className="border border-gray-200 p-2 text-center">
																	{formatVal(compReport.unitDawat?.reachedCount)}
																	<div className="text-[10px] text-gray-400 mt-1">{"{{"}groupDawahReached{"}}"}</div>
																</td>
																<td className="border border-gray-200 p-2 text-center">
																	{formatVal(compReport.unitDawat?.associateCount)}
																	<div className="text-[10px] text-gray-400 mt-1">{"{{"}groupDawahNewAssociate{"}}"}</div>
																</td>
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
																<td className="border border-gray-200 p-2">মোট জনশক্তি সংখ্যা</td>
																<td className="border border-gray-200 p-2 text-center">
																	{formatVal(compReport.personalDawat?.rokon?.total)}
																	<div className="text-[10px] text-gray-400 mt-1">{"{{"}personalDawahRokonTotal{"}}"}</div>
																</td>
																<td className="border border-gray-200 p-2 text-center">
																	{formatVal(compReport.personalDawat?.karmi?.total)}
																	<div className="text-[10px] text-gray-400 mt-1">{"{{"}personalDawahKarmiTotal{"}}"}</div>
																</td>
																<td className="border border-gray-200 p-2">কতজনের নিকট পৌঁছানো হয়েছে</td>
																<td className="border border-gray-200 p-2 text-center">
																	{formatVal((compReport.personalDawat?.rokon?.reached || 0) + (compReport.personalDawat?.karmi?.reached || 0))}
																	<div className="text-[10px] text-gray-400 mt-1">{"{{"}personalDawahReached{"}}"}</div>
																</td>
															</tr>
															<tr>
																<td className="border border-gray-200 p-2">কতজন ব্যক্তিগতভাবে দাওয়াতি কাজ করেছেন</td>
																<td className="border border-gray-200 p-2 text-center">
																	{formatVal(compReport.personalDawat?.rokon?.worked)}
																	<div className="text-[10px] text-gray-400 mt-1">{"{{"}personalDawahRokonWorked{"}}"}</div>
																</td>
																<td className="border border-gray-200 p-2 text-center">
																	{formatVal(compReport.personalDawat?.karmi?.worked)}
																	<div className="text-[10px] text-gray-400 mt-1">{"{{"}personalDawahKarmiWorked{"}}"}</div>
																</td>
																<td className="border border-gray-200 p-2">কতজন সহযোগী সদস্য হয়েছেন</td>
																<td className="border border-gray-200 p-2 text-center">
																	{formatVal((compReport.personalDawat?.rokon?.associate || 0) + (compReport.personalDawat?.karmi?.associate || 0))}
																	<div className="text-[10px] text-gray-400 mt-1">{"{{"}personalDawahNewAssociate{"}}"}</div>
																</td>
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
																<td className="border border-gray-200 p-2 text-center">
																	{formatVal(compReport.generalMeeting?.totalReached)}
																	<div className="text-[10px] text-gray-400 mt-1 italic font-normal">{"{{"}generalMeetingTotalReached{"}}"}</div>
																</td>
																<td className="border border-gray-200 p-2 text-center">
																	{formatVal(compReport.generalMeeting?.associateCount)}
																	<div className="text-[10px] text-gray-400 mt-1 italic font-normal">{"{{"}generalMeetingNewAssociate{"}}"}</div>
																</td>
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
																		<td className="border-b border-l border-gray-200 p-2 text-center">
																			{formatVal(compReport.prCampaign?.[row.id]?.groupCount)}
																			<div className="text-[9px] text-gray-400 mt-0.5 font-normal italic">{"{{"}{row.id}Group{"}}"}</div>
																		</td>
																		<td className="border-b border-l border-gray-200 p-2 text-center">
																			{formatVal(compReport.prCampaign?.[row.id]?.participantCount)}
																			<div className="text-[9px] text-gray-400 mt-0.5 font-normal italic">{"{{"}{row.id}Participant{"}}"}</div>
																		</td>
																		<td className="border-b border-l border-gray-200 p-2 text-center">
																			{formatVal(compReport.prCampaign?.[row.id]?.reachedCount)}
																			<div className="text-[9px] text-gray-400 mt-0.5 font-normal italic">{"{{"} {row.id}Reached{"}}"}</div>
																		</td>
																		<td className="border-b border-l border-gray-200 p-2 text-center">
																			{formatVal(compReport.prCampaign?.[row.id]?.associateCount)}
																			<div className="text-[9px] text-gray-400 mt-0.5 font-normal italic">{"{{"} {row.id}Associate{"}}"}</div>
																		</td>
																	</tr>
																))}
															</tbody>
														</table>
													</div>
												</div>
											</div>
										</ReportAccordionSection>
	
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
																<td className="border border-gray-200 p-2 text-center">
																	{formatVal(compReport.departmentalInfo?.quranTalim?.rokonTeacherCount)}
																	<div className="text-[10px] text-gray-400 mt-1 italic">{"{{"}quranTeacherRokon{"}}"}</div>
																</td>
																<td className="border border-gray-200 p-2 text-center">
																	{formatVal(compReport.departmentalInfo?.quranTalim?.karmiTeacherCount)}
																	<div className="text-[10px] text-gray-400 mt-1 italic">{"{{"}quranTeacherKarmi{"}}"}</div>
																</td>
																<td className="border border-gray-200 p-2 text-center font-bold">{formatVal((compReport.departmentalInfo?.quranTalim?.rokonTeacherCount || 0) + (compReport.departmentalInfo?.quranTalim?.karmiTeacherCount || 0))}</td>
															</tr>
															<tr>
																<td className="border border-gray-200 p-2 text-left">কতজনকে কুরআন শিক্ষা প্রদান করা হয়েছে</td>
																<td className="border border-gray-200 p-2 text-center text-gray-400">-</td>
																<td className="border border-gray-200 p-2 text-center text-gray-400">-</td>
																<td className="border border-gray-200 p-2 text-center font-bold">
																	{formatVal(compReport.departmentalInfo?.quranTalim?.reachedCount)}
																	<div className="text-[10px] text-gray-400 mt-1 italic">{"{{"}quranReachedCount{"}}"}</div>
																</td>
															</tr>
														</tbody>
													</table>
												</div>
	
												{/* Professions */}
												<div>
													<h4 className="text-sm font-bold text-gray-700 mb-3 underline">২, ৩, ৪. কর্মজীবী, শ্রমজীবী ও ভিন্নধর্মাবলম্বী দাওয়াত:</h4>
													<table className="w-full border-collapse border border-gray-200 text-sm text-center">
														<thead>
															<tr className="bg-gray-50">
																<th className="border border-gray-200 p-2 text-left">বিভাগসমূহ</th>
																<th className="border border-gray-200 p-2">পৌঁছানো হয়েছে</th>
																<th className="border border-gray-200 p-2">সহযোগী সদস্য</th>
																<th className="border border-gray-200 p-2">টার্গেট</th>
															</tr>
														</thead>
														<tbody>
															{[
																{ id: 'political', label: 'রাজনৈতিক ব্যক্তি/প্রভাবশালী' },
																{ id: 'professional', label: 'পেশাজীবী' },
																{ id: 'laborer', label: 'শ্রমজীবী' },
																{ id: 'marginalized', label: 'প্রান্তিক জনগোষ্ঠী' },
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
																<td className="border border-gray-200 p-2 text-left">{row.label}</td>
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
																<th className="border border-gray-200 p-2">বাস্তবায়নের হার</th>
															</tr>
														</thead>
														<tbody>
															{[
																{ id: 'rokon', label: 'সর্বমোট সদস্য (রুকন)' },
																{ id: 'rokonCandidate', label: 'সর্বমোট সদস্য(রুকন) প্রার্থী' },
																{ id: 'karmi', label: 'সর্বমোট কর্মী' },
																{ id: 'associate', label: 'সর্বমোট সক্রিয় সহযোগী সদস্য' },
																{ id: 'generalAssociate', label: 'সহযোগী সদস্য' }
															].map(row => {
																const rowData = compReport.manpower?.[row.id] || {};
																const target = rowData.target || 0;
																const increase = rowData.promotionIncrease || 0;
																const rate = target > 0 ? Math.round((increase / target) * 100) : 0;

																return (
																	<tr key={row.id}>
																		<td className="border border-gray-200 p-2 text-left">{row.label}</td>
																		<td className="border border-gray-200 p-2">{formatVal(rowData.previousCount)}</td>
																		<td className="border border-gray-200 p-2">{formatVal(rowData.currentCount)}</td>
																		<td className="border border-gray-200 p-2">{formatVal(rowData.promotionIncrease)} / {formatVal(rowData.arrivedIncrease)}</td>
																		<td className="border border-gray-200 p-2">{formatVal(rowData.deficit)}</td>
																		<td className="border border-gray-200 p-2">{formatVal(rowData.target)}</td>
																		<td className="border border-gray-200 p-2">{rate}%</td>
																	</tr>
																);
															})}
														</tbody>
													</table>
												</div>
											</ReportAccordionSection>

											<ReportAccordionSection title="২. সহযোগী সদস্য:" onEdit={isFuture ? undefined : () => setIsManpowerModalOpen(true)} buttonText="সহযোগী সদস্য এডিট" icon={Users}>
												<div className="overflow-x-auto">
													<table className="w-full border-collapse border border-gray-200 text-sm text-center">
														<thead>
															<tr className="bg-gray-50 text-gray-700">
																<th className="border border-gray-200 p-2">বিগত সময়ের সংখ্যা</th>
																<th className="border border-gray-200 p-2">বর্তমান সংখ্যা</th>
																<th className="border border-gray-200 p-2">বৃদ্ধি</th>
																<th className="border border-gray-200 p-2">টার্গেট</th>
																<th className="border border-gray-200 p-2">বাস্তবায়নের হার</th>
															</tr>
														</thead>
														<tbody>
															{(() => {
																const rowData = compReport.manpower?.generalAssociate || {};
																const target = rowData.target || 0;
																const increase = rowData.promotionIncrease || 0;
																const rate = target > 0 ? Math.round((increase / target) * 100) : 0;

																return (
																	<tr>
																		<td className="border border-gray-200 p-2">{formatVal(rowData.previousCount)}</td>
																		<td className="border border-gray-200 p-2">{formatVal(rowData.currentCount)}</td>
																		<td className="border border-gray-200 p-2">{formatVal(rowData.promotionIncrease)}</td>
																		<td className="border border-gray-200 p-2">{formatVal(rowData.target)}</td>
																		<td className="border border-gray-200 p-2">{rate}%</td>
																	</tr>
																);
															})()}
														</tbody>
													</table>
												</div>
											</ReportAccordionSection>

											<ReportAccordionSection title="৩. বিভাগভিত্তিক তথ্য: শ্রম বিভাগ শ্রমিক কল্যাণের রিপোর্ট অনুযায়ী হবে।" onEdit={isFuture ? undefined : () => setIsDeptManpowerModalOpen(true)} buttonText="বিভাগীয় জনশক্তি এডিট" icon={PieChart}>
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
																{ id: "labor", label: "শ্রম*", rows: [{ id: "rokon", label: "সদস্য (রুকন)" }, { id: "karmi", label: "কর্মী" }, { id: "associate", label: "সহযোগী সদস্য" }] },
																{ id: "ulama", label: "উলামা", rows: [{ id: "rokon", label: "সদস্য (রুকন)" }, { id: "karmi", label: "কর্মী" }, { id: "associate", label: "সহযোগী সদস্য" }] },
																{ id: "pro", label: "পেশাজীবী", rows: [{ id: "rokon", label: "সদস্য (রুকন)" }, { id: "karmi", label: "কর্মী" }, { id: "associate", label: "সহযোগী সদস্য" }] },
																{ id: "youth", label: "যুব", rows: [{ id: "rokon", label: "সদস্য (রুকন)" }, { id: "karmi", label: "কর্মী" }, { id: "associate", label: "সহযোগী সদস্য" }] },
																{ id: "nonMuslim", label: "ভিন্নধর্মাবলম্বী", rows: [{ id: "rokon", label: "সদস্য (রুকন)" }, { id: "karmi", label: "কর্মী" }, { id: "associate", label: "সহযোগী সদস্য" }] }
															].map(dept => (
																<React.Fragment key={dept.id}>
																	{dept.rows.map((row, idx) => (
																		<tr key={`${dept.id}-${row.id}`}>
																			{idx === 0 && <td rowSpan={dept.rows.length} className="border border-gray-200 p-2 text-left font-bold">{dept.label}</td>}
																			<td className="border border-gray-200 p-2 text-left">{row.label}</td>
																			<td className="border border-gray-200 p-2">{formatVal(compReport.deptManpower?.[dept.id]?.[row.id]?.previousCount)}</td>
																			<td className="border border-gray-200 p-2">{formatVal(compReport.deptManpower?.[dept.id]?.[row.id]?.currentCount)}</td>
																			<td className="border border-gray-200 p-2">{formatVal(compReport.deptManpower?.[dept.id]?.[row.id]?.increase)}</td>
																			<td className="border border-gray-200 p-2">{formatVal(compReport.deptManpower?.[dept.id]?.[row.id]?.deficit)}</td>
																			<td className="border border-gray-200 p-2">{formatVal(compReport.deptManpower?.[dept.id]?.[row.id]?.target)}</td>
																		</tr>
																	))}
																</React.Fragment>
															))}
														</tbody>
													</table>
												</div>
											</ReportAccordionSection>

											<ReportAccordionSection title="৪. ইউনিট সংগঠন:" onEdit={isFuture ? undefined : () => setIsUnitOrgModalOpen(true)} buttonText="ইউনিট সংগঠন এডিট" icon={LayoutGrid}>
												<div className="overflow-x-auto">
													<table className="w-full border-collapse border border-gray-200 text-xs text-center">
														<thead>
															<tr className="bg-gray-50 text-gray-700">
																<th className="border border-gray-200 p-2 text-left">ইউনিটের ধরণ</th>
																<th className="border border-gray-200 p-2">বিগত সংখ্যা</th>
																<th className="border border-gray-200 p-2">বর্তমান সংখ্যা</th>
																<th className="border border-gray-200 p-2">বৃদ্ধি</th>
																<th className="border border-gray-200 p-2">ঘাটতি</th>
																<th className="border border-gray-200 p-2">টার্গেট</th>
																<th className="border border-gray-200 p-2">বাস্তবায়নের হার</th>
															</tr>
														</thead>
														<tbody>
															{[
																{ id: 'generalMale', label: 'সাধারণ ইউনিট (পুরুষ)' },
																{ id: 'ulama', label: 'উলামা ইউনিট' },
																{ id: 'business', label: 'ব্যবসায়ী ইউনিট' },
																{ id: 'laborWelfare', label: 'শ্রমিক কল্যাণ ইউনিট' },
																{ id: 'youth', label: 'যুব ইউনিট' },
																{ id: 'media', label: 'মিডিয়া ইউনিট' },
																{ id: 'culture', label: 'সাহিত্য ও সংস্কৃতি ইউনিট' },
																{ id: 'total', label: 'সর্বমোট ইউনিট সংখ্যা' }
															].map(row => {
																const data = compReport.unitOrganization?.[row.id] || {};
																const target = data.target || 0;
																const increase = data.increase || 0;
																const rate = target > 0 ? Math.round((increase / target) * 100) : 0;

																return (
																	<tr key={row.id}>
																		<td className="border border-gray-200 p-2 text-left font-medium">{row.label}</td>
																		<td className="border border-gray-200 p-2">{formatVal(data.previousCount)}</td>
																		<td className="border border-gray-200 p-2">{formatVal(data.currentCount)}</td>
																		<td className="border border-gray-200 p-2">{formatVal(data.increase)}</td>
																		<td className="border border-gray-200 p-2">{formatVal(data.deficit)}</td>
																		<td className="border border-gray-200 p-2">{formatVal(data.target)}</td>
																		<td className="border border-gray-200 p-2">{rate}%</td>
																	</tr>
																);
															})}
														</tbody>
													</table>
												</div>
											</ReportAccordionSection>

											<ReportAccordionSection title="৫. দাওয়াতী ও পারিবারিক ইউনিট" onEdit={isFuture ? undefined : () => setIsUnitModalOpen(true)} buttonText="ইউনিট এডিট" icon={Layers}>
												<div className="overflow-x-auto">
													<table className="w-full border-collapse border border-gray-200 text-xs text-center">
														<thead>
															<tr className="bg-gray-50 text-gray-700">
																<th className="border border-gray-200 p-2 text-left">ইউনিটের ধরণ</th>
																<th className="border border-gray-200 p-2">বিগত</th>
																<th className="border border-gray-200 p-2">বর্তমান</th>
																<th className="border border-gray-200 p-2">বৃদ্ধি</th>
																<th className="border border-gray-200 p-2">ঘাটতি</th>
																<th className="border border-gray-200 p-2">টার্গেট</th>
															</tr>
														</thead>
														<tbody>
															{[
																{ id: 'dawahUnit', label: 'দাওয়াতী ইউনিট' },
																{ id: 'familyUnit', label: 'পারিবারিক ইউনিট' }
															].map(row => (
																<tr key={row.id}>
																	<td className="border border-gray-200 p-2 text-left font-medium">{row.label}</td>
																	<td className="border border-gray-200 p-2">{formatVal(compReport.unitStats?.[row.id]?.previousCount)}</td>
																	<td className="border border-gray-200 p-2">{formatVal(compReport.unitStats?.[row.id]?.currentCount)}</td>
																	<td className="border border-gray-200 p-2">{formatVal(compReport.unitStats?.[row.id]?.increase)}</td>
																	<td className="border border-gray-200 p-2">{formatVal(compReport.unitStats?.[row.id]?.deficit)}</td>
																	<td className="border border-gray-200 p-2">{formatVal(compReport.unitStats?.[row.id]?.target)}</td>
																</tr>
															))}
														</tbody>
													</table>
												</div>
											</ReportAccordionSection>

											<ReportAccordionSection title="৬. বিদায়ী ছাত্র জনশক্তির সংগঠনে যোগদান:" onEdit={isFuture ? undefined : () => setIsStudentModalOpen(true)} buttonText="যোগদান এডিট" icon={GraduationCap}>
												<div className="overflow-x-auto">
													<table className="w-full border-collapse border border-gray-200 text-sm text-center">
														<thead>
															<tr className="bg-gray-50 text-gray-700">
																<th className="border border-gray-200 p-2 text-left">বিবরণ</th>
																<th className="border border-gray-200 p-2">সদস্য</th>
																<th className="border border-gray-200 p-2">সাথী</th>
																<th className="border border-gray-200 p-2">কর্মী</th>
															</tr>
														</thead>
														<tbody>
															<tr>
																<td className="border border-gray-200 p-2 text-left font-medium">মোট যোগদানকৃত ছাত্র সংখ্যা</td>
																<td className="border border-gray-200 p-2">{formatVal(compReport.studentJoining?.rokonCount)}</td>
																<td className="border border-gray-200 p-2">{formatVal(compReport.studentJoining?.companionCount)}</td>
																<td className="border border-gray-200 p-2">{formatVal(compReport.studentJoining?.karmiCount)}</td>
															</tr>
														</tbody>
													</table>
												</div>
											</ReportAccordionSection>

											<ReportAccordionSection title="৭. সফর:" onEdit={isFuture ? undefined : () => setIsSafarModalOpen(true)} buttonText="সফর এডিট" icon={MapPin}>
												<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
													<div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100 text-center">
														<p className="text-[10px] text-indigo-600 font-bold uppercase mb-1">উর্ধ্বতন দায়িত্বশীল</p>
														<p className="text-lg font-black text-indigo-700">{formatVal(compReport.safar?.higherAuthoritySafar)}</p>
													</div>
													<div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100 text-center">
														<p className="text-[10px] text-emerald-600 font-bold uppercase mb-1">ওয়ার্ড সভাপতি</p>
														<p className="text-lg font-black text-emerald-700">{formatVal(compReport.safar?.wardPresidentSafar)}</p>
													</div>
													<div className="bg-amber-50 p-3 rounded-lg border border-amber-100 text-center">
														<p className="text-[10px] text-amber-600 font-bold uppercase mb-1">ওয়ার্ড টিম সদস্য</p>
														<p className="text-lg font-black text-amber-700">{formatVal(compReport.safar?.teamMemberSafar)}</p>
													</div>
												</div>
											</ReportAccordionSection>

											<ReportAccordionSection title="৮. ইয়ানত দাতা:" onEdit={isFuture ? undefined : () => setIsDonorModalOpen(true)} buttonText="দাতা এডিট" icon={HandCoins}>
												<div className="overflow-x-auto">
													<table className="w-full border-collapse border border-gray-200 text-sm text-center">
														<thead>
															<tr className="bg-gray-50 text-gray-700">
																<th className="border border-gray-200 p-2 text-left">নতুন ইয়ানত দাতা</th>
																<th className="border border-gray-200 p-2">মোট সংখ্যা</th>
																<th className="border border-gray-200 p-2">অর্থের পরিমাণ</th>
															</tr>
														</thead>
														<tbody>
															<tr>
																<td className="border border-gray-200 p-2 text-left font-medium">সহযোগী সদস্য/সুধী</td>
																<td className="border border-gray-200 p-2">{formatVal(compReport.donors?.newCount)}</td>
																<td className="border border-gray-200 p-2">{formatVal(compReport.donors?.amount)}</td>
															</tr>
														</tbody>
													</table>
												</div>
											</ReportAccordionSection>

											<ReportAccordionSection title="৯. সাংগঠনিক বৈঠকাদি:" onEdit={isFuture ? undefined : () => setIsOrgMeetingModalOpen(true)} buttonText="বৈঠক এডিট" icon={MessagesSquare}>
												<div className="overflow-x-auto">
													<table className="w-full border-collapse border border-gray-200 text-xs text-center">
														<thead>
															<tr className="bg-gray-50 text-gray-700">
																<th className="border border-gray-200 p-2">ক্রম</th>
																<th className="border border-gray-200 p-2 text-left">বৈঠকের ধরণ</th>
																<th className="border border-gray-200 p-2">সংখ্যা</th>
																<th className="border border-gray-200 p-2">টার্গেট</th>
																<th className="border border-gray-200 p-2">গড় উপস্থিতি</th>
															</tr>
														</thead>
														<tbody>
															{[
																{ id: 'wardTeam', sl: '১.', label: 'ওয়ার্ড টিম বৈঠক', f: 'val' },
																{ id: 'wardMeeting', sl: '২.', label: 'ওয়ার্ড বৈঠক (মাসিক ইউনিট দায়িত্বশীল)', f: 'val' },
																{ id: 'memberMeeting', sl: '৩.', label: 'ওয়ার্ডভিত্তিক মাসিক সদস্য (রুকন)', f: 'val' },
																{ id: 'karmiMeeting', sl: '৪.', label: 'ইউনিটে কর্মী বৈঠক/পারিবারিক বৈঠক', f: 'val' },
																{ id: 'karmiConference', sl: '৫.', label: 'ওয়ার্ড পর্যায়ে কর্মী সম্মেলন', f: 'val' },
																{ id: 'deptMeeting', sl: '৬.', label: 'উলামা/যুব/শ্রমিক বৈঠক/সমাবেশ', f: 'val' },
																{ id: 'associateGathering', sl: '৭.', label: 'সহযোগী সদস্য সমাবেশ/সম্মেলন', f: 'val' },
																{ id: 'activeAssociateGathering', sl: '৮.', label: 'সক্রিয় সহযোগী সদস্য সমাবেশ', f: 'val' },
																{ id: 'others', sl: '৯.', label: 'অন্যান্য', f: 'val' }
															].map(row => (
																<tr key={row.id}>
																	<td className="border border-gray-200 p-2 text-center">{row.sl}</td>
																	<td className="border border-gray-200 p-2 text-left font-medium">{row.label}</td>
																	<td className="border border-gray-200 p-2">
																		{Object.values(compReport.orgMeetings?.[row.id]?.count || {}).join(' / ') || '-'}
																	</td>
																	<td className="border border-gray-200 p-2">
																		{Object.values(compReport.orgMeetings?.[row.id]?.target || {}).join(' / ') || '-'}
																	</td>
																	<td className="border border-gray-200 p-2">
																		{Object.values(compReport.orgMeetings?.[row.id]?.avgAttendance || {}).join(' / ') || '-'}
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
											<ReportAccordionSection title="ক) তারবিয়াত (নৈতিক শিক্ষা ও সাংগঠনিক প্রশিক্ষণ):" onEdit={isFuture ? undefined : () => setIsTarbiyatModalOpen(true)} buttonText="তারবিয়াত এডিট" icon={BookOpen}>
												<div className="overflow-x-auto">
													<table className="w-full border-collapse border border-gray-200 text-xs text-center">
														<thead>
															<tr className="bg-gray-50 text-gray-700">
																<th className="border border-gray-200 p-2">ক্রম</th>
																<th className="border border-gray-200 p-2 text-left">বৈঠকের ধরণ</th>
																<th className="border border-gray-200 p-2">সংখ্যা</th>
																<th className="border border-gray-200 p-2">টার্গেট</th>
																<th className="border border-gray-200 p-2">গড় উপস্থিতি</th>
															</tr>
														</thead>
														<tbody>
															{[
																{ id: 'unitTarbiyat', sl: '১.', label: 'ইউনিটে তারবিয়াতী বৈঠক', f: ['val'] },
																{ id: 'wardTarbiyat', sl: '২.', label: 'ওয়ার্ডভিত্তিক কর্মীদের শিক্ষা বৈঠক', f: ['val'] },
																{ id: 'higherTarbiyat', sl: '৩.', label: 'উর্ধ্বতন সংগঠনের শিক্ষা শিবির/শিক্ষা বৈঠক', f: ['val'] },
																{ id: 'publicTarbiyat', sl: '৪.', label: 'গণশিক্ষা বৈঠক/গণ নৈশ ইবাদত', f: ['val'] },
																{ id: 'discussionCircle', sl: '৫.', label: 'আলোচনা চক্র', f: ['group', 'session'] },
																{ id: 'quranDars', sl: '৬.', label: 'দারস/সহীহ কুরআন তিলাওয়াত অনুশীলন', f: ['program'] },
																{ id: 'others', sl: '৭.', label: 'অন্যান্য', f: ['val'] }
															].map(row => (
																<tr key={row.id}>
																	<td className="border border-gray-200 p-2 text-center">{row.sl}</td>
																	<td className="border border-gray-200 p-2 text-left font-medium">{row.label}</td>
																	<td className="border border-gray-200 p-2">
																		{Object.values(compReport.training?.[row.id]?.count || {}).join(' / ') || '-'}
																	</td>
																	<td className="border border-gray-200 p-2">
																		{Object.values(compReport.training?.[row.id]?.target || {}).join(' / ') || '-'}
																	</td>
																	<td className="border border-gray-200 p-2">
																		{Object.values(compReport.training?.[row.id]?.avgAttendance || {}).join(' / ') || '-'}
																	</td>
																</tr>
															))}
														</tbody>
													</table>
												</div>
											</ReportAccordionSection>

											<ReportAccordionSection title="খ) মানবসম্পদ উন্নয়ন কোর্স সমূহ:" onEdit={isFuture ? undefined : () => setIsHRDModalOpen(true)} buttonText="কোর্স এডিট" icon={Users}>
												<div className="overflow-x-auto">
													<table className="w-full border-collapse border border-gray-200 text-[10px] text-center">
														<thead>
															<tr className="bg-gray-50 text-gray-700">
																<th className="border border-gray-200 p-2">ক্রম</th>
																<th className="border border-gray-200 p-2 text-left">প্রশিক্ষণ কোর্সের নাম</th>
																<th className="border border-gray-200 p-2">মহানগরী/থানা পরিচালিত</th>
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
																	<td className="border border-gray-200 p-2">{formatVal(compReport.training?.[row.id]?.conductedCount)}</td>
																	<td className="border border-gray-200 p-2">{formatVal(compReport.training?.[row.id]?.completedCount)}</td>
																	<td className="border border-gray-200 p-2">{formatVal(compReport.training?.[row.id]?.othersCompletedCount)}</td>
																	<td className="border border-gray-200 p-2 font-bold">{formatVal(compReport.training?.[row.id]?.totalCount)}</td>
																</tr>
															))}
														</tbody>
													</table>
												</div>
											</ReportAccordionSection>
										</div>
									</ReportAccordionSection>


									<ReportAccordionSection title="৪. সমাজসেবা ও সমাজ সংস্কারঃ" icon={HeartHandshake}>
										<div className="space-y-6">
											{/* Sub-Accordion: ১. ব্যক্তিগত উদ্যোগে সামাজিক কাজ: */}
											<ReportAccordionSection
												title="১. ব্যক্তিগত উদ্যোগে সামাজিক কাজ:"
												icon={User}
												onEdit={isFuture ? undefined : () => setIsSocialPersonalModalOpen(true)}
												buttonText="এডিট"
											>
												<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
													<div className="bg-gray-50 p-2 rounded flex justify-between items-center text-[10px]">
														<span>মোট কতজন ব্যক্তিগত উদ্যোগে সামাজিক কাজ করেছেন:</span>
														<span className="font-bold">{formatVal(compReport.socialWork?.personalCount)}</span>
													</div>
													<div className="bg-gray-50 p-2 rounded flex justify-between items-center text-[10px]">
														<span>মোট সেবা প্রাপ্ত সংখ্যা:</span>
														<span className="font-bold">{formatVal(compReport.socialWork?.personalServiceCount)}</span>
													</div>
												</div>
												<SocialPersonalModal
													isOpen={isSocialPersonalModalOpen}
													onClose={() => setIsSocialPersonalModalOpen(false)}
													onSave={data => {
														// Only update personalCount and personalServiceCount
														const newSocialWork = {
															...compReport.socialWork,
															personalCount: data.workerCount,
															personalServiceCount: data.beneficiaryCount
														};
														handleSaveCompSection('socialWork', newSocialWork);
														setIsSocialPersonalModalOpen(false);
													}}
													initialData={{
														workerCount: compReport.socialWork?.personalCount || 0,
														beneficiaryCount: compReport.socialWork?.personalServiceCount || 0
													}}
													saving={saving}
												/>
											</ReportAccordionSection>

											{/* Sub-Accordion: ২. সামষ্টিক/সেবা টিমের মাধ্যমে সামাজিক কাজ: */}
											<ReportAccordionSection
												title="২. সামষ্টিক/সেবা টিমের মাধ্যমে সামাজিক কাজ:"
												icon={Users}
												onEdit={isFuture ? undefined : () => setIsSocialWorkModalOpen(true)}
												buttonText="এডিট"
											>
												<SocialWorkModal
													isOpen={isSocialWorkModalOpen}
													onClose={() => setIsSocialWorkModalOpen(false)}
													onSave={data => {
														// Only update collective/rows fields
														const newSocialWork = {
															...compReport.socialWork,
															generalServiceTeamCount: data.generalServiceTeamCount,
															technicalServiceTeamCount: data.technicalServiceTeamCount,
															volunteerTeamCount: data.volunteerTeamCount,
															devWork: data.devWork,
															socialEvent: data.socialEvent,
															humanitarian: data.humanitarian,
															cleaning: data.cleaning,
															medical: data.medical,
															blood: data.blood,
															maternity: data.maternity,
															newborn: data.newborn,
															maktub: data.maktub,
															others: data.others,
															education: data.education,
															technical: data.technical,
															online: data.online,
															trees: data.trees,
															awareness: data.awareness,
															disaster: data.disaster,
															relief: data.relief,
															nonMuslim: data.nonMuslim,
															burial: data.burial,
															employment: data.employment
														};
														handleSaveCompSection('socialWork', newSocialWork);
														setIsSocialWorkModalOpen(false);
													}}
													initialData={compReport.socialWork || {}}
													saving={saving}
												/>
												<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
													<div className="bg-blue-50 p-2 rounded flex justify-between items-center text-[10px]">
														<span>সাধারণ সেবা টিম:</span>
														<span className="font-bold">{formatVal(compReport.socialWork?.generalServiceTeamCount)}</span>
													</div>
													<div className="bg-blue-50 p-2 rounded flex justify-between items-center text-[10px]">
														<span>টেকনিক্যাল সেবা টিম:</span>
														<span className="font-bold">{formatVal(compReport.socialWork?.technicalServiceTeamCount)}</span>
													</div>
													<div className="bg-blue-50 p-2 rounded flex justify-between items-center text-[10px]">
														<span>স্বেচ্ছাসেবক টিম:</span>
														<span className="font-bold">{formatVal(compReport.socialWork?.volunteerTeamCount)}</span>
													</div>
												</div>
												<div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
													<table className="w-full border-collapse border border-gray-200 text-[10px]">
														<thead>
															<tr className="bg-gray-100"><th className="border border-gray-200 p-1 text-left">বিবরণ</th><th className="border border-gray-200 p-1 w-12">সংখ্যা</th></tr>
														</thead>
														<tbody>
															{[
																{ id: 'devWork', label: 'ছোট-ছোট উন্নয়নমূলক কাজ' },
																{ id: 'socialEvent', label: 'সামাজিক অনুষ্ঠানে অংশগ্রহণ' },
																{ id: 'humanitarian', label: 'মানবিক সহায়তা' },
																{ id: 'cleaning', label: 'পরিষ্কার-পরিচ্ছন্নতা' },
																{ id: 'medical', label: 'রোগীর পরিচর্চা' },
																{ id: 'blood', label: 'স্বেচ্ছায় রক্ত দান' },
																{ id: 'maternity', label: 'মাতৃত্বকালীন সময়ে সেবা' },
																{ id: 'newborn', label: 'নবজাতক গিফট প্রদান' },
																{ id: 'maktub', label: 'ভ্রম্যামান স্কুল/মক্তব চালু' },
																{ id: 'others', label: 'অন্যান্য' }
															].map(row => (
																<tr key={row.id}>
																	<td className="border border-gray-200 p-1">{row.label}</td>
																	<td className="border border-gray-200 p-1 text-center">{formatVal(compReport.socialWork?.[row.id])}</td>
																</tr>
															))}
														</tbody>
													</table>
													<table className="w-full border-collapse border border-gray-200 text-[10px]">
														<thead>
															<tr className="bg-gray-100"><th className="border border-gray-200 p-1 text-left">বিবরণ</th><th className="border border-gray-200 p-1 w-12">সংখ্যা</th></tr>
														</thead>
														<tbody>
															{[
																{ id: 'education', label: 'শিক্ষা সহায়তা প্রদান' },
																{ id: 'technical', label: 'টেকনিক্যাল সেবা প্রদান' },
																{ id: 'online', label: 'অনলাইনের মাধ্যমে সেবা' },
																{ id: 'trees', label: 'বৃক্ষরোপন' },
																{ id: 'awareness', label: 'জনসচেতনতামূলক প্রোগ্রাম' },
																{ id: 'disaster', label: 'দুর্যোগকালীন সহায়তা' },
																{ id: 'relief', label: 'ত্রাণ বিতরণ / গোশত বিতরণ' },
																{ id: 'nonMuslim', label: 'ভিন্নধর্মাবলম্বীদের সেবা' },
																{ id: 'burial', label: 'মাইয়্যেতের গোসল' },
																{ id: 'employment', label: 'স্বল্প পুঁজিতে কর্মসংস্থান' }
															].map(row => (
																<tr key={row.id}>
																	<td className="border border-gray-200 p-1">{row.label}</td>
																	<td className="border border-gray-200 p-1 text-center">{formatVal(compReport.socialWork?.[row.id])}</td>
																</tr>
															))}
														</tbody>
													</table>
												</div>
											</ReportAccordionSection>

											{/* Sub-Accordion: ৩. স্বাস্থ্য ও পরিবার কল্যাণমূলক কাজ: */}
											<ReportAccordionSection
												title="৩. স্বাস্থ্য ও পরিবার কল্যাণমূলক কাজ:"
												icon={Stethoscope}
												onEdit={isFuture ? undefined : () => setIsSocialHealthModalOpen(true)}
												buttonText="এডিট"
											>
												<SocialHealthModal
													isOpen={isSocialHealthModalOpen}
													onClose={() => setIsSocialHealthModalOpen(false)}
													onSave={data => {
														const newSocialWork = {
															...compReport.socialWork,
															healthTrainingCount: data.trainingParticipantCount,
															healthServiceCount: data.serviceParticipantCount,
															healthBeneficiaryCount: data.beneficiaryCount
														};
														handleSaveCompSection('socialWork', newSocialWork);
														setIsSocialHealthModalOpen(false);
													}}
													initialData={{
														trainingParticipantCount: compReport.socialWork?.healthTrainingCount || 0,
														serviceParticipantCount: compReport.socialWork?.healthServiceCount || 0,
														beneficiaryCount: compReport.socialWork?.healthBeneficiaryCount || 0
													}}
													saving={saving}
												/>
												<table className="w-full border-collapse border border-gray-200 text-[10px] text-center">
													<thead>
														<tr className="bg-gray-100">
															<th className="border border-gray-200 p-1">স্বাস্থ্যকর্মী প্রশিক্ষণ</th>
															<th className="border border-gray-200 p-1">স্বাস্থ্যসেবায় অংশগ্রহণ</th>
															<th className="border border-gray-200 p-1">সেবা প্রাপ্ত সংখ্যা</th>
														</tr>
													</thead>
													<tbody>
														<tr>
															<td className="border border-gray-200 p-1">{formatVal(compReport.socialWork?.healthTrainingCount)}</td>
															<td className="border border-gray-200 p-1">{formatVal(compReport.socialWork?.healthServiceCount)}</td>
															<td className="border border-gray-200 p-1">{formatVal(compReport.socialWork?.healthBeneficiaryCount)}</td>
														</tr>
													</tbody>
												</table>
											</ReportAccordionSection>

											{/* Sub-Accordion: ৪. প্রাতিষ্ঠানিক উদ্যোগে সামাজিক কাজ: */}
											<ReportAccordionSection
												title="৪. প্রাতিষ্ঠানিক উদ্যোগে সামাজিক কাজ:"
												icon={Building}
												onEdit={isFuture ? undefined : () => setIsSocialInstModalOpen(true)}
												buttonText="এডিট"
											>
												<table className="w-full border-collapse border border-gray-200 text-[10px] text-center">
													<thead>
														<tr className="bg-gray-100">
															<th className="border border-gray-200 p-1">মোট প্রতিষ্ঠান</th>
															<th className="border border-gray-200 p-1">সক্রিয় প্রতিষ্ঠান</th>
															<th className="border border-gray-200 p-1">নতুন প্রতিষ্ঠান</th>
														</tr>
													</thead>
													<tbody>
														<tr>
															<td className="border border-gray-200 p-1">{formatVal(compReport.socialWork?.instTotalCount)}</td>
															<td className="border border-gray-200 p-1">{formatVal(compReport.socialWork?.instActiveCount)}</td>
															<td className="border border-gray-200 p-1">{formatVal(compReport.socialWork?.instNewCount)}</td>
														</tr>
													</tbody>
												</table>
												<SocialInstModal
													isOpen={isSocialInstModalOpen}
													onClose={() => setIsSocialInstModalOpen(false)}
													onSave={data => {
														const newSocialWork = {
															...compReport.socialWork,
															instTotalCount: data.totalInstitutions,
															instActiveCount: data.activeInstitutions,
															instNewCount: data.newInstitutions
														};
														handleSaveCompSection('socialWork', newSocialWork);
														setIsSocialInstModalOpen(false);
													}}
													initialData={{
														totalInstitutions: compReport.socialWork?.instTotalCount || 0,
														activeInstitutions: compReport.socialWork?.instActiveCount || 0,
														newInstitutions: compReport.socialWork?.instNewCount || 0
													}}
													saving={saving}
												/>
											</ReportAccordionSection>

										</div>
									</ReportAccordionSection>

									<ReportAccordionSection title="৫. রাষ্ট্রীয় সংস্কার ও সংশোধনঃ" icon={Scale}>
										<div className="space-y-6">
											<div className="space-y-4">
												<ReportAccordionSection title="১. রাজনৈতিক ও প্রশাসনিক যোগাযোগ:" onEdit={isFuture ? undefined : () => setIsPoliticalCommModalOpen(true)} buttonText="যোগাযোগ এডিট" icon={PhoneCall}>
													<div className="overflow-x-auto">
														<table className="w-full border-collapse border border-gray-200 text-xs text-center">
															<thead>
																<tr className="bg-gray-50 text-gray-700">
																	<th className="border border-gray-200 p-2 text-left">যোগাযোগের ধরন</th>
																	<th className="border border-gray-200 p-2">মোট কতজন যোগাযোগ করেছেন</th>
																	<th className="border border-gray-200 p-2">মোট কতজনের সাথে যোগাযোগ হয়েছে</th>
																</tr>
															</thead>
															<tbody>
																{[
																	{ id: 'political', label: 'রাজনৈতিক ব্যক্তিবর্গ' },
																	{ id: 'admin', label: 'প্রশাসনিক ব্যক্তিবর্গ' }
																].map(row => (
																	<tr key={row.id}>
																		<td className="border border-gray-200 p-2 text-left">{row.label}</td>
																		<td className="border border-gray-200 p-2 text-center">
																			{formatVal(compReport.political?.comm?.[row.id]?.communicatedCount)}
																		</td>
																		<td className="border border-gray-200 p-2 text-center">
																			{formatVal(compReport.political?.comm?.[row.id]?.reachedCount)}
																		</td>
																	</tr>
																))}
															</tbody>
														</table>
													</div>
												</ReportAccordionSection>

												<ReportAccordionSection title="২. কর্মসূচী বাস্তবায়ন:" onEdit={isFuture ? undefined : () => setIsPoliticalProgModalOpen(true)} buttonText="কর্মসূচি এডিট" icon={Flag}>
													<div className="overflow-x-auto">
														<table className="w-full border-collapse border border-gray-200 text-xs text-center">
															<thead>
																<tr className="bg-gray-50 text-gray-700">
																	<th className="border border-gray-200 p-2 text-left">কর্মসূচীর বিবরণ</th>
																	<th className="border border-gray-200 p-2">মোট সংখ্যা</th>
																	<th className="border border-gray-200 p-2">গড় উপস্থিতি</th>
																</tr>
															</thead>
															<tbody>
																{
																	[
																		{ id: 'centerProgram', label: 'কেন্দ্র ঘোষিত রাজনৈতিক কর্মসূচি পালন' },
																		{ id: 'localProgram', label: 'স্থানিয়ভাবে ঘোষিত কর্মসূচী: জনসভা/সমাবেশ/মিছিল' },
																		{ id: 'distribution', label: 'পোস্টার/লিফলেট/বুকলেট/মারকলিপি বিতরণ' }
																	].map(row => (
																		<tr key={row.id}>
																			<td className="border border-gray-200 p-2 text-left">{row.label}</td>
																			<td className="border border-gray-200 p-2 text-center">
																				{Object.values(compReport.political?.prog?.[row.id]?.count || {}).join(' / ') || '-'}
																			</td>
																			<td className="border border-gray-200 p-2 text-center">
																				{Object.values(compReport.political?.prog?.[row.id]?.avgAttendance || {}).join(' / ') || '-'}
																			</td>
																		</tr>
																	))}
															</tbody>
														</table>
													</div>
												</ReportAccordionSection>

											</div>
											<div className="space-y-4">
												<ReportAccordionSection title="৩. জাতীয় ও আন্তর্জাতিক দিবস পালন:" onEdit={isFuture ? undefined : () => setIsNationalDayModalOpen(true)} buttonText="দিবস এডিট" icon={Calendar}>
													<div className="overflow-x-auto">
														<table className="w-full border-collapse border border-gray-200 text-xs text-center">
															<thead>
																<tr className="bg-gray-50 text-gray-700">
																	<th className="border border-gray-200 p-2 text-left">দিবসসমূহ</th>
																	<th className="border border-gray-200 p-2">মোট প্রোগ্রাম সংখ্যা</th>
																	<th className="border border-gray-200 p-2">গড় উপস্থিতি</th>
																	<th className="border border-gray-200 p-2 text-left">দিবসসমূহ</th>
																	<th className="border border-gray-200 p-2">মোট প্রোগ্রাম সংখ্যা</th>
																	<th className="border border-gray-200 p-2">গড় উপস্থিতি</th>
																</tr>
															</thead>
															<tbody>
																<tr>
																	<td className="border border-gray-200 p-2 text-left">স্বাধীনতা ও জাতীয় দিবস</td>
																	<td className="border border-gray-200 p-2">{formatVal(compReport.political?.nationalDay?.independenceDay?.programCount)}</td>
																	<td className="border border-gray-200 p-2">{formatVal(compReport.political?.nationalDay?.independenceDay?.avgAttendance)}</td>
																	<td className="border border-gray-200 p-2 text-left">আন্তর্জাতিক মাতৃভাষা দিবস</td>
																	<td className="border border-gray-200 p-2">{formatVal(compReport.political?.nationalDay?.motherLanguageDay?.programCount)}</td>
																	<td className="border border-gray-200 p-2">{formatVal(compReport.political?.nationalDay?.motherLanguageDay?.avgAttendance)}</td>
																</tr>
																<tr>
																	<td className="border border-gray-200 p-2 text-left">বিজয় দিবস</td>
																	<td className="border border-gray-200 p-2">{formatVal(compReport.political?.nationalDay?.victoryDay?.programCount)}</td>
																	<td className="border border-gray-200 p-2">{formatVal(compReport.political?.nationalDay?.victoryDay?.avgAttendance)}</td>
																	<td className="border border-gray-200 p-2 text-left">অন্যান্য(বিস্তারিত আলাদা কাগজে দেয়া যাবে)</td>
																	<td className="border border-gray-200 p-2">{formatVal(compReport.political?.nationalDay?.others?.programCount)}</td>
																	<td className="border border-gray-200 p-2">{formatVal(compReport.political?.nationalDay?.others?.avgAttendance)}</td>
																</tr>
															</tbody>
														</table>
													</div>
												</ReportAccordionSection>

												<ReportAccordionSection title="৪. জাতীয় ও স্থানীয় নির্বাচনভিত্তিক কার্যক্রম" onEdit={isFuture ? undefined : () => setIsElectionModalOpen(true)} buttonText="নির্বাচন এডিট" icon={Vote}>
													<div className="overflow-x-auto">
														<table className="w-full border-collapse border border-gray-200 text-xs text-center">
														<tbody>
															<tr className="bg-gray-50 text-gray-700 font-bold">
																<td className="border border-gray-200 p-2 text-left font-bold">নির্বাচনের ধরন</td>
																<td className="border border-gray-200 p-2 font-bold">মোট প্রার্থী সংখ্যা</td>
																<td className="border border-gray-200 p-2 font-bold">নির্বাচিতী সংখ্যা</td>
																<td className="border border-gray-200 p-2 font-bold">দ্বিতীয় অবস্থান</td>
															</tr>
															<tr>
																<td className="border border-gray-200 p-2 text-left">কাউন্সিলর</td>
																<td className="border border-gray-200 p-2">{formatVal(compReport.political?.election?.councilor?.candidateCount?.val)}</td>
																<td className="border border-gray-200 p-2">{formatVal(compReport.political?.election?.councilor?.electedCount?.val)}</td>
																<td className="border border-gray-200 p-2">{formatVal(compReport.political?.election?.councilor?.secondPlaceCount?.val)}</td>
															</tr>
															<tr className="bg-gray-50 text-gray-700">
																<td className="border border-gray-200 p-2 text-left font-bold">প্রস্তুতিমূলক কার্যক্রমের ধরন</td>
																<td className="border border-gray-200 p-2 font-bold">সংখ্যা</td>
																<td className="border border-gray-200 p-2 font-bold">বৃদ্ধি</td>
																<td className="border border-gray-200 p-2 font-bold">টার্গেট</td>
															</tr>
															<tr>
																<td className="border border-gray-200 p-2 text-left">ভোট কেন্দ্র (জাতীয়/স্থানীয়)</td>
																<td className="border border-gray-200 p-2">{formatVal(compReport.political?.election?.preparatory?.voteCenter?.count)}</td>
																<td className="border border-gray-200 p-2">{formatVal(compReport.political?.election?.preparatory?.voteCenter?.increase)}</td>
																<td className="border border-gray-200 p-2">{formatVal(compReport.political?.election?.preparatory?.voteCenter?.target)}</td>
															</tr>
															<tr>
																<td className="border border-gray-200 p-2 text-left">ভোট কেন্দ্র কমিটি/কেন্দ্র/বুথভিত্তিক ইউনিট</td>
																<td className="border border-gray-200 p-2">{formatVal(compReport.political?.election?.preparatory?.voteCenterCommittee?.count)}</td>
																<td className="border border-gray-200 p-2">{formatVal(compReport.political?.election?.preparatory?.voteCenterCommittee?.increase)}</td>
																<td className="border border-gray-200 p-2">{formatVal(compReport.political?.election?.preparatory?.voteCenterCommittee?.target)}</td>
															</tr>
															<tr>
																<td className="border border-gray-200 p-2 text-left" colSpan={3}>ওয়ার্ডভিত্তিক নির্বাচন পরিচালনা কমিটির বৈঠক সংখ্যা।</td>
																<td className="border border-gray-200 p-2">{formatVal(compReport.political?.election?.electionCommitteeMeetingCount)}</td>
															</tr>
														</tbody>
														</table>
													</div>
												</ReportAccordionSection>
											</div>
										</div>
									</ReportAccordionSection>

									<ReportAccordionSection title="৬. বায়তুলমাল (আর্থিক কার্যক্রম):" onEdit={isFuture ? undefined : () => setIsBaitulmalModalOpen(true)} buttonText="আর্থিক এডিট" icon={Wallet}>
										<div className="overflow-x-auto">
											<div className="flex justify-between text-xs font-semibold text-gray-600 mb-2 px-1">
												<span>ধার্যকৃত নিছাব: {formatVal(compReport.finance?.nisab?.allocated)} /=</span>
												<span>ওয়াদাকৃত নিছাব: {formatVal(compReport.finance?.nisab?.promised)} /=</span>
											</div>
											<table className="w-full border-collapse border border-gray-200 text-xs">
											<thead>
												<tr className="bg-gray-50 text-gray-700 text-center">
													<th className="border border-gray-200 p-2" colSpan={2}>আয়ের বিবরণ</th>
													<th className="border border-gray-200 p-2" colSpan={2}>ব্যয়ের বিবরণ</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td className="border border-gray-200 p-2">প্রাপ্ত নিছাব</td>
													<td className="border border-gray-200 p-2 text-right">{formatVal(compReport.finance?.income?.receivedNisab)} /=</td>
													<td className="border border-gray-200 p-2">নিসাব পরিশোধ</td>
													<td className="border border-gray-200 p-2 text-right">{formatVal(compReport.finance?.expense?.nisabPaid)} /=</td>
												</tr>
												<tr>
													<td className="border border-gray-200 p-2">সরাসরি ইয়ানত</td>
													<td className="border border-gray-200 p-2 text-right">{formatVal(compReport.finance?.income?.directIanat)} /=</td>
													<td className="border border-gray-200 p-2">স্থানীয় খরচ</td>
													<td className="border border-gray-200 p-2 text-right">{formatVal(compReport.finance?.expense?.localExpense)} /=</td>
												</tr>
												<tr>
													<td className="border border-gray-200 p-2">এককালীন /জরুরী(নির্বাচনী ওয়াদা)</td>
													<td className="border border-gray-200 p-2 text-right">{formatVal(compReport.finance?.income?.oneTime)} /=</td>
													<td className="border border-gray-200 p-2">এককালীন /জরুরী(নির্বাচনী ওয়াদা)</td>
													<td className="border border-gray-200 p-2 text-right">{formatVal(compReport.finance?.expense?.oneTime)} /=</td>
												</tr>
												<tr>
													<td className="border border-gray-200 p-2">নির্বাচনী ফান্ড</td>
													<td className="border border-gray-200 p-2 text-right">{formatVal(compReport.finance?.income?.electionFund)} /=</td>
													<td className="border border-gray-200 p-2">নির্বাচনী ফান্ড</td>
													<td className="border border-gray-200 p-2 text-right">{formatVal(compReport.finance?.expense?.electionFund)} /=</td>
												</tr>
												<tr>
													<td className="border border-gray-200 p-2">শহীদ ফান্ড</td>
													<td className="border border-gray-200 p-2 text-right">{formatVal(compReport.finance?.income?.shahidFund)} /=</td>
													<td className="border border-gray-200 p-2">শহীদ ফান্ড</td>
													<td className="border border-gray-200 p-2 text-right">{formatVal(compReport.finance?.expense?.shahidFund)} /=</td>
												</tr>
												<tr>
													<td className="border border-gray-200 p-2">বিশেষ ও বন্যার্তদের কালেকশন</td>
													<td className="border border-gray-200 p-2 text-right">{formatVal(compReport.finance?.income?.floodCollection)} /=</td>
													<td className="border border-gray-200 p-2">বিশেষ ও বন্যার্তদের কালেকশন</td>
													<td className="border border-gray-200 p-2 text-right">{formatVal(compReport.finance?.expense?.floodCollection)} /=</td>
												</tr>
												<tr>
													<td className="border border-gray-200 p-2">সমাজকল্যাণ ও সমাজসেবা</td>
													<td className="border border-gray-200 p-2 text-right">{formatVal(compReport.finance?.income?.socialWork)} /=</td>
													<td className="border border-gray-200 p-2">সমাজকল্যাণ ও সমাজসেবা</td>
													<td className="border border-gray-200 p-2 text-right">{formatVal(compReport.finance?.expense?.socialWork)} /=</td>
												</tr>
												<tr>
													<td className="border border-gray-200 p-2">যাকাত</td>
													<td className="border border-gray-200 p-2 text-right">{formatVal(compReport.finance?.income?.zakat)} /=</td>
													<td className="border border-gray-200 p-2">যাকাত</td>
													<td className="border border-gray-200 p-2 text-right">{formatVal(compReport.finance?.expense?.zakat)} /=</td>
												</tr>
												<tr>
													<td className="border border-gray-200 p-2">ফিতরা</td>
													<td className="border border-gray-200 p-2 text-right">{formatVal(compReport.finance?.income?.fitra)} /=</td>
													<td className="border border-gray-200 p-2">ফিতরা</td>
													<td className="border border-gray-200 p-2 text-right">{formatVal(compReport.finance?.expense?.fitra)} /=</td>
												</tr>
												<tr>
													<td className="border border-gray-200 p-2">ইফতার</td>
													<td className="border border-gray-200 p-2 text-right">{formatVal(compReport.finance?.income?.iftar)} /=</td>
													<td className="border border-gray-200 p-2">ইফতার</td>
													<td className="border border-gray-200 p-2 text-right">{formatVal(compReport.finance?.expense?.iftar)} /=</td>
												</tr>
												<tr>
													<td className="border border-gray-200 p-2">ডেলিগেট ফি</td>
													<td className="border border-gray-200 p-2 text-right">{formatVal(compReport.finance?.income?.delegateFee)} /=</td>
													<td className="border border-gray-200 p-2">ডেলিগেট ফি</td>
													<td className="border border-gray-200 p-2 text-right">{formatVal(compReport.finance?.expense?.delegateFee)} /=</td>
												</tr>
												<tr className="font-bold bg-gray-50">
													<td className="border border-gray-200 p-2 text-right">মোট আয় =</td>
													<td className="border border-gray-200 p-2 text-right">{formatVal(compReport.finance?.income?.totalIncome)} /=</td>
													<td className="border border-gray-200 p-2 text-right">মোট ব্যয় =</td>
													<td className="border border-gray-200 p-2 text-right">{formatVal(compReport.finance?.expense?.totalExpense)} /=</td>
												</tr>
												<tr className="font-bold">
													<td className="border border-gray-200 p-2 text-right">গত মাসের উদ্বৃত্ত =</td>
													<td className="border border-gray-200 p-2 text-right">{formatVal(compReport.finance?.income?.previousMonthSurplus)}</td>
													<td className="border border-gray-200 p-2 text-right">এ মাসের উদ্বৃত্ত =</td>
													<td className="border border-gray-200 p-2 text-right">{formatVal(compReport.finance?.expense?.monthlySurplus)}</td>
												</tr>
												<tr className="font-bold bg-gray-50">
													<td className="border border-gray-200 p-2 text-right">সর্বমোট আয় =</td>
													<td className="border border-gray-200 p-2 text-right">{formatVal(compReport.finance?.income?.grandTotalIncome)} /=</td>
													<td className="border border-gray-200 p-2 text-right">সর্বমোট ব্যয় =</td>
													<td className="border border-gray-200 p-2 text-right">{formatVal(compReport.finance?.expense?.grandTotalExpense)} /=</td>
												</tr>
											</tbody>
											</table>
										</div>
									</ReportAccordionSection>

									<ReportAccordionSection title="৭. বিবিধ ও মন্তব্যঃ" onEdit={isFuture ? undefined : () => setIsRemarksModalOpen(true)} buttonText="মন্তব্য এডিট" icon={MessagesSquare}>
										<div className="space-y-6">
											<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
												<div className="space-y-2">
													<h4 className="font-bold text-xs text-red-700 flex items-center gap-2">
														<span className="w-2 h-2 rounded-full bg-red-500 shrink-0"></span>
														প্রধান সমস্যাসমূহঃ
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

			<UnitOrganizationModal
				isOpen={isUnitOrgModalOpen}
				onClose={() => setIsUnitOrgModalOpen(false)}
				onSave={(data) => handleSaveCompSection('unitOrganization', data)}
				initialData={compReport.unitOrganization || {}}
				saving={saving}
			/>

			<SocialWorkModal
				isOpen={isSocialModalOpen}
				onClose={() => setIsSocialModalOpen(false)}
				onSave={(data) => handleSaveCompSection('socialWork', data)}
				initialData={compReport.socialWork}
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
				onSave={(data) => handleSaveMultipleCompSections(data)}
				initialData={{
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
				onSave={(data) => handleSaveCompSection('dawahPublication', data)}
				initialData={compReport.dawahPublication}
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
				initialData={compReport.deptManpower || {}}
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
				onSave={(data) => handleSaveCompSection('training', { ...compReport.training, ...data })}
				initialData={compReport.training}
				saving={saving}
			/>

			<HRDModal
				isOpen={isHRDModalOpen}
				onClose={() => setIsHRDModalOpen(false)}
				onSave={(data) => handleSaveCompSection('training', { ...compReport.training, ...data })}
				initialData={compReport.training}
				saving={saving}
			/>

			<SocialWorkModal
				isOpen={isSocialModalOpen}
				onClose={() => setIsSocialModalOpen(false)}
				onSave={(data) => handleSaveCompSection('socialWork', data)}
				initialData={compReport.socialWork}
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
