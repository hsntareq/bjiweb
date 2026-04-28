import React from 'react';
import { Tiro_Bangla } from 'next/font/google';

const tiroBangla = Tiro_Bangla({
  weight: ['400', '400'], // Tiro Bangla only supports 400 and italic usually, but we'll stick to 400
  subsets: ['bengali'],
  display: 'swap',
});

interface PrintReportTemplateProps {
  data: any;
}

export const MonthlyReportPrint: React.FC<PrintReportTemplateProps> = ({ data }) => {
  return (
    <div className={`print-template bg-white p-10 text-black ${tiroBangla.className} hidden print:block`} style={{ width: '210mm', minHeight: '297mm', margin: '0 auto', fontSize: '14px' }}>
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-xl font-bold mb-2">বিসমিল্লাহির রাহমানির রাহিম</h1>
        <h2 className="text-2xl font-bold">ওয়ার্ড সংগঠনের মাসিক রিপোর্ট</h2>
        <div className="flex justify-between mt-4 border-b border-black pb-2">
          <span>মাস: {data.month}</span>
          <span>সন: {data.year} ইং</span>
        </div>
        <div className="flex justify-between mt-2 border-b border-black pb-2">
          <span>ওয়ার্ড নং / নাম: {data.headerInfo.wardName}</span>
          <span>থানা/বিভাগ: {data.headerInfo.thanaName}</span>
        </div>
        <div className="text-left mt-2 border-b border-black pb-2">
          <span>ওয়ার্ড সভাপতির নাম: {data.headerInfo.presidentName}</span>
        </div>
      </div>

      {/* Dawah Section */}
      <section className="mb-6">
        <h3 className="font-bold border-b border-black mb-2">দাওয়াত ও তাবলীগী</h3>
        <p className="text-sm mb-2 font-bold">১. ইউনিটে নিয়মিত গ্রুপভিত্তিক দাওয়াত:</p>
        <table className="w-full border-collapse border border-black text-sm mb-4">
          <thead>
            <tr>
              <th className="border border-black p-1">কতটি গ্রুপ বের হয়েছে</th>
              <th className="border border-black p-1">অংশগ্রহণকারীর সংখ্যা</th>
              <th className="border border-black p-1">দাওয়াত পৌঁছানো হয়েছে</th>
              <th className="border border-black p-1">সহযোগী সদস্য বৃদ্ধি</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td className="border border-black p-1">{data.unitDawat.groupCount}</td>
              <td className="border border-black p-1">{data.unitDawat.participantCount}</td>
              <td className="border border-black p-1">{data.unitDawat.reachedCount}</td>
              <td className="border border-black p-1">{data.unitDawat.newAssociateCount}</td>
            </tr>
          </tbody>
        </table>

        <p className="text-sm mb-2 font-bold">২. ব্যক্তিগত ও টার্গেটভিত্তিক দাওয়াত:</p>
        <table className="w-full border-collapse border border-black text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-black p-1">বিবরণ</th>
              <th className="border border-black p-1">রুকন</th>
              <th className="border border-black p-1">কর্মী</th>
              <th className="border border-black p-1">মোট</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black p-1">মোট জনশক্তি</td>
              <td className="border border-black p-1 text-center">{data.personalDawat.rukanTotal}</td>
              <td className="border border-black p-1 text-center">{data.personalDawat.karmiTotal}</td>
              <td className="border border-black p-1 text-center">{data.personalDawat.rukanTotal + data.personalDawat.karmiTotal}</td>
            </tr>
            <tr>
              <td className="border border-black p-1">ব্যক্তিগত দাওয়াতী কাজ করেছেন</td>
              <td className="border border-black p-1 text-center">{data.personalDawat.rukanDawat}</td>
              <td className="border border-black p-1 text-center">{data.personalDawat.karmiDawat}</td>
              <td className="border border-black p-1 text-center">{data.personalDawat.rukanDawat + data.personalDawat.karmiDawat}</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Departmental Section */}
      <section className="mb-6">
        <h3 className="font-bold border-b border-black mb-2 text-base">বিভাগীয় তথ্য</h3>
        <p className="text-sm mb-1 font-bold">১. তালিমুল কুরআনের মাধ্যমে দাওয়াত:</p>
        <table className="w-full border-collapse border border-black text-sm mb-4">
          <thead>
            <tr>
              <th className="border border-black p-1" rowSpan={2}>শিক্ষাদানকারী</th>
              <th className="border border-black p-1">রুকন</th>
              <th className="border border-black p-1">কর্মী</th>
              <th className="border border-black p-1" rowSpan={2}>গ্রুপ সংখ্যা</th>
              <th className="border border-black p-1" rowSpan={2}>শিক্ষার্থী</th>
              <th className="border border-black p-1" rowSpan={2}>সহীহ শিখেছে</th>
            </tr>
            <tr>
              <th className="border border-black p-1">{data.departmentalInfo.quran.rukanEducators}</th>
              <th className="border border-black p-1">{data.departmentalInfo.quran.karmiEducators}</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td className="border border-black p-1 font-bold">ফলাফল</td>
              <td className="border border-black p-1" colSpan={2}>দাওয়াত পৌঁছেছে: {data.departmentalInfo.quran.reached}</td>
              <td className="border border-black p-1">{data.departmentalInfo.quran.quranGroups}</td>
              <td className="border border-black p-1">{data.departmentalInfo.quran.totalStudents}</td>
              <td className="border border-black p-1">{data.departmentalInfo.quran.sahihTilawatLearners}</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Manpower Section */}
      <section className="mb-6">
        <h3 className="font-bold border-b border-black mb-2">সংগঠন ও জনশক্তি</h3>
        <table className="w-full border-collapse border border-black text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-black p-1">জনশক্তি ধরণ</th>
              <th className="border border-black p-1">পূর্বের সংখ্যা</th>
              <th className="border border-black p-1">বর্তমান সংখ্যা</th>
              <th className="border border-black p-1">বৃদ্ধি</th>
              <th className="border border-black p-1">টার্গেট</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data.miscellaneous.manpower).map(([key, item]: [string, any]) => (
              <tr key={key}>
                <td className="border border-black p-1 font-bold">
                  {key === 'rukan' ? 'রুকন' : key === 'rukanCandidate' ? 'রুকন প্রার্থী' : key === 'karmi' ? 'কর্মী' : 'সহযোগী'}
                </td>
                <td className="border border-black p-1 text-center">{item.prev}</td>
                <td className="border border-black p-1 text-center">{item.present}</td>
                <td className="border border-black p-1 text-center text-green-700">{item.increase}</td>
                <td className="border border-black p-1 text-center">{item.target}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Footer Signature */}
      <div className="flex justify-between mt-20">
        <div className="border-t border-black pt-2 w-48 text-center">
          <p className="text-xs">সভাপতি/দায়িত্বশীলের স্বাক্ষর</p>
        </div>
        <div className="border-t border-black pt-2 w-48 text-center">
          <p className="text-xs">তারিখ</p>
        </div>
      </div>
    </div>
  );
};
