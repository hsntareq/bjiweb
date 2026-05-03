import { BarChart2, Globe, Package, Users } from "lucide-react";
import type { Session } from "next-auth";
import Link from "next/link";
import LanguageToggle from "./LanguageToggle";
import ModuleSwitcher from "./ModuleSwitcher";

interface AppHeaderProps {
	session: Session | null;
}

export default function AppHeader({ session }: AppHeaderProps) {
	const userInitial = (session?.user?.email || session?.user?.name || "U")[0].toUpperCase();
	const userDisplay = session?.user?.email || session?.user?.name || "";

	return (
		<header className="bg-white border-b border-gray-100 sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
				<Link href="/organization" className="flex items-center gap-3">
					<div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center shadow-md shadow-indigo-400/20 shrink-0">
						<Package className="w-4 h-4 text-white" />
					</div>
					<span className="font-bold text-gray-900 text-lg">BJI OMS</span>
				</Link>
				<div className="flex items-center gap-4">
					<Link
						href="/organization"
						className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-full transition-colors text-sm font-medium text-gray-700"
					>
						<Package className="w-4 h-4 shrink-0" />
						<span className="hidden sm:inline">Organizations</span>
					</Link>
					<Link
						href="/global-organizations"
						className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-full transition-colors text-sm font-medium text-gray-700"
					>
						<Globe className="w-4 h-4 shrink-0" />
						<span className="hidden sm:inline">Global Orgs</span>
					</Link>
					<Link
						href="/users"
						className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-full transition-colors text-sm font-medium text-gray-700"
					>
						<Users className="w-4 h-4 shrink-0" />
						<span className="hidden sm:inline">Users</span>
					</Link>
					<Link
						href="/planning-reporting"
						className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-full transition-colors text-sm font-medium text-gray-700"
					>
						<BarChart2 className="w-4 h-4 shrink-0" />
						<span className="hidden sm:inline">Planning & Reporting</span>
					</Link>
					<LanguageToggle />
					{session && (
						<div className="hidden sm:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5">
							<div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold">
								{userInitial}
							</div>
							<span className="text-sm text-gray-600 font-medium">{userDisplay}</span>
						</div>
					)}
					<ModuleSwitcher />
				</div>
			</div>
		</header>
	);
}
