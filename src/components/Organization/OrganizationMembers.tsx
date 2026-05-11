'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Users, TrendingUp, UserCheck, Loader } from 'lucide-react';
import { UserProfilePopover, RankBadge } from '../UserProfilePopover';

interface TeamMember {
  id: number;
  name: string;
  email: string;
  mobile: string;
  roleId: number;
  canCreateUsers: boolean;
  isActive: boolean;
  rank: string;
  isAdv: boolean;
}

interface TeamStats {
  totalMembers: number;
  activeUsers: number;
  membersByRole: Record<string, number>;
  directMembers: number;
}

interface OrganizationMembersProps {
  organizationId: number;
  organizationType: string;
  accessToken?: string;
}

export function OrganizationMembers({
  organizationId,
  organizationType,
  accessToken = '',
}: OrganizationMembersProps) {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [stats, setStats] = useState<TeamStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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

  useEffect(() => {
    if (organizationId) {
      fetchMembers();
      fetchStats();
    }
  }, [organizationId, accessToken]);

  const fetchMembers = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/organization/${organizationId}/members`,
        {
          headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMembers(Array.isArray(data) ? data : []);
      } else if (response.status !== 401) {
        setError('Failed to load members');
      }
    } catch (err) {
      console.error('Error fetching members:', err);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/organization/${organizationId}/team-stats`,
        {
          headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
        }
      );

      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader className="w-6 h-6 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Members</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalMembers}</p>
              </div>
              <Users className="w-8 h-8 text-blue-400" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeUsers}</p>
              </div>
              <UserCheck className="w-8 h-8 text-green-400" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Direct Members</p>
                <p className="text-2xl font-bold text-gray-900">{stats.directMembers || 0}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-400" />
            </div>
          </div>
        </div>
      )}

      {/* Members Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Persons (Members, Activists, Associates)</h3>
          <p className="text-sm text-gray-600 mt-1">
            {organizationType} level persons ({members.length})
          </p>
        </div>

        {members.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Name</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Email</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Mobile</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Rank</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50 border-t border-gray-200">
                    <td className="px-4 py-3">
                      <button
                        onClick={(e) => handleNameClick(e, member)}
                        className="text-left font-medium text-gray-900 hover:text-indigo-600 focus:outline-none transition-colors"
                      >
                        {member.name || 'N/A'}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs break-all">{member.email}</td>
                    <td className="px-4 py-3 text-gray-600">{member.mobile || 'N/A'}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          member.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {member.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <RankBadge rank={member.rank} isAdv={member.isAdv} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">
            <p>No persons listed in this organization yet</p>
          </div>
        )}
      </div>

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
