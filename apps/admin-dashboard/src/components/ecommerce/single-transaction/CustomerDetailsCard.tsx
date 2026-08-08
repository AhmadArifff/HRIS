"use client";
import React from "react";

export const CustomerDetailsCard: React.FC = () => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90">
        Customer Details
      </h3>

      <div className="divide-y divide-gray-100 text-sm dark:divide-gray-800">
        <div className="flex py-3 justify-between items-center">
          <span className="text-gray-500 dark:text-gray-400 w-24">Name</span>
          <span className="font-semibold text-gray-800 dark:text-white text-right">
            Mushafrof Chowdhury
          </span>
        </div>

        <div className="flex py-3 justify-between items-center">
          <span className="text-gray-500 dark:text-gray-400 w-24">Email</span>
          <span className="text-gray-800 dark:text-gray-200 text-right">
            name@example.com
          </span>
        </div>

        <div className="flex py-3 justify-between items-center">
          <span className="text-gray-500 dark:text-gray-400 w-24">Phone</span>
          <span className="text-gray-800 dark:text-gray-200 text-right">
            Mountain View, CA, 94040
          </span>
        </div>

        <div className="flex py-3 justify-between items-center">
          <span className="text-gray-500 dark:text-gray-400 w-24">Phone</span>
          <span className="text-gray-800 dark:text-gray-200 text-right">
            +123 456 7890
          </span>
        </div>

        <div className="flex py-3 justify-between items-center">
          <span className="text-gray-500 dark:text-gray-400 w-24">Country</span>
          <span className="text-gray-800 dark:text-gray-200 text-right">
            United States
          </span>
        </div>

        <div className="flex py-3 justify-between items-start">
          <span className="text-gray-500 dark:text-gray-400 w-24">Address</span>
          <span className="text-gray-800 dark:text-gray-200 text-right max-w-[200px]">
            62 Miles Drive St, Newark, NJ 07103, California.
          </span>
        </div>
      </div>
    </div>
  );
};
