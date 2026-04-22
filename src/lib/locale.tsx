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

	useEffect(() => {
		try {
			const stored = localStorage.getItem("locale");
			if (stored === "bn" || stored === "en") {
				setLocale(stored as Locale);
				return;
			}
		} catch (e) {
			// ignore
		}
		// default from browser
		const nav = typeof navigator !== "undefined" ? navigator.language?.slice(0, 2) : "en";
		setLocale(nav === "bn" ? "bn" : "en");
	}, []);

	useEffect(() => {
		try {
			localStorage.setItem("locale", locale);
		} catch (e) {
			// ignore
		}
	}, [locale]);

	return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
	return useContext(LocaleContext);
}
