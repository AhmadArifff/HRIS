import React from "react";
import { SingleInvoiceHeader } from "./SingleInvoiceHeader";
import { InvoiceCardHeader } from "./InvoiceCardHeader";
import { InvoiceAddresses } from "./InvoiceAddresses";
import { InvoiceTable } from "./InvoiceTable";

export const SingleInvoiceLayout = () => {
  return (
    <div className="mx-auto max-w-(--breakpoint-2xl) p-4 pb-20 md:p-6 md:pb-24">
      <SingleInvoiceHeader />
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] w-full">
        <InvoiceCardHeader />
        <div className="p-5 xl:p-8">
          <InvoiceAddresses />
          <InvoiceTable />
        </div>
      </div>
    </div>
  );
};
