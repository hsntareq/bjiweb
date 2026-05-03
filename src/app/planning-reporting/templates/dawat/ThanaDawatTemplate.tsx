'use client';
import { useState } from 'react';
import { DawatTablighModal } from '@/components/Reporting/Modals/DawatTablighModal';
import { DepartmentalInfoModal } from '@/components/Reporting/Modals/DepartmentalInfoModal';
import { DawahPublicationModal } from '@/components/Reporting/Modals/DawahPublicationModal';
import { ProgramImplementationModal } from '@/components/Reporting/Modals/ProgramImplementationModal';
import { ReportAccordionSection } from '@/components/Reporting/ReportAccordionSection';
import { CalendarCheck, LayoutGrid, Library, Megaphone } from 'lucide-react';
import React from 'react';
import { ReportSectionProps } from '../types';

export function ThanaDawatTemplate({ compReport, formatVal, canEdit, onSave, onSaveMultiple, saving }: ReportSectionProps) {
  const [isDawatTablighModalOpen, setIsDawatTablighModalOpen] = useState(false);
  const [isDeptModalOpen, setIsDeptModalOpen] = useState(false);
  const [isDawahPubModalOpen, setIsDawahPubModalOpen] = useState(false);
  const [isProgramModalOpen, setIsProgramModalOpen] = useState(false);

  return (
    <div className="space-y-4">
      <ReportAccordionSection title="ক) জনসাধারণের মাঝে সর্বমোট দাওয়াত" onEdit={!canEdit ? undefined : () => setIsDawatTablighModalOpen(true)} buttonText="দাওয়াত এডিট" icon={Megaphone}>
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-bold text-gray-700 mb-3 underline">১. থানার সর্বমোট দাওয়াত পরিসংখ্যান (সকল ওয়ার্ড সমন্বিত):</h4>
            <table className="w-full border-collapse border border-gray-200 text-sm">
              <thead>
                <tr className="bg-blue-50">
                  <th className="border border-gray-200 p-2 text-left">বিবরণ</th>
                  <th className="border border-gray-200 p-2">মোট সংখ্যা</th>
                  <th className="border border-gray-200 p-2">বর্ণনা</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 p-2">সর্বমোট জনসংখ্যা পৌঁছানো</td>
                  <td className="border border-gray-200 p-2 text-center font-bold">{formatVal(compReport.headerInfo?.totalReachedCount)}</td>
                  <td className="border border-gray-200 p-2 text-gray-600">থানার সকল ওয়ার্ড থেকে সমন্বিত</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-2">মাসিক লক্ষ্যমাত্রা</td>
                  <td className="border border-gray-200 p-2 text-center font-bold">{formatVal(compReport.headerInfo?.monthlyTargetCount)}</td>
                  <td className="border border-gray-200 p-2 text-gray-600">থানা স্তরের নির্ধারিত</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-2">মোট জনসংখ্যা</td>
                  <td className="border border-gray-200 p-2 text-center font-bold">{formatVal(compReport.headerInfo?.totalPopulationCount)}</td>
                  <td className="border border-gray-200 p-2 text-gray-600">দায়িত্ব পরিসরের মধ্যে</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-700 mb-3 underline">২. থানা পর্যায়ের বিস্তারিত দাওয়াত তথ্য:</h4>
            <table className="w-full border-collapse border border-gray-200 text-sm">
              <thead>
                <tr className="bg-blue-50">
                  <th className="border border-gray-200 p-2 text-left">বিবরণ</th>
                  <th className="border border-gray-200 p-2">রুকন</th>
                  <th className="border border-gray-200 p-2">কর্মী</th>
                  <th className="border border-gray-200 p-2">মোট</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 p-2 text-left">কুরআন শিক্ষা প্রদান করেছেন</td>
                  <td className="border border-gray-200 p-2 text-center">{formatVal(compReport.departmentalInfo?.quranTalim?.rokonTeacherCount)}</td>
                  <td className="border border-gray-200 p-2 text-center">{formatVal(compReport.departmentalInfo?.quranTalim?.karmiTeacherCount)}</td>
                  <td className="border border-gray-200 p-2 text-center font-bold">{formatVal((compReport.departmentalInfo?.quranTalim?.rokonTeacherCount || 0) + (compReport.departmentalInfo?.quranTalim?.karmiTeacherCount || 0))}</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-2 text-left">কতজনকে কুরআন শিক্ষা প্রদান করা হয়েছে</td>
                  <td className="border border-gray-200 p-2 text-center text-gray-400">-</td>
                  <td className="border border-gray-200 p-2 text-center text-gray-400">-</td>
                  <td className="border border-gray-200 p-2 text-center font-bold">{formatVal(compReport.departmentalInfo?.quranTalim?.reachedCount)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </ReportAccordionSection>

      <ReportAccordionSection title="খ) বিভাগ ভিত্তিক তথ্য" onEdit={!canEdit ? undefined : () => setIsDeptModalOpen(true)} buttonText="বিভাগ তথ্য এডিট" icon={LayoutGrid}>
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-bold text-gray-700 mb-3 underline">১. তা&apos;লীমুল কুরআনের মাধ্যমে দাওয়াত:</h4>
            <table className="w-full border-collapse border border-gray-200 text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 p-2 text-left">বিবরণ</th>
                  <th className="border border-gray-200 p-2">রুকন</th>
                  <th className="border border-gray-200 p-2">কর্মী</th>
                  <th className="border border-gray-200 p-2">মোট</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 p-2 text-left">কুরআন শিক্ষা প্রদান করেছেন</td>
                  <td className="border border-gray-200 p-2 text-center">{formatVal(compReport.departmentalInfo?.quranTalim?.rokonTeacherCount)}</td>
                  <td className="border border-gray-200 p-2 text-center">{formatVal(compReport.departmentalInfo?.quranTalim?.karmiTeacherCount)}</td>
                  <td className="border border-gray-200 p-2 text-center font-bold">{formatVal((compReport.departmentalInfo?.quranTalim?.rokonTeacherCount || 0) + (compReport.departmentalInfo?.quranTalim?.karmiTeacherCount || 0))}</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-2 text-left">কতজনকে কুরআন শিক্ষা প্রদান করা হয়েছে</td>
                  <td className="border border-gray-200 p-2 text-center text-gray-400">-</td>
                  <td className="border border-gray-200 p-2 text-center text-gray-400">-</td>
                  <td className="border border-gray-200 p-2 text-center font-bold">{formatVal(compReport.departmentalInfo?.quranTalim?.reachedCount)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-700 mb-3 underline">২, ৩, ৪. কর্মজীবী, শ্রমজীবী ও ভিন্নধর্মাবলম্বী দাওয়াত:</h4>
            <table className="w-full border-collapse border border-gray-200 text-sm text-center">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 p-2 text-left">বিভাগসমূহ</th>
                  <th className="border border-gray-200 p-2">পৌঁছানো হয়েছে</th>
                  <th className="border border-gray-200 p-2">সহযোগী সদস্য</th>
                  <th className="border border-gray-200 p-2">টার্গেট</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 'political', label: 'রাজনৈতিক ব্যক্তি/প্রভাবশালী' },
                  { id: 'professional', label: 'পেশাজীবী' },
                  { id: 'laborer', label: 'শ্রমজীবী' },
                  { id: 'marginalized', label: 'প্রান্তিক জনগোষ্ঠী' },
                  { id: 'nonMuslim', label: 'ভিন্নধর্মাবলম্বী/মিডিয়া কর্মী' }
                ].map(row => (
                  <tr key={row.id}>
                    <td className="border border-gray-200 p-2 text-left">{row.label}</td>
                    <td className="border border-gray-200 p-2">{formatVal(compReport.departmentalInfo?.professions?.[row.id]?.reached)}</td>
                    <td className="border border-gray-200 p-2">{formatVal(compReport.departmentalInfo?.professions?.[row.id]?.associate)}</td>
                    <td className="border border-gray-200 p-2">{formatVal(compReport.departmentalInfo?.professions?.[row.id]?.target)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-sm font-bold text-gray-700 mb-3 underline">৫. পরিবার ভিত্তিক:</h4>
              <div className="flex gap-4">
                <div className="flex-1 bg-gray-50 p-3 rounded-lg border border-gray-100"><p className="text-xs text-gray-500">অংশগ্রহণকারী পরিবার</p><p className="font-bold">{formatVal(compReport.departmentalInfo?.family?.totalCount)}</p></div>
                <div className="flex-1 bg-gray-50 p-3 rounded-lg border border-gray-100"><p className="text-xs text-gray-500">নতুন পরিবারে দাওয়াত</p><p className="font-bold">{formatVal(compReport.departmentalInfo?.family?.newCount)}</p></div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-700 mb-3 underline">৭. তথ্যপ্রযুক্তি:</h4>
              <div className="flex gap-4">
                <div className="flex-1 bg-cyan-50 p-3 rounded-lg border border-cyan-100"><p className="text-xs text-cyan-600">উপযুক্ত জনশক্তি</p><p className="font-bold">{formatVal(compReport.departmentalInfo?.it?.manpowerCount)}</p></div>
                <div className="flex-1 bg-cyan-50 p-3 rounded-lg border border-cyan-100"><p className="text-xs text-cyan-600">অংশগ্রহণকারী</p><p className="font-bold">{formatVal(compReport.departmentalInfo?.it?.participantCount)}</p></div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-700 mb-3 underline">৬. মসজিদ/দাওয়াহ সেন্টার ভিত্তিক দাওয়াত:</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-rose-50 p-3 rounded-lg border border-rose-100"><p className="text-xs text-rose-600">মসজিদ সংখ্যা</p><p className="font-bold">{formatVal(compReport.departmentalInfo?.mosque?.totalCount)}</p></div>
              <div className="bg-rose-50 p-3 rounded-lg border border-rose-100"><p className="text-xs text-rose-600">দাওয়াতী মসজিদ</p><p className="font-bold">{formatVal(compReport.departmentalInfo?.mosque?.dawatCount)}</p></div>
              <div className="bg-rose-50 p-3 rounded-lg border border-rose-100"><p className="text-xs text-rose-600">দাওয়াহ সেন্টার</p><p className="font-bold">{formatVal(compReport.departmentalInfo?.mosque?.centerCount)}</p></div>
              <div className="bg-rose-50 p-3 rounded-lg border border-rose-100"><p className="text-xs text-rose-600">তথ্যসেবা কেন্দ্র</p><p className="font-bold">{formatVal(compReport.departmentalInfo?.mosque?.infoCenterCount)}</p></div>
            </div>
          </div>
        </div>
      </ReportAccordionSection>

      <ReportAccordionSection title="গ) দাওয়াহ ও প্রকাশনা:*সংগঠন অনুমোদিত:" onEdit={!canEdit ? undefined : () => setIsDawahPubModalOpen(true)} buttonText="দাওয়াহ এডিট" icon={Library}>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-700">
                <th className="border border-gray-200 p-2 text-left">বিবরণ</th>
                <th className="border border-gray-200 p-2">মোট সংখ্যা</th>
                <th className="border border-gray-200 p-2">বৃদ্ধি</th>
                <th className="border border-gray-200 p-2 text-left">বিবরণ</th>
                <th className="border border-gray-200 p-2">মোট সংখ্যা</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200 p-2">পাঠাগার/ বই/ বই বিলি</td>
                <td className="border border-gray-200 p-2 text-center">{formatVal(compReport.dawahPublication?.libraryCount)} / {formatVal(compReport.dawahPublication?.bookCount)} / {formatVal(compReport.dawahPublication?.bookDistributedCount)}</td>
                <td className="border border-gray-200 p-2 text-center">{formatVal(compReport.dawahPublication?.libraryIncrease)} / {formatVal(compReport.dawahPublication?.bookIncrease)} / {formatVal(compReport.dawahPublication?.bookDistributedIncrease)}</td>
                <td className="border border-gray-200 p-2">বইয়ের সফট কপি বিলি</td>
                <td className="border border-gray-200 p-2 text-center font-bold">{formatVal(compReport.dawahPublication?.softCopyDistributed)}</td>
              </tr>
              <tr>
                <td className="border border-gray-200 p-2 text-left">ওয়ার্ডে বই বিলিকেন্দ্র/বই বিলি</td>
                <td className="border border-gray-200 p-2 text-center">{formatVal(compReport.dawahPublication?.unitCenterCount)} / {formatVal(compReport.dawahPublication?.unitBookDistributed)}</td>
                <td className="border border-gray-200 p-2 text-center">{formatVal(compReport.dawahPublication?.unitCenterIncrease)} / {formatVal(compReport.dawahPublication?.unitBookDistributedIncrease)}</td>
                <td className="border border-gray-200 p-2">দাওয়াতী লিংক বিতরণ</td>
                <td className="border border-gray-200 p-2 text-center font-bold">{formatVal(compReport.dawahPublication?.dawatLinkDistributed)}</td>
              </tr>
              <tr>
                <td className="border border-gray-200 p-2 text-left">থানায় বই বিক্রয় কেন্দ্র/বই বিক্রয়</td>
                <td className="border border-gray-200 p-2 text-center">{formatVal(compReport.dawahPublication?.wardCenterCount)} / {formatVal(compReport.dawahPublication?.wardBookSold)}</td>
                <td className="border border-gray-200 p-2 text-center">{formatVal(compReport.dawahPublication?.wardCenterIncrease)} / {formatVal(compReport.dawahPublication?.wardBookSoldIncrease)}</td>
                <td className="border border-gray-200 p-2">সোনার বাংলা/সংগ্রাম/পৃথিবী</td>
                <td className="border border-gray-200 p-2 text-center font-bold">{formatVal(compReport.dawahPublication?.sonarBanglaCount)} / {formatVal(compReport.dawahPublication?.sangramCount)} / {formatVal(compReport.dawahPublication?.prithibiCount)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </ReportAccordionSection>

      <ReportAccordionSection title="ঘ) কর্মসূচি বাস্তবায়ন" onEdit={!canEdit ? undefined : () => setIsProgramModalOpen(true)} buttonText="কর্মসূচি এডিট" icon={CalendarCheck}>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-700">
                <th className="border border-gray-200 p-2 text-left">ক্রম</th>
                <th className="border border-gray-200 p-2 text-left">কর্মসূচীর বিবরণ</th>
                <th className="border border-gray-200 p-2">মোট সংখ্যা</th>
                <th className="border border-gray-200 p-2">টার্গেট</th>
                <th className="border border-gray-200 p-2">গড় উপস্থিতি</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 'monthlyMeeting', sl: '১.', label: 'থানায় মাসিক সাধারণ সভা/পারিবারিক সভা', fields: ['general', 'family'] },
                { id: 'dawahMeeting', sl: '২.', label: 'দাওয়াতী সভা/আলোচনা সভা/সুধী সমাবেশ', fields: ['dawah', 'discussion', 'gathering'] },
                { id: 'siratunnabi', sl: '৩.', label: 'সীরাতুন্নবী (সাঃ) মাহফিল/ ঈদ পুনর্মিলনী', fields: ['sirat', 'eid'] },
                { id: 'darsTafsir', sl: '৪.', label: 'দারস্/তাফসীর/দাওয়াতি জনসভা', fields: ['dars', 'tafsir', 'public'] },
                { id: 'iftar', sl: '৫.', label: 'ইফতার মাহফিল (ব্যক্তিগত/সাংগঠনিক)', fields: ['personal', 'org'] },
                { id: 'teaCircle', sl: '৬.', label: 'চা চক্র/সামষ্টিক খাওয়া/শিক্ষা সফর', fields: ['tea', 'lunch', 'tour'] },
                { id: 'competition', sl: '৭.', label: "কিরাত/হামদ না'ত প্রতিযোগিতা/ অন্যান্য", fields: ['comp', 'other'] }
              ].map(row => (
                <tr key={row.id}>
                  <td className="border border-gray-200 p-2 text-center">{row.sl}</td>
                  <td className="border border-gray-200 p-2 text-left">{row.label}</td>
                  <td className="border border-gray-200 p-2 text-center">
                    {row.fields.map((f, idx) => (
                      <React.Fragment key={f}>{idx > 0 && ' / '}{formatVal(compReport.programs?.[row.id]?.total?.[f])}</React.Fragment>
                    ))}
                  </td>
                  <td className="border border-gray-200 p-2 text-center">
                    {row.fields.map((f, idx) => (
                      <React.Fragment key={f}>{idx > 0 && ' / '}{formatVal(compReport.programs?.[row.id]?.target?.[f])}</React.Fragment>
                    ))}
                  </td>
                  <td className="border border-gray-200 p-2 text-center">
                    {row.fields.map((f, idx) => (
                      <React.Fragment key={f}>{idx > 0 && ' / '}{formatVal(compReport.programs?.[row.id]?.avgAttendance?.[f])}</React.Fragment>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ReportAccordionSection>

      <DawatTablighModal
        isOpen={isDawatTablighModalOpen}
        onClose={() => setIsDawatTablighModalOpen(false)}
        onSave={async (data) => {
          const updates: Record<string, any> = {};
          ['headerInfo', 'unitDawat', 'personalDawat', 'generalMeeting', 'prCampaign'].forEach(key => {
            if (data[key] !== undefined) updates[key] = data[key];
          });
          if (onSaveMultiple) await onSaveMultiple(updates);
          setIsDawatTablighModalOpen(false);
        }}
        initialData={{
          headerInfo: compReport.headerInfo,
          unitDawat: compReport.unitDawat,
          personalDawat: compReport.personalDawat,
          generalMeeting: compReport.generalMeeting,
          prCampaign: compReport.prCampaign
        }}
        saving={saving}
      />

      <DepartmentalInfoModal
        isOpen={isDeptModalOpen}
        onClose={() => setIsDeptModalOpen(false)}
        onSave={async (data) => { await onSave('departmentalInfo', data); setIsDeptModalOpen(false); }}
        initialData={compReport.departmentalInfo}
        saving={saving}
      />

      <DawahPublicationModal
        isOpen={isDawahPubModalOpen}
        onClose={() => setIsDawahPubModalOpen(false)}
        onSave={async (data) => { await onSave('dawahPublication', data); setIsDawahPubModalOpen(false); }}
        initialData={compReport.dawahPublication}
        saving={saving}
      />

      <ProgramImplementationModal
        isOpen={isProgramModalOpen}
        onClose={() => setIsProgramModalOpen(false)}
        onSave={async (data) => { await onSave('programs', data); setIsProgramModalOpen(false); }}
        initialData={compReport.programs}
        saving={saving}
      />
    </div>
  );
}
