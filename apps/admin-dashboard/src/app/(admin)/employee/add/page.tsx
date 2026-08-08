import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import { EmployeeForm } from "@/components/hris/EmployeeForm";

export const metadata: Metadata = {
  title: "Tambah Karyawan | HRIS Admin Dashboard",
  description: "Formulir pendaftaran karyawan baru.",
};

export default function EmployeeAddPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Tambah Karyawan Baru" />
      <div className="space-y-6">
        <EmployeeForm />
      </div>
    </div>
  );
}
