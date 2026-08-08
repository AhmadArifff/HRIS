const fs = require('fs');
const html = fs.readFileSync('scratch/image_generator_clean.html', 'utf8');

// The layout starts with: <div class="relative h-[calc(100vh-134px)] xl:h-[calc(100vh-76px)] px-4 xl:flex xl:px-0">
const layoutStart = html.indexOf('<div\n            class="relative h-[calc(100vh-134px)] xl:h-[calc(100vh-76px)] px-4 xl:flex xl:px-0"');
if (layoutStart === -1) {
  // Let's try ignoring whitespace
  const match = html.match(/class=\"relative h-\[calc\(100vh-134px\)\] xl:h-\[calc\(100vh-76px\)\] px-4 xl:flex xl:px-0\"[^>]*>/);
  if(match) {
    console.log("Found it using regex!");
    // Just find the end of the file from here.
    const slice = html.slice(match.index);
    fs.writeFileSync('scratch/extract.html', slice);
  }
} else {
    const slice = html.slice(layoutStart);
    fs.writeFileSync('scratch/extract.html', slice);
}
