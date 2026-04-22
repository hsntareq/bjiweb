"use client";
import { useEffect, useState } from "react";

type ReportData = {
	quranStudy: boolean;
	haditsRead: number;
	literature: number;
	salahJamaat: boolean;
	targetContactDawah: number;
	targetContactWorker: number;
	targetContactMember: number;
	workerContact: number;
	bookDistribution: number;
	familyMeeting: boolean;
	socialWork: boolean;
	orgWorkHours: number;
	orgWorkMinutes: number;
	safar: boolean;
	reportKeeping: boolean;
	selfCriticism: boolean;
};

const emptyReport = (): ReportData => ({
	quranStudy: false,
	haditsRead: 0,
	literature: 0,
	salahJamaat: false,
	targetContactDawah: 0,
	targetContactWorker: 0,
	targetContactMember: 0,
	workerContact: 0,
	bookDistribution: 0,
	familyMeeting: false,
	socialWork: false,
	orgWorkHours: 0,
	orgWorkMinutes: 0,
	safar: false,
	reportKeeping: false,
	selfCriticism: false,
});

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

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
	return (
		<button
			type="button"
			onClick={onChange}
			className={`flex items-center justify-between w-full px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl border transition-all text-xs sm:text-sm font-medium ${checked
				? "bg-indigo-50 border-indigo-300 text-indigo-700"
				: "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
				}`}
		>
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

function NumberField({ label, name, value, onChange }: { label: string; name: string; value: number; onChange: (name: string, value: number) => void }) {
	return (
		<div className="flex flex-col gap-0.5">
			<label className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</label>
			<input
				type="number"
				name={name}
				min={0}
				value={value}
				onChange={(e) => onChange(name, Math.max(0, Number(e.target.value)))}
				className="border border-gray-200 rounded-lg px-2.5 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition bg-white"
			/>
		</div>
	);
}

function SectionTitle({ title }: { title: string }) {
	return <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mt-2 mb-2">{title}</h3>;
}

export default function PersonalReportForm({
	date,
	onDateChange,
	onSubmit,
	submitting,
	defaultData,
}: {
	date: string;
	onDateChange: (d: string) => void;
	onSubmit: (data: ReportData & { date: string }) => void;
	submitting: boolean;
	defaultData?: Partial<ReportData> | null;
}) {
	const [form, setForm] = useState<ReportData>(emptyReport);

	// When defaultData changes (from parent), update the form
	useEffect(() => {
		if (defaultData) {
			setForm((prev) => ({ ...prev, ...defaultData }));
		} else {
			setForm(emptyReport());
		}
	}, [defaultData, date]);

	function handleToggle(name: keyof ReportData) {
		setForm((prev) => ({ ...prev, [name]: !prev[name] }));
	}

	function handleNumber(name: string, value: number) {
		setForm((prev) => ({ ...prev, [name]: value }));
	}

	function shiftDate(days: number) {
		const d = parseDateStr(date);
		d.setDate(d.getDate() + days);
		onDateChange(toDateStr(d));
	}

	const isToday = date === toDateStr(new Date());

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		onSubmit({ ...form, date });
	}

	return (
		<div className="max-w-2xl mx-auto my-8">
			<form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
				{/* Form Header with date navigation */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 bg-gray-50 gap-2 sm:gap-0">
					<div className="text-center sm:text-left">
						<p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Daily Report</p>
						<p className="text-base font-bold text-gray-800">{formatDisplayDate(date)}</p>
					</div>
					<div className="flex items-center gap-2 w-full sm:w-auto">
						<button
							type="button"
							onClick={() => shiftDate(-1)}
							className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:border-gray-300 transition text-lg leading-none flex-shrink-0"
							aria-label="Previous day"
						>
							‹
						</button>
						<input
							type="date"
							value={date}
							max={toDateStr(new Date())}
							onChange={(e) => onDateChange(e.target.value)}
							className="flex-1 sm:flex-none text-sm border border-gray-200 rounded-lg px-2 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition bg-white"
						/>
						<button
							type="button"
							onClick={() => shiftDate(1)}
							disabled={isToday}
							className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:border-gray-300 transition text-lg leading-none disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
							aria-label="Next day"
						>
							›
						</button>
						{!isToday && (
							<button
								type="button"
								onClick={() => onDateChange(toDateStr(new Date()))}
								className="text-xs text-indigo-600 hover:underline ml-1 font-medium flex-shrink-0"
							>
								Today
							</button>
						)}
					</div>
				</div>

				<div className="px-4 sm:px-6 py-4 sm:py-5 grid gap-4 sm:gap-5">
					{/* Religious */}
					<div>
						<SectionTitle title="Religious Practice" />
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
							<Toggle checked={form.quranStudy} onChange={() => handleToggle("quranStudy")} label="Quran Study" />
							<Toggle checked={form.salahJamaat} onChange={() => handleToggle("salahJamaat")} label="Salah in Jamaat" />
							<NumberField label="Hadits Read" name="haditsRead" value={form.haditsRead} onChange={handleNumber} />
							<NumberField label="Literature (pages)" name="literature" value={form.literature} onChange={handleNumber} />
						</div>
					</div>

					{/* Dawah & Contacts */}
					<div>
						<SectionTitle title="Dawah & Contacts" />
						<div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
							<NumberField label="Target — Dawah" name="targetContactDawah" value={form.targetContactDawah} onChange={handleNumber} />
							<NumberField label="Target — Worker" name="targetContactWorker" value={form.targetContactWorker} onChange={handleNumber} />
							<NumberField label="Target — Member" name="targetContactMember" value={form.targetContactMember} onChange={handleNumber} />
							<NumberField label="Worker Contact" name="workerContact" value={form.workerContact} onChange={handleNumber} />
							<NumberField label="Book Distribution" name="bookDistribution" value={form.bookDistribution} onChange={handleNumber} />
						</div>
					</div>

					{/* Activities */}
					<div>
						<SectionTitle title="Activities" />
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
							<Toggle checked={form.familyMeeting} onChange={() => handleToggle("familyMeeting")} label="Family Meeting" />
							<Toggle checked={form.socialWork} onChange={() => handleToggle("socialWork")} label="Social Work" />
							<Toggle checked={form.safar} onChange={() => handleToggle("safar")} label="Safar (Travel)" />
							{/* Org Work */}
							<div className="flex flex-col gap-1">
								<label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Org Work</label>
								<div className="flex items-center gap-2">
									<input
										type="number"
										min={0}
										max={23}
										value={form.orgWorkHours}
										onChange={(e) => handleNumber("orgWorkHours", Math.min(23, Math.max(0, Number(e.target.value))))}
										className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition bg-white text-center"
										placeholder="h"
									/>
									<span className="text-gray-400 font-bold text-lg">:</span>
									<input
										type="number"
										min={0}
										max={59}
										value={form.orgWorkMinutes}
										onChange={(e) => handleNumber("orgWorkMinutes", Math.min(59, Math.max(0, Number(e.target.value))))}
										className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition bg-white text-center"
										placeholder="mm"
									/>
								</div>
							</div>
						</div>
					</div>

					{/* Self Assessment */}
					<div>
						<SectionTitle title="Self Assessment" />
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
							<Toggle checked={form.reportKeeping} onChange={() => handleToggle("reportKeeping")} label="Report Keeping" />
							<Toggle checked={form.selfCriticism} onChange={() => handleToggle("selfCriticism")} label="Self-Criticism" />
						</div>
					</div>
				</div>

				<div className="px-4 sm:px-6 pb-4 sm:pb-6">
					<button
						type="submit"
						disabled={submitting}
						className="w-full py-2 sm:py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm tracking-wide shadow-sm"
					>
						{submitting ? "Saving…" : "Save Report"}
					</button>
				</div>
			</form>
		</div>
	);
}
