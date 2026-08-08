"use client";
import React, { useState } from "react";
import Image from "next/image";
import Badge from "../ui/badge/Badge";

export interface EmployeeData {
  id: number;
  emp_id: string;
  name: string;
  position: string;
  department: string;
  status: "Active" | "On Leave" | "Terminated";
  avatar: string;
  email: string;
  joinDate: string;
}

const mockEmployeeData: EmployeeData[] = [
  { id: 1, emp_id: "EMP-001", name: "Budi Santoso", position: "Software Engineer", department: "IT", status: "Active", avatar: "/images/user/user-01.jpg", email: "budi.santoso@company.com", joinDate: "15 Jan 2023" },
  { id: 2, emp_id: "EMP-002", name: "Siti Aminah", position: "HR Manager", department: "Human Resources", status: "Active", avatar: "/images/user/user-02.jpg", email: "siti.aminah@company.com", joinDate: "01 Mar 2022" },
  { id: 3, emp_id: "EMP-003", name: "Agus Pratama", position: "Marketing Specialist", department: "Marketing", status: "On Leave", avatar: "/images/user/user-03.jpg", email: "agus.pratama@company.com", joinDate: "10 Jun 2023" },
  { id: 4, emp_id: "EMP-004", name: "Rina Kusuma", position: "Financial Analyst", department: "Finance", status: "Active", avatar: "/images/user/user-04.jpg", email: "rina.kusuma@company.com", joinDate: "05 Nov 2021" },
  { id: 5, emp_id: "EMP-005", name: "Dedi Setiawan", position: "IT Support", department: "IT", status: "Terminated", avatar: "/images/user/user-05.jpg", email: "dedi.setiawan@company.com", joinDate: "12 Feb 2024" },
  { id: 6, emp_id: "EMP-006", name: "Anita Larasati", position: "Product Designer", department: "Design", status: "Active", avatar: "/images/user/user-01.jpg", email: "anita.larasati@company.com", joinDate: "20 Jul 2022" },
  { id: 7, emp_id: "EMP-007", name: "Fajar Nugraha", position: "Backend Developer", department: "IT", status: "Active", avatar: "/images/user/user-02.jpg", email: "fajar.nugraha@company.com", joinDate: "18 Sep 2023" },
  { id: 8, emp_id: "EMP-008", name: "Dewi Lestari", position: "Recruiter", department: "Human Resources", status: "Active", avatar: "/images/user/user-03.jpg", email: "dewi.lestari@company.com", joinDate: "02 Feb 2023" },
  { id: 9, emp_id: "EMP-009", name: "Eko Prasetyo", position: "Accountant", department: "Finance", status: "On Leave", avatar: "/images/user/user-04.jpg", email: "eko.prasetyo@company.com", joinDate: "14 Apr 2022" },
  { id: 10, emp_id: "EMP-010", name: "Maya Indah", position: "Copywriter", department: "Marketing", status: "Active", avatar: "/images/user/user-05.jpg", email: "maya.indah@company.com", joinDate: "11 Aug 2023" },
  { id: 11, emp_id: "EMP-011", name: "Hendra Wijaya", position: "DevOps Lead", department: "IT", status: "Active", avatar: "/images/user/user-01.jpg", email: "hendra.wijaya@company.com", joinDate: "01 Dec 2020" },
  { id: 12, emp_id: "EMP-012", name: "Nadia Putri", position: "QA Engineer", department: "IT", status: "Active", avatar: "/images/user/user-02.jpg", email: "nadia.putri@company.com", joinDate: "05 May 2024" },
];

export const EmployeeTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof EmployeeData>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Filtering
  const filteredEmployees = mockEmployeeData.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.emp_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sorting
  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    const valA = String(a[sortField]).toLowerCase();
    const valB = String(b[sortField]).toLowerCase();
    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (field: keyof EmployeeData) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Pagination
  const totalPages = Math.ceil(sortedEmployees.length / entriesPerPage) || 1;
  const startIndex = (currentPage - 1) * entriesPerPage;
  const displayedEmployees = sortedEmployees.slice(
    startIndex,
    startIndex + entriesPerPage
  );

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      {/* Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 p-5 lg:p-6 dark:border-gray-800">
        <div>
          <h3 className="text-base font-semibold text-gray-800 dark:text-white">
            Data Karyawan
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Daftar seluruh karyawan aktif & non-aktif perusahaan
          </p>
        </div>
        <a
          href="/employee/add"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-4 py-2 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600 transition"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Tambah Karyawan
        </a>
      </div>

      <div className="p-5 lg:p-6">
        {/* Controls Bar (Design Data Table 2) */}
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span>Tampilkan</span>
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
            <span>entri</span>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Cari nama, ID, jabatan..."
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
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4ZM2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 9.29583 13.5873 10.495 12.8856 11.4714L17.7071 16.2929C18.0976 16.6834 18.0976 17.3166 17.7071 17.7071C17.3166 18.0976 16.6834 18.0976 16.2929 17.7071L11.4714 12.8856C10.495 13.5873 9.29583 14 8 14C4.68629 14 2 11.3137 2 8Z"
              />
            </svg>
          </div>
        </div>

        {/* Table (Design Data Table 2) */}
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
            <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:bg-gray-800/50 dark:text-gray-400">
              <tr>
                <th
                  onClick={() => handleSort("name")}
                  className="px-6 py-4 cursor-pointer hover:text-brand-500 transition"
                >
                  Karyawan {sortField === "name" ? (sortOrder === "asc" ? "↑" : "↓") : "↕"}
                </th>
                <th
                  onClick={() => handleSort("emp_id")}
                  className="px-6 py-4 cursor-pointer hover:text-brand-500 transition"
                >
                  ID Karyawan {sortField === "emp_id" ? (sortOrder === "asc" ? "↑" : "↓") : "↕"}
                </th>
                <th
                  onClick={() => handleSort("position")}
                  className="px-6 py-4 cursor-pointer hover:text-brand-500 transition"
                >
                  Jabatan {sortField === "position" ? (sortOrder === "asc" ? "↑" : "↓") : "↕"}
                </th>
                <th
                  onClick={() => handleSort("department")}
                  className="px-6 py-4 cursor-pointer hover:text-brand-500 transition"
                >
                  Departemen {sortField === "department" ? (sortOrder === "asc" ? "↑" : "↓") : "↕"}
                </th>
                <th
                  onClick={() => handleSort("status")}
                  className="px-6 py-4 cursor-pointer hover:text-brand-500 transition"
                >
                  Status {sortField === "status" ? (sortOrder === "asc" ? "↑" : "↓") : "↕"}
                </th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {displayedEmployees.map((emp) => (
                <tr
                  key={emp.id}
                  className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-gray-800 dark:text-white">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 relative overflow-hidden rounded-full border border-gray-200 dark:border-gray-700">
                        <Image
                          src={emp.avatar}
                          alt={emp.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="block font-medium text-gray-900 dark:text-white">
                          {emp.name}
                        </span>
                        <span className="text-xs text-gray-400">{emp.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs">{emp.emp_id}</td>
                  <td className="px-6 py-4">{emp.position}</td>
                  <td className="px-6 py-4">{emp.department}</td>
                  <td className="px-6 py-4">
                    <Badge
                      color={
                        emp.status === "Active"
                          ? "success"
                          : emp.status === "On Leave"
                          ? "warning"
                          : "error"
                      }
                    >
                      {emp.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => alert(`Detail ${emp.name}`)}
                        className="text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                        title="Lihat Detail"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => alert(`Edit ${emp.name}`)}
                        className="text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                        title="Edit Data"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {displayedEmployees.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                    Tidak ada data karyawan yang ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination (Design Data Table 2) */}
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-sm text-gray-500 dark:text-gray-400">
          <div>
            Menampilkan {sortedEmployees.length === 0 ? 0 : startIndex + 1} sampai{" "}
            {Math.min(startIndex + entriesPerPage, sortedEmployees.length)} dari{" "}
            {sortedEmployees.length} entri
          </div>

          <div className="flex items-center gap-1.5">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 disabled:opacity-40 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition"
            >
              Sebelumnya
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`inline-flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium transition ${
                  currentPage === pageNum
                    ? "bg-brand-500 text-white shadow-theme-xs"
                    : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 disabled:opacity-40 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition"
            >
              Selanjutnya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
