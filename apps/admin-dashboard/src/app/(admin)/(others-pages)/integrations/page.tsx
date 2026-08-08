import { Metadata } from "next";
import React from "react";
import { IntegrationsLayout } from "@/components/integrations/IntegrationsLayout";

export const metadata: Metadata = {
  title: "Integrations | AdminArif.Dev",
  description: "Integrations page for AdminArif.Dev",
};

export default function IntegrationsPage() {
  return <IntegrationsLayout />;
}
