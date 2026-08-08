const fs = require('fs');
for (const file of ['MyCards.tsx', 'RecentTransactions.tsx']) {
    const p = 'src/components/finance/' + file;
    let content = fs.readFileSync(p, 'utf8');
    content = content.replace(/checked="checked"/g, 'checked={true}');
    content = content.replace(/checked=""/g, 'checked={true}');
    fs.writeFileSync(p, content);
}
