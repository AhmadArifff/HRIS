"use client";
import React from "react";
import Badge from "../ui/badge/Badge";
import { ArrowDownIcon, ArrowUpIcon, DollarLineIcon, GroupIcon, BoxIcon, UserCircleIcon } from "@/icons";

export const AiMetrics = () => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {/* <!-- Metric Item Start (Users) --> */}
      <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Users
          </span>
          <GroupIcon className="size-6 text-brand-400" />
        </div>
        <h2 className="mb-2 text-3xl font-semibold text-gray-800 dark:text-white/90">
          10,590
        </h2>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Last 30 Days
          </span>
          <span className="flex items-center text-sm font-medium text-success-600 dark:text-success-500">
            <ArrowUpIcon className="text-success-500" />
            +3.52%
          </span>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start (Projects) --> */}
      <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Projects
          </span>
          <BoxIcon className="size-6 text-brand-500" />
        </div>
        <h2 className="mb-2 text-3xl font-semibold text-gray-800 dark:text-white/90">
          15,682
        </h2>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Last 30 Days
          </span>
          <span className="flex items-center text-sm font-medium text-success-600 dark:text-success-500">
            <ArrowUpIcon className="text-success-500" />
            +3.52%
          </span>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start (Revenue) --> */}
      <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Revenue
          </span>
          <DollarLineIcon className="size-6 text-success-500" />
        </div>
        <h2 className="mb-2 text-3xl font-semibold text-gray-800 dark:text-white/90">
          $90,369
        </h2>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Last 30 Days
          </span>
          <span className="flex items-center text-sm font-medium text-success-600 dark:text-success-500">
            <ArrowUpIcon className="text-success-500" />
            +14.8%
          </span>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start (Paid Users) --> */}
      <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Paid Users
          </span>
          <UserCircleIcon className="size-6 text-orange-500" />
        </div>
        <h2 className="mb-2 text-3xl font-semibold text-gray-800 dark:text-white/90">
          520
        </h2>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Last 30 Days
          </span>
          <span className="flex items-center text-sm font-medium text-error-600 dark:text-error-500">
            <ArrowDownIcon className="text-error-500" />
            -9.05%
          </span>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
    </div>
  );
};
