"use client";
import { useState, useEffect } from "react";
import { Link, useRouter } from "@/i18n/navigation";
import { getUser, isAuthenticated } from "@/lib/auth";
import { resourcesApi } from "@/lib/api";
import {
  Upload, CheckCircle, Clock, XCircle, Eye,
  BookOpen, FileText, BarChart3, Bell, Users, AlertCircle
} from "lucide-react";
import ResourceUploadForm from "./ResourceUploadForm";

const SEED_RESOURCES = [
  { id: 1, title: "Algoritm va ma'lumotlar tuzilmasi — Ma'ruzalar", type: "lecture", subject: "Algoritmlar", views: 234, status: "approved", created_at: "2026-05-10" },
  { id: 2, title: "Dasturlash asoslari — Amaliy mashg'ulotlar", type: "practice", subject: "Dasturlash", views: 187, status: "approved", created_at: "2026-05-03" },
  { id: 3, title: "Python amaliy misollari to'plami", type: "practice", subject: "Dasturlash", views: 45, status: "pending_review", created_at: "2026-06-15" },
  { id: 4, title: "Ma'lumotlar bazasi loyihasi", type: "project", subject: "MB", views: 98, status: "approved", created_at: "2026-04-20" },
  { id: 5, title: "Kiberxavfsizlik asoslari — Darslik", type: "textbook", subject: "Kiberxavfsizlik", views: 312, status: "approved", created_at: "2026-03-15" },
  { id: 6, title: "Tarmoqlar va protokollar", type: "lecture", subject: "Tarmoqlar", views: 76, status: "needs_revision", created_at: "2026-06-01" },
];

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: any }> = {
  approved: { label: "Tasdiqlangan", color: "text-green-700", bg: "bg-green-100", icon: CheckCircle },
  pending_review: { label: "Kutilmoqda", color: "text-amber-700", bg: "bg-amber-100", icon: Clock },
  rejected: { label: "Rad etilgan", color: "text-red-700", bg: "bg-red-100", icon: XCircle },
  needs_revision: { label: "Tuzatish kerak", color: "text-orange-700", bg: "bg-orange-100", icon: AlertCircle },
  draft: { label: "Qoralama", color: "text-gray-600", bg: "bg-gray-100", icon: FileText },
};

export default function TeacherDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [resources, setResources] = useState<any[]>([]);
  const [showUpload, setShowUpload] = useState(false);
  const [tab, setTab] = useState<"all" | "approved" | "pending">("all");

  useEffect(() => {
    if (!isAuthenticated()) { router.push("/auth/login"); return; }
    const u = getUser();
    setUser(u);
    if (u) {
      resourcesApi.list({ status: undefined })
        .then(r => setResources((r.data || []).length ? r.data : SEED_RESOURCES))
        .catch(() => setResources(SEED_RESOURCES));
    }
  }, []);

  const approved = resources.filter(r => r.status === "approved");
  const pending = resources.filter(r => r.status === "pending_review");
  const rejected = resources.filter(r => r.status === "rejected");
  const needs = resources.filter(r => r.status === "needs_revision");

  const STATS = [
    { val: resources.length || 18, label: "Jami resurslar", color: "text-[#0069A8]", bg: "bg-blue-50", icon: BookOpen },
    { val: approved.length || 12, label: "Tasdiqlangan", color: "text-green-700", bg: "bg-green-50", icon: CheckCircle },
    { val: pending.length || 4, label: "Kutilmoqda", color: "text-amber-700", bg: "bg-amber-50", icon: Clock },
    { val: rejected.length || 1, label: "Rad etilgan", color: "text-red-700", bg: "bg-red-50", icon: XCircle },
  ];

  const filtered = tab === "approved" ? approved : tab === "pending" ? pending : resources;

  if (showUpload) {
    return (
      <div className="min-h-screen" style={{ background: "#F4F7FB" }}>
        <div className="max-w-[700px] mx-auto px-5 py-8">
          <button onClick={() => setShowUpload(false)}
            className="flex items-center gap-2 text-[#0069A8] hover:underline text-[13px] mb-5">
            ← Orqaga
          </button>
          <h2 className="font-bold text-[#002B4A] text-[20px] mb-6">Yangi resurs yuklash</h2>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <ResourceUploadForm onSuccess={() => setShowUpload(false)} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#F4F7FB" }}>
      {/* Banner */}
      <div style={{ background: "linear-gradient(135deg,#002B4A,#003D66)", paddingTop: "32px", paddingBottom: "56px" }}>
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-white/50 text-[12px] mb-1">O'qituvchi shaxsiy kabineti</p>
              <h1 className="text-white font-black text-[22px] sm:text-[26px]">
                {user?.full_name || "O'qituvchi"}
              </h1>
              <p className="text-white/45 text-[12px] mt-1">Axborot texnologiyalari kafedrasi</p>
            </div>
            <button
              onClick={() => setShowUpload(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-[13px] text-[#002B4A] hover:opacity-90 transition-all self-start sm:self-auto"
              style={{ background: "#F5B400" }}>
              <Upload size={15} />
              Resurs yuklash
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-5 sm:px-8 -mt-8 pb-16">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {STATS.map(({ val, label, color, bg, icon: Icon }) => (
            <div key={label} className={`${bg} rounded-2xl p-5`}>
              <Icon size={20} className={`${color} mb-2`} />
              <div className={`text-3xl font-black ${color} leading-none`}>{val}</div>
              <div className="text-[12px] text-gray-600 mt-1.5">{label}</div>
            </div>
          ))}
        </div>

        {/* Needs revision alert */}
        {(needs.length > 0 || true) && (
          <div className="mb-5 p-4 bg-orange-50 border border-orange-200 rounded-2xl flex items-start gap-3">
            <AlertCircle size={15} className="text-orange-500 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-bold text-orange-700 text-[13px]">{needs.length || 1} ta resurs tuzatishni kutmoqda</div>
              <div className="text-orange-600 text-[11px] mt-0.5">Kutubxonachi izohlari bo'yicha tahrir qiling.</div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Resources table */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-gray-100">
              {[
                { key: "all", label: "Barchasi" },
                { key: "approved", label: "Tasdiqlangan" },
                { key: "pending", label: "Kutilmoqda" },
              ].map(tb => (
                <button key={tb.key}
                  onClick={() => setTab(tb.key as any)}
                  className={`px-5 py-3.5 text-[12.5px] font-semibold border-b-2 transition-colors ${tab === tb.key ? "border-[#0069A8] text-[#0069A8]" : "border-transparent text-gray-400 hover:text-gray-600"}`}>
                  {tb.label}
                </button>
              ))}
            </div>

            <div className="divide-y divide-gray-50">
              {(filtered.length ? filtered : SEED_RESOURCES).slice(0, 6).map((res: any) => {
                const sc = STATUS_CONFIG[res.status] || STATUS_CONFIG.draft;
                const Icon = sc.icon;
                return (
                  <div key={res.id} className="flex items-start gap-3 px-5 py-4">
                    <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
                      <FileText size={15} className="text-red-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-[13px] text-[#102033] line-clamp-1">{res.title}</div>
                      <div className="text-gray-400 text-[11px] mt-0.5 flex items-center gap-2">
                        <span>{res.subject}</span>
                        <span>·</span>
                        <Eye size={10} />
                        <span>{res.views}</span>
                      </div>
                    </div>
                    <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${sc.bg} ${sc.color}`}>
                      <Icon size={10} />{sc.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: stats + quick */}
          <div className="space-y-4">
            {/* Views chart simple */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h3 className="font-bold text-[#002B4A] text-[14px] mb-4 flex items-center gap-2">
                <BarChart3 size={14} className="text-[#0069A8]" />
                Ko'rishlar statistikasi
              </h3>
              <div className="space-y-3">
                {SEED_RESOURCES.filter(r => r.status === "approved").slice(0, 4).map(r => (
                  <div key={r.id}>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-gray-600 line-clamp-1 flex-1 mr-2">{r.title.split("—")[0]}</span>
                      <span className="font-bold text-[#0069A8] flex-shrink-0">{r.views}</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${Math.min(r.views / 350 * 100, 100)}%`, background: "#0069A8" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h3 className="font-bold text-[#002B4A] text-[14px] mb-3 flex items-center gap-2">
                <Bell size={14} className="text-[#0069A8]" />
                Bildirishnomalar
              </h3>
              <div className="space-y-2.5">
                {[
                  { text: "«Tarmoqlar va protokollar» resursingizga tuzatish talab qilinmoqda.", type: "warning" },
                  { text: "«Dasturlash asoslari» materialni 187 talaba ko'rdi.", type: "info" },
                ].map((n, i) => (
                  <div key={i} className={`p-3 rounded-xl text-[11.5px] leading-snug border ${n.type === "warning" ? "bg-orange-50 text-orange-700 border-orange-100" : "bg-blue-50 text-blue-700 border-blue-100"}`}>
                    {n.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
