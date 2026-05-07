import { redirect } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import AccessDenied from "@/components/AccessDenied";
import OrganizationClient from './OrganizationClient';
import { getSessionAndAuthUser } from "@/lib/getAuthUser";

export default async function OrganizationPage() {
  const { session, authUser } = await getSessionAndAuthUser();
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen bg-white">
      <AppHeader session={session} />
      <main className="max-w-full mx-auto px-6 py-10">
        {!authUser?.hasOrgAccess ? (
          <AccessDenied />
        ) : (
          <>
            <div className="mb-8">
              <h1 className="text-2xl font-extrabold text-gray-900">
                Organization <span className="text-gray-600">Management</span> 🏢
              </h1>
              <p className="text-gray-400 text-sm mt-1">Manage the organizational hierarchy (Central, City, Thana, Ward, Unit)</p>
            </div>
            <OrganizationClient 
              userEmail={session.user?.email || 'default'} 
              accessToken={(session as any)?.accessToken || ''} 
              userOrgId={authUser?.organizationId || null}
              userOrgType={authUser?.orgType || null}
            />
          </>
        )}
      </main>
    </div>
  );
}
