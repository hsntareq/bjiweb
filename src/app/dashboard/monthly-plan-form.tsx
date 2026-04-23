"use client";
import { Loader2, Plus, Trash2, Save } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { useLocale } from "../../lib/locale";

export type MonthlyPlanData = {
	quranStudyDays: number;
	haditsRead: number;
	literature: number;
	salahJamaat: number;
	targetContactDawah: number;
	targetContactWorker: number;
	targetContactMember: number;
	workerContact: number;
	bookDistribution: number;
	familyMeetingDays: number;
	socialWorkDays: number;
	orgWorkHours: number;
	safarDays: number;
	reportKeepingDays: number;
	selfCriticismDays: number;

	increaseAssociate: string[];
	increaseActivist: string[];
	increaseMember: string[];
	memorizingSura: string[];
	memorizingAyat: string[];
	memorizingHadits: string[];
	baitulmalIncreaseAmount: number;
	sellBooksNumber: number;
	socialHelp: string[];
	professionalHelp: string[];
};

export const emptyMonthlyPlan = (monthStr: string): MonthlyPlanData => {
	const daysInMonth = monthStr ? new Date(parseInt(monthStr.split("-")[0]), parseInt(monthStr.split("-")[1]), 0).getDate() : 30;
	return {
		quranStudyDays: daysInMonth,
		haditsRead: 100,
		literature: 300,
		salahJamaat: daysInMonth*5,
		targetContactDawah: 9,
		targetContactWorker: 3,
		targetContactMember: 4,
		workerContact: 3,
		bookDistribution: 10,
		familyMeetingDays: daysInMonth,
		socialWorkDays: daysInMonth,
		orgWorkHours: 90,
		safarDays: daysInMonth,
		reportKeepingDays: daysInMonth,
		selfCriticismDays: daysInMonth,
	increaseAssociate: [],
	increaseActivist: [],
	increaseMember: [],
	memorizingSura: [],
	memorizingAyat: [],
	memorizingHadits: [],
	baitulmalIncreaseAmount: 200,
	sellBooksNumber: 10,
	socialHelp: [],
	professionalHelp: [],
	};
};
/*  */
const TEXT = {
	en: {
		monthlyPlan: "Monthly Plan",
		religiousPractice: "Religious Practice",
		lockedNotice: "Plans for previous months cannot be modified.",
		quranStudy: "Quran Study (Days)",
		salahInJamaat: "Salah in Jamaat (Times)",
		haditsRead: "Hadits Read",
		literaturePages: "Literature (Pages/Books)",
		dawahAndContacts: "Dawah & Contacts",
		targetDawah: "Target - Dawah",
		targetWorker: "Target - Worker",
		targetMember: "Target - Member",
		workerContact: "Worker Contact",
		bookDistribution: "Book Distribution",
		activities: "Activities",
		familyMeeting: "Family Meeting (Days)",
		socialWork: "Social Work (Days)",
		safarTravel: "Safar/Travel (Days)",
		orgWork: "Org Work (Hours)",
		selfAssessment: "Self Assessment",
		reportKeeping: "Report Keeping (Days)",
		selfCriticism: "Self-Criticism (Days)",
		saving: "Saving...",
		saveReport: "Save Plan",
		newFields: "Monthly Targets",
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
		add: "Add",
	},
	bn: {
		monthlyPlan: "মাসিক পরিকল্পনা",
		religiousPractice: "ইবাদত অনুশীলন",
		quranStudy: "কুরআন অধ্যয়ন (দিন)",
		salahInJamaat: "জামাতে সালাত (বার)",
		haditsRead: "হাদিস পাঠ",
		literaturePages: "সাহিত্য (পৃষ্ঠা/বই)",
		dawahAndContacts: "দাওয়াহ ও যোগাযোগ",
		targetDawah: "টার্গেট - দাওয়াহ",
		targetWorker: "টার্গেট - কর্মী",
		targetMember: "টার্গেট - সদস্য",
		workerContact: "কর্মী যোগাযোগ",
		bookDistribution: "বই বিতরণ",
		activities: "কার্যক্রম",
		familyMeeting: "পারিবারিক বৈঠক (দিন)",
		socialWork: "সামাজিক কাজ (দিন)",
		safarTravel: "সফর (দিন)",
		orgWork: "সাংগঠনিক কাজ (ঘণ্টা)",
		selfAssessment: "আত্মমূল্যায়ন",
		reportKeeping: "রিপোর্ট সংরক্ষণ (দিন)",
		selfCriticism: "আত্মসমালোচনা (দিন)",
		saving: "সংরক্ষণ হচ্ছে...",
		saveReport: "পরিকল্পনা সংরক্ষণ",
		newFields: "মাসিক লক্ষ্যমাত্রা",
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
		add: "যোগ করুন",
		lockedNotice: "পূর্ববর্তী মাসের পরিকল্পনা পরিবর্তন করা যায় না।",
	},
} as const;

function NumberField({ label, name, value, onChange, max, disabled }: any) {
	return (
		<div className="flex flex-col gap-0.5 relative">
			<label className="text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center gap-1.5">{label}</label>
			<input
				type="number"
				name={name}
				min={0}
				max={max}
				value={value}
				onChange={(e) => {
					if (disabled) return;
					const numericValue = Number(e.target.value);
					const clampedValue = Number.isFinite(numericValue) ? Math.max(0, numericValue) : 0;
					onChange(name, typeof max === "number" ? Math.min(max, clampedValue) : clampedValue);
				}}
				disabled={disabled}
				className={`w-full border border-gray-200 rounded-xl px-2.5 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm ${disabled ? 'bg-gray-100 cursor-not-allowed text-gray-500' : 'hover:border-gray-300 bg-white/50 focus:bg-white'}`}
			/>
		</div>
	);
}

function TextField({ label, name, value, onChange, disabled }: any) {
	return (
		<div className="flex flex-col gap-0.5 relative sm:col-span-2">
			<label className="text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center gap-1.5">{label}</label>
			<input
				type="text"
				name={name}
				value={value}
				onChange={(e) => { if (!disabled) onChange(name, e.target.value); }}
				disabled={disabled}
				className={`w-full border border-gray-200 rounded-xl px-2.5 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm ${disabled ? 'bg-gray-100 cursor-not-allowed text-gray-500' : 'hover:border-gray-300 bg-white/50 focus:bg-white'}`}
			/>
		</div>
	);
}

function DynamicListField({ label, items, onChange, t, disabled }: any) {
	const [input, setInput] = useState("");

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
		<div className="flex flex-col gap-1.5 sm:col-span-2">
			<label className="text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center gap-1.5">{label}</label>
			<div className="flex gap-2">
				<input
					type="text"
					value={input}
					onChange={(e) => { if (!disabled) setInput(e.target.value); }}
					onKeyDown={(e) => !disabled && e.key === "Enter" && (e.preventDefault(), handleAdd())}
					disabled={disabled}
					className={`flex-1 border border-gray-200 rounded-xl px-2.5 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm ${disabled ? 'bg-gray-100 cursor-not-allowed text-gray-500' : 'bg-white/50 focus:bg-white'}`}
				/>
				<button type="button" onClick={handleAdd} disabled={disabled} className={`px-3 py-1.5 rounded-xl border flex items-center gap-1 shadow-sm font-medium text-sm ${disabled ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' : 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100'}`}>
					<Plus className="w-4 h-4" /> {t.add}
				</button>
			</div>
			{items.length > 0 && (
				<ul className="mt-2 space-y-1.5">
					{items.map((item: string, i: number) => (
						<li key={i} className={`flex items-center justify-between border border-gray-100 rounded-lg px-3 py-2 shadow-sm text-sm ${disabled ? 'bg-gray-50' : 'bg-white'}`}>
							<span className={`text-gray-700 ${disabled ? 'opacity-70' : ''}`}>{item}</span>
							{!disabled && (
								<button type="button" onClick={() => handleRemove(i)} className="text-red-400 hover:text-red-600 p-1">
									<Trash2 className="w-4 h-4" />
								</button>
							)}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

function SectionTitle({ title }: { title: string }) {
	return <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-400/80 mt-4 mb-3 flex items-center gap-2"><span className="w-4 h-px bg-indigo-200"></span>{title}<span className="flex-1 h-px bg-indigo-100/50"></span></h3>;
}

export default function MonthlyPlanForm({
	month,
	onSubmit,
	submitting,
	defaultData,
}: {
	month: string;
	onSubmit: (data: MonthlyPlanData & { month: string }) => void;
	submitting: boolean;
	defaultData?: Partial<MonthlyPlanData> | null;
}) {
	const { locale } = useLocale();
	const t = TEXT[locale];
	const [form, setForm] = useState<MonthlyPlanData>(emptyMonthlyPlan(month));
	const daysInMonth = month ? new Date(parseInt(month.split("-")[0]), parseInt(month.split("-")[1]), 0).getDate() : 30;

	const isLocked = useMemo(() => {
		if (!month) return false;
		const [year, monthNum] = month.split("-").map(Number);
		const now = new Date();
		const currentYear = now.getFullYear();
		const currentMonth = now.getMonth() + 1;
		return year < currentYear || (year === currentYear && monthNum < currentMonth);
	}, [month]);

	useEffect(() => {
		if (defaultData) {
			setForm({ ...emptyMonthlyPlan(month), ...defaultData });
		} else {
			setForm(emptyMonthlyPlan(month));
		}
	}, [defaultData, month]);

	function handleNumber(name: string, value: number) {
		setForm((prev) => ({ ...prev, [name]: value }));
	}

	function handleText(name: string, value: string) {
		setForm((prev) => ({ ...prev, [name]: value }));
	}

	function handleList(name: string, items: string[]) {
		setForm((prev) => ({ ...prev, [name]: items }));
	}

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		const { id, createdAt, updatedAt, userId, user, ...rest } = form as any;
		onSubmit({ ...rest, month });
	}

	return (
		<div className="max-w-2xl mx-auto my-8 sm:my-12">
			<form onSubmit={handleSubmit} className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/50 overflow-hidden ring-1 ring-black/5 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
				{(defaultData === undefined || submitting) && (
					<div className="absolute inset-0 z-50 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
						<Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
					</div>
				)}

				<div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-indigo-100/50 bg-gradient-to-r from-indigo-50/50 to-violet-50/50">
					<div className="text-center">
						<p className="text-[11px] text-indigo-500/80 font-bold uppercase tracking-widest mb-1">{t.monthlyPlan}</p>
						<p className="text-lg sm:text-xl font-black text-gray-800 tracking-tight">{month}</p>
						{isLocked && (
							<p className="mt-2 text-sm text-amber-600 bg-amber-50 py-1.5 px-3 rounded-lg inline-block border border-amber-200/50">
								{t.lockedNotice}
							</p>
						)}
					</div>
				</div>

				<div className="p-4 sm:p-6 space-y-6">
					<div>
						<SectionTitle title={t.religiousPractice} />
						<div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
							<NumberField label={t.quranStudy} name="quranStudyDays" value={form.quranStudyDays} onChange={handleNumber} max={daysInMonth} disabled={isLocked} />
							<NumberField label={t.salahInJamaat} name="salahJamaat" value={form.salahJamaat} onChange={handleNumber} disabled={isLocked} />
							<NumberField label={t.haditsRead} name="haditsRead" value={form.haditsRead} onChange={handleNumber} disabled={isLocked} />
							<NumberField label={t.literaturePages} name="literature" value={form.literature} onChange={handleNumber} disabled={isLocked} />
						</div>
					</div>

					<div>
						<SectionTitle title={t.dawahAndContacts} />
						<div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
							<NumberField label={t.targetDawah} name="targetContactDawah" value={form.targetContactDawah} onChange={handleNumber} disabled={isLocked} />
							<NumberField label={t.targetWorker} name="targetContactWorker" value={form.targetContactWorker} onChange={handleNumber} disabled={isLocked} />
							<NumberField label={t.targetMember} name="targetContactMember" value={form.targetContactMember} onChange={handleNumber} disabled={isLocked} />
							<NumberField label={t.workerContact} name="workerContact" value={form.workerContact} onChange={handleNumber} disabled={isLocked} />
							<NumberField label={t.bookDistribution} name="bookDistribution" value={form.bookDistribution} onChange={handleNumber} disabled={isLocked} />
						</div>
					</div>

					<div>
						<SectionTitle title={t.activities} />
						<div className="grid grid-cols-2 gap-3">
							<NumberField label={t.familyMeeting} name="familyMeetingDays" value={form.familyMeetingDays} onChange={handleNumber} max={daysInMonth} disabled={isLocked} />
							<NumberField label={t.socialWork} name="socialWorkDays" value={form.socialWorkDays} onChange={handleNumber} max={daysInMonth} disabled={isLocked} />
							<NumberField label={t.safarTravel} name="safarDays" value={form.safarDays} onChange={handleNumber} max={daysInMonth} disabled={isLocked} />
							<NumberField label={t.orgWork} name="orgWorkHours" value={form.orgWorkHours} onChange={handleNumber} disabled={isLocked} />
						</div>
					</div>

					<div>
						<SectionTitle title={t.newFields} />
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
							<DynamicListField label={t.increaseAssociate} items={form.increaseAssociate} onChange={(items: string[]) => handleList("increaseAssociate", items)} t={t} disabled={isLocked} />
							<DynamicListField label={t.increaseActivist} items={form.increaseActivist} onChange={(items: string[]) => handleList("increaseActivist", items)} t={t} disabled={isLocked} />
							<DynamicListField label={t.increaseMember} items={form.increaseMember} onChange={(items: string[]) => handleList("increaseMember", items)} t={t} disabled={isLocked} />
							<DynamicListField label={t.memorizingSura} items={form.memorizingSura} onChange={(items: string[]) => handleList("memorizingSura", items)} t={t} disabled={isLocked} />
							<DynamicListField label={t.memorizingAyat} items={form.memorizingAyat} onChange={(items: string[]) => handleList("memorizingAyat", items)} t={t} disabled={isLocked} />
							<DynamicListField label={t.memorizingHadits} items={form.memorizingHadits} onChange={(items: string[]) => handleList("memorizingHadits", items)} t={t} disabled={isLocked} />
							<div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
								<NumberField label={t.baitulmalIncreaseAmount} name="baitulmalIncreaseAmount" value={form.baitulmalIncreaseAmount} onChange={handleNumber} disabled={isLocked} />
								<NumberField label={t.sellBooksNumber} name="sellBooksNumber" value={form.sellBooksNumber} onChange={handleNumber} disabled={isLocked} />
							</div>

							<DynamicListField label={t.socialHelp} items={form.socialHelp} onChange={(items: string[]) => handleList("socialHelp", items)} t={t} disabled={isLocked} />
							<DynamicListField label={t.professionalHelp} items={form.professionalHelp} onChange={(items: string[]) => handleList("professionalHelp", items)} t={t} disabled={isLocked} />
						</div>
					</div>

					<div>
						<SectionTitle title={t.selfAssessment} />
						<div className="grid grid-cols-2 gap-3">
							<NumberField label={t.reportKeeping} name="reportKeepingDays" value={form.reportKeepingDays} onChange={handleNumber} max={daysInMonth} disabled={isLocked} />
							<NumberField label={t.selfCriticism} name="selfCriticismDays" value={form.selfCriticismDays} onChange={handleNumber} max={daysInMonth} disabled={isLocked} />
						</div>
					</div>

					<div className="px-4 sm:px-6 py-5 bg-gray-50/50 border-t border-gray-100 flex justify-end">
						<button
							type="submit"
							disabled={submitting || isLocked}
							className={`relative group overflow-hidden rounded-xl px-6 py-2.5 font-semibold text-sm transition-all duration-300 shadow-sm flex items-center gap-2 ${
								isLocked || submitting ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-500 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm'
							}`}
						>
							{submitting ? (
								<Loader2 className="w-4 h-4 animate-spin" />
							) : (
								<Save className={`w-4 h-4 ${isLocked ? 'opacity-50' : 'group-hover:scale-110 transition-transform'}`} />
							)}
							{submitting ? t.saving : t.saveReport}
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}
