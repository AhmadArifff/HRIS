import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import { EmployeeTable } from "@/components/hris/EmployeeTable";

export const metadata: Metadata = {
  title: "Daftar Karyawan | HRIS Admin Dashboard",
  description: "Manajemen data karyawan pada sistem HRIS Enterprise.",
};

export default function EmployeeListPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Data Karyawan" />
      <div className="space-y-6">
        <EmployeeTable />
      </div>
    </div>
  );
}
