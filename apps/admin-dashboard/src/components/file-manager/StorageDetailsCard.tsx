"use client";
import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export const StorageDetailsCard: React.FC = () => {
  const series = [40, 50, 25, 45]; // Downloads, Apps, Documents, Media

  const options: ApexOptions = {
    colors: ["#8B5CF6", "#F97316", "#F59E0B", "#10B981"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "donut",
      height: 290,
    },
    labels: ["Downloads", "Apps", "Documents", "Media"],
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "75%",
          labels: {
            show: true,
            total: {
              show: true,
              showAlways: true,
              label: "Total 160 GB",
              fontSize: "14px",
              fontWeight: 500,
              color: "#64748B",
              formatter: () => "160",
            },
            value: {
              show: true,
              fontSize: "24px",
              fontWeight: 700,
              color: "#1E293B",
              offsetY: 4,
            },
          },
        },
      },
    },
    stroke: {
      width: 0,
    },
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 shadow-theme-xs dark:border-gray-800 dark:bg-white/[0.03] h-full flex flex-col justify-between">
      <div>
        <h3 className="text-base font-semibold text-gray-800 dark:text-white">
          Storage Details
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          585 GB Free space left
        </p>
      </div>

      <div className="my-4 flex justify-center">
        <ReactApexChart options={options} series={series} type="donut" height={260} />
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-2 pt-4 border-t border-gray-100 dark:border-gray-800 text-xs">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-purple-500"></span>
          <span className="text-gray-600 dark:text-gray-300">Downloads</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-orange-500"></span>
          <span className="text-gray-600 dark:text-gray-300">Apps</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-amber-500"></span>
          <span className="text-gray-600 dark:text-gray-300">Documents</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-emerald-500"></span>
          <span className="text-gray-600 dark:text-gray-300">Media</span>
        </div>
      </div>
    </div>
  );
};
