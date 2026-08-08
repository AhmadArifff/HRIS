"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export const StatisticsChart = () => {
  const [activeRange, setActiveRange] = useState("Monthly");

  const options: ApexOptions = {
    chart: {
      type: "area",
      toolbar: {
        show: false,
      },
    },
    colors: ["#465fff", "#9cb9ff"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: [2, 2],
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
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: "#9ca3af",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#9ca3af",
          fontSize: "12px",
        },
      },
    },
    grid: {
      borderColor: "#f3f4f6",
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    legend: {
      show: false,
    },
    theme: {
      mode: "light",
    },
  };

  const series = [
    {
      name: "Revenue",
      data: [31, 40, 28, 51, 42, 109, 100, 80, 95, 110, 120, 150],
    },
    {
      name: "Target",
      data: [11, 32, 45, 32, 34, 52, 41, 60, 75, 80, 90, 110],
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Statistics
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Target you’ve set for each month
          </p>
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
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-9">
        <div className="flex items-start gap-2">
          <div>
            <h4 className="text-base font-bold text-gray-800 dark:text-white/90 sm:text-theme-xl">
              $212,142.12
            </h4>
            <span className="text-gray-500 text-theme-xs dark:text-gray-400">
              Avg. Yearly Profit
            </span>
          </div>
          <span className="mt-1.5 flex items-center gap-1 rounded-full bg-success-50 px-2 py-0.5 text-theme-xs font-medium text-success-600 dark:bg-success-500/15 dark:text-success-500">
            +23.2%
          </span>
        </div>
        <div className="flex items-start gap-2">
          <div>
            <h4 className="text-base font-bold text-gray-800 dark:text-white/90 sm:text-theme-xl">
              $30,321.23
            </h4>
            <span className="text-gray-500 text-theme-xs dark:text-gray-400">
              Avg. Yearly Profit
            </span>
          </div>
          <span className="mt-1.5 flex items-center gap-1 rounded-full bg-error-50 px-2 py-0.5 text-theme-xs font-medium text-error-600 dark:bg-error-500/15 dark:text-error-500">
            -12.3%
          </span>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="-ml-4 min-w-[650px] xl:min-w-full pl-2">
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={260}
          />
        </div>
      </div>
    </div>
  );
};
