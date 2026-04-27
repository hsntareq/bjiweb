import React, { useState } from 'react';
import { BaseModal } from './BaseModal';

interface DawahFamilyUnitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData: any;
  saving: boolean;
}

export const DawahFamilyUnitModal: React.FC<DawahFamilyUnitModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData = {}, 
  saving 
}) => {
  const [data, setData] = useState(initialData);

  const handleTableChange = (rowId: string, field: string, value: any) => {
    setData((prev: any) => ({
      ...prev,
      [rowId]: { ...prev[rowId], [field]: value }
    }));
  };

  return (
    <BaseModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="৫. দাওয়াতী ও পারিবারিক ইউনিট" 
      onSave={() => onSave(data)}
      saving={saving}
    >
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
                      <td className="p-2 font-medium">{id === 'dawahUnit' ? 'দাওয়াতী ইউনিট' : 'পারিবারিক ইউনিট'}</td>
                      <td className="p-2"><input type="number" value={data[id]?.previousCount || 0} onChange={(e) => handleTableChange(id, 'previousCount', parseInt(e.target.value) || 0)} className="w-16 border rounded p-1 text-center mx-auto block" /></td>
                      <td className="p-2"><input type="number" value={data[id]?.currentCount || 0} onChange={(e) => handleTableChange(id, 'currentCount', parseInt(e.target.value) || 0)} className="w-16 border rounded p-1 text-center mx-auto block" /></td>
                      <td className="p-2"><input type="number" value={data[id]?.increase || 0} onChange={(e) => handleTableChange(id, 'increase', parseInt(e.target.value) || 0)} className="w-16 border rounded p-1 text-center mx-auto block" /></td>
                      <td className="p-2"><input type="number" value={data[id]?.deficit || 0} onChange={(e) => handleTableChange(id, 'deficit', parseInt(e.target.value) || 0)} className="w-16 border rounded p-1 text-center mx-auto block" /></td>
                      <td className="p-2"><input type="number" value={data[id]?.target || 0} onChange={(e) => handleTableChange(id, 'target', parseInt(e.target.value) || 0)} className="w-16 border rounded p-1 text-center mx-auto block" /></td>
                   </tr>
                ))}
             </tbody>
          </table>
       </div>
    </BaseModal>
  );
};
