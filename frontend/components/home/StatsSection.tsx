"use client";
import { useEffect, useState } from "react";
import { BookOpen, Building2, Upload, BookMarked, Users, Bot } from "lucide-react";
import { reportsApi } from "@/lib/api";

const DEFAULTS = [
  { icon: BookOpen, value: "—", label: "Jami elektron resurslar", color: "text-[#1457A8]", bg: "bg-blue-50", key: "total_resources" },
  { icon: Building2, value: "6", label: "Kafedralar", color: "text-[#008C95]", bg: "bg-teal-50", key: "total_departments" },
  { icon: Upload, value: "—", label: "Bugun yuklangan", color: "text-[#0E9F6E]", bg: "bg-emerald-50", key: "uploaded_today" },
  { icon: BookMarked, value: "—", label: "Faol kitob ijaralari", color: "text-[#D6A84F]", bg: "bg-amber-50", key: "active_loans" },
  { icon: Users, value: "—", label: "Bo'sh o'quv zali joylari", color: "text-[#8B5CF6]", bg: "bg-purple-50", key: "available_seats" },
  { icon: Bot, value: "—", label: "AI so'rovlar (bugun)", color: "text-[#EF4444]", bg: "bg-red-50", key: "ai_queries_today" },
];

export default function StatsSection() {
  const [stats, setStats] = useState<Record<string, number | string>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    reportsApi.publicStats()
      .then((r) => { setStats(r.data || {}); setLoaded(true); })
      .catch(() => setLoaded(true));
  }, []);

  const fmt = (v: number | string | undefined) => {
    if (v === undefined || v === null) return "—";
    if (typeof v === "number" && v >= 1000) return v.toLocaleString("uz-UZ");
    return String(v);
  };

  return (
    <section className="py-10 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {DEFAULTS.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center p-4 rounded-2xl hover:shadow-md transition-all duration-300 group cursor-default"
            >
              <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className={`text-2xl font-bold ${stat.color} mb-1 transition-all duration-700 ${loaded ? "opacity-100" : "opacity-30 animate-pulse"}`}>
                {loaded ? fmt(stats[stat.key]) || stat.value : "…"}
              </div>
              <div className="text-xs text-gray-500 leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
