'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { Search, Loader, ChevronUp, ChevronDown, Building2, Phone, MapPin, Briefcase, X, Droplets } from 'lucide-react';

interface UserRow {
  id: number;
  fullname: string;
  email: string;
  mobile: string | null;
  bloodGroup: string | null;
  responsibility: string | null;
  organization: string | null;
  organizationId: number | null;
  organizationType: string | null;
  thana: string | null;
  city: string | null;
  rank: string | null;
  isAdv: boolean;
}

interface OrgOption {
  id: number;
  name: string;
  type: string;
  parentId: number | null;
}

const RANK_COLORS: Record<string, string> = {
  member:    'bg-blue-100 text-blue-800',
  activist:  'bg-green-100 text-green-800',
  associate: 'bg-yellow-100 text-yellow-800',
};

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

function RankBadge({ rank, isAdv, blurred }: { rank: string; isAdv: boolean; blurred?: boolean }) {
  const cls = RANK_COLORS[rank] ?? 'bg-gray-100 text-gray-700';
  return (
    <span className={`inline-flex items-center gap-1 transition-all ${blurred ? 'blur-[3px] opacity-60 select-none pointer-events-none' : ''}`}>
      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${cls}`}>{rank}</span>
      {isAdv && (
        <span className="px-1.5 py-0.5 rounded text-xs font-bold bg-purple-100 text-purple-700 border border-purple-300">ADV</span>
      )}
    </span>
  );
}

function ProfilePopover({ user, anchorRect, onClose }: {
  user: UserRow;
  anchorRect: DOMRect;
  onClose: () => void;
}) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const initials = (user.fullname || user.email || 'U')[0].toUpperCase();
  const rankCls = user.rank ? (RANK_COLORS[user.rank] ?? 'bg-gray-100 text-gray-700') : '';
  const bloodCls = user.bloodGroup ? (BLOOD_COLORS[user.bloodGroup] ?? 'bg-gray-50 text-gray-700 border-gray-200') : '';

  // Position: prefer below, flip up if not enough space
  const spaceBelow = window.innerHeight - anchorRect.bottom;
  const placeAbove = spaceBelow < 200;
  const top = placeAbove
    ? anchorRect.top + window.scrollY - 8
    : anchorRect.bottom + window.scrollY + 8;
  const left = Math.min(anchorRect.left + window.scrollX, window.innerWidth - 320);

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
      className={`fixed z-50 w-72 bg-white rounded-xl shadow-xl border border-gray-200 p-4 ${placeAbove ? '-translate-y-full' : ''}`}
      style={{ top, left }}
    >
      {/* Close button */}
      <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 p-1 rounded">
        <X className="w-3.5 h-3.5" />
      </button>

      {/* Row 1: Avatar + Name + Rank + Blood group */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm shrink-0">
          {initials}
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
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
          <span>
            {[user.thana, user.city].filter(Boolean).join(' · ')}
          </span>
        </div>
      )}
    </div>
  );
}

type SortKey = 'fullname' | 'email' | 'organization' | 'rank' | 'responsibility';

const POSITION_LABELS: Record<string, string> = {
  president: 'President',
  secretary: 'Secretary',
  baitulmal: 'Baitulmal',
  office:    'Office Secretary',
};

interface Filters {
  orgId: number | null;
  member: boolean;
  activist: boolean;
  advActivist: boolean;
  associate: boolean;
  advAssociate: boolean;
  noRank: boolean;
  president: boolean;
  secretary: boolean;
  baitulmal: boolean;
  office: boolean;
}

const DEFAULT_FILTERS: Filters = {
  orgId: null,
  member: true,
  activist: true,
  advActivist: false,
  associate: true,
  advAssociate: false,
  noRank: true,
  president: true,
  secretary: true,
  baitulmal: true,
  office: true,
};

export default function DevUsersClient() {
  const [allUsers, setAllUsers] = useState<UserRow[]>([]);
  const [orgs, setOrgs] = useState<OrgOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('organization');
  const [sortAsc, setSortAsc] = useState(true);
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [popoverUser, setPopoverUser] = useState<UserRow | null>(null);
  const [popoverAnchor, setPopoverAnchor] = useState<DOMRect | null>(null);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  // Fetch orgs (child-level only: WARD + UNIT)
  useEffect(() => {
    fetch('http://localhost:3001/organization')
      .then(r => r.ok ? r.json() : [])
      .then((data: OrgOption[]) => {
        const childOrgs = data.filter(o => o.type === 'WARD' || o.type === 'UNIT');
        setOrgs(childOrgs);
      })
      .catch(() => setOrgs([]));
  }, []);

  const fetchUsers = useCallback(async (q: string) => {
    setLoading(true);
    setError(null);
    try {
      const url = q
        ? `http://localhost:3001/users?search=${encodeURIComponent(q)}`
        : 'http://localhost:3001/users';
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: UserRow[] = await res.json();
      setAllUsers(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load users');
      setAllUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers(debouncedSearch);
  }, [debouncedSearch, fetchUsers]);

  const setFilter = <K extends keyof Filters>(key: K, val: Filters[K]) =>
    setFilters(f => ({ ...f, [key]: val }));

  const positionOf = (u: UserRow): string | null => {
    const r = (u.responsibility || '').toLowerCase();
    if (r.includes('president')) return 'president';
    if (r.includes('baitulmal')) return 'baitulmal';
    if (r.includes('office secretary')) return 'office';
    if (r.includes('secretary')) return 'secretary';
    return null;
  };

  // Filtering + blur logic
  const processed = allUsers
    .filter(u => {
      if (filters.orgId !== null && u.organizationId !== filters.orgId) return false;
      return true;
    })
    .map(u => {
      const rank = u.rank;
      const pos = positionOf(u);
      const isPositional = pos !== null;

      let visible = false;
      let blurAdv = false;

      if (!rank) {
        visible = filters.noRank;
      } else if (rank === 'member') {
        visible = filters.member || (isPositional && filters[pos!] !== false);
      } else if (rank === 'activist') {
        if (u.isAdv) {
          visible = filters.activist;
          blurAdv = !filters.advActivist;
        } else {
          visible = filters.activist || (isPositional && filters[pos!] !== false);
        }
      } else if (rank === 'associate') {
        if (u.isAdv) {
          visible = filters.associate;
          blurAdv = !filters.advAssociate;
        } else {
          visible = filters.associate || (isPositional && filters[pos!] !== false);
        }
      }

      if (isPositional && filters[pos!] !== false) visible = true;

      return { ...u, visible, blurAdv };
    })
    .filter(u => u.visible);

  const sorted = [...processed].sort((a, b) => {
    const av = (a[sortKey] ?? '').toString().toLowerCase();
    const bv = (b[sortKey] ?? '').toString().toLowerCase();
    return sortAsc ? av.localeCompare(bv) : bv.localeCompare(av);
  });

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(a => !a);
    else { setSortKey(key); setSortAsc(true); }
  };

  const handleNameClick = (e: React.MouseEvent, user: UserRow) => {
    if (popoverUser?.id === user.id) {
      setPopoverUser(null);
      setPopoverAnchor(null);
    } else {
      setPopoverUser(user);
      setPopoverAnchor((e.currentTarget as HTMLElement).getBoundingClientRect());
    }
  };

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ChevronUp className="w-3 h-3 opacity-20" />;
    return sortAsc ? <ChevronUp className="w-3 h-3 text-indigo-600" /> : <ChevronDown className="w-3 h-3 text-indigo-600" />;
  };

  const thCls = 'px-4 py-3 font-semibold text-left cursor-pointer select-none hover:text-indigo-700';

  const wardOrgs = orgs.filter(o => o.type === 'WARD').sort((a,b) => a.name.localeCompare(b.name));
  const unitOrgs = orgs.filter(o => o.type === 'UNIT').sort((a,b) => a.name.localeCompare(b.name));

  return (
    <div className="space-y-4">
      {/* Popover portal */}
      {popoverUser && popoverAnchor && (
        <ProfilePopover
          user={popoverUser}
          anchorRect={popoverAnchor}
          onClose={() => { setPopoverUser(null); setPopoverAnchor(null); }}
        />
      )}

      {/* Search + Org filter row */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, email, organization…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            autoFocus
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg leading-none">×</button>
          )}
        </div>

        {/* Org filter */}
        <div className="relative min-w-[200px]">
          <Building2 className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <select
            value={filters.orgId ?? ''}
            onChange={e => setFilter('orgId', e.target.value ? parseInt(e.target.value) : null)}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm appearance-none bg-white"
          >
            <option value="">All Organizations</option>
            <optgroup label="— Wards —">
              {wardOrgs.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
            </optgroup>
            <optgroup label="— Units —">
              {unitOrgs.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
            </optgroup>
          </select>
        </div>

        <span className="text-sm text-gray-500 whitespace-nowrap ml-auto">
          {loading ? 'Loading…' : `${sorted.length} / ${allUsers.length} users`}
        </span>
      </div>

      {/* Filter checkboxes */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm px-4 py-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Rank:</span>

          <label className="flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" checked={filters.member} onChange={e => setFilter('member', e.target.checked)} className="accent-blue-500" />
            <span className="text-blue-700 font-medium">Member</span>
          </label>

          <span className="flex items-center gap-1.5">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" checked={filters.activist} onChange={e => setFilter('activist', e.target.checked)} className="accent-green-500" />
              <span className="text-green-700 font-medium">Activist</span>
            </label>
            {filters.activist && (
              <label className="flex items-center gap-1 cursor-pointer ml-1">
                <input type="checkbox" checked={filters.advActivist} onChange={e => setFilter('advActivist', e.target.checked)} className="accent-purple-500" />
                <span className="text-purple-600 text-xs font-bold">ADV</span>
              </label>
            )}
          </span>

          <span className="flex items-center gap-1.5">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" checked={filters.associate} onChange={e => setFilter('associate', e.target.checked)} className="accent-yellow-500" />
              <span className="text-yellow-700 font-medium">Associate</span>
            </label>
            {filters.associate && (
              <label className="flex items-center gap-1 cursor-pointer ml-1">
                <input type="checkbox" checked={filters.advAssociate} onChange={e => setFilter('advAssociate', e.target.checked)} className="accent-purple-500" />
                <span className="text-purple-600 text-xs font-bold">ADV</span>
              </label>
            )}
          </span>

          <label className="flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" checked={filters.noRank} onChange={e => setFilter('noRank', e.target.checked)} className="accent-gray-400" />
            <span className="text-gray-600">No rank</span>
          </label>
        </div>

        <div className="w-px bg-gray-200 self-stretch hidden sm:block" />

        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Position:</span>
          {(['president','secretary','baitulmal','office'] as const).map(pos => (
            <label key={pos} className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" checked={filters[pos]} onChange={e => setFilter(pos, e.target.checked)} className="accent-indigo-500" />
              <span className="text-gray-700 capitalize">{POSITION_LABELS[pos]}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-16"><Loader className="w-8 h-8 animate-spin text-indigo-500" /></div>
        ) : error ? (
          <div className="py-16 text-center text-red-500">
            <p className="font-medium">Failed to load users</p>
            <p className="text-sm mt-1 text-red-400">{error}</p>
            <button onClick={() => fetchUsers(debouncedSearch)} className="mt-3 text-sm text-indigo-600 underline">Retry</button>
          </div>
        ) : sorted.length === 0 ? (
          <div className="py-16 text-center text-gray-400">No users match the current filters</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 text-xs uppercase tracking-wider">
                <tr>
                  <th className={thCls} onClick={() => handleSort('fullname')}>
                    <span className="inline-flex items-center gap-1">Name <SortIcon col="fullname" /></span>
                  </th>
                  <th className={thCls} onClick={() => handleSort('email')}>
                    <span className="inline-flex items-center gap-1">Email <SortIcon col="email" /></span>
                  </th>
                  <th className={thCls} onClick={() => handleSort('rank')}>
                    <span className="inline-flex items-center gap-1">Rank <SortIcon col="rank" /></span>
                  </th>
                  <th className={thCls} onClick={() => handleSort('responsibility')}>
                    <span className="inline-flex items-center gap-1">Position <SortIcon col="responsibility" /></span>
                  </th>
                  <th className={thCls} onClick={() => handleSort('organization')}>
                    <span className="inline-flex items-center gap-1">Organization <SortIcon col="organization" /></span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sorted.map(user => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      <button
                        onClick={e => handleNameClick(e, user)}
                        className={`flex items-center gap-2 text-left hover:text-indigo-700 focus:outline-none focus:text-indigo-700 transition-colors ${popoverUser?.id === user.id ? 'text-indigo-700' : ''}`}
                        title="Click to view profile"
                      >
                        <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs shrink-0">
                          {(user.fullname || user.email || 'U')[0].toUpperCase()}
                        </div>
                        <span className={user.blurAdv ? 'blur-[3px] select-none' : ''}>{user.fullname || <span className="text-gray-400">—</span>}</span>
                      </button>
                    </td>
                    <td className={`px-4 py-3 text-gray-500 ${user.blurAdv ? 'blur-[3px] select-none' : ''}`}>{user.email}</td>
                    <td className="px-4 py-3">
                      {user.rank
                        ? <RankBadge rank={user.rank} isAdv={user.isAdv} blurred={user.blurAdv} />
                        : <span className="text-gray-300">—</span>}
                    </td>
                    <td className="px-4 py-3 text-gray-500">{user.responsibility || <span className="text-gray-300">—</span>}</td>
                    <td className="px-4 py-3">
                      <span className="text-gray-700 font-medium">{user.organization || <span className="text-gray-300">—</span>}</span>
                      {user.organizationType && (
                        <span className="ml-1.5 text-xs text-gray-400">{user.organizationType}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
