"use client";
import { Loader2, Plus, Save, Trash2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocale } from "../../lib/locale";

// List of 114 suras with ayat counts
const QURAN_SURAS: { en: string; bn: string; ayat: number }[] = [
	{ en: "Al-Fatihah", bn: "আল-ফাতিহা", ayat: 7 },
	{ en: "Al-Baqarah", bn: "আল-বাকারা", ayat: 286 },
	{ en: "Aali Imran", bn: "আলি ইমরান", ayat: 200 },
	{ en: "An-Nisa", bn: "আন-নিসা", ayat: 176 },
	{ en: "Al-Maidah", bn: "আল-মায়িদা", ayat: 120 },
	{ en: "Al-An'am", bn: "আল-আনআম", ayat: 165 },
	{ en: "Al-A'raf", bn: "আল-আরাফ", ayat: 206 },
	{ en: "Al-Anfal", bn: "আল-আনফাল", ayat: 75 },
	{ en: "At-Tawbah", bn: "আত-তাওবা", ayat: 129 },
	{ en: "Yunus", bn: "ইউনুস", ayat: 109 },
	{ en: "Hud", bn: "হুদ", ayat: 123 },
	{ en: "Yusuf", bn: "ইউসুফ", ayat: 111 },
	{ en: "Ar-Ra'd", bn: "আর-রাদ", ayat: 43 },
	{ en: "Ibrahim", bn: "ইবরাহিম", ayat: 52 },
	{ en: "Al-Hijr", bn: "আল-হিজর", ayat: 99 },
	{ en: "An-Nahl", bn: "আন-নাহল", ayat: 128 },
	{ en: "Al-Isra", bn: "আল-ইসরা", ayat: 111 },
	{ en: "Al-Kahf", bn: "আল-কাহফ", ayat: 110 },
	{ en: "Maryam", bn: "মারইয়াম", ayat: 98 },
	{ en: "Ta-Ha", bn: "তা-হা", ayat: 135 },
	{ en: "Al-Anbiya", bn: "আল-আম্বিয়া", ayat: 112 },
	{ en: "Al-Hajj", bn: "আল-হাজ্জ", ayat: 78 },
	{ en: "Al-Mu'minun", bn: "আল-মুমিনুন", ayat: 118 },
	{ en: "An-Nur", bn: "আন-নূর", ayat: 64 },
	{ en: "Al-Furqan", bn: "আল-ফুরকান", ayat: 77 },
	{ en: "Ash-Shu'ara", bn: "আশ-শুআরা", ayat: 227 },
	{ en: "An-Naml", bn: "আন-নামল", ayat: 93 },
	{ en: "Al-Qasas", bn: "আল-কাসাস", ayat: 88 },
	{ en: "Al-Ankabut", bn: "আল-আনকাবুত", ayat: 69 },
	{ en: "Ar-Rum", bn: "আর-রূম", ayat: 60 },
	{ en: "Luqman", bn: "লুকমান", ayat: 34 },
	{ en: "As-Sajdah", bn: "আস-সাজদা", ayat: 30 },
	{ en: "Al-Ahzab", bn: "আল-আহযাব", ayat: 73 },
	{ en: "Saba", bn: "সাবা", ayat: 54 },
	{ en: "Fatir", bn: "ফাতির", ayat: 45 },
	{ en: "Ya-Sin", bn: "ইয়া-সীন", ayat: 83 },
	{ en: "As-Saffat", bn: "আস-সাফফাত", ayat: 182 },
	{ en: "Sad", bn: "সাদ", ayat: 88 },
	{ en: "Az-Zumar", bn: "আয-যুমার", ayat: 75 },
	{ en: "Ghafir", bn: "গাফির", ayat: 85 },
	{ en: "Fussilat", bn: "ফুস্সিলাত", ayat: 54 },
	{ en: "Ash-Shura", bn: "আশ-শূরা", ayat: 53 },
	{ en: "Az-Zukhruf", bn: "আয-যুখরুফ", ayat: 89 },
	{ en: "Ad-Dukhan", bn: "আদ-দুখান", ayat: 59 },
	{ en: "Al-Jathiyah", bn: "আল-জাসিয়া", ayat: 37 },
	{ en: "Al-Ahqaf", bn: "আল-আহকাফ", ayat: 35 },
	{ en: "Muhammad", bn: "মুহাম্মাদ", ayat: 38 },
	{ en: "Al-Fath", bn: "আল-ফাতহ", ayat: 29 },
	{ en: "Al-Hujurat", bn: "আল-হুজুরাত", ayat: 18 },
	{ en: "Qaf", bn: "কাফ", ayat: 45 },
	{ en: "Adh-Dhariyat", bn: "আয-যারিয়াত", ayat: 60 },
	{ en: "At-Tur", bn: "আত-তূর", ayat: 49 },
	{ en: "An-Najm", bn: "আন-নাজম", ayat: 62 },
	{ en: "Al-Qamar", bn: "আল-কামার", ayat: 55 },
	{ en: "Ar-Rahman", bn: "আর-রাহমান", ayat: 78 },
	{ en: "Al-Waqi'ah", bn: "আল-ওয়াকিআ", ayat: 96 },
	{ en: "Al-Hadid", bn: "আল-হাদিদ", ayat: 29 },
	{ en: "Al-Mujadila", bn: "আল-মুজাদালা", ayat: 22 },
	{ en: "Al-Hashr", bn: "আল-হাশর", ayat: 24 },
	{ en: "Al-Mumtahanah", bn: "আল-মুমতাহানা", ayat: 13 },
	{ en: "As-Saf", bn: "আস-সাফ", ayat: 14 },
	{ en: "Al-Jumu'ah", bn: "আল-জুমুআ", ayat: 11 },
	{ en: "Al-Munafiqun", bn: "আল-মুনাফিকুন", ayat: 11 },
	{ en: "At-Taghabun", bn: "আত-তাগাবুন", ayat: 18 },
	{ en: "At-Talaq", bn: "আত-তালাক", ayat: 12 },
	{ en: "At-Tahrim", bn: "আত-তাহরিম", ayat: 12 },
	{ en: "Al-Mulk", bn: "আল-মুলক", ayat: 30 },
	{ en: "Al-Qalam", bn: "আল-কালাম", ayat: 52 },
	{ en: "Al-Haqqah", bn: "আল-হাক্কা", ayat: 52 },
	{ en: "Al-Ma'arij", bn: "আল-মাআরিজ", ayat: 44 },
	{ en: "Nuh", bn: "নূহ", ayat: 28 },
	{ en: "Al-Jinn", bn: "আল-জিন", ayat: 28 },
	{ en: "Al-Muzzammil", bn: "আল-মুজ্জাম্মিল", ayat: 20 },
	{ en: "Al-Muddaththir", bn: "আল-মুদ্দাস্সির", ayat: 56 },
	{ en: "Al-Qiyamah", bn: "আল-কিয়ামা", ayat: 40 },
	{ en: "Al-Insan", bn: "আল-ইনসান", ayat: 31 },
	{ en: "Al-Mursalat", bn: "আল-মুরসালাত", ayat: 50 },
	{ en: "An-Naba", bn: "আন-নাবা", ayat: 40 },
	{ en: "An-Nazi'at", bn: "আন-নাযিআত", ayat: 46 },
	{ en: "Abasa", bn: "আবাসা", ayat: 42 },
	{ en: "At-Takwir", bn: "আত-তাকউইর", ayat: 29 },
	{ en: "Al-Infitar", bn: "আল-ইনফিতার", ayat: 19 },
	{ en: "Al-Mutaffifin", bn: "আল-মুতাফফিফিন", ayat: 36 },
	{ en: "Al-Inshiqaq", bn: "আল-ইনশিকাক", ayat: 25 },
	{ en: "Al-Buruj", bn: "আল-বুরূজ", ayat: 22 },
	{ en: "At-Tariq", bn: "আত-তারিক", ayat: 17 },
	{ en: "Al-A'la", bn: "আল-আলা", ayat: 19 },
	{ en: "Al-Ghashiyah", bn: "আল-গাশিয়া", ayat: 26 },
	{ en: "Al-Fajr", bn: "আল-ফাজর", ayat: 30 },
	{ en: "Al-Balad", bn: "আল-বালাদ", ayat: 20 },
	{ en: "Ash-Shams", bn: "আশ-শামস", ayat: 15 },
	{ en: "Al-Layl", bn: "আল-লাইল", ayat: 21 },
	{ en: "Ad-Duha", bn: "আদ-দুহা", ayat: 11 },
	{ en: "Ash-Sharh", bn: "আশ-শারহ", ayat: 8 },
	{ en: "At-Tin", bn: "আত-তীন", ayat: 8 },
	{ en: "Al-Alaq", bn: "আল-আলাক", ayat: 19 },
	{ en: "Al-Qadr", bn: "আল-কাদর", ayat: 5 },
	{ en: "Al-Bayyinah", bn: "আল-বাইয়্যিনা", ayat: 8 },
	{ en: "Az-Zalzalah", bn: "আয-যালযালা", ayat: 8 },
	{ en: "Al-Adiyat", bn: "আল-আদিয়াত", ayat: 11 },
	{ en: "Al-Qari'ah", bn: "আল-কারিআ", ayat: 11 },
	{ en: "At-Takathur", bn: "আত-তাকাসুর", ayat: 8 },
	{ en: "Al-Asr", bn: "আল-আসর", ayat: 3 },
	{ en: "Al-Humazah", bn: "আল-হুমাযা", ayat: 9 },
	{ en: "Al-Fil", bn: "আল-ফিল", ayat: 5 },
	{ en: "Quraysh", bn: "কুরাইশ", ayat: 4 },
	{ en: "Al-Ma'un", bn: "আল-মাউন", ayat: 7 },
	{ en: "Al-Kawthar", bn: "আল-কাউসার", ayat: 3 },
	{ en: "Al-Kafirun", bn: "আল-কাফিরুন", ayat: 6 },
	{ en: "An-Nasr", bn: "আন-নাসর", ayat: 3 },
	{ en: "Al-Masad", bn: "আল-মাসাদ", ayat: 5 },
	{ en: "Al-Ikhlas", bn: "আল-ইখলাস", ayat: 4 },
	{ en: "Al-Falaq", bn: "আল-ফালাক", ayat: 5 },
	{ en: "An-Nas", bn: "আন-নাস", ayat: 6 },
];

// Hadits books with counts
const HADITS_BOOKS: { en: string; bn: string; hadits: number }[] = [
	{ en: "Sahih Al-Bukhari", bn: "সহিহ আল-বুখারী", hadits: 7275 },
	{ en: "Sahih Muslim", bn: "সহিহ মুসলিম", hadits: 7563 },
	{ en: "Sunan Abu Dawood", bn: "সুনান আবু দাউদ", hadits: 5274 },
	{ en: "Sunan At-Tirmidhi", bn: "সুনান আত-তিরমিজি", hadits: 3956 },
	{ en: "Sunan An-Nasa'i", bn: "সুনান আন-নাসাই", hadits: 5761 },
	{ en: "Sunan Ibn Majah", bn: "সুনান ইবন মাজাহ", hadits: 4341 },
	{ en: "Muwatta Malik", bn: "মুয়াত্তা মালিক", hadits: 1613 },
	{ en: "Sunan Darimi", bn: "সুনান দারিমি", hadits: 3370 },
];

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
		salahJamaat: daysInMonth * 5,
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

function formatMonthYear(month: string) {
	if (!month) return "";
	const [year, monthNumber] = month.split("-").map(Number);
	if (!year || !monthNumber) return month;
	return new Date(year, monthNumber - 1, 1).toLocaleDateString("en-US", {
		month: "long",
		year: "numeric",
	});
}

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
		quranStudy: "কুরআন অধ্যয়ন (দিন)",
		salahInJamaat: "জামাতে সালাত (বার)",
		haditsRead: "হাদিস পাঠ",
		literaturePages: "সাহিত্য (পৃষ্ঠা/বই)",
		dawahAndContacts: "দাওয়াহ ও যোগাযোগ",
		targetDawah: "টার্গেট - দাওয়াহ",
		targetWorker: "টার্গেট - কর্মী",
		targetMember: "টার্গেট - সদস্য",
		workerContact: "কর্মী যোগাযোগ",
		bookDistribution: "বই বিতরণ",
		activities: "কার্যক্রম",
		familyMeeting: "পারিবারিক বৈঠক (দিন)",
		socialWork: "সামাজিক কাজ (দিন)",
		safarTravel: "সফর (দিন)",
		orgWork: "সাংগঠনিক কাজ (ঘণ্টা)",
		selfAssessment: "আত্মমূল্যায়ন",
		reportKeeping: "রিপোর্ট সংরক্ষণ (দিন)",
		selfCriticism: "আত্মসমালোচনা (দিন)",
		saving: "সংরক্ষণ হচ্ছে...",
		saveReport: "পরিকল্পনা সংরক্ষণ",
		newFields: "মাসিক লক্ষ্যমাত্রা",
		increaseAssociate: "সহযোগী বৃদ্ধি (নাম)",
		increaseActivist: "কর্মী বৃদ্ধি (নাম)",
		increaseMember: "সদস্য বৃদ্ধি (নাম)",
		memorizingSura: "সূরা মুখস্ত",
		memorizingAyat: "আয়াত মুখস্ত",
		memorizingHadits: "হাদিস মুখস্ত",
		baitulmalIncreaseAmount: "বায়তুলমাল বৃদ্ধি (পরিমাণ)",
		sellBooksNumber: "বই বিক্রি (সংখ্যা)",
		socialHelp: "সামাজিক সাহায্য",
		professionalHelp: "পেশাগত সাহায্য",
		add: "যোগ করুন",
		lockedNotice: "পূর্ববর্তী মাসের পরিকল্পনা পরিবর্তন করা যায় না।",
	},
} as const;

function normalizeStringList(value: unknown): string[] {
	if (!Array.isArray(value)) return [];
	return value
		.map((item) => (typeof item === "string" ? item.trim() : ""))
		.filter(Boolean);
}

function NumberField({ label, name, value, onChange, max, disabled }: any) {
	const inputRef = useRef<HTMLInputElement>(null);
	return (
		<div
			className={`relative flex items-center justify-between gap-1 border rounded-lg px-2 py-1.5 shadow-sm transition-all cursor-text ${disabled ? 'bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed' : 'border-gray-200 hover:border-gray-300 bg-white/50 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500'}`}
			onClick={() => !disabled && inputRef.current?.focus()}
		>
			<label className="text-xs font-medium text-gray-500 uppercase tracking-wide whitespace-nowrap flex items-center gap-1 pointer-events-none">{label}</label>
			<input
				ref={inputRef}
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
				className="flex-shrink-0 w-16 border-0 bg-transparent text-xs sm:text-sm text-gray-800 text-right focus:outline-none font-medium"
			/>
		</div>
	);
}

function TextField({ label, name, value, onChange, disabled }: any) {
	const inputRef = useRef<HTMLInputElement>(null);
	return (
		<div
			className={`relative flex items-center justify-between gap-1 border rounded-lg px-2 py-1.5 shadow-sm transition-all cursor-text ${disabled ? 'bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed' : 'border-gray-200 hover:border-gray-300 bg-white/50 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500'}`}
			onClick={() => !disabled && inputRef.current?.focus()}
		>
			<label className="text-xs font-medium text-gray-500 uppercase tracking-wide whitespace-nowrap flex items-center gap-1 pointer-events-none">{label}</label>
			<input
				ref={inputRef}
				type="text"
				name={name}
				value={value}
				onChange={(e) => { if (!disabled) onChange(name, e.target.value); }}
				disabled={disabled}
				className="flex-shrink-0 border-0 bg-transparent text-xs sm:text-sm text-gray-800 text-right focus:outline-none font-medium"
			/>
		</div>
	);
}

function TextInputField({ label, items, onChange, disabled }: { label: string; items: string[]; onChange: (items: string[]) => void; disabled?: boolean }) {
	const [inputValue, setInputValue] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);
	const normalizedItems = normalizeStringList(items);

	const handleAdd = () => {
		if (!inputValue.trim() || normalizedItems.includes(inputValue.trim())) return;
		onChange([...normalizedItems, inputValue.trim()]);
		setInputValue("");
	};

	const handleRemove = (index: number) => {
		onChange(normalizedItems.filter((_: string, i: number) => i !== index));
	};

	return (
		<div className="flex flex-col gap-1.5">
			<label className="text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center gap-1.5 whitespace-nowrap">{label}</label>
			<div className="flex gap-2 items-center hover:cursor-pointer" onClick={() => !disabled && inputRef.current?.focus()}>
				<input
					ref={inputRef}
					type="text"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onKeyPress={(e) => e.key === "Enter" && !disabled && handleAdd()}
					disabled={disabled}
					placeholder="Enter name"
					className={`flex-1 border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs sm:text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm ${disabled ? 'bg-gray-100 cursor-not-allowed text-gray-500' : 'bg-white/50 focus:bg-white'}`}
				/>
				<button
					type="button"
					onClick={handleAdd}
					disabled={disabled || !inputValue.trim()}
					className="px-3 py-1.5 rounded-xl border flex items-center gap-1 shadow-sm font-medium text-sm bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
				>
					<Plus className="w-4 h-4" />
					{disabled ? "" : "Add"}
				</button>
			</div>
			{normalizedItems.length > 0 && (
				<div className="mt-2 flex flex-wrap gap-2">
					{normalizedItems.map((item: string, i: number) => (
						<div
							key={i}
							className={`inline-flex items-center gap-2 border border-gray-100 rounded-lg px-3 py-2 shadow-sm text-sm ${disabled ? "bg-gray-50" : "bg-white"}`}
						>
							<span className={`text-gray-700 ${disabled ? "opacity-70" : ""}`}>{item}</span>
							{!disabled && (
								<button type="button" onClick={() => handleRemove(i)} className="text-red-400 hover:text-red-600 p-0.5">
									<Trash2 className="w-4 h-4" />
								</button>
							)}
						</div>
					))}
				</div>
			)}
		</div>
	);
}

function HaditsSelectField({ label, items, onChange, locale, disabled }: { label: string; items: string[]; onChange: (items: string[]) => void; locale: string; disabled?: boolean }) {
	const [selectedBook, setSelectedBook] = useState<number | null>(null);
	const [haditsCount, setHaditsCount] = useState("");
	const selectRef = useRef<HTMLSelectElement>(null);
	const normalizedItems = normalizeStringList(items);

	const handleAdd = () => {
		if (selectedBook === null || !haditsCount.trim()) return;
		const book = HADITS_BOOKS[selectedBook];
		const bookName = locale === "bn" ? book.bn : book.en;
		const label = `${bookName} (${haditsCount})`;
		if (normalizedItems.includes(label)) return;
		onChange([...normalizedItems, label]);
		setSelectedBook(null);
		setHaditsCount("");
	};

	const handleRemove = (index: number) => {
		onChange(normalizedItems.filter((_: string, i: number) => i !== index));
	};

	return (
		<div className="flex flex-col gap-1.5">
			<label className="text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center gap-1.5 whitespace-nowrap">{label}</label>
			<div className="flex gap-2 items-center hover:cursor-pointer" onClick={() => !disabled && selectRef.current?.focus()}>
				<select
					ref={selectRef}
					disabled={disabled}
					value={selectedBook === null ? "" : selectedBook}
					onChange={(e) => setSelectedBook(e.target.value === "" ? null : Number(e.target.value))}
					className="border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs sm:text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm bg-white/50 focus:bg-white flex-1"
				>
					<option value="">{locale === "bn" ? "— কিতাব —" : "— Book —"}</option>
					{HADITS_BOOKS.map((b, i) => (
						<option key={i} value={i}>{locale === "bn" ? b.bn : b.en}</option>
					))}
				</select>
				{selectedBook !== null && (
					<>
						<input
							type="text"
							value={haditsCount}
							onChange={(e) => setHaditsCount(e.target.value)}
							placeholder={locale === "bn" ? "সংখ্যা" : "Count"}
							className="w-20 border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs sm:text-sm text-gray-800 text-right focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
							disabled={disabled}
						/>
						<button
							type="button"
							onClick={handleAdd}
							disabled={disabled}
							className="px-3 py-1.5 rounded-xl border flex items-center gap-1 shadow-sm font-medium text-sm bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100 whitespace-nowrap"
						>
							<Plus className="w-4 h-4" />
							{locale === "bn" ? "যোগ করুন" : "Add"}
						</button>
					</>
				)}
			</div>
			{normalizedItems.length > 0 && (
				<div className="mt-2 flex flex-wrap gap-2">
					{normalizedItems.map((item: string, i: number) => (
						<div
							key={i}
							className={`inline-flex items-center gap-2 border border-gray-100 rounded-lg px-3 py-2 shadow-sm text-sm ${disabled ? "bg-gray-50" : "bg-white"}`}
						>
							<span className={`text-gray-700 ${disabled ? "opacity-70" : ""}`}>{item}</span>
							{!disabled && (
								<button type="button" onClick={() => handleRemove(i)} className="text-red-400 hover:text-red-600 p-0.5">
									<Trash2 className="w-4 h-4" />
								</button>
							)}
						</div>
					))}
				</div>
			)}
		</div>
	);
}

function SuraSelectField({ label, items, onChange, locale, disabled }: { label: string; items: string[]; onChange: (items: string[]) => void; locale: string; disabled?: boolean }) {
	const selectRef = useRef<HTMLSelectElement>(null);
	const normalizedItems = normalizeStringList(items);

	const handleAdd = (value: string) => {
		if (!value || normalizedItems.includes(value)) return;
		onChange([...normalizedItems, value]);
	};

	const handleRemove = (index: number) => {
		onChange(normalizedItems.filter((_: string, i: number) => i !== index));
	};

	const available = QURAN_SURAS.filter(
		(s) => !normalizedItems.includes(locale === "bn" ? s.bn : s.en)
	);

	return (
		<div className="flex flex-col gap-1.5">
			<label className="text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center gap-1.5 whitespace-nowrap">{label}</label>
			<select
				ref={selectRef}
				disabled={disabled || available.length === 0}
				value=""
				onChange={(e) => !disabled && handleAdd(e.target.value)}
				onClick={() => !disabled && selectRef.current?.focus()}
				className={`border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs sm:text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm hover:cursor-pointer w-full ${disabled ? "bg-gray-100 cursor-not-allowed text-gray-500" : "bg-white/50 focus:bg-white"}`}
			>
				<option value="">{locale === "bn" ? "— সূরা বেছে নিন —" : "— Select a Sura —"}</option>
				{QURAN_SURAS.map((s, i) => {
					const label = locale === "bn" ? `${i + 1}. ${s.bn}` : `${i + 1}. ${s.en}`;
					const value = locale === "bn" ? s.bn : s.en;
					const selected = normalizedItems.includes(value);
					return (
						<option key={i} value={value} disabled={selected}>
							{label}
						</option>
					);
				})}
			</select>
			{normalizedItems.length > 0 && (
				<div className="mt-2 flex flex-wrap gap-2">
					{normalizedItems.map((item: string, i: number) => (
						<div key={i} className={`inline-flex items-center gap-2 border border-gray-100 rounded-lg px-3 py-2 shadow-sm text-sm ${disabled ? "bg-gray-50" : "bg-white"}`}>
							<span className={`text-gray-700 ${disabled ? "opacity-70" : ""}`}>{item}</span>
							{!disabled && (
								<button type="button" onClick={() => handleRemove(i)} className="text-red-400 hover:text-red-600 p-0.5">
									<Trash2 className="w-4 h-4" />
								</button>
							)}
						</div>
					))}
				</div>
			)}
		</div>
	);
}

function AyatSelectField({ label, items, onChange, locale, disabled }: { label: string; items: string[]; onChange: (items: string[]) => void; locale: string; disabled?: boolean }) {
	const [selectedSura, setSelectedSura] = useState<number | null>(null);
	const [startAyat, setStartAyat] = useState(1);
	const [endAyat, setEndAyat] = useState(1);
	const selectRef = useRef<HTMLSelectElement>(null);
	const startAyatRef = useRef<HTMLInputElement>(null);
	const normalizedItems = normalizeStringList(items);

	const handleAdd = () => {
		if (selectedSura === null) return;
		const sura = QURAN_SURAS[selectedSura];
		if (startAyat < 1 || endAyat > sura.ayat || startAyat > endAyat) return;
		const label = `${locale === "bn" ? sura.bn : sura.en} ${startAyat}-${endAyat}`;
		if (normalizedItems.includes(label)) return;
		onChange([...normalizedItems, label]);
		setStartAyat(1);
		setEndAyat(1);
		setSelectedSura(null);
	};

	const handleRemove = (index: number) => {
		onChange(normalizedItems.filter((_: string, i: number) => i !== index));
	};

	return (
		<div className="flex flex-col gap-1.5">
			<label className="text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center gap-1.5 whitespace-nowrap">{label}</label>
			<div className="flex gap-2 items-center hover:cursor-pointer" onClick={() => !disabled && selectRef.current?.focus()}>
				<select
					ref={selectRef}
					disabled={disabled}
					value={selectedSura === null ? "" : selectedSura}
					onChange={(e) => {
						const idx = e.target.value === "" ? null : Number(e.target.value);
						setSelectedSura(idx);
						if (idx !== null) {
							setStartAyat(1);
							setEndAyat(1);
						}
					}}
					className="border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs sm:text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm bg-white/50 focus:bg-white flex-1"
				>
					<option value="">{locale === "bn" ? "— সূরা —" : "— Sura —"}</option>
					{QURAN_SURAS.map((s, i) => (
						<option key={i} value={i}>{locale === "bn" ? `${i + 1}. ${s.bn}` : `${i + 1}. ${s.en}`}</option>
					))}
				</select>
				{selectedSura !== null && (
					<>
						<input
							ref={startAyatRef}
							type="number"
							min={1}
							max={QURAN_SURAS[selectedSura].ayat}
							value={startAyat}
							onChange={(e) => setStartAyat(Number(e.target.value))}
							className="w-16 border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs sm:text-sm text-gray-800 text-right focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
							disabled={disabled}
							placeholder={locale === "bn" ? "শুরু" : "Start"}
						/>
						<span className="self-center flex-shrink-0">-</span>
						<input
							type="number"
							min={startAyat}
							max={QURAN_SURAS[selectedSura].ayat}
							value={endAyat}
							onChange={(e) => setEndAyat(Number(e.target.value))}
							className="w-16 border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs sm:text-sm text-gray-800 text-right focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
							disabled={disabled}
							placeholder={locale === "bn" ? "শেষ" : "End"}
						/>
						<button
							type="button"
							onClick={handleAdd}
							disabled={disabled}
							className="px-3 py-1.5 rounded-xl border flex items-center gap-1 shadow-sm font-medium text-sm bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100 whitespace-nowrap"
						>
							<Plus className="w-4 h-4" />
							{locale === "bn" ? "যোগ করুন" : "Add"}
						</button>
					</>
				)}
			</div>
			{normalizedItems.length > 0 && (
				<div className="mt-2 flex flex-wrap gap-2">
					{normalizedItems.map((item: string, i: number) => (
						<div key={i} className={`inline-flex items-center gap-2 border border-gray-100 rounded-lg px-3 py-2 shadow-sm text-sm ${disabled ? "bg-gray-50" : "bg-white"}`}>
							<span className={`text-gray-700 ${disabled ? "opacity-70" : ""}`}>{item}</span>
							{!disabled && (
								<button type="button" onClick={() => handleRemove(i)} className="text-red-400 hover:text-red-600 p-0.5">
									<Trash2 className="w-4 h-4" />
								</button>
							)}
						</div>
					))}
				</div>
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
		<div className="w-full px-0 sm:px-8 py-0 sm:py-4">
			<form onSubmit={handleSubmit} className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/50 overflow-hidden ring-1 ring-black/5 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
				{(defaultData === undefined || submitting) && (
					<div className="absolute inset-0 z-50 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
						<Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
					</div>
				)}

				<div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-indigo-100/50 bg-gradient-to-r from-indigo-50/50 to-violet-50/50">
					<div className="text-center">
						<p className="text-xs text-indigo-500/80 font-bold uppercase tracking-widest mb-1">{t.monthlyPlan}</p>
						<p className="text-lg sm:text-xl font-black text-gray-800 tracking-tight">
							{formatMonthYear(month)}
						</p>
						{isLocked && (
							<p className="mt-2 text-sm text-amber-600 bg-amber-50 py-1.5 px-3 rounded-lg inline-block border border-amber-200/50">
								{t.lockedNotice}
							</p>
						)}
					</div>
				</div>

				<div className="p-4 sm:p-6 space-y-4">
					<div className="border border-indigo-100/50 rounded-2xl p-4 pt-0 bg-indigo-50/30">
						<SectionTitle title={t.religiousPractice} />
						<div className="flex flex-wrap gap-3">
							<div className="flex-1"><NumberField label={t.quranStudy} name="quranStudyDays" value={form.quranStudyDays} onChange={handleNumber} max={daysInMonth} disabled={isLocked} /></div>
							<div className="flex-1"><NumberField label={t.salahInJamaat} name="salahJamaat" value={form.salahJamaat} onChange={handleNumber} disabled={isLocked} /></div>
							<div className="flex-1"><NumberField label={t.haditsRead} name="haditsRead" value={form.haditsRead} onChange={handleNumber} disabled={isLocked} /></div>
							<div className="flex-1"><NumberField label={t.literaturePages} name="literature" value={form.literature} onChange={handleNumber} disabled={isLocked} /></div>
						</div>
					</div>

					<div className="border border-violet-100/50 rounded-2xl p-4 pt-0 bg-violet-50/30">
						<SectionTitle title={t.dawahAndContacts} />
						<div className="flex flex-wrap gap-3">
							<div className="flex-1"><NumberField label={t.targetDawah} name="targetContactDawah" value={form.targetContactDawah} onChange={handleNumber} disabled={isLocked} /></div>
							<div className="flex-1"><NumberField label={t.targetWorker} name="targetContactWorker" value={form.targetContactWorker} onChange={handleNumber} disabled={isLocked} /></div>
							<div className="flex-1"><NumberField label={t.targetMember} name="targetContactMember" value={form.targetContactMember} onChange={handleNumber} disabled={isLocked} /></div>
							<div className="flex-1"><NumberField label={t.workerContact} name="workerContact" value={form.workerContact} onChange={handleNumber} disabled={isLocked} /></div>
							<div className="flex-1"><NumberField label={t.bookDistribution} name="bookDistribution" value={form.bookDistribution} onChange={handleNumber} disabled={isLocked} /></div>
						</div>
					</div>

					<div className="border border-purple-100/50 rounded-2xl px-4 pb-4 bg-purple-50/30">
						<SectionTitle title={t.activities} />
						<div className="flex flex-wrap gap-3">
							<div className="flex-1"><NumberField label={t.familyMeeting} name="familyMeetingDays" value={form.familyMeetingDays} onChange={handleNumber} max={daysInMonth} disabled={isLocked} /></div>
							<div className="flex-1"><NumberField label={t.socialWork} name="socialWorkDays" value={form.socialWorkDays} onChange={handleNumber} max={daysInMonth} disabled={isLocked} /></div>
							<div className="flex-1"><NumberField label={t.safarTravel} name="safarDays" value={form.safarDays} onChange={handleNumber} max={daysInMonth} disabled={isLocked} /></div>
							<div className="flex-1"><NumberField label={t.orgWork} name="orgWorkHours" value={form.orgWorkHours} onChange={handleNumber} disabled={isLocked} /></div>
						</div>
					</div>

					<div className="border border-amber-100/50 rounded-2xl p-4 pt-0 bg-amber-50/30">
						<SectionTitle title={t.newFields} />
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
							<div><TextInputField label={t.increaseAssociate} items={form.increaseAssociate} onChange={(items: string[]) => handleList("increaseAssociate", items)} disabled={isLocked} /></div>
							<div><TextInputField label={t.increaseActivist} items={form.increaseActivist} onChange={(items: string[]) => handleList("increaseActivist", items)} disabled={isLocked} /></div>
							<div><TextInputField label={t.increaseMember} items={form.increaseMember} onChange={(items: string[]) => handleList("increaseMember", items)} disabled={isLocked} /></div>
							<div><SuraSelectField label={t.memorizingSura} items={form.memorizingSura} onChange={(items: string[]) => handleList("memorizingSura", items)} locale={locale} disabled={isLocked} /></div>
							<div><AyatSelectField label={t.memorizingAyat} items={form.memorizingAyat} onChange={(items: string[]) => handleList("memorizingAyat", items)} locale={locale} disabled={isLocked} /></div>
							<div><HaditsSelectField label={t.memorizingHadits} items={form.memorizingHadits} onChange={(items: string[]) => handleList("memorizingHadits", items)} locale={locale} disabled={isLocked} /></div>
							<div><NumberField label={t.baitulmalIncreaseAmount} name="baitulmalIncreaseAmount" value={form.baitulmalIncreaseAmount} onChange={handleNumber} disabled={isLocked} /></div>
							<div><NumberField label={t.sellBooksNumber} name="sellBooksNumber" value={form.sellBooksNumber} onChange={handleNumber} disabled={isLocked} /></div>
							<div><TextInputField label={t.socialHelp} items={form.socialHelp} onChange={(items: string[]) => handleList("socialHelp", items)} disabled={isLocked} /></div>
							<div><TextInputField label={t.professionalHelp} items={form.professionalHelp} onChange={(items: string[]) => handleList("professionalHelp", items)} disabled={isLocked} /></div>
						</div>
					</div>

					<div className="border border-emerald-100/50 rounded-2xl p-4 pt-0 bg-emerald-50/30">
						<SectionTitle title={t.selfAssessment} />
						<div className="flex flex-wrap gap-3">
							<div className="flex-1"><NumberField label={t.reportKeeping} name="reportKeepingDays" value={form.reportKeepingDays} onChange={handleNumber} max={daysInMonth} disabled={isLocked} /></div>
							<div className="flex-1"><NumberField label={t.selfCriticism} name="selfCriticismDays" value={form.selfCriticismDays} onChange={handleNumber} max={daysInMonth} disabled={isLocked} /></div>
						</div>
					</div>

					<div className="px-4 sm:px-6 py-5 bg-gray-50/50 border-t border-gray-100 flex justify-end">
						<button
							type="submit"
							disabled={submitting || isLocked}
							className={`relative group overflow-hidden rounded-xl px-6 py-2.5 font-semibold text-sm transition-all duration-300 shadow-sm flex items-center gap-2 ${isLocked || submitting ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-500 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm'
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
