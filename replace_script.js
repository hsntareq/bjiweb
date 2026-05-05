const fs = require('fs');
const content = fs.readFileSync('src/app/planning-reporting/print/thana-template.ts', 'utf-8');
const targetContent = fs.readFileSync('targetContent.txt', 'utf-8');
const replacement = fs.readFileSync('replacement.txt', 'utf-8');

if (content.includes(targetContent)) {
  const newContent = content.replace(targetContent, replacement);
  fs.writeFileSync('src/app/planning-reporting/print/thana-template.ts', newContent);
  console.log("Successfully replaced content.");
} else {
  console.log("Error: Target content not found.");
}
