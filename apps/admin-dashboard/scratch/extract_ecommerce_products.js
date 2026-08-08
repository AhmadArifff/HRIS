const fs = require('fs');

const inFile = 'design-development/React.js E-commerce Products _ TailAdmin - React.js Admin Dashboard Template.html';
const outFile = 'scratch/ecommerce_products.html';

let html = fs.readFileSync(inFile, 'utf8');

const startMarker = '<div class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">';
const startIndex = html.indexOf(startMarker);

if (startIndex === -1) {
    console.error('Start marker not found');
    process.exit(1);
}

// We just find where </main> is
let mainEndIndex = html.indexOf('</main>', startIndex);
let snippet = html.substring(startIndex, mainEndIndex);

// Let's remove the last closing </div> that closes <main> or something if it's there
// Actually snippet is just inside <main> and before </main>, so it might contain extra divs?
// Well, we can use the balance tag script later to fix it.

fs.writeFileSync(outFile, snippet);
console.log('Extracted to ' + outFile);
