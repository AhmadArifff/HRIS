"use client";
import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export const UserGrowth = () => {
  const options: ApexOptions = {
    chart: {
      type: "area",
      sparkline: {
        enabled: true,
      },
    },
    colors: ["#2196F3"],
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 100],
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

  const series = [
    {
      name: "Users",
      data: [150, 200, 180, 250, 220, 300, 376],
    },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="mb-6 flex justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            User Growth
          </h3>
          <p className="text-theme-sm mt-1 text-gray-500 dark:text-gray-400">
            New signups website + mobile
          </p>
        </div>
      </div>
      <div className="flex justify-between">
        <div>
          <h3 className="text-title-xs font-semibold text-gray-800 dark:text-white/90">
            3,768
          </h3>
          <p className="text-theme-xs mt-1 text-gray-500 dark:text-gray-400">
            <span className="text-success-500 mr-1 inline-block">+ 1.56%</span>
            than last Week
          </p>
        </div>
        <div className="max-w-full">
          <div className="h-12 w-24">
            <ReactApexChart
              options={options}
              series={series}
              type="area"
              height={50}
              width={96}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
