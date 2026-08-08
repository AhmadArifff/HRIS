import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { ProductsHeader } from "./ProductsHeader";
import { ProductsFilter } from "./ProductsFilter";
import { ProductsTable } from "./ProductsTable";

export const ProductsLayout = () => {
  return (
    <>
      <div>
      <PageBreadcrumb pageTitle="Product List" />
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <ProductsHeader />
        <ProductsFilter />
        <ProductsTable />
      </div>
    </div>
    </>
  );
};
