"use client";
import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { PricingTableOne } from "./PricingTableOne";
import { PricingTableTwo } from "./PricingTableTwo";
import { PricingTableThree } from "./PricingTableThree";

export const PricingTablesLayout: React.FC = () => {
  return (
    <div>
      <PageBreadcrumb pageTitle="Pricing Tables" />

      <div className="space-y-6">
        <PricingTableOne />
        <PricingTableTwo />
        <PricingTableThree />
      </div>
    </div>
  );
};
