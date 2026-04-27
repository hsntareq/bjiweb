import React, { useState } from 'react';
import { BaseModal } from './BaseModal';

interface MiscellaneousModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData: any;
  saving: boolean;
}

export const MiscellaneousModal: React.FC<MiscellaneousModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData = {}, 
  saving 
}) => {
  const [data, setData] = useState(initialData);

  const handleChange = (section: string, field: string, value: any) => {
    setData((prev: any) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  return (
    <BaseModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="কর্মসূচি, সফর ও বিবিধ" 
      onSave={() => onSave(data)}
      saving={saving}
    >
      <div className="space-y-8">
        {/* Section 5: Program Implementation */}
        <div className="bg-gray-50 p-4 rounded-xl">
           <h4 className="font-bold text-gray-800 mb-4">৫. কর্মসূচি বাস্তবায়ন:</h4>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                 <label className="block text-xs font-semibold mb-1">কেন্দ্র ঘোষিত কর্মসূচি পালন (সংখ্যা)</label>
                 <input type="number" value={data.programs?.centralCount || 0} onChange={(e) => handleChange('programs', 'centralCount', parseInt(e.target.value) || 0)} className="w-full border rounded-lg p-2" />
              </div>
              <div>
                 <label className="block text-xs font-semibold mb-1">স্থানীয়ভাবে ঘোষিত কর্মসূচি (সংখ্যা)</label>
                 <input type="number" value={data.programs?.localCount || 0} onChange={(e) => handleChange('programs', 'localCount', parseInt(e.target.value) || 0)} className="w-full border rounded-lg p-2" />
              </div>
              <div className="sm:col-span-2">
                 <label className="block text-xs font-semibold mb-1">পোস্টার/লিফলেট/বুকলেট বিতরণ</label>
                 <input type="number" value={data.programs?.distributionCount || 0} onChange={(e) => handleChange('programs', 'distributionCount', parseInt(e.target.value) || 0)} className="w-full border rounded-lg p-2" />
              </div>
           </div>
        </div>

        {/* Section 8: Donors */}
        <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
           <h4 className="font-bold text-indigo-800 mb-4">৮. ইয়ানত দাতা:</h4>
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                 <label className="block text-xs font-semibold mb-1">নতুন ইয়ানত দাতা</label>
                 <input type="number" value={data.donors?.newCount || 0} onChange={(e) => handleChange('donors', 'newCount', parseInt(e.target.value) || 0)} className="w-full border rounded-lg p-2" />
              </div>
              <div>
                 <label className="block text-xs font-semibold mb-1">মোট ইয়ানত দাতা</label>
                 <input type="number" value={data.donors?.totalCount || 0} onChange={(e) => handleChange('donors', 'totalCount', parseInt(e.target.value) || 0)} className="w-full border rounded-lg p-2" />
              </div>
              <div>
                 <label className="block text-xs font-semibold mb-1">সহযোগী সদস্য/সুধী</label>
                 <input type="number" value={data.donors?.associateCount || 0} onChange={(e) => handleChange('donors', 'associateCount', parseInt(e.target.value) || 0)} className="w-full border rounded-lg p-2" />
              </div>
           </div>
        </div>

        {/* Section 10: Safar */}
        <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100">
           <h4 className="font-bold text-amber-800 mb-4">১০. সফর (Tours):</h4>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                 <label className="block text-xs font-semibold mb-1">উর্ধ্বতন দায়িত্বশীলদের সফর সংখ্যা</label>
                 <input type="number" value={data.safars?.higherSafarCount || 0} onChange={(e) => handleChange('safars', 'higherSafarCount', parseInt(e.target.value) || 0)} className="w-full border rounded-lg p-2" />
              </div>
              <div>
                 <label className="block text-xs font-semibold mb-1">ওয়ার্ড সভাপতির সফর সংখ্যা</label>
                 <input type="number" value={data.safars?.presidentSafarCount || 0} onChange={(e) => handleChange('safars', 'presidentSafarCount', parseInt(e.target.value) || 0)} className="w-full border rounded-lg p-2" />
              </div>
           </div>
        </div>

        {/* Section 7: Publication */}
        <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
           <h4 className="font-bold text-emerald-800 mb-4">গ) দাওয়াহ ও প্রকাশনা:</h4>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                 <label className="block text-xs font-semibold mb-1">পাঠাগার/বই/বই বিলি</label>
                 <input type="number" value={data.publication?.bookDistributed || 0} onChange={(e) => handleChange('publication', 'bookDistributed', parseInt(e.target.value) || 0)} className="w-full border rounded-lg p-2" />
              </div>
              <div>
                 <label className="block text-xs font-semibold mb-1">ইউনিটে বই বিলিকেন্দ্র সংখ্যা</label>
                 <input type="number" value={data.publication?.unitCenterCount || 0} onChange={(e) => handleChange('publication', 'unitCenterCount', parseInt(e.target.value) || 0)} className="w-full border rounded-lg p-2" />
              </div>
           </div>
        </div>

      </div>
    </BaseModal>
  );
};
