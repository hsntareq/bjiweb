"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import PersonalReportForm from "./personal-report-form";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

function todayStr() {
	return new Date().toISOString().split("T")[0];
}

export default function PersonalReportFormWrapper() {
	const [submitting, setSubmitting] = useState(false);
	const [date, setDate] = useState(todayStr);
	const [defaultData, setDefaultData] = useState<any | null>(null);
	const { data: session } = useSession();

	useEffect(() => {
		async function fetchReport() {
			const token = session?.accessToken;
			if (!token) return;
			try {
				const res = await axios.get(`${API_URL}/personal-report?date=${date}`, {
					headers: { Authorization: `Bearer ${token}` },
				});
				setDefaultData(res.data || null);
			} catch (err) {
				setDefaultData(null);
			}
		}
		fetchReport();
	}, [date, session]);

	async function handleSubmit(data: any) {
		setSubmitting(true);
		try {
			const token = session?.accessToken;
			if (!token) {
				throw new Error("You must be logged in to submit a report.");
			}
			await axios.post(
				`${API_URL}/personal-report`,
				data,
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			// Optionally show a success message
			// toast.success("Report submitted successfully");
		} catch (err) {
			// Optionally show an error message
			// toast.error("Failed to submit report");
			console.error("Failed to submit report", err);
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<PersonalReportForm
			date={date}
			onDateChange={setDate}
			onSubmit={handleSubmit}
			submitting={submitting}
			defaultData={defaultData}
		/>
	);
}
