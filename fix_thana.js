const fs = require('fs');
const file = 'src/app/planning-reporting/print/thana-template.ts';
let content = fs.readFileSync(file, 'utf8');

// 1. Departmental Info, Family, Mosque, IT, Cultural
content = content.replace(
  /<p class="c13 c11 section-title">৪\. বিভিন্ন শ্রেণী-পেশার মানুষের মাঝে দাওয়াত:[\s\S]*?<\/table>/,
  `<p class="c13 c11 section-title">৪. বিভিন্ন শ্রেণী-পেশার মানুষের মাঝে দাওয়াত:</p>
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
</table>`
);

content = content.replace(
  /<p class="c13 c11 section-title">৫\. পরিবারভিত্তিক দাওয়াত:[\s\S]*?<\/table>/,
  `<p class="c13 c11 section-title">৫. পরিবারভিত্তিক দাওয়াত:</p>
<table class="border-table">
  <tr>
    <td class="text-left" style="width:50%">দাওয়াতী কাজে অংশগ্রহণকারী মোট পরিবার:</td>
    <td style="width:50%">{{familyTotalCount}}</td>
  </tr>
  <tr>
    <td class="text-left" style="width:50%">মোট নতুন পরিবারে দাওয়াত পৌঁছানো হয়েছে:</td>
    <td style="width:50%">{{familyNewCount}}</td>
  </tr>
</table>`
);

content = content.replace(
  /<p class="c13 c11 section-title">৬\. মসজিদ\/দাওয়াহ্‌ সেন্টার\/তথ্যসেবা কেন্দ্রভিত্তিক দাওয়াত:[\s\S]*?<\/p>/,
  `<p class="c13 c11 section-title">৬. মসজিদ/দাওয়াহ্‌ সেন্টার/তথ্যসেবা কেন্দ্রভিত্তিক দাওয়াত:</p>
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
</table>`
);

content = content.replace(
  /<p class="c13 c11 section-title">৭\. তথ্যপ্রযুক্তির মাধ্যমে দাওয়াত:[\s\S]*?<\/table>/,
  `<p class="c13 c11 section-title">৭. তথ্যপ্রযুক্তির মাধ্যমে দাওয়াত:</p>
<table class="border-table">
  <tr>
    <td>মোট উপযুক্ত জনশক্তি সংখ্যা</td>
    <td>মোট অংশগ্রহণকারী সংখ্যা</td>
  </tr>
  <tr>
    <td>{{itManpowerCount}}</td>
    <td>{{itParticipantCount}}</td>
  </tr>
</table>`
);

content = content.replace(
  /<p class="c13 c11 section-title">৮\. সাংস্কৃতিক কাজের মাধ্যমে দাওয়াত:[\s\S]*?<\/table>/,
  ``
);


// 2. Dawah Publication
content = content.replace(
  /<tr>\s*<td class="text-left">বিবরণ<\/td>\s*<td>মোট সংখ্যা<\/td>\s*<td>বৃদ্ধি<\/td>\s*<td>টার্গেট<\/td>\s*<td class="text-left">বিবরণ<\/td>\s*<td>মোট সংখ্যা<\/td>\s*<td>বৃদ্ধি<\/td>\s*<\/tr>[\s\S]*?<\/table>/,
  `  <tr>
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
</table>`
);

// 3. Program Implementation
content = content.replace(
  /<tr><td style="width:5%">ক্র<\/td><td style="width:45%" class="text-left">কর্মসূচীর বিবরণ<\/td><td style="width:15%">মোট সংখ্যা<\/td><td style="width:15%">টার্গেট<\/td><td style="width:20%">গড় উপস্থিতি<\/td><\/tr>[\s\S]*?<\/table>/,
  `<tr>
    <td style="width:5%">ক্র</td>
    <td style="width:45%" class="text-left">কর্মসূচীর বিবরণ</td>
    <td style="width:15%">মোট সংখ্যা</td>
    <td style="width:15%">টার্গেট</td>
    <td style="width:20%">গড় উপস্থিতি</td>
  </tr>
  <tr>
    <td>১.</td>
    <td class="text-left">ইউনিটে মাসিক সাধারণ সভা/পারিবারিক ইউনিটে সভা</td>
    <td>{{progMonthlyMeetingGeneralCount}} / {{progMonthlyMeetingFamilyCount}}</td>
    <td>{{progMonthlyMeetingGeneralTarget}} / {{progMonthlyMeetingFamilyTarget}}</td>
    <td>{{progMonthlyMeetingGeneralAttendance}} / {{progMonthlyMeetingFamilyAttendance}}</td>
  </tr>
  <tr>
    <td>২.</td>
    <td class="text-left">দাওয়াতী সভা/আলোচনা সভা/সুধী সমাবেশ</td>
    <td>{{progDawahMeetingDawahCount}} / {{progDawahMeetingDiscussionCount}} / {{progDawahMeetingGatheringCount}}</td>
    <td>{{progDawahMeetingDawahTarget}} / {{progDawahMeetingDiscussionTarget}} / {{progDawahMeetingGatheringTarget}}</td>
    <td>{{progDawahMeetingDawahAttendance}} / {{progDawahMeetingDiscussionAttendance}} / {{progDawahMeetingGatheringAttendance}}</td>
  </tr>
  <tr>
    <td>৩.</td>
    <td class="text-left">সীরাতুন্নবী(সাঃ) মাহফিল/ ঈদ পুনর্মিলনী</td>
    <td>{{progSiratunnabiSiratCount}} / {{progSiratunnabiEidCount}}</td>
    <td>{{progSiratunnabiSiratTarget}} / {{progSiratunnabiEidTarget}}</td>
    <td>{{progSiratunnabiSiratAttendance}} / {{progSiratunnabiEidAttendance}}</td>
  </tr>
  <tr>
    <td>৪.</td>
    <td class="text-left">দারস/তাফসীর/দাওয়াতি জনসভা ও ইসলামী মাহফিল</td>
    <td>{{progDarsTafsirDarsCount}} / {{progDarsTafsirTafsirCount}} / {{progDarsTafsirPublicCount}}</td>
    <td>{{progDarsTafsirDarsTarget}} / {{progDarsTafsirTafsirTarget}} / {{progDarsTafsirPublicTarget}}</td>
    <td>{{progDarsTafsirDarsAttendance}} / {{progDarsTafsirTafsirAttendance}} / {{progDarsTafsirPublicAttendance}}</td>
  </tr>
  <tr>
    <td>৫.</td>
    <td class="text-left">ইফতার মাহফিল (ব্যক্তিগত/সাংগঠনিক)</td>
    <td>{{progIftarPersonalCount}} / {{progIftarOrgCount}}</td>
    <td>{{progIftarPersonalTarget}} / {{progIftarOrgTarget}}</td>
    <td>{{progIftarPersonalAttendance}} / {{progIftarOrgAttendance}}</td>
  </tr>
  <tr>
    <td>৬.</td>
    <td class="text-left">চা চক্র/সামষ্টিক খাওয়া/শিক্ষা সফর</td>
    <td>{{progTeaCircleTeaCount}} / {{progTeaCircleLunchCount}} / {{progTeaCircleTourCount}}</td>
    <td>{{progTeaCircleTeaTarget}} / {{progTeaCircleLunchTarget}} / {{progTeaCircleTourTarget}}</td>
    <td>{{progTeaCircleTeaAttendance}} / {{progTeaCircleLunchAttendance}} / {{progTeaCircleTourAttendance}}</td>
  </tr>
  <tr>
    <td>৭.</td>
    <td class="text-left">কিরাত/হামদ না’ত প্রতিযোগিতা/ অন্যান্য</td>
    <td>{{progCompetitionCompCount}} / {{progCompetitionOtherCount}}</td>
    <td>{{progCompetitionCompTarget}} / {{progCompetitionOtherTarget}}</td>
    <td>{{progCompetitionCompAttendance}} / {{progCompetitionOtherAttendance}}</td>
  </tr>
</table>`
);

// 4. Baitulmal
content = content.replace(
  /<div style="text-align: center; margin: 20px 0;"><span style="border: 1px solid #000; padding: 5px 20px; font-weight: bold; ;">বায়তুলমাল<\/span><\/div>[\s\S]*?<\/table>/,
  `<div style="text-align: center; margin: 20px 0;"><span style="border: 1px solid #000; padding: 5px 20px; font-weight: bold; ;">বায়তুলমাল</span></div>

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
</table>`
);

fs.writeFileSync(file, content);
