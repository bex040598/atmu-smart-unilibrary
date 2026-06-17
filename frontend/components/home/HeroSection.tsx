"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useRouter } from "@/i18n/navigation";
import { Search, BookOpen, GraduationCap, ArrowRight, Building2, Library } from "lucide-react";

type Locale = "uz" | "ru" | "en" | "tr";

const T: Record<Locale, Record<string, string>> = {
  uz: {
    badge: "Rasmiy Universitet Portali",
    title: "Axborot texnologiyalari va menejment universiteti",
    subtitle: "Raqamli ta'lim, ilmiy tadqiqotlar va elektron kutubxona xizmatlarini yagona akademik muhitda birlashtirgan zamonaviy davlat universiteti.",
    search_ph: "Resurs, kitob, maqola yoki kafedra nomini kiriting...",
    btn_about: "Universitet haqida",
    btn_lib: "Elektron kutubxona",
    btn_depts: "Kafedralar",
    btn_ai: "AI kutubxonachi",
    stat1: "Talabalar",
    stat2: "O'qituvchilar",
    stat3: "E-Resurslar",
    stat4: "Kafedralar",
    home: "Bosh sahifa",
  },
  ru: {
    badge: "Официальный портал университета",
    title: "Университет информационных технологий и менеджмента",
    subtitle: "Современный государственный университет, объединяющий цифровое образование, научные исследования и услуги электронной библиотеки в единой академической среде.",
    search_ph: "Введите ресурс, книгу, статью или название кафедры...",
    btn_about: "Об университете",
    btn_lib: "Электронная библиотека",
    btn_depts: "Кафедры",
    btn_ai: "AI библиотекарь",
    stat1: "Студентов",
    stat2: "Преподавателей",
    stat3: "Э-ресурсов",
    stat4: "Кафедр",
    home: "Главная",
  },
  en: {
    badge: "Official University Portal",
    title: "University of Information Technologies and Management",
    subtitle: "A modern state university that integrates digital education, scientific research, and electronic library services in a single academic environment.",
    search_ph: "Enter resource, book, article or department name...",
    btn_about: "About University",
    btn_lib: "E-Library",
    btn_depts: "Departments",
    btn_ai: "AI Librarian",
    stat1: "Students",
    stat2: "Faculty",
    stat3: "E-Resources",
    stat4: "Departments",
    home: "Home",
  },
  tr: {
    badge: "Üniversitenin Resmi Portalı",
    title: "Bilgi Teknolojileri ve Yönetim Üniversitesi",
    subtitle: "Dijital eğitimi, bilimsel araştırmaları ve elektronik kütüphane hizmetlerini tek bir akademik ortamda birleştiren modern bir devlet üniversitesi.",
    search_ph: "Kaynak, kitap, makale veya bölüm adı girin...",
    btn_about: "Üniversite Hakkında",
    btn_lib: "E-Kütüphane",
    btn_depts: "Bölümler",
    btn_ai: "AI Kütüphaneci",
    stat1: "Öğrenci",
    stat2: "Öğretim Üyesi",
    stat3: "E-Kaynak",
    stat4: "Bölüm",
    home: "Ana Sayfa",
  },
};

const STATS = [
  { key: "stat1", value: "2 318" },
  { key: "stat2", value: "126" },
  { key: "stat3", value: "1 247" },
  { key: "stat4", value: "6" },
];

export default function HeroSection() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const L = T[locale] || T.uz;
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push({ pathname: "/catalog", query: { search: query } });
    }
  };

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #030C18 0%, #061B3A 30%, #0B3D73 65%, #1058A0 100%)",
        minHeight: "580px",
      }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M30 5L55 20V40L30 55L5 40V20Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "80px 80px",
        }}
      />
      {/* Gold accent radials */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, #D6A84F 0%, transparent 70%)", transform: "translate(30%,-30%)" }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-8" style={{ background: "radial-gradient(circle, #1457A8 0%, transparent 70%)", transform: "translate(-30%,30%)" }} />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 flex flex-col justify-center" style={{ minHeight: "580px" }}>
        <div className="py-16 lg:py-20">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 border border-yellow-400/30 text-yellow-300/90 text-[11px] font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-7"
              style={{ background: "rgba(214,168,79,0.08)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse-slow" />
              {L.badge}
            </div>

            {/* Title */}
            <h1 className="font-bold leading-[1.1] mb-6 text-white">
              <span className="block text-[28px] lg:text-[42px] xl:text-[48px]">
                {L.title}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-white/65 text-[15px] lg:text-[17px] mb-8 leading-relaxed max-w-2xl font-light">
              {L.subtitle}
            </p>

            {/* Search */}
            <form onSubmit={handleSearch} className="flex max-w-2xl mb-9">
              <div className="flex-1 flex items-center bg-white rounded-l-xl shadow-2xl overflow-hidden">
                <Search size={16} className="ml-4 text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={L.search_ph}
                  className="flex-1 px-3 py-4 text-gray-800 bg-transparent outline-none text-[13px]"
                />
              </div>
              <button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-300 text-[#061B3A] font-bold px-7 py-4 rounded-r-xl transition-colors text-[13px] flex-shrink-0"
              >
                {locale === "uz" ? "Qidirish" : locale === "ru" ? "Поиск" : locale === "tr" ? "Ara" : "Search"}
              </button>
            </form>

            {/* CTA buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/about"
                className="flex items-center gap-2 bg-white text-[#061B3A] font-bold px-5 py-3 rounded-xl hover:bg-yellow-50 transition-colors text-[13px] shadow-lg"
              >
                <Building2 size={15} />
                {L.btn_about}
                <ArrowRight size={13} />
              </Link>
              <Link
                href="/catalog"
                className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-[#061B3A] font-bold px-5 py-3 rounded-xl transition-colors text-[13px]"
              >
                <Library size={15} />
                {L.btn_lib}
              </Link>
              <Link
                href="/departments"
                className="flex items-center gap-2 border border-white/25 text-white/80 hover:text-white hover:bg-white/10 font-medium px-5 py-3 rounded-xl transition-colors text-[13px]"
              >
                <BookOpen size={15} />
                {L.btn_depts}
              </Link>
              <Link
                href="/ai"
                className="flex items-center gap-2 border border-white/15 text-white/60 hover:text-white hover:bg-white/10 font-medium px-5 py-3 rounded-xl transition-colors text-[13px]"
              >
                <GraduationCap size={15} />
                {L.btn_ai}
              </Link>
            </div>
          </div>
        </div>

        {/* Stats bar — pinned to bottom */}
        <div className="border-t border-white/10 py-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {STATS.map((s) => (
              <div key={s.key} className="flex items-center gap-3">
                <div className="w-0.5 h-10 rounded-full bg-yellow-400/50" />
                <div>
                  <div className="text-white font-bold text-xl stat-counter">{s.value}<span className="text-yellow-300">+</span></div>
                  <div className="text-white/45 text-[11px] mt-0.5">{L[s.key]}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
