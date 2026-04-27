import React, { useState } from 'react';
import { BaseModal } from './BaseModal';

interface OrgDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData: any;
  saving: boolean;
}

export const OrgDetailsModal: React.FC<OrgDetailsModalProps> = ({ 
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

  const handleTableChange = (section: string, rowId: string, field: string, value: any) => {
    setData((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [rowId]: { ...prev[section]?.[rowId], [field]: value }
      }
    }));
  };

  const handleDeepTableChange = (section: string, rowId: string, field: string, subField: string, value: any) => {
    setData((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [rowId]: {
          ...prev[section]?.[rowId],
          [field]: { ...prev[section]?.[rowId]?.[field], [subField]: value }
        }
      }
    }));
  };

  return (
    <BaseModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="সাংগঠনিক তথ্য সম্পাদনা" 
      onSave={() => onSave(data)}
      saving={saving}
    >
      <div className="space-y-10">
        {/* ৫. Units */}
        <div className="bg-gray-50 p-4 rounded-xl">
           <h4 className="font-bold text-gray-800 mb-4 underline">৫. দাওয়াতী ও পারিবারিক ইউনিট:</h4>
           <div className="overflow-x-auto">
              <table className="w-full text-xs">
                 <thead>
                    <tr className="bg-gray-100">
                       <th className="p-2 text-left">ইউনিটের ধরণ</th>
                       <th className="p-2 text-center">বিগত</th>
                       <th className="p-2 text-center">বর্তমান</th>
                       <th className="p-2 text-center">বৃদ্ধি</th>
                       <th className="p-2 text-center">ঘাটতি</th>
                       <th className="p-2 text-center">টার্গেট</th>
                    </tr>
                 </thead>
                 <tbody>
                    {['dawahUnit', 'familyUnit'].map(id => (
                       <tr key={id} className="border-b">
                          <td className="p-2">{id === 'dawahUnit' ? 'দাওয়াতী ইউনিট' : 'পারিবারিক ইউনিট'}</td>
                          <td className="p-2"><input type="number" value={data.units?.[id]?.previousCount || 0} onChange={(e) => handleTableChange('units', id, 'previousCount', parseInt(e.target.value) || 0)} className="w-12 border rounded p-1 text-center" /></td>
                          <td className="p-2"><input type="number" value={data.units?.[id]?.currentCount || 0} onChange={(e) => handleTableChange('units', id, 'currentCount', parseInt(e.target.value) || 0)} className="w-12 border rounded p-1 text-center" /></td>
                          <td className="p-2"><input type="number" value={data.units?.[id]?.increase || 0} onChange={(e) => handleTableChange('units', id, 'increase', parseInt(e.target.value) || 0)} className="w-12 border rounded p-1 text-center" /></td>
                          <td className="p-2"><input type="number" value={data.units?.[id]?.deficit || 0} onChange={(e) => handleTableChange('units', id, 'deficit', parseInt(e.target.value) || 0)} className="w-12 border rounded p-1 text-center" /></td>
                          <td className="p-2"><input type="number" value={data.units?.[id]?.target || 0} onChange={(e) => handleTableChange('units', id, 'target', parseInt(e.target.value) || 0)} className="w-12 border rounded p-1 text-center" /></td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>

        {/* ৬. Students Joining */}
        <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
           <h4 className="font-bold text-blue-800 mb-4 underline">৬. বিদায়ী ছাত্র জনশক্তির সংগঠনে যোগদান:</h4>
           <div className="grid grid-cols-3 gap-4 text-xs font-bold text-center mb-2">
              <div>সদস্য</div><div>সাথী</div><div>কর্মী</div>
           </div>
           <div className="grid grid-cols-3 gap-4">
              <input type="number" value={data.studentJoining?.rokonCount || 0} onChange={(e) => handleChange('studentJoining', 'rokonCount', parseInt(e.target.value) || 0)} className="border rounded p-2 text-center" />
              <input type="number" value={data.studentJoining?.companionCount || 0} onChange={(e) => handleChange('studentJoining', 'companionCount', parseInt(e.target.value) || 0)} className="border rounded p-2 text-center" />
              <input type="number" value={data.studentJoining?.karmiCount || 0} onChange={(e) => handleChange('studentJoining', 'karmiCount', parseInt(e.target.value) || 0)} className="border rounded p-2 text-center" />
           </div>
        </div>

        {/* ৭. Safar */}
        <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
           <h4 className="font-bold text-emerald-800 mb-4 underline">৭. সফর:</h4>
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                 <label className="block text-[10px] font-bold mb-1">উর্ধ্বতন দায়িত্বশীলদের সফর</label>
                 <input type="number" value={data.safar?.higherAuthoritySafar || 0} onChange={(e) => handleChange('safar', 'higherAuthoritySafar', parseInt(e.target.value) || 0)} className="w-full border rounded p-2" />
              </div>
              <div>
                 <label className="block text-[10px] font-bold mb-1">ওয়ার্ড সভাপতির সফর</label>
                 <input type="number" value={data.safar?.wardPresidentSafar || 0} onChange={(e) => handleChange('safar', 'wardPresidentSafar', parseInt(e.target.value) || 0)} className="w-full border rounded p-2" />
              </div>
              <div>
                 <label className="block text-[10px] font-bold mb-1">টিম সদস্যদের সফর</label>
                 <input type="number" value={data.safar?.teamMemberSafar || 0} onChange={(e) => handleChange('safar', 'teamMemberSafar', parseInt(e.target.value) || 0)} className="w-full border rounded p-2" />
              </div>
           </div>
        </div>

        {/* ৮. Donors */}
        <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100">
           <h4 className="font-bold text-amber-800 mb-4 underline">৮. ইয়ানত দাতা (সহযোগী সদস্য/সুধী):</h4>
           <div className="grid grid-cols-2 gap-4">
              <div>
                 <label className="block text-[10px] font-bold mb-1">নতুন ইয়ানত দাতা (সংখ্যা)</label>
                 <input type="number" value={data.donors?.newCount || 0} onChange={(e) => handleChange('donors', 'newCount', parseInt(e.target.value) || 0)} className="w-full border rounded p-2" />
              </div>
              <div>
                 <label className="block text-[10px] font-bold mb-1">অর্থের পরিমাণ</label>
                 <input type="number" value={data.donors?.amount || 0} onChange={(e) => handleChange('donors', 'amount', parseInt(e.target.value) || 0)} className="w-full border rounded p-2" />
              </div>
           </div>
        </div>

        {/* ৯. Meetings */}
        <div>
           <h4 className="font-bold text-gray-800 mb-4 underline">৯. সাংগঠনিক বৈঠকাদি:</h4>
           <div className="overflow-x-auto">
              <table className="w-full text-[10px]">
                 <thead>
                    <tr className="bg-gray-100">
                       <th className="p-2 text-left">বৈঠকের ধরণ</th>
                       <th className="p-2 text-center">সংখ্যা</th>
                       <th className="p-2 text-center">টার্গেট</th>
                       <th className="p-2 text-center">গড় উপস্থিতি</th>
                    </tr>
                 </thead>
                 <tbody>
                    {[
                       { id: 'wardTeam', label: '১. ওয়ার্ড টিম বৈঠক', f: ['val'] },
                       { id: 'wardMeeting', label: '২. ওয়ার্ড বৈঠক (মাসিক ইউনিট দায়িত্বশীল)', f: ['val'] },
                       { id: 'memberMeeting', label: '৩. ওয়ার্ডভিত্তিক মাসিক সদস্য (রুকন)', f: ['val'] },
                       { id: 'karmiMeeting', label: '৪. ইউনিটে কর্মী বৈঠক/পারিবারিক বৈঠক', f: ['karmi', 'family'] },
                       { id: 'karmiConference', label: '৫. ওয়ার্ড পর্যায়ে কর্মী সম্মেলন', f: ['val'] },
                       { id: 'deptMeeting', label: '৬. উলামা/যুব/শ্রমিক বৈঠক/সমাবেশ', f: ['ulama', 'youth', 'labor'] },
                       { id: 'associateGathering', label: '৭. সহযোগী সদস্য সমাবেশ/সম্মেলন', f: ['val'] },
                       { id: 'activeAssociateGathering', label: '৮. সক্রিয় সহযোগী সদস্য সমাবেশ', f: ['val'] },
                       { id: 'others', label: '৯. অন্যান্য', f: ['val'] }
                    ].map(row => (
                       <tr key={row.id} className="border-b">
                          <td className="p-2 font-medium">{row.label}</td>
                          <td className="p-2">
                             <div className="flex gap-1 justify-center">
                                {row.f.map(sub => (
                                   <input key={sub} type="number" placeholder={sub} value={data.meetings?.[row.id]?.count?.[sub] || 0} onChange={(e) => handleDeepTableChange('meetings', row.id, 'count', sub, parseInt(e.target.value) || 0)} className="w-10 border rounded p-1 text-center" />
                                ))}
                             </div>
                          </td>
                          <td className="p-2">
                             <div className="flex gap-1 justify-center">
                                {row.f.map(sub => (
                                   <input key={sub} type="number" placeholder={sub} value={data.meetings?.[row.id]?.target?.[sub] || 0} onChange={(e) => handleDeepTableChange('meetings', row.id, 'target', sub, parseInt(e.target.value) || 0)} className="w-10 border rounded p-1 text-center" />
                                ))}
                             </div>
                          </td>
                          <td className="p-2">
                             <div className="flex gap-1 justify-center">
                                {row.f.map(sub => (
                                   <input key={sub} type="number" placeholder={sub} value={data.meetings?.[row.id]?.avgAttendance?.[sub] || 0} onChange={(e) => handleDeepTableChange('meetings', row.id, 'avgAttendance', sub, parseInt(e.target.value) || 0)} className="w-10 border rounded p-1 text-center" />
                                ))}
                             </div>
                          </td>
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
