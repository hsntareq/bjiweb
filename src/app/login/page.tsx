"use client";
import { ArrowRight, Lock, Mail, Package } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleEmailLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		const res = await signIn("credentials", {
			email,
			password,
			redirect: false,
		});
		setLoading(false);
		if (res?.error) {
			setError("Invalid email or password");
		} else {
			router.push("/dashboard");
		}
	};

	return (
		<div className="min-h-screen flex">
			{/* Left panel */}
			<div className="hidden lg:flex lg:w-5/12 xl:w-1/2 relative overflow-hidden bg-[#0d0d1a] flex-col">
				<div className="absolute top-1/4 -left-20 w-80 h-80 bg-indigo-600 rounded-full opacity-25 blur-3xl pointer-events-none" />
				<div className="absolute bottom-1/4 right-0 w-72 h-72 bg-violet-700 rounded-full opacity-20 blur-3xl pointer-events-none" />
				<div className="relative z-10 flex flex-col justify-between h-full p-10">
					<Link href="/" className="flex items-center gap-3 w-fit">
						<div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
							<Package className="w-5 h-5 text-white" />
						</div>
						<span className="text-white font-bold text-lg">BJI OMS</span>
					</Link>
					<div>
						<h2 className="text-4xl font-extrabold text-white leading-tight">
							Welcome<br />
							<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">Back.</span>
						</h2>
						<p className="mt-4 text-indigo-200/50 text-sm leading-relaxed max-w-xs">
							Sign in to your account to manage orders, track fulfilment, and stay on top of your business.
						</p>
						<div className="mt-8 flex items-center gap-2">
							<div className="flex -space-x-2">
								{["I", "J", "K"].map((l) => (
									<div key={l} className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 border-2 border-[#0d0d1a] flex items-center justify-center text-white text-xs font-bold">{l}</div>
								))}
							</div>
							<p className="text-white/30 text-xs">Trusted by the BJI team</p>
						</div>
					</div>
					<p className="text-white/15 text-xs">© 2026 BJI OMS. All rights reserved.</p>
				</div>
			</div>

			{/* Right panel */}
			<div className="flex-1 flex items-center justify-center bg-white px-6 py-12">
				<div className="w-full max-w-sm">
					{/* Mobile logo */}
					<Link href="/" className="lg:hidden flex items-center gap-2 mb-8 w-fit">
						<div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
							<Package className="w-4 h-4 text-white" />
						</div>
						<span className="text-gray-900 font-bold">BJI OMS</span>
					</Link>

					<h1 className="text-2xl font-extrabold text-gray-900 mb-1">Sign in</h1>
					<p className="text-gray-400 text-sm mb-8">Enter your credentials to access the dashboard</p>

					{error && (
						<div className="mb-5 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm flex items-center gap-2">
							<span className="shrink-0">⚠</span> {error}
						</div>
					)}

					<form onSubmit={handleEmailLogin} className="space-y-4">
						<div className="relative">
							<Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
							<input
								type="email"
								placeholder="Email address"
								value={email}
								onChange={e => setEmail(e.target.value)}
								className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-sm bg-gray-50/50"
								required
							/>
						</div>
						<div className="relative">
							<Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
							<input
								type="password"
								placeholder="Password"
								value={password}
								onChange={e => setPassword(e.target.value)}
								className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-sm bg-gray-50/50"
								required
							/>
						</div>
						<button
							type="submit"
							className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl font-semibold hover:from-indigo-500 hover:to-violet-500 transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 text-sm disabled:opacity-60"
							disabled={loading}
						>
							{loading ? "Signing in..." : <><span>Sign In</span><ArrowRight className="w-4 h-4" /></>}
						</button>
					</form>

					<div className="mt-6 pt-6 border-t border-gray-100 space-y-3 text-center text-sm">
						<Link href="/login/phone" className="block text-indigo-600 hover:text-indigo-700 font-medium transition-colors">
							Sign in with Phone instead
						</Link>
						<p className="text-gray-400">
							No account?{" "}
							<Link href="/register" className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors">
								Create one
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
