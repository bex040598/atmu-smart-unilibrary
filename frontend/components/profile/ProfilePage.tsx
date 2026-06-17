"use client";
import { useState, useEffect } from "react";
import { useRouter } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { getUser, isAuthenticated } from "@/lib/auth";
import { usersApi, loansApi, reservationsApi } from "@/lib/api";
import { User, BookOpen, Calendar, Clock, AlertTriangle, Shield, Zap, Edit } from "lucide-react";
import FaceCapture from "@/components/face-id/FaceCapture";
import { useTranslations } from "next-intl";

const NAV = [
  { key: "overview", label: "Umumiy", icon: User },
  { key: "library", label: "Kutubxona", icon: BookOpen },
  { key: "reservations", label: "Bronlar", icon: Calendar },
  { key: "face-id", label: "Face ID", icon: Zap },
  { key: "security", label: "Xavfsizlik", icon: Shield },
];

export default function ProfilePage() {
  const t = useTranslations("profile");
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [summary, setSummary] = useState<any>(null);
  const [loans, setLoans] = useState<any[]>([]);
  const [reservations, setReservations] = useState<any[]>([]);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth/login");
      return;
    }
    const localUser = getUser();
    setUser(localUser);

    // Load data
    usersApi.librarySummary().then(r => setSummary(r.data)).catch(() => {});
    loansApi.my().then(r => setLoans(r.data)).catch(() => {});
    reservationsApi.my().then(r => setReservations(r.data)).catch(() => {});
  }, []);

  if (!user) return (
    <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center">
      <div className="text-gray-500">Yuklanmoqda...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Header */}
      <div className="gradient-navy py-12 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center text-4xl font-bold text-white shadow-lg">
            {user.full_name?.[0]?.toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{user.full_name}</h1>
            <div className="text-blue-300 text-sm capitalize mt-1">{user.role} · {user.email}</div>
            {user.student_id && <div className="text-blue-400 text-xs mt-0.5">ID: {user.student_id}</div>}
          </div>
          <Link href="/profile/edit" className="ml-auto flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-xl text-sm hover:bg-white/20 transition-colors">
            <Edit className="w-4 h-4" />
            Tahrirlash
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Sidebar nav */}
          <div className="hidden lg:block w-52 shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 p-3 shadow-sm sticky top-20">
              {NAV.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setActiveTab(item.key)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all mb-1 ${
                    activeTab === item.key
                      ? "bg-[#1457A8] text-white font-semibold"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            {activeTab === "overview" && (
              <div className="space-y-4">
                {/* Summary stats */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { label: t("activeLoans"), value: summary?.active_loans ?? loans.filter(l => l.status === "active").length, color: "text-blue-600", bg: "bg-blue-50" },
                    { label: t("overdueLoans"), value: summary?.overdue_loans ?? loans.filter(l => l.is_overdue).length, color: "text-red-600", bg: "bg-red-50" },
                    { label: t("pendingReservations"), value: summary?.pending_reservations ?? reservations.filter(r => r.status === "pending").length, color: "text-amber-600", bg: "bg-amber-50" },
                  ].map((stat) => (
                    <div key={stat.label} className={`${stat.bg} rounded-2xl p-5`}>
                      <div className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Profile info */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                  <h3 className="font-bold text-[#061B3A] mb-4">Shaxsiy ma'lumotlar</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "To'liq ism", value: user.full_name },
                      { label: "Email", value: user.email },
                      { label: "Rol", value: user.role },
                      { label: "Telefon", value: user.phone || "—" },
                      { label: "Kurs", value: user.course ? `${user.course}-kurs` : "—" },
                      { label: "Semestr", value: user.semester ? `${user.semester}-semestr` : "—" },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <div className="text-xs text-gray-400 mb-0.5">{label}</div>
                        <div className="text-sm font-medium text-[#172033]">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "library" && (
              <div className="space-y-4">
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                  <h3 className="font-bold text-[#061B3A] mb-4">Mening kitoblarim</h3>
                  {loans.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                      <BookOpen className="w-10 h-10 mx-auto mb-2 opacity-30" />
                      <p className="text-sm">Hozircha faol kitob yo'q</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {loans.map((loan: any) => (
                        <div key={loan.id} className="flex items-start gap-3 p-3 bg-[#F5F7FA] rounded-xl">
                          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                            <BookOpen className="w-5 h-5 text-[#1457A8]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm text-[#172033] truncate">{loan.book?.title || "Kitob"}</div>
                            <div className="text-xs text-gray-400 mt-0.5">{loan.book?.author}</div>
                            <div className="flex items-center gap-2 mt-2">
                              <Clock className="w-3.5 h-3.5 text-gray-400" />
                              <span className="text-xs text-gray-500">
                                {loan.is_overdue ? (
                                  <span className="text-red-600 font-semibold flex items-center gap-1">
                                    <AlertTriangle className="w-3.5 h-3.5" /> Muddati o'tgan!
                                  </span>
                                ) : loan.days_remaining !== null ? (
                                  <span>{loan.days_remaining} kun qoldi</span>
                                ) : "Qaytarilgan"}
                              </span>
                            </div>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                            loan.status === "active" ? "bg-blue-100 text-blue-700" :
                            loan.status === "returned" ? "bg-green-100 text-green-700" :
                            "bg-red-100 text-red-700"
                          }`}>
                            {loan.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "reservations" && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h3 className="font-bold text-[#061B3A] mb-4">Kitob bronlari</h3>
                {reservations.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <Calendar className="w-10 h-10 mx-auto mb-2 opacity-30" />
                    <p className="text-sm">Bronlar yo'q</p>
                    <Link href="/catalog" className="mt-3 inline-block text-xs text-[#1457A8] hover:underline">
                      Katalogga o'tish →
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {reservations.map((res: any) => (
                      <div key={res.id} className="flex items-start gap-3 p-3 bg-[#F5F7FA] rounded-xl">
                        <div className="flex-1">
                          <div className="font-semibold text-sm text-[#172033]">{res.book?.title || "Kitob"}</div>
                          <div className="text-xs text-gray-400 mt-0.5">{res.book?.author}</div>
                        </div>
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          res.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                          res.status === "approved" ? "bg-green-100 text-green-700" :
                          res.status === "rejected" ? "bg-red-100 text-red-700" :
                          "bg-gray-100 text-gray-700"
                        }`}>
                          {res.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "face-id" && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h3 className="font-bold text-[#061B3A] mb-2">Face ID</h3>
                <p className="text-gray-500 text-sm mb-6">Yuzingizni ro'yxatdan o'tkazing va tez kirish imkoniga ega bo'ling</p>
                <FaceCapture mode="register" />
              </div>
            )}

            {activeTab === "security" && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h3 className="font-bold text-[#061B3A] mb-4">Xavfsizlik</h3>
                <div className="space-y-4">
                  <div className="p-4 border border-gray-100 rounded-xl">
                    <div className="font-medium text-sm text-[#172033] mb-1">Parolni o'zgartirish</div>
                    <div className="text-xs text-gray-400 mb-3">Xavfsizligingiz uchun muntazam parol o'zgartiring</div>
                    <button className="text-xs text-[#1457A8] font-medium hover:underline">Parolni o'zgartirish →</button>
                  </div>
                  <div className="p-4 border border-gray-100 rounded-xl">
                    <div className="font-medium text-sm text-[#172033] mb-1">Faol sessiyalar</div>
                    <div className="text-xs text-gray-400 mb-3">Joriy qurilmadan kirish faol</div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                      <span className="text-gray-600">Windows — Chrome — Toshkent</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
