"use client";
import React, { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { ApiKeyTableCard, ApiKeyItem } from "./ApiKeyTableCard";
import { CreateApiKeyModal } from "./CreateApiKeyModal";
import { EditApiKeyModal } from "./EditApiKeyModal";

const initialApiKeys: ApiKeyItem[] = [
  {
    id: "1",
    name: "Production API key",
    value: "sk_live_**********4248",
    status: "Disabled",
    created: "25 Jan, 2025",
    lastUsed: "Today, 10:45 AM",
    enabled: false,
  },
  {
    id: "2",
    name: "Development API key",
    value: "dev_live_**********4923",
    status: "Active",
    created: "29 Dec, 2024",
    lastUsed: "Today, 12:40 AM",
    enabled: true,
  },
  {
    id: "3",
    name: "Legacy API Key",
    value: "leg_live_**********0932",
    status: "Active",
    created: "12 Mar, 2024",
    lastUsed: "Today, 11:45 PM",
    enabled: true,
  },
];

export const ApiKeysLayout: React.FC = () => {
  const [apiKeys, setApiKeys] = useState<ApiKeyItem[]>(initialApiKeys);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingKey, setEditingKey] = useState<ApiKeyItem | null>(null);

  const handleCreateKey = (name: string) => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const newKey: ApiKeyItem = {
      id: Date.now().toString(),
      name,
      value: `sec_live_**********${randomDigits}`,
      status: "Active",
      created: "Just now",
      lastUsed: "Never",
      enabled: true,
    };
    setApiKeys((prev) => [newKey, ...prev]);
  };

  const handleSaveEditedKey = (id: string, newName: string) => {
    setApiKeys((prev) =>
      prev.map((item) => (item.id === id ? { ...item, name: newName } : item))
    );
  };

  const handleToggleStatus = (id: string) => {
    setApiKeys((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newEnabled = !item.enabled;
          return {
            ...item,
            enabled: newEnabled,
            status: newEnabled ? "Active" : "Disabled",
          };
        }
        return item;
      })
    );
  };

  const handleRegenerateKey = (id: string) => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    setApiKeys((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const prefix = item.value.substring(0, 8);
          return {
            ...item,
            value: `${prefix}**********${randomDigits}`,
            lastUsed: "Just now",
          };
        }
        return item;
      })
    );
  };

  const handleDeleteKey = (id: string) => {
    setApiKeys((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="API Keys" />

      <ApiKeyTableCard
        apiKeys={apiKeys}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
        onOpenEditModal={(apiKey) => setEditingKey(apiKey)}
        onToggleStatus={handleToggleStatus}
        onRegenerateKey={handleRegenerateKey}
        onDeleteKey={handleDeleteKey}
      />

      <CreateApiKeyModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateKey={handleCreateKey}
      />

      <EditApiKeyModal
        isOpen={!!editingKey}
        apiKey={editingKey}
        onClose={() => setEditingKey(null)}
        onSaveKey={handleSaveEditedKey}
      />
    </div>
  );
};
