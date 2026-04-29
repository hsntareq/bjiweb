'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Printer, FileText } from 'lucide-react';
import { templateHtml, templateStyle } from './Template';

function ReportPrintContent() {
  const searchParams = useSearchParams();
  const orgId = searchParams?.get('orgId');
  const year = searchParams?.get('year');
  const month = searchParams?.get('month');
  const accessToken = searchParams?.get('token');

  const [report, setReport] = useState<any>(null);
  const [orgName, setOrgName] = useState('');

  const monthNames = [
    "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
    "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
  ];

  useEffect(() => {
    if (orgId && year && month) {
      fetch(`http://localhost:3001/comprehensive-report/organization/${orgId}?year=${year}&month=${month}`, {
        headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {}
      })
      .then(res => res.json())
      .then(data => setReport(data));

      fetch(`http://localhost:3001/organization/${orgId}`, {
        headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {}
      })
      .then(res => res.json())
      .then(data => setOrgName(data.name));
    }
  }, [orgId, year, month, accessToken]);

  const toBengaliNumber = (n: any) => {
    if (n === null || n === undefined || n === "") return "";
    const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return String(n).replace(/\d/g, d => bnDigits[parseInt(d)]);
  };

  const renderTemplate = (html: string) => {
    if (!report) return html;
    let output = html;

    // Basic Metadata
    output = output.replace(/{{month}}/g, month ? monthNames[parseInt(month) - 1] : "মার্চ");
    output = output.replace(/{{year}}/g, toBengaliNumber(year) || "২০২৪");
    output = output.replace(/{{orgName}}/g, orgName || "যুব ওয়ার্ড");
    output = output.replace(/{{thana}}/g, report.thana || "খিলগাঁও উত্তর থানা");
    output = output.replace(/{{president}}/g, report.presidentName || "মোঃ ইমতিয়াজ উদ্দিন");

    // Dawah Section A
    output = output.replace(/{{totalDawahReached}}/g, toBengaliNumber(report.dawah?.totalDawahCount) || "-");
    output = output.replace(/{{totalPopulation}}/g, toBengaliNumber(report.dawah?.totalPopulation) || "২,০০,০০০");
    output = output.replace(/{{monthlyTarget}}/g, toBengaliNumber(report.dawah?.totalDawahTarget) || "১০০০");

    // Group Dawah (A1)
    output = output.replace(/{{groupDawahCount}}/g, toBengaliNumber(report.dawah?.groupDawah?.groupsOut) || "-");
    output = output.replace(/{{groupDawahParticipants}}/g, toBengaliNumber(report.dawah?.groupDawah?.participants) || "-");
    output = output.replace(/{{groupDawahReached}}/g, toBengaliNumber(report.dawah?.groupDawah?.dawahReached) || "-");
    output = output.replace(/{{groupDawahNewAssociate}}/g, toBengaliNumber(report.dawah?.groupDawah?.newAssociateMembers) || "-");

    // Personal Dawah (A2)
    output = output.replace(/{{personalDawahManpowerTotal}}/g, toBengaliNumber(report.dawah?.personal?.manpowerTotal) || "-");
    output = output.replace(/{{personalDawahManpowerWorked}}/g, toBengaliNumber(report.dawah?.personal?.manpowerWorked) || "-");
    output = output.replace(/{{personalDawahReached}}/g, toBengaliNumber(report.dawah?.personal?.reached) || "-");
    output = output.replace(/{{personalDawahNewAssociate}}/g, toBengaliNumber(report.dawah?.personal?.associateIncrease) || "-");

    // General Meetings (A3)
    output = output.replace(/{{generalMeetingReached}}/g, toBengaliNumber(report.dawah?.tabligh?.generalMeetingAttendance) || "-");
    output = output.replace(/{{generalMeetingNewAssociate}}/g, toBengaliNumber(report.dawah?.tabligh?.generalMeetingAssociateIncrease) || "-");

    // Manpower (Section 2.1)
    ['rokon', 'karmi', 'associate'].forEach(key => {
      output = output.replace(new RegExp(`{{${key}Previous}}`, 'g'), toBengaliNumber(report.organization?.manpower?.[key]?.previous) || "-");
      output = output.replace(new RegExp(`{{${key}Increase}}`, 'g'), toBengaliNumber(report.organization?.manpower?.[key]?.increase) || "-");
      output = output.replace(new RegExp(`{{${key}Deficit}}`, 'g'), toBengaliNumber(report.organization?.manpower?.[key]?.deficit) || "-");
      output = output.replace(new RegExp(`{{${key}Current}}`, 'g'), toBengaliNumber(report.organization?.manpower?.[key]?.current) || "-");
    });

    // Organizational Meetings (Section 2.9)
    output = output.replace(/{{wardTeamMeetingCount}}/g, toBengaliNumber(report.organization?.meetings?.wardTeam?.count) || "-");
    output = output.replace(/{{wardTeamMeetingAttendance}}/g, toBengaliNumber(report.organization?.meetings?.wardTeam?.attendance) || "-");

    // Training (Section 3)
    output = output.replace(/{{skillMeetingCount}}/g, toBengaliNumber(report.training?.hrd?.skillMeetingCount) || "-");
    output = output.replace(/{{skillMeetingAttendance}}/g, toBengaliNumber(report.training?.hrd?.skillMeetingAttendance) || "-");

    // Social Work (Section 4)
    output = output.replace(/{{socialSickCarePersonal}}/g, toBengaliNumber(report.socialWork?.personal?.sickCare) || "-");

    return output;
  };

  if (!report) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center animate-pulse">
        <FileText className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
        <p className="text-gray-500 font-medium">প্রতিবেদন প্রস্তুত করা হচ্ছে...</p>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen p-[60px] print:p-0 print:bg-white flex justify-center flex-col items-center">
      {/* Dynamic Style from Template */}
      <style dangerouslySetInnerHTML={{ __html: templateStyle }} />

      {/* Standard Print Controls Override */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Tiro+Bangla:ital@0;1&display=swap');

        body {
          font-family: 'Tiro Bangla', serif !important;
        }

        .report-wrapper * {
          font-family: 'Tiro Bangla', serif !important;
        }

        .report-wrapper {
          width: 100%;
          max-width: 8.27in;
          background: white;
          box-shadow: 0 0 20px rgba(0,0,0,0.1);
          min-height: 11.69in;
          padding: 0;
        }

        @media print {
          @page {
            margin-top: 20mm;
            margin-bottom: 25mm;
            margin-left: 20mm;
            margin-right: 20mm;
            size: A4;
          }
          body {
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .report-wrapper {
            width: 100%;
            max-width: 100%;
            margin: 0;
            box-shadow: none;
          }
          .no-print { display: none !important; }
        }
      `}</style>

      {/* Action Buttons */}
      <div className="fixed top-6 right-6 flex flex-col gap-3 no-print z-50">
        <button
          onClick={() => window.print()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 transition-all font-medium"
        >
          <Printer size={18} /> প্রিন্ট করুন
        </button>
        <button
          onClick={async () => {
            const element = document.getElementById('report-content');
            if (element) {
              try {
                // @ts-ignore
                const html2pdf = (await import('html2pdf.js')).default;
                const opt = {
                  margin: 0,
                  filename: `Report_${orgName}_${year}_${month}.pdf`,
                  image: { type: 'jpeg', quality: 0.98 },
                  html2canvas: { scale: 2, useCORS: true, letterRendering: true },
                  jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
                };
                html2pdf().from(element).set(opt as any).save();
              } catch (err) {
                console.error('PDF Download failed:', err);
                window.print();
              }
            }
          }}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 transition-all font-medium"
        >
          <FileText size={18} /> পিডিএফ ডাউনলোড
        </button>
        <button
          onClick={() => window.history.back()}
          className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg shadow-md flex items-center gap-2 border border-gray-200 transition-all font-medium"
        >
          ফিরে যান
        </button>
      </div>

      {/* Main Report Content */}
      <div className="report-wrapper" id="report-content">
        <div
          className="p-[60px] print:p-0"
          dangerouslySetInnerHTML={{ __html: renderTemplate(templateHtml) }}
        />
      </div>

      <div className="mt-8 text-[13px] text-gray-400 text-center pb-10 no-print">
         Generated via BJI Organizational Management System | {new Date().toLocaleString('bn-BD')}
      </div>
    </div>
  );
}

export default function ReportPrintPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center animate-pulse">
          <FileText className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
          <p className="text-gray-500 font-medium">প্রতিবেদন প্রস্তুত করা হচ্ছে...</p>
        </div>
      </div>
    }>
      <ReportPrintContent />
    </Suspense>
  );
}
