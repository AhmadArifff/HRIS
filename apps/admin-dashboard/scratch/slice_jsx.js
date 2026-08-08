const fs = require('fs');
const html = fs.readFileSync('scratch/image_generator.jsx', 'utf8');

const headerStart = html.indexOf('<div className="mb-4 flex items-center justify-between xl:p-4">');
const headerEnd = html.indexOf('<div className="relative mx-auto items-center max-w-[720px]">');
if (headerStart !== -1 && headerEnd !== -1) {
    fs.writeFileSync('scratch/image_header.jsx', html.substring(headerStart, headerEnd));
}

const listStart = headerEnd;
const listEnd = html.indexOf('<div className="relative mt-auto pt-4">') !== -1 
  ? html.indexOf('<div className="relative mt-auto pt-4">')
  : html.indexOf('<div\n                  className="relative mt-auto pt-4"');

if (listStart !== -1 && listEnd !== -1) {
    fs.writeFileSync('scratch/image_list.jsx', html.substring(listStart, listEnd));
}

const inputStart = listEnd;
const inputEnd = html.indexOf('<aside');
if (inputStart !== -1 && inputEnd !== -1) {
    const flex1End = html.lastIndexOf('</div>', inputEnd);
    fs.writeFileSync('scratch/image_input.jsx', html.substring(inputStart, flex1End));
}

const sidebarStart = html.indexOf('<aside className="z-50 w-[280px]');
const sidebarEnd = html.indexOf('</aside>', sidebarStart) + 8;
if (sidebarStart !== -1 && sidebarEnd !== -1) {
    fs.writeFileSync('scratch/image_sidebar.jsx', html.substring(sidebarStart, sidebarEnd));
}
