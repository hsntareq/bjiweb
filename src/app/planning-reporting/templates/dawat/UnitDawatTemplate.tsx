'use client';
import { DawahPublicationModal } from '@/components/Reporting/Modals/DawahPublicationModal';
import { DawatTablighModal } from '@/components/Reporting/Modals/DawatTablighModal';
import { DepartmentalInfoModal } from '@/components/Reporting/Modals/DepartmentalInfoModal';
import { ProgramImplementationModal } from '@/components/Reporting/Modals/ProgramImplementationModal';
import { ReportAccordionSection } from '@/components/Reporting/ReportAccordionSection';
import { CalendarCheck, LayoutGrid, Library, Megaphone } from 'lucide-react';
import React, { useState } from 'react';
import { ReportSectionProps } from '../types';

export function UnitDawatTemplate({ compReport, formatVal, canEdit, onSave, onSaveMultiple, saving }: ReportSectionProps) {
	const [isDawatTablighModalOpen, setIsDawatTablighModalOpen] = useState(false);
	const [isDeptModalOpen, setIsDeptModalOpen] = useState(false);
	const [isDawahPubModalOpen, setIsDawahPubModalOpen] = useState(false);
	const [isProgramModalOpen, setIsProgramModalOpen] = useState(false);

	return (
		<div className="space-y-4">
			<ReportAccordionSection title="ক) জনসাধারণের মাঝে সর্বমোট দাওয়াত" onEdit={!canEdit ? undefined : () => setIsDawatTablighModalOpen(true)} buttonText="দাওয়াত এডিট" icon={Megaphone}>
				<div className="space-y-8">
					<div>
						<h4 className="text-sm font-bold text-gray-700 mb-3 underline">১. ইউনিটের দাওয়াতী গ্রুপ:</h4>
						<table className="w-full border-collapse border border-gray-200 text-sm">
							<thead>
								<tr className="bg-gray-50">
									<th className="border border-gray-200 p-2 text-left">বিবরণ</th>
									<th className="border border-gray-200 p-2">মোট গ্রুপ সংখ্যা</th>
									<th className="border border-gray-200 p-2">মোট অংশগ্রহণকারী</th>
									<th className="border border-gray-200 p-2">পৌঁছানো হয়েছে</th>
									<th className="border border-gray-200 p-2">সহযোগী সদস্য</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className="border border-gray-200 p-2 text-left font-medium">ইউনিটের দাওয়াতী গ্রুপ কাজ</td>
									<td className="border border-gray-200 p-2 text-center">{formatVal(compReport.unitDawat?.groupCount)}</td>
									<td className="border border-gray-200 p-2 text-center">{formatVal(compReport.unitDawat?.participantCount)}</td>
									<td className="border border-gray-200 p-2 text-center">{formatVal(compReport.unitDawat?.reachedCount)}</td>
									<td className="border border-gray-200 p-2 text-center">{formatVal(compReport.unitDawat?.associateCount)}</td>
								</tr>
							</tbody>
						</table>
					</div>

					<div>
						<h4 className="text-sm font-bold text-gray-700 mb-3">২. ব্যক্তিগত ও টার্গেটভিত্তিক দাওয়াত:</h4>
						<table className="w-full border-collapse border border-gray-200 text-sm">
							<thead>
								<tr className="bg-gray-50">
									<th className="border border-gray-200 p-2">বিবরণ</th>
									<th className="border border-gray-200 p-2">সদস্য (রুকন)</th>
									<th className="border border-gray-200 p-2">কর্মী</th>
									<th className="border border-gray-200 p-2">বিবরণ</th>
									<th className="border border-gray-200 p-2">মোট সংখ্যা</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className="border border-gray-200 p-2">মোট জনশক্তি সংখ্যা</td>
									<td className="border border-gray-200 p-2 text-center">{formatVal(compReport.personalDawat?.rokon?.total)}</td>
									<td className="border border-gray-200 p-2 text-center">{formatVal(compReport.personalDawat?.karmi?.total)}</td>
									<td className="border border-gray-200 p-2">কতজনের নিকট পৌঁছানো হয়েছে</td>
									<td className="border border-gray-200 p-2 text-center">{formatVal((compReport.personalDawat?.rokon?.reached || 0) + (compReport.personalDawat?.karmi?.reached || 0))}</td>
								</tr>
								<tr>
									<td className="border border-gray-200 p-2">কতজন ব্যক্তিগতভাবে দাওয়াতি কাজ করেছেন</td>
									<td className="border border-gray-200 p-2 text-center">{formatVal(compReport.personalDawat?.rokon?.worked)}</td>
									<td className="border border-gray-200 p-2 text-center">{formatVal(compReport.personalDawat?.karmi?.worked)}</td>
									<td className="border border-gray-200 p-2">কতজন সহযোগী সদস্য হয়েছেন</td>
									<td className="border border-gray-200 p-2 text-center">{formatVal((compReport.personalDawat?.rokon?.associate || 0) + (compReport.personalDawat?.karmi?.associate || 0))}</td>
								</tr>
							</tbody>
						</table>
					</div>

					<div>
						<h4 className="text-sm font-bold text-gray-700 mb-3">৩. সাধারণ সভা/দাওয়াতী সভা:</h4>
						<table className="w-full border-collapse border border-gray-200 text-sm">
							<thead>
								<tr className="bg-gray-50">
									<th className="border border-gray-200 p-2">মোট কতজনকে দাওয়াত প্রদান করা হয়েছে</th>
									<th className="border border-gray-200 p-2">কতজন সহযোগী সদস্য হয়েছেন</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className="border border-gray-200 p-2 text-center">{formatVal(compReport.generalMeeting?.totalReached)}</td>
									<td className="border border-gray-200 p-2 text-center">{formatVal(compReport.generalMeeting?.associateCount)}</td>
								</tr>
							</tbody>
						</table>
					</div>

					<div>
						<h4 className="text-sm font-bold text-gray-700 mb-3">৪. গণসংযোগ ও দাওয়াতী অভিযান পালন:</h4>
						<div className="overflow-x-auto border border-gray-200 rounded-lg">
							<table className="w-full border-collapse text-sm text-center">
								<thead>
									<tr className="bg-gray-50">
										<th className="border-b border-gray-200 p-2 text-left">বিবরণ</th>
										<th className="border-b border-l border-gray-200 p-2">মোট গ্রুপ সংখ্যা</th>
										<th className="border-b border-l border-gray-200 p-2">মোট অংশগ্রহণকারী</th>
										<th className="border-b border-l border-gray-200 p-2">পৌঁছানো হয়েছে</th>
										<th className="border-b border-l border-gray-200 p-2">সহযোগী সদস্য</th>
									</tr>
								</thead>
								<tbody>
									{[
										{ id: 'prDecade', label: 'গণসংযোগ দশক/পক্ষ' },
										{ id: 'districtCampaign', label: 'জেলা/মহঃ ঘোষিত অভিযান' },
										{ id: 'electionWeek', label: 'নির্বাচনী আসনে গণসংযোগ সপ্তাহ' },
										{ id: 'proWeek', label: 'উলামা/পেশাজীবী গণসংযোগ সপ্তাহ' },
										{ id: 'other', label: 'অন্যান্য' }
									].map(row => (
										<tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
											<td className="border-b border-gray-200 p-2 text-left font-medium">{row.label}</td>
											<td className="border-b border-l border-gray-200 p-2 text-center">{formatVal(compReport.prCampaign?.[row.id]?.groupCount)}</td>
											<td className="border-b border-l border-gray-200 p-2 text-center">{formatVal(compReport.prCampaign?.[row.id]?.participantCount)}</td>
											<td className="border-b border-l border-gray-200 p-2 text-center">{formatVal(compReport.prCampaign?.[row.id]?.reachedCount)}</td>
											<td className="border-b border-l border-gray-200 p-2 text-center">{formatVal(compReport.prCampaign?.[row.id]?.associateCount)}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
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
								<td className="border border-gray-200 p-2 text-left">ইউনিটে বই বিলিকেন্দ্র/বই বিলি</td>
								<td className="border border-gray-200 p-2 text-center">{formatVal(compReport.dawahPublication?.unitCenterCount)} / {formatVal(compReport.dawahPublication?.unitBookDistributed)}</td>
								<td className="border border-gray-200 p-2 text-center">{formatVal(compReport.dawahPublication?.unitCenterIncrease)} / {formatVal(compReport.dawahPublication?.unitBookDistributedIncrease)}</td>
								<td className="border border-gray-200 p-2">দাওয়াতী লিংক বিতরণ</td>
								<td className="border border-gray-200 p-2 text-center font-bold">{formatVal(compReport.dawahPublication?.dawatLinkDistributed)}</td>
							</tr>
							<tr>
								<td colSpan={3} className="border border-gray-200 p-2 bg-gray-50/50"></td>
								<td className="border border-gray-200 p-2">সোনার বাংলা/সংগ্রাম/পৃথিবী কত কপি চলে</td>
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
								{ id: 'monthlyMeeting', sl: '১.', label: 'ইউনিটে মাসিক সাধারণ সভা/পারিবারিক সভা', fields: ['general', 'family'] },
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
