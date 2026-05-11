"use client";
import axios from "axios";
import { Loader2, Plus, Save, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { isTokenExpired, getAuthToken } from "../../lib/getAuthToken";
import { useLocale } from "../../lib/locale";
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
		add: "Add",
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
		add: "যোগ করুন",
		noPlanNotice: "⚠️ আপনি এই মাসের জন্য কোনো পরিকল্পনা সংরক্ষণ করেননি। সাধারণ মান ব্যবহার করা হচ্ছে।",
	},
} as const;

function normalizeStringList(value: unknown): string[] {
	if (!Array.isArray(value)) return [];
	return value
		.map((item) => (typeof item === "string" ? item.trim() : ""))
		.filter(Boolean);
}

function formatMonthYear(month: string) {
	if (!month) return "";
	const [year, monthNumber] = month.split("-").map(Number);
	if (!year || !monthNumber) return month;
	return new Date(year, monthNumber - 1, 1).toLocaleDateString("en-US", {
		month: "long",
		year: "numeric",
	});
}

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
	const normalizedItems = normalizeStringList(items);
	const handleAdd = () => {
		const nextItem = input.trim();
		if (!nextItem) return;
		onChange([...normalizedItems, nextItem]);
		setInput("");
	};
	const handleRemove = (index: number) => {
		onChange(normalizedItems.filter((_: string, i: number) => i !== index));
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
			{normalizedItems.length > 0 && (
				<ul className="mt-1.5 space-y-1">
					{normalizedItems.map((item: string, i: number) => (
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

export default function StatusTabWrapper({
	month,
	planData,
	summaryData,
	reportData: reportDataProp,
	onReportDataChange,
	onPlanDataChange,
}: {
	month: string;
	planData?: any;
	summaryData?: any;
	reportData?: any;
	onReportDataChange?: (data: any) => void;
	onPlanDataChange?: (data: any) => void;
}) {
	const { locale } = useLocale();
	const { data: session } = useSession();
	const t = TEXT[locale];
	const [reportData, setReportData] = useState<any>(reportDataProp || {});
	const [localPlanData, setLocalPlanData] = useState<any>(planData || {});
	const [saving, setSaving] = useState(false);
	const [loading] = useState(false);
	const [fallbackToken, setFallbackToken] = useState<string | null>(null);

	// Sync external reportData prop into local state
	useEffect(() => {
		setReportData(reportDataProp || {});
	}, [reportDataProp]);

	// Sync external planData prop into local state
	useEffect(() => {
		setLocalPlanData(planData || {});
	}, [planData]);

	const setReportDataAndNotify = (updater: any) => {
		setReportData((prev: any) => {
			const next = typeof updater === "function" ? updater(prev) : updater;
			onReportDataChange?.(next);
			return next;
		});
	};

	const setPlanDataAndNotify = (updater: any) => {
		setLocalPlanData((prev: any) => {
			const next = typeof updater === "function" ? updater(prev) : updater;
			onPlanDataChange?.(next);
			return next;
		});
	};

	const refreshBackendToken = useCallback(async (): Promise<string | null> => {
		const provider = (session as any)?.provider;
		const googleId = (session as any)?.googleId;
		const email = session?.user?.email;
		if (provider !== "google" || !googleId || !email) return null;

		try {
			const res = await axios.post(`${API_URL}/auth/google`, { googleId, email });
			const nextToken = res?.data?.access_token as string | undefined;
			if (!nextToken) return null;
			setFallbackToken(nextToken);
			return nextToken;
		} catch {
			return null;
		}
	}, [session]);

	const getAuthTokenAsync = useCallback(async (): Promise<string | null> => {
		const sessionToken = getAuthToken(session);
		const token = fallbackToken || sessionToken;
		if (session && (!token || isTokenExpired(token))) {
			const refreshedToken = await refreshBackendToken();
			if (refreshedToken) return refreshedToken;
		}
		return token;
	}, [fallbackToken, session, refreshBackendToken]);

	const authorizedPost = useCallback(async (url: string, data: any) => {
		let token = await getAuthTokenAsync();
		if (!token) throw new Error("Not authenticated");

		try {
			return await axios.post(url, data, {
				headers: { Authorization: `Bearer ${token}` },
			});
		} catch (err: any) {
			if (err?.response?.status === 401) {
				const refreshedToken = await refreshBackendToken();
				if (refreshedToken) {
					return await axios.post(url, data, {
						headers: { Authorization: `Bearer ${refreshedToken}` },
					});
				}
			}
			throw err;
		}
	}, [getAuthToken, refreshBackendToken]);

	const daysInMonth = month ? new Date(parseInt(month.split("-")[0]), parseInt(month.split("-")[1]), 0).getDate() : 30;
	const fallbackPlan = emptyMonthlyPlan(month);
	const thresholds = calculateThresholds(daysInMonth, planData ? { ...fallbackPlan, ...planData } : fallbackPlan);


	const handleSave = async () => {
		if (!month) return;
		setSaving(true);
		try {
			// Save plan data if it has plan fields
			const hasPlanChanges = Object.keys(localPlanData).some(key =>
				['increaseAssociate', 'increaseActivist', 'increaseMember', 'memorizingSura', 'memorizingAyat', 'memorizingHadits', 'baitulmalIncreaseAmount', 'sellBooksNumber', 'socialHelp', 'professionalHelp'].includes(key)
			);

			if (hasPlanChanges) {
				const planDataToSave = {
					month,
					increaseAssociate: localPlanData.increaseAssociate || [],
					increaseActivist: localPlanData.increaseActivist || [],
					increaseMember: localPlanData.increaseMember || [],
					memorizingSura: localPlanData.memorizingSura || [],
					memorizingAyat: localPlanData.memorizingAyat || [],
					memorizingHadits: localPlanData.memorizingHadits || [],
					baitulmalIncreaseAmount: localPlanData.baitulmalIncreaseAmount || 0,
					sellBooksNumber: localPlanData.sellBooksNumber || 0,
					socialHelp: localPlanData.socialHelp || [],
					professionalHelp: localPlanData.professionalHelp || [],
				};
				await authorizedPost(`${API_URL}/monthly-plan`, planDataToSave);
			}

			// Save report data - filter out non-editable fields
			const { id, createdAt, updatedAt, userId, user, month: existingMonth, ...cleanReportData } = reportData as any;
			await authorizedPost(
				`${API_URL}/monthly-report`,
				{ month, ...cleanReportData }
			);
			// optionally show success toast
		} catch (error) {
			console.error("Failed to save", error);
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
		<div className="w-full px-0 sm:px-8 py-0 sm:py-4">
			<div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/50 overflow-hidden ring-1 ring-black/5 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
				{/* Header */}
				<div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-indigo-100/50 bg-gradient-to-r from-indigo-50/50 to-violet-50/50 relative">
					<div className="text-center">
						<p className="text-xs text-indigo-500/80 font-bold uppercase tracking-widest mb-1">{t.status}</p>
						<p className="text-lg sm:text-xl font-black text-gray-800 tracking-tight">
							{formatMonthYear(month)}
						</p>
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

				<div className="px-4 sm:px-6 pb-6 pt-4">
					{/* Desktop Table View */}
					<div className="hidden sm:block overflow-x-auto">
						<table className="w-full text-left border-separate border-spacing-y-2">
							<thead>
								<tr className="text-indigo-900/50 text-xs uppercase tracking-widest font-bold">
									<th className="pb-2 px-3 whitespace-nowrap">{t.subject}</th>
									<th className="pb-2 px-3 whitespace-nowrap text-center">{t.plan}</th>
									<th className="pb-2 px-3 whitespace-nowrap text-center">{t.achieved}</th>
									<th className="pb-2 px-3 whitespace-nowrap text-right">{t.remaining}</th>
								</tr>
							</thead>
							<tbody>
								{thresholds.map((th) => {
									const achievedVal = getAchievedValue(th.key, th.summaryKey!, th.editable, th.isArray);
									const planVal = getPlanValue(th.planKey!, th.isArray, th.standard);
									const remaining = Math.max(0, planVal - achievedVal);
									const hasStandard = th.standard !== undefined && th.standard > 0;
									const colorClass = hasStandard ? getStatusColor(achievedVal, th) : "bg-gray-100 text-gray-800 border-gray-200";
									const dotColor = getDotColor(achievedVal, th);

									return (
										<tr key={th.key} className="bg-white hover:bg-indigo-50/30 transition-colors rounded-xl shadow-sm ring-1 ring-gray-100">
											<td className="py-3 px-3 text-xs sm:text-sm font-semibold text-gray-700 rounded-l-xl">
												<div className="flex items-center gap-2">
													<span className={`w-2 h-2 rounded-full flex-shrink-0 ${dotColor}`} />
													<span>{labels[th.key]}</span>
												</div>
											</td>
											<td className="py-3 px-3 text-sm text-center text-gray-400 font-bold">
												{formatValue(th.key, planVal)}
											</td>
											<td className="py-3 px-3">
												{th.editable ? (
													th.isArray ? (
														<div className="flex justify-center">
															<DynamicListField
																items={reportData[th.key] || []}
																onChange={(items: string[]) => setReportDataAndNotify((prev: any) => ({ ...prev, [th.key]: items }))}
																t={t}
															/>
														</div>
													) : (
														<div className="flex justify-center">
															<input
																type="number"
																min={0}
																className="w-full max-w-[100px] text-center border border-gray-200 rounded-xl px-2.5 py-1.5 text-sm font-semibold text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm bg-white/50 hover:border-gray-300"
																value={reportData[th.key] || 0}
																onChange={(e) => setReportDataAndNotify((prev: any) => ({ ...prev, [th.key]: parseInt(e.target.value) || 0 }))}
															/>
														</div>
													)
												) : (
													<div className="text-center">
														<span className={`inline-flex items-center justify-center px-2.5 py-1 text-xs font-bold rounded-lg border ${colorClass}`}>
															{formatValue(th.key, achievedVal)}
														</span>
													</div>
												)}
											</td>
											<td className="py-3 px-3 text-right rounded-r-xl">
												{remaining > 0 ? (
													<span className="text-xs font-bold text-gray-400">{formatValue(th.key, remaining)}</span>
												) : (
													<span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-100 text-green-600 font-bold text-xs">✓</span>
												)}
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>

					{/* Mobile Card View */}
					<div className="sm:hidden space-y-2">
						{thresholds.map((th) => {
							const achievedVal = getAchievedValue(th.key, th.summaryKey!, th.editable, th.isArray);
							const planVal = getPlanValue(th.planKey!, th.isArray, th.standard);
							const remaining = Math.max(0, planVal - achievedVal);
							const hasStandard = th.standard !== undefined && th.standard > 0;
							const colorClass = hasStandard ? getStatusColor(achievedVal, th) : "bg-gray-100 text-gray-800 border-gray-200";
							const dotColor = getDotColor(achievedVal, th);

							return (
								<div key={th.key} className="bg-white hover:bg-indigo-50/30 transition-colors rounded-xl shadow-sm ring-1 ring-gray-100 p-3">
									{/* Label */}
									<div className="flex items-center gap-2 mb-2">
										<span className={`w-2 h-2 rounded-full flex-shrink-0 ${dotColor}`} />
										<span className="text-xs font-semibold text-gray-700">{labels[th.key]}</span>
									</div>

									{/* Plan, Achieved, Remaining */}
									<div className="grid grid-cols-3 gap-2">
										{/* Plan */}
										<div className="text-center">
											<div className="text-xs uppercase tracking-widest font-bold text-indigo-900/50 mb-1">{t.plan}</div>
											<div className="text-sm text-gray-400 font-bold">
												{formatValue(th.key, planVal)}
											</div>
										</div>

										{/* Achieved */}
										<div className="text-center">
											<div className="text-xs uppercase tracking-widest font-bold text-indigo-900/50 mb-1">{t.achieved}</div>
											<div>
												{th.editable ? (
													th.isArray ? (
														<div className="flex justify-center">
															<span className="text-sm font-bold text-indigo-900">
																{(reportData[th.key] || []).length}
															</span>
														</div>
													) : (
														<input
															type="number"
															min={0}
															className="w-full text-center border border-gray-200 rounded-lg px-1.5 py-1 text-sm font-semibold text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm bg-white/50"
															value={localPlanData[th.key] || 0}
															onChange={(e) => setPlanDataAndNotify((prev: any) => ({ ...prev, [th.key]: parseInt(e.target.value) || 0 }))}
														/>
													)
												) : (
													<span className={`inline-flex items-center justify-center px-2 py-1 text-xs font-bold rounded-lg border ${colorClass}`}>
														{formatValue(th.key, achievedVal)}
													</span>
												)}
											</div>
										</div>

										{/* Remaining */}
										<div className="text-center">
											<div className="text-xs uppercase tracking-widest font-bold text-indigo-900/50 mb-1">{t.remaining}</div>
											<div>
												{remaining > 0 ? (
													<span className="text-xs font-bold text-gray-400">{formatValue(th.key, remaining)}</span>
												) : (
													<span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-100 text-green-600 font-bold text-xs mx-auto">✓</span>
												)}
											</div>
										</div>
									</div>

									{/* Expandable list field for array fields on mobile */}
									{th.editable && th.isArray && (
										<div className="mt-3 pt-3 border-t border-gray-100">
											<DynamicListField
												items={reportData[th.key] || []}
												onChange={(items: string[]) => setReportDataAndNotify((prev: any) => ({ ...prev, [th.key]: items }))}
												t={t}
											/>
										</div>
									)}
								</div>
							);
						})}
					</div>
				</div>

				<div className="px-4 sm:px-6 py-4 border-t border-gray-100 flex justify-end">
					<button
						onClick={handleSave}
						disabled={saving}
						className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl shadow-sm hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
					>
						{saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
						{saving ? t.saving : t.save}
					</button>
				</div>
			</div>
		</div>
	);
}
