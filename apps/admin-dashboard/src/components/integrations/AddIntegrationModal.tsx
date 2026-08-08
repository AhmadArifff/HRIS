"use client";
import React, { useState } from "react";

interface AddIntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddIntegration: (name: string, description: string, category: string) => void;
}

export const AddIntegrationModal: React.FC<AddIntegrationModalProps> = ({
  isOpen,
  onClose,
  onAddIntegration,
}) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Communications");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAddIntegration(
      name.trim(),
      description.trim() || `Integrate ${name.trim()} to streamline your workspace productivity.`,
      category
    );
    setName("");
    setDescription("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-99999 flex items-center justify-center bg-gray-900/50 backdrop-blur-xs p-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Add New Integration
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Integration Service Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Slack, GitHub, Figma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-xs text-gray-800 outline-none focus:border-brand-500 focus:bg-white dark:border-gray-800 dark:bg-gray-900/60 dark:text-white dark:focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-xs text-gray-800 outline-none focus:border-brand-500 focus:bg-white dark:border-gray-800 dark:bg-gray-900/60 dark:text-white dark:focus:border-brand-500"
            >
              <option value="Communications">Communications & Video</option>
              <option value="Marketing">Email & Marketing</option>
              <option value="Project Management">Project Management & Productivity</option>
              <option value="Developer Tools">Developer & Issue Tracking</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              rows={3}
              placeholder="Briefly describe what this integration will be used for..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-xs text-gray-800 outline-none focus:border-brand-500 focus:bg-white dark:border-gray-800 dark:bg-gray-900/60 dark:text-white dark:focus:border-brand-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-brand-500 px-5 py-2.5 text-xs font-medium text-white hover:bg-brand-600 transition"
            >
              Connect Integration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
