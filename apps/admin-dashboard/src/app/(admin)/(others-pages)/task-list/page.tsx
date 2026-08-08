import { Metadata } from "next";
import React from "react";
import { TaskListLayout } from "@/components/task/task-list/TaskListLayout";

export const metadata: Metadata = {
  title: "Task List | AdminArif.Dev",
  description: "Task List page for AdminArif.Dev",
};

export default function TaskListPage() {
  return <TaskListLayout />;
}
