const fs = require('fs');

const path = 'src/components/ecommerce/invoices/InvoicesTable.tsx';
let code = fs.readFileSync(path, 'utf8');

let index = 0;
code = code.replace(/<div className=(?:"z-10"|{\`z-10.*?\`})[^>]*>/g, () => {
    return `<div className={\`z-10 absolute right-4 top-full mt-2 \${openDropdown === ${index++} ? 'block' : 'hidden'}\`}>`;
});

// Since the `toggleDropdown` button replacement also only applied to some if there were other classes?
// Let's check if the buttons were replaced properly. 
// Previously count 13 meant:
// 1 inside useState
// 1 inside toggleDropdown function
// 1 inside the first row toggleDropdown(0) ? No, wait. 11 inside openDropdown === ?
// Wait, my previous button replacement was:
// code.replace(/<button className="text-gray-500 dark:text-gray-400">/g, (match) => { return `<button onClick={() => toggleDropdown(${index++})} className="text-gray-500 dark:text-gray-400">`; });
// Let's replace any remaining <button className="text-gray-500 dark:text-gray-400"> just in case?
// If it replaced all 10, then index would be 10 now, but let's run it again to be safe. We only want to replace the trigger buttons.
// Wait! If the button was already replaced with onClick={() => toggleDropdown(idx)}, it won't match `<button className="text-gray-500 dark:text-gray-400">` anymore. So we don't need to touch it if they were all replaced.
// Let's make sure the wrapper `relative flex justify-center dropdown` was replaced correctly for ALL of them.
let index3 = 0;
code = code.replace(/<div className=(?:"relative flex justify-center dropdown"|{\`relative flex justify-center dropdown.*?\`})>/g, () => {
    return `<div className={\`relative flex justify-center dropdown \${openDropdown === ${index3++} ? 'z-50' : ''}\`}>`;
});

fs.writeFileSync(path, code);
console.log('Fixed dropdowns ' + index + ' replaced.');
