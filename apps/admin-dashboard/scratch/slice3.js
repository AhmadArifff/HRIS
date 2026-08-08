const fs = require('fs');
const html = fs.readFileSync('scratch/image_generator.jsx', 'utf8');

const headerStart = html.indexOf('<div className="mb-4 flex items-center justify-between xl:p-4">');
const listStart = html.indexOf('<div\n                  className="custom-scrollbar relative z-20 max-h-[50vh] flex-1 mx-auto space-y-7 w-full overflow-y-auto pb-16"');
const inputStart = html.indexOf('<div\n                  className="fixed bottom-5 lg:bottom-10 left-1/2 z-20 w-full -translate-x-1/2 transform px-4 sm:px-6 lg:px-8"');
const sidebarStart = html.indexOf('<aside\n                className="z-50 w-[280px]');

// Actually to avoid \n matching issues let's use regex!
const getBlock = (startStr, endStr) => {
    const startRegex = new RegExp(startStr.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&').replace(/\\s\+/g, '\\s+'));
    const endRegex = new RegExp(endStr.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&').replace(/\\s\+/g, '\\s+'));
    
    // Instead of regex, let's just find substrings since we know exactly where things are!
};

// 1. Header
let hStart = html.indexOf('<div className="mb-4 flex items-center justify-between xl:p-4">');
let hEnd = html.indexOf('<div className="relative mx-auto items-center max-w-[720px]">');
fs.writeFileSync('scratch/image_header.jsx', html.substring(hStart, hEnd));

// 2. MessageList
let lStart = hEnd;
let lEnd = html.indexOf('<div\n                  className="fixed bottom-5 lg:bottom-10');
fs.writeFileSync('scratch/image_list.jsx', html.substring(lStart, lEnd));

// 3. MessageInput
let iStart = lEnd;
let iEnd = html.indexOf('<div className="relative">\n              <aside');
fs.writeFileSync('scratch/image_input.jsx', html.substring(iStart, iEnd));

// 4. Sidebar
let sStart = html.indexOf('<aside\n                className="z-50 w-[280px]');
let sEnd = html.indexOf('</aside>', sStart) + 8;
fs.writeFileSync('scratch/image_sidebar.jsx', html.substring(sStart, sEnd));

console.log("Done extracting!");
