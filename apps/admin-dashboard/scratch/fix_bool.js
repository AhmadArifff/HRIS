const fs = require('fs');

const files = ['MyCards.tsx', 'RecentTransactions.tsx'];
const boolAttrs = ['disabled', 'readonly', 'readOnly', 'required', 'selected', 'multiple', 'hidden', 'open', 'checked'];

for (const file of files) {
    const p = 'src/components/finance/' + file;
    let content = fs.readFileSync(p, 'utf8');
    for (const attr of boolAttrs) {
        const regex1 = new RegExp(attr + '="' + attr + '"', 'g');
        const regex2 = new RegExp(attr + '=""', 'g');
        content = content.replace(regex1, attr + '={true}');
        content = content.replace(regex2, attr + '={true}');
    }
    fs.writeFileSync(p, content);
}
