import { Metadata } from "next";
import React from "react";
import { ProductsLayout } from "@/components/ecommerce/products/ProductsLayout";

export const metadata: Metadata = {
  title: "E-commerce Products | AdminArif.Dev",
  description: "E-commerce Products page for AdminArif.Dev",
};

export default function EcommerceProductsPage() {
  return <ProductsLayout />;
}
