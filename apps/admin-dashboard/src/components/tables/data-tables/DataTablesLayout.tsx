"use client";
import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { DataTableOne } from "./DataTableOne";
import { DataTableTwo } from "./DataTableTwo";
import { DataTableThree } from "./DataTableThree";

export const DataTablesLayout: React.FC = () => {
  return (
    <div>
      <PageBreadcrumb pageTitle="Data Tables" />

      <div className="space-y-6">
        <DataTableOne />
        <DataTableTwo />
        <DataTableThree />
      </div>
    </div>
  );
};
