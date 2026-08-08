import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { CreateInvoiceHeader } from "./CreateInvoiceHeader";
import { CreateInvoiceForm } from "./CreateInvoiceForm";
import { CreateInvoiceTable } from "./CreateInvoiceTable";

export const CreateInvoiceLayout: React.FC = () => {
  return (
    <div>
      <PageBreadcrumb pageTitle="Create Invoice" />
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <CreateInvoiceHeader />
        <CreateInvoiceForm />
        <CreateInvoiceTable />
      </div>
    </div>
  );
};
