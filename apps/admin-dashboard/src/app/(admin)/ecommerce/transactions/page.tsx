import { Metadata } from "next";
import React from "react";
import { TransactionsLayout } from "@/components/ecommerce/transactions/TransactionsLayout";

export const metadata: Metadata = {
  title: "E-commerce Transactions | AdminArif.Dev",
  description: "E-commerce Transactions page for AdminArif.Dev",
};

export default function EcommerceTransactionsPage() {
  return <TransactionsLayout />;
}
