import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import PlanningReportingClient from "./PlanningReportingClient";

export default async function PlanningReportingPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader session={session} />

      <main className="max-w-7xl mx-auto px-6 py-10">
        <PlanningReportingClient accessToken={(session as any)?.accessToken || ''} />
      </main>
    </div>
  );
}
