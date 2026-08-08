"use client";
import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export const ChurnRate = () => {
  const options: ApexOptions = {
    chart: {
      type: "area",
      sparkline: {
        enabled: true,
      },
    },
    colors: ["#ea5455"],
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
      name: "Churn",
      data: [3.1, 4.0, 2.8, 5.1, 4.2, 3.8, 4.3],
    },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="mb-6 flex justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Churn Rate
          </h3>
          <p className="text-theme-sm mt-1 text-gray-500 dark:text-gray-400">
            Downgrade to Free plan
          </p>
        </div>
      </div>
      <div className="flex justify-between">
        <div>
          <h3 className="text-title-xs font-semibold text-gray-800 dark:text-white/90">
            4.26%
          </h3>
          <p className="text-theme-xs mt-1 text-gray-500 dark:text-gray-400">
            <span className="text-error-500 mr-1 inline-block">0.31%</span>
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
