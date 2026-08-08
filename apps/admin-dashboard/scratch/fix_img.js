const fs = require('fs');
const dir = 'src/components/finance/';
const files = fs.readdirSync(dir);

for (const file of files) {
  if (file.endsWith('.tsx')) {
    let content = fs.readFileSync(dir + file, 'utf8');
    let changed = false;
    
    // Fix src="images/..." to src="/images/..."
    if (content.includes('src="images/')) {
       content = content.replace(/src=\"images\//g, 'src="/images/');
       changed = true;
    }
    // Also check if any background-image might have url('images/...')
    if (content.includes("url('images/")) {
       content = content.replace(/url\(\'images\//g, "url('/images/");
       changed = true;
    }
    // Also check if any background-image might have url(images/...)
    if (content.includes("url(images/")) {
       content = content.replace(/url\(images\//g, "url(/images/");
       changed = true;
    }
    // Check if any src={'images/...'}
    if (content.includes("src={'images/")) {
       content = content.replace(/src=\{\'images\//g, "src={'/images/");
       changed = true;
    }
    if (changed) {
       fs.writeFileSync(dir + file, content);
       console.log('Fixed images in', file);
    }
  }
}
