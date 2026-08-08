"use client";
import React, { useState } from "react";
import Image from "next/image";
import { DataTableUser } from "./DataTableOne";

const mockUsers: DataTableUser[] = [
  { id: "1", name: "Abram Schleifer", avatar: "/images/user/owner.png", position: "Sales Assistant", office: "Edinburgh", age: 57, startDate: "25 Apr, 2027", salary: "$89,500" },
  { id: "2", name: "Charlotte Anderson", avatar: "/images/user/owner.png", position: "Marketing Manager", office: "London", age: 42, startDate: "12 Mar, 2025", salary: "$105,000" },
  { id: "3", name: "Ethan Brown", avatar: "/images/user/owner.png", position: "Software Engineer", office: "San Francisco", age: 30, startDate: "01 Jan, 2024", salary: "$120,000" },
  { id: "4", name: "Isabella Davis", avatar: "/images/user/owner.png", position: "UI/UX Designer", office: "Austin", age: 29, startDate: "18 Jul, 2025", salary: "$92,000" },
  { id: "5", name: "James Wilson", avatar: "/images/user/owner.png", position: "Data Analyst", office: "Chicago", age: 28, startDate: "20 Sep, 2025", salary: "$80,000" },
  { id: "6", name: "Liam Moore", avatar: "/images/user/owner.png", position: "DevOps Engineer", office: "Boston", age: 33, startDate: "30 Oct, 2024", salary: "$115,000" },
  { id: "7", name: "Mia Garcia", avatar: "/images/user/owner.png", position: "Content Strategist", office: "Denver", age: 27, startDate: "12 Dec, 2027", salary: "$70,000" },
  { id: "8", name: "Olivia Johnson", avatar: "/images/user/owner.png", position: "HR Specialist", office: "Los Angeles", age: 40, startDate: "08 Nov, 2026", salary: "$75,000" },
  { id: "9", name: "Sophia Martinez", avatar: "/images/user/owner.png", position: "Product Manager", office: "New York", age: 35, startDate: "15 Jun, 2026", salary: "$95,000" },
  { id: "10", name: "William Smith", avatar: "/images/user/owner.png", position: "Financial Analyst", office: "Seattle", age: 38, startDate: "03 Feb, 2026", salary: "$88,000" },
];

export const DataTableTwo: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.office.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / entriesPerPage) || 1;
  const startIndex = (currentPage - 1) * entriesPerPage;
  const displayedUsers = filteredUsers.slice(startIndex, startIndex + entriesPerPage);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="border-b border-gray-100 p-5 lg:p-6 dark:border-gray-800">
        <h3 className="text-base font-semibold text-gray-800 dark:text-white">
          Data Table 2
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
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
            <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:bg-gray-800/50 dark:text-gray-400">
              <tr>
                <th className="px-6 py-4">User ↕</th>
                <th className="px-6 py-4">Position ↕</th>
                <th className="px-6 py-4">Office ↕</th>
                <th className="px-6 py-4">Age ↕</th>
                <th className="px-6 py-4">Start Date ↕</th>
                <th className="px-6 py-4">Salary ↕</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {displayedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50">
                  <td className="px-6 py-4 font-medium text-gray-800 dark:text-white">
                    <div className="flex items-center gap-3">
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
                  <td className="px-6 py-4">{user.office}</td>
                  <td className="px-6 py-4">{user.age}</td>
                  <td className="px-6 py-4">{user.startDate}</td>
                  <td className="px-6 py-4 font-medium text-gray-800 dark:text-white">
                    {user.salary}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {/* Copy / Duplicate Icon */}
                      <button
                        type="button"
                        onClick={() => alert(`Copied details for ${user.name}`)}
                        className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                        title="Duplicate"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M4 3C3.44772 3 3 3.44772 3 4V14C3 14.5523 3.44772 15 4 15H5V16C5 17.1046 5.89543 18 7 18H16C17.1046 18 18 17.1046 18 16V7C18 5.89543 17.1046 5 16 5H15V4C15 2.89543 14.1046 2 13 2H5C4.44772 2 4 2.44772 4 3ZM13 5H7C6.44772 5 6 5.44772 6 6V14C6 14.5523 6.44772 15 7 15H13C13.5523 15 14 14.5523 14 14V6C14 5.44772 13.5523 5 13 5ZM16 7H15V14C15 15.1046 14.1046 16 13 16H7V16H16V7Z" />
                        </svg>
                      </button>

                      {/* Edit Icon */}
                      <button
                        type="button"
                        onClick={() => alert(`Editing ${user.name}`)}
                        className="text-gray-400 hover:text-brand-500 dark:hover:text-brand-400"
                        title="Edit"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36684 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579ZM11.3787 5.79289L4 13.1716V16H6.82843L14.2071 8.62132L11.3787 5.79289Z" />
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
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
            >
              Previous
            </button>

            <button className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 font-medium text-white">
              {currentPage}
            </button>

            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
            >
              Next
            </button>
          </div>

          <div>
            Showing {filteredUsers.length === 0 ? 0 : startIndex + 1} to{" "}
            {Math.min(startIndex + entriesPerPage, filteredUsers.length)} of{" "}
            {filteredUsers.length} entries
          </div>
        </div>
      </div>
    </div>
  );
};
