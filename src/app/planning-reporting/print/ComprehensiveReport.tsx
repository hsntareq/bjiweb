import {
	PrintDataCell,
	PrintDocument,
	PrintHeaderCell,
	PrintRow,
	PrintSectionTitle,
	PrintTable
} from '@/components/print';
import React from 'react';

interface ComprehensiveReportProps {
	report: any;
	orgName: string;
	month: string;
	year: string;
}

export const ComprehensiveReport: React.FC<ComprehensiveReportProps> = ({
	report, orgName, month, year
}) => {

	const toBengaliNumber = (n: any) => {
		if (n === null || n === undefined || n === "") return "-";
		const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
		return String(n).replace(/\d/g, d => bnDigits[parseInt(d)]);
	};

	const monthNames = [
		"জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
		"জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
	];

	const monthName = month ? monthNames[parseInt(month) - 1] : "মার্চ";
	const yearBn = toBengaliNumber(year) || "২০২৪";

	return (
		<PrintDocument>
			{/* HEADER SECTION */}
			<div className="text-center mb-4">
				<h1 className="font-bold text-xl mb-1">বিসমিল্লাহির রাহমানির রাহিম</h1>
				<h2 className="font-bold text-lg mb-1">ওয়ার্ড সংগঠনের</h2>
				<h3 className="font-bold text-md mb-2"> মাসিক রিপোর্ট</h3>

				<table className="w-full text-[10pt] font-bold mb-4">
					<tbody>
						<tr>
							<td className="text-left w-1/2">মাস: {monthName}</td>
							<td className="text-right w-1/2">সন: {yearBn} ইং</td>
						</tr>
						<tr>
							<td className="text-left w-1/2">ওয়ার্ড নং / নাম: {orgName || "যুব ওয়ার্ড"}</td>
							<td className="text-right w-1/2">থানা/বিভাগ: {report?.thana || "খিলগাঁও উত্তর থানা"}</td>
						</tr>
						<tr>
							<td colSpan={2} className="text-left">ওয়ার্ড সভাপতির নাম: {report?.presidentName || "মোঃ ইমতিয়াজ উদ্দিন"}</td>
						</tr>
					</tbody>
				</table>
			</div>

			{/* SECTION 1: DAWAH */}
			<div className="mb-2">
				<span className="font-bold text-[9pt]">দাওয়াত ও তাবলীগ</span>
				<span className="text-[8pt] italic ml-2">
					*দাওয়াত ও তাবলীগের ‘ক’ এর অধীনে ক্রমিক ১-৪ নং পর্যন্ত দাওয়াত প্রদানের মোট সংখ্যা যোগ করে এখানে বসাতে হবে।
				</span>
			</div>

			<PrintTable>
				<PrintRow>
					<PrintHeaderCell align="left" width="50%">
						ক) জনসাধারণের মাঝে সর্বমোট দাওয়াত প্রদান সংখ্যা* : {toBengaliNumber(report?.dawah?.totalDawahCount)}
					</PrintHeaderCell>
					<PrintHeaderCell align="left" width="25%">
						মোট জনসংখ্যা*: {toBengaliNumber(report?.dawah?.totalPopulation)}
					</PrintHeaderCell>
					<PrintHeaderCell align="left" width="25%">
						টার্গেট (মাসিক): {toBengaliNumber(report?.dawah?.totalDawahTarget)}
					</PrintHeaderCell>
				</PrintRow>

			</PrintTable>

			{/* SECTION 3: Health & Family Welfare */}
			<PrintSectionTitle title="৩. স্বাস্থ্য ও পরিবার কল্যাণমূলক কাজ:" />
			<PrintTable>
				<PrintRow>
					<PrintHeaderCell width="34%">স্বাস্থ্যকর্মী প্রশিক্ষণ (প্রশিক্ষণে মোট অংশগ্রহণকারী সংখ্যা)</PrintHeaderCell>
					<PrintHeaderCell width="33%">কতজন স্বাস্থ্যসেবা কাজে অংশগ্রহণ করেছেন</PrintHeaderCell>
					<PrintHeaderCell width="33%">সেবাপ্রাপ্ত সংখ্যা</PrintHeaderCell>
				</PrintRow>
				<PrintRow>
					<PrintDataCell>{toBengaliNumber(report?.socialWork?.healthTrainingCount)}</PrintDataCell>
					<PrintDataCell>{toBengaliNumber(report?.socialWork?.healthServiceCount)}</PrintDataCell>
					<PrintDataCell>{toBengaliNumber(report?.socialWork?.healthBeneficiaryCount)}</PrintDataCell>
				</PrintRow>
			</PrintTable>

			{/* SECTION 4: Institutional Social Work */}
			<PrintSectionTitle title="৪. প্রাতিষ্ঠানিক উদ্যোগে সামাজিক কাজ:" />
			<PrintTable>
				<PrintRow>
					<PrintHeaderCell width="33%">কতটি সামাজিক প্রতিষ্ঠান রয়েছে</PrintHeaderCell>
					<PrintHeaderCell width="34%">কতটি প্রতিষ্ঠানে সামাজিক কাজ হয়েছে</PrintHeaderCell>
					<PrintHeaderCell width="33%">কতটি নতুন সামাজিক প্রতিষ্ঠান চারু করা হয়েছে (প্রযোজ্য ক্ষেত্রে)</PrintHeaderCell>
				</PrintRow>
				<PrintRow>
					<PrintDataCell>{toBengaliNumber(report?.socialWork?.instTotalCount)}</PrintDataCell>
					<PrintDataCell>{toBengaliNumber(report?.socialWork?.instActiveCount)}</PrintDataCell>
					<PrintDataCell>{toBengaliNumber(report?.socialWork?.instNewCount)}</PrintDataCell>
				</PrintRow>
			</PrintTable>
			</PrintTable>

			<PrintSectionTitle title="১. ইউনিটে নিয়মিত গ্রুপভিত্তিক দাওয়াত:" />
			<PrintTable>
				<PrintRow>
					<PrintHeaderCell width="20%">কয়টি গ্রুপ বের হয়েছে</PrintHeaderCell>
					<PrintHeaderCell width="25%">অংশগ্রহণকারীর সংখ্যা</PrintHeaderCell>
					<PrintHeaderCell width="30%">কতজনের নিকট দাওয়াত পৌঁছানো হয়েছে</PrintHeaderCell>
					<PrintHeaderCell width="25%">কতজন সহযোগী সদস্য হয়েছেন</PrintHeaderCell>
				</PrintRow>
				<PrintRow>
					<PrintDataCell>{toBengaliNumber(report?.dawah?.groupDawah?.groupsOut)}</PrintDataCell>
					<PrintDataCell>{toBengaliNumber(report?.dawah?.groupDawah?.participants)}</PrintDataCell>
					<PrintDataCell>{toBengaliNumber(report?.dawah?.groupDawah?.dawahReached)}</PrintDataCell>
					<PrintDataCell>{toBengaliNumber(report?.dawah?.groupDawah?.newAssociateMembers)}</PrintDataCell>
				</PrintRow>
			</PrintTable>

			<PrintSectionTitle title="২. ব্যক্তিগত ও টার্গেটভিত্তিক দাওয়াত:" />
			<PrintTable>
				<PrintRow>
					<PrintHeaderCell width="30%" align="left">বিবরণ</PrintHeaderCell>
					<PrintHeaderCell width="15%">সদস্য (রুকন)</PrintHeaderCell>
					<PrintHeaderCell width="15%">কর্মী</PrintHeaderCell>
					<PrintHeaderCell width="30%">কতজনের নিকট দাওয়াত পৌঁছানো হয়েছে</PrintHeaderCell>
					<PrintHeaderCell width="10%">মোট সংখ্যা</PrintHeaderCell>
				</PrintRow>
				<PrintRow>
					<PrintDataCell align="left" bold>মোট জনশক্তি সংখ্যা</PrintDataCell>
					<PrintDataCell>{toBengaliNumber(report?.organization?.manpower?.rokon?.previous)}</PrintDataCell>
					<PrintDataCell>{toBengaliNumber(report?.organization?.manpower?.karmi?.current)}</PrintDataCell>
					<PrintDataCell align="left" rowSpan={2} className="align-middle">
						কতজন ব্যক্তিগতভাবে দাওয়াতী কাজ করেছেন
					</PrintDataCell>
					<PrintDataCell rowSpan={2} className="align-middle">-</PrintDataCell>
				</PrintRow>
				<PrintRow>
					<PrintDataCell align="left" bold>কতজন ব্যক্তিগতভাবে দাওয়াতী কাজ করেছেন</PrintDataCell>
					<PrintDataCell>{toBengaliNumber(report?.dawah?.personal?.rokonWorked)}</PrintDataCell>
					<PrintDataCell>{toBengaliNumber(report?.dawah?.personal?.karmiWorked)}</PrintDataCell>
				</PrintRow>
			</PrintTable>

		</PrintDocument >
	);
};
