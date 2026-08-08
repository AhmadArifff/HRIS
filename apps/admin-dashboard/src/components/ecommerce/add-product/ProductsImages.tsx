import React from "react";

export const ProductsImages = () => {
  return (
    <>
<div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
 <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-800">
  <h2 className="text-lg font-medium text-gray-800 dark:text-white">
   Products Images
  </h2>
 </div>
 <div className="p-4 sm:p-6">
  <label className="shadow-theme-xs group hover:border-brand-500 block cursor-pointer rounded-lg border-2 border-dashed border-gray-300 transition dark:hover:border-brand-400 dark:border-gray-800" htmlFor="product-image">
   <div className="flex justify-center p-10">
    <div className="flex max-w-[260px] flex-col items-center gap-4">
     <div className="inline-flex h-13 w-13 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition dark:border-gray-800 dark:text-gray-400">
      <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
       <path d="M20.0004 16V18.5C20.0004 19.3284 19.3288 20 18.5004 20H5.49951C4.67108 20 3.99951 19.3284 3.99951 18.5V16M12.0015 4L12.0015 16M7.37454 8.6246L11.9994 4.00269L16.6245 8.6246" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
       </path>
      </svg>
     </div>
     <p className="text-center text-sm text-gray-500 dark:text-gray-400">
      <span className="font-medium text-gray-800 dark:text-white/90">
       Click to upload
      </span>
      or drag and drop SVG, PNG, JPG or GIF (MAX. 800x400px)
     </p>
    </div>
   </div>
   <input className="hidden" id="product-image" type="file"/>
  </label>
 </div>
</div>

    </>
  );
};
