"use client";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { isTokenExpired, getAuthToken } from "../../lib/getAuthToken";
import { useLocale } from "../../lib/locale";
import MonthlyPlanFormWrapper from "../dashboard/monthly-plan-form-wrapper";
import PersonalReportFormWrapper from "../dashboard/personal-report-form-wrapper";
import StatusTabWrapper from "../dashboard/status-tab-wrapper";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const TAB_LABELS = {
	en: {
		daily: "Daily Report",
		planning: "Planning",
		status: "Status",
		monthPickerLabel: "Select month",
	},
	bn: {
		daily: "দৈনিক রিপোর্ট",
		planning: "পরিকল্পনা",
		status: "অবস্থা",
		monthPickerLabel: "মাস নির্বাচন করুন",
	},
} as const;

function formatMonthYear(month: string) {
	if (!month) return "";
	const [year, monthNumber] = month.split("-").map(Number);
	if (!year || !monthNumber) return month;
	return new Date(year, monthNumber - 1, 1).toLocaleDateString("en-US", {
		month: "long",
		year: "numeric",
	});
}

function normalizeStringList(value: unknown): string[] {
	if (!Array.isArray(value)) return [];
	return value
		.map((item) => (typeof item === "string" ? item.trim() : ""))
		.filter(Boolean);
}

export default function PersonalReportTabs() {
	const { locale } = useLocale();
	const router = useRouter();
	const searchParams = useSearchParams();
	const t = TAB_LABELS[locale];
	const tabs = [t.daily, t.planning, t.status];
	const tabNames = ["daily", "planning", "status"];

	// Sync active tab with URL
	const activeTabName = searchParams?.get("tab") || "daily";
	const active = useMemo(() => {
		const idx = tabNames.indexOf(activeTabName);
		return idx !== -1 ? idx : 0;
	}, [activeTabName]);

	const setActive = useCallback((index: number) => {
		const params = new URLSearchParams(searchParams?.toString() || "");
		params.set("tab", tabNames[index]);
		router.push(`?${params.toString()}`, { scroll: false });
	}, [searchParams, router]);

	// Sync month with URL
	const urlMonth = searchParams?.get("month");
	const selectedMonth = useMemo(() => {
		if (urlMonth && /^\d{4}-\d{2}$/.test(urlMonth)) return urlMonth;
		const d = new Date();
		const y = d.getFullYear();
		const m = String(d.getMonth() + 1).padStart(2, "0");
		return `${y}-${m}`;
	}, [urlMonth]);

	const setSelectedMonth = useCallback((month: string) => {
		const params = new URLSearchParams(searchParams?.toString() || "");
		params.set("month", month);
		router.push(`?${params.toString()}`, { scroll: false });
	}, [searchParams, router]);

	const [planData, setPlanData] = useState<any>(null);
	const [summaryData, setSummaryData] = useState<any>(null);
	const [reportData, setReportData] = useState<any>({});
	const [fallbackToken, setFallbackToken] = useState<string | null>(null);
	const [refreshTrigger, setRefreshTrigger] = useState(0);

	const { data: session, status } = useSession();

	const getUserIdFromToken = useCallback((token: string | null): number | undefined => {
		if (!token) return undefined;
		try {
			const decoded = JSON.parse(atob(token.split('.')[1]));
			return decoded.sub;
		} catch {
			return undefined;
		}
	}, []);


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

	const getToken = useCallback(async (): Promise<string | null> => {
		const sessionToken = getAuthToken(session);
		const token = fallbackToken || sessionToken;
		if (!token || isTokenExpired(token)) {
			const refreshed = await refreshBackendToken();
			if (refreshed) return refreshed;
		}
		return token;
	}, [fallbackToken, session, refreshBackendToken]);

	const triggerRefresh = useCallback(() => {
		setRefreshTrigger(prev => prev + 1);
	}, []);

	const syncSelectedMonth = useCallback((month: string) => {
		if (!month || month === selectedMonth) return;
		setSelectedMonth(month);
		setPlanData(null);
		setSummaryData(null);
		setReportData({});
	}, [selectedMonth]);

	useEffect(() => {
		if (status === "loading") return;
		let isMounted = true;
		async function fetchData() {
			const token = await getToken();
			const userId = getUserIdFromToken(token) ?? (session as any)?.userId;
			try {
				const [summaryRes, reportRes, planRes] = await Promise.all([
					axios.get(`${API_URL}/personal-report/monthly-summary`, {
						params: { month: selectedMonth, userId },
						headers: token ? { Authorization: `Bearer ${token}` } : {},
					}).catch(() => null),
					axios.get(`${API_URL}/monthly-report`, {
						params: { month: selectedMonth, userId },
						headers: token ? { Authorization: `Bearer ${token}` } : {},
					}).catch(() => null),
					axios.get(`${API_URL}/monthly-plan`, {
						params: { month: selectedMonth, userId },
						headers: token ? { Authorization: `Bearer ${token}` } : {},
					}).catch(() => null),
				]);
				if (isMounted) {
					const all401 = [summaryRes, reportRes, planRes].every(r => r === null || r === undefined);
					// If all failed, check if it was due to auth
					// Actually we only care if they returned 401
					setSummaryData(summaryRes?.data || null);
					const nextReportData = reportRes?.data
						? {
							...reportRes.data,
							increaseAssociate: normalizeStringList(reportRes.data.increaseAssociate),
							increaseActivist: normalizeStringList(reportRes.data.increaseActivist),
							increaseMember: normalizeStringList(reportRes.data.increaseMember),
							memorizingSura: normalizeStringList(reportRes.data.memorizingSura),
							memorizingAyat: normalizeStringList(reportRes.data.memorizingAyat),
							memorizingHadits: normalizeStringList(reportRes.data.memorizingHadits),
							socialHelp: normalizeStringList(reportRes.data.socialHelp),
							professionalHelp: normalizeStringList(reportRes.data.professionalHelp),
						}
						: {};
					setReportData(nextReportData);

					let pData = planRes?.data || null;
					if (pData) {
						pData.increaseAssociate = normalizeStringList(pData.increaseAssociate);
						pData.increaseActivist = normalizeStringList(pData.increaseActivist);
						pData.increaseMember = normalizeStringList(pData.increaseMember);
						pData.memorizingSura = normalizeStringList(pData.memorizingSura);
						pData.memorizingAyat = normalizeStringList(pData.memorizingAyat);
						pData.memorizingHadits = normalizeStringList(pData.memorizingHadits);
						pData.socialHelp = normalizeStringList(pData.socialHelp);
						pData.professionalHelp = normalizeStringList(pData.professionalHelp);
					}
					setPlanData(pData);
				}
			} catch (err) {
				console.error("Data fetch failed", err);
			}
		}
		fetchData();
		return () => { isMounted = false; };
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedMonth, status, session, refreshTrigger, getToken, getUserIdFromToken]);

	// Auto-refresh when visiting the Status tab
	useEffect(() => {
		if (active === 2) {
			triggerRefresh();
		}
	}, [active, triggerRefresh]);

	const handleMonthChange = (offset: number) => {
		const [year, month] = selectedMonth.split('-').map(Number);
		const d = new Date(year, month - 1 + offset, 1);
		const y = d.getFullYear();
		const m = String(d.getMonth() + 1).padStart(2, "0");
		setSelectedMonth(`${y}-${m}`);
		setPlanData(null);
		setSummaryData(null);
		setReportData({});
	};

	return (
		<div className="w-full">
			{/* Mobile: Sticky tabs navigation */}
			<div className="sticky top-16 z-30 bg-white border-b border-gray-100 shadow-sm sm:hidden">
				<div className="px-4 py-3 flex flex-wrap gap-2 justify-center sm:justify-start">
					{tabs.map((t, i) => (
						<button
							key={t}
							onClick={() => setActive(i)}
							className={`px-3 py-2 rounded-xl text-sm font-medium transition ${i === active
								? "bg-indigo-50 border border-indigo-200 text-indigo-700"
								: "bg-white border border-gray-100 text-gray-600 hover:bg-gray-50"
								}`}
						>
							{t}
						</button>
					))}
				</div>
			</div>
			<div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
				{/* Desktop: Tabs and month picker in card */}
				<div className="hidden sm:flex items-center justify-between gap-4 mb-4">
					<div className="flex flex-wrap gap-2">
						{tabs.map((t, i) => (
							<button
								key={t}
								onClick={() => setActive(i)}
								className={`px-3 py-2 rounded-xl text-sm font-medium transition ${i === active
									? "bg-indigo-50 border border-indigo-200 text-indigo-700"
									: "bg-white border border-gray-100 text-gray-600 hover:bg-gray-50"
									}`}
							>
								{t}
							</button>
						))}
					</div>
					<div className="relative flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1 shadow-sm min-w-[160px] justify-between">
						<button
							onClick={() => handleMonthChange(-1)}
							className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"
						>
							<ChevronLeft className="w-4 h-4" />
						</button>
						<div className="flex-1">
							<label className="sr-only" htmlFor="personal-report-month">
								{t.monthPickerLabel}
							</label>
							<input
								id="personal-report-month"
								type="month"
								value={selectedMonth}
								onChange={(e) => {
									setSelectedMonth(e.target.value);
									setPlanData(null);
									setSummaryData(null);
									setReportData({});
								}}
								aria-label={t.monthPickerLabel}
								title={formatMonthYear(selectedMonth)}
								className="w-full rounded-lg border border-transparent bg-transparent py-1 text-center text-sm font-semibold text-gray-700 focus:border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
							/>
						</div>
						<button
							onClick={() => handleMonthChange(1)}
							className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"
						>
							<ChevronRight className="w-4 h-4" />
						</button>
					</div>
				</div>

				{/* Mobile: Month picker only in card */}
				<div className="flex sm:hidden items-center justify-center gap-1 bg-white border border-gray-200 rounded-xl p-1 shadow-sm min-w-[160px] mx-auto mb-4">
					<button
						onClick={() => handleMonthChange(-1)}
						className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"
					>
						<ChevronLeft className="w-4 h-4" />
					</button>
					<div className="flex-1">
						<label className="sr-only" htmlFor="personal-report-month">
							{t.monthPickerLabel}
						</label>
						<input
							id="personal-report-month"
							type="month"
							value={selectedMonth}
							onChange={(e) => {
								setSelectedMonth(e.target.value);
								setPlanData(null);
								setSummaryData(null);
								setReportData({});
							}}
							aria-label={t.monthPickerLabel}
							title={formatMonthYear(selectedMonth)}
							className="w-full rounded-lg border border-transparent bg-transparent py-1 text-center text-sm font-semibold text-gray-700 focus:border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
						/>
					</div>
					<button
						onClick={() => handleMonthChange(1)}
						className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"
					>
						<ChevronRight className="w-4 h-4" />
					</button>
				</div>

				<div className="mt-2">
					{active === 0 && (
						<PersonalReportFormWrapper
							onRefresh={triggerRefresh}
							selectedMonth={selectedMonth}
							onSelectedMonthChange={syncSelectedMonth}
						/>
					)}
					{active === 1 && (
						<MonthlyPlanFormWrapper
							month={selectedMonth}
							planData={planData}
							onRefresh={triggerRefresh}
						/>
					)}
					{active === 2 && (
						<StatusTabWrapper
							month={selectedMonth}
							planData={planData}
							summaryData={summaryData}
							reportData={reportData}
							onReportDataChange={setReportData}
							onPlanDataChange={setPlanData}
						/>
					)}
				</div>
			</div>
		</div>
	);
}
