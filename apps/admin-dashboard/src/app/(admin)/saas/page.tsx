import React from "react";
import { Overview } from "@/components/saas/Overview";
import { ChurnRate } from "@/components/saas/ChurnRate";
import { UserGrowth } from "@/components/saas/UserGrowth";
import { ConversionFunnel } from "@/components/saas/ConversionFunnel";
import { RecentInvoices } from "@/components/saas/RecentInvoices";
import { ProductPerformance } from "@/components/saas/ProductPerformance";
import { Activities } from "@/components/saas/Activities";

export default function SaaSPage() {
  return (
    <div className="mx-auto max-w-screen-2xl p-4 pb-20 md:p-6 md:pb-24">
      <div className="space-y-5 sm:space-y-6">
        <Overview />
        
        <div className="gap-6 space-y-5 sm:space-y-6 xl:grid xl:grid-cols-12 xl:space-y-0">
          <div className="xl:col-span-7 2xl:col-span-8">
            <div className="sm:space-y-6 space-y-5">
              <div className="grid gap-5 sm:gap-6 lg:grid-cols-2">
                <ChurnRate />
                <UserGrowth />
              </div>
              <ConversionFunnel />
              <RecentInvoices />
            </div>
          </div>
          
          <div className="space-y-5 sm:space-y-6 xl:col-span-5 2xl:col-span-4">
            <ProductPerformance />
            <Activities />
          </div>
        </div>
      </div>
    </div>
  );
}
