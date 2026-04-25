import { authOptions } from "@/lib/auth-options";
import { Package } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import LanguageToggle from "../../components/LanguageToggle";
import ModuleSwitcher from "../../components/ModuleSwitcher";
import PersonalReportTabs from "./PersonalReportTabs";

export default async function PersonalReportPage() {
	const session = await getServerSession(authOptions);
	if (!session) redirect("/login");

	return (
		<div className="min-h-screen bg-gray-50">
			<header className="bg-white border-b border-gray-100 sticky top-0 z-50">
				<div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md shadow-indigo-500/20">
							<Package className="w-4 h-4 text-white" />
						</div>
						<span className="font-bold text-gray-900 text-lg">BJI OMS</span>
					</div>
					<div className="flex items-center gap-4">
						<LanguageToggle />
						<div className="hidden sm:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5">
							<div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold">
								{(session.user?.email || session.user?.name || "U")[0].toUpperCase()}
							</div>
							<span className="text-sm text-gray-600 font-medium">{session.user?.email || session.user?.name}</span>
						</div>
						<ModuleSwitcher />
					</div>
				</div>
			</header>

			<main className="max-w-6xl mx-auto px-0 sm:px-6 py-10">
				<div className="mb-8 px-6 sm:px-0">
					<h1 className="text-2xl font-extrabold text-gray-900">
						Personal <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Reports</span> 📝
					</h1>
					<p className="text-gray-400 text-sm mt-1">Manage your daily reports, planning, and status tracking.</p>
				</div>
				<Suspense fallback={<div className="flex justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div></div>}>
					<PersonalReportTabs />
				</Suspense>
			</main>
		</div>
	);
}
