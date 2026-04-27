import React, { useState } from 'react';
import { BaseModal } from './BaseModal';

interface DawatTablighModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData: any;
  saving: boolean;
}

export const DawatTablighModal: React.FC<DawatTablighModalProps> = ({ 
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

  return (
    <BaseModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="দাওয়াত ও তাবলীগী রিপোর্ট" 
      onSave={() => onSave(data)}
      saving={saving}
    >
      <div className="space-y-8">
        
        {/* Header Info */}
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
          <h4 className="font-bold text-gray-800 mb-4">ক) জনসাধারণের মাঝে দাওয়াত:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1">সর্বমোট দাওয়াত প্রদান সংখ্যা</label>
              <input type="number" value={data.headerInfo?.totalReachedCount || 0} onChange={(e) => handleChange('headerInfo', 'totalReachedCount', parseInt(e.target.value) || 0)} className="w-full border rounded-lg p-2" />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">মোট জনসংখ্যা</label>
              <input type="number" value={data.headerInfo?.totalPopulationCount || 0} onChange={(e) => handleChange('headerInfo', 'totalPopulationCount', parseInt(e.target.value) || 0)} className="w-full border rounded-lg p-2" />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">টার্গেট (মাসিক)</label>
              <input type="number" value={data.headerInfo?.monthlyTargetCount || 0} onChange={(e) => handleChange('headerInfo', 'monthlyTargetCount', parseInt(e.target.value) || 0)} className="w-full border rounded-lg p-2" />
            </div>
          </div>
        </div>

        {/* 1. Unit regular dawat */}
        <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
           <h4 className="font-bold text-blue-800 mb-4">১. ইউনিটে নিয়মিত গ্রুপভিত্তিক দাওয়াত:</h4>
           <div className="grid grid-cols-2 gap-4">
              <div>
                 <label className="block text-xs font-semibold mb-1">কতটি গ্রুপ বের হয়েছে</label>
                 <input type="number" value={data.unitDawat?.groupCount || 0} onChange={(e) => handleChange('unitDawat', 'groupCount', parseInt(e.target.value) || 0)} className="w-full border rounded-lg p-2" />
              </div>
              <div>
                 <label className="block text-xs font-semibold mb-1">অংশগ্রহণকারীর সংখ্যা</label>
                 <input type="number" value={data.unitDawat?.participantCount || 0} onChange={(e) => handleChange('unitDawat', 'participantCount', parseInt(e.target.value) || 0)} className="w-full border rounded-lg p-2" />
              </div>
              <div>
                 <label className="block text-xs font-semibold mb-1">পৌঁছানো হয়েছে</label>
                 <input type="number" value={data.unitDawat?.reachedCount || 0} onChange={(e) => handleChange('unitDawat', 'reachedCount', parseInt(e.target.value) || 0)} className="w-full border rounded-lg p-2" />
              </div>
              <div>
                 <label className="block text-xs font-semibold mb-1">সহযোগী সদস্য হয়েছেন</label>
                 <input type="number" value={data.unitDawat?.associateCount || 0} onChange={(e) => handleChange('unitDawat', 'associateCount', parseInt(e.target.value) || 0)} className="w-full border rounded-lg p-2" />
              </div>
           </div>
        </div>

        {/* 2. Personal Dawat */}
        <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
           <h4 className="font-bold text-emerald-800 mb-4">২. ব্যক্তিগত ও টার্গেটভিত্তিক দাওয়াত:</h4>
           <div className="grid grid-cols-1 gap-6">
              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-xs font-semibold mb-1">সদস্য (রুকন) কাজ করেছেন</label>
                    <input type="number" value={data.personalDawat?.rokonWorked || 0} onChange={(e) => handleChange('personalDawat', 'rokonWorked', parseInt(e.target.value) || 0)} className="w-full border rounded-lg p-2" />
                 </div>
                 <div>
                    <label className="block text-xs font-semibold mb-1">কর্মী কাজ করেছেন</label>
                    <input type="number" value={data.personalDawat?.karmiWorked || 0} onChange={(e) => handleChange('personalDawat', 'karmiWorked', parseInt(e.target.value) || 0)} className="w-full border rounded-lg p-2" />
                 </div>
              </div>
           </div>
        </div>

        {/* 3. General Meeting */}
        <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100">
           <h4 className="font-bold text-amber-800 mb-4">৩. সাধারণ সভা/দাওয়াতী সভা:</h4>
           <div className="grid grid-cols-2 gap-4">
              <div>
                 <label className="block text-xs font-semibold mb-1">মোট কতজনকে দাওয়াত প্রদান করা হয়েছে</label>
                 <input type="number" value={data.generalMeeting?.totalReached || 0} onChange={(e) => handleChange('generalMeeting', 'totalReached', parseInt(e.target.value) || 0)} className="w-full border rounded-lg p-2" />
              </div>
              <div>
                 <label className="block text-xs font-semibold mb-1">কতজন সহযোগী সদস্য হয়েছেন</label>
                 <input type="number" value={data.generalMeeting?.associateCount || 0} onChange={(e) => handleChange('generalMeeting', 'associateCount', parseInt(e.target.value) || 0)} className="w-full border rounded-lg p-2" />
              </div>
           </div>
        </div>

        {/* 4. PR Campaign Table */}
        <div>
          <h4 className="font-bold text-gray-800 mb-4 uppercase tracking-wide border-l-4 border-indigo-500 pl-3">৪. গণসংযোগ ও দাওয়াতী অভিযান পালন:</h4>
          <div className="overflow-x-auto">
             <table className="w-full text-xs">
                <thead>
                   <tr className="bg-indigo-50 text-indigo-700">
                      <th className="p-2 text-left">বিবরণ</th>
                      <th className="p-2 text-right">গ্রুপ সংখ্যা</th>
                      <th className="p-2 text-right">অংশগ্রহণকারী</th>
                      <th className="p-2 text-right">পৌঁছানো হয়েছে</th>
                      <th className="p-2 text-right">সহযোগী সদস্য</th>
                   </tr>
                </thead>
                <tbody>
                   {[
                     { id: 'prDecade', label: 'গণসংযোগ দশক/পক্ষ' },
                     { id: 'districtCampaign', label: 'জেলা/মহানগর ঘোষিত অভিযান' },
                     { id: 'electionWeek', label: 'নির্বাচনী আসনে গণসংযোগ সপ্তাহ' },
                     { id: 'proWeek', label: 'উলামা/পেশাজীবী গণসংযোগ সপ্তাহ' },
                     { id: 'other', label: 'অন্যান্য' }
                   ].map(row => (
                     <tr key={row.id} className="border-b">
                        <td className="p-2 font-medium">{row.label}</td>
                        <td className="p-2"><input type="number" value={data.prCampaign?.[row.id]?.groupCount || 0} onChange={(e) => handleTableChange('prCampaign', row.id, 'groupCount', parseInt(e.target.value) || 0)} className="w-16 border rounded p-1 text-right ml-auto block" /></td>
                        <td className="p-2"><input type="number" value={data.prCampaign?.[row.id]?.participantCount || 0} onChange={(e) => handleTableChange('prCampaign', row.id, 'participantCount', parseInt(e.target.value) || 0)} className="w-16 border rounded p-1 text-right ml-auto block" /></td>
                        <td className="p-2"><input type="number" value={data.prCampaign?.[row.id]?.reachedCount || 0} onChange={(e) => handleTableChange('prCampaign', row.id, 'reachedCount', parseInt(e.target.value) || 0)} className="w-16 border rounded p-1 text-right ml-auto block" /></td>
                        <td className="p-2"><input type="number" value={data.prCampaign?.[row.id]?.associateCount || 0} onChange={(e) => handleTableChange('prCampaign', row.id, 'associateCount', parseInt(e.target.value) || 0)} className="w-16 border rounded p-1 text-right ml-auto block" /></td>
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
