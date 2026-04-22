"use client";
import { useState } from "react";
import { useLocale } from "../../lib/locale";
import PersonalReportFormWrapper from "../dashboard/personal-report-form-wrapper";
import MonthlyPlanFormWrapper from "../dashboard/monthly-plan-form-wrapper";

const TAB_LABELS = {
	en: {
		daily: "Daily Report",
		planning: "Planning",
		status: "Status",
		targets: "Targets",
		planningHint: "Planning tab - add planning UI here.",
		statusHint: "Status tab - show aggregated status and metrics here.",
		targetsHint: "Targets tab - manage targets and goals here.",
	},
	bn: {
		daily: "দৈনিক রিপোর্ট",
		planning: "পরিকল্পনা",
		status: "অবস্থা",
		targets: "টার্গেট",
		planningHint: "পরিকল্পনা ট্যাব - এখানে পরিকল্পনার UI যোগ করুন।",
		statusHint: "অবস্থা ট্যাব - এখানে সমষ্টিগত অবস্থা ও মেট্রিক দেখান।",
		targetsHint: "টার্গেট ট্যাব - এখানে লক্ষ্য ও টার্গেট পরিচালনা করুন।",
	},
} as const;

export default function PersonalReportTabs() {
	const { locale } = useLocale();
	const t = TAB_LABELS[locale];
	const tabs = [t.daily, t.planning, t.status, t.targets];
	const [active, setActive] = useState(0);

	const [selectedMonth, setSelectedMonth] = useState(() => {
		const d = new Date();
		const y = d.getFullYear();
		const m = String(d.getMonth() + 1).padStart(2, "0");
		return `${y}-${m}`;
	});

	return (
		<div className="max-w-4xl mx-auto my-8">
			<div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
				<div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
					<div className="flex flex-wrap gap-2">
						{tabs.map((t, i) => (
							<button
								key={t}
								onClick={() => setActive(i)}
								className={`px-3 py-2 rounded-xl text-sm font-medium transition ${i === active ? "bg-indigo-50 border border-indigo-200 text-indigo-700" : "bg-white border border-gray-100 text-gray-600 hover:bg-gray-50"
									}`}
							>
								{t}
							</button>
						))}
					</div>
					<div>
						<input
							type="month"
							value={selectedMonth}
							onChange={(e) => setSelectedMonth(e.target.value)}
							className="px-3 py-2 rounded-xl text-sm font-medium border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
						/>
					</div>
				</div>

				<div className="mt-2">
					{active === 0 && <PersonalReportFormWrapper />}

					{active === 1 && (
						<MonthlyPlanFormWrapper month={selectedMonth} />
					)}

					{active === 2 && (
						<div className="p-4 text-sm text-gray-600">{t.statusHint}</div>
					)}

					{active === 3 && (
						<div className="p-4 text-sm text-gray-600">{t.targetsHint}</div>
					)}
				</div>
			</div>
		</div>
	);
}
