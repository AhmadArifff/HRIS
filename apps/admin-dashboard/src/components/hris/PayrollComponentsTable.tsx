"use client";
import React, { useState } from "react";
import Badge from "../ui/badge/Badge";

interface PayrollComponent {
  id: string;
  name: string;
  type: "Allowance" | "Deduction";
  amount: string;
  taxable: boolean;
}

const initialData: PayrollComponent[] = [
  { id: "COMP-01", name: "Tunjangan Transportasi", type: "Allowance", amount: "Rp 1.000.000", taxable: true },
  { id: "COMP-02", name: "Tunjangan Makan", type: "Allowance", amount: "Rp 1.500.000", taxable: true },
  { id: "COMP-03", name: "Potongan Keterlambatan", type: "Deduction", amount: "- Rp 50.000 / hari", taxable: false },
  { id: "COMP-04", name: "BPJS Kesehatan", type: "Deduction", amount: "- 1%", taxable: false },
];

export const PayrollComponentsTable = () => {
  const [data, setData] = useState<PayrollComponent[]>(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<PayrollComponent | null>(null);

  // Form State
  const [newName, setNewName] = useState("");
  const [newType, setNewType] = useState<"Allowance" | "Deduction">("Allowance");
  const [newAmount, setNewAmount] = useState("");
  const [newTaxable, setNewTaxable] = useState(true);

  // Handle Add Component Submit
  const handleAddComponentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newAmount.trim()) {
      alert("⚠️ Guard Clause: Nama dan Besaran Komponen Wajib Diisi.");
      return;
    }
    const newId = `COMP-0${data.length + 1}`;
    const newItem: PayrollComponent = {
      id: newId,
      name: newName,
      type: newType,
      amount: newAmount,
      taxable: newTaxable,
    };
    setData((prev) => [...prev, newItem]);
    console.log("[AUDIT_LOG] PAYROLL_COMPONENT_CREATED", newItem);
    setShowAddModal(false);
    setNewName("");
    setNewAmount("");
  };

  // Handle Edit Component Submit
  const handleEditComponentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    setData((prev) =>
      prev.map((item) => (item.id === editingItem.id ? editingItem : item))
    );
    console.log("[AUDIT_LOG] PAYROLL_COMPONENT_UPDATED", editingItem);
    setEditingItem(null);
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
            Master Komponen Gaji
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Kelola template penambahan (Allowance) dan potongan (Deduction) (PRD §7.4)
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600 transition shadow-sm"
        >
          + Tambah Komponen
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
              placeholder="Cari komponen..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full rounded-xl border border-gray-300 bg-white py-2 pl-9 pr-4 text-sm text-gray-800 shadow-theme-xs focus:border-brand-500 focus:outline-none sm:w-64 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 fill-current text-gray-400" viewBox="0 0 20 20"><path fillRule="evenodd" clipRule="evenodd" d="M8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4ZM2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 9.29583 13.5873 10.495 12.8856 11.4714L17.7071 16.2929C18.0976 16.6834 18.0976 17.3166 17.7071 16.2929C17.3166 18.0976 16.6834 18.0976 16.2929 17.7071L11.4714 12.8856C10.495 13.5873 9.29583 14 8 14C4.68629 14 2 11.3137 2 8Z" /></svg>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
            <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:bg-gray-800/50 dark:text-gray-400">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Nama Komponen</th>
                <th className="px-6 py-4">Tipe</th>
                <th className="px-6 py-4">Besaran / Rumus</th>
                <th className="px-6 py-4 text-center">Pajak (Taxable)</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {displayedData.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50">
                  <td className="px-6 py-4 font-mono text-xs text-gray-500">{record.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-800 dark:text-white">
                    {record.name}
                  </td>
                  <td className="px-6 py-4">
                    <Badge color={record.type === "Allowance" ? "success" : "error"}>
                      {record.type === "Allowance" ? "Tunjangan" : "Potongan"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 font-mono">{record.amount}</td>
                  <td className="px-6 py-4 text-center">
                    <Badge color={record.taxable ? "warning" : "light"}>
                      {record.taxable ? "Ya" : "Tidak"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setEditingItem(record)}
                      className="text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      Edit Komponen
                    </button>
                  </td>
                </tr>
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

      {/* ─────────────────────────────────────────────
          1. MODAL TAMBAH KOMPONEN GAJI
      ───────────────────────────────────────────── */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-gray-900/75 backdrop-blur-md">
          <div className="w-full max-w-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-2xl relative">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              Tambah Komponen Gaji Baru
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-5">
              Atur komponen tunjangan (Allowance) atau potongan (Deduction).
            </p>

            <form onSubmit={handleAddComponentSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nama Komponen <span className="text-error-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Tunjangan Jabatan / Potongan Telat"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full h-11 px-4 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tipe Komponen <span className="text-error-500">*</span>
                </label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as "Allowance" | "Deduction")}
                  className="w-full h-11 px-4 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:border-brand-500 focus:outline-none"
                >
                  <option value="Allowance">Tunjangan (Allowance)</option>
                  <option value="Deduction">Potongan (Deduction)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Besaran / Rumus <span className="text-error-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Rp 2.000.000 / - Rp 50.000 / hari"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  className="w-full h-11 px-4 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="taxableCheck"
                  checked={newTaxable}
                  onChange={(e) => setNewTaxable(e.target.checked)}
                  className="w-4 h-4 text-brand-500 border-gray-300 rounded focus:ring-brand-500"
                />
                <label htmlFor="taxableCheck" className="text-xs text-gray-700 dark:text-gray-300 cursor-pointer">
                  Kena Pajak PPh 21 (Taxable)
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition dark:bg-gray-800 dark:text-gray-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-brand-500 rounded-xl hover:bg-brand-600 transition"
                >
                  Simpan Komponen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────
          2. MODAL EDIT KOMPONEN GAJI
      ───────────────────────────────────────────── */}
      {editingItem && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-gray-900/75 backdrop-blur-md">
          <div className="w-full max-w-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-2xl relative">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              Edit Komponen Gaji — {editingItem.id}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-5">
              Ubah besaran atau status pemotongan pajak PPh 21.
            </p>

            <form onSubmit={handleEditComponentSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Komponen</label>
                <input
                  type="text"
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  className="w-full h-11 px-4 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Besaran / Rumus</label>
                <input
                  type="text"
                  value={editingItem.amount}
                  onChange={(e) => setEditingItem({ ...editingItem, amount: e.target.value })}
                  className="w-full h-11 px-4 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="editTaxableCheck"
                  checked={editingItem.taxable}
                  onChange={(e) => setEditingItem({ ...editingItem, taxable: e.target.checked })}
                  className="w-4 h-4 text-brand-500 border-gray-300 rounded focus:ring-brand-500"
                />
                <label htmlFor="editTaxableCheck" className="text-xs text-gray-700 dark:text-gray-300 cursor-pointer">
                  Kena Pajak PPh 21 (Taxable)
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 text-xs font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition dark:bg-gray-800 dark:text-gray-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-brand-500 rounded-xl hover:bg-brand-600 transition"
                >
                  Perbarui Komponen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
