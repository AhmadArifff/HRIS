const fs = require('fs');

const html = fs.readFileSync('scratch/extract.html', 'utf8');

// Wait, the HTML structure in extract.html starts with:
// <div class="relative h-[calc(100vh-134px)] xl:h-[calc(100vh-76px)] px-4 xl:flex xl:px-0"
// And inside it, we have:
// 1. Mobile chats history header: <div class="my-6 flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-3 xl:hidden
// 2. Main content: <div class="flex-1 xl:pb-10">
// 3. Sidebar: <aside class="z-50 w-[280px] flex-col h-full border-l border-gray-200 bg-white p-6 ease-in-out dark:border-gray-800 dark:bg-gray-900 hidden xl:flex relative">

// Let's find the start and end of these parts.
const mainContentStart = html.indexOf('<div class="flex-1 xl:pb-10">');
if(mainContentStart !== -1) {
    const mainContentArea = html.substring(mainContentStart);
    // Find the ChatHeader: <div class="mb-4 flex items-center justify-between xl:p-4">
    const headerStart = mainContentArea.indexOf('<div class="mb-4 flex items-center justify-between xl:p-4">');
    // It ends right before the MessageList, which is a div with flex-col: <div class="flex flex-col gap-6">
    const messageListStart = mainContentArea.indexOf('<div class="flex flex-col gap-6">');
    
    if (headerStart !== -1 && messageListStart !== -1) {
        const chatHeaderHtml = mainContentArea.substring(headerStart, messageListStart);
        fs.writeFileSync('scratch/image_header.html', chatHeaderHtml);
        
        // Find MessageInput: <form class="flex items-center w-full gap-4 relative"> or similar
        // Let's search for the form element or the container for the input.
        const inputStart = mainContentArea.indexOf('<div class="relative">', messageListStart + 50); // Just a guess. Let's find the exact input container.
        
        // Actually, we can use regex to find the input box.
        const formStart = mainContentArea.indexOf('<form class="flex w-full items-center gap-4">');
        let messageListHtml = "";
        let messageInputHtml = "";
        if (formStart !== -1) {
             messageListHtml = mainContentArea.substring(messageListStart, formStart);
             // input goes until the end of the flex-1 div... 
             // but let's just grab formStart onwards
             messageInputHtml = mainContentArea.substring(formStart);
             // we need to slice before the aside
             const asideStart = messageInputHtml.indexOf('<aside');
             if (asideStart !== -1) {
                 messageInputHtml = messageInputHtml.substring(0, asideStart);
                 const sidebarHtml = mainContentArea.substring(formStart + asideStart);
                 fs.writeFileSync('scratch/image_sidebar.html', sidebarHtml);
             }
             fs.writeFileSync('scratch/image_list.html', messageListHtml);
             fs.writeFileSync('scratch/image_input.html', messageInputHtml);
        } else {
            console.log("Could not find input form.");
            // Maybe it's a div? 
            const divFormStart = mainContentArea.indexOf('<div class="relative mt-auto">') || mainContentArea.indexOf('<div class="relative">', messageListStart + 100);
            fs.writeFileSync('scratch/image_list.html', mainContentArea.substring(messageListStart, divFormStart));
            fs.writeFileSync('scratch/image_input.html', mainContentArea.substring(divFormStart));
        }
    }
}
