import { Metadata } from "next";
import React from "react";
import { SingleTransactionLayout } from "@/components/ecommerce/single-transaction/SingleTransactionLayout";

export const metadata: Metadata = {
  title: "E-commerce Single Transaction | AdminArif.Dev",
  description: "E-commerce Single Transaction page for AdminArif.Dev",
};

export default function EcommerceSingleTransactionPage() {
  return <SingleTransactionLayout />;
}
