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

  const handleTableChange = (section: string, rowId: string, field: string, value: any) => {
    setData((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [rowId]: { ...prev[section]?.[rowId], [field]: value }
      }
    }));
  };

  const meetingRows = [
    { id: 'wardTeam', label: 'ওয়ার্ড টিম বৈঠক' },
    { id: 'wardMonthly', label: 'ওয়ার্ড বৈঠক (মাসিক ইউনিট দায়িত্বশীল বৈঠক)' },
    { id: 'wardRokon', label: 'ওয়ার্ডভিত্তিক মাসিক সদস্য (রুকন) বৈঠক' },
    { id: 'unitTotal', label: 'ইউনিটে মোট কর্মী বৈঠক/পারিবারিক বৈঠক' },
    { id: 'wardSummit', label: 'ওয়ার্ড পর্যায়ে কর্মী সম্মেলন' },
    { id: 'specificMeeting', label: 'উলামা/যুবক/শ্রমিক বৈঠক/সমাবেশ' },
    { id: 'associateSummit', label: 'সহযোগী সদস্য সমাবেশ/সম্মেলন' },
    { id: 'activeAssociateSummit', label: 'সক্রিয় সহযোগী সদস্য সমাবেশ/সম্মেলন' }
  ];

  const trainingRows = [
    { id: 'unitTarbiyat', label: 'ইউনিট তারবিয়াতি বৈঠক' },
    { id: 'wardEducation', label: 'ওয়ার্ডভিত্তিক কর্মীদের শিক্ষা বৈঠক' },
    { id: 'higherTraining', label: 'উর্ধ্বতন সংগঠনের শিক্ষা শিবির/শিক্ষা বৈঠকে অংশগ্রহণকারী' },
    { id: 'massEducation', label: 'গণশিক্ষা বৈঠক/নফল নামায ইবাদত' },
    { id: 'discussion', label: 'আলোচনা চক্র' },
    { id: 'darsQuran', label: 'দরস/সহীহ কুরআন তিলাওয়াত অনুষ্ঠান' }
  ];

  return (
    <BaseModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="৯. বৈঠকাদি ও প্রশিক্ষণ" 
      onSave={() => onSave(data)}
      saving={saving}
    >
      <div className="space-y-10">
        
        {/* Meetings Table */}
        <div>
          <h4 className="font-bold text-gray-800 mb-4 uppercase tracking-wide border-l-4 border-indigo-500 pl-3">৯. সাংগঠনিক বৈঠকাদি:</h4>
          <div className="overflow-x-auto">
             <table className="w-full text-xs">
                <thead>
                   <tr className="bg-indigo-50 text-indigo-700">
                      <th className="p-2 text-left">বৈঠকের ধরণ</th>
                      <th className="p-2 text-right">সংখ্যা</th>
                      <th className="p-2 text-right">টার্গেট</th>
                      <th className="p-2 text-right">গড় উপস্থিতি</th>
                   </tr>
                </thead>
                <tbody>
                   {meetingRows.map(row => (
                     <tr key={row.id} className="border-b">
                        <td className="p-2 font-medium">{row.label}</td>
                        <td className="p-2"><input type="number" value={data.meetings?.[row.id]?.count || 0} onChange={(e) => handleTableChange('meetings', row.id, 'count', parseInt(e.target.value) || 0)} className="w-20 border rounded p-1 text-right ml-auto block" /></td>
                        <td className="p-2"><input type="number" value={data.meetings?.[row.id]?.target || 0} onChange={(e) => handleTableChange('meetings', row.id, 'target', parseInt(e.target.value) || 0)} className="w-20 border rounded p-1 text-right ml-auto block" /></td>
                        <td className="p-2"><input type="number" value={data.meetings?.[row.id]?.attendance || 0} onChange={(e) => handleTableChange('meetings', row.id, 'attendance', parseInt(e.target.value) || 0)} className="w-20 border rounded p-1 text-right ml-auto block" /></td>
                     </tr>
                   ))}
                </tbody>
             </table>
          </div>
        </div>

        {/* Training Table */}
        <div>
          <h4 className="font-bold text-gray-800 mb-4 uppercase tracking-wide border-l-4 border-emerald-500 pl-3">প্রশিক্ষণ:</h4>
          <div className="overflow-x-auto">
             <table className="w-full text-xs">
                <thead>
                   <tr className="bg-emerald-50 text-emerald-700">
                      <th className="p-2 text-left">বৈঠকের ধরণ</th>
                      <th className="p-2 text-right">সংখ্যা</th>
                      <th className="p-2 text-right">টার্গেট</th>
                      <th className="p-2 text-right">গড় উপস্থিতি</th>
                   </tr>
                </thead>
                <tbody>
                   {trainingRows.map(row => (
                     <tr key={row.id} className="border-b">
                        <td className="p-2 font-medium">{row.label}</td>
                        <td className="p-2"><input type="number" value={data.training?.[row.id]?.count || 0} onChange={(e) => handleTableChange('training', row.id, 'count', parseInt(e.target.value) || 0)} className="w-20 border rounded p-1 text-right ml-auto block" /></td>
                        <td className="p-2"><input type="number" value={data.training?.[row.id]?.target || 0} onChange={(e) => handleTableChange('training', row.id, 'target', parseInt(e.target.value) || 0)} className="w-20 border rounded p-1 text-right ml-auto block" /></td>
                        <td className="p-2"><input type="number" value={data.training?.[row.id]?.attendance || 0} onChange={(e) => handleTableChange('training', row.id, 'attendance', parseInt(e.target.value) || 0)} className="w-20 border rounded p-1 text-right ml-auto block" /></td>
                     </tr>
                   ))}
                </tbody>
             </table>
          </div>
        </div>

      </div>
    </BaseModal>
  );
};
