'use client';

import { useEffect, useState } from 'react';
import { Crown, Users, Shield, BookOpen, Loader, Plus, UserMinus, ChevronDown, Trash2 } from 'lucide-react';
import { UserProfilePopover } from '../UserProfilePopover';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

// ─── Position structure per org type ───────────────────────────────────────
export const POSITION_GROUPS: Record<string, { group: string; label: string; description: string; min?: number; max?: number }[]> = {
  UNIT: [
    { group: 'EXECUTIVE', label: 'Executive Committee', description: 'Elected leadership of the unit' },
  ],
  WARD: [
    { group: 'EXECUTIVE', label: 'Executive Committee', description: 'Elected ward leadership' },
    { group: 'TEAM', label: 'Active Team', description: '4–7 most active members', min: 4, max: 7 },
  ],
  THANA: [
    { group: 'EXECUTIVE', label: 'Secretariat', description: 'President, Secretary and Secretariat members' },
    { group: 'KORMO_PORISHODH', label: 'Kormo Porishodh', description: '5–10 senior members', min: 5, max: 10 },
    { group: 'SHURA', label: 'Thana Shura', description: 'Elected by members of this Thana' },
  ],
  CITY: [
    { group: 'EXECUTIVE', label: 'Secretariat', description: 'President, Secretary and Secretariat members' },
    { group: 'KORMO_PORISHODH', label: 'Kormo Porishodh', description: '5–10 senior members', min: 5, max: 10 },
    { group: 'SHURA', label: 'City Shura', description: 'Elected by city members' },
  ],
  CENTRAL: [
    { group: 'EXECUTIVE', label: 'Secretariat', description: 'President, Secretary and Secretariat members' },
    { group: 'KORMO_PORISHODH', label: 'Kormo Porishodh', description: '5–10 senior members', min: 5, max: 10 },
    { group: 'SHURA', label: 'Central Shura', description: 'Elected by all members' },
  ],
};

export const DEFAULT_POSITION_TITLES: Record<string, string[]> = {
  UNIT_EXECUTIVE: ['President', 'Secretary', 'Baitulmal', 'Office', 'Librarian', 'Sports'],
  WARD_EXECUTIVE: ['President', 'Secretary', 'Baitulmal', 'Librarian', 'Sports'],
  WARD_TEAM: ['Team Member'],
  THANA_EXECUTIVE: ['President', 'Secretary', 'Secretariat Member'],
  THANA_KORMO_PORISHODH: ['Kormo Porishodh Member'],
  THANA_SHURA: ['Shura Member'],
  CITY_EXECUTIVE: ['President', 'Secretary', 'Secretariat Member'],
  CITY_KORMO_PORISHODH: ['Kormo Porishodh Member'],
  CITY_SHURA: ['Shura Member'],
  CENTRAL_EXECUTIVE: ['President', 'Secretary', 'Secretariat Member'],
  CENTRAL_KORMO_PORISHODH: ['Kormo Porishodh Member'],
  CENTRAL_SHURA: ['Shura Member'],
};

const GROUP_COLORS: Record<string, { bg: string; border: string; badge: string; icon: React.ReactNode }> = {
  EXECUTIVE: {
    bg: 'bg-blue-50', border: 'border-blue-200', badge: 'bg-blue-100 text-blue-700',
    icon: <Crown className="w-4 h-4 text-blue-600" />,
  },
  TEAM: {
    bg: 'bg-green-50', border: 'border-green-200', badge: 'bg-green-100 text-green-700',
    icon: <Users className="w-4 h-4 text-green-600" />,
  },
  KORMO_PORISHODH: {
    bg: 'bg-amber-50', border: 'border-amber-200', badge: 'bg-amber-100 text-amber-700',
    icon: <Shield className="w-4 h-4 text-amber-600" />,
  },
  SHURA: {
    bg: 'bg-violet-50', border: 'border-violet-200', badge: 'bg-violet-100 text-violet-700',
    icon: <BookOpen className="w-4 h-4 text-violet-600" />,
  },
};

interface OrgMember {
  id: number;
  name: string;
  email: string;
  mobile: string;
  isActive: boolean;
}

interface Position {
  id: number;
  organizationId: number;
  userId: number | null;
  positionTitle: string;
  positionGroup: string;
  notes: string | null;
  isActive: boolean;
  startDate: string | null;
  endDate: string | null;
  user: OrgMember | null;
}

interface OrgPositionsProps {
  organizationId: number;
  organizationType: string;
  organization?: any;
  userOrgId?: number | null;
  userOrgType?: string | null;
  accessToken?: string;
}

export function OrgPositions({ 
  organizationId, 
  organizationType,
  organization,
  userOrgId,
  userOrgType,
  accessToken
}: OrgPositionsProps) {
  const [positions, setPositions] = useState<Position[]>([]);
  const [members, setMembers] = useState<OrgMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [assigningId, setAssigningId] = useState<number | null>(null);
  const [addingGroup, setAddingGroup] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newUserId, setNewUserId] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

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

  const isDirectChild = organization?.parentId === userOrgId;
  const isOwnOrg = organizationId === userOrgId;
  const isCentral = userOrgType === 'CENTRAL';
  const canManage = isDirectChild || isOwnOrg || isCentral;

  const groups = POSITION_GROUPS[organizationType] ?? [];

  useEffect(() => {
    if (organizationId) {
      fetchAll();
    }
  }, [organizationId]);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [posRes, memRes] = await Promise.all([
        fetch(`${API_URL}/org-positions?organizationId=${organizationId}`),
        fetch(`${API_URL}/organization/${organizationId}/members`, {
          headers: getAuthHeader(),
        }),
      ]);
      if (posRes.ok) setPositions(await posRes.json());
      if (memRes.ok) setMembers(await memRes.json());
    } catch (e) {
      setError('Failed to load positions');
    } finally {
      setLoading(false);
    }
  };

  const getAuthHeader = (): Record<string, string> => {
    const token = accessToken || (typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null);
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const seedPositions = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      await fetch(`${API_URL}/org-positions/seed`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ organizationId, orgType: organizationType }),
      });
      await fetchAll();
    } catch (e) {
      setError('Failed to seed positions');
    } finally {
      setSubmitting(false);
    }
  };

  const assignUser = async (positionId: number, userId: number | null) => {
    if (submitting) return;
    setSubmitting(true);
    try {
      await fetch(`${API_URL}/org-positions/${positionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      setAssigningId(null);
      await fetchAll();
    } finally {
      setSubmitting(false);
    }
  };

  const addPosition = async (group: string) => {
    if (!newTitle.trim() || submitting) return;
    setSubmitting(true);
    try {
      await fetch(`${API_URL}/org-positions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organizationId,
          positionTitle: newTitle.trim(),
          positionGroup: group,
          userId: newUserId ? parseInt(newUserId) : undefined,
        }),
      });
      setAddingGroup(null);
      setNewTitle('');
      setNewUserId('');
      await fetchAll();
    } finally {
      setSubmitting(false);
    }
  };

  const removePosition = async (positionId: number) => {
    if (submitting || !confirm('Remove this position slot?')) return;
    setSubmitting(true);
    try {
      await fetch(`${API_URL}/org-positions/${positionId}`, { method: 'DELETE' });
      await fetchAll();
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-10">
        <Loader className="w-6 h-6 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (positions.length === 0) {
    return (
      <div className="text-center py-10">
        <BookOpen className="w-12 h-12 mx-auto text-gray-300 mb-3" />
        <p className="text-gray-500 mb-4">No positions defined yet</p>
        {canManage ? (
          <button
            onClick={seedPositions}
            disabled={submitting}
            className={`px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {submitting ? 'Creating...' : 'Create Default Positions'}
          </button>
        ) : (
          <p className="text-xs text-amber-600 bg-amber-50 px-3 py-1 rounded-full inline-block">
            View-only access for this organization level
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {groups.map(({ group, label, description, min, max }) => {
        const groupPositions = positions.filter((p) => p.positionGroup === group);
        const colors = GROUP_COLORS[group] ?? GROUP_COLORS.EXECUTIVE;
        const filled = groupPositions.filter((p) => p.userId).length;

        return (
          <div key={group} className={`rounded-xl border ${colors.border} ${colors.bg} overflow-hidden`}>
            {/* Group Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-opacity-50" style={{ borderColor: 'inherit' }}>
              <div className="flex items-center gap-2">
                {colors.icon}
                <div>
                  <span className="font-semibold text-gray-900 text-sm">{label}</span>
                  <p className="text-xs text-gray-500">{description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {(min || max) && (
                  <span className="text-xs text-gray-400">
                    {min && max ? `${min}–${max}` : max ? `max ${max}` : `min ${min}`} members
                  </span>
                )}
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${colors.badge}`}>
                  {filled}/{groupPositions.length}
                </span>
              </div>
            </div>

            {/* Positions list */}
            <div className="divide-y divide-gray-100">
              {groupPositions.map((pos) => (
                <div key={pos.id} className="flex items-center gap-3 px-4 py-2.5">
                  <div className="flex-1 min-w-0">
                    <span className={`inline-block text-xs px-2 py-0.5 rounded font-medium mr-2 ${colors.badge}`}>
                      {pos.positionTitle}
                    </span>
                    {pos.user ? (
                      <button
                        onClick={(e) => handleNameClick(e, pos.user)}
                        className="text-sm text-gray-700 font-medium hover:text-indigo-600 transition-colors"
                      >
                        {pos.user.name || pos.user.email}
                      </button>
                    ) : (
                      <span className="text-sm text-gray-400 italic">Vacant</span>
                    )}
                  </div>

                  {/* Assign dropdown */}
                  {assigningId === pos.id ? (
                    <div className="flex items-center gap-1">
                      <select
                        className="text-xs border border-gray-300 rounded px-2 py-1 bg-white"
                        defaultValue=""
                        onChange={(e) => assignUser(pos.id, e.target.value ? parseInt(e.target.value) : null)}
                      >
                        <option value="">— select member —</option>
                        <option value="">Unassign</option>
                        {members.map((m) => (
                          <option key={m.id} value={m.id}>
                            {m.name || m.email}
                          </option>
                        ))}
                      </select>
                      <button onClick={() => setAssigningId(null)} className="text-xs text-gray-400 hover:text-gray-600">✕</button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 shrink-0">
                      {canManage && (
                        <button
                          onClick={() => setAssigningId(pos.id)}
                          className="text-xs px-2 py-1 rounded bg-white border border-gray-200 hover:border-indigo-400 text-gray-600 hover:text-indigo-600 transition-colors"
                          title="Assign member"
                        >
                          <ChevronDown className="w-3 h-3" />
                        </button>
                      )}
                      {canManage && pos.user && (
                        <button
                          onClick={() => assignUser(pos.id, null)}
                          className="text-xs px-1 py-1 rounded hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                          title="Unassign"
                        >
                          <UserMinus className="w-3 h-3" />
                        </button>
                      )}
                      {canManage && (
                        <button
                          onClick={() => removePosition(pos.id)}
                          className="text-xs px-1 py-1 rounded hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                          title="Remove position slot"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Add position row */}
            {canManage && (addingGroup === group ? (
              <div className="px-4 py-2 border-t border-gray-100 flex items-center gap-2 flex-wrap">
                <input
                  type="text"
                  placeholder="Position title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="text-xs border border-gray-300 rounded px-2 py-1 flex-1 min-w-32"
                  list={`titles-${group}`}
                />
                <datalist id={`titles-${group}`}>
                  {(DEFAULT_POSITION_TITLES[`${organizationType}_${group}`] ?? []).map((t) => (
                    <option key={t} value={t} />
                  ))}
                </datalist>
                <select
                  value={newUserId}
                  onChange={(e) => setNewUserId(e.target.value)}
                  className="text-xs border border-gray-300 rounded px-2 py-1"
                >
                  <option value="">No member yet</option>
                  {members.map((m) => (
                    <option key={m.id} value={m.id}>{m.name || m.email}</option>
                  ))}
                </select>
                <button
                  onClick={() => addPosition(group)}
                  disabled={submitting}
                  className={`text-xs px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {submitting ? '...' : 'Add'}
                </button>
                <button onClick={() => { setAddingGroup(null); setNewTitle(''); setNewUserId(''); }}
                  className="text-xs text-gray-400 hover:text-gray-600">
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setAddingGroup(group)}
                className="w-full flex items-center gap-1 px-4 py-2 text-xs text-gray-400 hover:text-indigo-600 hover:bg-white/60 transition-colors border-t border-transparent hover:border-gray-100"
              >
                <Plus className="w-3 h-3" /> Add position slot
              </button>
            ))}
          </div>
        );
      })}

      {error && <p className="text-xs text-red-500">{error}</p>}

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
