"use client";
import { useState } from "react";
import React from "react";

export const InvoicesTable = () => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <>
<div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
 <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-gray-800">
  <div>
   <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
    Invoices
   </h3>
   <p className="text-sm text-gray-500 dark:text-gray-400">
    Your most recent invoices list
   </p>
  </div>
  <div className="flex gap-3.5">
   <div className="hidden h-11 items-center gap-0.5 rounded-lg bg-gray-100 p-0.5 lg:inline-flex dark:bg-gray-900">
    <button className="text-theme-sm h-10 rounded-md px-3 py-2 font-medium hover:text-gray-900 dark:hover:text-white shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800">
     All Invoices
    </button>
    <button className="text-theme-sm h-10 rounded-md px-3 py-2 font-medium hover:text-gray-900 dark:hover:text-white text-gray-500 dark:text-gray-400">
     Unpaid
    </button>
    <button className="text-theme-sm h-10 rounded-md px-3 py-2 font-medium hover:text-gray-900 dark:hover:text-white text-gray-500 dark:text-gray-400">
     Draft
    </button>
   </div>
   <div className="hidden flex-col gap-3 sm:flex sm:flex-row sm:items-center">
    <div className="relative">
     <span className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500 dark:text-gray-400">
      <svg className="fill-current" fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
       <path clipRule="evenodd" d="M3.04199 9.37363C3.04199 5.87693 5.87735 3.04199 9.37533 3.04199C12.8733 3.04199 15.7087 5.87693 15.7087 9.37363C15.7087 12.8703 12.8733 15.7053 9.37533 15.7053C5.87735 15.7053 3.04199 12.8703 3.04199 9.37363ZM9.37533 1.54199C5.04926 1.54199 1.54199 5.04817 1.54199 9.37363C1.54199 13.6991 5.04926 17.2053 9.37533 17.2053C11.2676 17.2053 13.0032 16.5344 14.3572 15.4176L17.1773 18.238C17.4702 18.5309 17.945 18.5309 18.2379 18.238C18.5308 17.9451 18.5309 17.4703 18.238 17.1773L15.4182 14.3573C16.5367 13.0033 17.2087 11.2669 17.2087 9.37363C17.2087 5.04817 13.7014 1.54199 9.37533 1.54199Z" fill="" fillRule="evenodd">
       </path>
      </svg>
     </span>
     <input className="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pr-4 pl-11 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden xl:w-[300px] dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30" placeholder="Search..." type="text" defaultValue=""/>
    </div>
    <div className="relative">
     <button className="shadow-theme-xs flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 sm:w-auto sm:min-w-[100px] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400" type="button">
      <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
       <path d="M14.6537 5.90414C14.6537 4.48433 13.5027 3.33331 12.0829 3.33331C10.6631 3.33331 9.51206 4.48433 9.51204 5.90415M14.6537 5.90414C14.6537 7.32398 13.5027 8.47498 12.0829 8.47498C10.663 8.47498 9.51204 7.32398 9.51204 5.90415M14.6537 5.90414L17.7087 5.90411M9.51204 5.90415L2.29199 5.90411M5.34694 14.0958C5.34694 12.676 6.49794 11.525 7.91777 11.525C9.33761 11.525 10.4886 12.676 10.4886 14.0958M5.34694 14.0958C5.34694 15.5156 6.49794 16.6666 7.91778 16.6666C9.33761 16.6666 10.4886 15.5156 10.4886 14.0958M5.34694 14.0958L2.29199 14.0958M10.4886 14.0958L17.7087 14.0958" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
       </path>
      </svg>
      Filter
     </button>
    </div>
    <button className="shadow-theme-xs flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-[11px] text-sm font-medium text-gray-700 sm:w-auto dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
     <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.6671 13.3333V15.4166C16.6671 16.1069 16.1074 16.6666 15.4171 16.6666H4.58301C3.89265 16.6666 3.33301 16.1069 3.33301 15.4166V13.3333M10.0013 3.33325L10.0013 13.3333M6.14553 7.18708L9.99958 3.33549L13.8539 7.18708" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
      </path>
     </svg>
     Export
    </button>
   </div>
  </div>
 </div>
 <div className="overflow-x-auto">
  <table className="w-full table-auto">
   <thead>
    <tr className="border-b border-gray-200 dark:divide-gray-800 dark:border-gray-800">
     <th className="p-4">
      <div className="flex w-full cursor-pointer items-center justify-between">
       <div className="flex items-center gap-3">
        <label className="flex cursor-pointer items-center text-sm font-medium text-gray-700 select-none dark:text-gray-400">
         <span className="relative">
          <input className="sr-only" type="checkbox"/>
          <span className="flex h-4 w-4 items-center justify-center rounded-sm border-[1.25px] bg-transparent border-gray-300 dark:border-gray-700">
           <span className="opacity-0">
            <svg fill="none" height="12" viewBox="0 0 12 12" width="12" xmlns="http://www.w3.org/2000/svg">
             <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6666">
             </path>
            </svg>
           </span>
          </span>
         </span>
        </label>
        <p className="text-theme-xs font-medium text-gray-700 dark:text-gray-400">
         Invoice Number
        </p>
       </div>
      </div>
     </th>
     <th className="cursor-pointer p-4 text-left text-xs font-medium text-gray-700 dark:text-gray-400">
      <div className="flex items-center gap-3">
       <p className="text-theme-xs font-medium text-gray-700 dark:text-gray-400">
        Customer
       </p>
       <span className="flex flex-col gap-0.5">
        <svg className="text-gray-300" fill="none" height="5" viewBox="0 0 8 5" width="8" xmlns="http://www.w3.org/2000/svg">
         <path d="M4.40962 0.585167C4.21057 0.300808 3.78943 0.300807 3.59038 0.585166L1.05071 4.21327C0.81874 4.54466 1.05582 5 1.46033 5H6.53967C6.94418 5 7.18126 4.54466 6.94929 4.21327L4.40962 0.585167Z" fill="currentColor">
         </path>
        </svg>
        <svg className="text-gray-300" fill="none" height="5" viewBox="0 0 8 5" width="8" xmlns="http://www.w3.org/2000/svg">
         <path d="M4.40962 4.41483C4.21057 4.69919 3.78943 4.69919 3.59038 4.41483L1.05071 0.786732C0.81874 0.455343 1.05582 0 1.46033 0H6.53967C6.94418 0 7.18126 0.455342 6.94929 0.786731L4.40962 4.41483Z" fill="currentColor">
         </path>
        </svg>
       </span>
      </div>
     </th>
     <th className="cursor-pointer p-4 text-left text-xs font-medium text-gray-700 dark:text-gray-400">
      <div className="flex items-center gap-3">
       <p className="text-theme-xs font-medium text-gray-700 dark:text-gray-400">
        Creation Date
       </p>
       <span className="flex flex-col gap-0.5">
        <svg className="text-gray-300" fill="none" height="5" viewBox="0 0 8 5" width="8" xmlns="http://www.w3.org/2000/svg">
         <path d="M4.40962 0.585167C4.21057 0.300808 3.78943 0.300807 3.59038 0.585166L1.05071 4.21327C0.81874 4.54466 1.05582 5 1.46033 5H6.53967C6.94418 5 7.18126 4.54466 6.94929 4.21327L4.40962 0.585167Z" fill="currentColor">
         </path>
        </svg>
        <svg className="text-gray-300" fill="none" height="5" viewBox="0 0 8 5" width="8" xmlns="http://www.w3.org/2000/svg">
         <path d="M4.40962 4.41483C4.21057 4.69919 3.78943 4.69919 3.59038 4.41483L1.05071 0.786732C0.81874 0.455343 1.05582 0 1.46033 0H6.53967C6.94418 0 7.18126 0.455342 6.94929 0.786731L4.40962 4.41483Z" fill="currentColor">
         </path>
        </svg>
       </span>
      </div>
     </th>
     <th className="cursor-pointer p-4 text-left text-xs font-medium text-gray-700 dark:text-gray-400">
      <div className="flex items-center gap-3">
       <p className="text-theme-xs font-medium text-gray-700 dark:text-gray-400">
        Due Date
       </p>
       <span className="flex flex-col gap-0.5">
        <svg className="text-gray-300" fill="none" height="5" viewBox="0 0 8 5" width="8" xmlns="http://www.w3.org/2000/svg">
         <path d="M4.40962 0.585167C4.21057 0.300808 3.78943 0.300807 3.59038 0.585166L1.05071 4.21327C0.81874 4.54466 1.05582 5 1.46033 5H6.53967C6.94418 5 7.18126 4.54466 6.94929 4.21327L4.40962 0.585167Z" fill="currentColor">
         </path>
        </svg>
        <svg className="text-gray-300" fill="none" height="5" viewBox="0 0 8 5" width="8" xmlns="http://www.w3.org/2000/svg">
         <path d="M4.40962 4.41483C4.21057 4.69919 3.78943 4.69919 3.59038 4.41483L1.05071 0.786732C0.81874 0.455343 1.05582 0 1.46033 0H6.53967C6.94418 0 7.18126 0.455342 6.94929 0.786731L4.40962 4.41483Z" fill="currentColor">
         </path>
        </svg>
       </span>
      </div>
     </th>
     <th className="p-4 text-left text-xs font-medium text-gray-700 dark:text-gray-400">
      Total
     </th>
     <th className="p-4 text-left text-xs font-medium text-gray-700 dark:text-gray-400">
      Status
     </th>
     <th className="p-4 text-left text-xs font-medium text-gray-700 dark:text-gray-400">
      <div className="relative">
       <span className="sr-only">
        Action
       </span>
      </div>
     </th>
    </tr>
   </thead>
   <tbody className="divide-x divide-y divide-gray-200 dark:divide-gray-800">
    <tr className="transition hover:bg-gray-50 dark:hover:bg-gray-900">
     <td className="p-4 whitespace-nowrap">
      <div className="group flex items-center gap-3">
       <label className="flex cursor-pointer items-center text-sm font-medium text-gray-700 select-none dark:text-gray-400">
        <span className="relative">
         <input className="sr-only" type="checkbox"/>
         <span className="flex h-4 w-4 items-center justify-center rounded-sm border-[1.25px] bg-transparent border-gray-300 dark:border-gray-700">
          <span className="opacity-0">
           <svg fill="none" height="12" viewBox="0 0 12 12" width="12" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6666">
            </path>
           </svg>
          </span>
         </span>
        </span>
       </label>
       <p className="text-theme-xs font-medium text-gray-700 group-hover:underline dark:text-gray-400">
        #323534
       </p>
      </div>
     </td>
     <td className="p-4 whitespace-nowrap">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-400">
       Lindsey Curtis
      </span>
     </td>
     <td className="p-4 whitespace-nowrap">
      <p className="text-sm text-gray-700 dark:text-gray-400">
       August 7, 2028
      </p>
     </td>
     <td className="p-4 whitespace-nowrap">
      <p className="text-sm text-gray-700 dark:text-gray-400">
       February 28, 2028
      </p>
     </td>
     <td className="p-4 whitespace-nowrap">
      <p className="text-sm text-gray-700 dark:text-gray-400">
       $999
      </p>
     </td>
     <td className="p-4 whitespace-nowrap">
      <span className="text-theme-xs rounded-full px-2 py-0.5 font-medium bg-success-50 dark:bg-success-500/15 text-success-700 dark:text-success-500">
       Paid
      </span>
     </td>
     <td className="p-4 whitespace-nowrap">
      <div className={`relative flex justify-center dropdown ${openDropdown === 0 ? 'z-50' : ''}`}>
       <div>
        <div>
         <button onClick={() => toggleDropdown(0)} className="text-gray-500 dark:text-gray-400">
          <svg className="fill-current" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
           <path clipRule="evenodd" d="M5.99902 10.245C6.96552 10.245 7.74902 11.0285 7.74902 11.995V12.005C7.74902 12.9715 6.96552 13.755 5.99902 13.755C5.03253 13.755 4.24902 12.9715 4.24902 12.005V11.995C4.24902 11.0285 5.03253 10.245 5.99902 10.245ZM17.999 10.245C18.9655 10.245 19.749 11.0285 19.749 11.995V12.005C19.749 12.9715 18.9655 13.755 17.999 13.755C17.0325 13.755 16.249 12.9715 16.249 12.005V11.995C16.249 11.0285 17.0325 10.245 17.999 10.245ZM13.749 11.995C13.749 11.0285 12.9655 10.245 11.999 10.245C11.0325 10.245 10.249 11.0285 10.249 11.995V12.005C10.249 12.9715 11.0325 13.755 11.999 13.755C12.9655 13.755 13.749 12.9715 13.749 12.005V11.995Z" fill="" fillRule="evenodd">
           </path>
          </svg>
         </button>
        </div>
        <div className={`z-10 absolute right-4 top-full mt-2 ${openDropdown === 0 ? 'block' : 'hidden'}`}>
         <div className="p-2 bg-white border border-gray-200 rounded-2xl shadow-lg dark:border-gray-800 dark:bg-gray-900 w-40" style={{}}>
          <div aria-labelledby="options-menu" aria-orientation="vertical" className="space-y-1" role="menu">
           <button className="text-xs flex w-full rounded-lg px-3 py-2 text-left font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
            View More
           </button>
           <button className="text-xs flex w-full rounded-lg px-3 py-2 text-left font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
            Delete
           </button>
          </div>
         </div>
        </div>
       </div>
      </div>
     </td>
    </tr>
    <tr className="transition hover:bg-gray-50 dark:hover:bg-gray-900">
     <td className="p-4 whitespace-nowrap">
      <div className="group flex items-center gap-3">
       <label className="flex cursor-pointer items-center text-sm font-medium text-gray-700 select-none dark:text-gray-400">
        <span className="relative">
         <input className="sr-only" type="checkbox"/>
         <span className="flex h-4 w-4 items-center justify-center rounded-sm border-[1.25px] bg-transparent border-gray-300 dark:border-gray-700">
          <span className="opacity-0">
           <svg fill="none" height="12" viewBox="0 0 12 12" width="12" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6666">
            </path>
           </svg>
          </span>
         </span>
        </span>
       </label>
       <p className="text-theme-xs font-medium text-gray-700 group-hover:underline dark:text-gray-400">
        #323535
       </p>
      </div>
     </td>
     <td className="p-4 whitespace-nowrap">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-400">
       John Doe
      </span>
     </td>
     <td className="p-4 whitespace-nowrap">
      <p className="text-sm text-gray-700 dark:text-gray-400">
       July 1, 2028
      </p>
     </td>
     <td className="p-4 whitespace-nowrap">
      <p className="text-sm text-gray-700 dark:text-gray-400">
       January 1, 2029
      </p>
     </td>
     <td className="p-4 whitespace-nowrap">
      <p className="text-sm text-gray-700 dark:text-gray-400">
       $1200
      </p>
     </td>
     <td className="p-4 whitespace-nowrap">
      <span className="text-theme-xs rounded-full px-2 py-0.5 font-medium bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500">
       Unpaid
      </span>
     </td>
     <td className="p-4 whitespace-nowrap">
      <div className={`relative flex justify-center dropdown ${openDropdown === 1 ? 'z-50' : ''}`}>
       <div>
        <div>
         <button onClick={() => toggleDropdown(1)} className="text-gray-500 dark:text-gray-400">
          <svg className="fill-current" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
           <path clipRule="evenodd" d="M5.99902 10.245C6.96552 10.245 7.74902 11.0285 7.74902 11.995V12.005C7.74902 12.9715 6.96552 13.755 5.99902 13.755C5.03253 13.755 4.24902 12.9715 4.24902 12.005V11.995C4.24902 11.0285 5.03253 10.245 5.99902 10.245ZM17.999 10.245C18.9655 10.245 19.749 11.0285 19.749 11.995V12.005C19.749 12.9715 18.9655 13.755 17.999 13.755C17.0325 13.755 16.249 12.9715 16.249 12.005V11.995C16.249 11.0285 17.0325 10.245 17.999 10.245ZM13.749 11.995C13.749 11.0285 12.9655 10.245 11.999 10.245C11.0325 10.245 10.249 11.0285 10.249 11.995V12.005C10.249 12.9715 11.0325 13.755 11.999 13.755C12.9655 13.755 13.749 12.9715 13.749 12.005V11.995Z" fill="" fillRule="evenodd">
           </path>
          </svg>
         </button>
        </div>
        <div className={`z-10 absolute right-4 top-full mt-2 ${openDropdown === 1 ? 'block' : 'hidden'}`}>
         <div className="p-2 bg-white border border-gray-200 rounded-2xl shadow-lg dark:border-gray-800 dark:bg-gray-900 w-40" style={{}}>
          <div aria-labelledby="options-menu" aria-orientation="vertical" className="space-y-1" role="menu">
           <button className="text-xs flex w-full rounded-lg px-3 py-2 text-left font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
            View More
           </button>
           <button className="text-xs flex w-full rounded-lg px-3 py-2 text-left font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
            Delete
           </button>
          </div>
         </div>
        </div>
       </div>
      </div>
     </td>
    </tr>
    <tr className="transition hover:bg-gray-50 dark:hover:bg-gray-900">
     <td className="p-4 whitespace-nowrap">
      <div className="group flex items-center gap-3">
       <label className="flex cursor-pointer items-center text-sm font-medium text-gray-700 select-none dark:text-gray-400">
        <span className="relative">
         <input className="sr-only" type="checkbox"/>
         <span className="flex h-4 w-4 items-center justify-center rounded-sm border-[1.25px] bg-transparent border-gray-300 dark:border-gray-700">
          <span className="opacity-0">
           <svg fill="none" height="12" viewBox="0 0 12 12" width="12" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6666">
            </path>
           </svg>
          </span>
         </span>
        </span>
       </label>
       <p className="text-theme-xs font-medium text-gray-700 group-hover:underline dark:text-gray-400">
        #323536
       </p>
      </div>
     </td>
     <td className="p-4 whitespace-nowrap">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-400">
       Jane Smith
      </span>
     </td>
     <td className="p-4 whitespace-nowrap">
      <p className="text-sm text-gray-700 dark:text-gray-400">
       June 15, 2028
      </p>
     </td>
     <td className="p-4 whitespace-nowrap">
      <p className="text-sm text-gray-700 dark:text-gray-400">
       December 15, 2028
      </p>
     </td>
     <td className="p-4 whitespace-nowrap">
      <p className="text-sm text-gray-700 dark:text-gray-400">
       $850
      </p>
     </td>
     <td className="p-4 whitespace-nowrap">
      <span className="text-theme-xs rounded-full px-2 py-0.5 font-medium bg-gray-100 text-gray-600 dark:bg-gray-500/15 dark:text-gray-400">
       Draft
      </span>
     </td>
     <td className="p-4 whitespace-nowrap">
      <div className={`relative flex justify-center dropdown ${openDropdown === 2 ? 'z-50' : ''}`}>
       <div>
        <div>
         <button onClick={() => toggleDropdown(2)} className="text-gray-500 dark:text-gray-400">
          <svg className="fill-current" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
           <path clipRule="evenodd" d="M5.99902 10.245C6.96552 10.245 7.74902 11.0285 7.74902 11.995V12.005C7.74902 12.9715 6.96552 13.755 5.99902 13.755C5.03253 13.755 4.24902 12.9715 4.24902 12.005V11.995C4.24902 11.0285 5.03253 10.245 5.99902 10.245ZM17.999 10.245C18.9655 10.245 19.749 11.0285 19.749 11.995V12.005C19.749 12.9715 18.9655 13.755 17.999 13.755C17.0325 13.755 16.249 12.9715 16.249 12.005V11.995C16.249 11.0285 17.0325 10.245 17.999 10.245ZM13.749 11.995C13.749 11.0285 12.9655 10.245 11.999 10.245C11.0325 10.245 10.249 11.0285 10.249 11.995V12.005C10.249 12.9715 11.0325 13.755 11.999 13.755C12.9655 13.755 13.749 12.9715 13.749 12.005V11.995Z" fill="" fillRule="evenodd">
           </path>
          </svg>
         </button>
        </div>
        <div className={`z-10 absolute right-4 top-full mt-2 ${openDropdown === 2 ? 'block' : 'hidden'}`}>
         <div className="p-2 bg-white border border-gray-200 rounded-2xl shadow-lg dark:border-gray-800 dark:bg-gray-900 w-40" style={{}}>
          <div aria-labelledby="options-menu" aria-orientation="vertical" className="space-y-1" role="menu">
           <button className="text-xs flex w-full rounded-lg px-3 py-2 text-left font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
            View More
           </button>
           <button className="text-xs flex w-full rounded-lg px-3 py-2 text-left font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
            Delete
           </button>
          </div>
         </div>
        </div>
       </div>
      </div>
     </td>
    </tr>
    <tr className="transition hover:bg-gray-50 dark:hover:bg-gray-900">
     <td className="p-4 whitespace-nowrap">
      <div className="group flex items-center gap-3">
       <label className="flex cursor-pointer items-center text-sm font-medium text-gray-700 select-none dark:text-gray-400">
        <span className="relative">
         <input className="sr-only" type="checkbox"/>
         <span className="flex h-4 w-4 items-center justify-center rounded-sm border-[1.25px] bg-transparent border-gray-300 dark:border-gray-700">
          <span className="opacity-0">
           <svg fill="none" height="12" viewBox="0 0 12 12" width="12" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6666">
            </path>
           </svg>
          </span>
         </span>
        </span>
       </label>
       <p className="text-theme-xs font-medium text-gray-700 group-hover:underline dark:text-gray-400">
        #323537
       </p>
      </div>
     </td>
     <td className="p-4 whitespace-nowrap">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-400">
       Michael Brown
      </span>
     </td>
     <td className="p-4 whitespace-nowrap">
      <p className="text-sm text-gray-700 dark:text-gray-400">
       May 10, 2028
      </p>
     </td>
     <td className="p-4 whitespace-nowrap">
      <p className="text-sm text-gray-700 dark:text-gray-400">
       November 10, 2028
      </p>
     </td>
     <td className="p-4 whitespace-nowrap">
      <p className="text-sm text-gray-700 dark:text-gray-400">
       $1500
      </p>
     </td>
     <td className="p-4 whitespace-nowrap">
      <span className="text-theme-xs rounded-full px-2 py-0.5 font-medium bg-success-50 dark:bg-success-500/15 text-success-700 dark:text-success-500">
       Paid
      </span>
     </td>
     <td className="p-4 whitespace-nowrap">
      <div className={`relative flex justify-center dropdown ${openDropdown === 3 ? 'z-50' : ''}`}>
       <div>
        <div>
         <button onClick={() => toggleDropdown(3)} className="text-gray-500 dark:text-gray-400">
          <svg className="fill-current" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
           <path clipRule="evenodd" d="M5.99902 10.245C6.96552 10.245 7.74902 11.0285 7.74902 11.995V12.005C7.74902 12.9715 6.96552 13.755 5.99902 13.755C5.03253 13.755 4.24902 12.9715 4.24902 12.005V11.995C4.24902 11.0285 5.03253 10.245 5.99902 10.245ZM17.999 10.245C18.9655 10.245 19.749 11.0285 19.749 11.995V12.005C19.749 12.9715 18.9655 13.755 17.999 13.755C17.0325 13.755 16.249 12.9715 16.249 12.005V11.995C16.249 11.0285 17.0325 10.245 17.999 10.245ZM13.749 11.995C13.749 11.0285 12.9655 10.245 11.999 10.245C11.0325 10.245 10.249 11.0285 10.249 11.995V12.005C10.249 12.9715 11.0325 13.755 11.999 13.755C12.9655 13.755 13.749 12.9715 13.749 12.005V11.995Z" fill="" fillRule="evenodd">
           </path>
          </svg>
         </button>
        </div>
        <div className={`z-10 absolute right-4 top-full mt-2 ${openDropdown === 3 ? 'block' : 'hidden'}`}>
         <div className="p-2 bg-white border border-gray-200 rounded-2xl shadow-lg dark:border-gray-800 dark:bg-gray-900 w-40" style={{}}>
          <div aria-labelledby="options-menu" aria-orientation="vertical" className="space-y-1" role="menu">
           <button className="text-xs flex w-full rounded-lg px-3 py-2 text-left font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
            View More
           </button>
           <button className="text-xs flex w-full rounded-lg px-3 py-2 text-left font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
            Delete
           </button>
          </div>
         </div>
        </div>
       </div>
      </div>
     </td>
    </tr>
    <tr className="transition hover:bg-gray-50 dark:hover:bg-gray-900">
     <td className="p-4 whitespace-nowrap">
      <div className="group flex items-center gap-3">
       <label className="flex cursor-pointer items-center text-sm font-medium text-gray-700 select-none dark:text-gray-400">
        <span className="relative">
         <input className="sr-only" type="checkbox"/>
         <span className="flex h-4 w-4 items-center justify-center rounded-sm border-[1.25px] bg-transparent border-gray-300 dark:border-gray-700">
          <span className="opacity-0">
           <svg fill="none" height="12" viewBox="0 0 12 12" width="12" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6666">
            </path>
           </svg>
          </span>
         </span>
        </span>
       </label>
       <p className="text-theme-xs font-medium text-gray-700 group-hover:underline dark:text-gray-400">
        #323538
       </p>
      </div>
     </td>
     <td className="p-4 whitespace-nowrap">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-400">
       Emily Davis
      </span>
     </td>
     <td className="p-4 whitespace-nowrap">
      <p className="text-sm text-gray-700 dark:text-gray-400">
       April 5, 2028
      </p>
     </td>
     <td className="p-4 whitespace-nowrap">
      <p className="text-sm text-gray-700 dark:text-gray-400">
       October 5, 2028
      </p>
     </td>
     <td className="p-4 whitespace-nowrap">
      <p className="text-sm text-gray-700 dark:text-gray-400">
       $700
      </p>
     </td>
     <td className="p-4 whitespace-nowrap">
      <span className="text-theme-xs rounded-full px-2 py-0.5 font-medium bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500">
       Unpaid
      </span>
     </td>
     <td className="p-4 whitespace-nowrap">
      <div className={`relative flex justify-center dropdown ${openDropdown === 4 ? 'z-50' : ''}`}>
       <div>
        <div>
         <button onClick={() => toggleDropdown(4)} className="text-gray-500 dark:text-gray-400">
          <svg className="fill-current" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
           <path clipRule="evenodd" d="M5.99902 10.245C6.96552 10.245 7.74902 11.0285 7.74902 11.995V12.005C7.74902 12.9715 6.96552 13.755 5.99902 13.755C5.03253 13.755 4.24902 12.9715 4.24902 12.005V11.995C4.24902 11.0285 5.03253 10.245 5.99902 10.245ZM17.999 10.245C18.9655 10.245 19.749 11.0285 19.749 11.995V12.005C19.749 12.9715 18.9655 13.755 17.999 13.755C17.0325 13.755 16.249 12.9715 16.249 12.005V11.995C16.249 11.0285 17.0325 10.245 17.999 10.245ZM13.749 11.995C13.749 11.0285 12.9655 10.245 11.999 10.245C11.0325 10.245 10.249 11.0285 10.249 11.995V12.005C10.249 12.9715 11.0325 13.755 11.999 13.755C12.9655 13.755 13.749 12.9715 13.749 12.005V11.995Z" fill="" fillRule="evenodd">
           </path>
          </svg>
         </button>
        </div>
        <div className={`z-10 absolute right-4 top-full mt-2 ${openDropdown === 4 ? 'block' : 'hidden'}`}>
         <div className="p-2 bg-white border border-gray-200 rounded-2xl shadow-lg dark:border-gray-800 dark:bg-gray-900 w-40" style={{}}>
          <div aria-labelledby="options-menu" aria-orientation="vertical" className="space-y-1" role="menu">
           <button className="text-xs flex w-full rounded-lg px-3 py-2 text-left font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
            View More
           </button>
           <button className="text-xs flex w-full rounded-lg px-3 py-2 text-left font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
            Delete
           </button>
          </div>
         </div>
        </div>
       </div>
      </div>
     </td>
    </tr>
    <tr className="transition hover:bg-gray-50 dark:hover:bg-gray-900">
     <td className="p-4 whitespace-nowrap">
      <div className="group flex items-center gap-3">
       <label className="flex cursor-pointer items-center text-sm font-medium text-gray-700 select-none dark:text-gray-400">
        <span className="relative">
         <input className="sr-only" type="checkbox"/>
         <span className="flex h-4 w-4 items-center justify-center rounded-sm border-[1.25px] bg-transparent border-gray-300 dark:border-gray-700">
          <span className="opacity-0">
           <svg fill="none" height="12" viewBox="0 0 12 12" width="12" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6666">
            </path>
           </svg>
          </span>
         </span>
        </span>
       </label>
       <p className="text-theme-xs font-medium text-gray-700 group-hover:underline dark:text-gray-400">
        #323539
       </p>
      </div>
     </td>
     <td className="p-4 whitespace-nowrap">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-400">
       Chris Wilson
      </span>
     </td>
     <td className="p-4 whitespace-nowrap">
      <p className="text-sm text-gray-700 dark:text-gray-400">
       March 1, 2028
      </p>
     </td>
     <td className="p-4 whitespace-nowrap">
      <p className="text-sm text-gray-700 dark:text-gray-400">
       September 1, 2028
      </p>
     </td>
     <td className="p-4 whitespace-nowrap">
      <p className="text-sm text-gray-700 dark:text-gray-400">
       $1100
      </p>
     </td>
     <td className="p-4 whitespace-nowrap">
      <span className="text-theme-xs rounded-full px-2 py-0.5 font-medium bg-success-50 dark:bg-success-500/15 text-success-700 dark:text-success-500">
       Paid
      </span>
     </td>
     <td className="p-4 whitespace-nowrap">
      <div className={`relative flex justify-center dropdown ${openDropdown === 5 ? 'z-50' : ''}`}>
       <div>
        <div>
         <button onClick={() => toggleDropdown(5)} className="text-gray-500 dark:text-gray-400">
          <svg className="fill-current" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
           <path clipRule="evenodd" d="M5.99902 10.245C6.96552 10.245 7.74902 11.0285 7.74902 11.995V12.005C7.74902 12.9715 6.96552 13.755 5.99902 13.755C5.03253 13.755 4.24902 12.9715 4.24902 12.005V11.995C4.24902 11.0285 5.03253 10.245 5.99902 10.245ZM17.999 10.245C18.9655 10.245 19.749 11.0285 19.749 11.995V12.005C19.749 12.9715 18.9655 13.755 17.999 13.755C17.0325 13.755 16.249 12.9715 16.249 12.005V11.995C16.249 11.0285 17.0325 10.245 17.999 10.245ZM13.749 11.995C13.749 11.0285 12.9655 10.245 11.999 10.245C11.0325 10.245 10.249 11.0285 10.249 11.995V12.005C10.249 12.9715 11.0325 13.755 11.999 13.755C12.9655 13.755 13.749 12.9715 13.749 12.005V11.995Z" fill="" fillRule="evenodd">
           </path>
          </svg>
         </button>
        </div>
        <div className={`z-10 absolute right-4 top-full mt-2 ${openDropdown === 5 ? 'block' : 'hidden'}`}>
         <div className="p-2 bg-white border border-gray-200 rounded-2xl shadow-lg dark:border-gray-800 dark:bg-gray-900 w-40" style={{}}>
          <div aria-labelledby="options-menu" aria-orientation="vertical" className="space-y-1" role="menu">
           <button className="text-xs flex w-full rounded-lg px-3 py-2 text-left font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
            View More
           </button>
           <button className="text-xs flex w-full rounded-lg px-3 py-2 text-left font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
            Delete
           </button>
          </div>
         </div>
        </div>
       </div>
      </div>
     </td>
    </tr>
    <tr className="transition hover:bg-gray-50 dark:hover:bg-gray-900">
     <td className="p-4 whitespace-nowrap">
      <div className="group flex items-center gap-3">
       <label className="flex cursor-pointer items-center text-sm font-medium text-gray-700 select-none dark:text-gray-400">
        <span className="relative">
         <input className="sr-only" type="checkbox"/>
         <span className="flex h-4 w-4 items-center justify-center rounded-sm border-[1.25px] bg-transparent border-gray-300 dark:border-gray-700">
          <span className="opacity-0">
           <svg fill="none" height="12" viewBox="0 0 12 12" width="12" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6666">
            </path>
           </svg>
          </span>
         </span>
        </span>
       </label>
       <p className="text-theme-xs font-medium text-gray-700 group-hover:underline dark:text-gray-400">
        #323540
       </p>
      </div>
     </td>
     <td className="p-4 whitespace-nowrap">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-400">
       Jessica Lee
      </span>
     </td>
     <td className="p-4 whitespace-nowrap">
      <p className="text-sm text-gray-700 dark:text-gray-400">
       February 20, 2028
      </p>
     </td>
     <td className="p-4 whitespace-nowrap">
      <p className="text-sm text-gray-700 dark:text-gray-400">
       August 20, 2028
      </p>
     </td>
     <td className="p-4 whitespace-nowrap">
      <p className="text-sm text-gray-700 dark:text-gray-400">
       $950
      </p>
     </td>
     <td className="p-4 whitespace-nowrap">
      <span className="text-theme-xs rounded-full px-2 py-0.5 font-medium bg-gray-100 text-gray-600 dark:bg-gray-500/15 dark:text-gray-400">
       Draft
      </span>
     </td>
     <td className="p-4 whitespace-nowrap">
      <div className={`relative flex justify-center dropdown ${openDropdown === 6 ? 'z-50' : ''}`}>
       <div>
        <div>
         <button onClick={() => toggleDropdown(6)} className="text-gray-500 dark:text-gray-400">
          <svg className="fill-current" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
           <path clipRule="evenodd" d="M5.99902 10.245C6.96552 10.245 7.74902 11.0285 7.74902 11.995V12.005C7.74902 12.9715 6.96552 13.755 5.99902 13.755C5.03253 13.755 4.24902 12.9715 4.24902 12.005V11.995C4.24902 11.0285 5.03253 10.245 5.99902 10.245ZM17.999 10.245C18.9655 10.245 19.749 11.0285 19.749 11.995V12.005C19.749 12.9715 18.9655 13.755 17.999 13.755C17.0325 13.755 16.249 12.9715 16.249 12.005V11.995C16.249 11.0285 17.0325 10.245 17.999 10.245ZM13.749 11.995C13.749 11.0285 12.9655 10.245 11.999 10.245C11.0325 10.245 10.249 11.0285 10.249 11.995V12.005C10.249 12.9715 11.0325 13.755 11.999 13.755C12.9655 13.755 13.749 12.9715 13.749 12.005V11.995Z" fill="" fillRule="evenodd">
           </path>
          </svg>
         </button>
        </div>
        <div className={`z-10 absolute right-4 top-full mt-2 ${openDropdown === 6 ? 'block' : 'hidden'}`}>
         <div className="p-2 bg-white border border-gray-200 rounded-2xl shadow-lg dark:border-gray-800 dark:bg-gray-900 w-40" style={{}}>
          <div aria-labelledby="options-menu" aria-orientation="vertical" className="space-y-1" role="menu">
           <button className="text-xs flex w-full rounded-lg px-3 py-2 text-left font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
            View More
           </button>
           <button className="text-xs flex w-full rounded-lg px-3 py-2 text-left font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
            Delete
           </button>
          </div>
         </div>
        </div>
       </div>
      </div>
     </td>
    </tr>
    <tr className="transition hover:bg-gray-50 dark:hover:bg-gray-900">
     <td className="p-4 whitespace-nowrap">
      <div className="group flex items-center gap-3">
       <label className="flex cursor-pointer items-center text-sm font-medium text-gray-700 select-none dark:text-gray-400">
        <span className="relative">
         <input className="sr-only" type="checkbox"/>
         <span className="flex h-4 w-4 items-center justify-center rounded-sm border-[1.25px] bg-transparent border-gray-300 dark:border-gray-700">
          <span className="opacity-0">
           <svg fill="none" height="12" viewBox="0 0 12 12" width="12" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6666">
            </path>
           </svg>
          </span>
         </span>
        </span>
       </label>
       <p className="text-theme-xs font-medium text-gray-700 group-hover:underline dark:text-gray-400">
        #323541
       </p>
      </div>
     </td>
     <td className="p-4 whitespace-nowrap">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-400">
       David Kim
      </span>
     </td>
     <td className="p-4 whitespace-nowrap">
      <p className="text-sm text-gray-700 dark:text-gray-400">
       January 15, 2028
      </p>
     </td>
     <td className="p-4 whitespace-nowrap">
      <p className="text-sm text-gray-700 dark:text-gray-400">
       July 15, 2028
      </p>
     </td>
     <td className="p-4 whitespace-nowrap">
      <p className="text-sm text-gray-700 dark:text-gray-400">
       $1300
      </p>
     </td>
     <td className="p-4 whitespace-nowrap">
      <span className="text-theme-xs rounded-full px-2 py-0.5 font-medium bg-success-50 dark:bg-success-500/15 text-success-700 dark:text-success-500">
       Paid
      </span>
     </td>
     <td className="p-4 whitespace-nowrap">
      <div className={`relative flex justify-center dropdown ${openDropdown === 7 ? 'z-50' : ''}`}>
       <div>
        <div>
         <button onClick={() => toggleDropdown(7)} className="text-gray-500 dark:text-gray-400">
          <svg className="fill-current" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
           <path clipRule="evenodd" d="M5.99902 10.245C6.96552 10.245 7.74902 11.0285 7.74902 11.995V12.005C7.74902 12.9715 6.96552 13.755 5.99902 13.755C5.03253 13.755 4.24902 12.9715 4.24902 12.005V11.995C4.24902 11.0285 5.03253 10.245 5.99902 10.245ZM17.999 10.245C18.9655 10.245 19.749 11.0285 19.749 11.995V12.005C19.749 12.9715 18.9655 13.755 17.999 13.755C17.0325 13.755 16.249 12.9715 16.249 12.005V11.995C16.249 11.0285 17.0325 10.245 17.999 10.245ZM13.749 11.995C13.749 11.0285 12.9655 10.245 11.999 10.245C11.0325 10.245 10.249 11.0285 10.249 11.995V12.005C10.249 12.9715 11.0325 13.755 11.999 13.755C12.9655 13.755 13.749 12.9715 13.749 12.005V11.995Z" fill="" fillRule="evenodd">
           </path>
          </svg>
         </button>
        </div>
        <div className={`z-10 absolute right-4 top-full mt-2 ${openDropdown === 7 ? 'block' : 'hidden'}`}>
         <div className="p-2 bg-white border border-gray-200 rounded-2xl shadow-lg dark:border-gray-800 dark:bg-gray-900 w-40" style={{}}>
          <div aria-labelledby="options-menu" aria-orientation="vertical" className="space-y-1" role="menu">
           <button className="text-xs flex w-full rounded-lg px-3 py-2 text-left font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
            View More
           </button>
           <button className="text-xs flex w-full rounded-lg px-3 py-2 text-left font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
            Delete
           </button>
          </div>
         </div>
        </div>
       </div>
      </div>
     </td>
    </tr>
    <tr className="transition hover:bg-gray-50 dark:hover:bg-gray-900">
     <td className="p-4 whitespace-nowrap">
      <div className="group flex items-center gap-3">
       <label className="flex cursor-pointer items-center text-sm font-medium text-gray-700 select-none dark:text-gray-400">
        <span className="relative">
         <input className="sr-only" type="checkbox"/>
         <span className="flex h-4 w-4 items-center justify-center rounded-sm border-[1.25px] bg-transparent border-gray-300 dark:border-gray-700">
          <span className="opacity-0">
           <svg fill="none" height="12" viewBox="0 0 12 12" width="12" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6666">
            </path>
           </svg>
          </span>
         </span>
        </span>
       </label>
       <p className="text-theme-xs font-medium text-gray-700 group-hover:underline dark:text-gray-400">
        #323542
       </p>
      </div>
     </td>
     <td className="p-4 whitespace-nowrap">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-400">
       Sarah Clark
      </span>
     </td>
     <td className="p-4 whitespace-nowrap">
      <p className="text-sm text-gray-700 dark:text-gray-400">
       December 10, 2027
      </p>
     </td>
     <td className="p-4 whitespace-nowrap">
      <p className="text-sm text-gray-700 dark:text-gray-400">
       June 10, 2028
      </p>
     </td>
     <td className="p-4 whitespace-nowrap">
      <p className="text-sm text-gray-700 dark:text-gray-400">
       $800
      </p>
     </td>
     <td className="p-4 whitespace-nowrap">
      <span className="text-theme-xs rounded-full px-2 py-0.5 font-medium bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500">
       Unpaid
      </span>
     </td>
     <td className="p-4 whitespace-nowrap">
      <div className={`relative flex justify-center dropdown ${openDropdown === 8 ? 'z-50' : ''}`}>
       <div>
        <div>
         <button onClick={() => toggleDropdown(8)} className="text-gray-500 dark:text-gray-400">
          <svg className="fill-current" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
           <path clipRule="evenodd" d="M5.99902 10.245C6.96552 10.245 7.74902 11.0285 7.74902 11.995V12.005C7.74902 12.9715 6.96552 13.755 5.99902 13.755C5.03253 13.755 4.24902 12.9715 4.24902 12.005V11.995C4.24902 11.0285 5.03253 10.245 5.99902 10.245ZM17.999 10.245C18.9655 10.245 19.749 11.0285 19.749 11.995V12.005C19.749 12.9715 18.9655 13.755 17.999 13.755C17.0325 13.755 16.249 12.9715 16.249 12.005V11.995C16.249 11.0285 17.0325 10.245 17.999 10.245ZM13.749 11.995C13.749 11.0285 12.9655 10.245 11.999 10.245C11.0325 10.245 10.249 11.0285 10.249 11.995V12.005C10.249 12.9715 11.0325 13.755 11.999 13.755C12.9655 13.755 13.749 12.9715 13.749 12.005V11.995Z" fill="" fillRule="evenodd">
           </path>
          </svg>
         </button>
        </div>
        <div className={`z-10 absolute right-4 top-full mt-2 ${openDropdown === 8 ? 'block' : 'hidden'}`}>
         <div className="p-2 bg-white border border-gray-200 rounded-2xl shadow-lg dark:border-gray-800 dark:bg-gray-900 w-40" style={{}}>
          <div aria-labelledby="options-menu" aria-orientation="vertical" className="space-y-1" role="menu">
           <button className="text-xs flex w-full rounded-lg px-3 py-2 text-left font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
            View More
           </button>
           <button className="text-xs flex w-full rounded-lg px-3 py-2 text-left font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
            Delete
           </button>
          </div>
         </div>
        </div>
       </div>
      </div>
     </td>
    </tr>
    <tr className="transition hover:bg-gray-50 dark:hover:bg-gray-900">
     <td className="p-4 whitespace-nowrap">
      <div className="group flex items-center gap-3">
       <label className="flex cursor-pointer items-center text-sm font-medium text-gray-700 select-none dark:text-gray-400">
        <span className="relative">
         <input className="sr-only" type="checkbox"/>
         <span className="flex h-4 w-4 items-center justify-center rounded-sm border-[1.25px] bg-transparent border-gray-300 dark:border-gray-700">
          <span className="opacity-0">
           <svg fill="none" height="12" viewBox="0 0 12 12" width="12" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6666">
            </path>
           </svg>
          </span>
         </span>
        </span>
       </label>
       <p className="text-theme-xs font-medium text-gray-700 group-hover:underline dark:text-gray-400">
        #323543
       </p>
      </div>
     </td>
     <td className="p-4 whitespace-nowrap">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-400">
       Matthew Lewis
      </span>
     </td>
     <td className="p-4 whitespace-nowrap">
      <p className="text-sm text-gray-700 dark:text-gray-400">
       November 5, 2027
      </p>
     </td>
     <td className="p-4 whitespace-nowrap">
      <p className="text-sm text-gray-700 dark:text-gray-400">
       May 5, 2028
      </p>
     </td>
     <td className="p-4 whitespace-nowrap">
      <p className="text-sm text-gray-700 dark:text-gray-400">
       $1400
      </p>
     </td>
     <td className="p-4 whitespace-nowrap">
      <span className="text-theme-xs rounded-full px-2 py-0.5 font-medium bg-success-50 dark:bg-success-500/15 text-success-700 dark:text-success-500">
       Paid
      </span>
     </td>
     <td className="p-4 whitespace-nowrap">
      <div className={`relative flex justify-center dropdown ${openDropdown === 9 ? 'z-50' : ''}`}>
       <div>
        <div>
         <button onClick={() => toggleDropdown(9)} className="text-gray-500 dark:text-gray-400">
          <svg className="fill-current" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
           <path clipRule="evenodd" d="M5.99902 10.245C6.96552 10.245 7.74902 11.0285 7.74902 11.995V12.005C7.74902 12.9715 6.96552 13.755 5.99902 13.755C5.03253 13.755 4.24902 12.9715 4.24902 12.005V11.995C4.24902 11.0285 5.03253 10.245 5.99902 10.245ZM17.999 10.245C18.9655 10.245 19.749 11.0285 19.749 11.995V12.005C19.749 12.9715 18.9655 13.755 17.999 13.755C17.0325 13.755 16.249 12.9715 16.249 12.005V11.995C16.249 11.0285 17.0325 10.245 17.999 10.245ZM13.749 11.995C13.749 11.0285 12.9655 10.245 11.999 10.245C11.0325 10.245 10.249 11.0285 10.249 11.995V12.005C10.249 12.9715 11.0325 13.755 11.999 13.755C12.9655 13.755 13.749 12.9715 13.749 12.005V11.995Z" fill="" fillRule="evenodd">
           </path>
          </svg>
         </button>
        </div>
        <div className={`z-10 absolute right-4 top-full mt-2 ${openDropdown === 9 ? 'block' : 'hidden'}`}>
         <div className="p-2 bg-white border border-gray-200 rounded-2xl shadow-lg dark:border-gray-800 dark:bg-gray-900 w-40" style={{}}>
          <div aria-labelledby="options-menu" aria-orientation="vertical" className="space-y-1" role="menu">
           <button className="text-xs flex w-full rounded-lg px-3 py-2 text-left font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
            View More
           </button>
           <button className="text-xs flex w-full rounded-lg px-3 py-2 text-left font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
            Delete
           </button>
          </div>
         </div>
        </div>
       </div>
      </div>
     </td>
    </tr>
   </tbody>
  </table>
 </div>
 <div className="flex items-center flex-col sm:flex-row justify-between border-t border-gray-200 px-5 py-4 dark:border-gray-800">
  <div className="pb-3 sm:pb-0">
   <span className="block text-sm font-medium text-gray-500 dark:text-gray-400">
    Showing
    <span className="text-gray-800 dark:text-white/90">
     1
    </span>
    to
    <span className="text-gray-800 dark:text-white/90">
     10
    </span>
    of
    <span className="text-gray-800 dark:text-white/90">
     25
    </span>
   </span>
  </div>
  <div className="flex items-center justify-between p-4 sm:p-0 rounded-lg w-full sm:w-auto bg-gray-50 dark:bg-white/[0.03] dark:sm:bg-transparent sm:bg-transparent gap-2 sm:justify-normal">
   <button className="shadow-theme-xs flex items-center gap-2 rounded-lg border border-gray-300 bg-white p-2 text-gray-700 hover:bg-gray-50 hover:text-gray-800 sm:p-2.5 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 opacity-50 cursor-not-allowed" disabled>
    <svg className="fill-current" fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
     <path clipRule="evenodd" d="M2.58203 9.99868C2.58174 10.1909 2.6549 10.3833 2.80152 10.53L7.79818 15.5301C8.09097 15.8231 8.56584 15.8233 8.85883 15.5305C9.15183 15.2377 9.152 14.7629 8.85921 14.4699L5.13911 10.7472L16.6665 10.7472C17.0807 10.7472 17.4165 10.4114 17.4165 9.99715C17.4165 9.58294 17.0807 9.24715 16.6665 9.24715L5.14456 9.24715L8.85919 5.53016C9.15199 5.23717 9.15184 4.7623 8.85885 4.4695C8.56587 4.1767 8.09099 4.17685 7.79819 4.46984L2.84069 9.43049C2.68224 9.568 2.58203 9.77087 2.58203 9.99715C2.58203 9.99766 2.58203 9.99817 2.58203 9.99868Z" fill="" fillRule="evenodd">
     </path>
    </svg>
   </button>
   <span className="block text-sm font-medium text-gray-700 sm:hidden dark:text-gray-400">
    Page 1 of 3
   </span>
   <ul className="hidden items-center gap-0.5 sm:flex">
    <li>
     <button className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium bg-brand-500 text-white">
      1
     </button>
    </li>
    <li>
     <button className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium hover:bg-brand-500 text-gray-700 hover:text-white dark:text-gray-400 dark:hover:text-white">
      2
     </button>
    </li>
    <li>
     <button className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium hover:bg-brand-500 text-gray-700 hover:text-white dark:text-gray-400 dark:hover:text-white">
      3
     </button>
    </li>
   </ul>
   <button className="shadow-theme-xs flex items-center gap-2 rounded-lg border border-gray-300 bg-white p-2 text-gray-700 hover:bg-gray-50 hover:text-gray-800 sm:p-2.5 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
    <svg className="fill-current" fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
     <path clipRule="evenodd" d="M17.4165 9.9986C17.4168 10.1909 17.3437 10.3832 17.197 10.53L12.2004 15.5301C11.9076 15.8231 11.4327 15.8233 11.1397 15.5305C10.8467 15.2377 10.8465 14.7629 11.1393 14.4699L14.8594 10.7472L3.33203 10.7472C2.91782 10.7472 2.58203 10.4114 2.58203 9.99715C2.58203 9.58294 2.91782 9.24715 3.33203 9.24715L14.854 9.24715L11.1393 5.53016C10.8465 5.23717 10.8467 4.7623 11.1397 4.4695C11.4327 4.1767 11.9075 4.17685 12.2003 4.46984L17.1578 9.43049C17.3163 9.568 17.4165 9.77087 17.4165 9.99715C17.4165 9.99763 17.4165 9.99812 17.4165 9.9986Z" fill="" fillRule="evenodd">
     </path>
    </svg>
   </button>
  </div>
 </div>
</div>

    </>
  );
};
