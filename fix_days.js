const fs = require('fs');
const file = 'src/app/planning-reporting/print/thana-template.ts';
let content = fs.readFileSync(file, 'utf8');

// Fix national day variables to match page.tsx pattern (capitalizes key)
// page.tsx uses: key.charAt(0).toUpperCase() + key.slice(1)
// 'independenceDay' -> 'IndependenceDay', 'victoryDay' -> 'VictoryDay', 'motherLanguageDay' -> 'MotherLanguageDay', 'others' -> 'Others'

content = content.replace(/{{dayIndependenceCount}}/g, '{{dayIndependenceDayCount}}');
content = content.replace(/{{dayIndependenceAttendance}}/g, '{{dayIndependenceDayAttendance}}');
content = content.replace(/{{dayVictoryCount}}/g, '{{dayVictoryDayCount}}');
content = content.replace(/{{dayVictoryAttendance}}/g, '{{dayVictoryDayAttendance}}');
content = content.replace(/{{dayMotherLanguageCount}}/g, '{{dayMotherLanguageDayCount}}');
content = content.replace(/{{dayMotherLanguageAttendance}}/g, '{{dayMotherLanguageDayAttendance}}');
content = content.replace(/{{dayOtherCount}}/g, '{{dayOthersCount}}');
content = content.replace(/{{dayOtherAttendance}}/g, '{{dayOthersAttendance}}');

// Remove May Day and Women's Day rows since they are not in page.tsx dayKeys
content = content.replace(/<\/tr>\s*<tr>\s*<td class="text-left">মে দিবস<\/td><td>{{dayMayCount}}<\/td><td>{{dayMayAttendance}}<\/td>\s*<\/tr>/g, '</tr>');
content = content.replace(/<td class="text-left">আন্তর্জাতিক নারী দিবস<\/td><td>{{dayWomenCount}}<\/td><td>{{dayWomenAttendance}}<\/td>/g, '');

fs.writeFileSync(file, content);
console.log('Done!');
