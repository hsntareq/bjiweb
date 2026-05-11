"use client";
import axios from "axios";
import { SessionProvider, signOut } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { LocaleProvider } from "../lib/locale";
import { useEffect } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
	useEffect(() => {
		// 1. Handle Axios globally
		const interceptor = axios.interceptors.response.use(
			(response) => response,
			(error) => {
				const isAuthEndpoint = error.config?.url?.includes('/auth/login') || error.config?.url?.includes('/auth/google');
				if (error.response?.status === 401 && !isAuthEndpoint) {
					console.error("Axios 401 Unauthorized! Logging out...");
					signOut({ callbackUrl: "/login" });
				}
				return Promise.reject(error);
			}
		);

		// 2. Handle Fetch globally
		const originalFetch = window.fetch;
		window.fetch = async (...args) => {
			const response = await originalFetch(...args);
			const url = typeof args[0] === 'string' ? args[0] : (args[0] as Request).url;
			const isAuthEndpoint = url.includes('/auth/login') || url.includes('/auth/google');
			
			if (response.status === 401 && !isAuthEndpoint) {
				console.error("Fetch 401 Unauthorized! Logging out...");
				signOut({ callbackUrl: "/login" });
			}
			return response;
		};

		return () => {
			axios.interceptors.response.eject(interceptor);
			window.fetch = originalFetch;
		};
	}, []);

	return (
		<SessionProvider>
			<LocaleProvider>
				{children}
				<Toaster position="bottom-right" />
			</LocaleProvider>
		</SessionProvider>
	);
}
