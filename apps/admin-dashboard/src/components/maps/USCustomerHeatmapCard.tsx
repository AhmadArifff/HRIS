"use client";
import React from "react";
import dynamic from "next/dynamic";
import { worldMill } from "@react-jvectormap/world";

const VectorMap = dynamic(
  () => import("@react-jvectormap/core").then((mod) => mod.VectorMap),
  { ssr: false }
);

type MarkerStyle = {
  initial: {
    fill: string;
    r: number;
  };
};

type Marker = {
  latLng: [number, number];
  name: string;
  style?: {
    fill: string;
    borderWidth?: number;
    borderColor?: string;
  };
};

export const USCustomerHeatmapCard: React.FC = () => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-theme-xs dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="mb-5">
        <h3 className="text-base font-bold text-gray-900 dark:text-white">
          US Customer Heatmap
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Analyze customer density and regional performance
        </p>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-900/60 h-[340px] flex items-center justify-center p-2">
        <div className="w-full h-full">
          <VectorMap
            map={worldMill}
            backgroundColor="transparent"
            zoomOnScroll={false}
            focusOn={{
              x: 0.25,
              y: 0.38,
              scale: 2.8,
              animate: true,
            }}
            series={{
              regions: [
                {
                  attribute: "fill",
                  scale: ["#BFDBFE", "#2563EB"],
                  values: {
                    US: 100,
                    CA: 40,
                    MX: 30,
                  },
                },
              ],
            }}
            markerStyle={
              {
                initial: {
                  fill: "#ffffff",
                  r: 5,
                },
              } as MarkerStyle
            }
            markers={
              [
                {
                  latLng: [37.7749, -122.4194],
                  name: "San Francisco - High Density",
                  style: { fill: "#ffffff", borderWidth: 2, borderColor: "#2563EB" },
                },
                {
                  latLng: [40.7128, -74.006],
                  name: "New York - High Density",
                  style: { fill: "#ffffff", borderWidth: 2, borderColor: "#2563EB" },
                },
                {
                  latLng: [29.7604, -95.3698],
                  name: "Houston - Medium Density",
                  style: { fill: "#ffffff", borderWidth: 2, borderColor: "#2563EB" },
                },
                {
                  latLng: [41.8781, -87.6298],
                  name: "Chicago - Medium Density",
                  style: { fill: "#ffffff", borderWidth: 2, borderColor: "#2563EB" },
                },
                {
                  latLng: [25.7617, -80.1918],
                  name: "Miami - Density Spot",
                  style: { fill: "#ffffff", borderWidth: 2, borderColor: "#2563EB" },
                },
              ] as Marker[]
            }
            regionStyle={{
              initial: {
                fill: "#D0D5DD",
                fillOpacity: 1,
                stroke: "#94A3B8",
                strokeWidth: 0.5,
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
