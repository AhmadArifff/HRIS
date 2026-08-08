const fs = require('fs');

const htmlPath = 'design-development/React.js AI Image Generator _ TailAdmin - React.js Admin Dashboard Template.html';
const html = fs.readFileSync(htmlPath, 'utf8');

const mainStart = html.indexOf('<main>');
const mainEnd = html.indexOf('</main>');

if (mainStart !== -1 && mainEnd !== -1) {
  let mainContent = html.substring(mainStart, mainEnd + 7);
  // strip out the standard page title if any, but let's just save it all first
  fs.writeFileSync('scratch/image_generator_raw.html', mainContent);
  console.log('Successfully extracted main content.');
} else {
  console.log('Could not find main tag.');
}
