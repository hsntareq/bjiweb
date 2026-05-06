import { getSessionAndAuthUser } from "@/lib/getAuthUser";
import { redirect } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import UsersClient from './UsersClient';

export default async function UsersPage() {
    const { session, authUser } = await getSessionAndAuthUser();
    if (!session) redirect("/login");

    return (
        <div className="min-h-screen bg-white">
            <AppHeader session={session} hasOrgAccess={authUser?.hasOrgAccess ?? false} />

            <main className="max-w-6xl mx-auto px-6 py-10">
                <div className="mb-8">
                    <h1 className="text-2xl font-extrabold text-gray-900">
                        User <span className="text-gray-600">Management</span> 👥
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">Manage all users, their responsibilities, and statuses.</p>
                </div>

                <UsersClient
                    accessToken={(session as any)?.accessToken || ''}
                    hasOrgAccess={authUser?.hasOrgAccess ?? false}
                    userOrgId={authUser?.organizationId ?? null}
                    userOrgType={authUser?.orgType ?? null}
                    userParentOrgId={authUser?.parentOrgId ?? null}
                />
            </main>
        </div>
    );
}
