"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocale } from "../../lib/locale";
import { isTokenExpired } from "../../lib/getAuthToken";
import MonthlyPlanForm, { MonthlyPlanData, emptyMonthlyPlan } from "./monthly-plan-form";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const WRAPPER_TEXT = {
	en: {
		saved: "Plan saved successfully!",
		saveFailed: "Failed to save plan",
	},
	bn: {
		saved: "পরিকল্পনা সফলভাবে সেভ হয়েছে!",
		saveFailed: "পরিকল্পনা সেভ করতে ব্যর্থ হয়েছে",
	}
};

export default function MonthlyPlanFormWrapper({ month }: { month: string }) {
	const [submitting, setSubmitting] = useState(false);
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
		if (status === "loading") return;

		async function fetchReport() {
			const token = await getAuthToken();
			if (!token) {
				setDefaultData(null);
				return;
			}
			try {
				setDefaultData(undefined);
				const res = await axios.get(`${API_URL}/monthly-plan?month=${month}`, {
					headers: { Authorization: `Bearer ${token}` },
				});
				const data = res.data;
				if (data) {
					data.increaseAssociate = Array.isArray(data.increaseAssociate) ? data.increaseAssociate : [];
					data.increaseActivist = Array.isArray(data.increaseActivist) ? data.increaseActivist : [];
					data.increaseMember = Array.isArray(data.increaseMember) ? data.increaseMember : [];
					data.memorizingSura = Array.isArray(data.memorizingSura) ? data.memorizingSura : [];
					data.memorizingAyat = Array.isArray(data.memorizingAyat) ? data.memorizingAyat : [];
					data.memorizingHadits = Array.isArray(data.memorizingHadits) ? data.memorizingHadits : [];
				}
				setDefaultData(data || null);
			} catch (err: any) {
				if (err?.response?.status === 401) {
					const refreshedToken = await refreshBackendToken();
					if (refreshedToken) {
						try {
							const retryRes = await axios.get(`${API_URL}/monthly-plan?month=${month}`, {
								headers: { Authorization: `Bearer ${refreshedToken}` },
							});
							const data = retryRes.data;
							if (data) {
								data.increaseAssociate = Array.isArray(data.increaseAssociate) ? data.increaseAssociate : [];
								data.increaseActivist = Array.isArray(data.increaseActivist) ? data.increaseActivist : [];
								data.increaseMember = Array.isArray(data.increaseMember) ? data.increaseMember : [];
								data.memorizingSura = Array.isArray(data.memorizingSura) ? data.memorizingSura : [];
								data.memorizingAyat = Array.isArray(data.memorizingAyat) ? data.memorizingAyat : [];
								data.memorizingHadits = Array.isArray(data.memorizingHadits) ? data.memorizingHadits : [];
							}
							setDefaultData(data || null);
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
	}, [month, status]);

	async function authorizedPost(url: string, data: any) {
		let token = await getAuthToken();
		if (!token) throw new Error("Not authenticated");

		try {
			return await axios.post(url, data, {
				headers: { Authorization: `Bearer ${token}` },
			});
		} catch (err: any) {
			if (err?.response?.status === 401) {
				const refreshedToken = await refreshBackendToken();
				if (refreshedToken) {
					return await axios.post(url, data, {
						headers: { Authorization: `Bearer ${refreshedToken}` },
					});
				}
			}
			throw err;
		}
	}

	async function handleSubmit(data: MonthlyPlanData & { month: string }) {
		if (!session) return;
		setSubmitting(true);
		try {
			await authorizedPost(`${API_URL}/monthly-plan`, data);
			toast.success(t.saved);
			const token = await getAuthToken();
			if (token) {
				const res = await axios.get(`${API_URL}/monthly-plan?month=${month}`, {
					headers: { Authorization: `Bearer ${token}` },
				});
				const data = res.data;
				if (data) {
					data.increaseAssociate = Array.isArray(data.increaseAssociate) ? data.increaseAssociate : [];
					data.increaseActivist = Array.isArray(data.increaseActivist) ? data.increaseActivist : [];
					data.increaseMember = Array.isArray(data.increaseMember) ? data.increaseMember : [];
					data.memorizingSura = Array.isArray(data.memorizingSura) ? data.memorizingSura : [];
					data.memorizingAyat = Array.isArray(data.memorizingAyat) ? data.memorizingAyat : [];
					data.memorizingHadits = Array.isArray(data.memorizingHadits) ? data.memorizingHadits : [];
				}
				setDefaultData(data || null);
			}
		} catch (error) {
			console.error("Failed to save plan:", error);
			toast.error(t.saveFailed);
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<MonthlyPlanForm
			month={month}
			onSubmit={handleSubmit}
			submitting={submitting}
			defaultData={defaultData}
		/>
	);
}
