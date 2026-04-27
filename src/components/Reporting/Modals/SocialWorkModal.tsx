import React, { useState } from 'react';
import { BaseModal } from './BaseModal';

interface SocialWorkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData: any;
  saving: boolean;
}

export const SocialWorkModal: React.FC<SocialWorkModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData = {}, 
  saving 
}) => {
  const [data, setData] = useState(initialData);

  const handleTableChange = (rowId: string, value: any) => {
    setData((prev: any) => ({
      ...prev,
      [rowId]: value
    }));
  };

  const rows = [
    { id: 'devWork', label: 'ছোট-ছোট উন্নয়নমূলক কাজ/সামাজিক বিরোধ মীমাংসা' },
    { id: 'socialEvent', label: 'সামাজিক অনুষ্ঠানে অংশগ্রহণ/সহায়তা প্রদান' },
    { id: 'humanitarian', label: 'মানবিক সহায়তা / কর্জে হাসানা প্রদান' },
    { id: 'cleaning', label: 'পরিষ্কার-পরিচ্ছন্নতা/মশক নিধন অভিযান' },
    { id: 'medical', label: 'রোগীর পরিচর্যা / চিকিৎসা সহায়তা প্রদান' },
    { id: 'blood', label: 'স্বেচ্ছায় রক্ত দান' },
    { id: 'maternity', label: 'মাতৃকালীন সময়ে সেবা প্রদান' },
    { id: 'newborn', label: 'নবজাতক গিফট প্রদান' },
    { id: 'maktub', label: 'ভ্রাম্যমাণ স্কুল/মক্তব চালু' },
    { id: 'education', label: 'শিক্ষা সহায়তা প্রদান' },
    { id: 'technical', label: 'টেকনিক্যাল সেবা প্রদান' },
    { id: 'trees', label: 'বৃক্ষরোপণ (মোট কতটি)' },
    { id: 'awareness', label: 'জনসচেতনতামূলক প্রোগ্রাম' },
    { id: 'disaster', label: 'দুর্যোগকালীন সহায়তা প্রদান' },
    { id: 'burial', label: 'মাইয়্যতের গোসল/জানাযায় অংশগ্রহণ' }
  ];

  return (
    <BaseModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="সমাজ সংস্কার ও সমাজ সেবা" 
      onSave={() => onSave(data)}
      saving={saving}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-2">
           <div className="flex bg-gray-100 p-2 rounded-lg text-xs font-bold text-gray-600">
              <div className="flex-1">বিবরণ</div>
              <div className="w-24 text-right">সংখ্যা</div>
           </div>
           {rows.map(row => (
             <div key={row.id} className="flex items-center gap-4 py-2 border-b border-gray-50">
                <div className="flex-1 text-sm text-gray-700">{row.label}</div>
                <input 
                  type="number" 
                  value={data[row.id] || 0} 
                  onChange={(e) => handleTableChange(row.id, parseInt(e.target.value) || 0)} 
                  className="w-24 border border-gray-200 rounded-lg p-2 text-sm text-right"
                />
             </div>
           ))}
        </div>
      </div>
    </BaseModal>
  );
};
