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
    output = output.replace(/{{thana}}/g, report.thana || "");
    output = output.replace(/{{president}}/g, report.presidentName || "");
    output = output.replace(/{{reportDate}}/g, new Date().toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' }));

    // 6. Departmental Info
    const quranTalim = report.departmentalInfo?.quranTalim || {};
    output = output.replace(/{{quranTeacherRokon}}/g, toBengaliNumber(quranTalim.rokonTeacherCount) || "০");
    output = output.replace(/{{quranTeacherKarmi}}/g, toBengaliNumber(quranTalim.karmiTeacherCount) || "০");
    output = output.replace(/{{quranTeacherTotal}}/g, toBengaliNumber((quranTalim.rokonTeacherCount || 0) + (quranTalim.karmiTeacherCount || 0)) || "০");
    output = output.replace(/{{quranGroupCount}}/g, toBengaliNumber(quranTalim.groupCount) || "০");
    output = output.replace(/{{quranReachedCount}}/g, toBengaliNumber(quranTalim.reachedCount) || "০");
    output = output.replace(/{{quranNewAssociate}}/g, toBengaliNumber(quranTalim.associateCount) || "০");
    output = output.replace(/{{quranSahihLearnedCount}}/g, toBengaliNumber(quranTalim.sahihLearnedCount) || "০");
    output = output.replace(/{{quranMaktubCount}}/g, toBengaliNumber(quranTalim.maktubCount) || "০");
    output = output.replace(/{{quranMuallimCount}}/g, toBengaliNumber(quranTalim.muallimCount) || "০");
    output = output.replace(/{{quranMuallimIncrease}}/g, toBengaliNumber(quranTalim.muallimIncreaseCount) || "০");

    // Mahalla
    const mahalla = report.departmentalInfo?.mahalla || {};
    output = output.replace(/{{mahallaGovtCount}}/g, toBengaliNumber(mahalla.govtCount) || "০");
    output = output.replace(/{{mahallaGovtIncrease}}/g, toBengaliNumber(mahalla.govtIncreaseCount) || "০");
    output = output.replace(/{{mahallaCommitteeCount}}/g, toBengaliNumber(mahalla.committeeCount) || "০");
    output = output.replace(/{{mahallaSpecialDawatCount}}/g, toBengaliNumber(mahalla.specialDawatCount) || "০");
    output = output.replace(/{{mahallaReachedCount}}/g, toBengaliNumber(mahalla.reachedCount) || "০");
    output = output.replace(/{{mahallaAssociateCount}}/g, toBengaliNumber(mahalla.associateCount) || "০");

    // Youth
    const youth = report.departmentalInfo?.youth || {};
    output = output.replace(/{{youthReachedCount}}/g, toBengaliNumber(youth.reachedCount) || "০");
    output = output.replace(/{{youthAssociateCount}}/g, toBengaliNumber(youth.associateCount) || "০");
    output = output.replace(/{{youthCommitteeCount}}/g, toBengaliNumber(youth.committeeCount) || "০");
    output = output.replace(/{{youthCommitteeIncrease}}/g, toBengaliNumber(youth.committeeIncreaseCount) || "০");
    output = output.replace(/{{youthClubCount}}/g, toBengaliNumber(youth.clubCount) || "০");
    output = output.replace(/{{youthClubIncrease}}/g, toBengaliNumber(youth.clubIncreaseCount) || "০");

    // Professions
    const professions = report.departmentalInfo?.professions || {};
    const profKeys = ['political', 'professional', 'laborer', 'marginalized', 'nonMuslim'];
    profKeys.forEach(key => {
      output = output.replace(new RegExp(`{{professions${key.charAt(0).toUpperCase() + key.slice(1)}Reached}}`, 'g'), toBengaliNumber(professions[key]?.reached) || "০");
      output = output.replace(new RegExp(`{{professions${key.charAt(0).toUpperCase() + key.slice(1)}Associate}}`, 'g'), toBengaliNumber(professions[key]?.associate) || "০");
      output = output.replace(new RegExp(`{{professions${key.charAt(0).toUpperCase() + key.slice(1)}Target}}`, 'g'), toBengaliNumber(professions[key]?.target) || "০");
    });

    // Family
    output = output.replace(/{{familyTotalCount}}/g, toBengaliNumber(report.departmentalInfo?.family?.totalCount) || "০");
    output = output.replace(/{{familyNewCount}}/g, toBengaliNumber(report.departmentalInfo?.family?.newCount) || "০");

    // Mosque
    const mosque = report.departmentalInfo?.mosque || {};
    output = output.replace(/{{mosqueTotalCount}}/g, toBengaliNumber(mosque.totalCount) || "০");
    output = output.replace(/{{mosqueTotalIncrease}}/g, toBengaliNumber(mosque.totalIncreaseCount) || "০");
    output = output.replace(/{{mosqueDawatCount}}/g, toBengaliNumber(mosque.dawatCount) || "০");
    output = output.replace(/{{mosqueCenterCount}}/g, toBengaliNumber(mosque.centerCount) || "০");
    output = output.replace(/{{mosqueInfoCenterCount}}/g, toBengaliNumber(mosque.infoCenterCount) || "০");
    output = output.replace(/{{mosqueInfoCenterIncrease}}/g, toBengaliNumber(mosque.infoCenterIncreaseCount) || "০");

    // IT
    output = output.replace(/{{itManpowerCount}}/g, toBengaliNumber(report.departmentalInfo?.it?.manpowerCount) || "০");
    output = output.replace(/{{itParticipantCount}}/g, toBengaliNumber(report.departmentalInfo?.it?.participantCount) || "০");

    // 5. Header / Summary Info
    output = output.replace(/{{totalDawahReached}}/g, toBengaliNumber(report.headerInfo?.totalReachedCount) || "০");
    output = output.replace(/{{totalPopulation}}/g, toBengaliNumber(report.headerInfo?.totalPopulationCount) || "০");
    output = output.replace(/{{totalDawahTarget}}/g, toBengaliNumber(report.headerInfo?.monthlyTargetCount) || "০");

    // A1. Group Dawah
    output = output.replace(/{{groupDawahCount}}/g, toBengaliNumber(report.unitDawat?.groupCount) || "০");
    output = output.replace(/{{groupDawahParticipants}}/g, toBengaliNumber(report.unitDawat?.participantCount) || "০");
    output = output.replace(/{{groupDawahReached}}/g, toBengaliNumber(report.unitDawat?.reachedCount) || "০");
    output = output.replace(/{{groupDawahNewAssociate}}/g, toBengaliNumber(report.unitDawat?.associateCount) || "০");

    // A2. Personal Dawah
    output = output.replace(/{{personalDawahRokonTotal}}/g, toBengaliNumber(report.personalDawat?.rokon?.total) || "০");
    output = output.replace(/{{personalDawahKarmiTotal}}/g, toBengaliNumber(report.personalDawat?.karmi?.total) || "০");
    output = output.replace(/{{personalDawahRokonWorked}}/g, toBengaliNumber(report.personalDawat?.rokon?.worked) || "০");
    output = output.replace(/{{personalDawahKarmiWorked}}/g, toBengaliNumber(report.personalDawat?.karmi?.worked) || "০");
    output = output.replace(/{{personalDawahRokonReached}}/g, toBengaliNumber(report.personalDawat?.rokon?.reached) || "০");
    output = output.replace(/{{personalDawahKarmiReached}}/g, toBengaliNumber(report.personalDawat?.karmi?.reached) || "০");
    output = output.replace(/{{personalDawahRokonAssociate}}/g, toBengaliNumber(report.personalDawat?.rokon?.associate) || "০");
    output = output.replace(/{{personalDawahKarmiAssociate}}/g, toBengaliNumber(report.personalDawat?.karmi?.associate) || "০");
    output = output.replace(/{{personalDawahReached}}/g, toBengaliNumber((report.personalDawat?.rokon?.reached || 0) + (report.personalDawat?.karmi?.reached || 0)) || "০");
    output = output.replace(/{{personalDawahNewAssociate}}/g, toBengaliNumber((report.personalDawat?.rokon?.associate || 0) + (report.personalDawat?.karmi?.associate || 0)) || "০");

    // A3. General Meeting
    output = output.replace(/{{generalMeetingReached}}/g, toBengaliNumber(report.generalMeeting?.totalReached) || "০");
    output = output.replace(/{{generalMeetingTotalReached}}/g, toBengaliNumber(report.generalMeeting?.totalReached) || "০");
    output = output.replace(/{{generalMeetingNewAssociate}}/g, toBengaliNumber(report.generalMeeting?.associateCount) || "০");

    // A4. PR Campaigns
    const prCampaignKeys = ['prDecade', 'districtCampaign', 'electionWeek', 'proWeek', 'other'];
    prCampaignKeys.forEach(key => {
      output = output.replace(new RegExp(`{{${key}Group}}`, 'g'), toBengaliNumber(report.prCampaign?.[key]?.groupCount) || "০");
      output = output.replace(new RegExp(`{{${key}Participant}}`, 'g'), toBengaliNumber(report.prCampaign?.[key]?.participantCount) || "০");
      output = output.replace(new RegExp(`{{${key}Reached}}`, 'g'), toBengaliNumber(report.prCampaign?.[key]?.reachedCount) || "০");
      output = output.replace(new RegExp(`{{${key}Associate}}`, 'g'), toBengaliNumber(report.prCampaign?.[key]?.associateCount) || "০");
    });

    // 1. Dawah & Publication
    const dawahPub = report.dawahPublication || {};
    const dawahPubKeys = [
      'libraryCount', 'bookCount', 'bookDistributedCount',
      'libraryIncrease', 'bookIncrease', 'bookDistributedIncrease',
      'softCopyDistributed', 'unitCenterCount', 'unitBookDistributed',
      'unitCenterIncrease', 'unitBookDistributedIncrease', 'dawatLinkDistributed',
      'wardCenterCount', 'wardBookSold', 'wardCenterIncrease', 'wardBookSoldIncrease',
      'sonarBanglaCount', 'sangramCount', 'prithibiCount'
    ];
    dawahPubKeys.forEach(key => {
      output = output.replace(new RegExp(`{{dawahPub${key.charAt(0).toUpperCase() + key.slice(1)}}}`, 'g'), toBengaliNumber(dawahPub[key]) || "০");
    });

    // Program Implementation
    const programData = report.programs || report.programImplementation || {};
    const progKeys = [
      { id: 'monthlyMeeting', fields: ['general', 'family'] },
      { id: 'dawahMeeting', fields: ['dawah', 'discussion', 'gathering'] },
      { id: 'siratunnabi', fields: ['sirat', 'eid'] },
      { id: 'darsTafsir', fields: ['dars', 'tafsir', 'public'] },
      { id: 'iftar', fields: ['personal', 'org'] },
      { id: 'teaCircle', fields: ['tea', 'lunch', 'tour'] },
      { id: 'competition', fields: ['comp', 'other'] }
    ];

    progKeys.forEach(prog => {
      const p = programData[prog.id] || {};
      prog.fields.forEach(field => {
        const count = p.total?.[field] ?? p[field]?.total ?? p[field] ?? 0;
        const target = p.target?.[field] ?? p[field]?.target ?? 0;
        const attendance = p.avgAttendance?.[field] ?? p[field]?.avgAttendance ?? 0;
        
        const baseKey = `prog${prog.id.charAt(0).toUpperCase() + prog.id.slice(1)}${field.charAt(0).toUpperCase() + field.slice(1)}`;
        
        output = output.replace(new RegExp(`{{${baseKey}Count}}`, 'g'), toBengaliNumber(count) || "০");
        output = output.replace(new RegExp(`{{${baseKey}Target}}`, 'g'), toBengaliNumber(target) || "০");
        output = output.replace(new RegExp(`{{${baseKey}Attendance}}`, 'g'), toBengaliNumber(attendance) || "০");
      });
    });

    // 2. Organization Section
    // Manpower
    const manpowerKeys = ['rokon', 'rokonCandidate', 'karmi', 'associate', 'generalAssociate'];
    manpowerKeys.forEach(key => {
      const data = report.manpower?.[key] || {};
      const previous = data.previousCount || 0;
      const current = data.currentCount || 0;
      const increase = data.promotionIncrease || 0;
      const arrived = data.arrivedIncrease || 0;
      const deficit = data.deficit || 0;
      const target = data.target || 0;
      
      const rate = target > 0 ? Math.round((increase / target) * 100) : 0;

      output = output.replace(new RegExp(`{{${key}Previous}}`, 'g'), toBengaliNumber(previous) || "০");
      output = output.replace(new RegExp(`{{${key}Current}}`, 'g'), toBengaliNumber(current) || "০");
      output = output.replace(new RegExp(`{{${key}Increase}}`, 'g'), toBengaliNumber(increase) || "০");
      output = output.replace(new RegExp(`{{${key}Arrived}}`, 'g'), toBengaliNumber(arrived) || "০");
      output = output.replace(new RegExp(`{{${key}Deficit}}`, 'g'), toBengaliNumber(deficit) || "০");
      output = output.replace(new RegExp(`{{${key}Target}}`, 'g'), toBengaliNumber(target) || "০");
      output = output.replace(new RegExp(`{{${key}Rate}}`, 'g'), toBengaliNumber(rate) + "%");
    });

    // Unit Organization
    const unitOrg = report.unitOrganization || {};
    const unitOrgTypes = [
      { id: 'generalMale', key: 'GeneralMale' },
      { id: 'ulama', key: 'Ulama' },
      { id: 'business', key: 'Business' },
      { id: 'laborWelfare', key: 'LaborWelfare' },
      { id: 'youth', key: 'Youth' },
      { id: 'media', key: 'Media' },
      { id: 'culture', key: 'Culture' },
      { id: 'total', key: 'Total' }
    ];

    unitOrgTypes.forEach(type => {
      const data = unitOrg[type.id] || {};
      const previous = data.previousCount || 0;
      const current = data.currentCount || 0;
      const increase = data.increase || 0;
      const deficit = data.deficit || 0;
      const target = data.target || 0;
      const rate = target > 0 ? Math.round((increase / target) * 100) : 0;

      output = output.replace(new RegExp(`{{unitOrg${type.key}Previous}}`, 'g'), toBengaliNumber(previous) || "০");
      output = output.replace(new RegExp(`{{unitOrg${type.key}Current}}`, 'g'), toBengaliNumber(current) || "০");
      output = output.replace(new RegExp(`{{unitOrg${type.key}Increase}}`, 'g'), toBengaliNumber(increase) || "০");
      output = output.replace(new RegExp(`{{unitOrg${type.key}Deficit}}`, 'g'), toBengaliNumber(deficit) || "০");
      output = output.replace(new RegExp(`{{unitOrg${type.key}Target}}`, 'g'), toBengaliNumber(target) || "০");
      output = output.replace(new RegExp(`{{unitOrg${type.key}Rate}}`, 'g'), toBengaliNumber(rate));
    });

    // Dawat and Family Units
    const units = report.unitStats || {};
    const unitTypes = [
      { id: 'dawahUnit', key: 'DawahUnit' },
      { id: 'familyUnit', key: 'FamilyUnit' }
    ];

    unitTypes.forEach(type => {
      const data = units[type.id] || {};
      const previous = data.previousCount || 0;
      const current = data.currentCount || 0;
      const increase = data.increase || 0;
      const deficit = data.deficit || 0;
      const target = data.target || 0;

      output = output.replace(new RegExp(`{{${type.id}Previous}}`, 'g'), toBengaliNumber(previous) || "০");
      output = output.replace(new RegExp(`{{${type.id}Current}}`, 'g'), toBengaliNumber(current) || "০");
      output = output.replace(new RegExp(`{{${type.id}Increase}}`, 'g'), toBengaliNumber(increase) || "০");
      output = output.replace(new RegExp(`{{${type.id}Deficit}}`, 'g'), toBengaliNumber(deficit) || "০");
      output = output.replace(new RegExp(`{{${type.id}Target}}`, 'g'), toBengaliNumber(target) || "০");
    });

    // 6. Student Joining
    const studentJoining = report.studentJoining || {};
    output = output.replace(/{{studentJoiningRokon}}/g, toBengaliNumber(studentJoining.rokonCount) || "০");
    output = output.replace(/{{studentJoiningCompanion}}/g, toBengaliNumber(studentJoining.companionCount) || "০");
    output = output.replace(/{{studentJoiningKarmi}}/g, toBengaliNumber(studentJoining.karmiCount) || "০");

    // 7. Safar
    const safar = report.safar || {};
    output = output.replace(/{{safarHigherAuthority}}/g, toBengaliNumber(safar.higherAuthoritySafar) || "০");
    output = output.replace(/{{safarWardPresident}}/g, toBengaliNumber(safar.wardPresidentSafar) || "০");
    output = output.replace(/{{safarTeamMember}}/g, toBengaliNumber(safar.teamMemberSafar) || "০");

    // 8. Donor
    const donors = report.donors || {};
    output = output.replace(/{{donorNewCount}}/g, toBengaliNumber(donors.newCount) || "০");
    output = output.replace(/{{donorAmount}}/g, toBengaliNumber(donors.amount) || "০");

    // 9. Organizational Meetings
    const orgMeetings = report.orgMeetings || {};
    const meetingRows = [
      { id: 'wardTeam', key: 'WardTeam' },
      { id: 'wardMeeting', key: 'Ward' },
      { id: 'memberMeeting', key: 'Rokon' },
      { id: 'karmiMeeting', key: 'Karmi' },
      { id: 'karmiConference', key: 'KarmiConference' },
      { id: 'deptMeeting', key: 'DeptMeeting' },
      { id: 'associateGathering', key: 'Associate' },
      { id: 'activeAssociateGathering', key: 'ActiveAssociateGathering' },
      { id: 'others', key: 'Others' }
    ];

    meetingRows.forEach(row => {
      const data = orgMeetings[row.id] || {};
      const getVal = (val: any) => {
        if (typeof val === 'object' && val !== null) {
          return Object.values(val).reduce((acc: number, curr: any) => acc + (Number(curr) || 0), 0);
        }
        return Number(val) || 0;
      };

      output = output.replace(new RegExp(`{{meeting${row.key}Count}}`, 'g'), toBengaliNumber(getVal(data.count)) || "০");
      output = output.replace(new RegExp(`{{meeting${row.key}Target}}`, 'g'), toBengaliNumber(getVal(data.target)) || "০");
      output = output.replace(new RegExp(`{{meeting${row.key}Attendance}}`, 'g'), toBengaliNumber(getVal(data.avgAttendance)) || "০");
    });

    // 3. Department-wise Info
    const depts = ['labor', 'ulama', 'pro', 'youth', 'nonMuslim'];
    const deptTypes = ['rokon', 'karmi', 'associate'];
    depts.forEach(dept => {
      const deptData = report.deptManpower?.[dept] || report[dept] || report.departmentalInfo?.[dept] || {};
      deptTypes.forEach(type => {
        const data = deptData[type] || {};
        const previous = data.previousCount || 0;
        const current = data.currentCount || 0;
        const increase = data.increase || 0;
        const deficit = data.deficit || 0;
        const target = data.target || 0;
        
        const baseKey = `${dept}${type.charAt(0).toUpperCase() + type.slice(1)}`;
        output = output.replace(new RegExp(`{{${baseKey}Previous}}`, 'g'), toBengaliNumber(previous) || "০");
        output = output.replace(new RegExp(`{{${baseKey}Current}}`, 'g'), toBengaliNumber(current) || "০");
        output = output.replace(new RegExp(`{{${baseKey}Increase}}`, 'g'), toBengaliNumber(increase) || "০");
        output = output.replace(new RegExp(`{{${baseKey}Deficit}}`, 'g'), toBengaliNumber(deficit) || "০");
        output = output.replace(new RegExp(`{{${baseKey}Target}}`, 'g'), toBengaliNumber(target) || "০");
      });
    });

    // Meetings
    const meetingKeys = ['wardTeam', 'wardMeeting', 'memberMeeting', 'karmiMeeting', 'associateGathering', 'unit'];
    meetingKeys.forEach(key => {
      const templateKey = key === 'wardMeeting' ? 'Ward' : key === 'memberMeeting' ? 'Rokon' : key === 'karmiMeeting' ? 'Karmi' : key === 'associateGathering' ? 'Associate' : key.charAt(0).toUpperCase() + key.slice(1);
      output = output.replace(new RegExp(`{{meeting${templateKey}Count}}`, 'g'), toBengaliNumber(report.orgMeetings?.[key]?.count?.val || report.orgMeetings?.[key]?.count?.karmi) || "০");
      output = output.replace(new RegExp(`{{meeting${templateKey}Attendance}}`, 'g'), toBengaliNumber(report.orgMeetings?.[key]?.avgAttendance?.val || report.orgMeetings?.[key]?.avgAttendance?.karmi) || "০");
    });

    // 4. Social Work
    const socialWork = report.socialWork || {};
    const socialKeys = [
      'devWork', 'socialEvent', 'humanitarian', 'cleaning', 'medical', 'blood', 'maternity',
      'newborn', 'maktub', 'others', 'education', 'technical', 'online', 'trees', 'awareness',
      'disaster', 'relief', 'nonMuslim', 'burial', 'employment',
      'generalServiceTeamCount', 'technicalServiceTeamCount', 'volunteerTeamCount'
    ];
    socialKeys.forEach(key => {
      output = output.replace(new RegExp(`{{social${key.charAt(0).toUpperCase() + key.slice(1)}}}`, 'g'), toBengaliNumber(socialWork[key]) || "০");
    });
    output = output.replace(/{{socialPersonalCount}}/g, toBengaliNumber(socialWork.personalCount) || "০");
    output = output.replace(/{{socialPersonalServiceCount}}/g, toBengaliNumber(socialWork.personalServiceCount) || "০");

    // Health & Institutional Social Work
    output = output.replace(/{{socialHealthTrainingCount}}/g, toBengaliNumber(socialWork.healthTrainingCount) || "০");
    output = output.replace(/{{socialHealthServiceCount}}/g, toBengaliNumber(socialWork.healthServiceCount) || "০");
    output = output.replace(/{{socialHealthBeneficiaryCount}}/g, toBengaliNumber(socialWork.healthBeneficiaryCount) || "০");

    output = output.replace(/{{socialInstTotalCount}}/g, toBengaliNumber(socialWork.instTotalCount) || "০");
    output = output.replace(/{{socialInstActiveCount}}/g, toBengaliNumber(socialWork.instActiveCount) || "০");
    output = output.replace(/{{socialInstNewCount}}/g, toBengaliNumber(socialWork.instNewCount) || "০");

    // 5. Political & Election
    const political = report.political || {};
    const election = political.election || {};
    output = output.replace(/{{electionCouncilorCandidateCount}}/g, toBengaliNumber(election.councilor?.candidateCount?.val) || "০");
    output = output.replace(/{{electionCouncilorElectedCount}}/g, toBengaliNumber(election.councilor?.electedCount?.val) || "০");
    output = output.replace(/{{electionCouncilorSecondPlaceCount}}/g, toBengaliNumber(election.councilor?.secondPlaceCount?.val) || "০");
    output = output.replace(/{{electionVoteCenterCount}}/g, toBengaliNumber(election.preparatory?.voteCenter?.count) || "০");
    output = output.replace(/{{electionVoteCenterIncrease}}/g, toBengaliNumber(election.preparatory?.voteCenter?.increase) || "০");
    output = output.replace(/{{electionVoteCenterTarget}}/g, toBengaliNumber(election.preparatory?.voteCenter?.target) || "০");
    output = output.replace(/{{electionVoteCenterCommitteeCount}}/g, toBengaliNumber(election.preparatory?.voteCenterCommittee?.count) || "০");
    output = output.replace(/{{electionVoteCenterCommitteeIncrease}}/g, toBengaliNumber(election.preparatory?.voteCenterCommittee?.increase) || "০");
    output = output.replace(/{{electionVoteCenterCommitteeTarget}}/g, toBengaliNumber(election.preparatory?.voteCenterCommittee?.target) || "০");
    output = output.replace(/{{electionCommitteeMeetingCount}}/g, toBengaliNumber(election.electionCommitteeMeetingCount) || "০");

    // State Reform & Correction (Communication & Programs)
    const politicalComm = political.comm || {};
    output = output.replace(/{{politicalCommPoliticalCount}}/g, toBengaliNumber(politicalComm.political?.communicatedCount) || "০");
    output = output.replace(/{{politicalCommPoliticalReached}}/g, toBengaliNumber(politicalComm.political?.reachedCount) || "০");
    output = output.replace(/{{politicalCommAdminCount}}/g, toBengaliNumber(politicalComm.admin?.communicatedCount) || "০");
    output = output.replace(/{{politicalCommAdminReached}}/g, toBengaliNumber(politicalComm.admin?.reachedCount) || "০");

    const politicalProg = political.prog || {};
    // centerProgram count is stored as {val: X}
    output = output.replace(/{{politicalProgCentralCount}}/g, toBengaliNumber(politicalProg.centerProgram?.count?.val) || "০");
    output = output.replace(/{{politicalProgCentralAttendance}}/g, toBengaliNumber(politicalProg.centerProgram?.avgAttendance?.val) || "০");
    // localProgram count is stored as {gathering, meeting, procession}
    output = output.replace(/{{politicalProgLocalCount}}/g, Object.values(politicalProg.localProgram?.count || {}).join(' / ') || "০");
    output = output.replace(/{{politicalProgLocalAttendance}}/g, Object.values(politicalProg.localProgram?.avgAttendance || {}).join(' / ') || "০");
    // distribution count is stored as {poster, leaflet, booklet, memorandum}
    output = output.replace(/{{politicalProgDistributionCount}}/g, Object.values(politicalProg.distribution?.count || {}).join(' / ') || "০");
    output = output.replace(/{{politicalProgDistributionAttendance}}/g, Object.values(politicalProg.distribution?.avgAttendance || {}).join(' / ') || "০");

    // 6. Baitulmal
    const baitulmal = report.finance || {};
    output = output.replace(/{{baitulmalDharjoNisab}}/g, toBengaliNumber(baitulmal.nisab?.allocated) || "০");
    output = output.replace(/{{baitulmalWadaNisab}}/g, toBengaliNumber(baitulmal.nisab?.promised) || "০");
    
    const baitulmalItems = ['receivedNisab', 'directIanat', 'oneTime', 'electionFund', 'shahidFund', 'floodCollection', 'socialWork', 'zakat', 'fitra', 'iftar', 'delegateFee'];
    baitulmalItems.forEach(item => {
      const templateKey = item.charAt(0).toUpperCase() + item.slice(1);
      output = output.replace(new RegExp(`{{baitulmal${templateKey}Income}}`, 'g'), toBengaliNumber(baitulmal.income?.[item]) || "০");
      output = output.replace(new RegExp(`{{baitulmal${templateKey}Expense}}`, 'g'), toBengaliNumber(baitulmal.expense?.[item]) || "০");
    });
    
    // Explicit mapping for specific baitulmal keys that might have different names in template
    output = output.replace(/{{baitulmalPraptoNisab}}/g, toBengaliNumber(baitulmal.income?.receivedNisab) || "০");
    output = output.replace(/{{baitulmalNisabPorishodh}}/g, toBengaliNumber(baitulmal.expense?.nisabPaid) || "০");
    output = output.replace(/{{baitulmalSorasoriIyanat}}/g, toBengaliNumber(baitulmal.income?.directIanat) || "০");
    output = output.replace(/{{baitulmalSthaniyoKhoroch}}/g, toBengaliNumber(baitulmal.expense?.localExpense) || "০");
    
    output = output.replace(/{{baitulmalTotalIncome}}/g, toBengaliNumber(baitulmal.income?.totalIncome) || "০");
    output = output.replace(/{{baitulmalTotalExpense}}/g, toBengaliNumber(baitulmal.expense?.totalExpense) || "০");
    output = output.replace(/{{baitulmalPreviousSurplus}}/g, toBengaliNumber(baitulmal.income?.previousMonthSurplus) || "০");
    output = output.replace(/{{baitulmalMonthlySurplus}}/g, toBengaliNumber(baitulmal.expense?.monthlySurplus) || "০");
    output = output.replace(/{{baitulmalGrandTotalIncome}}/g, toBengaliNumber(baitulmal.income?.grandTotalIncome) || "০");
    output = output.replace(/{{baitulmalGrandTotalExpense}}/g, toBengaliNumber(baitulmal.income?.grandTotalIncome) || "০"); // Using income total for grand total expense as per logic

    // 3. Training
    const training = report.training || {};
    const tarbiyat = training.tarbiyat || {};
    
    // Regular Tarbiyat rows (unit, ward, higher, public, others)
    const tarbiyatKeys = ['unitTarbiyat', 'wardTarbiyat', 'higherTarbiyat', 'publicTarbiyat', 'others'];
    tarbiyatKeys.forEach(key => {
      const rowData = tarbiyat[key] || {};
      output = output.replace(new RegExp(`{{trainingTarbiyat_${key}_Count}}`, 'g'), toBengaliNumber(rowData.count?.val) || "০");
      output = output.replace(new RegExp(`{{trainingTarbiyat_${key}_Target}}`, 'g'), toBengaliNumber(rowData.target?.val) || "০");
      output = output.replace(new RegExp(`{{trainingTarbiyat_${key}_Avg}}`, 'g'), toBengaliNumber(rowData.avgAttendance?.val) || "০");
    });
    
    // Discussion Circle
    const discussion = tarbiyat.discussionCircle || {};
    output = output.replace(/{{trainingTarbiyat_discussionCircle_Group}}/g, toBengaliNumber(discussion.count?.group) || "০");
    output = output.replace(/{{trainingTarbiyat_discussionCircle_Session}}/g, toBengaliNumber(discussion.target?.session) || "০");
    
    // Quran Dars
    const quranDars = tarbiyat.quranDars || {};
    output = output.replace(/{{trainingTarbiyat_quranDars_Program}}/g, toBengaliNumber(quranDars.count?.program) || "০");

    // HRD mapping
    const hrd = training.hrd || {};
    const hrdKeys = ['dawah', 'social', 'media', 'it', 'finance', 'english', 'arabic', 'technical'];
    hrdKeys.forEach(key => {
      const data = hrd[key] || {};
      output = output.replace(new RegExp(`{{trainingHRD_${key}_Conducted}}`, 'g'), toBengaliNumber(data.conductedCount) || "০");
      output = output.replace(new RegExp(`{{trainingHRD_${key}_Completed}}`, 'g'), toBengaliNumber(data.completedCount) || "০");
      output = output.replace(new RegExp(`{{trainingHRD_${key}_Others}}`, 'g'), toBengaliNumber(data.othersCompletedCount) || "০");
      output = output.replace(new RegExp(`{{trainingHRD_${key}_Total}}`, 'g'), toBengaliNumber(data.totalCount) || "০");
    });

    // 7. National Days (stored under political.nationalDay)
    const nationalDays = report.political?.nationalDay || {};
    const dayKeys = ['independenceDay', 'victoryDay', 'motherLanguageDay', 'others'];
    dayKeys.forEach(key => {
      const templateKey = key.charAt(0).toUpperCase() + key.slice(1);
      output = output.replace(new RegExp(`{{day${templateKey}Count}}`, 'g'), toBengaliNumber(nationalDays[key]?.programCount) || "০");
      output = output.replace(new RegExp(`{{day${templateKey}Attendance}}`, 'g'), toBengaliNumber(nationalDays[key]?.avgAttendance) || "০");
    });

    // 8. Remarks (already done via PlanningReportingClient but making sure)
    output = output.replace(/{{remarksProblems}}/g, report.remarks?.problems || "নেই");
    output = output.replace(/{{remarksProspects}}/g, report.remarks?.prospects || "নেই");

    // 9. Metadata & Date
    const reportDate = report.reportDate || new Date().toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' });
    output = output.replace(/{{reportDate}}/g, reportDate);

    // 7. Remarks
    const problemsText = Array.isArray(report.remarks?.problems) ? report.remarks.problems.filter((p: string) => p).join('\n') : report.remarks?.problems;
    const prospectsText = Array.isArray(report.remarks?.opportunities) ? report.remarks.opportunities.filter((p: string) => p).join('\n') : report.remarks?.prospects;
    output = output.replace(/{{remarksProblems}}/g, problemsText || "কোনো সমস্যা উল্লেখ করা হয়নি।");
    output = output.replace(/{{remarksProspects}}/g, prospectsText || "কোনো সম্ভাবনা উল্লেখ করা হয়নি।");

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
