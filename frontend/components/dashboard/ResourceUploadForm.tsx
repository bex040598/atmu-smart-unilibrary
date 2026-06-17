"use client";
import { useState } from "react";
import { resourcesApi } from "@/lib/api";
import { Upload, File, CheckCircle, AlertCircle } from "lucide-react";

const MATERIAL_TYPES = [
  { value: "textbook", label: "Darslik" },
  { value: "study_guide", label: "O'quv qo'llanma" },
  { value: "lecture", label: "Ma'ruza matni" },
  { value: "lab_work", label: "Laboratoriya ishi" },
  { value: "practical", label: "Amaliy mashg'ulot" },
  { value: "presentation", label: "Taqdimot" },
  { value: "test", label: "Test" },
  { value: "video", label: "Video dars" },
  { value: "article", label: "Ilmiy maqola" },
  { value: "thesis", label: "Bitiruv ishi" },
  { value: "course_work", label: "Kurs ishi" },
  { value: "methodology", label: "Metodik qo'llanma" },
  { value: "code_sample", label: "Kod namunasi" },
  { value: "dataset", label: "Dataset" },
];

const DEPARTMENTS = [
  { id: 1, name: "Axborot texnologiyalari kafedrasi" },
  { id: 2, name: "Matematika kafedrasi" },
  { id: 3, name: "Iqtisodiyot kafedrasi" },
  { id: 4, name: "Filologiya kafedrasi" },
  { id: 5, name: "Tarix kafedrasi" },
  { id: 6, name: "Pedagogika kafedrasi" },
];

export default function ResourceUploadForm({ onSuccess }: { onSuccess?: () => void }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    department_id: "",
    material_type: "lecture",
    language: "uz",
    course: "",
    semester: "",
    academic_year: "2024-2025",
    tags: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const update = (k: string, v: string) => setForm(prev => ({ ...prev, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.department_id) {
      setError("Iltimos, majburiy maydonlarni to'ldiring");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (v) fd.append(k, v);
      });
      if (file) fd.append("file", file);
      await resourcesApi.upload(fd);
      setSuccess(true);
      onSuccess?.();
    } catch (err: any) {
      setError(err.response?.data?.detail || "Xato yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-gray-100">
        <CheckCircle className="w-14 h-14 text-emerald-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-[#061B3A] mb-2">Resurs yuklandi!</h3>
        <p className="text-gray-500 text-sm">Kutubxonachi yoki kafedra mudiri tekshirgandan so'ng nashr etiladi.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-xl text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Resurs nomi *</label>
        <input
          value={form.title}
          onChange={e => update("title", e.target.value)}
          required
          placeholder="Masalan: Ma'lumotlar bazasi - 3-semestr ma'ruzalar"
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1457A8]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Tavsif</label>
        <textarea
          value={form.description}
          onChange={e => update("description", e.target.value)}
          placeholder="Resurs haqida qisqacha ma'lumot..."
          rows={3}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1457A8] resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Kafedra *</label>
          <select
            value={form.department_id}
            onChange={e => update("department_id", e.target.value)}
            required
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1457A8]"
          >
            <option value="">Tanlang</option>
            {DEPARTMENTS.map(d => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Material turi</label>
          <select
            value={form.material_type}
            onChange={e => update("material_type", e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1457A8]"
          >
            {MATERIAL_TYPES.map(t => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Til</label>
          <select
            value={form.language}
            onChange={e => update("language", e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1457A8]"
          >
            <option value="uz">O'zbekcha</option>
            <option value="ru">Ruscha</option>
            <option value="en">Inglizcha</option>
            <option value="tr">Turkcha</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Kurs</label>
          <select
            value={form.course}
            onChange={e => update("course", e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1457A8]"
          >
            <option value="">—</option>
            {[1, 2, 3, 4].map(c => <option key={c} value={c}>{c}-kurs</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Semestr</label>
          <select
            value={form.semester}
            onChange={e => update("semester", e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1457A8]"
          >
            <option value="">—</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(s => <option key={s} value={s}>{s}-semestr</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Teglar (vergul bilan)</label>
        <input
          value={form.tags}
          onChange={e => update("tags", e.target.value)}
          placeholder="sql, database, postgresql"
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1457A8]"
        />
      </div>

      {/* File upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Fayl yuklash</label>
        <label className={`flex items-center justify-center gap-3 w-full py-8 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
          file ? "border-[#1457A8] bg-blue-50" : "border-gray-200 hover:border-[#1457A8]/50"
        }`}>
          <input
            type="file"
            onChange={e => setFile(e.target.files?.[0] || null)}
            className="hidden"
            accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.mp4,.zip"
          />
          {file ? (
            <div className="flex items-center gap-2 text-[#1457A8]">
              <File className="w-5 h-5" />
              <span className="text-sm font-medium">{file.name}</span>
            </div>
          ) : (
            <div className="text-center text-gray-400">
              <Upload className="w-8 h-8 mx-auto mb-2" />
              <div className="text-sm">PDF, DOCX, PPTX, MP4 yoki ZIP</div>
              <div className="text-xs mt-1">Maksimal hajm: 50 MB</div>
            </div>
          )}
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 bg-[#1457A8] hover:bg-[#0B3D73] text-white font-semibold rounded-xl transition-colors disabled:opacity-60"
      >
        {loading ? "Yuklanmoqda..." : "Resursni yuklash va ko'rib chiqishga yuborish"}
      </button>
    </form>
  );
}
