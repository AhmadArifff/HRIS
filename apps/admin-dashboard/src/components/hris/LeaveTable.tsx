"use client";
import React, { useState } from "react";
import Badge from "../ui/badge/Badge";
import Button from "../ui/button/Button";

export interface LeaveRecord {
  id: string;
  name: string;
  department: string;
  type: string;
  duration: string;
  date: string;
  status: "Approved" | "Pending" | "Rejected";
}

const mockLeaveData: LeaveRecord[] = [
  { id: "LV-20260801", name: "Andi Saputra", department: "Marketing", type: "Cuti Tahunan", duration: "2 Hari", date: "10 Ags 2026 - 11 Ags 2026", status: "Pending" },
  { id: "LV-20260802", name: "Rina Gunawan", department: "Finance", type: "Cuti Sakit", duration: "1 Hari", date: "08 Ags 2026", status: "Approved" },
  { id: "LV-20260803", name: "Budi Santoso", department: "IT", type: "Cuti Melahirkan (Istri)", duration: "3 Hari", date: "15 Ags 2026 - 17 Ags 2026", status: "Pending" },
  { id: "LV-20260804", name: "Siti Aminah", department: "Human Resources", type: "Cuti Tahunan", duration: "5 Hari", date: "01 Sep 2026 - 05 Sep 2026", status: "Approved" },
  { id: "LV-20260805", name: "Dedi Setiawan", department: "IT", type: "Cuti Penting", duration: "1 Hari", date: "20 Ags 2026", status: "Rejected" },
];

export const LeaveTable: React.FC = () => {
  const [data, setData] = useState<LeaveRecord[]>(mockLeaveData);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof LeaveRecord>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // PRD §7.5: Approval Cuti - Setuju
  const handleApprove = (id: string, name: string) => {
    setData((prev) => prev.map((item) => item.id === id ? { ...item, status: "Approved" } : item));
    alert(`✅ Cuti untuk ${name} telah DISETUJUI.`);
    console.log("[AUDIT_LOG] LEAVE_APPROVED", { leave_id: id, approver: "Admin", timestamp: new Date().toISOString() });
  };

  // PRD §7.5: Approval Cuti - Tolak
  const handleReject = (id: string, name: string) => {
    const reason = prompt(`Masukkan alasan penolakan cuti untuk ${name}:`);
    if (reason === null) return; // Batal
    
    setData((prev) => prev.map((item) => item.id === id ? { ...item, status: "Rejected" } : item));
    alert(`❌ Cuti untuk ${name} telah DITOLAK.\nAlasan: ${reason || "Tidak ada alasan"}`);
    console.log("[AUDIT_LOG] LEAVE_REJECTED", { leave_id: id, reason, approver: "Admin", timestamp: new Date().toISOString() });
  };

  const filteredRecords = data.filter(
    (rec) =>
      rec.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedRecords = [...filteredRecords].sort((a, b) => {
    const valA = String(a[sortField]).toLowerCase();
    const valB = String(b[sortField]).toLowerCase();
    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (field: keyof LeaveRecord) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const totalPages = Math.ceil(sortedRecords.length / entriesPerPage) || 1;
  const startIndex = (currentPage - 1) * entriesPerPage;
  const displayedRecords = sortedRecords.slice(
    startIndex,
    startIndex + entriesPerPage
  );

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 p-5 lg:p-6 dark:border-gray-800">
        <div>
          <h3 className="text-base font-semibold text-gray-800 dark:text-white">
            Daftar Persetujuan Cuti Karyawan
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Kelola & tinjau seluruh permintan cuti dari karyawan
          </p>
        </div>
      </div>

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
              placeholder="Cari pemohon, jenis cuti..."
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

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
            <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:bg-gray-800/50 dark:text-gray-400">
              <tr>
                <th onClick={() => handleSort("id")} className="px-6 py-4 cursor-pointer hover:text-brand-500">
                  ID {sortField === "id" ? (sortOrder === "asc" ? "↑" : "↓") : "↕"}
                </th>
                <th onClick={() => handleSort("name")} className="px-6 py-4 cursor-pointer hover:text-brand-500">
                  Pemohon {sortField === "name" ? (sortOrder === "asc" ? "↑" : "↓") : "↕"}
                </th>
                <th onClick={() => handleSort("type")} className="px-6 py-4 cursor-pointer hover:text-brand-500">
                  Jenis Cuti {sortField === "type" ? (sortOrder === "asc" ? "↑" : "↓") : "↕"}
                </th>
                <th onClick={() => handleSort("date")} className="px-6 py-4 cursor-pointer hover:text-brand-500">
                  Tanggal {sortField === "date" ? (sortOrder === "asc" ? "↑" : "↓") : "↕"}
                </th>
                <th onClick={() => handleSort("status")} className="px-6 py-4 cursor-pointer hover:text-brand-500">
                  Status {sortField === "status" ? (sortOrder === "asc" ? "↑" : "↓") : "↕"}
                </th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {displayedRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50">
                  <td className="px-6 py-4 font-mono text-xs text-gray-500">{record.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-800 dark:text-white">
                    <div>
                      <span>{record.name}</span>
                      <span className="block text-xs font-normal text-gray-400">{record.department}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span>{record.type}</span>
                    <span className="block text-xs text-gray-400">Durasi: {record.duration}</span>
                  </td>
                  <td className="px-6 py-4">{record.date}</td>
                  <td className="px-6 py-4">
                    <Badge
                      color={
                        record.status === "Approved"
                          ? "success"
                          : record.status === "Pending"
                          ? "warning"
                          : "error"
                      }
                    >
                      {record.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {record.status === "Pending" ? (
                        <>
                          <Button 
                            size="sm" 
                            onClick={() => handleApprove(record.id, record.name)}
                            className="bg-success-500 text-white hover:bg-success-600 border-none text-xs px-3 py-1"
                          >
                            Setujui
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleReject(record.id, record.name)}
                            className="border-error-500 text-error-500 hover:bg-error-50 text-xs px-3 py-1 dark:hover:bg-error-500/10"
                          >
                            Tolak
                          </Button>
                        </>
                      ) : (
                        <span className="text-xs text-gray-400">Telah Diproses</span>
                      )}
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
            Menampilkan {sortedRecords.length === 0 ? 0 : startIndex + 1} sampai{" "}
            {Math.min(startIndex + entriesPerPage, sortedRecords.length)} dari{" "}
            {sortedRecords.length} entri
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
    </div>
  );
};
