import { Package } from "lucide-react";
import Link from "next/link";

export default function Home() {
	return (
		<div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0d0d1a]">
			{/* Ambient orbs */}
			<div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600 rounded-full opacity-20 blur-3xl pointer-events-none" />
			<div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-700 rounded-full opacity-20 blur-3xl pointer-events-none" />
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500 rounded-full opacity-10 blur-3xl pointer-events-none" />

			<div className="relative w-full max-w-sm px-4">
				{/* Brand */}
				<div className="text-center mb-8">
					<div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 mb-5 shadow-2xl shadow-indigo-500/40">
						<Package className="w-8 h-8 text-white" />
					</div>
					<h1 className="text-4xl font-extrabold text-white tracking-tight">BJI OMS</h1>
					<p className="mt-2 text-indigo-300/60 text-sm font-medium tracking-wide uppercase">Order Management System</p>
				</div>

				{/* Glass card */}
				<div className="bg-white/[0.04] backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-7 shadow-2xl">
					<p className="text-white/40 text-sm text-center mb-6">Welcome — choose how to continue</p>
					<div className="flex flex-col gap-3">
						<Link
							href="/login"
							className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-center text-sm hover:from-indigo-500 hover:to-violet-500 transition-all shadow-lg shadow-indigo-500/25"
						>
							Sign In with Email
						</Link>
						<Link
							href="/login/phone"
							className="w-full py-3 px-4 rounded-xl bg-white/[0.07] text-white/80 font-medium text-center border border-white/10 hover:bg-white/[0.12] transition-all text-sm"
						>
							Sign In with Phone
						</Link>
						<div className="relative flex items-center my-1">
							<div className="flex-1 border-t border-white/10" />
							<span className="px-3 text-white/20 text-xs">or</span>
							<div className="flex-1 border-t border-white/10" />
						</div>
						<Link
							href="/register"
							className="w-full py-3 px-4 rounded-xl bg-white/[0.04] text-white/60 font-medium text-center border border-white/[0.08] hover:bg-white/[0.08] transition-all text-sm"
						>
							Create an Account
						</Link>
					</div>
				</div>

				<p className="text-center text-white/15 text-xs mt-6">
					Powered by Next.js · Tailwind CSS · PostgreSQL
				</p>
			</div>
		</div>
	);
}
