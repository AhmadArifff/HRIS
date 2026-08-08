const fs = require('fs');
let code = fs.readFileSync('src/components/finance/CashflowOverview.tsx', 'utf8');

const importRegex = /import React from \"react\";/;
code = code.replace(importRegex, 'import React, { useState } from \"react\";\nimport { Dropdown } from \"@/components/ui/dropdown/Dropdown\";\nimport { DropdownItem } from \"@/components/ui/dropdown/DropdownItem\";');

const componentRegex = /export default function CashflowOverview\(\) \{/;
const stateVars = `
  const [yearOpen, setYearOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState('2025');
  const years = ['2025', '2024', '2023'];

  const [monthOpen, setMonthOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('3 Month');
  const months = ['3 Month', '6 Month', '12 Month'];
`;

code = code.replace(componentRegex, 'export default function CashflowOverview() {\n' + stateVars);

const yearBtnRegex = /<button className=\"flex h-9 items-center justify-center gap-1\.5 rounded-lg border border-gray-300 px-2\.5 text-sm font-medium text-gray-700 shadow-xs dark:border-gray-700 dark:bg-white\/\[0\.03\] dark:text-gray-400\">[\s\S]*?<span>2025<\/span>[\s\S]*?<\/button>/;
const yearBtnReplacement = `
<div className="relative">
<button onClick={() => setYearOpen(!yearOpen)} className="dropdown-toggle flex h-9 items-center justify-center gap-1.5 rounded-lg border border-gray-300 px-2.5 text-sm font-medium text-gray-700 shadow-xs dark:border-gray-700 dark:bg-white/[0.03] dark:text-gray-400">
  <span>{selectedYear}</span>
  <svg className="transition-transform " width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.3125 7.21875L9 11.9063L13.6875 7.21875" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
</button>
<Dropdown isOpen={yearOpen} onClose={() => setYearOpen(false)} className="w-32 p-2">
  {years.map((year) => (
    <DropdownItem key={year} onItemClick={() => { setSelectedYear(year); setYearOpen(false); }} className="flex w-full items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-lg">
      {year}
      {selectedYear === year && (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.3334 4L6.00008 11.3333L2.66675 8" stroke="#465FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </DropdownItem>
  ))}
</Dropdown>
</div>
`;
code = code.replace(yearBtnRegex, yearBtnReplacement);

const monthBtnRegex = /<button className=\"flex h-9 items-center justify-center gap-1\.5 rounded-lg border border-gray-300 px-2\.5 text-sm font-medium text-gray-700 shadow-xs dark:border-gray-700 dark:bg-white\/\[0\.03\] dark:text-gray-400\">[\s\S]*?<span>3 Month<\/span>[\s\S]*?<\/button>/;
const monthBtnReplacement = `
<div className="relative">
<button onClick={() => setMonthOpen(!monthOpen)} className="dropdown-toggle flex h-9 items-center justify-center gap-1.5 rounded-lg border border-gray-300 px-2.5 text-sm font-medium text-gray-700 shadow-xs dark:border-gray-700 dark:bg-white/[0.03] dark:text-gray-400">
  <span>{selectedMonth}</span>
  <svg className="transition-transform " width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.3125 7.21875L9 11.9063L13.6875 7.21875" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
</button>
<Dropdown isOpen={monthOpen} onClose={() => setMonthOpen(false)} className="w-32 p-2">
  {months.map((month) => (
    <DropdownItem key={month} onItemClick={() => { setSelectedMonth(month); setMonthOpen(false); }} className="flex w-full items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-lg">
      {month}
      {selectedMonth === month && (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.3334 4L6.00008 11.3333L2.66675 8" stroke="#465FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </DropdownItem>
  ))}
</Dropdown>
</div>
`;
code = code.replace(monthBtnRegex, monthBtnReplacement);

fs.writeFileSync('src/components/finance/CashflowOverview.tsx', code);
