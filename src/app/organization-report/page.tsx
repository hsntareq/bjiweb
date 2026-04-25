import { authOptions } from "@/lib/auth-options";
import { BarChart3, Package, Target, TrendingUp, Users } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LanguageToggle from "../../components/LanguageToggle";
import ModuleSwitcher from "../../components/ModuleSwitcher";

const stats = [
	{ label: "Total Members", value: "—", icon: Users, color: "from-indigo-500 to-violet-600" },
	{ label: "Team Performance", value: "—", icon: TrendingUp, color: "from-violet-500 to-purple-600" },
	{ label: "Active Projects", value: "—", icon: BarChart3, color: "from-amber-500 to-orange-600" },
	{ label: "Goals Achieved", value: "—", icon: Target, color: "from-emerald-500 to-teal-600" },
];

export default async function OrganizationReportPage() {
	const session = await getServerSession(authOptions);
	if (!session) {
		redirect("/login");
	}

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
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
							<div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white text-xs font-bold">
								{(session.user?.email || session.user?.name || "U")[0].toUpperCase()}
							</div>
							<span className="text-sm text-gray-600 font-medium">{session.user?.email || session.user?.name}</span>
						</div>
						<ModuleSwitcher />
					</div>
				</div>
			</header>

			{/* Content */}
			<main className="max-w-6xl mx-auto px-6 py-10">
				{/* Welcome */}
				<div className="mb-8">
					<h1 className="text-2xl font-extrabold text-gray-900">
						Organization <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Reports</span> 📊
					</h1>
					<p className="text-gray-400 text-sm mt-1">Track team performance, member progress, and organizational metrics.</p>
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

				{/* Team Overview */}
				<div className="grid md:grid-cols-2 gap-6 mb-6">
					<div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
						<h2 className="text-sm font-bold text-gray-900 mb-4">Team Members Overview</h2>
						<div className="space-y-3">
							<div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
								<div>
									<p className="text-sm font-semibold text-gray-900">Active Members</p>
									<p className="text-xs text-gray-500 mt-0.5">Last 30 days</p>
								</div>
								<span className="text-lg font-bold text-indigo-600">—</span>
							</div>
							<div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
								<div>
									<p className="text-sm font-semibold text-gray-900">New Joiners</p>
									<p className="text-xs text-gray-500 mt-0.5">This month</p>
								</div>
								<span className="text-lg font-bold text-emerald-600">—</span>
							</div>
							<div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
								<div>
									<p className="text-sm font-semibold text-gray-900">Team Engagement</p>
									<p className="text-xs text-gray-500 mt-0.5">Overall score</p>
								</div>
								<span className="text-lg font-bold text-orange-600">—%</span>
							</div>
						</div>
					</div>

					<div className="bg-gradient-to-br from-purple-600 to-pink-700 rounded-2xl p-6 shadow-lg shadow-purple-500/20 flex flex-col justify-between">
						<div>
							<Users className="w-8 h-8 text-white/80 mb-3" />
							<h3 className="text-white font-extrabold text-lg leading-tight">Team Performance<br />Analytics</h3>
							<p className="text-purple-200/70 text-sm mt-2">Get comprehensive insights into your team's progress and achievements.</p>
						</div>
						<button className="mt-6 w-full py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white text-sm font-semibold transition-all">
							View Analytics
						</button>
					</div>
				</div>

				{/* Reports Grid */}
				<div className="grid md:grid-cols-3 gap-4">
					<div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
						<div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center mb-3">
							<TrendingUp className="w-5 h-5 text-indigo-600" />
						</div>
						<h3 className="text-sm font-bold text-gray-900 mb-1">Performance Report</h3>
						<p className="text-xs text-gray-500 mb-4">Team performance metrics and KPIs</p>
						<button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">View Report →</button>
					</div>

					<div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
						<div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center mb-3">
							<Target className="w-5 h-5 text-emerald-600" />
						</div>
						<h3 className="text-sm font-bold text-gray-900 mb-1">Goals Report</h3>
						<p className="text-xs text-gray-500 mb-4">Organizational goals and progress</p>
						<button className="text-xs font-semibold text-emerald-600 hover:text-emerald-700">View Report →</button>
					</div>

					<div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
						<div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center mb-3">
							<Package className="w-5 h-5 text-orange-600" />
						</div>
						<h3 className="text-sm font-bold text-gray-900 mb-1">Projects Report</h3>
						<p className="text-xs text-gray-500 mb-4">Active projects and deliverables</p>
						<button className="text-xs font-semibold text-orange-600 hover:text-orange-700">View Report →</button>
					</div>
				</div>
			</main>
		</div>
	);
}
