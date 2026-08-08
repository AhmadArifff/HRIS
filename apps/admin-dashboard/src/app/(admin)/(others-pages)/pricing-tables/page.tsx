import { Metadata } from "next";
import React from "react";
import { PricingTablesLayout } from "@/components/pricing-tables/PricingTablesLayout";

export const metadata: Metadata = {
  title: "Pricing Tables | AdminArif.Dev",
  description: "Pricing Tables page for AdminArif.Dev",
};

export default function PricingTablesPage() {
  return <PricingTablesLayout />;
}
