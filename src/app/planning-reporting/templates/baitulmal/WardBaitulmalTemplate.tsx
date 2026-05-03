'use client';
import { useState } from 'react';
import { BaitulmalModal } from '../../Modals/BaitulmalModal';
import { ReportSectionProps } from '../types';

export function WardBaitulmalTemplate({ compReport, formatVal, canEdit, onSave, saving }: ReportSectionProps) {
  const [isBaitulmalModalOpen, setIsBaitulmalModalOpen] = useState(false);

  return (
    <div className="overflow-x-auto">
      {canEdit && (
        <div className="flex justify-end mb-3">
          <button
            onClick={() => setIsBaitulmalModalOpen(true)}
            className="px-3 py-1.5 text-xs font-semibold bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors border border-indigo-200"
          >
            আর্থিক এডিট
          </button>
        </div>
      )}
      <div className="flex justify-between text-xs font-semibold text-gray-600 mb-2 px-1">
        <span>ধার্যকৃত নিছাব: {formatVal(compReport.finance?.nisab?.allocated)} /=</span>
        <span>ওয়াদাকৃত নিছাব: {formatVal(compReport.finance?.nisab?.promised)} /=</span>
      </div>
      <table className="w-full border-collapse border border-gray-200 text-xs">
        <thead>
          <tr className="bg-gray-50 text-gray-700 text-center">
            <th className="border border-gray-200 p-2" colSpan={2}>আয়ের বিবরণ</th>
            <th className="border border-gray-200 p-2" colSpan={2}>ব্যয়ের বিবরণ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-200 p-2">প্রাপ্ত নিছাব</td>
            <td className="border border-gray-200 p-2 text-right">{formatVal(compReport.finance?.income?.receivedNisab)} /=</td>
            <td className="border border-gray-200 p-2">নিসাব পরিশোধ</td>
            <td className="border border-gray-200 p-2 text-right">{formatVal(compReport.finance?.expense?.nisabPaid)} /=</td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-2">সরাসরি ইয়ানত</td>
            <td className="border border-gray-200 p-2 text-right">{formatVal(compReport.finance?.income?.directIanat)} /=</td>
            <td className="border border-gray-200 p-2">স্থানীয় খরচ</td>
            <td className="border border-gray-200 p-2 text-right">{formatVal(compReport.finance?.expense?.localExpense)} /=</td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-2">এককালীন /জরুরী(নির্বাচনী ওয়াদা)</td>
            <td className="border border-gray-200 p-2 text-right">{formatVal(compReport.finance?.income?.oneTime)} /=</td>
            <td className="border border-gray-200 p-2">এককালীন /জরুরী(নির্বাচনী ওয়াদা)</td>
            <td className="border border-gray-200 p-2 text-right">{formatVal(compReport.finance?.expense?.oneTime)} /=</td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-2">নির্বাচনী ফান্ড</td>
            <td className="border border-gray-200 p-2 text-right">{formatVal(compReport.finance?.income?.electionFund)} /=</td>
            <td className="border border-gray-200 p-2">নির্বাচনী ফান্ড</td>
            <td className="border border-gray-200 p-2 text-right">{formatVal(compReport.finance?.expense?.electionFund)} /=</td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-2">শহীদ ফান্ড</td>
            <td className="border border-gray-200 p-2 text-right">{formatVal(compReport.finance?.income?.shahidFund)} /=</td>
            <td className="border border-gray-200 p-2">শহীদ ফান্ড</td>
            <td className="border border-gray-200 p-2 text-right">{formatVal(compReport.finance?.expense?.shahidFund)} /=</td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-2">বিশেষ ও বন্যার্তদের কালেকশন</td>
            <td className="border border-gray-200 p-2 text-right">{formatVal(compReport.finance?.income?.floodCollection)} /=</td>
            <td className="border border-gray-200 p-2">বিশেষ ও বন্যার্তদের কালেকশন</td>
            <td className="border border-gray-200 p-2 text-right">{formatVal(compReport.finance?.expense?.floodCollection)} /=</td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-2">সমাজকল্যাণ ও সমাজসেবা</td>
            <td className="border border-gray-200 p-2 text-right">{formatVal(compReport.finance?.income?.socialWork)} /=</td>
            <td className="border border-gray-200 p-2">সমাজকল্যাণ ও সমাজসেবা</td>
            <td className="border border-gray-200 p-2 text-right">{formatVal(compReport.finance?.expense?.socialWork)} /=</td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-2">যাকাত</td>
            <td className="border border-gray-200 p-2 text-right">{formatVal(compReport.finance?.income?.zakat)} /=</td>
            <td className="border border-gray-200 p-2">যাকাত</td>
            <td className="border border-gray-200 p-2 text-right">{formatVal(compReport.finance?.expense?.zakat)} /=</td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-2">ফিতরা</td>
            <td className="border border-gray-200 p-2 text-right">{formatVal(compReport.finance?.income?.fitra)} /=</td>
            <td className="border border-gray-200 p-2">ফিতরা</td>
            <td className="border border-gray-200 p-2 text-right">{formatVal(compReport.finance?.expense?.fitra)} /=</td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-2">ইফতার</td>
            <td className="border border-gray-200 p-2 text-right">{formatVal(compReport.finance?.income?.iftar)} /=</td>
            <td className="border border-gray-200 p-2">ইফতার</td>
            <td className="border border-gray-200 p-2 text-right">{formatVal(compReport.finance?.expense?.iftar)} /=</td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-2">ডেলিগেট ফি</td>
            <td className="border border-gray-200 p-2 text-right">{formatVal(compReport.finance?.income?.delegateFee)} /=</td>
            <td className="border border-gray-200 p-2">ডেলিগেট ফি</td>
            <td className="border border-gray-200 p-2 text-right">{formatVal(compReport.finance?.expense?.delegateFee)} /=</td>
          </tr>
          <tr className="font-bold bg-gray-50">
            <td className="border border-gray-200 p-2 text-right">মোট আয় =</td>
            <td className="border border-gray-200 p-2 text-right">{formatVal(compReport.finance?.income?.totalIncome)} /=</td>
            <td className="border border-gray-200 p-2 text-right">মোট ব্যয় =</td>
            <td className="border border-gray-200 p-2 text-right">{formatVal(compReport.finance?.expense?.totalExpense)} /=</td>
          </tr>
          <tr className="font-bold">
            <td className="border border-gray-200 p-2 text-right">গত মাসের উদ্বৃত্ত =</td>
            <td className="border border-gray-200 p-2 text-right">{formatVal(compReport.finance?.income?.previousMonthSurplus)}</td>
            <td className="border border-gray-200 p-2 text-right">এ মাসের উদ্বৃত্ত =</td>
            <td className="border border-gray-200 p-2 text-right">{formatVal(compReport.finance?.expense?.monthlySurplus)}</td>
          </tr>
          <tr className="font-bold bg-gray-50">
            <td className="border border-gray-200 p-2 text-right">সর্বমোট আয় =</td>
            <td className="border border-gray-200 p-2 text-right">{formatVal(compReport.finance?.income?.grandTotalIncome)} /=</td>
            <td className="border border-gray-200 p-2 text-right">সর্বমোট ব্যয় =</td>
            <td className="border border-gray-200 p-2 text-right">{formatVal(compReport.finance?.expense?.grandTotalExpense)} /=</td>
          </tr>
        </tbody>
      </table>

      <BaitulmalModal
        isOpen={isBaitulmalModalOpen}
        onClose={() => setIsBaitulmalModalOpen(false)}
        onSave={async (data) => { await onSave('finance', data); setIsBaitulmalModalOpen(false); }}
        initialData={compReport.finance}
        saving={saving}
      />
    </div>
  );
}
