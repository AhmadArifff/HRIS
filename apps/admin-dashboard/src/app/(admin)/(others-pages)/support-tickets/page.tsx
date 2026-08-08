import { Metadata } from "next";
import React from "react";
import { SupportTicketsLayout } from "@/components/support-tickets/SupportTicketsLayout";

export const metadata: Metadata = {
  title: "Support Ticket | AdminArif.Dev",
  description: "Support Ticket page for AdminArif.Dev",
};

export default function SupportTicketsPage() {
  return <SupportTicketsLayout />;
}
