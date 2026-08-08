const fs = require('fs');
const path = require('path');

const dir = 'src/components/video-generator';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx')).map(f => path.join(dir, f));

function countTags(str, tag) {
    const openMatches = str.match(new RegExp(`<${tag}\\b[^>]*>`, 'g'));
    const closeMatches = str.match(new RegExp(`</${tag}>`, 'g'));
    return {
        open: openMatches ? openMatches.length : 0,
        close: closeMatches ? closeMatches.length : 0
    };
}

function balanceTags(content) {
    let newContent = content;
    const tags = ['div', 'span', 'button', 'a', 'p', 'form', 'svg', 'ul', 'li', 'aside', 'header'];
    
    const startIdx = newContent.indexOf('<>');
    const endIdx = newContent.lastIndexOf('</>');
    if (startIdx === -1 || endIdx === -1) return newContent;
    
    let innerJsx = newContent.substring(startIdx + 2, endIdx);
    
    tags.forEach(tag => {
        const counts = countTags(innerJsx, tag);
        if (counts.open > counts.close) {
            const diff = counts.open - counts.close;
            innerJsx = innerJsx + `</${tag}>`.repeat(diff);
        } else if (counts.close > counts.open) {
            const diff = counts.close - counts.open;
            innerJsx = `<${tag}>`.repeat(diff) + innerJsx;
        }
    });

    return newContent.substring(0, startIdx + 2) + innerJsx + newContent.substring(endIdx);
}

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    content = balanceTags(content);
    fs.writeFileSync(file, content);
    console.log(`Balanced ${file}`);
});
