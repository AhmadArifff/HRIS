import { Metadata } from "next";
import React from "react";
import { FileManagerLayout } from "@/components/file-manager/FileManagerLayout";

export const metadata: Metadata = {
  title: "File Manager | AdminArif.Dev",
  description: "File Manager page for AdminArif.Dev",
};

export default function FileManagerPage() {
  return <FileManagerLayout />;
}
