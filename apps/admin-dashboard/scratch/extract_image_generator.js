const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const htmlPath = 'design-development/React.js AI Image Generator _ TailAdmin - React.js Admin Dashboard Template.html';
const html = fs.readFileSync(htmlPath, 'utf8');
const dom = new JSDOM(html);
const document = dom.window.document;

const mainContent = document.querySelector('main');
if (mainContent) {
  // To avoid getting all the sidebar/header fluff, let's look for the container inside main.
  const container = mainContent.querySelector('div.mx-auto.max-w-screen-2xl');
  if (container) {
    fs.writeFileSync('scratch/image_generator_raw.html', container.innerHTML);
    console.log('Successfully extracted main container content.');
  } else {
    fs.writeFileSync('scratch/image_generator_raw.html', mainContent.innerHTML);
    console.log('Successfully extracted main content.');
  }
} else {
  console.log('Could not find main tag.');
}
