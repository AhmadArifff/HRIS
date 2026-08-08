const fs = require('fs');

const files = [
    'src/components/finance/TotalBalance.tsx',
    'src/components/finance/CashflowOverview.tsx',
    'src/components/finance/Spending.tsx'
];

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/<style type="text\/css">[\s\S]*?<\/style>/g, '');
    fs.writeFileSync(file, content);
}
