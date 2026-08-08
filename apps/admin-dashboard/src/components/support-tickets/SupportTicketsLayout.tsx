"use client";
import React, { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { TicketStatsCards } from "./TicketStatsCards";
import { TicketTableFilterBar } from "./TicketTableFilterBar";
import { TicketDataTable, TicketItem } from "./TicketDataTable";

const initialTickets: TicketItem[] = [
  {
    id: "#323534",
    requestedBy: { name: "Lindsey Curtis", email: "demoemail@gmail.com" },
    subject: "Issue with Dashboard Login Access",
    createDate: "12 Feb, 2027",
    status: "Solved",
  },
  {
    id: "#323535",
    requestedBy: { name: "Kaiya George", email: "demoemail@gmail.com" },
    subject: "Billing Information Not Updating Properly",
    createDate: "13 Mar, 2027",
    status: "Pending",
  },
  {
    id: "#323536",
    requestedBy: { name: "Zain Geidt", email: "demoemail@gmail.com" },
    subject: "Bug Found in Dark Mode Layout",
    createDate: "19 Mar, 2027",
    status: "Pending",
  },
  {
    id: "#323537",
    requestedBy: { name: "Abram Schleifer", email: "demoemail@gmail.com" },
    subject: "Request to Add New Integration Feature",
    createDate: "25 Apr, 2027",
    status: "Solved",
  },
  {
    id: "#323538",
    requestedBy: { name: "Mia Chen", email: "mia.chen@email.com" },
    subject: "Unable to Reset Password",
    createDate: "28 Apr, 2027",
    status: "Pending",
  },
  {
    id: "#323539",
    requestedBy: { name: "John Doe", email: "john.doe@email.com" },
    subject: "Feature Request: Dark Mode",
    createDate: "30 Apr, 2027",
    status: "Solved",
  },
  {
    id: "#323540",
    requestedBy: { name: "Jane Smith", email: "jane.smith@email.com" },
    subject: "Error 500 on Dashboard",
    createDate: "01 May, 2027",
    status: "Pending",
  },
  {
    id: "#323541",
    requestedBy: { name: "Carlos Ruiz", email: "carlos.ruiz@email.com" },
    subject: "Cannot Download Invoice",
    createDate: "02 May, 2027",
    status: "Solved",
  },
  {
    id: "#323542",
    requestedBy: { name: "Emily Clark", email: "emily.clark@email.com" },
    subject: "UI Bug in Mobile View",
    createDate: "03 May, 2027",
    status: "Pending",
  },
  {
    id: "#323543",
    requestedBy: { name: "Liam Wong", email: "liam.wong@email.com" },
    subject: "Account Locked",
    createDate: "04 May, 2027",
    status: "Solved",
  },
];

export const SupportTicketsLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"All" | "Solved" | "Pending">("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTickets = initialTickets.filter((t) => {
    const matchesTab = activeTab === "All" || t.status === activeTab;
    const matchesSearch =
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.requestedBy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.requestedBy.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div>
      <PageBreadcrumb pageTitle="Support Ticket" />

      {/* Top Metric Cards */}
      <TicketStatsCards />

      {/* Main Table Wrapper Container */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-theme-xs dark:border-gray-800 dark:bg-white/[0.03]">
        <TicketTableFilterBar
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
          searchQuery={searchQuery}
          onSearchChange={(query) => setSearchQuery(query)}
        />

        <TicketDataTable tickets={filteredTickets} />
      </div>
    </div>
  );
};
