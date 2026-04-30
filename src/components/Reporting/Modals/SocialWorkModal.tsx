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

  React.useEffect(() => {
    if (isOpen) {
      setData(initialData);
    }
  }, [isOpen]);

  const handleChange = (field: string, value: any) => {
    setData((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDeepChange = (category: string, field: string, value: any) => {
    setData((prev: any) => ({
      ...prev,
      [category]: { ...prev[category], [field]: value }
    }));
  };

  const rowsLeft = [
    { id: 'devWork', label: 'ছোট-ছোট উন্নয়নমূলক কাজ/সামাজিক বিরোধ মীমাংসা' },
    { id: 'socialEvent', label: 'সামাজিক অনুষ্ঠানে অংশগ্রহণসংখ্যা/সহায়তা প্রদান কতজনকে' },
    { id: 'humanitarian', label: 'মানবিক সহায়তা / কর্জে হাসানা প্রদান (মোট কতজনকে)' },
    { id: 'cleaning', label: 'পরিষ্কার-পরিচ্ছন্নতা/মশক নিধন অভিযান (মোট কতটি/সংখ্যা)' },
    { id: 'medical', label: 'রোগীর পরিচর্যা / চিকিৎসা সহায়তা প্রদান (মোট কতজনকে)' },
    { id: 'blood', label: 'স্বেচ্ছায় রক্ত দান (মোট কতজন/কতজনকে)' },
    { id: 'maternity', label: 'মাতৃত্বকালীন সময়ে সেবা প্রদান (মোট কতজনকে)' },
    { id: 'newborn', label: 'নবজাতক গিফট প্রদান (মোট কতজনকে)' },
    { id: 'maktub', label: 'ভ্রম্যামান স্কুল/মক্তব চালু (মোট কতটি)' },
    { id: 'others', label: 'অন্যান্য (বিস্তারিত আলাদা কাগজে দেয়া যাবে)' }
  ];

  const rowsRight = [
    { id: 'education', label: 'শিক্ষা সহায়তা প্রদান (মোট কতজনকে)' },
    { id: 'technical', label: 'টেকনিক্যাল সেবা প্রদান (মোট কতজন/কতজনকে)' },
    { id: 'online', label: 'অনলাইনের মাধ্যমে সেবা প্রদান (মোট কতজনকে)' },
    { id: 'trees', label: 'বৃক্ষরোপন (মোট কতটি)' },
    { id: 'awareness', label: 'জনসচেতনতামূলক প্রোগ্রাম (মোট কতটি)' },
    { id: 'disaster', label: 'দুর্যোগকালীন সহায়তা প্রদান (মোট কতজনকে)' },
    { id: 'relief', label: 'ত্রাণ বিতরণ (মোট কতজনকে)/ গোশত বিতরণ' },
    { id: 'nonMuslim', label: 'ভিন্নধর্মাবলম্বীদের সেবা প্রদান (মোট কতজন/কতজনকে)' },
    { id: 'burial', label: 'মাইয়্যেতের গোসল (কতজনকে)/জানাজায় অংশগ্রহণ (মোট কতটি)' },
    { id: 'employment', label: 'স্বল্প পুঁজিতে কর্মসংস্থানের সহায়তা (কতজনকে)' }
  ];

  return (
    <BaseModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="৪. সমাজ সংস্কার ও সমাজ সেবাঃ" 
      onSave={() => onSave(data)}
      saving={saving}
    >
      <div className="space-y-6 max-h-[70vh] overflow-y-auto p-2">
        {/* Section 1 */}
        <div className="space-y-3">
          <h3 className="font-bold text-sm border-b pb-1">১. ব্যক্তিগত উদ্যোগে সামাজিক কাজ:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <label className="text-xs flex-1">মোট কতজন ব্যক্তিগত উদ্যোগে সামাজিক কাজ করেছেন:</label>
              <input type="number" value={data.personalCount || 0} onChange={(e) => handleChange('personalCount', parseInt(e.target.value) || 0)} className="w-16 border rounded p-1 text-center" />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs flex-1">মোট সেবা প্রাপ্ত সংখ্যা:</label>
              <input type="number" value={data.personalServiceCount || 0} onChange={(e) => handleChange('personalServiceCount', parseInt(e.target.value) || 0)} className="w-16 border rounded p-1 text-center" />
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="space-y-3">
          <h3 className="font-bold text-sm border-b pb-1">২. সামষ্টিক/সেবা টিমের মাধ্যমে সামাজিক কাজ:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
            <div className="flex items-center gap-2">
              <label className="text-xs">সাধারণ সেবা টিম সংখ্যা:</label>
              <input type="number" value={data.generalServiceTeamCount || 0} onChange={(e) => handleChange('generalServiceTeamCount', parseInt(e.target.value) || 0)} className="w-12 border rounded p-1 text-center" />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs">টেকনিক্যাল সেবা টিম সংখ্যা:</label>
              <input type="number" value={data.technicalServiceTeamCount || 0} onChange={(e) => handleChange('technicalServiceTeamCount', parseInt(e.target.value) || 0)} className="w-12 border rounded p-1 text-center" />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs">স্বেচ্ছাসেবক টিম সংখ্যা:</label>
              <input type="number" value={data.volunteerTeamCount || 0} onChange={(e) => handleChange('volunteerTeamCount', parseInt(e.target.value) || 0)} className="w-12 border rounded p-1 text-center" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
            <div className="space-y-1">
              <div className="flex bg-gray-100 p-1 text-[10px] font-bold">
                <div className="flex-1">বিবরণ</div>
                <div className="w-12 text-center">সংখ্যা</div>
              </div>
              {rowsLeft.map(row => (
                <div key={row.id} className="flex items-center border-b border-gray-50 py-0.5">
                  <div className="flex-1 text-[10px]">{row.label}</div>
                  <input type="number" value={data[row.id] || 0} onChange={(e) => handleChange(row.id, parseInt(e.target.value) || 0)} className="w-12 border rounded p-0.5 text-center text-xs" />
                </div>
              ))}
            </div>
            <div className="space-y-1">
              <div className="flex bg-gray-100 p-1 text-[10px] font-bold">
                <div className="flex-1">বিবরণ</div>
                <div className="w-12 text-center">সংখ্যা</div>
              </div>
              {rowsRight.map(row => (
                <div key={row.id} className="flex items-center border-b border-gray-50 py-0.5">
                  <div className="flex-1 text-[10px]">{row.label}</div>
                  <input type="number" value={data[row.id] || 0} onChange={(e) => handleChange(row.id, parseInt(e.target.value) || 0)} className="w-12 border rounded p-0.5 text-center text-xs" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="space-y-3">
          <h3 className="font-bold text-sm border-b pb-1">৩. স্বাস্থ্য ও পরিবার কল্যাণমূলক কাজ:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[10px]">স্বাস্থ্যকর্মী প্রশিক্ষণ প্রোগ্রামে মোট অংশগ্রহণকারী সংখ্যা</label>
              <input type="number" value={data.healthTrainingCount || 0} onChange={(e) => handleChange('healthTrainingCount', parseInt(e.target.value) || 0)} className="w-full border rounded p-1 text-center" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px]">কতজন স্বাস্থ্যসেবা কাজে অংশগ্রহণ করেছেন</label>
              <input type="number" value={data.healthServiceCount || 0} onChange={(e) => handleChange('healthServiceCount', parseInt(e.target.value) || 0)} className="w-full border rounded p-1 text-center" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px]">সেবা প্রাপ্ত সংখ্যা</label>
              <input type="number" value={data.healthBeneficiaryCount || 0} onChange={(e) => handleChange('healthBeneficiaryCount', parseInt(e.target.value) || 0)} className="w-full border rounded p-1 text-center" />
            </div>
          </div>
        </div>

        {/* Section 4 */}
        <div className="space-y-3">
          <h3 className="font-bold text-sm border-b pb-1">৪. প্রাতিষ্ঠানিক উদ্যোগে সামাজিক কাজ:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[10px]">কতটি সামাজিক প্রতিষ্ঠান রয়েছে</label>
              <input type="number" value={data.instTotalCount || 0} onChange={(e) => handleChange('instTotalCount', parseInt(e.target.value) || 0)} className="w-full border rounded p-1 text-center" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px]">কতটি প্রতিষ্ঠানে সামাজিক কাজ হয়েছে</label>
              <input type="number" value={data.instActiveCount || 0} onChange={(e) => handleChange('instActiveCount', parseInt(e.target.value) || 0)} className="w-full border rounded p-1 text-center" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px]">কতটি নতুন সামাজিক প্রতিষ্ঠান চালু করা হয়েছে</label>
              <input type="number" value={data.instNewCount || 0} onChange={(e) => handleChange('instNewCount', parseInt(e.target.value) || 0)} className="w-full border rounded p-1 text-center" />
            </div>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};
