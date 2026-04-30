import React, { useState } from 'react';
import { BaseModal } from './BaseModal';

interface UnitOrganizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData: any;
  saving: boolean;
}

export const UnitOrganizationModal: React.FC<UnitOrganizationModalProps> = ({ 
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
  }, [isOpen, initialData]);

  const handleTableChange = (rowId: string, field: string, value: any) => {
    setData((prev: any) => ({
      ...prev,
      [rowId]: { ...prev[rowId], [field]: value }
    }));
  };

  const rows = [
    { id: 'generalMale', label: 'সাধারণ ইউনিট (পুরুষ)' },
    { id: 'ulama', label: 'উলামা ইউনিট' },
    { id: 'business', label: 'ব্যবসায়ী ইউনিট' },
    { id: 'laborWelfare', label: 'শ্রমিক কল্যাণ ইউনিট' },
    { id: 'youth', label: 'যুব ইউনিট' },
    { id: 'media', label: 'মিডিয়া ইউনিট' },
    { id: 'culture', label: 'সাহিত্য ও সংস্কৃতি ইউনিট' },
    { id: 'total', label: 'সর্বমোট ইউনিট সংখ্যা' }
  ];

  return (
    <BaseModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="৪. ইউনিট সংগঠন:" 
      onSave={() => onSave(data)}
      saving={saving}
    >
       <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
             <thead>
                <tr className="bg-gray-100">
                   <th className="border p-2 text-left">ইউনিটের ধরণ</th>
                   <th className="border p-2 text-center">বিগত সংখ্যা</th>
                   <th className="border p-2 text-center">বর্তমান সংখ্যা</th>
                   <th className="border p-2 text-center">বৃদ্ধি</th>
                   <th className="border p-2 text-center">ঘাটতি</th>
                   <th className="border p-2 text-center">টার্গেট</th>
                </tr>
             </thead>
             <tbody>
                {rows.map(row => (
                   <tr key={row.id} className="border-b">
                      <td className="border p-2 font-medium">{row.label}</td>
                      <td className="border p-2"><input type="number" value={data[row.id]?.previousCount || 0} onChange={(e) => handleTableChange(row.id, 'previousCount', parseInt(e.target.value) || 0)} className="w-16 border rounded p-1 text-center mx-auto block" /></td>
                      <td className="border p-2"><input type="number" value={data[row.id]?.currentCount || 0} onChange={(e) => handleTableChange(row.id, 'currentCount', parseInt(e.target.value) || 0)} className="w-16 border rounded p-1 text-center mx-auto block" /></td>
                      <td className="border p-2"><input type="number" value={data[row.id]?.increase || 0} onChange={(e) => handleTableChange(row.id, 'increase', parseInt(e.target.value) || 0)} className="w-16 border rounded p-1 text-center mx-auto block" /></td>
                      <td className="border p-2"><input type="number" value={data[row.id]?.deficit || 0} onChange={(e) => handleTableChange(row.id, 'deficit', parseInt(e.target.value) || 0)} className="w-16 border rounded p-1 text-center mx-auto block" /></td>
                      <td className="border p-2"><input type="number" value={data[row.id]?.target || 0} onChange={(e) => handleTableChange(row.id, 'target', parseInt(e.target.value) || 0)} className="w-16 border rounded p-1 text-center mx-auto block" /></td>
                   </tr>
                ))}
             </tbody>
          </table>
       </div>
    </BaseModal>
  );
};
