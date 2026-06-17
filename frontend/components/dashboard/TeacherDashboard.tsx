"use client";
import { useState, useEffect } from "react";
import { Link, useRouter } from "@/i18n/navigation";
import { getUser, isAuthenticated } from "@/lib/auth";
import { resourcesApi } from "@/lib/api";
import { Upload, CheckCircle, Clock, XCircle, Eye, BookOpen, TrendingUp } from "lucide-react";
import { MATERIAL_TYPE_LABELS, STATUS_COLORS } from "@/lib/utils";
import ResourceUploadForm from "./ResourceUploadForm";

export default function TeacherDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [resources, setResources] = useState<any[]>([]);
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) { router.push("/auth/login"); return; }
    const u = getUser();
    setUser(u);
    if (u) {
      resourcesApi.list({ status: undefined }).then(r => setResources(r.data || [])).catch(() => {});
    }
  }, []);

  const approved = resources.filter(r => r.status === "approved");
  const pending = resources.filter(r => r.status === "pending_review");
  const rejected = resources.filter(r => r.status === "rejected");

  if (showUpload) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setShowUpload(false)} className="text-[#1457A8] hover:underline text-sm">← Orqaga</button>
          <h2 className="font-bold text-[#061B3A] text-xl">Yangi resurs yuklash</h2>
        </div>
        <ResourceUploadForm onSuccess={() => { setShowUpload(false); }} />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#061B3A]">O'qituvchi paneli</h1>
          <p className="text-gray-500 text-sm">{user?.full_name}</p>
        </div>
        <button
          onClick={() => setShowUpload(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#1457A8] text-white font-semibold rounded-xl hover:bg-[#0B3D73] transition-colors"
        >
          <Upload className="w-4 h-4" />
          Resurs yuklash
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { icon: BookOpen, v: resources.length, l: "Jami resurslar", color: "text-blue-600", bg: "bg-blue-50" },
          { icon: CheckCircle, v: approved.length, l: "Tasdiqlangan", color: "text-emerald-600", bg: "bg-emerald-50" },
          { icon: Clock, v: pending.length, l: "Kutilmoqda", color: "text-amber-600", bg: "bg-amber-50" },
          { icon: XCircle, v: rejected.length, l: "Rad etilgan", color: "text-red-600", bg: "bg-red-50" },
        ].map(({ icon: Icon, v, l, color, bg }) => (
          <div key={l} className={`${bg} rounded-2xl p-5`}>
            <Icon className={`w-6 h-6 ${color} mb-2`} />
            <div className={`text-3xl font-bold ${color}`}>{v}</div>
            <div className="text-sm text-gray-600 mt-1">{l}</div>
          </div>
        ))}
      </div>

      {/* Resources list */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h3 className="font-bold text-[#061B3A] mb-4">Mening resurslarim</h3>
        {resources.length === 0 ? (
          <div className="text-center py-12">
            <Upload className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">Hali resurslar yo'q</p>
            <button onClick={() => setShowUpload(true)} className="mt-3 text-sm text-[#1457A8] hover:underline">
              Birinchi resursni yuklash →
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {resources.map((r: any) => (
              <div key={r.id} className="flex items-center gap-3 p-4 border border-gray-100 rounded-xl hover:shadow-sm transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5 text-[#1457A8]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-[#172033] truncate">{r.title}</div>
                  <div className="text-xs text-gray-400 mt-0.5">
                    {MATERIAL_TYPE_LABELS[r.material_type] || r.material_type} · {r.academic_year || "2024-2025"}
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Eye className="w-3.5 h-3.5" />{r.view_count}
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_COLORS[r.status] || "bg-gray-100 text-gray-600"}`}>
                    {r.status === "pending_review" ? "Kutilmoqda" :
                     r.status === "approved" ? "Tasdiqlandi" :
                     r.status === "rejected" ? "Rad etildi" :
                     r.status === "draft" ? "Qoralama" : r.status}
                  </span>
                  {r.status === "draft" && (
                    <button
                      onClick={() => resourcesApi.submit(r.id).then(() => window.location.reload())}
                      className="text-xs text-[#1457A8] border border-[#1457A8] px-2 py-1 rounded-lg hover:bg-blue-50"
                    >
                      Yuborish
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
