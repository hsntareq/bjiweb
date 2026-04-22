"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import PersonalReportForm from "./personal-report-form";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

function todayStr() {
	const d = new Date();
	const yyyy = d.getFullYear();
	const mm = String(d.getMonth() + 1).padStart(2, "0");
	const dd = String(d.getDate()).padStart(2, "0");
	return `${yyyy}-${mm}-${dd}`;
}

export default function PersonalReportFormWrapper() {
	const [submitting, setSubmitting] = useState(false);
	const [date, setDate] = useState(todayStr);
	const [defaultData, setDefaultData] = useState<any | null>(null);
	const [fallbackToken, setFallbackToken] = useState<string | null>(null);
	const { data: session } = useSession();

	const refreshBackendToken = useCallback(async (): Promise<string | null> => {
		const provider = (session as any)?.provider;
		const googleId = (session as any)?.googleId;
		const email = session?.user?.email;
		if (provider !== "google" || !googleId || !email) return null;

		try {
			const res = await axios.post(`${API_URL}/auth/google`, { googleId, email });
			const nextToken = res?.data?.access_token as string | undefined;
			if (!nextToken) return null;
			setFallbackToken(nextToken);
			return nextToken;
		} catch {
			return null;
		}
	}, [session]);

	const getAuthToken = useCallback(async (): Promise<string | null> => {
		return fallbackToken || ((session as any)?.accessToken as string | undefined) || null;
	}, [fallbackToken, session]);

	useEffect(() => {
		async function fetchReport() {
			const token = await getAuthToken();
			if (!token) return;
			try {
				const res = await axios.get(`${API_URL}/personal-report?date=${date}`, {
					headers: { Authorization: `Bearer ${token}` },
				});
				setDefaultData(res.data || null);
			} catch (err: any) {
				if (err?.response?.status === 401) {
					const refreshedToken = await refreshBackendToken();
					if (refreshedToken) {
						try {
							const retryRes = await axios.get(`${API_URL}/personal-report?date=${date}`, {
								headers: { Authorization: `Bearer ${refreshedToken}` },
							});
							setDefaultData(retryRes.data || null);
							return;
						} catch {
							setDefaultData(null);
							return;
						}
					}
				}
				setDefaultData(null);
			}
		}
		fetchReport();
	}, [date, getAuthToken, refreshBackendToken]);

	async function handleSubmit(data: any) {
		setSubmitting(true);
		try {
			let token = await getAuthToken();
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
		} catch (err: any) {
			if (err?.response?.status === 401) {
				const refreshedToken = await refreshBackendToken();
				if (refreshedToken) {
					try {
						await axios.post(
							`${API_URL}/personal-report`,
							data,
							{ headers: { Authorization: `Bearer ${refreshedToken}` } }
						);
						return;
					} catch (retryErr) {
						console.error("Failed to submit report after token refresh", retryErr);
					}
				}
			}
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
