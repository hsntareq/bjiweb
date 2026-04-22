"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocale } from "../../lib/locale";
import { getAuthToken, isTokenExpired } from "../../lib/getAuthToken";
import PersonalReportForm from "./personal-report-form";

const WRAPPER_TEXT = {
	en: {
		saved: "Report saved successfully!",
		saveFailed: "Failed to save report",
		timerStarted: "Timer started!",
		timerStartFailed: "Failed to start timer",
		timerPaused: "Timer paused!",
		timerPauseFailed: "Failed to pause timer",
	},
	bn: {
		saved: "রিপোর্ট সফলভাবে সেভ হয়েছে!",
		saveFailed: "রিপোর্ট সেভ করতে ব্যর্থ হয়েছে",
		timerStarted: "টাইমার শুরু হয়েছে!",
		timerStartFailed: "টাইমার শুরু করতে ব্যর্থ হয়েছে",
		timerPaused: "টাইমার পজ করা হয়েছে!",
		timerPauseFailed: "টাইমার পজ করতে ব্যর্থ হয়েছে",
	}
};

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
	const [timerSubmitting, setTimerSubmitting] = useState(false);
	const [date, setDate] = useState(todayStr);
	const [isDateInitialized, setIsDateInitialized] = useState(false);
	const [defaultData, setDefaultData] = useState<any | null | undefined>(undefined);
	const [fallbackToken, setFallbackToken] = useState<string | null>(null);
	const { data: session, status } = useSession();
	const { locale } = useLocale();
	const t = WRAPPER_TEXT[locale];

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
		let token = fallbackToken || ((session as any)?.accessToken as string | undefined) || null;
		
		if (session && (!token || isTokenExpired(token))) {
			const refreshedToken = await refreshBackendToken();
			if (refreshedToken) {
				return refreshedToken;
			}
		}

		return token;
	}, [fallbackToken, session, refreshBackendToken]);

	useEffect(() => {
		try {
			const stored = sessionStorage.getItem("dashboard_date");
			if (stored) {
				setDate(stored);
			}
		} catch (e) {
			// ignore
		}
		setIsDateInitialized(true);
	}, []);

	useEffect(() => {
		if (!isDateInitialized || status === "loading") return;

		async function fetchReport() {
			const token = await getAuthToken();
			if (!token) {
				setDefaultData(null);
				return;
			}
			try {
				setDefaultData(undefined);
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [date, isDateInitialized, status]);

	async function authorizedPost(url: string, data: any) {
		let token = await getAuthToken();
		if (!token) {
			throw new Error("You must be logged in to submit a report.");
		}

		try {
			return await axios.post(url, data, {
				headers: { Authorization: `Bearer ${token}` },
			});
		} catch (err: any) {
			if (err?.response?.status === 401) {
				const refreshedToken = await refreshBackendToken();
				if (refreshedToken) {
					return axios.post(url, data, {
						headers: { Authorization: `Bearer ${refreshedToken}` },
					});
				}
			}
			throw err;
		}
	}

	async function handleSubmit(data: any) {
		setSubmitting(true);
		try {
			const res = await authorizedPost(`${API_URL}/personal-report`, data);
			setDefaultData(res.data || null);
			toast.success(t.saved);
		} catch (err: any) {
			console.error("Failed to submit report", err);
			toast.error(t.saveFailed);
		} finally {
			setSubmitting(false);
		}
	}

	async function handleTimerStart(targetDate: string) {
		setTimerSubmitting(true);
		try {
			const res = await authorizedPost(`${API_URL}/personal-report/timer/start`, { date: targetDate });
			setDefaultData(res.data || null);
			toast.success(t.timerStarted);
		} catch (err) {
			console.error("Failed to start org work timer", err);
			toast.error(t.timerStartFailed);
		} finally {
			setTimerSubmitting(false);
		}
	}

	async function handleTimerPause(targetDate: string) {
		setTimerSubmitting(true);
		try {
			const res = await authorizedPost(`${API_URL}/personal-report/timer/pause`, { date: targetDate });
			setDefaultData(res.data || null);
			toast.success(t.timerPaused);
		} catch (err) {
			console.error("Failed to pause org work timer", err);
			toast.error(t.timerPauseFailed);
		} finally {
			setTimerSubmitting(false);
		}
	}

	function handleDateChange(newDate: string) {
		setDate(newDate);
		setDefaultData(undefined);
		try {
			sessionStorage.setItem("dashboard_date", newDate);
		} catch (e) {
			// ignore
		}
	}

	return (
		<PersonalReportForm
			date={date}
			onDateChange={handleDateChange}
			onSubmit={handleSubmit}
			onTimerStart={handleTimerStart}
			onTimerPause={handleTimerPause}
			submitting={submitting}
			timerSubmitting={timerSubmitting}
			defaultData={defaultData}
		/>
	);
}
