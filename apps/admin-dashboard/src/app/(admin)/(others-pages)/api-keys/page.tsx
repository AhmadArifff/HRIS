import { Metadata } from "next";
import React from "react";
import { ApiKeysLayout } from "@/components/api-keys/ApiKeysLayout";

export const metadata: Metadata = {
  title: "API Keys | AdminArif.Dev",
  description: "API Keys page for AdminArif.Dev",
};

export default function ApiKeysPage() {
  return <ApiKeysLayout />;
}
