"use client";
import { useState, useEffect } from "react";
import { getUser, isAuthenticated } from "@/lib/auth";
import { useRouter } from "@/i18n/navigation";
import { resourcesApi } from "@/lib/api";
import { BookOpen, CheckCircle, Clock, XCircle, TrendingUp } from "lucide-react";

export default function DepartmentDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [resources, setResources] = useState<any[]>([]);

  useEffect(() => {
    if (!isAuthenticated()) { router.push("/auth/login"); return; }
    setUser(getUser());
    resourcesApi.list({ status: "pending_review" }).then(r => setResources(r.data || [])).catch(() => {});
  }, []);

  const handleApprove = async (id: number) => {
    await resourcesApi.approve(id);
    setResources(prev => prev.filter(r => r.id !== id));
  };

  const handleReject = async (id: number) => {
    await resourcesApi.reject(id, "Kafedra mudiri rad etdi");
    setResources(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#061B3A]">Kafedra mudiri paneli</h1>
        <p className="text-gray-500 text-sm">{user?.full_name}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Clock, v: resources.length, l: "Kutilayotgan resurslar", color: "text-amber-600", bg: "bg-amber-50" },
          { icon: CheckCircle, v: 0, l: "Tasdiqlangan", color: "text-emerald-600", bg: "bg-emerald-50" },
          { icon: XCircle, v: 0, l: "Rad etilgan", color: "text-red-600", bg: "bg-red-50" },
          { icon: TrendingUp, v: 0, l: "Jami resurslar", color: "text-blue-600", bg: "bg-blue-50" },
        ].map(({ icon: Icon, v, l, color, bg }) => (
          <div key={l} className={`${bg} rounded-2xl p-5`}>
            <Icon className={`w-6 h-6 ${color} mb-2`} />
            <div className={`text-3xl font-bold ${color}`}>{v}</div>
            <div className="text-sm text-gray-600 mt-1">{l}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h3 className="font-bold text-[#061B3A] mb-4">Tasdiqlash kutilayotgan resurslar</h3>
        {resources.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <CheckCircle className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Tasdiqlash uchun resurs yo'q</p>
          </div>
        ) : (
          <div className="space-y-4">
            {resources.map((r: any) => (
              <div key={r.id} className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-bold text-[#172033]">{r.title}</div>
                    <div className="text-sm text-gray-500 mt-0.5">{r.material_type} · {r.language} · {r.course ? `${r.course}-kurs` : ""}</div>
                    {r.description && <p className="text-sm text-gray-600 mt-2">{r.description}</p>}
                  </div>
                  <div className="text-xs bg-yellow-100 text-yellow-700 px-2.5 py-1 rounded-full font-medium">Kutilmoqda</div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleApprove(r.id)}
                    className="flex-1 py-2.5 bg-emerald-500 text-white text-sm font-semibold rounded-xl hover:bg-emerald-600"
                  >
                    ✓ Tasdiqlash
                  </button>
                  <button
                    onClick={() => handleReject(r.id)}
                    className="flex-1 py-2.5 bg-red-50 text-red-600 text-sm font-semibold rounded-xl hover:bg-red-100 border border-red-200"
                  >
                    ✗ Rad etish
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
