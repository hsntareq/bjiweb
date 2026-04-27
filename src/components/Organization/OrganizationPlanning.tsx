import React, { useState, useEffect } from 'react';
import { Target, Users, BookOpen, Layers, Coins, Calendar, ChevronLeft, ChevronRight, Save } from 'lucide-react';

interface Planning {
  id?: number;
  year: number;
  month: number;
  dawatTarget: number;
  dawatAchieved: number;
  activistTarget: number;
  activistAchieved: number;
  memberTarget: number;
  memberAchieved: number;
  programTarget: number;
  programAchieved: number;
  programDetails: string;
  donationTarget: number;
  donationAchieved: number;
}

interface OrganizationPlanningProps {
  organizationId: number;
  organizationType: string;
  accessToken: string;
}

export const OrganizationPlanning: React.FC<OrganizationPlanningProps> = ({
  organizationId,
  organizationType,
  accessToken
}) => {
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [plan, setPlan] = useState<Planning>({
    year,
    month,
    dawatTarget: 0,
    dawatAchieved: 0,
    activistTarget: 0,
    activistAchieved: 0,
    memberTarget: 0,
    memberAchieved: 0,
    programTarget: 0,
    programAchieved: 0,
    programDetails: '',
    donationTarget: 0,
    donationAchieved: 0
  });

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const fetchPlan = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:3001/planning/organization/${organizationId}?year=${year}&month=${month}`, {
        headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {}
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          setPlan(data[0]);
        } else {
          // Reset to default
          setPlan({
            year, month,
            dawatTarget: 0, dawatAchieved: 0,
            activistTarget: 0, activistAchieved: 0,
            memberTarget: 0, memberAchieved: 0,
            programTarget: 0, programAchieved: 0,
            programDetails: '',
            donationTarget: 0, donationAchieved: 0
          });
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlan();
  }, [organizationId, year, month, accessToken]);

  const handleSave = async () => {
    try {
      setSaving(true);
      const res = await fetch(`http://localhost:3001/planning`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {})
        },
        body: JSON.stringify({
          organizationId,
          ...plan
        })
      });
      if (res.ok) {
        const data = await res.json();
        setPlan(data);
        alert("Planning saved successfully!");
      }
    } catch (e) {
      console.error(e);
      alert("Failed to save planning");
    } finally {
      setSaving(false);
    }
  };

  const prevMonth = () => {
    if (month === 1) {
      setMonth(12);
      setYear(y => y - 1);
    } else {
      setMonth(m => m - 1);
    }
  };

  const nextMonth = () => {
    if (month === 12) {
      setMonth(1);
      setYear(y => y + 1);
    } else {
      setMonth(m => m + 1);
    }
  };

  const handleChange = (field: keyof Planning, value: any) => {
    setPlan(p => ({ ...p, [field]: value }));
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-indigo-500" />
          <h3 className="font-semibold text-gray-800">Monthly Planning</h3>
        </div>
        
        <div className="flex items-center gap-3">
          <button onClick={prevMonth} className="p-1 hover:bg-gray-200 rounded">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="font-medium text-gray-700 min-w-[120px] text-center">
            {monthNames[month - 1]} {year}
          </span>
          <button onClick={nextMonth} className="p-1 hover:bg-gray-200 rounded">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-6">
        {loading ? (
          <div className="flex justify-center p-8"><div className="animate-spin w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full"></div></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Dawat Section */}
            <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
              <div className="flex items-center gap-2 mb-3 text-amber-700 font-semibold">
                <Users className="w-5 h-5" />
                <h4>Dawat (Invitation)</h4>
              </div>
              <p className="text-sm text-amber-600 mb-3">Target to invite people and increase associates.</p>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-500 mb-1">Target</label>
                  <input type="number" value={plan.dawatTarget} onChange={e => handleChange('dawatTarget', parseInt(e.target.value) || 0)} className="w-full border border-gray-300 rounded p-2 text-sm" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-500 mb-1">Achieved</label>
                  <input type="number" value={plan.dawatAchieved} onChange={e => handleChange('dawatAchieved', parseInt(e.target.value) || 0)} className="w-full border border-gray-300 rounded p-2 text-sm" />
                </div>
              </div>
            </div>

            {/* Activist Section */}
            <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
              <div className="flex items-center gap-2 mb-3 text-emerald-700 font-semibold">
                <Target className="w-5 h-5" />
                <h4>Activist</h4>
              </div>
              <p className="text-sm text-emerald-600 mb-3">Create activists by improving their quality.</p>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-500 mb-1">Target</label>
                  <input type="number" value={plan.activistTarget} onChange={e => handleChange('activistTarget', parseInt(e.target.value) || 0)} className="w-full border border-gray-300 rounded p-2 text-sm" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-500 mb-1">Achieved</label>
                  <input type="number" value={plan.activistAchieved} onChange={e => handleChange('activistAchieved', parseInt(e.target.value) || 0)} className="w-full border border-gray-300 rounded p-2 text-sm" />
                </div>
              </div>
            </div>

            {/* Member Section */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <div className="flex items-center gap-2 mb-3 text-blue-700 font-semibold">
                <BookOpen className="w-5 h-5" />
                <h4>Member</h4>
              </div>
              <p className="text-sm text-blue-600 mb-3">Create members by improving their quality.</p>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-500 mb-1">Target</label>
                  <input type="number" value={plan.memberTarget} onChange={e => handleChange('memberTarget', parseInt(e.target.value) || 0)} className="w-full border border-gray-300 rounded p-2 text-sm" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-500 mb-1">Achieved</label>
                  <input type="number" value={plan.memberAchieved} onChange={e => handleChange('memberAchieved', parseInt(e.target.value) || 0)} className="w-full border border-gray-300 rounded p-2 text-sm" />
                </div>
              </div>
            </div>

            {/* Program Section */}
            <div className="bg-violet-50 rounded-lg p-4 border border-violet-100">
              <div className="flex items-center gap-2 mb-3 text-violet-700 font-semibold">
                <Layers className="w-5 h-5" />
                <h4>Program Planning</h4>
              </div>
              <p className="text-sm text-violet-600 mb-3">Types of programs guided by central organization.</p>
              <div className="flex gap-4 mb-3">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-500 mb-1">Target</label>
                  <input type="number" value={plan.programTarget} onChange={e => handleChange('programTarget', parseInt(e.target.value) || 0)} className="w-full border border-gray-300 rounded p-2 text-sm" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-500 mb-1">Achieved</label>
                  <input type="number" value={plan.programAchieved} onChange={e => handleChange('programAchieved', parseInt(e.target.value) || 0)} className="w-full border border-gray-300 rounded p-2 text-sm" />
                </div>
              </div>
              <div>
                 <label className="block text-xs font-medium text-gray-500 mb-1">Program Details</label>
                 <textarea value={plan.programDetails || ''} onChange={e => handleChange('programDetails', e.target.value)} className="w-full border border-gray-300 rounded p-2 text-sm h-16" placeholder="Describe program plans..."></textarea>
              </div>
            </div>

            {/* Donation Section */}
            <div className="bg-rose-50 rounded-lg p-4 border border-rose-100 md:col-span-2">
              <div className="flex items-center gap-2 mb-3 text-rose-700 font-semibold">
                <Coins className="w-5 h-5" />
                <h4>Donation Collection</h4>
              </div>
              <p className="text-sm text-rose-600 mb-3">Collect monthly donation from members/activists or lower units.</p>
              <div className="flex gap-4 max-w-md">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-500 mb-1">Target Amount (৳)</label>
                  <input type="number" value={plan.donationTarget} onChange={e => handleChange('donationTarget', parseInt(e.target.value) || 0)} className="w-full border border-gray-300 rounded p-2 text-sm" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-500 mb-1">Achieved Amount (৳)</label>
                  <input type="number" value={plan.donationAchieved} onChange={e => handleChange('donationAchieved', parseInt(e.target.value) || 0)} className="w-full border border-gray-300 rounded p-2 text-sm" />
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
      <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
        <button onClick={handleSave} disabled={saving || loading} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 disabled:opacity-50">
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : 'Save Planning'}
        </button>
      </div>
    </div>
  );
};
