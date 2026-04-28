import React, { useState } from 'react';
import { BaseModal } from './BaseModal';

interface SocialGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData: any;
  saving: boolean;
}

export const SocialGroupModal: React.FC<SocialGroupModalProps> = ({ 
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

  const handleTableChange = (rowId: string, subField: string, value: any) => {
    setData((prev: any) => ({
      ...prev,
      activities: {
        ...prev.activities,
        [rowId]: { ...prev.activities?.[rowId], [subField]: value }
      }
    }));
  };

  const leftRows = [
    { id: 'smallDev', label: 'ছোট-ছোট উন্নয়নমূলক কাজ/সামাজিক বিরোধ মীমাংসা', f: ['v1', 'v2'] },
    { id: 'socialEvent', label: 'সামাজিক অনুষ্ঠানে অংশগ্রহণ/সহায়তা প্রদান', f: ['v1', 'v2'] },
    { id: 'humanitarian', label: 'মানবিক সহায়তা / কর্জে হাসানা প্রদান', f: ['v1', 'v2'] },
    { id: 'cleaning', label: 'পরিষ্কার-পরিচ্ছন্নতা/মশক নিধন অভিযান', f: ['v1', 'v2'] },
    { id: 'patientCare', label: 'রোগীর পরিচর্চা / চিকিৎসা সহায়তা প্রদান', f: ['v1', 'v2'] },
    { id: 'bloodDonation', label: 'স্বেচ্ছায় রক্ত দান (কতজন/কতজনকে)', f: ['v1', 'v2'] },
    { id: 'maternityCare', label: 'মাতৃত্বকালীন সময়ে সেবা প্রদান', f: ['val'] },
    { id: 'newbornGift', label: 'নবজাতক গিফট প্রদান', f: ['val'] },
    { id: 'mobileSchool', label: 'ভ্রাম্যমান স্কুল/মক্তব চালু', f: ['val'] },
    { id: 'others', label: 'অন্যান্য', f: ['val'] }
  ];

  const rightRows = [
    { id: 'eduHelp', label: 'শিক্ষা সহায়তা প্রদান (মোট কতজনকে)', f: ['val'] },
    { id: 'techService', label: 'টেকনিক্যাল সেবা প্রদান', f: ['v1', 'v2'] },
    { id: 'onlineService', label: 'অনলাইনের মাধ্যমে সেবা প্রদান', f: ['val'] },
    { id: 'planting', label: 'বৃক্ষরোপণ (মোট কতটি)', f: ['val'] },
    { id: 'awareness', label: 'জনসচেতনতামূলক প্রোগ্রাম', f: ['val'] },
    { id: 'disasterHelp', label: 'দুর্যোগকালীন সহায়তা প্রদান', f: ['val'] },
    { id: 'relief', label: 'ত্রাণ বিতরণ / গোশত বিতরণ', f: ['val'] },
    { id: 'nonMuslimService', label: 'ভিন্নধর্মাবলম্বীদের সেবা প্রদান', f: ['v1', 'v2'] },
    { id: 'funeral', label: 'মাইয়্যেতের গোসল / জানাযায় অংশগ্রহণ', f: ['v1', 'v2'] },
    { id: 'employment', label: 'স্বল্প পুঁজিতে কর্মসংস্থানের সহায়তা', f: ['val'] }
  ];

  return (
    <BaseModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="২. সামষ্টিক/সেবা টীমের মাধ্যমে সামাজিক কাজ" 
      onSave={() => onSave(data)}
      saving={saving}
    >
       <div className="space-y-8">
          <div className="grid grid-cols-3 gap-4">
             <div><label className="text-xs block font-bold">সাধারণ সেবা টীম</label><input type="number" value={data.generalTeamCount || 0} onChange={(e) => handleChange('generalTeamCount', parseInt(e.target.value) || 0)} className="w-full border rounded p-1" /></div>
             <div><label className="text-xs block font-bold">টেকনিক্যাল সেবা টীম</label><input type="number" value={data.technicalTeamCount || 0} onChange={(e) => handleChange('technicalTeamCount', parseInt(e.target.value) || 0)} className="w-full border rounded p-1" /></div>
             <div><label className="text-xs block font-bold">স্বেচ্ছাসেবক টীম</label><input type="number" value={data.volunteerTeamCount || 0} onChange={(e) => handleChange('volunteerTeamCount', parseInt(e.target.value) || 0)} className="w-full border rounded p-1" /></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="space-y-2">
                {leftRows.map(row => (
                   <div key={row.id} className="flex items-center justify-between p-2 border-b text-xs">
                      <span className="w-2/3">{row.label}</span>
                      <div className="flex gap-1">
                         {row.f.map(sub => (
                            <input key={sub} type="number" value={data.activities?.[row.id]?.[sub] || 0} onChange={(e) => handleTableChange(row.id, sub, parseInt(e.target.value) || 0)} className="w-8 border rounded p-0.5 text-center" />
                         ))}
                      </div>
                   </div>
                ))}
             </div>
             <div className="space-y-2">
                {rightRows.map(row => (
                   <div key={row.id} className="flex items-center justify-between p-2 border-b text-xs">
                      <span className="w-2/3">{row.label}</span>
                      <div className="flex gap-1">
                         {row.f.map(sub => (
                            <input key={sub} type="number" value={data.activities?.[row.id]?.[sub] || 0} onChange={(e) => handleTableChange(row.id, sub, parseInt(e.target.value) || 0)} className="w-8 border rounded p-0.5 text-center" />
                         ))}
                      </div>
                   </div>
                ))}
             </div>
          </div>
       </div>
    </BaseModal>
  );
};
