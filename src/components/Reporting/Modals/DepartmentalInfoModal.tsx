import React, { useState } from 'react';
import { BaseModal } from './BaseModal';

interface DepartmentalInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData: any;
  saving: boolean;
}

export const DepartmentalInfoModal: React.FC<DepartmentalInfoModalProps> = ({ 
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

  const handleChange = (section: string, field: string, value: any) => {
    setData((prev: any) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const handleTableChange = (section: string, rowId: string, field: string, value: any) => {
    setData((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [rowId]: { ...prev[section]?.[rowId], [field]: value }
      }
    }));
  };

  return (
    <BaseModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="খ) বিভাগ ভিত্তিক তথ্য" 
      onSave={() => onSave(data)}
      saving={saving}
    >
      <div className="space-y-10">
        {/* 1. Quran Talim */}
        <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
          <h4 className="font-bold text-blue-800 mb-4 underline">১. তা&apos;লীমুল কুরআনের মাধ্যমে দাওয়াত:</h4>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1">কুরআন শিক্ষা প্রদান করেছেন (রুকন)</label>
                <input type="number" value={data.quranTalim?.rokonTeacherCount || 0} onChange={(e) => handleChange('quranTalim', 'rokonTeacherCount', parseInt(e.target.value) || 0)} className="w-full border rounded-lg p-2" />
                <span className="text-[10px] text-blue-400 mt-1 block italic">Var: {"{{"}quranTeacherRokon{"}}"}</span>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">কুরআন শিক্ষা প্রদান করেছেন (কর্মী)</label>
                <input type="number" value={data.quranTalim?.karmiTeacherCount || 0} onChange={(e) => handleChange('quranTalim', 'karmiTeacherCount', parseInt(e.target.value) || 0)} className="w-full border rounded-lg p-2" />
                <span className="text-[10px] text-blue-400 mt-1 block italic">Var: {"{{"}quranTeacherKarmi{"}}"}</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
               <div>
                <label className="block text-xs font-semibold mb-1">কুরআন শিক্ষার গ্রুপ</label>
                <input type="number" value={data.quranTalim?.groupCount || 0} onChange={(e) => handleChange('quranTalim', 'groupCount', parseInt(e.target.value) || 0)} className="w-full border rounded-lg p-2" />
                <span className="text-[10px] text-blue-400 mt-1 block italic">Var: {"{{"}quranGroupCount{"}}"}</span>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">মক্তব/ফোরকানিয়া মাদ্রাসা</label>
                <input type="number" value={data.quranTalim?.maktubCount || 0} onChange={(e) => handleChange('quranTalim', 'maktubCount', parseInt(e.target.value) || 0)} className="w-full border rounded-lg p-2" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">সহীহ তিলাওয়াত শিখেছেন</label>
                <input type="number" value={data.quranTalim?.sahihLearnedCount || 0} onChange={(e) => handleChange('quranTalim', 'sahihLearnedCount', parseInt(e.target.value) || 0)} className="w-full border rounded-lg p-2" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div>
                <label className="block text-xs font-semibold mb-1">দাওয়াত পৌঁছানো হয়েছে (জন)</label>
                <input type="number" value={data.quranTalim?.reachedCount || 0} onChange={(e) => handleChange('quranTalim', 'reachedCount', parseInt(e.target.value) || 0)} className="w-full border rounded-lg p-2" />
                <span className="text-[10px] text-blue-400 mt-1 block italic">Var: {"{{"}quranReachedCount{"}}"}</span>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">সহযোগী সদস্য হয়েছেন</label>
                <input type="number" value={data.quranTalim?.associateCount || 0} onChange={(e) => handleChange('quranTalim', 'associateCount', parseInt(e.target.value) || 0)} className="w-full border rounded-lg p-2" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div>
                <label className="block text-xs font-semibold mb-1">মুয়াল্লিম সংখ্যা</label>
                <input type="number" value={data.quranTalim?.muallimCount || 0} onChange={(e) => handleChange('quranTalim', 'muallimCount', parseInt(e.target.value) || 0)} className="w-full border rounded-lg p-2" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">বৃদ্ধি সংখ্যা</label>
                <input type="number" value={data.quranTalim?.muallimIncreaseCount || 0} onChange={(e) => handleChange('quranTalim', 'muallimIncreaseCount', parseInt(e.target.value) || 0)} className="w-full border rounded-lg p-2" />
              </div>
            </div>
          </div>
        </div>

        {/* 2. Mahalla */}
        <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100">
          <h4 className="font-bold text-amber-800 mb-4 underline">২. মহল্লাভিত্তিক দাওয়াত:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1">সরকারি হিসাবে মহল্লা সংখ্যা</label>
              <input type="number" value={data.mahalla?.govtCount || 0} onChange={(e) => handleChange('mahalla', 'govtCount', parseInt(e.target.value) || 0)} className="w-full border rounded-lg p-2" />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">বৃদ্ধি সংখ্যা</label>
              <input type="number" value={data.mahalla?.govtIncreaseCount || 0} onChange={(e) => handleChange('mahalla', 'govtIncreaseCount', parseInt(e.target.value) || 0)} className="w-full border rounded-lg p-2" />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">মহল্লা কমিটি সংখ্যা</label>
              <input type="number" value={data.mahalla?.committeeCount || 0} onChange={(e) => handleChange('mahalla', 'committeeCount', parseInt(e.target.value) || 0)} className="w-full border rounded-lg p-2" />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">দাওয়াতের অন্তর্ভুক্ত মহল্লা</label>
              <input type="number" value={data.mahalla?.specialDawatCount || 0} onChange={(e) => handleChange('mahalla', 'specialDawatCount', parseInt(e.target.value) || 0)} className="w-full border rounded-lg p-2" />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">দাওয়াত পৌঁছানো হয়েছে</label>
              <input type="number" value={data.mahalla?.reachedCount || 0} onChange={(e) => handleChange('mahalla', 'reachedCount', parseInt(e.target.value) || 0)} className="w-full border rounded-lg p-2" />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">সহযোগী সদস্য হয়েছেন</label>
              <input type="number" value={data.mahalla?.associateCount || 0} onChange={(e) => handleChange('mahalla', 'associateCount', parseInt(e.target.value) || 0)} className="w-full border rounded-lg p-2" />
            </div>
          </div>
        </div>

        {/* 3. Youth */}
        <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
          <h4 className="font-bold text-emerald-800 mb-4 underline">৩. যুব সমাজের মাঝে দাওয়াত:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1">দাওয়াত পৌঁছানো হয়েছে</label>
              <input type="number" value={data.youth?.reachedCount || 0} onChange={(e) => handleChange('youth', 'reachedCount', parseInt(e.target.value) || 0)} className="w-full border rounded-lg p-2" />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">সহযোগী সদস্য</label>
              <input type="number" value={data.youth?.associateCount || 0} onChange={(e) => handleChange('youth', 'associateCount', parseInt(e.target.value) || 0)} className="w-full border rounded-lg p-2" />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">যুব কমিটি সংখ্যা</label>
              <input type="number" value={data.youth?.committeeCount || 0} onChange={(e) => handleChange('youth', 'committeeCount', parseInt(e.target.value) || 0)} className="w-full border rounded-lg p-2" />
            </div>
             <div>
              <label className="block text-xs font-semibold mb-1">বৃদ্ধি সংখ্যা</label>
              <input type="number" value={data.youth?.committeeIncreaseCount || 0} onChange={(e) => handleChange('youth', 'committeeIncreaseCount', parseInt(e.target.value) || 0)} className="w-full border rounded-lg p-2" />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">নতুন সমিতি/ক্লাব প্রতিষ্ঠা</label>
              <input type="number" value={data.youth?.clubCount || 0} onChange={(e) => handleChange('youth', 'clubCount', parseInt(e.target.value) || 0)} className="w-full border rounded-lg p-2" />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">বৃদ্ধি সংখ্যা</label>
              <input type="number" value={data.youth?.clubIncreaseCount || 0} onChange={(e) => handleChange('youth', 'clubIncreaseCount', parseInt(e.target.value) || 0)} className="w-full border rounded-lg p-2" />
            </div>
          </div>
        </div>

        {/* 4. Professionals Table */}
        <div>
          <h4 className="font-bold text-gray-800 mb-4 underline">৪. বিভিন্ন শ্রেণী-পেশার মানুষের মাঝে দাওয়াত:</h4>
          <div className="overflow-x-auto">
             <table className="w-full text-xs">
                <thead>
                   <tr className="bg-gray-100">
                      <th className="p-2 text-left">শ্রেণী/পেশা</th>
                      <th className="p-2 text-right">পৌঁছানো হয়েছে</th>
                      <th className="p-2 text-right">সহযোগী সদস্য</th>
                      <th className="p-2 text-right">টার্গেট</th>
                   </tr>
                </thead>
                <tbody>
                   {[
                     { id: 'political', label: 'রাজনৈতিক ও বিশিষ্ট ব্যক্তিবর্গ' },
                     { id: 'professional', label: 'পেশাজীবী/উলামা-মাশায়েখ' },
                     { id: 'laborer', label: 'শ্রমজীবী' },
                     { id: 'marginalized', label: 'প্রান্তিক জনগোষ্ঠী (অতি দরিদ্র)' },
                     { id: 'nonMuslim', label: 'ভিন্নধর্মাবলম্বী/মিডিয়া কর্মী' }
                   ].map(row => (
                     <tr key={row.id} className="border-b">
                        <td className="p-2 font-medium">{row.label}</td>
                        <td className="p-2"><input type="number" value={data.professions?.[row.id]?.reached || 0} onChange={(e) => handleTableChange('professions', row.id, 'reached', parseInt(e.target.value) || 0)} className="w-full border rounded p-1 text-right" /></td>
                        <td className="p-2"><input type="number" value={data.professions?.[row.id]?.associate || 0} onChange={(e) => handleTableChange('professions', row.id, 'associate', parseInt(e.target.value) || 0)} className="w-full border rounded p-1 text-right" /></td>
                        <td className="p-2"><input type="number" value={data.professions?.[row.id]?.target || 0} onChange={(e) => handleTableChange('professions', row.id, 'target', parseInt(e.target.value) || 0)} className="w-full border rounded p-1 text-right" /></td>
                     </tr>
                   ))}
                </tbody>
             </table>
          </div>
        </div>

        {/* 5. Family */}
        <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
          <h4 className="font-bold text-indigo-800 mb-4 underline">৫. পরিবারভিত্তিক দাওয়াত:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <div>
               <label className="block text-xs font-semibold mb-1">অংশগ্রহণকারী মোট পরিবার</label>
               <input type="number" value={data.family?.totalCount || 0} onChange={(e) => handleChange('family', 'totalCount', parseInt(e.target.value) || 0)} className="w-full border rounded-lg p-2" />
             </div>
             <div>
               <label className="block text-xs font-semibold mb-1">নতুন পরিবারে দাওয়াত পৌঁছানো</label>
               <input type="number" value={data.family?.newCount || 0} onChange={(e) => handleChange('family', 'newCount', parseInt(e.target.value) || 0)} className="w-full border rounded-lg p-2" />
             </div>
          </div>
        </div>

        {/* 6. Mosque */}
        <div className="bg-rose-50/50 p-4 rounded-xl border border-rose-100">
          <h4 className="font-bold text-rose-800 mb-4 underline">৬. মসজিদ/দাওয়াহ সেন্টারভিত্তিক দাওয়াত:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <div>
               <label className="block text-xs font-semibold mb-1">মসজিদ সংখ্যা</label>
               <input type="number" value={data.mosque?.totalCount || 0} onChange={(e) => handleChange('mosque', 'totalCount', parseInt(e.target.value) || 0)} className="w-full border rounded-lg p-2" />
             </div>
             <div>
               <label className="block text-xs font-semibold mb-1">বৃদ্ধি সংখ্যা</label>
               <input type="number" value={data.mosque?.totalIncreaseCount || 0} onChange={(e) => handleChange('mosque', 'totalIncreaseCount', parseInt(e.target.value) || 0)} className="w-full border rounded-lg p-2" />
             </div>
             <div>
               <label className="block text-xs font-semibold mb-1">দাওয়াতের আওতাভুক্ত মসজিদ</label>
               <input type="number" value={data.mosque?.dawatCount || 0} onChange={(e) => handleChange('mosque', 'dawatCount', parseInt(e.target.value) || 0)} className="w-full border rounded-lg p-2" />
             </div>
             <div>
               <label className="block text-xs font-semibold mb-1">মসজিদভিত্তিক দাওয়াহ সেন্টার</label>
               <input type="number" value={data.mosque?.centerCount || 0} onChange={(e) => handleChange('mosque', 'centerCount', parseInt(e.target.value) || 0)} className="w-full border rounded-lg p-2" />
             </div>
             <div>
               <label className="block text-xs font-semibold mb-1">তথ্যসেবা কেন্দ্র</label>
               <input type="number" value={data.mosque?.infoCenterCount || 0} onChange={(e) => handleChange('mosque', 'infoCenterCount', parseInt(e.target.value) || 0)} className="w-full border rounded-lg p-2" />
             </div>
             <div>
               <label className="block text-xs font-semibold mb-1">বৃদ্ধি সংখ্যা</label>
               <input type="number" value={data.mosque?.infoCenterIncreaseCount || 0} onChange={(e) => handleChange('mosque', 'infoCenterIncreaseCount', parseInt(e.target.value) || 0)} className="w-full border rounded-lg p-2" />
             </div>
          </div>
        </div>

        {/* 7. IT */}
        <div className="bg-cyan-50/50 p-4 rounded-xl border border-cyan-100">
          <h4 className="font-bold text-cyan-800 mb-4 underline">৭. তথ্যপ্রযুক্তির মাধ্যমে দাওয়াত:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <div>
               <label className="block text-xs font-semibold mb-1">উপযুক্ত জনশক্তি সংখ্যা</label>
               <input type="number" value={data.it?.manpowerCount || 0} onChange={(e) => handleChange('it', 'manpowerCount', parseInt(e.target.value) || 0)} className="w-full border rounded-lg p-2" />
             </div>
             <div>
               <label className="block text-xs font-semibold mb-1">অংশগ্রহণকারী সংখ্যা</label>
               <input type="number" value={data.it?.participantCount || 0} onChange={(e) => handleChange('it', 'participantCount', parseInt(e.target.value) || 0)} className="w-full border rounded-lg p-2" />
             </div>
          </div>
        </div>

      </div>
    </BaseModal>
  );
};
