import { getSessionAndAuthUser } from "@/lib/getAuthUser";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import AppHeader from "@/components/AppHeader";
import PersonalReportTabs from "./PersonalReportTabs";

export default async function PersonalReportPage() {
	const { session, authUser } = await getSessionAndAuthUser();
	if (!session) redirect("/login");

	return (
		<div className="min-h-screen bg-gray-50">
			<AppHeader session={session} hasOrgAccess={authUser?.hasOrgAccess ?? false} />

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
