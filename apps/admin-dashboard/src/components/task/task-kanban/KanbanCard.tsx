"use client";
import React from "react";
import Image from "next/image";

export interface KanbanTaskData {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  column: "To Do" | "In Progress" | "Completed";
  tag?: "Development" | "Marketing" | "Dev" | "Template" | string;
  dueDate: string;
  commentsCount?: number;
  attachmentsCount?: number;
  avatarUrl?: string;
}

interface KanbanCardProps {
  task: KanbanTaskData;
}

export const KanbanCard: React.FC<KanbanCardProps> = ({ task }) => {
  const getTagBadgeStyle = (tag?: string) => {
    switch (tag) {
      case "Development":
        return "bg-orange-50 text-orange-600 dark:bg-orange-500/15 dark:text-orange-400";
      case "Marketing":
        return "bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400";
      case "Dev":
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
      case "Template":
        return "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <div 
      className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-theme-xs transition hover:border-gray-300 dark:border-gray-800 dark:bg-gray-900/60 dark:hover:border-gray-700 cursor-move"
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("taskId", task.id);
      }}
    >
      {/* Title & Avatar Row */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <h4 className="text-sm font-semibold text-gray-800 dark:text-white/90 leading-snug">
          {task.title}
        </h4>
        <div className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full border border-gray-200 dark:border-gray-700">
          <Image
            src={task.avatarUrl || "/images/user/owner.png"}
            alt="User"
            width={24}
            height={24}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Description if present */}
      {task.description && (
        <p className="mb-3 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
          {task.description}
        </p>
      )}

      {/* Banner Image Preview if present */}
      {task.imageUrl && (
        <div className="my-3 overflow-hidden rounded-xl border border-gray-100 dark:border-gray-800 h-32 relative bg-gradient-to-r from-blue-100 to-indigo-200 dark:from-blue-900/30 dark:to-indigo-900/30 flex items-center justify-center">
          <Image
            src={task.imageUrl}
            alt="Task Banner"
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Meta Row: Due Date, Comments, Attachments */}
      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M6 2C6.55228 2 7 2.44772 7 3V4H13V3C13 2.44772 13.4477 2 14 2C14.5523 2 15 2.44772 15 3V4H16C17.1046 4 18 4.89543 18 6V16C18 17.1046 17.1046 18 16 18H4C2.89543 18 2 17.1046 2 16V6C2 4.89543 2.89543 4 4 4H5V3C5 2.44772 5.44772 2 6 2ZM4 7.5V16H16V7.5H4Z" />
          </svg>
          <span>{task.dueDate}</span>
        </div>

        {task.commentsCount !== undefined && task.commentsCount > 0 && (
          <div className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M18 10C18 14.4183 14.4183 18 10 18C8.42866 18 6.96328 17.5469 5.72797 16.7645L2.61803 17.8012C2.19698 17.9415 1.77663 17.5212 1.91697 17.1001L2.95368 13.9902C2.17128 12.7549 1.71818 11.2895 1.71818 9.71818C1.71818 5.30005 5.29995 1.71818 9.71818 1.71818C14.2999 1.71818 18 5.58172 18 10Z" />
            </svg>
            <span>{task.commentsCount}</span>
          </div>
        )}

        {task.attachmentsCount !== undefined && task.attachmentsCount > 0 && (
          <div className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M8 3C5.79086 3 4 4.79086 4 7V13.5C4 16.5376 6.46243 19 9.5 19C12.5376 19 15 16.5376 15 13.5V6C15 4.34315 13.6569 3 12 3C10.3431 3 9 4.34315 9 6V13C9 13.2761 9.22386 13.5 9.5 13.5C9.77614 13.5 10 13.2761 10 13V6C10 4.89543 10.8954 4 12 4C13.1046 4 14 4.89543 14 6V13.5C14 15.9853 11.9853 18 9.5 18C7.01472 18 5 15.9853 5 13.5V7C5 5.34315 6.34315 4 8 4C9.65685 4 11 5.34315 11 7V13.5C11 14.3284 10.3284 15 9.5 15C8.67157 15 8 14.3284 8 13.5V7C8 6.72386 7.77614 6.5 7.5 6.5C7.22386 6.5 7 6.72386 7 7V13.5C7 14.8807 8.11929 16 9.5 16C10.8807 16 12 14.8807 12 13.5V7C12 4.79086 10.2091 3 8 3Z" />
            </svg>
            <span>{task.attachmentsCount}</span>
          </div>
        )}
      </div>

      {/* Tag Badge */}
      {task.tag && (
        <div className="mt-3">
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getTagBadgeStyle(task.tag)}`}>
            {task.tag}
          </span>
        </div>
      )}
    </div>
  );
};
