"use client";
import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Layers, Briefcase, Search } from "lucide-react";

export default function MasterDataPage() {
  const [activeTab, setActiveTab] = useState<"departments" | "positions">("departments");
  const [departments, setDepartments] = useState<any[]>([]);
  const [positions, setPositions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [formData, setFormData] = useState<any>({});
  const [submitting, setSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const showToast = (type: "success" | "error", text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [deptRes, posRes] = await Promise.all([
        fetch("http://localhost:3002/api/departments"),
        fetch("http://localhost:3002/api/positions")
      ]);
      const deptData = await deptRes.json();
      const posData = await posRes.json();
      
      if (deptData.success) setDepartments(deptData.data);
      if (posData.success) setPositions(posData.data);
    } catch (error) {
      console.error("Failed to fetch master data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = (mode: "add" | "edit", data?: any) => {
    setModalMode(mode);
    setFormData(data || { code: "", name: "", departmentId: "" });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const endpoint = activeTab === "departments" ? "/api/departments" : "/api/positions";
      const method = modalMode === "add" ? "POST" : "PUT";
      const url = `http://localhost:3002${endpoint}${modalMode === "edit" ? `/${formData.id}` : ""}`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      const result = await res.json();
      
      if (!res.ok || !result.success) throw new Error(result.message || "Gagal menyimpan data");
      
      showToast("success", `${activeTab === "departments" ? "Departemen" : "Jabatan"} berhasil ${modalMode === "add" ? "ditambahkan" : "diperbarui"}!`);
      handleCloseModal();
      fetchData();
    } catch (error: any) {
      showToast("error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus data ini?")) return;
    
    try {
      const endpoint = activeTab === "departments" ? "/api/departments" : "/api/positions";
      const res = await fetch(`http://localhost:3002${endpoint}/${id}`, {
        method: "DELETE"
      });
      
      const result = await res.json();
      if (!res.ok || !result.success) throw new Error(result.message || "Gagal menghapus data");
      
      showToast("success", "Data berhasil dihapus!");
      fetchData();
    } catch (error: any) {
      showToast("error", error.message);
    }
  };

  const filteredData = (activeTab === "departments" ? departments : positions).filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Data Master</h1>
          <p className="text-gray-500 mt-1">Kelola data Departemen dan Jabatan secara terpusat.</p>
        </div>
        <button 
          onClick={() => handleOpenModal("add")}
          className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors"
        >
          <Plus size={18} />
          Tambah {activeTab === "departments" ? "Departemen" : "Jabatan"}
        </button>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 text-white ${toastMessage.type === "success" ? "bg-green-600" : "bg-red-600"} animate-in fade-in slide-in-from-top-5`}>
          {toastMessage.text}
        </div>
      )}

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100/80 p-1 rounded-xl w-max">
        <button
          onClick={() => setActiveTab("departments")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
            activeTab === "departments" 
              ? "bg-white text-brand-700 shadow-sm" 
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/50"
          }`}
        >
          <Layers size={18} />
          Departemen
        </button>
        <button
          onClick={() => setActiveTab("positions")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
            activeTab === "positions" 
              ? "bg-white text-brand-700 shadow-sm" 
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/50"
          }`}
        >
          <Briefcase size={18} />
          Jabatan
        </button>
      </div>

      {/* Content area */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center gap-3">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Cari berdasarkan kode atau nama..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50/50 text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Kode</th>
                <th className="px-6 py-4">Nama {activeTab === "departments" ? "Departemen" : "Jabatan"}</th>
                {activeTab === "positions" && <th className="px-6 py-4">Departemen Induk</th>}
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-400">Memuat data...</td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-400">Tidak ada data ditemukan.</td>
                </tr>
              ) : (
                filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-gray-900">{item.code}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                    {activeTab === "positions" && (
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                          {departments.find(d => d.id === item.departmentId)?.name || "Unknown"}
                        </span>
                      </td>
                    )}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleOpenModal("edit", item)}
                          className="p-2 text-gray-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Hapus"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">
                {modalMode === "add" ? "Tambah" : "Edit"} {activeTab === "departments" ? "Departemen" : "Jabatan"}
              </h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                &times;
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Kode *</label>
                <input 
                  type="text"
                  required
                  value={formData.code || ""}
                  onChange={e => setFormData({...formData, code: e.target.value.toUpperCase()})}
                  placeholder={activeTab === "departments" ? "Misal: IT, HR, FIN" : "Misal: SE, MGR, SPV"}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-mono"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama *</label>
                <input 
                  type="text"
                  required
                  value={formData.name || ""}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  placeholder={activeTab === "departments" ? "Misal: Information Technology" : "Misal: Software Engineer"}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                />
              </div>

              {activeTab === "positions" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Departemen Induk *</label>
                  <select 
                    required
                    value={formData.departmentId || ""}
                    onChange={e => setFormData({...formData, departmentId: e.target.value})}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                  >
                    <option value="" disabled>Pilih Departemen...</option>
                    {departments.map(dept => (
                      <option key={dept.id} value={dept.id}>{dept.name} ({dept.code})</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={handleCloseModal}
                  className="flex-1 py-2.5 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  disabled={submitting}
                  className="flex-1 py-2.5 px-4 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 focus:ring-4 focus:ring-brand-500/20 disabled:opacity-50 transition-all"
                >
                  {submitting ? "Menyimpan..." : "Simpan Data"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
