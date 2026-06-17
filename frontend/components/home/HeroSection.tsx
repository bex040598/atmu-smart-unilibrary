"use client";
import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Locale = "uz" | "ru" | "en" | "tr";
const t = (obj: Record<string, string>, locale: Locale) => obj[locale] || obj.uz;

const SLIDES = [
  {
    title: { uz: "Axborot texnologiyalari va menejment universiteti", ru: "Университет информационных технологий и менеджмента", en: "University of Information Technology and Management", tr: "Bilgi Teknolojileri ve Yönetim Üniversitesi" },
    subtitle: { uz: "Raqamli ta'lim, zamonaviy kutubxona va AI xizmatlari bilan jihozlangan oliy ta'lim muassasasi", ru: "Высшее учебное заведение с цифровым образованием, современной библиотекой и AI-сервисами", en: "A higher education institution equipped with digital learning, modern library and AI services", tr: "Dijital eğitim, modern kütüphane ve AI hizmetleriyle donatılmış yüksek öğretim kurumu" },
  },
  {
    title: { uz: "ATMU Smart UniLibrary — Raqamli Kutubxona Tizimi", ru: "ATMU Smart UniLibrary — Цифровая Библиотечная Система", en: "ATMU Smart UniLibrary — Digital Library System", tr: "ATMU Smart UniLibrary — Dijital Kütüphane Sistemi" },
    subtitle: { uz: "1 247+ elektron resurs, 8 420+ kitob fondi va AI yordamchisi bir platformada", ru: "1 247+ электронных ресурсов, фонд 8 420+ книг и ИИ-помощник на одной платформе", en: "1,247+ e-resources, 8,420+ book fund and AI assistant on one platform", tr: "1.247+ e-kaynak, 8.420+ kitap fonu ve AI asistanı tek platformda" },
  },
  {
    title: { uz: "Kafedralar elektron kutubxonasi va AI qidiruv", ru: "Электронные библиотеки кафедр и ИИ-поиск", en: "Department E-Libraries and AI Search", tr: "Bölüm E-Kütüphaneleri ve AI Arama" },
    subtitle: { uz: "O'quv materiallari, laboratoriya ishlari va ilmiy maqolalarni bir platformadan toping", ru: "Учебные материалы, лабораторные работы и научные статьи на одной платформе", en: "Find textbooks, lab manuals and research papers all in one platform", tr: "Ders kitapları, lab raporları ve araştırma makalelerini tek platformda bulun" },
  },
];

const STATS = [
  { val: "2 318+", label: { uz: "Talabalar", ru: "Студентов", en: "Students", tr: "Öğrenci" } },
  { val: "126+", label: { uz: "O'qituvchilar", ru: "Преподавателей", en: "Faculty", tr: "Öğretim Üyesi" } },
  { val: "1 247+", label: { uz: "Elektron resurslar", ru: "Эл. ресурсов", en: "E-Resources", tr: "E-Kaynak" } },
  { val: "8 420+", label: { uz: "Kutubxona fondi", ru: "Книжный фонд", en: "Library Fund", tr: "Kitap Fonu" } },
  { val: "6", label: { uz: "Kafedralar", ru: "Кафедр", en: "Departments", tr: "Bölümler" } },
];

const CTA = [
  { href: "/", label: { uz: "Universitet haqida", ru: "Об университете", en: "About University", tr: "Üniversite" }, primary: true },
  { href: "/catalog", label: { uz: "Elektron katalog", ru: "Эл. каталог", en: "E-Catalog", tr: "E-Katalog" }, blue: true },
  { href: "/departments", label: { uz: "Kafedralar", ru: "Кафедры", en: "Departments", tr: "Bölümler" } },
  { href: "/ai", label: { uz: "Smart UniLibrary", ru: "Smart UniLibrary", en: "Smart UniLibrary", tr: "Smart UniLibrary" } },
];

export default function HeroSection() {
  const locale = useLocale() as Locale;
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  const goTo = (idx: number) => {
    setVisible(false);
    setTimeout(() => { setCurrent(idx); setVisible(true); }, 280);
  };

  useEffect(() => {
    const id = setInterval(() => goTo((current + 1) % SLIDES.length), 5500);
    return () => clearInterval(id);
  }, []);

  const slide = SLIDES[current];

  return (
    <section
      className="portal-hero"
      style={{
        backgroundImage: "url('/images/atmu/campus-hero.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center 20%",
        minHeight: "clamp(480px, 55vw, 680px)",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(170deg,rgba(0,20,50,.58) 0%,rgba(0,30,65,.42) 38%,rgba(0,20,50,.78) 78%,rgba(0,10,35,.96) 100%)" }} />

      <div className="relative z-10 max-w-[1680px] mx-auto px-5 sm:px-8 flex flex-col" style={{ minHeight: "clamp(480px,55vw,680px)" }}>
        {/* Text content */}
        <div
          className="flex-1 flex flex-col justify-center pt-12 pb-6"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(10px)", transition: "all .28s ease" }}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-5 self-start">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e8a820] animate-pulse" />
            <span className="text-white/75 text-[10px] font-bold uppercase tracking-widest">
              {locale === "uz" ? "Rasmiy Portal" : locale === "ru" ? "Официальный Портал" : locale === "tr" ? "Resmi Portal" : "Official Portal"}
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Georgia','Times New Roman',serif",
              fontSize: "clamp(28px,4.8vw,76px)",
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1.08,
              textShadow: "0 3px 20px rgba(0,0,0,.55)",
              maxWidth: "860px",
              marginBottom: "20px",
            }}
          >
            {t(slide.title, locale)}
          </h1>

          <p style={{ color: "rgba(255,255,255,.68)", fontSize: "clamp(13px,1.25vw,17px)", maxWidth: "640px", lineHeight: 1.65, marginBottom: "28px" }}>
            {t(slide.subtitle, locale)}
          </p>

          <div className="flex flex-wrap gap-2.5">
            {CTA.map((item, i) => (
              <Link key={i} href={item.href} className={`px-5 py-2.5 rounded-xl font-semibold text-[13px] transition-all ${
                item.primary ? "bg-[#e8a820] text-[#001428] hover:bg-yellow-300 shadow-lg" :
                item.blue ? "bg-[#00579f] text-white hover:bg-[#006dbb] border border-white/20" :
                "bg-white/12 text-white border border-white/22 hover:bg-white/22"
              }`}>
                {t(item.label, locale)}
              </Link>
            ))}
          </div>
        </div>

        {/* Slider dots + nav */}
        <div className="flex items-center gap-3 pb-3">
          <button onClick={() => goTo((current - 1 + SLIDES.length) % SLIDES.length)}
            className="w-8 h-8 rounded-full bg-white/12 border border-white/22 flex items-center justify-center text-white hover:bg-white/25 transition-colors">
            <ChevronLeft size={15} />
          </button>
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${i === current ? "w-7 h-2 bg-[#e8a820]" : "w-2 h-2 bg-white/35 hover:bg-white/55"}`} />
          ))}
          <button onClick={() => goTo((current + 1) % SLIDES.length)}
            className="w-8 h-8 rounded-full bg-white/12 border border-white/22 flex items-center justify-center text-white hover:bg-white/25 transition-colors">
            <ChevronRight size={15} />
          </button>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-3 sm:grid-cols-5 border-t border-white/12" style={{ background: "rgba(0,12,35,.72)", backdropFilter: "blur(10px)" }}>
          {STATS.map((s, i) => (
            <div key={i} className={`flex flex-col items-center justify-center py-3.5 px-2 text-center ${i < STATS.length - 1 ? "border-r border-white/08" : ""}`}>
              <div className="text-[#e8a820] font-black text-lg sm:text-xl leading-none mb-0.5">{s.val}</div>
              <div className="text-white/45 text-[9px] sm:text-[10px] font-medium uppercase tracking-wider leading-tight">{t(s.label, locale)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
