"use client";
import React, { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { TaskListHeader, FilterTab } from "./TaskListHeader";
import { TaskGroup, TaskItemData } from "./TaskGroup";

const initialTasks: TaskItemData[] = [
  // Todo
  {
    id: "1",
    title: "Finish user onboarding",
    category: "Todo",
    completed: false,
    tag: "Marketing",
    dueDate: "Tomorrow",
    commentsCount: 1,
  },
  {
    id: "2",
    title: "Solve the Dribble prioritization issue with the team",
    category: "Todo",
    completed: false,
    tag: "Marketing",
    dueDate: "Tomorrow",
    commentsCount: 2,
  },
  {
    id: "3",
    title: "Finish user onboarding",
    category: "Todo",
    completed: true,
    tag: "Marketing",
    dueDate: "Feb 12, 2024",
    commentsCount: 1,
  },
  // In-Progress
  {
    id: "4",
    title: "Work in Progress (WIP) Dashboard",
    category: "In-Progress",
    completed: false,
    tag: "Template",
    dueDate: "Jan 8, 2027",
    commentsCount: 2,
  },
  {
    id: "5",
    title: "Product Update - Q4 2024",
    category: "In-Progress",
    completed: false,
    dueDate: "Jan 8, 2027",
    commentsCount: 2,
  },
  {
    id: "6",
    title: "Kanban Flow Manager",
    category: "In-Progress",
    completed: true,
    dueDate: "Jan 8, 2027",
    commentsCount: 2,
  },
  {
    id: "7",
    title: "Make internal feedback",
    category: "In-Progress",
    completed: false,
    dueDate: "Jan 8, 2027",
    commentsCount: 2,
  },
  // Completed
  {
    id: "8",
    title: "Do some projects on React Native with Flutter",
    category: "Completed",
    completed: false,
    tag: "Marketing",
    dueDate: "Feb 12, 2027",
    commentsCount: 1,
  },
  {
    id: "9",
    title: "Design marketing assets",
    category: "Completed",
    completed: false,
    tag: "Marketing",
    dueDate: "Feb 12, 2027",
    commentsCount: 1,
  },
  {
    id: "10",
    title: "Kanban Flow Manager",
    category: "Completed",
    completed: false,
    tag: "Marketing",
    dueDate: "Feb 12, 2027",
    commentsCount: 1,
  },
  {
    id: "11",
    title: "Change license and remove products",
    category: "Completed",
    completed: false,
    tag: "Marketing",
    dueDate: "Feb 12, 2027",
    commentsCount: 1,
  },
];

export const TaskListLayout: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItemData[]>(initialTasks);
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleAddTask = (newTask: {
    title: string;
    category: "Todo" | "In-Progress" | "Completed";
    tag?: string;
    dueDate?: string;
  }) => {
    const item: TaskItemData = {
      id: Date.now().toString(),
      title: newTask.title,
      category: newTask.category,
      completed: false,
      tag: newTask.tag || "General",
      dueDate: newTask.dueDate || "Tomorrow",
      commentsCount: 0,
    };
    setTasks((prev) => [item, ...prev]);
  };

  // Group counts
  const todoTasks = tasks.filter((t) => t.category === "Todo");
  const inProgressTasks = tasks.filter((t) => t.category === "In-Progress");
  const completedTasks = tasks.filter((t) => t.category === "Completed");

  return (
    <div>
      <PageBreadcrumb pageTitle="Task List" />

      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <TaskListHeader
          activeTab={activeTab}
          onTabChange={setActiveTab}
          allCount={tasks.length}
          todoCount={todoTasks.length}
          inProgressCount={inProgressTasks.length}
          completedCount={completedTasks.length}
          onAddTask={handleAddTask}
        />

        <div className="p-5 lg:p-6 space-y-8">
          {(activeTab === "all" || activeTab === "todo") && (
            <TaskGroup
              categoryTitle="Todo"
              categoryType="Todo"
              tasks={todoTasks}
              onToggleTask={handleToggleTask}
            />
          )}

          {(activeTab === "all" || activeTab === "in-progress") && (
            <TaskGroup
              categoryTitle="In-Progress"
              categoryType="In-Progress"
              tasks={inProgressTasks}
              onToggleTask={handleToggleTask}
            />
          )}

          {(activeTab === "all" || activeTab === "completed") && (
            <TaskGroup
              categoryTitle="Completed"
              categoryType="Completed"
              tasks={completedTasks}
              onToggleTask={handleToggleTask}
            />
          )}
        </div>
      </div>
    </div>
  );
};
