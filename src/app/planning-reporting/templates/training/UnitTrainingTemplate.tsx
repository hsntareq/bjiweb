'use client';
import { useState } from 'react';
import { TarbiyatModal } from '@/components/Reporting/Modals/TarbiyatModal';
import { HRDModal } from '@/components/Reporting/Modals/HRDModal';
import { ReportAccordionSection } from '@/components/Reporting/ReportAccordionSection';
import { BookOpen, Users } from 'lucide-react';
import { ReportSectionProps } from '../types';

export function UnitTrainingTemplate({ compReport, formatVal, canEdit, onSave, saving }: ReportSectionProps) {
  const [isTarbiyatModalOpen, setIsTarbiyatModalOpen] = useState(false);
  const [isHRDModalOpen, setIsHRDModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <ReportAccordionSection title="ক) তারবিয়াত (নৈতিক শিক্ষা ও সাংগঠনিক প্রশিক্ষণ):" onEdit={!canEdit ? undefined : () => setIsTarbiyatModalOpen(true)} buttonText="তারবিয়াত এডিট" icon={BookOpen}>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 text-xs text-center">
            <thead>
              <tr className="bg-gray-50 text-gray-700">
                <th className="border border-gray-200 p-2">ক্রম</th>
                <th className="border border-gray-200 p-2 text-left">বৈঠকের ধরণ</th>
                <th className="border border-gray-200 p-2">সংখ্যা</th>
                <th className="border border-gray-200 p-2">টার্গেট</th>
                <th className="border border-gray-200 p-2">গড় উপস্থিতি</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 'unitTarbiyat', sl: '১.', label: 'তারবিয়াতী বৈঠক (সহীহ কুরআন অনুশীলন/মাসলা মাসায়েল/দারসে কুরআন/দারসে হাদীস/সমষ্টিক পাঠ/বিষয়ভিত্তিক আলোচনা)' }
              ].map(row => (
                <tr key={row.id}>
                  <td className="border border-gray-200 p-2 text-center">{row.sl}</td>
                  <td className="border border-gray-200 p-2 text-left font-medium">{row.label}</td>
                  <td className="border border-gray-200 p-2">{Object.values(compReport.training?.[row.id]?.count || {}).join(' / ') || '-'}</td>
                  <td className="border border-gray-200 p-2">{Object.values(compReport.training?.[row.id]?.target || {}).join(' / ') || '-'}</td>
                  <td className="border border-gray-200 p-2">{Object.values(compReport.training?.[row.id]?.avgAttendance || {}).join(' / ') || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ReportAccordionSection>

      <TarbiyatModal
        isOpen={isTarbiyatModalOpen}
        onClose={() => setIsTarbiyatModalOpen(false)}
        onSave={async (data) => { await onSave('training', { ...compReport.training, ...data }); setIsTarbiyatModalOpen(false); }}
        initialData={compReport.training}
        saving={saving}
      />
    </div>
  );
}
