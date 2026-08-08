import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import { PayrollComponentsTable } from "@/components/hris/PayrollComponentsTable";

export const metadata: Metadata = {
  title: "Komponen Gaji | HRIS Admin Dashboard",
  description: "Kelola tunjangan dan potongan karyawan.",
};

export default function PayrollComponentsPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Master Komponen Gaji" />
      <div className="space-y-6">
        <PayrollComponentsTable />
      </div>
    </div>
  );
}
