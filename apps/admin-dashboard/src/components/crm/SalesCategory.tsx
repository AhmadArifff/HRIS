"use client";
import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { MoreDotIcon } from "@/icons";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export const SalesCategory = () => {
  const options: ApexOptions = {
    chart: {
      type: "donut",
    },
    colors: ["#465fff", "#9cb9ff", "#e5e7eb"],
    labels: ["Affiliate Program", "Direct Buy", "Adsense"],
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "14px",
              fontWeight: 500,
              color: "#6b7280",
            },
            value: {
              show: true,
              fontSize: "24px",
              fontWeight: 700,
              color: "#1f2937",
              formatter: function (val: string) {
                return Number(val).toLocaleString();
              },
            },
            total: {
              show: true,
              showAlways: true,
              label: "Total",
              fontSize: "14px",
              fontWeight: 500,
              color: "#6b7280",
              formatter: function (w) {
                const total = w.globals.seriesTotals.reduce((a: any, b: any) => {
                  return a + b;
                }, 0);
                return total.toLocaleString();
              },
            },
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
    tooltip: {
      enabled: true,
      custom: function () {
        return "";
      },
    },
  };

  const series = [2040, 1402, 510];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Sales Category
        </h3>
        <div className="relative inline-block">
          <button className="dropdown-toggle">
            <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center gap-8 xl:flex-row">
        <div className="flex-shrink-0 w-[240px]">
          <ReactApexChart
            options={options}
            series={series}
            type="donut"
            height={240}
          />
        </div>
        <div className="flex flex-col items-start gap-6 sm:flex-row xl:flex-col">
          <div className="flex items-start gap-2.5">
            <div className="mt-1.5 h-2 w-2 rounded-full bg-brand-500"></div>
            <div>
              <h5 className="mb-1 font-medium text-gray-800 text-theme-sm dark:text-white/90">
                Affiliate Program
              </h5>
              <div className="flex items-center gap-2">
                <p className="font-medium text-gray-700 text-theme-sm dark:text-gray-400">
                  48%
                </p>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <p className="text-gray-500 text-theme-sm dark:text-gray-400">
                  2,040 Products
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <div className="mt-1.5 h-2 w-2 rounded-full bg-brand-500"></div>
            <div>
              <h5 className="mb-1 font-medium text-gray-800 text-theme-sm dark:text-white/90">
                Direct Buy
              </h5>
              <div className="flex items-center gap-2">
                <p className="font-medium text-gray-700 text-theme-sm dark:text-gray-400">
                  33%
                </p>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <p className="text-gray-400 text-theme-sm dark:text-gray-400">
                  1,402 Products
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <div className="mt-1.5 h-2 w-2 rounded-full bg-brand-300"></div>
            <div>
              <h5 className="mb-1 font-medium text-gray-800 text-theme-sm dark:text-white/90">
                Adsense
              </h5>
              <div className="flex items-center gap-2">
                <p className="font-medium text-gray-700 text-theme-sm dark:text-gray-400">
                  19%
                </p>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <p className="text-gray-500 text-theme-sm dark:text-gray-400">
                  510 Products
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
