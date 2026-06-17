"use client";
import { useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  User, BookOpen, Upload, BarChart3, Bell,
  ChevronRight, CheckCircle, Clock, Users, FileText
} from "lucide-react";

type Locale = "uz" | "ru" | "en" | "tr";

const MOCK_TEACHER = {
  name: "Toshmatov Sherzod Alisher o'g'li",
  teacher_id: "ATM-T-0087",
  title: { uz: "Dotsent", ru: "Доцент", en: "Associate Professor", tr: "Doçent" },
  department: { uz: "Axborot texnologiyalari kafedrasi", ru: "Кафедра информационных технологий", en: "IT Department", tr: "BT Bölümü" },
  subjects: [
    { uz: "Algoritm va ma'lumotlar tuzilmasi", ru: "Алгоритмы и структуры данных", en: "Algorithms & Data Structures", tr: "Algoritmalar" },
    { uz: "Dasturlash asoslari", ru: "Основы программирования", en: "Programming Basics", tr: "Programlama Temelleri" },
    { uz: "Ma'lumotlar bazasi", ru: "Базы данных", en: "Databases", tr: "Veritabanları" },
  ],
};

const RESOURCES = [
  { title: "Algoritm va ma'lumotlar tuzilmasi — Ma'ruzalar", type: "PDF", views: 234, status: "approved", date: "10 May 2026" },
  { title: "Dasturlash asoslari — Amaliy mashg'ulotlar", type: "PDF", views: 187, status: "approved", date: "3 May 2026" },
  { title: "Python amaliy misollari 2026", type: "PDF", views: 45, status: "pending", date: "15 Iyun 2026" },
];

const STATS = [
  { val: "3", label: { uz: "Fanlar", ru: "Предметы", en: "Subjects", tr: "Dersler" }, color: "#0069A8" },
  { val: "12", label: { uz: "Resurslar", ru: "Ресурсы", en: "Resources", tr: "Kaynaklar" }, color: "#00A050" },
  { val: "466", label: { uz: "Ko'rishlar", ru: "Просмотры", en: "Views", tr: "Görüntüleme" }, color: "#8855CC" },
  { val: "2", label: { uz: "Kutilmoqda", ru: "На проверке", en: "Pending", tr: "Beklemede" }, color: "#F59E0B" },
];

const TABS = [
  { key: "overview", icon: <User size={14} />, label: { uz: "Umumiy", ru: "Обзор", en: "Overview", tr: "Genel" } },
  { key: "resources", icon: <FileText size={14} />, label: { uz: "Resurslarim", ru: "Мои ресурсы", en: "My Resources", tr: "Kaynaklarım" } },
  { key: "upload", icon: <Upload size={14} />, label: { uz: "Resurs yuklash", ru: "Загрузить ресурс", en: "Upload Resource", tr: "Kaynak Yükle" } },
  { key: "stats", icon: <BarChart3 size={14} />, label: { uz: "Statistika", ru: "Статистика", en: "Statistics", tr: "İstatistik" } },
];

export default function TeacherProfile() {
  const locale = useLocale() as Locale;
  const [tab, setTab] = useState("overview");
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadSubj, setUploadSubj] = useState("");
  const t = (obj: Record<string, string>) => obj[locale] || obj.uz;

  return (
    <div className="min-h-screen" style={{ background: "#F4F7FB" }}>
      {/* Profile banner */}
      <div style={{ background: "linear-gradient(135deg,#002B4A 0%,#003D66 60%,#0069A8 100%)", paddingBottom: "60px" }}>
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8 pt-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-white/15 border-2 border-white/30 flex items-center justify-center text-white font-black text-3xl flex-shrink-0">
              {MOCK_TEACHER.name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="badge badge-blue">{t(MOCK_TEACHER.title)}</span>
                <span className="badge badge-green">{t(MOCK_TEACHER.department)}</span>
              </div>
              <h1 className="text-white font-black text-[22px] sm:text-[26px] leading-tight">{MOCK_TEACHER.name}</h1>
              <div className="text-white/50 text-[12px] mt-1">{MOCK_TEACHER.teacher_id}</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-8 overflow-x-auto pb-1">
            {TABS.map(tb => (
              <button key={tb.key} onClick={() => setTab(tb.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[12.5px] font-semibold whitespace-nowrap transition-all ${
                  tab === tb.key
                    ? "bg-white text-[#0069A8] shadow-sm"
                    : "text-white/65 hover:text-white hover:bg-white/12"
                }`}>
                {tb.icon}{t(tb.label)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8 -mt-8 pb-16">

        {tab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 profile-card p-6">
              <h3 className="font-bold text-[#002B4A] text-[15px] mb-4 flex items-center gap-2">
                <User size={16} className="text-[#0069A8]" />
                {locale === "uz" ? "Shaxsiy ma'lumotlar" : locale === "ru" ? "Личные данные" : "Personal Info"}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                {[
                  { label: { uz: "Kafedra", ru: "Кафедра", en: "Department", tr: "Bölüm" }, val: t(MOCK_TEACHER.department) },
                  { label: { uz: "Unvon", ru: "Звание", en: "Title", tr: "Unvan" }, val: t(MOCK_TEACHER.title) },
                  { label: { uz: "Xodim ID", ru: "ID сотрудника", en: "Staff ID", tr: "Personel ID" }, val: MOCK_TEACHER.teacher_id },
                ].map((row, i) => (
                  <div key={i} className="p-3 rounded-xl bg-[#F4F7FB]">
                    <div className="text-[10px] font-bold uppercase tracking-wide text-gray-400 mb-1">{t(row.label)}</div>
                    <div className="text-[13px] font-semibold text-[#102033]">{row.val}</div>
                  </div>
                ))}
              </div>

              <h4 className="font-bold text-[#002B4A] text-[13px] mb-3">
                {locale === "uz" ? "Fanlarim" : locale === "ru" ? "Мои дисциплины" : "My Subjects"}
              </h4>
              <div className="space-y-2">
                {MOCK_TEACHER.subjects.map((subj, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-[#0069A8]/20 transition-colors">
                    <div className="w-7 h-7 rounded-lg bg-[#0069A8]/10 flex items-center justify-center">
                      <BookOpen size={13} className="text-[#0069A8]" />
                    </div>
                    <span className="text-[13px] font-medium text-[#102033]">{t(subj)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-3">
              {STATS.map((s, i) => (
                <div key={i} className="profile-card p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ background: s.color }}>
                    <BarChart3 size={17} />
                  </div>
                  <div>
                    <div className="font-black text-[22px] text-[#102033] leading-none">{s.val}</div>
                    <div className="text-gray-400 text-[11px] mt-0.5">{t(s.label)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "resources" && (
          <div className="profile-card">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-[#002B4A] text-[15px] flex items-center gap-2">
                <FileText size={16} className="text-[#0069A8]" />
                {locale === "uz" ? "Yuklangan resurslarim" : locale === "ru" ? "Мои загруженные ресурсы" : "Uploaded Resources"}
              </h3>
            </div>
            <div className="divide-y divide-gray-50">
              {RESOURCES.map((res, i) => (
                <div key={i} className="p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
                    <FileText size={18} className="text-red-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-[#102033] text-[14px] line-clamp-2">{res.title}</div>
                    <div className="text-gray-400 text-[11px] mt-1 flex items-center gap-3">
                      <span>{res.type}</span>
                      <span className="flex items-center gap-1"><Users size={10} /> {res.views}</span>
                      <span>{res.date}</span>
                    </div>
                  </div>
                  <span className={`badge ${res.status === "approved" ? "badge-green" : "badge-gold"} whitespace-nowrap`}>
                    {res.status === "approved"
                      ? <><CheckCircle size={10} /> {locale === "uz" ? "Tasdiqlangan" : "Одобрено"}</>
                      : <><Clock size={10} /> {locale === "uz" ? "Kutilmoqda" : "На проверке"}</>
                    }
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "upload" && (
          <div className="profile-card p-6 max-w-[600px]">
            <h3 className="font-bold text-[#002B4A] text-[15px] mb-5 flex items-center gap-2">
              <Upload size={16} className="text-[#0069A8]" />
              {locale === "uz" ? "Yangi resurs yuklash" : locale === "ru" ? "Загрузить новый ресурс" : "Upload New Resource"}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[12px] font-semibold text-gray-600 mb-1.5">
                  {locale === "uz" ? "Resurs nomi" : locale === "ru" ? "Название ресурса" : "Resource Title"}
                </label>
                <input value={uploadTitle} onChange={e => setUploadTitle(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-[#0069A8]"
                  placeholder={locale === "uz" ? "Resurs nomini kiriting..." : "Введите название..."} />
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-gray-600 mb-1.5">
                  {locale === "uz" ? "Fan" : locale === "ru" ? "Дисциплина" : "Subject"}
                </label>
                <select value={uploadSubj} onChange={e => setUploadSubj(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-[#0069A8]">
                  <option value="">{locale === "uz" ? "Fanni tanlang..." : "Выберите дисциплину..."}</option>
                  {MOCK_TEACHER.subjects.map((s, i) => <option key={i} value={i.toString()}>{t(s)}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-gray-600 mb-1.5">
                  {locale === "uz" ? "Fayl" : locale === "ru" ? "Файл" : "File"}
                </label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-[#0069A8] transition-colors cursor-pointer">
                  <Upload size={24} className="text-gray-300 mx-auto mb-2" />
                  <div className="text-[12px] text-gray-400">
                    {locale === "uz" ? "PDF, DOC, PPTX — 20MB gacha" : "PDF, DOC, PPTX — до 20 МБ"}
                  </div>
                </div>
              </div>
              <button className="w-full py-3 rounded-xl text-[13px] font-bold text-white transition-all hover:opacity-90"
                style={{ background: "#0069A8" }}>
                {locale === "uz" ? "Yuklash va tasdiqlashga yuborish" : locale === "ru" ? "Загрузить и отправить на проверку" : "Upload & Submit for Review"}
              </button>
            </div>
          </div>
        )}

        {tab === "stats" && (
          <div className="profile-card p-6">
            <h3 className="font-bold text-[#002B4A] text-[15px] mb-6 flex items-center gap-2">
              <BarChart3 size={16} className="text-[#0069A8]" />
              {locale === "uz" ? "Resurslar statistikasi" : locale === "ru" ? "Статистика ресурсов" : "Resource Statistics"}
            </h3>
            <div className="space-y-4">
              {RESOURCES.filter(r => r.status === "approved").map((res, i) => (
                <div key={i}>
                  <div className="flex justify-between text-[12px] mb-1.5">
                    <span className="font-medium text-gray-700 line-clamp-1 flex-1 mr-4">{res.title}</span>
                    <span className="font-bold text-[#0069A8] flex-shrink-0">{res.views} {locale === "uz" ? "ko'rish" : "просм."}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${Math.min(res.views / 250 * 100, 100)}%`, background: "#0069A8" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
