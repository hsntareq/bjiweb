import React, { useState } from 'react';
import { BaseModal } from './BaseModal';

interface SafarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData: any;
  saving: boolean;
}

export const SafarModal: React.FC<SafarModalProps> = ({ 
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
      title="৭. সফর" 
      onSave={() => onSave(data)}
      saving={saving}
    >
       <div className="space-y-6">
          <div>
             <label className="block text-sm font-bold mb-2">উর্ধ্বতন দায়িত্বশীলদের মোট সফর সংখ্যা</label>
             <input type="number" value={data.higherAuthoritySafar || 0} onChange={(e) => handleChange('higherAuthoritySafar', parseInt(e.target.value) || 0)} className="w-full border rounded p-3 text-lg" />
          </div>
          <div>
             <label className="block text-sm font-bold mb-2">ওয়ার্ড সভাপতির মোট সফর সংখ্যা</label>
             <input type="number" value={data.wardPresidentSafar || 0} onChange={(e) => handleChange('wardPresidentSafar', parseInt(e.target.value) || 0)} className="w-full border rounded p-3 text-lg" />
          </div>
          <div>
             <label className="block text-sm font-bold mb-2">ওয়ার্ড টিম সদস্যদের মোট সফর সংখ্যা</label>
             <input type="number" value={data.teamMemberSafar || 0} onChange={(e) => handleChange('teamMemberSafar', parseInt(e.target.value) || 0)} className="w-full border rounded p-3 text-lg" />
          </div>
       </div>
    </BaseModal>
  );
};
