"use client";
import React, { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { TaskKanbanHeader, KanbanFilterTab } from "./TaskKanbanHeader";
import { KanbanColumn } from "./KanbanColumn";
import { KanbanTaskData } from "./KanbanCard";

const initialKanbanTasks: KanbanTaskData[] = [
  // To Do
  {
    id: "1",
    title: "Finish user onboarding",
    column: "To Do",
    dueDate: "Tomorrow",
    commentsCount: 1,
    tag: "Development",
  },
  {
    id: "2",
    title: "Solve the dribble prioritization issue with the team",
    column: "To Do",
    dueDate: "Jan 08, 2027",
    commentsCount: 1,
    tag: "Marketing",
  },
  {
    id: "3",
    title: "Change license and remove products",
    column: "To Do",
    dueDate: "Jan 8, 2027",
    tag: "Dev",
  },

  // In Progress
  {
    id: "4",
    title: "Work in progress(WIP) Dashboard",
    column: "In Progress",
    dueDate: "Today",
    commentsCount: 1,
    tag: "Development",
  },
  {
    id: "5",
    title: "Kanban manager",
    column: "In Progress",
    dueDate: "Jan 08, 2027",
    attachmentsCount: 2,
    tag: "Template",
  },
  {
    id: "6",
    title: "Product Update - Q4 (2024)",
    description: "Dedicated from a category of users that will perform actions.",
    imageUrl: "/banner.png",
    column: "In Progress",
    dueDate: "Today",
    commentsCount: 1,
    tag: "Development",
  },
  {
    id: "7",
    title: "Make figma bot send comment when ticket is auto-moved back to inbox",
    column: "In Progress",
    dueDate: "Mar 08, 2027",
    commentsCount: 1,
    tag: "Dev",
  },

  // Completed
  {
    id: "8",
    title: "Manage internal feedback",
    column: "Completed",
    dueDate: "Tomorrow",
    commentsCount: 1,
    tag: "Dev",
  },
  {
    id: "9",
    title: "Do some projects on React Native with Flutter",
    column: "Completed",
    dueDate: "Jan 8, 2027",
    commentsCount: 1,
    tag: "Development",
  },
  {
    id: "10",
    title: "Design marketing assets",
    column: "Completed",
    dueDate: "Jan 08, 2027",
    commentsCount: 2,
    attachmentsCount: 1,
    tag: "Marketing",
  },
  {
    id: "11",
    title: "Kanban flow manager",
    column: "Completed",
    dueDate: "Jan 08, 2027",
    attachmentsCount: 2,
    tag: "Template",
  },
];

export const TaskKanbanLayout: React.FC = () => {
  const [tasks, setTasks] = useState<KanbanTaskData[]>(initialKanbanTasks);
  const [activeTab, setActiveTab] = useState<KanbanFilterTab>("all");

  const handleAddTask = (newTask: {
    title: string;
    description?: string;
    column: "To Do" | "In Progress" | "Completed";
    tag?: string;
    dueDate?: string;
  }) => {
    const item: KanbanTaskData = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      column: newTask.column,
      tag: newTask.tag || "Development",
      dueDate: newTask.dueDate || "Today",
      commentsCount: 0,
    };
    setTasks((prev) => [item, ...prev]);
  };

  const todoTasks = tasks.filter((t) => t.column === "To Do");
  const inProgressTasks = tasks.filter((t) => t.column === "In Progress");
  const completedTasks = tasks.filter((t) => t.column === "Completed");

  return (
    <div>
      <PageBreadcrumb pageTitle="Kanban" />

      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <TaskKanbanHeader
          activeTab={activeTab}
          onTabChange={setActiveTab}
          allCount={tasks.length}
          todoCount={todoTasks.length}
          inProgressCount={inProgressTasks.length}
          completedCount={completedTasks.length}
          onAddTask={handleAddTask}
        />

        <div className="p-5 lg:p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            {(activeTab === "all" || activeTab === "todo") && (
              <KanbanColumn
                title="To Do"
                count={todoTasks.length}
                tasks={todoTasks}
                badgeColor="text-brand-500 bg-brand-50 dark:bg-brand-500/15 dark:text-brand-400"
              />
            )}

            {(activeTab === "all" || activeTab === "in-progress") && (
              <KanbanColumn
                title="In Progress"
                count={inProgressTasks.length}
                tasks={inProgressTasks}
                badgeColor="text-warning-600 bg-warning-50 dark:bg-warning-500/15 dark:text-warning-500"
              />
            )}

            {(activeTab === "all" || activeTab === "completed") && (
              <KanbanColumn
                title="Completed"
                count={completedTasks.length}
                tasks={completedTasks}
                badgeColor="text-success-600 bg-success-50 dark:bg-success-500/15 dark:text-success-500"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
