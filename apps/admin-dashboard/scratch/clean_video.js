const fs = require('fs');

const inFile = 'design-development/React.js AI Video Generator _ TailAdmin - React.js Admin Dashboard Template.html';
const outFile = 'scratch/video_generator_clean.html';

let html = fs.readFileSync(inFile, 'utf8');

// Strip styles and scripts
html = html.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

// Find the main container
const startMarker = '<div class="relative h-[calc(100vh-134px)] xl:h-[calc(100vh-76px)] px-4 xl:flex xl:px-0 -mx-4 xl:-mx-6 -mt-6">';
const startIndex = html.indexOf(startMarker);

if (startIndex === -1) {
    console.error('Start marker not found');
    process.exit(1);
}

// Find matching closing div (naively, just take everything until the end of the main section or body)
// We know from previous files that the main container ends right before the closing </main>
const endIndex = html.indexOf('</main>', startIndex);

let cleanHtml = html.substring(startIndex, endIndex);

fs.writeFileSync(outFile, cleanHtml);
console.log('Cleaned HTML written to ' + outFile);
