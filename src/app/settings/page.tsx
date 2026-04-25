import { authOptions } from "@/lib/auth-options";
import { Bell, Database, Lock, Package, Palette, User } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LanguageToggle from "../../components/LanguageToggle";
import ModuleSwitcher from "../../components/ModuleSwitcher";

const settingSections = [
	{
		title: "Profile",
		description: "Manage your personal information",
		icon: User,
		color: "from-indigo-500 to-violet-600",
		items: ["Edit Profile", "Change Avatar", "Update Email"],
	},
	{
		title: "Notifications",
		description: "Control notification preferences",
		icon: Bell,
		color: "from-violet-500 to-purple-600",
		items: ["Email Notifications", "Push Notifications", "Notification Schedule"],
	},
	{
		title: "Security",
		description: "Manage your security settings",
		icon: Lock,
		color: "from-amber-500 to-orange-600",
		items: ["Change Password", "Two-Factor Authentication", "Active Sessions"],
	},
	{
		title: "Appearance",
		description: "Customize your experience",
		icon: Palette,
		color: "from-emerald-500 to-teal-600",
		items: ["Theme", "Language", "Display Preferences"],
	},
	{
		title: "Privacy",
		description: "Manage your privacy settings",
		icon: Lock,
		color: "from-pink-500 to-rose-600",
		items: ["Data Privacy", "Visibility", "Account Sharing"],
	},
	{
		title: "Data",
		description: "Manage your data and backups",
		icon: Database,
		color: "from-cyan-500 to-blue-600",
		items: ["Export Data", "Backup", "Delete Account"],
	},
];

export default async function SettingsPage() {
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
							<div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-xs font-bold">
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
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Settings</span> & Preferences ⚙️
					</h1>
					<p className="text-gray-400 text-sm mt-1">Manage your account settings and customize your experience.</p>
				</div>

				{/* Profile Section */}
				<div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm mb-6">
					<h2 className="text-sm font-bold text-gray-900 mb-4">Account</h2>
					<div className="flex items-center gap-4">
						<div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-xl font-bold shadow-md">
							{(session.user?.email || session.user?.name || "U")[0].toUpperCase()}
						</div>
						<div>
							<p className="text-sm font-semibold text-gray-900">{session.user?.name || "User"}</p>
							<p className="text-xs text-gray-500 mt-0.5">{session.user?.email}</p>
							<button className="mt-2 text-xs font-semibold text-emerald-600 hover:text-emerald-700">Edit Profile</button>
						</div>
					</div>
				</div>

				{/* Settings Grid */}
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
					{settingSections.map((section) => {
						const Icon = section.icon;
						return (
							<div
								key={section.title}
								className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
							>
								<div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${section.color} flex items-center justify-center mb-3 shadow-md`}>
									<Icon className="w-5 h-5 text-white" />
								</div>
								<h3 className="text-sm font-bold text-gray-900 mb-1">{section.title}</h3>
								<p className="text-xs text-gray-500 mb-4">{section.description}</p>
								<ul className="space-y-2">
									{section.items.map((item) => (
										<li key={item} className="text-xs text-gray-600 flex items-center gap-2">
											<span className="w-1 h-1 bg-gray-300 rounded-full" />
											{item}
										</li>
									))}
								</ul>
								<button className="mt-4 w-full py-2 text-xs font-semibold text-white bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg hover:opacity-90 transition-opacity">
									Configure
								</button>
							</div>
						);
					})}
				</div>

				{/* Danger Zone */}
				<div className="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-2xl p-6 shadow-sm">
					<h2 className="text-sm font-bold text-red-900 mb-2">Danger Zone</h2>
					<p className="text-xs text-red-700 mb-4">These actions are irreversible. Please proceed with caution.</p>
					<div className="space-y-2">
						<button className="w-full px-4 py-2.5 bg-transparent border border-red-300 text-red-700 text-sm font-semibold rounded-lg hover:bg-red-50 transition-colors">
							Reset All Settings
						</button>
						<button className="w-full px-4 py-2.5 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors">
							Delete Account
						</button>
					</div>
				</div>
			</main>
		</div>
	);
}
