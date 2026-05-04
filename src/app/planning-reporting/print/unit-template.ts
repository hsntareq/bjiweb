export const templateStyle = `


body { color: #000; background-color: #fff; font-family: "Noto Serif Bengali"; }
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
`;

export const templateHtml = `
<p class="c1 c11"><span class="c132 c146">&#2476;&#2495;&#2488;&#2478;&#2495;&#2482;&#2509;&#2482;&#2494;&#2489;&#2495;&#2480; &#2480;&#2494;&#2489;&#2478;&#2494;&#2472;&#2495;&#2480; &#2480;&#2494;&#2489;&#2495;&#2478;</span></p>
<p class="c1 c11"><span class="c30">ইউনিট সংগঠনের</span></p>
<p class="c1 c11"><span class="c30">মাসিক/ত্রৈমাসিক/ষাণ্মাসিক/নয় মাসিক/বার্ষিক রিপোর্ট</span></p>

<table class="c18">
  <tr>
    <td class="c128"><p class="c13"><span class="c42">মাস:</span><span class="c3">&nbsp;{{month}}</span></p></td>
    <td class="c128"><p class="c19"><span class="c42">সন:</span><span class="c3">&nbsp;{{year}}</span></p></td>
  </tr>
  <tr>
    <td class="c128"><p class="c13"><span class="c42">ইউনিটের নাম:</span><span class="c3">&nbsp;{{orgName}}</span></p></td>
    <td class="c128"><p class="c19"><span class="c42">ওয়ার্ড নং/নাম:</span><span class="c3">&nbsp;{{wardName}}</span></p></td>
    <td class="c128"><p class="c19"><span class="c42">থানার নাম:</span><span class="c3">&nbsp;{{thanaName}}</span></p></td>
  </tr>
  <tr>
    <td class="c128" colspan="2"><p class="c13"><span class="c42">ইউনিট সভাপতির নাম:</span><span class="c3">&nbsp;{{president}}</span></p></td>
    <td class="c128"><p class="c19"><span class="c42">ইউনিটের ধরন:</span><span class="c3">&nbsp;সাধারণ/উলামা/পেশাজীবী/শ্রম/যুব</span></p></td>
  </tr>
</table>

<p class="c13 c11 section-title">■ দাওয়াত ও তাবলীগ: <span class="note-text">(দাওয়াত ও তাবলীগের ‘ক’ এর অধীনে ক্রমিক ১-৪ নং পর্যন্ত দাওয়াত প্রদানের মোট সংখ্যা যোগ করে এখানে বসাতে হবে)</span></p>
<p class="c13 c11" style="font-size: 10pt;"><strong>(ক) জনসাধারণের মাঝে সর্বমোট দাওয়াত প্রদান সংখ্যা:</strong> {{totalDawahReached}} জন <strong>টার্গেট:</strong> {{totalDawahTarget}} জন</p>

<p class="c13 c11 section-title">১. ইউনিটে নিয়মিত গ্রুপভিত্তিক দাওয়াত:</p>
<table class="border-table">
  <tr>
    <td>কয়টি গ্রুপ বের হয়েছে</td>
    <td>অংশগ্রহণকারী</td>
    <td>দাওয়াত পেয়েছেন</td>
    <td>সহযোগী হয়েছেন</td>
  </tr>
  <tr>
    <td>{{groupCount}}</td>
    <td>{{groupParticipantCount}}</td>
    <td>{{groupDawahCount}}</td>
    <td>{{groupAssociateCount}}</td>
  </tr>
</table>

<p class="c13 c11 section-title">২. ব্যক্তিগত ও টার্গেট ভিত্তিক দাওয়াত:</p>
<table class="border-table">
  <tr>
    <td class="text-left">বিবরণ</td>
    <td style="width: 10%;">সদস্য (রুকন)</td>
    <td style="width: 10%;">কর্মী</td>
    <td class="text-left">বিবরণ</td>
    <td style="width: 10%;">মোট সংখ্যা</td>
  </tr>
  <tr>
    <td class="text-left">মোট জনশক্তি সংখ্যা</td>
    <td>{{personalMemberTotal}}</td>
    <td>{{personalWorkerTotal}}</td>
    <td class="text-left">দাওয়াত পেয়েছেন</td>
    <td>{{personalDawahCount}}</td>
  </tr>
  <tr>
    <td class="text-left">কতজন ব্যক্তিগতভাবে দাওয়াতী কাজ করেছেন</td>
    <td>{{personalMemberActive}}</td>
    <td>{{personalWorkerActive}}</td>
    <td class="text-left">সহযোগী হয়েছেন</td>
    <td>{{personalAssociateCount}}</td>
  </tr>
</table>

<p class="c13 c11 section-title">৩. সাধারণ সভা/দাওয়াতী সভা ও অন্যান্য কার্যক্রমের মাধ্যমে দাওয়াত:</p>
<table class="border-table">
  <tr>
    <td class="text-left" style="width: 40%;">দাওয়াত পেয়েছেন</td>
    <td style="width: 10%;">{{meetingDawahCount}}</td>
    <td class="text-left" style="width: 40%;">মোট সহযোগী হয়েছেন</td>
    <td style="width: 10%;">{{meetingAssociateCount}}</td>
  </tr>
</table>

<p class="c13 c11 section-title">৪. গণসংযোগ ও দাওয়াতী অভিযান পালন: <span class="note-text">(গণসংযোগ অভিযান পালনের সময় গ্রুপ সংখ্যা। ব্যক্তিগত ও গ্রুপভিত্তিক সহযোগী সদস্য বৃদ্ধির সংখ্যা শুধুমাত্র এই ছকে বসাতে হবে)</span></p>
<table class="border-table">
  <tr>
    <td class="text-left">বিবরণ</td>
    <td style="width: 10%; white-space: nowrap;">মোট গ্রুপ</td>
    <td style="width: 10%; white-space: nowrap;">অংশগ্রহণকারী</td>
    <td style="width: 10%; white-space: nowrap;">দাওয়াত পেয়েছেন</td>
    <td style="width: 10%; white-space: nowrap;">সহযোগী হয়েছেন</td>
  </tr>
  <tr><td class="text-left">গণসংযোগ দশক/পক্ষ</td><td>{{massGroupDecadeCount}}</td><td>{{massParticipantDecadeCount}}</td><td>{{massDawahDecadeCount}}</td><td>{{massAssociateDecadeCount}}</td></tr>
  <tr><td class="text-left">জেলা/মহা: ঘোষিত গণসংযোগ ও দাওয়াতী অভিযান</td><td>{{massGroupDistrictCount}}</td><td>{{massParticipantDistrictCount}}</td><td>{{massDawahDistrictCount}}</td><td>{{massAssociateDistrictCount}}</td></tr>
  <tr><td class="text-left">উলামা/পেশাজীবী গণসংযোগ সপ্তাহ</td><td>{{massGroupUlamaCount}}</td><td>{{massParticipantUlamaCount}}</td><td>{{massDawahUlamaCount}}</td><td>{{massAssociateUlamaCount}}</td></tr>
  <tr><td class="text-left">অন্যান্য</td><td>{{massGroupOtherCount}}</td><td>{{massParticipantOtherCount}}</td><td>{{massDawahOtherCount}}</td><td>{{massAssociateOtherCount}}</td></tr>
</table>

<p class="c13 c11 section-title">(খ) বিভাগ ভিত্তিক তথ্য:</p>
<p class="c13 c11 section-title">১. তা'লীমুল কুরআনের মাধ্যমে দাওয়াত:</p>
<table class="border-table">
  <tr>
    <td class="text-left" style="width: 30%;">ব্যক্তিগত উদ্যোগ</td>
    <td style="width: 1%; white-space: nowrap;">সদস্য (রুকন)</td>
    <td style="width: 1%; white-space: nowrap;">কর্মী</td>
    <td style="width: 1%; white-space: nowrap;">মোট</td>
    <td class="text-left" style="width: 30%;">সামষ্টিক উদ্যোগ</td>
    <td style="width: 1%; white-space: nowrap;">মোট সংখ্যা</td>
  </tr>
  <tr>
    <td class="text-left">কোরআন শিক্ষা প্রদান করেছেন</td>
    <td>{{quranTeacherRokon}}</td><td>{{quranTeacherKarmi}}</td><td>{{quranTeacherTotal}}</td>
    <td class="text-left">কোরআন শিক্ষার গ্রুপ/শিক্ষার্থী</td><td>{{quranGroupCount}}</td>
  </tr>
  <tr>
    <td class="text-left">কোরআন শিক্ষা প্রদান করা হয়েছে</td>
    <td>-</td><td>-</td><td>{{quranReachedCount}}</td>
    <td class="text-left">মক্তব/ফোরকানিয়া মাদ্রাসায়</td><td>{{quranMaktubCount}}</td>
  </tr>
</table>
<table class="border-table" style="margin-top: 5px;">
  <tr>
    <td class="text-left">কতজন সহীহ তিলাওয়াত শিখেছেন</td>
    <td style="width: 10%;">{{quranSahihLearnedCount}}</td>
    <td class="text-left">দাওয়াত পেয়েছেন</td>
    <td style="width: 10%;">{{quranReachedCount}}</td>
    <td class="text-left">সহযোগী হয়েছেন</td>
    <td style="width: 10%;">{{quranNewAssociate}}</td>
  </tr>
</table>

<p class="c13 c11 section-title">২. বিভিন্ন শ্রেণী-পেশার মানুষের মাঝে দাওয়াত:</p>
<table class="border-table">
  <tr>
    <td class="text-left">শ্রেণী-পেশার বিবরণ</td>
    <td style="width: 10%; white-space: nowrap;">দাওয়াত পেয়েছেন</td>
    <td style="width: 10%; white-space: nowrap;">সহযোগী হয়েছেন</td>
    <td style="width: 10%; white-space: nowrap;">টার্গেট</td>
    <td style="width: 10%; white-space: nowrap;">বাস্তবায়নের হার</td>
  </tr>
  <tr><td class="text-left">রাজনৈতিক ও বিশিষ্ট ব্যক্তিবর্গ</td><td>{{profPoliticalDawah}}</td><td>{{profPoliticalAssociate}}</td><td>{{profPoliticalTarget}}</td><td>{{profPoliticalRate}}</td></tr>
  <tr><td class="text-left">প্রান্তিক জনগোষ্ঠী (অতি দরিদ্র)</td><td>{{profMarginalDawah}}</td><td>{{profMarginalAssociate}}</td><td>{{profMarginalTarget}}</td><td>{{profMarginalRate}}</td></tr>
  <tr><td class="text-left">ভিন্নধর্মাবলম্বী</td><td>{{profOtherDawah}}</td><td>{{profOtherAssociate}}</td><td>{{profOtherTarget}}</td><td>{{profOtherRate}}</td></tr>
</table>

<p class="c13 c11 section-title">৩. পরিবার ভিত্তিক দাওয়াত:</p>
<table class="border-table">
  <tr>
    <td class="text-left" style="width: 40%;">দাওয়াতি কাজে অংশগ্রহণকারী মোট পরিবার</td>
    <td style="width: 10%;">{{familyTotalCount}}</td>
    <td class="text-left" style="width: 40%;">কতটি নতুন পরিবারে দাওয়াত পৌঁছানো হয়েছে</td>
    <td style="width: 10%;">{{familyNewCount}}</td>
  </tr>
</table>

<p class="c13 c11 section-title">৪. তথ্যপ্রযুক্তির মাধ্যমে দাওয়াত:</p>
<table class="border-table">
  <tr>
    <td class="text-left" style="width: 40%;">মোট উপযুক্ত জনশক্তি</td>
    <td style="width: 10%;">{{itManpowerCount}}</td>
    <td class="text-left" style="width: 40%;">মোট অংশগ্রহণকারী</td>
    <td style="width: 10%;">{{itParticipantCount}}</td>
  </tr>
</table>

<p class="c13 c11 section-title">(গ) দাওয়াহ ও প্রকাশনা: সংগঠন অনুমোদিত</p>
<table class="border-table">
  <tr>
    <td class="text-left">বিবরণ</td>
    <td style="width: 10%; white-space: nowrap;">মোট সংখ্যা</td>
    <td style="width: 10%; white-space: nowrap;">বৃদ্ধি</td>
    <td style="width: 10%; white-space: nowrap;">টার্গেট</td>
    <td class="text-left">বিবরণ</td>
    <td style="width: 10%; white-space: nowrap;">মোট সংখ্যা</td>
    <td style="width: 10%; white-space: nowrap;">বৃদ্ধি</td>
  </tr>
  <tr>
    <td class="text-left">বই বিলিকেন্দ্র</td>
    <td style="width: 1%; white-space: nowrap;">{{dawahPubLibraryCount}}</td>
    <td style="width: 1%; white-space: nowrap;">{{dawahPubLibraryIncrease}}</td>
    <td style="width: 1%; white-space: nowrap;">{{dawahPubLibraryTarget}}</td>
    <td class="text-left">বইয়ের সফট কপি বিলি (সংগঠন অনুমোদিত)</td>
    <td style="width: 1%; white-space: nowrap;">{{dawahPubSoftCopyDistributed}}</td>
    <td style="width: 1%; white-space: nowrap;">{{dawahPubSoftCopyIncrease}}</td>
  </tr>
  <tr>
    <td class="text-left">বিলি কেন্দ্রে বই</td>
    <td>{{dawahPubBookCount}}</td>
    <td>{{dawahPubBookIncrease}}</td>
    <td>{{dawahPubBookTarget}}</td>
    <td class="text-left">দাওয়াতী লিংক বিতরণ</td>
    <td>{{dawahPubDawatLinkDistributed}}</td>
    <td>{{dawahPubDawatLinkIncrease}}</td>
  </tr>
  <tr>
    <td class="text-left">বই বিলি/বিক্রি</td>
    <td>{{dawahPubBookDistributedCount}}</td>
    <td>{{dawahPubBookDistributedIncrease}}</td>
    <td>{{dawahPubBookDistributedTarget}}</td>
    <td class="text-left">সোনার বাংলা/সংগ্রাম/পৃথিবী কত কপি চলে</td>
    <td colspan="2">{{dawahPubSonarBanglaCount}} / {{dawahPubSangramCount}} / {{dawahPubPrithibiCount}}</td>
  </tr>
</table>

<p class="c13 c11 section-title">(ঘ) কর্মসূচী বাস্তবায়ন:</p>
<table class="border-table">
  <tr>
    <td style="width: 5%; white-space: nowrap;">ক্রম</td>
    <td class="text-left">কর্মসূচীর বিবরণ</td>
    <td style="width: 10%; white-space: nowrap;">সংখ্যা</td>
    <td style="width: 10%; white-space: nowrap;">টার্গেট</td>
    <td style="width: 10%; white-space: nowrap;">গড় উপস্থিতি</td>
  </tr>
  <tr><td>১.</td><td class="text-left">মাসিক সাধারণ সভা/পারিবারিক ইউনিটে সভা</td><td>{{progMeetingCount}}</td><td>{{progMeetingTarget}}</td><td>{{progMeetingAtt}}</td></tr>
  <tr><td>২.</td><td class="text-left">ইফতার মাহফিল (ব্যক্তিগত/সাংগঠনিক)</td><td>{{progIftarCount}}</td><td>{{progIftarTarget}}</td><td>{{progIftarAtt}}</td></tr>
  <tr><td>৩.</td><td class="text-left">চা চক্র/সামষ্টিক খাওয়া/শিক্ষা সফর</td><td>{{progTeaCount}}</td><td>{{progTeaTarget}}</td><td>{{progTeaAtt}}</td></tr>
</table>

<p class="c13 c11 section-title">■ সংগঠন: ১. জনশক্তি: <span class="note-text">(দাওয়াত ও তাবলীগের ‘ক’ এর অধীনে উল্লেখিত সকল সহযোগী সদস্যের সংখ্যা সংগঠনের জনশক্তির এ ছকে সর্বমোট সহযোগী সদস্যের ঘরে বসাতে হবে)</span></p>
<table class="border-table">
  <tr>
    <td rowspan="2" class="text-left" style="width: 15%;">জনশক্তির ধরণ</td>
    <td rowspan="2" style="width: 15%; white-space: nowrap;">বিগত সময়ের সংখ্যা</td>
    <td rowspan="2" style="width: 15%; white-space: nowrap;">বর্তমান সংখ্যা</td>
    <td colspan="2">বৃদ্ধি</td>
    <td rowspan="2" style="width: 10%; white-space: nowrap;">ঘাটতি</td>
    <td rowspan="2" style="width: 10%; white-space: nowrap;">টার্গেট</td>
    <td rowspan="2" style="width: 15%; white-space: nowrap;">বাস্তবায়নের হার</td>
  </tr>
  <tr>
    <td>মানোন্নয়ন</td><td>আগত</td>
  </tr>
  <tr><td class="text-left" style="white-space: nowrap;">মোট সদস্য (রুকন)</td><td>{{manpowerMemberPrev}}</td><td>{{manpowerMemberCurr}}</td><td>{{manpowerMemberIncUp}}</td><td>{{manpowerMemberIncIn}}</td><td>{{manpowerMemberDec}}</td><td>{{manpowerMemberTarget}}</td><td>{{manpowerMemberRate}}</td></tr>
  <tr><td class="text-left" style="white-space: nowrap;">মোট কর্মী</td><td>{{manpowerWorkerPrev}}</td><td>{{manpowerWorkerCurr}}</td><td>{{manpowerWorkerIncUp}}</td><td>{{manpowerWorkerIncIn}}</td><td>{{manpowerWorkerDec}}</td><td>{{manpowerWorkerTarget}}</td><td>{{manpowerWorkerRate}}</td></tr>
  <tr><td class="text-left" style="white-space: nowrap;">মোট সক্রিয় সহযোগী সদস্য</td><td>{{manpowerActiveAssocPrev}}</td><td>{{manpowerActiveAssocCurr}}</td><td>{{manpowerActiveAssocIncUp}}</td><td>{{manpowerActiveAssocIncIn}}</td><td>{{manpowerActiveAssocDec}}</td><td>{{manpowerActiveAssocTarget}}</td><td>{{manpowerActiveAssocRate}}</td></tr>
</table>

<p class="c13 c11 section-title">২. সহযোগী সদস্য ও ভিন্নধর্মালম্বী:</p>
<table class="border-table">
  <tr>
    <td class="text-left" style="width: 30%; white-space: nowrap;">সহযোগী</td>
    <td style="width: 14%; white-space: nowrap;">বিগত সময়ের সংখ্যা</td>
    <td style="width: 14%; white-space: nowrap;">বর্তমান সংখ্যা</td>
    <td style="width: 14%; white-space: nowrap;">বৃদ্ধি</td>
    <td style="width: 14%; white-space: nowrap;">টার্গেট</td>
    <td style="width: 14%; white-space: nowrap;">বাস্তবায়নের হার</td>
  </tr>
  <tr><td class="text-left" style="white-space: nowrap;">মোট সহযোগী সদস্য</td><td>{{assocTotalPrev}}</td><td>{{assocTotalCurr}}</td><td>{{assocTotalInc}}</td><td>{{assocTotalTarget}}</td><td>{{assocTotalRate}}</td></tr>
  <tr><td class="text-left" style="white-space: nowrap;">ভিন্নধর্মালম্বী কর্মী/সহযোগী সদস্য</td><td>{{assocOtherPrev}}</td><td>{{assocOtherCurr}}</td><td>{{assocOtherInc}}</td><td>{{assocOtherTarget}}</td><td>{{assocOtherRate}}</td></tr>
</table>

<p class="c13 c11 section-title">৩. মাসিক বৈঠকসমূহ:</p>
<table class="border-table">
  <tr>
    <td class="text-left" style="width:40%">বৈঠকের নাম</td>
    <td style="width:30%">বৈঠক সংখ্যা</td>
    <td style="width:30%">উপস্থিতি</td>
  </tr>
  <tr><td class="text-left">কর্মী বৈঠক</td><td>{{meetWorkerCount}}</td><td>{{meetWorkerAtt}}</td></tr>
  <tr><td class="text-left">পারিবারিক বৈঠক</td><td>{{meetFamilyCount}}</td><td>{{meetFamilyAtt}}</td></tr>
</table>

<p class="c13 c11 section-title">৪. পারিবারিক ইউনিট: <span class="note-text">(পরিবারের জনশক্তি পুরুষ ও মহিলা হলে পারিবারিক ইউনিটের হিসাব একবারই আসবে)</span></p>
<table class="border-table">
  <tr>
    <td class="text-left" style="width: 25%; white-space: nowrap;">ইউনিটের ধরন</td>
    <td style="width: 12.5%; white-space: nowrap;">বিগত সময়ের সংখ্যা</td>
    <td style="width: 12.5%; white-space: nowrap;">বর্তমান সংখ্যা</td>
    <td style="width: 12.5%; white-space: nowrap;">বৃদ্ধি</td>
    <td style="width: 12.5%; white-space: nowrap;">ঘাটতি</td>
    <td style="width: 12.5%; white-space: nowrap;">টার্গেট</td>
    <td style="width: 12.5%; white-space: nowrap;">বাস্তবায়নের হার</td>
  </tr>
  <tr><td class="text-left" style="white-space: nowrap;">মোট পারিবারিক ইউনিট</td><td>{{familyUnitPrev}}</td><td>{{familyUnitCurr}}</td><td>{{familyUnitInc}}</td><td>{{familyUnitDec}}</td><td>{{familyUnitTarget}}</td><td>{{familyUnitRate}}</td></tr>
</table>

<p class="c13 c11 section-title">৫. উর্ধ্বতন দায়িত্বশীলদের সফর সংখ্যা: {{upperLeaderVisitCount}}</p>

<p class="c13 c11 section-title">৬. ইয়ানতদাতা বৃদ্ধি:</p>
<table class="border-table">
  <tr>
    <td class="text-left" style="width: 50%;">ইয়ানতদাতার ধরণ</td>
    <td style="width: 15%; white-space: nowrap;">সংখ্যা</td>
    <td style="width: 35%; white-space: nowrap;">টাকার পরিমাণ</td>
  </tr>
  <tr><td class="text-left">সহযোগী সদস্য</td><td>{{ianotAssocCount}}</td><td>{{ianotAssocAmount}}</td></tr>
  <tr><td class="text-left">সুধী</td><td>{{ianotSudhiCount}}</td><td>{{ianotSudhiAmount}}</td></tr>
</table>

<p class="c13 c11 section-title">■ প্রশিক্ষণ: তারবিয়াত: <span class="note-text">(নৈতিক শিক্ষা ও সাংগঠনিক প্রশিক্ষণ)</span></p>
<table class="border-table">
  <tr>
    <td class="text-left" style="width: 50%;">কর্মসূচীর ধরণ</td>
    <td style="width: 15%; white-space: nowrap;">সংখ্যা</td>
    <td style="width: 15%; white-space: nowrap;">টার্গেট</td>
    <td style="width: 20%; white-space: nowrap;">উপস্থিতি</td>
  </tr>
  <tr><td class="text-left">তারবিয়াতী বৈঠক <span class="note-text">(সহীহ কুরআন অনুশীলন/মাসলা মাসায়েল/দারসে কুরআন/দারসে হাদীস/সমষ্টিক পাঠ/বিষয়ভিত্তিক আলোচনা)</span></td><td>{{tarbiyatMeetingCount}}</td><td>{{tarbiyatMeetingTarget}}</td><td>{{tarbiyatMeetingAtt}}</td></tr>
</table>

<p class="c13 c11 section-title">■ সমাজ সংস্কার ও সমাজ সেবা: ১. ব্যক্তিগত উদ্যোগে সামাজিক কাজ:</p>
<table class="border-table">
  <tr>
    <td class="text-left">ব্যক্তিগত উদ্যোগে সামাজিক কাজ করেছেন এমন জনশক্তি</td><td style="width: 10%;">{{socialPersonalWorkerCount}}</td>
    <td class="text-left">সর্বমোট সেবাপ্রাপ্ত সংখ্যা</td><td style="width: 10%;">{{socialPersonalServiceCount}}</td>
  </tr>
  <tr>
    <td class="text-left">স্বাস্থ্যসেবা কাজে অংশগ্রহণ করেছেন এমন জনশক্তি</td><td>{{socialHealthWorkerCount}}</td>
    <td class="text-left">মোট সেবাপ্রাপ্ত সংখ্যা</td><td>{{socialHealthServiceCount}}</td>
  </tr>
</table>

<p class="c13 c11 section-title">২. ইউনিটের উদ্যোগে সামাজিক কাজ:</p>
<table class="border-table">
  <tr>
    <td class="text-left">বিবরণ</td>
    <td style="width: 10%;">সংখ্যা</td>
    <td class="text-left">বিবরণ</td>
    <td style="width: 10%;">সংখ্যা</td>
  </tr>
  <tr>
    <td class="text-left">সামাজিক অনুষ্ঠানে অংশগ্রহণ/সহায়তা প্রদান</td><td>{{socialUnitEventAtt}}</td>
    <td class="text-left">মাতৃত্বকালীন সময়ে সেবা প্রদান/নবজাতক গিফট প্রদান</td><td>{{socialUnitMaternity}}</td>
  </tr>
  <tr>
    <td class="text-left">সামাজিক বিরোধ মীমাংসা/জনসচেতনতামূলক প্রোগ্রাম</td><td>{{socialUnitConflict}}</td>
    <td class="text-left">রোগীর পরিচর্যা/চিকিৎসা সহায়তা প্রদান/স্বেচ্ছায় রক্তদান</td><td>{{socialUnitPatientCare}}</td>
  </tr>
  <tr>
    <td class="text-left">মানবিক সহায়তা প্রদান/কর্জে হাসানা প্রদান</td><td>{{socialUnitHumanitarian}}</td>
    <td class="text-left">মাইয়্যেতের গোসল/জানাযায় অংশগ্রহণ</td><td>{{socialUnitFuneral}}</td>
  </tr>
  <tr>
    <td class="text-left">টেকনিক্যাল সেবা প্রদান</td><td>{{socialUnitTech}}</td>
    <td class="text-left">বৃক্ষরোপন (কতটি)</td><td>{{socialUnitTree}}</td>
  </tr>
  <tr>
    <td class="text-left">ভিন্নধর্মাবলম্বীদের সেবা</td><td>{{socialUnitOtherReligions}}</td>
    <td class="text-left"></td><td></td>
  </tr>
</table>

<p class="c13 c11 section-title">■ রাষ্ট্রীয় সংস্কার ও সংশোধন: যোগাযোগ ও অংশগ্রহণ</p>
<table class="border-table">
  <tr>
    <td class="text-left">রাজনৈতিক ব্যক্তিবর্গের সাথে যোগাযোগ</td><td style="width: 10%;">{{statePolComm}}</td>
    <td class="text-left">বিশিষ্ট ব্যক্তিবর্গের সাথে যোগাযোগ</td><td style="width: 10%;">{{stateEminentComm}}</td>
  </tr>
  <tr>
    <td class="text-left">উর্ধ্বতন সংগঠনের জনসভা/সমাবেশ/মিছিলে অংশগ্রহণকারীর সংখ্যা</td><td>{{stateUpperProgAtt}}</td>
    <td class="text-left">অন্যান্য</td><td>{{stateOtherComm}}</td>
  </tr>
</table>

<p class="c13 c11 section-title">■ বায়তুলমাল: মাসিক ওয়াদার পরিমাণ: {{baitulmalMonthlyTarget}}</p>
<table class="border-table">
  <tr>
    <td class="text-left">আয়ের বিবরণ</td><td style="width: 10%;">পরিমাণ</td>
    <td class="text-left">ব্যয়ের বিবরণ</td><td style="width: 10%;">পরিমাণ</td>
  </tr>
  <tr><td class="text-left">ইয়ানত</td><td>{{baitulmalIncome0}}</td><td class="text-left">ইয়ানত</td><td>{{baitulmalExpense0}}</td></tr>
  <tr><td class="text-left">এককালীন (ওয়াদা)</td><td>{{baitulmalIncome1}}</td><td class="text-left">এককালীন (কম্বল)</td><td>{{baitulmalExpense1}}</td></tr>
  <tr><td class="text-left">নির্বাচনী ফান্ড</td><td>{{baitulmalIncome2}}</td><td class="text-left">নির্বাচনী ফান্ড</td><td>{{baitulmalExpense2}}</td></tr>
  <tr><td class="text-left">সমাজসেবা</td><td>{{baitulmalIncome3}}</td><td class="text-left">সমাজসেবা</td><td>{{baitulmalExpense3}}</td></tr>
  <tr><td class="text-left">যাকাত</td><td>{{baitulmalIncome4}}</td><td class="text-left">যাকাত</td><td>{{baitulmalExpense4}}</td></tr>
  <tr><td class="text-left">ফিলিস্তিন</td><td>{{baitulmalIncome5}}</td><td class="text-left">ফিলিস্তিন</td><td>{{baitulmalExpense5}}</td></tr>
  <tr><td class="text-left">শহীদ ফান্ড</td><td>{{baitulmalIncome6}}</td><td class="text-left">শহীদ ফান্ড</td><td>{{baitulmalExpense6}}</td></tr>
  <tr><td class="text-left">বই বিক্রি</td><td>{{baitulmalIncome7}}</td><td class="text-left">অন্যান্য</td><td>{{baitulmalExpense7}}</td></tr>
  <tr><td class="text-right" style="font-weight:bold;">সর্বমোট</td><td style="font-weight:bold;">{{baitulmalIncomeTotal}}</td><td class="text-right" style="font-weight:bold;">সর্বমোট</td><td style="font-weight:bold;">{{baitulmalExpenseTotal}}</td></tr>
</table>


<p class="c13 c11 section-title">■ ইউনিট সভাপতির মন্তব্য:</p>
<table style="width: 100%; border: none; margin-top: 5px; font-size: 10pt; vertical-align: top;">
  <tr>
    <td style="width: 50%; vertical-align: top; border: none; padding-right: 10px;">
      <strong>সমস্যা:</strong><br/>
      {{remarksProblems}}
    </td>
    <td style="width: 50%; vertical-align: top; border: none;">
      <strong>সম্ভাবনা:</strong><br/>
      {{remarksProspects}}
    </td>
  </tr>
</table>

<div style="margin-top: 10px; text-align: right; font-weight: bold;">
  স্বাক্ষর ও তারিখ
</div>

`;
