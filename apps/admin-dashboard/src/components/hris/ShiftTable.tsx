"use client";
import React, { useState } from "react";
import Badge from "../ui/badge/Badge";
import { ToastContainer, ToastMessage } from "../ui/toast/Toast";

export interface MasterShift {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  totalWorkHours: number;
  toleranceMinutes: number;
  activeEmployees: number;
}

export interface ShiftAssignment {
  id: string;
  employeeCode: string;
  employeeName: string;
  department: string;
  shiftName: string;
  date: string;
}

export const calculateTotalWorkHours = (start: string, end: string): number => {
  if (!start || !end) return 0;
  const [startH, startM] = start.split(":").map(Number);
  const [endH, endM] = end.split(":").map(Number);
  
  let startMinutes = startH * 60 + startM;
  let endMinutes = endH * 60 + endM;

  if (endMinutes <= startMinutes) {
    endMinutes += 24 * 60;
  }

  const diffMinutes = endMinutes - startMinutes;
  return Number((diffMinutes / 60).toFixed(1));
};

const mockMasterShifts: MasterShift[] = [
  { id: "SFT-01", name: "Shift Pagi (Normal)", startTime: "08:00", endTime: "17:00", totalWorkHours: 9.0, toleranceMinutes: 15, activeEmployees: 32 },
  { id: "SFT-02", name: "Shift Siang", startTime: "13:00", endTime: "21:00", totalWorkHours: 8.0, toleranceMinutes: 10, activeEmployees: 12 },
  { id: "SFT-03", name: "Shift Malam", startTime: "21:00", endTime: "06:00", totalWorkHours: 9.0, toleranceMinutes: 15, activeEmployees: 8 },
];

const mockAssignments: ShiftAssignment[] = [
  { id: "SA-101", employeeCode: "EMP-001", employeeName: "Budi Santoso", department: "IT", shiftName: "Shift Pagi (Normal)", date: "2026-08-08" },
  { id: "SA-102", employeeCode: "EMP-002", employeeName: "Siti Aminah", department: "Human Resources", shiftName: "Shift Pagi (Normal)", date: "2026-08-08" },
  { id: "SA-103", employeeCode: "EMP-003", employeeName: "Andi Saputra", department: "Marketing", shiftName: "Shift Siang", date: "2026-08-08" },
  { id: "SA-104", employeeCode: "EMP-004", employeeName: "Rina Gunawan", department: "Finance", shiftName: "Shift Pagi (Normal)", date: "2026-08-08" },
  { id: "SA-105", employeeCode: "EMP-005", employeeName: "Dedi Setiawan", department: "IT", shiftName: "Shift Malam", date: "2026-08-08" },
];

export const ShiftTable: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"master" | "assignment">("master");
  const [shifts, setShifts] = useState<MasterShift[]>(mockMasterShifts);
  const [assignments, setAssignments] = useState<ShiftAssignment[]>(mockAssignments);
  
  // Toast notifications state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: "success" | "error" | "warning" | "info", title: string, message: string) => {
    const newToast: ToastMessage = { id: String(Date.now()), type, title, message };
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Modals state
  const [showAddShiftModal, setShowAddShiftModal] = useState(false);
  const [showAssignShiftModal, setShowAssignShiftModal] = useState(false);
  const [editingShift, setEditingShift] = useState<MasterShift | null>(null);
  const [editingAssignment, setEditingAssignment] = useState<ShiftAssignment | null>(null);

  // Add Shift Form State
  const [newShiftName, setNewShiftName] = useState("");
  const [newStartTime, setNewStartTime] = useState("08:00");
  const [newEndTime, setNewEndTime] = useState("17:00");
  const [newTolerance, setNewTolerance] = useState(15);

  // Assign Shift Form State
  const [assignEmpName, setAssignEmpName] = useState("Budi Santoso");
  const [assignEmpCode, setAssignEmpCode] = useState("EMP-001");
  const [assignDepartment, setAssignDepartment] = useState("IT");
  const [assignShiftName, setAssignShiftName] = useState("Shift Pagi (Normal)");
  const [assignDate, setAssignDate] = useState("2026-08-09");

  // Handle Add Master Shift Submit
  const handleAddShiftSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newShiftName.trim()) {
      addToast("error", "Validasi Gagal", "Guard Clause: Nama Shift wajib diisi!");
      return;
    }
    const calculatedHours = calculateTotalWorkHours(newStartTime, newEndTime);
    const newId = `SFT-0${shifts.length + 1}`;
    const newMaster: MasterShift = {
      id: newId,
      name: newShiftName,
      startTime: newStartTime,
      endTime: newEndTime,
      totalWorkHours: calculatedHours,
      toleranceMinutes: Number(newTolerance),
      activeEmployees: 0,
    };
    setShifts((prev) => [...prev, newMaster]);
    setShowAddShiftModal(false);
    setNewShiftName("");

    addToast(
      "success",
      "Master Shift Ditambahkan!",
      `Shift "${newMaster.name}" (${newMaster.totalWorkHours} Jam Kerja) berhasil disimpan.`
    );
  };

  // Handle Edit Master Shift Submit
  const handleEditShiftSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingShift) return;
    const calculatedHours = calculateTotalWorkHours(editingShift.startTime, editingShift.endTime);
    const updatedShift = { ...editingShift, totalWorkHours: calculatedHours };

    setShifts((prev) =>
      prev.map((item) => (item.id === editingShift.id ? updatedShift : item))
    );
    const shiftName = editingShift.name;
    setEditingShift(null);

    addToast(
      "success",
      "Perubahan Shift Disimpan",
      `Konfigurasi jam kerja master shift "${shiftName}" telah diperbarui.`
    );
  };

  // Handle Assign Shift Submit
  const handleAssignShiftSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `SA-${100 + assignments.length + 1}`;
    const newAssign: ShiftAssignment = {
      id: newId,
      employeeCode: assignEmpCode,
      employeeName: assignEmpName,
      department: assignDepartment,
      shiftName: assignShiftName,
      date: assignDate,
    };
    setAssignments((prev) => [newAssign, ...prev]);
    setShowAssignShiftModal(false);

    addToast(
      "success",
      "Plotting Shift Berhasil!",
      `Jadwal ${newAssign.shiftName} telah ditugaskan ke ${newAssign.employeeName} (${newAssign.date}).`
    );
  };

  // Handle Edit Assignment Submit
  const handleEditAssignmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAssignment) return;
    setAssignments((prev) =>
      prev.map((item) => (item.id === editingAssignment.id ? editingAssignment : item))
    );
    const empName = editingAssignment.employeeName;
    setEditingAssignment(null);

    addToast(
      "success",
      "Plotting Diperbarui!",
      `Jadwal shift harian untuk ${empName} berhasil disesuaikan.`
    );
  };

  return (
    <div className="space-y-6 relative">
      <ToastContainer toasts={toasts} onClose={removeToast} />

      {/* Header & Controls */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h3 className="text-base font-semibold text-gray-800 dark:text-white">
              Manajemen Shift & Jam Kerja Karyawan
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Kelola master jadwal operasional, kalkulasi durasi kerja, dan plotting shift harian (PRD §3.3 & §7)
            </p>
          </div>
          <div className="flex items-center gap-3">
            {activeTab === "master" ? (
              <button
                onClick={() => setShowAddShiftModal(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600 transition shadow-sm"
              >
                + Master Shift Baru
              </button>
            ) : (
              <button
                onClick={() => setShowAssignShiftModal(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600 transition shadow-sm"
              >
                + Plotting Shift Karyawan
              </button>
            )}
          </div>
        </div>

        {/* Tab Toggle */}
        <div className="flex border-b border-gray-200 dark:border-gray-800">
          <button
            onClick={() => setActiveTab("master")}
            className={`pb-3 px-4 text-sm font-medium transition border-b-2 ${
              activeTab === "master"
                ? "border-brand-500 text-brand-500 font-semibold"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400"
            }`}
          >
            Master Jam Shift ({shifts.length})
          </button>
          <button
            onClick={() => setActiveTab("assignment")}
            className={`pb-3 px-4 text-sm font-medium transition border-b-2 ${
              activeTab === "assignment"
                ? "border-brand-500 text-brand-500 font-semibold"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400"
            }`}
          >
            Plotting Jadwal Harian ({assignments.length})
          </button>
        </div>

        {/* Content Tabs */}
        <div className="pt-6">
          {activeTab === "master" ? (
            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
              <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
                <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:bg-gray-800/50 dark:text-gray-400">
                  <tr>
                    <th className="px-6 py-4">ID</th>
                    <th className="px-6 py-4">Nama Shift</th>
                    <th className="px-6 py-4">Jam Masuk (Clock-In)</th>
                    <th className="px-6 py-4">Jam Pulang (Clock-Out)</th>
                    <th className="px-6 py-4 text-center">Total Jam Kerja</th>
                    <th className="px-6 py-4">Toleransi Telat</th>
                    <th className="px-6 py-4 text-center">Karyawan Aktif</th>
                    <th className="px-6 py-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {shifts.map((s) => (
                    <tr key={s.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50">
                      <td className="px-6 py-4 font-mono text-xs text-gray-500">{s.id}</td>
                      <td className="px-6 py-4 font-medium text-gray-800 dark:text-white">{s.name}</td>
                      <td className="px-6 py-4 font-mono font-semibold text-brand-500">{s.startTime}</td>
                      <td className="px-6 py-4 font-mono font-semibold text-gray-700 dark:text-gray-300">{s.endTime}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400 border border-brand-200 dark:border-brand-500/20 font-mono">
                          ⏱️ {s.totalWorkHours} Jam
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Badge color="warning">{s.toleranceMinutes} Menit</Badge>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="font-semibold text-gray-800 dark:text-white">{s.activeEmployees} Karyawan</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => setEditingShift(s)}
                          className="text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                          Edit Shift
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
              <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
                <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:bg-gray-800/50 dark:text-gray-400">
                  <tr>
                    <th className="px-6 py-4">ID Plotting</th>
                    <th className="px-6 py-4">Kode & Karyawan</th>
                    <th className="px-6 py-4">Departemen</th>
                    <th className="px-6 py-4">Jadwal Shift</th>
                    <th className="px-6 py-4">Tanggal Plotting</th>
                    <th className="px-6 py-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {assignments.map((a) => (
                    <tr key={a.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50">
                      <td className="px-6 py-4 font-mono text-xs text-gray-500">{a.id}</td>
                      <td className="px-6 py-4 font-medium text-gray-800 dark:text-white">
                        <div>
                          <span>{a.employeeName}</span>
                          <span className="block text-xs font-mono text-gray-400">{a.employeeCode}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">{a.department}</td>
                      <td className="px-6 py-4">
                        <Badge color="info">{a.shiftName}</Badge>
                      </td>
                      <td className="px-6 py-4 font-mono">{a.date}</td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => setEditingAssignment(a)}
                          className="text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                          Ubah Shift
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* ─────────────────────────────────────────────
          1. MODAL TAMBAH MASTER SHIFT BARU
      ───────────────────────────────────────────── */}
      {showAddShiftModal && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-gray-900/75 backdrop-blur-md">
          <div className="w-full max-w-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-2xl relative">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              Tambah Master Shift Kerja Baru
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-5">
              Definisikan jam operasional masuk, jam pulang, dan batas toleransi (PRD §3.3).
            </p>

            <form onSubmit={handleAddShiftSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nama Shift <span className="text-error-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Shift Lembur Khusus"
                  value={newShiftName}
                  onChange={(e) => setNewShiftName(e.target.value)}
                  className="w-full h-11 px-4 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Jam Masuk (Clock-In) <span className="text-error-500">*</span>
                  </label>
                  <input
                    type="time"
                    value={newStartTime}
                    onChange={(e) => setNewStartTime(e.target.value)}
                    className="w-full h-11 px-4 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:border-brand-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Jam Pulang (Clock-Out) <span className="text-error-500">*</span>
                  </label>
                  <input
                    type="time"
                    value={newEndTime}
                    onChange={(e) => setNewEndTime(e.target.value)}
                    className="w-full h-11 px-4 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:border-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Total Jam Kerja Calculated Preview */}
              <div className="p-3 bg-brand-50/60 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20 rounded-xl flex items-center justify-between">
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  Estimasi Total Durasi Kerja:
                </span>
                <span className="text-xs font-bold font-mono text-brand-600 dark:text-brand-400">
                  {calculateTotalWorkHours(newStartTime, newEndTime)} Jam Kerja
                </span>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Batas Toleransi Telat (Menit) <span className="text-error-500">*</span>
                </label>
                <input
                  type="number"
                  placeholder="15"
                  value={newTolerance}
                  onChange={(e) => setNewTolerance(Number(e.target.value))}
                  className="w-full h-11 px-4 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                <button
                  type="button"
                  onClick={() => setShowAddShiftModal(false)}
                  className="px-4 py-2.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition dark:bg-gray-800 dark:text-gray-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-brand-500 rounded-xl hover:bg-brand-600 transition shadow-sm"
                >
                  Simpan Master Shift
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────
          2. MODAL EDIT MASTER SHIFT
      ───────────────────────────────────────────── */}
      {editingShift && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-gray-900/75 backdrop-blur-md">
          <div className="w-full max-w-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-2xl relative">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              Edit Master Shift — {editingShift.id}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-5">
              Perbarui konfigurasi jam kerja dan batas toleransi.
            </p>

            <form onSubmit={handleEditShiftSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Shift</label>
                <input
                  type="text"
                  value={editingShift.name}
                  onChange={(e) => setEditingShift({ ...editingShift, name: e.target.value })}
                  className="w-full h-11 px-4 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Jam Masuk</label>
                  <input
                    type="time"
                    value={editingShift.startTime}
                    onChange={(e) => setEditingShift({ ...editingShift, startTime: e.target.value })}
                    className="w-full h-11 px-4 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:border-brand-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Jam Pulang</label>
                  <input
                    type="time"
                    value={editingShift.endTime}
                    onChange={(e) => setEditingShift({ ...editingShift, endTime: e.target.value })}
                    className="w-full h-11 px-4 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:border-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-3 bg-brand-50/60 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20 rounded-xl flex items-center justify-between">
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  Kalkulasi Durasi Kerja Baru:
                </span>
                <span className="text-xs font-bold font-mono text-brand-600 dark:text-brand-400">
                  {calculateTotalWorkHours(editingShift.startTime, editingShift.endTime)} Jam Kerja
                </span>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Toleransi (Menit)</label>
                <input
                  type="number"
                  value={editingShift.toleranceMinutes}
                  onChange={(e) => setEditingShift({ ...editingShift, toleranceMinutes: Number(e.target.value) })}
                  className="w-full h-11 px-4 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                <button
                  type="button"
                  onClick={() => setEditingShift(null)}
                  className="px-4 py-2.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition dark:bg-gray-800 dark:text-gray-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-brand-500 rounded-xl hover:bg-brand-600 transition shadow-sm"
                >
                  Perbarui Shift
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────
          3. MODAL PLOTTING SHIFT KARYAWAN
      ───────────────────────────────────────────── */}
      {showAssignShiftModal && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-gray-900/75 backdrop-blur-md">
          <div className="w-full max-w-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-2xl relative">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              Plotting Penugasan Shift Karyawan
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-5">
              Tentukan rujukan jadwal shift kerja karyawan untuk tanggal spesifik.
            </p>

            <form onSubmit={handleAssignShiftSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Pilih Karyawan</label>
                <select
                  value={assignEmpName}
                  onChange={(e) => {
                    setAssignEmpName(e.target.value);
                    if (e.target.value === "Budi Santoso") { setAssignEmpCode("EMP-001"); setAssignDepartment("IT"); }
                    else if (e.target.value === "Siti Aminah") { setAssignEmpCode("EMP-002"); setAssignDepartment("HR"); }
                    else { setAssignEmpCode("EMP-003"); setAssignDepartment("Marketing"); }
                  }}
                  className="w-full h-11 px-4 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:border-brand-500 focus:outline-none"
                >
                  <option value="Budi Santoso">Budi Santoso (EMP-001 - IT)</option>
                  <option value="Siti Aminah">Siti Aminah (EMP-002 - HR)</option>
                  <option value="Andi Saputra">Andi Saputra (EMP-003 - Marketing)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Jadwal Shift Rujukan</label>
                <select
                  value={assignShiftName}
                  onChange={(e) => setAssignShiftName(e.target.value)}
                  className="w-full h-11 px-4 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:border-brand-500 focus:outline-none"
                >
                  {shifts.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name} ({s.startTime} - {s.endTime} | {s.totalWorkHours} Jam)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Tanggal Berlaku</label>
                <input
                  type="date"
                  value={assignDate}
                  onChange={(e) => setAssignDate(e.target.value)}
                  className="w-full h-11 px-4 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                <button
                  type="button"
                  onClick={() => setShowAssignShiftModal(false)}
                  className="px-4 py-2.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition dark:bg-gray-800 dark:text-gray-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-brand-500 rounded-xl hover:bg-brand-600 transition shadow-sm"
                >
                  Simpan Plotting Shift
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────
          4. MODAL EDIT PLOTTING SHIFT
      ───────────────────────────────────────────── */}
      {editingAssignment && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-gray-900/75 backdrop-blur-md">
          <div className="w-full max-w-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-2xl relative">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              Ubah Plotting Shift — {editingAssignment.employeeName}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-5">
              Ganti jadwal shift rujukan untuk tanggal {editingAssignment.date}.
            </p>

            <form onSubmit={handleEditAssignmentSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Jadwal Shift Baru</label>
                <select
                  value={editingAssignment.shiftName}
                  onChange={(e) => setEditingAssignment({ ...editingAssignment, shiftName: e.target.value })}
                  className="w-full h-11 px-4 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:border-brand-500 focus:outline-none"
                >
                  {shifts.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name} ({s.startTime} - {s.endTime} | {s.totalWorkHours} Jam)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Tanggal</label>
                <input
                  type="date"
                  value={editingAssignment.date}
                  onChange={(e) => setEditingAssignment({ ...editingAssignment, date: e.target.value })}
                  className="w-full h-11 px-4 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                <button
                  type="button"
                  onClick={() => setEditingAssignment(null)}
                  className="px-4 py-2.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition dark:bg-gray-800 dark:text-gray-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-brand-500 rounded-xl hover:bg-brand-600 transition shadow-sm"
                >
                  Perbarui Plotting
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
