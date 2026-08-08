"use client";
import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { MailboxSidebar } from "./MailboxSidebar";
import { EmailDetailsHeaderBar } from "./EmailDetailsHeaderBar";
import { EmailDetailsBody } from "./EmailDetailsBody";

export const EmailDetailsLayout: React.FC = () => {
  return (
    <div>
      <PageBreadcrumb pageTitle="Inbox" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Mailbox Sidebar */}
        <div className="lg:col-span-3">
          <MailboxSidebar />
        </div>

        {/* Right Email Details Container */}
        <div className="lg:col-span-9 flex flex-col min-h-[720px] rounded-2xl border border-gray-200 bg-white shadow-theme-xs dark:border-gray-800 dark:bg-white/[0.03]">
          <EmailDetailsHeaderBar />
          <EmailDetailsBody />
        </div>
      </div>
    </div>
  );
};
