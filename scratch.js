const fs = require('fs');
const content = fs.readFileSync('src/app/planning-reporting/print/thana-template.ts', 'utf-8');
const lines = content.split('\n');
const targetContent = lines.slice(605, 841).join('\n');
const fs_out = fs.writeFileSync('targetContent.txt', targetContent);
