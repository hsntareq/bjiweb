'use client';
import { useState } from 'react';
import { PoliticalCommunicationModal } from '@/components/Reporting/Modals/PoliticalCommunicationModal';
import { PoliticalProgramModal } from '@/components/Reporting/Modals/PoliticalProgramModal';
import { NationalDayModal } from '@/components/Reporting/Modals/NationalDayModal';
import { ElectionActivityModal } from '@/components/Reporting/Modals/ElectionActivityModal';
import { ReportAccordionSection } from '@/components/Reporting/ReportAccordionSection';
import { Calendar, Flag, PhoneCall, Vote } from 'lucide-react';
import { ReportSectionProps } from '../types';

export function WardStateReformTemplate({ compReport, formatVal, canEdit, onSave, saving }: ReportSectionProps) {
  const [isPoliticalCommModalOpen, setIsPoliticalCommModalOpen] = useState(false);
  const [isPoliticalProgModalOpen, setIsPoliticalProgModalOpen] = useState(false);
  const [isNationalDayModalOpen, setIsNationalDayModalOpen] = useState(false);
  const [isElectionModalOpen, setIsElectionModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <ReportAccordionSection title="১. রাজনৈতিক ও প্রশাসনিক যোগাযোগ:" onEdit={!canEdit ? undefined : () => setIsPoliticalCommModalOpen(true)} buttonText="যোগাযোগ এডিট" icon={PhoneCall}>
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
                  { id: 'admin', label: 'প্রশাসনিক ব্যক্তিবর্গ' }
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

        <ReportAccordionSection title="২. কর্মসূচী বাস্তবায়ন:" onEdit={!canEdit ? undefined : () => setIsPoliticalProgModalOpen(true)} buttonText="কর্মসূচি এডিট" icon={Flag}>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 text-xs text-center">
              <thead>
                <tr className="bg-gray-50 text-gray-700">
                  <th className="border border-gray-200 p-2 text-left">কর্মসূচীর বিবরণ</th>
                  <th className="border border-gray-200 p-2">মোট সংখ্যা</th>
                  <th className="border border-gray-200 p-2">গড় উপস্থিতি</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 'centerProgram', label: 'কেন্দ্র ঘোষিত রাজনৈতিক কর্মসূচি পালন' },
                  { id: 'localProgram', label: 'স্থানিয়ভাবে ঘোষিত কর্মসূচী: জনসভা/সমাবেশ/মিছিল' },
                  { id: 'distribution', label: 'পোস্টার/লিফলেট/বুকলেট/মারকলিপি বিতরণ' }
                ].map(row => (
                  <tr key={row.id}>
                    <td className="border border-gray-200 p-2 text-left">{row.label}</td>
                    <td className="border border-gray-200 p-2 text-center">{Object.values(compReport.political?.prog?.[row.id]?.count || {}).join(' / ') || '-'}</td>
                    <td className="border border-gray-200 p-2 text-center">{Object.values(compReport.political?.prog?.[row.id]?.avgAttendance || {}).join(' / ') || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ReportAccordionSection>
      </div>

      <div className="space-y-4">
        <ReportAccordionSection title="৩. জাতীয় ও আন্তর্জাতিক দিবস পালন:" onEdit={!canEdit ? undefined : () => setIsNationalDayModalOpen(true)} buttonText="দিবস এডিট" icon={Calendar}>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 text-xs text-center">
              <thead>
                <tr className="bg-gray-50 text-gray-700">
                  <th className="border border-gray-200 p-2 text-left">দিবসসমূহ</th>
                  <th className="border border-gray-200 p-2">মোট প্রোগ্রাম সংখ্যা</th>
                  <th className="border border-gray-200 p-2">গড় উপস্থিতি</th>
                  <th className="border border-gray-200 p-2 text-left">দিবসসমূহ</th>
                  <th className="border border-gray-200 p-2">মোট প্রোগ্রাম সংখ্যা</th>
                  <th className="border border-gray-200 p-2">গড় উপস্থিতি</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 p-2 text-left">স্বাধীনতা ও জাতীয় দিবস</td>
                  <td className="border border-gray-200 p-2">{formatVal(compReport.political?.nationalDay?.independenceDay?.programCount)}</td>
                  <td className="border border-gray-200 p-2">{formatVal(compReport.political?.nationalDay?.independenceDay?.avgAttendance)}</td>
                  <td className="border border-gray-200 p-2 text-left">আন্তর্জাতিক মাতৃভাষা দিবস</td>
                  <td className="border border-gray-200 p-2">{formatVal(compReport.political?.nationalDay?.motherLanguageDay?.programCount)}</td>
                  <td className="border border-gray-200 p-2">{formatVal(compReport.political?.nationalDay?.motherLanguageDay?.avgAttendance)}</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-2 text-left">বিজয় দিবস</td>
                  <td className="border border-gray-200 p-2">{formatVal(compReport.political?.nationalDay?.victoryDay?.programCount)}</td>
                  <td className="border border-gray-200 p-2">{formatVal(compReport.political?.nationalDay?.victoryDay?.avgAttendance)}</td>
                  <td className="border border-gray-200 p-2 text-left">অন্যান্য(বিস্তারিত আলাদা কাগজে দেয়া যাবে)</td>
                  <td className="border border-gray-200 p-2">{formatVal(compReport.political?.nationalDay?.others?.programCount)}</td>
                  <td className="border border-gray-200 p-2">{formatVal(compReport.political?.nationalDay?.others?.avgAttendance)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </ReportAccordionSection>

        <ReportAccordionSection title="৪. জাতীয় ও স্থানীয় নির্বাচনভিত্তিক কার্যক্রম" onEdit={!canEdit ? undefined : () => setIsElectionModalOpen(true)} buttonText="নির্বাচন এডিট" icon={Vote}>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 text-xs text-center">
              <tbody>
                <tr className="bg-gray-50 text-gray-700 font-bold">
                  <td className="border border-gray-200 p-2 text-left font-bold">নির্বাচনের ধরন</td>
                  <td className="border border-gray-200 p-2 font-bold">মোট প্রার্থী সংখ্যা</td>
                  <td className="border border-gray-200 p-2 font-bold">নির্বাচিতী সংখ্যা</td>
                  <td className="border border-gray-200 p-2 font-bold">দ্বিতীয় অবস্থান</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-2 text-left">কাউন্সিলর</td>
                  <td className="border border-gray-200 p-2">{formatVal(compReport.political?.election?.councilor?.candidateCount?.val)}</td>
                  <td className="border border-gray-200 p-2">{formatVal(compReport.political?.election?.councilor?.electedCount?.val)}</td>
                  <td className="border border-gray-200 p-2">{formatVal(compReport.political?.election?.councilor?.secondPlaceCount?.val)}</td>
                </tr>
                <tr className="bg-gray-50 text-gray-700">
                  <td className="border border-gray-200 p-2 text-left font-bold">প্রস্তুতিমূলক কার্যক্রমের ধরন</td>
                  <td className="border border-gray-200 p-2 font-bold">সংখ্যা</td>
                  <td className="border border-gray-200 p-2 font-bold">বৃদ্ধি</td>
                  <td className="border border-gray-200 p-2 font-bold">টার্গেট</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-2 text-left">ভোট কেন্দ্র (জাতীয়/স্থানীয়)</td>
                  <td className="border border-gray-200 p-2">{formatVal(compReport.political?.election?.preparatory?.voteCenter?.count)}</td>
                  <td className="border border-gray-200 p-2">{formatVal(compReport.political?.election?.preparatory?.voteCenter?.increase)}</td>
                  <td className="border border-gray-200 p-2">{formatVal(compReport.political?.election?.preparatory?.voteCenter?.target)}</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-2 text-left">ভোট কেন্দ্র কমিটি/কেন্দ্র/বুথভিত্তিক ইউনিট</td>
                  <td className="border border-gray-200 p-2">{formatVal(compReport.political?.election?.preparatory?.voteCenterCommittee?.count)}</td>
                  <td className="border border-gray-200 p-2">{formatVal(compReport.political?.election?.preparatory?.voteCenterCommittee?.increase)}</td>
                  <td className="border border-gray-200 p-2">{formatVal(compReport.political?.election?.preparatory?.voteCenterCommittee?.target)}</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-2 text-left" colSpan={3}>ওয়ার্ডভিত্তিক নির্বাচন পরিচালনা কমিটির বৈঠক সংখ্যা।</td>
                  <td className="border border-gray-200 p-2">{formatVal(compReport.political?.election?.electionCommitteeMeetingCount)}</td>
                </tr>
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
      />
      <PoliticalProgramModal
        isOpen={isPoliticalProgModalOpen}
        onClose={() => setIsPoliticalProgModalOpen(false)}
        onSave={async (data) => { await onSave('political', { ...compReport.political, prog: data }); setIsPoliticalProgModalOpen(false); }}
        initialData={compReport.political?.prog}
        saving={saving}
      />
      <NationalDayModal
        isOpen={isNationalDayModalOpen}
        onClose={() => setIsNationalDayModalOpen(false)}
        onSave={async (data) => { await onSave('political', { ...compReport.political, nationalDay: data }); setIsNationalDayModalOpen(false); }}
        initialData={compReport.political?.nationalDay}
        saving={saving}
      />
      <ElectionActivityModal
        isOpen={isElectionModalOpen}
        onClose={() => setIsElectionModalOpen(false)}
        onSave={async (data) => { await onSave('political', { ...compReport.political, election: data }); setIsElectionModalOpen(false); }}
        initialData={compReport.political?.election}
        saving={saving}
      />
    </div>
  );
}
