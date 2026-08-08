"use client";
import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { AllMediaSection } from "./AllMediaSection";
import { AllFoldersSection } from "./AllFoldersSection";
import { StorageDetailsCard } from "./StorageDetailsCard";
import { RecentFilesTable } from "./RecentFilesTable";

export const FileManagerLayout: React.FC = () => {
  return (
    <div>
      <PageBreadcrumb pageTitle="File Manager" />

      <div className="space-y-6">
        {/* Top All Media Section */}
        <AllMediaSection />

        {/* Middle Grid: Folders & Storage */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <AllFoldersSection />
          </div>
          <div className="lg:col-span-4">
            <StorageDetailsCard />
          </div>
        </div>

        {/* Bottom Recent Files Table */}
        <RecentFilesTable />
      </div>
    </div>
  );
};
