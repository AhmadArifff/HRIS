"use client";
import React, { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { ChatSidebar, ChatContact } from "./ChatSidebar";
import { ChatMessageStream, MessageItem } from "./ChatMessageStream";
import { ChatInputBar } from "./ChatInputBar";

const initialContacts: ChatContact[] = [
  {
    id: "1",
    name: "Kaiya George",
    role: "Project Manager",
    time: "15 mins",
    avatar: "/images/user/user-01.jpg",
    status: "online",
  },
  {
    id: "2",
    name: "Lindsey Curtis",
    role: "Designer",
    time: "30 mins",
    avatar: "/images/user/user-02.jpg",
    status: "online",
  },
  {
    id: "3",
    name: "Zain Geidt",
    role: "Content Writer",
    time: "45 mins",
    avatar: "/images/user/user-03.jpg",
    status: "online",
  },
  {
    id: "4",
    name: "Carla George",
    role: "Front-end Developer",
    time: "2 days",
    avatar: "/images/user/user-04.jpg",
    status: "idle",
  },
  {
    id: "5",
    name: "Abram Schleifer",
    role: "Digital Marketer",
    time: "1 hour",
    avatar: "/images/user/user-05.jpg",
    status: "offline",
  },
  {
    id: "6",
    name: "Lincoln Donin",
    role: "Project ManagerProduct Designer",
    time: "3 days",
    avatar: "/images/user/user-06.jpg",
    status: "busy",
  },
  {
    id: "7",
    name: "Erin Geidthem",
    role: "Copywriter",
    time: "5 days",
    avatar: "/images/user/user-07.jpg",
    status: "online",
  },
  {
    id: "8",
    name: "Alena Baptista",
    role: "SEO Expert",
    time: "2 hours",
    avatar: "/images/user/user-08.jpg",
    status: "online",
  },
  {
    id: "9",
    name: "Wilium vamos",
    role: "Content Writer",
    time: "5 days",
    avatar: "/images/user/user-09.jpg",
    status: "online",
  },
];

const initialMessages: Record<string, MessageItem[]> = {
  "2": [
    {
      id: "m1",
      senderName: "Kaiya George",
      senderAvatar: "/images/user/user-01.jpg",
      isSelf: false,
      text: "I want to make an appointment tomorrow from 2:00 to 5:00pm?",
      time: "15 mins",
    },
    {
      id: "m2",
      senderName: "Lindsey Curtis",
      senderAvatar: "/images/user/user-02.jpg",
      isSelf: false,
      text: "I want to make an appointment tomorrow from 2:00 to 5:00pm?",
      time: "30 mins",
    },
    {
      id: "m3",
      senderName: "You",
      senderAvatar: "",
      isSelf: true,
      text: "If don't like something, I'll stay away from it.",
      time: "2 hours ago",
    },
    {
      id: "m4",
      senderName: "Lindsey Curtis",
      senderAvatar: "/images/user/user-02.jpg",
      isSelf: false,
      text: "I want more detailed information.",
      time: "2 hours ago",
    },
    {
      id: "m5",
      senderName: "You",
      senderAvatar: "",
      isSelf: true,
      text: "They got there early, and got really good seats.",
      time: "2 hours ago",
    },
    {
      id: "m6",
      senderName: "Lindsey Curtis",
      senderAvatar: "/images/user/user-02.jpg",
      isSelf: false,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
      text: "Please preview the image",
      time: "2 hours ago",
    },
  ],
};

export const ChatLayout: React.FC = () => {
  const [activeContactId, setActiveContactId] = useState("2"); // Lindsey Curtis default
  const [messagesMap, setMessagesMap] = useState<Record<string, MessageItem[]>>(initialMessages);

  const activeContact = initialContacts.find((c) => c.id === activeContactId) || initialContacts[1];
  const activeMessages = messagesMap[activeContactId] || [];

  const handleSendMessage = (text: string) => {
    const newMessage: MessageItem = {
      id: Date.now().toString(),
      senderName: "You",
      senderAvatar: "",
      isSelf: true,
      text,
      time: "Just now",
    };

    setMessagesMap((prev) => ({
      ...prev,
      [activeContactId]: [...(prev[activeContactId] || []), newMessage],
    }));
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="Chats" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Contact List */}
        <div className="lg:col-span-4 h-[720px]">
          <ChatSidebar
            contacts={initialContacts}
            activeContactId={activeContactId}
            onSelectContact={(id) => setActiveContactId(id)}
          />
        </div>

        {/* Right Column: Active Conversation Stream */}
        <div className="lg:col-span-8 flex flex-col h-[720px] rounded-2xl border border-gray-200 bg-white shadow-theme-xs dark:border-gray-800 dark:bg-white/[0.03] overflow-hidden">
          <div className="flex-1 overflow-hidden">
            <ChatMessageStream
              activeContact={activeContact}
              messages={activeMessages}
            />
          </div>
          <ChatInputBar onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};
