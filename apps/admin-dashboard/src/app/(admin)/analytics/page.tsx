import type { Metadata } from "next";
import React from "react";
import { AnalyticsMetrics } from "@/components/analytics/AnalyticsMetrics";
import { VisitorAnalyticsChart } from "@/components/analytics/VisitorAnalyticsChart";
import { TopChannels } from "@/components/analytics/TopChannels";
import { TopPages } from "@/components/analytics/TopPages";
import { ActiveUsers } from "@/components/analytics/ActiveUsers";
import { AcquisitionChannels } from "@/components/analytics/AcquisitionChannels";
import { SessionsByDevice } from "@/components/analytics/SessionsByDevice";
import DemographicCard from "@/components/ecommerce/DemographicCard";
import RecentOrders from "@/components/ecommerce/RecentOrders";

export const metadata: Metadata = {
  title:
    "Next.js Analytics Dashboard | Ahmad Arif - Next.js Dashboard Template",
  description: "This is Next.js Analytics Dashboard for Ahmad Arif Dashboard Template",
};

export default function Analytics() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12">
        <AnalyticsMetrics />
      </div>

      <div className="col-span-12">
        <VisitorAnalyticsChart />
      </div>

      <div className="col-span-12 xl:col-span-7">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <TopChannels />
          <TopPages />
        </div>
      </div>

      <div className="col-span-12 xl:col-span-5">
        <ActiveUsers />
      </div>

      <div className="col-span-12 xl:col-span-7">
        <AcquisitionChannels />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <SessionsByDevice />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <DemographicCard />
      </div>

      <div className="col-span-12 xl:col-span-7">
        <RecentOrders />
      </div>
    </div>
  );
}
