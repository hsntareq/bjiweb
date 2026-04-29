import React, { useState } from 'react';
import { BaseModal } from './BaseModal';

interface UnitDawatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData: any;
  saving: boolean;
}

export const UnitDawatModal: React.FC<UnitDawatModalProps> = ({ 
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
      title="১. ইউনিট নিয়মিত গ্রুপভিত্তিক দাওয়াত" 
      onSave={() => onSave(data)}
      saving={saving}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">কতটি গ্রুপ বের হয়েছে</label>
            <input 
              type="number" 
              value={data.groupCount || 0} 
              onChange={(e) => handleChange('groupCount', parseInt(e.target.value) || 0)}
              className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">অংশগ্রহণকারীর সংখ্যা</label>
            <input 
              type="number" 
              value={data.participantCount || 0} 
              onChange={(e) => handleChange('participantCount', parseInt(e.target.value) || 0)}
              className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">কতজনের নিকট দাওয়াত পৌঁছানো হয়েছে</label>
            <input 
              type="number" 
              value={data.reachedCount || 0} 
              onChange={(e) => handleChange('reachedCount', parseInt(e.target.value) || 0)}
              className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">কতজন সহযোগী সদস্য হয়েছেন</label>
            <input 
              type="number" 
              value={data.associateCount || 0} 
              onChange={(e) => handleChange('associateCount', parseInt(e.target.value) || 0)}
              className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
        </div>
      </div>
    </BaseModal>
  );
};
