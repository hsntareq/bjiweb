'use client';

import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import {  Loader, User, Search, ChevronDown, Building2 , Phone, MapPin, Briefcase, X, Droplets, Home, Landmark } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { isTokenExpired } from '../../lib/getAuthToken';
import { UserProfilePopover, UserProfileData, RankBadge } from '@/components/UserProfilePopover';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

interface UserData {
  id: number;
  fullname: string;
  email: string;
  responsibility: string | null;
  organization: string;
  childOrgName?: string;
  rank: string | null;
  isAdv?: boolean;

  [key: string]: any;
}

interface UserHierarchyData {
  currentOrgUsers: UserData[];
  childOrgUsers: UserData[];
}

interface OrgOption {
  id: number;
  name: string;
  type: string;
  parentId?: number | null;
  parentName?: string | null;
}



export default function UsersClient({
  accessToken: initialToken = '',
  hasOrgAccess = false,
  userOrgId = null,
  userOrgType = null,
  userParentOrgId = null,
}: {
  accessToken?: string;
  hasOrgAccess?: boolean;
  userOrgId?: number | null;
  userOrgType?: string | null;
  userParentOrgId?: number | null;
}) {
  const { data: session } = useSession();
  const [fallbackToken, setFallbackToken] = useState<string | null>(null);

  const [userContext, setUserContext] = useState<{
    organizationId: number | null;
    orgType: string | null;
    orgName: string | null;
    parentOrgId: number | null;
    hasOrgAccess: boolean;
  } | null>(null);

  const effectiveHasOrgAccess = (userContext?.hasOrgAccess) || hasOrgAccess;

  const [availableOrgs, setAvailableOrgs] = useState<OrgOption[]>([]);
  const [selectedOrgId, setSelectedOrgId] = useState<number | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string>(userOrgType?.toUpperCase() || '');

  const [userData, setUserData] = useState<UserHierarchyData>({ currentOrgUsers: [], childOrgUsers: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [showCurrentOrg, setShowCurrentOrg] = useState(true);
  const [showChildOrgs, setShowChildOrgs] = useState(true);

  const [popoverUser, setPopoverUser] = useState<any | null>(null);
  const [popoverAnchor, setPopoverAnchor] = useState<HTMLElement | null>(null);

  const handleNameClick = (e: React.MouseEvent<HTMLElement>, user: any) => {
    e.stopPropagation();
    if (popoverUser?.id === user.id) {
      setPopoverUser(null);
      setPopoverAnchor(null);
    } else {
      setPopoverUser(user);
      setPopoverAnchor(e.currentTarget);
    }
  };

  const refreshBackendToken = useCallback(async (): Promise<string | null> => {
    const provider = (session as any)?.provider;
    const googleId = (session as any)?.googleId;
    const email = session?.user?.email;
    if (provider !== "google" || !googleId || !email) return null;
    try {
      const res = await fetch(`${API_URL}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ googleId, email }),
      });
      if (res.ok) {
        const data = await res.json();
        const nextToken = data.access_token;
        if (nextToken) {
          setFallbackToken(nextToken);
          return nextToken;
        }
      }
      return null;
    } catch {
      return null;
    }
  }, [session]);

  const getToken = useCallback(async (): Promise<string | null> => {
    const token = fallbackToken || (session as any)?.accessToken || initialToken;
    if (!token || isTokenExpired(token)) {
      const refreshed = await refreshBackendToken();
      if (refreshed) return refreshed;
    }
    return token;
  }, [fallbackToken, session, initialToken, refreshBackendToken]);

  // Fetch user context on mount
  useEffect(() => {
    async function fetchMe() {
      const token = await getToken();
      if (!token) return;

      try {
        const res = await fetch(`${API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 401) {
          const refreshedToken = await refreshBackendToken();
          if (refreshedToken) {
            const retryRes = await fetch(`${API_URL}/auth/me`, {
              headers: { Authorization: `Bearer ${refreshedToken}` },
            });
            if (retryRes.ok) {
              const data = await retryRes.json();
              setUserContext({
                organizationId: data.organizationId,
                orgType: data.orgType?.toUpperCase(),
                orgName: data.orgName,
                parentOrgId: data.parentOrgId,
                hasOrgAccess: data.hasOrgAccess,
              });

              if (data.hasOrgAccess) {
                setSelectedLevel(data.orgType?.toUpperCase());
                setSelectedOrgId(null);
              } else {
                setSelectedLevel(data.orgType?.toUpperCase());
                setSelectedOrgId(data.organizationId);
              }
            }
            return;
          }
        }

        if (res.ok) {
          const data = await res.json();
          setUserContext({
            organizationId: data.organizationId,
            orgType: data.orgType?.toUpperCase(),
            orgName: data.orgName,
            parentOrgId: data.parentOrgId,
            hasOrgAccess: data.hasOrgAccess,
          });

          if (data.hasOrgAccess) {
            setSelectedLevel(data.orgType?.toUpperCase());
            setSelectedOrgId(null);
          } else {
            setSelectedLevel(data.orgType?.toUpperCase());
            setSelectedOrgId(data.organizationId);
          }
        }
      } catch (err) {
        console.error("Failed to fetch me", err);
      }
    }
    fetchMe();
  }, [getToken, refreshBackendToken]);

  // Fetch available orgs (org hierarchy)
  useEffect(() => {
    async function fetchOrgs() {
      const token = await getToken();
      if (!token) return;

      try {
        const url = effectiveHasOrgAccess
          ? `${API_URL}/organization/hierarchy/tree`
          : `${API_URL}/organization/hierarchy/tree?global=true`;
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          const flattened = flattenOrgs(data);
          setAvailableOrgs(flattened);
        }
      } catch (err) {
        console.error("Failed to fetch orgs", err);
      }
    }
    fetchOrgs();
  }, [getToken]);

  // Fetch users when org selection changes
  useEffect(() => {
    if (!selectedLevel) {
      setUserData({ currentOrgUsers: [], childOrgUsers: [] });
      setLoading(false);
      return;
    }

    const effectiveOrgId = selectedOrgId || (selectedLevel === userContext?.orgType ? userContext?.organizationId : null);

    if (!effectiveOrgId) {
      setUserData({ currentOrgUsers: [], childOrgUsers: [] });
      setLoading(false);
      return;
    }

    async function fetchUsers() {
      const token = await getToken();
      setLoading(true);
      try {
        const actualLevel = availableOrgs.find(o => o.id === effectiveOrgId)?.type || selectedLevel;
        const res = await fetch(
          `${API_URL}/users/by-organization?orgId=${effectiveOrgId}&level=${actualLevel}`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );
        if (!res.ok) throw new Error('Failed to fetch users');
        const data = await res.json();
        setUserData(data);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching users:', err);
        setError(err.message || 'Failed to load users');
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, [selectedOrgId, selectedLevel, getToken, userContext, availableOrgs]);

  const flattenOrgs = (orgs: any[], parentName: string | null = null): OrgOption[] => {
    let result: OrgOption[] = [];
    for (const org of orgs) {
      result.push({
        id: org.id,
        name: org.name,
        type: org.type,
        parentId: org.parentId || org.parent?.id,
        parentName: parentName
      });
      if (org.children?.length > 0) {
        result = result.concat(flattenOrgs(org.children, org.name));
      }
    }
    return result;
  };

  const levelOptions = ['CENTRAL', 'DIVISION', 'CITY', 'THANA', 'WARD', 'UNIT'];

  const filteredLevelOptions = useMemo(() => {
    if (!userContext?.orgType) return levelOptions;
    const userLevelIndex = levelOptions.indexOf(userContext.orgType);
    if (userLevelIndex === -1) return levelOptions;

    // Non-authorized: locked to their own level only
    if (!effectiveHasOrgAccess) return [userContext.orgType];

    // Authorized: show their own level and all child levels
    return levelOptions.slice(userLevelIndex);
  }, [userContext?.orgType, effectiveHasOrgAccess]);

  const filteredOrgOptions = useMemo(() => {
    if (!userContext) return [];

    // If an authorized user selects their own level, show direct children (Wards for Thana)
    if (effectiveHasOrgAccess && selectedLevel === userContext.orgType) {
      const levels = ['CENTRAL', 'DIVISION', 'CITY', 'THANA', 'WARD', 'UNIT'];
      const userLevelIndex = levels.indexOf(userContext.orgType);
      const childLevel = userLevelIndex !== -1 && userLevelIndex + 1 < levels.length
        ? levels[userLevelIndex + 1]
        : null;

      if (childLevel) {
        return availableOrgs.filter(o => o.type === childLevel);
      }
    }

    const orgsAtLevel = availableOrgs.filter(o => o.type === selectedLevel);

    if (!effectiveHasOrgAccess) {
      if (!userContext.parentOrgId) return orgsAtLevel;
      // Restrict to siblings: same parent as the user's org
      return orgsAtLevel.filter(o => o.parentId === userContext.parentOrgId);
    } else {
      // Authorized: since availableOrgs only contains their descendants
      // we can just return all orgs at the selected level
      return orgsAtLevel;
    }
  }, [availableOrgs, selectedLevel, effectiveHasOrgAccess, userContext]);

  // Filter child org users by search
  const filteredChildUsers = userData.childOrgUsers.filter(u =>
    (u.fullname || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (u.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (u.responsibility || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (u.childOrgName || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedOrgName = availableOrgs.find(o => o.id === selectedOrgId)?.name || 'Unknown';


  return (
    <div className="space-y-6">
      {/* User Context */}
      {userContext && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
          <p className="text-sm text-indigo-900">
            <span className="font-semibold">Your Organization:</span> {userContext.orgName} ({userContext.orgType})
          </p>
        </div>
      )}

      {/* Filter Section */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Organization Level</label>
            <select
              value={selectedLevel}
              onChange={(e) => {
                setSelectedLevel(e.target.value);
                setSelectedOrgId(null);
              }}
              disabled={!effectiveHasOrgAccess}
              className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                !effectiveHasOrgAccess ? 'bg-gray-50 cursor-not-allowed text-gray-500' : ''
              }`}
            >
              <option value="">Select level...</option>
              {filteredLevelOptions.map(l => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
            {!effectiveHasOrgAccess && (
              <p className="text-xs text-gray-400 mt-1">Locked to your organization level</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Organization</label>
            <select
              value={selectedOrgId || ''}
              onChange={(e) => setSelectedOrgId(parseInt(e.target.value) || null)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={!selectedLevel}
            >
              <option value="">Select organization...</option>
              {(() => {
                const groups: Record<string, OrgOption[]> = {};
                filteredOrgOptions.forEach(o => {
                  const g = o.parentName || 'Other';
                  if (!groups[g]) groups[g] = [];
                  groups[g].push(o);
                });
                return Object.entries(groups).map(([groupName, orgs]) => (
                  <optgroup key={groupName} label={groupName}>
                    {orgs.map(o => (
                      <option key={o.id} value={o.id}>
                        {o.name}
                      </option>
                    ))}
                  </optgroup>
                ));
              })()}
            </select>
            {!effectiveHasOrgAccess && filteredOrgOptions.length > 0 && (
              <p className="text-xs text-gray-400 mt-1">
                Showing {filteredOrgOptions.length} organization{filteredOrgOptions.length > 1 ? 's' : ''} in your area
              </p>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-800">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader className="w-8 h-8 animate-spin text-indigo-600" />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Section 1: Organization Members */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div
              className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
              onClick={() => setShowCurrentOrg(!showCurrentOrg)}
            >
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-indigo-600" />
                <span className="font-semibold text-gray-900">Organization Members</span>
                <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full font-medium">
                  {userData.currentOrgUsers.length}
                </span>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-gray-500 transition-transform ${
                  showCurrentOrg ? 'rotate-180' : ''
                }`}
              />
            </div>

            {showCurrentOrg && (
              <div className="overflow-x-auto">
                {userData.currentOrgUsers.length > 0 ? (
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-xs uppercase tracking-wider">
                        <th className="px-6 py-4 font-semibold">User</th>
                        <th className="px-6 py-4 font-semibold">Email</th>
                        <th className="px-6 py-4 font-semibold">Role</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {userData.currentOrgUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <button
                              onClick={(e) => handleNameClick(e, user)}
                              className="flex items-center gap-3 text-left hover:text-indigo-700 focus:outline-none transition-colors"
                            >
                              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs shrink-0">
                                {(user.fullname || user.email || 'U')[0].toUpperCase()}
                              </div>
                              <span className={`font-medium ${popoverUser?.id === user.id ? 'text-indigo-700' : 'text-gray-900'}`}>{user.fullname || 'Unknown'}</span>
                            </button>
                          </td>
                          <td className="px-6 py-4 text-gray-600 text-sm">{user.email}</td>
                          <td className="px-6 py-4 text-gray-600 text-sm">{user.responsibility || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-6 text-center text-gray-500">No members in this organization</div>
                )}
              </div>
            )}
          </div>

          {/* Section 2: Child Organization Members */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div
              className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
              onClick={() => setShowChildOrgs(!showChildOrgs)}
            >
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-emerald-600" />
                <span className="font-semibold text-gray-900">Child Organization Members</span>
                <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-medium">
                  {filteredChildUsers.length}
                </span>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-gray-500 transition-transform ${
                  showChildOrgs ? 'rotate-180' : ''
                }`}
              />
            </div>

            {showChildOrgs && (
              <>
                {userData.childOrgUsers.length > 0 && (
                  <div className="p-4 border-b border-gray-200 bg-gray-50">
                    <div className="relative">
                      <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                      />
                    </div>
                  </div>
                )}

                <div className="overflow-x-auto">
                  {filteredChildUsers.length > 0 ? (
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-xs uppercase tracking-wider">
                          <th className="px-6 py-4 font-semibold">User</th>
                          <th className="px-6 py-4 font-semibold">Email</th>
                          <th className="px-6 py-4 font-semibold">Rank</th>
                          <th className="px-6 py-4 font-semibold">Role</th>
                          <th className="px-6 py-4 font-semibold">Child Organization</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {filteredChildUsers.map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <button
                                onClick={(e) => handleNameClick(e, user)}
                                className="flex items-center gap-3 text-left hover:text-emerald-700 focus:outline-none transition-colors"
                              >
                                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs shrink-0">
                                  {(user.fullname || user.email || 'U')[0].toUpperCase()}
                                </div>
                                <span className={`font-medium ${popoverUser?.id === user.id ? 'text-emerald-700' : 'text-gray-900'}`}>{user.fullname || 'Unknown'}</span>
                              </button>
                            </td>
                            <td className="px-6 py-4 text-gray-600 text-sm">{user.email}</td>
                            <td className="px-6 py-4 text-sm">{user.rank ? <RankBadge rank={user.rank} isAdv={user.isAdv} /> : '-'}</td>
                            <td className="px-6 py-4 text-gray-600 text-sm">{user.responsibility || '-'}</td>
                            <td className="px-6 py-4 text-gray-600 text-sm font-medium">{user.childOrgName || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : userData.childOrgUsers.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">No child organizations or members</div>
                  ) : (
                    <div className="p-6 text-center text-gray-500">No users match your search</div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {popoverUser && popoverAnchor && (
        <UserProfilePopover
          user={popoverUser}
          anchorEl={popoverAnchor}
          onClose={() => {
            setPopoverUser(null);
            setPopoverAnchor(null);
          }}
        />
      )}
    </div>
  );
}


