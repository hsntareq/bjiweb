const fs = require('fs');
const file = 'src/app/planning-reporting/print/thana-template.ts';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/{{activeAssociatePrev}}/g, '{{associatePrevious}}');
content = content.replace(/{{karmiCurrent}}/g, '{{associateCurrent}}');
content = content.replace(/{{karmiIncrease}}/g, '{{associateIncrease}}');
content = content.replace(/{{activeAssociateIncoming}}/g, '{{associateArrived}}');
content = content.replace(/{{activeAssociateDecrease}}/g, '{{associateDeficit}}');
content = content.replace(/{{karmiTarget}}/g, '{{associateTarget}}');
content = content.replace(/{{activeAssociateProgress}}/g, '{{associateRate}}');

fs.writeFileSync(file, content);
