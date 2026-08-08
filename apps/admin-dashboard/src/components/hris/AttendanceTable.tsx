"use client";
import React, { useState } from "react";
import Badge from "../ui/badge/Badge";

export interface AttendanceRecord {
  id: string;
  name: string;
  department: string;
  shiftName: string;
  shiftHours: string;
  date: string;
  clockIn: string;
  clockOut: string;
  lateDurationMinutes: number;
  earlyLeaveMinutes: number;
  status: "Hadir" | "Terlambat" | "Mangkir" | "Izin";
  location: string;
}

const mockAttendanceData: AttendanceRecord[] = [
  { id: "EMP-001", name: "Budi Santoso", department: "IT", shiftName: "Shift Pagi", shiftHours: "08:00 - 17:00", date: "2026-08-08", clockIn: "07:55", clockOut: "17:05", lateDurationMinutes: 0, earlyLeaveMinutes: 0, status: "Hadir", location: "Kantor Pusat" },
  { id: "EMP-002", name: "Siti Aminah", department: "Human Resources", shiftName: "Shift Pagi", shiftHours: "08:00 - 17:00", date: "2026-08-08", clockIn: "08:25", clockOut: "--:--", lateDurationMinutes: 25, earlyLeaveMinutes: 0, status: "Terlambat", location: "Kantor Pusat" },
  { id: "EMP-003", name: "Andi Saputra", department: "Marketing", shiftName: "Shift Siang", shiftHours: "13:00 - 21:00", date: "2026-08-08", clockIn: "12:50", clockOut: "21:05", lateDurationMinutes: 0, earlyLeaveMinutes: 0, status: "Hadir", location: "Remote (WFH)" },
  { id: "EMP-004", name: "Rina Gunawan", department: "Finance", shiftName: "Shift Pagi", shiftHours: "08:00 - 17:00", date: "2026-08-08", clockIn: "--:--", clockOut: "--:--", lateDurationMinutes: 0, earlyLeaveMinutes: 0, status: "Mangkir", location: "-" },
  { id: "EMP-005", name: "Dedi Setiawan", department: "IT", shiftName: "Shift Malam", shiftHours: "21:00 - 06:00", date: "2026-08-08", clockIn: "21:00", clockOut: "06:00", lateDurationMinutes: 0, earlyLeaveMinutes: 0, status: "Hadir", location: "Kantor Cabang" },
  { id: "EMP-006", name: "Anita Larasati", department: "Design", shiftName: "Shift Pagi", shiftHours: "08:00 - 17:00", date: "2026-08-08", clockIn: "08:40", clockOut: "16:30", lateDurationMinutes: 40, earlyLeaveMinutes: 30, status: "Terlambat", location: "Kantor Pusat" },
  { id: "EMP-007", name: "Fajar Nugraha", department: "IT", shiftName: "Shift Pagi", shiftHours: "08:00 - 17:00", date: "2026-08-08", clockIn: "--:--", clockOut: "--:--", lateDurationMinutes: 0, earlyLeaveMinutes: 0, status: "Izin", location: "-" },
  { id: "EMP-008", name: "Dewi Lestari", department: "Human Resources", shiftName: "Shift Pagi", shiftHours: "08:00 - 17:00", date: "2026-08-08", clockIn: "07:50", clockOut: "17:00", lateDurationMinutes: 0, earlyLeaveMinutes: 0, status: "Hadir", location: "Kantor Pusat" },
];

export const AttendanceTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof AttendanceRecord>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Export Modal State
  const [showExportModal, setShowExportModal] = useState(false);
  const [startDate, setStartDate] = useState("2026-08-01");
  const [endDate, setEndDate] = useState("2026-08-08");
  const [exportFormat, setExportFormat] = useState("CSV");
  const [isExporting, setIsExporting] = useState(false);

  const handleExportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsExporting(true);
    console.log("[AUDIT_LOG] ATTENDANCE_RECAP_EXPORTED", {
      start_date: startDate,
      end_date: endDate,
      format: exportFormat,
      timestamp: new Date().toISOString()
    });

    setTimeout(() => {
      setIsExporting(false);
      setShowExportModal(false);
      alert(`🎉 Laporan Rekap Absensi (${startDate} s/d ${endDate}) BERHASIL diekspor dalam format ${exportFormat}!`);
    }, 1200);
  };

  const filteredRecords = mockAttendanceData.filter(
    (rec) =>
      rec.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.shiftName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedRecords = [...filteredRecords].sort((a, b) => {
    const valA = String(a[sortField]).toLowerCase();
    const valB = String(b[sortField]).toLowerCase();
    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (field: keyof AttendanceRecord) => {
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
            Pemantauan Kehadiran & Sinkronisasi Shift
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Log kehadiran real-time tersinkron dengan rujukan SHIFT_MASTER (PRD §3.3)
          </p>
        </div>
        <button
          onClick={() => setShowExportModal(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export Rekap Absensi & Telat
        </button>
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
              placeholder="Cari karyawan, shift, lokasi..."
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

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
            <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:bg-gray-800/50 dark:text-gray-400">
              <tr>
                <th onClick={() => handleSort("id")} className="px-6 py-4 cursor-pointer hover:text-brand-500">
                  ID {sortField === "id" ? (sortOrder === "asc" ? "↑" : "↓") : "↕"}
                </th>
                <th onClick={() => handleSort("name")} className="px-6 py-4 cursor-pointer hover:text-brand-500">
                  Nama Karyawan {sortField === "name" ? (sortOrder === "asc" ? "↑" : "↓") : "↕"}
                </th>
                <th onClick={() => handleSort("shiftName")} className="px-6 py-4 cursor-pointer hover:text-brand-500">
                  Shift Rujukan {sortField === "shiftName" ? (sortOrder === "asc" ? "↑" : "↓") : "↕"}
                </th>
                <th onClick={() => handleSort("clockIn")} className="px-6 py-4 cursor-pointer hover:text-brand-500">
                  Clock-In {sortField === "clockIn" ? (sortOrder === "asc" ? "↑" : "↓") : "↕"}
                </th>
                <th onClick={() => handleSort("clockOut")} className="px-6 py-4 cursor-pointer hover:text-brand-500">
                  Clock-Out {sortField === "clockOut" ? (sortOrder === "asc" ? "↑" : "↓") : "↕"}
                </th>
                <th className="px-6 py-4">Keterlambatan / Pulang Cepat</th>
                <th onClick={() => handleSort("status")} className="px-6 py-4 cursor-pointer hover:text-brand-500">
                  Status {sortField === "status" ? (sortOrder === "asc" ? "↑" : "↓") : "↕"}
                </th>
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
                      <span className="font-medium text-gray-800 dark:text-white">{record.shiftName}</span>
                      <span className="block text-xs font-mono text-gray-400">{record.shiftHours}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-mono ${record.lateDurationMinutes > 0 ? "text-error-500 font-bold" : ""}`}>
                      {record.clockIn}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-mono ${record.earlyLeaveMinutes > 0 ? "text-warning-500 font-bold" : ""}`}>
                      {record.clockOut}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      {record.lateDurationMinutes > 0 ? (
                        <span className="inline-flex items-center text-xs font-medium text-error-600 dark:text-error-400">
                          ⏱️ Telat +{record.lateDurationMinutes} Menit
                        </span>
                      ) : null}
                      {record.earlyLeaveMinutes > 0 ? (
                        <span className="inline-flex items-center text-xs font-medium text-warning-600 dark:text-warning-400">
                          🏃 Pulang Awal {record.earlyLeaveMinutes} Menit
                        </span>
                      ) : null}
                      {record.lateDurationMinutes === 0 && record.earlyLeaveMinutes === 0 && record.status === "Hadir" ? (
                        <span className="text-xs text-success-600 dark:text-success-400">✓ Tepat Waktu</span>
                      ) : null}
                      {record.status === "Mangkir" || record.status === "Izin" ? (
                        <span className="text-xs text-gray-400">-</span>
                      ) : null}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      color={
                        record.status === "Hadir"
                          ? "success"
                          : record.status === "Terlambat"
                          ? "warning"
                          : record.status === "Izin"
                          ? "info"
                          : "error"
                      }
                    >
                      {record.status}
                    </Badge>
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

      {/* ─────────────────────────────────────────────
          MODAL EXPORT REKAP ABSENSI
      ───────────────────────────────────────────── */}
      {showExportModal && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-gray-900/75 backdrop-blur-md">
          <div className="w-full max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-2xl relative">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              Export Rekap Laporan Absensi
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-5">
              Pilih rentang tanggal dan format file untuk mengekspor data absensi & potongan telat.
            </p>

            <form onSubmit={handleExportSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Tanggal Mulai</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full h-10 px-3 text-xs bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:border-brand-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Tanggal Akhir</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full h-10 px-3 text-xs bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:border-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Format File Export</label>
                <select
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="w-full h-10 px-3 text-xs bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:border-brand-500 focus:outline-none"
                >
                  <option value="CSV">Format CSV (.csv)</option>
                  <option value="Excel">Format Microsoft Excel (.xlsx)</option>
                  <option value="PDF">Format PDF Summary (.pdf)</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                <button
                  type="button"
                  onClick={() => setShowExportModal(false)}
                  className="px-4 py-2 text-xs font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition dark:bg-gray-800 dark:text-gray-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isExporting}
                  className="px-4 py-2 text-xs font-semibold text-white bg-brand-500 rounded-xl hover:bg-brand-600 transition disabled:opacity-50"
                >
                  {isExporting ? "Mengunduh..." : "Unduh Laporan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
