'use client';

import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import {  Loader, User, Search, ChevronDown, Building2 , Phone, MapPin, Briefcase, X, Droplets, Home, Landmark } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { isTokenExpired } from '../../lib/getAuthToken';

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


const RANK_COLORS: Record<string, string> = {
  'member':    'bg-blue-100 text-blue-800',
  'activist':  'bg-green-100 text-green-800',
  'associate': 'bg-yellow-100 text-yellow-800',
};

function RankBadge({ rank, isAdv }: { rank: string; isAdv?: boolean }) {
  const cls = RANK_COLORS[rank] ?? 'bg-gray-100 text-gray-700';
  return (
    <span className="inline-flex items-center gap-1">
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${cls}`}>
        {rank}
      </span>
      {isAdv && (
        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-bold bg-purple-100 text-purple-700 border border-purple-300">
          ADV
        </span>
      )}
    </span>
  );
}

const BLOOD_COLORS: Record<string, string> = {
  'A+': 'bg-red-50 text-red-700 border-red-200',
  'A-': 'bg-red-50 text-red-700 border-red-200',
  'B+': 'bg-orange-50 text-orange-700 border-orange-200',
  'B-': 'bg-orange-50 text-orange-700 border-orange-200',
  'AB+': 'bg-purple-50 text-purple-700 border-purple-200',
  'AB-': 'bg-purple-50 text-purple-700 border-purple-200',
  'O+': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'O-': 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

function ProfilePopover({ user, anchorEl, onClose }: {
  user: UserData;
  anchorEl: HTMLElement;
  onClose: () => void;
}) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const initials = (user.fullname || user.email || 'U')[0].toUpperCase();
  const rankCls = user.rank ? (RANK_COLORS[user.rank] ?? 'bg-gray-100 text-gray-700') : '';
  const bloodCls = user.bloodGroup ? (BLOOD_COLORS[user.bloodGroup] ?? 'bg-gray-50 text-gray-700 border-gray-200') : '';

  const calcPos = useCallback(() => {
    const rect = anchorEl.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const placeAbove = spaceBelow < 220;
    return {
      top: placeAbove ? rect.top - 8 : rect.bottom + 8,
      left: Math.min(Math.max(rect.left, 8), window.innerWidth - 296),
      placeAbove,
    };
  }, [anchorEl]);

  const [pos, setPos] = useState(calcPos);

  useEffect(() => {
    const update = () => setPos(calcPos());
    window.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
    };
  }, [calcPos]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const keyHandler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('mousedown', handler);
    document.addEventListener('keydown', keyHandler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('keydown', keyHandler);
    };
  }, [onClose]);

  return (
    <div
      ref={popoverRef}
      className={`fixed z-50 w-72 bg-white rounded-xl shadow-xl border border-gray-200 p-4 ${pos.placeAbove ? '-translate-y-full' : ''}`}
      style={{ top: pos.top, left: pos.left }}
    >
      {/* Close button */}
      <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 p-1 rounded">
        <X className="w-3.5 h-3.5" />
      </button>

      {/* Row 1: Avatar + Name + Rank + Blood group */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm shrink-0 overflow-hidden">
          {user.photo ? (
            <img src={user.photo} alt={user.fullname} className="w-full h-full object-cover" />
          ) : (
            initials
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-gray-900 truncate pr-4">{user.fullname || '—'}</div>
          <div className="flex items-center gap-1.5 mt-1 flex-wrap">
            {user.rank && (
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${rankCls}`}>{user.rank}</span>
            )}
            {user.isAdv && (
              <span className="px-1.5 py-0.5 rounded text-xs font-bold bg-purple-100 text-purple-700 border border-purple-300">ADV</span>
            )}
            {user.bloodGroup && (
              <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-semibold border ${bloodCls}`}>
                <Droplets className="w-3 h-3" />{user.bloodGroup}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 mb-3" />

      {/* Row 2: Mobile */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
        <Phone className="w-4 h-4 text-gray-400 shrink-0" />
        <span>{user.mobile || <span className="text-gray-300 italic">No phone</span>}</span>
      </div>

      {/* Row 3: Responsibility + Org */}
      <div className="flex items-start gap-2 text-sm text-gray-600 mb-2">
        <Briefcase className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
        <span>
          {user.responsibility
            ? <><span className="font-medium text-gray-700">{user.responsibility}</span>{' · '}</>
            : null}
          <span>{user.organization || '—'}</span>
          {user.organizationType && (
            <span className="ml-1 text-xs text-gray-400">({user.organizationType})</span>
          )}
        </span>
      </div>

      {/* Row 4: Thana + City */}
      {(user.thana || user.city) && (
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
          <span>
            {[user.thana, user.city].filter(Boolean).join(' · ')}
          </span>
        </div>
      )}

      {/* Row 5: Home Address */}
      {user.address && (
        <div className="flex items-start gap-2 text-xs text-gray-500 mb-2">
          <Home className="w-4 h-4 text-gray-400 shrink-0" />
          <span className="italic">{user.address}</span>
        </div>
      )}

      {/* Row 6: NID */}
      {user.nid && (
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <span className="font-semibold text-gray-400 uppercase tracking-tighter text-[9px]">NID</span>
          <span>{user.nid}</span>
        </div>
      )}

      {/* Row 6b: Job / Profession */}
      {user.jobTitle && (
        <div className="flex items-center gap-2 text-xs mb-2">
          <Landmark className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
          <span>
            <span className="font-semibold text-gray-800">{user.jobTitle}</span>
            {user.jobOrganization && (
              <span className="text-gray-500"> at <span className="text-emerald-700 font-medium">{user.jobOrganization}</span></span>
            )}
          </span>
        </div>
      )}

      {/* Row 6b: Office Address */}
      {user.officeAddress && (
        <div className="flex items-start gap-2 text-xs text-gray-500 mb-3">
          <Building2 className="w-4 h-4 text-gray-400 shrink-0" />
          <span className="italic text-indigo-600/70">{user.officeAddress}</span>
        </div>
      )}

      {/* Row 7: Financials */}
      {(user.monthlyBaitulmalTarget !== undefined || user.yearlyDonationTarget !== undefined) && (
        <div className="bg-gray-50 rounded-lg p-2 mb-3 mt-1 text-[10px] uppercase tracking-tight font-bold">
          <div className="flex justify-between items-center mb-1 border-b border-gray-100 pb-1">
            <span className="text-gray-400">Monthly</span>
            <span className="text-gray-900">
              ৳{user.monthlyBaitulmalTarget} / <span className={user.monthlyBaitulmalStatus === 'Paid' ? 'text-emerald-600' : 'text-amber-600'}>{user.monthlyBaitulmalStatus}</span>
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Yearly</span>
            <span className="text-gray-900">
              ৳{user.yearlyDonationTarget}, <span className="text-red-500">Due: ৳{(user.yearlyDonationTarget || 0) - (user.yearlyDonationPaid || 0)}</span>
            </span>
          </div>
        </div>
      )}

      {/* Row 8: Qualifications */}
      {user.academicQualifications && user.academicQualifications.length > 0 && (
        <div className="mb-3">
          <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">Education</div>
          {user.academicQualifications.map((q: any, i: number) => (
            <div key={i} className="text-[10px] text-gray-600 leading-tight mb-1 last:mb-0">
              <span className="font-bold text-gray-800">{q.year}: </span>
              <span>{q.degree}</span>
              {q.subject && <span className="text-gray-800"> in {q.subject}</span>}
              {q.institution && <span className="text-gray-500"> from {q.institution}</span>}
            </div>
          ))}
        </div>
      )}

      {/* Row 9: Payment History */}
      {user.payments && user.payments.length > 0 && (
        <div className="mb-3 pt-2 border-t border-gray-100">
          <div className="text-[10px] font-bold text-gray-400 uppercase mb-2">Payment History (Last 12 Months)</div>
          <div className="max-h-[150px] overflow-y-auto pr-1">
            <table className="w-full text-[10px]">
              <thead>
                <tr className="text-gray-400 border-b">
                  <th className="text-left py-1 font-medium">Month/Year</th>
                  <th className="text-right py-1 font-medium">Target</th>
                  <th className="text-right py-1 font-medium">Paid</th>
                  <th className="text-center py-1 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {user.payments.slice(0, 12).map((p: any, i: number) => (
                  <tr key={i} className="border-b border-gray-50 last:border-0">
                    <td className="py-1 text-gray-600">{['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][p.month-1]} {p.year}</td>
                    <td className="py-1 text-right text-gray-500">৳{p.allocatedNisab}</td>
                    <td className="py-1 text-right font-medium text-gray-800">৳{p.totalPaid}</td>
                    <td className="py-1 text-center">
                      <span className={`px-1 rounded-sm ${p.totalPaid >= p.allocatedNisab ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
                        {p.totalPaid >= p.allocatedNisab ? 'Paid' : 'Due'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Row 10: Other Positions */}
      {user.positions && user.positions.length > 1 && (
        <div className="pt-2 border-t border-gray-100">
          <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">All Roles</div>
          {user.positions.map((p: any, i: number) => (
            <div key={i} className="text-[10px] text-gray-500 mb-1 last:mb-0">
              <span className="font-medium text-gray-700">{p.positionTitle}</span>
              <span className="text-gray-400"> — {p.organizationName}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
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
                orgType: data.orgType,
                orgName: data.orgName,
                parentOrgId: data.parentOrgId,
              });
              
              if (hasOrgAccess) {
                const levels = ['CENTRAL', 'DIVISION', 'CITY', 'THANA', 'WARD', 'UNIT'];
                const userLevelIndex = levels.indexOf(data.orgType);
                const nextLevelIndex = userLevelIndex !== -1 && userLevelIndex + 1 < levels.length 
                  ? userLevelIndex + 1 
                  : userLevelIndex;
                
                setSelectedLevel(levels[nextLevelIndex]);
                if (nextLevelIndex !== userLevelIndex) {
                  setSelectedOrgId(null);
                } else {
                  setSelectedOrgId(data.organizationId);
                }
              } else {
                setSelectedLevel(data.orgType);
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
            orgType: data.orgType,
            orgName: data.orgName,
            parentOrgId: data.parentOrgId,
          });
          
          if (hasOrgAccess) {
            const levels = ['CENTRAL', 'DIVISION', 'CITY', 'THANA', 'WARD', 'UNIT'];
            const userLevelIndex = levels.indexOf(data.orgType);
            const nextLevelIndex = userLevelIndex !== -1 && userLevelIndex + 1 < levels.length 
              ? userLevelIndex + 1 
              : userLevelIndex;
            
            setSelectedLevel(levels[nextLevelIndex]);
            if (nextLevelIndex !== userLevelIndex) {
              setSelectedOrgId(null);
            } else {
              setSelectedOrgId(data.organizationId);
            }
          } else {
            setSelectedLevel(data.orgType);
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
        const url = hasOrgAccess 
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
    if (!selectedOrgId || !selectedLevel) {
      setUserData({ currentOrgUsers: [], childOrgUsers: [] });
      setLoading(false);
      return;
    }

    async function fetchUsers() {
      const token = await getToken();
      setLoading(true);
      try {
        const res = await fetch(
          `${API_URL}/users/by-organization?orgId=${selectedOrgId}&level=${selectedLevel}`,
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
  }, [selectedOrgId, selectedLevel, getToken]);

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
    if (!hasOrgAccess) return [userContext.orgType];
    
    // Authorized: show all child levels (if exists, else their own level)
    if (userLevelIndex + 1 < levelOptions.length) {
      return levelOptions.slice(userLevelIndex + 1);
    }
    return [userContext.orgType];
  }, [userContext?.orgType, hasOrgAccess]);

  const filteredOrgOptions = useMemo(() => {
    const orgsAtLevel = availableOrgs.filter(o => o.type === selectedLevel);
    
    if (!userContext) return orgsAtLevel;

    if (!hasOrgAccess) {
      if (!userContext.parentOrgId) return orgsAtLevel;
      // Restrict to siblings: same parent as the user's org
      return orgsAtLevel.filter(o => o.parentId === userContext.parentOrgId);
    } else {
      // Authorized: since availableOrgs only contains their descendants 
      // (because we did not use global=true), we can just return all orgs at the selected level
      return orgsAtLevel;
    }
  }, [availableOrgs, selectedLevel, hasOrgAccess, userContext]);

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
              disabled={!hasOrgAccess}
              className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                !hasOrgAccess ? 'bg-gray-50 cursor-not-allowed text-gray-500' : ''
              }`}
            >
              <option value="">Select level...</option>
              {filteredLevelOptions.map(l => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
            {!hasOrgAccess && (
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
              {filteredOrgOptions.map(o => (
                <option key={o.id} value={o.id}>
                  {o.name} {o.parentName ? `(${o.parentName})` : ''}
                </option>
              ))}
            </select>
            {!hasOrgAccess && filteredOrgOptions.length > 0 && (
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
        <ProfilePopover
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


