import { authOptions } from "@/lib/auth-options";
import { Award, BookOpen, CheckCircle, Clock, Package, Zap } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LanguageToggle from "../../components/LanguageToggle";
import ModuleSwitcher from "../../components/ModuleSwitcher";

const courses = [
	{
		title: "Islamic Studies 101",
		progress: 65,
		icon: BookOpen,
		color: "from-blue-500 to-cyan-600",
		duration: "12 weeks",
	},
	{
		title: "Quran Memorization",
		progress: 45,
		icon: BookOpen,
		color: "from-emerald-500 to-teal-600",
		duration: "Ongoing",
	},
	{
		title: "Hadith Understanding",
		progress: 85,
		icon: Zap,
		color: "from-amber-500 to-orange-600",
		duration: "6 weeks",
	},
	{
		title: "Islamic History",
		progress: 100,
		icon: Award,
		color: "from-purple-500 to-pink-600",
		duration: "Completed",
	},
];

export default async function MyLearningPage() {
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
							<div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-xs font-bold">
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
						Your Learning <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">Journey</span> 📚
					</h1>
					<p className="text-gray-400 text-sm mt-1">Track your educational progress and continue your learning path.</p>
				</div>

				{/* Learning Stats */}
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
					<div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
						<div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center mb-3 shadow-md">
							<BookOpen className="w-5 h-5 text-white" />
						</div>
						<p className="text-2xl font-extrabold text-gray-900">4</p>
						<p className="text-xs text-gray-400 mt-0.5 font-medium">Active Courses</p>
					</div>
					<div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
						<div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mb-3 shadow-md">
							<Award className="w-5 h-5 text-white" />
						</div>
						<p className="text-2xl font-extrabold text-gray-900">1</p>
						<p className="text-xs text-gray-400 mt-0.5 font-medium">Completed</p>
					</div>
					<div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
						<div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-3 shadow-md">
							<Zap className="w-5 h-5 text-white" />
						</div>
						<p className="text-2xl font-extrabold text-gray-900">73</p>
						<p className="text-xs text-gray-400 mt-0.5 font-medium">Average Progress</p>
					</div>
					<div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
						<div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-3 shadow-md">
							<Clock className="w-5 h-5 text-white" />
						</div>
						<p className="text-2xl font-extrabold text-gray-900">—</p>
						<p className="text-xs text-gray-400 mt-0.5 font-medium">Learning Hours</p>
					</div>
				</div>

				{/* Active Courses */}
				<div className="mb-8">
					<h2 className="text-lg font-bold text-gray-900 mb-4">Your Courses</h2>
					<div className="grid md:grid-cols-2 gap-4">
						{courses.map((course) => {
							const Icon = course.icon;
							const isCompleted = course.progress === 100;
							return (
								<div
									key={course.title}
									className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
								>
									<div className="flex items-start justify-between mb-4">
										<div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center shadow-md`}>
											<Icon className="w-6 h-6 text-white" />
										</div>
										{isCompleted ? (
											<CheckCircle className="w-5 h-5 text-emerald-500" />
										) : null}
									</div>
									<h3 className="text-sm font-bold text-gray-900 mb-1">{course.title}</h3>
									<p className="text-xs text-gray-500 mb-4">{course.duration}</p>

									{!isCompleted ? (
										<>
											<div className="w-full bg-gray-100 rounded-full h-2 mb-2">
												<div
													className={`h-2 rounded-full bg-gradient-to-r ${course.color} transition-all`}
													style={{ width: `${course.progress}%` }}
												/>
											</div>
											<p className="text-xs text-gray-500">{course.progress}% complete</p>
										</>
									) : (
										<div className="px-3 py-2 bg-emerald-50 rounded-lg">
											<p className="text-xs font-semibold text-emerald-700">✓ Completed</p>
										</div>
									)}
								</div>
							);
						})}
					</div>
				</div>

				{/* Learning Resources */}
				<div className="bg-gradient-to-br from-amber-600 to-orange-700 rounded-2xl p-8 shadow-lg shadow-amber-500/20">
					<div className="flex items-start justify-between">
						<div>
							<BookOpen className="w-8 h-8 text-white/80 mb-3" />
							<h3 className="text-white font-extrabold text-xl leading-tight mb-2">Continue Learning</h3>
							<p className="text-amber-200/70 text-sm max-w-md">Explore new courses, resources, and educational materials to enhance your knowledge.</p>
						</div>
						<button className="mt-2 px-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap">
							Explore Resources
						</button>
					</div>
				</div>
			</main>
		</div>
	);
}
