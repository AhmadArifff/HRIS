import React from "react";
import type { Metadata } from "next";
import { StockTickers } from "@/components/stocks/StockTickers";
import { PortfolioPerformance } from "@/components/stocks/PortfolioPerformance";
import { TrendingStocks } from "@/components/stocks/TrendingStocks";
import { Dividend } from "@/components/stocks/Dividend";
import { MyWatchlist } from "@/components/stocks/MyWatchlist";
import { LatestTransactions } from "@/components/stocks/LatestTransactions";

export const metadata: Metadata = {
  title:
    "Next.js Stocks Dashboard | Arif.Dev - Next.js Admin Dashboard Template",
  description: "This is Next.js Stocks Dashboard page for Arif.Dev.",
};

export default function StocksDashboard() {
  return (
    <div>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12">
          <StockTickers />
        </div>
        
        <div className="col-span-12 space-y-6 xl:col-span-8">
          <PortfolioPerformance />
          <TrendingStocks />
        </div>

        <div className="col-span-12 space-y-6 xl:col-span-4">
          <Dividend />
          <MyWatchlist />
        </div>

        <div className="col-span-12">
          <LatestTransactions />
        </div>
      </div>
    </div>
  );
}
