"use client";
import { useState } from "react";
import PersonalReportForm from "./personal-report-form";

function todayStr() {
	return new Date().toISOString().split("T")[0];
}

export default function PersonalReportFormWrapper() {
	const [submitting, setSubmitting] = useState(false);
	const [date, setDate] = useState(todayStr);

	async function handleSubmit(data: any) {
		setSubmitting(true);
		// TODO: Connect to backend API
		console.log("Report submitted:", data);
		setSubmitting(false);
	}

	return (
		<PersonalReportForm
			date={date}
			onDateChange={setDate}
			onSubmit={handleSubmit}
			submitting={submitting}
		/>
	);
}
