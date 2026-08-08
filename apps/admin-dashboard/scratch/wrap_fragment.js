const fs = require('fs');

const inDir = 'src/components/ecommerce/products';

function wrapWithFragment(file) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/return \(\s+/, 'return (\n    <>\n      ');
    content = content.replace(/\s+\);\n};\n$/, '\n    </>\n  );\n};\n');
    fs.writeFileSync(file, content);
}

const files = fs.readdirSync(inDir);
for (const file of files) {
    if (file.endsWith('.tsx')) {
        wrapWithFragment(`${inDir}/${file}`);
        console.log(`Wrapped ${file} with fragment.`);
    }
}
