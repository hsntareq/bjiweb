import { authOptions } from "@/lib/auth-options";
import { Package, Users, Globe, BarChart2 } from "lucide-react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LanguageToggle from "../../components/LanguageToggle";
import ModuleSwitcher from "../../components/ModuleSwitcher";
import PlanningReportingClient from "./PlanningReportingClient";

export default async function PlanningReportingPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center shadow-md shadow-indigo-400/20">
              <BarChart2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-lg">Planning & Reporting</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/organization" className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-full transition-colors text-sm font-medium text-gray-700">
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">Organizations</span>
            </Link>
            <Link href="/global-organizations" className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-full transition-colors text-sm font-medium text-gray-700">
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">Global Orgs</span>
            </Link>
            <Link href="/users" className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-full transition-colors text-sm font-medium text-gray-700">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Users</span>
            </Link>
            <LanguageToggle />
            <div className="hidden sm:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold">
                {(session.user?.email || session.user?.name || "U")[0].toUpperCase()}
              </div>
              <span className="text-sm text-gray-600 font-medium">{session.user?.email || session.user?.name}</span>
            </div>
            <ModuleSwitcher />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <PlanningReportingClient accessToken={(session as any)?.accessToken || ''} />
      </main>
    </div>
  );
}
