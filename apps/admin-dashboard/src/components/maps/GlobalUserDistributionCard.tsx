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

export const GlobalUserDistributionCard: React.FC = () => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-theme-xs dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="mb-5">
        <h3 className="text-base font-bold text-gray-900 dark:text-white">
          Global User Distribution
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Track active users and customer locations worldwide
        </p>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-900/60 h-[300px] flex items-center justify-center p-2">
        <div className="w-full h-full">
          <VectorMap
            map={worldMill}
            backgroundColor="transparent"
            zoomOnScroll={false}
            markerStyle={
              {
                initial: {
                  fill: "#465FFF",
                  r: 5,
                },
              } as MarkerStyle
            }
            markersSelectable={true}
            markers={
              [
                {
                  latLng: [37.0902, -95.7129],
                  name: "United States",
                  style: { fill: "#465FFF", borderWidth: 2, borderColor: "#ffffff" },
                },
                {
                  latLng: [55.3781, -3.436],
                  name: "United Kingdom",
                  style: { fill: "#465FFF", borderWidth: 2, borderColor: "#ffffff" },
                },
                {
                  latLng: [20.5937, 78.9629],
                  name: "India",
                  style: { fill: "#465FFF", borderWidth: 2, borderColor: "#ffffff" },
                },
                {
                  latLng: [-25.2744, 133.7751],
                  name: "Australia",
                  style: { fill: "#465FFF", borderWidth: 2, borderColor: "#ffffff" },
                },
              ] as Marker[]
            }
            regionStyle={{
              initial: {
                fill: "#D0D5DD",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0,
              },
              hover: {
                fill: "#465FFF",
                fillOpacity: 0.8,
                cursor: "pointer",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};
