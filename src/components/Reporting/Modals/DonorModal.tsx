import React, { useState } from 'react';
import { BaseModal } from './BaseModal';

interface DonorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData: any;
  saving: boolean;
}

export const DonorModal: React.FC<DonorModalProps> = ({ 
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
      title="৮. ইয়ানত দাতা (সহযোগী সদস্য/সুধী)" 
      onSave={() => onSave(data)}
      saving={saving}
    >
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
             <label className="block text-sm font-bold text-amber-800 mb-2">নতুন ইয়ানত দাতা (মোট সংখ্যা)</label>
             <input type="number" value={data.newCount || 0} onChange={(e) => handleChange('newCount', parseInt(e.target.value) || 0)} className="w-full border border-amber-200 rounded p-3 text-xl font-bold" />
          </div>
          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
             <label className="block text-sm font-bold text-emerald-800 mb-2">অর্থের পরিমাণ</label>
             <input type="number" value={data.amount || 0} onChange={(e) => handleChange('amount', parseInt(e.target.value) || 0)} className="w-full border border-emerald-200 rounded p-3 text-xl font-bold" />
             <span className="text-xs text-emerald-600 mt-1 block">৳ (Taka)</span>
          </div>
       </div>
    </BaseModal>
  );
};
