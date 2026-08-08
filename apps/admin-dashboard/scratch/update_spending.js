const fs = require('fs');
let code = fs.readFileSync('src/components/finance/Spending.tsx', 'utf8');

const importRegex = /import React from \"react\";/;
code = code.replace(importRegex, 'import React, { useState } from \"react\";\nimport { Dropdown } from \"@/components/ui/dropdown/Dropdown\";\nimport { DropdownItem } from \"@/components/ui/dropdown/DropdownItem\";');

const componentRegex = /export default function Spending\(\) \{/;
const stateVars = `
  const [periodOpen, setPeriodOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('Yearly');
  const periods = ['Yearly', 'Monthly', 'Weekly'];
`;

code = code.replace(componentRegex, 'export default function Spending() {\n' + stateVars);

const btnRegex = /<button className=\"flex h-9 items-center justify-center gap-1\.5 rounded-lg border border-gray-300 px-2\.5 text-sm font-medium text-gray-700 shadow-xs dark:border-gray-700 dark:bg-white\/\[0\.03\] dark:text-gray-400\">[\s\S]*?<span>Yearly<\/span>[\s\S]*?<\/button>/;
const btnReplacement = `
<div className="relative">
<button onClick={() => setPeriodOpen(!periodOpen)} className="dropdown-toggle flex h-9 items-center justify-center gap-1.5 rounded-lg border border-gray-300 px-2.5 text-sm font-medium text-gray-700 shadow-xs dark:border-gray-700 dark:bg-white/[0.03] dark:text-gray-400">
  <span>{selectedPeriod}</span>
  <svg className="transition-transform " width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.3125 7.21875L9 11.9063L13.6875 7.21875" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
</button>
<Dropdown isOpen={periodOpen} onClose={() => setPeriodOpen(false)} className="w-32 p-2 right-0">
  {periods.map((period) => (
    <DropdownItem key={period} onItemClick={() => { setSelectedPeriod(period); setPeriodOpen(false); }} className="flex w-full items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-lg">
      {period}
      {selectedPeriod === period && (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.3334 4L6.00008 11.3333L2.66675 8" stroke="#465FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </DropdownItem>
  ))}
</Dropdown>
</div>
`;
code = code.replace(btnRegex, btnReplacement);

fs.writeFileSync('src/components/finance/Spending.tsx', code);
