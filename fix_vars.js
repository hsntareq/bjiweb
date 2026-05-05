const fs = require('fs');
const file = 'src/app/planning-reporting/print/thana-template.ts';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/{{dawahUnitPrev}}/g, '{{dawahUnitPrevious}}');
content = content.replace(/{{dawahUnitDecrease}}/g, '{{dawahUnitDeficit}}');

// Let's also fix the associate vars
content = content.replace(/{{activeAssociateCurrent}}/g, '{{karmiCurrent}}');
content = content.replace(/{{activeAssociateIncrease}}/g, '{{karmiIncrease}}');
content = content.replace(/{{activeAssociateTarget}}/g, '{{karmiTarget}}');

fs.writeFileSync(file, content);
