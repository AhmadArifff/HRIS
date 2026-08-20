"use client";
import React, { useState } from "react";
import Badge from "../ui/badge/Badge";
import Button from "../ui/button/Button";
import { ToastContainer, ToastMessage } from "../ui/toast/Toast";

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

  // Toast State
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: "success" | "error" | "warning" | "info", title: string, message: string) => {
    const newToast: ToastMessage = { id: String(Date.now()), type, title, message };
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Reject Modal State (Membuka Form Modal Interaktif alih-alih prompt browser)
  const [rejectingRecord, setRejectingRecord] = useState<LeaveRecord | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  // PRD §7.3: Approval Cuti - Setuju
  const handleApprove = (id: string, name: string) => {
    setData((prev) => prev.map((item) => item.id === id ? { ...item, status: "Approved" } : item));
    console.log("[AUDIT_LOG] LEAVE_APPROVED", { leave_id: id, approver: "Admin", timestamp: new Date().toISOString() });
    
    addToast(
      "success",
      "Pengajuan Cuti Disetujui!",
      `Pengajuan cuti untuk ${name} telah berhasil disetujui.`
    );
  };

  // PRD §7.3: Approval Cuti - Open Modal Form Tolak Cuti
  const openRejectModal = (record: LeaveRecord) => {
    setRejectingRecord(record);
    setRejectReason("");
  };

  const handleConfirmReject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectingRecord) return;

    if (!rejectReason.trim()) {
      addToast("error", "Validasi Gagal", "Guard Clause: Wajib mengisi alasan penolakan cuti.");
      return;
    }

    const recId = rejectingRecord.id;
    const empName = rejectingRecord.name;
    const reasonText = rejectReason;

    setData((prev) => prev.map((item) => item.id === recId ? { ...item, status: "Rejected" } : item));
    console.log("[AUDIT_LOG] LEAVE_REJECTED", { leave_id: recId, reason: reasonText, approver: "Admin", timestamp: new Date().toISOString() });

    setRejectingRecord(null);
    setRejectReason("");

    addToast(
      "error",
      "Pengajuan Cuti Ditolak!",
      `Cuti untuk ${empName} telah ditolak. Alasan: ${reasonText}`
    );
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
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] relative">
      <ToastContainer toasts={toasts} onClose={removeToast} />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 p-5 lg:p-6 dark:border-gray-800">
        <div>
          <h3 className="text-base font-semibold text-gray-800 dark:text-white">
            Persetujuan & Monitoring Cuti Karyawan
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Kelola ajuan cuti tahunan, sakit, dan izin penting karyawan (PRD §7.3)
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
                  <th className="px-6 py-4 text-center">Aksi</th>
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
                      <div>
                        <span className="font-medium text-gray-800 dark:text-white">{record.type}</span>
                        <span className="block text-xs text-gray-400">Durasi: {record.duration}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400 font-mono text-xs">
                      {record.date}
                    </td>
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
                    <td className="px-6 py-4 text-center">
                      {record.status === "Pending" ? (
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleApprove(record.id, record.name)}
                            className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition shadow-sm"
                          >
                            Setujui
                          </button>
                          <button
                            onClick={() => openRejectModal(record)}
                            className="px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
                          >
                            Tolak
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400 italic">Telah Diproses</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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

      {/* ─────────────────────────────────────────────
          MODAL INTERAKTIF PENOLAKAN CUTI (RejectLeaveModal)
      ───────────────────────────────────────────── */}
      {rejectingRecord && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-gray-900/75 backdrop-blur-md transition-all duration-300">
          <div className="w-full max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-2xl relative animate-modal-book-open">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              Alasan Penolakan Cuti
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
              Silakan tuliskan alasan penolakan pengajuan cuti untuk <strong>{rejectingRecord.name}</strong> ({rejectingRecord.type} - {rejectingRecord.duration}).
            </p>

            <form onSubmit={handleConfirmReject} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Catatan Alasan Penolakan <span className="text-error-500">*</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Contoh: Beban kerja tim tinggi pada tanggal tersebut..."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="w-full p-3 text-xs bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:border-brand-500 focus:outline-none resize-none"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                <button
                  type="button"
                  onClick={() => setRejectingRecord(null)}
                  className="px-4 py-2 text-xs font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition dark:bg-gray-800 dark:text-gray-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition shadow-sm"
                >
                  Konfirmasi Tolak Cuti
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
