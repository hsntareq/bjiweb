'use client';

import { useEffect, useState } from 'react';
import { Loader, User, Search, ChevronDown, Building2 } from 'lucide-react';

interface UserData {
  id: number;
  fullname: string;
  email: string;
  responsibility: string | null;
  organization: string;
  childOrgName?: string;
}

interface UserHierarchyData {
  currentOrgUsers: UserData[];
  childOrgUsers: UserData[];
}

interface OrgOption {
  id: number;
  name: string;
  type: string;
}

export default function UsersClient({ accessToken = '' }: { accessToken?: string }) {
  const [userContext, setUserContext] = useState<{
    organizationId: number | null;
    orgType: string | null;
    orgName: string | null;
  } | null>(null);
  
  const [availableOrgs, setAvailableOrgs] = useState<OrgOption[]>([]);
  const [selectedOrgId, setSelectedOrgId] = useState<number | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  
  const [userData, setUserData] = useState<UserHierarchyData>({ currentOrgUsers: [], childOrgUsers: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [showCurrentOrg, setShowCurrentOrg] = useState(true);
  const [showChildOrgs, setShowChildOrgs] = useState(true);

  // Fetch user context on mount
  useEffect(() => {
    if (!accessToken) return;
    
    fetch('http://localhost:3001/auth/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data) {
          setUserContext({
            organizationId: data.organizationId,
            orgType: data.orgType,
            orgName: data.orgName,
          });
          setSelectedOrgId(data.organizationId);
          setSelectedLevel(data.orgType);
        }
      })
      .catch(() => {});
  }, [accessToken]);

  // Fetch available orgs (org hierarchy)
  useEffect(() => {
    if (!accessToken) return;
    
    fetch('http://localhost:3001/organization/hierarchy/tree', {
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
    })
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data) {
          const flattened = flattenOrgs(data);
          setAvailableOrgs(flattened);
        }
      })
      .catch(() => {});
  }, [accessToken]);

  // Fetch users when org selection changes
  useEffect(() => {
    if (!selectedOrgId || !selectedLevel) {
      setUserData({ currentOrgUsers: [], childOrgUsers: [] });
      return;
    }

    setLoading(true);
    fetch(
      `http://localhost:3001/users/by-organization?orgId=${selectedOrgId}&level=${selectedLevel}`,
      {
        headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
      }
    )
      .then(r => {
        if (!r.ok) throw new Error('Failed to fetch users');
        return r.json();
      })
      .then(data => {
        setUserData(data);
        setError(null);
      })
      .catch(err => {
        console.error('Error fetching users:', err);
        setError(err.message || 'Failed to load users');
      })
      .finally(() => setLoading(false));
  }, [selectedOrgId, selectedLevel, accessToken]);

  const flattenOrgs = (orgs: any[]): OrgOption[] => {
    let result: OrgOption[] = [];
    for (const org of orgs) {
      result.push({ id: org.id, name: org.name, type: org.type });
      if (org.children?.length > 0) {
        result = result.concat(flattenOrgs(org.children));
      }
    }
    return result;
  };

  const levelOptions = ['CENTRAL', 'DIVISION', 'CITY', 'THANA', 'WARD', 'UNIT'];

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
                setSelectedOrgId(null); // Reset org selection
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select level...</option>
              {levelOptions.map(l => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
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
              {availableOrgs
                .filter(o => o.type === selectedLevel)
                .map(o => (
                  <option key={o.id} value={o.id}>{o.name}</option>
                ))}
            </select>
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
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                                {(user.fullname || user.email || 'U')[0].toUpperCase()}
                              </div>
                              <span className="font-medium text-gray-900">{user.fullname || 'Unknown'}</span>
                            </div>
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
                          <th className="px-6 py-4 font-semibold">Role</th>
                          <th className="px-6 py-4 font-semibold">Child Organization</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {filteredChildUsers.map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs">
                                  {(user.fullname || user.email || 'U')[0].toUpperCase()}
                                </div>
                                <span className="font-medium text-gray-900">{user.fullname || 'Unknown'}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-gray-600 text-sm">{user.email}</td>
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
    </div>
  );
}
