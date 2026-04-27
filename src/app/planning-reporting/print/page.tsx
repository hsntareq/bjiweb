'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Printer } from 'lucide-react';

export default function ReportPrintPage() {
  const searchParams = useSearchParams();
  const orgId = searchParams.get('orgId');
  const year = searchParams.get('year');
  const month = searchParams.get('month');
  const accessToken = searchParams.get('token');

  const [report, setReport] = useState<any>(null);
  const [orgName, setOrgName] = useState('');

  const monthNames = [
    "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
    "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
  ];

  const formatVal = (val: any) => (val === 0 || val === "0" || !val) ? "-" : val;

  useEffect(() => {
    if (orgId && year && month) {
      fetch(`http://localhost:3001/comprehensive-report/organization/${orgId}?year=${year}&month=${month}`, {
        headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {}
      })
      .then(res => res.json())
      .then(data => setReport(data));

      fetch(`http://localhost:3001/organization/${orgId}`, {
        headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {}
      })
      .then(res => res.json())
      .then(data => setOrgName(data.name));
    }
  }, [orgId, year, month, accessToken]);

  if (!report) return <div className="p-10 flex items-center justify-center font-bold text-gray-400">Loading report for print...</div>;

  return (
    <div className="bg-white min-h-screen text-black p-4 md:p-8 font-serif">
      <div className="max-w-[8.5in] mx-auto border border-gray-200 p-8 shadow-sm print:shadow-none print:border-none print:p-0" id="print-area">
        
        {/* Header */}
        <div className="text-center mb-6 space-y-1">
          <p className="text-[10px] font-medium">বিসমিল্লাহির রাহমানির রাহিম</p>
          <h1 className="text-xl font-bold border-b-2 border-black inline-block pb-1 px-4 mb-2">ওয়ার্ড সংগঠনের মাসিক রিপোর্ট</h1>
          <div className="flex justify-between text-[11px] font-bold border-y border-black py-1 mt-4">
             <span>মাস: {monthNames[parseInt(month!) - 1]}</span>
             <span>ওয়ার্ড নং/নাম: {orgName}</span>
             <span>সন: {year}</span>
          </div>
        </div>

        {/* Section 1: দাওয়াত */}
        <div className="mb-6">
          <h2 className="text-sm font-bold bg-gray-100 p-1 border border-black mb-2">১. দাওয়াত</h2>
          <div className="grid grid-cols-2 gap-4">
             <div>
                <h3 className="text-[10px] font-bold mb-1 italic">ক. দাওয়াতী ও পারিবারিক ইউনিট ভিত্তিক কাজ:</h3>
                <table className="w-full border-collapse border border-black text-[9px]">
                   <tbody>
                      <tr><td className="border border-black p-1">দাওয়াতী ইউনিট সংখ্যা</td><td className="border border-black p-1 text-center font-bold">{formatVal(report.dawah?.unit?.dawahUnitCount)}</td></tr>
                      <tr><td className="border border-black p-1">পারিবারিক ইউনিট সংখ্যা</td><td className="border border-black p-1 text-center font-bold">{formatVal(report.dawah?.unit?.familyUnitCount)}</td></tr>
                      <tr><td className="border border-black p-1">দাওয়াতী বৈঠক সংখ্যা</td><td className="border border-black p-1 text-center font-bold">{formatVal(report.dawah?.unit?.dawahMeetingCount)}</td></tr>
                      <tr><td className="border border-black p-1">উপস্থিতি</td><td className="border border-black p-1 text-center font-bold">{formatVal(report.dawah?.unit?.attendance)}</td></tr>
                   </tbody>
                </table>
             </div>
             <div>
                <h3 className="text-[10px] font-bold mb-1 italic">খ. ব্যক্তিগত দাওয়াত ও সহযোগী সদস্য তৈরি:</h3>
                <table className="w-full border-collapse border border-black text-[9px]">
                   <thead>
                      <tr className="bg-gray-50"><th className="border border-black p-1">বিবরণ</th><th className="border border-black p-1 text-center">রুকন</th><th className="border border-black p-1 text-center">কর্মী</th></tr>
                   </thead>
                   <tbody>
                      <tr><td className="border border-black p-1">মোট সংখ্যা</td><td className="border border-black p-1 text-center font-bold">{formatVal(report.dawah?.personal?.rokonTotal)}</td><td className="border border-black p-1 text-center font-bold">{formatVal(report.dawah?.personal?.karmiTotal)}</td></tr>
                      <tr><td className="border border-black p-1">কাজ করেছেন</td><td className="border border-black p-1 text-center font-bold">{formatVal(report.dawah?.personal?.rokonWorked)}</td><td className="border border-black p-1 text-center font-bold">{formatVal(report.dawah?.personal?.karmiWorked)}</td></tr>
                   </tbody>
                </table>
             </div>
          </div>
          <div className="mt-3">
             <h3 className="text-[10px] font-bold mb-1 italic">গ. দাওয়াত ও তাবলীগ ভিত্তিক কাজ:</h3>
             <table className="w-full border-collapse border border-black text-[9px]">
                <thead>
                   <tr className="bg-gray-50">
                      <th className="border border-black p-1">বিবরণ</th>
                      <th className="border border-black p-1">সংখ্যা</th>
                      <th className="border border-black p-1">উপস্থিতি</th>
                      <th className="border border-black p-1">সহযোগী সদস্য বৃদ্ধি</th>
                   </tr>
                </thead>
                <tbody>
                   <tr><td className="border border-black p-1">সাধারণ সভা</td><td className="border border-black p-1 text-center font-bold">{formatVal(report.dawah?.tabligh?.generalMeetingCount)}</td><td className="border border-black p-1 text-center font-bold">{formatVal(report.dawah?.tabligh?.generalMeetingAttendance)}</td><td className="border border-black p-1 text-center font-bold">{formatVal(report.dawah?.tabligh?.generalMeetingAssociateIncrease)}</td></tr>
                   <tr><td className="border border-black p-1">উন্মুক্ত আলোচনা</td><td className="border border-black p-1 text-center font-bold">{formatVal(report.dawah?.tabligh?.openDiscussionCount)}</td><td className="border border-black p-1 text-center font-bold">{formatVal(report.dawah?.tabligh?.openDiscussionAttendance)}</td><td className="border border-black p-1 text-center font-bold">{formatVal(report.dawah?.tabligh?.openDiscussionAssociateIncrease)}</td></tr>
                   <tr><td className="border border-black p-1">সুধী সমাবেশ</td><td className="border border-black p-1 text-center font-bold">{formatVal(report.dawah?.tabligh?.sudhiMeetingCount)}</td><td className="border border-black p-1 text-center font-bold">{formatVal(report.dawah?.tabligh?.sudhiMeetingAttendance)}</td><td className="border border-black p-1 text-center font-bold">{formatVal(report.dawah?.tabligh?.sudhiMeetingAssociateIncrease)}</td></tr>
                </tbody>
             </table>
          </div>
        </div>

        {/* Section 2: সংগঠনঃ */}
        <div className="mb-6">
          <h2 className="text-sm font-bold bg-gray-100 p-1 border border-black mb-2">২. সংগঠনঃ</h2>
          <div className="grid grid-cols-2 gap-6">
             <div>
                <h3 className="text-[10px] font-bold mb-1">ক. জনশক্তি ও দপ্তর:</h3>
                <table className="w-full border-collapse border border-black text-[8px]">
                   <thead>
                      <tr className="bg-gray-50"><th className="border border-black p-1">জনশক্তি</th><th className="border border-black p-1 text-center">পূর্বের</th><th className="border border-black p-1 text-center">বৃদ্ধি</th><th className="border border-black p-1 text-center">ঘাটতি</th><th className="border border-black p-1 text-center">বর্তমান</th></tr>
                   </thead>
                   <tbody>
                      {['rokon', 'karmi', 'associate'].map(key => (
                         <tr key={key}>
                            <td className="border border-black p-1 capitalize">{key === 'rokon' ? 'রুকন' : key === 'karmi' ? 'কর্মী' : 'সহযোগী সদস্য'}</td>
                            <td className="border border-black p-1 text-center">{formatVal(report.organization?.manpower?.[key]?.previous)}</td>
                            <td className="border border-black p-1 text-center">{formatVal(report.organization?.manpower?.[key]?.increase)}</td>
                            <td className="border border-black p-1 text-center">{formatVal(report.organization?.manpower?.[key]?.decrease)}</td>
                            <td className="border border-black p-1 text-center font-bold">{formatVal(report.organization?.manpower?.[key]?.current)}</td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
             <div>
                <h3 className="text-[10px] font-bold mb-1">খ. সাংগঠনিক বৈঠকাদি:</h3>
                <table className="w-full border-collapse border border-black text-[8px]">
                   <thead>
                      <tr className="bg-gray-50"><th className="border border-black p-1">বৈঠকের ধরণ</th><th className="border border-black p-1 text-center">সংখ্যা</th><th className="border border-black p-1 text-center">টার্গেট</th><th className="border border-black p-1 text-center">উপস্থিতি</th></tr>
                   </thead>
                   <tbody>
                      <tr><td className="border border-black p-1">ওয়ার্ড টিম বৈঠক</td><td className="border border-black p-1 text-center">{formatVal(report.organization?.meetings?.wardTeam?.count)}</td><td className="border border-black p-1 text-center">{formatVal(report.organization?.meetings?.wardTeam?.target)}</td><td className="border border-black p-1 text-center">{formatVal(report.organization?.meetings?.wardTeam?.attendance)}</td></tr>
                      <tr><td className="border border-black p-1">ওয়ার্ড মাসিক সাধারণ সভা</td><td className="border border-black p-1 text-center">{formatVal(report.organization?.meetings?.wardMonthly?.count)}</td><td className="border border-black p-1 text-center">{formatVal(report.organization?.meetings?.wardMonthly?.target)}</td><td className="border border-black p-1 text-center">{formatVal(report.organization?.meetings?.wardMonthly?.attendance)}</td></tr>
                   </tbody>
                </table>
             </div>
          </div>
        </div>

        {/* Section 6: বায়তুলমাল */}
        <div className="mb-6">
          <h2 className="text-sm font-bold bg-gray-100 p-1 border border-black mb-2 text-center uppercase">৬. বায়তুলমাল</h2>
          <div className="flex justify-between text-[9px] font-bold mb-2">
             <span>ধার্যকৃত নিছাব: {formatVal(report.finance?.nisab?.allocated)} /=</span>
             <span>ওয়াদাকৃত নিছাব: {formatVal(report.finance?.nisab?.promised)} /=</span>
          </div>
          <div className="grid grid-cols-2 gap-0 border border-black">
             <div className="border-r border-black">
                <table className="w-full text-[8px]">
                   <thead><tr className="bg-emerald-50 border-b border-black font-bold text-center"><th className="p-1">আয়ের বিবরণ</th><th className="p-1 border-l border-black">আয় (৳)</th></tr></thead>
                   <tbody>
                      {[
                        { id: 'receivedNisab', label: 'প্রাপ্ত নিছাব' },
                        { id: 'directIanat', label: 'সরাসরি ইয়ানত' },
                        { id: 'oneTime', label: 'এককালীন /জরুরী' },
                        { id: 'electionFund', label: 'নির্বাচনী ফান্ড' },
                        { id: 'shahidFund', label: 'শহীদ ফান্ড' },
                        { id: 'zakat', label: 'যাকাত' },
                        { id: 'fitra', label: 'ফিতরা' }
                      ].map(item => (
                         <tr key={item.id} className="border-b border-black">
                            <td className="p-1">{item.label}</td>
                            <td className="p-1 text-right border-l border-black font-bold">{formatVal(report.finance?.income?.[item.id])}</td>
                         </tr>
                      ))}
                      <tr className="font-bold"><td className="p-1">মোট আয়</td><td className="p-1 text-right border-l border-black underline decoration-double">{formatVal(report.finance?.income?.totalIncome)}</td></tr>
                      <tr><td className="p-1">গত মাসের উদ্বৃত্ত</td><td className="p-1 text-right border-l border-black">{formatVal(report.finance?.income?.previousMonthSurplus)}</td></tr>
                      <tr className="bg-gray-100 font-bold border-t border-black"><td className="p-1">সর্বমোট আয়</td><td className="p-1 text-right border-l border-black">{formatVal(report.finance?.income?.grandTotalIncome)}</td></tr>
                   </tbody>
                </table>
             </div>
             <div>
                <table className="w-full text-[8px]">
                   <thead><tr className="bg-red-50 border-b border-black font-bold text-center"><th className="p-1">ব্যয়ের বিবরণ</th><th className="p-1 border-l border-black">ব্যয় (৳)</th></tr></thead>
                   <tbody>
                      {[
                        { id: 'nisabPaid', label: 'নিসাব পরিশোধ' },
                        { id: 'localExpense', label: 'স্থানীয় খরচ' },
                        { id: 'oneTime', label: 'এককালীন /জরুরী' },
                        { id: 'electionFund', label: 'নির্বাচনী ফান্ড' },
                        { id: 'shahidFund', label: 'শহীদ ফান্ড' },
                        { id: 'zakat', label: 'যাকাত' },
                        { id: 'fitra', label: 'ফিতরা' }
                      ].map(item => (
                         <tr key={item.id} className="border-b border-black">
                            <td className="p-1">{item.label}</td>
                            <td className="p-1 text-right border-l border-black font-bold">{formatVal(report.finance?.expense?.[item.id])}</td>
                         </tr>
                      ))}
                      <tr className="font-bold"><td className="p-1">মোট ব্যয়</td><td className="p-1 text-right border-l border-black underline decoration-double">{formatVal(report.finance?.expense?.totalExpense)}</td></tr>
                      <tr className="text-blue-700"><td className="p-1">এ মাসের উদ্বৃত্ত</td><td className="p-1 text-right border-l border-black">{formatVal(report.finance?.expense?.monthlySurplus)}</td></tr>
                      <tr className="bg-gray-100 font-bold border-t border-black"><td className="p-1">সর্বমোট ব্যয়</td><td className="p-1 text-right border-l border-black">{formatVal(report.finance?.income?.grandTotalIncome)}</td></tr>
                   </tbody>
                </table>
             </div>
          </div>
        </div>

        {/* Section 7: মন্তব্য */}
        <div className="mb-6">
          <h2 className="text-sm font-bold bg-gray-100 p-1 border border-black mb-2">৭. ওয়ার্ড সভাপতির মন্তব্যঃ</h2>
          <div className="grid grid-cols-2 gap-4">
             <div className="border border-black p-2">
                <h4 className="text-[10px] font-bold text-red-700 border-b border-black pb-1 mb-1">সমস্যাঃ</h4>
                <ol className="text-[9px] list-decimal pl-4 space-y-1">
                   {(report.remarks?.problems || []).map((s: string, i: number) => (
                      <li key={i}>{s}</li>
                   ))}
                   {(!report.remarks?.problems || report.remarks.problems.length === 0) && <li>-</li>}
                </ol>
             </div>
             <div className="border border-black p-2">
                <h4 className="text-[10px] font-bold text-emerald-700 border-b border-black pb-1 mb-1">সম্ভাবনাঃ</h4>
                <ol className="text-[9px] list-decimal pl-4 space-y-1">
                   {(report.remarks?.opportunities || []).map((s: string, i: number) => (
                      <li key={i}>{s}</li>
                   ))}
                   {(!report.remarks?.opportunities || report.remarks.opportunities.length === 0) && <li>-</li>}
                </ol>
             </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 flex justify-between">
          <div className="text-center w-48">
             <div className="border-t border-black pt-1 text-[10px] font-bold">সভাপতি স্বাক্ষর ও তারিখ</div>
          </div>
          <div className="text-center w-48">
             <div className="border-t border-black pt-1 text-[10px] font-bold">সেক্রেটারি স্বাক্ষর ও তারিখ</div>
          </div>
        </div>

      </div>

      <style jsx global>{`
        @media print {
          @page { margin: 0; size: auto; }
          body { background: white; margin: 0; padding: 0; }
          .no-print { display: none !important; }
        }
      `}</style>

      <button 
        onClick={() => window.print()}
        className="fixed bottom-10 right-10 bg-indigo-600 text-white px-8 py-4 rounded-full shadow-2xl font-bold no-print flex items-center gap-3 hover:scale-110 active:scale-95 transition-all z-[100]"
      >
        <Printer className="w-6 h-6" />
        Print Report
      </button>
    </div>
  );
}
