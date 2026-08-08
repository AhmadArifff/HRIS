import React from "react";
import { InvoicesHeader } from "./InvoicesHeader";
import { InvoicesOverview } from "./InvoicesOverview";
import { InvoicesTable } from "./InvoicesTable";

export const InvoicesLayout = () => {
  return (
    <div className="mx-auto max-w-(--breakpoint-2xl) p-4 pb-20 md:p-6 md:pb-24">
      <InvoicesHeader />
      <div className="h-full">
        <InvoicesOverview />
        <InvoicesTable />
      </div>
    </div>
  );
};
