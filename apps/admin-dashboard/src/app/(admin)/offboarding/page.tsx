import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import { OffboardingTable } from "@/components/hris/OffboardingTable";

export const metadata: Metadata = {
  title: "Offboarding | HRIS Admin Dashboard",
  description: "Kelola proses pemberhentian dan clearance karyawan.",
};

export default function OffboardingPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Offboarding Karyawan" />
      <div className="space-y-6">
        <OffboardingTable />
      </div>
    </div>
  );
}
