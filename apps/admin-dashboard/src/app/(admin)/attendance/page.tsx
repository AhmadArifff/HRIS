import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import { AttendanceTable } from "@/components/hris/AttendanceTable";

export const metadata: Metadata = {
  title: "Kehadiran Karyawan | HRIS Admin Dashboard",
  description: "Pemantauan absensi harian karyawan.",
};

export default function AttendancePage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Kehadiran Harian" />
      <div className="space-y-6">
        <AttendanceTable />
      </div>
    </div>
  );
}
