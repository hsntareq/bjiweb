import React, { useState } from 'react';
import { BaseModal } from './BaseModal';

interface ProgramImplementationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData: any;
  saving: boolean;
}

export const ProgramImplementationModal: React.FC<ProgramImplementationModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData = {}, 
  saving 
}) => {
  const [data, setData] = useState(initialData);

  const handleTableChange = (rowId: string, field: string, subField: string, value: any) => {
    setData((prev: any) => ({
      ...prev,
      [rowId]: {
        ...prev[rowId],
        [field]: { ...prev[rowId]?.[field], [subField]: value }
      }
    }));
  };

  const programs = [
    { id: 'monthlyMeeting', label: '১. ইউনিটে মাসিক সাধারণ সভা/পারিবারিক সভা', fields: ['general', 'family'] },
    { id: 'dawahMeeting', label: '২. দাওয়াতী সভা/আলোচনা সভা/সুধী সমাবেশ', fields: ['dawah', 'discussion', 'gathering'] },
    { id: 'siratunnabi', label: '৩. সীরাতুন্নবী (সাঃ) মাহফিল/ ঈদ পুনর্মিলনী', fields: ['sirat', 'eid'] },
    { id: 'darsTafsir', label: '৪. দারস্/তাফসীর/দাওয়াতি জনসভা', fields: ['dars', 'tafsir', 'public'] },
    { id: 'iftar', label: '৫. ইফতার মাহফিল (ব্যক্তিগত/সাংগঠনিক)', fields: ['personal', 'org'] },
    { id: 'teaCircle', label: '৬. চা চক্র/সামষ্টিক খাওয়া/শিক্ষা সফর', fields: ['tea', 'lunch', 'tour'] },
    { id: 'competition', label: '৭. কিরাত/হামদ না’ত প্রতিযোগিতা/ অন্যান্য', fields: ['comp', 'other'] }
  ];

  return (
    <BaseModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="ঘ) কর্মসূচি বাস্তবায়ন" 
      onSave={() => onSave(data)}
      saving={saving}
    >
      <div className="space-y-6">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left w-1/3">কর্মসূচীর বিবরণ</th>
                <th className="p-2 text-center">মোট সংখ্যা</th>
                <th className="p-2 text-center">টার্গেট</th>
                <th className="p-2 text-center">গড় উপস্থিতি</th>
              </tr>
            </thead>
            <tbody>
              {programs.map(prog => (
                <tr key={prog.id} className="border-b">
                  <td className="p-2 font-medium">{prog.label}</td>
                  <td className="p-2">
                    <div className="flex gap-1 justify-center">
                      {prog.fields.map(f => (
                        <input key={f} type="number" placeholder={f} value={data[prog.id]?.total?.[f] || 0} onChange={(e) => handleTableChange(prog.id, 'total', f, parseInt(e.target.value) || 0)} className="w-10 border rounded p-1 text-center" />
                      ))}
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="flex gap-1 justify-center">
                      {prog.fields.map(f => (
                        <input key={f} type="number" placeholder={f} value={data[prog.id]?.target?.[f] || 0} onChange={(e) => handleTableChange(prog.id, 'target', f, parseInt(e.target.value) || 0)} className="w-10 border rounded p-1 text-center" />
                      ))}
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="flex gap-1 justify-center">
                      {prog.fields.map(f => (
                        <input key={f} type="number" placeholder={f} value={data[prog.id]?.avgAttendance?.[f] || 0} onChange={(e) => handleTableChange(prog.id, 'avgAttendance', f, parseInt(e.target.value) || 0)} className="w-10 border rounded p-1 text-center" />
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </BaseModal>
  );
};
