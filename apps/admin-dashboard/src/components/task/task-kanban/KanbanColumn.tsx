"use client";
import React from "react";
import { KanbanCard, KanbanTaskData } from "./KanbanCard";

interface KanbanColumnProps {
  title: string;
  count: number;
  tasks: KanbanTaskData[];
  badgeColor?: string;
  onMoveTask?: (taskId: string, newColumn: string) => void;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  title,
  count,
  tasks,
  badgeColor = "text-brand-500 bg-brand-50 dark:bg-brand-500/15 dark:text-brand-400",
  onMoveTask,
}) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    if (taskId && onMoveTask) {
      onMoveTask(taskId, title);
    }
  };

  return (
    <div 
      className="flex flex-col rounded-2xl border border-gray-200 bg-gray-50/50 p-4 dark:border-gray-800 dark:bg-white/[0.02] flex-1 min-w-[280px]"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {/* Column Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold text-gray-800 dark:text-white">
            {title}
          </h3>
          <span className={`inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-semibold ${badgeColor}`}>
            {count}
          </span>
        </div>

        <button
          type="button"
          onClick={() => alert(`Column options for ${title}`)}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M6 10C6 10.8284 5.32843 11.5 4.5 11.5C3.67157 11.5 3 10.8284 3 10C3 9.17157 3.67157 8.5 4.5 8.5C5.32843 8.5 6 9.17157 6 10ZM11.5 10C11.5 10.8284 10.8284 11.5 10 11.5C9.17157 11.5 8.5 10.8284 8.5 10C8.5 9.17157 9.17157 8.5 10 8.5C10.8284 8.5 11.5 9.17157 11.5 10ZM15.5 11.5C16.3284 11.5 17 10.8284 17 10C17 9.17157 16.3284 8.5 15.5 8.5C14.6716 8.5 14 9.17157 14 10C14 10.8284 14.6716 11.5 15.5 11.5Z" />
          </svg>
        </button>
      </div>

      {/* Cards List */}
      <div className="flex flex-col gap-3 min-h-[150px]">
        {tasks.map((task) => (
          <KanbanCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};
