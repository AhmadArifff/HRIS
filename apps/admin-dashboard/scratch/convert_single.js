const fs = require('fs');

let html = fs.readFileSync('scratch/correct_table.html', 'utf8');

// Replace class with className
html = html.replace(/class=\"/g, 'className=\"');
// Fix unclosed input tags
html = html.replace(/<input(.*?)>/g, (match, p1) => {
    if (p1.endsWith('/')) return match;
    return '<input' + p1 + '/>';
});
// Fix unclosed img tags
html = html.replace(/<img(.*?)>/g, (match, p1) => {
    if (p1.endsWith('/')) return match;
    return '<img' + p1 + '/>';
});
// Fix boolean attributes (disabled)
html = html.replace(/disabled=\"\"/g, "disabled={true}");
// Replace any svg attributes like fill-rule with fillRule
html = html.replace(/fill-rule/g, 'fillRule');
html = html.replace(/clip-rule/g, 'clipRule');
html = html.replace(/stroke-width/g, 'strokeWidth');
html = html.replace(/stroke-linecap/g, 'strokeLinecap');
html = html.replace(/stroke-linejoin/g, 'strokeLinejoin');

// Fix style attributes
html = html.replace(/style=\"(.*?)\"/g, (match, styleString) => {
    let styles = styleString.split(';').filter(s => s.trim().length > 0);
    let styleObj = {};
    styles.forEach(s => {
        let [key, val] = s.split(':').map(x => x.trim());
        if (key && val) {
            // convert kebab-case to camelCase
            key = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
            styleObj[key] = val;
        }
    });
    return 'style={' + JSON.stringify(styleObj) + '}';
});

// wrap it in a functional component
const tsx = 'import React from "react";\n\nexport default function RecentTransactions() {\n  return (\n    ' + html + '\n  );\n}\n';

fs.writeFileSync('src/components/finance/RecentTransactions.tsx', tsx);
console.log('Converted table to RecentTransactions.tsx');
