'use client';

import { ReportAccordionSection } from "@/components/Reporting/ReportAccordionSection";
import {
	Building,
	Calendar,
	ChevronLeft, ChevronRight,
	GraduationCap,
	HeartHandshake,
	Megaphone, MessagesSquare, Printer, Save, Scale, Users2, Wallet
} from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getDawatTemplate, getOrgTemplate, getTrainingTemplate, getSocialWelfareTemplate, getStateReformTemplate, getBaitulmalTemplate, getRemarkCommentTemplate, OrgLevel } from "./templates";

type Organization = { id: number; name: string; type: string; children?: Organization[] };

export default function PlanningReportingClient({ accessToken }: { accessToken: string }) {
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

	// Update URL and localStorage when selection changes (orgId / year / month only)
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

	// User context for access control
const [userContext, setUserContext] = useState<{
organizationId: number | null;
orgType: string | null;
orgName: string | null;
positionTitle: string | null;
parentOrgId: number | null;
parentOrgType: string | null;
} | null>(null);

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

	useEffect(() => {
		if (!accessToken) return;
		fetch('http://localhost:3001/auth/me', {
			headers: { Authorization: `Bearer ${accessToken}` },
		})
			.then(r => r.ok ? r.json() : null)
			.then(data => {
				if (data) {
					setUserContext({
						organizationId: data.organizationId,
						orgType: data.orgType,
						orgName: data.orgName,
						positionTitle: data.positionTitle,
						parentOrgId: data.parentOrgId,
						parentOrgType: data.parentOrgType,
					});
					if (data.orgType) {
						const url = new URL(window.location.href);
						url.searchParams.set('orglevel', data.orgType.toLowerCase());
						window.history.replaceState({}, '', url.toString());
					}
				}
			})
			.catch(() => {});
	}, [accessToken]);

	const isFuture = year > new Date().getFullYear() || (year === new Date().getFullYear() && month > new Date().getMonth() + 1);

	// Access control: determine ownership and editor roles robustly
	const selectedOrg = organizations.find(o => o.id === selectedOrgId);
	const userOrgId = userContext?.organizationId ?? null;
	const userOwnsSelectedOrg = (userOrgId !== null) && Number(userOrgId) === Number(selectedOrgId);
	const EDITOR_POSITIONS = ['president', 'secretary', 'office', 'office secretary'];
	const userPosition = (userContext?.positionTitle ?? '').toString().toLowerCase();
	const isEditor = userPosition && EDITOR_POSITIONS.includes(userPosition);
	const canEdit = userOwnsSelectedOrg && !!isEditor && !isFuture;
	// canView: any user who owns the org (any position) or is in a parent org
	const isWardOrg = (userContext?.orgType ?? '').toUpperCase() === 'WARD';
	const isParentOrgUser = userContext?.orgType != null && userContext.orgType !== 'WARD' && userContext.orgType !== 'UNIT';
	const isWardMember = isWardOrg && userOwnsSelectedOrg;
	const canView = canEdit || isWardMember || isParentOrgUser || !userContext;

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

	const orgLevel = (userContext?.orgType?.toUpperCase() || 'WARD') as OrgLevel;
	const DawatTemplate = getDawatTemplate(orgLevel);
	const OrgTemplate = getOrgTemplate(orgLevel);
	const TrainingTemplate = getTrainingTemplate(orgLevel);
	const SocialWelfareTemplate = getSocialWelfareTemplate(orgLevel);
	const StateReformTemplate = getStateReformTemplate(orgLevel);
	const BaitulmalTemplate = getBaitulmalTemplate(orgLevel);
	const RemarkCommentTemplate = getRemarkCommentTemplate(orgLevel);

	if (!isMounted) return <div className="flex justify-center p-12"><div className="animate-spin w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full"></div></div>;

	if (userContext && !userContext.orgType) return (
		<div className="flex flex-col items-center justify-center p-16 text-center space-y-3">
			<div className="w-14 h-14 rounded-full bg-yellow-50 flex items-center justify-center">
				<Building className="w-7 h-7 text-yellow-400" />
			</div>
			<h2 className="text-lg font-semibold text-gray-700">সংগঠনের স্তর নির্ধারিত নয়</h2>
			<p className="text-sm text-gray-400 max-w-xs">আপনার অ্যাকাউন্টের সাথে কোনো সংগঠনের স্তর (ওয়ার্ড, থানা ইত্যাদি) যুক্ত নেই। অনুগ্রহ করে অ্যাডমিনের সাথে যোগাযোগ করুন।</p>
		</div>
	);

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
						<button onClick={setToday} className="px-3 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-bold hover:bg-indigo-100 transition-colors">This Month</button>
					)}
					<div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-xl p-1 flex-1 sm:flex-none justify-between">
						<button onClick={prevMonth} className="p-2 hover:bg-white rounded-lg text-gray-500 transition-colors shadow-sm"><ChevronLeft className="w-4 h-4 shrink-0" /></button>
						<div className="relative group">
							<input type="month" value={`${year}-${month.toString().padStart(2, '0')}`} onChange={handleMonthInputChange} className="bg-transparent border-none text-gray-700 font-bold text-sm focus:ring-0 cursor-pointer p-1 min-w-[160px] text-center" />
						</div>
						<button onClick={nextMonth} className="p-2 hover:bg-white rounded-lg transition-colors shadow-sm text-gray-500"><ChevronRight className="w-4 h-4 shrink-0" /></button>
					</div>
				</div>
			</div>

			<div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
				{/* Tabs */}
				<div className="flex border-b border-gray-100 bg-gray-50/50 p-5 gap-2 justify-between flex-wrap md:flex-nowrap">
					<div className="flex gap-3">
						<button onClick={() => setActiveTab('comprehensive')} className={`flex-1 px-5 py-3 text-sm font-semibold rounded-lg transition-all whitespace-nowrap ${activeTab === 'comprehensive' ? 'bg-indigo-600 text-indigo-200 shadow-sm ring-1 ring-gray-200/50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}>Comprehensive Report</button>
						<button onClick={() => setActiveTab('plan')} className={`flex-1 px-5 py-3 text-sm font-semibold rounded-lg transition-all whitespace-nowrap ${activeTab === 'plan' ? 'bg-emerald-600 text-emerald-200 shadow-sm ring-1 ring-gray-200/50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}>Monthly Plan</button>
						<button onClick={() => setActiveTab('report')} className={`flex-1 px-5 py-3 text-sm font-semibold rounded-lg transition-all whitespace-nowrap ${activeTab === 'report' ? 'bg-rose-600 text-rose-200 shadow-sm ring-1 ring-gray-200/50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}>Basic Achievements</button>
					</div>
					<button onClick={() => window.open(`/planning-reporting/print?orgId=${selectedOrgId}&year=${year}&month=${month}&token=${accessToken}`, '_blank')} className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition-colors shadow-lg">
						<Printer className="w-4 h-4 shrink-0" />
						Print Ward Report
					</button>
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
											<input type="number" value={activeTab === 'plan' ? plan.dawatTarget : plan.dawatAchieved} onChange={e => setPlan({ ...plan, [activeTab === 'plan' ? 'dawatTarget' : 'dawatAchieved']: parseInt(e.target.value) || 0 })} disabled={isFuture && activeTab === 'report'} className={`w-full border border-gray-200 rounded-lg p-3 ${isFuture && activeTab === 'report' ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`} />
										</div>
									</div>
									<div className="flex justify-end">
										<button onClick={handleSavePlan} disabled={saving || (isFuture && activeTab === 'report')} className={`flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold transition-all shadow-lg ${saving || (isFuture && activeTab === 'report') ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
											<Save className="w-5 h-5 shrink-0" />
											{saving ? 'Saving...' : 'Save Data'}
										</button>
									</div>
								</div>
							)}

							{activeTab === 'comprehensive' && (
								<div className="space-y-6">
								<ReportAccordionSection title="১. দাওয়াতঃ" icon={Megaphone}>
								<div className="grid grid-cols-3 gap-6 mb-8">
									<div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100">
										<p className="text-xs font-bold text-indigo-400 uppercase mb-1">মোট দাওয়াত</p>
										<p className="text-2xl font-black text-indigo-700">
											{compReport.headerInfo?.totalReachedCount || 0}
										</p>
									</div>
									<div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
										<p className="text-xs font-bold text-emerald-400 uppercase mb-1">মোট জনসংখ্যা</p>
										<p className="text-2xl font-black text-emerald-700">
											{compReport.headerInfo?.totalPopulationCount || 0}
										</p>
									</div>
									<div className="bg-rose-50/50 p-4 rounded-2xl border border-rose-100">
										<p className="text-xs font-bold text-rose-400 uppercase mb-1">টার্গেট (মাসিক)</p>
										<p className="text-2xl font-black text-rose-700">
											{compReport.headerInfo?.monthlyTargetCount || 0}
										</p>
									</div>
								</div>
								<DawatTemplate
									compReport={compReport}
									formatVal={formatVal}
									canEdit={canEdit}
									onSave={handleSaveCompSection}
									saving={saving}
								/>
							</ReportAccordionSection>

									<ReportAccordionSection title="২. সংগঠনঃ" icon={Users2}>
										<OrgTemplate
											compReport={compReport}
											formatVal={formatVal}
											canEdit={canEdit}
											onSave={handleSaveCompSection}
											saving={saving}
										/>
									</ReportAccordionSection>


									<ReportAccordionSection title="৩. প্রশিক্ষণঃ" icon={GraduationCap}>
										<TrainingTemplate
											compReport={compReport}
											formatVal={formatVal}
											canEdit={canEdit}
											onSave={handleSaveCompSection}
											saving={saving}
										/>
									</ReportAccordionSection>

									<ReportAccordionSection title="৪. সমাজসেবা ও সমাজ সংস্কারঃ" icon={HeartHandshake}>
										<SocialWelfareTemplate
											compReport={compReport}
											formatVal={formatVal}
											canEdit={canEdit}
											onSave={handleSaveCompSection}
											saving={saving}
										/>
									</ReportAccordionSection>

									<ReportAccordionSection title="৫. রাষ্ট্রীয় সংস্কার ও সংশোধনঃ" icon={Scale}>
										<StateReformTemplate
											compReport={compReport}
											formatVal={formatVal}
											canEdit={canEdit}
											onSave={handleSaveCompSection}
											saving={saving}
										/>
									</ReportAccordionSection>

									<ReportAccordionSection title="৬. বায়তুলমাল (আর্থিক কার্যক্রম):" icon={Wallet}>
										<BaitulmalTemplate
											compReport={compReport}
											formatVal={formatVal}
											canEdit={canEdit}
											onSave={handleSaveCompSection}
											saving={saving}
										/>
									</ReportAccordionSection>

									<ReportAccordionSection title="৭. বিবিধ ও মন্তব্যঃ" icon={MessagesSquare}>
										<RemarkCommentTemplate
											compReport={compReport}
											formatVal={formatVal}
											canEdit={canEdit}
											onSave={handleSaveCompSection}
											saving={saving}
										/>
									</ReportAccordionSection>
								</div>
							)}
						</>
					)}
				</div>
			</div>

		</div>
	);
}
