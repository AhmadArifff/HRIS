"use client";
import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { HorizontaLDots } from "@/icons";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export const TotalRevenue = () => {
  const options: ApexOptions = {
    chart: {
      type: "line",
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    colors: ["#10B981"], // success green
    tooltip: {
      fixed: {
        enabled: false,
      },
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: function () {
            return "";
          },
        },
      },
      marker: {
        show: false,
      },
    },
  };

  const series = [
    {
      data: [10, 25, 20, 40, 35, 50, 45, 60],
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="mb-4 flex justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Total revenue earned
          </p>
          <h3 className="mt-1 text-2xl font-bold text-gray-800 dark:text-white/90">
            $23,445,700
          </h3>
        </div>
        <button className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
          <HorizontaLDots />
        </button>
      </div>

      <div className="mt-8 flex items-end justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Shipped quantities
          </p>
          <h4 className="mt-1 text-xl font-bold text-gray-800 dark:text-white/90">
            9,258
          </h4>
        </div>
        <div className="w-24">
          <ReactApexChart
            options={options}
            series={series}
            type="line"
            height={30}
          />
        </div>
      </div>
    </div>
  );
};
