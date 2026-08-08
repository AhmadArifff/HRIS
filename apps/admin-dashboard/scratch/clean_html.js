const fs = require('fs');

const htmlPath = 'design-development/React.js AI Image Generator _ TailAdmin - React.js Admin Dashboard Template.html';
const html = fs.readFileSync(htmlPath, 'utf8');

// Strip out everything before <body> and after </body>
const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);

if (bodyMatch) {
  let bodyContent = bodyMatch[1];
  
  // Remove scripts
  bodyContent = bodyContent.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  // Remove styles
  bodyContent = bodyContent.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
  // Remove SVG symbols
  bodyContent = bodyContent.replace(/<svg\b[^>]*display:\s*none[^>]*>[\s\S]*?<\/svg>/gi, '');
  
  fs.writeFileSync('scratch/image_generator_clean.html', bodyContent);
  console.log('Cleaned HTML saved to scratch/image_generator_clean.html');
} else {
  console.log('No body tag found.');
}
