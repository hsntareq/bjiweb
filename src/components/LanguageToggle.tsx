"use client";

import { useLocale } from "../lib/locale";

export default function LanguageToggle() {
	const { locale, setLocale } = useLocale();

	return (
		<div className="flex items-center">
			<label className="sr-only">Language</label>
			<select
				value={locale}
				onChange={(e) => setLocale(e.target.value as "en" | "bn")}
				className="border border-gray-200 rounded px-2 py-1 text-sm bg-white"
				aria-label="Select language"
			>
				<option value="en">EN</option>
				<option value="bn">বাংলা</option>
			</select>
		</div>
	);
}
