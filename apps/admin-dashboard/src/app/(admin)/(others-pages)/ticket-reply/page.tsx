import { Metadata } from "next";
import React from "react";
import { TicketReplyLayout } from "@/components/ticket-reply/TicketReplyLayout";

export const metadata: Metadata = {
  title: "Ticket Reply | AdminArif.Dev",
  description: "Ticket Reply page for AdminArif.Dev",
};

export default function TicketReplyPage() {
  return <TicketReplyLayout />;
}
