import type { Metadata } from "next";
import { Inter, Tiro_Bangla } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
	weight: ["400", "500", "600", "700", "800"],
});

const tiroBangla = Tiro_Bangla({
	subsets: ["bengali"],
	variable: "--font-tiro-bangla",
	display: "swap",
	weight: ["400"],
});

export const metadata: Metadata = {
	title: "BJI OMS",
	description: "BJI Order Management System",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${inter.variable} ${tiroBangla.variable} h-full antialiased`}
		>
			<body className="min-h-full flex flex-col">
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
