const fs = require('fs');

const inDir = 'C:/Users/ASUS/.gemini/antigravity/brain/b9b355fd-60eb-4e49-b951-99bb5b1f5885/scratch';
const outDir = 'C:/Users/ASUS/Documents/Web Dev/improving/free-nextjs-admin-dashboard-main/src/components/finance';

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

function toCamelCase(str) {
    return str.replace(/-([a-z])/g, g => g[1].toUpperCase());
}

function processHtml(html) {
    // Basic replacements
    let jsx = html.replace(/class=/g, 'className=')
                  .replace(/fill-rule=/g, 'fillRule=')
                  .replace(/clip-rule=/g, 'clipRule=')
                  .replace(/stroke-width=/g, 'strokeWidth=')
                  .replace(/stroke-linecap=/g, 'strokeLinecap=')
                  .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
                  .replace(/stroke-dasharray=/g, 'strokeDasharray=')
                  .replace(/stroke-opacity=/g, 'strokeOpacity=')
                  .replace(/fill-opacity=/g, 'fillOpacity=')
                  .replace(/clip-path=/g, 'clipPath=')
                  .replace(/for=/g, 'htmlFor=')
                  .replace(/<!--.*?-->/gs, '');

    // Replace <path d="..." ... >  if they contain colon attributes like data:longestSeries="true" or data:realIndex="0"
    jsx = jsx.replace(/data:longestSeries="[^"]*"/g, '')
             .replace(/data:realIndex="[^"]*"/g, '')
             .replace(/zIndex="[^"]*"/g, '');

    // Self-closing tags
    jsx = jsx.replace(/<input([^>]+)>/g, (m, attrs) => {
        if (attrs.endsWith('/')) return m;
        return `<input${attrs}/>`;
    });
    jsx = jsx.replace(/<img([^>]+)>/g, (m, attrs) => {
        if (attrs.endsWith('/')) return m;
        return `<img${attrs}/>`;
    });

    // Style attributes
    jsx = jsx.replace(/style="([^"]*)"/g, (match, styles) => {
        const styleObj = {};
        styles.split(';').forEach(s => {
            if (!s.trim()) return;
            let [key, ...values] = s.split(':');
            let value = values.join(':').trim();
            if (!key || !value) return;
            key = key.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
            styleObj[key] = value;
        });
        return `style={${JSON.stringify(styleObj)}}`;
    });

    return jsx;
}

const files = [
    { src: 'finance_total_balance.html', name: 'TotalBalance' },
    { src: 'finance_metrics.html', name: 'FinanceMetrics' },
    { src: 'finance_cashflow.html', name: 'CashflowOverview' },
    { src: 'finance_spending.html', name: 'Spending' },
    { src: 'finance_quicksend.html', name: 'QuickSend' },
    { src: 'finance_mycards.html', name: 'MyCards' },
    { src: 'finance_table.html', name: 'RecentTransactions' },
];

for (let file of files) {
    const raw = fs.readFileSync(`${inDir}/${file.src}`, 'utf8');
    const jsx = processHtml(raw);

    const componentContent = `"use client";
import React from "react";

export default function ${file.name}() {
  return (
    ${jsx}
  );
}
`;
    fs.writeFileSync(`${outDir}/${file.name}.tsx`, componentContent);
    console.log(`Created ${file.name}.tsx`);
}
