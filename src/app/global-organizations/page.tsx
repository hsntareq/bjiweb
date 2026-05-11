import { redirect } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import AccessDenied from "@/components/AccessDenied";
import OrganizationClient from '../organization/OrganizationClient';
import { getSessionAndAuthUser } from "@/lib/getAuthUser";

export default async function GlobalOrganizationPage() {
  const { session, authUser } = await getSessionAndAuthUser();
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen bg-white">
      <AppHeader session={session} hasOrgAccess={authUser?.hasOrgAccess ?? false} />
      <main className="max-w-6xl mx-auto px-6 py-10">
        {!authUser?.hasOrgAccess ? (
          <AccessDenied />
        ) : (
          <>
            <div className="mb-8">
              <h1 className="text-2xl font-extrabold text-gray-900">
                Global Organization <span className="text-gray-600">Management</span> 🌍
              </h1>
              <p className="text-gray-400 text-sm mt-1">Manage the complete organizational hierarchy across all divisions.</p>
            </div>
            <OrganizationClient userEmail={session.user?.email || 'default'} accessToken={(session as any)?.accessToken || ''} isGlobal={true} />
          </>
        )}
      </main>
    </div>
  );
}
