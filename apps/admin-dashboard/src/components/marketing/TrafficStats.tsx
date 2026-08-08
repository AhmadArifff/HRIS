"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { MoreDotIcon } from "@/icons";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export const TrafficStats = () => {
  const [activeRange, setActiveRange] = useState("Monthly");

  const commonOptions: ApexOptions = {
    chart: {
      type: "area",
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.05,
        stops: [0, 90, 100],
      },
    },
    tooltip: {
      fixed: {
        enabled: false,
      },
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: function (seriesName) {
            return "";
          },
        },
      },
      marker: {
        show: false,
      },
    },
  };

  const chartOneOptions: ApexOptions = {
    ...commonOptions,
    colors: ["#465fff"],
  };

  const chartTwoOptions: ApexOptions = {
    ...commonOptions,
    colors: ["#FF4F5A"],
  };

  const chartThreeOptions: ApexOptions = {
    ...commonOptions,
    colors: ["#10B981"],
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-1 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex items-center justify-between gap-2 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Traffic Stats
          </h3>
        </div>
        <div className="relative inline-block">
          <button className="dropdown-toggle">
            <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
          </button>
        </div>
      </div>
      <div className="flex items-center gap-0.5 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-900">
        {["Monthly", "Quarterly", "Annually"].map((range) => (
          <button
            key={range}
            onClick={() => setActiveRange(range)}
            className={`px-1.5 sm:px-3 py-1.5 sm:py-2 font-medium w-full rounded-md text-xs sm:text-theme-sm transition-colors whitespace-nowrap ${
              activeRange === range
                ? "shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800"
                : "hover:text-gray-900 dark:hover:text-white text-gray-500 dark:text-gray-400"
            }`}
          >
            {range}
          </button>
        ))}
      </div>
      <div>
        <div className="flex items-center justify-between py-5 gap-2">
          <div className="min-w-0">
            <p className="mb-1 text-gray-500 text-theme-sm dark:text-gray-400 whitespace-nowrap">
              New Subscribers
            </p>
            <h4 className="mb-1 text-2xl font-semibold text-gray-800 dark:text-white/90">
              567K
            </h4>
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="text-success-600"> +3.85% </span>
              <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                than last week
              </span>
            </span>
          </div>
          <div className="w-[80px] sm:w-[120px] flex-shrink-0 overflow-hidden">
            <ReactApexChart
              options={chartOneOptions}
              series={[{ data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54] }]}
              type="area"
              height={70}
            />
          </div>
        </div>
        <div className="flex items-center justify-between py-5 border-gray-100 border-y dark:border-gray-800 gap-2">
          <div className="min-w-0">
            <p className="mb-1 text-gray-500 text-theme-sm dark:text-gray-400 whitespace-nowrap">
              Conversion Rate
            </p>
            <h4 className="mb-1 text-2xl font-semibold text-gray-800 dark:text-white/90">
              12.4%
            </h4>
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="text-error-600"> -2.15% </span>
              <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                than last week
              </span>
            </span>
          </div>
          <div className="w-[80px] sm:w-[120px] flex-shrink-0 overflow-hidden">
            <ReactApexChart
              options={chartTwoOptions}
              series={[{ data: [44, 25, 36, 12, 63, 89, 41, 66, 25, 54, 9] }]}
              type="area"
              height={70}
            />
          </div>
        </div>
        <div className="flex items-center justify-between py-5 gap-2">
          <div className="min-w-0">
            <p className="mb-1 text-gray-500 text-theme-sm dark:text-gray-400 whitespace-nowrap">
              Page Bounce Rate
            </p>
            <h4 className="mb-1 text-2xl font-semibold text-gray-800 dark:text-white/90">
              34.6%
            </h4>
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="text-success-600"> +4.25% </span>
              <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                than last week
              </span>
            </span>
          </div>
          <div className="w-[80px] sm:w-[120px] flex-shrink-0 overflow-hidden">
            <ReactApexChart
              options={chartThreeOptions}
              series={[{ data: [12, 44, 25, 63, 89, 41, 66, 36, 9, 54, 25] }]}
              type="area"
              height={70}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
