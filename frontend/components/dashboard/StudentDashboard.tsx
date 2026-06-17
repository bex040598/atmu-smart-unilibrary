"use client";
import { useState, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import { getUser, isAuthenticated } from "@/lib/auth";
import { loansApi, reservationsApi, readingRoomApi } from "@/lib/api";
import { BookOpen, Calendar, Clock, AlertTriangle, Bot, Zap, TrendingUp, BookMarked } from "lucide-react";
import { useRouter } from "@/i18n/navigation";

export default function StudentDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loans, setLoans] = useState<any[]>([]);
  const [reservations, setReservations] = useState<any[]>([]);

  useEffect(() => {
    if (!isAuthenticated()) { router.push("/auth/login"); return; }
    setUser(getUser());
    loansApi.my().then(r => setLoans(r.data || [])).catch(() => {});
    reservationsApi.my().then(r => setReservations(r.data || [])).catch(() => {});
  }, []);

  const activeLoans = loans.filter(l => l.status === "active");
  const overdueLoans = loans.filter(l => l.is_overdue);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#061B3A]">
          Xush kelibsiz, {user?.full_name?.split(" ")[0] || "Talaba"}! 👋
        </h1>
        <p className="text-gray-500 text-sm mt-1">Bugun {new Date().toLocaleDateString("uz-UZ", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
      </div>

      {/* Overdue alert */}
      {overdueLoans.length > 0 && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
          <div>
            <div className="font-semibold text-red-700 text-sm">{overdueLoans.length} ta kitob muddati o'tgan!</div>
            <div className="text-red-600 text-xs mt-0.5">Jarima to'liq bo'lishdan oldin kutubxonaga qaytaring.</div>
          </div>
          <Link href="/profile/library" className="ml-auto text-xs text-red-700 font-medium hover:underline">Ko'rish →</Link>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { icon: BookOpen, v: activeLoans.length, l: "Faol kitoblar", color: "text-blue-600", bg: "bg-blue-50" },
          { icon: AlertTriangle, v: overdueLoans.length, l: "Muddati o'tgan", color: "text-red-600", bg: "bg-red-50" },
          { icon: BookMarked, v: reservations.filter(r => r.status === "pending" || r.status === "approved").length, l: "Bronlar", color: "text-amber-600", bg: "bg-amber-50" },
          { icon: TrendingUp, v: loans.length, l: "Jami ijaralar", color: "text-emerald-600", bg: "bg-emerald-50" },
        ].map(({ icon: Icon, v, l, color, bg }) => (
          <div key={l} className={`${bg} rounded-2xl p-5`}>
            <Icon className={`w-6 h-6 ${color} mb-2`} />
            <div className={`text-3xl font-bold ${color}`}>{v}</div>
            <div className="text-sm text-gray-600 mt-1">{l}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active loans */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[#061B3A]">Faol kitoblar</h3>
            <Link href="/profile/library" className="text-xs text-[#1457A8] hover:underline">Hammasini ko'rish →</Link>
          </div>
          {activeLoans.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <BookOpen className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p className="text-sm">Faol kitob yo'q</p>
              <Link href="/catalog" className="text-xs text-[#1457A8] hover:underline mt-2 block">Katalogga o'tish →</Link>
            </div>
          ) : (
            <div className="space-y-3">
              {activeLoans.slice(0, 3).map((loan: any) => (
                <div key={loan.id} className="flex items-start gap-3 p-3 bg-[#F5F7FA] rounded-xl">
                  <div className="w-10 h-14 bg-gradient-to-br from-[#1457A8] to-[#008C95] rounded-lg flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4 text-white/70" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-[#172033] truncate">{loan.book?.title || "Kitob"}</div>
                    <div className="text-xs text-gray-400">{loan.book?.author}</div>
                    <div className={`flex items-center gap-1.5 mt-1.5 text-xs ${loan.is_overdue ? "text-red-600 font-semibold" : "text-gray-500"}`}>
                      <Clock className="w-3 h-3" />
                      {loan.is_overdue ? "Muddati o'tgan!" : `${loan.days_remaining} kun qoldi`}
                    </div>
                  </div>
                  {loan.days_remaining !== null && loan.days_remaining <= 3 && !loan.is_overdue && (
                    <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full shrink-0">Yaqinlashdi</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="font-bold text-[#061B3A] mb-4">Tezkor harakatlar</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { href: "/catalog", icon: BookOpen, label: "Kitob qidirish", color: "bg-blue-50 text-[#1457A8]" },
              { href: "/library/reading-room", icon: Calendar, label: "O'quv zali", color: "bg-teal-50 text-[#008C95]" },
              { href: "/ai", icon: Bot, label: "AI kutubxonachi", color: "bg-amber-50 text-[#D6A84F]" },
              { href: "/profile/face-id", icon: Zap, label: "Face ID", color: "bg-purple-50 text-[#8B5CF6]" },
              { href: "/departments", icon: TrendingUp, label: "Kafedralar", color: "bg-emerald-50 text-[#0E9F6E]" },
              { href: "/profile/reservations", icon: BookMarked, label: "Bronlarim", color: "bg-red-50 text-[#EF4444]" },
            ].map((a) => (
              <Link key={a.href} href={a.href} className={`flex flex-col items-center p-4 ${a.color} rounded-xl hover:opacity-80 transition-opacity`}>
                <a.icon className="w-6 h-6 mb-1.5" />
                <span className="text-xs font-medium text-center">{a.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
