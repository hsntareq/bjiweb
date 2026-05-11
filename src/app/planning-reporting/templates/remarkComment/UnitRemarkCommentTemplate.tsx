'use client';
import { useState } from 'react';
import { RemarksModal } from '@/components/Reporting/Modals/RemarksModal';
import { ReportSectionProps } from '../types';

export function UnitRemarkCommentTemplate({ compReport, formatVal: _formatVal, canEdit, onSave, saving }: ReportSectionProps) {
  const [isRemarksModalOpen, setIsRemarksModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {canEdit && (
        <div className="flex justify-end">
          <button
            onClick={() => setIsRemarksModalOpen(true)}
            className="px-3 py-1.5 text-xs font-semibold bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors border border-indigo-200"
          >
            মন্তব্য এডিট
          </button>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <h4 className="font-bold text-xs text-red-700 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 shrink-0"></span>
            প্রধান সমস্যাসমূহঃ
          </h4>
          <ul className="space-y-1 text-xs text-gray-600">
            {(Array.isArray(compReport.remarks?.problems) ? compReport.remarks.problems : ['-', '-', '-', '-', '-']).map((val: string, idx: number) => (
              <li key={idx} className="flex gap-2 p-1.5 bg-red-50/30 rounded">
                <span className="font-bold text-red-300">{idx + 1}.</span>
                <span>{val || '-'}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-2">
          <h4 className="font-bold text-xs text-emerald-700 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
            সম্ভাবনাঃ
          </h4>
          <ul className="space-y-1 text-xs text-gray-600">
            {(Array.isArray(compReport.remarks?.opportunities) ? compReport.remarks.opportunities : ['-', '-', '-', '-', '-']).map((val: string, idx: number) => (
              <li key={idx} className="flex gap-2 p-1.5 bg-emerald-50/30 rounded">
                <span className="font-bold text-emerald-300">{idx + 1}.</span>
                <span>{val || '-'}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="text-xs text-center text-gray-400 font-medium pt-4 border-t border-gray-50 italic">
        মহান আল্লাহ আমাদের সব সমস্যার ঊর্ধ্বে ওঠার তাওফিক দান করুন, সম্ভাবনাগুলোকে যথাযথভাবে কাজে লাগানোর বুদ্ধি দিন, সুপরিকল্পনা গ্রহণ ও তা বাস্তবায়নে সদা সচেষ্ট রাখুন এবং ময়দানে সিসা ঢালার ন্যায় দৃঢ় ও ঐক্যবদ্ধ হয়ে কেবল তাঁর সন্তুষ্টি অর্জনের চেষ্টা করার তাওফিক দিয়ে আমাদের কবুল করুন। আমিন!
      </p>

      <RemarksModal
        isOpen={isRemarksModalOpen}
        onClose={() => setIsRemarksModalOpen(false)}
        onSave={async (data) => { await onSave('remarks', data); setIsRemarksModalOpen(false); }}
        initialData={compReport.remarks}
        saving={saving}
      />
    </div>
  );
}
