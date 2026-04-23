"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, Plus, Trash2, Save } from "lucide-react";
import { getAuthToken } from "../../lib/getAuthToken";
import { useLocale } from "../../lib/locale";
import { useSession } from "next-auth/react";
import { emptyMonthlyPlan, MonthlyPlanData } from "./monthly-plan-form";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const TEXT = {
	en: {
		status: "Monthly Status",
		subject: "Subject",
		achieved: "Achieved",
		standard: "Standard",
		general: "General",
		danger: "Danger",
		remaining: "Remaining",
		plan: "Plan",
		quranStudy: "Quran Study (Days)",
		haditsRead: "Hadits Read",
		literaturePages: "Literature (Pages)",
		salahInJamaat: "Salah in Jamaat (Times)",
		targetDawah: "Target - Dawah",
		targetWorker: "Target - Worker",
		targetMember: "Target - Member",
		workerContact: "Worker Contact",
		bookDistribution: "Book Distribution",
		familyMeeting: "Family Meeting (Days)",
		socialWork: "Social Work (Days)",
		safarDays: "Safar Travel (Days)",
		orgWork: "Time Given (Hours)",
		reportKeeping: "Report Keeping (Days)",
		selfCriticism: "Self Criticism (Days)",
		increaseAssociate: "Increase Associate (Names)",
		increaseActivist: "Increase Activist (Names)",
		increaseMember: "Increase Member (Names)",
		memorizingSura: "Memorizing Sura",
		memorizingAyat: "Memorizing Ayat",
		memorizingHadits: "Memorizing Hadits",
		baitulmalIncreaseAmount: "Baitulmal Increase (Amount)",
		sellBooksNumber: "Sell Books (Number)",
		socialHelp: "Social Help",
		professionalHelp: "Professional Help",

		save: "Save Status",
		saving: "Saving...",
		add: "+ Add",
		noPlanNotice: "⚠️ You have not saved a personalized plan for this month. Using general standard targets.",
	},
	bn: {
		status: "মাসিক অবস্থা",
		subject: "বিষয়",
		achieved: "অর্জিত",
		standard: "মান",
		general: "সাধারণ মান",
		danger: "বিপদসীমা",
		remaining: "বাকি",
		plan: "পরিকল্পনা",
		quranStudy: "কুরআন অধ্যয়ন (দিন)",
		haditsRead: "হাদিস অধ্যয়ন (সংখ্যা)",
		literaturePages: "ইসলামী সাহিত্য অধ্যয়ন (পৃষ্ঠা)",
		salahInJamaat: "জামায়াতে নামাজ (ওয়াক্ত সংখ্যা)",
		targetDawah: "দাওয়াতি টার্গেটি সাক্ষাত (কতবার)",
		targetWorker: "কর্মী টার্গেটি সাক্ষাত (কতবার)",
		targetMember: "সদস্য (রুকন) টার্গেটি সাক্ষাত (কতবার)",
		workerContact: "কর্মী যোগাযোগ (কতবার)",
		bookDistribution: "বই বিতরণ",
		familyMeeting: "পারিবারিক বৈঠক (দিন)",
		socialWork: "সামাজিক কাজ (দিন)",
		safarDays: "সফর (দিন)",
		orgWork: "সময় দান (ঘণ্টা)",
		reportKeeping: "রিপোর্ট সংরক্ষণ (দিন)",
		selfCriticism: "আত্মসমালোচনা (দিন)",
		increaseAssociate: "সহযোগী বৃদ্ধি (নাম)",
		increaseActivist: "কর্মী বৃদ্ধি (নাম)",
		increaseMember: "সদস্য বৃদ্ধি (নাম)",
		memorizingSura: "সূরা মুখস্ত",
		memorizingAyat: "আয়াত মুখস্ত",
		memorizingHadits: "হাদিস মুখস্ত",
		baitulmalIncreaseAmount: "বায়তুলমাল বৃদ্ধি (পরিমাণ)",
		sellBooksNumber: "বই বিক্রি (সংখ্যা)",
		socialHelp: "সামাজিক সাহায্য",
		professionalHelp: "পেশাগত সাহায্য",

		save: "অবস্থা সংরক্ষণ করুন",
		saving: "সংরক্ষণ করা হচ্ছে...",
		add: "+ যোগ করুন",
		noPlanNotice: "⚠️ আপনি এই মাসের জন্য কোনো পরিকল্পনা সংরক্ষণ করেননি। সাধারণ মান ব্যবহার করা হচ্ছে।",
	},
} as const;

function calculateThresholds(daysInMonth: number, fallback: MonthlyPlanData) {
	return [
		{ key: "quranStudy", summaryKey: "quranStudy", planKey: "quranStudyDays", isDays: true, isFixed: false, standard: fallback.quranStudyDays, general: daysInMonth - 5, danger: daysInMonth - 10 },
		{ key: "haditsRead", summaryKey: "haditsRead", planKey: "haditsRead", isDays: false, isFixed: false, standard: fallback.haditsRead, general: Math.ceil(fallback.haditsRead * 0.8), danger: Math.ceil(fallback.haditsRead * 0.5) },
		{ key: "literature", summaryKey: "literature", planKey: "literature", isDays: false, isFixed: false, standard: fallback.literature, general: Math.ceil(fallback.literature * 0.8), danger: Math.ceil(fallback.literature * 0.5) },
		{ key: "salahJamaat", summaryKey: "salahJamaat", planKey: "salahJamaat", isDays: false, isFixed: false, standard: fallback.salahJamaat, general: Math.ceil(fallback.salahJamaat * 0.8), danger: Math.ceil(fallback.salahJamaat * 0.5) },
		{ key: "targetContactDawah", summaryKey: "targetContactDawah", planKey: "targetContactDawah", isDays: false, isFixed: true, standard: fallback.targetContactDawah, general: Math.ceil(fallback.targetContactDawah * 0.6), danger: Math.ceil(fallback.targetContactDawah * 0.4) },
		{ key: "targetContactWorker", summaryKey: "targetContactWorker", planKey: "targetContactWorker", isDays: false, isFixed: true, standard: fallback.targetContactWorker, general: Math.ceil(fallback.targetContactWorker * 0.75), danger: Math.ceil(fallback.targetContactWorker * 0.5) },
		{ key: "targetContactMember", summaryKey: "targetContactMember", planKey: "targetContactMember", isDays: false, isFixed: true, standard: fallback.targetContactMember, general: Math.ceil(fallback.targetContactMember * 0.75), danger: Math.ceil(fallback.targetContactMember * 0.5) },
		{ key: "workerContact", summaryKey: "workerContact", planKey: "workerContact", isDays: false, isFixed: true, standard: fallback.workerContact, general: Math.ceil(fallback.workerContact * 0.66), danger: Math.ceil(fallback.workerContact * 0.33) },
		{ key: "bookDistribution", summaryKey: "bookDistribution", planKey: "bookDistribution", isDays: false, isFixed: true, standard: fallback.bookDistribution, general: Math.ceil(fallback.bookDistribution * 0.5), danger: 0, editable: false },
		{ key: "familyMeeting", summaryKey: "familyMeeting", planKey: "familyMeetingDays", isDays: false, isFixed: true, standard: fallback.familyMeetingDays, general: Math.ceil(fallback.familyMeetingDays * 0.5), danger: 1 },
		{ key: "socialWork", summaryKey: "socialWork", planKey: "socialWorkDays", isDays: true, isFixed: false, standard: fallback.socialWorkDays, general: Math.ceil(daysInMonth * (20 / 30)), danger: Math.ceil(daysInMonth * (10 / 30)) },
		{ key: "safarDays", summaryKey: "safar", planKey: "safarDays", isDays: true, isFixed: false, standard: fallback.safarDays, general: 0, danger: 0 },
		{ key: "orgWorkHours", summaryKey: "orgWorkHours", planKey: "orgWorkHours", isDays: false, isFixed: false, standard: fallback.orgWorkHours, general: Math.ceil(fallback.orgWorkHours * 0.8), danger: Math.ceil(fallback.orgWorkHours * 0.6) },
		{ key: "reportKeeping", summaryKey: "reportKeeping", planKey: "reportKeepingDays", isDays: true, isFixed: false, standard: fallback.reportKeepingDays, general: daysInMonth - 5, danger: daysInMonth - 10 },
		{ key: "selfCriticism", summaryKey: "selfCriticism", planKey: "selfCriticismDays", isDays: true, isFixed: false, standard: fallback.selfCriticismDays, general: daysInMonth - 5, danger: daysInMonth - 10 },
		{ key: "increaseAssociate", summaryKey: "increaseAssociate", planKey: "increaseAssociate", isArray: true, editable: true },
		{ key: "increaseActivist", summaryKey: "increaseActivist", planKey: "increaseActivist", isArray: true, editable: true },
		{ key: "increaseMember", summaryKey: "increaseMember", planKey: "increaseMember", isArray: true, editable: true },
		{ key: "memorizingSura", summaryKey: "memorizingSura", planKey: "memorizingSura", isArray: true, editable: true },
		{ key: "memorizingAyat", summaryKey: "memorizingAyat", planKey: "memorizingAyat", isArray: true, editable: true },
		{ key: "memorizingHadits", summaryKey: "memorizingHadits", planKey: "memorizingHadits", isArray: true, editable: true },
		{ key: "baitulmalIncreaseAmount", summaryKey: "baitulmalIncreaseAmount", planKey: "baitulmalIncreaseAmount", editable: true },
		{ key: "sellBooksNumber", summaryKey: "sellBooksNumber", planKey: "sellBooksNumber", editable: true },
		{ key: "socialHelp", summaryKey: "socialHelp", planKey: "socialHelp", isArray: true, editable: true },
		{ key: "professionalHelp", summaryKey: "professionalHelp", planKey: "professionalHelp", isArray: true, editable: true },
	];
}

function getStatusColor(value: number, thresholds: any) {
	if (value >= thresholds.standard) return "bg-green-100 text-green-800 border-green-200";
	if (value >= thresholds.general) return "bg-yellow-100 text-yellow-800 border-yellow-200";
	if (value >= thresholds.danger) return "bg-orange-100 text-orange-800 border-orange-200";
	return "bg-red-100 text-red-800 border-red-200";
}

function getDotColor(value: number, thresholds: any) {
	if (thresholds.standard === undefined || thresholds.standard === 0) return "bg-gray-300"; // No standard defined
	if (value >= thresholds.standard) return "bg-green-500";
	if (value >= thresholds.general) return "bg-yellow-500";
	if (value >= thresholds.danger) return "bg-orange-500";
	return "bg-red-500";
}

import React from 'react';

function DynamicListField({ items, onChange, t }: any) {
	const [input, setInput] = React.useState("");
	const handleAdd = () => {
		if (input.trim()) {
			onChange([...items, input.trim()]);
			setInput("");
		}
	};
	const handleRemove = (index: number) => {
		onChange(items.filter((_: any, i: number) => i !== index));
	};
	return (
		<div className="flex flex-col gap-1.5 w-full max-w-xs">
			<div className="flex gap-2">
				<input
					type="text"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAdd())}
					className="flex-1 border-2 border-gray-100 rounded-xl px-3 py-1.5 text-xs sm:text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 transition-all shadow-sm bg-gray-50/50 hover:bg-white focus:bg-white"
					placeholder="..."
				/>
				<button type="button" onClick={handleAdd} className="px-3 py-1.5 rounded-xl border-2 flex items-center gap-1.5 shadow-sm font-bold text-xs bg-indigo-50 text-indigo-600 border-indigo-100 hover:bg-indigo-100 hover:border-indigo-200 transition-colors whitespace-nowrap">
					<Plus className="w-3.5 h-3.5" /> {t.add}
				</button>
			</div>
			{items.length > 0 && (
				<ul className="mt-1.5 space-y-1">
					{items.map((item: string, i: number) => (
						<li key={i} className="flex items-center justify-between border border-gray-100 rounded-md px-2 py-1.5 shadow-sm text-xs bg-white">
							<span className="text-gray-700 truncate">{item}</span>
							<button type="button" onClick={() => handleRemove(i)} className="text-red-400 hover:text-red-600 ml-2">
								<Trash2 className="w-3.5 h-3.5" />
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default function StatusTabWrapper({ month }: { month: string }) {
	const { locale } = useLocale();
	const { data: session, status } = useSession();
	const t = TEXT[locale];
	const [summaryData, setSummaryData] = useState<any>(null);
	const [planData, setPlanData] = useState<any>(null);
	const [reportData, setReportData] = useState<any>({});
	const [saving, setSaving] = useState(false);
	const [loading, setLoading] = useState(false);

	const daysInMonth = month ? new Date(parseInt(month.split("-")[0]), parseInt(month.split("-")[1]), 0).getDate() : 30;
	const fallbackPlan = emptyMonthlyPlan(month);
	const thresholds = calculateThresholds(daysInMonth, fallbackPlan);

	useEffect(() => {
		let isMounted = true;
		async function fetchData() {
			if (!month || status === "loading") return;
			setLoading(true);
			try {
				const token = getAuthToken(session);
				const [summaryRes, reportRes, planRes] = await Promise.all([
					axios.get(`${API_URL}/personal-report/monthly-summary`, { params: { month }, headers: { Authorization: `Bearer ${token}` } }).catch(() => null),
					axios.get(`${API_URL}/monthly-report`, { params: { month }, headers: { Authorization: `Bearer ${token}` } }).catch(() => null),
					axios.get(`${API_URL}/monthly-plan`, { params: { month }, headers: { Authorization: `Bearer ${token}` } }).catch(() => null),
				]);
				if (isMounted) {
					setSummaryData(summaryRes?.data || null);
					setReportData(reportRes?.data || {});
					setPlanData(planRes?.data || null);
				}
			} catch (err) {
				console.error("Failed to fetch data", err);
			} finally {
				if (isMounted) setLoading(false);
			}
		}
		fetchData();
		return () => { isMounted = false; };
	}, [month, status, session]);

	
	const handleSave = async () => {
		if (!month) return;
		setSaving(true);
		try {
			const token = getAuthToken(session);
			await axios.post(
				`${API_URL}/monthly-report`,
				{ month, ...reportData },
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			// optionally show success toast
		} catch (error) {
			console.error("Failed to save report", error);
		} finally {
			setSaving(false);
		}
	};

	const formatValue = (key: string, val: number) => {
		if (key === "orgWorkHours" && val > 0) {
			return val.toFixed(1);
		}
		return val;
	};

	const getAchievedValue = (key: string, summaryKey: string, editable?: boolean, isArray?: boolean) => {
		if (editable) {
			if (isArray) return reportData[key] ? reportData[key].length : 0;
			return reportData[key] || 0;
		}
		if (!summaryData) return 0;
		if (key === "orgWorkHours") {
			return summaryData.orgWorkTotalSeconds / 3600 || 0;
		}
		return summaryData[summaryKey] || 0;
	};

	const getPlanValue = (planKey: string, isArray?: boolean, standard?: number) => {
		if (!planData || planData[planKey] === undefined || planData[planKey] === null) {
			return standard || 0;
		}
		if (isArray) {
			return Array.isArray(planData[planKey]) ? planData[planKey].length : 0;
		}
		return planData[planKey] || 0;
	};

	const labels: Record<string, string> = {
		quranStudy: t.quranStudy,
		haditsRead: t.haditsRead,
		literature: t.literaturePages,
		salahJamaat: t.salahInJamaat,
		targetContactDawah: t.targetDawah,
		targetContactWorker: t.targetWorker,
		targetContactMember: t.targetMember,
		workerContact: t.workerContact,
		bookDistribution: t.bookDistribution,
		familyMeeting: t.familyMeeting,
		socialWork: t.socialWork,
		safarDays: t.safarDays,
		orgWorkHours: t.orgWork,
		reportKeeping: t.reportKeeping,
		selfCriticism: t.selfCriticism,
		increaseAssociate: t.increaseAssociate,
		increaseActivist: t.increaseActivist,
		increaseMember: t.increaseMember,
		memorizingSura: t.memorizingSura,
		memorizingAyat: t.memorizingAyat,
		memorizingHadits: t.memorizingHadits,
		baitulmalIncreaseAmount: t.baitulmalIncreaseAmount,
		sellBooksNumber: t.sellBooksNumber,
		socialHelp: t.socialHelp,
		professionalHelp: t.professionalHelp,
	};

	return (
		<div className="max-w-4xl mx-auto my-8 sm:my-12 px-4 sm:px-0">
			<div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden ring-1 ring-black/[0.03] transition-all">
				<div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-indigo-100/50 bg-gradient-to-r from-indigo-50/50 to-violet-50/50 relative">
					<div className="text-center">
						<p className="text-[11px] text-indigo-500/80 font-bold uppercase tracking-widest mb-1">{t.status}</p>
						<p className="text-lg sm:text-xl font-black text-gray-800 tracking-tight">{month}</p>
					</div>
					{loading && (
						<div className="absolute top-1/2 right-6 -translate-y-1/2">
							<Loader2 className="w-5 h-5 text-indigo-500 animate-spin" />
						</div>
					)}
				</div>

				{!loading && !planData && (
					<div className="bg-orange-50 border-b border-orange-100 px-4 sm:px-6 py-3 flex items-center justify-center text-center">
						<p className="text-sm font-medium text-orange-800">
							{t.noPlanNotice}
						</p>
					</div>
				)}

				<div className="overflow-x-auto px-4 sm:px-6 pb-6 pt-2 bg-slate-50/30">
					<table className="w-full text-left border-separate border-spacing-y-2.5 min-w-[600px]">
						<thead>
							<tr className="text-indigo-900/60 text-xs uppercase tracking-widest font-bold">
								<th className="pb-3 px-4 sm:px-6 whitespace-nowrap">{t.subject}</th>
								<th className="pb-3 px-4 whitespace-nowrap text-center">{t.plan}</th>
								<th className="pb-3 px-4 whitespace-nowrap text-center">{t.achieved}</th>
								<th className="pb-3 px-4 sm:px-6 whitespace-nowrap text-right">{t.remaining}</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-50">
							{thresholds.map((th) => {
								const achievedVal = getAchievedValue(th.key, th.summaryKey!, th.editable, th.isArray);
								const planVal = getPlanValue(th.planKey!, th.isArray, th.standard);
								
								// Remaining based on Plan
								const remaining = Math.max(0, planVal - achievedVal);
								
								// Color logic based on background standards, if no standard exists, default to simple style
								const hasStandard = th.standard !== undefined && th.standard > 0;
								const colorClass = hasStandard ? getStatusColor(achievedVal, th) : "bg-gray-100 text-gray-800 border-gray-200";
								const dotColor = getDotColor(achievedVal, th);

								return (
									<tr key={th.key} className="bg-white hover:bg-indigo-50/40 transition-all duration-300 group shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] ring-1 ring-gray-100/80 hover:ring-indigo-100 hover:shadow-md rounded-2xl">
										<td className="py-4 px-4 sm:px-6 text-sm font-semibold text-gray-700 flex items-center gap-3 rounded-l-2xl">
											<span className={`w-2.5 h-2.5 rounded-full shadow-sm ${dotColor}`}></span>
											<span className="whitespace-nowrap">{labels[th.key]}</span>
										</td>
										<td className="py-4 px-4 text-sm text-center text-gray-400 font-bold">
											{formatValue(th.key, planVal)}
										</td>
										<td className="py-4 px-4">
											{th.editable ? (
												th.isArray ? (
													<div className="flex justify-center">
														<DynamicListField 
															items={reportData[th.key] || []} 
															onChange={(items: string[]) => setReportData((prev: any) => ({ ...prev, [th.key]: items }))} 
															t={t} 
														/>
													</div>
												) : (
													<div className="flex justify-center">
														<input 
															type="number" 
															min={0}
															className="w-full max-w-[120px] text-center border-2 border-gray-100 rounded-xl px-3 py-2 text-sm font-semibold text-indigo-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 transition-all shadow-sm bg-gray-50/50 hover:bg-white focus:bg-white"
															value={reportData[th.key] || 0}
															onChange={(e) => setReportData((prev: any) => ({ ...prev, [th.key]: parseInt(e.target.value) || 0 }))}
														/>
													</div>
												)
											) : (
												<div className="text-center">
													<span className={`inline-flex items-center justify-center px-3 py-1.5 text-xs font-black tracking-wide rounded-xl border-2 shadow-sm ${colorClass}`}>
														{formatValue(th.key, achievedVal)}
													</span>
												</div>
											)}
										</td>
										<td className="py-4 px-4 sm:px-6 text-right rounded-r-2xl">
											{remaining > 0 ? (
												<span className="text-sm font-black text-gray-300">{formatValue(th.key, remaining)}</span>
											) : (
												<span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 font-bold text-sm shadow-sm">✓</span>
											)}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>

				<div className="px-6 py-5 border-t border-gray-100 bg-gray-50 flex justify-end">
					<button
						onClick={handleSave}
						disabled={saving}
						className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl shadow-sm hover:bg-indigo-700 hover:shadow disabled:opacity-70 disabled:cursor-not-allowed transition-all"
					>
						{saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
						{saving ? t.saving : t.save}
					</button>
				</div>

			</div>
		</div>
	);
}
