"use client";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
	return (
		<button
			onClick={() => signOut({ callbackUrl: "/login" })}
			className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all text-sm font-medium"
		>
			<LogOut className="w-4 h-4" />
			<span className="hidden sm:inline">Sign Out</span>
		</button>
	);
}
