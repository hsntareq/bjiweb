"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { LocaleProvider } from "../lib/locale";

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<SessionProvider>
			<LocaleProvider>
				{children}
				<Toaster position="bottom-right" />
			</LocaleProvider>
		</SessionProvider>
	);
}
