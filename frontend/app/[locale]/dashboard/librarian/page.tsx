"use client";
import { useState, useEffect } from "react";
import { getUser, isAuthenticated } from "@/lib/auth";
import { useRouter, Link } from "@/i18n/navigation";
import { reservationsApi, loansApi, resourcesApi } from "@/lib/api";
import { BookOpen, CheckCircle, Clock, AlertTriangle, Users, Calendar } from "lucide-react";

export default function LibrarianDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [reservations, setReservations] = useState<any[]>([]);
  const [overdueLoans, setOverdueLoans] = useState<any[]>([]);
  const [pendingResources, setPendingResources] = useState<any[]>([]);

  useEffect(() => {
    if (!isAuthenticated()) { router.push("/auth/login"); return; }
    setUser(getUser());
    reservationsApi.all("pending").then(r => setReservations(r.data || [])).catch(() => {});
    loansApi.overdue().then(r => setOverdueLoans(r.data || [])).catch(() => {});
    resourcesApi.list({ status: "pending_review" }).then(r => setPendingResources(r.data || [])).catch(() => {});
  }, []);

  const handleApproveRes = async (id: number) => {
    await reservationsApi.approve(id);
    setReservations(prev => prev.filter(r => r.id !== id));
  };

  const handleApproveResource = async (id: number) => {
    await resourcesApi.approve(id);
    setPendingResources(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#061B3A]">Kutubxonachi paneli</h1>
        <p className="text-gray-500 text-sm">{user?.full_name}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Clock, v: reservations.length, l: "Kutayotgan bronlar", color: "text-amber-600", bg: "bg-amber-50" },
          { icon: AlertTriangle, v: overdueLoans.length, l: "Muddati o'tgan", color: "text-red-600", bg: "bg-red-50" },
          { icon: BookOpen, v: pendingResources.length, l: "Tekshirishda resurslar", color: "text-blue-600", bg: "bg-blue-50" },
          { icon: CheckCircle, v: 0, l: "Bugun tasdiqlangan", color: "text-emerald-600", bg: "bg-emerald-50" },
        ].map(({ icon: Icon, v, l, color, bg }) => (
          <div key={l} className={`${bg} rounded-2xl p-5`}>
            <Icon className={`w-6 h-6 ${color} mb-2`} />
            <div className={`text-3xl font-bold ${color}`}>{v}</div>
            <div className="text-sm text-gray-600 mt-1">{l}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending reservations */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="font-bold text-[#061B3A] mb-4">Kutayotgan kitob bronlari</h3>
          {reservations.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-sm">Kutayotgan bronlar yo'q</div>
          ) : (
            <div className="space-y-3">
              {reservations.map((res: any) => (
                <div key={res.id} className="p-3 bg-[#F5F7FA] rounded-xl">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-semibold text-sm text-[#172033]">Kitob #{res.book_id}</div>
                      <div className="text-xs text-gray-400">Foydalanuvchi #{res.user_id}</div>
                    </div>
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">Kutilmoqda</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApproveRes(res.id)}
                      className="flex-1 py-1.5 bg-emerald-500 text-white text-xs font-semibold rounded-lg hover:bg-emerald-600"
                    >
                      ✓ Tasdiqlash
                    </button>
                    <button
                      onClick={() => reservationsApi.reject(res.id, "Mavjud emas").then(() => setReservations(prev => prev.filter(r => r.id !== res.id)))}
                      className="flex-1 py-1.5 bg-red-100 text-red-700 text-xs font-semibold rounded-lg hover:bg-red-200"
                    >
                      ✗ Rad etish
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pending resources */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="font-bold text-[#061B3A] mb-4">Tekshirishda resurslar</h3>
          {pendingResources.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-sm">Tekshiriladigan resurs yo'q</div>
          ) : (
            <div className="space-y-3">
              {pendingResources.map((r: any) => (
                <div key={r.id} className="p-3 bg-[#F5F7FA] rounded-xl">
                  <div className="font-semibold text-sm text-[#172033] mb-1">{r.title}</div>
                  <div className="text-xs text-gray-400 mb-2">{r.material_type} · {r.language}</div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApproveResource(r.id)}
                      className="flex-1 py-1.5 bg-emerald-500 text-white text-xs font-semibold rounded-lg hover:bg-emerald-600"
                    >
                      ✓ Tasdiqlash
                    </button>
                    <button
                      onClick={() => resourcesApi.reject(r.id, "Sifat talablariga to'g'ri kelmaydi").then(() => setPendingResources(prev => prev.filter(p => p.id !== r.id)))}
                      className="flex-1 py-1.5 bg-red-100 text-red-700 text-xs font-semibold rounded-lg hover:bg-red-200"
                    >
                      ✗ Rad etish
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Overdue loans */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="font-bold text-[#061B3A] mb-4">Muddati o'tgan kitoblar</h3>
          {overdueLoans.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-sm">Muddati o'tgan kitob yo'q</div>
          ) : (
            <div className="space-y-3">
              {overdueLoans.map((loan: any) => (
                <div key={loan.id} className="flex items-center gap-3 p-3 bg-red-50 rounded-xl">
                  <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-[#172033]">Ijarachi #{loan.user_id}</div>
                    <div className="text-xs text-red-600">Kitob #{loan.book_id} — muddati o'tgan</div>
                  </div>
                  <button
                    onClick={() => loansApi.return(loan.id).then(() => setOverdueLoans(prev => prev.filter(l => l.id !== loan.id)))}
                    className="text-xs bg-red-100 text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-200"
                  >
                    Qaytarildi
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick links */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="font-bold text-[#061B3A] mb-4">Tezkor harakatlar</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { href: "/catalog", label: "Katalog", icon: BookOpen },
              { href: "/library/reading-room", label: "O'quv zali", icon: Calendar },
            ].map((a) => (
              <Link key={a.href} href={a.href} className="flex flex-col items-center p-4 bg-blue-50 text-[#1457A8] rounded-xl hover:bg-blue-100 transition-colors">
                <a.icon className="w-6 h-6 mb-1.5" />
                <span className="text-xs font-medium">{a.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
