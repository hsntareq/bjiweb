'use client';
import { useState } from 'react';
import { TarbiyatModal } from '@/components/Reporting/Modals/TarbiyatModal';
import { HRDModal } from '@/components/Reporting/Modals/HRDModal';
import { ReportAccordionSection } from '@/components/Reporting/ReportAccordionSection';
import { BookOpen, Users } from 'lucide-react';
import { ReportSectionProps } from '../types';

export function ThanaTrainingTemplate({ compReport, formatVal, canEdit, onSave, saving }: ReportSectionProps) {
  const [isTarbiyatModalOpen, setIsTarbiyatModalOpen] = useState(false);
  const [isHRDModalOpen, setIsHRDModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <ReportAccordionSection title="ক) তারবিয়াত (নৈতিক শিক্ষা ও সাংগঠনিক প্রশিক্ষণ):" onEdit={!canEdit ? undefined : () => setIsTarbiyatModalOpen(true)} buttonText="তারবিয়াত এডিট" icon={BookOpen}>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 text-xs text-center">
            <thead>
              <tr className="bg-blue-50 text-gray-700">
                <th className="border border-gray-200 p-2">ক্রম</th>
                <th className="border border-gray-200 p-2 text-left">বৈঠকের ধরণ</th>
                <th className="border border-gray-200 p-2">সংখ্যা</th>
                <th className="border border-gray-200 p-2">টার্গেট</th>
                <th className="border border-gray-200 p-2">গড় উপস্থিতি</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 'unitTarbiyat', sl: '১.', label: 'ওয়ার্ডভিত্তিক তারবিয়াতী বৈঠক' },
                { id: 'wardTarbiyat', sl: '২.', label: 'থানাভিত্তিক কর্মীদের শিক্ষা বৈঠক' },
                { id: 'higherTarbiyat', sl: '৩.', label: 'উর্ধ্বতন সংগঠনের শিক্ষা শিবির/শিক্ষা বৈঠক' },
                { id: 'publicTarbiyat', sl: '৪.', label: 'গণশিক্ষা বৈঠক/গণ নৈশ ইবাদত' },
                { id: 'discussionCircle', sl: '৫.', label: 'আলোচনা চক্র' },
                { id: 'quranDars', sl: '৬.', label: 'দারস/সহীহ কুরআন তিলাওয়াত অনুশীলন' },
                { id: 'others', sl: '৭.', label: 'অন্যান্য' }
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

      <ReportAccordionSection title="খ) মানবসম্পদ উন্নয়ন কোর্স সমূহ:" onEdit={!canEdit ? undefined : () => setIsHRDModalOpen(true)} buttonText="কোর্স এডিট" icon={Users}>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 text-[10px] text-center">
            <thead>
              <tr className="bg-blue-50 text-gray-700">
                <th className="border border-gray-200 p-2">ক্রম</th>
                <th className="border border-gray-200 p-2 text-left">প্রশিক্ষণ কোর্সের নাম</th>
                <th className="border border-gray-200 p-2">মহানগরী/থানা পরিচালিত</th>
                <th className="border border-gray-200 p-2">কোর্স সম্পন্নকারী সংখ্যা</th>
                <th className="border border-gray-200 p-2">অন্য প্রতিষ্ঠান হতে</th>
                <th className="border border-gray-200 p-2">মোট কতজন</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 'dawah', sl: '১.', label: 'দাওয়াহ' },
                { id: 'social', sl: '২.', label: 'সমাজকর্ম' },
                { id: 'media', sl: '৩.', label: 'মিডিয়া' },
                { id: 'it', sl: '৪.', label: 'আইসিটি' },
                { id: 'finance', sl: '৫.', label: 'অফিস/ফিন্যান্সিয়াল ম্যানেজমেন্ট' },
                { id: 'english', sl: '৬.', label: 'ইংরেজি ভাষা' },
                { id: 'arabic', sl: '৭.', label: 'আরবী ভাষা' },
                { id: 'technical', sl: '৮.', label: 'ট্রেডভিত্তিক কারিগরি প্রশিক্ষণ' }
              ].map(row => (
                <tr key={row.id}>
                  <td className="border border-gray-200 p-2 text-center">{row.sl}</td>
                  <td className="border border-gray-200 p-2 text-left font-medium">{row.label}</td>
                  <td className="border border-gray-200 p-2">{formatVal(compReport.training?.[row.id]?.conductedCount)}</td>
                  <td className="border border-gray-200 p-2">{formatVal(compReport.training?.[row.id]?.completedCount)}</td>
                  <td className="border border-gray-200 p-2">{formatVal(compReport.training?.[row.id]?.othersCompletedCount)}</td>
                  <td className="border border-gray-200 p-2 font-bold">{formatVal(compReport.training?.[row.id]?.totalCount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ReportAccordionSection>

      <TarbiyatModal
        isOpen={isTarbiyatModalOpen}
        onClose={() => setIsTarbiyatModalOpen(false)}
        onSave={(data) => { onSave('training', { ...compReport.training, ...data }); setIsTarbiyatModalOpen(false); }}
        initialData={compReport.training}
        saving={saving}
      />
      <HRDModal
        isOpen={isHRDModalOpen}
        onClose={() => setIsHRDModalOpen(false)}
        onSave={(data) => { onSave('training', { ...compReport.training, ...data }); setIsHRDModalOpen(false); }}
        initialData={compReport.training}
        saving={saving}
      />
    </div>
  );
}
