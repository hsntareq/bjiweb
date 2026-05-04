'use client';
import { useState } from 'react';
import { PoliticalCommunicationModal } from '@/components/Reporting/Modals/PoliticalCommunicationModal';
import { PoliticalProgramModal } from '@/components/Reporting/Modals/PoliticalProgramModal';
import { NationalDayModal } from '@/components/Reporting/Modals/NationalDayModal';
import { ElectionActivityModal } from '@/components/Reporting/Modals/ElectionActivityModal';
import { ReportAccordionSection } from '@/components/Reporting/ReportAccordionSection';
import { Calendar, Flag, PhoneCall, Vote } from 'lucide-react';
import { ReportSectionProps } from '../types';

export function UnitStateReformTemplate({ compReport, formatVal, canEdit, onSave, saving }: ReportSectionProps) {
  const [isPoliticalCommModalOpen, setIsPoliticalCommModalOpen] = useState(false);
  const [isPoliticalProgModalOpen, setIsPoliticalProgModalOpen] = useState(false);
  const [isNationalDayModalOpen, setIsNationalDayModalOpen] = useState(false);
  const [isElectionModalOpen, setIsElectionModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <ReportAccordionSection title="১. যোগাযোগ ও অংশগ্রহণ:" onEdit={!canEdit ? undefined : () => setIsPoliticalCommModalOpen(true)} buttonText="যোগাযোগ এডিট" icon={PhoneCall}>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 text-xs text-center">
              <thead>
                <tr className="bg-gray-50 text-gray-700">
                  <th className="border border-gray-200 p-2 text-left">যোগাযোগের ধরন</th>
                  <th className="border border-gray-200 p-2">মোট কতজন যোগাযোগ করেছেন</th>
                  <th className="border border-gray-200 p-2">মোট কতজনের সাথে যোগাযোগ হয়েছে</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 'political', label: 'রাজনৈতিক ব্যক্তিবর্গ' },
                  { id: 'eminent', label: 'বিশিষ্ট ব্যক্তিবর্গ' },
                  { id: 'upperProgAtt', label: 'উর্ধ্বতন সংগঠনের জনসভা/সমাবেশ/মিছিলে অংশগ্রহণকারীর সংখ্যা' },
                  { id: 'other', label: 'অন্যান্য' }
                ].map(row => (
                  <tr key={row.id}>
                    <td className="border border-gray-200 p-2 text-left">{row.label}</td>
                    <td className="border border-gray-200 p-2 text-center">{formatVal(compReport.political?.comm?.[row.id]?.communicatedCount)}</td>
                    <td className="border border-gray-200 p-2 text-center">{formatVal(compReport.political?.comm?.[row.id]?.reachedCount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ReportAccordionSection>
      </div>

      <PoliticalCommunicationModal
        isOpen={isPoliticalCommModalOpen}
        onClose={() => setIsPoliticalCommModalOpen(false)}
        onSave={async (data) => { await onSave('political', { ...compReport.political, comm: data }); setIsPoliticalCommModalOpen(false); }}
        initialData={compReport.political?.comm}
        saving={saving}
        rows={[
          { id: 'political', label: 'রাজনৈতিক ব্যক্তিবর্গ' },
          { id: 'eminent', label: 'বিশিষ্ট ব্যক্তিবর্গ' },
          { id: 'upperProgAtt', label: 'উর্ধ্বতন সংগঠনের জনসভা/সমাবেশ/মিছিলে অংশগ্রহণকারীর সংখ্যা' },
          { id: 'other', label: 'অন্যান্য' }
        ]}
      />
    </div>
  );
}
