"use client";
import React, { useState } from "react";
import Image from "next/image";
import Badge from "../ui/badge/Badge";
import { ToastContainer, ToastMessage } from "../ui/toast/Toast";

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
  const [data, setData] = useState<EmployeeData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof EmployeeData>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  React.useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:3002/api/employees");
        const result = await res.json();
        if (result.success && result.data) {
          const formatted = result.data.map((emp: any) => ({
            id: emp.id,
            emp_id: emp.nip || `EMP-${emp.id}`,
            name: `${emp.firstName} ${emp.lastName}`.trim(),
            position: emp.positionTitle,
            department: emp.departmentName,
            status: emp.isDeleted ? "Terminated" : "Active", // simplistic mapping for demo
            avatar: emp.avatarUrl || "/images/user/user-01.jpg",
            email: emp.email,
            joinDate: new Date(emp.joinDate).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }),
          }));
          setData(formatted);
        }
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  // Toast State
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: "success" | "error" | "warning" | "info", title: string, message: string) => {
    const newToast: ToastMessage = { id: String(Date.now()), type, title, message };
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Modal State
  const [detailEmp, setDetailEmp] = useState<EmployeeData | null>(null);
  const [editEmp, setEditEmp] = useState<EmployeeData | null>(null);

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editEmp) return;

    if (!editEmp.name.trim() || !editEmp.email.trim()) {
      addToast("error", "Validasi Gagal", "Guard Clause: Nama dan Email wajib diisi.");
      return;
    }

    setData((prev) => prev.map((item) => item.id === editEmp.id ? editEmp : item));
    const empName = editEmp.name;
    setEditEmp(null);

    addToast(
      "success",
      "Data Karyawan Diperbarui!",
      `Informasi profil ${empName} berhasil disimpan.`
    );
  };

  // Filtering
  const filteredEmployees = data.filter(
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
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] relative">
      <ToastContainer toasts={toasts} onClose={removeToast} />

      <div className="p-5 lg:p-6">
        {/* Controls Bar */}
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
              placeholder="Cari nama, NIK, jabatan..."
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
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4ZM2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 9.29583 13.5873 10.495 12.8856 11.4714L17.7071 16.2929C18.0976 16.6834 18.0976 17.3166 17.7071 17.7071C17.3166 18.0976 16.6834 18.0976 16.2929 17.7071L11.4714 12.8856C10.495 13.5873 9.29583 14 8 14C4.68629 14 2 11.3137 2 8Z"
              />
            </svg>
          </div>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="flex sm:hidden items-center gap-1.5 text-xs text-brand-600 dark:text-brand-400 font-medium mb-2.5 px-0.5">
          <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
          <span>Geser tabel ke samping untuk melihat data lengkap</span>
        </div>

        {/* Table */}
        <div className="w-full max-w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
          <div className="overflow-x-auto custom-scrollbar w-full">
            <table className="w-full min-w-[850px] text-left text-sm text-gray-600 dark:text-gray-300">
            <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:bg-gray-800/50 dark:text-gray-400">
              <tr>
                <th
                  onClick={() => handleSort("emp_id")}
                  className="px-6 py-4 cursor-pointer hover:text-brand-500"
                >
                  ID Karyawan{" "}
                  {sortField === "emp_id" ? (sortOrder === "asc" ? "↑" : "↓") : "↕"}
                </th>
                <th
                  onClick={() => handleSort("name")}
                  className="px-6 py-4 cursor-pointer hover:text-brand-500"
                >
                  Nama Karyawan{" "}
                  {sortField === "name" ? (sortOrder === "asc" ? "↑" : "↓") : "↕"}
                </th>
                <th
                  onClick={() => handleSort("position")}
                  className="px-6 py-4 cursor-pointer hover:text-brand-500"
                >
                  Jabatan & Dept{" "}
                  {sortField === "position"
                    ? sortOrder === "asc"
                      ? "↑"
                      : "↓"
                    : "↕"}
                </th>
                <th
                  onClick={() => handleSort("joinDate")}
                  className="px-6 py-4 cursor-pointer hover:text-brand-500"
                >
                  Tanggal Bergabung{" "}
                  {sortField === "joinDate"
                    ? sortOrder === "asc"
                      ? "↑"
                      : "↓"
                    : "↕"}
                </th>
                <th
                  onClick={() => handleSort("status")}
                  className="px-6 py-4 cursor-pointer hover:text-brand-500"
                >
                  Status{" "}
                  {sortField === "status"
                    ? sortOrder === "asc"
                      ? "↑"
                      : "↓"
                    : "↕"}
                </th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-sm text-gray-500">
                    <div className="flex justify-center items-center gap-2">
                      <div className="w-5 h-5 rounded-full border-2 border-brand-500 border-t-transparent animate-spin"></div>
                      Memuat data dari server...
                    </div>
                  </td>
                </tr>
              ) : displayedEmployees.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-sm text-gray-500">
                    Tidak ada data yang ditemukan.
                  </td>
                </tr>
              ) : (
                displayedEmployees.map((emp) => (
                  <tr
                    key={emp.id}
                  className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
                >
                  <td className="px-6 py-4 font-mono text-xs text-gray-500">
                    {emp.emp_id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-9 h-9 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0 border border-gray-200 dark:border-gray-700">
                        <Image
                          src={emp.avatar}
                          alt={emp.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="font-medium text-gray-800 dark:text-white block">
                          {emp.name}
                        </span>
                        <span className="text-xs text-gray-400 font-mono">
                          {emp.email}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-800 dark:text-white block">
                      {emp.position}
                    </span>
                    <span className="text-xs text-gray-400">
                      {emp.department}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-xs">
                    {emp.joinDate}
                  </td>
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
                        onClick={() => setDetailEmp(emp)}
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
                        onClick={() => setEditEmp(emp)}
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
              )}
            </tbody>
          </table>
        </div>
      </div>

        {/* Footer Pagination */}
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
              className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition"
            >
              Sebelumnya
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`inline-flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium transition ${
                  currentPage === pageNum
                    ? "bg-brand-500 text-white"
                    : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition"
            >
              Selanjutnya
            </button>
          </div>
        </div>
      </div>

      {/* MODAL DETAIL KARYAWAN 360 */}
      {detailEmp && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-gray-900/75 backdrop-blur-md">
          <div className="w-full max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-2xl relative">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              Profil 360° — {detailEmp.name}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-5">
              Informasi detail karyawan ({detailEmp.emp_id}) (PRD §3.1 & §7.1).
            </p>

            <div className="space-y-3 text-xs text-gray-600 dark:text-gray-300 mb-6">
              <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl space-y-1.5">
                <p><strong>Jabatan:</strong> {detailEmp.position}</p>
                <p><strong>Departemen:</strong> {detailEmp.department}</p>
                <p><strong>Email Pekerjaan:</strong> {detailEmp.email}</p>
                <p><strong>Tanggal Masuk:</strong> {detailEmp.joinDate}</p>
                <p><strong>Status:</strong> {detailEmp.status}</p>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-gray-100 dark:border-gray-800">
              <button
                type="button"
                onClick={() => setDetailEmp(null)}
                className="px-4 py-2 text-xs font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition dark:bg-gray-800 dark:text-gray-300"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL EDIT KARYAWAN */}
      {editEmp && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-gray-900/75 backdrop-blur-md">
          <div className="w-full max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-2xl relative">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              Edit Data Karyawan — {editEmp.emp_id}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-5">
              Ubah informasi profil dan posisi jabatan karyawan.
            </p>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  value={editEmp.name}
                  onChange={(e) => setEditEmp({ ...editEmp, name: e.target.value })}
                  className="w-full h-10 px-3 text-xs bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Jabatan</label>
                <input
                  type="text"
                  value={editEmp.position}
                  onChange={(e) => setEditEmp({ ...editEmp, position: e.target.value })}
                  className="w-full h-10 px-3 text-xs bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Email Pekerjaan</label>
                <input
                  type="email"
                  value={editEmp.email}
                  onChange={(e) => setEditEmp({ ...editEmp, email: e.target.value })}
                  className="w-full h-10 px-3 text-xs bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                <button
                  type="button"
                  onClick={() => setEditEmp(null)}
                  className="px-4 py-2 text-xs font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition dark:bg-gray-800 dark:text-gray-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-brand-500 rounded-xl hover:bg-brand-600 transition"
                >
                  Perbarui Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
