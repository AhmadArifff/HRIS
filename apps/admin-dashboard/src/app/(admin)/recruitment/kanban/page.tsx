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
    <div className="flex flex-col h-[calc(100vh-140px)] min-h-[500px] w-full max-w-full min-w-0 overflow-hidden">
      {/* 1. FIXED TOP HEADER & BREADCRUMB (Always fixed in place, 100% visible, never scrolls horizontally or vertically) */}
      <div className="shrink-0 w-full bg-gray-50 dark:bg-gray-900 pb-2">
        <PageBreadcrumb pageTitle="Applicant Tracking System (ATS)" />
      </div>

      {/* 2. KANBAN BOARD CONTAINER (Cards & columns scroll independently in isolated container) */}
      <div className="flex-1 min-h-0 min-w-0 w-full overflow-hidden">
        <KanbanATS />
      </div>
    </div>
  );
}
