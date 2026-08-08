const fs = require('fs');

const inFile = 'design-development/React.js AI Video Generator _ TailAdmin - React.js Admin Dashboard Template.html';

let html = fs.readFileSync(inFile, 'utf8');
const lines = html.split('\n');

const layoutHtml = lines[890]; // 0-indexed, so line 891 is index 890

if (!layoutHtml) {
    console.error("Layout HTML not found");
    process.exit(1);
}

// Write the layout HTML to a scratch file so we can convert it to JSX
fs.writeFileSync('scratch/video_layout.html', layoutHtml);
console.log("Wrote layout to scratch/video_layout.html");

