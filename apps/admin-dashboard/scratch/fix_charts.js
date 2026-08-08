const fs = require('fs');

let cashflowPath = 'src/components/finance/CashflowOverview.tsx';
let cashflowContent = fs.readFileSync(cashflowPath, 'utf8');
cashflowContent = cashflowContent.replace(/columnWidth: "12px",/g, 'columnWidth: "30%",');
fs.writeFileSync(cashflowPath, cashflowContent);

let spendingPath = 'src/components/finance/Spending.tsx';
let spendingContent = fs.readFileSync(spendingPath, 'utf8');
spendingContent = spendingContent.replace(/barHeight: "50%",/g, 'barHeight: "100%",');
fs.writeFileSync(spendingPath, spendingContent);
console.log('Charts fixed');
