import React, { useState } from 'react';
import { BaseModal } from './BaseModal';

interface SocialInstModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData: any;
  saving: boolean;
}

export const SocialInstModal: React.FC<SocialInstModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData = {}, 
  saving 
}) => {
  const [data, setData] = useState(initialData);

  const handleChange = (field: string, value: any) => {
    setData((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <BaseModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="৪. প্রাতিষ্ঠানিক উদ্যোগে সামাজিক কাজ" 
      onSave={() => onSave(data)}
      saving={saving}
    >
       <div className="space-y-6">
          <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
             <label className="block text-sm font-bold text-indigo-800 mb-2">কতটি সামাজিক প্রতিষ্ঠান রয়েছে:</label>
             <input type="number" value={data.totalInstitutions || 0} onChange={(e) => handleChange('totalInstitutions', parseInt(e.target.value) || 0)} className="w-full border border-indigo-200 rounded p-3 text-xl font-bold" />
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-white p-4 border rounded shadow-sm">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">কতটি প্রতিষ্ঠানে সামাজিক কাজ হয়েছে:</label>
                <input type="number" value={data.activeInstitutions || 0} onChange={(e) => handleChange('activeInstitutions', parseInt(e.target.value) || 0)} className="w-full border rounded p-2 text-lg font-bold" />
             </div>
             <div className="bg-white p-4 border rounded shadow-sm">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">কতটি নতুন সামাজিক প্রতিষ্ঠান চালু করা হয়েছে:</label>
                <input type="number" value={data.newInstitutions || 0} onChange={(e) => handleChange('newInstitutions', parseInt(e.target.value) || 0)} className="w-full border rounded p-2 text-lg font-bold" />
             </div>
          </div>
       </div>
    </BaseModal>
  );
};
