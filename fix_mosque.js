const fs = require('fs');
const file = 'src/app/planning-reporting/print/thana-template.ts';
let lines = fs.readFileSync(file, 'utf8').split('\n');

const newLines = [
  '<p class="c13 c11 section-title">৬. মসজিদ/দাওয়াহ্‌ সেন্টার/তথ্যসেবা কেন্দ্রভিত্তিক দাওয়াত:</p>',
  '<table class="border-table">',
  '  <tr>',
  '    <td class="text-left">বিবরণ</td>',
  '    <td>মোট সংখ্যা</td>',
  '    <td>বৃদ্ধি</td>',
  '    <td class="text-left">বিবরণ</td>',
  '    <td>মোট সংখ্যা</td>',
  '    <td>বৃদ্ধি</td>',
  '  </tr>',
  '  <tr>',
  '    <td class="text-left">মসজিদ</td>',
  '    <td>{{mosqueTotalCount}}</td>',
  '    <td>{{mosqueTotalIncrease}}</td>',
  '    <td class="text-left">মসজিদভিত্তিক দাওয়াহ্ সেন্টার /সাধারণ দাওয়াহ্ সেন্টার</td>',
  '    <td>{{mosqueCenterCount}}</td>',
  '    <td>/</td>',
  '  </tr>',
  '  <tr>',
  '    <td class="text-left">দাওয়াতের আওতাভুক্ত মসজিদ</td>',
  '    <td>{{mosqueDawatCount}}</td>',
  '    <td>/</td>',
  '    <td class="text-left">তথ্যসেবা কেন্দ্র (মসজিদভিত্তিক/সাধারণ)</td>',
  '    <td>{{mosqueInfoCenterCount}}</td>',
  '    <td>{{mosqueInfoCenterIncrease}}</td>',
  '  </tr>',
  '</table>'
];

lines.splice(413, 35, ...newLines);
fs.writeFileSync(file, lines.join('\n'));
