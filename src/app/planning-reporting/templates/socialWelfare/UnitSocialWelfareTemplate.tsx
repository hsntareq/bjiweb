'use client';
import { useState } from 'react';
import { SocialPersonalModal } from '@/components/Reporting/Modals/SocialPersonalModal';
import { SocialWorkModal } from '@/components/Reporting/Modals/SocialWorkModal';
import { SocialHealthModal } from '@/components/Reporting/Modals/SocialHealthModal';
import { SocialInstModal } from '@/components/Reporting/Modals/SocialInstModal';
import { ReportAccordionSection } from '@/components/Reporting/ReportAccordionSection';
import { Building, Stethoscope, User, Users } from 'lucide-react';
import { ReportSectionProps } from '../types';

export function UnitSocialWelfareTemplate({ compReport, formatVal, canEdit, onSave, saving }: ReportSectionProps) {
  const [isSocialPersonalModalOpen, setIsSocialPersonalModalOpen] = useState(false);
  const [isSocialWorkModalOpen, setIsSocialWorkModalOpen] = useState(false);
  const [isSocialHealthModalOpen, setIsSocialHealthModalOpen] = useState(false);
  const [isSocialInstModalOpen, setIsSocialInstModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <ReportAccordionSection
        title="১. ব্যক্তিগত উদ্যোগে সামাজিক কাজ:"
        icon={User}
        onEdit={!canEdit ? undefined : () => setIsSocialPersonalModalOpen(true)}
        buttonText="এডিট"
      >
        <div className="space-y-2">
          <div className="bg-gray-50 p-2 rounded flex justify-between items-center text-[10px]">
            <span>মোট কতজন ব্যক্তিগত উদ্যোগে সামাজিক কাজ করেছেন:</span>
            <span className="font-bold">{formatVal(compReport.socialWork?.personalCount)}</span>
          </div>
          <div className="bg-gray-50 p-2 rounded flex justify-between items-center text-[10px]">
            <span>মোট সেবা প্রাপ্ত সংখ্যা:</span>
            <span className="font-bold">{formatVal(compReport.socialWork?.personalServiceCount)}</span>
          </div>
          <div className="bg-gray-50 p-2 rounded flex justify-between items-center text-[10px] mt-2 border-t pt-2 border-gray-200">
            <span>স্বাস্থ্যসেবা:</span>
            <button type="button" onClick={() => setIsSocialHealthModalOpen(true)} className="text-blue-600 underline">এডিট স্বাস্থ্যসেবা</button>
          </div>
          <div className="bg-gray-50 p-2 rounded flex justify-between items-center text-[10px]">
            <span>মোট কতজন স্বাস্থ্যসেবা কাজে অংশগ্রহণ করেছেন:</span>
            <span className="font-bold">{formatVal(compReport.socialWork?.healthServiceCount)}</span>
          </div>
          <div className="bg-gray-50 p-2 rounded flex justify-between items-center text-[10px]">
            <span>মোট সেবা প্রাপ্ত সংখ্যা:</span>
            <span className="font-bold">{formatVal(compReport.socialWork?.healthBeneficiaryCount)}</span>
          </div>
        </div>
        <SocialPersonalModal
          isOpen={isSocialPersonalModalOpen}
          onClose={() => setIsSocialPersonalModalOpen(false)}
          onSave={async data => {
            const newSocialWork = {
              ...compReport.socialWork,
              personalCount: data.workerCount,
              personalServiceCount: data.beneficiaryCount
            };
            await onSave('socialWork', newSocialWork);
            setIsSocialPersonalModalOpen(false);
          }}
          initialData={{
            workerCount: compReport.socialWork?.personalCount || 0,
            beneficiaryCount: compReport.socialWork?.personalServiceCount || 0
          }}
          saving={saving}
        />
        <SocialHealthModal
          isOpen={isSocialHealthModalOpen}
          onClose={() => setIsSocialHealthModalOpen(false)}
          onSave={async data => {
            const newSocialWork = {
              ...compReport.socialWork,
              healthTrainingCount: data.trainingParticipantCount,
              healthServiceCount: data.serviceParticipantCount,
              healthBeneficiaryCount: data.beneficiaryCount
            };
            await onSave('socialWork', newSocialWork);
            setIsSocialHealthModalOpen(false);
          }}
          initialData={{
            trainingParticipantCount: compReport.socialWork?.healthTrainingCount || 0,
            serviceParticipantCount: compReport.socialWork?.healthServiceCount || 0,
            beneficiaryCount: compReport.socialWork?.healthBeneficiaryCount || 0
          }}
          saving={saving}
        />
      </ReportAccordionSection>

      <ReportAccordionSection
        title="২. ইউনিটের উদ্যোগে সামাজিক কাজ:"
        icon={Users}
        onEdit={!canEdit ? undefined : () => setIsSocialWorkModalOpen(true)}
        buttonText="এডিট"
      >
        <SocialWorkModal
          isOpen={isSocialWorkModalOpen}
          onClose={() => setIsSocialWorkModalOpen(false)}
          onSave={async data => {
            const newSocialWork = {
              ...compReport.socialWork,
              generalServiceTeamCount: data.generalServiceTeamCount,
              technicalServiceTeamCount: data.technicalServiceTeamCount,
              volunteerTeamCount: data.volunteerTeamCount,
              devWork: data.devWork,
              socialEvent: data.socialEvent,
              humanitarian: data.humanitarian,
              cleaning: data.cleaning,
              medical: data.medical,
              blood: data.blood,
              maternity: data.maternity,
              newborn: data.newborn,
              maktub: data.maktub,
              others: data.others,
              education: data.education,
              technical: data.technical,
              online: data.online,
              trees: data.trees,
              awareness: data.awareness,
              disaster: data.disaster,
              relief: data.relief,
              nonMuslim: data.nonMuslim,
              burial: data.burial,
              employment: data.employment
            };
            await onSave('socialWork', newSocialWork);
            setIsSocialWorkModalOpen(false);
          }}
          initialData={compReport.socialWork || {}}
          saving={saving}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
          <div className="bg-blue-50 p-2 rounded flex justify-between items-center text-[10px]">
            <span>সাধারণ সেবা টিম:</span>
            <span className="font-bold">{formatVal(compReport.socialWork?.generalServiceTeamCount)}</span>
          </div>
          <div className="bg-blue-50 p-2 rounded flex justify-between items-center text-[10px]">
            <span>টেকনিক্যাল সেবা টিম:</span>
            <span className="font-bold">{formatVal(compReport.socialWork?.technicalServiceTeamCount)}</span>
          </div>
          <div className="bg-blue-50 p-2 rounded flex justify-between items-center text-[10px]">
            <span>স্বেচ্ছাসেবক টিম:</span>
            <span className="font-bold">{formatVal(compReport.socialWork?.volunteerTeamCount)}</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          <table className="w-full border-collapse border border-gray-200 text-[10px]">
            <thead>
              <tr className="bg-gray-100"><th className="border border-gray-200 p-1 text-left">বিবরণ</th><th className="border border-gray-200 p-1 w-12">সংখ্যা</th></tr>
            </thead>
            <tbody>
              {[
                { id: 'devWork', label: 'ছোট-ছোট উন্নয়নমূলক কাজ' },
                { id: 'socialEvent', label: 'সামাজিক অনুষ্ঠানে অংশগ্রহণ' },
                { id: 'humanitarian', label: 'মানবিক সহায়তা' },
                { id: 'cleaning', label: 'পরিষ্কার-পরিচ্ছন্নতা' },
                { id: 'medical', label: 'রোগীর পরিচর্চা' },
                { id: 'blood', label: 'স্বেচ্ছায় রক্ত দান' },
                { id: 'maternity', label: 'মাতৃত্বকালীন সময়ে সেবা' },
                { id: 'newborn', label: 'নবজাতক গিফট প্রদান' },
                { id: 'maktub', label: 'ভ্রম্যামান স্কুল/মক্তব চালু' },
                { id: 'others', label: 'অন্যান্য' }
              ].map(row => (
                <tr key={row.id}>
                  <td className="border border-gray-200 p-1">{row.label}</td>
                  <td className="border border-gray-200 p-1 text-center">{formatVal(compReport.socialWork?.[row.id])}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <table className="w-full border-collapse border border-gray-200 text-[10px]">
            <thead>
              <tr className="bg-gray-100"><th className="border border-gray-200 p-1 text-left">বিবরণ</th><th className="border border-gray-200 p-1 w-12">সংখ্যা</th></tr>
            </thead>
            <tbody>
              {[
                { id: 'education', label: 'শিক্ষা সহায়তা প্রদান' },
                { id: 'technical', label: 'টেকনিক্যাল সেবা প্রদান' },
                { id: 'online', label: 'অনলাইনের মাধ্যমে সেবা' },
                { id: 'trees', label: 'বৃক্ষরোপন' },
                { id: 'awareness', label: 'জনসচেতনতামূলক প্রোগ্রাম' },
                { id: 'disaster', label: 'দুর্যোগকালীন সহায়তা' },
                { id: 'relief', label: 'ত্রাণ বিতরণ / গোশত বিতরণ' },
                { id: 'nonMuslim', label: 'ভিন্নধর্মাবলম্বীদের সেবা' },
                { id: 'burial', label: 'মাইয়্যেতের গোসল' },
                { id: 'employment', label: 'স্বল্প পুঁজিতে কর্মসংস্থান' }
              ].map(row => (
                <tr key={row.id}>
                  <td className="border border-gray-200 p-1">{row.label}</td>
                  <td className="border border-gray-200 p-1 text-center">{formatVal(compReport.socialWork?.[row.id])}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ReportAccordionSection>

    </div>
  );
}
