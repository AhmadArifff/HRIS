import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import { CandidateDetail } from "@/components/hris/CandidateDetail";

export const metadata: Metadata = {
  title: "Detail Kandidat | HRIS Admin Dashboard",
  description: "Review CV dan form wawancara kandidat.",
};

export default function CandidateDetailPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Review Aplikasi Kandidat" />
      <div className="mt-4">
        <CandidateDetail />
      </div>
    </div>
  );
}
