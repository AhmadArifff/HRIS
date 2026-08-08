import React from "react";
import { AddProductHeader } from "./AddProductHeader";
import { ProductsDescription } from "./ProductsDescription";
import { PricingAvailability } from "./PricingAvailability";
import { ProductsImages } from "./ProductsImages";
import { ProductButtons } from "./ProductButtons";

export const AddProductLayout = () => {
  return (
    <div className="mx-auto max-w-(--breakpoint-2xl) p-4 pb-20 md:p-6 md:pb-24">
      <AddProductHeader />
      <div className="space-y-6 mt-6">
        <ProductsDescription />
        <PricingAvailability />
        <ProductsImages />
        <ProductButtons />
      </div>
    </div>
  );
};
