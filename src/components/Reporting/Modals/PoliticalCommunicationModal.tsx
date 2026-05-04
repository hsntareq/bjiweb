import React, { useState } from 'react';
import { BaseModal } from './BaseModal';

interface PoliticalCommunicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData: any;
  saving: boolean;
  rows?: { id: string; label: string }[];
}

export const PoliticalCommunicationModal: React.FC<PoliticalCommunicationModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData = {}, 
  saving,
  rows = [
    { id: 'political', label: 'রাজনৈতিক ব্যক্তিবর্গ' },
    { id: 'admin', label: 'প্রশাসনিক ব্যক্তিবর্গ' }
  ]
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

  return (
    <BaseModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="১. রাজনৈতিক ও প্রশাসনিক যোগাযোগ" 
      onSave={() => onSave(data)}
      saving={saving}
    >
       <div className="overflow-x-auto">
          <table className="w-full text-xs">
             <thead>
                <tr className="bg-gray-100">
                   <th className="p-2 text-left">যোগাযোগের ধরণ</th>
                   <th className="p-2 text-center">মোট কতজন যোগাযোগ করেছেন</th>
                   <th className="p-2 text-center">মোট কতজনের সাথে যোগাযোগ হয়েছে</th>
                </tr>
             </thead>
             <tbody>
                {rows.map(row => (
                   <tr key={row.id} className="border-b">
                      <td className="p-2 font-medium">{row.label}</td>
                      <td className="p-2"><input type="number" value={data[row.id]?.communicatedCount || 0} onChange={(e) => handleTableChange(row.id, 'communicatedCount', parseInt(e.target.value) || 0)} className="w-20 border rounded p-1 text-center mx-auto block" /></td>
                      <td className="p-2"><input type="number" value={data[row.id]?.reachedCount || 0} onChange={(e) => handleTableChange(row.id, 'reachedCount', parseInt(e.target.value) || 0)} className="w-20 border rounded p-1 text-center mx-auto block" /></td>
                   </tr>
                ))}
             </tbody>
          </table>
       </div>
    </BaseModal>
  );
};
