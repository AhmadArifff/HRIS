import React from "react";

export const MobileHeader = () => {
  return (
    <>
<div className="mt-4 flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-3 pl-5 xl:hidden dark:border-gray-800 dark:bg-white/[0.03]">
 <span className="text-lg font-medium text-gray-800 dark:text-white/90">
  Account
 </span>
 <button aria-label="Open settings menu" className="flex size-10 items-center justify-center rounded-lg border border-gray-300 text-gray-800 dark:border-gray-800 dark:text-white/90" type="button">
  <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
   <path d="M4 6L20 6M4 18L20 18M4 12L20 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
   </path>
  </svg>
 </button>
</div>

    </>
  );
};
