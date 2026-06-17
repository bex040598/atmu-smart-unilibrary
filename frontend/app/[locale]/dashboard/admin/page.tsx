"use client";
import { useState, useEffect } from "react";
import { getUser, isAuthenticated } from "@/lib/auth";
import { useRouter, Link } from "@/i18n/navigation";
import { reportsApi } from "@/lib/api";
import { Users, BookOpen, Calendar, TrendingUp, Shield, Settings, BarChart2, AlertTriangle } from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [report, setReport] = useState<any>(null);

  useEffect(() => {
    if (!isAuthenticated()) { router.push("/auth/login"); return; }
    setUser(getUser());
    reportsApi.library().then(r => setReport(r.data)).catch(() => {});
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#061B3A]">Admin paneli</h1>
        <p className="text-gray-500 text-sm">{user?.full_name} — Tizim administratori</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { icon: BookOpen, v: report?.total_resources ?? "—", l: "Jami resurslar", color: "text-blue-600", bg: "bg-blue-50" },
          { icon: BarChart2, v: report?.total_books ?? "—", l: "Kitoblar", color: "text-teal-600", bg: "bg-teal-50" },
          { icon: TrendingUp, v: report?.active_loans ?? "—", l: "Faol ijaralar", color: "text-emerald-600", bg: "bg-emerald-50" },
          { icon: AlertTriangle, v: report?.overdue_loans ?? "—", l: "Muddati o'tgan", color: "text-red-600", bg: "bg-red-50" },
        ].map(({ icon: Icon, v, l, color, bg }) => (
          <div key={l} className={`${bg} rounded-2xl p-5`}>
            <Icon className={`w-6 h-6 ${color} mb-2`} />
            <div className={`text-3xl font-bold ${color}`}>{v}</div>
            <div className="text-sm text-gray-600 mt-1">{l}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { href: "/departments", icon: "🏛️", label: "Kafedralar", desc: "Kafedralarni boshqarish" },
          { href: "/catalog", icon: "📚", label: "Katalog", desc: "Kitoblar va resurslar" },
          { href: "/library/reading-room", icon: "🪑", label: "O'quv zali", desc: "Seat boshqaruvi" },
          { href: "/ai", icon: "🤖", label: "AI Logs", desc: "AI so'rovlari tarixi" },
          { href: "/profile", icon: "👤", label: "Foydalanuvchilar", desc: "Users management" },
          { href: "/profile/security", icon: "🔐", label: "Xavfsizlik", desc: "Audit logs" },
        ].map((item) => (
          <Link key={item.href} href={item.href} className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-lg transition-all card-hover">
            <div className="text-3xl mb-3">{item.icon}</div>
            <div className="font-bold text-[#172033]">{item.label}</div>
            <div className="text-sm text-gray-400 mt-0.5">{item.desc}</div>
          </Link>
        ))}
      </div>

      {/* System health */}
      <div className="mt-6 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-[#061B3A] mb-4">Tizim holati</h3>
        <div className="space-y-3">
          {[
            { label: "FastAPI Backend", status: "Faol", color: "text-emerald-600 bg-emerald-50" },
            { label: "PostgreSQL Database", status: "Ulangan", color: "text-emerald-600 bg-emerald-50" },
            { label: "File Storage", status: "Faol", color: "text-emerald-600 bg-emerald-50" },
            { label: "AI Service", status: "Ishga tayyor", color: "text-amber-600 bg-amber-50" },
            { label: "Face ID Service", status: "Faol (demo)", color: "text-blue-600 bg-blue-50" },
          ].map(({ label, status, color }) => (
            <div key={label} className="flex items-center justify-between p-3 bg-[#F5F7FA] rounded-xl">
              <span className="text-sm font-medium text-gray-700">{label}</span>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${color}`}>{status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
