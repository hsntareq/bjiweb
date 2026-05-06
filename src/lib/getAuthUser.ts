import { getServerSession } from "next-auth";
import { authOptions } from "./auth-options";

export interface AuthUser {
  userId: number;
  organizationId: number | null;
  orgType: string | null;
  orgName: string | null;
  parentOrgId: number | null;
  parentOrgType: string | null;
  positionTitle: string | null;
  positionGroup: string | null;
  hasOrgAccess: boolean;
}

/**
 * Fetches the current session and the user's org profile from the API.
 * Returns null for authUser if the API call fails or the user is not logged in.
 */
export async function getSessionAndAuthUser(): Promise<{
  session: Awaited<ReturnType<typeof getServerSession>>;
  authUser: AuthUser | null;
}> {
  const session = await getServerSession(authOptions);
  if (!session) return { session: null, authUser: null };

  const accessToken = (session as any).accessToken;
  if (!accessToken) return { session, authUser: null };

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    });
    if (!res.ok) return { session, authUser: null };
    const authUser: AuthUser = await res.json();
    return { session, authUser };
  } catch {
    return { session, authUser: null };
  }
}
