"use client";
import React, { useState } from "react";
import Badge from "../ui/badge/Badge";
import Button from "../ui/button/Button";

interface OffboardingRecord {
  id: string;
  name: string;
  role: string;
  date: string;
  type: "Resign" | "Pensiun" | "PHK";
  progress: number;
  status: "Proses" | "Selesai";
  checklist: { label: string; done: boolean }[];
}

const initialData: OffboardingRecord[] = [
  {
    id: "OB-001", name: "Rina Maharani", role: "Sales Executive", date: "31 Ags 2026",
    type: "Resign", progress: 80, status: "Proses",
    checklist: [
      { label: "Pengembalian Laptop", done: true },
      { label: "Pengembalian ID Card", done: true },
      { label: "Serah terima pekerjaan", done: true },
      { label: "Exit Interview", done: true },
      { label: "Final Settlement / Clearance HR", done: false },
    ],
  },
  {
    id: "OB-002", name: "Joko Anwar", role: "Security", date: "15 Ags 2026",
    type: "Pensiun", progress: 100, status: "Selesai",
    checklist: [
      { label: "Pengembalian Laptop", done: true },
      { label: "Pengembalian ID Card", done: true },
      { label: "Serah terima pekerjaan", done: true },
      { label: "Exit Interview", done: true },
      { label: "Final Settlement / Clearance HR", done: true },
    ],
  },
];

export const OffboardingTable = () => {
  const [data, setData] = useState<OffboardingRecord[]>(initialData);
  const [activeChecklist, setActiveChecklist] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // PRD §7.6: "Unduh Laporan" — Guard: harus ada data offboarding
  const handleDownloadReport = () => {
    if (data.length === 0) {
      alert("⚠️ Guard Clause: Tidak ada data offboarding untuk diunduh.");
      return;
    }
    alert("✅ Mengunduh Laporan Offboarding... (Simulasi download CSV)");
    console.log("[AUDIT_LOG] DOWNLOAD_OFFBOARDING_REPORT", { timestamp: new Date().toISOString(), total_records: data.length });
  };

  // PRD §7.6: "Kelola Checklist" — Guard: hanya bisa diselesaikan jika seluruh checklist tercentang
  const handleToggleChecklist = (recordId: string, index: number) => {
    setData((prev) =>
      prev.map((rec) => {
        if (rec.id !== recordId) return rec;
        const newChecklist = [...rec.checklist];
        newChecklist[index] = { ...newChecklist[index], done: !newChecklist[index].done };
        const completedCount = newChecklist.filter((c) => c.done).length;
        const newProgress = Math.round((completedCount / newChecklist.length) * 100);
        const allDone = completedCount === newChecklist.length;
        return {
          ...rec,
          checklist: newChecklist,
          progress: newProgress,
          status: allDone ? "Selesai" : "Proses",
        };
      })
    );
  };

  // PRD §7.6: Guard — hanya bisa diselesaikan jika seluruh checklist tercentang
  const handleCompleteClearance = (recordId: string) => {
    const record = data.find((r) => r.id === recordId);
    if (!record) return;

    const allDone = record.checklist.every((c) => c.done);
    if (!allDone) {
      alert(`⚠️ Guard Clause: Checklist ${record.name} belum lengkap! Selesaikan semua item terlebih dahulu.`);
      return;
    }

    alert(`✅ Clearance ${record.name} selesai!\n→ Status: TERMINATED\n→ Sertifikat Pengalaman Kerja siap didownload.`);
    console.log("[AUDIT_LOG] COMPLETE_OFFBOARDING_CLEARANCE", {
      employee: record.name,
      asset_cleared: true,
      state_transition: "STATUS_EMPLOYEE → TERMINATED",
      timestamp: new Date().toISOString(),
    });
    setActiveChecklist(null);
  };

  const filteredData = data.filter(
    (rec) =>
      rec.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / entriesPerPage) || 1;
  const startIndex = (currentPage - 1) * entriesPerPage;
  const displayedData = filteredData.slice(startIndex, startIndex + entriesPerPage);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 p-5 lg:p-6 dark:border-gray-800">
        <div>
          <h3 className="text-base font-semibold text-gray-800 dark:text-white">
            Proses Offboarding Karyawan
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Kelola checklist pengembalian aset & exit interview karyawan keluar
          </p>
        </div>
        <button
          onClick={handleDownloadReport}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Unduh Laporan
        </button>
      </div>

      <div className="p-5 lg:p-6">
        {/* Controls Bar */}
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span>Tampilkan</span>
            <select
              value={entriesPerPage}
              onChange={(e) => { setEntriesPerPage(Number(e.target.value)); setCurrentPage(1); }}
              className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-theme-xs focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
            </select>
            <span>entri</span>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Cari karyawan..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full rounded-xl border border-gray-300 bg-white py-2 pl-9 pr-4 text-sm text-gray-800 shadow-theme-xs focus:border-brand-500 focus:outline-none sm:w-64 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 fill-current text-gray-400" viewBox="0 0 20 20"><path fillRule="evenodd" clipRule="evenodd" d="M8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4ZM2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 9.29583 13.5873 10.495 12.8856 11.4714L17.7071 16.2929C18.0976 16.6834 18.0976 17.3166 17.7071 17.7071C17.3166 18.0976 16.6834 18.0976 16.2929 17.7071L11.4714 12.8856C10.495 13.5873 9.29583 14 8 14C4.68629 14 2 11.3137 2 8Z" /></svg>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
            <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:bg-gray-800/50 dark:text-gray-400">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Karyawan</th>
                <th className="px-6 py-4">Tgl Keluar</th>
                <th className="px-6 py-4">Alasan</th>
                <th className="px-6 py-4">Clearance Progress</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {displayedData.map((record) => (
                <React.Fragment key={record.id}>
                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4 font-mono text-xs text-gray-500">{record.id}</td>
                    <td className="px-6 py-4 font-medium text-gray-800 dark:text-white">
                      <div>
                        <span>{record.name}</span>
                        <span className="block text-xs font-normal text-gray-400">{record.role}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">{record.date}</td>
                    <td className="px-6 py-4">
                      <Badge color={record.type === "Resign" ? "warning" : record.type === "Pensiun" ? "info" : "error"}>
                        {record.type}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-full max-w-[120px] bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                          <div
                            className={`h-2.5 rounded-full transition-all ${record.progress === 100 ? "bg-success-500" : "bg-brand-500"}`}
                            style={{ width: `${record.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-600 dark:text-gray-400 font-mono">{record.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge color={record.status === "Selesai" ? "success" : "warning"}>
                        {record.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setActiveChecklist(activeChecklist === record.id ? null : record.id)}
                        className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition ${
                          activeChecklist === record.id
                            ? "bg-brand-500 text-white border-brand-500"
                            : "border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {activeChecklist === record.id ? "Tutup" : "Kelola Checklist"}
                      </button>
                    </td>
                  </tr>

                  {/* Expandable Checklist Panel */}
                  {activeChecklist === record.id && (
                    <tr>
                      <td colSpan={7} className="px-6 py-4 bg-gray-50/80 dark:bg-gray-800/30">
                        <div className="max-w-lg space-y-3">
                          <h4 className="text-sm font-semibold text-gray-800 dark:text-white">
                            Checklist Clearance — {record.name}
                          </h4>
                          {record.checklist.map((item, idx) => (
                            <label
                              key={idx}
                              className="flex items-center gap-3 cursor-pointer group"
                            >
                              <input
                                type="checkbox"
                                checked={item.done}
                                onChange={() => handleToggleChecklist(record.id, idx)}
                                className="w-4 h-4 text-brand-500 border-gray-300 rounded focus:ring-brand-500"
                              />
                              <span className={`text-sm ${item.done ? "line-through text-gray-400" : "text-gray-700 dark:text-gray-300"}`}>
                                {item.label}
                              </span>
                            </label>
                          ))}

                          <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                            <button
                              onClick={() => handleCompleteClearance(record.id)}
                              className="inline-flex items-center gap-2 rounded-xl bg-success-500 px-4 py-2 text-sm font-medium text-white hover:bg-success-600 transition disabled:opacity-40"
                              disabled={!record.checklist.every((c) => c.done)}
                            >
                              ✓ Selesaikan Clearance & Terbitkan Surat Keterangan
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-sm text-gray-500 dark:text-gray-400">
          <div>
            Menampilkan {filteredData.length === 0 ? 0 : startIndex + 1} sampai{" "}
            {Math.min(startIndex + entriesPerPage, filteredData.length)} dari{" "}
            {filteredData.length} entri
          </div>
          <div className="flex items-center gap-1.5">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition">Sebelumnya</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button key={p} onClick={() => setCurrentPage(p)} className={`inline-flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium transition ${currentPage === p ? "bg-brand-500 text-white" : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"}`}>{p}</button>
            ))}
            <button disabled={currentPage >= totalPages} onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition">Selanjutnya</button>
          </div>
        </div>
      </div>
    </div>
  );
};
