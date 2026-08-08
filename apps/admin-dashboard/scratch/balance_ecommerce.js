const fs = require('fs');
const path = require('path');

const dir = 'src/components/ecommerce/products';

function balanceTags(content) {
    let divCount = (content.match(/<div/g) || []).length;
    let endDivCount = (content.match(/<\/div>/g) || []).length;
    
    if (divCount > endDivCount) {
        let diff = divCount - endDivCount;
        // insert </div> before closing parenthesis of return
        const idx = content.lastIndexOf(');');
        if (idx !== -1) {
            let closingTags = '</div>\n'.repeat(diff);
            content = content.substring(0, idx) + closingTags + content.substring(idx);
        }
    }
    
    let spanCount = (content.match(/<span/g) || []).length;
    let endSpanCount = (content.match(/<\/span>/g) || []).length;
    
    if (spanCount > endSpanCount) {
        let diff = spanCount - endSpanCount;
        const idx = content.lastIndexOf(');');
        if (idx !== -1) {
            let closingTags = '</span>\n'.repeat(diff);
            content = content.substring(0, idx) + closingTags + content.substring(idx);
        }
    }

    return content;
}

const files = fs.readdirSync(dir);
for (const file of files) {
    if (file.endsWith('.tsx')) {
        const fullPath = path.join(dir, file);
        let content = fs.readFileSync(fullPath, 'utf8');
        let newContent = balanceTags(content);
        if (content !== newContent) {
            fs.writeFileSync(fullPath, newContent);
            console.log('Balanced ' + fullPath);
        }
    }
}
