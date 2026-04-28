import React, { useState } from 'react';
import { BaseModal } from './BaseModal';

interface SocialHealthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData: any;
  saving: boolean;
}

export const SocialHealthModal: React.FC<SocialHealthModalProps> = ({ 
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
      title="৩. স্বাস্থ্য ও পরিবার কল্যাণমূলক কাজ" 
      onSave={() => onSave(data)}
      saving={saving}
    >
       <div className="space-y-6">
          <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
             <label className="block text-sm font-bold text-amber-800 mb-2">স্বাস্থ্যকর্মী প্রশিক্ষণ প্রোগ্রামে মোট অংশগ্রহণকারী সংখ্যা:</label>
             <input type="number" value={data.trainingParticipantCount || 0} onChange={(e) => handleChange('trainingParticipantCount', parseInt(e.target.value) || 0)} className="w-full border border-amber-200 rounded p-3 text-xl" />
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-white p-4 border rounded shadow-sm">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">কতজন স্বাস্থ্যসেবা কাজে অংশগ্রহণ করেছেন:</label>
                <input type="number" value={data.serviceParticipantCount || 0} onChange={(e) => handleChange('serviceParticipantCount', parseInt(e.target.value) || 0)} className="w-full border rounded p-2 text-lg font-bold" />
             </div>
             <div className="bg-white p-4 border rounded shadow-sm">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">সেবাপ্রাপ্ত সংখ্যা:</label>
                <input type="number" value={data.beneficiaryCount || 0} onChange={(e) => handleChange('beneficiaryCount', parseInt(e.target.value) || 0)} className="w-full border rounded p-2 text-lg font-bold" />
             </div>
          </div>
       </div>
    </BaseModal>
  );
};
