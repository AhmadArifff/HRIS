"use client";
import React from "react";
import { BillingHeader } from "./BillingHeader";
import { PlanDetails } from "./PlanDetails";
import { BillingInfo } from "./BillingInfo";
import { PaymentMethods } from "./PaymentMethods";
import { BillingInvoices } from "./BillingInvoices";

export const BillingLayout = () => {
  return (
    <div className="space-y-6">
      <BillingHeader />
      <div className="flex flex-col gap-6 xl:flex-row">
        <PlanDetails />
        <BillingInfo />
      </div>
      <PaymentMethods />
      <BillingInvoices />
    </div>
  );
};
