import { ShieldX } from "lucide-react";
import Link from "next/link";

export default function AccessDenied({ message }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
      <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mb-5">
        <ShieldX className="w-8 h-8 text-red-400" />
      </div>
      <h1 className="text-xl font-bold text-gray-900 mb-2">Access Restricted</h1>
      <p className="text-gray-500 text-sm max-w-sm mb-6">
        {message ||
          "You need an active executive position in your organization to access this area."}
      </p>
      <Link
        href="/dashboard"
        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
