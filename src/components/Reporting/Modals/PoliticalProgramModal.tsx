import React, { useState } from 'react';
import { BaseModal } from './BaseModal';

interface PoliticalProgramModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData: any;
  saving: boolean;
}

export const PoliticalProgramModal: React.FC<PoliticalProgramModalProps> = ({ 
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

  const handleDeepChange = (rowId: string, field: string, subField: string, value: any) => {
    setData((prev: any) => ({
      ...prev,
      [rowId]: {
        ...prev[rowId],
        [field]: { ...prev[rowId]?.[field], [subField]: value }
      }
    }));
  };

  const rows = [
    { id: 'centerProgram', label: 'কেন্দ্র ঘোষিত রাজনৈতিক কর্মসূচি পালন', f: ['val'] },
    { id: 'localProgram', label: 'স্থানীয়ভাবে ঘোষিত কর্মসূচি: জনসভা/সমাবেশ/মিছিল', f: ['gathering', 'meeting', 'procession'] },
    { id: 'distribution', label: 'পোস্টার/লিফলেট/বুকলেট/স্মারকলিপি বিতরণ', f: ['poster', 'leaflet', 'booklet', 'memorandum'] }
  ];

  return (
    <BaseModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="২. কর্মসূচি বাস্তবায়ন" 
      onSave={() => onSave(data)}
      saving={saving}
    >
       <div className="overflow-x-auto">
          <table className="w-full text-xs">
             <thead>
                <tr className="bg-gray-100">
                   <th className="p-2 text-left">কর্মসূচির বিবরণ</th>
                   <th className="p-2 text-center">মোট সংখ্যা</th>
                   <th className="p-2 text-center">গড় উপস্থিতি</th>
                </tr>
             </thead>
             <tbody>
                {rows.map(row => (
                   <tr key={row.id} className="border-b">
                      <td className="p-2 font-medium">{row.label}</td>
                      <td className="p-2">
                         <div className="flex gap-1 justify-center">
                            {row.f.map(sub => (
                               <input key={sub} type="number" placeholder={sub} value={data[row.id]?.count?.[sub] || 0} onChange={(e) => handleDeepChange(row.id, 'count', sub, parseInt(e.target.value) || 0)} className="w-10 border rounded p-1 text-center" />
                            ))}
                         </div>
                      </td>
                      <td className="p-2">
                         <div className="flex gap-1 justify-center">
                            {row.f.map(sub => (
                               <input key={sub} type="number" placeholder={sub} value={data[row.id]?.avgAttendance?.[sub] || 0} onChange={(e) => handleDeepChange(row.id, 'avgAttendance', sub, parseInt(e.target.value) || 0)} className="w-10 border rounded p-1 text-center" />
                            ))}
                         </div>
                      </td>
                   </tr>
                ))}
             </tbody>
          </table>
       </div>
    </BaseModal>
  );
};
