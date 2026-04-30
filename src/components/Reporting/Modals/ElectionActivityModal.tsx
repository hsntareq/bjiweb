import React, { useState } from 'react';
import { BaseModal } from './BaseModal';

interface ElectionActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData: any;
  saving: boolean;
}

export const ElectionActivityModal: React.FC<ElectionActivityModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData = {}, 
  saving 
}) => {
  const [data, setData] = useState(initialData);

  React.useEffect(() => {
    if (isOpen) {
      setData(initialData);
    }
  }, [isOpen]);

  const handleChange = (field: string, value: any) => {
    setData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleDeepChange = (section: string, rowId: string, field: string, value: any) => {
    setData((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [rowId]: { ...prev[section]?.[rowId], [field]: value }
      }
    }));
  };

  return (
    <BaseModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="৪. জাতীয় ও স্থানীয় নির্বাচনভিত্তিক কার্যক্রম" 
      onSave={() => onSave(data)}
      saving={saving}
    >
       <div className="space-y-8 text-xs">
          {/* কাউন্সিলর */}
          <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
             <h4 className="font-bold mb-3">নির্বাচনের ধরণ: কাউন্সিলর</h4>
             <div className="grid grid-cols-3 gap-4">
                <div>
                   <label className="block font-bold mb-1">মোট প্রার্থী সংখ্যা</label>
                   <input type="number" value={data.councilor?.candidateCount?.val || 0} onChange={(e) => handleDeepChange('councilor', 'candidateCount', 'val', parseInt(e.target.value) || 0)} className="w-full border rounded p-2" />
                </div>
                <div>
                   <label className="block font-bold mb-1">নির্বাচিত সংখ্যা</label>
                   <input type="number" value={data.councilor?.electedCount?.val || 0} onChange={(e) => handleDeepChange('councilor', 'electedCount', 'val', parseInt(e.target.value) || 0)} className="w-full border rounded p-2" />
                </div>
                <div>
                   <label className="block font-bold mb-1">দ্বিতীয় অবস্থান</label>
                   <input type="number" value={data.councilor?.secondPlaceCount?.val || 0} onChange={(e) => handleDeepChange('councilor', 'secondPlaceCount', 'val', parseInt(e.target.value) || 0)} className="w-full border rounded p-2" />
                </div>
             </div>
          </div>

          {/* Preparatory */}
          <div className="overflow-x-auto">
             <table className="w-full border-collapse">
                <thead>
                   <tr className="bg-gray-100">
                      <th className="p-2 text-left">প্রস্তুতিমূলক কার্যক্রমের ধরণ</th>
                      <th className="p-2 text-center">সংখ্যা</th>
                      <th className="p-2 text-center">বৃদ্ধি</th>
                      <th className="p-2 text-center">টার্গেট</th>
                   </tr>
                </thead>
                <tbody>
                   {[
                      { id: 'voteCenter', label: 'ভোট কেন্দ্র (জাতীয়/স্থানীয়)' },
                      { id: 'voteCenterCommittee', label: 'ভোট কেন্দ্র কমিটি/কেন্দ্র/বুথভিত্তিক ইউনিট' }
                   ].map(row => (
                      <tr key={row.id} className="border-b">
                         <td className="p-2 font-medium">{row.label}</td>
                         <td className="p-2"><input type="number" value={data.preparatory?.[row.id]?.count || 0} onChange={(e) => handleDeepChange('preparatory', row.id, 'count', parseInt(e.target.value) || 0)} className="w-16 border rounded p-1 text-center mx-auto block" /></td>
                         <td className="p-2"><input type="number" value={data.preparatory?.[row.id]?.increase || 0} onChange={(e) => handleDeepChange('preparatory', row.id, 'increase', parseInt(e.target.value) || 0)} className="w-16 border rounded p-1 text-center mx-auto block" /></td>
                         <td className="p-2"><input type="number" value={data.preparatory?.[row.id]?.target || 0} onChange={(e) => handleDeepChange('preparatory', row.id, 'target', parseInt(e.target.value) || 0)} className="w-16 border rounded p-1 text-center mx-auto block" /></td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>

          <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
             <label className="block font-bold mb-2 uppercase text-xs text-emerald-800">ওয়ার্ডভিত্তিক নির্বাচন পরিচালনা কমিটির বৈঠক সংখ্যা:</label>
             <input type="number" value={data.electionCommitteeMeetingCount || 0} onChange={(e) => handleChange('electionCommitteeMeetingCount', parseInt(e.target.value) || 0)} className="w-full border border-emerald-200 rounded p-3 text-lg font-bold" />
             <span className="text-[10px] text-emerald-600 mt-1 block italic">Variable: {"{{electionCommitteeMeetingCount}}"}</span>
          </div>
       </div>
    </BaseModal>
  );
};
