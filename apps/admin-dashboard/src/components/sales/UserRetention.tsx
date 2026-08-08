"use client";
import React, { useState } from "react";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { Dropdown } from "../ui/dropdown/Dropdown";

export default function UserRetention() {
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
          <h2 className="text-lg font-medium text-gray-800 dark:text-white/90">User Retention</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">User engagement over time</p>
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
        <h3 className="text-3xl text-gray-800 dark:text-white/90">24%</h3>
        <span className="flex items-center text-sm text-green-600">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.9974 2.66602L7.9974 13.3336M4 6.66334L7.99987 2.66602L12 6.66334" stroke="#039855" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
          3.2%
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">Increased vs last week</span>
      </div>

      <div className="hm-wrapper relative w-full">
        <table className="w-full" style={{ tableLayout: "fixed", borderCollapse: "separate", borderSpacing: "2px" }}>
          <tbody>
            {[
              [12,0], [11,1], [10,2], [9,3], [8,4], [7,5], [6,6], [5,7], [4,8], [3,9]
            ].map((row, rowIndex) => (
              <tr key={rowIndex}>
                {Array.from({ length: 12 }).map((_, colIndex) => {
                  let bgColor = "transparent";
                  if (colIndex < row[0]) {
                    if (colIndex === 0) bgColor = "rgb(70, 95, 255)";
                    else if (colIndex < 4) bgColor = "rgb(117, 146, 255)";
                    else if (colIndex < 10) bgColor = "rgb(156, 185, 255)";
                    else bgColor = "rgb(221, 233, 255)";
                  }
                  
                  return (
                    <td key={colIndex} style={{ padding: "0px" }}>
                      <div
                        className={colIndex < row[0] ? "hover:opacity-75" : ""}
                        style={{
                          width: "100%",
                          height: "17px",
                          backgroundColor: bgColor,
                          borderRadius: "1px",
                          cursor: colIndex < row[0] ? "pointer" : "default",
                          transition: "opacity 0.15s",
                        }}
                      ></div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              {Array.from({ length: 12 }).map((_, i) => (
                <td key={i} className="pt-2 text-center text-xs text-gray-400" style={{ padding: "8px 0px 0px" }}>
                  {i + 1}
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
