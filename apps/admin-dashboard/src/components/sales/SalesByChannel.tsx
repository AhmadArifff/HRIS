"use client";
import React, { useState } from "react";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { Dropdown } from "../ui/dropdown/Dropdown";

export default function SalesByChannel() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="mb-4 flex items-center justify-between gap-2">
        <div>
          <h3 className="text-lg font-medium text-gray-800 dark:text-white/90">Sales by Channel</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Channel performance overview</p>
        </div>
        <div className="relative inline-block">
          <button onClick={toggleDropdown} className="dropdown-toggle">
            <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6"><path fillRule="evenodd" clipRule="evenodd" d="M10.2441 6C10.2441 5.0335 11.0276 4.25 11.9941 4.25H12.0041C12.9706 4.25 13.7541 5.0335 13.7541 6C13.7541 6.9665 12.9706 7.75 12.0041 7.75H11.9941C11.0276 7.75 10.2441 6.9665 10.2441 6ZM10.2441 18C10.2441 17.0335 11.0276 16.25 11.9941 16.25H12.0041C12.9706 16.25 13.7541 17.0335 13.7541 18C13.7541 18.9665 12.9706 19.75 12.0041 19.75H11.9941C11.0276 19.75 10.2441 18.9665 10.2441 18ZM11.9941 10.25C11.0276 10.25 10.2441 11.0335 10.2441 12C10.2441 12.9665 11.0276 13.75 11.9941 13.75H12.0041C12.9706 13.75 13.7541 12.9665 13.7541 12C13.7541 11.0335 12.9706 10.25 12.0041 10.25H11.9941Z" fill="currentColor"></path></svg>
          </button>
          <Dropdown isOpen={isOpen} onClose={closeDropdown} className="w-40 p-2">
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              View More
            </DropdownItem>
          </Dropdown>
        </div>
      </div>
      
      <div className="mb-6 flex items-center gap-2">
        <h3 className="text-3xl text-gray-800 dark:text-white/90">75</h3>
        <span className="text-success-600 flex items-center text-sm">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1"><path d="M7.9974 2.66602L7.9974 13.3336M4 6.66334L7.99987 2.66602L12 6.66334" stroke="#039855" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
          3.2%
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">Increased vs last week</span>
      </div>

      <div className="mb-6 w-full flex h-8 gap-[1px]">
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={`website-${i}`} className="h-full flex-1 rounded-[1px] bg-brand-500"></div>
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={`email-${i}`} className="h-full flex-1 rounded-[1px] bg-brand-300" style={{backgroundColor: '#36bffa'}}></div>
        ))}
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={`social-${i}`} className="h-full flex-1 rounded-[1px] bg-gray-200 dark:bg-gray-700"></div>
        ))}
      </div>

      <div className="flex items-center gap-4 mb-5">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-brand-500"></span>
          <span className="text-xs text-gray-600 dark:text-gray-400">Website</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{backgroundColor: '#36bffa'}}></span>
          <span className="text-xs text-gray-600 dark:text-gray-400">Email</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></span>
          <span className="text-xs text-gray-600 dark:text-gray-400">Social Media</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="border-b border-gray-200 text-gray-400 dark:border-gray-800">
            <tr>
              <th className="py-2 font-medium">Channels</th>
              <th className="py-2 text-right font-medium">Metric</th>
              <th className="py-2 text-right font-medium">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-100 dark:border-gray-800 last:border-0">
              <td className="py-3 text-gray-800 dark:text-white/90">Website</td>
              <td className="py-3 text-right">35</td>
              <td className="py-3 text-right text-success-600 font-medium">
                <span className="flex items-center justify-end gap-1"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.9974 2.66602L7.9974 13.3336M4 6.66334L7.99987 2.66602L12 6.66334" stroke="#039855" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg> 5.2%</span>
              </td>
            </tr>
            <tr className="border-b border-gray-100 dark:border-gray-800 last:border-0">
              <td className="py-3 text-gray-800 dark:text-white/90">Email</td>
              <td className="py-3 text-right">25</td>
              <td className="py-3 text-right text-error-600 font-medium">
                <span className="flex items-center justify-end gap-1"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.9974 13.334L7.9974 2.66634M12 9.33666L8.00013 13.334L4 9.33666" stroke="#D92D20" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg> 5.2%</span>
              </td>
            </tr>
            <tr className="border-b border-gray-100 dark:border-gray-800 last:border-0">
              <td className="py-3 text-gray-800 dark:text-white/90">Social Media</td>
              <td className="py-3 text-right">59</td>
              <td className="py-3 text-right text-success-600 font-medium">
                <span className="flex items-center justify-end gap-1"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.9974 2.66602L7.9974 13.3336M4 6.66334L7.99987 2.66602L12 6.66334" stroke="#039855" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg> 5.2%</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
