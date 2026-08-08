const fs = require('fs');

const inFile = 'scratch/video_layout.html';
const outDir = 'src/components/video-generator';

let html = fs.readFileSync(inFile, 'utf8');

function processHtml(html) {
    let jsx = html.replace(/class=/g, 'className=')
                  .replace(/fill-rule=/g, 'fillRule=')
                  .replace(/clip-rule=/g, 'clipRule=')
                  .replace(/stroke-width=/g, 'strokeWidth=')
                  .replace(/stroke-linecap=/g, 'strokeLinecap=')
                  .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
                  .replace(/for=/g, 'htmlFor=')
                  .replace(/<!--.*?-->/gs, '');

    jsx = jsx.replace(/<input([^>]+)>/g, (m, attrs) => {
        if (attrs.endsWith('/')) return m;
        return `<input${attrs}/>`;
    });
    jsx = jsx.replace(/<img([^>]+)>/g, (m, attrs) => {
        if (attrs.endsWith('/')) return m;
        return `<img${attrs}/>`;
    });
    // Add </textarea> if needed, although standard textarea is <textarea></textarea>
    return jsx;
}

const fullJsx = processHtml(html);

// ChatHeader (starts with <div className="mb-4 flex items-center justify-between)
let chatHeaderStart = fullJsx.indexOf('<div className="mb-4 flex items-center justify-between');
let chatHeaderEnd = fullJsx.indexOf('<div className="relative mx-auto items-center max-w-[720px]">');

const chatHeaderJsx = fullJsx.substring(chatHeaderStart, chatHeaderEnd);

// MessageList (starts with <div className="relative mx-auto items-center max-w-[720px]">)
let messageListStart = chatHeaderEnd;
let messageListEnd = fullJsx.indexOf('<div className="fixed bottom-5');

const messageListJsx = fullJsx.substring(messageListStart, messageListEnd);

// MessageInput (starts with <div className="fixed bottom-5)
let messageInputStart = messageListEnd;
let messageInputEnd = fullJsx.indexOf('<aside className="z-50  w-[280px]');
// we need to include the <div className="relative"> before <aside> as part of the structure, but wait...
// actually, let's just make the message input end right before <div className="relative"><aside>
let sidebarStart = fullJsx.indexOf('<div className="relative"><aside');
if (sidebarStart === -1) {
    sidebarStart = fullJsx.indexOf('<div className="relative">\n<aside') || fullJsx.indexOf('<div className="relative"> <aside') || fullJsx.lastIndexOf('<div className="relative">'); 
    // let's just find the last `<div className="relative">`
    const lastRelative = fullJsx.lastIndexOf('<div className="relative">');
    if (fullJsx.substring(lastRelative).includes('<aside')) {
        sidebarStart = lastRelative;
    }
}
messageInputEnd = sidebarStart;

const messageInputJsx = fullJsx.substring(messageInputStart, messageInputEnd);

// ChatSidebar
let chatSidebarStart = sidebarStart;
// To correctly end it, we just take the rest and strip the trailing closing divs of the layout
let chatSidebarJsx = fullJsx.substring(chatSidebarStart);
// Strip trailing </div>'s
const trailingDivs = chatSidebarJsx.match(/(<\/div>\s*)+$/);
if (trailingDivs) {
    chatSidebarJsx = chatSidebarJsx.substring(0, chatSidebarJsx.length - trailingDivs[0].length);
}

// Function to write a component
function writeComponent(name, content) {
    const componentStr = `"use client";
import React from "react";

export const ${name} = () => {
  return (
    <>
      ${content}
    </>
  );
};
`;
    fs.writeFileSync(`${outDir}/${name}.tsx`, componentStr);
    console.log(`Wrote ${name}.tsx`);
}

writeComponent('ChatHeader', chatHeaderJsx);
writeComponent('MessageList', messageListJsx);
writeComponent('MessageInput', messageInputJsx);
writeComponent('ChatSidebar', chatSidebarJsx);

