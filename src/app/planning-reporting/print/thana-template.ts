export const templateStyle = `
body { color: #000; background-color: #fff; font-family: "Noto Serif Bengali"; }
ol{margin:0;padding:0}
table { width: 100% !important; border-collapse: collapse; }
table td, table th {
  padding: 2px 4px !important;
  word-wrap: break-word;
  word-break: break-word;
  white-space: nowrap;
  vertical-align: middle !important;
  font-size: 8pt;
}
.border-table td, .border-table th { border: 1pt solid #000; }
.section-title { font-size: 9pt; font-weight: 600; margin-top: 10px; margin-bottom: 5px; }
.note-text { font-size: 8pt; font-style: italic; font-weight: normal; }
.text-left { text-align: left !important; }
.text-right { text-align: right !important; }
.text-center { text-align: center !important; }
.c13 { text-align: left; }
.c19 { text-align: right; }
.c1 { text-align: center; }
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
  <span class="c3">ক) জনসাধারণের মাঝে সর্বমোট দাওয়াত প্রদান সংখ্যা* : {{totalReachedCount}}        মোট জনসংখ্যা* : {{totalPopulation}}</span><br/>
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
    <td class="text-left">শ্রেণী/পেশার বিবরণ</td>
    <td>মোট ের মাঝে দাওয়াত পৌঁছানো হয়েছে</td>
    <td>মোট সহযোগী সদস্য হয়েছেন</td>
    <td>টার্গেট</td>
    <td>বাস্তবায়নের হার</td>
  </tr>
  <tr>
    <td class="text-left">রাজনৈতিক ও বিশিষ্ট ব্যক্তিবর্গ (পু/ম)</td>
    <td>{{dawahPoliticalReached}}</td>
    <td>{{dawahPoliticalAssociate}}</td>
    <td>{{dawahPoliticalTarget}}</td>
    <td>{{dawahPoliticalProgress}}</td>
  </tr>
  <tr>
    <td class="text-left">পেশাজীবী (পু/ম)</td>
    <td>{{dawahProfessionalReached}}</td>
    <td>{{dawahProfessionalAssociate}}</td>
    <td>{{dawahProfessionalTarget}}</td>
    <td>{{dawahProfessionalProgress}}</td>
  </tr>
  <tr>
    <td class="text-left">উলামা-মাশায়েখ</td>
    <td>{{dawahUlamaReached}}</td>
    <td>{{dawahUlamaAssociate}}</td>
    <td>{{dawahUlamaTarget}}</td>
    <td>{{dawahUlamaProgress}}</td>
  </tr>
  <tr>
    <td class="text-left">কর্মজীবী মহিলা</td>
    <td>{{dawahWorkingWomenReached}}</td>
    <td>{{dawahWorkingWomenAssociate}}</td>
    <td>{{dawahWorkingWomenTarget}}</td>
    <td>{{dawahWorkingWomenProgress}}</td>
  </tr>
  <tr>
    <td class="text-left">শ্রমজীবী (পু/ম)</td>
    <td>{{dawahLaborReached}}</td>
    <td>{{dawahLaborAssociate}}</td>
    <td>{{dawahLaborTarget}}</td>
    <td>{{dawahLaborProgress}}</td>
  </tr>
  <tr>
    <td class="text-left">মিডিয়া কর্মী</td>
    <td>{{dawahMediaReached}}</td>
    <td>{{dawahMediaAssociate}}</td>
    <td>{{dawahMediaTarget}}</td>
    <td>{{dawahMediaProgress}}</td>
  </tr>
  <tr>
    <td class="text-left">প্রান্তিক জনগোষ্ঠী (অতি দরিদ্র)</td>
    <td>{{dawahMarginalReached}}</td>
    <td>{{dawahMarginalAssociate}}</td>
    <td>{{dawahMarginalTarget}}</td>
    <td>{{dawahMarginalProgress}}</td>
  </tr>
  <tr>
    <td class="text-left">ভিন্নধর্মাবলম্বী</td>
    <td>{{dawahNonMuslimReached}}</td>
    <td>{{dawahNonMuslimAssociate}}</td>
    <td>{{dawahNonMuslimTarget}}</td>
    <td>{{dawahNonMuslimProgress}}</td>
  </tr>
</table>

<p class="c13 c11 section-title">৫. পরিবারভিত্তিক দাওয়াত:</p>
<table class="border-table">
  <tr>
    <td>দাওয়াতি কাজে অংশগ্রহণকারী মোট পরিবার</td>
    <td>মোট নতুন পরিবারে দাওয়াত পৌঁছানো হয়েছে</td>
  </tr>
  <tr>
    <td>{{familyDawahParticipants}}</td>
    <td>{{familyDawahReached}}</td>
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
    <td>{{mosqueCount}}</td>
    <td>{{mosqueIncrease}}</td>
    <td class="text-left">সাধারণ দাওয়াহ্‌ সেন্টার</td>
    <td>{{dawahCenterCount}}</td>
    <td>{{dawahCenterIncrease}}</td>
  </tr>
  <tr>
    <td class="text-left">দাওয়াতের আওতাভুক্ত মসজিদ</td>
    <td>{{dawahMosqueCount}}</td>
    <td>{{dawahMosqueIncrease}}</td>
    <td class="text-left">তথ্যসেবা কেন্দ্র (মসজিদভিত্তিক/সাধারণ)</td>
    <td>{{infoCenterCount}}</td>
    <td>{{infoCenterIncrease}}</td>
  </tr>
  <tr>
    <td class="text-left">মসজিদভিত্তিক দাওয়াহ্‌ সেন্টার</td>
    <td>{{mosqueDawahCenterCount}}</td>
    <td>{{mosqueDawahCenterIncrease}}</td>
    <td class="text-left">নিয়োজিত প্রশিক্ষিত দা’ঈ</td>
    <td>{{trainedDaiCount}}</td>
    <td>{{trainedDaiIncrease}}</td>
  </tr>
</table>
<p class="c13 c11 note-text">* প্রশিক্ষিত দা’ঈ বলতে কেন্দ্রীয় মডিউলের আলোকে দাওয়াহমাস্টার ট্রেইনার দ্বারা প্রশিক্ষিত দা’ঈদের বোঝানো হয়েছে।</p>

<p class="c13 c11 section-title">৭. তথ্যপ্রযুক্তির মাধ্যমে দাওয়াত:</p>
<table class="border-table">
  <tr>
    <td>মোট উপযুক্ত জনশক্তি সংখ্যা (পুরুষ/মহিলা)</td>
    <td>মোট অংশগ্রহণকারী সংখ্যা (পুরুষ/মহিলা)</td>
  </tr>
  <tr>
    <td>{{itDawahCapable}}</td>
    <td>{{itDawahParticipants}}</td>
  </tr>
</table>

<p class="c13 c11 section-title">৮. সাংস্কৃতিক কাজের মাধ্যমে দাওয়াত:</p>
<table class="border-table">
  <tr>
    <td>প্রফেশনাল সাংস্কৃতিক টিম সংখ্যা</td>
    <td>মোট দাওয়াতি সাংস্কৃতিক প্রোগ্রাম সংখ্যা</td>
    <td>মোট ের নিকট দাওয়াত পৌঁছানো হয়েছে</td>
  </tr>
  <tr>
    <td>{{culturalTeamCount}}</td>
    <td>{{culturalProgramCount}}</td>
    <td>{{culturalProgramReached}}</td>
  </tr>
</table>

<p class="c13 c11 section-title">গ) দাওয়াহ্‌ ও প্রকাশনা:</p>
<table class="border-table">
  <tr>
    <td class="text-left">বিবরণ</td>
    <td>মোট সংখ্যা</td>
    <td>বৃদ্ধি</td>
    <td>টার্গেট</td>
    <td class="text-left">বিবরণ</td>
    <td>মোট সংখ্যা</td>
    <td>বৃদ্ধি</td>
  </tr>
  <tr>
    <td class="text-left">পাঠাগার/অনলাইন লাইব্রেরী</td>
    <td>{{libraryCount}}</td>
    <td>{{libraryIncrease}}</td>
    <td>{{libraryTarget}}</td>
    <td class="text-left">ওয়ার্ড বই বিক্রয় কেন্দ্র</td>
    <td>{{wardBookSellCenterCount}}</td>
    <td>{{wardBookSellCenterIncrease}}</td>
  </tr>
  <tr>
    <td class="text-left">পাঠাগার/অনলাইন লাইব্রেরীতে বই</td>
    <td>{{libraryBookCount}}</td>
    <td>{{libraryBookIncrease}}</td>
    <td>{{libraryBookTarget}}</td>
    <td class="text-left">ওয়ার্ডে বই বিক্রয়</td>
    <td>{{wardBookSellCount}}</td>
    <td>{{wardBookSellIncrease}}</td>
  </tr>
  <tr>
    <td class="text-left">বই বিলি</td>
    <td>{{bookDistributionCount}}</td>
    <td>{{bookDistributionIncrease}}</td>
    <td>{{bookDistributionTarget}}</td>
    <td class="text-left">বইয়ের সফট কপি বিলি</td>
    <td>{{softCopyDistributionCount}}</td>
    <td>{{softCopyDistributionIncrease}}</td>
  </tr>
  <tr>
    <td class="text-left">ইউনিটে বই বিলিকেন্দ্র</td>
    <td>{{unitBookSellCenterCount}}</td>
    <td>{{unitBookSellCenterIncrease}}</td>
    <td>{{unitBookSellCenterTarget}}</td>
    <td class="text-left">দাওয়াতি লিংক বিতরণ*</td>
    <td>{{dawahLinkDistributionCount}}</td>
    <td>{{dawahLinkDistributionIncrease}}</td>
  </tr>
  <tr>
    <td class="text-left">ইউনিটে বই বিলি</td>
    <td>{{unitBookSellCount}}</td>
    <td>{{unitBookSellIncrease}}</td>
    <td>{{unitBookSellTarget}}</td>
    <td class="text-left">সোনার বাংলা/সংগ্রাম/পৃথিবী কত কপি চলে</td>
    <td>{{newspaperCirculation}}</td>
    <td>{{newspaperIncrease}}</td>
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
    <td>{{karmiCurrent}}</td>
    <td>{{karmiIncrease}}</td>
    <td>{{karmiIncoming}}</td>
    <td>{{karmiDecrease}}</td>
    <td>{{karmiTarget}}</td>
    <td>{{karmiProgress}}</td>
  </tr>
  <tr>
    <td class="text-left">সর্বমোট সক্রিয় সহযোগী সদস্য</td>
    <td>{{activeAssociatePrev}}</td>
    <td>{{activeAssociateCurrent}}</td>
    <td>{{activeAssociateIncrease}}</td>
    <td>{{activeAssociateIncoming}}</td>
    <td>{{activeAssociateDecrease}}</td>
    <td>{{activeAssociateTarget}}</td>
    <td>{{activeAssociateProgress}}</td>
  </tr>
</table>

<p class="c13 c11 section-title">২. সহযোগী সদস্য: <span class="note-text">**দাওয়াত ও তাবলীগের 'ক' এর অধীনে উল্লেখিত সকল সহযোগী সদস্যের সংখ্যা এ ছকে সর্বমোট সহযোগী সদস্যের ঘরে বসাতে হবে।</span></p>
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
    <td style="width:12%">বিভাগসমূহ</td>
    <td style="width:15%">অরুন</td>
    <td style="width:12%">বিগত সময়ের সংখ্যা</td>
    <td style="width:12%">বর্তমান সংখ্যা</td>
    <td style="width:12%">বৃদ্ধি<br/>(মানোন্নয়ন/আগত)</td>
    <td style="width:12%">ঘাটতি<br/>(মানোন্নয়ন/স্থানান্তর)</td>
    <td style="width:12%">টার্গেট</td>
    <td style="width:13%">বাস্তবায়নের হার</td>
  </tr>

  <tr>
    <td rowspan="3">মহিলা</td>
    <td class="text-left">সদস্য (রুকন)</td>
    <td>{{divwomenRokonPrev}}</td>
    <td>{{divwomenRokonCurrent}}</td>
    <td>{{divwomenRokonIncrease}}</td>
    <td>{{divwomenRokonDecrease}}</td>
    <td>{{divwomenRokonTarget}}</td>
    <td>{{divwomenRokonProgress}}</td>
  </tr>
  <tr>
    <td class="text-left">কর্মী</td>
    <td>{{divwomenKarmiPrev}}</td>
    <td>{{divwomenKarmiCurrent}}</td>
    <td>{{divwomenKarmiIncrease}}</td>
    <td>{{divwomenKarmiDecrease}}</td>
    <td>{{divwomenKarmiTarget}}</td>
    <td>{{divwomenKarmiProgress}}</td>
  </tr>
  <tr>
    <td class="text-left">সহযোগী সদস্য</td>
    <td>{{divwomenAssociatePrev}}</td>
    <td>{{divwomenAssociateCurrent}}</td>
    <td>{{divwomenAssociateIncrease}}</td>
    <td>{{divwomenAssociateDecrease}}</td>
    <td>{{divwomenAssociateTarget}}</td>
    <td>{{divwomenAssociateProgress}}</td>
  </tr>
  <tr>
    <td rowspan="3">শ্রম*</td>
    <td class="text-left">সদস্য (রুকন)</td>
    <td>{{divlaborRokonPrev}}</td>
    <td>{{divlaborRokonCurrent}}</td>
    <td>{{divlaborRokonIncrease}}</td>
    <td>{{divlaborRokonDecrease}}</td>
    <td>{{divlaborRokonTarget}}</td>
    <td>{{divlaborRokonProgress}}</td>
  </tr>
  <tr>
    <td class="text-left">কর্মী</td>
    <td>{{divlaborKarmiPrev}}</td>
    <td>{{divlaborKarmiCurrent}}</td>
    <td>{{divlaborKarmiIncrease}}</td>
    <td>{{divlaborKarmiDecrease}}</td>
    <td>{{divlaborKarmiTarget}}</td>
    <td>{{divlaborKarmiProgress}}</td>
  </tr>
  <tr>
    <td class="text-left">সহযোগী সদস্য</td>
    <td>{{divlaborAssociatePrev}}</td>
    <td>{{divlaborAssociateCurrent}}</td>
    <td>{{divlaborAssociateIncrease}}</td>
    <td>{{divlaborAssociateDecrease}}</td>
    <td>{{divlaborAssociateTarget}}</td>
    <td>{{divlaborAssociateProgress}}</td>
  </tr>
  <tr>
    <td rowspan="3">উলামা</td>
    <td class="text-left">সদস্য (রুকন)</td>
    <td>{{divulamaRokonPrev}}</td>
    <td>{{divulamaRokonCurrent}}</td>
    <td>{{divulamaRokonIncrease}}</td>
    <td>{{divulamaRokonDecrease}}</td>
    <td>{{divulamaRokonTarget}}</td>
    <td>{{divulamaRokonProgress}}</td>
  </tr>
  <tr>
    <td class="text-left">কর্মী</td>
    <td>{{divulamaKarmiPrev}}</td>
    <td>{{divulamaKarmiCurrent}}</td>
    <td>{{divulamaKarmiIncrease}}</td>
    <td>{{divulamaKarmiDecrease}}</td>
    <td>{{divulamaKarmiTarget}}</td>
    <td>{{divulamaKarmiProgress}}</td>
  </tr>
  <tr>
    <td class="text-left">সহযোগী সদস্য</td>
    <td>{{divulamaAssociatePrev}}</td>
    <td>{{divulamaAssociateCurrent}}</td>
    <td>{{divulamaAssociateIncrease}}</td>
    <td>{{divulamaAssociateDecrease}}</td>
    <td>{{divulamaAssociateTarget}}</td>
    <td>{{divulamaAssociateProgress}}</td>
  </tr>
  <tr>
    <td rowspan="3">পেশাজীবী</td>
    <td class="text-left">সদস্য (রুকন)</td>
    <td>{{divprofessionalRokonPrev}}</td>
    <td>{{divprofessionalRokonCurrent}}</td>
    <td>{{divprofessionalRokonIncrease}}</td>
    <td>{{divprofessionalRokonDecrease}}</td>
    <td>{{divprofessionalRokonTarget}}</td>
    <td>{{divprofessionalRokonProgress}}</td>
  </tr>
  <tr>
    <td class="text-left">কর্মী</td>
    <td>{{divprofessionalKarmiPrev}}</td>
    <td>{{divprofessionalKarmiCurrent}}</td>
    <td>{{divprofessionalKarmiIncrease}}</td>
    <td>{{divprofessionalKarmiDecrease}}</td>
    <td>{{divprofessionalKarmiTarget}}</td>
    <td>{{divprofessionalKarmiProgress}}</td>
  </tr>
  <tr>
    <td class="text-left">সহযোগী সদস্য</td>
    <td>{{divprofessionalAssociatePrev}}</td>
    <td>{{divprofessionalAssociateCurrent}}</td>
    <td>{{divprofessionalAssociateIncrease}}</td>
    <td>{{divprofessionalAssociateDecrease}}</td>
    <td>{{divprofessionalAssociateTarget}}</td>
    <td>{{divprofessionalAssociateProgress}}</td>
  </tr>
  <tr>
    <td rowspan="3">যুব</td>
    <td class="text-left">সদস্য (রুকন)</td>
    <td>{{divyouthRokonPrev}}</td>
    <td>{{divyouthRokonCurrent}}</td>
    <td>{{divyouthRokonIncrease}}</td>
    <td>{{divyouthRokonDecrease}}</td>
    <td>{{divyouthRokonTarget}}</td>
    <td>{{divyouthRokonProgress}}</td>
  </tr>
  <tr>
    <td class="text-left">কর্মী</td>
    <td>{{divyouthKarmiPrev}}</td>
    <td>{{divyouthKarmiCurrent}}</td>
    <td>{{divyouthKarmiIncrease}}</td>
    <td>{{divyouthKarmiDecrease}}</td>
    <td>{{divyouthKarmiTarget}}</td>
    <td>{{divyouthKarmiProgress}}</td>
  </tr>
  <tr>
    <td class="text-left">সহযোগী সদস্য</td>
    <td>{{divyouthAssociatePrev}}</td>
    <td>{{divyouthAssociateCurrent}}</td>
    <td>{{divyouthAssociateIncrease}}</td>
    <td>{{divyouthAssociateDecrease}}</td>
    <td>{{divyouthAssociateTarget}}</td>
    <td>{{divyouthAssociateProgress}}</td>
  </tr>
  <tr>
    <td rowspan="3">সাহিত্য ও সংস্কৃতি</td>
    <td class="text-left">সদস্য (রুকন)</td>
    <td>{{divliteratureRokonPrev}}</td>
    <td>{{divliteratureRokonCurrent}}</td>
    <td>{{divliteratureRokonIncrease}}</td>
    <td>{{divliteratureRokonDecrease}}</td>
    <td>{{divliteratureRokonTarget}}</td>
    <td>{{divliteratureRokonProgress}}</td>
  </tr>
  <tr>
    <td class="text-left">কর্মী</td>
    <td>{{divliteratureKarmiPrev}}</td>
    <td>{{divliteratureKarmiCurrent}}</td>
    <td>{{divliteratureKarmiIncrease}}</td>
    <td>{{divliteratureKarmiDecrease}}</td>
    <td>{{divliteratureKarmiTarget}}</td>
    <td>{{divliteratureKarmiProgress}}</td>
  </tr>
  <tr>
    <td class="text-left">সহযোগী সদস্য</td>
    <td>{{divliteratureAssociatePrev}}</td>
    <td>{{divliteratureAssociateCurrent}}</td>
    <td>{{divliteratureAssociateIncrease}}</td>
    <td>{{divliteratureAssociateDecrease}}</td>
    <td>{{divliteratureAssociateTarget}}</td>
    <td>{{divliteratureAssociateProgress}}</td>
  </tr>
  <tr>
    <td rowspan="3">মিডিয়া</td>
    <td class="text-left">সদস্য (রুকন)</td>
    <td>{{divmediaRokonPrev}}</td>
    <td>{{divmediaRokonCurrent}}</td>
    <td>{{divmediaRokonIncrease}}</td>
    <td>{{divmediaRokonDecrease}}</td>
    <td>{{divmediaRokonTarget}}</td>
    <td>{{divmediaRokonProgress}}</td>
  </tr>
  <tr>
    <td class="text-left">কর্মী</td>
    <td>{{divmediaKarmiPrev}}</td>
    <td>{{divmediaKarmiCurrent}}</td>
    <td>{{divmediaKarmiIncrease}}</td>
    <td>{{divmediaKarmiDecrease}}</td>
    <td>{{divmediaKarmiTarget}}</td>
    <td>{{divmediaKarmiProgress}}</td>
  </tr>
  <tr>
    <td class="text-left">সহযোগী সদস্য</td>
    <td>{{divmediaAssociatePrev}}</td>
    <td>{{divmediaAssociateCurrent}}</td>
    <td>{{divmediaAssociateIncrease}}</td>
    <td>{{divmediaAssociateDecrease}}</td>
    <td>{{divmediaAssociateTarget}}</td>
    <td>{{divmediaAssociateProgress}}</td>
  </tr>
  <tr>
    <td rowspan="3">ভিন্নধর্মাবলম্বী</td>
    <td class="text-left">সদস্য (রুকন)</td>
    <td>{{divnonMuslimRokonPrev}}</td>
    <td>{{divnonMuslimRokonCurrent}}</td>
    <td>{{divnonMuslimRokonIncrease}}</td>
    <td>{{divnonMuslimRokonDecrease}}</td>
    <td>{{divnonMuslimRokonTarget}}</td>
    <td>{{divnonMuslimRokonProgress}}</td>
  </tr>
  <tr>
    <td class="text-left">কর্মী</td>
    <td>{{divnonMuslimKarmiPrev}}</td>
    <td>{{divnonMuslimKarmiCurrent}}</td>
    <td>{{divnonMuslimKarmiIncrease}}</td>
    <td>{{divnonMuslimKarmiDecrease}}</td>
    <td>{{divnonMuslimKarmiTarget}}</td>
    <td>{{divnonMuslimKarmiProgress}}</td>
  </tr>
  <tr>
    <td class="text-left">সহযোগী সদস্য</td>
    <td>{{divnonMuslimAssociatePrev}}</td>
    <td>{{divnonMuslimAssociateCurrent}}</td>
    <td>{{divnonMuslimAssociateIncrease}}</td>
    <td>{{divnonMuslimAssociateDecrease}}</td>
    <td>{{divnonMuslimAssociateTarget}}</td>
    <td>{{divnonMuslimAssociateProgress}}</td>
  </tr></table>
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
  <tr><td class="text-left">সিটি কর্পোরেশনের মোট প্রশাসনিক ওয়ার্ড</td><td>{{orgCityWardAdminPrev}}</td><td>{{orgCityWardAdminCurrent}}</td><td>{{orgCityWardAdminIncrease}}</td><td>{{orgCityWardAdminDecrease}}</td><td>{{orgCityWardAdminTarget}}</td><td>{{orgCityWardAdminProgress}}</td></tr>
  <tr><td class="text-left">সিটি কর্পোরেশনের মোট সংগঠিত ওয়ার্ড</td><td>{{orgCityWardOrgPrev}}</td><td>{{orgCityWardOrgCurrent}}</td><td>{{orgCityWardOrgIncrease}}</td><td>{{orgCityWardOrgDecrease}}</td><td>{{orgCityWardOrgTarget}}</td><td>{{orgCityWardOrgProgress}}</td></tr>
  <tr><td class="text-left">মোট সাংগঠনিক ওয়ার্ড (পু.)</td><td>{{orgWardMalePrev}}</td><td>{{orgWardMaleCurrent}}</td><td>{{orgWardMaleIncrease}}</td><td>{{orgWardMaleDecrease}}</td><td>{{orgWardMaleTarget}}</td><td>{{orgWardMaleProgress}}</td></tr>
  <tr><td class="text-left">মোট সাংগঠনিক ওয়ার্ড (ম.)</td><td>{{orgWardFemalePrev}}</td><td>{{orgWardFemaleCurrent}}</td><td>{{orgWardFemaleIncrease}}</td><td>{{orgWardFemaleDecrease}}</td><td>{{orgWardFemaleTarget}}</td><td>{{orgWardFemaleProgress}}</td></tr>
  <tr style="background-color:#e6e6fa; font-weight:bold;"><td colspan="7" class="text-left">অন্যান্য সাংগঠনিক ওয়ার্ড</td></tr>
  <tr><td class="text-left">সাংগঠনিক ওয়ার্ড (উলামা)</td><td>{{orgWardUlamaPrev}}</td><td>{{orgWardUlamaCurrent}}</td><td>{{orgWardUlamaIncrease}}</td><td>{{orgWardUlamaDecrease}}</td><td>{{orgWardUlamaTarget}}</td><td>{{orgWardUlamaProgress}}</td></tr>
  <tr><td class="text-left">সাংগঠনিক ওয়ার্ড (পেশাজীবী)</td><td>{{orgWardProfPrev}}</td><td>{{orgWardProfCurrent}}</td><td>{{orgWardProfIncrease}}</td><td>{{orgWardProfDecrease}}</td><td>{{orgWardProfTarget}}</td><td>{{orgWardProfProgress}}</td></tr>
  <tr><td class="text-left">সাংগঠনিক ওয়ার্ড (যুব)</td><td>{{orgWardYouthPrev}}</td><td>{{orgWardYouthCurrent}}</td><td>{{orgWardYouthIncrease}}</td><td>{{orgWardYouthDecrease}}</td><td>{{orgWardYouthTarget}}</td><td>{{orgWardYouthProgress}}</td></tr>
  <tr><td class="text-left">সাংগঠনিক ওয়ার্ড (শ্রম)</td><td>{{orgWardLaborPrev}}</td><td>{{orgWardLaborCurrent}}</td><td>{{orgWardLaborIncrease}}</td><td>{{orgWardLaborDecrease}}</td><td>{{orgWardLaborTarget}}</td><td>{{orgWardLaborProgress}}</td></tr>
  <tr><td class="text-left">সাংগঠনিক ওয়ার্ড (মিডিয়া)</td><td>{{orgWardMediaPrev}}</td><td>{{orgWardMediaCurrent}}</td><td>{{orgWardMediaIncrease}}</td><td>{{orgWardMediaDecrease}}</td><td>{{orgWardMediaTarget}}</td><td>{{orgWardMediaProgress}}</td></tr>
  <tr><td class="text-left">সাংগঠনিক ওয়ার্ড (সাহিত্য ও সংস্কৃতি)</td><td>{{orgWardLitPrev}}</td><td>{{orgWardLitCurrent}}</td><td>{{orgWardLitIncrease}}</td><td>{{orgWardLitDecrease}}</td><td>{{orgWardLitTarget}}</td><td>{{orgWardLitProgress}}</td></tr>
  <tr style="background-color:#e6e6fa; font-weight:bold;"><td class="text-left">ইউনিট সংগঠন</td><td>বিগত সময়ের সংখ্যা</td><td>বর্তমান সংখ্যা</td><td>বৃদ্ধি</td><td>ঘাটতি</td><td>টার্গেট</td><td>বাস্তবায়নের হার</td></tr>
  <tr><td class="text-left">সাধারণ ইউনিট (পুরুষ)</td><td>{{unitGeneralMalePrev}}</td><td>{{unitGeneralMaleCurrent}}</td><td>{{unitGeneralMaleIncrease}}</td><td>{{unitGeneralMaleDecrease}}</td><td>{{unitGeneralMaleTarget}}</td><td>{{unitGeneralMaleProgress}}</td></tr>
  <tr><td class="text-left">সাধারণ ইউনিট (মহিলা)</td><td>{{unitGeneralFemalePrev}}</td><td>{{unitGeneralFemaleCurrent}}</td><td>{{unitGeneralFemaleIncrease}}</td><td>{{unitGeneralFemaleDecrease}}</td><td>{{unitGeneralFemaleTarget}}</td><td>{{unitGeneralFemaleProgress}}</td></tr>
  <tr><td class="text-left">উলামা ইউনিট</td><td>{{unitUlamaPrev}}</td><td>{{unitUlamaCurrent}}</td><td>{{unitUlamaIncrease}}</td><td>{{unitUlamaDecrease}}</td><td>{{unitUlamaTarget}}</td><td>{{unitUlamaProgress}}</td></tr>
  <tr><td class="text-left">পেশাজীবী ইউনিট (পুরুষ)</td><td>{{unitProfMalePrev}}</td><td>{{unitProfMaleCurrent}}</td><td>{{unitProfMaleIncrease}}</td><td>{{unitProfMaleDecrease}}</td><td>{{unitProfMaleTarget}}</td><td>{{unitProfMaleProgress}}</td></tr>
  <tr><td class="text-left">পেশাজীবী ইউনিট (মহিলা)</td><td>{{unitProfFemalePrev}}</td><td>{{unitProfFemaleCurrent}}</td><td>{{unitProfFemaleIncrease}}</td><td>{{unitProfFemaleDecrease}}</td><td>{{unitProfFemaleTarget}}</td><td>{{unitProfFemaleProgress}}</td></tr>
  <tr><td class="text-left">কর্মজীবী ইউনিট (মহিলা)</td><td>{{unitWorkingFemalePrev}}</td><td>{{unitWorkingFemaleCurrent}}</td><td>{{unitWorkingFemaleIncrease}}</td><td>{{unitWorkingFemaleDecrease}}</td><td>{{unitWorkingFemaleTarget}}</td><td>{{unitWorkingFemaleProgress}}</td></tr>
  <tr><td class="text-left">যুব ইউনিট</td><td>{{unitYouthPrev}}</td><td>{{unitYouthCurrent}}</td><td>{{unitYouthIncrease}}</td><td>{{unitYouthDecrease}}</td><td>{{unitYouthTarget}}</td><td>{{unitYouthProgress}}</td></tr>
  <tr><td class="text-left">শ্রম ইউনিট (পুরুষ)</td><td>{{unitLaborMalePrev}}</td><td>{{unitLaborMaleCurrent}}</td><td>{{unitLaborMaleIncrease}}</td><td>{{unitLaborMaleDecrease}}</td><td>{{unitLaborMaleTarget}}</td><td>{{unitLaborMaleProgress}}</td></tr>
  <tr><td class="text-left">শ্রম ইউনিট (মহিলা)</td><td>{{unitLaborFemalePrev}}</td><td>{{unitLaborFemaleCurrent}}</td><td>{{unitLaborFemaleIncrease}}</td><td>{{unitLaborFemaleDecrease}}</td><td>{{unitLaborFemaleTarget}}</td><td>{{unitLaborFemaleProgress}}</td></tr>
  <tr><td class="text-left">মিডিয়া ইউনিট</td><td>{{unitMediaPrev}}</td><td>{{unitMediaCurrent}}</td><td>{{unitMediaIncrease}}</td><td>{{unitMediaDecrease}}</td><td>{{unitMediaTarget}}</td><td>{{unitMediaProgress}}</td></tr>
  <tr><td class="text-left">সাহিত্য ও সংস্কৃতি ইউনিট</td><td>{{unitLitPrev}}</td><td>{{unitLitCurrent}}</td><td>{{unitLitIncrease}}</td><td>{{unitLitDecrease}}</td><td>{{unitLitTarget}}</td><td>{{unitLitProgress}}</td></tr>
  <tr style="font-weight:bold;"><td class="text-right">সর্বমোট ইউনিট</td><td>{{unitTotalPrev}}</td><td>{{unitTotalCurrent}}</td><td>{{unitTotalIncrease}}</td><td>{{unitTotalDecrease}}</td><td>{{unitTotalTarget}}</td><td>{{unitTotalProgress}}</td></tr>
</table>

<p class="c13 c11 section-title">৫. দাওয়াতি ও পারিবারিক ইউনিট: <span class="note-text">*দাওয়াতি ইউনিট ও পারিবারিক ইউনিটের সংখ্যা মোট সাংগঠনিক ইউনিটে অন্তর্ভুক্ত হবে না।</span></p>
<table class="border-table">
  <tr><td class="text-left">ইউনিটের ধরন</td><td>বিগত সময়ের সংখ্যা</td><td>বর্তমান সংখ্যা</td><td>বৃদ্ধি</td><td>ঘাটতি</td><td>টার্গেট</td></tr>
  <tr><td class="text-left">মোট দাওয়াতি ইউনিট</td><td>{{dawahUnitPrev}}</td><td>{{dawahUnitCurrent}}</td><td>{{dawahUnitIncrease}}</td><td>{{dawahUnitDecrease}}</td><td>{{dawahUnitTarget}}</td></tr>
  <tr><td class="text-left">মোট পারিবারিক ইউনিট</td><td>{{familyUnitPrev}}</td><td>{{familyUnitCurrent}}</td><td>{{familyUnitIncrease}}</td><td>{{familyUnitDecrease}}</td><td>{{familyUnitTarget}}</td></tr>
</table>

<p class="c13 c11 section-title">৬. ইমারত কায়েম:</p>
<table class="border-table">
  <tr><td class="text-left">সংগঠন</td><td>বিগত সময়ের সংখ্যা</td><td>বর্তমান সংখ্যা</td><td>বৃদ্ধি</td><td>ঘাটতি</td><td>টার্গেট</td></tr>
  <tr><td class="text-left">ওয়ার্ড (সিটি)</td><td>{{emaratWardPrev}}</td><td>{{emaratWardCurrent}}</td><td>{{emaratWardIncrease}}</td><td>{{emaratWardDecrease}}</td><td>{{emaratWardTarget}}</td></tr>
</table>

<p class="c13 c11 section-title">৭. বিদায়ী ছাত্র-ছাত্রী জনশক্তির সংগঠনে যোগদান:</p>
<table class="border-table">
  <tr><td class="text-left">বিবরণ</td><td>সদস্য/সদস্যা</td><td>সাথী/অগ্রসর কর্মী</td><td>কর্মী/কর্মী(ছাত্রী)</td></tr>
  <tr><td class="text-left">মোট যোগদানকৃত ছাত্র/ছাত্রী সংখ্যা</td><td>{{studentJoinRokon}}</td><td>{{studentJoinSathi}}</td><td>{{studentJoinKarmi}}</td></tr>
</table>

<p class="c13 c11 section-title">৮. সহযোগী ও পার্শ্ব সংগঠন বিভাগ:</p>
<table class="border-table">
  <tr>
    <td class="text-left" style="width:25%">মোট ট্রেড ইউনিয়ন সংখ্যা</td><td style="width:25%">{{tradeUnionCount}}</td>
    <td class="text-left" style="width:25%">মোট ট্রাস্ট, ফাউন্ডেশন ও সোসাইটি সংখ্যা</td><td style="width:25%">{{trustFoundationCount}}</td>
  </tr>
  <tr>
    <td class="text-left">মোট ট্রেড ইউনিয়ন বৃদ্ধি/ঘাটতি সংখ্যা</td><td>{{tradeUnionChange}}</td>
    <td class="text-left">ট্রাস্ট, ফাউন্ডেশন ও সোসাইটি বৃদ্ধি/ঘাটতি সংখ্যা</td><td>{{trustFoundationChange}}</td>
  </tr>
</table>

<p class="c13 c11 section-title">৯. সফর:</p>
<table class="border-table">
  <tr>
    <td class="text-left" style="width:40%">মহানগরী দায়িত্বশীলদের মোট সফর সংখ্যা</td><td style="width:10%">{{visitMahanagari}}</td>
    <td class="text-left" style="width:40%">মহানগরী মহিলা বিভাগীয় দায়িত্বশীলদের সফর সংখ্যা</td><td style="width:10%">{{visitMahanagariFemale}}</td>
  </tr>
  <tr>
    <td class="text-left">থানা আমীর/সভাপতির মোট সফর সংখ্যা</td><td>{{visitThanaAmir}}</td>
    <td class="text-left">থানা মহিলা বিভাগীয় সেক্রেটারীর মোট সফর সংখ্যা</td><td>{{visitThanaSecFemale}}</td>
  </tr>
  <tr>
    <td class="text-left">থানা নায়েবে আমীর/সেক্রেটারীর মোট সফর সংখ্যা</td><td>{{visitThanaNayebAmir}}</td>
    <td class="text-left">থানা মহিলা বিভাগীয় কর্মপরিষদ/টিম সদস্যদের মোট সফর সংখ্যা</td><td>{{visitThanaTeamFemale}}</td>
  </tr>
  <tr>
    <td class="text-left">থানা কর্মপরিষদ/টিম সদস্যদের মোট সফর সংখ্যা</td><td>{{visitThanaTeam}}</td>
    <td colspan="2" style="border:none;"></td>
  </tr>
</table>

<p class="c13 c11 section-title">১০. ইয়ানত দাতা:</p>
<table class="border-table">
  <tr>
    <td class="text-left" style="width:40%">নতুন ইয়ানত দাতা</td><td style="width:30%">মোট সংখ্যা</td><td style="width:30%">অর্থের পরিমাণ</td>
  </tr>
  <tr>
    <td class="text-left">সহযোগী সদস্য/সুধী</td><td>{{iyanatDonorCount}}</td><td>{{iyanatDonorAmount}}</td>
  </tr>
</table>

<!-- PAGE 5 BEGINS HERE -->
<p class="c13 c11 section-title">১১. সাংগঠনিক সভা-সম্মেলন:</p>
<table class="border-table">
  <tr>
    <td rowspan="2" style="width:5%">ক্র</td>
    <td rowspan="2" style="width:45%" class="text-left">কর্মসূচীর বিবরণ (পুরুষ ও মহিলা)</td>
    <td colspan="2" style="width:20%">মোট সংখ্যা</td>
    <td rowspan="2" style="width:10%">টার্গেট</td>
    <td colspan="2" style="width:20%">গড় উপস্থিতি</td>
  </tr>
  <tr>
    <td>পুরুষ</td><td>মহিলা</td><td>পুরুষ</td><td>মহিলা</td>
  </tr>

  <tr>
    <td>1.</td>
    <td class="text-left">থানা মজলিশে শূরা বৈঠক</td>
    <td>{{orgMeeting1CountMale}}</td>
    <td>{{orgMeeting1CountFemale}}</td>
    <td>{{orgMeeting1Target}}</td>
    <td>{{orgMeeting1AttendanceMale}}</td>
    <td>{{orgMeeting1AttendanceFemale}}</td>
  </tr>
  <tr>
    <td>2.</td>
    <td class="text-left">থানা কর্মপরিষদ বৈঠক /টিম বৈঠক</td>
    <td>{{orgMeeting2CountMale}}</td>
    <td>{{orgMeeting2CountFemale}}</td>
    <td>{{orgMeeting2Target}}</td>
    <td>{{orgMeeting2AttendanceMale}}</td>
    <td>{{orgMeeting2AttendanceFemale}}</td>
  </tr>
  <tr>
    <td>3.</td>
    <td class="text-left">থানাভিত্তিক মাসিক সদস্য (রুকন) বৈঠক</td>
    <td>{{orgMeeting3CountMale}}</td>
    <td>{{orgMeeting3CountFemale}}</td>
    <td>{{orgMeeting3Target}}</td>
    <td>{{orgMeeting3AttendanceMale}}</td>
    <td>{{orgMeeting3AttendanceFemale}}</td>
  </tr>
  <tr>
    <td>4.</td>
    <td class="text-left">পরিকল্পনার ওরিয়েন্টেশন</td>
    <td>{{orgMeeting4CountMale}}</td>
    <td>{{orgMeeting4CountFemale}}</td>
    <td>{{orgMeeting4Target}}</td>
    <td>{{orgMeeting4AttendanceMale}}</td>
    <td>{{orgMeeting4AttendanceFemale}}</td>
  </tr>
  <tr>
    <td>5.</td>
    <td class="text-left">থানা বৈঠক (পুরুষ/মহিলা)</td>
    <td>{{orgMeeting5CountMale}}</td>
    <td>{{orgMeeting5CountFemale}}</td>
    <td>{{orgMeeting5Target}}</td>
    <td>{{orgMeeting5AttendanceMale}}</td>
    <td>{{orgMeeting5AttendanceFemale}}</td>
  </tr>
  <tr>
    <td>6.</td>
    <td class="text-left">বিভাগীয় কমিটিসমূহের বৈঠক</td>
    <td>{{orgMeeting6CountMale}}</td>
    <td>{{orgMeeting6CountFemale}}</td>
    <td>{{orgMeeting6Target}}</td>
    <td>{{orgMeeting6AttendanceMale}}</td>
    <td>{{orgMeeting6AttendanceFemale}}</td>
  </tr>
  <tr>
    <td>7.</td>
    <td class="text-left">ওয়ার্ড বৈঠক (পুরুষ/মহিলা)</td>
    <td>{{orgMeeting7CountMale}}</td>
    <td>{{orgMeeting7CountFemale}}</td>
    <td>{{orgMeeting7Target}}</td>
    <td>{{orgMeeting7AttendanceMale}}</td>
    <td>{{orgMeeting7AttendanceFemale}}</td>
  </tr>
  <tr>
    <td>8.</td>
    <td class="text-left">ওয়ার্ডভিত্তিক মাসিক সদস্য (রুকন) বৈঠক</td>
    <td>{{orgMeeting8CountMale}}</td>
    <td>{{orgMeeting8CountFemale}}</td>
    <td>{{orgMeeting8Target}}</td>
    <td>{{orgMeeting8AttendanceMale}}</td>
    <td>{{orgMeeting8AttendanceFemale}}</td>
  </tr>
  <tr>
    <td>9.</td>
    <td class="text-left">ইউনিটে মোট কর্মী বৈঠক/পারিবারিক বৈঠক</td>
    <td>{{orgMeeting9CountMale}}</td>
    <td>{{orgMeeting9CountFemale}}</td>
    <td>{{orgMeeting9Target}}</td>
    <td>{{orgMeeting9AttendanceMale}}</td>
    <td>{{orgMeeting9AttendanceFemale}}</td>
  </tr>
  <tr>
    <td>10.</td>
    <td class="text-left">ত্রৈমাসিক/ষাণ্মাসিক/বার্ষিক সদস্য (রুকন) সম্মেলন</td>
    <td>{{orgMeeting10CountMale}}</td>
    <td>{{orgMeeting10CountFemale}}</td>
    <td>{{orgMeeting10Target}}</td>
    <td>{{orgMeeting10AttendanceMale}}</td>
    <td>{{orgMeeting10AttendanceFemale}}</td>
  </tr>
  <tr>
    <td>11.</td>
    <td class="text-left">থানাভিত্তিক ওয়ার্ড সভাপতি সম্মেলন</td>
    <td>{{orgMeeting11CountMale}}</td>
    <td>{{orgMeeting11CountFemale}}</td>
    <td>{{orgMeeting11Target}}</td>
    <td>{{orgMeeting11AttendanceMale}}</td>
    <td>{{orgMeeting11AttendanceFemale}}</td>
  </tr>
  <tr>
    <td>12.</td>
    <td class="text-left">থানা পর্যায়ে কর্মী সম্মেলন</td>
    <td>{{orgMeeting12CountMale}}</td>
    <td>{{orgMeeting12CountFemale}}</td>
    <td>{{orgMeeting12Target}}</td>
    <td>{{orgMeeting12AttendanceMale}}</td>
    <td>{{orgMeeting12AttendanceFemale}}</td>
  </tr>
  <tr>
    <td>13.</td>
    <td class="text-left">ওয়ার্ড পর্যায়ে কর্মী সম্মেলন</td>
    <td>{{orgMeeting13CountMale}}</td>
    <td>{{orgMeeting13CountFemale}}</td>
    <td>{{orgMeeting13Target}}</td>
    <td>{{orgMeeting13AttendanceMale}}</td>
    <td>{{orgMeeting13AttendanceFemale}}</td>
  </tr>
  <tr>
    <td>14.</td>
    <td class="text-left">থানাভিত্তিক ইউনিট সভাপতি ও সেক্রেটারী সম্মেলন</td>
    <td>{{orgMeeting14CountMale}}</td>
    <td>{{orgMeeting14CountFemale}}</td>
    <td>{{orgMeeting14Target}}</td>
    <td>{{orgMeeting14AttendanceMale}}</td>
    <td>{{orgMeeting14AttendanceFemale}}</td>
  </tr>
  <tr>
    <td>15.</td>
    <td class="text-left">উলামা বৈঠক/সমাবেশ</td>
    <td>{{orgMeeting15CountMale}}</td>
    <td>{{orgMeeting15CountFemale}}</td>
    <td>{{orgMeeting15Target}}</td>
    <td>{{orgMeeting15AttendanceMale}}</td>
    <td>{{orgMeeting15AttendanceFemale}}</td>
  </tr>
  <tr>
    <td>16.</td>
    <td class="text-left">পেশাজীবীদের নিয়ে বৈঠক</td>
    <td>{{orgMeeting16CountMale}}</td>
    <td>{{orgMeeting16CountFemale}}</td>
    <td>{{orgMeeting16Target}}</td>
    <td>{{orgMeeting16AttendanceMale}}</td>
    <td>{{orgMeeting16AttendanceFemale}}</td>
  </tr>
  <tr>
    <td>17.</td>
    <td class="text-left">শ্রমিকদের নিয়ে বৈঠক/সমাবেশ</td>
    <td>{{orgMeeting17CountMale}}</td>
    <td>{{orgMeeting17CountFemale}}</td>
    <td>{{orgMeeting17Target}}</td>
    <td>{{orgMeeting17AttendanceMale}}</td>
    <td>{{orgMeeting17AttendanceFemale}}</td>
  </tr>
  <tr>
    <td>18.</td>
    <td class="text-left">যুবকদের নিয়ে সমাবেশ</td>
    <td>{{orgMeeting18CountMale}}</td>
    <td>{{orgMeeting18CountFemale}}</td>
    <td>{{orgMeeting18Target}}</td>
    <td>{{orgMeeting18AttendanceMale}}</td>
    <td>{{orgMeeting18AttendanceFemale}}</td>
  </tr>
  <tr>
    <td>19.</td>
    <td class="text-left">ছাত্র/ছাত্রী দায়িত্বশীলদের সাথে বৈঠক/উঠান বৈঠক</td>
    <td>{{orgMeeting19CountMale}}</td>
    <td>{{orgMeeting19CountFemale}}</td>
    <td>{{orgMeeting19Target}}</td>
    <td>{{orgMeeting19AttendanceMale}}</td>
    <td>{{orgMeeting19AttendanceFemale}}</td>
  </tr>
  <tr>
    <td>20.</td>
    <td class="text-left">সহযোগী সদস্য সমাবেশ/সম্মেলন</td>
    <td>{{orgMeeting20CountMale}}</td>
    <td>{{orgMeeting20CountFemale}}</td>
    <td>{{orgMeeting20Target}}</td>
    <td>{{orgMeeting20AttendanceMale}}</td>
    <td>{{orgMeeting20AttendanceFemale}}</td>
  </tr>
  <tr>
    <td>21.</td>
    <td class="text-left">সক্রিয় সহযোগী সদস্য সমাবেশ/সম্মেলন</td>
    <td>{{orgMeeting21CountMale}}</td>
    <td>{{orgMeeting21CountFemale}}</td>
    <td>{{orgMeeting21Target}}</td>
    <td>{{orgMeeting21AttendanceMale}}</td>
    <td>{{orgMeeting21AttendanceFemale}}</td>
  </tr>
  <tr>
    <td>22.</td>
    <td class="text-left">অন্যান্য (বিস্তারিত আলাদা কাগজে দেয়া যাবে)</td>
    <td>{{orgMeeting22CountMale}}</td>
    <td>{{orgMeeting22CountFemale}}</td>
    <td>{{orgMeeting22Target}}</td>
    <td>{{orgMeeting22AttendanceMale}}</td>
    <td>{{orgMeeting22AttendanceFemale}}</td>
  </tr></table>
<p class="c13 c11 section-title">প্রশিক্ষণ :</p>
<p class="c13 c11 section-title">ক) তারবিয়াত (নৈতিক শিক্ষা ও সাংগঠনিক প্রশিক্ষণ):</p>
<table class="border-table">
  <tr>
    <td rowspan="2" style="width:5%">ক্র.</td>
    <td rowspan="2" style="width:45%" class="text-left">প্রোগ্রামের ধরন (পুরুষ ও মহিলা)</td>
    <td colspan="2" style="width:20%">মোট সংখ্যা</td>
    <td rowspan="2" style="width:10%">টার্গেট</td>
    <td colspan="2" style="width:20%">গড় উপস্থিতি</td>
  </tr>
  <tr>
    <td>পুরুষ</td><td>মহিলা</td><td>পুরুষ</td><td>মহিলা</td>
  </tr>

  <tr>
    <td>1.</td>
    <td class="text-left">ইউনিটে মোট তারবিয়াতী বৈঠক</td>
    <td>{{tarbiyat1CountMale}}</td>
    <td>{{tarbiyat1CountFemale}}</td>
    <td>{{tarbiyat1Target}}</td>
    <td>{{tarbiyat1AttendanceMale}}</td>
    <td>{{tarbiyat1AttendanceFemale}}</td>
  </tr>
  <tr>
    <td>2.</td>
    <td class="text-left">থানাভিত্তিক সদস্য (রুকন) শিক্ষাশিবির/শিক্ষা বৈঠক</td>
    <td>{{tarbiyat2CountMale}}</td>
    <td>{{tarbiyat2CountFemale}}</td>
    <td>{{tarbiyat2Target}}</td>
    <td>{{tarbiyat2AttendanceMale}}</td>
    <td>{{tarbiyat2AttendanceFemale}}</td>
  </tr>
  <tr>
    <td>3.</td>
    <td class="text-left">থানাভিত্তিক বাছাইকৃত কর্মীদের শিক্ষাশিবির/শিক্ষা বৈঠক/কর্মশালা</td>
    <td>{{tarbiyat3CountMale}}</td>
    <td>{{tarbiyat3CountFemale}}</td>
    <td>{{tarbiyat3Target}}</td>
    <td>{{tarbiyat3AttendanceMale}}</td>
    <td>{{tarbiyat3AttendanceFemale}}</td>
  </tr>
  <tr>
    <td>4.</td>
    <td class="text-left">থানাভিত্তিক কর্মীদের শিক্ষাশিবির/শিক্ষা বৈঠক</td>
    <td>{{tarbiyat4CountMale}}</td>
    <td>{{tarbiyat4CountFemale}}</td>
    <td>{{tarbiyat4Target}}</td>
    <td>{{tarbiyat4AttendanceMale}}</td>
    <td>{{tarbiyat4AttendanceFemale}}</td>
  </tr>
  <tr>
    <td>5.</td>
    <td class="text-left">থানাভিত্তিক সাবেক ছাত্র/ছাত্রী কর্মীদের প্রশিক্ষণ প্রোগ্রাম</td>
    <td>{{tarbiyat5CountMale}}</td>
    <td>{{tarbiyat5CountFemale}}</td>
    <td>{{tarbiyat5Target}}</td>
    <td>{{tarbiyat5AttendanceMale}}</td>
    <td>{{tarbiyat5AttendanceFemale}}</td>
  </tr>
  <tr>
    <td>6.</td>
    <td class="text-left">ওয়ার্ডভিত্তিক কর্মীদের শিক্ষা বৈঠক</td>
    <td>{{tarbiyat6CountMale}}</td>
    <td>{{tarbiyat6CountFemale}}</td>
    <td>{{tarbiyat6Target}}</td>
    <td>{{tarbiyat6AttendanceMale}}</td>
    <td>{{tarbiyat6AttendanceFemale}}</td>
  </tr>
  <tr>
    <td>7.</td>
    <td class="text-left">গণশিক্ষা বৈঠক</td>
    <td>{{tarbiyat7CountMale}}</td>
    <td>{{tarbiyat7CountFemale}}</td>
    <td>{{tarbiyat7Target}}</td>
    <td>{{tarbiyat7AttendanceMale}}</td>
    <td>{{tarbiyat7AttendanceFemale}}</td>
  </tr>
  <tr>
    <td>8.</td>
    <td class="text-left">গণ নৈশ ইবাদত/ পুলিশ এজেন্ট কর্মশালা</td>
    <td>{{tarbiyat8CountMale}}</td>
    <td>{{tarbiyat8CountFemale}}</td>
    <td>{{tarbiyat8Target}}</td>
    <td>{{tarbiyat8AttendanceMale}}</td>
    <td>{{tarbiyat8AttendanceFemale}}</td>
  </tr>
  <tr>
    <td>9.</td>
    <td class="text-left">অন্যান্য (বিস্তারিত আলাদা কাগজে দেয়া যাবে)</td>
    <td>{{tarbiyat9CountMale}}</td>
    <td>{{tarbiyat9CountFemale}}</td>
    <td>{{tarbiyat9Target}}</td>
    <td>{{tarbiyat9AttendanceMale}}</td>
    <td>{{tarbiyat9AttendanceFemale}}</td>
  </tr></table>
<table class="border-table">
  <tr>
    <td rowspan="2" style="width:5%">ক্রম</td>
    <td rowspan="2" style="width:35%" class="text-left">প্রোগ্রামের ধরন</td>
    <td colspan="2" style="width:20%">মোট গ্রুপ সংখ্যা</td>
    <td colspan="2" style="width:20%">মোট অধিবেশন সংখ্যা</td>
    <td colspan="2" style="width:20%">গড় উপস্থিতি</td>
  </tr>
  <tr>
    <td>পুরুষ</td><td>মহিলা</td><td>পুরুষ</td><td>মহিলা</td><td>পুরুষ</td><td>মহিলা</td>
  </tr>

  <tr>
    <td>10.</td>
    <td class="text-left">সদস্য (রুকন) পাঠচক্র</td>
    <td>{{tarbiyatTable2_10GroupMale}}</td>
    <td>{{tarbiyatTable2_10GroupFemale}}</td>
    <td>{{tarbiyatTable2_10SessionMale}}</td>
    <td>{{tarbiyatTable2_10SessionFemale}}</td>
    <td>{{tarbiyatTable2_10AttendanceMale}}</td>
    <td>{{tarbiyatTable2_10AttendanceFemale}}</td>
  </tr>
  <tr>
    <td>11.</td>
    <td class="text-left">কর্মী পাঠচক্র/আলোচনা চক্র</td>
    <td>{{tarbiyatTable2_11GroupMale}}</td>
    <td>{{tarbiyatTable2_11GroupFemale}}</td>
    <td>{{tarbiyatTable2_11SessionMale}}</td>
    <td>{{tarbiyatTable2_11SessionFemale}}</td>
    <td>{{tarbiyatTable2_11AttendanceMale}}</td>
    <td>{{tarbiyatTable2_11AttendanceFemale}}</td>
  </tr>
  <tr>
    <td>12.</td>
    <td class="text-left">কুরআন স্টাডি সার্কেল</td>
    <td>{{tarbiyatTable2_12GroupMale}}</td>
    <td>{{tarbiyatTable2_12GroupFemale}}</td>
    <td>{{tarbiyatTable2_12SessionMale}}</td>
    <td>{{tarbiyatTable2_12SessionFemale}}</td>
    <td>{{tarbiyatTable2_12AttendanceMale}}</td>
    <td>{{tarbiyatTable2_12AttendanceFemale}}</td>
  </tr>
  <tr>
    <td>13.</td>
    <td class="text-left">দারস অনুশীলন</td>
    <td>{{tarbiyatTable2_13GroupMale}}</td>
    <td>{{tarbiyatTable2_13GroupFemale}}</td>
    <td>{{tarbiyatTable2_13SessionMale}}</td>
    <td>{{tarbiyatTable2_13SessionFemale}}</td>
    <td>{{tarbiyatTable2_13AttendanceMale}}</td>
    <td>{{tarbiyatTable2_13AttendanceFemale}}</td>
  </tr>
  <tr>
    <td>14.</td>
    <td class="text-left">সহীহ কুরআন তেলাওয়াত অনুশীলন</td>
    <td>{{tarbiyatTable2_14GroupMale}}</td>
    <td>{{tarbiyatTable2_14GroupFemale}}</td>
    <td>{{tarbiyatTable2_14SessionMale}}</td>
    <td>{{tarbiyatTable2_14SessionFemale}}</td>
    <td>{{tarbiyatTable2_14AttendanceMale}}</td>
    <td>{{tarbiyatTable2_14AttendanceFemale}}</td>
  </tr></table>
<p class="c13 c11 section-title">খ) মানবসম্পদ উন্নয়ন</p>
<p class="c13 c11 section-title">১. সাংগঠনিক কার্যক্রম:</p>
<table class="border-table">
  <tr>
    <td>থানা/বিভাগ মানবসম্পদ কমিটি সংখ্যা</td>
    <td>থানা/বিভাগ মানবসম্পদ বৈঠক সংখ্যা</td>
    <td>জনশক্তির ক্যারিয়ার মোটিভেশন প্রোগ্রাম সংখ্যা</td>
  </tr>
  <tr>
    <td>{{hrCommitteeCount}}</td>
    <td>{{hrMeetingCount}}</td>
    <td>{{hrMotivationProgramCount}}</td>
  </tr>
</table>

<!-- PAGE 6 BEGINS HERE -->
<p class="c13 c11 section-title">২. প্রশিক্ষণ কোর্স:</p>
<table class="border-table">
  <tr>
    <td style="width:5%">ক্রমি ক</td>
    <td style="width:25%" class="text-left">প্রশিক্ষণ কোর্সের নাম</td>
    <td style="width:15%">মহানগরী/থানা পরিচালিত কোর্স সংখ্যা</td>
    <td style="width:15%">কোর্সসম্পন্নকারী সংখ্যা</td>
    <td style="width:25%">অন্য প্রতিষ্ঠান হতে কোর্স সম্পন্নকারী সংখ্যা</td>
    <td style="width:15%">মোট </td>
  </tr>

  <tr>
    <td>1.</td>
    <td class="text-left">দাওয়াাহ্‌</td>
    <td>{{hrTraining1Count}}</td>
    <td>{{hrTraining1Completed}}</td>
    <td>{{hrTraining1OtherCompleted}}</td>
    <td>{{hrTraining1Total}}</td>
  </tr>
  <tr>
    <td>2.</td>
    <td class="text-left">সমাজকর্ম</td>
    <td>{{hrTraining2Count}}</td>
    <td>{{hrTraining2Completed}}</td>
    <td>{{hrTraining2OtherCompleted}}</td>
    <td>{{hrTraining2Total}}</td>
  </tr>
  <tr>
    <td>3.</td>
    <td class="text-left">মিডিয়া</td>
    <td>{{hrTraining3Count}}</td>
    <td>{{hrTraining3Completed}}</td>
    <td>{{hrTraining3OtherCompleted}}</td>
    <td>{{hrTraining3Total}}</td>
  </tr>
  <tr>
    <td>4.</td>
    <td class="text-left">আইসিটি</td>
    <td>{{hrTraining4Count}}</td>
    <td>{{hrTraining4Completed}}</td>
    <td>{{hrTraining4OtherCompleted}}</td>
    <td>{{hrTraining4Total}}</td>
  </tr>
  <tr>
    <td>5.</td>
    <td class="text-left">অফিস/ফিন্যান্সিয়াল ম্যানেজমেন্ট</td>
    <td>{{hrTraining5Count}}</td>
    <td>{{hrTraining5Completed}}</td>
    <td>{{hrTraining5OtherCompleted}}</td>
    <td>{{hrTraining5Total}}</td>
  </tr>
  <tr>
    <td>6.</td>
    <td class="text-left">ইংরেজি ভাষা</td>
    <td>{{hrTraining6Count}}</td>
    <td>{{hrTraining6Completed}}</td>
    <td>{{hrTraining6OtherCompleted}}</td>
    <td>{{hrTraining6Total}}</td>
  </tr>
  <tr>
    <td>7.</td>
    <td class="text-left">আরবি ভাষা</td>
    <td>{{hrTraining7Count}}</td>
    <td>{{hrTraining7Completed}}</td>
    <td>{{hrTraining7OtherCompleted}}</td>
    <td>{{hrTraining7Total}}</td>
  </tr>
  <tr>
    <td>8.</td>
    <td class="text-left">ট্রেডভিত্তিক কারিগরি প্রশিক্ষণ</td>
    <td>{{hrTraining8Count}}</td>
    <td>{{hrTraining8Completed}}</td>
    <td>{{hrTraining8OtherCompleted}}</td>
    <td>{{hrTraining8Total}}</td>
  </tr></table>
<p class="c13 c11 note-text">* ট্রেডভিত্তিক কারিগরি প্রশিক্ষণ কোর্সের আওতায় ফার্মিং, (পোল্ট্রি, ফিশারিজ, ডেইরি) সেলাই/এমব্রয়ডারী মেশিন অপারেটর, ড্রাইভিং কাম অটোমেকানিক, রন্ধন শিল্প, হর্টিকালচার/নার্সারী তাঁত শিল্প/বুটিকস, হস্ত শিল্প, ইলেকট্রিক্যাল এন্ড ইলেকট্রনিক্স সার্ভিসিং, সিভিল কন্সট্রাকশন/প্লাম্বারিং, আমিনশীপ ইত্যাদি কোর্স সমূহের বাস্তবায়ন রিপোর্টের যোগফল এখানে বসাতে হবে।</p>

<p class="c13 c11 section-title">সমাজ সংস্কার ও সমাজ সেবা :</p>
<p class="c13 c11 section-title">১. প্রশিক্ষিত সমাজকর্মী তৈরী (প্রশিক্ষিত সমাজকর্মী বলতে কেন্দ্রীয় মডিউলের আলোকে সমাজকর্ম মাস্টার ট্রেইনার দ্বারা প্রশিক্ষণপ্রাপ্ত জনশক্তিকেই বোঝানো হয়েছে):</p>
<table class="border-table">
  <tr>
    <td>মোট প্রশিক্ষিত সমাজকর্মী সংখ্যা</td>
    <td>এ বছর কয়টি প্রশিক্ষণ কোর্স হয়েছে</td>
    <td>টার্গেট</td>
    <td>এ বছর প্রশিক্ষণ কোর্স সম্পন্ন করেছে</td>
    <td>টার্গেট</td>
  </tr>
  <tr>
    <td>{{socialWorkerTrainedTotal}}</td>
    <td>{{socialWorkerCourseThisYear}}</td>
    <td>{{socialWorkerCourseTarget}}</td>
    <td>{{socialWorkerCompletedThisYear}}</td>
    <td>{{socialWorkerCompletedTarget}}</td>
  </tr>
</table>

<p class="c13 c11 section-title">২. ব্যক্তিগত উদ্যোগে সামাজিক কাজ:</p>
<table class="border-table">
  <tr>
    <td class="text-left" style="width:50%">মোট জনশক্তি ব্যক্তিগত উদ্যোগে সামাজিক কাজ করেছেন</td>
    <td style="width:15%">{{socialPersonalWork}}</td>
    <td class="text-left" style="width:20%">মোট সেবা প্রাপ্ত সংখ্যা</td>
    <td style="width:15%">{{socialPersonalServiceCount}}</td>
  </tr>
</table>

<p class="c13 c11 section-title">৩. সামষ্টিক/সেবা টীমের মাধ্যমে সামাজিক কাজ:</p>
<table class="border-table">
  <tr>
    <td>সাধারণ সেবা টীম সংখ্যা</td>
    <td>টেকনিক্যাল সেবা টীম সংখ্যা</td>
    <td>স্বেচ্ছাসেবক টীম সংখ্যা</td>
  </tr>
  <tr>
    <td>{{socialGeneralTeam}}</td>
    <td>{{socialTechTeam}}</td>
    <td>{{socialVolunteerTeam}}</td>
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
    <td class="text-left">ছোট-ছোট উন্নয়নমূলক কাজ</td>
    <td>{{socialWorkLeft1}}</td>
    <td class="text-left">শিক্ষা সহায়তা প্রদান (মোট কে)</td>
    <td>{{socialWorkRight1}}</td>
  </tr>
  <tr>
    <td class="text-left">সামাজিক অনুষ্ঠানে অংশগ্রহণ/সহায়তা প্রদান (মোট সংখ্যা/কে)</td>
    <td>{{socialWorkLeft2}}</td>
    <td class="text-left">টেকনিক্যাল সেবা প্রদান (মোট /কে)</td>
    <td>{{socialWorkRight2}}</td>
  </tr>
  <tr>
    <td class="text-left">সামাজিক বিরোধ মীমাংসা</td>
    <td>{{socialWorkLeft3}}</td>
    <td class="text-left">অনলাইনের মাধ্যমে সেবা প্রদান (মোট কে)</td>
    <td>{{socialWorkRight3}}</td>
  </tr>
  <tr>
    <td class="text-left">মানবিক সহায়তা প্রদান (মোট কে)</td>
    <td>{{socialWorkLeft4}}</td>
    <td class="text-left">বৃক্ষরোপন (মোট )</td>
    <td>{{socialWorkRight4}}</td>
  </tr>
  <tr>
    <td class="text-left">কর্জে হাসানা প্রদান (মোট কে)</td>
    <td>{{socialWorkLeft5}}</td>
    <td class="text-left">খাবার বিতরণ/ঈদ সামগ্রী</td>
    <td>{{socialWorkRight5}}</td>
  </tr>
  <tr>
    <td class="text-left">পরিষ্কার-পরিচ্ছন্নতা/মশক নিধন অভিযান (মোট /সংখ্যা)</td>
    <td>{{socialWorkLeft6}}</td>
    <td class="text-left">দুর্যোগকালীন সহায়তা প্রদান (মোট কে) খাবার বিতরণ</td>
    <td>{{socialWorkRight6}}</td>
  </tr>
  <tr>
    <td class="text-left">রোগীর পরিচর্যা/চিকিৎসা সহায়তা প্রদান (মোট কে)</td>
    <td>{{socialWorkLeft7}}</td>
    <td class="text-left">ত্রাণ বিতরণ (মোট কে) বিতরণ</td>
    <td>{{socialWorkRight7}}</td>
  </tr>
  <tr>
    <td class="text-left">স্বেচ্ছায় রক্ত দান (মোট /কে)</td>
    <td>{{socialWorkLeft8}}</td>
    <td class="text-left">ভিন্নধর্মাবলম্বীদের সেবা প্রদান (মোট /কে)</td>
    <td>{{socialWorkRight8}}</td>
  </tr>
  <tr>
    <td class="text-left">মাতৃত্বকালীন সময়ে সেবা প্রদান (মোট কে)</td>
    <td>{{socialWorkLeft9}}</td>
    <td class="text-left">মায়্যেতের গোসল (কে)</td>
    <td>{{socialWorkRight9}}</td>
  </tr>
  <tr>
    <td class="text-left">নবজাতক গিফট প্রদান (মোট কে)</td>
    <td>{{socialWorkLeft10}}</td>
    <td class="text-left">জানাযায় অংশগ্রহণ (মোট )</td>
    <td>{{socialWorkRight10}}</td>
  </tr>
  <tr>
    <td class="text-left">মেডিকেল ক্যাম্প (মোট )</td>
    <td>{{socialWorkLeft11}}</td>
    <td class="text-left">স্বল্প পুঁজিতে কর্মসংস্থানের সহায়তা (কে)</td>
    <td>{{socialWorkRight11}}</td>
  </tr>
  <tr>
    <td class="text-left">ভ্রাম্যমান স্কুল/মক্তব চালু (মোট )</td>
    <td>{{socialWorkLeft12}}</td>
    <td class="text-left">অন্যান্য (বিস্তারিত আলাদা কাগজে দেয়া যাবে)</td>
    <td>{{socialWorkRight12}}</td>
  </tr></table>

<p class="c13 c11 section-title">৪. প্রাতিষ্ঠানিক উদ্যোগে সামাজিক কাজ:</p>
<table class="border-table">
  <tr>
    <td class="text-left">বিবরণ</td>
    <td>মোট সংখ্যা</td>
    <td>সাংগঠনিক থানা/বিভাগে</td>
    <td>সাংগঠনিক ওয়ার্ডে</td>
  </tr>
  <tr><td class="text-left">সামাজিক প্রতিষ্ঠান রয়েছে</td><td>{{socialInstTotalCount}}</td><td>{{socialInstThanaCount}}</td><td>{{socialInstWardCount}}</td></tr>
  <tr><td class="text-left">প্রতিষ্ঠানভিত্তিক সামাজিক কাজ হয়েছে</td><td>{{socialInstActiveCount}}</td><td>{{socialInstActiveThanaCount}}</td><td>{{socialInstActiveWardCount}}</td></tr>
  <tr><td class="text-left">নতুন সামাজিক প্রতিষ্ঠান চালু করা</td><td>{{socialInstNewCount}}</td><td>{{socialInstNewThanaCount}}</td><td>{{socialInstNewWardCount}}</td></tr>
</table>

<p class="c13 c11 section-title">৫. স্বাস্থ্য ও পরিবার কল্যাণমূলক কাজ:</p>
<table class="border-table">
  <tr>
    <td class="text-left" style="width:40%">স্বাস্থ্যকর্মী তৈরী সংখ্যা</td>
    <td style="width:10%">{{healthWorkerCount}}</td>
    <td class="text-left" style="width:40%">স্বাস্থ্য শিক্ষামূলক প্রশিক্ষণ প্রোগ্রাম/ অংশগ্রহণকারীর সংখ্যা</td>
    <td style="width:10%">{{healthTrainingCount}}</td>
  </tr>
  <tr>
    <td class="text-left">নার্স তৈরী সংখ্যা</td>
    <td>{{healthNurseCount}}</td>
    <td class="text-left">মোট স্বাস্থ্যসেবা কাজে অংশগ্রহণ করেছেন</td>
    <td>{{healthParticipationCount}}</td>
  </tr>
  <tr>
    <td class="text-left">ধাত্রী তৈরী সংখ্যা</td>
    <td>{{healthMidwifeCount}}</td>
    <td class="text-left">মোট সেবাপ্রাপ্ত সংখ্যা</td>
    <td>{{healthServiceCount}}</td>
  </tr>
  <tr>
    <td class="text-left">প্যারেন্টিং প্রশিক্ষণ প্রোগ্রাম সংখ্যা</td>
    <td>{{healthParentingCount}}</td>
    <td class="text-left">অন্যান্য : (বিস্তারিত আলাদা কাগজে দেয়া যাবে)</td>
    <td>{{healthOtherCount}}</td>
  </tr>
</table>

<!-- PAGE 8 BEGINS HERE -->
<p class="c13 c11 section-title">৬. শিক্ষা ও গবেষণামূলক কার্যক্রম:</p>
<table class="border-table">
  <tr>
    <td class="text-left" style="width:25%">বিবরণ</td>
    <td style="width:12%">মোট সংখ্যা</td>
    <td style="width:13%">টার্গেট</td>
    <td class="text-left" style="width:25%">বিবরণ</td>
    <td style="width:12%">মোট সংখ্যা</td>
    <td style="width:13%">টার্গেট</td>
  </tr>
  <tr>
    <td class="text-left">আদর্শ শিক্ষক তৈরী</td><td>{{eduTeacherCount}}</td><td>{{eduTeacherTarget}}</td>
    <td class="text-left">আদর্শ শিক্ষা প্রতিষ্ঠান প্রতিষ্ঠাকরণ</td><td>{{eduInstCount}}</td><td>{{eduInstTarget}}</td>
  </tr>
  <tr>
    <td class="text-left">শিক্ষা সেমিনার</td><td>{{eduSeminarCount}}</td><td>{{eduSeminarTarget}}</td>
    <td class="text-left">আলোচনা সভা</td><td>{{eduMeetingCount}}</td><td>{{eduMeetingTarget}}</td>
  </tr>
</table>

<table style="width: 100%; margin-bottom: 10px;">
  <tr>
    <td style="; font-weight: bold; width: 60%;">৭. সামাজিক কাজের জন্য মোট আয়ের কত শতাংশ ব্যয় হয়েছে :</td>
    <td style="border: 1pt solid #000; text-align: center; ; font-weight: bold; padding: 5px; width: 40%;">{{socialExpensePercentage}}%</td>
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
    <td class="text-left">স্বাধীনতা ও জাতীয় দিবস</td><td>{{dayIndependenceCount}}</td><td>{{dayIndependenceAttendance}}</td>
    <td class="text-left">আন্তর্জাতিক মাতৃভাষা দিবস</td><td>{{dayMotherLanguageCount}}</td><td>{{dayMotherLanguageAttendance}}</td>
  </tr>
  <tr>
    <td class="text-left">বিজয় দিবস</td><td>{{dayVictoryCount}}</td><td>{{dayVictoryAttendance}}</td>
    <td class="text-left">আন্তর্জাতিক নারী দিবস</td><td>{{dayWomenCount}}</td><td>{{dayWomenAttendance}}</td>
  </tr>
  <tr>
    <td class="text-left">অন্যান্য (বিস্তারিত আলাদা কাগজে দেয়া যাবে) বদর</td><td>{{dayOtherCount}}</td><td>{{dayOtherAttendance}}</td>
    <td class="text-left">মে দিবস</td><td>{{dayMayCount}}</td><td>{{dayMayAttendance}}</td>
  </tr>
</table>

<p class="c13 c11 section-title">৪. জাতীয় ও স্থানীয় নির্বাচনভিত্তিক কার্যক্রম:</p>
<table class="border-table">
  <tr>
    <td class="text-left" style="width:15%">নির্বাচনের ধরন</td>
    <td style="width:15%">মোট সংখ্যা</td>
    <td style="width:15%">মোট প্রার্থী সংখ্যা</td>
    <td style="width:20%">অংশগ্রহণ সংখ্যা</td>
    <td style="width:15%">নির্বাচিত সংখ্যা কাউন্সিলর (পু/ম)</td>
    <td style="width:20%">দ্বিতীয় অবস্থান (পু/ম)</td>
  </tr>
  <tr>
    <td class="text-left">প্রশাসনিক ওয়ার্ড</td>
    <td>{{electionWardAdminCount}}</td>
    <td>{{electionWardCandidateCount}}</td>
    <td>{{electionWardParticipateCount}}</td>
    <td>{{electionWardElectedCount}}</td>
    <td>{{electionWardSecondCount}}</td>
  </tr>
</table>

<table class="border-table">
  <tr>
    <td class="text-left" style="width:40%">প্রস্তুতিমূলক কার্যক্রমের ধরন</td>
    <td style="width:20%">মোট সংখ্যা</td>
    <td style="width:20%">বৃদ্ধি</td>
    <td style="width:20%">টার্গেট</td>
  </tr>
  <tr><td class="text-left">ভোট কেন্দ্র (জাতীয়/স্থানীয়)</td><td>{{electionVoteCenterCount}}</td><td>{{electionVoteCenterIncrease}}</td><td>{{electionVoteCenterTarget}}</td></tr>
  <tr><td class="text-left">ভোট কেন্দ্র কমিটি</td><td>{{electionVoteCenterCommitteeCount}}</td><td>{{electionVoteCenterCommitteeIncrease}}</td><td>{{electionVoteCenterCommitteeTarget}}</td></tr>
  <tr><td class="text-left">কেন্দ্র/বুথভিত্তিক ইউনিট</td><td>{{electionBoothUnitCount}}</td><td>{{electionBoothUnitIncrease}}</td><td>{{electionBoothUnitTarget}}</td></tr>
</table>

<table class="border-table">
  <tr>
    <td class="text-left" style="width:70%">থানা/বিভাগ ও ওয়ার্ডভিত্তিক নির্বাচন পরিচালনা কমিটির বৈঠক সংখ্যা</td>
    <td style="width:30%">{{electionCommitteeMeetingCount}}</td>
  </tr>
</table>

<p class="c13 c11 section-title">৫. প্রচার ও মিডিয়া:</p>
<table class="border-table">
  <tr>
    <td class="text-left" style="width:35%">প্রেস বিজ্ঞপ্তি/বিবৃতি প্রদান সংখ্যা</td><td style="width:15%">{{mediaPressCount}}</td>
    <td class="text-left" style="width:35%">সামাজিক যোগাযোগ মাধ্যমে পোস্ট/লাইভ প্রোগ্রাম সংখ্যা</td><td style="width:15%">{{mediaSocialCount}}</td>
  </tr>
  <tr>
    <td class="text-left">প্রতিবাদ লিপি প্রেরণ সংখ্যা</td><td>{{mediaProtestCount}}</td>
    <td colspan="2" style="border:none;"></td>
  </tr>
</table>

<p class="c13 c11 section-title">৬. মানবাধিকার :</p>
<table class="border-table">
  <tr>
    <td class="text-left" style="width:35%">মানবাধিকার সংগঠন প্রতিষ্ঠার সংখ্যা</td><td style="width:15%">{{hrOrgEstablishCount}}</td>
    <td class="text-left" style="width:50%" colspan="2">জাতীয় ও আন্তর্জাতিক মানবাধিকার সংস্থার স্থানীয় শাখা চালুকরণ সংখ্যা {{hrOrgBranchCount}}</td>
  </tr>
  <tr>
    <td class="text-left">মানবাধিকার কর্মী তৈরী</td><td>সংখ্যা: {{hrWorkerCount}}</td>
    <td class="text-left">বৃদ্ধি: {{hrWorkerIncrease}}</td>
    <td class="text-left">টার্গেট: {{hrWorkerTarget}}</td>
  </tr>
</table>

<p class="c13 c11 section-title">৭. আইন ও বিচার :</p>
<table class="border-table">
  <tr>
    <td class="text-left" style="width:40%">আইন বিষয়ক কমিটি/সেল গঠন সংখ্যা</td><td style="width:10%">{{lawCommitteeCount}}</td>
    <td class="text-left" style="width:40%">আইনজীবী জনশক্তি সংখ্যা</td><td style="width:10%">{{lawyerCount}}</td>
  </tr>
  <tr>
    <td class="text-left">আইন সহায়তা প্রদান সংখ্যা</td><td>{{lawSupportCount}}</td>
    <td class="text-left">নতুন আইনজীবী তৈরী সংখ্যা</td><td>{{lawyerNewCount}}</td>
  </tr>
</table>

<p class="c13 c11 section-title">৮. শিল্প ও বাণিজ্য:</p>
<table class="border-table">
  <tr>
    <td class="text-left" style="width:25%">নির্বাচনের ধরন</td>
    <td style="width:15%">নির্বাচন সংখ্যা</td>
    <td style="width:15%">মোট পদ সংখ্যা</td>
    <td style="width:25%">অংশগ্রহণকৃত পদ সংখ্যা</td>
    <td style="width:20%">নির্বাচিত পদ সংখ্যা</td>
  </tr>
  <tr><td class="text-left">ব্যবসায়ী সমিতি/বাজার কমিটি</td><td>{{tradeElectionCount}}</td><td>{{tradeTotalPosition}}</td><td>{{tradeParticipatePosition}}</td><td>{{tradeElectedPosition}}</td></tr>
  <tr><td class="text-left">অন্যান্য(বিস্তারিত আলাদা কাগজে দেয়া যাবে)</td><td>{{tradeOtherElectionCount}}</td><td>{{tradeOtherTotalPosition}}</td><td>{{tradeOtherParticipatePosition}}</td><td>{{tradeOtherElectedPosition}}</td></tr>
</table>

<!-- PAGE 7 BEGINS HERE -->
<p class="c13 c11 section-title">৯. উদ্যোক্তা ও বিশেষজ্ঞ তৈরী:</p>
<table class="border-table">
  <tr>
    <td class="text-left" style="width:40%">বিবরণ</td>
    <td style="width:20%">সংখ্যা</td>
    <td style="width:20%">বৃদ্ধি</td>
    <td style="width:20%">টার্গেট</td>
  </tr>
  <tr><td class="text-left">কৃষি উদ্যোক্তা তৈরী</td><td>{{entAgriCount}}</td><td>{{entAgriIncrease}}</td><td>{{entAgriTarget}}</td></tr>
  <tr><td class="text-left">উদ্যোক্তা তৈরী (সেবা, শিল্প, ব্যবসা- বাণিজ্য ও অন্যান্য)</td><td>{{entServiceCount}}</td><td>{{entServiceIncrease}}</td><td>{{entServiceTarget}}</td></tr>
  <tr><td class="text-left">অন্যান্য- (বিস্তারিত আলাদা কাগজে দেয়া যাবে)</td><td>{{entOtherCount}}</td><td>{{entOtherIncrease}}</td><td>{{entOtherTarget}}</td></tr>
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
    <td class="text-right">{{baitulmalIncome0}}</td>
    <td class="text-left">নিসাব পরিশোধ</td>
    <td class="text-right">{{baitulmalExpense0}}</td>
  </tr>
  <tr>
    <td class="text-left">সরাসরি ইয়ানত</td>
    <td class="text-right">{{baitulmalIncome1}}</td>
    <td class="text-left">এককালীন/নির্বাচনী ওয়াদা</td>
    <td class="text-right">{{baitulmalExpense1}}</td>
  </tr>
  <tr>
    <td class="text-left">এককালীন/নির্বাচনী ওয়াদা</td>
    <td class="text-right">{{baitulmalIncome2}}</td>
    <td class="text-left">নিয়মিত খরচ</td>
    <td class="text-right">{{baitulmalExpense2}}</td>
  </tr>
  <tr>
    <td class="text-left">নির্বাচনী ফান্ড</td>
    <td class="text-right">{{baitulmalIncome3}}</td>
    <td class="text-left">নির্বাচনী ফান্ড</td>
    <td class="text-right">{{baitulmalExpense3}}</td>
  </tr>
  <tr>
    <td class="text-left">শহীদ ফান্ড</td>
    <td class="text-right">{{baitulmalIncome4}}</td>
    <td class="text-left">শহীদ ফান্ড</td>
    <td class="text-right">{{baitulmalExpense4}}</td>
  </tr>
  <tr>
    <td class="text-left">কল্যাণ তহবিল- রাজনীতি</td>
    <td class="text-right">{{baitulmalIncome5}}</td>
    <td class="text-left">কল্যাণ তহবিল</td>
    <td class="text-right">{{baitulmalExpense5}}</td>
  </tr>
  <tr>
    <td class="text-left">সমাজকল্যাণ ও সমাজসেবা</td>
    <td class="text-right">{{baitulmalIncome6}}</td>
    <td class="text-left">সমাজকল্যাণ ও সমাজসেবা</td>
    <td class="text-right">{{baitulmalExpense6}}</td>
  </tr>
  <tr>
    <td class="text-left">প্রকাশনা</td>
    <td class="text-right">{{baitulmalIncome7}}</td>
    <td class="text-left">দাওয়াত, প্রচার ও প্রকাশনা</td>
    <td class="text-right">{{baitulmalExpense7}}</td>
  </tr>
  <tr>
    <td class="text-left">শীত বস্ত্র</td>
    <td class="text-right">{{baitulmalIncome8}}</td>
    <td class="text-left">তারবিয়াত/ ঈদ পুনর্মিলনী</td>
    <td class="text-right">{{baitulmalExpense8}}</td>
  </tr>
  <tr>
    <td class="text-left">যাকাত/উশর</td>
    <td class="text-right">{{baitulmalIncome9}}</td>
    <td class="text-left">মানবসম্পদ উন্নয়ন</td>
    <td class="text-right">{{baitulmalExpense9}}</td>
  </tr>
  <tr>
    <td class="text-left">বিশেষ আদায় (সীরাত ও অন্যান্য)</td>
    <td class="text-right">{{baitulmalIncome10}}</td>
    <td class="text-left">আইন আদালত</td>
    <td class="text-right">{{baitulmalExpense10}}</td>
  </tr>
  <tr>
    <td class="text-left">তারবিয়াত</td>
    <td class="text-right">{{baitulmalIncome11}}</td>
    <td class="text-left">মহিলা বিভাগীয় খরচ</td>
    <td class="text-right">{{baitulmalExpense11}}</td>
  </tr>
  <tr>
    <td class="text-left">ইফতার মাহফিল</td>
    <td class="text-right">{{baitulmalIncome12}}</td>
    <td class="text-left">যাকাত/উশর</td>
    <td class="text-right">{{baitulmalExpense12}}</td>
  </tr>
  <tr>
    <td class="text-left">মহানগরী থেকে প্রাপ্ত (সেহরি ইফতার)</td>
    <td class="text-right">{{baitulmalIncome13}}</td>
    <td class="text-left">যাতায়াত</td>
    <td class="text-right">{{baitulmalExpense13}}</td>
  </tr>
  <tr>
    <td class="text-left">অন্যান্য/ঈদ সামগ্রী</td>
    <td class="text-right">{{baitulmalIncome14}}</td>
    <td class="text-left">অফিস ভাড়া পুরুষ</td>
    <td class="text-right">{{baitulmalExpense14}}</td>
  </tr>
  <tr>
    <td class="text-left">বাড়িভাড়া</td>
    <td class="text-right">{{baitulmalIncome15}}</td>
    <td class="text-left">সম্মানী</td>
    <td class="text-right">{{baitulmalExpense15}}</td>
  </tr>
  <tr>
    <td class="text-left">ফিতরা</td>
    <td class="text-right">{{baitulmalIncome16}}</td>
    <td class="text-left">অফিস স্টেশনারী</td>
    <td class="text-right">{{baitulmalExpense16}}</td>
  </tr>
  <tr>
    <td class="text-left">মানবিক সহায়তা</td>
    <td class="text-right">{{baitulmalIncome17}}</td>
    <td class="text-left">মোবাইল/নেট</td>
    <td class="text-right">{{baitulmalExpense17}}</td>
  </tr>
  <tr>
    <td class="text-left">স্থানীয় নির্বাচন</td>
    <td class="text-right">{{baitulmalIncome18}}</td>
    <td class="text-left">আপ্যায়ন/সুধী সমাবেশ</td>
    <td class="text-right">{{baitulmalExpense18}}</td>
  </tr>
  <tr>
    <td class="text-left"></td>
    <td class="text-right"></td>
    <td class="text-left">ছাত্র কল্যাণ</td>
    <td class="text-right">{{baitulmalExpense19}}</td>
  </tr>
  <tr>
    <td class="text-left"></td>
    <td class="text-right"></td>
    <td class="text-left">স্থানীয় নির্বাচন/ঈদ সামগ্রী বিতরণ</td>
    <td class="text-right">{{baitulmalExpense20}}</td>
  </tr>
  <tr>
    <td class="text-left"></td>
    <td class="text-right"></td>
    <td class="text-left">ইফতার মাহফিল</td>
    <td class="text-right">{{baitulmalExpense21}}</td>
  </tr>
  <tr>
    <td class="text-left"></td>
    <td class="text-right"></td>
    <td class="text-left">তা'লিমুল কুরআন</td>
    <td class="text-right">{{baitulmalExpense22}}</td>
  </tr>
  <tr>
    <td class="text-left"></td>
    <td class="text-right"></td>
    <td class="text-left">ওয়ার্ডের খরচ</td>
    <td class="text-right">{{baitulmalExpense23}}</td>
  </tr>
  <tr>
    <td class="text-left"></td>
    <td class="text-right"></td>
    <td class="text-left">ব্যাংকে জমা</td>
    <td class="text-right">{{baitulmalExpense24}}</td>
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

