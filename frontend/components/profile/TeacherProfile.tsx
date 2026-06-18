"use client";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import {
  BookOpen, CheckCircle, Clock, XCircle, AlertCircle,
  BarChart3, Upload, Download, Eye, Star, FileText,
  Mail, Phone, Award, Users, BookMarked, TrendingUp, Bell
} from "lucide-react";
import { teacherProfile } from "@/data/seedProfiles";
import {
  teacherDashboardStats,
  teacherResources,
  teacherSubjects,
} from "@/data/seedDashboard";

const TABS = [
  { key: "overview", label: "Umumiy ko'rinish", icon: TrendingUp },
  { key: "resources", label: "Resurslarim", icon: BookOpen },
  { key: "upload", label: "Yuklash", icon: Upload },
  { key: "stats", label: "Statistika", icon: BarChart3 },
];

const STATUS_MAP: Record<string, { label: string; color: string; bg: string; icon: any }> = {
  approved: { label: "Tasdiqlangan", color: "text-green-700", bg: "bg-green-100", icon: CheckCircle },
  pending_review: { label: "Ko'rib chiqilmoqda", color: "text-amber-700", bg: "bg-amber-100", icon: Clock },
  rejected: { label: "Rad etilgan", color: "text-red-700", bg: "bg-red-100", icon: XCircle },
  needs_revision: { label: "Tuzatish kerak", color: "text-orange-700", bg: "bg-orange-100", icon: AlertCircle },
  draft: { label: "Qoralama", color: "text-gray-600", bg: "bg-gray-100", icon: FileText },
};

const TYPE_COLORS: Record<string, string> = {
  lab_work: "#7C3AED",
  practice: "#0891B2",
  test: "#DC2626",
  lecture: "#0069A8",
  guide: "#059669",
  textbook: "#D97706",
};

export default function TeacherProfile() {
  const [tab, setTab] = useState("overview");
  const [uploadForm, setUploadForm] = useState({
    title: "", description: "", subject: "", material_type: "lecture", language: "uz",
  });

  const profile = teacherProfile;
  const stats = teacherDashboardStats;
  const resources = teacherResources;
  const subjects = teacherSubjects;

  const KPI = [
    { icon: BookOpen, val: stats.total_resources, label: "Jami resurslar", color: "text-[#0069A8]", bg: "bg-blue-50" },
    { icon: CheckCircle, val: stats.approved, label: "Tasdiqlangan", color: "text-green-700", bg: "bg-green-50" },
    { icon: Clock, val: stats.pending_review, label: "Kutilmoqda", color: "text-amber-700", bg: "bg-amber-50" },
    { icon: XCircle, val: stats.rejected, label: "Rad etilgan", color: "text-red-700", bg: "bg-red-50" },
    { icon: AlertCircle, val: stats.needs_revision, label: "Tuzatish kerak", color: "text-orange-700", bg: "bg-orange-50" },
    { icon: Download, val: stats.total_downloads, label: "Yuklab olishlar", color: "text-purple-700", bg: "bg-purple-50" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#F4F7FB" }}>
      {/* ===== Profile Header ===== */}
      <div style={{ background: "linear-gradient(135deg,#002B4A 0%,#003D66 60%,#004F83 100%)" }} className="pb-12 pt-8">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center font-black text-[28px] sm:text-[32px] text-white flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#003D66,#0069A8)" }}>
              {profile.avatar_initials}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest bg-[#F5B400] text-[#002B4A]">
                  {profile.position}
                </span>
                {profile.degree && (
                  <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest bg-white/15 text-white">
                    {profile.degree}
                  </span>
                )}
              </div>
              <h1 className="text-white font-black text-[22px] sm:text-[26px] leading-tight">{profile.full_name}</h1>
              <p className="text-white/55 text-[13px] mt-0.5">{profile.department}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {profile.subjects.map(s => (
                  <span key={s} className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-[11px] font-medium border border-white/15">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-1.5 text-right">
              <div className="flex items-center gap-2 text-white/50 text-[11.5px] justify-end">
                <Mail size={11} />{profile.email}
              </div>
              <div className="flex items-center gap-2 text-white/50 text-[11.5px] justify-end">
                <Phone size={11} />{profile.phone}
              </div>
              <div className="flex items-center gap-2 text-white/40 text-[11px] justify-end mt-1">
                <Award size={10} />{profile.experience_years} yil tajriba
              </div>
              <div className="flex items-center gap-2 text-white/40 text-[11px] justify-end">
                <BookMarked size={10} />{profile.publications_count} nashr
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-5 sm:px-8 -mt-6 pb-16">
        {/* KPI */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 mb-6">
          {KPI.map(({ icon: Icon, val, label, color, bg }) => (
            <div key={label} className={`${bg} rounded-2xl p-4 text-center`}>
              <Icon size={18} className={`${color} mx-auto mb-1.5`} />
              <div className={`text-2xl font-black ${color} leading-none`}>{val}</div>
              <div className="text-[10px] text-gray-500 mt-1 leading-tight">{label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6 bg-white rounded-t-2xl px-2 pt-2">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button key={key} onClick={() => setTab(key)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-[12.5px] font-semibold border-b-2 transition-colors rounded-t-xl ${
                tab === key ? "border-[#0069A8] text-[#0069A8]" : "border-transparent text-gray-400 hover:text-gray-600"
              }`}>
              <Icon size={13} />{label}
            </button>
          ))}
        </div>

        {/* ===== OVERVIEW TAB ===== */}
        {tab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* My subjects */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h3 className="font-bold text-[#002B4A] text-[14px] mb-4 flex items-center gap-2">
                <BookOpen size={14} className="text-[#0069A8]" />
                Mening fanlarim
              </h3>
              <div className="space-y-3">
                {subjects.map((s) => (
                  <div key={s.id} className="p-3.5 rounded-xl" style={{ background: "#F4F7FB" }}>
                    <div className="font-bold text-[13px] text-[#102033]">{s.name}</div>
                    <div className="flex items-center gap-3 mt-1 text-[11px] text-gray-400">
                      <span>{s.course}</span>
                      <span>·</span>
                      <span>{s.semester}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><Users size={10} />{s.groups_count} guruh</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent resources */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[#002B4A] text-[14px] flex items-center gap-2">
                  <FileText size={14} className="text-[#0069A8]" />
                  So'nggi resurslar
                </h3>
                <button onClick={() => setTab("resources")} className="text-[11px] text-[#0069A8] hover:underline">
                  Barchasini ko'rish →
                </button>
              </div>
              <div className="divide-y divide-gray-50">
                {resources.map((res) => {
                  const st = STATUS_MAP[res.status];
                  const StIcon = st.icon;
                  return (
                    <div key={res.id} className="flex items-start gap-3 py-3.5">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: (TYPE_COLORS[res.type] || "#0069A8") + "20" }}>
                        <FileText size={14} style={{ color: TYPE_COLORS[res.type] || "#0069A8" }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-[13px] text-[#102033] line-clamp-1">{res.title}</div>
                        <div className="text-[11px] text-gray-400 mt-0.5 flex items-center gap-2">
                          <span>{res.type_label}</span>
                          <span>·</span>
                          <span>{res.subject}</span>
                          {res.views > 0 && (
                            <>
                              <span>·</span>
                              <Eye size={9} />
                              <span>{res.views}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${st.bg} ${st.color}`}>
                        <StIcon size={10} />{st.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ===== RESOURCES TAB ===== */}
        {tab === "resources" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-[#002B4A] text-[15px]">Yuklangan resurslar ({resources.length})</h3>
              <button onClick={() => setTab("upload")}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#0069A8] text-white rounded-xl text-[12px] font-bold hover:opacity-90">
                <Upload size={13} /> Yangi resurs
              </button>
            </div>

            {/* Needs revision alert */}
            {resources.some(r => r.status === "needs_revision") && (
              <div className="mx-6 mt-4 p-3.5 bg-orange-50 border border-orange-200 rounded-xl flex items-start gap-2.5">
                <AlertCircle size={14} className="text-orange-500 flex-shrink-0 mt-0.5" />
                <div className="text-[12px] text-orange-700">
                  <strong>Diqqat:</strong> Bir yoki bir nechta resurslaringizga kutubxonachi tomonidan tuzatish talab qilingan. Ko'rib chiqing va tahrirlang.
                </div>
              </div>
            )}

            <div className="divide-y divide-gray-50 mt-2">
              {resources.map((res) => {
                const st = STATUS_MAP[res.status];
                const StIcon = st.icon;
                return (
                  <div key={res.id} className="flex items-start gap-4 px-6 py-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: (TYPE_COLORS[res.type] || "#0069A8") + "15" }}>
                      <FileText size={16} style={{ color: TYPE_COLORS[res.type] || "#0069A8" }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-[13.5px] text-[#102033]">{res.title}</div>
                      <div className="flex items-center gap-3 mt-1 text-[11px] text-gray-400">
                        <span className="px-2 py-0.5 rounded-full font-medium text-[10px]"
                          style={{ background: (TYPE_COLORS[res.type] || "#0069A8") + "15", color: TYPE_COLORS[res.type] || "#0069A8" }}>
                          {res.type_label}
                        </span>
                        <span>{res.subject}</span>
                        <span>{res.date}</span>
                      </div>
                      {res.views > 0 && (
                        <div className="flex items-center gap-3 mt-1.5 text-[11px] text-gray-300">
                          <span className="flex items-center gap-1"><Eye size={10} />{res.views}</span>
                          <span className="flex items-center gap-1"><Download size={10} />{res.downloads}</span>
                        </div>
                      )}
                    </div>
                    <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${st.bg} ${st.color}`}>
                      <StIcon size={10} />{st.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ===== UPLOAD TAB ===== */}
        {tab === "upload" && (
          <div className="max-w-[600px]">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-bold text-[#002B4A] text-[16px] mb-5 flex items-center gap-2">
                <Upload size={16} className="text-[#0069A8]" />
                Yangi resurs yuklash
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-[11.5px] font-bold text-gray-500 mb-1.5 uppercase tracking-wide">Resurs nomi *</label>
                  <input type="text" value={uploadForm.title}
                    onChange={e => setUploadForm(f => ({ ...f, title: e.target.value }))}
                    placeholder="Masalan: SQL laboratoriya ishlari to'plami"
                    className="w-full px-4 rounded-xl border border-gray-200 text-[13.5px] text-gray-800 focus:outline-none focus:border-[#0069A8] focus:ring-2 focus:ring-[#0069A8]/15"
                    style={{ height: "48px" }} />
                </div>
                <div>
                  <label className="block text-[11.5px] font-bold text-gray-500 mb-1.5 uppercase tracking-wide">Tavsif</label>
                  <textarea value={uploadForm.description}
                    onChange={e => setUploadForm(f => ({ ...f, description: e.target.value }))}
                    placeholder="Resurs haqida qisqacha ma'lumot..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[13.5px] text-gray-800 focus:outline-none focus:border-[#0069A8] focus:ring-2 focus:ring-[#0069A8]/15 resize-none" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11.5px] font-bold text-gray-500 mb-1.5 uppercase tracking-wide">Fan</label>
                    <select value={uploadForm.subject}
                      onChange={e => setUploadForm(f => ({ ...f, subject: e.target.value }))}
                      className="w-full px-4 rounded-xl border border-gray-200 text-[13.5px] bg-white focus:outline-none focus:border-[#0069A8]"
                      style={{ height: "48px" }}>
                      <option value="">Tanlang</option>
                      {profile.subjects.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11.5px] font-bold text-gray-500 mb-1.5 uppercase tracking-wide">Material turi</label>
                    <select value={uploadForm.material_type}
                      onChange={e => setUploadForm(f => ({ ...f, material_type: e.target.value }))}
                      className="w-full px-4 rounded-xl border border-gray-200 text-[13.5px] bg-white focus:outline-none focus:border-[#0069A8]"
                      style={{ height: "48px" }}>
                      <option value="lecture">Ma'ruza</option>
                      <option value="practice">Amaliy mashg'ulot</option>
                      <option value="lab_work">Laboratoriya ishi</option>
                      <option value="test">Test</option>
                      <option value="guide">Qo'llanma</option>
                      <option value="textbook">Darslik</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[11.5px] font-bold text-gray-500 mb-1.5 uppercase tracking-wide">Til</label>
                  <select value={uploadForm.language}
                    onChange={e => setUploadForm(f => ({ ...f, language: e.target.value }))}
                    className="w-full px-4 rounded-xl border border-gray-200 text-[13.5px] bg-white focus:outline-none focus:border-[#0069A8]"
                    style={{ height: "48px" }}>
                    <option value="uz">O'zbek tili</option>
                    <option value="ru">Rus tili</option>
                    <option value="en">Ingliz tili</option>
                  </select>
                </div>

                {/* File upload */}
                <div>
                  <label className="block text-[11.5px] font-bold text-gray-500 mb-1.5 uppercase tracking-wide">Fayl yuklash *</label>
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-[#0069A8] transition-colors cursor-pointer">
                    <Upload size={24} className="text-gray-300 mx-auto mb-2" />
                    <p className="text-[12.5px] text-gray-400">PDF, DOCX, PPTX, MP4 yuklang</p>
                    <p className="text-[11px] text-gray-300 mt-1">Maksimal hajm: 100 MB</p>
                  </div>
                </div>

                <button
                  className="w-full h-12 bg-[#0069A8] text-white font-bold rounded-xl text-[13px] hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                  <Upload size={15} />
                  Ko'rib chiqishga yuborish
                </button>
                <p className="text-[11px] text-gray-400 text-center">
                  Resurs yuborilgandan so'ng kutubxonachi ko'rib chiqadi. Tasdiqlashga 1–2 ish kuni ketadi.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ===== STATS TAB ===== */}
        {tab === "stats" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Usage stats */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-bold text-[#002B4A] text-[15px] mb-5 flex items-center gap-2">
                <BarChart3 size={15} className="text-[#0069A8]" />
                Foydalanish statistikasi
              </h3>
              <div className="grid grid-cols-2 gap-3 mb-5">
                {[
                  { val: stats.total_views.toLocaleString(), label: "Ko'rishlar", icon: Eye, color: "text-[#0069A8]", bg: "bg-blue-50" },
                  { val: stats.total_downloads, label: "Yuklab olishlar", icon: Download, color: "text-green-700", bg: "bg-green-50" },
                  { val: stats.saved_count, label: "Saqlanganlar", icon: BookMarked, color: "text-purple-700", bg: "bg-purple-50" },
                  { val: `${stats.average_rating}/5`, label: "O'rtacha baho", icon: Star, color: "text-amber-600", bg: "bg-amber-50" },
                ].map(({ val, label, icon: Icon, color, bg }) => (
                  <div key={label} className={`${bg} rounded-xl p-4 text-center`}>
                    <Icon size={16} className={`${color} mx-auto mb-1.5`} />
                    <div className={`text-xl font-black ${color}`}>{val}</div>
                    <div className="text-[11px] text-gray-500 mt-0.5">{label}</div>
                  </div>
                ))}
              </div>

              {/* Top resources bar chart */}
              <div className="space-y-3">
                <div className="text-[12px] font-bold text-gray-500 uppercase tracking-wide">Ko'p ko'rilganlar</div>
                {teacherResources.filter(r => r.views > 0).slice(0, 4).map(r => (
                  <div key={r.id}>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-gray-600 line-clamp-1 flex-1 mr-2">{r.title.split(" ").slice(0, 4).join(" ")}</span>
                      <span className="font-bold text-[#0069A8] flex-shrink-0">{r.views}</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${Math.min(r.views / 350 * 100, 100)}%`, background: "#0069A8" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Status distribution */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-bold text-[#002B4A] text-[15px] mb-5 flex items-center gap-2">
                <TrendingUp size={15} className="text-[#0069A8]" />
                Resurslar holati
              </h3>
              <div className="space-y-3 mb-5">
                {[
                  { label: "Tasdiqlangan", val: stats.approved, total: stats.total_resources, color: "#22c55e" },
                  { label: "Ko'rib chiqilmoqda", val: stats.pending_review, total: stats.total_resources, color: "#f59e0b" },
                  { label: "Tuzatish kerak", val: stats.needs_revision, total: stats.total_resources, color: "#f97316" },
                  { label: "Rad etilgan", val: stats.rejected, total: stats.total_resources, color: "#ef4444" },
                ].map(({ label, val, total, color }) => (
                  <div key={label}>
                    <div className="flex justify-between text-[11.5px] mb-1">
                      <span className="text-gray-600">{label}</span>
                      <span className="font-bold" style={{ color }}>{val} ta</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${val / total * 100}%`, background: color }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Notifications panel */}
              <div className="border-t border-gray-100 pt-5">
                <h4 className="font-bold text-[13px] text-[#002B4A] mb-3 flex items-center gap-2">
                  <Bell size={13} className="text-[#0069A8]" />
                  Kutubxona xabarlari
                </h4>
                <div className="space-y-2.5">
                  {[
                    { text: "«Algoritmlar bo'yicha testlar» resursiga tuzatish talab qilinmoqda.", type: "warning" },
                    { text: "«SQL laboratoriya ishlari» 312 marta ko'rildi.", type: "info" },
                  ].map((n, i) => (
                    <div key={i} className={`p-3 rounded-xl text-[11.5px] leading-snug border ${
                      n.type === "warning"
                        ? "bg-orange-50 border-orange-100 text-orange-700"
                        : "bg-blue-50 border-blue-100 text-blue-700"
                    }`}>
                      {n.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
