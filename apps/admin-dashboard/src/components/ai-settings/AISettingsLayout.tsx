"use client";

import React from "react";
import { SettingsSidebar } from "./SettingsSidebar";
import { AccountSettings } from "./AccountSettings";
import { MobileHeader } from "./MobileHeader";

export const AISettingsLayout = () => {
  return (
    <div className="relative overflow-hidden bg-white p-5 xl:flex xl:h-[calc(100vh-76px)] xl:p-0 dark:border-gray-800 dark:bg-gray-900 -mx-4 xl:-mx-6 -mt-6">
      <MobileHeader />
      <SettingsSidebar />
      <AccountSettings />
    </div>
  );
};
