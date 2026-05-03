import React, { useState } from 'react';
import { BaseModal } from './BaseModal';

interface DawahPublicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData: any;
  saving: boolean;
}

export const DawahPublicationModal: React.FC<DawahPublicationModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData = {}, 
  saving 
}) => {
  const [data, setData] = useState(initialData);

  React.useEffect(() => {
    if (isOpen) setData(initialData);
  }, [isOpen]);

  const handleChange = (field: string, value: any) => {
    setData((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <BaseModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="গ) দাওয়াহ ও প্রকাশনা" 
      onSave={() => onSave(data)}
      saving={saving}
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
               <h4 className="font-bold mb-3 text-sm">পাঠাগার/ বই/ বই বিলি:</h4>
               <div className="grid grid-cols-3 gap-2">
                  <div><label className="text-xs block font-bold">পাঠাগার</label><input type="number" value={data.libraryCount || 0} onChange={(e) => handleChange('libraryCount', parseInt(e.target.value) || 0)} className="w-full border rounded p-1" /></div>
                  <div><label className="text-xs block font-bold">বই</label><input type="number" value={data.bookCount || 0} onChange={(e) => handleChange('bookCount', parseInt(e.target.value) || 0)} className="w-full border rounded p-1" /></div>
                  <div><label className="text-xs block font-bold">বই বিলি</label><input type="number" value={data.bookDistributedCount || 0} onChange={(e) => handleChange('bookDistributedCount', parseInt(e.target.value) || 0)} className="w-full border rounded p-1" /></div>
               </div>
               <div className="grid grid-cols-3 gap-2 mt-2">
                  <div><label className="text-xs block font-bold">বৃদ্ধি (পাঠাগার)</label><input type="number" value={data.libraryIncrease || 0} onChange={(e) => handleChange('libraryIncrease', parseInt(e.target.value) || 0)} className="w-full border rounded p-1" /></div>
                  <div><label className="text-xs block font-bold">বৃদ্ধি (বই)</label><input type="number" value={data.bookIncrease || 0} onChange={(e) => handleChange('bookIncrease', parseInt(e.target.value) || 0)} className="w-full border rounded p-1" /></div>
                  <div><label className="text-xs block font-bold">বৃদ্ধি (বিলি)</label><input type="number" value={data.bookDistributedIncrease || 0} onChange={(e) => handleChange('bookDistributedIncrease', parseInt(e.target.value) || 0)} className="w-full border rounded p-1" /></div>
               </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
               <h4 className="font-bold mb-3 text-sm">ইউনিটে বই বিলিকেন্দ্র/ইউনিটে বই বিলি:</h4>
               <div className="grid grid-cols-2 gap-2">
                  <div><label className="text-xs block font-bold">বিলিকেন্দ্র</label><input type="number" value={data.unitCenterCount || 0} onChange={(e) => handleChange('unitCenterCount', parseInt(e.target.value) || 0)} className="w-full border rounded p-1" /></div>
                  <div><label className="text-xs block font-bold">বই বিলি</label><input type="number" value={data.unitBookDistributed || 0} onChange={(e) => handleChange('unitBookDistributed', parseInt(e.target.value) || 0)} className="w-full border rounded p-1" /></div>
               </div>
               <div className="grid grid-cols-2 gap-2 mt-2">
                  <div><label className="text-xs block font-bold">বৃদ্ধি (বিলিকেন্দ্র)</label><input type="number" value={data.unitCenterIncrease || 0} onChange={(e) => handleChange('unitCenterIncrease', parseInt(e.target.value) || 0)} className="w-full border rounded p-1" /></div>
                  <div><label className="text-xs block font-bold">বৃদ্ধি (বই বিলি)</label><input type="number" value={data.unitBookDistributedIncrease || 0} onChange={(e) => handleChange('unitBookDistributedIncrease', parseInt(e.target.value) || 0)} className="w-full border rounded p-1" /></div>
               </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
               <h4 className="font-bold mb-3 text-sm">ওয়ার্ডে বই বিক্রয় কেন্দ্র /ওয়ার্ডে বই বিক্রয়:</h4>
               <div className="grid grid-cols-2 gap-2">
                  <div><label className="text-xs block font-bold">বিক্রয় কেন্দ্র</label><input type="number" value={data.wardCenterCount || 0} onChange={(e) => handleChange('wardCenterCount', parseInt(e.target.value) || 0)} className="w-full border rounded p-1" /></div>
                  <div><label className="text-xs block font-bold">বই বিক্রয়</label><input type="number" value={data.wardBookSold || 0} onChange={(e) => handleChange('wardBookSold', parseInt(e.target.value) || 0)} className="w-full border rounded p-1" /></div>
               </div>
               <div className="grid grid-cols-2 gap-2 mt-2">
                  <div><label className="text-xs block font-bold">বৃদ্ধি (বিক্রয় কেন্দ্র)</label><input type="number" value={data.wardCenterIncrease || 0} onChange={(e) => handleChange('wardCenterIncrease', parseInt(e.target.value) || 0)} className="w-full border rounded p-1" /></div>
                  <div><label className="text-xs block font-bold">বৃদ্ধি (বই বিক্রয়)</label><input type="number" value={data.wardBookSoldIncrease || 0} onChange={(e) => handleChange('wardBookSoldIncrease', parseInt(e.target.value) || 0)} className="w-full border rounded p-1" /></div>
               </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
               <h4 className="font-bold mb-3 text-sm">বইয়ের সফট কপি বিলি:</h4>
               <input type="number" value={data.softCopyDistributed || 0} onChange={(e) => handleChange('softCopyDistributed', parseInt(e.target.value) || 0)} className="w-full border rounded p-2" />
            </div>

            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
               <h4 className="font-bold mb-3 text-sm">দাওয়াতী লিংক বিতরণ:</h4>
               <input type="number" value={data.dawatLinkDistributed || 0} onChange={(e) => handleChange('dawatLinkDistributed', parseInt(e.target.value) || 0)} className="w-full border rounded p-2" />
            </div>

            <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
               <h4 className="font-bold mb-3 text-sm">সোনার বাংলা/সংগ্রাম/পৃথিবী কত কপি চলে:</h4>
               <div className="grid grid-cols-3 gap-2">
                  <div><label className="text-xs block font-bold text-amber-700 uppercase">সোনার বাংলা</label><input type="number" value={data.sonarBanglaCount || 0} onChange={(e) => handleChange('sonarBanglaCount', parseInt(e.target.value) || 0)} className="w-full border rounded p-1" /></div>
                  <div><label className="text-xs block font-bold text-amber-700 uppercase">সংগ্রাম</label><input type="number" value={data.sangramCount || 0} onChange={(e) => handleChange('sangramCount', parseInt(e.target.value) || 0)} className="w-full border rounded p-1" /></div>
                  <div><label className="text-xs block font-bold text-amber-700 uppercase">পৃথিবী</label><input type="number" value={data.prithibiCount || 0} onChange={(e) => handleChange('prithibiCount', parseInt(e.target.value) || 0)} className="w-full border rounded p-1" /></div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};
