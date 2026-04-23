"use client";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocale } from "../../lib/locale";

type ReportData = {
	quranStudy: boolean;
	haditsRead: number;
	literature: number;
	salahJamaat: number;
	targetContactDawah: number;
	targetContactWorker: number;
	targetContactMember: number;
	workerContact: number;
	bookDistribution: number;
	familyMeeting: boolean;
	socialWork: boolean;
	orgWorkHours: number;
	orgWorkMinutes: number;
	orgWorkSeconds: number;
	orgWorkStartedAt?: string | null;
	safar: boolean;
	reportKeeping: boolean;
	selfCriticism: boolean;
};

const emptyReport = (): ReportData => ({
	quranStudy: false,
	haditsRead: 0,
	literature: 0,
	salahJamaat: 5,
	targetContactDawah: 0,
	targetContactWorker: 0,
	targetContactMember: 0,
	workerContact: 0,
	bookDistribution: 0,
	familyMeeting: false,
	socialWork: false,
	orgWorkHours: 0,
	orgWorkMinutes: 0,
	orgWorkSeconds: 0,
	safar: false,
	reportKeeping: false,
	selfCriticism: false,
});

const MAX_SALAH_JAMAAT = 5;

function normalizeSalahJamaat(value: unknown) {
	if (typeof value === "boolean") {
		return value ? 1 : 0;
	}

	const numericValue = Number(value ?? 0);
	if (!Number.isFinite(numericValue)) {
		return 0;
	}

	return Math.min(MAX_SALAH_JAMAAT, Math.max(0, numericValue));
}

function toDateStr(d: Date) {
	const yyyy = d.getFullYear();
	const mm = String(d.getMonth() + 1).padStart(2, "0");
	const dd = String(d.getDate()).padStart(2, "0");
	return `${yyyy}-${mm}-${dd}`;
}

function parseDateStr(dateStr: string) {
	const [y, m, d] = dateStr.split("-").map((v) => Number(v));
	return new Date(y, (m || 1) - 1, d || 1);
}

function formatDisplayDate(dateStr: string) {
	const d = parseDateStr(dateStr);
	return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
}

function formatTimeValue(hours: number, minutes: number, seconds: number = 0) {
	const h = String(Math.min(23, Math.max(0, Number(hours) || 0))).padStart(2, "0");
	const m = String(Math.min(59, Math.max(0, Number(minutes) || 0))).padStart(2, "0");
	const s = String(Math.min(59, Math.max(0, Number(seconds) || 0))).padStart(2, "0");
	return `${h}:${m}:${s}`;
}

function formatDurationWithSeconds(ms: number) {
	const totalSeconds = Math.max(0, Math.floor(ms / 1000));
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;
	return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

const TEXT = {
	en: {
		dailyReport: "Daily Report",
		previousDay: "Previous day",
		nextDay: "Next day",
		today: "Today",
		religiousPractice: "Religious Practice",
		quranStudy: "Quran Study",
		salahInJamaat: "Salah in Jamaat",
		haditsRead: "Hadits Read",
		literaturePages: "Literature (pages)",
		dawahAndContacts: "Dawah & Contacts",
		targetDawah: "Target - Dawah",
		targetWorker: "Target - Worker",
		targetMember: "Target - Member",
		workerContact: "Worker Contact",
		bookDistribution: "Book Distribution",
		activities: "Activities",
		familyMeeting: "Family Meeting",
		socialWork: "Social Work",
		safarTravel: "Safar (Visit)",
		orgWork: "Org Work",
		selfAssessment: "Self Assessment",
		reportKeeping: "Report Keeping",
		selfCriticism: "Self-Criticism",
		saving: "Saving...",
		saveReport: "Save Report",
		startTimer: "Start Work",
		pauseTimer: "Pause Work",
		timer: "Timer",
		timerForTodayOnly: "Timer works for today only",
	},
	bn: {
		dailyReport: "দৈনিক রিপোর্ট",
		previousDay: "আগের দিন",
		nextDay: "পরের দিন",
		today: "আজ",
		religiousPractice: "ইবাদত অনুশীলন",
		quranStudy: "কুরআন অধ্যয়ন",
		salahInJamaat: "জামাতে সালাত",
		haditsRead: "হাদিস পাঠ",
		literaturePages: "সাহিত্য (পৃষ্ঠা)",
		dawahAndContacts: "দাওয়াহ ও যোগাযোগ",
		targetDawah: "টার্গেট - দাওয়াহ",
		targetWorker: "টার্গেট - কর্মী",
		targetMember: "টার্গেট - সদস্য",
		workerContact: "কর্মী যোগাযোগ",
		bookDistribution: "বই বিতরণ",
		activities: "কার্যক্রম",
		familyMeeting: "পারিবারিক বৈঠক",
		socialWork: "সামাজিক কাজ",
		safarTravel: "সফর",
		orgWork: "সাংগঠনিক কাজ",
		selfAssessment: "আত্মমূল্যায়ন",
		reportKeeping: "রিপোর্ট সংরক্ষণ",
		selfCriticism: "আত্মসমালোচনা",
		saving: "সংরক্ষণ হচ্ছে...",
		saveReport: "রিপোর্ট সংরক্ষণ",
		startTimer: "কাজ শুরু",
		pauseTimer: "কাজ বিরতি",
		timer: "টাইমার",
		timerForTodayOnly: "টাইমার শুধু আজকের দিনের জন্য",
	},
} as const;

function Toggle({ checked, onChange, label, isEdited }: { checked: boolean; onChange: () => void; label: string; isEdited?: boolean }) {
	return (
		<button
			type="button"
			onClick={onChange}
			className={`relative flex items-center justify-between w-full px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl border transition-all duration-300 text-xs sm:text-sm font-medium shadow-sm hover:shadow-md hover:-translate-y-0.5 ${checked
				? "bg-gradient-to-r from-indigo-50 to-violet-50 border-indigo-200 text-indigo-700"
				: "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
				}`}
		>
			{isEdited && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>}
			<span>{label}</span>
			<span
				className={`w-8 h-4 sm:w-10 sm:h-5 rounded-full relative transition-colors flex-shrink-0 ${checked ? "bg-indigo-500" : "bg-gray-200"}`}
			>
				<span
					className={`absolute top-0.5 left-0.5 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-4 sm:translate-x-5" : "translate-x-0"
						}`}
				/>
			</span>
		</button>
	);
}

function NumberField({
	label,
	name,
	value,
	onChange,
	max,
	isEdited,
}: {
	label: string;
	name: string;
	value: number;
	onChange: (name: string, value: number) => void;
	max?: number;
	isEdited?: boolean;
}) {
	return (
		<div className="flex flex-col gap-0.5 relative">
			<label className="text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center gap-1.5">
				{label}
				{isEdited && <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>}
			</label>
			<input
				type="number"
				name={name}
				min={0}
				max={max}
				value={value}
				onChange={(e) => {
					const numericValue = Number(e.target.value);
					const clampedValue = Number.isFinite(numericValue) ? Math.max(0, numericValue) : 0;
					onChange(name, typeof max === "number" ? Math.min(max, clampedValue) : clampedValue);
				}}
				className="w-full border border-gray-200 rounded-xl px-2.5 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-800 text-center focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm hover:border-gray-300 bg-white/50 focus:bg-white"
			/>
		</div>
	);
}

function SectionTitle({ title }: { title: string }) {
	return <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-400/80 mt-3 mb-3 flex items-center gap-2"><span className="w-4 h-px bg-indigo-200"></span>{title}<span className="flex-1 h-px bg-indigo-100/50"></span></h3>;
}

export default function PersonalReportForm({
	date,
	onDateChange,
	onSubmit,
	onTimerStart,
	onTimerPause,
	submitting,
	timerSubmitting,
	defaultData,
}: {
	date: string;
	onDateChange: (d: string) => void;
	onSubmit: (data: ReportData & { date: string }) => void;
	onTimerStart: (date: string) => Promise<void>;
	onTimerPause: (date: string) => Promise<void>;
	submitting: boolean;
	timerSubmitting: boolean;
	defaultData?: Partial<ReportData> | null;
}) {
	const { locale } = useLocale();
	const t = TEXT[locale];
	const [form, setForm] = useState<ReportData>(emptyReport);
	const [originalForm, setOriginalForm] = useState<ReportData | null>(null);
	const [orgWorkInput, setOrgWorkInput] = useState("00:00:00");
	const [manualOrgWorkSeconds, setManualOrgWorkSeconds] = useState(0);
	const [timerStartedAt, setTimerStartedAt] = useState<number | null>(null);
	const [, setTick] = useState(0);
	const [lastLoadedDate, setLastLoadedDate] = useState<string | null>(null);

	const isToday = date === toDateStr(new Date());
	const liveTimerMs = (isToday && timerStartedAt) ? Math.max(0, Date.now() - timerStartedAt) : 0;
	const timerSeconds = Math.floor(liveTimerMs / 1000);
	const totalOrgWorkSeconds = Math.min(23 * 3600 + 59 * 60 + 59, Math.max(0, manualOrgWorkSeconds + timerSeconds));
	const timerRunning = isToday && timerStartedAt != null;

	// When defaultData changes (from parent), update the form
	useEffect(() => {
		if (defaultData === undefined) return;
		if (defaultData) {
			const converted: any = { ...defaultData };
			const nextForm: ReportData = {
				quranStudy: Boolean(converted.quranStudy),
				haditsRead: Math.max(0, Number(converted.haditsRead ?? 0)),
				literature: Math.max(0, Number(converted.literature ?? 0)),
				salahJamaat: normalizeSalahJamaat(converted.salahJamaat),
				targetContactDawah: Math.max(0, Number(converted.targetContactDawah ?? 0)),
				targetContactWorker: Math.max(0, Number(converted.targetContactWorker ?? 0)),
				targetContactMember: Math.max(0, Number(converted.targetContactMember ?? 0)),
				workerContact: Math.max(0, Number(converted.workerContact ?? 0)),
				bookDistribution: Math.max(0, Number(converted.bookDistribution ?? 0)),
				familyMeeting: Boolean(converted.familyMeeting),
				socialWork: Boolean(converted.socialWork),
				orgWorkHours: Math.max(0, Number(converted.orgWorkHours ?? 0)),
				orgWorkMinutes: Math.max(0, Number(converted.orgWorkMinutes ?? 0)),
				orgWorkSeconds: Math.max(0, Number(converted.orgWorkSeconds ?? 0)),
				orgWorkStartedAt: converted.orgWorkStartedAt ?? null,
				safar: Boolean(converted.safar),
				reportKeeping: Boolean(converted.reportKeeping),
				selfCriticism: Boolean(converted.selfCriticism),
			};
			const newTimerStartedAt = nextForm.orgWorkStartedAt ? new Date(nextForm.orgWorkStartedAt).getTime() : null;
			setTimerStartedAt(newTimerStartedAt);
			const baseSeconds = Math.min(
				23 * 3600 + 59 * 60 + 59,
				Math.max(0, nextForm.orgWorkHours * 3600 + nextForm.orgWorkMinutes * 60 + nextForm.orgWorkSeconds),
			);
			setManualOrgWorkSeconds(baseSeconds);
			
			const newLiveTimerMs = newTimerStartedAt ? Math.max(0, Date.now() - newTimerStartedAt) : 0;
			const newTimerSeconds = Math.floor(newLiveTimerMs / 1000);
			const mergedSeconds = Math.min(23 * 3600 + 59 * 60 + 59, baseSeconds + newTimerSeconds);

			if (lastLoadedDate !== date) {
				setForm({
					...nextForm,
					orgWorkHours: Math.floor(mergedSeconds / 3600),
					orgWorkMinutes: Math.floor((mergedSeconds % 3600) / 60),
					orgWorkSeconds: mergedSeconds % 60,
				});
				setLastLoadedDate(date);
				setOriginalForm(nextForm);
			} else {
				setForm((prev) => ({
					...prev,
					orgWorkHours: Math.floor(mergedSeconds / 3600),
					orgWorkMinutes: Math.floor((mergedSeconds % 3600) / 60),
					orgWorkSeconds: mergedSeconds % 60,
					orgWorkStartedAt: nextForm.orgWorkStartedAt,
				}));
				setOriginalForm(nextForm);
			}

			setOrgWorkInput(formatTimeValue(Math.floor(mergedSeconds / 3600), Math.floor((mergedSeconds % 3600) / 60), mergedSeconds % 60));
		} else {
			if (lastLoadedDate !== date) {
				setForm(emptyReport());
				setLastLoadedDate(date);
				setOriginalForm(emptyReport());
			}
			setManualOrgWorkSeconds(0);
			setTimerStartedAt(null);
			const mergedSeconds = Math.min(23 * 3600 + 59 * 60 + 59, timerSeconds);
			setForm((prev) => ({
				...prev,
				orgWorkHours: Math.floor(mergedSeconds / 3600),
				orgWorkMinutes: Math.floor((mergedSeconds % 3600) / 60),
				orgWorkSeconds: mergedSeconds % 60,
			}));
			setOrgWorkInput(formatTimeValue(Math.floor(mergedSeconds / 3600), Math.floor((mergedSeconds % 3600) / 60), mergedSeconds % 60));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [defaultData, date]);

	useEffect(() => {
		const h = Math.floor(totalOrgWorkSeconds / 3600);
		const m = Math.floor((totalOrgWorkSeconds % 3600) / 60);
		const s = totalOrgWorkSeconds % 60;
		setForm((prev) => ({ ...prev, orgWorkHours: h, orgWorkMinutes: m, orgWorkSeconds: s }));
		setOrgWorkInput(formatTimeValue(h, m, s));
	}, [totalOrgWorkSeconds]);

	useEffect(() => {
		if (!timerRunning) return;
		const id = window.setInterval(() => {
			setTick((x) => x + 1);
		}, 1000);
		return () => window.clearInterval(id);
	}, [timerRunning]);

	function handleToggle(field: keyof ReportData) {
		setForm((prev) => ({ ...prev, [field]: !prev[field] }));
	}

	const isFieldEdited = (field: keyof ReportData) => {
		if (!originalForm) return false;
		return form[field] !== originalForm[field];
	};

	const isOrgWorkEdited = () => {
		if (!originalForm) return false;
		const originalBaseSeconds = Math.min(
			23 * 3600 + 59 * 60 + 59,
			Math.max(0, originalForm.orgWorkHours * 3600 + originalForm.orgWorkMinutes * 60 + originalForm.orgWorkSeconds)
		);
		return totalOrgWorkSeconds !== originalBaseSeconds;
	};

	const isDirty = (() => {
		if (!originalForm) return false;
		for (const key of Object.keys(form) as (keyof ReportData)[]) {
			if (key === "orgWorkHours" || key === "orgWorkMinutes" || key === "orgWorkSeconds" || key === "orgWorkStartedAt") {
				continue;
			}
			if (form[key] !== originalForm[key]) return true;
		}
		return isOrgWorkEdited();
	})();

	useEffect(() => {
		if (!isDirty) return;
		const handleBeforeUnload = (e: BeforeUnloadEvent) => {
			e.preventDefault();
			e.returnValue = "";
		};
		window.addEventListener("beforeunload", handleBeforeUnload);
		return () => window.removeEventListener("beforeunload", handleBeforeUnload);
	}, [isDirty]);

	function handleNumber(name: string, value: number) {
		setForm((prev) => ({
			...prev,
			[name]: name === "salahJamaat" ? normalizeSalahJamaat(value) : value,
		}));
	}

	function handleOrgWorkInputChange(value: string) {
		const digits = value.replace(/\D/g, "").slice(0, 6);
		let masked = digits;
		if (digits.length > 4) {
			masked = `${digits.slice(0, 2)}:${digits.slice(2, 4)}:${digits.slice(4, 6)}`;
		} else if (digits.length > 2) {
			masked = `${digits.slice(0, 2)}:${digits.slice(2, 4)}`;
		}
		setOrgWorkInput(masked);

		const hoursRaw = digits.slice(0, 2);
		const minutesRaw = digits.slice(2, 4);
		const secondsRaw = digits.slice(4, 6);
		const hours = hoursRaw ? Math.min(23, Number(hoursRaw)) : 0;
		const minutes = minutesRaw ? Math.min(59, Number(minutesRaw)) : 0;
		const seconds = secondsRaw ? Math.min(59, Number(secondsRaw)) : 0;
		const typedTotal = (Number.isFinite(hours) ? hours : 0) * 3600 + (Number.isFinite(minutes) ? minutes : 0) * 60 + (Number.isFinite(seconds) ? seconds : 0);
		setManualOrgWorkSeconds(Math.max(0, typedTotal - timerSeconds));
	}

	function normalizeOrgWorkInput() {
		setOrgWorkInput(formatTimeValue(Math.floor(totalOrgWorkSeconds / 3600), Math.floor((totalOrgWorkSeconds % 3600) / 60), totalOrgWorkSeconds % 60));
	}

	async function startOrgWorkTimer() {
		const today = toDateStr(new Date());
		if (today !== date || timerRunning) return;
		await onTimerStart(date);
	}

	async function pauseOrgWorkTimer() {
		if (!timerRunning || !timerStartedAt) return;
		await onTimerPause(date);
	}

	function handleDateSwitch(newDate: string) {
		if (isDirty) {
			const warningText = locale === "bn"
				? "আপনার কিছু অসংরক্ষিত ডেটা আছে। আপনি কি নিশ্চিত যে আপনি তারিখ পরিবর্তন করতে চান? আপনার পরিবর্তনগুলো মুছে যাবে।"
				: "You have unsaved changes. Are you sure you want to switch dates? Your changes will be lost.";
			if (!window.confirm(warningText)) {
				return;
			}
		}
		onDateChange(newDate);
	}

	function shiftDate(days: number) {
		const d = parseDateStr(date);
		d.setDate(d.getDate() + days);
		handleDateSwitch(toDateStr(d));
	}

	const timerDisplay = formatDurationWithSeconds(liveTimerMs);

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		onSubmit({
			date,
			quranStudy: form.quranStudy,
			haditsRead: form.haditsRead,
			literature: form.literature,
			salahJamaat: form.salahJamaat,
			targetContactDawah: form.targetContactDawah,
			targetContactWorker: form.targetContactWorker,
			targetContactMember: form.targetContactMember,
			workerContact: form.workerContact,
			bookDistribution: form.bookDistribution,
			familyMeeting: form.familyMeeting,
			socialWork: form.socialWork,
			orgWorkHours: Math.floor(totalOrgWorkSeconds / 3600),
			orgWorkMinutes: Math.floor((totalOrgWorkSeconds % 3600) / 60),
			orgWorkSeconds: totalOrgWorkSeconds % 60,
			safar: form.safar,
			reportKeeping: form.reportKeeping,
			selfCriticism: form.selfCriticism,
		});
	}

	return (
		<div className="max-w-2xl mx-auto my-8 sm:my-12">
			<form onSubmit={handleSubmit} className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/50 overflow-hidden ring-1 ring-black/5 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
				{/* Overlay Loader */}
				{(defaultData === undefined || submitting) && (
					<div className="absolute inset-0 z-50 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
						<Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
					</div>
				)}
				{/* Form Header with date navigation */}
				<div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-indigo-100/50 bg-gradient-to-r from-indigo-50/50 to-violet-50/50">
					<div className="text-center mb-4">
						<p className="text-[11px] text-indigo-500/80 font-bold uppercase tracking-widest mb-1">{t.dailyReport}</p>
						<p className="text-lg sm:text-xl font-black text-gray-800 tracking-tight">{formatDisplayDate(date)}</p>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-3 sm:gap-4">
						<div className="flex flex-col items-center sm:items-start gap-1 w-full">
							<div className="flex items-center gap-1.5 sm:gap-2 justify-center sm:justify-start w-full">
								<button
									type="button"
									onClick={() => shiftDate(-1)}
									className="w-10 h-10 flex items-center justify-center rounded-xl border border-indigo-200 text-indigo-700 bg-white hover:bg-indigo-50 transition-all hover:scale-105 active:scale-95 shadow-sm text-xl leading-none flex-shrink-0"
									aria-label={t.previousDay}
								>
									‹
								</button>
								<input
									type="date"
									value={date}
									max={toDateStr(new Date())}
									onChange={(e) => handleDateSwitch(e.target.value)}
									className="flex-1 sm:flex-none h-10 text-center text-sm font-medium border border-indigo-200 rounded-xl px-2 py-1 text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-white shadow-sm"
								/>
								<button
									type="button"
									onClick={() => shiftDate(1)}
									disabled={isToday}
									className="w-10 h-10 flex items-center justify-center rounded-xl border border-indigo-200 text-indigo-700 bg-white hover:bg-indigo-50 transition-all hover:scale-105 active:scale-95 shadow-sm text-xl leading-none disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed flex-shrink-0"
									aria-label={t.nextDay}
								>
									›
								</button>
								<button
									type="button"
									onClick={() => handleDateSwitch(toDateStr(new Date()))}
									disabled={isToday}
									className="text-[11px] px-3 h-10 rounded-xl border border-indigo-200 text-indigo-700 bg-white hover:bg-indigo-50 disabled:opacity-40 disabled:cursor-not-allowed font-semibold tracking-wide uppercase transition-all shadow-sm flex items-center justify-center"
								>
									{t.today}
								</button>
							</div>
						</div>
						<div className="flex items-center justify-center sm:justify-end gap-3 w-full">
							{!isToday && <p className="text-[11px] text-gray-400 text-right leading-tight max-w-[100px] sm:max-w-none">{t.timerForTodayOnly}</p>}
							<button
								type="button"
								onClick={timerRunning ? pauseOrgWorkTimer : startOrgWorkTimer}
								disabled={!isToday || timerSubmitting}
								className={`h-10 px-4 rounded-xl border font-medium transition-all shadow-sm flex-shrink-0 flex items-center justify-center ${timerRunning
									? "border-red-200 text-red-700 bg-red-50 hover:bg-red-100 animate-pulse"
									: "border-indigo-200 text-indigo-700 bg-white hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 hover:shadow-md"
									}`}
							>
								<span className="flex flex-col items-center justify-center leading-none">
									<span className="font-bold text-[14px] font-mono tracking-tight">{timerDisplay}</span>
									<span className="text-[9px] uppercase tracking-wider mt-0.5">{timerRunning ? t.pauseTimer : t.startTimer}</span>
								</span>
							</button>
						</div>
					</div>
				</div>

				<div className="px-4 sm:px-6 py-4 sm:py-5 grid gap-4 sm:gap-5">
					{/* Religious */}
					<div>
						<SectionTitle title={t.religiousPractice} />
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
							<Toggle checked={form.quranStudy} onChange={() => handleToggle("quranStudy")} label={t.quranStudy} isEdited={isFieldEdited("quranStudy")} />
							<NumberField label={t.salahInJamaat} name="salahJamaat" value={form.salahJamaat} onChange={handleNumber} max={MAX_SALAH_JAMAAT} isEdited={isFieldEdited("salahJamaat")} />
							<NumberField label={t.haditsRead} name="haditsRead" value={form.haditsRead} onChange={handleNumber} isEdited={isFieldEdited("haditsRead")} />
							<NumberField label={t.literaturePages} name="literature" value={form.literature} onChange={handleNumber} isEdited={isFieldEdited("literature")} />
						</div>
					</div>

					{/* Dawah & Contacts */}
					<div>
						<SectionTitle title={t.dawahAndContacts} />
						<div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
							<NumberField label={t.targetDawah} name="targetContactDawah" value={form.targetContactDawah} onChange={handleNumber} isEdited={isFieldEdited("targetContactDawah")} />
							<NumberField label={t.targetWorker} name="targetContactWorker" value={form.targetContactWorker} onChange={handleNumber} isEdited={isFieldEdited("targetContactWorker")} />
							<NumberField label={t.targetMember} name="targetContactMember" value={form.targetContactMember} onChange={handleNumber} isEdited={isFieldEdited("targetContactMember")} />
							<NumberField label={t.workerContact} name="workerContact" value={form.workerContact} onChange={handleNumber} isEdited={isFieldEdited("workerContact")} />
							<NumberField label={t.bookDistribution} name="bookDistribution" value={form.bookDistribution} onChange={handleNumber} isEdited={isFieldEdited("bookDistribution")} />
						</div>
					</div>

					{/* Activities */}
					<div>
						<SectionTitle title={t.activities} />
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
							<Toggle checked={form.familyMeeting} onChange={() => handleToggle("familyMeeting")} label={t.familyMeeting} isEdited={isFieldEdited("familyMeeting")} />
							<Toggle checked={form.socialWork} onChange={() => handleToggle("socialWork")} label={t.socialWork} isEdited={isFieldEdited("socialWork")} />
							<Toggle checked={form.safar} onChange={() => handleToggle("safar")} label={t.safarTravel} isEdited={isFieldEdited("safar")} />
							{/* Org Work */}
							<div className="flex flex-col gap-0.5 relative">
								<label className="text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center gap-1.5">
									{t.orgWork}
									{isOrgWorkEdited() && <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>}
								</label>
								<input
									type="text"
									inputMode="numeric"
									maxLength={8}
									value={orgWorkInput}
									onChange={(e) => handleOrgWorkInputChange(e.target.value)}
									onBlur={normalizeOrgWorkInput}
									disabled={timerRunning}
									className={`w-full border border-gray-200 rounded-xl px-2.5 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-800 text-center font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm ${timerRunning ? 'bg-gray-100 text-gray-500 cursor-not-allowed border-gray-200' : 'hover:border-gray-300 bg-white/50 focus:bg-white'}`}
									placeholder="hh:mm:ss"
									aria-label={`${t.orgWork} hh:mm:ss`}
								/>
							</div>
						</div>
					</div>

					{/* Self Assessment */}
					<div>
						<SectionTitle title={t.selfAssessment} />
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
							<Toggle checked={form.reportKeeping} onChange={() => handleToggle("reportKeeping")} label={t.reportKeeping} isEdited={isFieldEdited("reportKeeping")} />
							<Toggle checked={form.selfCriticism} onChange={() => handleToggle("selfCriticism")} label={t.selfCriticism} isEdited={isFieldEdited("selfCriticism")} />
						</div>
					</div>
				</div>

				<div className="px-4 sm:px-6 py-4 sm:py-5 border-t border-indigo-50 bg-gray-50/30">
					<button
						type="submit"
						disabled={submitting}
						className="w-full flex items-center justify-center px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white text-sm font-bold uppercase tracking-wide rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:transform-none disabled:shadow-none"
					>
						{submitting ? (
							<span className="flex items-center gap-2">
								<Loader2 className="w-4 h-4 animate-spin" />
								{t.saving}
							</span>
						) : (
							t.saveReport
						)}
					</button>
				</div>
			</form>
		</div>
	);
}
