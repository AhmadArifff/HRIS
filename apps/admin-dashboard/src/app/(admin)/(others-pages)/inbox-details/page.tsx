import { Metadata } from "next";
import React from "react";
import { EmailDetailsLayout } from "@/components/email/EmailDetailsLayout";

export const metadata: Metadata = {
  title: "Email Details | AdminArif.Dev",
  description: "Email Details page for AdminArif.Dev",
};

export default function InboxDetailsPage() {
  return <EmailDetailsLayout />;
}
