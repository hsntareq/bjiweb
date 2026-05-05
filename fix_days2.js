const fs = require('fs');
const file = 'src/app/planning-reporting/print/thana-template.ts';
let lines = fs.readFileSync(file, 'utf8').split('\n');

// Line 1644 (0-indexed: 1643) has the May Day remnant cell inside the "others" row
// We need to find and clean this up
let result = [];
for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  // Remove the May Day cell that was accidentally left inside the Others row
  line = line.replace(/<td class="text-left">মে দিবস<\/td><td>{{dayMayCount}}<\/td><td>{{dayMayAttendance}}<\/td>/g, '');
  result.push(line);
}
fs.writeFileSync(file, result.join('\n'));
console.log('Done!');
