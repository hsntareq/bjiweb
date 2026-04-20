"use client";
import { ArrowRight, Lock, Mail, Package } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
// Removed duplicate import of router from 'next/router'.

export default function RegisterPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		if (password !== confirmPassword) {
			setError("Passwords do not match");
			return;
		}
		setLoading(true);
		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});
			if (!res.ok) {
				const data = await res.json();
				setError(data.message || "Registration failed");
				setLoading(false);
				return;
			}
			router.push("/login");
		} catch {
			setError("Could not connect to server");
		}
		setLoading(false);
	};

	return (
		<div className="min-h-screen flex">
			{/* Left panel */}
			<div className="hidden lg:flex lg:w-5/12 xl:w-1/2 relative overflow-hidden bg-[#0d0d1a] flex-col">
				<div className="absolute top-1/4 -left-20 w-80 h-80 bg-violet-600 rounded-full opacity-25 blur-3xl pointer-events-none" />
				<div className="absolute bottom-1/4 right-0 w-72 h-72 bg-indigo-700 rounded-full opacity-20 blur-3xl pointer-events-none" />
				<div className="relative z-10 flex flex-col justify-between h-full p-10">
					<Link href="/" className="flex items-center gap-3 w-fit">
						<div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
							<Package className="w-5 h-5 text-white" />
						</div>
						<span className="text-white font-bold text-lg">BJI OMS</span>
					</Link>
					<div>
						<h2 className="text-4xl font-extrabold text-white leading-tight">
							Get Started<br />
							<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">Today.</span>
						</h2>
						<p className="mt-4 text-indigo-200/50 text-sm leading-relaxed max-w-xs">
							Create your account and start managing your orders in minutes. No setup needed.
						</p>
						<div className="mt-8 grid grid-cols-2 gap-3">
							{[
								{ label: "Fast Setup", desc: "Get running in minutes" },
								{ label: "Real-time", desc: "Live order tracking" },
								{ label: "Secure", desc: "JWT-based auth" },
								{ label: "Scalable", desc: "Powered by NestJS" },
							].map((f) => (
								<div key={f.label} className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-3">
									<p className="text-white/80 text-xs font-semibold">{f.label}</p>
									<p className="text-white/30 text-xs mt-0.5">{f.desc}</p>
								</div>
							))}
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

					<h1 className="text-2xl font-extrabold text-gray-900 mb-1">Create account</h1>
					<p className="text-gray-400 text-sm mb-8">Fill in the details below to get started</p>

					{error && (
						<div className="mb-5 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm flex items-center gap-2">
							<span className="shrink-0">⚠</span> {error}
						</div>
					)}

					<form onSubmit={handleRegister} className="space-y-4">
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
								minLength={6}
							/>
						</div>
						<div className="relative">
							<Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
							<input
								type="password"
								placeholder="Confirm password"
								value={confirmPassword}
								onChange={e => setConfirmPassword(e.target.value)}
								className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-sm bg-gray-50/50"
								required
								minLength={6}
							/>
						</div>
						<button
							type="submit"
							className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl font-semibold hover:from-indigo-500 hover:to-violet-500 transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 text-sm disabled:opacity-60"
							disabled={loading}
						>
							{loading ? "Creating account..." : <><span>Create Account</span><ArrowRight className="w-4 h-4" /></>}
						</button>
					</form>

					<div className="mt-6 pt-6 border-t border-gray-100 text-center text-sm">
						<p className="text-gray-400">
							Already have an account?{" "}
							<Link href="/login" className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors">
								Sign in
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
// Removed unreachable and duplicate code after the main return.
}
