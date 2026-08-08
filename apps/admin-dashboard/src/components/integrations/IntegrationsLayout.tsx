"use client";
import React, { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { IntegrationsGrid } from "./IntegrationsGrid";
import { IntegrationItem } from "./IntegrationCard";
import { AddIntegrationModal } from "./AddIntegrationModal";
import { IntegrationDetailsModal } from "./IntegrationDetailsModal";

const initialIntegrations: IntegrationItem[] = [
  {
    id: "1",
    name: "Mailchimp",
    category: "Marketing",
    description: "Connect Mailchimp to streamline your email marketing—automate campaigns.",
    connected: true,
    logo: (
      <svg className="w-7 h-7 text-amber-500 fill-current" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-2h2v2zm0-4h-2V7h2v5.5z" />
      </svg>
    ),
  },
  {
    id: "2",
    name: "Google Meet",
    category: "Communications",
    description: "Connect your Google Meet account for seamless video conferencing.",
    connected: false,
    logo: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
        <path d="M4 6a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" fill="#00832F" />
        <path d="M16 10.5l4-3v9l-4-3v-3z" fill="#00AA47" />
        <circle cx="10" cy="12" r="3" fill="#FFBA00" />
      </svg>
    ),
  },
  {
    id: "3",
    name: "Zoom",
    category: "Communications",
    description: "Integrate Zoom to streamline your virtual meetings and team collaborations",
    connected: false,
    logo: (
      <svg className="w-7 h-7 text-blue-500 fill-current" viewBox="0 0 24 24">
        <path d="M4.5 4.5A2.5 2.5 0 002 7v10a2.5 2.5 0 002.5 2.5h10a2.5 2.5 0 002.5-2.5V7a2.5 2.5 0 00-2.5-2.5h-10zM19 8.5l3-2.25v11.5l-3-2.25V8.5z" />
      </svg>
    ),
  },
  {
    id: "4",
    name: "Loom",
    category: "Communications",
    description: "Integrate Loom to easily record, share, and manage video messages",
    connected: false,
    logo: (
      <svg className="w-7 h-7 text-indigo-600 fill-current" viewBox="0 0 24 24">
        <path d="M12 2L9.5 9.5H2L8 14L5.5 21.5L12 17L18.5 21.5L16 14L22 9.5H14.5L12 2Z" />
      </svg>
    ),
  },
  {
    id: "5",
    name: "Linear",
    category: "Developer Tools",
    description: "Integrate Linear to manage issues, track progress, and streamline your team's.",
    connected: false,
    logo: (
      <svg className="w-7 h-7 text-indigo-500 fill-current" viewBox="0 0 24 24">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-4 14.5L6.5 15l8-8L16 8.5l-8 8z" />
      </svg>
    ),
  },
  {
    id: "6",
    name: "Gmail",
    category: "Communications",
    description: "Integrate Gmail to send, receive, and manage emails directly from your workspace.",
    connected: false,
    logo: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
        <path d="M2 6a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" fill="#EA4335" />
        <path d="M12 13L2 6h20l-10 7z" fill="#FBBC04" />
      </svg>
    ),
  },
  {
    id: "7",
    name: "Trello",
    category: "Project Management",
    description: "Capture, organize, and tackle your to-dos from anywhere.",
    connected: false,
    logo: (
      <svg className="w-7 h-7 text-blue-600 fill-current" viewBox="0 0 24 24">
        <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM9.5 16h-3V7h3v9zm8-4h-3V7h3v5z" />
      </svg>
    ),
  },
  {
    id: "8",
    name: "Notion",
    category: "Project Management",
    description: "Capture, organize, and tackle your to-dos from anywhere.",
    connected: false,
    logo: (
      <svg className="w-7 h-7 text-gray-900 dark:text-white fill-current" viewBox="0 0 24 24">
        <path d="M4.459 4.208c.746.606 1.026.56 2.427.466l11.434-.699c.373 0 .467-.187.373-.467L17.46.993c-.28-.373-.747-.56-1.399-.467L3.433 1.833c-.56.094-.746.467-.466.84l1.492 1.535zm.747 4.106v13.53c0 .746.373 1.026 1.12 1.026h13.251c.746 0 1.026-.373 1.026-1.026V8.314c0-.746-.373-1.026-1.026-1.026H6.326c-.747 0-1.12.373-1.12 1.026z" />
      </svg>
    ),
  },
  {
    id: "9",
    name: "Jira",
    category: "Developer Tools",
    description: "Track issues and manage projects with ease and full team visibility.",
    connected: false,
    logo: (
      <svg className="w-7 h-7 text-blue-500 fill-current" viewBox="0 0 24 24">
        <path d="M11.571 11.429L12 11l.429.429 8.571 8.571a1.2 1.2 0 01-1.7 1.7l-7.3-7.3-7.3 7.3a1.2 1.2 0 01-1.7-1.7l8.571-8.571zM11.571 2.429L12 2l.429.429 8.571 8.571a1.2 1.2 0 01-1.7 1.7l-7.3-7.3-7.3 7.3a1.2 1.2 0 01-1.7-1.7l8.571-8.571z" />
      </svg>
    ),
  },
];

export const IntegrationsLayout: React.FC = () => {
  const [integrations, setIntegrations] = useState<IntegrationItem[]>(initialIntegrations);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState<IntegrationItem | null>(null);

  const handleToggleConnected = (id: string) => {
    setIntegrations((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, connected: !item.connected } : item
      )
    );
  };

  const handleAddIntegration = (name: string, description: string, category: string) => {
    const newItem: IntegrationItem = {
      id: Date.now().toString(),
      name,
      category,
      description,
      connected: true,
      logo: (
        <svg className="w-7 h-7 text-brand-500 fill-current" viewBox="0 0 24 24">
          <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
        </svg>
      ),
    };
    setIntegrations((prev) => [newItem, ...prev]);
  };

  const handleDeleteIntegration = (id: string) => {
    setIntegrations((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div>
      {/* Page Breadcrumb with Top Right Action Button */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <PageBreadcrumb pageTitle="Integrations" />

        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-5 py-2.5 text-xs font-medium text-white hover:bg-brand-600 transition shadow-theme-xs self-start sm:self-auto"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 2.91667V11.0833M2.91667 7H11.0833" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Add New Integration
        </button>
      </div>

      {/* Grid Container */}
      <IntegrationsGrid
        integrations={integrations}
        onToggleConnected={handleToggleConnected}
        onOpenDetails={(item) => setSelectedDetails(item)}
        onDeleteIntegration={handleDeleteIntegration}
      />

      {/* Modals */}
      <AddIntegrationModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddIntegration={handleAddIntegration}
      />

      <IntegrationDetailsModal
        isOpen={!!selectedDetails}
        integration={selectedDetails}
        onClose={() => setSelectedDetails(null)}
        onToggleConnected={handleToggleConnected}
      />
    </div>
  );
};
