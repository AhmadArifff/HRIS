"use client";
import React, { useState } from "react";
import Badge from "../ui/badge/Badge";

interface OffboardingRecord {
  id: string;
  name: string;
  department: string;
  exitDate: string;
  reason: string;
  assetChecklist: {
    laptop: boolean;
    idCard: boolean;
    accessKey: boolean;
  };
  assetCleared: boolean;
  status: "In Progress" | "Completed";
}

const initialRecords: OffboardingRecord[] = [
  {
    id: "OFF-001",
    name: "Rina Maharani",
    department: "Marketing",
    exitDate: "2026-08-15",
    reason: "Resign (Karir Baru)",
    assetChecklist: { laptop: true, idCard: true, accessKey: true },
    assetCleared: true,
    status: "Completed",
  },
  {
    id: "OFF-002",
    name: "Hendra Wijaya",
    department: "IT",
    exitDate: "2026-08-20",
    reason: "Resign (Pindah Domisili)",
    assetChecklist: { laptop: true, idCard: false, accessKey: false },
    assetCleared: false,
    status: "In Progress",
  },
  {
    id: "OFF-003",
    name: "Maya Putri",
    department: "Finance",
    exitDate: "2026-08-30",
    reason: "Habis Masa Kontrak",
    assetChecklist: { laptop: false, idCard: false, accessKey: false },
    assetCleared: false,
    status: "In Progress",
  },
];

export const OffboardingTable = () => {
  const [data, setData] = useState<OffboardingRecord[]>(initialRecords);
  const [showChecklistModal, setShowChecklistModal] = useState<OffboardingRecord | null>(null);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Toggle Single Asset Checklist Item
  const handleToggleAsset = (recordId: string, assetKey: keyof OffboardingRecord["assetChecklist"]) => {
    setData((prev) =>
      prev.map((item) => {
        if (item.id === recordId) {
          const updatedChecklist = {
            ...item.assetChecklist,
            [assetKey]: !item.assetChecklist[assetKey],
          };
          const allCleared = Object.values(updatedChecklist).every(Boolean);
          return {
            ...item,
            assetChecklist: updatedChecklist,
            assetCleared: allCleared,
            status: allCleared ? "Completed" : "In Progress",
          };
        }
        return item;
      })
    );
  };

  // Finalize Clearance Button
  const handleFinalizeClearance = (record: OffboardingRecord) => {
    // PRD §7.6: Guard Clause Offboarding Clearance
    if (!record.assetCleared) {
      alert("⚠️ Guard Clause: Seluruh checklist pengembalian aset (Laptop, ID Card, Akses) WAJIB tercentang hijau sebelum clearance diselesaikan.");
      return;
    }

    setData((prev) =>
      prev.map((item) => (item.id === record.id ? { ...item, status: "Completed" } : item))
    );
    alert(`✅ Clearance Offboarding untuk ${record.name} Selesai!\nStatus Karyawan diperbarui menjadi TERMINATED (Parkir). Sertifikat Pengalaman Kerja diterbitkan.`);
    setShowChecklistModal(null);
  };

  const handleDownloadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      setShowDownloadModal(false);
      alert("🎉 Laporan Rekap Offboarding & Clearance Aset BERHASIL diunduh!");
    }, 1200);
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 p-5 lg:p-6 dark:border-gray-800">
        <div>
          <h3 className="text-base font-semibold text-gray-800 dark:text-white">
            Kelola Resign & Offboarding Karyawan
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Checklist pengembalian aset perusahaan dan surat keterangan kerja (PRD §3.7 & §7.6)
          </p>
        </div>
        <button
          onClick={() => setShowDownloadModal(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Unduh Laporan Offboarding
        </button>
      </div>

      <div className="p-5 lg:p-6">
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
            <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:bg-gray-800/50 dark:text-gray-400">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Karyawan</th>
                <th className="px-6 py-4">Tanggal Keluar</th>
                <th className="px-6 py-4">Alasan</th>
                <th className="px-6 py-4">Checklist Pengembalian Aset</th>
                <th className="px-6 py-4">Status Clearance</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {data.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50">
                  <td className="px-6 py-4 font-mono text-xs text-gray-500">{record.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-800 dark:text-white">
                    <div>
                      <span>{record.name}</span>
                      <span className="block text-xs font-normal text-gray-400">{record.department}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono">{record.exitDate}</td>
                  <td className="px-6 py-4">{record.reason}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded font-mono ${record.assetChecklist.laptop ? "bg-success-500/10 text-success-500" : "bg-gray-100 text-gray-400"}`}>
                        💻 Laptop
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded font-mono ${record.assetChecklist.idCard ? "bg-success-500/10 text-success-500" : "bg-gray-100 text-gray-400"}`}>
                        🪪 ID Card
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded font-mono ${record.assetChecklist.accessKey ? "bg-success-500/10 text-success-500" : "bg-gray-100 text-gray-400"}`}>
                        🔑 Kunci
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge color={record.status === "Completed" ? "success" : "warning"}>
                      {record.status === "Completed" ? "Clearance Selesai" : "Dalam Proses"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setShowChecklistModal(record)}
                      className="text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      Kelola Checklist
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─────────────────────────────────────────────
          1. MODAL KELOLA CHECKLIST ASET
      ───────────────────────────────────────────── */}
      {showChecklistModal && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-gray-900/75 backdrop-blur-md">
          <div className="w-full max-w-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-2xl relative">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              Checklist Clearance — {showChecklistModal.name}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-5">
              Centang pengembalian aset perusahaan (IT & HR) sebelum memfinalisasi clearance.
            </p>

            <div className="space-y-4 mb-6">
              <label className="flex items-center justify-between p-3 rounded-xl border border-gray-200 dark:border-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <span className="text-xs font-medium text-gray-800 dark:text-white">💻 Laptop Perusahaan & Aksesori</span>
                <input
                  type="checkbox"
                  checked={showChecklistModal.assetChecklist.laptop}
                  onChange={() => {
                    handleToggleAsset(showChecklistModal.id, "laptop");
                    setShowChecklistModal({
                      ...showChecklistModal,
                      assetChecklist: { ...showChecklistModal.assetChecklist, laptop: !showChecklistModal.assetChecklist.laptop }
                    });
                  }}
                  className="w-4 h-4 text-brand-500 rounded focus:ring-brand-500"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl border border-gray-200 dark:border-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <span className="text-xs font-medium text-gray-800 dark:text-white">🪪 ID Card & Badge Akses Kantor</span>
                <input
                  type="checkbox"
                  checked={showChecklistModal.assetChecklist.idCard}
                  onChange={() => {
                    handleToggleAsset(showChecklistModal.id, "idCard");
                    setShowChecklistModal({
                      ...showChecklistModal,
                      assetChecklist: { ...showChecklistModal.assetChecklist, idCard: !showChecklistModal.assetChecklist.idCard }
                    });
                  }}
                  className="w-4 h-4 text-brand-500 rounded focus:ring-brand-500"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl border border-gray-200 dark:border-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <span className="text-xs font-medium text-gray-800 dark:text-white">🔑 Kunci Ruangan / Fasilitas Kantor</span>
                <input
                  type="checkbox"
                  checked={showChecklistModal.assetChecklist.accessKey}
                  onChange={() => {
                    handleToggleAsset(showChecklistModal.id, "accessKey");
                    setShowChecklistModal({
                      ...showChecklistModal,
                      assetChecklist: { ...showChecklistModal.assetChecklist, accessKey: !showChecklistModal.assetChecklist.accessKey }
                    });
                  }}
                  className="w-4 h-4 text-brand-500 rounded focus:ring-brand-500"
                />
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
              <button
                type="button"
                onClick={() => setShowChecklistModal(null)}
                className="px-4 py-2 text-xs font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition dark:bg-gray-800 dark:text-gray-300"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={() => handleFinalizeClearance(showChecklistModal)}
                className="px-4 py-2 text-xs font-semibold text-white bg-brand-500 rounded-xl hover:bg-brand-600 transition"
              >
                Selesaikan Clearance
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────
          2. MODAL DOWNLOAD LAPORAN
      ───────────────────────────────────────────── */}
      {showDownloadModal && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-gray-900/75 backdrop-blur-md">
          <div className="w-full max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-2xl relative">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              Unduh Laporan Offboarding & Clearance
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-5">
              Ekspor rekapitulasi status pengembalian aset dan surat keterangan kerja karyawan resign.
            </p>

            <form onSubmit={handleDownloadSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Format File</label>
                <select className="w-full h-10 px-3 text-xs bg-transparent border border-gray-300 dark:border-gray-700 rounded-xl text-gray-800 dark:text-white focus:border-brand-500 focus:outline-none">
                  <option value="PDF">Format PDF Rekapitulasi (.pdf)</option>
                  <option value="Excel">Format Microsoft Excel (.xlsx)</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                <button
                  type="button"
                  onClick={() => setShowDownloadModal(false)}
                  className="px-4 py-2 text-xs font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition dark:bg-gray-800 dark:text-gray-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isDownloading}
                  className="px-4 py-2 text-xs font-semibold text-white bg-brand-500 rounded-xl hover:bg-brand-600 transition disabled:opacity-50"
                >
                  {isDownloading ? "Mengunduh..." : "Unduh Berkas PDF"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
