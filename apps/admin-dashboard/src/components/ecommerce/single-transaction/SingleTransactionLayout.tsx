"use client";
import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { SingleTransactionHeader } from "./SingleTransactionHeader";
import { OrderDetailsCard } from "./OrderDetailsCard";
import { CustomerDetailsCard } from "./CustomerDetailsCard";
import { OrderHistoryCard } from "./OrderHistoryCard";

export const SingleTransactionLayout: React.FC = () => {
  return (
    <div>
      <PageBreadcrumb pageTitle="Single Transaction" />

      <SingleTransactionHeader />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Order Details */}
        <div className="lg:col-span-8">
          <OrderDetailsCard />
        </div>

        {/* Right Column: Customer Details & Order History */}
        <div className="space-y-6 lg:col-span-4">
          <CustomerDetailsCard />
          <OrderHistoryCard />
        </div>
      </div>
    </div>
  );
};
