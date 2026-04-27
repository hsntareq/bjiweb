import React, { useState } from 'react';
import { BaseModal } from './BaseModal';

interface DeptManpowerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData: any;
  saving: boolean;
}

export const DeptManpowerModal: React.FC<DeptManpowerModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData = {}, 
  saving 
}) => {
  const [data, setData] = useState(initialData);

  const handleTableChange = (deptId: string, typeId: string, field: string, value: any) => {
    setData((prev: any) => ({
      ...prev,
      [deptId]: {
        ...prev[deptId],
        [typeId]: { ...prev[deptId]?.[typeId], [field]: value }
      }
    }));
  };

  const depts = [
    { id: 'labor', label: 'শ্রম' },
    { id: 'ulama', label: 'উলামা' },
    { id: 'pro', label: 'পেশাজীবী' },
    { id: 'youth', label: 'যুব' },
    { id: 'nonMuslim', label: 'ভিন্নধর্মাবলম্বী' }
  ];

  const types = [
    { id: 'rokon', label: 'সদস্য (রুকন)' },
    { id: 'karmi', label: 'কর্মী' },
    { id: 'associate', label: 'সহযোগী সদস্য' }
  ];

  return (
    <BaseModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="৩. বিভাগভিত্তিক তথ্য" 
      onSave={() => onSave(data)}
      saving={saving}
    >
      <div className="space-y-6">
        <div className="overflow-x-auto">
          <table className="w-full text-[10px]">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">বিভাগসমূহ</th>
                <th className="p-2 text-left">জনশক্তির ধরণ</th>
                <th className="p-2 text-center">বিগত সংখ্যা</th>
                <th className="p-2 text-center">বর্তমান সংখ্যা</th>
                <th className="p-2 text-center">বৃদ্ধি</th>
                <th className="p-2 text-center">ঘাটতি</th>
                <th className="p-2 text-center">টার্গেট</th>
              </tr>
            </thead>
            <tbody>
              {depts.map(dept => (
                <React.Fragment key={dept.id}>
                  {types.map((type, tIdx) => (
                    <tr key={`${dept.id}-${type.id}`} className="border-b">
                      {tIdx === 0 && (
                        <td className="p-2 font-bold bg-gray-50/50 border-r" rowSpan={3}>{dept.label}</td>
                      )}
                      <td className="p-2 font-medium">{type.label}</td>
                      <td className="p-2"><input type="number" value={data[dept.id]?.[type.id]?.previousCount || 0} onChange={(e) => handleTableChange(dept.id, type.id, 'previousCount', parseInt(e.target.value) || 0)} className="w-12 border rounded p-1 text-center" /></td>
                      <td className="p-2"><input type="number" value={data[dept.id]?.[type.id]?.currentCount || 0} onChange={(e) => handleTableChange(dept.id, type.id, 'currentCount', parseInt(e.target.value) || 0)} className="w-12 border rounded p-1 text-center" /></td>
                      <td className="p-2"><input type="number" value={data[dept.id]?.[type.id]?.increase || 0} onChange={(e) => handleTableChange(dept.id, type.id, 'increase', parseInt(e.target.value) || 0)} className="w-12 border rounded p-1 text-center" /></td>
                      <td className="p-2"><input type="number" value={data[dept.id]?.[type.id]?.deficit || 0} onChange={(e) => handleTableChange(dept.id, type.id, 'deficit', parseInt(e.target.value) || 0)} className="w-12 border rounded p-1 text-center" /></td>
                      <td className="p-2"><input type="number" value={data[dept.id]?.[type.id]?.target || 0} onChange={(e) => handleTableChange(dept.id, type.id, 'target', parseInt(e.target.value) || 0)} className="w-12 border rounded p-1 text-center" /></td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </BaseModal>
  );
};
