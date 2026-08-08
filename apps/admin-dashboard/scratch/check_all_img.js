const fs = require('fs');
const path = require('path');

function getFiles(dir, files = []) {
    if (!fs.existsSync(dir)) return files;
    const fileList = fs.readdirSync(dir);
    for (const file of fileList) {
        const name = `${dir}/${file}`;
        if (fs.statSync(name).isDirectory()) {
            getFiles(name, files);
        } else {
            if (name.endsWith('.tsx')) {
                files.push(name);
            }
        }
    }
    return files;
}

const allFiles = [...getFiles('src/components/ecommerce'), ...getFiles('src/components/video-generator'), ...getFiles('src/components/image-generator'), ...getFiles('src/components/code-generator'), ...getFiles('src/components/text-generator')];

for (const file of allFiles) {
    let content = fs.readFileSync(file, 'utf8');
    let m = content.match(/src="[^"]+"/g);
    if (m) {
        console.log(`\nIn ${file}:`);
        console.log([...new Set(m)]);
    }
}
