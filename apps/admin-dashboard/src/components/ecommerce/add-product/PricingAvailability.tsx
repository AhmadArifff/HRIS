import React from "react";

export const PricingAvailability = () => {
  return (
    <>
<div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
 <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-800">
  <h2 className="text-lg font-medium text-gray-800 dark:text-white">
   Pricing &amp; Availability
  </h2>
 </div>
 <div className="space-y-5 p-4 sm:p-6">
  <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
   <div>
    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
     Weight(KG)
    </label>
    <div className="relative">
     <input className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-800" placeholder="15" type="number"/>
    </div>
   </div>
   <div>
    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
     Length(CM)
    </label>
    <div className="relative">
     <input className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-800" placeholder="120" type="number"/>
    </div>
   </div>
   <div>
    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
     Width(CM)
    </label>
    <div className="relative">
     <input className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-800" placeholder="23" type="number"/>
    </div>
   </div>
  </div>
  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
   <div className="">
    <label className="mb-1 inline-block text-sm font-semibold text-gray-700 dark:text-gray-400">
     Stock Quantity
    </label>
    <div className="flex h-11 divide-x divide-gray-300 overflow-hidden rounded-lg border border-gray-300 dark:divide-gray-800 dark:border-gray-700">
     <button className="inline-flex h-11 w-11 items-center justify-center bg-white text-gray-700 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white">
      <svg fill="none" height="24" viewBox="0 0 25 24" width="25" xmlns="http://www.w3.org/2000/svg">
       <path d="M6.66699 12H18.6677" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
       </path>
      </svg>
     </button>
     <div className="flex-1">
      <input className="h-full w-full border-0 bg-white text-center text-sm text-gray-700 outline-none focus:ring-0 dark:bg-gray-900 dark:text-gray-400" type="text" defaultValue="1"/>
     </div>
     <button className="inline-flex h-11 w-11 items-center justify-center bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white">
      <svg fill="none" height="24" viewBox="0 0 25 24" width="25" xmlns="http://www.w3.org/2000/svg">
       <path d="M6.66699 12.0002H18.6677M12.6672 6V18.0007" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
       </path>
      </svg>
     </button>
    </div>
   </div>
   <div>
    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
     Availability Status
    </label>
    <div className="relative">
     <select className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 text-gray-400 dark:text-gray-400">
      <option className="text-gray-700 dark:bg-gray-900 dark:text-gray-400" disabled value="">
       Select a Availability
      </option>
      <option className="text-gray-700 dark:bg-gray-900 dark:text-gray-400" value="1">
       In Stock
      </option>
      <option className="text-gray-700 dark:bg-gray-900 dark:text-gray-400" value="2">
       Out of Stock
      </option>
     </select>
     <svg className="absolute text-gray-700 dark:text-gray-400 right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.79175 8.02075L10.0001 13.2291L15.2084 8.02075" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
      </path>
     </svg>
    </div>
   </div>
  </div>
 </div>
</div>

    </>
  );
};
