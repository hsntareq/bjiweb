"use client";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocale } from "../../lib/locale";
import { useSession } from "next-auth/react";
import axios from "axios";
import PersonalReportFormWrapper from "../dashboard/personal-report-form-wrapper";
import MonthlyPlanFormWrapper from "../dashboard/monthly-plan-form-wrapper";
import StatusTabWrapper from "../dashboard/status-tab-wrapper";
import { isTokenExpired } from "../../lib/getAuthToken";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const TAB_LABELS = {
	en: {
		daily: "Daily Report",
		planning: "Planning",
		status: "Status",
		targets: "Targets",
		targetsHint: "Targets tab - manage targets and goals here.",
	},
	bn: {
		daily: "দৈনিক রিপোর্ট",
		planning: "পরিকল্পনা",
		status: "অবস্থা",
		targets: "টার্গেট",
		targetsHint: "টার্গেট ট্যাব - এখানে লক্ষ্য ও টার্গেট পরিচালনা করুন।",
	},
} as const;

export default function PersonalReportTabs() {
	const { locale } = useLocale();
	const t = TAB_LABELS[locale];
	const tabs = [t.daily, t.planning, t.status, t.targets];
	const [active, setActive] = useState(0);
	const [planData, setPlanData] = useState<any>(null);
	const [summaryData, setSummaryData] = useState<any>(null);
	const [reportData, setReportData] = useState<any>({});
	const [fallbackToken, setFallbackToken] = useState<string | null>(null);

	const { data: session, status } = useSession();

	const [selectedMonth, setSelectedMonth] = useState(() => {
		const d = new Date();
		const y = d.getFullYear();
		const m = String(d.getMonth() + 1).padStart(2, "0");
		return `${y}-${m}`;
	});

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
		const token = fallbackToken || ((session as any)?.accessToken as string | undefined) || null;
		// Only attempt Google token refresh - for email/mobile the token is always valid from session
		if (!token || isTokenExpired(token)) {
			const refreshed = await refreshBackendToken();
			if (refreshed) return refreshed;
		}
		return token;
	}, [fallbackToken, session, refreshBackendToken]);

	useEffect(() => {
		if (status === "loading") return;
		let isMounted = true;
		async function fetchStatusData() {
			const token = await getToken();
			if (!token) {
				console.warn("[StatusTab] No auth token available, skipping fetch");
				return;
			}
			try {
				const [summaryRes, reportRes] = await Promise.all([
					axios.get(`${API_URL}/personal-report/monthly-summary`, {
						params: { month: selectedMonth },
						headers: { Authorization: `Bearer ${token}` },
					}).catch((e) => { console.error("[StatusTab] summary fetch failed", e?.response?.status); return null; }),
					axios.get(`${API_URL}/monthly-report`, {
						params: { month: selectedMonth },
						headers: { Authorization: `Bearer ${token}` },
					}).catch(() => null),
				]);
				if (isMounted) {
					setSummaryData(summaryRes?.data || null);
					setReportData(reportRes?.data || {});
				}
			} catch (err) {
				console.error("Status data fetch failed", err);
			}
		}
		fetchStatusData();
		return () => { isMounted = false; };
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedMonth, status, session]);

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
		<div className="max-w-4xl mx-auto my-8">
			<div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
				<div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
					<div className="flex flex-wrap gap-2">
						{tabs.map((t, i) => (
							<button
								key={t}
								onClick={() => setActive(i)}
								className={`px-3 py-2 rounded-xl text-sm font-medium transition ${
									i === active
										? "bg-indigo-50 border border-indigo-200 text-indigo-700"
										: "bg-white border border-gray-100 text-gray-600 hover:bg-gray-50"
								}`}
							>
								{t}
							</button>
						))}
					</div>
					<div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
						<button
							onClick={() => handleMonthChange(-1)}
							className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"
						>
							<ChevronLeft className="w-4 h-4" />
						</button>
						<input
							type="month"
							value={selectedMonth}
							onChange={(e) => {
								setSelectedMonth(e.target.value);
								setPlanData(null);
								setSummaryData(null);
								setReportData({});
							}}
							className="px-2 py-1 text-sm font-semibold text-gray-700 focus:outline-none bg-transparent border-none ring-0 max-w-[130px] text-center"
						/>
						<button
							onClick={() => handleMonthChange(1)}
							className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"
						>
							<ChevronRight className="w-4 h-4" />
						</button>
					</div>
				</div>

				<div className="mt-2">
					{active === 0 && <PersonalReportFormWrapper />}
					{active === 1 && (
						<MonthlyPlanFormWrapper month={selectedMonth} onPlanLoaded={setPlanData} />
					)}
					{active === 2 && (
						<StatusTabWrapper
							month={selectedMonth}
							planData={planData}
							summaryData={summaryData}
							reportData={reportData}
							onReportDataChange={setReportData}
						/>
					)}
					{active === 3 && (
						<div className="p-4 text-sm text-gray-600">{t.targetsHint}</div>
					)}
				</div>
			</div>
		</div>
	);
}
