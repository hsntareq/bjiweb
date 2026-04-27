import React, { useState, useEffect } from 'react';
import { BaseModal } from './BaseModal';

interface BaitulmalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData: any;
  saving: boolean;
}

export const BaitulmalModal: React.FC<BaitulmalModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData = {}, 
  saving 
}) => {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    // Recalculate totals
    const incomeKeys = ['receivedNisab', 'directIanat', 'oneTime', 'electionFund', 'shahidFund', 'floodCollection', 'socialWork', 'zakat', 'fitra', 'iftar', 'delegateFee'];
    const totalIncome = incomeKeys.reduce((acc, key) => acc + (data.income?.[key] || 0), 0);
    const grandTotalIncome = totalIncome + (data.income?.previousMonthSurplus || 0);

    const expenseKeys = ['nisabPaid', 'localExpense', 'oneTime', 'electionFund', 'shahidFund', 'floodCollection', 'socialWork', 'zakat', 'fitra', 'iftar', 'delegateFee'];
    const totalExpense = expenseKeys.reduce((acc, key) => acc + (data.expense?.[key] || 0), 0);
    const monthlySurplus = grandTotalIncome - totalExpense;

    if (data.income?.totalIncome !== totalIncome || data.expense?.totalExpense !== totalExpense || data.expense?.monthlySurplus !== monthlySurplus) {
       setData((prev: any) => ({
          ...prev,
          income: { ...prev.income, totalIncome, grandTotalIncome },
          expense: { ...prev.expense, totalExpense, monthlySurplus, grandTotalExpense: totalExpense + monthlySurplus }
       }));
    }
  }, [data.income, data.expense]);

  const handleIncomeChange = (field: string, value: any) => {
    setData((prev: any) => ({
      ...prev,
      income: { ...prev.income, [field]: value }
    }));
  };

  const handleExpenseChange = (field: string, value: any) => {
    setData((prev: any) => ({
      ...prev,
      expense: { ...prev.expense, [field]: value }
    }));
  };

  const handleNisabChange = (field: string, value: any) => {
    setData((prev: any) => ({
      ...prev,
      nisab: { ...prev.nisab, [field]: value }
    }));
  };

  const incomeItems = [
    { id: 'receivedNisab', label: 'প্রাপ্ত নিছাব' },
    { id: 'directIanat', label: 'সরাসরি ইয়ানত' },
    { id: 'oneTime', label: 'এককালীন /জরুরী(নির্বাচনী ওয়াদা)' },
    { id: 'electionFund', label: 'নির্বাচনী ফান্ড' },
    { id: 'shahidFund', label: 'শহীদ ফান্ড' },
    { id: 'floodCollection', label: 'বিশেষ ও বন্যার্তদের কালেকশন' },
    { id: 'socialWork', label: 'সমাজকল্যাণ ও সমাজসেবা' },
    { id: 'zakat', label: 'যাকাত' },
    { id: 'fitra', label: 'ফিতরা' },
    { id: 'iftar', label: 'ইফতার' },
    { id: 'delegateFee', label: 'ডেলিগেট ফি' }
  ];

  const expenseItems = [
    { id: 'nisabPaid', label: 'নিসাব পরিশোধ' },
    { id: 'localExpense', label: 'স্থানীয় খরচ' },
    { id: 'oneTime', label: 'এককালীন /জরুরী(নির্বাচনী ওয়াদা)' },
    { id: 'electionFund', label: 'নির্বাচনী ফান্ড' },
    { id: 'shahidFund', label: 'শহীদ ফান্ড' },
    { id: 'floodCollection', label: 'বিশেষ ও বন্যার্তদের কালেকশন' },
    { id: 'socialWork', label: 'সমাজকল্যাণ ও সমাজসেবা' },
    { id: 'zakat', label: 'যাকাত' },
    { id: 'fitra', label: 'ফিতরা' },
    { id: 'iftar', label: 'ইফতার' },
    { id: 'delegateFee', label: 'ডেলিগেট ফি' }
  ];

  return (
    <BaseModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="বায়তুলমাল" 
      onSave={() => onSave(data)}
      saving={saving}
      width="max-w-4xl"
    >
       <div className="space-y-6 text-xs">
          <div className="flex justify-between font-bold text-gray-700 p-2 bg-gray-50 rounded">
             <span>ধার্যকৃত নিছাব: <input type="number" value={data.nisab?.allocated || 0} onChange={(e) => handleNisabChange('allocated', parseInt(e.target.value) || 0)} className="w-20 border-b border-gray-300 bg-transparent text-center" /> /=</span>
             <span>ওয়াদাকৃত নিছাব: <input type="number" value={data.nisab?.promised || 0} onChange={(e) => handleNisabChange('promised', parseInt(e.target.value) || 0)} className="w-20 border-b border-gray-300 bg-transparent text-center" /> /=</span>
          </div>

          <div className="grid grid-cols-2 gap-8">
             {/* Income side */}
             <div className="space-y-1">
                <div className="font-bold text-center p-1 bg-emerald-100 text-emerald-800 rounded mb-2">আয়ের বিবরণ</div>
                {incomeItems.map(item => (
                   <div key={item.id} className="flex justify-between items-center border-b pb-1">
                      <span>{item.label}</span>
                      <input type="number" value={data.income?.[item.id] || 0} onChange={(e) => handleIncomeChange(item.id, parseInt(e.target.value) || 0)} className="w-16 border rounded p-0.5 text-right" />
                   </div>
                ))}
                <div className="flex justify-between items-center pt-2 font-bold text-emerald-700">
                   <span>মোট আয় =</span>
                   <span>{data.income?.totalIncome || 0} /=</span>
                </div>
                <div className="flex justify-between items-center pb-1">
                   <span>গত মাসের উদ্বৃত্ত =</span>
                   <input type="number" value={data.income?.previousMonthSurplus || 0} onChange={(e) => handleIncomeChange('previousMonthSurplus', parseInt(e.target.value) || 0)} className="w-16 border rounded p-0.5 text-right" />
                </div>
                <div className="flex justify-between items-center font-bold bg-emerald-50 p-1 rounded">
                   <span>সর্বমোট আয় =</span>
                   <span>{data.income?.grandTotalIncome || 0} /=</span>
                </div>
             </div>

             {/* Expense side */}
             <div className="space-y-1">
                <div className="font-bold text-center p-1 bg-red-100 text-red-800 rounded mb-2">ব্যয়ের বিবরণ</div>
                {expenseItems.map(item => (
                   <div key={item.id} className="flex justify-between items-center border-b pb-1">
                      <span>{item.label}</span>
                      <input type="number" value={data.expense?.[item.id] || 0} onChange={(e) => handleExpenseChange(item.id, parseInt(e.target.value) || 0)} className="w-16 border rounded p-0.5 text-right" />
                   </div>
                ))}
                <div className="flex justify-between items-center pt-2 font-bold text-red-700">
                   <span>মোট ব্যয় =</span>
                   <span>{data.expense?.totalExpense || 0} /=</span>
                </div>
                <div className="flex justify-between items-center pb-1 font-medium text-blue-600">
                   <span>এ মাসের উদ্বৃত্ত =</span>
                   <span className="w-16 text-right pr-1">{data.expense?.monthlySurplus || 0}</span>
                </div>
                <div className="flex justify-between items-center font-bold bg-red-50 p-1 rounded">
                   <span>সর্বমোট ব্যয় =</span>
                   <span>{data.income?.grandTotalIncome || 0} /=</span>
                </div>
             </div>
          </div>
       </div>
    </BaseModal>
  );
};
