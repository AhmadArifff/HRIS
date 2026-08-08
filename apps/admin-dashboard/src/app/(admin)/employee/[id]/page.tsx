import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import { EmployeeProfile } from "@/components/hris/EmployeeProfile";

export const metadata: Metadata = {
  title: "Detail Profil Karyawan | HRIS Admin Dashboard",
  description: "Profil lengkap karyawan.",
};

export default function EmployeeProfilePage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Profil 360-View Karyawan" />
      <div className="space-y-6">
        <EmployeeProfile />
      </div>
    </div>
  );
}
