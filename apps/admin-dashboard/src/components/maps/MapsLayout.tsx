"use client";
import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { MapViewCard } from "./MapViewCard";
import { MapTwoCard } from "./MapTwoCard";
import { WashingtonDCRegionCard } from "./WashingtonDCRegionCard";

export const MapsLayout: React.FC = () => {
  return (
    <div>
      <PageBreadcrumb pageTitle="Maps" />

      <div className="space-y-6">
        {/* Top Grid: Map View & Map 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MapViewCard />
          <MapTwoCard />
        </div>

        {/* Bottom Grid: Washington D.C. Region */}
        <div className="grid grid-cols-1 gap-6">
          <WashingtonDCRegionCard />
        </div>
      </div>
    </div>
  );
};
