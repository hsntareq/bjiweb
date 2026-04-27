'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

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

  if (!report) return <div className="p-10">Loading report for print...</div>;

  return (
    <div className="bg-white p-8 max-w-[8.5in] mx-auto text-black print:p-0" id="print-area">
      <div className="text-center mb-6">
        <h3 className="text-sm font-medium">বিসমিল্লাহির রাহমানির রাহিম</h3>
        <h1 className="text-2xl font-black mt-2 underline decoration-2 underline-offset-4">ওয়ার্ড সংগঠনের মাসিক রিপোর্ট</h1>
      </div>

      <div className="flex justify-between text-[10px] mb-4 border-b border-black pb-1">
        <div>মাস: <strong>{monthNames[parseInt(month!) - 1]}</strong></div>
        <div>ওয়ার্ড নং/নাম: <strong>{orgName}</strong></div>
        <div>সন: <strong>{year}</strong></div>
      </div>

      {/* Section 1 & 2 */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <h2 className="font-bold text-[10px] bg-gray-100 p-1 border border-black">১. ইউনিট নিয়মিত দাওয়াত:</h2>
          <table className="w-full border-collapse border border-black text-[9px]">
            <tbody>
              <tr><td className="border border-black p-1">গ্রুপ সংখ্যা</td><td className="border border-black p-1 text-center">{report.unitDawat?.groupCount || 0}</td></tr>
              <tr><td className="border border-black p-1">অংশগ্রহণকারী</td><td className="border border-black p-1 text-center">{report.unitDawat?.participantCount || 0}</td></tr>
              <tr><td className="border border-black p-1">পৌঁছানো হয়েছে</td><td className="border border-black p-1 text-center">{report.unitDawat?.reachedCount || 0}</td></tr>
              <tr><td className="border border-black p-1">সহযোগী সদস্য</td><td className="border border-black p-1 text-center">{report.unitDawat?.associateCount || 0}</td></tr>
            </tbody>
          </table>
        </div>
        <div>
          <h2 className="font-bold text-[10px] bg-gray-100 p-1 border border-black">২. ব্যক্তিগত দাওয়াত:</h2>
          <table className="w-full border-collapse border border-black text-[9px]">
            <thead>
              <tr><th className="border border-black p-1"></th><th className="border border-black p-1 text-center">রুকন</th><th className="border border-black p-1 text-center">কর্মী</th></tr>
            </thead>
            <tbody>
              <tr><td className="border border-black p-1">মোট</td><td className="border border-black p-1 text-center">{report.personalDawat?.rokon?.total || 0}</td><td className="border border-black p-1 text-center">{report.personalDawat?.karmi?.total || 0}</td></tr>
              <tr><td className="border border-black p-1">কাজ করেছেন</td><td className="border border-black p-1 text-center">{report.personalDawat?.rokon?.worked || 0}</td><td className="border border-black p-1 text-center">{report.personalDawat?.karmi?.worked || 0}</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 4 - PR */}
      <div className="mb-4">
        <h2 className="font-bold text-[10px] bg-gray-100 p-1 border border-black">৪. বিভিন্ন পেশার মানুষের মাঝে দাওয়াত:</h2>
        <table className="w-full border-collapse border border-black text-[9px]">
          <thead>
            <tr>
              <th className="border border-black p-1">শ্রেণী/পেশা</th>
              <th className="border border-black p-1">পৌঁছানো হয়েছে</th>
              <th className="border border-black p-1">সহযোগী সদস্য</th>
              <th className="border border-black p-1">টার্গেট</th>
            </tr>
          </thead>
          <tbody>
             {['political', 'professional', 'rural', 'marginalized', 'nonMuslim'].map(id => (
               <tr key={id}>
                 <td className="border border-black p-1 capitalize">{id}</td>
                 <td className="border border-black p-1 text-center">{report.departmentalInfo?.professions?.[id]?.reached || 0}</td>
                 <td className="border border-black p-1 text-center">{report.departmentalInfo?.professions?.[id]?.associate || 0}</td>
                 <td className="border border-black p-1 text-center">{report.departmentalInfo?.professions?.[id]?.target || 0}</td>
               </tr>
             ))}
          </tbody>
        </table>
      </div>

      {/* Section 9 - Meetings */}
      <div className="mb-4">
        <h2 className="font-bold text-[10px] bg-gray-100 p-1 border border-black">৯. সাংগঠনিক বৈঠকাদি:</h2>
        <table className="w-full border-collapse border border-black text-[8px]">
          <thead>
            <tr>
              <th className="border border-black p-1">বৈঠকের ধরণ</th>
              <th className="border border-black p-1">সংখ্যা</th>
              <th className="border border-black p-1">টার্গেট</th>
              <th className="border border-black p-1">গড় উপস্থিতি</th>
            </tr>
          </thead>
          <tbody>
             {['wardTeam', 'wardMonthly', 'wardRokon', 'unitTotal'].map(id => (
               <tr key={id}>
                 <td className="border border-black p-1">{id}</td>
                 <td className="border border-black p-1 text-center">{report.departmentalInfo?.meetings?.[id]?.count || 0}</td>
                 <td className="border border-black p-1 text-center">{report.departmentalInfo?.meetings?.[id]?.target || 0}</td>
                 <td className="border border-black p-1 text-center">{report.departmentalInfo?.meetings?.[id]?.attendance || 0}</td>
               </tr>
             ))}
          </tbody>
        </table>
      </div>

      {/* Baitulmal Section */}
      <div className="mb-4">
        <h2 className="font-bold text-[10px] bg-gray-100 p-1 border border-black text-center uppercase">বাইতুলমাল</h2>
        <table className="w-full border-collapse border border-black text-[8px]">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-black p-1">আয়ের বিবরণ</th>
              <th className="border border-black p-1">আয় (৳)</th>
              <th className="border border-black p-1">ব্যয়ের বিবরণ</th>
              <th className="border border-black p-1">ব্যয় (৳)</th>
            </tr>
          </thead>
          <tbody>
             {['ianat', 'emergency', 'election', 'social', 'zakat'].map(id => (
               <tr key={id}>
                 <td className="border border-black p-1 uppercase">{id}</td>
                 <td className="border border-black p-1 text-right">{report.finance?.[id]?.income || 0}</td>
                 <td className="border border-black p-1 uppercase">{id}</td>
                 <td className="border border-black p-1 text-right">{report.finance?.[id]?.expense || 0}</td>
               </tr>
             ))}
             <tr className="font-bold bg-gray-100">
               <td className="border border-black p-1">মোট আয়</td>
               <td className="border border-black p-1 text-right">{Object.values(report.finance || {}).reduce((acc: any, curr: any) => acc + (curr.income || 0), 0)}</td>
               <td className="border border-black p-1">মোট ব্যয়</td>
               <td className="border border-black p-1 text-right">{Object.values(report.finance || {}).reduce((acc: any, curr: any) => acc + (curr.expense || 0), 0)}</td>
             </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex justify-between">
        <div className="text-center w-40 border-t border-black pt-1 text-[9px]">সভাপতি স্বাক্ষর ও তারিখ</div>
        <div className="text-center w-40 border-t border-black pt-1 text-[9px]">সেক্রেটারি স্বাক্ষর ও তারিখ</div>
      </div>

      <style jsx global>{`
        @media print {
          body * { visibility: hidden; }
          #print-area, #print-area * { visibility: visible; }
          #print-area { position: absolute; left: 0; top: 0; width: 100%; margin: 0; padding: 0; }
        }
      `}</style>

      <button 
        onClick={() => window.print()}
        className="fixed bottom-8 right-8 bg-black text-white px-6 py-3 rounded-full shadow-2xl font-bold no-print flex items-center gap-2 hover:scale-105 transition-transform"
      >
        <Printer className="w-5 h-5" />
        Print Now
      </button>
    </div>
  );
}

const Printer = ({ className }: { className: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
);
