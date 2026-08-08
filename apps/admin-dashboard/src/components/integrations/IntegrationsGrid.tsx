"use client";
import React from "react";
import { IntegrationCard, IntegrationItem } from "./IntegrationCard";

interface IntegrationsGridProps {
  integrations: IntegrationItem[];
  onToggleConnected: (id: string) => void;
  onOpenDetails: (integration: IntegrationItem) => void;
  onDeleteIntegration: (id: string) => void;
}

export const IntegrationsGrid: React.FC<IntegrationsGridProps> = ({
  integrations,
  onToggleConnected,
  onOpenDetails,
  onDeleteIntegration,
}) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {integrations.map((item) => (
        <IntegrationCard
          key={item.id}
          integration={item}
          onToggleConnected={onToggleConnected}
          onOpenDetails={onOpenDetails}
          onDeleteIntegration={onDeleteIntegration}
        />
      ))}
    </div>
  );
};
