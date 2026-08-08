import React from "react";

export const ProductsDescription = () => {
  return (
    <>
<div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
 <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-800">
  <h2 className="text-lg font-medium text-gray-800 dark:text-white">
   Products Description
  </h2>
 </div>
 <div className="p-4 sm:p-6 dark:border-gray-800">
  <form>
   <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
    <div>
     <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
      Product Name
     </label>
     <div className="relative">
      <input className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-800" placeholder="Enter product name" type="text"/>
     </div>
    </div>
    <div>
     <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
      Category
     </label>
     <div className="relative">
      <select className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 text-gray-400 dark:text-gray-400">
       <option className="text-gray-700 dark:bg-gray-900 dark:text-gray-400" disabled value="">
        Select a category
       </option>
       <option className="text-gray-700 dark:bg-gray-900 dark:text-gray-400" value="Laptop">
        Laptop
       </option>
       <option className="text-gray-700 dark:bg-gray-900 dark:text-gray-400" value="Phone">
        Phone
       </option>
       <option className="text-gray-700 dark:bg-gray-900 dark:text-gray-400" value="Watch">
        Watch
       </option>
       <option className="text-gray-700 dark:bg-gray-900 dark:text-gray-400" value="Electronics">
        Electronics
       </option>
       <option className="text-gray-700 dark:bg-gray-900 dark:text-gray-400" value="Accessories">
        Accessories
       </option>
      </select>
      <svg className="absolute text-gray-700 dark:text-gray-400 right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
       <path d="M4.79175 8.02075L10.0001 13.2291L15.2084 8.02075" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
       </path>
      </svg>
     </div>
    </div>
    <div>
     <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
      Brand
     </label>
     <div className="relative">
      <select className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 text-gray-400 dark:text-gray-400">
       <option className="text-gray-700 dark:bg-gray-900 dark:text-gray-400" disabled value="">
        Select brand
       </option>
       <option className="text-gray-700 dark:bg-gray-900 dark:text-gray-400" value="1">
        Apple
       </option>
       <option className="text-gray-700 dark:bg-gray-900 dark:text-gray-400" value="2">
        Samsung
       </option>
       <option className="text-gray-700 dark:bg-gray-900 dark:text-gray-400" value="3">
        LG
       </option>
      </select>
      <svg className="absolute text-gray-700 dark:text-gray-400 right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
       <path d="M4.79175 8.02075L10.0001 13.2291L15.2084 8.02075" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
       </path>
      </svg>
     </div>
    </div>
    <div>
     <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
      Color
     </label>
     <div className="relative">
      <select className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 text-gray-400 dark:text-gray-400">
       <option className="text-gray-700 dark:bg-gray-900 dark:text-gray-400" disabled value="">
        Select color
       </option>
       <option className="text-gray-700 dark:bg-gray-900 dark:text-gray-400" value="1">
        Silver
       </option>
       <option className="text-gray-700 dark:bg-gray-900 dark:text-gray-400" value="2">
        Black
       </option>
       <option className="text-gray-700 dark:bg-gray-900 dark:text-gray-400" value="3">
        White
       </option>
       <option className="text-gray-700 dark:bg-gray-900 dark:text-gray-400" value="4">
        Gray
       </option>
      </select>
      <svg className="absolute text-gray-700 dark:text-gray-400 right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
       <path d="M4.79175 8.02075L10.0001 13.2291L15.2084 8.02075" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
       </path>
      </svg>
     </div>
    </div>
    <div className="col-span-full">
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
      <div className="col-span-full">
       <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
        Description
       </label>
       <div className="relative">
        <textarea className="w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs focus:outline-hidden bg-transparent text-gray-900 dark:text-gray-300 text-gray-900 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800" placeholder="Receipt Info (optional)" rows={6}></textarea>
       </div>
      </div>
     </div>
    </div>
   </div>
  </form>
 </div>
</div>

    </>
  );
};
