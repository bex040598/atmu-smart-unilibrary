"use client";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { BookOpen, Search, Brain, CalendarCheck, BookMarked, QrCode, ArrowRight, ChevronRight } from "lucide-react";

type Locale = "uz" | "ru" | "en" | "tr";
const t = (obj: Record<string, string>, locale: Locale) => obj[locale] || obj.uz;

const SERVICES = [
  {
    icon: <Search size={20} />,
    title: { uz: "Elektron katalog", ru: "Электронный каталог", en: "E-Catalog", tr: "E-Katalog" },
    desc: { uz: "8 420+ kitob va uslubiy materiallar", ru: "8 420+ книг и методических материалов", en: "8,420+ books & teaching materials", tr: "8.420+ kitap ve materyal" },
    href: "/catalog", accent: "#0069A8",
  },
  {
    icon: <BookMarked size={20} />,
    title: { uz: "Kafedralar elektron kutubxonasi", ru: "Эл. библиотека кафедр", en: "Dept. E-Library", tr: "Bölüm E-Kütüphanesi" },
    desc: { uz: "O'qituvchilar tomonidan yaratilgan resurslar", ru: "Ресурсы, созданные преподавателями", en: "Resources created by faculty", tr: "Öğretim üyelerinin kaynakları" },
    href: "/catalog", accent: "#005A91",
  },
  {
    icon: <BookOpen size={20} />,
    title: { uz: "Kitob band qilish", ru: "Бронирование книг", en: "Book Reservation", tr: "Kitap Rezervasyonu" },
    desc: { uz: "Fonddan kitob buyurtma va qaytarish", ru: "Заказ и возврат книг из фонда", en: "Order & return books from collection", tr: "Koleksiyondan kitap sipariş ve iade" },
    href: "/catalog", accent: "#003D66",
  },
  {
    icon: <CalendarCheck size={20} />,
    title: { uz: "O'quv zali bron qilish", ru: "Бронь читального зала", en: "Reading Room Booking", tr: "Okuma Salonu Rezervasyonu" },
    desc: { uz: "QR-kod orqali kirish, joy band qilish", ru: "Вход по QR-коду, бронь места", en: "QR-code entry, seat booking", tr: "QR kodlu giriş, koltuk rezervasyonu" },
    href: "/library/reading-room", accent: "#006B50",
  },
  {
    icon: <Brain size={20} />,
    title: { uz: "AI kutubxonachi", ru: "ИИ-библиотекарь", en: "AI Librarian", tr: "YZ Kütüphaneci" },
    desc: { uz: "Ilmiy manba tavsiyalari va APA iqtibos", ru: "Рекомендации источников и APA-цитата", en: "Source recommendations & APA citation", tr: "Kaynak önerileri ve APA alıntısı" },
    href: "/ai", accent: "#6B46C1",
  },
  {
    icon: <QrCode size={20} />,
    title: { uz: "Face ID / QR check-in", ru: "Face ID / QR вход", en: "Face ID / QR Check-in", tr: "Yüz ID / QR Giriş" },
    desc: { uz: "O'quv zaliga avtomatik kirish tizimi", ru: "Система автоматического входа в читальный зал", en: "Automatic reading room entry system", tr: "Otomatik okuma salonu giriş sistemi" },
    href: "/profile", accent: "#C05621",
  },
];

export default function ELibrarySection() {
  const locale = useLocale() as Locale;

  const badge = "E-Lib";
  const title = "E-Lib — ATMU Smart UniLibrary";
  const subtitle = {
    uz: "Elektron katalog, kafedralar elektron kutubxonasi, kitob band qilish, o'quv zali bron qilish va AI kutubxonachi xizmatlari universitet portalining yagona E-Lib bo'limida jamlangan.",
    ru: "Электронный каталог, библиотека кафедр, бронирование книг, читального зала и услуги ИИ-библиотекаря объединены в едином разделе E-Lib университетского портала.",
    en: "E-catalog, department e-library, book reservation, reading room booking and AI librarian services are gathered in the university portal's unified E-Lib section.",
    tr: "E-katalog, bölüm e-kütüphanesi, kitap rezervasyonu, okuma salonu rezervasyonu ve YZ kütüphaneci hizmetleri üniversite portalının tek E-Lib bölümünde toplandı.",
  };
  const cta = { uz: "Elektron kutubxonaga kirish", ru: "Войти в эл. библиотеку", en: "Open E-Library", tr: "E-Kütüphaneye Gir" };

  return (
    <section className="py-16" style={{ background: "#F0F4FA" }}>
      <div className="max-w-[1680px] mx-auto px-5 sm:px-8">
        {/* Header badge */}
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest"
            style={{ background: "#0069A8", color: "#fff" }}>
            {badge}
          </span>
          <span className="text-gray-400 text-[12px]">
            {locale === "uz" ? "Universitet portali ichki bo'limi" : locale === "ru" ? "Внутренний раздел портала" : "University portal module"}
          </span>
        </div>

        {/* Two-column layout: left text + right grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">

          {/* LEFT: text */}
          <div className="lg:col-span-2">
            <h2 style={{
              fontFamily: "'Georgia','Times New Roman',serif",
              fontSize: "clamp(22px,2.4vw,34px)",
              fontWeight: 800,
              color: "#002B4A",
              lineHeight: 1.18,
              marginBottom: "16px",
            }}>
              {title}
            </h2>
            <p style={{ color: "#5a6a7e", fontSize: "clamp(13px,1vw,15px)", lineHeight: 1.75, marginBottom: "24px" }}>
              {subtitle[locale] || subtitle.uz}
            </p>

            {/* Stats strip */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { val: "8 420+", label: { uz: "Kutubxona fondi", ru: "Книжный фонд", en: "Library fund", tr: "Kitap fonu" } },
                { val: "1 247+", label: { uz: "Elektron resurs", ru: "Эл. ресурсов", en: "E-resources", tr: "E-kaynak" } },
                { val: "6", label: { uz: "Kafedra", ru: "Кафедр", en: "Depts", tr: "Bölüm" } },
              ].map((s, i) => (
                <div key={i} className="text-center p-3 rounded-xl bg-white border border-gray-100">
                  <div className="font-black text-[#0069A8] text-[18px] leading-none">{s.val}</div>
                  <div className="text-gray-500 text-[10px] mt-1 leading-tight">{t(s.label, locale)}</div>
                </div>
              ))}
            </div>

            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-[13.5px] text-white transition-all hover:opacity-90 shadow-lg"
              style={{ background: "linear-gradient(135deg,#0069A8,#003D66)" }}
            >
              {cta[locale] || cta.uz}
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* RIGHT: services grid */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SERVICES.map((svc, i) => (
              <Link
                key={i}
                href={svc.href}
                className="group flex items-start gap-4 p-4 rounded-2xl bg-white border border-gray-100 hover:border-[#0069A8]/30 hover:shadow-md transition-all"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white"
                  style={{ background: svc.accent }}
                >
                  {svc.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-[#102033] text-[13.5px] leading-snug group-hover:text-[#0069A8] transition-colors">
                    {t(svc.title, locale)}
                  </div>
                  <div className="text-gray-500 text-[11.5px] mt-1 leading-snug">
                    {t(svc.desc, locale)}
                  </div>
                </div>
                <ChevronRight size={13} className="text-gray-300 group-hover:text-[#0069A8] flex-shrink-0 mt-1 transition-colors" />
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom divider strip */}
        <div className="mt-10 pt-6 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
          <p className="text-gray-400 text-[12px]">
            {locale === "uz"
              ? "Smart UniLibrary — ATMU rasmiy elektron kutubxona platformasi"
              : locale === "ru"
              ? "Smart UniLibrary — официальная платформа электронной библиотеки АТМУ"
              : "Smart UniLibrary — ATMU's official e-library platform"}
          </p>
          <Link href="/auth/login"
            className="text-[12px] font-semibold text-[#0069A8] hover:underline flex items-center gap-1">
            {locale === "uz" ? "Kirish yoki ro'yxatdan o'tish" : locale === "ru" ? "Войти или зарегистрироваться" : "Login or register"}
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </section>
  );
}
