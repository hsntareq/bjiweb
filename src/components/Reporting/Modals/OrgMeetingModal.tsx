import React, { useState } from 'react';
import { BaseModal } from './BaseModal';

interface OrgMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData: any;
  saving: boolean;
}

export const OrgMeetingModal: React.FC<OrgMeetingModalProps> = ({ 
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
    { id: 'wardTeam', sl: '১.', label: 'ওয়ার্ড টিম বৈঠক', f: ['val'] },
    { id: 'wardMeeting', sl: '২.', label: 'ওয়ার্ড বৈঠক (মাসিক ইউনিট দায়িত্বশীল)', f: ['val'] },
    { id: 'memberMeeting', sl: '৩.', label: 'ওয়ার্ডভিত্তিক মাসিক সদস্য (রুকন)', f: ['val'] },
    { id: 'karmiMeeting', sl: '৪.', label: 'ইউনিটে কর্মী বৈঠক/পারিবারিক বৈঠক', f: ['karmi', 'family'] },
    { id: 'karmiConference', sl: '৫.', label: 'ওয়ার্ড পর্যায়ে কর্মী সম্মেলন', f: ['val'] },
    { id: 'deptMeeting', sl: '৬.', label: 'উলামা/যুব/শ্রমিক বৈঠক/সমাবেশ', f: ['ulama', 'youth', 'labor'] },
    { id: 'associateGathering', sl: '৭.', label: 'সহযোগী সদস্য সমাবেশ/সম্মেলন', f: ['val'] },
    { id: 'activeAssociateGathering', sl: '৮.', label: 'সক্রিয় সহযোগী সদস্য সমাবেশ', f: ['val'] },
    { id: 'others', sl: '৯.', label: 'অন্যান্য', f: ['val'] }
  ];

  return (
    <BaseModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="৯. সাংগঠনিক বৈঠকাদি" 
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
