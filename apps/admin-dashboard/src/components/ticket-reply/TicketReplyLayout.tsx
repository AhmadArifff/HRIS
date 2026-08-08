"use client";
import React, { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { TicketHeader } from "./TicketHeader";
import { TicketThread, ThreadMessage } from "./TicketThread";
import { TicketReplyComposer } from "./TicketReplyComposer";
import { TicketDetailsSidebar } from "./TicketDetailsSidebar";

const initialMessages: ThreadMessage[] = [
  {
    id: "tm1",
    senderName: "John Doe",
    senderEmail: "jhondelin@gmail.com",
    senderAvatar: "/images/user/user-01.jpg",
    timestamp: "Mon, 3:20 PM (2 hrs ago)",
    content:
      "Hi AdminArif Team, I hope you're doing well. I'm currently working on customizing the AdminArif dashboard and would like to add a new section labeled \"Reports.\" Before I proceed, I wanted to check if there's any official guide or best practice you recommend for adding custom pages within the AdminArif structure.",
    isCustomer: true,
  },
];

export const TicketReplyLayout: React.FC = () => {
  const [messages, setMessages] = useState<ThreadMessage[]>(initialMessages);
  const [status, setStatus] = useState<"In-Progress" | "Solved" | "On-Hold">("In-Progress");

  const handleSendReply = (replyText: string) => {
    const newMessage: ThreadMessage = {
      id: Date.now().toString(),
      senderName: "AdminArif Support Team",
      senderEmail: "support@adminarif.dev",
      senderAvatar: "/images/user/owner.png",
      timestamp: "Just now",
      content: replyText,
      isCustomer: false,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="Support Ticket" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Ticket Header, Thread & Reply Box */}
        <div className="lg:col-span-8 rounded-2xl border border-gray-200 bg-white shadow-theme-xs dark:border-gray-800 dark:bg-white/[0.03]">
          <TicketHeader />
          <TicketThread messages={messages} />
          <TicketReplyComposer
            onSendReply={handleSendReply}
            status={status}
            onStatusChange={(newStatus) => setStatus(newStatus)}
          />
        </div>

        {/* Right Column: Ticket Metadata Sidebar */}
        <div className="lg:col-span-4">
          <TicketDetailsSidebar
            customer="John Doe"
            email="jhondelin@gmail.com"
            ticketId="#346520"
            category="General Support"
            created="Dec 20, 2028"
            status={status}
          />
        </div>
      </div>
    </div>
  );
};
