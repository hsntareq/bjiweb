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
	  <div className="min-h-screen flex items-center justify-center bg-gray-50">
	    <div className="w-full max-w-md p-8 space-y-6 bg-white border border-gray-200 rounded-xl shadow-sm">
	      <div className="flex items-center gap-3 mb-6">
	        <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center">
	          <Package className="w-5 h-5 text-gray-700" />
	        </div>
	        <span className="text-gray-900 font-bold text-xl">BJI OMS</span>
	      </div>
	      <h1 className="text-2xl font-bold text-gray-900">Create account</h1>
	      <p className="text-gray-500 text-sm mb-4">Fill in the details below to get started</p>
	      {error && (
	        <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
	          <span className="shrink-0">⚠</span> {error}
	        </div>
	      )}
	      <form onSubmit={handleRegister} className="space-y-4">
	        <div className="relative">
	          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
	          <input
	            type="email"
	            placeholder="Email address"
	            value={email}
	            onChange={e => setEmail(e.target.value)}
	            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white"
	            required
	          />
	        </div>
	        <div className="relative">
	          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
	          <input
	            type="password"
	            placeholder="Password"
	            value={password}
	            onChange={e => setPassword(e.target.value)}
	            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white"
	            required
	            minLength={6}
	          />
	        </div>
	        <div className="relative">
	          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
	          <input
	            type="password"
	            placeholder="Confirm password"
	            value={confirmPassword}
	            onChange={e => setConfirmPassword(e.target.value)}
	            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white"
	            required
	            minLength={6}
	          />
	        </div>
	        <button
	          type="submit"
	          className="w-full py-3 px-4 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-60"
	          disabled={loading}
	        >
	          {loading ? "Creating account..." : <><span>Create Account</span><ArrowRight className="w-4 h-4" /></>}
	        </button>
	      </form>
	      <div className="pt-4 border-t border-gray-100 text-center text-sm">
	        <p className="text-gray-500">
	          Already have an account?{' '}
	          <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
	            Sign in
	          </Link>
	        </p>
	      </div>
	    </div>
	  </div>
	);
// Removed unreachable and duplicate code after the main return.
}
