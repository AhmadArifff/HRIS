import React from "react";

export const ProductButtons = () => {
  return (
    <>
<div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
 <button className="inline-flex items-center justify-center gap-2 rounded-lg transition px-5 py-3.5 text-sm bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300">
  Draft
 </button>
 <button className="inline-flex items-center justify-center gap-2 rounded-lg transition px-5 py-3.5 text-sm bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300">
  Publish Product
 </button>
</div>

    </>
  );
};
