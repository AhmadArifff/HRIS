import React from "react";
import type { Metadata } from "next";
import { TopMetrics } from "@/components/logistics/TopMetrics";
import { DeliveryStatistics } from "@/components/logistics/DeliveryStatistics";
import { TotalRevenue } from "@/components/logistics/TotalRevenue";
import { DeliveryVehicles } from "@/components/logistics/DeliveryVehicles";
import { DeliveryActivities } from "@/components/logistics/DeliveryActivities";
import { TrackingDelivery } from "@/components/logistics/TrackingDelivery";

export const metadata: Metadata = {
  title: "Logistics Dashboard | Arif.Dev - Next.js Dashboard Template",
  description: "This is Logistics Dashboard page for Arif.Dev - Next.js Admin Dashboard",
};

export default function LogisticsDashboard() {
  return (
    <div className="space-y-6">
      <TopMetrics />
      
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <DeliveryStatistics />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <TotalRevenue />
            <DeliveryVehicles />
          </div>
          <DeliveryActivities />
        </div>
        
        <div className="space-y-6 xl:col-span-1">
          <TrackingDelivery />
        </div>
      </div>
    </div>
  );
}
