import React from "react";
import { MarketingMetrics } from "@/components/marketing/MarketingMetrics";
import { ImpressionDataTraffic } from "@/components/marketing/ImpressionDataTraffic";
import { FeaturedCampaigns } from "@/components/marketing/FeaturedCampaigns";
import { TrafficStats } from "@/components/marketing/TrafficStats";
import { TopTrafficSource } from "@/components/marketing/TopTrafficSource";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Marketing Dashboard | ahmad-arif-admin - Next.js Admin Dashboard Template",
  description: "This is React.js Marketing Dashboard page for ahmad-arif-admin - React.js Admin Dashboard",
};

export default function MarketingPage() {
  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12">
          <MarketingMetrics />
        </div>
        <div className="col-span-12 space-y-6 xl:col-span-8">
          <ImpressionDataTraffic />
          <FeaturedCampaigns />
        </div>
        <div className="col-span-12 space-y-6 xl:col-span-4">
          <TrafficStats />
          <TopTrafficSource />
        </div>
      </div>
    </div>
  );
}
