"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Search, BookOpen, GraduationCap, ArrowRight, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useRouter } from "@/i18n/navigation";

const L: Record<string, Record<string, string>> = {
  uz: {
    tag: "Rasmiy elektron kutubxona portali",
    title1: "ATMU Smart",
    title2: "Elektron Kutubxona",
    subtitle: "Barcha resurslar, kitoblar va o'quv materiallar bir joyda. O'qing, tadqiq qiling, rivojlaning.",
    search_placeholder: "Kitob, maqola yoki resurs nomini kiriting...",
    search_btn: "Qidirish",
    catalog: "Katalogga o'tish",
    ai: "AI Yordamchi",
    books: "Kitob",
    resources: "Resurs",
    seats: "O'rindiq",
    departments: "Kafedra",
  },
  ru: {
    tag: "Официальный электронный библиотечный портал",
    title1: "АТМУ Smart",
    title2: "Электронная Библиотека",
    subtitle: "Все ресурсы, книги и учебные материалы в одном месте. Читайте, исследуйте, развивайтесь.",
    search_placeholder: "Введите название книги, статьи или ресурса...",
    search_btn: "Поиск",
    catalog: "Перейти в каталог",
    ai: "ИИ Ассистент",
    books: "Книг",
    resources: "Ресурсов",
    seats: "Мест",
    departments: "Кафедр",
  },
  en: {
    tag: "Official Electronic Library Portal",
    title1: "ATMU Smart",
    title2: "E-Library",
    subtitle: "All resources, books and study materials in one place. Read, research, and grow.",
    search_placeholder: "Enter book, article or resource title...",
    search_btn: "Search",
    catalog: "Go to catalog",
    ai: "AI Assistant",
    books: "Books",
    resources: "Resources",
    seats: "Seats",
    departments: "Departments",
  },
  tr: {
    tag: "Resmi Elektronik Kütüphane Portalı",
    title1: "ATMU Smart",
    title2: "E-Kütüphane",
    subtitle: "Tüm kaynaklar, kitaplar ve çalışma materyalleri tek bir yerde. Okuyun, araştırın, gelişin.",
    search_placeholder: "Kitap, makale veya kaynak adı girin...",
    search_btn: "Ara",
    catalog: "Kataloğa git",
    ai: "AI Asistan",
    books: "Kitap",
    resources: "Kaynak",
    seats: "Koltuk",
    departments: "Bölüm",
  },
};

export default function HeroSection() {
  const locale = useLocale();
  const router = useRouter();
  const t = L[locale] || L.uz;
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push({ pathname: "/catalog", query: { search: query } });
    }
  };

  return (
    <section className="hero-banner min-h-[480px] flex flex-col justify-center py-16 lg:py-20">
      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
        <div className="max-w-3xl">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-yellow-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-300 animate-pulse-slow" />
            {t.tag}
          </div>

          {/* Title */}
          <h1 className="text-white font-bold leading-tight mb-5">
            <span className="block text-3xl lg:text-5xl xl:text-6xl">{t.title1}</span>
            <span className="block text-3xl lg:text-5xl xl:text-6xl text-gradient-gold">{t.title2}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-white/70 text-base lg:text-lg mb-8 leading-relaxed max-w-xl">
            {t.subtitle}
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex gap-0 mb-8 max-w-2xl">
            <div className="flex-1 flex items-center bg-white rounded-l-xl shadow-2xl overflow-hidden">
              <Search size={18} className="ml-4 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.search_placeholder}
                className="flex-1 px-3 py-4 text-gray-800 bg-transparent outline-none text-sm"
              />
            </div>
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-300 text-[#061B3A] font-bold px-6 py-4 rounded-r-xl transition-colors text-sm flex-shrink-0"
            >
              {t.search_btn}
            </button>
          </form>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/catalog"
              className="flex items-center gap-2 bg-white text-[#061B3A] font-bold px-6 py-3 rounded-xl hover:bg-yellow-50 transition-colors text-sm shadow-lg"
            >
              <BookOpen size={16} />
              {t.catalog}
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/ai"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm backdrop-blur-sm"
            >
              <GraduationCap size={16} />
              {t.ai}
            </Link>
          </div>
        </div>

        {/* Right floating card — desktop only */}
        <div className="hidden xl:block absolute right-4 top-1/2 -translate-y-1/2 w-64">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 space-y-3">
            {[
              { label: t.books, value: "50,000+", color: "bg-blue-400" },
              { label: t.resources, value: "12,000+", color: "bg-teal-400" },
              { label: t.seats, value: "200", color: "bg-yellow-400" },
              { label: t.departments, value: "6", color: "bg-purple-400" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className={`w-2 h-8 rounded-full ${item.color} flex-shrink-0`} />
                <div>
                  <div className="text-white font-bold text-lg leading-none">{item.value}</div>
                  <div className="text-white/60 text-xs">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom breadcrumb hint */}
      <div className="relative z-10 mt-8 border-t border-white/10 py-3">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-1.5 text-white/40 text-xs">
            <Link href="/" className="hover:text-white/60">ATMU</Link>
            <ChevronRight size={10} />
            <span className="text-white/60">
              {locale === "uz" ? "Bosh sahifa" : locale === "ru" ? "Главная" : locale === "tr" ? "Ana Sayfa" : "Home"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
