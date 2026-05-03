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

export function WardOrgTemplate({ compReport, formatVal, canEdit, onSave, saving }: ReportSectionProps) {
  const [isManpowerModalOpen, setIsManpowerModalOpen] = useState(false);
  const [isDeptManpowerModalOpen, setIsDeptManpowerModalOpen] = useState(false);
  const [isUnitOrgModalOpen, setIsUnitOrgModalOpen] = useState(false);
  const [isUnitModalOpen, setIsUnitModalOpen] = useState(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
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
                { id: 'rokonCandidate', label: 'সর্বমোট সদস্য(রুকন) প্রার্থী' },
                { id: 'karmi', label: 'সর্বমোট কর্মী' },
                { id: 'associate', label: 'সর্বমোট সক্রিয় সহযোগী সদস্য' },
                { id: 'generalAssociate', label: 'সহযোগী সদস্য' }
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

      <ReportAccordionSection title="৩. বিভাগভিত্তিক তথ্য: শ্রম বিভাগ শ্রমিক কল্যাণের রিপোর্ট অনুযায়ী হবে।" onEdit={!canEdit ? undefined : () => setIsDeptManpowerModalOpen(true)} buttonText="বিভাগীয় জনশক্তি এডিট" icon={PieChart}>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 text-xs text-center">
            <thead>
              <tr className="bg-gray-50 text-gray-700">
                <th className="border border-gray-200 p-2 text-left">বিভাগসমূহ</th>
                <th className="border border-gray-200 p-2 text-left">জনশক্তির ধরণ</th>
                <th className="border border-gray-200 p-2">বিগত সংখ্যা</th>
                <th className="border border-gray-200 p-2">বর্তমান সংখ্যা</th>
                <th className="border border-gray-200 p-2">বৃদ্ধি</th>
                <th className="border border-gray-200 p-2">ঘাটতি</th>
                <th className="border border-gray-200 p-2">টার্গেট</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: "labor", label: "শ্রম*", rows: [{ id: "rokon", label: "সদস্য (রুকন)" }, { id: "karmi", label: "কর্মী" }, { id: "associate", label: "সহযোগী সদস্য" }] },
                { id: "ulama", label: "উলামা", rows: [{ id: "rokon", label: "সদস্য (রুকন)" }, { id: "karmi", label: "কর্মী" }, { id: "associate", label: "সহযোগী সদস্য" }] },
                { id: "pro", label: "পেশাজীবী", rows: [{ id: "rokon", label: "সদস্য (রুকন)" }, { id: "karmi", label: "কর্মী" }, { id: "associate", label: "সহযোগী সদস্য" }] },
                { id: "youth", label: "যুব", rows: [{ id: "rokon", label: "সদস্য (রুকন)" }, { id: "karmi", label: "কর্মী" }, { id: "associate", label: "সহযোগী সদস্য" }] },
                { id: "nonMuslim", label: "ভিন্নধর্মাবলম্বী", rows: [{ id: "rokon", label: "সদস্য (রুকন)" }, { id: "karmi", label: "কর্মী" }, { id: "associate", label: "সহযোগী সদস্য" }] }
              ].map(dept => (
                <React.Fragment key={dept.id}>
                  {dept.rows.map((row, idx) => (
                    <tr key={`${dept.id}-${row.id}`}>
                      {idx === 0 && <td rowSpan={dept.rows.length} className="border border-gray-200 p-2 text-left font-bold">{dept.label}</td>}
                      <td className="border border-gray-200 p-2 text-left">{row.label}</td>
                      <td className="border border-gray-200 p-2">{formatVal(compReport.deptManpower?.[dept.id]?.[row.id]?.previousCount)}</td>
                      <td className="border border-gray-200 p-2">{formatVal(compReport.deptManpower?.[dept.id]?.[row.id]?.currentCount)}</td>
                      <td className="border border-gray-200 p-2">{formatVal(compReport.deptManpower?.[dept.id]?.[row.id]?.increase)}</td>
                      <td className="border border-gray-200 p-2">{formatVal(compReport.deptManpower?.[dept.id]?.[row.id]?.deficit)}</td>
                      <td className="border border-gray-200 p-2">{formatVal(compReport.deptManpower?.[dept.id]?.[row.id]?.target)}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </ReportAccordionSection>

      <ReportAccordionSection title="৪. ইউনিট সংগঠন:" onEdit={!canEdit ? undefined : () => setIsUnitOrgModalOpen(true)} buttonText="ইউনিট সংগঠন এডিট" icon={LayoutGrid}>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 text-xs text-center">
            <thead>
              <tr className="bg-gray-50 text-gray-700">
                <th className="border border-gray-200 p-2 text-left">ইউনিটের ধরণ</th>
                <th className="border border-gray-200 p-2">বিগত সংখ্যা</th>
                <th className="border border-gray-200 p-2">বর্তমান সংখ্যা</th>
                <th className="border border-gray-200 p-2">বৃদ্ধি</th>
                <th className="border border-gray-200 p-2">ঘাটতি</th>
                <th className="border border-gray-200 p-2">টার্গেট</th>
                <th className="border border-gray-200 p-2">বাস্তবায়নের হার</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 'generalMale', label: 'সাধারণ ইউনিট (পুরুষ)' },
                { id: 'ulama', label: 'উলামা ইউনিট' },
                { id: 'business', label: 'ব্যবসায়ী ইউনিট' },
                { id: 'laborWelfare', label: 'শ্রমিক কল্যাণ ইউনিট' },
                { id: 'youth', label: 'যুব ইউনিট' },
                { id: 'media', label: 'মিডিয়া ইউনিট' },
                { id: 'culture', label: 'সাহিত্য ও সংস্কৃতি ইউনিট' },
                { id: 'total', label: 'সর্বমোট ইউনিট সংখ্যা' }
              ].map(row => {
                const data = compReport.unitOrganization?.[row.id] || {};
                const target = data.target || 0;
                const increase = data.increase || 0;
                const rate = target > 0 ? Math.round((increase / target) * 100) : 0;
                return (
                  <tr key={row.id}>
                    <td className="border border-gray-200 p-2 text-left font-medium">{row.label}</td>
                    <td className="border border-gray-200 p-2">{formatVal(data.previousCount)}</td>
                    <td className="border border-gray-200 p-2">{formatVal(data.currentCount)}</td>
                    <td className="border border-gray-200 p-2">{formatVal(data.increase)}</td>
                    <td className="border border-gray-200 p-2">{formatVal(data.deficit)}</td>
                    <td className="border border-gray-200 p-2">{formatVal(data.target)}</td>
                    <td className="border border-gray-200 p-2">{rate}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </ReportAccordionSection>

      <ReportAccordionSection title="৫. দাওয়াতী ও পারিবারিক ইউনিট" onEdit={!canEdit ? undefined : () => setIsUnitModalOpen(true)} buttonText="ইউনিট এডিট" icon={Layers}>
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
                { id: 'dawahUnit', label: 'দাওয়াতী ইউনিট' },
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

      <ReportAccordionSection title="৬. বিদায়ী ছাত্র জনশক্তির সংগঠনে যোগদান:" onEdit={!canEdit ? undefined : () => setIsStudentModalOpen(true)} buttonText="যোগদান এডিট" icon={GraduationCap}>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 text-sm text-center">
            <thead>
              <tr className="bg-gray-50 text-gray-700">
                <th className="border border-gray-200 p-2 text-left">বিবরণ</th>
                <th className="border border-gray-200 p-2">সদস্য</th>
                <th className="border border-gray-200 p-2">সাথী</th>
                <th className="border border-gray-200 p-2">কর্মী</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200 p-2 text-left font-medium">মোট যোগদানকৃত ছাত্র সংখ্যা</td>
                <td className="border border-gray-200 p-2">{formatVal(compReport.studentJoining?.rokonCount)}</td>
                <td className="border border-gray-200 p-2">{formatVal(compReport.studentJoining?.companionCount)}</td>
                <td className="border border-gray-200 p-2">{formatVal(compReport.studentJoining?.karmiCount)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </ReportAccordionSection>

      <ReportAccordionSection title="৭. সফর:" onEdit={!canEdit ? undefined : () => setIsSafarModalOpen(true)} buttonText="সফর এডিট" icon={MapPin}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100 text-center">
            <p className="text-[10px] text-indigo-600 font-bold uppercase mb-1">উর্ধ্বতন দায়িত্বশীল</p>
            <p className="text-lg font-black text-indigo-700">{formatVal(compReport.safar?.higherAuthoritySafar)}</p>
          </div>
          <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100 text-center">
            <p className="text-[10px] text-emerald-600 font-bold uppercase mb-1">ওয়ার্ড সভাপতি</p>
            <p className="text-lg font-black text-emerald-700">{formatVal(compReport.safar?.wardPresidentSafar)}</p>
          </div>
          <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 text-center">
            <p className="text-[10px] text-amber-600 font-bold uppercase mb-1">ওয়ার্ড টিম সদস্য</p>
            <p className="text-lg font-black text-amber-700">{formatVal(compReport.safar?.teamMemberSafar)}</p>
          </div>
        </div>
      </ReportAccordionSection>

      <ReportAccordionSection title="৮. ইয়ানত দাতা:" onEdit={!canEdit ? undefined : () => setIsDonorModalOpen(true)} buttonText="দাতা এডিট" icon={HandCoins}>
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

      <ReportAccordionSection title="৯. সাংগঠনিক বৈঠকাদি:" onEdit={!canEdit ? undefined : () => setIsOrgMeetingModalOpen(true)} buttonText="বৈঠক এডিট" icon={MessagesSquare}>
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
                { id: 'wardTeam', sl: '১.', label: 'ওয়ার্ড টিম বৈঠক' },
                { id: 'wardMeeting', sl: '২.', label: 'ওয়ার্ড বৈঠক (মাসিক ইউনিট দায়িত্বশীল)' },
                { id: 'memberMeeting', sl: '৩.', label: 'ওয়ার্ডভিত্তিক মাসিক সদস্য (রুকন)' },
                { id: 'karmiMeeting', sl: '৪.', label: 'ইউনিটে কর্মী বৈঠক/পারিবারিক বৈঠক' },
                { id: 'karmiConference', sl: '৫.', label: 'ওয়ার্ড পর্যায়ে কর্মী সম্মেলন' },
                { id: 'deptMeeting', sl: '৬.', label: 'উলামা/যুব/শ্রমিক বৈঠক/সমাবেশ' },
                { id: 'associateGathering', sl: '৭.', label: 'সহযোগী সদস্য সমাবেশ/সম্মেলন' },
                { id: 'activeAssociateGathering', sl: '৮.', label: 'সক্রিয় সহযোগী সদস্য সমাবেশ' },
                { id: 'others', sl: '৯.', label: 'অন্যান্য' }
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
      <DeptManpowerModal
        isOpen={isDeptManpowerModalOpen}
        onClose={() => setIsDeptManpowerModalOpen(false)}
        onSave={async (data) => { await onSave('deptManpower', data); setIsDeptManpowerModalOpen(false); }}
        initialData={compReport.deptManpower || {}}
        saving={saving}
      />
      <UnitOrganizationModal
        isOpen={isUnitOrgModalOpen}
        onClose={() => setIsUnitOrgModalOpen(false)}
        onSave={async (data) => { await onSave('unitOrganization', data); setIsUnitOrgModalOpen(false); }}
        initialData={compReport.unitOrganization || {}}
        saving={saving}
      />
      <DawahFamilyUnitModal
        isOpen={isUnitModalOpen}
        onClose={() => setIsUnitModalOpen(false)}
        onSave={async (data) => { await onSave('unitStats', data); setIsUnitModalOpen(false); }}
        initialData={compReport.unitStats}
        saving={saving}
      />
      <StudentJoiningModal
        isOpen={isStudentModalOpen}
        onClose={() => setIsStudentModalOpen(false)}
        onSave={async (data) => { await onSave('studentJoining', data); setIsStudentModalOpen(false); }}
        initialData={compReport.studentJoining}
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
