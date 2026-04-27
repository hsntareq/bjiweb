import React, { useState } from 'react';
import { BaseModal } from './BaseModal';

interface StudentJoiningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData: any;
  saving: boolean;
}

export const StudentJoiningModal: React.FC<StudentJoiningModalProps> = ({ 
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
      title="৬. বিদায়ী ছাত্র জনশক্তির সংগঠনে যোগদান" 
      onSave={() => onSave(data)}
      saving={saving}
    >
       <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4 text-sm font-bold text-center">
             <div>সদস্য</div><div>সাথী</div><div>কর্মী</div>
          </div>
          <div className="grid grid-cols-3 gap-4">
             <input type="number" value={data.rokonCount || 0} onChange={(e) => handleChange('rokonCount', parseInt(e.target.value) || 0)} className="border rounded p-3 text-center text-xl" />
             <input type="number" value={data.companionCount || 0} onChange={(e) => handleChange('companionCount', parseInt(e.target.value) || 0)} className="border rounded p-3 text-center text-xl" />
             <input type="number" value={data.karmiCount || 0} onChange={(e) => handleChange('karmiCount', parseInt(e.target.value) || 0)} className="border rounded p-3 text-center text-xl" />
          </div>
       </div>
    </BaseModal>
  );
};
