"use client";
import { useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  User, BookOpen, CalendarCheck, BookMarked, Bell,
  Brain, ChevronRight, Clock, CheckCircle, AlertCircle,
  GraduationCap, Star
} from "lucide-react";

type Locale = "uz" | "ru" | "en" | "tr";

const MOCK_STUDENT = {
  name: "Abdullayev Jasur Mirzo o'g'li",
  student_id: "ATM-2024-1042",
  faculty: { uz: "Raqamli texnologiyalar fakulteti", ru: "Факультет цифровых технологий", en: "Digital Technologies Faculty", tr: "Dijital Teknolojiler Fakültesi" },
  department: { uz: "Axborot texnologiyalari kafedrasi", ru: "Кафедра информационных технологий", en: "IT Department", tr: "BT Bölümü" },
  direction: { uz: "Dasturiy injiniring", ru: "Программная инженерия", en: "Software Engineering", tr: "Yazılım Mühendisliği" },
  course: 2,
  group: "DT-22-01",
  gpa: "3.8",
};

const ACTIVE_LOANS = [
  { title: "Algoritm va ma'lumotlar tuzilmasi", author: "T. Cormen", due: "25 Iyun 2026", status: "ok" },
  { title: "Python dasturlash asoslari", author: "M. Lutz", due: "18 Iyun 2026", status: "due_soon" },
];

const RESERVATIONS = [
  { room: { uz: "Asosiy o'quv zali", ru: "Главный читальный зал", en: "Main Reading Room", tr: "Ana Okuma Salonu" }, date: "2026-06-20", time: "10:00–14:00", seat: "A-14", status: "confirmed" },
];

const AI_RECS = [
  { title: "Clean Code", author: "Robert C. Martin", reason: { uz: "Dasturlash yo'nalishingizga mos", ru: "Подходит для вашего направления", en: "Matches your direction", tr: "Yöneliminize uygun" } },
  { title: "Design Patterns", author: "Gang of Four", reason: { uz: "2-kurs talabalariga tavsiya etiladi", ru: "Рекомендуется для 2-го курса", en: "Recommended for 2nd year", tr: "2. sınıf için önerilir" } },
  { title: "Raqamli iqtisodiyot asoslari", author: "A. Axmedov", reason: { uz: "Fakultet tavsiyasi", ru: "Рекомендация факультета", en: "Faculty recommendation", tr: "Fakülte tavsiyesi" } },
];

const TABS = [
  { key: "overview", icon: <User size={14} />, label: { uz: "Umumiy", ru: "Обзор", en: "Overview", tr: "Genel" } },
  { key: "books", icon: <BookOpen size={14} />, label: { uz: "Kitoblarim", ru: "Мои книги", en: "My Books", tr: "Kitaplarım" } },
  { key: "rooms", icon: <CalendarCheck size={14} />, label: { uz: "Bronlar", ru: "Брони", en: "Bookings", tr: "Rezervasyonlar" } },
  { key: "ai", icon: <Brain size={14} />, label: { uz: "AI tavsiyalar", ru: "ИИ рекомендации", en: "AI Recs", tr: "AI Önerileri" } },
];

export default function StudentProfile() {
  const locale = useLocale() as Locale;
  const [tab, setTab] = useState("overview");
  const t = (obj: Record<string, string>) => obj[locale] || obj.uz;

  return (
    <div className="min-h-screen" style={{ background: "#F4F7FB" }}>
      {/* Profile header */}
      <div style={{ background: "linear-gradient(135deg,#002B4A 0%,#0069A8 100%)", paddingBottom: "60px" }}>
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8 pt-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-[#F5B400] flex items-center justify-center text-[#002B4A] font-black text-3xl flex-shrink-0">
              {MOCK_STUDENT.name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="badge badge-gold">{locale === "uz" ? "Talaba" : locale === "ru" ? "Студент" : "Student"}</span>
                <span className="badge badge-blue">{MOCK_STUDENT.group}</span>
                <span className="badge badge-green">GPA {MOCK_STUDENT.gpa}</span>
              </div>
              <h1 className="text-white font-black text-[22px] sm:text-[26px] leading-tight">{MOCK_STUDENT.name}</h1>
              <div className="text-white/55 text-[13px] mt-1 flex flex-wrap gap-x-4 gap-y-1">
                <span>{MOCK_STUDENT.student_id}</span>
                <span>{t(MOCK_STUDENT.faculty)}</span>
                <span>{MOCK_STUDENT.course}-{locale === "uz" ? "kurs" : locale === "ru" ? "курс" : "th year"}</span>
              </div>
            </div>
          </div>

          {/* Tab bar */}
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

      {/* Content */}
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8 -mt-8 pb-16">

        {tab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Personal info */}
            <div className="lg:col-span-2 profile-card p-6">
              <h3 className="font-bold text-[#002B4A] text-[15px] mb-4 flex items-center gap-2">
                <User size={16} className="text-[#0069A8]" />
                {locale === "uz" ? "Shaxsiy ma'lumotlar" : locale === "ru" ? "Личные данные" : "Personal Info"}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: { uz: "Fakultet", ru: "Факультет", en: "Faculty", tr: "Fakülte" }, val: t(MOCK_STUDENT.faculty) },
                  { label: { uz: "Kafedra", ru: "Кафедра", en: "Department", tr: "Bölüm" }, val: t(MOCK_STUDENT.department) },
                  { label: { uz: "Yo'nalish", ru: "Направление", en: "Direction", tr: "Yönelim" }, val: t(MOCK_STUDENT.direction) },
                  { label: { uz: "Guruh", ru: "Группа", en: "Group", tr: "Grup" }, val: MOCK_STUDENT.group },
                  { label: { uz: "Kurs", ru: "Курс", en: "Year", tr: "Yıl" }, val: `${MOCK_STUDENT.course}` },
                  { label: { uz: "O'rtacha ball", ru: "Средний балл", en: "GPA", tr: "GPA" }, val: MOCK_STUDENT.gpa },
                ].map((row, i) => (
                  <div key={i} className="p-3 rounded-xl bg-[#F4F7FB]">
                    <div className="text-[10px] font-bold uppercase tracking-wide text-gray-400 mb-1">{t(row.label)}</div>
                    <div className="text-[13px] font-semibold text-[#102033]">{row.val}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick stats */}
            <div className="space-y-4">
              {[
                { icon: <BookOpen size={18} />, val: "2", label: { uz: "Faol kitoblar", ru: "Активные книги", en: "Active books", tr: "Aktif kitaplar" }, color: "#0069A8" },
                { icon: <CalendarCheck size={18} />, val: "1", label: { uz: "O'quv zali broni", ru: "Бронь зала", en: "Room booking", tr: "Salon rezervasyonu" }, color: "#00A050" },
                { icon: <Brain size={18} />, val: "3", label: { uz: "AI tavsiyalar", ru: "ИИ рекомендации", en: "AI recommendations", tr: "AI önerileri" }, color: "#8855CC" },
                { icon: <Star size={18} />, val: MOCK_STUDENT.gpa, label: { uz: "GPA", ru: "GPA", en: "GPA", tr: "GPA" }, color: "#F5B400" },
              ].map((s, i) => (
                <div key={i} className="profile-card p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0" style={{ background: s.color }}>
                    {s.icon}
                  </div>
                  <div>
                    <div className="font-black text-[20px] text-[#102033] leading-none">{s.val}</div>
                    <div className="text-gray-400 text-[11px] mt-0.5">{t(s.label)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "books" && (
          <div className="profile-card">
            <div className="p-5 border-b border-gray-100 flex items-center gap-2">
              <BookOpen size={16} className="text-[#0069A8]" />
              <h3 className="font-bold text-[#002B4A] text-[15px]">
                {locale === "uz" ? "Faol kitoblar" : locale === "ru" ? "Активные книги" : "Active Books"}
              </h3>
            </div>
            {ACTIVE_LOANS.length === 0 ? (
              <div className="p-10 text-center text-gray-400">{locale === "uz" ? "Faol kitob yo'q" : "Нет активных книг"}</div>
            ) : (
              <div className="divide-y divide-gray-50">
                {ACTIVE_LOANS.map((loan, i) => (
                  <div key={i} className="p-5 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#0069A8]/10 flex items-center justify-center flex-shrink-0">
                      <BookOpen size={18} className="text-[#0069A8]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-[#102033] text-[14px]">{loan.title}</div>
                      <div className="text-gray-400 text-[12px] mt-0.5">{loan.author}</div>
                      <div className={`flex items-center gap-1.5 mt-1.5 text-[11px] font-semibold ${loan.status === "due_soon" ? "text-orange-600" : "text-green-600"}`}>
                        {loan.status === "due_soon" ? <AlertCircle size={11} /> : <Clock size={11} />}
                        {locale === "uz" ? "Qaytarish:" : "Вернуть:"} {loan.due}
                      </div>
                    </div>
                    <span className={`badge ${loan.status === "due_soon" ? "badge-gold" : "badge-green"}`}>
                      {loan.status === "due_soon" ? (locale === "uz" ? "Yaqin" : "Скоро") : (locale === "uz" ? "OK" : "OK")}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === "rooms" && (
          <div className="profile-card">
            <div className="p-5 border-b border-gray-100 flex items-center gap-2">
              <CalendarCheck size={16} className="text-[#0069A8]" />
              <h3 className="font-bold text-[#002B4A] text-[15px]">
                {locale === "uz" ? "O'quv zali bronlari" : locale === "ru" ? "Брони читального зала" : "Reading Room Bookings"}
              </h3>
            </div>
            <div className="divide-y divide-gray-50">
              {RESERVATIONS.map((r, i) => (
                <div key={i} className="p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                    <CalendarCheck size={18} className="text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-[#102033] text-[14px]">{t(r.room)}</div>
                    <div className="text-gray-400 text-[12px] mt-1">
                      {r.date} · {r.time} · {locale === "uz" ? "O'rindiq" : "Место"}: <strong className="text-[#0069A8]">{r.seat}</strong>
                    </div>
                  </div>
                  <span className="badge badge-green">
                    <CheckCircle size={10} />
                    {locale === "uz" ? "Tasdiqlangan" : locale === "ru" ? "Подтверждено" : "Confirmed"}
                  </span>
                </div>
              ))}
            </div>
            <div className="p-4">
              <Link href="/library/reading-room"
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-[13px] font-semibold text-white"
                style={{ background: "#0069A8" }}>
                {locale === "uz" ? "Yangi bron qo'shish" : locale === "ru" ? "Добавить бронь" : "New Booking"}
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        )}

        {tab === "ai" && (
          <div className="profile-card">
            <div className="p-5 border-b border-gray-100 flex items-center gap-2">
              <Brain size={16} className="text-purple-600" />
              <h3 className="font-bold text-[#002B4A] text-[15px]">
                {locale === "uz" ? "AI kutubxonachi tavsiyalari" : locale === "ru" ? "Рекомендации ИИ-библиотекаря" : "AI Librarian Recommendations"}
              </h3>
            </div>
            <div className="p-4 space-y-3">
              {AI_RECS.map((rec, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:border-purple-200 hover:bg-purple-50/30 transition-all">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <BookMarked size={16} className="text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-[#102033] text-[13.5px]">{rec.title}</div>
                    <div className="text-gray-400 text-[11px]">{rec.author}</div>
                    <div className="text-purple-600 text-[11px] mt-1 font-medium">{t(rec.reason)}</div>
                  </div>
                  <Link href="/catalog" className="text-[11px] font-semibold text-[#0069A8] hover:underline whitespace-nowrap">
                    {locale === "uz" ? "Ko'rish" : locale === "ru" ? "Смотреть" : "View"}
                  </Link>
                </div>
              ))}
              <Link href="/ai"
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-[13px] font-semibold text-white mt-2"
                style={{ background: "linear-gradient(135deg,#6B46C1,#9333EA)" }}>
                <Brain size={14} />
                {locale === "uz" ? "AI kutubxonachiga o'tish" : locale === "ru" ? "Открыть ИИ-библиотекарь" : "Open AI Librarian"}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
