"use client";
import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { GlobalUserDistributionCard } from "./GlobalUserDistributionCard";
import { CountryTrafficAnalyticsCard } from "./CountryTrafficAnalyticsCard";
import { USCustomerHeatmapCard } from "./USCustomerHeatmapCard";

export const VectorMapLayout: React.FC = () => {
  return (
    <div>
      <PageBreadcrumb pageTitle="Vector Map" />

      <div className="space-y-6">
        {/* Top Grid: Global User Distribution & Country Traffic Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GlobalUserDistributionCard />
          <CountryTrafficAnalyticsCard />
        </div>

        {/* Bottom Grid: US Customer Heatmap */}
        <div className="grid grid-cols-1 gap-6">
          <USCustomerHeatmapCard />
        </div>
      </div>
    </div>
  );
};
