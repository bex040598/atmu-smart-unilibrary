"use client";
import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Locale = "uz" | "ru" | "en" | "tr";
const t = (obj: Record<string, string>, locale: Locale) => obj[locale] || obj.uz;

const SLIDES = [
  {
    title: {
      uz: "Axborot texnologiyalari va menejment universiteti",
      ru: "Университет информационных технологий и менеджмента",
      en: "University of Information Technology and Management",
      tr: "Bilgi Teknolojileri ve Yönetim Üniversitesi",
    },
    subtitle: {
      uz: "Raqamli ta'lim, ilmiy faoliyat, interaktiv xizmatlar va elektron kutubxona imkoniyatlarini yagona universitet portalida birlashtirgan zamonaviy akademik muhit.",
      ru: "Современная академическая среда, объединяющая цифровое образование, науку, интерактивные сервисы и электронную библиотеку на едином портале.",
      en: "A modern academic environment uniting digital education, research, interactive services and e-library in a single university portal.",
      tr: "Dijital eğitim, bilim, interaktif hizmetler ve e-kütüphaneyi tek portalda birleştiren modern akademik ortam.",
    },
  },
  {
    title: {
      uz: "Ilm-fan va tadqiqot — ATMUning ustuvor yo'nalishi",
      ru: "Наука и исследования — приоритет АТМУ",
      en: "Science and Research — ATMU's Priority Direction",
      tr: "Bilim ve Araştırma — ATMU'nun Öncelikli Yönü",
    },
    subtitle: {
      uz: "Universitet xalqaro miqyosdagi ilmiy konferentsiyalar, dissertatsiya tadqiqotlari va sanoat hamkorliklari orqali zamonaviy ilm-fan rivojiga hissa qo'shmoqda.",
      ru: "Университет вносит вклад в развитие современной науки через международные конференции, диссертационные исследования и партнёрства с промышленностью.",
      en: "The university contributes to modern science through international conferences, dissertation research and industrial partnerships.",
      tr: "Üniversite, uluslararası konferanslar, tez araştırmaları ve sanayi ortaklıkları aracılığıyla bilime katkı sağlamaktadır.",
    },
  },
  {
    title: {
      uz: "2026-yil qabul — kelajagingizni ATMU bilan quring",
      ru: "Приём 2026 — стройте будущее с АТМУ",
      en: "Admissions 2026 — Build Your Future with ATMU",
      tr: "Kabul 2026 — Geleceğinizi ATMU ile İnşa Edin",
    },
    subtitle: {
      uz: "Bakalavr va magistratura dasturlarida o'qish uchun hujjatlar qabul qilish boshlandi. Raqamli texnologiyalar, menejment va pedagogika yo'nalishlari bo'yicha davlat granti o'rinlari mavjud.",
      ru: "Начат приём документов на бакалавриат и магистратуру. Имеются места на государственный грант по направлениям цифровых технологий, менеджмента и педагогики.",
      en: "Applications for bachelor's and master's programs are now open. State grant places available in digital technologies, management and pedagogy.",
      tr: "Lisans ve yüksek lisans programları için başvurular başladı. Dijital teknolojiler, yönetim ve pedagoji alanlarında devlet bursları mevcuttur.",
    },
  },
];

const STATS = [
  { val: "10 000+", label: { uz: "Talabalar", ru: "Студентов", en: "Students", tr: "Öğrenci" } },
  { val: "126+", label: { uz: "O'qituvchilar", ru: "Преподавателей", en: "Faculty", tr: "Öğretim Üyesi" } },
  { val: "20+", label: { uz: "Yo'nalishlar", ru: "Направлений", en: "Directions", tr: "Yönelim" } },
  { val: "8 420+", label: { uz: "Kutubxona fondi", ru: "Книжный фонд", en: "Library Fund", tr: "Kitap Fonu" } },
  { val: "6", label: { uz: "Kafedralar", ru: "Кафедр", en: "Departments", tr: "Bölümler" } },
];

const CTA = [
  { href: "/", label: { uz: "Universitet haqida", ru: "Об университете", en: "About University", tr: "Üniversite" }, style: "gold" },
  { href: "/", label: { uz: "Qabul jarayoni", ru: "Приёмная комиссия", en: "Admission", tr: "Kabul" }, style: "blue" },
  { href: "/departments", label: { uz: "Fakultet va kafedralar", ru: "Факультеты", en: "Faculties", tr: "Fakülteler" }, style: "ghost" },
  { href: "/catalog", label: { uz: "E-Kutubxona", ru: "Э-Библиотека", en: "E-Library", tr: "E-Kütüphane" }, style: "ghost" },
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
  }, [current]);

  const slide = SLIDES[current];

  return (
    <section
      className="portal-hero"
      style={{
        backgroundImage: "url('/images/atmu/campus-hero.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center 20%",
        minHeight: "clamp(500px, 56vw, 720px)",
      }}
    >
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(170deg,rgba(0,30,65,.6) 0%,rgba(0,43,74,.4) 38%,rgba(0,30,65,.8) 78%,rgba(0,20,50,.96) 100%)" }}
      />

      <div
        className="relative z-10 max-w-[1680px] mx-auto px-5 sm:px-8 flex flex-col"
        style={{ minHeight: "clamp(500px,56vw,720px)" }}
      >
        {/* Text */}
        <div
          className="flex-1 flex flex-col justify-center pt-12 pb-6"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(10px)", transition: "all .28s ease" }}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-5 self-start">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5B400] animate-pulse" />
            <span className="text-white/75 text-[10px] font-bold uppercase tracking-widest">
              {locale === "uz" ? "Rasmiy Portal · Qarshi" : locale === "ru" ? "Официальный Портал · Карши" : locale === "tr" ? "Resmi Portal · Qarshi" : "Official Portal · Qarshi"}
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Georgia','Times New Roman',serif",
              fontSize: "clamp(26px,4.5vw,74px)",
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1.08,
              textShadow: "0 3px 20px rgba(0,0,0,.5)",
              maxWidth: "880px",
              marginBottom: "18px",
            }}
          >
            {t(slide.title, locale)}
          </h1>

          <p style={{ color: "rgba(255,255,255,.68)", fontSize: "clamp(13px,1.2vw,17px)", maxWidth: "660px", lineHeight: 1.7, marginBottom: "28px" }}>
            {t(slide.subtitle, locale)}
          </p>

          <div className="flex flex-wrap gap-2.5">
            {CTA.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className={`px-5 py-2.5 rounded-xl font-semibold text-[13px] transition-all ${
                  item.style === "gold" ? "bg-[#F5B400] text-[#002B4A] hover:bg-yellow-300 shadow-lg" :
                  item.style === "blue" ? "bg-[#0069A8] text-white hover:bg-[#0080cc] border border-white/20" :
                  "bg-white/10 text-white border border-white/22 hover:bg-white/20"
                }`}
              >
                {t(item.label, locale)}
              </Link>
            ))}
          </div>
        </div>

        {/* Slider controls */}
        <div className="flex items-center gap-3 pb-3">
          <button
            onClick={() => goTo((current - 1 + SLIDES.length) % SLIDES.length)}
            className="w-8 h-8 rounded-full bg-white/10 border border-white/22 flex items-center justify-center text-white hover:bg-white/25 transition-colors"
          >
            <ChevronLeft size={15} />
          </button>
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${i === current ? "w-7 h-2 bg-[#F5B400]" : "w-2 h-2 bg-white/35 hover:bg-white/55"}`}
            />
          ))}
          <button
            onClick={() => goTo((current + 1) % SLIDES.length)}
            className="w-8 h-8 rounded-full bg-white/10 border border-white/22 flex items-center justify-center text-white hover:bg-white/25 transition-colors"
          >
            <ChevronRight size={15} />
          </button>
        </div>

        {/* Stats bar */}
        <div
          className="grid grid-cols-3 sm:grid-cols-5 border-t border-white/10"
          style={{ background: "rgba(0,10,30,.75)", backdropFilter: "blur(10px)" }}
        >
          {STATS.map((s, i) => (
            <div
              key={i}
              className={`flex flex-col items-center justify-center py-3.5 px-2 text-center ${i < STATS.length - 1 ? "border-r border-white/08" : ""}`}
            >
              <div className="text-[#F5B400] font-black text-lg sm:text-xl leading-none mb-0.5">{s.val}</div>
              <div className="text-white/45 text-[9px] sm:text-[10px] font-medium uppercase tracking-wider leading-tight">{t(s.label, locale)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
