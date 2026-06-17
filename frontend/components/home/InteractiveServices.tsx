"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Calendar, BookOpen, GraduationCap, Monitor, Library,
  Bot, MapPin, Fingerprint, User, Cpu
} from "lucide-react";

type Locale = "uz" | "ru" | "en" | "tr";

const T: Record<Locale, Record<string, string>> = {
  uz: {
    tag: "Raqamli xizmatlar",
    title: "Interaktiv xizmatlar",
    cta: "Universitet interaktiv xizmatlaridan unumli foydalaning!",
    sub: "ATMU raqamli platformalari orqali ta'lim jarayoni, ilmiy faoliyat va kutubxona xizmatlaridan qulay tarzda foydalaning.",
    s1: "Dars jadvali",
    s2: "HEMIS talaba",
    s3: "Moodle kurslari",
    s4: "HEMIS xodim",
    s5: "Smart UniLibrary",
    s6: "AI kutubxonachi",
    s7: "O'quv zali bron",
    s8: "Kitob band qilish",
    s9: "Shaxsiy kabinet",
    s10: "Elektron katalog",
  },
  ru: {
    tag: "Цифровые услуги",
    title: "Интерактивные услуги",
    cta: "Используйте интерактивные сервисы университета эффективно!",
    sub: "Пользуйтесь учебными, научными и библиотечными услугами через цифровые платформы АТМУ.",
    s1: "Расписание",
    s2: "HEMIS студент",
    s3: "Курсы Moodle",
    s4: "HEMIS сотрудник",
    s5: "Smart UniLibrary",
    s6: "AI библиотекарь",
    s7: "Бронь зала",
    s8: "Бронь книги",
    s9: "Личный кабинет",
    s10: "Э-каталог",
  },
  en: {
    tag: "Digital Services",
    title: "Interactive Services",
    cta: "Make the most of university interactive services!",
    sub: "Use educational, scientific, and library services through ATMU digital platforms.",
    s1: "Schedule",
    s2: "HEMIS Student",
    s3: "Moodle Courses",
    s4: "HEMIS Staff",
    s5: "Smart UniLibrary",
    s6: "AI Librarian",
    s7: "Room Booking",
    s8: "Book Reservation",
    s9: "Personal Cabinet",
    s10: "E-Catalog",
  },
  tr: {
    tag: "Dijital Hizmetler",
    title: "Etkileşimli Hizmetler",
    cta: "Üniversitenin etkileşimli hizmetlerini etkin kullanın!",
    sub: "ATMU dijital platformları üzerinden eğitim, bilimsel ve kütüphane hizmetlerini kullanın.",
    s1: "Ders Programı",
    s2: "HEMIS Öğrenci",
    s3: "Moodle Kursları",
    s4: "HEMIS Personel",
    s5: "Smart UniLibrary",
    s6: "AI Kütüphaneci",
    s7: "Salon Rezerv.",
    s8: "Kitap Rezerv.",
    s9: "Kişisel Kabine",
    s10: "E-Katalog",
  },
};

const SERVICES = [
  { key: "s1", href: "/schedule", icon: <Calendar size={22} />, color: "#1457A8" },
  { key: "s2", href: "/hemis", icon: <User size={22} />, color: "#0E9F6E" },
  { key: "s3", href: "/moodle", icon: <GraduationCap size={22} />, color: "#7C3AED" },
  { key: "s4", href: "/hemis-staff", icon: <Monitor size={22} />, color: "#D6A84F" },
  { key: "s5", href: "/catalog", icon: <Library size={22} />, color: "#1457A8" },
  { key: "s6", href: "/ai", icon: <Bot size={22} />, color: "#0E9F6E" },
  { key: "s7", href: "/library/reading-room", icon: <MapPin size={22} />, color: "#EF4444" },
  { key: "s8", href: "/catalog", icon: <BookOpen size={22} />, color: "#F59E0B" },
  { key: "s9", href: "/profile", icon: <Fingerprint size={22} />, color: "#6366F1" },
  { key: "s10", href: "/catalog", icon: <Cpu size={22} />, color: "#0B3D73" },
];

export default function InteractiveServices() {
  const locale = useLocale() as Locale;
  const L = T[locale] || T.uz;

  return (
    <section style={{ background: "linear-gradient(135deg, #061B3A 0%, #0B3D73 50%, #1058A0 100%)" }} className="py-14">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 text-yellow-300/70 text-[11px] font-bold uppercase tracking-widest mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
            {L.tag}
          </div>
          <h2 className="text-white text-2xl lg:text-3xl font-bold">{L.title}</h2>
          <div className="w-10 h-0.5 bg-yellow-400/50 mt-3 rounded-full" />
        </div>

        {/* Big white panel */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left: text */}
            <div className="p-8 lg:p-10 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-gray-100">
              <h3 className="text-[#061B3A] text-xl lg:text-2xl font-bold leading-snug mb-4">
                {L.cta}
              </h3>
              <p className="text-gray-500 text-[14px] leading-relaxed mb-6">
                {L.sub}
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-blue-50 text-[#1457A8] border border-blue-100">Digital University</span>
                <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">Smart Library</span>
                <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-yellow-50 text-yellow-700 border border-yellow-100">AI Services</span>
              </div>
            </div>

            {/* Right: services grid */}
            <div className="p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                {SERVICES.map((s) => (
                  <Link
                    key={s.key}
                    href={s.href as "/schedule" | "/hemis" | "/moodle" | "/hemis-staff" | "/catalog" | "/ai" | "/library/reading-room" | "/profile"}
                    className="service-card group p-4 flex flex-col items-center gap-2 rounded-xl border border-gray-100 hover:border-transparent transition-all"
                  >
                    <div
                      className="service-icon-bg w-11 h-11 rounded-xl flex items-center justify-center transition-all"
                      style={{ background: s.color + "15" }}
                    >
                      <span className="service-icon transition-colors" style={{ color: s.color }}>
                        {s.icon}
                      </span>
                    </div>
                    <span className="service-label text-[11px] font-semibold text-gray-700 text-center leading-tight">
                      {L[s.key]}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
