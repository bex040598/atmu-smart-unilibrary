"use client";
import { useState, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import { useRouter } from "@/i18n/navigation";
import { getUser, isAuthenticated } from "@/lib/auth";
import { loansApi, reservationsApi } from "@/lib/api";
import {
  BookOpen, Calendar, Clock, AlertTriangle, Brain,
  BookMarked, TrendingUp, Bot, Zap, CheckCircle, Bell
} from "lucide-react";

/* ---- Seed data used when backend returns empty ---- */
const SEED_LOANS = [
  { id: 1, book: { title: "Algoritm va ma'lumotlar tuzilmasi", author: "T. Cormen" }, days_remaining: 8, is_overdue: false, due_date: "25 Iyun 2026" },
  { id: 2, book: { title: "Python dasturlash asoslari", author: "M. Lutz" }, days_remaining: 2, is_overdue: false, due_date: "20 Iyun 2026" },
  { id: 3, book: { title: "Ma'lumotlar bazasi", author: "R. Elmasri" }, days_remaining: 15, is_overdue: false, due_date: "3 Iyul 2026" },
];
const SEED_RESERVATIONS = [
  { id: 1, book: { title: "Clean Code", author: "Robert Martin" }, pickup_date: "18 Iyun 2026", status: "approved" },
  { id: 2, book: { title: "Design Patterns", author: "Gang of Four" }, pickup_date: "20 Iyun 2026", status: "pending" },
];
const SEED_NOTIFICATIONS = [
  { id: 1, type: "warning", text: "«Python dasturlash asoslari» kitobini qaytarish muddati 2 kunga qoldi." },
  { id: 2, type: "success", text: "«Clean Code» uchun broningiz tasdiqlandi. 18 Iyun ga qadar oling." },
  { id: 3, type: "info", text: "Axborot texnologiyalari kafedrasi yangi 12 ta material qo'shdi." },
];

export default function StudentDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loans, setLoans] = useState<any[]>([]);
  const [reservations, setReservations] = useState<any[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) { router.push("/auth/login"); return; }
    setUser(getUser());
    Promise.all([
      loansApi.my().then(r => r.data || []).catch(() => []),
      reservationsApi.my().then(r => r.data || []).catch(() => []),
    ]).then(([l, res]) => {
      setLoans(l.length ? l : SEED_LOANS);
      setReservations(res.length ? res : SEED_RESERVATIONS);
      setReady(true);
    });
  }, []);

  const activeLoans = loans.filter(l => !l.is_overdue);
  const overdueLoans = loans.filter(l => l.is_overdue);
  const dueSoon = loans.filter(l => !l.is_overdue && (l.days_remaining ?? 99) <= 3);

  const STATS = [
    { icon: BookOpen, val: activeLoans.length || 3, label: "Faol kitoblar", color: "text-[#0069A8]", bg: "bg-blue-50" },
    { icon: AlertTriangle, val: dueSoon.length || 1, label: "Muddati yaqin", color: "text-amber-600", bg: "bg-amber-50" },
    { icon: BookMarked, val: reservations.length || 2, label: "Bronlar", color: "text-emerald-600", bg: "bg-emerald-50" },
    { icon: TrendingUp, val: loans.length || 14, label: "Jami ijaralar", color: "text-purple-600", bg: "bg-purple-50" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#F4F7FB" }}>
      {/* Header band */}
      <div style={{ background: "linear-gradient(135deg,#002B4A,#0069A8)", paddingTop: "32px", paddingBottom: "56px" }}>
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-white/50 text-[12px] mb-1">
                {new Date().toLocaleDateString("uz-UZ", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              </p>
              <h1 className="text-white font-black text-[22px] sm:text-[26px] leading-tight">
                Xush kelibsiz, {user?.full_name?.split(" ")[0] || "Talaba"}!
              </h1>
              <p className="text-white/55 text-[13px] mt-1">Talaba shaxsiy kabineti</p>
            </div>
            <div className="flex gap-2">
              <Link href="/catalog"
                className="px-4 py-2 rounded-xl text-[12.5px] font-bold text-[#002B4A] hover:opacity-90 transition-all"
                style={{ background: "#F5B400" }}>
                Katalog
              </Link>
              <Link href="/library/reading-room"
                className="px-4 py-2 rounded-xl text-[12.5px] font-semibold text-white border border-white/25 hover:bg-white/10 transition-all">
                O'quv zali
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-5 sm:px-8 -mt-8 pb-16">
        {/* Overdue alert */}
        {overdueLoans.length > 0 && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3">
            <AlertTriangle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <div className="font-bold text-red-700 text-[13px]">{overdueLoans.length} ta kitob muddati o'tgan!</div>
              <div className="text-red-600 text-[11px] mt-0.5">Kutubxonaga qaytaring.</div>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {STATS.map(({ icon: Icon, val, label, color, bg }) => (
            <div key={label} className={`${bg} rounded-2xl p-5`}>
              <Icon size={20} className={`${color} mb-2`} />
              <div className={`text-3xl font-black ${color} leading-none`}>{val}</div>
              <div className="text-[12px] text-gray-600 mt-1.5">{label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* Active loans */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[#002B4A] text-[15px]">Faol kitoblar</h3>
              <Link href="/catalog" className="text-[11px] text-[#0069A8] hover:underline">Hammasini ko'rish</Link>
            </div>
            <div className="space-y-3">
              {(activeLoans.length ? activeLoans : SEED_LOANS).slice(0, 3).map((loan: any) => (
                <div key={loan.id} className="flex items-start gap-3 p-3.5 bg-[#F4F7FB] rounded-xl">
                  <div className="w-9 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "linear-gradient(135deg,#0069A8,#003D66)" }}>
                    <BookOpen size={14} className="text-white/80" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-[13px] text-[#102033] truncate">{loan.book?.title || "Kitob"}</div>
                    <div className="text-gray-400 text-[11px]">{loan.book?.author}</div>
                    <div className={`flex items-center gap-1 mt-1 text-[11px] font-medium ${(loan.days_remaining ?? 99) <= 3 && !loan.is_overdue ? "text-amber-600" : "text-gray-400"}`}>
                      <Clock size={10} />
                      {loan.due_date ? `${loan.due_date} ga qadar` : `${loan.days_remaining} kun qoldi`}
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
                    loan.is_overdue ? "bg-red-100 text-red-700" :
                    (loan.days_remaining ?? 99) <= 3 ? "bg-amber-100 text-amber-700" :
                    "bg-green-100 text-green-700"
                  }`}>
                    {loan.is_overdue ? "O'tdi" : (loan.days_remaining ?? 99) <= 3 ? "Yaqin" : "OK"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="lg:col-span-2 space-y-4">
            {/* Notifications */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Bell size={14} className="text-[#0069A8]" />
                <h3 className="font-bold text-[#002B4A] text-[14px]">Bildirishnomalar</h3>
              </div>
              <div className="space-y-2.5">
                {SEED_NOTIFICATIONS.map(n => (
                  <div key={n.id} className={`flex items-start gap-2.5 p-3 rounded-xl text-[11.5px] leading-snug ${
                    n.type === "warning" ? "bg-amber-50 text-amber-800 border border-amber-100" :
                    n.type === "success" ? "bg-green-50 text-green-800 border border-green-100" :
                    "bg-blue-50 text-blue-800 border border-blue-100"
                  }`}>
                    {n.type === "warning" ? <AlertTriangle size={12} className="mt-0.5 flex-shrink-0" /> :
                     n.type === "success" ? <CheckCircle size={12} className="mt-0.5 flex-shrink-0" /> :
                     <Bell size={12} className="mt-0.5 flex-shrink-0" />}
                    {n.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h3 className="font-bold text-[#002B4A] text-[14px] mb-3">Tezkor havolalar</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { href: "/catalog", icon: BookOpen, label: "Katalog", bg: "#dce8f5", color: "#0069A8" },
                  { href: "/library/reading-room", icon: Calendar, label: "O'quv zali", bg: "#d5f0e5", color: "#00A050" },
                  { href: "/ai", icon: Bot, label: "AI", bg: "#ede0f5", color: "#8855CC" },
                  { href: "/profile/student", icon: TrendingUp, label: "Profilim", bg: "#fff3cd", color: "#856404" },
                ].map(a => (
                  <Link key={a.href} href={a.href}
                    className="flex flex-col items-center gap-1.5 p-3 rounded-xl hover:opacity-80 transition-opacity"
                    style={{ background: a.bg }}>
                    <a.icon size={18} style={{ color: a.color }} />
                    <span className="text-[11px] font-semibold" style={{ color: a.color }}>{a.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Reservations */}
        <div className="mt-5 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[#002B4A] text-[15px]">Band qilingan kitoblar</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(reservations.length ? reservations : SEED_RESERVATIONS).map((r: any) => (
              <div key={r.id} className="flex items-start gap-3 p-4 border border-gray-100 rounded-xl">
                <BookMarked size={18} className="text-[#0069A8] flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-[13px] text-[#102033]">{r.book?.title}</div>
                  <div className="text-gray-400 text-[11px]">{r.pickup_date} — pickup</div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${r.status === "approved" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                  {r.status === "approved" ? "Tasdiqlangan" : "Kutilmoqda"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
