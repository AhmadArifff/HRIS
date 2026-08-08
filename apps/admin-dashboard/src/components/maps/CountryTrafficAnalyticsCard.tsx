"use client";
import React from "react";
import dynamic from "next/dynamic";
import { worldMill } from "@react-jvectormap/world";

const VectorMap = dynamic(
  () => import("@react-jvectormap/core").then((mod) => mod.VectorMap),
  { ssr: false }
);

export const CountryTrafficAnalyticsCard: React.FC = () => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-theme-xs dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="mb-5">
        <h3 className="text-base font-bold text-gray-900 dark:text-white">
          Country Traffic Analytics
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Visualize traffic volume and engagement by region
        </p>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-900/60 h-[300px] flex items-center justify-center p-2">
        <div className="w-full h-full">
          <VectorMap
            map={worldMill}
            backgroundColor="transparent"
            zoomOnScroll={false}
            series={{
              regions: [
                {
                  attribute: "fill",
                  scale: ["#93C5FD", "#2563EB"],
                  values: {
                    US: 100,
                    CA: 60,
                    RU: 40,
                    CN: 60,
                    BR: 40,
                    AU: 60,
                    GB: 80,
                    DE: 80,
                    FR: 80,
                    IN: 60,
                  },
                },
              ],
            }}
            regionStyle={{
              initial: {
                fill: "#D0D5DD",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0,
              },
              hover: {
                fill: "#1D4ED8",
                fillOpacity: 0.9,
                cursor: "pointer",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};
