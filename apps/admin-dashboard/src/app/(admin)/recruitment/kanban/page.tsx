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
    <div className="flex flex-col h-[calc(100vh-140px)] min-h-[580px] w-full overflow-hidden">
      {/* 1. FIXED TOP AREA (Page Title + Breadcrumbs - Never scrolls away) */}
      <div className="shrink-0 pb-3">
        <PageBreadcrumb pageTitle="Applicant Tracking System (ATS)" />
      </div>

      {/* 2. KANBAN BOARD CONTAINER (Cards scroll independently) */}
      <div className="flex-1 min-h-0 w-full overflow-hidden">
        <KanbanATS />
      </div>
    </div>
  );
}
