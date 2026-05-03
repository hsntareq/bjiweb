"use client";

import { BarChart2, Globe, Menu, Package, Users, X } from "lucide-react";
import type { Session } from "next-auth";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import LanguageToggle from "./LanguageToggle";
import ModuleSwitcher from "./ModuleSwitcher";

interface AppHeaderProps {
	session: Session | null;
}

const navLinks = [
	{ href: "/organization", icon: Package, label: "Organizations" },
	{ href: "/global-organizations", icon: Globe, label: "Global Orgs" },
	{ href: "/users", icon: Users, label: "Users" },
	{ href: "/planning-reporting", icon: BarChart2, label: "Planning & Reporting" },
];

export default function AppHeader({ session }: AppHeaderProps) {
	const userInitial = (session?.user?.email || session?.user?.name || "U")[0].toUpperCase();
	const userDisplay = session?.user?.email || session?.user?.name || "";
	const [menuOpen, setMenuOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
				setMenuOpen(false);
			}
		}
		if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [menuOpen]);

	return (
		<header className="bg-white border-b border-gray-100 sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
				{/* Logo */}
				<Link href="/organization" className="flex items-center gap-3 shrink-0">
					<div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center shadow-md shadow-indigo-400/20 shrink-0">
						<Package className="w-4 h-4 text-white" />
					</div>
					<span className="font-bold text-gray-900 text-lg">BJI OMS</span>
				</Link>

				{/* Desktop nav */}
				<div className="hidden md:flex items-center gap-3">
					{navLinks.map(({ href, icon: Icon, label }) => (
						<Link
							key={href}
							href={href}
							className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-full transition-colors text-sm font-medium text-gray-700"
						>
							<Icon className="w-4 h-4 shrink-0" />
							<span>{label}</span>
						</Link>
					))}
				</div>

				{/* Right side */}
				<div className="flex items-center gap-2 sm:gap-3">
					<LanguageToggle />
					{session && (
						<div className="hidden sm:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5">
							<div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold">
								{userInitial}
							</div>
							<span className="hidden lg:inline text-sm text-gray-600 font-medium">{userDisplay}</span>
						</div>
					)}
					<ModuleSwitcher />

					{/* Mobile menu button */}
					<div className="relative md:hidden" ref={menuRef}>
						<button
							onClick={() => setMenuOpen((v) => !v)}
							className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors text-gray-700"
							aria-label="Toggle menu"
						>
							{menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
						</button>

						{menuOpen && (
							<div className="absolute right-0 top-11 w-52 bg-white border border-gray-200 rounded-xl shadow-lg py-1.5 z-50">
								{navLinks.map(({ href, icon: Icon, label }) => (
									<Link
										key={href}
										href={href}
										onClick={() => setMenuOpen(false)}
										className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
									>
										<Icon className="w-4 h-4 shrink-0 text-indigo-500" />
										{label}
									</Link>
								))}
								{session && (
									<>
										<div className="border-t border-gray-100 my-1" />
										<div className="flex items-center gap-2 px-4 py-2.5">
											<div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
												{userInitial}
											</div>
											<span className="text-sm text-gray-600 font-medium truncate">{userDisplay}</span>
										</div>
									</>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</header>
	);
}
