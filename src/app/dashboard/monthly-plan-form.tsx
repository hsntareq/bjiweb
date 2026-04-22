"use client";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
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
		haditsRead: 0,
		literature: 0,
		salahJamaat: 0,
		targetContactDawah: 0,
		targetContactWorker: 0,
		targetContactMember: 0,
		workerContact: 0,
		bookDistribution: 0,
		familyMeetingDays: daysInMonth,
		socialWorkDays: daysInMonth,
		orgWorkHours: 0,
		safarDays: daysInMonth,
		reportKeepingDays: daysInMonth,
		selfCriticismDays: daysInMonth,
	increaseAssociate: [],
	increaseActivist: [],
	increaseMember: [],
	memorizingSura: [],
	memorizingAyat: [],
	memorizingHadits: [],
	baitulmalIncreaseAmount: 0,
	sellBooksNumber: 0,
	socialHelp: [],
	professionalHelp: [],
	};
};

const TEXT = {
	en: {
		monthlyPlan: "Monthly Plan",
		religiousPractice: "Religious Practice",
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
	},
} as const;

function NumberField({ label, name, value, onChange, max }: any) {
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
					const numericValue = Number(e.target.value);
					const clampedValue = Number.isFinite(numericValue) ? Math.max(0, numericValue) : 0;
					onChange(name, typeof max === "number" ? Math.min(max, clampedValue) : clampedValue);
				}}
				className="w-full border border-gray-200 rounded-xl px-2.5 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm hover:border-gray-300 bg-white/50 focus:bg-white"
			/>
		</div>
	);
}

function TextField({ label, name, value, onChange }: any) {
	return (
		<div className="flex flex-col gap-0.5 relative sm:col-span-2">
			<label className="text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center gap-1.5">{label}</label>
			<input
				type="text"
				name={name}
				value={value}
				onChange={(e) => onChange(name, e.target.value)}
				className="w-full border border-gray-200 rounded-xl px-2.5 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm hover:border-gray-300 bg-white/50 focus:bg-white"
			/>
		</div>
	);
}

function DynamicListField({ label, items, onChange, t }: any) {
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
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAdd())}
					className="flex-1 border border-gray-200 rounded-xl px-2.5 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm bg-white/50 focus:bg-white"
				/>
				<button type="button" onClick={handleAdd} className="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-xl border border-indigo-200 hover:bg-indigo-100 flex items-center gap-1 shadow-sm font-medium text-sm">
					<Plus className="w-4 h-4" /> {t.add}
				</button>
			</div>
			{items.length > 0 && (
				<ul className="mt-2 space-y-1.5">
					{items.map((item: string, i: number) => (
						<li key={i} className="flex items-center justify-between bg-white border border-gray-100 rounded-lg px-3 py-2 shadow-sm text-sm">
							<span className="text-gray-700">{item}</span>
							<button type="button" onClick={() => handleRemove(i)} className="text-red-400 hover:text-red-600 p-1">
								<Trash2 className="w-4 h-4" />
							</button>
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
		onSubmit({ ...form, month });
	}

	return (
		<div className="max-w-xl mx-auto mb-10 mt-6 px-4 sm:px-0">
			<form onSubmit={handleSubmit} className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/50 overflow-hidden ring-1 ring-black/5 transition-all duration-300">
				{(defaultData === undefined || submitting) && (
					<div className="absolute inset-0 z-50 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
						<Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
					</div>
				)}

				<div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-indigo-100/50 bg-gradient-to-r from-indigo-50/50 to-violet-50/50">
					<div className="text-center">
						<p className="text-[11px] text-indigo-500/80 font-bold uppercase tracking-widest mb-1">{t.monthlyPlan}</p>
						<p className="text-lg sm:text-xl font-black text-gray-800 tracking-tight">{month}</p>
					</div>
				</div>

				<div className="p-4 sm:p-6 space-y-6">
					<div>
						<SectionTitle title={t.religiousPractice} />
						<div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
							<NumberField label={t.quranStudy} name="quranStudyDays" value={form.quranStudyDays} onChange={handleNumber} max={daysInMonth} />
							<NumberField label={t.salahInJamaat} name="salahJamaat" value={form.salahJamaat} onChange={handleNumber} />
							<NumberField label={t.haditsRead} name="haditsRead" value={form.haditsRead} onChange={handleNumber} />
							<NumberField label={t.literaturePages} name="literature" value={form.literature} onChange={handleNumber} />
						</div>
					</div>

					<div>
						<SectionTitle title={t.dawahAndContacts} />
						<div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
							<NumberField label={t.targetDawah} name="targetContactDawah" value={form.targetContactDawah} onChange={handleNumber} />
							<NumberField label={t.targetWorker} name="targetContactWorker" value={form.targetContactWorker} onChange={handleNumber} />
							<NumberField label={t.targetMember} name="targetContactMember" value={form.targetContactMember} onChange={handleNumber} />
							<NumberField label={t.workerContact} name="workerContact" value={form.workerContact} onChange={handleNumber} />
							<NumberField label={t.bookDistribution} name="bookDistribution" value={form.bookDistribution} onChange={handleNumber} />
						</div>
					</div>

					<div>
						<SectionTitle title={t.activities} />
						<div className="grid grid-cols-2 gap-3">
							<NumberField label={t.familyMeeting} name="familyMeetingDays" value={form.familyMeetingDays} onChange={handleNumber} max={daysInMonth} />
							<NumberField label={t.socialWork} name="socialWorkDays" value={form.socialWorkDays} onChange={handleNumber} max={daysInMonth} />
							<NumberField label={t.safarTravel} name="safarDays" value={form.safarDays} onChange={handleNumber} max={daysInMonth} />
							<NumberField label={t.orgWork} name="orgWorkHours" value={form.orgWorkHours} onChange={handleNumber} />
						</div>
					</div>

					<div>
						<SectionTitle title={t.newFields} />
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
							<DynamicListField label={t.increaseAssociate} items={form.increaseAssociate} onChange={(items: string[]) => handleList("increaseAssociate", items)} t={t} />
							<DynamicListField label={t.increaseActivist} items={form.increaseActivist} onChange={(items: string[]) => handleList("increaseActivist", items)} t={t} />
							<DynamicListField label={t.increaseMember} items={form.increaseMember} onChange={(items: string[]) => handleList("increaseMember", items)} t={t} />
							<DynamicListField label={t.memorizingSura} items={form.memorizingSura} onChange={(items: string[]) => handleList("memorizingSura", items)} t={t} />
							<DynamicListField label={t.memorizingAyat} items={form.memorizingAyat} onChange={(items: string[]) => handleList("memorizingAyat", items)} t={t} />
							<DynamicListField label={t.memorizingHadits} items={form.memorizingHadits} onChange={(items: string[]) => handleList("memorizingHadits", items)} t={t} />
							<div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
								<NumberField label={t.baitulmalIncreaseAmount} name="baitulmalIncreaseAmount" value={form.baitulmalIncreaseAmount} onChange={handleNumber} />
								<NumberField label={t.sellBooksNumber} name="sellBooksNumber" value={form.sellBooksNumber} onChange={handleNumber} />
							</div>

							<DynamicListField label={t.socialHelp} items={form.socialHelp} onChange={(items: string[]) => handleList("socialHelp", items)} t={t} />
							<DynamicListField label={t.professionalHelp} items={form.professionalHelp} onChange={(items: string[]) => handleList("professionalHelp", items)} t={t} />
						</div>
					</div>

					<div>
						<SectionTitle title={t.selfAssessment} />
						<div className="grid grid-cols-2 gap-3">
							<NumberField label={t.reportKeeping} name="reportKeepingDays" value={form.reportKeepingDays} onChange={handleNumber} max={daysInMonth} />
							<NumberField label={t.selfCriticism} name="selfCriticismDays" value={form.selfCriticismDays} onChange={handleNumber} max={daysInMonth} />
						</div>
					</div>

					<div className="pt-2">
						<button
							type="submit"
							disabled={submitting}
							className="w-full sm:w-auto relative group overflow-hidden rounded-xl bg-indigo-600 px-8 py-3.5 sm:py-3 text-sm font-bold text-white transition-all hover:bg-indigo-500 hover:shadow-[0_0_20px_rgba(79,70,229,0.3)] active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center gap-2"
						>
							{submitting ? (
								<>
									<Loader2 className="w-4 h-4 animate-spin" />
									<span>{t.saving}</span>
								</>
							) : (
								<span>{t.saveReport}</span>
							)}
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}
