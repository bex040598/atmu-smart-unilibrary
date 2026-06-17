"use client";
import { use, useState, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import { departmentsApi, resourcesApi } from "@/lib/api";
import { BookOpen, Download, Eye, Filter, ArrowLeft, Bot, TrendingUp } from "lucide-react";
import { MATERIAL_TYPE_LABELS } from "@/lib/utils";

const DEPT_DATA: Record<string, any> = {
  "axborot-texnologiyalari": {
    name: "Axborot texnologiyalari kafedrasi",
    icon: "💻",
    color: "#1457A8",
    head: "Prof. Behruz Rahimov",
    resources: [
      { id: 1, title: "Ma'lumotlar bazasi: To'liq kurs", type: "textbook", author: "Dr. N. Yusupova", views: 342, downloads: 128, format: "PDF", lang: "uz", status: "approved" },
      { id: 2, title: "Python dasturlash: Amaliy qo'llanma", type: "study_guide", author: "Dr. N. Yusupova", views: 567, downloads: 234, format: "PDF", lang: "uz", status: "approved" },
      { id: 3, title: "Sun'iy intellekt va ML asoslari", type: "lecture", author: "Prof. B. Rahimov", views: 289, downloads: 97, format: "PDF", lang: "uz", status: "approved" },
      { id: 4, title: "Kompyuter tarmoqlari: Lab ishlari", type: "lab_work", author: "Dr. N. Yusupova", views: 198, downloads: 76, format: "PDF", lang: "uz", status: "approved" },
    ],
  },
};

const DEFAULT_DATA = {
  name: "Kafedra",
  icon: "📚",
  color: "#1457A8",
  head: "Kafedra mudiri",
  resources: [],
};

export default function DepartmentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [activeType, setActiveType] = useState("all");
  const dept = DEPT_DATA[slug] || DEFAULT_DATA;

  const TYPES = [
    { key: "all", label: "Hammasi" },
    { key: "textbook", label: "Darslik" },
    { key: "lecture", label: "Ma'ruza" },
    { key: "lab_work", label: "Laboratoriya" },
    { key: "study_guide", label: "Qo'llanma" },
    { key: "video", label: "Video" },
    { key: "article", label: "Maqola" },
  ];

  const filtered = activeType === "all"
    ? dept.resources
    : dept.resources.filter((r: any) => r.type === activeType);

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Header */}
      <div className="gradient-navy py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <Link href="/departments" className="flex items-center gap-2 text-white/60 hover:text-white text-sm mb-4 w-fit transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Kafedralar
          </Link>
          <div className="flex items-center gap-4">
            <div className="text-5xl">{dept.icon}</div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-white">{dept.name}</h1>
              <p className="text-blue-300 text-sm mt-1">Kafedra mudiri: {dept.head}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Sidebar + Content */}
        <div className="flex gap-6">
          {/* Left sidebar */}
          <div className="hidden lg:block w-56 shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm sticky top-20">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Bo'limlar</h3>
              {[
                { label: "Kafedra haqida", icon: "ℹ️" },
                { label: "Fanlar", icon: "📖" },
                { label: "O'qituvchilar", icon: "👨‍🏫" },
                { label: "Elektron resurslar", icon: "📁" },
                { label: "Ilmiy maqolalar", icon: "🔬" },
                { label: "Video darslar", icon: "🎥" },
                { label: "Bitiruv ishlari", icon: "🎓" },
                { label: "Statistika", icon: "📊" },
              ].map((item) => (
                <button key={item.label} className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-[#1457A8] rounded-lg transition-colors text-left">
                  <span>{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Filters */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6 shadow-sm">
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
                {TYPES.map((type) => (
                  <button
                    key={type.key}
                    onClick={() => setActiveType(type.key)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                      activeType === type.key
                        ? "bg-[#1457A8] text-white"
                        : "text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Resources grid */}
            {filtered.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>Bu turdagi resurslar hali mavjud emas</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filtered.map((r: any) => (
                  <div key={r.id} className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-lg transition-all card-hover">
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-[#1457A8]">
                        {MATERIAL_TYPE_LABELS[r.type] || r.type}
                      </span>
                      <span className="text-sm">{r.lang === "uz" ? "🇺🇿" : r.lang === "ru" ? "🇷🇺" : "🇬🇧"}</span>
                    </div>
                    <h4 className="font-bold text-[#172033] text-sm leading-snug mb-2">{r.title}</h4>
                    <div className="text-xs text-gray-400 mb-3">{r.author}</div>
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                      <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{r.views}</span>
                      <span className="flex items-center gap-1"><Download className="w-3.5 h-3.5" />{r.downloads}</span>
                      <span className="ml-auto px-2 py-0.5 bg-gray-50 rounded">{r.format}</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 py-2 text-xs font-semibold text-white bg-[#1457A8] rounded-lg hover:bg-[#0B3D73] transition-colors flex items-center justify-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" /> O'qish
                      </button>
                      <button className="p-2 border border-gray-200 rounded-lg hover:border-[#1457A8] text-gray-400 hover:text-[#1457A8] transition-colors">
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* AI section */}
            <div className="mt-6 p-5 bg-gradient-to-br from-[#061B3A] to-[#0B3D73] rounded-2xl text-white">
              <div className="flex items-center gap-3 mb-3">
                <Bot className="w-5 h-5 text-[#D6A84F]" />
                <h3 className="font-bold">Kafedra AI yordamchisi</h3>
              </div>
              <p className="text-sm text-blue-200 mb-4">Bu kafedra resurslari bo'yicha savollaringizga javob beradi.</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Bu kafedra bo'yicha savol bering..."
                  className="flex-1 px-4 py-2.5 bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl text-sm focus:outline-none focus:border-white/50"
                />
                <Link href="/ai" className="px-4 py-2.5 bg-[#D6A84F] text-white text-sm font-semibold rounded-xl hover:bg-[#c49840] transition-colors">
                  AI
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
