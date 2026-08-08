const fs = require('fs');

const html = fs.readFileSync('scratch/image_generator_clean.html', 'utf8');

// 1. ChatHeader is from `<div class="mb-4 flex items-center justify-between xl:p-4">`
//    up to `</button>\n              </div>\n              <div class="relative mx-auto items-center max-w-[720px]">`
const headerStart = html.indexOf('<div class="mb-4 flex items-center justify-between xl:p-4">');
const headerEnd = html.indexOf('<div class="relative mx-auto items-center max-w-[720px]">');
if (headerStart !== -1 && headerEnd !== -1) {
    fs.writeFileSync('scratch/image_header.html', html.substring(headerStart, headerEnd));
}

// 2. MessageList is from `<div class="relative mx-auto items-center max-w-[720px]">` 
//    up to `<div class="relative mt-auto">` or similar form wrapper
const listStart = headerEnd;
const listEnd = html.indexOf('<div class="relative mt-auto pt-4">') !== -1 
    ? html.indexOf('<div class="relative mt-auto pt-4">') 
    : html.indexOf('<div\n                  class="relative mt-auto pt-4"');
    
if (listStart !== -1 && listEnd !== -1) {
    fs.writeFileSync('scratch/image_list.html', html.substring(listStart, listEnd));
}

// 3. MessageInput is from listEnd to the end of `<div class="flex-1 xl:pb-10">`
const inputStart = listEnd;
const inputEnd = html.indexOf('<aside'); // Sidebar starts next
if (inputStart !== -1 && inputEnd !== -1) {
    // wait, there is `</div>` closing `flex-1` before aside
    const flex1End = html.lastIndexOf('</div>', inputEnd);
    fs.writeFileSync('scratch/image_input.html', html.substring(inputStart, flex1End));
}

// 4. Sidebar is from `<aside` up to `</aside>`
const sidebarStart = html.indexOf('<aside class="z-50 w-[280px]');
const sidebarEnd = html.indexOf('</aside>', sidebarStart) + 8;
if (sidebarStart !== -1 && sidebarEnd !== -1) {
    fs.writeFileSync('scratch/image_sidebar.html', html.substring(sidebarStart, sidebarEnd));
}
