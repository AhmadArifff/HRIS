import { Metadata } from "next";
import React from "react";
import { ChatLayout } from "@/components/chat/ChatLayout";

export const metadata: Metadata = {
  title: "Chats | AdminArif.Dev",
  description: "Chat page for AdminArif.Dev",
};

export default function ChatPage() {
  return <ChatLayout />;
}
