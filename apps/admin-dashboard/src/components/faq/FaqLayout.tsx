"use client";
import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { FaqOne } from "./FaqOne";
import { FaqTwo } from "./FaqTwo";
import { FaqThree } from "./FaqThree";

export const FaqLayout: React.FC = () => {
  return (
    <div>
      <PageBreadcrumb pageTitle="Faqs" />

      <div className="space-y-6">
        <FaqOne />
        <FaqTwo />
        <FaqThree />
      </div>
    </div>
  );
};
