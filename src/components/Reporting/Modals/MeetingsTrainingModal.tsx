import React, { useState } from 'react';
import { BaseModal } from './BaseModal';

interface MeetingsTrainingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData: any;
  saving: boolean;
}

export const MeetingsTrainingModal: React.FC<MeetingsTrainingModalProps> = ({ 
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

  const handleTableChange = (rowId: string, field: string, value: any) => {
    setData((prev: any) => ({
      ...prev,
      [rowId]: { ...prev[rowId], [field]: value }
    }));
  };

  const rows = [
    { id: 'rokonMeeting', sl: '১.', label: 'সদস্য বৈঠক (রুকন)' },
    { id: 'karmiMeeting', sl: '২.', label: 'কর্মী বৈঠক' },
    { id: 'associateGathering', sl: '৩.', label: 'সহযোগী সমাবেশ' },
    { id: 'rokonEducation', sl: '৪.', label: 'সদস্য (রুকন) শিক্ষা বৈঠক' },
    { id: 'karmiEducation', sl: '৫.', label: 'কর্মী শিক্ষা বৈঠক' },
    { id: 'wardTeamMeeting', sl: '৬.', label: 'ওয়ার্ড/উপশাখা টিম বৈঠক' },
    { id: 'unitMeeting', sl: '৭.', label: 'ইউনিট বৈঠক' }
  ];

  return (
    <BaseModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="৪. বৈঠক ও প্রশিক্ষণঃ" 
      onSave={() => onSave(data)}
      saving={saving}
    >
       <div className="overflow-x-auto">
          <table className="w-full text-xs">
             <thead>
                <tr className="bg-gray-100">
                   <th className="p-2 text-left">ক্রম</th>
                   <th className="p-2 text-left">বৈঠক ও প্রশিক্ষণের ধরন</th>
                   <th className="p-2 text-center">সংখ্যা</th>
                   <th className="p-2 text-center">উপস্থিতি</th>
                   <th className="p-2 text-left">মন্তব্য</th>
                </tr>
             </thead>
             <tbody>
                {rows.map(row => (
                   <tr key={row.id} className="border-b">
                      <td className="p-2 text-center">{row.sl}</td>
                      <td className="p-2 font-medium">{row.label}</td>
                      <td className="p-2"><input type="number" value={data[row.id]?.count || 0} onChange={(e) => handleTableChange(row.id, 'count', parseInt(e.target.value) || 0)} className="w-12 border rounded p-1 text-center" /></td>
                      <td className="p-2"><input type="number" value={data[row.id]?.attendance || 0} onChange={(e) => handleTableChange(row.id, 'attendance', parseInt(e.target.value) || 0)} className="w-12 border rounded p-1 text-center" /></td>
                      <td className="p-2"><input type="text" value={data[row.id]?.remarks || ''} onChange={(e) => handleTableChange(row.id, 'remarks', e.target.value)} className="w-full border rounded p-1" /></td>
                   </tr>
                ))}
             </tbody>
          </table>
       </div>
    </BaseModal>
  );
};
