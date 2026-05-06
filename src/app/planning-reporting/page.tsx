import { redirect } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import AccessDenied from "@/components/AccessDenied";
import PlanningReportingClient from "./PlanningReportingClient";
import { getSessionAndAuthUser } from "@/lib/getAuthUser";

export default async function PlanningReportingPage() {
  const { session, authUser } = await getSessionAndAuthUser();
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader session={session} />
      <main className="max-w-7xl mx-auto px-6 py-10">
        {!authUser?.hasOrgAccess ? (
          <AccessDenied />
        ) : (
          <PlanningReportingClient accessToken={(session as any)?.accessToken || ''} />
        )}
      </main>
    </div>
  );
}
