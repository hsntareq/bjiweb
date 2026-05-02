import React, { useState } from 'react';
import { BaseModal } from './BaseModal';

interface RemarksModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData: any;
  saving: boolean;
}

export const RemarksModal: React.FC<RemarksModalProps> = ({ 
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

  const handleListChange = (section: string, index: number, value: string) => {
    const list = [...(data[section] || ['', '', '', '', ''])];
    list[index] = value;
    setData((prev: any) => ({ ...prev, [section]: list }));
  };

  const commonProblems = [
    'কিছু জনশক্তির মাঝে যথাযথ দ্বীনি চেতনার অভাব',
    'কিছু জনশক্তির কর্মক্ষেত্রের ব্যস্ততা',
    'কিছু জনশক্তি শারীরিকভাবে অসুস্থ থাকা',
    'অধ্যয়ন ও রিপোর্টে ঘাটতি থাকা',
    'নির্বাচনী কাজের ব্যস্ততায় নিয়মিত প্রোগ্রামগুলো কম হওয়া',
    'বাইতুলমালের ইয়ানত আদায়ে শ্লথগতি',
    'ইউনিট ভিত্তিক কাজ বন্টনে অস্পষ্টতা',
    'দাওয়াহ কাজে দাওয়াতী উপকরণের অপ্রতুলতা',
    'নতুন কর্মীদের ফলো-আপে ঘাটতি',
    'ব্যক্তিগত পাঠ ও জ্ঞানার্জনে আগ্রহের অভাব'
  ];

  const commonOpportunities = [
    'ময়দান অত্যন্ত উর্বর ও পরিবর্তিত পরিস্থিতিতে নতুনদের মাঝে আগ্রহ সৃষ্টি',
    'কিছু কর্মীদের মাঝে মানোন্নয়নের ধারাবাহিকতা থাকা',
    'নির্বাচনী কার্যক্রমে অংশ নেয়ার ফলে রাজনৈতিকভাবে শক্ত অবস্থান তৈরি হওয়া',
    'নিবিড় তত্ত্বাবধানের ফলে কর্মীদের মাঝে কর্মতৎপরতা দৃশ্যমান',
    'নির্বাচনী কার্যক্রমে স্বতঃস্ফূর্ত অংশগ্রহণ',
    'স্থানীয় শিক্ষিত যুবকদের মাঝে কাজের চমৎকার ক্ষেত্র তৈরি হওয়া',
    'সোশ্যাল মিডিয়ার মাধ্যমে দাওয়াহ প্রসারের সম্ভাবনা',
    'অমুসলিমদের মাঝে সেবামূলক কাজের মাধ্যমে সুসম্পর্ক তৈরি',
    'এলাকা ভিত্তিক ছোট ছোট গ্রুপ মিটিংয়ের মাধ্যমে কাজের গতি বৃদ্ধি',
    'নারী অঙ্গনে কাজের নতুন দিগন্ত উন্মোচন'
  ];

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const addSuggestion = (section: string, suggestion: string) => {
    const list = [...(data[section] || ['', '', '', '', ''])];
    const emptyIndex = list.findIndex(item => !item);
    
    if (emptyIndex !== -1) {
      list[emptyIndex] = suggestion;
    } else {
      list.push(suggestion);
    }
    
    setData((prev: any) => ({ ...prev, [section]: list }));
    setActiveDropdown(null);
  };

  const sections = [
    { id: 'problems', label: 'সমস্যাঃ', color: 'red', suggestions: commonProblems },
    { id: 'opportunities', label: 'সম্ভাবনাঃ', color: 'emerald', suggestions: commonOpportunities }
  ];

  return (
    <BaseModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="৭. ওয়ার্ড সভাপতির মন্তব্যঃ" 
      onSave={() => {
        const cleaned: any = {};
        for (const key of Object.keys(data)) {
          cleaned[key] = Array.isArray(data[key])
            ? data[key].filter((v: string) => v && v.trim())
            : data[key];
        }
        onSave(cleaned);
      }}
      saving={saving}
      width="max-w-4xl"
    >
       <div className="space-y-8" onClick={() => setActiveDropdown(null)}>
          <p className="text-xs italic text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-100">
             এ মাসের মাসিক প্রতিবেদন পেশ করতে সক্ষম হওয়ায় মহান রবের দরবারে শুকরিয়া আদায় করছি। পরিকল্পনা অনুযায়ী যেসব কাজ সম্পন্ন হয়েছে, তা একান্তই মহান প্রভুর রহমতেই সম্ভব হয়েছে। আর যেসব কাজ এখনো সম্পন্ন করা সম্ভব হয়নি, সেক্ষেত্রে প্রধান দায়িত্বশীল হিসেবে আমার সীমাবদ্ধতা ও দুর্বলতাই মূলত দায়ী। পাশাপাশি যে সকল বাস্তব কারণ প্রতিবন্ধকতা সৃষ্টি করেছে, সেগুলোর বিবরণ এবং ময়দানের বিদ্যমান সম্ভাবনাসমূহ নিচে উল্লেখ করা হলো।
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {sections.map(section => (
                <div key={section.id} className="space-y-4">
                   <div className="flex justify-between items-center border-b pb-2">
                      <h4 className={`font-bold text-sm text-${section.color}-700`}>{section.label}</h4>
                      <div className="relative">
                        <button 
                          onClick={(e) => { e.stopPropagation(); setActiveDropdown(activeDropdown === section.id ? null : section.id); }}
                          className={`text-xs bg-${section.color}-50 text-${section.color}-600 px-2 py-1 rounded-full border border-${section.color}-100 hover:bg-${section.color}-100 transition-colors`}
                        >
                          + সাধারণ {section.label} যুক্ত করুন
                        </button>
                        {activeDropdown === section.id && (
                          <div className="absolute right-0 top-full mt-1 w-64 bg-white border shadow-xl rounded-lg z-50 p-2 space-y-1 animate-in fade-in zoom-in duration-200 max-h-60 overflow-y-auto">
                            <div className="text-xs font-bold text-gray-400 px-2 pb-1 border-b uppercase mb-1 sticky top-0 bg-white">পছন্দ করুন:</div>
                            {section.suggestions.map((s, idx) => (
                              <button 
                                key={idx} 
                                onClick={(e) => { e.stopPropagation(); addSuggestion(section.id, s); }}
                                className="w-full text-left p-2 text-xs hover:bg-gray-50 rounded transition-colors border-b border-gray-50 last:border-0"
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                   </div>
                   <div className="space-y-3">
                      {(data[section.id] || ['', '', '', '', '']).map((val: string, idx: number) => (
                         <div key={idx} className="flex gap-2 items-center">
                            <span className="text-xs font-bold text-gray-400">{idx + 1}.</span>
                            <input 
                               type="text" 
                               value={val || ''} 
                               onChange={(e) => handleListChange(section.id, idx, e.target.value)} 
                               className={`w-full border border-${section.color}-100 rounded p-2 text-xs focus:ring-1 focus:ring-${section.color}-400 outline-none`}
                               placeholder={`পয়েন্ট ${idx + 1}`}
                            />
                            {idx >= 5 && (
                              <button 
                                onClick={() => {
                                  const newList = [...data[section.id]];
                                  newList.splice(idx, 1);
                                  setData((prev: any) => ({ ...prev, [section.id]: newList }));
                                }}
                                className="text-red-300 hover:text-red-500 text-xs px-1"
                              >
                                ×
                              </button>
                            )}
                         </div>
                      ))}
                   </div>
                </div>
             ))}
          </div>

          <p className="text-xs text-center text-gray-500 font-medium py-4 border-t">
             মহান আল্লাহ আমাদের সব সমস্যার ঊর্ধ্বে ওঠার তাওফিক দান করুন, সম্ভাবনাগুলোকে যথাযথভাবে কাজে লাগানোর বুদ্ধি দিন, সুপরিকল্পনা গ্রহণ ও তা বাস্তবায়নে সদা সচেষ্ট রাখুন এবং ময়দানে সিসা ঢালার ন্যায় দৃঢ় ও ঐক্যবদ্ধ হয়ে কেবল তাঁর সন্তুষ্টি অর্জনের চেষ্টা করার তাওফিক দিয়ে আমাদের কবুল করুন। আমিন!
          </p>
       </div>
    </BaseModal>
  );
};
