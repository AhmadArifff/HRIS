import React from "react";

export const InvoiceAddresses = () => {
  return (
    <>
<div className="flex flex-col gap-6 mb-9 sm:flex-row sm:items-center sm:justify-between">
 <div>
  <span className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-400">
   From
  </span>
  <h5 className="mb-2 text-base font-semibold text-gray-800 dark:text-white/90">
   Pimjo LLC
  </h5>
  <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
   1280, Clair Street,
   <br/>
   Massachusetts, New York - 02543
  </p>
  <span className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
   Issued On:
  </span>
  <span className="block text-sm text-gray-500 dark:text-gray-400">
   11 March, 2027
  </span>
 </div>
 <div className="h-px w-full bg-gray-200 dark:bg-gray-800 sm:h-[158px] sm:w-px">
 </div>
 <div className="sm:text-right">
  <span className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-400">
   To
  </span>
  <h5 className="mb-2 text-base font-semibold text-gray-800 dark:text-white/90">
   Albert Word
  </h5>
  <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
   355, Shobe Lane
   <br/>
   Colorado, Fort Collins - 80543
  </p>
  <span className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
   Due On:
  </span>
  <span className="block text-sm text-gray-500 dark:text-gray-400">
   16 March, 2027
  </span>
 </div>
</div>

    </>
  );
};
