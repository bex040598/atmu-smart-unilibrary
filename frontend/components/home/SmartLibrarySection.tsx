"use client";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { BookOpen, Calendar, Bot, QrCode, LayoutGrid, ArrowRight, Database } from "lucide-react";

type Locale = "uz" | "ru" | "en" | "tr";
const t = (obj: Record<string, string>, locale: Locale) => obj[locale] || obj.uz;

const SERVICES = [
  {
    icon: <LayoutGrid className="w-6 h-6" />,
    color: "#00579f",
    bg: "#dce8f5",
    title: { uz: "Elektron katalog", ru: "Электронный каталог", en: "E-Catalog", tr: "E-Katalog" },
    desc: { uz: "8 420+ kitob va 1 247+ elektron resursni qidiring, filter qiling va band qiling", ru: "Ищите, фильтруйте и бронируйте 8 420+ книг и 1 247+ электронных ресурсов", en: "Search, filter and reserve 8,420+ books and 1,247+ e-resources", tr: "8.420+ kitap ve 1.247+ e-kaynağı arayın, filtreleyin ve rezerve edin" },
    href: "/catalog",
  },
  {
    icon: <Database className="w-6 h-6" />,
    color: "#007788",
    bg: "#d8eef0",
    title: { uz: "Kafedralar elektron kutubxonasi", ru: "Электронная библиотека кафедр", en: "Department E-Libraries", tr: "Bölüm E-Kütüphaneleri" },
    desc: { uz: "6 kafedraning darsliklar, laboratoriya ishlari va ilmiy materiallari", ru: "Учебники, лабораторные работы и научные материалы 6 кафедр", en: "Textbooks, lab works and research materials of 6 departments", tr: "6 bölümün ders kitapları, laboratuvar çalışmaları ve araştırma materyalleri" },
    href: "/departments",
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    color: "#8855cc",
    bg: "#ede0f5",
    title: { uz: "Kitob band qilish", ru: "Бронирование книг", en: "Book Reservation", tr: "Kitap Rezervasyonu" },
    desc: { uz: "Jismoniy kitoblarni onlayn band qiling va kutubxonadan oling", ru: "Бронируйте физические книги онлайн и получайте их в библиотеке", en: "Reserve physical books online and pick them up from the library", tr: "Fiziksel kitapları çevrimiçi rezerve edin ve kütüphaneden teslim alın" },
    href: "/catalog",
  },
  {
    icon: <Calendar className="w-6 h-6" />,
    color: "#cc2255",
    bg: "#f5d8e2",
    title: { uz: "O'quv zali bron qilish", ru: "Бронь читального зала", en: "Reading Room Booking", tr: "Okuma Salonu Rezervasyonu" },
    desc: { uz: "85 ta joy uchun onlayn bron, QR check-in va joy xaritasi", ru: "Онлайн-бронь для 85 мест, QR-check-in и карта мест", en: "Online booking for 85 seats, QR check-in and seat map", tr: "85 koltuk için çevrimiçi rezervasyon, QR check-in ve koltuk haritası" },
    href: "/library/reading-room",
  },
  {
    icon: <Bot className="w-6 h-6" />,
    color: "#e8a820",
    bg: "#fdf3d8",
    title: { uz: "AI kutubxonachi", ru: "ИИ-библиотекарь", en: "AI Librarian", tr: "AI Kütüphaneci" },
    desc: { uz: "Fan, kafedra va kurs bo'yicha resurslar tavsiyasi va APA iqtibos generatori", ru: "Рекомендации ресурсов по дисциплине, кафедре и курсу, генератор APA-цитат", en: "Resource recommendations by subject, department and course, APA citation generator", tr: "Derse, bölüme ve kursa göre kaynak önerileri ve APA alıntı oluşturucu" },
    href: "/ai",
  },
  {
    icon: <QrCode className="w-6 h-6" />,
    color: "#006633",
    bg: "#d5ebe0",
    title: { uz: "Face ID / QR Check-in", ru: "Face ID / QR Check-in", en: "Face ID / QR Check-in", tr: "Yüz ID / QR Giriş" },
    desc: { uz: "O'quv zalga QR kod yoki yuz identifikatsiyasi orqali kirish", ru: "Вход в читальный зал по QR-коду или распознаванию лица", en: "Enter reading room via QR code or facial recognition", tr: "QR kodu veya yüz tanıma ile okuma salonuna giriş" },
    href: "/library/reading-room",
  },
];

export default function SmartLibrarySection() {
  const locale = useLocale() as Locale;
  const titleLabel = locale === "uz" ? "ATMU Smart UniLibrary" : locale === "ru" ? "ATMU Smart UniLibrary" : "ATMU Smart UniLibrary";
  const subtitleLabel = locale === "uz" ? "Raqamli kutubxona xizmatlari" : locale === "ru" ? "Сервисы цифровой библиотеки" : locale === "tr" ? "Dijital Kütüphane Hizmetleri" : "Digital Library Services";
  const descLabel = locale === "uz"
    ? "ATMU Smart UniLibrary — universitetning rasmiy elektron kutubxona tizimi. Elektron katalog, kafedralar resurslari, o'quv zali bron qilish va AI yordamchi xizmatlari bir platformada."
    : locale === "ru"
    ? "ATMU Smart UniLibrary — официальная система электронной библиотеки университета. Электронный каталог, ресурсы кафедр, бронирование читального зала и AI-ассистент на одной платформе."
    : locale === "tr"
    ? "ATMU Smart UniLibrary — üniversitenin resmi elektronik kütüphane sistemi. E-katalog, bölüm kaynakları, okuma salonu rezervasyonu ve AI asistan tek platformda."
    : "ATMU Smart UniLibrary is the university's official electronic library system. E-catalog, department resources, reading room booking and AI assistant all on one platform.";
  const enterLabel = locale === "uz" ? "Kutubxonaga kirish" : locale === "ru" ? "Войти в библиотеку" : locale === "tr" ? "Kütüphaneye gir" : "Enter Library";

  return (
    <section className="py-14" style={{ background: "#f4f6f9" }}>
      <div className="max-w-[1680px] mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-10 items-center mb-10">
          <div>
            <div className="section-tag mb-2"><span className="w-1.5 h-1.5 rounded-full bg-[#00579f]" />{subtitleLabel}</div>
            <h2 className="section-blue-title mb-3">{titleLabel}</h2>
            <div className="section-divider mb-4" />
            <p className="text-[#5a6a7e] text-[14px] leading-relaxed">{descLabel}</p>
          </div>
          <div className="flex justify-end">
            <Link href="/catalog" className="inline-flex items-center gap-2 px-6 py-3 bg-[#00579f] text-white rounded-xl font-semibold text-[14px] hover:bg-[#006dbb] transition-colors shadow-md">
              {enterLabel} <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((svc, i) => (
            <Link key={i} href={svc.href}>
              <div className="portal-card p-5 flex gap-4 h-full group">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                  style={{ background: svc.bg, color: svc.color }}
                >
                  {svc.icon}
                </div>
                <div>
                  <h3 className="text-[#1a2332] font-bold text-[14px] mb-1.5 group-hover:text-[#00579f] transition-colors">
                    {t(svc.title, locale)}
                  </h3>
                  <p className="text-[#5a6a7e] text-[12px] leading-relaxed">{t(svc.desc, locale)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
