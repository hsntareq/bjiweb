"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { getAuthToken } from "../../lib/getAuthToken";
import { useLocale } from "../../lib/locale";

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
		quranStudy: "Quran Study (Days)",
		haditsRead: "Hadits Read",
		literaturePages: "Literature (Pages)",
		salahInJamaat: "Salah in Jamaat (Times)",
		targetDawah: "Target - Dawah",
		targetWorker: "Target - Worker",
		targetMember: "Target - Member",
		workerContact: "Worker Contact",
		familyMeeting: "Family Meeting (Count)",
		socialWork: "Social Work (Days)",
		orgWork: "Time Given (Hours)",
		reportKeeping: "Report Keeping (Days)",
		selfCriticism: "Self Criticism (Days)",
	},
	bn: {
		status: "মাসিক অবস্থা",
		subject: "বিষয়",
		achieved: "অর্জিত",
		standard: "মান",
		general: "সাধারণ মান",
		danger: "বিপদসীমা",
		remaining: "বাকি",
		quranStudy: "কুরআন অধ্যয়ন (দিন)",
		haditsRead: "হাদিস অধ্যয়ন (সংখ্যা)",
		literaturePages: "ইসলামী সাহিত্য অধ্যয়ন (পৃষ্ঠা)",
		salahInJamaat: "জামায়াতে নামাজ (ওয়াক্ত সংখ্যা)",
		targetDawah: "দাওয়াতি টার্গেটি সাক্ষাত (কতবার)",
		targetWorker: "কর্মী টার্গেটি সাক্ষাত (কতবার)",
		targetMember: "সদস্য (রুকন) টার্গেটি সাক্ষাত (কতবার)",
		workerContact: "কর্মী যোগাযোগ (কতবার)",
		familyMeeting: "পারিবারিক বৈঠক (সংখ্যা)",
		socialWork: "সামাজিক কাজ (দিন)",
		orgWork: "সময় দান (ঘণ্টা)",
		reportKeeping: "রিপোর্ট সংরক্ষণ (দিন)",
		selfCriticism: "আত্মসমালোচনা (দিন)",
	},
} as const;

function calculateThresholds(daysInMonth: number) {
	return [
		{ key: "quranStudy", isDays: true, isFixed: false, standard: daysInMonth, general: daysInMonth - 5, danger: daysInMonth - 10 },
		{ key: "haditsRead", isDays: false, isFixed: false, standard: daysInMonth, general: daysInMonth - 5, danger: daysInMonth - 10 },
		{ key: "literature", isDays: false, isFixed: false, standard: 10 * daysInMonth, general: Math.ceil(6.66 * daysInMonth), danger: Math.ceil(3.33 * daysInMonth) },
		{ key: "salahJamaat", isDays: false, isFixed: false, standard: 5 * daysInMonth, general: Math.ceil(4.16 * daysInMonth), danger: Math.ceil(3.33 * daysInMonth) },
		{ key: "targetContactDawah", isDays: false, isFixed: true, standard: 5, general: 3, danger: 2 },
		{ key: "targetContactWorker", isDays: false, isFixed: true, standard: 4, general: 3, danger: 2 },
		{ key: "targetContactMember", isDays: false, isFixed: true, standard: 6, general: 3, danger: 2 },
		{ key: "workerContact", isDays: false, isFixed: true, standard: 3, general: 2, danger: 1 },
		{ key: "familyMeeting", isDays: false, isFixed: true, standard: 4, general: 2, danger: 1 },
		{ key: "socialWork", isDays: true, isFixed: false, standard: daysInMonth, general: Math.ceil(daysInMonth * (20 / 30)), danger: Math.ceil(daysInMonth * (10 / 30)) },
		{ key: "orgWorkHours", isDays: false, isFixed: false, standard: 3 * daysInMonth, general: Math.ceil(2.5 * daysInMonth), danger: 2 * daysInMonth },
		{ key: "reportKeeping", isDays: true, isFixed: false, standard: daysInMonth, general: daysInMonth - 5, danger: daysInMonth - 10 },
		{ key: "selfCriticism", isDays: true, isFixed: false, standard: daysInMonth, general: daysInMonth - 5, danger: daysInMonth - 10 },
	];
}

function getStatusColor(value: number, thresholds: any) {
	if (value >= thresholds.standard) return "bg-green-100 text-green-800 border-green-200";
	if (value >= thresholds.general) return "bg-yellow-100 text-yellow-800 border-yellow-200";
	if (value >= thresholds.danger) return "bg-orange-100 text-orange-800 border-orange-200";
	return "bg-red-100 text-red-800 border-red-200";
}

function getDotColor(value: number, thresholds: any) {
	if (value >= thresholds.standard) return "bg-green-500";
	if (value >= thresholds.general) return "bg-yellow-500";
	if (value >= thresholds.danger) return "bg-orange-500";
	return "bg-red-500";
}

export default function StatusTabWrapper({ month }: { month: string }) {
	const { locale } = useLocale();
	const t = TEXT[locale];
	const [data, setData] = useState<any>(null);
	const [loading, setLoading] = useState(false);

	const daysInMonth = month ? new Date(parseInt(month.split("-")[0]), parseInt(month.split("-")[1]), 0).getDate() : 30;
	const thresholds = calculateThresholds(daysInMonth);

	useEffect(() => {
		let isMounted = true;
		async function fetchSummary() {
			if (!month) return;
			setLoading(true);
			try {
				const token = await getAuthToken();
				const res = await axios.get(`${API_URL}/personal-report/monthly-summary`, {
					params: { month },
					headers: { Authorization: `Bearer ${token}` },
				});
				if (isMounted) {
					setData(res.data);
				}
			} catch (err) {
				console.error("Failed to fetch summary", err);
			} finally {
				if (isMounted) setLoading(false);
			}
		}
		fetchSummary();
		return () => { isMounted = false; };
	}, [month]);

	const formatValue = (key: string, val: number) => {
		if (key === "orgWorkHours" && data) {
			return (data.orgWorkTotalSeconds / 3600).toFixed(1);
		}
		return val;
	};

	const getValue = (key: string) => {
		if (!data) return 0;
		if (key === "orgWorkHours") {
			return data.orgWorkTotalSeconds / 3600;
		}
		return data[key] || 0;
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
		familyMeeting: t.familyMeeting,
		socialWork: t.socialWork,
		orgWorkHours: t.orgWork,
		reportKeeping: t.reportKeeping,
		selfCriticism: t.selfCriticism,
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

				<div className="overflow-x-auto">
					<table className="w-full text-left border-collapse">
						<thead>
							<tr className="bg-gray-50/80 text-gray-500 text-xs uppercase tracking-wider font-semibold border-b border-gray-100">
								<th className="py-3 px-4 sm:px-6 whitespace-nowrap">{t.subject}</th>
								<th className="py-3 px-4 whitespace-nowrap text-center">{t.standard}</th>
								<th className="py-3 px-4 whitespace-nowrap text-center hidden sm:table-cell">{t.general}</th>
								<th className="py-3 px-4 whitespace-nowrap text-center hidden sm:table-cell">{t.danger}</th>
								<th className="py-3 px-4 whitespace-nowrap text-center">{t.achieved}</th>
								<th className="py-3 px-4 sm:px-6 whitespace-nowrap text-right">{t.remaining}</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-50">
							{thresholds.map((th) => {
								const val = getValue(th.key);
								const remaining = Math.max(0, th.standard - val);
								const colorClass = getStatusColor(val, th);
								const dotColor = getDotColor(val, th);

								return (
									<tr key={th.key} className="hover:bg-indigo-50/30 transition-colors group">
										<td className="py-3.5 px-4 sm:px-6 text-sm font-medium text-gray-700 flex items-center gap-2">
											<span className={`w-2 h-2 rounded-full ${dotColor}`}></span>
											<span className="whitespace-nowrap">{labels[th.key]}</span>
										</td>
										<td className="py-3.5 px-4 text-sm text-center text-gray-500 font-medium">
											{th.standard}
										</td>
										<td className="py-3.5 px-4 text-sm text-center text-gray-400 hidden sm:table-cell">
											{th.general}
										</td>
										<td className="py-3.5 px-4 text-sm text-center text-gray-400 hidden sm:table-cell">
											{th.danger}
										</td>
										<td className="py-3.5 px-4 text-center">
											<span className={`inline-flex items-center justify-center px-2.5 py-1 text-xs font-bold rounded-lg border ${colorClass}`}>
												{formatValue(th.key, val)}
											</span>
										</td>
										<td className="py-3.5 px-4 sm:px-6 text-right">
											{remaining > 0 ? (
												<span className="text-sm font-semibold text-gray-600">{formatValue(th.key, remaining)}</span>
											) : (
												<span className="text-xs font-bold text-green-500 uppercase tracking-wider">✓</span>
											)}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
