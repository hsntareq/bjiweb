import { ChevronRight, Clock, Package, ShoppingCart, TrendingUp } from "lucide-react";
import { getSessionAndAuthUser } from "@/lib/getAuthUser";
import { redirect } from "next/navigation";
import AppHeader from "@/components/AppHeader";

const stats = [
	{ label: "Total Orders", value: "—", icon: ShoppingCart, color: "from-indigo-500 to-violet-600" },
	{ label: "Revenue", value: "—", icon: TrendingUp, color: "from-violet-500 to-purple-600" },
	{ label: "Pending", value: "—", icon: Clock, color: "from-amber-500 to-orange-600" },
	{ label: "Fulfilled", value: "—", icon: Package, color: "from-emerald-500 to-teal-600" },
];

export default async function DashboardPage() {
	const { session, authUser } = await getSessionAndAuthUser();
	if (!session) {
		redirect("/login");
	}
	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<AppHeader session={session} hasOrgAccess={authUser?.hasOrgAccess ?? false} />

			{/* Content */}
			<main className="max-w-6xl mx-auto px-6 py-10">
				{/* Welcome */}
				<div className="mb-8">
					<h1 className="text-2xl font-extrabold text-gray-900">
						Good day, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">{session.user?.name || (session.user?.email ?? "").split("@")[0]}</span> 👋
					</h1>
					<p className="text-gray-400 text-sm mt-1">Here&apos;s what&apos;s happening in your store today.</p>
				</div>

				{/* Stats */}
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
					{stats.map((s) => (
						<div key={s.label} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
							<div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3 shadow-md`}>
								<s.icon className="w-5 h-5 text-white" />
							</div>
							<p className="text-2xl font-extrabold text-gray-900">{s.value}</p>
							<p className="text-xs text-gray-400 mt-0.5 font-medium">{s.label}</p>
						</div>
					))}
				</div>

				{/* Personal Report - moved to separate page */}
				<div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm mb-6">
					<h2 className="text-sm font-bold text-gray-900 mb-2">Personal Reports</h2>
					<p className="text-sm text-gray-500 mb-4">Daily reports, planning, status and targets — open the personal reports page to manage them.</p>
					<a href="/personal-report" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:opacity-95">Open Personal Reports</a>
				</div>

				{/* Quick actions */}
				<div className="grid md:grid-cols-2 gap-4">
					<div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
						<h2 className="text-sm font-bold text-gray-900 mb-4">Quick Actions</h2>
						<div className="space-y-2">
							{["New Order", "View Inventory", "Reports", "Settings"].map((action) => (
								<button key={action} className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all group">
									<span className="text-sm text-gray-700 font-medium">{action}</span>
									<ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-500 transition-colors" />
								</button>
							))}
						</div>
					</div>
					<div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-6 shadow-lg shadow-indigo-500/20 flex flex-col justify-between">
						<div>
							<Package className="w-8 h-8 text-white/80 mb-3" />
							<h3 className="text-white font-extrabold text-lg leading-tight">Start managing<br />your orders</h3>
							<p className="text-indigo-200/70 text-sm mt-2">Your order management dashboard is ready. Connect your data to get started.</p>
						</div>
						<button className="mt-6 w-full py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white text-sm font-semibold transition-all flex items-center justify-center gap-2">
							Get Started <ChevronRight className="w-4 h-4" />
						</button>
					</div>
				</div>
			</main>
		</div>
	);
}
