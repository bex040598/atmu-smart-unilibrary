"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  BookOpen, Cpu, Calendar, Bot, Search, ArrowRight,
  Sparkles, BookMarked, Users, TrendingUp, Zap, Globe
} from "lucide-react";

const SEARCH_TABS = [
  { key: "books", label: "Kitoblar", icon: BookOpen },
  { key: "resources", label: "Resurslar", icon: BookMarked },
  { key: "articles", label: "Maqolalar", icon: TrendingUp },
  { key: "videos", label: "Video darslar", icon: Cpu },
  { key: "readingRoom", label: "O'quv zali", icon: Calendar },
  { key: "ai", label: "AI", icon: Bot },
];

const LIVE_STATS = [
  { icon: "👁️", value: "128", label: "Bugun ko'rildi" },
  { icon: "🪑", value: "23", label: "Bo'sh joy" },
  { icon: "📖", value: "7", label: "Kitob bandi" },
  { icon: "🤖", value: "Face ID", label: "Faol" },
  { icon: "🏛️", value: "6", label: "Kafedra markazi" },
];

export default function HeroSection() {
  const t = useTranslations("hero");
  const [activeTab, setActiveTab] = useState("books");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-navy" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#008C95] rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#1457A8] rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#D6A84F] rounded-full blur-3xl" />
      </div>

      {/* Ornament grid */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
        backgroundSize: "32px 32px"
      }} />

      <div className="relative max-w-7xl mx-auto px-4 py-16 lg:py-24">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-white/50 mb-8">
          <a href="https://atmu.uz" className="hover:text-white/80 transition-colors">atmu.uz</a>
          <span>/</span>
          <span className="text-white/70">Tuzilma</span>
          <span>/</span>
          <span className="text-white/70">Kafedralar</span>
          <span>/</span>
          <span className="text-white font-medium">Elektron kutubxona</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-medium mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#D6A84F]" />
              AI · Face ID · Smart Library
            </div>

            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
              ATMU Smart<br />
              <span className="text-gradient-gold">UniLibrary</span>
            </h1>

            <p className="text-lg text-blue-200 mb-8 leading-relaxed max-w-lg">
              Kafedralar elektron kutubxonasi, AI qidiruv, Face ID, kitob band qilish va o'quv zali bron qilish tizimi bir platformada.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/catalog"
                className="flex items-center gap-2 px-5 py-3 bg-white text-[#061B3A] font-semibold rounded-xl hover:bg-blue-50 transition-all shadow-lg text-sm"
              >
                <BookOpen className="w-4 h-4" />
                Elektron katalog
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/departments"
                className="flex items-center gap-2 px-5 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all text-sm"
              >
                <Globe className="w-4 h-4" />
                Kafedralar
              </Link>
              <Link
                href="/ai"
                className="flex items-center gap-2 px-5 py-3 bg-[#D6A84F]/20 border border-[#D6A84F]/40 text-[#D6A84F] font-semibold rounded-xl hover:bg-[#D6A84F]/30 transition-all text-sm"
              >
                <Bot className="w-4 h-4" />
                AI Kutubxonachi
              </Link>
            </div>
          </div>

          {/* Right — Live stats panel */}
          <div className="animate-fade-in hidden lg:block" style={{ animationDelay: "0.2s" }}>
            <div className="glass-dark rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white/70 text-sm font-medium">Jonli statistika</span>
              </div>
              {LIVE_STATS.map((stat, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{stat.icon}</span>
                    <span className="text-white/70 text-sm">{stat.label}</span>
                  </div>
                  <span className="text-white font-bold text-lg">{stat.value}</span>
                </div>
              ))}
              <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-[#008C95]/20 to-[#1457A8]/20 border border-[#008C95]/30">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#D6A84F]" />
                  <span className="text-white/80 text-sm">6 ta kafedra resurs markazi faol</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Universal search */}
        <div className="mt-12 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <div className="glass rounded-2xl p-6 shadow-2xl">
            {/* Tabs */}
            <div className="flex items-center gap-1 mb-4 overflow-x-auto scrollbar-hide pb-1">
              {SEARCH_TABS.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    activeTab === tab.key
                      ? "bg-[#1457A8] text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search input */}
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Kitob, fan, muallif, kafedra, kurs, semestr yoki kalit so'z kiriting..."
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1457A8]/30 focus:border-[#1457A8] bg-white text-gray-800 placeholder-gray-400"
                />
              </div>
              <Link
                href={`/catalog?search=${encodeURIComponent(searchQuery)}&type=${activeTab}`}
                className="flex items-center gap-2 px-6 py-4 bg-[#1457A8] text-white font-semibold rounded-xl hover:bg-[#0B3D73] transition-colors shadow-sm text-sm whitespace-nowrap"
              >
                <Search className="w-4 h-4" />
                Qidirish
              </Link>
            </div>

            {/* Quick suggestions */}
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <span className="text-xs text-gray-400">Tez qidiruv:</span>
              {["Python dasturlash", "Ma'lumotlar bazasi", "Kiberxavfsizlik", "AI va ML", "Web dasturlash"].map((s) => (
                <button
                  key={s}
                  onClick={() => setSearchQuery(s)}
                  className="text-xs px-3 py-1 bg-gray-100 hover:bg-blue-50 hover:text-[#1457A8] text-gray-600 rounded-full transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
