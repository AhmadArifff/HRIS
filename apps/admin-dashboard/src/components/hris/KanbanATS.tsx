"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ToastContainer, ToastMessage } from "../ui/toast/Toast";

interface Candidate {
  id: number;
  name: string;
  role: string;
  status: "applied" | "screening" | "interview" | "offered" | "hired";
  score: string;
  date: string;
  email: string;
  phone: string;
  experience: string;
}

interface KanbanColumnDef {
  id: Candidate["status"];
  title: string;
  color: string;
  badgeBg: string;
  badgeText: string;
}

const initialColumns: KanbanColumnDef[] = [
  { id: "applied", title: "Applied", color: "bg-slate-50 dark:bg-slate-900/60", badgeBg: "bg-slate-200 dark:bg-slate-800", badgeText: "text-slate-700 dark:text-slate-300" },
  { id: "screening", title: "Screening", color: "bg-blue-50/70 dark:bg-blue-950/30", badgeBg: "bg-blue-100 dark:bg-blue-900/50", badgeText: "text-blue-700 dark:text-blue-300" },
  { id: "interview", title: "Interview", color: "bg-amber-50/70 dark:bg-amber-950/30", badgeBg: "bg-amber-100 dark:bg-amber-900/50", badgeText: "text-amber-700 dark:text-amber-300" },
  { id: "offered", title: "Offered", color: "bg-purple-50/70 dark:bg-purple-950/30", badgeBg: "bg-purple-100 dark:bg-purple-900/50", badgeText: "text-purple-700 dark:text-purple-300" },
  { id: "hired", title: "Hired", color: "bg-emerald-50/70 dark:bg-emerald-950/30", badgeBg: "bg-emerald-100 dark:bg-emerald-900/50", badgeText: "text-emerald-700 dark:text-emerald-300" },
];

const initialCandidates: Candidate[] = [
  { id: 1, name: "Diana Putri", role: "UI/UX Designer", status: "applied", score: "88/100", date: "08 Ags", email: "diana.putri@email.com", phone: "+62 812-9988-1122", experience: "3 Tahun" },
  { id: 2, name: "Reza Rahadian", role: "Backend Engineer", status: "applied", score: "92/100", date: "07 Ags", email: "reza.rahadian@email.com", phone: "+62 813-4455-6677", experience: "4 Tahun" },
  { id: 3, name: "Siska Saraswati", role: "Marketing Specialist", status: "applied", score: "84/100", date: "06 Ags", email: "siska.s@email.com", phone: "+62 815-1122-3344", experience: "2 Tahun" },
  { id: 4, name: "Fajar Nugraha", role: "Frontend Engineer", status: "screening", score: "75/100", date: "05 Ags", email: "fajar.nugraha@email.com", phone: "+62 817-8899-0011", experience: "2 Tahun" },
  { id: 5, name: "Bima Arya", role: "Data Analyst", status: "screening", score: "80/100", date: "04 Ags", email: "bima.arya@email.com", phone: "+62 819-2233-4455", experience: "3 Tahun" },
  { id: 6, name: "Citra Kirana", role: "Product Manager", status: "interview", score: "90/100", date: "01 Ags", email: "citra.kirana@email.com", phone: "+62 821-6677-8899", experience: "5 Tahun" },
  { id: 7, name: "Deni Sumargo", role: "DevOps Engineer", status: "offered", score: "95/100", date: "28 Jul", email: "deni.sumargo@email.com", phone: "+62 822-3344-5566", experience: "4 Tahun" },
];

export const KanbanATS: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
  const [showAddModal, setShowAddModal] = useState(false);
  const [targetColumn, setTargetColumn] = useState<Candidate["status"]>("applied");

  // Drag and Drop States
  const [draggedCandidateId, setDraggedCandidateId] = useState<number | null>(null);
  const [dragOverColumnId, setDragOverColumnId] = useState<Candidate["status"] | null>(null);

  // Form State
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newExp, setNewExp] = useState("1-3 Tahun");

  // Toast
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: "success" | "error" | "warning" | "info", title: string, message: string) => {
    const newToast: ToastMessage = { id: String(Date.now()), type, title, message };
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Move candidate handler
  const handleMoveCandidate = (candidateId: number, targetStatus: Candidate["status"]) => {
    const candidate = candidates.find((c) => c.id === candidateId);
    if (!candidate) return;

    if (candidate.status === targetStatus) return; // Same stage, do nothing

    const oldStatus = candidate.status;
    const targetColDef = initialColumns.find((col) => col.id === targetStatus);
    const targetTitle = targetColDef?.title || targetStatus;

    setCandidates((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, status: targetStatus } : c))
    );

    addToast(
      "success",
      "Tahapan Diperbarui",
      `✓ ${candidate.name} dipindahkan dari ${oldStatus.toUpperCase()} ke ${targetTitle.toUpperCase()}`
    );
  };

  // Drag and Drop Event Handlers
  const handleDragStart = (e: React.DragEvent, candidate: Candidate) => {
    e.dataTransfer.setData("candidateId", candidate.id.toString());
    e.dataTransfer.effectAllowed = "move";
    setDraggedCandidateId(candidate.id);
  };

  const handleDragEnd = () => {
    setDraggedCandidateId(null);
    setDragOverColumnId(null);
  };

  const handleDragOver = (e: React.DragEvent, columnId: Candidate["status"]) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverColumnId !== columnId) {
      setDragOverColumnId(columnId);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // Only reset if we're actually leaving the column container
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setDragOverColumnId(null);
    }
  };

  const handleDrop = (e: React.DragEvent, columnId: Candidate["status"]) => {
    e.preventDefault();
    const candidateIdStr = e.dataTransfer.getData("candidateId");
    if (candidateIdStr) {
      const candidateId = Number(candidateIdStr);
      handleMoveCandidate(candidateId, columnId);
    }
    setDraggedCandidateId(null);
    setDragOverColumnId(null);
  };

  const openAddModal = (columnId: Candidate["status"]) => {
    setTargetColumn(columnId);
    setNewName("");
    setNewRole("");
    setNewEmail("");
    setNewPhone("");
    setNewExp("1-3 Tahun");
    setShowAddModal(true);
  };

  const handleAddCandidate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) {
      addToast("error", "Validasi Gagal", "Guard Clause: Nama lengkap kandidat wajib diisi.");
      return;
    }
    if (!newRole.trim()) {
      addToast("error", "Validasi Gagal", "Guard Clause: Posisi pekerjaan wajib dipilih/diisi.");
      return;
    }
    if (!newEmail.trim() || !newEmail.includes("@")) {
      addToast("error", "Validasi Gagal", "Guard Clause: Email wajib berformat valid.");
      return;
    }

    const newCandidate: Candidate = {
      id: Date.now(),
      name: newName,
      role: newRole,
      status: targetColumn,
      score: "85/100",
      date: "Hari Ini",
      email: newEmail,
      phone: newPhone || "+62 812-0000-0000",
      experience: newExp || "2 Tahun",
    };

    setCandidates((prev) => [newCandidate, ...prev]);
    setShowAddModal(false);
    addToast(
      "success",
      "Kandidat Ditambahkan",
      `✓ Berhasil menambahkan ${newName} ke tahap ${targetColumn.toUpperCase()}.`
    );
  };

  return (
    <div className="flex flex-col h-full w-full max-w-full min-w-0 overflow-hidden">
      <ToastContainer toasts={toasts} onClose={removeToast} />

      {/* Helper Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500 dark:text-gray-400 mb-3 px-1">
        <div className="flex items-center gap-1.5 font-medium text-brand-600 dark:text-brand-400">
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
          <span>💡 <strong>Drag & Drop:</strong> Tarik kartu pelamar untuk memindahkan tahap rekrutmen secara instan.</span>
        </div>
        <span className="text-[11px] text-gray-400 dark:text-gray-500 font-mono">Total Kandidat: {candidates.length}</span>
      </div>

      {/* Board Horizontal Container */}
      <div className="flex gap-5 overflow-x-auto pb-4 h-full w-full max-w-full min-w-0 items-stretch custom-scrollbar">
        {initialColumns.map((column) => {
          const columnCandidates = candidates.filter((c) => c.status === column.id);
          const isOver = dragOverColumnId === column.id;

          return (
            <div
              key={column.id}
              onDragOver={(e) => handleDragOver(e, column.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, column.id)}
              className={`flex-shrink-0 w-80 sm:w-84 rounded-2xl p-4 flex flex-col h-full border transition-all duration-200 shadow-sm ${column.color} ${
                isOver
                  ? "border-brand-500 ring-2 ring-brand-500/40 bg-brand-50/40 dark:bg-brand-950/40 scale-[1.01]"
                  : "border-gray-200/90 dark:border-gray-800"
              }`}
            >
              {/* 1. FIXED COLUMN HEADER */}
              <div className="shrink-0 flex justify-between items-center pb-3 mb-3 border-b border-gray-200/80 dark:border-gray-700/80">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-500"></span>
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider">
                    {column.title}
                  </h4>
                </div>
                <span className={`${column.badgeBg} ${column.badgeText} text-xs font-black px-2.5 py-0.5 rounded-full shadow-sm border border-gray-200/60 dark:border-gray-700/60`}>
                  {columnCandidates.length}
                </span>
              </div>

              {/* 2. SCROLLABLE CARDS AREA */}
              <div className="flex-1 min-h-[220px] overflow-y-auto space-y-3 pr-1 custom-scrollbar">
                {columnCandidates.map((candidate) => {
                  const isDragging = draggedCandidateId === candidate.id;

                  return (
                    <div
                      key={candidate.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, candidate)}
                      onDragEnd={handleDragEnd}
                      className={`bg-white dark:bg-gray-900 p-4 rounded-xl border shadow-sm transition-all duration-200 cursor-grab active:cursor-grabbing group select-none ${
                        isDragging
                          ? "opacity-40 scale-95 border-dashed border-brand-500 shadow-none ring-2 ring-brand-400"
                          : "border-gray-200 dark:border-gray-800 hover:shadow-md hover:border-brand-400 dark:hover:border-brand-500"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1.5">
                        <h5 className="font-bold text-gray-900 dark:text-white text-sm group-hover:text-brand-500 transition-colors">
                          {candidate.name}
                        </h5>
                        <span className="text-[11px] font-mono text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md">
                          {candidate.date}
                        </span>
                      </div>

                      <p className="text-xs text-brand-600 dark:text-brand-400 font-semibold mb-2">
                        {candidate.role}
                      </p>

                      <div className="text-[11px] text-gray-500 dark:text-gray-400 space-y-0.5 mb-3">
                        <div className="truncate">📧 {candidate.email}</div>
                        <div>💼 Pengalaman: {candidate.experience}</div>
                      </div>

                      {/* Stage Switcher (Quick Access) & Score */}
                      <div className="flex items-center justify-between pt-2.5 border-t border-gray-100 dark:border-gray-800 text-xs gap-2">
                        <div className="flex items-center gap-1 font-semibold text-amber-500">
                          <svg className="w-3.5 h-3.5 fill-amber-400" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span>{candidate.score}</span>
                        </div>

                        {/* Quick Stage Select */}
                        <div className="flex items-center gap-1">
                          <select
                            value={candidate.status}
                            onChange={(e) => handleMoveCandidate(candidate.id, e.target.value as Candidate["status"])}
                            className="text-[10px] font-semibold bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg px-2 py-1 outline-none focus:border-brand-500 cursor-pointer"
                            title="Pindah Tahap Cepat"
                          >
                            {initialColumns.map((col) => (
                              <option key={col.id} value={col.id}>
                                {col.title}
                              </option>
                            ))}
                          </select>

                          <Link
                            href={`/recruitment/candidate/${candidate.id}`}
                            className="font-bold text-brand-500 hover:text-brand-600 dark:text-brand-400 p-1 hover:bg-brand-50 dark:hover:bg-brand-500/10 rounded-lg transition"
                            title="Lihat Detail Pelamar"
                          >
                            &rarr;
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Drop placeholder indicator when dragging over an empty or non-empty column */}
                {isOver && (
                  <div className="border-2 border-dashed border-brand-400 dark:border-brand-500/60 bg-brand-50/50 dark:bg-brand-500/10 rounded-xl h-24 flex items-center justify-center text-xs font-semibold text-brand-600 dark:text-brand-400 animate-pulse">
                    📥 Lepaskan di sini untuk tahap {column.title}
                  </div>
                )}

                {columnCandidates.length === 0 && !isOver && (
                  <div className="flex flex-col items-center justify-center h-36 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl text-gray-400 text-xs font-medium gap-2 p-4 text-center">
                    <svg className="w-6 h-6 text-gray-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <span>Belum ada kandidat di tahap ini. Tarik kandidat ke sini.</span>
                  </div>
                )}
              </div>

              {/* 3. FIXED COLUMN FOOTER */}
              <div className="shrink-0 pt-3 mt-2 border-t border-gray-200/60 dark:border-gray-800">
                <button
                  type="button"
                  onClick={() => openAddModal(column.id)}
                  className="w-full py-2.5 text-xs font-bold text-gray-700 hover:text-brand-600 dark:text-gray-300 dark:hover:text-white bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 rounded-xl border border-gray-200/80 dark:border-gray-700 transition shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>+ Tambah Kandidat</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Form Tambah Kandidat */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-2xl animate-modal-book-open">
            <div className="flex items-center justify-between mb-4 border-b border-gray-100 dark:border-gray-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Tambah Kandidat Pelamar Baru
                </h3>
                <span className="text-xs text-brand-600 dark:text-brand-400 font-semibold uppercase">
                  Tahap: {targetColumn}
                </span>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-white p-1 rounded-lg text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddCandidate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Nama Lengkap <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Rian Pratama"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Posisi Pekerjaan <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Senior Full Stack Engineer"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                    Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="rian@example.com"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                    Pengalaman
                  </label>
                  <select
                    value={newExp}
                    onChange={(e) => setNewExp(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
                  >
                    <option value="Fresh Graduate">Fresh Graduate</option>
                    <option value="1-3 Tahun">1-3 Tahun</option>
                    <option value="3-5 Tahun">3-5 Tahun</option>
                    <option value="5+ Tahun">5+ Tahun</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Nomor Telepon / WhatsApp
                </label>
                <input
                  type="text"
                  placeholder="+62 812-3456-7890"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100 dark:border-gray-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-brand-500 hover:bg-brand-600 rounded-xl transition shadow-lg shadow-brand-500/25"
                >
                  Simpan Kandidat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
