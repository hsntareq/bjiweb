import React, { useState } from 'react';
import { BaseModal } from './BaseModal';

interface HRDModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData: any;
  saving: boolean;
}

export const HRDModal: React.FC<HRDModalProps> = ({ 
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
    { id: 'dawah', sl: '১.', label: 'দাওয়াহ' },
    { id: 'social', sl: '২.', label: 'সমাজকর্ম' },
    { id: 'media', sl: '৩.', label: 'মিডিয়া' },
    { id: 'it', sl: '৪.', label: 'আইসিটি' },
    { id: 'finance', sl: '৫.', label: 'অফিস/ফিন্যান্সিয়াল ম্যানেজমেন্ট' },
    { id: 'english', sl: '৬.', label: 'ইংরেজি ভাষা' },
    { id: 'arabic', sl: '৭.', label: 'আরবী ভাষা' },
    { id: 'technical', sl: '৮.', label: 'ট্রেডভিত্তিক কারিগরি প্রশিক্ষণ' }
  ];

  return (
    <BaseModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="খ) মানবসম্পদ উন্নয়ন কোর্স সমূহ" 
      onSave={() => onSave(data)}
      saving={saving}
    >
       <div className="overflow-x-auto">
          <table className="w-full text-xs">
             <thead>
                <tr className="bg-gray-100">
                   <th className="p-2 text-left">ক্রম</th>
                   <th className="p-2 text-left">প্রশিক্ষণ কোর্সের নাম</th>
                   <th className="p-2 text-center">পরিচালিত কোর্স সংখ্যা</th>
                   <th className="p-2 text-center">কোর্স সম্পন্নকারী সংখ্যা</th>
                   <th className="p-2 text-center">অন্য প্রতিষ্ঠান হতে</th>
                   <th className="p-2 text-center">মোট কতজন</th>
                </tr>
             </thead>
             <tbody>
                {rows.map(row => (
                   <tr key={row.id} className="border-b">
                      <td className="p-2 text-center">{row.sl}</td>
                      <td className="p-2 font-medium">{row.label}</td>
                      <td className="p-2"><input type="number" value={data[row.id]?.conductedCount || 0} onChange={(e) => handleTableChange(row.id, 'conductedCount', parseInt(e.target.value) || 0)} className="w-12 border rounded p-1 text-center" /></td>
                      <td className="p-2"><input type="number" value={data[row.id]?.completedCount || 0} onChange={(e) => handleTableChange(row.id, 'completedCount', parseInt(e.target.value) || 0)} className="w-12 border rounded p-1 text-center" /></td>
                      <td className="p-2"><input type="number" value={data[row.id]?.othersCompletedCount || 0} onChange={(e) => handleTableChange(row.id, 'othersCompletedCount', parseInt(e.target.value) || 0)} className="w-12 border rounded p-1 text-center" /></td>
                      <td className="p-2"><input type="number" value={data[row.id]?.totalCount || 0} onChange={(e) => handleTableChange(row.id, 'totalCount', parseInt(e.target.value) || 0)} className="w-12 border rounded p-1 text-center" /></td>
                   </tr>
                ))}
             </tbody>
          </table>
       </div>
    </BaseModal>
  );
};
