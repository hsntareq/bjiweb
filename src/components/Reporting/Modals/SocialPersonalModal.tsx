import React, { useState } from 'react';
import { BaseModal } from './BaseModal';

interface SocialPersonalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData: any;
  saving: boolean;
}

export const SocialPersonalModal: React.FC<SocialPersonalModalProps> = ({ 
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

  return (
    <BaseModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="১. ব্যক্তিগত উদ্যোগে সামাজিক কাজ" 
      onSave={() => onSave(data)}
      saving={saving}
    >
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
             <label className="block text-sm font-bold text-blue-800 mb-2">মোট কতজন ব্যক্তিগত উদ্যোগে সামাজিক কাজ করেছেন:</label>
             <input type="number" value={data.workerCount || 0} onChange={(e) => handleChange('workerCount', parseInt(e.target.value) || 0)} className="w-full border border-blue-200 rounded p-3 text-xl font-bold" />
          </div>
          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
             <label className="block text-sm font-bold text-emerald-800 mb-2">মোট সেবাপ্রাপ্ত সংখ্যা:</label>
             <input type="number" value={data.beneficiaryCount || 0} onChange={(e) => handleChange('beneficiaryCount', parseInt(e.target.value) || 0)} className="w-full border border-emerald-200 rounded p-3 text-xl font-bold" />
          </div>
       </div>
    </BaseModal>
  );
};
