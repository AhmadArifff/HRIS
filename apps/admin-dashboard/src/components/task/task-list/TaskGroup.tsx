"use client";
import React from "react";
import Image from "next/image";

export interface TaskItemData {
  id: string;
  title: string;
  category: "Todo" | "In-Progress" | "Completed";
  completed: boolean;
  tag?: string;
  dueDate: string;
  commentsCount: number;
  avatarUrl?: string;
}

interface TaskGroupProps {
  categoryTitle: string;
  categoryType: "Todo" | "In-Progress" | "Completed";
  tasks: TaskItemData[];
  onToggleTask: (id: string) => void;
}

export const TaskGroup: React.FC<TaskGroupProps> = ({
  categoryTitle,
  categoryType,
  tasks,
  onToggleTask,
}) => {
  if (tasks.length === 0) return null;

  const badgeColor =
    categoryType === "Todo"
      ? "text-brand-500 bg-brand-50 dark:bg-brand-500/15 dark:text-brand-400"
      : categoryType === "In-Progress"
      ? "text-warning-600 bg-warning-50 dark:bg-warning-500/15 dark:text-warning-500"
      : "text-success-600 bg-success-50 dark:bg-success-500/15 dark:text-success-500";

  return (
    <div className="space-y-3">
      {/* Category Section Header */}
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center gap-2">
          <h4 className="text-base font-semibold text-gray-800 dark:text-white">
            {categoryTitle}
          </h4>
          <span className={`inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-semibold ${badgeColor}`}>
            {tasks.length}
          </span>
        </div>

        <button
          type="button"
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          onClick={() => alert(`Options for ${categoryTitle}`)}
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M6 10C6 10.8284 5.32843 11.5 4.5 11.5C3.67157 11.5 3 10.8284 3 10C3 9.17157 3.67157 8.5 4.5 8.5C5.32843 8.5 6 9.17157 6 10ZM11.5 10C11.5 10.8284 10.8284 11.5 10 11.5C9.17157 11.5 8.5 10.8284 8.5 10C8.5 9.17157 9.17157 8.5 10 8.5C10.8284 8.5 11.5 9.17157 11.5 10ZM15.5 11.5C16.3284 11.5 17 10.8284 17 10C17 9.17157 16.3284 8.5 15.5 8.5C14.6716 8.5 14 9.17157 14 10C14 10.8284 14.6716 11.5 15.5 11.5Z" />
          </svg>
        </button>
      </div>

      {/* Task Items List */}
      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="group flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-theme-xs transition hover:border-gray-300 sm:flex-row sm:items-center sm:justify-between dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-gray-700"
          >
            {/* Left Controls & Title */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {/* Drag Handle */}
              <button
                type="button"
                className="cursor-grab text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                title="Drag to reorder"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M3 7C3 6.44772 3.44772 6 4 6H16C16.5523 6 17 6.44772 17 7C17 7.55228 16.5523 8 16 8H4C3.44772 8 3 7.55228 3 7ZM3 13C3 12.4477 3.44772 12 4 12H16C16.5523 12 17 12.4477 17 13C17 13.5523 16.5523 14 16 14H4C3.44772 14 3 13.5523 3 13Z" />
                </svg>
              </button>

              {/* Checkbox */}
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggleTask(task.id)}
                className="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800"
              />

              {/* Task Title */}
              <span
                className={`text-sm font-medium transition ${
                  task.completed
                    ? "line-through text-gray-400 dark:text-gray-500"
                    : "text-gray-800 dark:text-white/90"
                }`}
              >
                {task.title}
              </span>
            </div>

            {/* Right Meta Info */}
            <div className="flex items-center gap-4 shrink-0 self-end sm:self-auto">
              {/* Tag Badge */}
              {task.tag && (
                <span className="inline-flex items-center rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
                  {task.tag}
                </span>
              )}

              {/* Due Date */}
              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M6 2C6.55228 2 7 2.44772 7 3V4H13V3C13 2.44772 13.4477 2 14 2C14.5523 2 15 2.44772 15 3V4H16C17.1046 4 18 4.89543 18 6V16C18 17.1046 17.1046 18 16 18H4C2.89543 18 2 17.1046 2 16V6C2 4.89543 2.89543 4 4 4H5V3C5 2.44772 5.44772 2 6 2ZM4 7.5V16H16V7.5H4Z" />
                </svg>
                <span>{task.dueDate}</span>
              </div>

              {/* Comments Count */}
              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M18 10C18 14.4183 14.4183 18 10 18C8.42866 18 6.96328 17.5469 5.72797 16.7645L2.61803 17.8012C2.19698 17.9415 1.77663 17.5212 1.91697 17.1001L2.95368 13.9902C2.17128 12.7549 1.71818 11.2895 1.71818 9.71818C1.71818 5.30005 5.29995 1.71818 9.71818 1.71818C14.2999 1.71818 18 5.58172 18 10Z" />
                </svg>
                <span>{task.commentsCount}</span>
              </div>

              {/* User Avatar */}
              <div className="relative h-6 w-6 overflow-hidden rounded-full border border-gray-200 dark:border-gray-700">
                <Image
                  src={task.avatarUrl || "/images/user/owner.png"}
                  alt="User"
                  width={24}
                  height={24}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
