"use client";
import React, { useState } from "react";
import Image from "next/image";
import { DataTableUser } from "./DataTableOne";

const mockUsers: DataTableUser[] = [
  { id: "1", name: "Abram Schleifer", avatar: "/images/user/owner.png", position: "Sales Assistant", office: "Edinburgh", age: 57, startDate: "25 Apr, 2027", salary: "$89,500", status: "Active" },
  { id: "2", name: "Charlotte Anderson", avatar: "/images/user/owner.png", position: "Marketing Manager", office: "London", age: 42, startDate: "12 Mar, 2025", salary: "$105,000", status: "Active" },
  { id: "3", name: "Ethan Brown", avatar: "/images/user/owner.png", position: "Software Engineer", office: "San Francisco", age: 30, startDate: "01 Jan, 2024", salary: "$120,000", status: "Pending" },
  { id: "4", name: "Isabella Davis", avatar: "/images/user/owner.png", position: "UI/UX Designer", office: "Austin", age: 29, startDate: "18 Jul, 2025", salary: "$92,000", status: "Active" },
  { id: "5", name: "James Wilson", avatar: "/images/user/owner.png", position: "Data Analyst", office: "Chicago", age: 28, startDate: "20 Sep, 2025", salary: "$80,000", status: "Inactive" },
];

export const DataTableThree: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.office.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / entriesPerPage) || 1;
  const startIndex = (currentPage - 1) * entriesPerPage;
  const displayedUsers = filteredUsers.slice(startIndex, startIndex + entriesPerPage);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(displayedUsers.map((u) => u.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDownloadCSV = () => {
    const headers = ["Name,Position,Office,Age,StartDate,Salary,Status"];
    const rows = filteredUsers.map(
      (u) => `"${u.name}","${u.position}","${u.office}",${u.age},"${u.startDate}","${u.salary}","${u.status}"`
    );
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data_table_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "Active":
        return "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500";
      case "Pending":
        return "bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-warning-500";
      case "Inactive":
      default:
        return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="border-b border-gray-100 p-5 lg:p-6 dark:border-gray-800">
        <h3 className="text-base font-semibold text-gray-800 dark:text-white">
          Data Table 3
        </h3>
      </div>

      <div className="p-5 lg:p-6">
        {/* Controls Bar */}
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span>Show</span>
            <select
              value={entriesPerPage}
              onChange={(e) => {
                setEntriesPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-theme-xs focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
            <span>entries</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full rounded-xl border border-gray-300 bg-white py-2 pl-9 pr-4 text-sm text-gray-800 shadow-theme-xs focus:border-brand-500 focus:outline-none sm:w-64 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 fill-current text-gray-400"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fillRule="evenodd" clipRule="evenodd" d="M8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4ZM2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 9.29583 13.5873 10.495 12.8856 11.4714L17.7071 16.2929C18.0976 16.6834 18.0976 17.3166 17.7071 17.7071C17.3166 18.0976 16.6834 18.0976 16.2929 17.7071L11.4714 12.8856C10.495 13.5873 9.29583 14 8 14C4.68629 14 2 11.3137 2 8Z" />
              </svg>
            </div>

            <button
              type="button"
              onClick={handleDownloadCSV}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-white/[0.03]"
            >
              Download
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M3 14C3 13.4477 3.44772 13 4 13H16C16.5523 13 17 13.4477 17 14C17 14.5523 16.5523 15 16 15H4C3.44772 15 3 14.5523 3 14ZM10 3C10.5523 3 11 3.44772 11 4V9.58579L12.2929 8.29289C12.6834 7.90237 13.3166 7.90237 13.7071 8.29289C14.0976 8.68342 14.0976 9.31658 13.7071 9.70711L10.7071 12.7071C10.3166 13.0976 9.68342 13.0976 9.29289 12.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L9 9.58579V4C9 3.44772 9.44772 3 10 3Z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
            <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:bg-gray-800/50 dark:text-gray-400">
              <tr>
                <th className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={
                        displayedUsers.length > 0 &&
                        displayedUsers.every((u) => selectedIds.includes(u.id))
                      }
                      className="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800"
                    />
                    <span>User ↕</span>
                  </div>
                </th>
                <th className="px-6 py-4">Position ↕</th>
                <th className="px-6 py-4">Salary ↕</th>
                <th className="px-6 py-4">Office ↕</th>
                <th className="px-6 py-4">Status ↕</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {displayedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50">
                  <td className="px-6 py-4 font-medium text-gray-800 dark:text-white">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(user.id)}
                        onChange={() => handleSelectOne(user.id)}
                        className="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800"
                      />
                      <div className="h-8 w-8 relative overflow-hidden rounded-full border border-gray-200 dark:border-gray-700">
                        <Image
                          src={user.avatar}
                          alt={user.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span>{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{user.position}</td>
                  <td className="px-6 py-4 font-medium text-gray-800 dark:text-white">
                    {user.salary}
                  </td>
                  <td className="px-6 py-4">{user.office}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusBadge(user.status)}`}>
                      {user.status || "Active"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => alert(`Edit user ${user.name}`)}
                        className="text-gray-400 hover:text-brand-500 dark:hover:text-brand-400"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36684 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579ZM11.3787 5.79289L4 13.1716V16H6.82843L14.2071 8.62132L11.3787 5.79289Z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => alert(`Delete user ${user.name}`)}
                        className="text-gray-400 hover:text-error-500 dark:hover:text-error-400"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M9 2C8.44772 2 8 2.44772 8 3V4H4C3.44772 4 3 4.44772 3 5C3 5.55228 3.44772 6 4 6H5V16C5 17.1046 5.89543 18 7 18H13C14.1046 18 15 17.1046 15 16V6H16C16.5523 6 17 5.55228 17 5C17 4.44772 16.5523 4 16 4H12V3C12 2.44772 11.5523 2 11 2H9ZM7 8C7.55228 8 8 8.44772 8 9V14C8 14.5523 7.55228 15 7 15C6.44772 15 6 14.5523 6 14V9C6 8.44772 6.44772 8 7 8ZM13 9C13 8.44772 12.5523 8 12 8C11.4477 8 11 8.44772 11 9V14C11 14.5523 11.4477 15 12 15C12.5523 15 13 14.5523 13 14V9Z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination */}
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-sm text-gray-500 dark:text-gray-400">
          <div>
            Showing {filteredUsers.length === 0 ? 0 : startIndex + 1} to{" "}
            {Math.min(startIndex + entriesPerPage, filteredUsers.length)} of{" "}
            {filteredUsers.length} entries
          </div>

          <div className="flex items-center gap-1">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
            >
              &larr;
            </button>

            <button className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 font-medium text-white">
              {currentPage}
            </button>

            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
            >
              &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
