import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import { JobBoard } from "@/components/hris/JobBoard";

export const metadata: Metadata = {
  title: "Job Board | HRIS Admin Dashboard",
  description: "Daftar lowongan pekerjaan aktif.",
};

export default function JobBoardPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Job Board (Internal & Eksternal)" />
      <div className="space-y-6">
        <JobBoard />
      </div>
    </div>
  );
}
