"use client";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Calendar, BookOpen, Bot, QrCode, LayoutGrid, Monitor, GraduationCap, Users, BookMarked, Cpu } from "lucide-react";

type Locale = "uz" | "ru" | "en" | "tr";
const t = (obj: Record<string, string>, locale: Locale) => obj[locale] || obj.uz;

const SERVICES = [
  {
    icon: <Calendar className="w-7 h-7" />,
    color: "#00579f",
    bg: "#dce8f5",
    label: { uz: "Dars jadvali", ru: "Расписание", en: "Schedule", tr: "Ders Programı" },
    href: "/",
  },
  {
    icon: <Users className="w-7 h-7" />,
    color: "#00a050",
    bg: "#d5f0e5",
    label: { uz: "HEMIS talaba", ru: "HEMIS студент", en: "HEMIS Student", tr: "HEMIS Öğrenci" },
    href: "/",
  },
  {
    icon: <Monitor className="w-7 h-7" />,
    color: "#8855cc",
    bg: "#ede0f5",
    label: { uz: "Moodle", ru: "Moodle", en: "Moodle", tr: "Moodle" },
    href: "/",
  },
  {
    icon: <GraduationCap className="w-7 h-7" />,
    color: "#cc6600",
    bg: "#f5e8d5",
    label: { uz: "HEMIS xodim", ru: "HEMIS сотрудник", en: "HEMIS Staff", tr: "HEMIS Personel" },
    href: "/",
  },
  {
    icon: <BookOpen className="w-7 h-7" />,
    color: "#00579f",
    bg: "#dce8f5",
    label: { uz: "Smart UniLibrary", ru: "Smart UniLibrary", en: "Smart UniLibrary", tr: "Smart UniLibrary" },
    href: "/catalog",
  },
  {
    icon: <Bot className="w-7 h-7" />,
    color: "#e8a820",
    bg: "#fdf3d8",
    label: { uz: "AI kutubxonachi", ru: "ИИ библиотекарь", en: "AI Librarian", tr: "AI Kütüphaneci" },
    href: "/ai",
  },
  {
    icon: <QrCode className="w-7 h-7" />,
    color: "#cc2255",
    bg: "#f5d8e2",
    label: { uz: "O'quv zali bron", ru: "Бронь зала", en: "Room Booking", tr: "Salon Rezerve" },
    href: "/library/reading-room",
  },
  {
    icon: <BookMarked className="w-7 h-7" />,
    color: "#007788",
    bg: "#d8eef0",
    label: { uz: "Kitob band qilish", ru: "Бронь книг", en: "Book Reserve", tr: "Kitap Rezerve" },
    href: "/catalog",
  },
  {
    icon: <Cpu className="w-7 h-7" />,
    color: "#5544aa",
    bg: "#e8e2f8",
    label: { uz: "Shaxsiy kabinet", ru: "Личный кабинет", en: "Personal Cabinet", tr: "Kişisel Kabin" },
    href: "/profile",
  },
  {
    icon: <LayoutGrid className="w-7 h-7" />,
    color: "#006633",
    bg: "#d5ebe0",
    label: { uz: "Elektron katalog", ru: "Электронный каталог", en: "E-Catalog", tr: "E-Katalog" },
    href: "/catalog",
  },
];

export default function InteractiveServices() {
  const locale = useLocale() as Locale;
  const titleLabel = locale === "uz" ? "Interaktiv xizmatlar" : locale === "ru" ? "Интерактивные сервисы" : locale === "tr" ? "İnteraktif Hizmetler" : "Interactive Services";
  const panelTitle = locale === "uz"
    ? "ATMU raqamli xizmatlari — talabalar, o'qituvchilar va xodimlar uchun"
    : locale === "ru"
    ? "Цифровые сервисы АТМУ — для студентов, преподавателей и сотрудников"
    : locale === "tr"
    ? "ATMU dijital hizmetleri — öğrenciler, öğretmenler ve personel için"
    : "ATMU digital services — for students, faculty and staff";
  const panelSub = locale === "uz"
    ? "ATMU talabalari, professor-o'qituvchilari va xodimlari uchun dars jadvali, HEMIS, Moodle, elektron kutubxona, kitob band qilish va shaxsiy kabinet xizmatlari yagona portal orqali taqdim etiladi."
    : locale === "ru"
    ? "Расписание занятий, HEMIS, Moodle, электронная библиотека, бронирование книг и личный кабинет для студентов, преподавателей и сотрудников АТМУ доступны через единый портал."
    : locale === "tr"
    ? "ATMU öğrencileri, öğretim üyeleri ve personeli için ders programı, HEMIS, Moodle, e-kütüphane, kitap rezervasyonu ve kişisel kabine hizmetleri tek portal üzerinden sunulmaktadır."
    : "Schedule, HEMIS, Moodle, e-library, book reservations and personal cabinet services for ATMU students, faculty and staff are provided through a single portal.";

  return (
    <section className="section-dark py-16 relative overflow-hidden">
      {/* Decorative diagonal shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-5 bg-white" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full opacity-5 bg-white" />
        <div className="absolute top-1/2 left-1/3 w-96 h-2 opacity-5 bg-white rotate-12" />
      </div>

      <div className="max-w-[1680px] mx-auto px-5 sm:px-8 relative z-10">
        {/* Section title */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-px bg-[#e8a820]" />
            <span className="text-[#e8a820] text-[11px] font-bold uppercase tracking-widest">{titleLabel}</span>
            <span className="w-8 h-px bg-[#e8a820]" />
          </div>
        </div>

        {/* Big white panel */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl mb-8">
          <div className="grid lg:grid-cols-2 min-h-[280px]">
            {/* Left: text */}
            <div className="p-8 sm:p-10 flex flex-col justify-center" style={{ background: "linear-gradient(135deg,#f8fafc 0%,#eef4fc 100%)" }}>
              <h2 style={{ color: "#001d3d", fontFamily: "'Georgia',serif", fontSize: "clamp(20px,2.2vw,32px)", fontWeight: 800, lineHeight: 1.2, marginBottom: "16px" }}>
                {panelTitle}
              </h2>
              <p style={{ color: "#5a6a7e", fontSize: "clamp(13px,1vw,15px)", lineHeight: 1.7 }}>
                {panelSub}
              </p>
            </div>

            {/* Right: illustration */}
            <div className="flex items-center justify-center p-6" style={{ background: "linear-gradient(135deg,#002b4e 0%,#004a88 100%)" }}>
              <svg viewBox="0 0 300 200" className="w-full max-w-xs" xmlns="http://www.w3.org/2000/svg">
                {/* Monitor */}
                <rect x="60" y="40" width="180" height="120" rx="8" fill="#1a3a6e" stroke="#4a7ab8" strokeWidth="2"/>
                <rect x="72" y="52" width="156" height="96" rx="4" fill="#0a1f3a"/>
                {/* Screen content */}
                <rect x="80" y="60" width="70" height="8" rx="2" fill="#00579f" opacity=".8"/>
                <rect x="80" y="74" width="100" height="4" rx="2" fill="#3a6aaa" opacity=".5"/>
                <rect x="80" y="84" width="80" height="4" rx="2" fill="#3a6aaa" opacity=".4"/>
                <rect x="80" y="94" width="60" height="4" rx="2" fill="#3a6aaa" opacity=".3"/>
                <rect x="165" y="60" width="55" height="55" rx="4" fill="#002244" opacity=".8"/>
                <circle cx="192" cy="80" r="12" fill="#e8a820" opacity=".7"/>
                <rect x="183" y="96" width="18" height="3" rx="1" fill="#4a7ab8"/>
                <rect x="80" y="108" width="140" height="30" rx="4" fill="#002244" opacity=".5"/>
                <rect x="86" y="114" width="40" height="12" rx="3" fill="#00579f" opacity=".8"/>
                <rect x="132" y="114" width="40" height="12" rx="3" fill="#006633" opacity=".8"/>
                {/* Stand */}
                <rect x="130" y="160" width="40" height="10" rx="3" fill="#1a3a6e"/>
                <rect x="110" y="168" width="80" height="6" rx="3" fill="#2a4a7e"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Service cards grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {SERVICES.map((svc, i) => (
            <Link key={i} href={svc.href}>
              <div className="service-card group">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform"
                  style={{ background: svc.bg, color: svc.color }}
                >
                  {svc.icon}
                </div>
                <div className="text-[#1a2332] font-semibold text-[12px] leading-tight">
                  {t(svc.label, locale)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
