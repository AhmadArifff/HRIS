"use client";
import React, { useState } from "react";
import Badge from "../ui/badge/Badge";
import Button from "../ui/button/Button";

export interface MasterShift {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
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

const mockMasterShifts: MasterShift[] = [
  { id: "SFT-01", name: "Shift Pagi (Normal)", startTime: "08:00", endTime: "17:00", toleranceMinutes: 15, activeEmployees: 32 },
  { id: "SFT-02", name: "Shift Siang", startTime: "13:00", endTime: "21:00", toleranceMinutes: 10, activeEmployees: 12 },
  { id: "SFT-03", name: "Shift Malam", startTime: "21:00", endTime: "06:00", toleranceMinutes: 15, activeEmployees: 8 },
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
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddShift = () => {
    alert("✅ Membuka Form Tambah Master Shift Kerja Baru...");
    console.log("[AUDIT_LOG] OPEN_ADD_SHIFT_MODAL", { timestamp: new Date().toISOString() });
  };

  const handleAssignShift = () => {
    alert("✅ Membuka Modal Penjadwalan Shift Karyawan...");
    console.log("[AUDIT_LOG] OPEN_ASSIGN_SHIFT_MODAL", { timestamp: new Date().toISOString() });
  };

  return (
    <div className="space-y-6">
      {/* Header & Tabs */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h3 className="text-base font-semibold text-gray-800 dark:text-white">
              Manajemen Shift & Jam Kerja Karyawan
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Kelola master jadwal operational dan plotting shift harian (PRD §3.3)
            </p>
          </div>
          <div className="flex items-center gap-3">
            {activeTab === "master" ? (
              <button
                onClick={handleAddShift}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600 transition"
              >
                + Master Shift Baru
              </button>
            ) : (
              <button
                onClick={handleAssignShift}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600 transition"
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
                    <th className="px-6 py-4">Toleransi Telat</th>
                    <th className="px-6 py-4 text-center">Jumlah Karyawan</th>
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
                      <td className="px-6 py-4">
                        <Badge color="warning">{s.toleranceMinutes} Menit</Badge>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="font-semibold text-gray-800 dark:text-white">{s.activeEmployees} Karyawan</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => alert(`Edit Master Shift: ${s.name}`)}
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
                          onClick={() => alert(`Ubah Plotting Shift untuk ${a.employeeName}`)}
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
    </div>
  );
};
