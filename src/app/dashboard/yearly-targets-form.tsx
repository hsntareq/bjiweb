"use client";
import { useState, useEffect } from "react";
import { Loader2, Save, Plus, Trash2 } from "lucide-react";
import { useLocale } from "../../lib/locale";
import { useSession } from "next-auth/react";
import axios from "axios";
import { getAuthToken } from "../../lib/getAuthToken";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const TEXT = {
	en: {
		yearlyTargets: "Yearly Targets",
		year: "Year",
		membership: "Membership Growth",
		increaseMember: "Increase Member (Names)",
		increaseActivist: "Increase Activist (Names)",
		increaseAssociate: "Increase Associate (Names)",
		spiritual: "Spiritual Development",
		memorizingSura: "Memorizing Sura",
		memorizingAyat: "Memorizing Ayat (Target)",
		memorizingHadits: "Memorizing Hadits",
		studyTopics: "Study of Topics",
		darsQuranHadits: "Dars of Quran & Hadits",
		knowledge: "Knowledge & Awareness",
		politicalAwareness: "Political Awareness Study Topics",
		socialAwareness: "Social Awareness Study Topics",
		communicationStudy: "Communication Study",
		digitalLiteracy: "Digital Literacy Topics",
		awards: "Awards",
		personalAward: "Personal Award",
		socialAward: "Social Award",
		social: "Social Activities",
		increaseNeighbourRelation: "Increase Neighbour Relations (Names)",
		dawatToRelatives: "Dawat to Relatives (Names)",
		finance: "Finance",
		zakatCalculation: "Zakat Calculation (Amount)",
		monthlyDonationTarget: "Monthly Donation Target (Amount)",
		saving: "Saving...",
		saveTargets: "Save Yearly Targets",
		add: "+ Add",
		remove: "Remove",
	},
	bn: {
		yearlyTargets: "বার্ষিক লক্ষ্যমাত্রা",
		year: "বছর",
		membership: "সদস্যপদ বৃদ্ধি",
		increaseMember: "সদস্য বৃদ্ধি (নাম)",
		increaseActivist: "কর্মী বৃদ্ধি (নাম)",
		increaseAssociate: "সহযোগী বৃদ্ধি (নাম)",
		spiritual: "আধ্যাত্মিক উন্নয়ন",
		memorizingSura: "সূরা মুখস্থ",
		memorizingAyat: "আয়াত মুখস্থ (লক্ষ্য)",
		memorizingHadits: "হাদিস মুখস্থ",
		studyTopics: "বিষয়ভিত্তিক অধ্যয়ন",
		darsQuranHadits: "দারস কুরআন ও হাদিস",
		knowledge: "জ্ঞান ও সচেতনতা",
		politicalAwareness: "রাজনৈতিক সচেতনতা বিষয়সমূহ",
		socialAwareness: "সামাজিক সচেতনতা বিষয়সমূহ",
		communicationStudy: "যোগাযোগ অধ্যয়ন",
		digitalLiteracy: "ডিজিটাল সাক্ষরতা বিষয়সমূহ",
		awards: "পুরস্কার",
		personalAward: "ব্যক্তিগত পুরস্কার",
		socialAward: "সামাজিক পুরস্কার",
		social: "সামাজিক কার্যক্রম",
		increaseNeighbourRelation: "প্রতিবেশী সম্পর্ক বৃদ্ধি (নাম)",
		dawatToRelatives: "আত্মীয়দের দাওয়াত (নাম)",
		finance: "অর্থনৈতিক",
		zakatCalculation: "যাকাত গণনা (পরিমাণ)",
		monthlyDonationTarget: "মাসিক চাঁদা লক্ষ্যমাত্রা (পরিমাণ)",
		saving: "সংরক্ষণ হচ্ছে...",
		saveTargets: "বার্ষিক লক্ষ্য সংরক্ষণ করুন",
		add: "+ যোগ করুন",
		remove: "মুছুন",
	},
} as const;

function SectionTitle({ title }: { title: string }) {
	return (
		<h3 className="text-xs font-bold uppercase tracking-widest text-indigo-400/80 mt-3 mb-3 flex items-center gap-2">
			<span className="w-4 h-px bg-indigo-200" />
			{title}
			<span className="flex-1 h-px bg-indigo-100/50" />
		</h3>
	);
}

function NumberField({
	label,
	name,
	value,
	onChange,
}: {
	label: string;
	name: string;
	value: number;
	onChange: (name: string, value: number) => void;
}) {
	return (
		<div className="flex flex-col gap-0.5">
			<label className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</label>
			<input
				type="number"
				name={name}
				min={0}
				value={value}
				onChange={(e) => onChange(name, Math.max(0, Number(e.target.value) || 0))}
				className="w-full border border-gray-200 rounded-xl px-2.5 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-800 text-center focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm hover:border-gray-300 bg-white/50 focus:bg-white"
			/>
		</div>
	);
}

function TextField({
	label,
	name,
	value,
	onChange,
}: {
	label: string;
	name: string;
	value: string;
	onChange: (name: string, value: string) => void;
}) {
	return (
		<div className="flex flex-col gap-0.5">
			<label className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</label>
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

function DynamicListField({ label, items, onChange, addLabel }: {
	label: string;
	items: string[];
	onChange: (items: string[]) => void;
	addLabel: string;
}) {
	const [input, setInput] = useState("");
	const handleAdd = () => {
		if (input.trim()) {
			onChange([...items, input.trim()]);
			setInput("");
		}
	};
	return (
		<div className="flex flex-col gap-1">
			<label className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</label>
			<div className="flex gap-2">
				<input
					type="text"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAdd())}
					className="flex-1 border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-white/50 hover:border-gray-300"
					placeholder="..."
				/>
				<button
					type="button"
					onClick={handleAdd}
					className="px-3 py-1.5 rounded-xl border border-indigo-200 flex items-center gap-1 font-bold text-xs bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors whitespace-nowrap"
				>
					<Plus className="w-3.5 h-3.5" /> {addLabel}
				</button>
			</div>
			{items.length > 0 && (
				<ul className="mt-1 space-y-1">
					{items.map((item, i) => (
						<li key={i} className="flex items-center justify-between border border-gray-100 rounded-lg px-2.5 py-1.5 text-xs bg-white shadow-sm">
							<span className="text-gray-700 truncate">{item}</span>
							<button
								type="button"
								onClick={() => onChange(items.filter((_, idx) => idx !== i))}
								className="text-red-400 hover:text-red-600 ml-2 flex-shrink-0"
							>
								<Trash2 className="w-3.5 h-3.5" />
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

function emptyTargets() {
	return {
		// Membership
		increaseMember: [] as string[],
		increaseActivist: [] as string[],
		increaseAssociate: [] as string[],
		// Spiritual
		memorizingSura: [] as string[],
		memorizingAyat: 0,
		memorizingHadits: [] as string[],
		studyTopics: [] as string[],
		darsQuranHadits: 0,
		// Knowledge
		politicalAwareness: [] as string[],
		socialAwareness: [] as string[],
		communicationStudy: [] as string[],
		digitalLiteracy: [] as string[],
		// Awards
		personalAward: "",
		socialAward: "",
		// Social
		increaseNeighbourRelation: [] as string[],
		dawatToRelatives: [] as string[],
		// Finance
		zakatCalculation: 0,
		monthlyDonationTarget: 0,
	};
}

type TargetsData = ReturnType<typeof emptyTargets>;

export default function YearlyTargetsForm({ selectedYear }: { selectedYear?: string }) {
	const { locale } = useLocale();
	const t = TEXT[locale];
	const { data: session } = useSession();
	const year = selectedYear || new Date().getFullYear().toString();

	const [form, setForm] = useState<TargetsData>(emptyTargets());
	const [submitting, setSubmitting] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchTargets() {
			setLoading(true);
			try {
				const token = getAuthToken(session);
				if (!token) return;
				const res = await axios.get(`${API_URL}/yearly-targets`, {
					params: { year },
					headers: { Authorization: `Bearer ${token}` },
				});
				if (res.data) {
					const d = res.data;
					setForm({
						...emptyTargets(),
						...d,
						increaseMember: Array.isArray(d.increaseMember) ? d.increaseMember : [],
						increaseActivist: Array.isArray(d.increaseActivist) ? d.increaseActivist : [],
						increaseAssociate: Array.isArray(d.increaseAssociate) ? d.increaseAssociate : [],
						memorizingSura: Array.isArray(d.memorizingSura) ? d.memorizingSura : [],
						memorizingHadits: Array.isArray(d.memorizingHadits) ? d.memorizingHadits : [],
						studyTopics: Array.isArray(d.studyTopics) ? d.studyTopics : [],
						politicalAwareness: Array.isArray(d.politicalAwareness) ? d.politicalAwareness : [],
						socialAwareness: Array.isArray(d.socialAwareness) ? d.socialAwareness : [],
						communicationStudy: Array.isArray(d.communicationStudy) ? d.communicationStudy : [],
						digitalLiteracy: Array.isArray(d.digitalLiteracy) ? d.digitalLiteracy : [],
						increaseNeighbourRelation: Array.isArray(d.increaseNeighbourRelation) ? d.increaseNeighbourRelation : [],
						dawatToRelatives: Array.isArray(d.dawatToRelatives) ? d.dawatToRelatives : [],
					});
				}
			} catch {
				// no existing data – use defaults
			} finally {
				setLoading(false);
			}
		}
		fetchTargets();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [year, session]);

	function handleNumber(name: string, value: number) {
		setForm((prev) => ({ ...prev, [name]: value }));
	}

	function handleText(name: string, value: string) {
		setForm((prev) => ({ ...prev, [name]: value }));
	}

	function handleList(name: string, items: string[]) {
		setForm((prev) => ({ ...prev, [name]: items }));
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setSubmitting(true);
		try {
			const token = getAuthToken(session);
			await axios.post(`${API_URL}/yearly-targets`, { year, ...form }, {
				headers: { Authorization: `Bearer ${token}` },
			});
		} catch (err) {
			console.error("Failed to save yearly targets", err);
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<div className="max-w-2xl mx-auto my-8 sm:my-12">
			<form
				onSubmit={handleSubmit}
				className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/50 overflow-hidden ring-1 ring-black/5 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
			>
				{(loading || submitting) && (
					<div className="absolute inset-0 z-50 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
						<Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
					</div>
				)}

				{/* Header */}
				<div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-indigo-100/50 bg-gradient-to-r from-indigo-50/50 to-violet-50/50">
					<div className="text-center">
						<p className="text-[11px] text-indigo-500/80 font-bold uppercase tracking-widest mb-1">{t.yearlyTargets}</p>
						<p className="text-lg sm:text-xl font-black text-gray-800 tracking-tight">{year}</p>
					</div>
				</div>

				<div className="p-4 sm:p-6 space-y-6">
					{/* Membership */}
					<div>
						<SectionTitle title={t.membership} />
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
							<DynamicListField label={t.increaseMember} items={form.increaseMember} onChange={(v) => handleList("increaseMember", v)} addLabel={t.add} />
							<DynamicListField label={t.increaseActivist} items={form.increaseActivist} onChange={(v) => handleList("increaseActivist", v)} addLabel={t.add} />
							<DynamicListField label={t.increaseAssociate} items={form.increaseAssociate} onChange={(v) => handleList("increaseAssociate", v)} addLabel={t.add} />
						</div>
					</div>

					{/* Spiritual */}
					<div>
						<SectionTitle title={t.spiritual} />
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
							<DynamicListField label={t.memorizingSura} items={form.memorizingSura} onChange={(v) => handleList("memorizingSura", v)} addLabel={t.add} />
							<NumberField label={t.memorizingAyat} name="memorizingAyat" value={form.memorizingAyat} onChange={handleNumber} />
							<DynamicListField label={t.memorizingHadits} items={form.memorizingHadits} onChange={(v) => handleList("memorizingHadits", v)} addLabel={t.add} />
							<DynamicListField label={t.studyTopics} items={form.studyTopics} onChange={(v) => handleList("studyTopics", v)} addLabel={t.add} />
							<NumberField label={t.darsQuranHadits} name="darsQuranHadits" value={form.darsQuranHadits} onChange={handleNumber} />
						</div>
					</div>

					{/* Knowledge & Awareness */}
					<div>
						<SectionTitle title={t.knowledge} />
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
							<DynamicListField label={t.politicalAwareness} items={form.politicalAwareness} onChange={(v) => handleList("politicalAwareness", v)} addLabel={t.add} />
							<DynamicListField label={t.socialAwareness} items={form.socialAwareness} onChange={(v) => handleList("socialAwareness", v)} addLabel={t.add} />
							<DynamicListField label={t.communicationStudy} items={form.communicationStudy} onChange={(v) => handleList("communicationStudy", v)} addLabel={t.add} />
							<DynamicListField label={t.digitalLiteracy} items={form.digitalLiteracy} onChange={(v) => handleList("digitalLiteracy", v)} addLabel={t.add} />
						</div>
					</div>

					{/* Awards */}
					<div>
						<SectionTitle title={t.awards} />
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
							<TextField label={t.personalAward} name="personalAward" value={form.personalAward} onChange={handleText} />
							<TextField label={t.socialAward} name="socialAward" value={form.socialAward} onChange={handleText} />
						</div>
					</div>

					{/* Social */}
					<div>
						<SectionTitle title={t.social} />
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
							<DynamicListField label={t.increaseNeighbourRelation} items={form.increaseNeighbourRelation} onChange={(v) => handleList("increaseNeighbourRelation", v)} addLabel={t.add} />
							<DynamicListField label={t.dawatToRelatives} items={form.dawatToRelatives} onChange={(v) => handleList("dawatToRelatives", v)} addLabel={t.add} />
						</div>
					</div>

					{/* Finance */}
					<div>
						<SectionTitle title={t.finance} />
						<div className="grid grid-cols-2 gap-3">
							<NumberField label={t.zakatCalculation} name="zakatCalculation" value={form.zakatCalculation} onChange={handleNumber} />
							<NumberField label={t.monthlyDonationTarget} name="monthlyDonationTarget" value={form.monthlyDonationTarget} onChange={handleNumber} />
						</div>
					</div>

					{/* Save Button */}
					<div className="px-0 py-2 flex justify-end border-t border-gray-100 pt-4">
						<button
							type="submit"
							disabled={submitting}
							className="relative group overflow-hidden rounded-xl px-6 py-2.5 font-semibold text-sm transition-all duration-300 shadow-sm flex items-center gap-2 bg-indigo-600 text-white hover:bg-indigo-500 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed"
						>
							{submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 group-hover:scale-110 transition-transform" />}
							{submitting ? t.saving : t.saveTargets}
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}
