const fs = require('fs');

const path = 'src/components/ecommerce/invoices/InvoicesTable.tsx';
let code = fs.readFileSync(path, 'utf8');

// The file doesn't have "use client" so we will add it.
if (!code.includes('"use client"')) {
    code = '"use client";\nimport { useState } from "react";\n' + code;
}

// Now we need to find the rows. They start with `<tr className="border-b border-gray-100 last:border-b-0 dark:border-gray-800">`
// Wait, we can just replace the dropdown toggle button.
// Currently the button is:
// <button className="text-gray-500 dark:text-gray-400">
// We will replace it with:
// <button onClick={() => toggleDropdown(INDEX)} className="text-gray-500 dark:text-gray-400">

// And the dropdown menu is:
// <div className="z-10 hidden absolute right-0 top-full mt-2" data-popper-placement="bottom-end" style={{}}>
// We will replace it with:
// <div className={`z-10 absolute right-0 top-full mt-2 ${openDropdown === INDEX ? '' : 'hidden'}`} data-popper-placement="bottom-end" style={{}}>

let index = 0;
code = code.replace(/<button className="text-gray-500 dark:text-gray-400">/g, (match) => {
    return `<button onClick={() => toggleDropdown(${index++})} className="text-gray-500 dark:text-gray-400">`;
});

let index2 = 0;
code = code.replace(/<div className="z-10 hidden absolute right-0 top-full mt-2" data-popper-placement="bottom-end" style={{}}>/g, (match) => {
    return `<div className={\`z-10 absolute right-4 top-full mt-2 \${openDropdown === ${index2++} ? 'block' : 'hidden'}\`} data-popper-placement="bottom-end" style={{}}>`;
});

// we also need to add state and toggle function inside the component.
// export const InvoicesTable = () => {
code = code.replace(/export const InvoicesTable = \(\) => {/, `export const InvoicesTable = () => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };
`);

// The problem is that clicking outside won't close it, but we can fix that later if requested.
// Wait, also need to make sure the relative wrapper has proper index or z-index so dropdowns show up above other rows.
// The wrapper is `<div className="relative flex justify-center dropdown">`
// We should probably add z-index to the wrapper if it's open.
let index3 = 0;
code = code.replace(/<div className="relative flex justify-center dropdown">/g, (match) => {
    return `<div className={\`relative flex justify-center dropdown \${openDropdown === ${index3++} ? 'z-50' : ''}\`}>`;
});


fs.writeFileSync(path, code);
console.log('Refactored InvoicesTable');
