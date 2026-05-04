'use client';
import { useState } from 'react';
import { ManpowerModal } from '@/components/Reporting/Modals/ManpowerModal';
import { DeptManpowerModal } from '@/components/Reporting/Modals/DeptManpowerModal';
import { UnitOrganizationModal } from '@/components/Reporting/Modals/UnitOrganizationModal';
import { DawahFamilyUnitModal } from '@/components/Reporting/Modals/DawahFamilyUnitModal';
import { StudentJoiningModal } from '@/components/Reporting/Modals/StudentJoiningModal';
import { SafarModal } from '@/components/Reporting/Modals/SafarModal';
import { DonorModal } from '@/components/Reporting/Modals/DonorModal';
import { OrgMeetingModal } from '@/components/Reporting/Modals/OrgMeetingModal';
import { ReportAccordionSection } from '@/components/Reporting/ReportAccordionSection';
import { GraduationCap, HandCoins, LayoutGrid, Layers, MapPin, MessagesSquare, PieChart, UserPlus, Users } from 'lucide-react';
import React from 'react';
import { ReportSectionProps } from '../types';

export function UnitOrgTemplate({ compReport, formatVal, canEdit, onSave, saving }: ReportSectionProps) {
  const [isManpowerModalOpen, setIsManpowerModalOpen] = useState(false);
  const [isUnitModalOpen, setIsUnitModalOpen] = useState(false);
  const [isSafarModalOpen, setIsSafarModalOpen] = useState(false);
  const [isDonorModalOpen, setIsDonorModalOpen] = useState(false);
  const [isOrgMeetingModalOpen, setIsOrgMeetingModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <ReportAccordionSection title="১. জনশক্তি" onEdit={!canEdit ? undefined : () => setIsManpowerModalOpen(true)} buttonText="জনশক্তি এডিট" icon={UserPlus}>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 text-sm text-center">
            <thead>
              <tr className="bg-gray-50 text-gray-700">
                <th className="border border-gray-200 p-2 text-left">জনশক্তির ধরণ</th>
                <th className="border border-gray-200 p-2">বিগত সংখ্যা</th>
                <th className="border border-gray-200 p-2">বর্তমান সংখ্যা</th>
                <th className="border border-gray-200 p-2">বৃদ্ধি (মানোন্নয়ন / আগত)</th>
                <th className="border border-gray-200 p-2">ঘাটতি</th>
                <th className="border border-gray-200 p-2">টার্গেট</th>
                <th className="border border-gray-200 p-2">বাস্তবায়নের হার</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 'rokon', label: 'সর্বমোট সদস্য (রুকন)' },
                { id: 'karmi', label: 'সর্বমোট কর্মী' },
                { id: 'associate', label: 'সর্বমোট সক্রিয় সহযোগী সদস্য' }
              ].map(row => {
                const rowData = compReport.manpower?.[row.id] || {};
                const target = rowData.target || 0;
                const increase = rowData.promotionIncrease || 0;
                const rate = target > 0 ? Math.round((increase / target) * 100) : 0;
                return (
                  <tr key={row.id}>
                    <td className="border border-gray-200 p-2 text-left">{row.label}</td>
                    <td className="border border-gray-200 p-2">{formatVal(rowData.previousCount)}</td>
                    <td className="border border-gray-200 p-2">{formatVal(rowData.currentCount)}</td>
                    <td className="border border-gray-200 p-2">{formatVal(rowData.promotionIncrease)} / {formatVal(rowData.arrivedIncrease)}</td>
                    <td className="border border-gray-200 p-2">{formatVal(rowData.deficit)}</td>
                    <td className="border border-gray-200 p-2">{formatVal(rowData.target)}</td>
                    <td className="border border-gray-200 p-2">{rate}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </ReportAccordionSection>

      <ReportAccordionSection title="২. সহযোগী সদস্য:" onEdit={!canEdit ? undefined : () => setIsManpowerModalOpen(true)} buttonText="সহযোগী সদস্য এডিট" icon={Users}>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 text-sm text-center">
            <thead>
              <tr className="bg-gray-50 text-gray-700">
                <th className="border border-gray-200 p-2">বিগত সময়ের সংখ্যা</th>
                <th className="border border-gray-200 p-2">বর্তমান সংখ্যা</th>
                <th className="border border-gray-200 p-2">বৃদ্ধি</th>
                <th className="border border-gray-200 p-2">টার্গেট</th>
                <th className="border border-gray-200 p-2">বাস্তবায়নের হার</th>
              </tr>
            </thead>
            <tbody>
              {(() => {
                const rowData = compReport.manpower?.generalAssociate || {};
                const target = rowData.target || 0;
                const increase = rowData.promotionIncrease || 0;
                const rate = target > 0 ? Math.round((increase / target) * 100) : 0;
                return (
                  <tr>
                    <td className="border border-gray-200 p-2">{formatVal(rowData.previousCount)}</td>
                    <td className="border border-gray-200 p-2">{formatVal(rowData.currentCount)}</td>
                    <td className="border border-gray-200 p-2">{formatVal(rowData.promotionIncrease)}</td>
                    <td className="border border-gray-200 p-2">{formatVal(rowData.target)}</td>
                    <td className="border border-gray-200 p-2">{rate}%</td>
                  </tr>
                );
              })()}
            </tbody>
          </table>
        </div>
      </ReportAccordionSection>



      <ReportAccordionSection title="৩. পারিবারিক ইউনিট" onEdit={!canEdit ? undefined : () => setIsUnitModalOpen(true)} buttonText="ইউনিট এডিট" icon={Layers}>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 text-xs text-center">
            <thead>
              <tr className="bg-gray-50 text-gray-700">
                <th className="border border-gray-200 p-2 text-left">ইউনিটের ধরণ</th>
                <th className="border border-gray-200 p-2">বিগত</th>
                <th className="border border-gray-200 p-2">বর্তমান</th>
                <th className="border border-gray-200 p-2">বৃদ্ধি</th>
                <th className="border border-gray-200 p-2">ঘাটতি</th>
                <th className="border border-gray-200 p-2">টার্গেট</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 'familyUnit', label: 'পারিবারিক ইউনিট' }
              ].map(row => (
                <tr key={row.id}>
                  <td className="border border-gray-200 p-2 text-left font-medium">{row.label}</td>
                  <td className="border border-gray-200 p-2">{formatVal(compReport.unitStats?.[row.id]?.previousCount)}</td>
                  <td className="border border-gray-200 p-2">{formatVal(compReport.unitStats?.[row.id]?.currentCount)}</td>
                  <td className="border border-gray-200 p-2">{formatVal(compReport.unitStats?.[row.id]?.increase)}</td>
                  <td className="border border-gray-200 p-2">{formatVal(compReport.unitStats?.[row.id]?.deficit)}</td>
                  <td className="border border-gray-200 p-2">{formatVal(compReport.unitStats?.[row.id]?.target)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ReportAccordionSection>



      <ReportAccordionSection title="৪. উর্ধ্বতন দায়িত্বশীলদের সফর সংখ্যা:" onEdit={!canEdit ? undefined : () => setIsSafarModalOpen(true)} buttonText="সফর এডিট" icon={MapPin}>
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100 text-center">
            <p className="text-[10px] text-indigo-600 font-bold uppercase mb-1">উর্ধ্বতন দায়িত্বশীল</p>
            <p className="text-lg font-black text-indigo-700">{formatVal(compReport.safar?.higherAuthoritySafar)}</p>
          </div>
        </div>
      </ReportAccordionSection>

      <ReportAccordionSection title="৫. ইয়ানত দাতা:" onEdit={!canEdit ? undefined : () => setIsDonorModalOpen(true)} buttonText="দাতা এডিট" icon={HandCoins}>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 text-sm text-center">
            <thead>
              <tr className="bg-gray-50 text-gray-700">
                <th className="border border-gray-200 p-2 text-left">নতুন ইয়ানত দাতা</th>
                <th className="border border-gray-200 p-2">মোট সংখ্যা</th>
                <th className="border border-gray-200 p-2">অর্থের পরিমাণ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200 p-2 text-left font-medium">সহযোগী সদস্য/সুধী</td>
                <td className="border border-gray-200 p-2">{formatVal(compReport.donors?.newCount)}</td>
                <td className="border border-gray-200 p-2">{formatVal(compReport.donors?.amount)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </ReportAccordionSection>

      <ReportAccordionSection title="৬. মাসিক বৈঠকসমূহ:" onEdit={!canEdit ? undefined : () => setIsOrgMeetingModalOpen(true)} buttonText="বৈঠক এডিট" icon={MessagesSquare}>
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
                { id: 'karmiMeeting', sl: '১.', label: 'কর্মী বৈঠক/পারিবারিক বৈঠক' }
              ].map(row => (
                <tr key={row.id}>
                  <td className="border border-gray-200 p-2 text-center">{row.sl}</td>
                  <td className="border border-gray-200 p-2 text-left font-medium">{row.label}</td>
                  <td className="border border-gray-200 p-2">{Object.values(compReport.orgMeetings?.[row.id]?.count || {}).join(' / ') || '-'}</td>
                  <td className="border border-gray-200 p-2">{Object.values(compReport.orgMeetings?.[row.id]?.target || {}).join(' / ') || '-'}</td>
                  <td className="border border-gray-200 p-2">{Object.values(compReport.orgMeetings?.[row.id]?.avgAttendance || {}).join(' / ') || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ReportAccordionSection>

      <ManpowerModal
        isOpen={isManpowerModalOpen}
        onClose={() => setIsManpowerModalOpen(false)}
        onSave={async (data) => { await onSave('manpower', data); setIsManpowerModalOpen(false); }}
        initialData={compReport.manpower}
        saving={saving}
      />

      <DawahFamilyUnitModal
        isOpen={isUnitModalOpen}
        onClose={() => setIsUnitModalOpen(false)}
        onSave={async (data) => { await onSave('unitStats', data); setIsUnitModalOpen(false); }}
        initialData={compReport.unitStats}
        saving={saving}
      />

      <SafarModal
        isOpen={isSafarModalOpen}
        onClose={() => setIsSafarModalOpen(false)}
        onSave={async (data) => { await onSave('safar', data); setIsSafarModalOpen(false); }}
        initialData={compReport.safar}
        saving={saving}
      />
      <DonorModal
        isOpen={isDonorModalOpen}
        onClose={() => setIsDonorModalOpen(false)}
        onSave={async (data) => { await onSave('donors', data); setIsDonorModalOpen(false); }}
        initialData={compReport.donors}
        saving={saving}
      />
      <OrgMeetingModal
        isOpen={isOrgMeetingModalOpen}
        onClose={() => setIsOrgMeetingModalOpen(false)}
        onSave={async (data) => { await onSave('orgMeetings', data); setIsOrgMeetingModalOpen(false); }}
        initialData={compReport.orgMeetings}
        saving={saving}
      />
    </div>
  );
}
