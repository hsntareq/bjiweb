import React, { useState } from 'react';
import { BaseModal } from './BaseModal';

interface PersonalDawatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData: any;
  saving: boolean;
}

export const PersonalDawatModal: React.FC<PersonalDawatModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData = {}, 
  saving 
}) => {
  const [data, setData] = useState(initialData);

  const handleChange = (type: string, field: string, value: any) => {
    setData((prev: any) => ({
      ...prev,
      [type]: { ...prev[type], [field]: value }
    }));
  };

  return (
    <BaseModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="২. ব্যক্তিগত ও টার্গেটভিত্তিক দাওয়াত" 
      onSave={() => onSave(data)}
      saving={saving}
    >
      <div className="space-y-8">
        {/* Rokon Row */}
        <div>
          <h4 className="font-bold text-indigo-600 mb-4 pb-2 border-b border-indigo-50">সদস্য (রুকন)</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">মোট জনশক্তি সংখ্যা</label>
              <input type="number" value={data.rokon?.total || 0} onChange={(e) => handleChange('rokon', 'total', parseInt(e.target.value) || 0)} className="w-full border border-gray-200 rounded-lg p-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">ব্যক্তিগতভাবে কাজ করেছেন</label>
              <input type="number" value={data.rokon?.worked || 0} onChange={(e) => handleChange('rokon', 'worked', parseInt(e.target.value) || 0)} className="w-full border border-gray-200 rounded-lg p-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">কতজনের নিকট পৌঁছানো হয়েছে</label>
              <input type="number" value={data.rokon?.reached || 0} onChange={(e) => handleChange('rokon', 'reached', parseInt(e.target.value) || 0)} className="w-full border border-gray-200 rounded-lg p-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">সহযোগী সদস্য হয়েছেন</label>
              <input type="number" value={data.rokon?.associate || 0} onChange={(e) => handleChange('rokon', 'associate', parseInt(e.target.value) || 0)} className="w-full border border-gray-200 rounded-lg p-2 text-sm" />
            </div>
          </div>
        </div>

        {/* Karmi Row */}
        <div>
          <h4 className="font-bold text-emerald-600 mb-4 pb-2 border-b border-emerald-50">কর্মী</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">মোট জনশক্তি সংখ্যা</label>
              <input type="number" value={data.karmi?.total || 0} onChange={(e) => handleChange('karmi', 'total', parseInt(e.target.value) || 0)} className="w-full border border-gray-200 rounded-lg p-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">ব্যক্তিগতভাবে কাজ করেছেন</label>
              <input type="number" value={data.karmi?.worked || 0} onChange={(e) => handleChange('karmi', 'worked', parseInt(e.target.value) || 0)} className="w-full border border-gray-200 rounded-lg p-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">কতজনের নিকট পৌঁছানো হয়েছে</label>
              <input type="number" value={data.karmi?.reached || 0} onChange={(e) => handleChange('karmi', 'reached', parseInt(e.target.value) || 0)} className="w-full border border-gray-200 rounded-lg p-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">সহযোগী সদস্য হয়েছেন</label>
              <input type="number" value={data.karmi?.associate || 0} onChange={(e) => handleChange('karmi', 'associate', parseInt(e.target.value) || 0)} className="w-full border border-gray-200 rounded-lg p-2 text-sm" />
            </div>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};
