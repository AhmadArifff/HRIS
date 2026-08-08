"use client";
import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { MoreDotIcon } from "@/icons";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export const EstimatedRevenue = () => {
  const options: ApexOptions = {
    chart: {
      type: "donut",
    },
    colors: ["#465fff", "#9cb9ff", "#e5e7eb"],
    labels: ["Marketing", "Sales", "Other"],
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "75%",
          labels: {
            show: false,
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: false,
    },
  };

  const series = [85, 55, 20];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Estimated Revenue
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Target you’ve set for each month
          </p>
        </div>
        <div className="relative inline-block">
          <button className="dropdown-toggle">
            <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
          </button>
        </div>
      </div>
      <div className="relative flex justify-center mt-6">
        <ReactApexChart
          options={options}
          series={series}
          type="donut"
          height={180}
        />
        <span className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 text-xs font-normal text-gray-500 dark:text-gray-400">
          June Goals
        </span>
      </div>
      <div className="pt-6 mt-6 space-y-5 border-t border-gray-200 dark:border-gray-800">
        <div>
          <p className="mb-2 text-gray-500 text-theme-sm dark:text-gray-400">
            Marketing
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-base font-semibold text-gray-800 dark:text-white/90">
                  $30,569.00
                </p>
              </div>
            </div>
            <div className="flex w-full max-w-[140px] items-center gap-3">
              <div className="relative block h-2 w-full max-w-[100px] rounded-sm bg-gray-200 dark:bg-gray-800">
                <div
                  className="absolute left-0 top-0 flex h-full items-center justify-center rounded-sm bg-brand-500 text-xs font-medium text-white"
                  style={{ width: "85%" }}
                ></div>
              </div>
              <p className="font-medium text-gray-700 text-theme-sm dark:text-gray-400 whitespace-nowrap">
                85%
              </p>
            </div>
          </div>
        </div>
        <div>
          <p className="mb-2 text-gray-500 text-theme-sm dark:text-gray-400">
            Sales
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-base font-semibold text-gray-800 dark:text-white/90">
                  $20,486.00
                </p>
              </div>
            </div>
            <div className="flex w-full max-w-[140px] items-center gap-3">
              <div className="relative block h-2 w-full max-w-[100px] rounded-sm bg-gray-200 dark:bg-gray-800">
                <div
                  className="absolute left-0 top-0 flex h-full items-center justify-center rounded-sm bg-brand-500 text-xs font-medium text-white"
                  style={{ width: "55%" }}
                ></div>
              </div>
              <p className="font-medium text-gray-700 text-theme-sm dark:text-gray-400 whitespace-nowrap">
                55%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
