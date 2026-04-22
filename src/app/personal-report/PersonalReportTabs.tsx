"use client";
import { useState } from "react";
import PersonalReportFormWrapper from "../dashboard/personal-report-form-wrapper";

export default function PersonalReportTabs() {
	const tabs = ["Daily Report", "Planning", "Status", "Targets"];
	const [active, setActive] = useState(0);

	return (
		<div className="max-w-4xl mx-auto my-8">
			<div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
				<div className="flex gap-2 mb-4">
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

				<div className="mt-2">
					{active === 0 && <PersonalReportFormWrapper />}

					{active === 1 && (
						<div className="p-4 text-sm text-gray-600">Planning tab — add planning UI here.</div>
					)}

					{active === 2 && (
						<div className="p-4 text-sm text-gray-600">Status tab — show aggregated status and metrics here.</div>
					)}

					{active === 3 && (
						<div className="p-4 text-sm text-gray-600">Targets tab — manage targets and goals here.</div>
					)}
				</div>
			</div>
		</div>
	);
}
