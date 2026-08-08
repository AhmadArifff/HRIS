"use client";
import React, { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { TransactionsHeader } from "./TransactionsHeader";
import { TransactionsFilter } from "./TransactionsFilter";
import { TransactionsTable } from "./TransactionsTable";

export const TransactionsLayout: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState("7days");

  const handleExportCSV = () => {
    alert("Exporting Transactions CSV file...");
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="Transactions" />
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <TransactionsHeader />
        <TransactionsFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          onExportCSV={handleExportCSV}
        />
        <TransactionsTable searchTerm={searchTerm} />
      </div>
    </div>
  );
};
