import { Metadata } from "next";
import React from "react";
import { InboxLayout } from "@/components/email/InboxLayout";

export const metadata: Metadata = {
  title: "Inbox | AdminArif.Dev",
  description: "Inbox page for AdminArif.Dev",
};

export default function InboxPage() {
  return <InboxLayout />;
}
