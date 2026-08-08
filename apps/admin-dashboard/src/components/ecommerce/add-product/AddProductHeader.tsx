import React from "react";

export const AddProductHeader = () => {
  return (
    <>
<div className="flex flex-wrap items-center justify-between gap-3 mb-6">
 <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90" x-text="pageName">
  Add Product
 </h2>
 <nav>
  <ol className="flex items-center gap-1.5">
   <li>
    <a className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400" data-discover="true" href="#">
     Home
     <svg className="stroke-current" fill="none" height="16" viewBox="0 0 17 16" width="17" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366" stroke="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2">
      </path>
     </svg>
    </a>
   </li>
   <li className="text-sm text-gray-800 dark:text-white/90">
    Add Product
   </li>
  </ol>
 </nav>
</div>

    </>
  );
};
