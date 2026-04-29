import React, { useState } from 'react';
import { BaseModal } from './BaseModal';

interface TarbiyatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData: any;
  saving: boolean;
}

export const TarbiyatModal: React.FC<TarbiyatModalProps> = ({ 
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

  const handleDeepTableChange = (rowId: string, field: string, subField: string, value: any) => {
    setData((prev: any) => ({
      ...prev,
      [rowId]: {
        ...prev[rowId],
        [field]: { ...prev[rowId]?.[field], [subField]: value }
      }
    }));
  };

  const rows = [
    { id: 'unitTarbiyat', sl: '১.', label: 'ইউনিটে তারবিয়াতী বৈঠক', f: ['val'] },
    { id: 'wardTarbiyat', sl: '২.', label: 'ওয়ার্ডভিত্তিক কর্মীদের শিক্ষা বৈঠক', f: ['val'] },
    { id: 'higherTarbiyat', sl: '৩.', label: 'উর্ধ্বতন সংগঠনের শিক্ষা শিবির/বৈঠক', f: ['val'] },
    { id: 'publicTarbiyat', sl: '৪.', label: 'গণশিক্ষা বৈঠক/ গণ নৈশ ইবাদত', f: ['val'] },
    { id: 'discussionCircle', sl: '৫.', label: 'আলোচনা চক্র', f: ['group', 'session'] },
    { id: 'quranDars', sl: '৬.', label: 'দারস/সহীহ কুরআন তিলাওয়াত অনুশীলন', f: ['program'] },
    { id: 'others', sl: '৭.', label: 'অন্যান্য', f: ['val'] }
  ];

  return (
    <BaseModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="ক) তারবিয়াত (নৈতিক শিক্ষা ও সাংগঠনিক প্রশিক্ষণ)" 
      onSave={() => onSave(data)}
      saving={saving}
    >
       <div className="overflow-x-auto">
          <table className="w-full text-xs">
             <thead>
                <tr className="bg-gray-100">
                   <th className="p-2 text-left">ক্রম</th>
                   <th className="p-2 text-left">বৈঠকের ধরণ</th>
                   <th className="p-2 text-center">সংখ্যা</th>
                   <th className="p-2 text-center">টার্গেট</th>
                   <th className="p-2 text-center">গড় উপস্থিতি</th>
                </tr>
             </thead>
             <tbody>
                {rows.map(row => (
                   <tr key={row.id} className="border-b">
                      <td className="p-2 text-center">{row.sl}</td>
                      <td className="p-2 font-medium">{row.label}</td>
                      <td className="p-2">
                         <div className="flex gap-1 justify-center">
                            {row.f.map(sub => (
                               <input key={sub} type="number" placeholder={sub} value={data[row.id]?.count?.[sub] || 0} onChange={(e) => handleDeepTableChange(row.id, 'count', sub, parseInt(e.target.value) || 0)} className="w-10 border rounded p-1 text-center" />
                            ))}
                         </div>
                      </td>
                      <td className="p-2">
                         <div className="flex gap-1 justify-center">
                            {row.f.map(sub => (
                               <input key={sub} type="number" placeholder={sub} value={data[row.id]?.target?.[sub] || 0} onChange={(e) => handleDeepTableChange(row.id, 'target', sub, parseInt(e.target.value) || 0)} className="w-10 border rounded p-1 text-center" />
                            ))}
                         </div>
                      </td>
                      <td className="p-2">
                         <div className="flex gap-1 justify-center">
                            {row.f.map(sub => (
                               <input key={sub} type="number" placeholder={sub} value={data[row.id]?.avgAttendance?.[sub] || 0} onChange={(e) => handleDeepTableChange(row.id, 'avgAttendance', sub, parseInt(e.target.value) || 0)} className="w-10 border rounded p-1 text-center" />
                            ))}
                         </div>
                      </td>
                   </tr>
                ))}
             </tbody>
          </table>
       </div>
    </BaseModal>
  );
};
