import React, { useState } from 'react';
import { BaseModal } from './BaseModal';

interface ManpowerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData: any;
  saving: boolean;
}

export const ManpowerModal: React.FC<ManpowerModalProps> = ({ 
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
    { id: 'rokon', label: 'সর্বমোট সদস্য (রুকন)' },
    { id: 'rokonCandidate', label: 'সর্বমোট সদস্য(রুকন) প্রার্থী' },
    { id: 'karmi', label: 'সর্বমোট কর্মী' },
    { id: 'associate', label: 'সর্বমোট সক্রিয় সহযোগী সদস্য' },
    { id: 'generalAssociate', label: 'সহযোগী সদস্য' }
  ];

  return (
    <BaseModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="১. জনশক্তি" 
      onSave={() => onSave(data)}
      saving={saving}
    >
      <div className="space-y-6">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">জনশক্তির ধরণ</th>
                <th className="p-2 text-center">বিগত সংখ্যা</th>
                <th className="p-2 text-center">বর্তমান সংখ্যা</th>
                <th className="p-2 text-center">মানোন্নয়ন</th>
                <th className="p-2 text-center">আগত</th>
                <th className="p-2 text-center">ঘাটতি</th>
                <th className="p-2 text-center">টার্গেট</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(row => (
                <tr key={row.id} className="border-b">
                  <td className="p-2 font-medium">
                    {row.label}
                    <div className="text-[9px] text-gray-400 font-normal mt-0.5">
                    </div>
                  </td>
                  <td className="p-2 text-center">
                    <input type="number" value={data[row.id]?.previousCount || 0} onChange={(e) => handleTableChange(row.id, 'previousCount', parseInt(e.target.value) || 0)} className="w-16 border rounded p-1 text-center mx-auto block" />
                  </td>
                  <td className="p-2 text-center">
                    <input type="number" value={data[row.id]?.currentCount || 0} onChange={(e) => handleTableChange(row.id, 'currentCount', parseInt(e.target.value) || 0)} className="w-16 border rounded p-1 text-center mx-auto block" />
                  </td>
                  <td className="p-2 text-center">
                    <input type="number" value={data[row.id]?.promotionIncrease || 0} onChange={(e) => handleTableChange(row.id, 'promotionIncrease', parseInt(e.target.value) || 0)} className="w-16 border rounded p-1 text-center mx-auto block" />
                  </td>
                  <td className="p-2 text-center">
                    <input type="number" value={data[row.id]?.arrivedIncrease || 0} onChange={(e) => handleTableChange(row.id, 'arrivedIncrease', parseInt(e.target.value) || 0)} className="w-16 border rounded p-1 text-center mx-auto block" />
                  </td>
                  <td className="p-2 text-center">
                    <input type="number" value={data[row.id]?.deficit || 0} onChange={(e) => handleTableChange(row.id, 'deficit', parseInt(e.target.value) || 0)} className="w-16 border rounded p-1 text-center mx-auto block" />
                  </td>
                  <td className="p-2 text-center">
                    <input type="number" value={data[row.id]?.target || 0} onChange={(e) => handleTableChange(row.id, 'target', parseInt(e.target.value) || 0)} className="w-16 border rounded p-1 text-center mx-auto block" />
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
