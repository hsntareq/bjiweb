"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Locale = "en" | "bn";

type LocaleContextType = {
	locale: Locale;
	setLocale: (l: Locale) => void;
};

const LocaleContext = createContext<LocaleContextType>({
	locale: "en",
	setLocale: () => { },
});

export function LocaleProvider({ children }: { children: React.ReactNode }) {
	const [locale, setLocale] = useState<Locale>("en");
	const [isInitialized, setIsInitialized] = useState(false);

	useEffect(() => {
		try {
			const stored = sessionStorage.getItem("locale");
			if (stored === "bn" || stored === "en") {
				setLocale(stored as Locale);
				setIsInitialized(true);
				return;
			}
		} catch (e) {
			// ignore
		}
		// default from browser
		const nav = typeof navigator !== "undefined" ? navigator.language?.slice(0, 2) : "en";
		setLocale(nav === "bn" ? "bn" : "en");
		setIsInitialized(true);
	}, []);

	useEffect(() => {
		if (!isInitialized) return;
		try {
			sessionStorage.setItem("locale", locale);
		} catch (e) {
			// ignore
		}
	}, [locale, isInitialized]);

	return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
	return useContext(LocaleContext);
}
