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

export default function MonthlyPlanFormWrapper({ 
	month, 
	planData, 
	onRefresh 
}: { 
	month: string; 
	planData?: any; 
	onRefresh?: () => void 
}) {
	const [submitting, setSubmitting] = useState(false);
	const [fallbackToken, setFallbackToken] = useState<string | null>(null);
	const { data: session } = useSession();
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
			if (refreshedToken) return refreshedToken;
		}
		return token;
	}, [fallbackToken, session, refreshBackendToken]);

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
			onRefresh?.();
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
			defaultData={planData}
		/>
	);
}
