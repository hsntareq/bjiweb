'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Phone, Briefcase, MapPin, Home, Landmark, Building2, Droplets } from 'lucide-react';

export interface UserProfileData {
  id: number;
  fullname: string;
  email: string;
  mobile?: string;
  responsibility?: string | null;
  organization?: string;
  organizationType?: string;
  thana?: string;
  city?: string;
  address?: string;
  nid?: string;
  jobTitle?: string;
  jobOrganization?: string;
  officeAddress?: string;
  photo?: string;
  rank?: string;
  isAdv?: boolean;
  bloodGroup?: string;
  monthlyBaitulmalTarget?: number;
  monthlyBaitulmalStatus?: string;
  yearlyDonationTarget?: number;
  yearlyDonationPaid?: number;
  academicQualifications?: any[];
  payments?: any[];
  positions?: any[];
  [key: string]: any;
}

export const RANK_COLORS: Record<string, string> = {
  'member':    'bg-blue-100 text-blue-800',
  'activist':  'bg-amber-100 text-amber-800',
  'associate': 'bg-purple-100 text-purple-800',
};

export const BLOOD_COLORS: Record<string, string> = {
  'A+': 'bg-red-50 text-red-700 border-red-200',
  'A-': 'bg-red-50 text-red-700 border-red-200',
  'B+': 'bg-orange-50 text-orange-700 border-orange-200',
  'B-': 'bg-orange-50 text-orange-700 border-orange-200',
  'AB+': 'bg-purple-50 text-purple-700 border-purple-200',
  'AB-': 'bg-purple-50 text-purple-700 border-purple-200',
  'O+': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'O-': 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

export function RankBadge({ rank, isAdv }: { rank: string; isAdv?: boolean }) {
  const cls = RANK_COLORS[rank.toLowerCase()] ?? 'bg-gray-100 text-gray-700';
  return (
    <span className="inline-flex items-center gap-1">
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${cls}`}>
        {rank}
      </span>
      {isAdv && (
        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-bold bg-purple-100 text-purple-700 border border-purple-300 uppercase">
          ADV
        </span>
      )}
    </span>
  );
}

export function UserProfilePopover({ user, anchorEl, onClose }: {
  user: UserProfileData;
  anchorEl: HTMLElement;
  onClose: () => void;
}) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const initials = (user.fullname || user.email || 'U')[0].toUpperCase();
  const rankCls = user.rank ? (RANK_COLORS[user.rank.toLowerCase()] ?? 'bg-gray-100 text-gray-700') : '';
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
      className={`fixed z-[9999] w-72 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 animate-in fade-in zoom-in duration-150 ${pos.placeAbove ? '-translate-y-full' : ''}`}
      style={{ top: pos.top, left: pos.left }}
    >
      {/* Close button */}
      <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 p-1 rounded">
        <X className="w-3.5 h-3.5" />
      </button>

      {/* Row 1: Avatar + Name + Rank + Blood group */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm shrink-0 overflow-hidden shadow-inner">
          {user.photo ? (
            <img src={user.photo} alt={user.fullname} className="w-full h-full object-cover" />
          ) : (
            initials
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-gray-900 truncate pr-4">{user.fullname || '—'}</div>
          <div className="flex items-center gap-1.5 mt-1 flex-wrap">
            {user.rank && (
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${rankCls}`}>{user.rank}</span>
            )}
            {user.isAdv && (
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-700 border border-purple-300">ADV</span>
            )}
            {user.bloodGroup && (
              <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold border ${bloodCls}`}>
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
        <Phone className="w-4 h-4 text-indigo-500 shrink-0" />
        <span className="font-medium tracking-tight text-gray-900">{user.mobile || <span className="text-gray-300 italic">No phone</span>}</span>
      </div>

      {/* Row 3: Responsibility + Org */}
      <div className="flex items-start gap-2 text-sm text-gray-600 mb-2">
        <Briefcase className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
        <span>
          {user.responsibility
            ? <><span className="font-semibold text-gray-800">{user.responsibility}</span>{' · '}</>
            : null}
          <span className="text-gray-600">{user.organization || '—'}</span>
          {user.organizationType && (
            <span className="ml-1 text-xs text-gray-400">({user.organizationType})</span>
          )}
        </span>
      </div>

      {/* Row 4: Thana + City */}
      {(user.thana || user.city) && (
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
          <span className="text-gray-600">
            {[user.thana, user.city].filter(Boolean).join(' · ')}
          </span>
        </div>
      )}

      {/* Row 5: Home Address */}
      {user.address && (
        <div className="flex items-start gap-2 text-xs text-gray-500 mb-2">
          <Home className="w-4 h-4 text-amber-500 shrink-0" />
          <span className="italic text-gray-500 leading-snug">{user.address}</span>
        </div>
      )}

      {/* Row 6: NID */}
      {user.nid && (
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <span className="font-bold text-gray-400 uppercase tracking-tighter text-[9px] w-4">NID</span>
          <span className="font-mono">{user.nid}</span>
        </div>
      )}

      {/* Row 6b: Job / Profession */}
      {user.jobTitle && (
        <div className="flex items-center gap-2 text-xs mb-2">
          <Landmark className="w-3.5 h-3.5 text-rose-500 shrink-0" />
          <span>
            <span className="font-semibold text-gray-800">{user.jobTitle}</span>
            {user.jobOrganization && (
              <span className="text-gray-500"> at <span className="text-rose-700 font-medium">{user.jobOrganization}</span></span>
            )}
          </span>
        </div>
      )}

      {/* Row 6b: Office Address */}
      {user.officeAddress && (
        <div className="flex items-start gap-2 text-xs text-gray-500 mb-3 ml-5.5">
          <span className="italic text-indigo-600/70 leading-tight">{user.officeAddress}</span>
        </div>
      )}

      {/* Row 7: Financials */}
      {(user.monthlyBaitulmalTarget !== undefined || user.yearlyDonationTarget !== undefined) && (
        <div className="bg-gray-50 rounded-lg p-2 mb-3 mt-1 text-[10px] uppercase tracking-tight font-bold border border-gray-100">
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
          <div className="text-[10px] font-bold text-gray-400 uppercase mb-1 flex items-center gap-1">
            <span className="w-1 h-1 bg-indigo-400 rounded-full"></span> Education
          </div>
          <div className="space-y-1">
            {user.academicQualifications.map((q: any, i: number) => (
              <div key={i} className="text-[10px] text-gray-600 leading-tight">
                <span className="font-bold text-gray-800">{q.year}: </span>
                <span>{q.degree}</span>
                {q.subject && <span className="text-gray-800 font-medium"> in {q.subject}</span>}
                {q.institution && <span className="text-gray-400"> · {q.institution}</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Row 9: Payment History */}
      {user.payments && user.payments.length > 0 && (
        <div className="mb-3 pt-2 border-t border-gray-100">
          <div className="text-[10px] font-bold text-gray-400 uppercase mb-2 flex items-center gap-1">
            <span className="w-1 h-1 bg-emerald-400 rounded-full"></span> Payments (Last 12)
          </div>
          <div className="max-h-[120px] overflow-y-auto pr-1 scrollbar-thin">
            <table className="w-full text-[10px]">
              <thead>
                <tr className="text-gray-400 border-b text-left">
                  <th className="py-1 font-medium">Month</th>
                  <th className="text-right py-1 font-medium">Target</th>
                  <th className="text-right py-1 font-medium">Paid</th>
                  <th className="text-center py-1 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {user.payments.slice(0, 12).map((p: any, i: number) => (
                  <tr key={i}>
                    <td className="py-1 text-gray-600 font-medium">{['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][p.month-1]} {p.year}</td>
                    <td className="py-1 text-right text-gray-500">৳{p.allocatedNisab}</td>
                    <td className="py-1 text-right font-bold text-gray-900">৳{p.totalPaid}</td>
                    <td className="py-1 text-center">
                      <span className={`px-1.5 py-0.5 rounded-sm font-bold text-[8px] uppercase ${p.totalPaid >= p.allocatedNisab ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-500 border border-red-100'}`}>
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
          <div className="text-[10px] font-bold text-gray-400 uppercase mb-1 flex items-center gap-1">
            <span className="w-1 h-1 bg-blue-400 rounded-full"></span> Other Roles
          </div>
          <div className="space-y-1">
            {user.positions.filter((p: any) => p.isActive).map((p: any, i: number) => (
              <div key={i} className="text-[10px] text-gray-500 leading-tight">
                <span className="font-semibold text-gray-700">{p.positionTitle}</span>
                <span className="text-gray-400"> · {p.organizationName}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
