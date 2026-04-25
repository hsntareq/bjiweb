"use client";
import { Grid3x3, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const MODULES = [
	{
		id: "dashboard",
		name: "Dashboard",
		description: "Overview & Management",
		href: "/dashboard",
		icon: "📊",
		color: "from-indigo-500 to-violet-600",
	},
	{
		id: "personal-report",
		name: "Personal Report",
		description: "Daily Reports & Planning",
		href: "/personal-report",
		icon: "📝",
		color: "from-violet-500 to-purple-600",
	},
	{
		id: "organization-report",
		name: "Organization Report",
		description: "Team & Organization Stats",
		href: "/organization-report",
		icon: "🏢",
		color: "from-purple-500 to-pink-600",
	},
	{
		id: "organization-management",
		name: "Organization Management",
		description: "Hierarchy & Structure",
		href: "/organization",
		icon: "🗂️",
		color: "from-sky-500 to-cyan-600",
	},
	{
		id: "my-learning",
		name: "My Learning",
		description: "Educational Resources",
		href: "/my-learning",
		icon: "📚",
		color: "from-amber-500 to-orange-600",
	},
	{
		id: "settings",
		name: "Settings",
		description: "Configuration & Preferences",
		href: "/settings",
		icon: "⚙️",
		color: "from-emerald-500 to-teal-600",
	},
];

export default function ModuleSwitcher() {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const pathname = usePathname();

	const currentModule = MODULES.find(m => pathname.startsWith(m.href));

	// Close dropdown when clicking outside
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		}

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen]);

	return (
		<div className="relative" ref={dropdownRef}>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-gray-900 flex items-center justify-center"
				title="Switch Module"
				aria-label="Switch Module"
			>
				<Grid3x3 className="w-4 h-4" />
			</button>

			{/* Dropdown Menu */}
			{isOpen && (
				<div className="absolute right-0 top-full mt-3 w-72 bg-white border border-gray-100 shadow-xl rounded-2xl z-[999] overflow-hidden animate-in fade-in zoom-in duration-200">
					{/* Module Grid */}
					<div className="max-h-[70vh] overflow-y-auto">
						<div className="grid grid-cols-2">
							{MODULES.map((module, index) => {
								const isActive = currentModule?.id === module.id;
								return (
									<Link
										key={module.id}
										href={module.href}
										onClick={() => setIsOpen(false)}
										className={`flex flex-col items-center p-5 transition-all border-b border-r border-gray-100 ${isActive
											? "bg-indigo-50/50"
											: "bg-white hover:bg-gray-50"
											} ${index % 2 === 1 ? "border-r-0" : ""}`}
									>
										<span className="text-2xl mb-2">{module.icon}</span>
										<p className={`text-xs font-bold text-center line-clamp-1 ${isActive ? "text-indigo-900" : "text-gray-700"}`}>
											{module.name}
										</p>
										{isActive && (
											<div className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-600" />
										)}
									</Link>
								);
							})}
						</div>
					</div>

					{/* Sign Out Action */}
					<div className="bg-gray-50/50">
						<button
							onClick={() => signOut({ callbackUrl: "/login" })}
							className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 hover:text-red-700 transition-all"
						>
							<LogOut className="w-4 h-4" />
							Sign Out
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
