import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import { KanbanATS } from "@/components/hris/KanbanATS";

export const metadata: Metadata = {
  title: "ATS Kanban Board | HRIS Admin Dashboard",
  description: "Kelola status aplikasi pelamar dengan mudah.",
};

export default function KanbanATSPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Applicant Tracking System (ATS)" />
      <div className="mt-4">
        <KanbanATS />
      </div>
    </div>
  );
}
