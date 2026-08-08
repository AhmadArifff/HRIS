import { Metadata } from "next";
import React from "react";
import { DataTablesLayout } from "@/components/tables/data-tables/DataTablesLayout";

export const metadata: Metadata = {
  title: "Data Tables | AdminArif.Dev",
  description: "Data Tables page for AdminArif.Dev",
};

export default function DataTablesPage() {
  return <DataTablesLayout />;
}
