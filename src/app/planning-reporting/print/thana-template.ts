export const templateStyle = `

body { color: #000; background-color: #fff; font-family: "Noto Serif Bengali"; }
ol{margin:0;padding:0}
table { width: 100% !important; border-collapse: collapse;}
table td, table th {
  padding-inline: 4px;
  padding-block-end: 0;
  word-wrap: break-word;
  word-break: break-word;
  white-space: normal;
  overflow-wrap: break-word;
  vertical-align: middle;
  font-size: 8pt;
}
.border-table td, .border-table th {
  border: 1pt solid #000;
  text-align: center;
  vertical-align: middle;
}
.border-table .text-left { text-align: left; }
.border-table .text-right { text-align: right; }
.section-title {  font-size: 9pt; font-weight: 600; margin-block: 3px; }
.note-text {  font-size: 8pt; font-style: italic; font-weight: normal; }
.c1{padding-top:0pt;padding-bottom:0pt;line-height:1.13;text-align:center}
.c13{padding-top:0pt;padding-bottom:0pt;line-height:1.13;text-align:left}
.c19{padding-top:0pt;padding-bottom:0pt;line-height:1.13;text-align:right}
.c11{orphans:2;widows:2}
.c30{font-weight:700;text-decoration:none;vertical-align:baseline;font-size:12pt;font-style:normal}
.c42{font-size:10pt;font-weight:700;}
.c3{font-weight:400;text-decoration:none;vertical-align:baseline;font-size:10pt;font-style:normal}
.c128{border:none;vertical-align:middle;}
.text-center { text-align: center !important; }
`;

export const templateHtml = `

<p class="c1 c11"><span class="c132 c146">বিসমিল্লাহির রাহমানির রাহিম</span></p>
<p class="c1 c11"><span class="c30">থানা সংগঠনের</span></p>
<p class="c1 c11"><span class="c30">মাসিক/ত্রৈমাসিক/ষাণ্মাসিক/নয় মাসিক/বার্ষিক রিপোর্ট</span></p>

<table class="c18" style="margin-bottom: 10px;">
  <tr>
    <td class="c128"><p class="c13"><span class="c42">মাস:</span><span class="c3"> {{month}}</span></p></td>
    <td class="c128"><p class="c19"><span class="c42">সন:</span><span class="c3"> {{year}}</span></p></td>
  </tr>
  <tr>
    <td class="c128"><p class="c13"><span class="c42">থানা/বিভাগের নাম:</span><span class="c3"> {{orgName}} ঢাকা মহানগরী দক্ষিণ</span></p></td>
  </tr>
  <tr>
    <td class="c123" colspan="2"><p class="c13"><span class="c42">আমীর/সভাপতির নাম:</span><span class="c3"> {{president}}</span></p></td>
  </tr>
</table>

<p class="c13 c11" style="border-bottom: 1pt solid #000; margin-bottom: 5px;">
  <span class="c42">দাওয়াত ও তাবলীগ :</span>
</p>

<p class="c13 c11">
  <span class="c3">ক) জনসাধারণের মাঝে সর্বমোট দাওয়াত প্রদান সংখ্যা* : {{totalDawahReached}}        মোট জনসংখ্যা* : {{totalPopulation}}</span><br/>
  <span class="c3">টার্গেট (মাসিক/ত্রৈমাসিক/ষাণ্মাসিক/নয় মাসিক/বার্ষিক): {{totalDawahTarget}}</span><br/>
  <span class="c48">*দাওয়াত ও তাবলীগের ‘ক’ এর অধীনে ক্রমিক ১-৪ নং পর্যন্ত দাওয়াত প্রদানের মোট সংখ্যা যোগ করে এখানে বসাতে হবে।</span>
</p>

<p class="c13 c11 section-title">১. ইউনিটে নিয়মিত গ্রুপভিত্তিক দাওয়াত:</p>
<table class="border-table">
  <tr>
    <td style="width:34%" class="text-left">বিবরণ</td>
    <td style="width:22%">মোট</td>
    <td style="width:22%">পুরুষ</td>
    <td style="width:22%">মহিলা</td>
  </tr>
  <tr>
    <td class="text-left">গ্রুপ বের হয়েছে</td>
    <td>{{groupDawahCountTotal}}</td>
    <td>{{groupDawahCountMale}}</td>
    <td>{{groupDawahCountFemale}}</td>
  </tr>
  <tr>
    <td class="text-left">অংশগ্রহণকারীর সংখ্যা</td>
    <td>{{groupDawahParticipantsTotal}}</td>
    <td>{{groupDawahParticipantsMale}}</td>
    <td>{{groupDawahParticipantsFemale}}</td>
  </tr>
  <tr>
    <td class="text-left">দাওয়াত পৌঁছানো হয়েছে</td>
    <td>{{groupDawahReachedTotal}}</td>
    <td>{{groupDawahReachedMale}}</td>
    <td>{{groupDawahReachedFemale}}</td>
  </tr>
  <tr>
    <td class="text-left">সহযোগী সদস্য</td>
    <td>{{groupDawahNewAssociateTotal}}</td>
    <td>{{groupDawahNewAssociateMale}}</td>
    <td>{{groupDawahNewAssociateFemale}}</td>
  </tr>
</table>

<p class="c13 c11 section-title">২. ব্যক্তিগত ও টার্গেটভিত্তিক দাওয়াত:</p>
<table class="border-table">
  <tr>
    <td rowspan="2" style="width:34%" class="text-left">বিবরণ</td>
    <td colspan="2" style="width:33%">পুরুষ</td>
    <td colspan="2" style="width:33%">মহিলা</td>
  </tr>
  <tr>
    <td>সদস্য (রুকন)</td>
    <td>কর্মী</td>
    <td>সদস্য (রুকন)</td>
    <td>কর্মী</td>
  </tr>
  <tr>
    <td class="text-left">মোট জনশক্তি সংখ্যা</td>
    <td>{{personalDawahRokonMaleTotal}}</td>
    <td>{{personalDawahKarmiMaleTotal}}</td>
    <td>{{personalDawahRokonFemaleTotal}}</td>
    <td>{{personalDawahKarmiFemaleTotal}}</td>
  </tr>
  <tr>
    <td class="text-left">ব্যক্তিগতভাবে দাওয়াতি কাজ করেছেন</td>
    <td>{{personalDawahRokonMaleWorked}}</td>
    <td>{{personalDawahKarmiMaleWorked}}</td>
    <td>{{personalDawahRokonFemaleWorked}}</td>
    <td>{{personalDawahKarmiFemaleWorked}}</td>
  </tr>
</table>
<table class="border-table">
  <tr>
    <td style="width:34%" class="text-left">বিবরণ</td>
    <td style="width:22%">মোট</td>
    <td style="width:22%">পুরুষ</td>
    <td style="width:22%">মহিলা</td>
  </tr>
  <tr>
    <td class="text-left">দাওয়াত পৌঁছানো হয়েছে</td>
    <td>{{personalDawahReachedTotal}}</td>
    <td>{{personalDawahReachedMale}}</td>
    <td>{{personalDawahReachedFemale}}</td>
  </tr>
  <tr>
    <td class="text-left">সহযোগী সদস্য</td>
    <td>{{personalDawahAssociateTotal}}</td>
    <td>{{personalDawahAssociateMale}}</td>
    <td>{{personalDawahAssociateFemale}}</td>
  </tr>
</table>

<p class="c13 c11 section-title">৩. সাধারণ সভা/দাওয়াতি সভা ও অন্যান্য কার্যক্রমের মাধ্যমে দাওয়াত :</p>
<table class="border-table">
  <tr>
    <td style="width:34%" class="text-left">বিবরণ</td>
    <td style="width:22%">মোট</td>
    <td style="width:22%">পুরুষ</td>
    <td style="width:22%">মহিলা</td>
  </tr>
  <tr>
    <td class="text-left">দাওয়াত পৌঁছানো হয়েছে</td>
    <td>{{generalMeetingReachedTotal}}</td>
    <td>{{generalMeetingReachedMale}}</td>
    <td>{{generalMeetingReachedFemale}}</td>
  </tr>
  <tr>
    <td class="text-left">সহযোগী সদস্য</td>
    <td>{{generalMeetingNewAssociateTotal}}</td>
    <td>{{generalMeetingNewAssociateMale}}</td>
    <td>{{generalMeetingNewAssociateFemale}}</td>
  </tr>
</table>

<p class="c13 c11 section-title">৪. গণসংযোগ ও দাওয়াতী অভিযান পালন*:</p>
<table class="border-table">
  <tr>
    <td style="width:28%" class="text-left">বিবরণ</td>
    <td style="width:18%">মোট গ্রুপ সংখ্যা</td>
    <td style="width:18%">মোট অংশগ্রহণকারীর সংখ্যা</td>
    <td style="width:18%">মোট দাওয়াত পৌঁছানো হয়েছে</td>
    <td style="width:18%">মোট সহযোগী সদস্য</td>
  </tr>
  <tr>
    <td class="text-left">গণসংযোগ দশক/পক্ষ (পুরুষ/মহিলা)</td>
    <td>{{prDecadeGroup}}</td>
    <td>{{prDecadeParticipant}}</td>
    <td>{{prDecadeReached}}</td>
    <td>{{prDecadeAssociate}}</td>
  </tr>
  <tr>
    <td class="text-left">মহা: ঘোষিত গণসংযোগ ও দাও:অভিযান</td>
    <td>{{districtCampaignGroup}}</td>
    <td>{{districtCampaignParticipant}}</td>
    <td>{{districtCampaignReached}}</td>
    <td>{{districtCampaignAssociate}}</td>
  </tr>
  <tr>
    <td class="text-left">নির্বাচনী আসনে গণসংযোগ সপ্তাহ (পু/ম)</td>
    <td>{{electionWeekGroup}}</td>
    <td>{{electionWeekParticipant}}</td>
    <td>{{electionWeekReached}}</td>
    <td>{{electionWeekAssociate}}</td>
  </tr>
  <tr>
    <td class="text-left">উলামা/পেশাজীবী গণসংযোগ সপ্তাহ (পু/ম)</td>
    <td>{{proWeekGroup}}</td>
    <td>{{proWeekParticipant}}</td>
    <td>{{proWeekReached}}</td>
    <td>{{proWeekAssociate}}</td>
  </tr>
  <tr>
    <td class="text-left">অন্যান্য (বিস্তারিত আলাদা কাগজে দেয়া যাবে)</td>
    <td>{{otherGroup}}</td>
    <td>{{otherParticipant}}</td>
    <td>{{otherReached}}</td>
    <td>{{otherAssociate}}</td>
  </tr>
</table>
<p class="c13 c11 note-text">*গণসংযোগ অভিযান পালনের সময় ইউনিট থেকে থানা পর্যন্ত গ্রুপ সংখ্যা, ব্যক্তিগত ও গ্রুপভিত্তিক সহযোগী সদস্য বৃদ্ধি সংখ্যা শুধুমাত্র এই ছকেই বসাতে হবে।</p>

<p class="c13 c11 section-title">খ) বিভাগ ভিত্তিক তথ্য :</p>
<p class="c13 c11 section-title">১. তা’লীমুল কুরআনের মাধ্যমে দাওয়াত:</p>
<table class="border-table">
  <tr>
    <td rowspan="2" class="text-left">ব্যক্তিগত উদ্যোগ</td>
    <td colspan="2">সদস্য (রুকন) (পু/ম)</td>
    <td colspan="2">কর্মী (পু/ম)</td>
    <td rowspan="2">মোট</td>
    <td rowspan="2">সামষ্টিক উদ্যোগ</td>
    <td rowspan="2">মোট সংখ্যা</td>
    <td rowspan="2">মোট শিক্ষার্থী সংখ্যা</td>
  </tr>
  <tr>
    <td>পুরুষ</td>
    <td>মহিলা</td>
    <td>পুরুষ</td>
    <td>মহিলা</td>
  </tr>
  <tr>
    <td class="text-left">কুরআন শিক্ষা প্রদান করেছেন</td>
    <td>{{quranTeacherRokonMale}}</td>
    <td>{{quranTeacherRokonFemale}}</td>
    <td>{{quranTeacherKarmiMale}}</td>
    <td>{{quranTeacherKarmiFemale}}</td>
    <td>{{quranTeacherTotal}}</td>
    <td>কুরআন শিক্ষার গ্রুপ</td>
    <td>{{quranGroupCount}}</td>
    <td>{{quranGroupStudents}}</td>
  </tr>
  <tr>
    <td class="text-left">কে কুরআন শিক্ষা প্রদান করা হয়েছে</td>
    <td>{{quranReachedRokonMale}}</td>
    <td>{{quranReachedRokonFemale}}</td>
    <td>{{quranReachedKarmiMale}}</td>
    <td>{{quranReachedKarmiFemale}}</td>
    <td>{{quranReachedTotal}}</td>
    <td>মক্তব/ফোরকানিয়া মাদ্রাসা</td>
    <td>{{quranMaktubCount}}</td>
    <td>{{quranMaktubStudents}}</td>
  </tr>
</table>
<table class="border-table">
  <tr>
    <td>মোট সহীহ তিলাওয়াত শিখেছেন(পু/ম)</td>
    <td>মোট ের নিকট দাওয়াত পৌঁছানো হয়েছে(পু/ম)</td>
    <td>মোট সহযোগী সদস্য হয়েছেন (পু/ম)</td>
  </tr>
  <tr>
    <td>{{quranSahihLearnedMale}}/{{quranSahihLearnedFemale}}</td>
    <td>{{quranDawahReachedMale}}/{{quranDawahReachedFemale}}</td>
    <td>{{quranAssociateMale}}/{{quranAssociateFemale}}</td>
  </tr>
</table>
<table class="border-table">
  <tr>
    <td>সর্বমোট সংখ্যা</td>
    <td>মুয়াল্লিম/মুয়াল্লিমা</td>
    <td>পুরুষ</td>
    <td>মহিলা</td>
    <td>বৃদ্ধি সংখ্যা</td>
    <td>পুরুষ</td>
    <td>মহিলা</td>
  </tr>
  <tr>
    <td>{{quranMuallimTotal}}</td>
    <td>{{quranMuallimCountMale}}/{{quranMuallimCountFemale}}</td>
    <td>{{quranMuallimMaleTotal}}</td>
    <td>{{quranMuallimFemaleTotal}}</td>
    <td>{{quranMuallimIncreaseTotal}}</td>
    <td>{{quranMuallimIncreaseMale}}</td>
    <td>{{quranMuallimIncreaseFemale}}</td>
  </tr>
</table>

<!-- PAGE 2 BEGINS HERE -->
<p class="c13 c11 section-title">২. মহল্লাভিত্তিক দাওয়াত:* <span class="note-text">যেসব মহল্লা বুঝাবে যেখানে ইউনিট/দাওয়াতি ইউনিট নেই।</span></p>
<table class="border-table">
  <tr>
    <td class="text-left" style="width:30%">সরকারী হিসাবে মহল্লা সংখ্যা</td>
    <td style="width:10%">{{mahallaGovtCount}}</td>
    <td style="width:10%">বৃদ্ধি</td>
    <td class="text-left" style="width:40%">মোট ের নিকট দাওয়াত পৌঁছানো হয়েছে</td>
    <td style="width:10%">{{mahallaReachedCount}}</td>
  </tr>
  <tr>
    <td class="text-left">মোট মহল্লা কমিটি সংখ্যা</td>
    <td>{{mahallaCommitteeCount}}</td>
    <td>{{mahallaCommitteeIncrease}}</td>
    <td class="text-left">মোট সহযোগী সদস্য হয়েছেন</td>
    <td>{{mahallaAssociateCount}}</td>
  </tr>
  <tr>
    <td class="text-left">বিশেষ দাওয়াতের অন্তর্ভুক্ত মোট মহল্লা সংখ্যা</td>
    <td>{{mahallaSpecialDawatCount}}</td>
    <td></td>
    <td colspan="2" style="border:none;"></td>
  </tr>
</table>

<p class="c13 c11 section-title">৩. যুব সমাজের মাঝে দাওয়াত*: <span class="note-text">*যুব বিভাগের কাজের ক্ষেত্রে ছাত্র সংগঠনের সাবেক জনশক্তি ব্যতিত সাধারণ যুবকগণই যুবক হিসেবে গণ্য হবে।</span></p>
<table class="border-table">
  <tr>
    <td class="text-left" style="width:35%">বিবরণ</td>
    <td style="width:15%">মোট সংখ্যা</td>
    <td class="text-left" style="width:30%">বিবরণ</td>
    <td style="width:10%">মোট সংখ্যা</td>
    <td style="width:10%">বৃদ্ধি</td>
  </tr>
  <tr>
    <td class="text-left">যুবকের মাঝে দাওয়াত পৌঁছানো হয়েছে</td>
    <td>{{youthReachedCount}}</td>
    <td class="text-left">যুব কমিটি</td>
    <td>{{youthCommitteeCount}}</td>
    <td>{{youthCommitteeIncrease}}</td>
  </tr>
  <tr>
    <td class="text-left">যুবক সহযোগী সদস্য হয়েছেন</td>
    <td>{{youthAssociateCount}}</td>
    <td class="text-left">নতুন সমিতি/ক্লাব প্রতিষ্ঠা করা হয়েছে</td>
    <td>{{youthClubCount}}</td>
    <td>{{youthClubIncrease}}</td>
  </tr>
  <tr>
    <td colspan="2" style="border:none;"></td>
    <td class="text-left">প্রতিষ্ঠিত সমিতি/ক্লাবে দাওয়াত পৌঁছানো হয়েছে</td>
    <td>{{youthClubReached}}</td>
    <td>{{youthClubReachedIncrease}}</td>
  </tr>
</table>

<p class="c13 c11 section-title">৪. বিভিন্ন শ্রেণী-পেশার মানুষের মাঝে দাওয়াত:</p>
<table class="border-table">
  <tr>
    <td class="text-left" style="width:40%">শ্রেণী/পেশার বিবরণ</td>
    <td style="width:20%">ের মাঝে দাওয়াত পৌঁছানো হয়েছে</td>
    <td style="width:20%">সহযোগী সদস্য</td>
    <td style="width:20%">টার্গেট</td>
  </tr>
  <tr>
    <td class="text-left">রাজনৈতিক ও বিশিষ্ট ব্যক্তিবর্গ</td>
    <td>{{professionsPoliticalReached}}</td>
    <td>{{professionsPoliticalAssociate}}</td>
    <td>{{professionsPoliticalTarget}}</td>
  </tr>
  <tr>
    <td class="text-left">পেশাজীবী/ উলামা-মাশায়েখ</td>
    <td>{{professionsProfessionalReached}}</td>
    <td>{{professionsProfessionalAssociate}}</td>
    <td>{{professionsProfessionalTarget}}</td>
  </tr>
  <tr>
    <td class="text-left">শ্রমজীবী</td>
    <td>{{professionsLaborerReached}}</td>
    <td>{{professionsLaborerAssociate}}</td>
    <td>{{professionsLaborerTarget}}</td>
  </tr>
  <tr>
    <td class="text-left">প্রান্তিক জনগোষ্ঠী (অতি দরিদ্র)</td>
    <td>{{professionsMarginalizedReached}}</td>
    <td>{{professionsMarginalizedAssociate}}</td>
    <td>{{professionsMarginalizedTarget}}</td>
  </tr>
  <tr>
    <td class="text-left">ভিন্নধর্মাবলম্বী/ মিডিয়া কর্মী</td>
    <td>{{professionsNonMuslimReached}}</td>
    <td>{{professionsNonMuslimAssociate}}</td>
    <td>{{professionsNonMuslimTarget}}</td>
  </tr>
</table>

<p class="c13 c11 section-title">৫. পরিবারভিত্তিক দাওয়াত:</p>
<table class="border-table">
  <tr>
    <td class="text-left" style="width:50%">দাওয়াতী কাজে অংশগ্রহণকারী মোট পরিবার:</td>
    <td style="width:50%">{{familyTotalCount}}</td>
  </tr>
  <tr>
    <td class="text-left" style="width:50%">মোট নতুন পরিবারে দাওয়াত পৌঁছানো হয়েছে:</td>
    <td style="width:50%">{{familyNewCount}}</td>
  </tr>
</table>

<p class="c13 c11 section-title">৬. মসজিদ/দাওয়াহ্‌ সেন্টার/তথ্যসেবা কেন্দ্রভিত্তিক দাওয়াত:</p>
<table class="border-table">
  <tr>
    <td class="text-left">বিবরণ</td>
    <td>মোট সংখ্যা</td>
    <td>বৃদ্ধি</td>
    <td class="text-left">বিবরণ</td>
    <td>মোট সংখ্যা</td>
    <td>বৃদ্ধি</td>
  </tr>
  <tr>
    <td class="text-left">মসজিদ</td>
    <td>{{mosqueTotalCount}}</td>
    <td>{{mosqueTotalIncrease}}</td>
    <td class="text-left">মসজিদভিত্তিক দাওয়াহ্ সেন্টার /সাধারণ দাওয়াহ্ সেন্টার</td>
    <td>{{mosqueCenterCount}}</td>
    <td>/</td>
  </tr>
  <tr>
    <td class="text-left">দাওয়াতের আওতাভুক্ত মসজিদ</td>
    <td>{{mosqueDawatCount}}</td>
    <td>/</td>
    <td class="text-left">তথ্যসেবা কেন্দ্র (মসজিদভিত্তিক/সাধারণ)</td>
    <td>{{mosqueInfoCenterCount}}</td>
    <td>{{mosqueInfoCenterIncrease}}</td>
  </tr>
</table>
<p class="c13 c11 section-title">৬. মসজিদ/দাওয়াহ্‌ সেন্টার/তথ্যসেবা কেন্দ্রভিত্তিক দাওয়াত:</p>
<table class="border-table">
  <tr>
    <td class="text-left">বিবরণ</td>
    <td>মোট সংখ্যা</td>
    <td>বৃদ্ধি</td>
    <td class="text-left">বিবরণ</td>
    <td>মোট সংখ্যা</td>
    <td>বৃদ্ধি</td>
  </tr>
  <tr>
    <td class="text-left">মসজিদ</td>
    <td>{{mosqueTotalCount}}</td>
    <td>{{mosqueTotalIncrease}}</td>
    <td class="text-left">মসজিদভিত্তিক দাওয়াহ্ সেন্টার /সাধারণ দাওয়াহ্ সেন্টার</td>
    <td>{{mosqueCenterCount}}</td>
    <td>/</td>
  </tr>
  <tr>
    <td class="text-left">দাওয়াতের আওতাভুক্ত মসজিদ</td>
    <td>{{mosqueDawatCount}}</td>
    <td>/</td>
    <td class="text-left">তথ্যসেবা কেন্দ্র (মসজিদভিত্তিক/সাধারণ)</td>
    <td>{{mosqueInfoCenterCount}}</td>
    <td>{{mosqueInfoCenterIncrease}}</td>
  </tr>
</table>

<p class="c13 c11 section-title">৭. তথ্যপ্রযুক্তির মাধ্যমে দাওয়াত:</p>
<table class="border-table">
  <tr>
    <td>মোট উপযুক্ত জনশক্তি সংখ্যা</td>
    <td>মোট অংশগ্রহণকারী সংখ্যা</td>
  </tr>
  <tr>
    <td>{{itManpowerCount}}</td>
    <td>{{itParticipantCount}}</td>
  </tr>
</table>



<p class="c13 c11 section-title">গ) দাওয়াহ্‌ ও প্রকাশনা:</p>
<table class="border-table">
    <tr>
    <td class="text-left">বিবরণ</td>
    <td>মোট সংখ্যা</td>
    <td>বৃদ্ধি</td>
    <td class="text-left">বিবরণ</td>
    <td>মোট সংখ্যা</td>
  </tr>
  <tr>
    <td class="text-left">পাঠাগার/ বই/ বই বিলি</td>
    <td>{{dawahPubLibraryCount}} / {{dawahPubBookCount}} / {{dawahPubBookDistributedCount}}</td>
    <td>{{dawahPubLibraryIncrease}} / {{dawahPubBookIncrease}} / {{dawahPubBookDistributedIncrease}}</td>
    <td class="text-left">বইয়ের সফ্ট কপি বিলি</td>
    <td>{{dawahPubSoftCopyDistributed}}</td>
  </tr>
  <tr>
    <td class="text-left">ইউনিটে বই বিলিকেন্দ্র/ইউনিটে বই বিলি</td>
    <td>{{dawahPubUnitCenterCount}} / {{dawahPubUnitBookDistributed}}</td>
    <td>{{dawahPubUnitCenterIncrease}} / {{dawahPubUnitBookDistributedIncrease}}</td>
    <td class="text-left">দাওয়াতী লিংক বিতরণ*</td>
    <td>{{dawahPubDawatLinkDistributed}}</td>
  </tr>
  <tr>
    <td class="text-left">ওয়ার্ডে বই বিক্রয় কেন্দ্র /ওয়ার্ডে বই বিক্রয়</td>
    <td>{{dawahPubWardCenterCount}} / {{dawahPubWardBookSold}}</td>
    <td>{{dawahPubWardCenterIncrease}} / {{dawahPubWardBookSoldIncrease}}</td>
    <td class="text-left">সোনার বাংলা/সংগ্রাম/পৃথিবী কত কপি চলে</td>
    <td>{{dawahPubSonarBanglaCount}} / {{dawahPubSangramCount}} / {{dawahPubPrithibiCount}}</td>
  </tr>
</table>
<p class="c13 c11 note-text">*সংগঠন অনুমোদিত</p>

<!-- PAGE 3 BEGINS HERE -->
<p class="c13 c11 section-title">ঘ) কর্মসূচী বাস্তবায়ন:</p>
<table class="border-table">
  <tr>
    <td style="width:5%">ক্র</td>
    <td style="width:45%" class="text-left">কর্মসূচীর বিবরণ</td>
    <td style="width:15%">মোট সংখ্যা</td>
    <td style="width:15%">টার্গেট</td>
    <td style="width:20%">গড় উপস্থিতি</td>
  </tr>
  <tr><td>১.</td><td class="text-left">ইউনিটে মাসিক সাধারণ সভা/পারিবারিক ইউনিটে সভা</td><td>{{programUnitMeetingCount}}</td><td>{{programUnitMeetingTarget}}</td><td>{{programUnitMeetingAttendance}}</td></tr>
  <tr><td>২.</td><td class="text-left">দাওয়াতি সভা/আলোচনা সভা/সুধী সমাবেশ</td><td>{{programDawahMeetingCount}}</td><td>{{programDawahMeetingTarget}}</td><td>{{programDawahMeetingAttendance}}</td></tr>
  <tr><td>৩.</td><td class="text-left">সীরাতুন্নবী(সাঃ) মাহফিল</td><td>{{programSeeratCount}}</td><td>{{programSeeratTarget}}</td><td>{{programSeeratAttendance}}</td></tr>
  <tr><td>৪.</td><td class="text-left">ঈদ পুনর্মিলনী/ফুলেরমেলা</td><td>{{programEidCount}}</td><td>{{programEidTarget}}</td><td>{{programEidAttendance}}</td></tr>
  <tr><td>৫.</td><td class="text-left">দারস/তাফসীর/দাওয়াতি জনসভা ও ইসলামী মাহফিল</td><td>{{programTafseerCount}}</td><td>{{programTafseerTarget}}</td><td>{{programTafseerAttendance}}</td></tr>
  <tr><td>৬.</td><td class="text-left">ইফতার মাহফিল (ব্যক্তিগত/সাংগঠনিক)</td><td>{{programIftarCount}}</td><td>{{programIftarTarget}}</td><td>{{programIftarAttendance}}</td></tr>
  <tr><td>৭.</td><td class="text-left">চা চক্র/সামষ্টিক খাওয়া/শিক্ষা সফর</td><td>{{programTeaCircleCount}}</td><td>{{programTeaCircleTarget}}</td><td>{{programTeaCircleAttendance}}</td></tr>
  <tr><td>৮.</td><td class="text-left">কিরাত/হামদ না’ত প্রতিযোগিতা</td><td>{{programQiraatCount}}</td><td>{{programQiraatTarget}}</td><td>{{programQiraatAttendance}}</td></tr>
  <tr><td>৯.</td><td class="text-left">অন্যান্য: (বিস্তারিত আলাদা কাগজে দেয়া যাবে)</td><td>{{programOtherCount}}</td><td>{{programOtherTarget}}</td><td>{{programOtherAttendance}}</td></tr>
</table>

<p class="c13 c11 section-title">সংগঠন :</p>
<p class="c13 c11 section-title">১. জনশক্তি:</p>
<table class="border-table">
  <tr>
    <td rowspan="2" class="text-left">জনশক্তির ধরণ</td>
    <td rowspan="2">বিগত সময়ের সংখ্যা</td>
    <td rowspan="2">বর্তমান সংখ্যা</td>
    <td colspan="2">বৃদ্ধি</td>
    <td rowspan="2">ঘাটতি</td>
    <td rowspan="2">টার্গেট</td>
    <td rowspan="2">বাস্তবায়নের হার</td>
  </tr>
  <tr>
    <td>মানোন্নয়ন-১</td>
    <td>আগত-</td>
  </tr>
  <tr>
    <td class="text-left">সর্বমোট সদস্য (রুকন)</td>
    <td>{{rokonPrev}}</td>
    <td>{{rokonCurrent}}</td>
    <td>{{rokonIncrease}}</td>
    <td>{{rokonIncoming}}</td>
    <td>{{rokonDecrease}}</td>
    <td>{{rokonTarget}}</td>
    <td>{{rokonProgress}}</td>
  </tr>
  <tr>
    <td class="text-left">সর্বমোট সদস্য(রুকন)প্রার্থী</td>
    <td>{{rokonCandidatePrev}}</td>
    <td>{{rokonCandidateCurrent}}</td>
    <td>{{rokonCandidateIncrease}}</td>
    <td>{{rokonCandidateIncoming}}</td>
    <td>{{rokonCandidateDecrease}}</td>
    <td>{{rokonCandidateTarget}}</td>
    <td>{{rokonCandidateProgress}}</td>
  </tr>
  <tr>
    <td class="text-left">সর্বমোট কর্মী</td>
    <td>{{karmiPrev}}</td>
    <td>{{associateCurrent}}</td>
    <td>{{associateIncrease}}</td>
    <td>{{karmiIncoming}}</td>
    <td>{{karmiDecrease}}</td>
    <td>{{associateTarget}}</td>
    <td>{{karmiProgress}}</td>
  </tr>
  <tr>
    <td class="text-left">সর্বমোট সক্রিয় সহযোগী সদস্য</td>
    <td>{{associatePrevious}}</td>
    <td>{{associateCurrent}}</td>
    <td>{{associateIncrease}}</td>
    <td>{{associateArrived}}</td>
    <td>{{associateDeficit}}</td>
    <td>{{associateTarget}}</td>
    <td>{{associateRate}}</td>
  </tr>
</table>

<p class="c13 c11 section-title">২. সহযোগী সদস্য: <span class="note-text">**দাওয়াত ও তাবলীগের 'ক' এর অধীনে উল্লেখিত সকল সহযোগী সদস্যের সংখ্যা এ ছকে সর্বমোট সহযোগী সদস্যের ঘরে বসাতে হবে।</span></p>
<table class="border-table">
  <tr>
    <td class="text-left">সহযোগী</td>
    <td>বিগত সময়ের সংখ্যা</td>
    <td>বর্তমান সংখ্যা</td>
    <td>বৃদ্ধি</td>
    <td>টার্গেট</td>
    <td>বাস্তবায়নের হার</td>
  </tr>
  <tr>
    <td class="text-left">মোট সহযোগী সদস্য (পুরুষ)</td>
    <td>{{associateMalePrev}}</td>
    <td>{{associateMaleCurrent}}</td>
    <td>{{associateMaleIncrease}}</td>
    <td>{{associateMaleTarget}}</td>
    <td>{{associateMaleProgress}}</td>
  </tr>
  <tr>
    <td class="text-left">মোট সহযোগী সদস্য (মহিলা)</td>
    <td>{{associateFemalePrev}}</td>
    <td>{{associateFemaleCurrent}}</td>
    <td>{{associateFemaleIncrease}}</td>
    <td>{{associateFemaleTarget}}</td>
    <td>{{associateFemaleProgress}}</td>
  </tr>
  <tr>
    <td class="text-left">সর্বমোট সহযোগী সদস্য সংখ্যা**</td>
    <td>{{associateTotalPrev}}</td>
    <td>{{associateTotalCurrent}}</td>
    <td>{{associateTotalIncrease}}</td>
    <td>{{associateTotalTarget}}</td>
    <td>{{associateTotalProgress}}</td>
  </tr>
</table>
<p class="c13 c11 note-text">*সদস্য (রুকন) ঘাটতির ক্ষেত্রে স্থানান্তর, ইন্তেকাল, বাতিল, ইস্তফা ও বিদেশ গমন সংখ্যার হিসাব আলাদাভাবে সংরক্ষণ করে মোট সংখ্যাটি এ ঘরে বসাতে হবে এবং একসদস্যের তালিকা ঊর্ধ্বতন সংগঠনে জমা দিতে হবে।</p>

<p class="c13 c11 section-title">৩. বিভাগ ভিত্তিক তথ্য:</p>
<table class="border-table">
  <tr>
    <td style="width:15%">বিভাগসমূহ</td>
    <td style="width:15%">জনশক্তির ধরণ</td>
    <td style="width:14%">বিগত সময়ের সংখ্যা</td>
    <td style="width:14%">বর্তমান সংখ্যা</td>
    <td style="width:14%">বৃদ্ধি</td>
    <td style="width:14%">ঘাটতি</td>
    <td style="width:14%">টার্গেট</td>
  </tr>

  <tr>
    <td rowspan="3">শ্রম*</td>
    <td class="text-left">সদস্য (রুকন)</td>
    <td>{{laborRokonPrevious}}</td>
    <td>{{laborRokonCurrent}}</td>
    <td>{{laborRokonIncrease}}</td>
    <td>{{laborRokonDeficit}}</td>
    <td>{{laborRokonTarget}}</td>
  </tr>
  <tr>
    <td class="text-left">কর্মী</td>
    <td>{{laborKarmiPrevious}}</td>
    <td>{{laborKarmiCurrent}}</td>
    <td>{{laborKarmiIncrease}}</td>
    <td>{{laborKarmiDeficit}}</td>
    <td>{{laborKarmiTarget}}</td>
  </tr>
  <tr>
    <td class="text-left">সহযোগী সদস্য</td>
    <td>{{laborAssociatePrevious}}</td>
    <td>{{laborAssociateCurrent}}</td>
    <td>{{laborAssociateIncrease}}</td>
    <td>{{laborAssociateDeficit}}</td>
    <td>{{laborAssociateTarget}}</td>
  </tr>
  <tr>
    <td rowspan="3">উলামা</td>
    <td class="text-left">সদস্য (রুকন)</td>
    <td>{{ulamaRokonPrevious}}</td>
    <td>{{ulamaRokonCurrent}}</td>
    <td>{{ulamaRokonIncrease}}</td>
    <td>{{ulamaRokonDeficit}}</td>
    <td>{{ulamaRokonTarget}}</td>
  </tr>
  <tr>
    <td class="text-left">কর্মী</td>
    <td>{{ulamaKarmiPrevious}}</td>
    <td>{{ulamaKarmiCurrent}}</td>
    <td>{{ulamaKarmiIncrease}}</td>
    <td>{{ulamaKarmiDeficit}}</td>
    <td>{{ulamaKarmiTarget}}</td>
  </tr>
  <tr>
    <td class="text-left">সহযোগী সদস্য</td>
    <td>{{ulamaAssociatePrevious}}</td>
    <td>{{ulamaAssociateCurrent}}</td>
    <td>{{ulamaAssociateIncrease}}</td>
    <td>{{ulamaAssociateDeficit}}</td>
    <td>{{ulamaAssociateTarget}}</td>
  </tr>
  <tr>
    <td rowspan="3">পেশাজীবী</td>
    <td class="text-left">সদস্য (রুকন)</td>
    <td>{{proRokonPrevious}}</td>
    <td>{{proRokonCurrent}}</td>
    <td>{{proRokonIncrease}}</td>
    <td>{{proRokonDeficit}}</td>
    <td>{{proRokonTarget}}</td>
  </tr>
  <tr>
    <td class="text-left">কর্মী</td>
    <td>{{proKarmiPrevious}}</td>
    <td>{{proKarmiCurrent}}</td>
    <td>{{proKarmiIncrease}}</td>
    <td>{{proKarmiDeficit}}</td>
    <td>{{proKarmiTarget}}</td>
  </tr>
  <tr>
    <td class="text-left">সহযোগী সদস্য</td>
    <td>{{proAssociatePrevious}}</td>
    <td>{{proAssociateCurrent}}</td>
    <td>{{proAssociateIncrease}}</td>
    <td>{{proAssociateDeficit}}</td>
    <td>{{proAssociateTarget}}</td>
  </tr>
  <tr>
    <td rowspan="3">যুব</td>
    <td class="text-left">সদস্য (রুকন)</td>
    <td>{{youthRokonPrevious}}</td>
    <td>{{youthRokonCurrent}}</td>
    <td>{{youthRokonIncrease}}</td>
    <td>{{youthRokonDeficit}}</td>
    <td>{{youthRokonTarget}}</td>
  </tr>
  <tr>
    <td class="text-left">কর্মী</td>
    <td>{{youthKarmiPrevious}}</td>
    <td>{{youthKarmiCurrent}}</td>
    <td>{{youthKarmiIncrease}}</td>
    <td>{{youthKarmiDeficit}}</td>
    <td>{{youthKarmiTarget}}</td>
  </tr>
  <tr>
    <td class="text-left">সহযোগী সদস্য</td>
    <td>{{youthAssociatePrevious}}</td>
    <td>{{youthAssociateCurrent}}</td>
    <td>{{youthAssociateIncrease}}</td>
    <td>{{youthAssociateDeficit}}</td>
    <td>{{youthAssociateTarget}}</td>
  </tr>
  <tr>
    <td rowspan="3">ভিন্নধর্মাবলম্বী</td>
    <td class="text-left">সদস্য (রুকন)</td>
    <td>{{nonMuslimRokonPrevious}}</td>
    <td>{{nonMuslimRokonCurrent}}</td>
    <td>{{nonMuslimRokonIncrease}}</td>
    <td>{{nonMuslimRokonDeficit}}</td>
    <td>{{nonMuslimRokonTarget}}</td>
  </tr>
  <tr>
    <td class="text-left">কর্মী</td>
    <td>{{nonMuslimKarmiPrevious}}</td>
    <td>{{nonMuslimKarmiCurrent}}</td>
    <td>{{nonMuslimKarmiIncrease}}</td>
    <td>{{nonMuslimKarmiDeficit}}</td>
    <td>{{nonMuslimKarmiTarget}}</td>
  </tr>
  <tr>
    <td class="text-left">সহযোগী সদস্য</td>
    <td>{{nonMuslimAssociatePrevious}}</td>
    <td>{{nonMuslimAssociateCurrent}}</td>
    <td>{{nonMuslimAssociateIncrease}}</td>
    <td>{{nonMuslimAssociateDeficit}}</td>
    <td>{{nonMuslimAssociateTarget}}</td>
  </tr>
</table>

<!-- PAGE 4 BEGINS HERE -->
<p class="c13 c11 section-title">৪. সাংগঠনিক কাঠামো*:</p>
<table class="border-table">
  <tr>
    <td class="text-left">সংগঠনের ধরন</td>
    <td>বিগত সময়ের সংখ্যা</td>
    <td>বর্তমান সংখ্যা</td>
    <td>বৃদ্ধি</td>
    <td>ঘাটতি</td>
    <td>টার্গেট</td>
    <td>বাস্তবায়নের হার</td>
  </tr>
  <tr><td class="text-left">সাধারণ ওয়ার্ড সংগঠন (পুরুষ)</td><td>{{unitOrgGeneralMalePrevious}}</td><td>{{unitOrgGeneralMaleCurrent}}</td><td>{{unitOrgGeneralMaleIncrease}}</td><td>{{unitOrgGeneralMaleDeficit}}</td><td>{{unitOrgGeneralMaleTarget}}</td><td>{{unitOrgGeneralMaleRate}}%</td></tr>
  <tr><td class="text-left">উলামা ওয়ার্ড সংগঠন</td><td>{{unitOrgUlamaPrevious}}</td><td>{{unitOrgUlamaCurrent}}</td><td>{{unitOrgUlamaIncrease}}</td><td>{{unitOrgUlamaDeficit}}</td><td>{{unitOrgUlamaTarget}}</td><td>{{unitOrgUlamaRate}}%</td></tr>
  <tr><td class="text-left">ব্যবসায়ী ওয়ার্ড সংগঠন</td><td>{{unitOrgBusinessPrevious}}</td><td>{{unitOrgBusinessCurrent}}</td><td>{{unitOrgBusinessIncrease}}</td><td>{{unitOrgBusinessDeficit}}</td><td>{{unitOrgBusinessTarget}}</td><td>{{unitOrgBusinessRate}}%</td></tr>
  <tr><td class="text-left">শ্রমিক কল্যাণ ওয়ার্ড সংগঠন</td><td>{{unitOrgLaborWelfarePrevious}}</td><td>{{unitOrgLaborWelfareCurrent}}</td><td>{{unitOrgLaborWelfareIncrease}}</td><td>{{unitOrgLaborWelfareDeficit}}</td><td>{{unitOrgLaborWelfareTarget}}</td><td>{{unitOrgLaborWelfareRate}}%</td></tr>
  <tr><td class="text-left">যুব ওয়ার্ড সংগঠন</td><td>{{unitOrgYouthPrevious}}</td><td>{{unitOrgYouthCurrent}}</td><td>{{unitOrgYouthIncrease}}</td><td>{{unitOrgYouthDeficit}}</td><td>{{unitOrgYouthTarget}}</td><td>{{unitOrgYouthRate}}%</td></tr>
  <tr><td class="text-left">মিডিয়া ওয়ার্ড সংগঠন</td><td>{{unitOrgMediaPrevious}}</td><td>{{unitOrgMediaCurrent}}</td><td>{{unitOrgMediaIncrease}}</td><td>{{unitOrgMediaDeficit}}</td><td>{{unitOrgMediaTarget}}</td><td>{{unitOrgMediaRate}}%</td></tr>
  <tr><td class="text-left">সাহিত্য ও সংস্কৃতি ওয়ার্ড সংগঠন</td><td>{{unitOrgCulturePrevious}}</td><td>{{unitOrgCultureCurrent}}</td><td>{{unitOrgCultureIncrease}}</td><td>{{unitOrgCultureDeficit}}</td><td>{{unitOrgCultureTarget}}</td><td>{{unitOrgCultureRate}}%</td></tr>
  <tr style="font-weight:bold;"><td class="text-right">সর্বমোট ওয়ার্ড সংখ্যা</td><td>{{unitOrgTotalPrevious}}</td><td>{{unitOrgTotalCurrent}}</td><td>{{unitOrgTotalIncrease}}</td><td>{{unitOrgTotalDeficit}}</td><td>{{unitOrgTotalTarget}}</td><td>{{unitOrgTotalRate}}%</td></tr>
</table>

<p class="c13 c11 section-title">৫. দাওয়াতি ও পারিবারিক ওয়ার্ড: <span class="note-text">*দাওয়াতি ওয়ার্ড ও পারিবারিক ওয়ার্ডের সংখ্যা মোট সাংগঠনিক ওয়ার্ডে অন্তর্ভুক্ত হবে না।</span></p>
<table class="border-table">
  <tr><td class="text-left">ওয়ার্ডের ধরন</td><td>বিগত সময়ের সংখ্যা</td><td>বর্তমান সংখ্যা</td><td>বৃদ্ধি</td><td>ঘাটতি</td><td>টার্গেট</td></tr>
  <tr><td class="text-left">মোট দাওয়াতি ওয়ার্ড</td><td>{{dawahUnitPrevious}}</td><td>{{dawahUnitCurrent}}</td><td>{{dawahUnitIncrease}}</td><td>{{dawahUnitDeficit}}</td><td>{{dawahUnitTarget}}</td></tr>
  <tr><td class="text-left">মোট পারিবারিক ওয়ার্ড</td><td>{{familyUnitPrevious}}</td><td>{{familyUnitCurrent}}</td><td>{{familyUnitIncrease}}</td><td>{{familyUnitDeficit}}</td><td>{{familyUnitTarget}}</td></tr>
</table>

<p class="c13 c11 section-title">৬. বিদায়ী ছাত্র-ছাত্রী জনশক্তির সংগঠনে যোগদান:</p>
<table class="border-table">
  <tr><td class="text-left">বিবরণ</td><td>সদস্য/সদস্যা</td><td>সাথী/অগ্রসর কর্মী</td><td>কর্মী/কর্মী(ছাত্রী)</td></tr>
  <tr><td class="text-left">মোট যোগদানকৃত ছাত্র/ছাত্রী সংখ্যা</td><td>{{studentJoiningRokon}}</td><td>{{studentJoiningCompanion}}</td><td>{{studentJoiningKarmi}}</td></tr>
</table>

<p class="c13 c11 section-title">৭. সফর:</p>
<table class="border-table">
  <tr>
    <td class="text-left" style="width:40%">উর্ধ্বতন দায়িত্বশীল</td><td style="width:10%">{{safarHigherAuthority}}</td>
    <td class="text-left" style="width:40%">থানা সভাপতি</td><td style="width:10%">{{safarWardPresident}}</td>
  </tr>
  <tr>
    <td class="text-left">থানা টিম সদস্য</td><td>{{safarTeamMember}}</td>
    <td colspan="2" style="border:none;"></td>
  </tr>
</table>

<p class="c13 c11 section-title">৮. ইয়ানত দাতা:</p>
<table class="border-table">
  <tr>
    <td class="text-left" style="width:40%">নতুন ইয়ানত দাতা</td><td style="width:30%">মোট সংখ্যা</td><td style="width:30%">অর্থের পরিমাণ</td>
  </tr>
  <tr>
    <td class="text-left">সহযোগী সদস্য/সুধী</td><td>{{donorNewCount}}</td><td>{{donorAmount}}</td>
  </tr>
</table>

<!-- PAGE 5 BEGINS HERE -->
<p class="c13 c11 section-title">৯. সাংগঠনিক বৈঠকাদি:</p>
<table class="border-table">
  <tr>
    <td style="width:5%">ক্র</td>
    <td style="width:45%" class="text-left">বৈঠকের ধরণ</td>
    <td style="width:20%">সংখ্যা</td>
    <td style="width:10%">টার্গেট</td>
    <td style="width:20%">গড় উপস্থিতি</td>
  </tr>
  <tr>
    <td>১.</td>
    <td class="text-left">থানা টিম বৈঠক</td>
    <td>{{meetingWardTeamCount}}</td>
    <td>{{meetingWardTeamTarget}}</td>
    <td>{{meetingWardTeamAttendance}}</td>
  </tr>
  <tr>
    <td>২.</td>
    <td class="text-left">থানা বৈঠক (ওয়ার্ড দায়িত্বশীল সভা)</td>
    <td>{{meetingWardCount}}</td>
    <td>{{meetingWardTarget}}</td>
    <td>{{meetingWardAttendance}}</td>
  </tr>
  <tr>
    <td>৩.</td>
    <td class="text-left">থানাভিত্তিক মাসিক সদস্য (রুকন) বৈঠক</td>
    <td>{{meetingRokonCount}}</td>
    <td>{{meetingRokonTarget}}</td>
    <td>{{meetingRokonAttendance}}</td>
  </tr>
  <tr>
    <td>৪.</td>
    <td class="text-left">ওয়ার্ডে কর্মী বৈঠক/পারিবারিক বৈঠক</td>
    <td>{{meetingKarmiCount}}</td>
    <td>{{meetingKarmiTarget}}</td>
    <td>{{meetingKarmiAttendance}}</td>
  </tr>
  <tr>
    <td>৫.</td>
    <td class="text-left">থানা পর্যায়ে কর্মী সম্মেলন</td>
    <td>{{meetingKarmiConferenceCount}}</td>
    <td>{{meetingKarmiConferenceTarget}}</td>
    <td>{{meetingKarmiConferenceAttendance}}</td>
  </tr>
  <tr>
    <td>৬.</td>
    <td class="text-left">উলামা/যুব/শ্রমিক বৈঠক/সমাবেশ</td>
    <td>{{meetingDeptMeetingCount}}</td>
    <td>{{meetingDeptMeetingTarget}}</td>
    <td>{{meetingDeptMeetingAttendance}}</td>
  </tr>
  <tr>
    <td>৭.</td>
    <td class="text-left">সহযোগী সদস্য সমাবেশ/সম্মেলন</td>
    <td>{{meetingAssociateCount}}</td>
    <td>{{meetingAssociateTarget}}</td>
    <td>{{meetingAssociateAttendance}}</td>
  </tr>
  <tr>
    <td>৮.</td>
    <td class="text-left">সক্রিয় সহযোগী সদস্য সমাবেশ</td>
    <td>{{meetingActiveAssociateGatheringCount}}</td>
    <td>{{meetingActiveAssociateGatheringTarget}}</td>
    <td>{{meetingActiveAssociateGatheringAttendance}}</td>
  </tr>
  <tr>
    <td>৯.</td>
    <td class="text-left">অন্যান্য</td>
    <td>{{meetingOthersCount}}</td>
    <td>{{meetingOthersTarget}}</td>
    <td>{{meetingOthersAttendance}}</td>
  </tr>
</table>
<p class="c13 c11 section-title">১০. প্রশিক্ষণ :</p>
<p class="c13 c11 section-title">ক) তারবিয়াত (নৈতিক শিক্ষা ও সাংগঠনিক প্রশিক্ষণ):</p>
<table class="border-table">
  <tr>
    <td rowspan="2" style="width:5%">ক্র.</td>
    <td rowspan="2" style="width:45%" class="text-left">প্রোগ্রামের ধরন</td>
    <td colspan="1" style="width:20%">মোট সংখ্যা</td>
    <td rowspan="2" style="width:10%">টার্গেট</td>
    <td colspan="1" style="width:20%">গড় উপস্থিতি</td>
  </tr>
  <tr>
    <td></td><td></td>
  </tr>
  <tr>
    <td>১.</td>
    <td class="text-left">থানাভিত্তিক দায়িত্বশীল শিক্ষাশিবির/শিক্ষা বৈঠক</td>
    <td>{{trainingTarbiyat_higherTarbiyat_Count}}</td>
    <td>{{trainingTarbiyat_higherTarbiyat_Target}}</td>
    <td>{{trainingTarbiyat_higherTarbiyat_Avg}}</td>
  </tr>
  <tr>
    <td>২.</td>
    <td class="text-left">থানাভিত্তিক সাধারণ শিক্ষাশিবির/শিক্ষা বৈঠক</td>
    <td>{{trainingTarbiyat_publicTarbiyat_Count}}</td>
    <td>{{trainingTarbiyat_publicTarbiyat_Target}}</td>
    <td>{{trainingTarbiyat_publicTarbiyat_Avg}}</td>
  </tr>
  <tr>
    <td>৩.</td>
    <td class="text-left">ওয়ার্ড তারবিয়াতী বৈঠক</td>
    <td>{{trainingTarbiyat_wardTarbiyat_Count}}</td>
    <td>{{trainingTarbiyat_wardTarbiyat_Target}}</td>
    <td>{{trainingTarbiyat_wardTarbiyat_Avg}}</td>
  </tr>
  <tr>
    <td>৪.</td>
    <td class="text-left">ইউনিট তারবিয়াতী বৈঠক</td>
    <td>{{trainingTarbiyat_unitTarbiyat_Count}}</td>
    <td>{{trainingTarbiyat_unitTarbiyat_Target}}</td>
    <td>{{trainingTarbiyat_unitTarbiyat_Avg}}</td>
  </tr>
  <tr>
    <td>৫.</td>
    <td class="text-left">ওয়ার্ড/থানাভিত্তিক কুরআন দারস প্রোগ্রাম</td>
    <td colspan="3">প্রোগ্রাম সংখ্যা: {{trainingTarbiyat_quranDars_Program}}</td>
  </tr>
  <tr>
    <td>৬.</td>
    <td class="text-left">ওয়ার্ড/থানাভিত্তিক আলোচনা চক্র</td>
    <td colspan="2">গ্রুপ: {{trainingTarbiyat_discussionCircle_Group}}</td>
    <td>অধিবেশন: {{trainingTarbiyat_discussionCircle_Session}}</td>
  </tr>
  <tr>
    <td>৭.</td>
    <td class="text-left">অন্যান্য</td>
    <td>{{trainingTarbiyat_others_Count}}</td>
    <td>{{trainingTarbiyat_others_Target}}</td>
    <td>{{trainingTarbiyat_others_Avg}}</td>
  </tr>
</table>

<p class="c13 c11 section-title">খ) মানবসম্পদ উন্নয়ন</p>
<table class="border-table">
  <tr>
    <td style="width:5%">ক্র</td>
    <td style="width:35%" class="text-left">প্রশিক্ষণ কোর্সের নাম</td>
    <td style="width:20%">পরিচালিত কোর্স সংখ্যা</td>
    <td style="width:20%">মোট উপস্থিতি</td>
    <td style="width:20%">কোর্স সম্পন্নকারী সংখ্যা</td>
  </tr>
  <tr>
    <td>১.</td>
    <td class="text-left">দাওয়াহ</td>
    <td>{{trainingHRD_dawah_Conducted}}</td>
    <td>{{trainingHRD_dawah_Total}}</td>
    <td>{{trainingHRD_dawah_Completed}}</td>
  </tr>
  <tr>
    <td>২.</td>
    <td class="text-left">মিডিয়া</td>
    <td>{{trainingHRD_media_Conducted}}</td>
    <td>{{trainingHRD_media_Total}}</td>
    <td>{{trainingHRD_media_Completed}}</td>
  </tr>
  <tr>
    <td>৩.</td>
    <td class="text-left">সমাজকর্ম</td>
    <td>{{trainingHRD_social_Conducted}}</td>
    <td>{{trainingHRD_social_Total}}</td>
    <td>{{trainingHRD_social_Completed}}</td>
  </tr>
  <tr>
    <td>৪.</td>
    <td class="text-left">অর্থ/হিসাবরক্ষণ</td>
    <td>{{trainingHRD_finance_Conducted}}</td>
    <td>{{trainingHRD_finance_Total}}</td>
    <td>{{trainingHRD_finance_Completed}}</td>
  </tr>
  <tr>
    <td>৫.</td>
    <td class="text-left">আরবি ভাষা শিক্ষা</td>
    <td>{{trainingHRD_arabic_Conducted}}</td>
    <td>{{trainingHRD_arabic_Total}}</td>
    <td>{{trainingHRD_arabic_Completed}}</td>
  </tr>
  <tr>
    <td>৬.</td>
    <td class="text-left">ইংরেজি ভাষা শিক্ষা</td>
    <td>{{trainingHRD_english_Conducted}}</td>
    <td>{{trainingHRD_english_Total}}</td>
    <td>{{trainingHRD_english_Completed}}</td>
  </tr>
  <tr>
    <td>৭.</td>
    <td class="text-left">আইটি/আইসিটি শিক্ষা</td>
    <td>{{trainingHRD_it_Conducted}}</td>
    <td>{{trainingHRD_it_Total}}</td>
    <td>{{trainingHRD_it_Completed}}</td>
  </tr>
  <tr>
    <td>৮.</td>
    <td class="text-left">ট্রেডভিত্তিক কারিগরি প্রশিক্ষণ</td>
    <td>{{trainingHRD_technical_Conducted}}</td>
    <td>{{trainingHRD_technical_Total}}</td>
    <td>{{trainingHRD_technical_Completed}}</td>
  </tr>
  <tr>
    <td>৯.</td>
    <td class="text-left">অন্যান্য</td>
    <td>{{trainingHRD_others_Conducted}}</td>
    <td>{{trainingHRD_others_Total}}</td>
    <td>{{trainingHRD_others_Completed}}</td>
  </tr>
</table>
<p class="c13 c11 note-text">* ট্রেডভিত্তিক কারিগরি প্রশিক্ষণ কোর্সের আওতায় ফার্মিং, (পোল্ট্রি, ফিশারিজ, ডেইরি) সেলাই/এমব্রয়ডারী মেশিন অপারেটর, ড্রাইভিং কাম অটোমেকানিক, রন্ধন শিল্প, হর্টিকালচার/নার্সারী তাঁত শিল্প/বুটিকস, হস্ত শিল্প, ইলেকট্রিক্যাল এন্ড ইলেকট্রনিক্স সার্ভিসিং, সিভিল কন্সট্রাকশন/প্লাম্বারিং, আমিনশীপ ইত্যাদি কোর্স সমূহের বাস্তবায়ন রিপোর্টের যোগফল এখানে বসাতে হবে।</p>

<p class="c13 c11 section-title">৪. সমাজ সংস্কার ও সমাজ সেবাঃ</p>

<p class="c13 c11 section-title">১. ব্যক্তিগত উদ্যোগে সামাজিক কাজ:</p>
<table class="border-table">
  <tr>
    <td class="text-left" style="width:50%">মোট ব্যক্তিগত উদ্যোগে সামাজিক কাজ করেছেন</td>
    <td style="width:15%">{{socialPersonalCount}}</td>
    <td class="text-left" style="width:20%">মোট সেবাপ্রাপ্ত সংখ্যা</td>
    <td style="width:15%">{{socialPersonalServiceCount}}</td>
  </tr>
</table>

<p class="c13 c11 section-title">২. সামষ্টিক/সেবা টীমের মাধ্যমে সামাজিক কাজ:</p>
<table class="border-table">
  <tr>
    <td style="width:33%">সাধারণ সেবা টীম সংখ্যা</td>
    <td style="width:33%">টেকনিক্যাল সেবা টীম সংখ্যা</td>
    <td style="width:34%">স্বেচ্ছাসেবক টীম সংখ্যা</td>
  </tr>
  <tr>
    <td>{{socialGeneralServiceTeamCount}}</td>
    <td>{{socialTechnicalServiceTeamCount}}</td>
    <td>{{socialVolunteerTeamCount}}</td>
  </tr>
</table>

<table class="border-table">
  <tr>
    <td style="width:35%" class="text-left">বিবরণ</td>
    <td style="width:15%">সংখ্যা</td>
    <td style="width:35%" class="text-left">বিবরণ</td>
    <td style="width:15%">সংখ্যা</td>
  </tr>
  <tr>
    <td class="text-left">ছোট-ছোট উন্নয়নমূলক কাজ</td><td>{{socialDevWork}}</td>
    <td class="text-left">শিক্ষা সহায়তা প্রদান (মোট কে)</td><td>{{socialEducation}}</td>
  </tr>
  <tr>
    <td class="text-left">সামাজিক অনুষ্ঠানে অংশগ্রহণ/সহায়তা প্রদান (মোট সংখ্যা/কে)</td><td>{{socialSocialEvent}}</td>
    <td class="text-left">টেকনিক্যাল সেবা প্রদান (মোট /কে)</td><td>{{socialTechnical}}</td>
  </tr>
  <tr>
    <td class="text-left">মানবিগত সহায়তা / কর্জে হাসানা প্রদান (মোট কে)</td><td>{{socialHumanitarian}}</td>
    <td class="text-left">অনলাইনের মাধ্যমে সেবা প্রদান (মোট কে)</td><td>{{socialOnline}}</td>
  </tr>
  <tr>
    <td class="text-left">পরিস্কার-পরিচ্ছন্নতা/মশক নিধন অভিযান (মোট /সংখ্যা)</td><td>{{socialCleaning}}</td>
    <td class="text-left">বৃক্ষরোপন (মোট )</td><td>{{socialTrees}}</td>
  </tr>
  <tr>
    <td class="text-left">রোগীর পরিচর্চা / চিকিৎসা সহায়তা প্রদান (মোট কে)</td><td>{{socialMedical}}</td>
    <td class="text-left">জনসচেতনতামূলক প্রোগ্রাম (মোট )</td><td>{{socialAwareness}}</td>
  </tr>
  <tr>
    <td class="text-left">স্বেচ্ছায় রক্ত দান (মোট /কে)</td><td>{{socialBlood}}</td>
    <td class="text-left">দূর্যোগকালীন সহায়তা প্রদান (মোট কে)</td><td>{{socialDisaster}}</td>
  </tr>
  <tr>
    <td class="text-left">মাতৃত্বকালীন সময়ে সেবা প্রদান (মোট কে)</td><td>{{socialMaternity}}</td>
    <td class="text-left">ত্রাণ বিতরণ (মোট কে)/ গোশত ভিতরন</td><td>{{socialRelief}}</td>
  </tr>
  <tr>
    <td class="text-left">নবজাতক গিফ্ট প্রদান (মোট কে)</td><td>{{socialNewborn}}</td>
    <td class="text-left">ভিন্নধর্মাবলম্বীদের সেবা প্রদান (মোট /কে)</td><td>{{socialNonMuslim}}</td>
  </tr>
  <tr>
    <td class="text-left">ভ্রাম্যমান স্কুল/মক্তব চালু (মোট )</td><td>{{socialMaktub}}</td>
    <td class="text-left">মাইয়্যেতের গোসল (কে)/জানাযায় অংশগ্রহণ (মোট )</td><td>{{socialBurial}}</td>
  </tr>
  <tr>
    <td class="text-left">অন্যান্য (বিস্তারিত আলাদা কাগজে দেয়া যাবে)</td><td>{{socialOthers}}</td>
    <td class="text-left">স্বল্প পুঁজিতে কর্মসংস্ঠানের সহায়তা (কে)</td><td>{{socialEmployment}}</td>
  </tr>
</table>

<p class="c13 c11 section-title">৩. স্বাস্থ্য ও পরিবার কল্যাণমূলক কাজ:</p>
<table class="border-table">
  <tr>
    <td class="text-left" style="width:33%">স্বাস্থ্যকর্মী প্রশিক্ষণ প্রোগ্রামে মোট অংশগ্রহণকারী সংখ্যা</td>
    <td class="text-left" style="width:33%">স্বাস্থ্যসেবা কাজে অংশগ্রহণ করেছেন</td>
    <td class="text-left" style="width:34%">সেবাপ্রাপ্ত সংখ্যা</td>
  </tr>
  <tr>
    <td>{{socialHealthTrainingCount}}</td>
    <td>{{socialHealthServiceCount}}</td>
    <td>{{socialHealthBeneficiaryCount}}</td>
  </tr>
</table>

<p class="c13 c11 section-title">৪. প্রাতিষ্ঠানিক উদ্যোগে সামাজিক কাজ:</p>
<table class="border-table">
  <tr>
    <td class="text-left" style="width:33%">সামাজিক প্রতিষ্ঠান রয়েছে</td>
    <td class="text-left" style="width:33%">প্রতিষ্ঠানে সামাজিক কাজ হয়েছে</td>
    <td class="text-left" style="width:34%">নতুন সামাজিক প্রতিষ্ঠান চারু করা হয়েছে(প্রযোজ্য ক্ষেত্রে)</td>
  </tr>
  <tr>
    <td>{{socialInstTotalCount}}</td>
    <td>{{socialInstActiveCount}}</td>
    <td>{{socialInstNewCount}}</td>
  </tr>
</table>

<p class="c13 c11 section-title">রাষ্ট্রীয় সংস্কার ও সংশোধন :</p>
<p class="c13 c11 section-title">১. রাজনৈতিক ও প্রশাসনিক যোগাযোগ:</p>
<table class="border-table">
  <tr>
    <td class="text-left" style="width:33%">যোগাযোগের ধরন</td>
    <td style="width:33%">মোট যোগাযোগ করেছেন</td>
    <td style="width:34%">মোট ের সাথে যোগাযোগ হয়েছে</td>
  </tr>
  <tr><td class="text-left">রাজনৈতিক ব্যক্তিবর্গ</td><td>{{politicalCommPoliticalCount}}</td><td>{{politicalCommPoliticalReached}}</td></tr>
  <tr><td class="text-left">প্রশাসনিক ব্যক্তিবর্গ</td><td>{{politicalCommAdminCount}}</td><td>{{politicalCommAdminReached}}</td></tr>
</table>

<p class="c13 c11 section-title">২. কর্মসূচী বাস্তবায়ন:</p>
<table class="border-table">
  <tr>
    <td class="text-left" style="width:40%">কর্মসূচীর বিবরণ</td>
    <td style="width:30%">মোট সংখ্যা</td>
    <td style="width:30%">গড় উপস্থিতি</td>
  </tr>
  <tr><td class="text-left">কেন্দ্র ঘোষিত রাজনৈতিক কর্মসূচী পালন</td><td>{{politicalProgCentralCount}}</td><td>{{politicalProgCentralAttendance}}</td></tr>
  <tr><td class="text-left">স্থানীয়ভাবে ঘোষিত কর্মসূচী: জনসভা/সমাবেশ/মিছিল</td><td>{{politicalProgLocalCount}}</td><td>{{politicalProgLocalAttendance}}</td></tr>
  <tr>
    <td class="text-left">পোস্টার/লিফলেট/বুকলেট/স্মারকলিপি বিতরণ</td>
    <td class="text-left">{{politicalProgDistributionCount}}</td>
    <td class="text-left">অন্যান্য - {{politicalProgDistributionAttendance}}</td>
  </tr>
</table>

<p class="c13 c11 section-title">৩. জাতীয় ও আন্তর্জাতিক দিবস পালন</p>
<table class="border-table">
  <tr>
    <td class="text-left" style="width:25%">দিবসসমূহ</td>
    <td style="width:12%">মোট প্রোগ্রাম সংখ্যা</td>
    <td style="width:13%">গড় উপস্থিতি</td>
    <td class="text-left" style="width:25%">দিবসসমূহ</td>
    <td style="width:12%">মোট প্রোগ্রাম সংখ্যা</td>
    <td style="width:13%">গড় উপস্থিতি</td>
  </tr>
  <tr>
    <td class="text-left">স্বাধীনতা ও জাতীয় দিবস</td><td>{{dayIndependenceDayCount}}</td><td>{{dayIndependenceDayAttendance}}</td>
    <td class="text-left">আন্তর্জাতিক মাতৃভাষা দিবস</td><td>{{dayMotherLanguageDayCount}}</td><td>{{dayMotherLanguageDayAttendance}}</td>
  </tr>
  <tr>
    <td class="text-left">বিজয় দিবস</td><td>{{dayVictoryDayCount}}</td><td>{{dayVictoryDayAttendance}}</td>
    
  </tr>
  <tr>
    <td class="text-left">অন্যান্য (বিস্তারিত আলাদা কাগজে দেয়া যাবে) বদর</td><td>{{dayOthersCount}}</td><td>{{dayOthersAttendance}}</td>
    
  </tr>
</table>

<p class="c13 c11 section-title">৪. জাতীয় ও স্থানীয় নির্বাচনভিত্তিক কার্যক্রম:</p>
<table class="border-table">
  <tr>
    <td class="text-left" style="width:40%">নির্বাচনের ধরন</td>
    <td style="width:20%">মোট প্রার্থী সংখ্যা</td>
    <td style="width:20%">নির্বাচিত সংখ্যা</td>
    <td style="width:20%">দ্বিতীয় অবস্থান</td>
  </tr>
  <tr>
    <td class="text-left">কাউন্সিলর</td>
    <td>{{electionCouncilorCandidateCount}}</td>
    <td>{{electionCouncilorElectedCount}}</td>
    <td>{{electionCouncilorSecondPlaceCount}}</td>
  </tr>
</table>

<table class="border-table">
  <tr>
    <td class="text-left" style="width:40%">প্রস্তুতিমূলক কার্যক্রমের ধরন</td>
    <td style="width:20%">সংখ্যা</td>
    <td style="width:20%">বৃদ্ধি</td>
    <td style="width:20%">টার্গেট</td>
  </tr>
  <tr>
    <td class="text-left">ভোট কেন্দ্র (জাতীয়/স্থানীয়)</td>
    <td>{{electionVoteCenterCount}}</td>
    <td>{{electionVoteCenterIncrease}}</td>
    <td>{{electionVoteCenterTarget}}</td>
  </tr>
  <tr>
    <td class="text-left">ভোট কেন্দ্র কমিটি/কেন্দ্র/বুথভিত্তিক ইউনিট</td>
    <td>{{electionVoteCenterCommitteeCount}}</td>
    <td>{{electionVoteCenterCommitteeIncrease}}</td>
    <td>{{electionVoteCenterCommitteeTarget}}</td>
  </tr>
</table>

<table class="border-table">
  <tr>
    <td class="text-left" style="width:70%">থানা/বিভাগ ও ওয়ার্ডভিত্তিক নির্বাচন পরিচালনা কমিটির বৈঠক সংখ্যা</td>
    <td style="width:30%">{{electionCommitteeMeetingCount}}</td>
  </tr>
</table>



<div style="text-align: center; margin: 20px 0;"><span style="border: 1px solid #000; padding: 5px 20px; font-weight: bold; ;">বায়তুলমাল</span></div>

<p class="c13 c11"><strong>ধার্যকৃত নিসাব: </strong>{{baitulmalDharjoNisab}}</p>
<table class="border-table">
  <tr>
    <td class="text-left" style="width:35%; font-weight:bold;">আয়ের বিবরণ</td>
    <td style="width:15%; font-weight:bold;">পরিমাণ</td>
    <td class="text-left" style="width:35%; font-weight:bold;">ব্যয়ের বিবরণ</td>
    <td style="width:15%; font-weight:bold;">পরিমাণ</td>
  </tr>

  <tr>
    <td class="text-left">প্রাপ্ত নিসাব</td>
    <td class="text-right">{{baitulmalPraptoNisab}}</td>
    <td class="text-left">নিসাব পরিশোধ</td>
    <td class="text-right">{{baitulmalNisabPorishodh}}</td>
  </tr>
  <tr>
    <td class="text-left">সরাসরি ইয়ানত</td>
    <td class="text-right">{{baitulmalSorasoriIyanat}}</td>
    <td class="text-left">এককালীন/ নির্বাচনী ওয়াদা</td>
    <td class="text-right">{{baitulmalOneTimeExpense}}</td>
  </tr>
  <tr>
    <td class="text-left">এককালীন/ নির্বাচনী ওয়াদা</td>
    <td class="text-right">{{baitulmalOneTimeIncome}}</td>
    <td class="text-left">স্থানীয় খরচ</td>
    <td class="text-right">{{baitulmalSthaniyoKhoroch}}</td>
  </tr>
  <tr>
    <td class="text-left">নির্বাচনী ফান্ড</td>
    <td class="text-right">{{baitulmalElectionFundIncome}}</td>
    <td class="text-left">নির্বাচনী ফান্ড</td>
    <td class="text-right">{{baitulmalElectionFundExpense}}</td>
  </tr>
  <tr>
    <td class="text-left">শহীদ ফান্ড</td>
    <td class="text-right">{{baitulmalShahidFundIncome}}</td>
    <td class="text-left">শহীদ ফান্ড</td>
    <td class="text-right">{{baitulmalShahidFundExpense}}</td>
  </tr>
  <tr>
    <td class="text-left">সমাজকল্যাণ</td>
    <td class="text-right">{{baitulmalSocialWorkIncome}}</td>
    <td class="text-left">সমাজকল্যাণ</td>
    <td class="text-right">{{baitulmalSocialWorkExpense}}</td>
  </tr>
  <tr>
    <td class="text-left">প্রতিনিধি সম্মেলন ফী</td>
    <td class="text-right">{{baitulmalDelegateFeeIncome}}</td>
    <td class="text-left">প্রতিনিধি সম্মেলন ফী</td>
    <td class="text-right">{{baitulmalDelegateFeeExpense}}</td>
  </tr>
  <tr>
    <td class="text-left">বন্যা/দূর্যোগ সংগ্রহ</td>
    <td class="text-right">{{baitulmalFloodCollectionIncome}}</td>
    <td class="text-left">বন্যা/দূর্যোগ সংগ্রহ</td>
    <td class="text-right">{{baitulmalFloodCollectionExpense}}</td>
  </tr>
  <tr>
    <td class="text-left">ইফতার</td>
    <td class="text-right">{{baitulmalIftarIncome}}</td>
    <td class="text-left">ইফতার</td>
    <td class="text-right">{{baitulmalIftarExpense}}</td>
  </tr>

  <tr style="font-weight:bold;">
    <td class="text-right">মোট</td>
    <td class="text-right">{{baitulmalTotalIncome}}</td>
    <td class="text-right">মোট</td>
    <td class="text-right">{{baitulmalTotalExpense}}</td>
  </tr>
  <tr style="font-weight:bold;">
    <td class="text-right">গত মাসের উদ্বৃত্ত</td>
    <td class="text-right">{{baitulmalPreviousSurplus}}</td>
    <td class="text-right">এ মাসের উদ্বৃত্ত</td>
    <td class="text-right">{{baitulmalMonthlySurplus}}</td>
  </tr>
  <tr style="font-weight:bold;">
    <td class="text-right">সর্বমোট</td>
    <td class="text-right">{{baitulmalGrandTotalIncome}}</td>
    <td class="text-right">সর্বমোট</td>
    <td class="text-right">{{baitulmalGrandTotalExpense}}</td>
  </tr>
</table>

<p class="c13 c11 section-title">থানা আমীরের মন্তব্য:</p>
<p class="c13 c11" style="line-height: 1.5;">আলহামদুলিল্লাহ, সেশনের আরও একটি সাংগঠনিক মাস মার্চ ২০২৬ অতিক্রম করে রিপোর্টের উপর মন্তব্য লেখার সুযোগ পেয়েছি। পরিকল্পনার আলোকে টার্গেট ভিত্তিক কাজ করার চেষ্টা করা হয়েছে যতটুকু সম্ভব হয়েছে তা আল্লাহ তায়ালার একান্ত মেহেরবানী এবং অবাস্তবায়িত কাজের জন্য আল্লাহ রাব্বুল আলামিনের কাছে ক্ষমা প্রার্থনা করছি। রহমত, মাগফেরাত ও নাজাতের মাস মাহে রমজান ও ঈদুল ফিতর উদযাপনের ফলে সর্বস্তরের জনশক্তি সহ সাধারণ মানুষের মাঝে আল্লাহর ভয় ও সামাজিক সম্প্রীতি পরিলক্ষিত হয়েছে যার ফলশ্রুতিতে কাজের স্পৃহা বৃদ্ধি সহ সংগঠনের ভীত মজবুতীর জন্য আরও সক্রিয় হয়েছে। তবে মূল দায়িত্বশীল সহ জনশক্তির একাংশের কর্মক্ষেত্র কেন্দ্রিক অতি ব্যস্ততা এবং দুর্বলতার কারণও পরিকল্পনা বাস্তবায়নে কম দায়ী নয়। আশার দিক হল দায়িত্বশীল ভাইদের অব্যাহত প্রচেষ্টার ফলে কাজের গতি দিনদিন বৃদ্ধি পাচ্ছে, কম সক্রিয় ইউনিট সমূহ সক্রিয় করার চেষ্টা চলমান। তবে মান-উন্নয়ন সহ গৃহীত পরিকল্পনা বাস্তবায়ন ও পূর্ণ দায়িত্বানুভূতি নিয়ে কাজ করতে পারলে এলাকাটি ইসলামী আন্দোলনের দূর্বার ঘাটিতে পরিণত হবে ইনশাআল্লাহ। উর্ধ্বতন সংগঠনের তত্ত্বাবধান, পরামর্শ ও আল্লাহর সাহায্য ময়দানকে দ্বীনের জন্য আরও মজবুত ও গতিশীল করবে আল্লাহ রাব্বুল আলামিন আমাদের সকল ভুল ত্রুটি ক্ষমা করে তার দ্বীনের জন্য কদমকে মজবুত করে ময়দানে আরও বেশী অগ্রণী ভূমিকা পালন করার তাওফিক দান করুন আমীন।</p>

<div style="margin-top: 50px; text-align: right; ; font-weight: bold;">
  স্বাক্ষর ও তারিখ
</div>

`;

