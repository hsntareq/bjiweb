import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LanguageToggle from "../../components/LanguageToggle";
import { authOptions } from "@/lib/auth-options";
import SignOutButton from "../dashboard/sign-out-button";
import PersonalReportTabs from "./PersonalReportTabs";

export default async function PersonalReportPage() {
	const session = await getServerSession(authOptions);
	if (!session) redirect("/login");

	return (
		<div className="min-h-screen bg-gray-50">
			<header className="bg-white border-b border-gray-100 sticky top-0 z-10">
				<div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md shadow-indigo-500/20">
							<span className="text-white font-bold">PR</span>
						</div>
						<span className="font-bold text-gray-900 text-lg">Personal Reports</span>
					</div>
					<div className="flex items-center gap-4">
						<LanguageToggle />
						<div className="hidden sm:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5">
							<div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold">
								{(session.user?.email || session.user?.name || "U")[0].toUpperCase()}
							</div>
							<span className="text-sm text-gray-600 font-medium">{session.user?.email || session.user?.name}</span>
						</div>
						<SignOutButton />
					</div>
				</div>
			</header>

			<main className="max-w-6xl mx-auto px-6 py-10">
				<PersonalReportTabs />
			</main>
		</div>
	);
}
