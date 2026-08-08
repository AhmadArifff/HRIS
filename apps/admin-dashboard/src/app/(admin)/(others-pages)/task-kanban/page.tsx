import { Metadata } from "next";
import React from "react";
import { TaskKanbanLayout } from "@/components/task/task-kanban/TaskKanbanLayout";

export const metadata: Metadata = {
  title: "Task Kanban | AdminArif.Dev",
  description: "Task Kanban page for AdminArif.Dev",
};

export default function TaskKanbanPage() {
  return <TaskKanbanLayout />;
}
