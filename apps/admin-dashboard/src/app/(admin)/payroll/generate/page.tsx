import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import { PayrollGenerateForm } from "@/components/hris/PayrollGenerateForm";

export const metadata: Metadata = {
  title: "Generate Payroll | HRIS Admin Dashboard",
  description: "Generate gaji bulanan karyawan.",
};

export default function PayrollGeneratePage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Generate Payroll" />
      <div className="space-y-6">
        <PayrollGenerateForm />
      </div>
    </div>
  );
}
