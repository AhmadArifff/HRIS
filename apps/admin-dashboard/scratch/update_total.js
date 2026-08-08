const fs = require('fs');
let code = fs.readFileSync('src/components/finance/TotalBalance.tsx', 'utf8');

const importRegex = /import React from \"react\";/;
code = code.replace(importRegex, 'import React, { useState } from \"react\";\nimport { Dropdown } from \"@/components/ui/dropdown/Dropdown\";\nimport { DropdownItem } from \"@/components/ui/dropdown/DropdownItem\";');

const componentRegex = /export default function TotalBalance\(\) \{/;
const stateVars = `
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState({ label: 'USD', flag: '🇺🇸' });
  const currencies = [
    { label: 'USD', flag: '🇺🇸' },
    { label: 'EUR', flag: '🇪🇺' },
    { label: 'GBP', flag: '🇬🇧' },
    { label: 'JPY', flag: '🇯🇵' },
  ];

  const [dateOpen, setDateOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('June 2025');
  const dates = ['June 2025', 'July 2025', 'August 2025'];
`;

code = code.replace(componentRegex, 'export default function TotalBalance() {\n' + stateVars);

// Replace currency button
const currencyBtnRegex = /<button className=\"flex h-9 items-center justify-center gap-2 rounded-lg border border-gray-300 px-3 text-sm font-medium text-gray-700 shadow-xs dark:border-gray-700 dark:bg-white\/\[0\.03\] dark:text-gray-400\">([\s\S]*?)<\/button>/;
const currencyBtnReplacement = `
<button onClick={() => setCurrencyOpen(!currencyOpen)} className="dropdown-toggle flex h-9 items-center justify-center gap-2 rounded-lg border border-gray-300 px-3 text-sm font-medium text-gray-700 shadow-xs dark:border-gray-700 dark:bg-white/[0.03] dark:text-gray-400">
  <span className="flex items-center gap-1.5">
    <span>{selectedCurrency.flag}</span>
    {selectedCurrency.label}
  </span>
  <svg className="transition-transform " width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.3125 7.21875L9 11.9063L13.6875 7.21875" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
</button>
<Dropdown isOpen={currencyOpen} onClose={() => setCurrencyOpen(false)} className="w-32 p-2">
  {currencies.map((curr) => (
    <DropdownItem key={curr.label} onItemClick={() => { setSelectedCurrency(curr); setCurrencyOpen(false); }} className="flex w-full items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-lg">
      <span className="flex items-center gap-2"><span>{curr.flag}</span> {curr.label}</span>
      {selectedCurrency.label === curr.label && (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.3334 4L6.00008 11.3333L2.66675 8" stroke="#465FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </DropdownItem>
  ))}
</Dropdown>
`;

code = code.replace(currencyBtnRegex, currencyBtnReplacement);

// Replace date button
const dateBtnRegex = /<button className=\"flex h-9 items-center justify-center gap-2 rounded-lg border border-gray-300 px-3 text-sm font-medium text-gray-700 shadow-xs dark:border-gray-700 dark:bg-white\/\[0\.03\] dark:text-gray-400\">([\s\S]*?)<span>June 2025<\/span>([\s\S]*?)<\/button>/;
const dateBtnReplacement = `
<button onClick={() => setDateOpen(!dateOpen)} className="dropdown-toggle flex h-9 items-center justify-center gap-2 rounded-lg border border-gray-300 px-3 text-sm font-medium text-gray-700 shadow-xs dark:border-gray-700 dark:bg-white/[0.03] dark:text-gray-400">
  <span>{selectedDate}</span>
  <svg className="transition-transform " width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.3125 7.21875L9 11.9063L13.6875 7.21875" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
</button>
<Dropdown isOpen={dateOpen} onClose={() => setDateOpen(false)} className="w-40 p-2">
  {dates.map((date) => (
    <DropdownItem key={date} onItemClick={() => { setSelectedDate(date); setDateOpen(false); }} className="flex w-full items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-lg">
      {date}
      {selectedDate === date && (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.3334 4L6.00008 11.3333L2.66675 8" stroke="#465FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </DropdownItem>
  ))}
</Dropdown>
`;

code = code.replace(dateBtnRegex, dateBtnReplacement);
fs.writeFileSync('src/components/finance/TotalBalance.tsx', code);
