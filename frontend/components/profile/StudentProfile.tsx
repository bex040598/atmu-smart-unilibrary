"use client";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import {
  BookOpen, Calendar, Clock, AlertTriangle, Brain,
  BookMarked, TrendingUp, Bot, CheckCircle, Bell, QrCode,
  GraduationCap, Mail, Phone, Download, ExternalLink, User,
  Fingerprint, Star, AlertCircle
} from "lucide-react";
import {
  studentProfile,
} from "@/data/seedProfiles";
import {
  studentDashboardStats,
  studentLoans,
  reservations,
  readingRoomBookings,
  aiRecommendations,
} from "@/data/seedDashboard";
import { notifications } from "@/data/seedLibrary";

const TABS = [
  { key: "overview", label: "Umumiy ko'rinish", icon: TrendingUp },
  { key: "books", label: "Kitoblarim", icon: BookOpen },
  { key: "rooms", label: "O'quv zali", icon: Calendar },
  { key: "ai", label: "AI tavsiyalar", icon: Bot },
];

const STATUS_MAP: Record<string, { label: string; color: string; bg: string; icon: any }> = {
  active: { label: "Faol", color: "text-green-700", bg: "bg-green-100", icon: CheckCircle },
  due_soon: { label: "Muddati yaqin", color: "text-amber-700", bg: "bg-amber-100", icon: AlertTriangle },
  due_today: { label: "Bugun qaytariladi", color: "text-red-700", bg: "bg-red-100", icon: AlertCircle },
  overdue: { label: "Muddati o'tgan", color: "text-red-700", bg: "bg-red-100", icon: AlertCircle },
  approved: { label: "Tasdiqlangan", color: "text-green-700", bg: "bg-green-100", icon: CheckCircle },
  pending: { label: "Kutilmoqda", color: "text-amber-700", bg: "bg-amber-100", icon: Clock },
};

const COVER_COLORS = ["#0069A8", "#2563EB", "#7C3AED", "#0891B2", "#065F46", "#92400E"];

export default function StudentProfile() {
  const [tab, setTab] = useState("overview");

  const profile = studentProfile;
  const stats = studentDashboardStats;
  const loans = studentLoans;
  const resv = reservations;
  const rooms = readingRoomBookings;
  const recs = aiRecommendations;
  const notifs = notifications;

  const KPI = [
    { icon: BookOpen, val: stats.active_loans, label: "Faol kitoblar", color: "text-[#0069A8]", bg: "bg-blue-50" },
    { icon: AlertTriangle, val: stats.due_soon, label: "Muddati yaqin", color: "text-amber-600", bg: "bg-amber-50" },
    { icon: BookMarked, val: stats.reservations, label: "Bronlar", color: "text-emerald-600", bg: "bg-emerald-50" },
    { icon: Calendar, val: stats.reading_room_bookings, label: "O'quv zali", color: "text-purple-600", bg: "bg-purple-50" },
    { icon: Bot, val: stats.ai_recommendations, label: "AI tavsiyalar", color: "text-indigo-600", bg: "bg-indigo-50" },
    { icon: Bell, val: stats.notifications, label: "Bildirishnomalar", color: "text-orange-600", bg: "bg-orange-50" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#F4F7FB" }}>
      {/* ===== Profile Header Banner ===== */}
      <div style={{ background: "linear-gradient(135deg,#002B4A 0%,#003D66 60%,#005A91 100%)" }} className="pb-12 pt-8">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center font-black text-[28px] sm:text-[32px] text-white flex-shrink-0"
                style={{ background: "linear-gradient(135deg,#0069A8,#F5B400)" }}>
                {profile.avatar_initials}
              </div>
              {profile.face_id_active && (
                <div className="absolute -bottom-1.5 -right-1.5 w-7 h-7 bg-green-400 rounded-xl flex items-center justify-center border-2 border-[#002B4A]">
                  <Fingerprint size={13} className="text-white" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest bg-[#F5B400] text-[#002B4A]">Talaba</span>
                <span className="text-white/40 text-[11px]">{profile.student_id}</span>
              </div>
              <h1 className="text-white font-black text-[22px] sm:text-[26px] leading-tight">{profile.full_name}</h1>
              <p className="text-white/55 text-[13px] mt-0.5">{profile.direction}</p>
              <div className="flex flex-wrap items-center gap-3 mt-3">
                <span className="flex items-center gap-1.5 text-white/50 text-[11.5px]">
                  <GraduationCap size={12} /> {profile.faculty}
                </span>
                <span className="flex items-center gap-1.5 text-white/50 text-[11.5px]">
                  <User size={12} /> {profile.group} · {profile.course}
                </span>
                <span className="flex items-center gap-1.5 text-white/50 text-[11.5px]">
                  <Star size={12} className="text-[#F5B400]" /> GPA {profile.gpa}
                </span>
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
              <div className="flex items-center gap-2 text-green-400 text-[11px] justify-end mt-1">
                <Fingerprint size={10} />Face ID faol
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-5 sm:px-8 -mt-6 pb-16">
        {/* KPI Cards */}
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
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
            {/* Active loans summary */}
            <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[#002B4A] text-[15px] flex items-center gap-2">
                  <BookOpen size={15} className="text-[#0069A8]" />
                  Faol ijaralar
                </h3>
                <button onClick={() => setTab("books")} className="text-[11px] text-[#0069A8] hover:underline">
                  Barchasini ko'rish →
                </button>
              </div>
              <div className="space-y-3">
                {loans.map((loan) => {
                  const st = STATUS_MAP[loan.status] || STATUS_MAP.active;
                  const StIcon = st.icon;
                  return (
                    <div key={loan.id} className="flex items-start gap-3 p-3.5 rounded-xl" style={{ background: "#F4F7FB" }}>
                      <div className="w-10 h-14 rounded-xl flex items-center justify-center flex-shrink-0 text-white text-[9px] font-bold"
                        style={{ background: loan.book.cover_color || "#0069A8" }}>
                        <BookOpen size={14} className="opacity-60" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-[13px] text-[#102033]">{loan.book.title}</div>
                        <div className="text-gray-400 text-[11px]">{loan.book.author}</div>
                        <div className="flex items-center gap-1 mt-1.5 text-[11px] text-gray-400">
                          <Clock size={10} />
                          {loan.due_date} ga qadar
                          {loan.days_remaining > 0 && ` · ${loan.days_remaining} kun`}
                          {loan.days_remaining === 0 && " · Bugun!"}
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

            {/* Right column */}
            <div className="lg:col-span-2 space-y-4">
              {/* Notifications */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <h3 className="font-bold text-[#002B4A] text-[14px] mb-3 flex items-center gap-2">
                  <Bell size={13} className="text-[#0069A8]" />
                  Bildirishnomalar
                </h3>
                <div className="space-y-2.5">
                  {notifs.map((n) => (
                    <div key={n.id} className={`p-3 rounded-xl text-[11.5px] leading-snug border ${
                      n.type === "warning" ? "bg-amber-50 border-amber-100 text-amber-800"
                      : n.type === "success" ? "bg-green-50 border-green-100 text-green-800"
                      : "bg-blue-50 border-blue-100 text-blue-800"
                    }`}>
                      <div>{n.text}</div>
                      <div className="text-[9px] opacity-60 mt-1">{n.time}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Profile details */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <h3 className="font-bold text-[#002B4A] text-[14px] mb-3">Profil ma'lumotlari</h3>
                <div className="space-y-2">
                  {[
                    { label: "Talaba ID", val: profile.student_id },
                    { label: "Kirish yili", val: `${profile.enrollment_year}-yil` },
                    { label: "Stipendiya", val: profile.scholarship },
                    { label: "GPA", val: `${profile.gpa} / 5.0` },
                  ].map(r => (
                    <div key={r.label} className="flex justify-between text-[11.5px] border-b border-gray-50 pb-1.5">
                      <span className="text-gray-400">{r.label}</span>
                      <span className="font-semibold text-gray-700">{r.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== BOOKS TAB ===== */}
        {tab === "books" && (
          <div className="space-y-5">
            {/* Active loans table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="font-bold text-[#002B4A] text-[15px]">Faol ijaralar ({loans.length})</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {loans.map((loan) => {
                  const st = STATUS_MAP[loan.status];
                  const StIcon = st.icon;
                  return (
                    <div key={loan.id} className="flex items-start gap-4 px-6 py-4">
                      <div className="w-10 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: loan.book.cover_color || "#0069A8" }}>
                        <BookOpen size={14} className="text-white/70" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-[13.5px] text-[#102033]">{loan.book.title}</div>
                        <div className="text-gray-400 text-[11.5px]">{loan.book.author}</div>
                        <div className="flex items-center gap-4 mt-2 text-[11px] text-gray-400">
                          <span>Olingan: {loan.borrowed_date}</span>
                          <span>Qaytarish: {loan.due_date}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${st.bg} ${st.color}`}>
                          <StIcon size={10} />{st.label}
                        </span>
                        {loan.days_remaining > 0
                          ? <span className="text-gray-400 text-[11px]">{loan.days_remaining} kun qoldi</span>
                          : <span className="text-red-600 text-[11px] font-bold">Bugun!</span>
                        }
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Reservations */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="font-bold text-[#002B4A] text-[15px]">Band qilingan kitoblar ({resv.length})</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {resv.map((r) => {
                  const st = STATUS_MAP[r.status];
                  const StIcon = st.icon;
                  return (
                    <div key={r.id} className="flex items-start gap-4 px-6 py-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <BookMarked size={16} className="text-[#0069A8]" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-[13.5px] text-[#102033]">{r.book.title}</div>
                        <div className="text-gray-400 text-[11.5px]">{r.book.author}</div>
                        <div className="text-[11px] text-gray-400 mt-1">
                          Olib ketish: {r.pickup_date} soat {r.pickup_time}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${st.bg} ${st.color}`}>
                          <StIcon size={10} />{st.label}
                        </span>
                        {r.qr_code && (
                          <div className="flex items-center gap-1 text-[10px] text-[#0069A8]">
                            <QrCode size={10} /> QR tayyor
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ===== ROOMS TAB ===== */}
        {tab === "rooms" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-[#002B4A] text-[15px]">O'quv zali bronlari ({rooms.length})</h3>
              <Link href="/library/reading-room"
                className="flex items-center gap-1.5 px-4 py-2 bg-[#0069A8] text-white rounded-xl text-[12px] font-bold hover:opacity-90 transition-opacity">
                <Calendar size={13} /> Yangi bron
              </Link>
            </div>
            <div className="divide-y divide-gray-50">
              {rooms.map((room) => {
                const st = STATUS_MAP[room.status];
                const StIcon = st.icon;
                return (
                  <div key={room.id} className="flex items-start gap-4 px-6 py-5">
                    <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0">
                      <Calendar size={20} className="text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-[14px] text-[#102033]">{room.room}</div>
                      <div className="flex items-center gap-4 mt-1.5 text-[12px] text-gray-500">
                        <span>O'rindiq: <strong>{room.seat}</strong></span>
                        <span>Sana: <strong>{room.date}</strong></span>
                        <span>Vaqt: <strong>{room.time_from}–{room.time_to}</strong></span>
                      </div>
                    </div>
                    <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${st.bg} ${st.color}`}>
                      <StIcon size={10} />{st.label}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="px-6 py-4 bg-blue-50 border-t border-blue-100">
              <p className="text-[12px] text-blue-600">
                O'quv zali bronlari kutubxona ish vaqtida tasdiqlash talab qiladi. QR kodingiz bronlashdan so'ng yuboriladi.
              </p>
            </div>
          </div>
        )}

        {/* ===== AI TAB ===== */}
        {tab === "ai" && (
          <div>
            <div className="flex items-center gap-3 mb-5 p-4 bg-indigo-50 border border-indigo-100 rounded-2xl">
              <Bot size={18} className="text-indigo-600 flex-shrink-0" />
              <p className="text-[12.5px] text-indigo-700">
                AI kutubxonachi sizning o'qiyotgan fanlari va ijaraga olingan kitoblar asosida {recs.length} ta resurs tavsiya qildi.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recs.map((rec) => (
                <div key={rec.id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                      <BookOpen size={16} className="text-indigo-600" />
                    </div>
                    <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                      {rec.match_percent}% mos
                    </span>
                  </div>
                  <h4 className="font-bold text-[13px] text-[#102033] mb-1 leading-snug">{rec.title}</h4>
                  <p className="text-gray-400 text-[11px] mb-1">{rec.subject}</p>
                  <p className="text-gray-300 text-[10.5px] mb-4">{rec.department}</p>
                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#0069A8] text-white rounded-xl text-[11px] font-semibold hover:opacity-90 transition-opacity">
                      <ExternalLink size={11} />Ko'rish
                    </button>
                    <button className="flex items-center justify-center gap-1.5 px-3 py-2 border border-gray-200 rounded-xl text-[11px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                      <Download size={11} />
                    </button>
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
