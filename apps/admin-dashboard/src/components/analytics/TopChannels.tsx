"use client";
import React from "react";
import { MoreDotIcon, ArrowRightIcon } from "@/icons";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { useState } from "react";
import Link from "next/link";

const channelData = [
  { source: "Google", visitors: "4.7K" },
  { source: "Facebook", visitors: "3.4K" },
  { source: "Threads", visitors: "2.9K" },
  { source: "Google", visitors: "1.5K" },
];

export const TopChannels = () => {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Top Channels
        </h3>
        <div className="relative inline-block">
          <button onClick={toggleDropdown} className="dropdown-toggle">
            <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
          </button>
          <Dropdown
            isOpen={isOpen}
            onClose={closeDropdown}
            className="w-40 p-2"
          >
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              View More
            </DropdownItem>
          </Dropdown>
        </div>
      </div>
      <div className="my-6">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
          <span className="text-gray-400 text-theme-xs"> Source </span>
          <span className="text-right text-gray-400 text-theme-xs"> Visitors </span>
        </div>
        
        {channelData.map((channel, index) => (
          <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800">
            <span className="text-gray-500 text-theme-sm dark:text-gray-400">{channel.source}</span>
            <span className="text-right text-gray-500 text-theme-sm dark:text-gray-400">{channel.visitors}</span>
          </div>
        ))}
      </div>
      <Link
        className="flex justify-center items-center gap-2 rounded-lg border border-gray-300 bg-white p-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
        href="#"
      >
        Channels Report
        <ArrowRightIcon className="w-4 h-4" />
      </Link>
    </div>
  );
};
