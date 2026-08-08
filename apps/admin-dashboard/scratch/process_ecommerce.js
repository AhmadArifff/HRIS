const fs = require('fs');

const inFile = 'scratch/ecommerce_products.html';
const html = fs.readFileSync(inFile, 'utf8');

// The three main sections inside the container:
// 1. Header (contains "Products List" and Export/Add Product)
// 2. Filter (contains "Search..." and Filter button)
// 3. Table (contains "table")

// We can split by <div class="border-b border-gray-200 px-5 py-4 dark:border-gray-800">
// because the filter bar has that class.
// The header has: <div class="flex flex-col justify-between gap-5 border-b border-gray-200 px-5 py-4 sm:flex-row sm:items-center dark:border-gray-800">
// The table has: <div class="overflow-x-auto custom-scrollbar">

const headerStart = html.indexOf('<div class="flex flex-col justify-between');
const filterStart = html.indexOf('<div class="border-b border-gray-200 px-5 py-4 dark:border-gray-800">', headerStart + 10);
const tableStart = html.indexOf('<div class="overflow-x-auto custom-scrollbar">', filterStart + 10);

const headerHtml = html.substring(headerStart, filterStart);
const filterHtml = html.substring(filterStart, tableStart);
const tableHtml = html.substring(tableStart);

function processHtml(h) {
    let jsx = h.replace(/class=/g, 'className=')
               .replace(/fill-rule=/g, 'fillRule=')
               .replace(/clip-rule=/g, 'clipRule=')
               .replace(/stroke-width=/g, 'strokeWidth=')
               .replace(/stroke-linecap=/g, 'strokeLinecap=')
               .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
               .replace(/for=/g, 'htmlFor=');
               
    jsx = jsx.replace(/<input([^>]+)>/g, (m, attrs) => {
        if (attrs.endsWith('/')) return m;
        return `<input${attrs}/>`;
    });
    jsx = jsx.replace(/<img([^>]+)>/g, (m, attrs) => {
        if (attrs.endsWith('/')) return m;
        return `<img${attrs}/>`;
    });
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

const outDir = 'src/components/ecommerce/products';

function writeComponent(name, jsx) {
    const content = `"use client";
import React from "react";

export const ${name} = () => {
  return (
    ${jsx}
  );
};
`;
    fs.writeFileSync(`${outDir}/${name}.tsx`, content);
}

writeComponent('ProductsHeader', processHtml(headerHtml));
writeComponent('ProductsFilter', processHtml(filterHtml));
// Fix unclosed elements in table if any. Since we split from tableStart to the end, there might be a trailing </div> for the container.
let tHtml = tableHtml.trim();
if (tHtml.endsWith('</div>')) {
    tHtml = tHtml.substring(0, tHtml.length - 6);
}
// check if there's another </div> (for the main element)
if (tHtml.endsWith('</div>')) {
    tHtml = tHtml.substring(0, tHtml.length - 6);
}
writeComponent('ProductsTable', processHtml(tHtml));

console.log('Components created!');
