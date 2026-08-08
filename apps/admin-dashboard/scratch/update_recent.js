const fs = require('fs');
let code = fs.readFileSync('src/components/finance/RecentTransactions.tsx', 'utf8');

const importRegex = /import React from \"react\";/;
code = code.replace(importRegex, 'import React, { useState } from \"react\";\nimport { Dropdown } from \"@/components/ui/dropdown/Dropdown\";\nimport { DropdownItem } from \"@/components/ui/dropdown/DropdownItem\";');

const componentRegex = /export default function RecentTransactions\(\) \{/;
const stateVars = `
  const [openRow, setOpenRow] = useState<number | null>(null);
  
  const toggleRow = (index: number) => {
    setOpenRow(openRow === index ? null : index);
  };
`;

code = code.replace(componentRegex, 'export default function RecentTransactions() {\n' + stateVars);

let index = 0;
code = code.replace(/<div><div><button className=\"text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300\">([\s\S]*?)<\/button><\/div><div className=\"z-10\"[\s\S]*?View More<\/button>.*?Delete<\/button><\/div><\/div><\/div><\/div><\/td>/g, function(match, svgContent) {
  const currentIndex = index++;
  return `
<div className="relative">
  <button onClick={() => toggleRow(${currentIndex})} className="dropdown-toggle text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
    ${svgContent}
  </button>
  <Dropdown isOpen={openRow === ${currentIndex}} onClose={() => setOpenRow(null)} className="w-40 p-2 right-0">
    <DropdownItem onItemClick={() => setOpenRow(null)} className="flex w-full rounded-lg px-3 py-2 text-left text-theme-xs font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
      View More
    </DropdownItem>
    <DropdownItem onItemClick={() => setOpenRow(null)} className="flex w-full rounded-lg px-3 py-2 text-left text-theme-xs font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
      Delete
    </DropdownItem>
  </Dropdown>
</div></td>`;
});

fs.writeFileSync('src/components/finance/RecentTransactions.tsx', code);
