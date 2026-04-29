import React, { useState } from 'react';
import { BaseModal } from './BaseModal';

interface NationalDayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData: any;
  saving: boolean;
}

export const NationalDayModal: React.FC<NationalDayModalProps> = ({ 
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
    { id: 'independenceDay', label: 'স্বাধীনতা ও জাতীয় দিবস' },
    { id: 'victoryDay', label: 'বিজয় দিবস' },
    { id: 'motherLanguageDay', label: 'আন্তর্জাতিক মাতৃভাষা দিবস' },
    { id: 'others', label: 'অন্যান্য' }
  ];

  return (
    <BaseModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="৩. জাতীয় ও আন্তর্জাতিক দিবস পালন" 
      onSave={() => onSave(data)}
      saving={saving}
    >
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rows.map(row => (
             <div key={row.id} className="p-3 border rounded-xl bg-gray-50/50">
                <h5 className="text-xs font-bold text-gray-700 mb-2">{row.label}</h5>
                <div className="grid grid-cols-2 gap-2">
                   <div>
                      <label className="text-xs block text-gray-500 uppercase">প্রোগ্রাম সংখ্যা</label>
                      <input type="number" value={data[row.id]?.programCount || 0} onChange={(e) => handleTableChange(row.id, 'programCount', parseInt(e.target.value) || 0)} className="w-full border rounded p-1 text-center" />
                   </div>
                   <div>
                      <label className="text-xs block text-gray-500 uppercase">গড় উপস্থিতি</label>
                      <input type="number" value={data[row.id]?.avgAttendance || 0} onChange={(e) => handleTableChange(row.id, 'avgAttendance', parseInt(e.target.value) || 0)} className="w-full border rounded p-1 text-center" />
                   </div>
                </div>
             </div>
          ))}
       </div>
    </BaseModal>
  );
};
