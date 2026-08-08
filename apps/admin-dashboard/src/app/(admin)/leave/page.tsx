import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import { LeaveTable } from "@/components/hris/LeaveTable";

export const metadata: Metadata = {
  title: "Persetujuan Cuti | HRIS Admin Dashboard",
  description: "Manajemen dan persetujuan pengajuan cuti karyawan.",
};

export default function LeavePage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Persetujuan Cuti" />
      <div className="space-y-6">
        <LeaveTable />
      </div>
    </div>
  );
}
