"use client";
import { Grid3x3 } from "lucide-react";
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
				<div className="fixed inset-x-0 top-16 mx-auto bg-white border-b border-gray-100 shadow-lg z-[999] overflow-hidden">
					{/* Header */}
					<div className="max-w-6xl mx-auto px-4 py-2.5 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-violet-50">
						<p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">Modules</p>
					</div>

					{/* Module Grid */}
					<div className="max-w-6xl mx-auto px-6 py-3 max-h-72 overflow-y-auto">
						<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
							{MODULES.map((module) => {
								const isActive = currentModule?.id === module.id;
								return (
									<Link
										key={module.id}
										href={module.href}
										onClick={() => setIsOpen(false)}
										className={`flex flex-col items-center p-3 rounded-lg transition-all border-2 ${isActive
											? "bg-indigo-50 border-indigo-400 shadow-sm"
											: "bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm"
											}`}
									>
										<span className="text-xl mb-1.5">{module.icon}</span>
										<p className={`text-xs font-semibold text-center line-clamp-1 ${isActive ? "text-indigo-900" : "text-gray-900"}`}>
											{module.name}
										</p>
										{isActive && (
											<div className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-600" />
										)}
									</Link>
								);
							})}
						</div>
					</div>

					{/* Footer */}
					<div className="max-w-6xl mx-auto px-6 py-2 border-t border-gray-100 bg-gray-50">
						<p className="text-xs text-gray-500 text-center">
							Quick access
						</p>
					</div>
				</div>
			)}
		</div>
	);
}
