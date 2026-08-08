"use client";
import React, { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { MailboxSidebar } from "./MailboxSidebar";
import { InboxTableFilterBar } from "./InboxTableFilterBar";
import { InboxDataTable, EmailItem } from "./InboxDataTable";

const initialEmails: EmailItem[] = [
  {
    id: "1",
    sender: "Material UI",
    snippet: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Assumenda dolor dolore esse mo...",
    badge: { text: "Important", color: "red" },
    time: "12:16 pm",
  },
  {
    id: "2",
    sender: "Wise",
    snippet: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Assumenda dolor dolore esse modi nesciunt, no...",
    time: "12:16 pm",
  },
  {
    id: "3",
    sender: "Search Console",
    snippet: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Assumenda dolor dolore esse modi n...",
    badge: { text: "Social", color: "green" },
    time: "Apr, 24",
  },
  {
    id: "4",
    sender: "Paypal",
    snippet: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Assumenda dolor dolore esse modi nesciunt, no...",
    time: "Apr, 30",
  },
  {
    id: "5",
    sender: "Google Meet",
    snippet: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Assumenda dolor dolore esse modi nesciunt, no...",
    time: "Apr, 16",
  },
  {
    id: "6",
    sender: "Loom",
    snippet: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Assumenda dolor dolore esse modi nesciunt, no...",
    time: "Apr, 24",
  },
  {
    id: "7",
    sender: "Airbnb",
    snippet: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Assumenda dolor dolore esse modi nesciunt, no...",
    time: "Mar, 05",
  },
  {
    id: "8",
    sender: "Facebook",
    snippet: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Assumenda dolor dolore esse modi nesciunt, no...",
    time: "Feb, 25",
  },
  {
    id: "9",
    sender: "Instagram",
    snippet: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Assumenda dolor dolore esse m...",
    badge: { text: "Promotional", color: "blue" },
    time: "Feb, 20",
  },
  {
    id: "10",
    sender: "Google",
    snippet: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Assumenda dolor dolore esse modi nesciunt, no...",
    time: "Feb, 25",
  },
  {
    id: "11",
    sender: "FormBold",
    snippet: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Assumenda dolor dolore esse modi nesciunt, no...",
    time: "Jan, 22",
  },
  {
    id: "12",
    sender: "GrayGrids",
    snippet: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Assumenda dolor dolore esse modi nesciunt, no...",
    time: "Feb, 25",
  },
];

export const InboxLayout: React.FC = () => {
  const [emails] = useState<EmailItem[]>(initialEmails);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelectAllToggle = () => {
    if (selectedIds.length === emails.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(emails.map((e) => e.id));
    }
  };

  const handleToggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const filteredEmails = emails.filter(
    (e) =>
      e.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.snippet.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <PageBreadcrumb pageTitle="Inbox" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Mailbox Sidebar */}
        <div className="lg:col-span-3">
          <MailboxSidebar />
        </div>

        {/* Right Main Email List Container */}
        <div className="lg:col-span-9 flex flex-col min-h-[720px] rounded-2xl border border-gray-200 bg-white shadow-theme-xs dark:border-gray-800 dark:bg-white/[0.03]">
          <InboxTableFilterBar
            searchQuery={searchQuery}
            onSearchChange={(query) => setSearchQuery(query)}
            onSelectAllToggle={handleSelectAllToggle}
            isAllSelected={emails.length > 0 && selectedIds.length === emails.length}
          />

          <InboxDataTable
            emails={filteredEmails}
            selectedIds={selectedIds}
            onToggleSelect={handleToggleSelect}
          />
        </div>
      </div>
    </div>
  );
};
