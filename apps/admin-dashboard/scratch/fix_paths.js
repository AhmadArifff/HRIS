const fs = require('fs');
let comp = 'src/components/finance/RecentTransactions.tsx';
let content = fs.readFileSync(comp, 'utf8');
content = content.replace(/\.\/React\.js Finance Dashboard _ TailAdmin \- React\.js Admin Dashboard Template_files\/user-\d+\.jpg/g, '/images/logo/90535516.jpg');
content = content.replace(/\.\/React\.js Finance Dashboard _ TailAdmin \- React\.js Admin Dashboard Template_files\//g, '/images/finance/');
// check for any input checkboxes with checked attribute
content = content.replace(/checked=""/g, 'defaultChecked={true}');
fs.writeFileSync(comp, content);
console.log('Fixed image paths in RecentTransactions.tsx');
