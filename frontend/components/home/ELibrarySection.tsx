"use client";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { BookOpen, Search, Brain, CalendarCheck, BookMarked, BarChart3, ArrowRight } from "lucide-react";

type Locale = "uz" | "ru" | "en" | "tr";
const t = (obj: Record<string, string>, locale: Locale) => obj[locale] || obj.uz;

const SERVICES = [
  {
    icon: <Search size={22} />,
    title: { uz: "Elektron katalog", ru: "Электронный каталог", en: "E-Catalog", tr: "E-Katalog" },
    desc: { uz: "8420+ kitob, maqola va uslubiy materiallar bo'yicha qidirish", ru: "Поиск по 8420+ книг, статей и методических материалов", en: "Search across 8420+ books, articles and teaching materials", tr: "8420+ kitap, makale ve materyaller üzerinde arama" },
    href: "/catalog", color: "#0069A8",
  },
  {
    icon: <BookMarked size={22} />,
    title: { uz: "Raqamli resurslar", ru: "Цифровые ресурсы", en: "Digital Resources", tr: "Dijital Kaynaklar" },
    desc: { uz: "Kafedra o'qituvchilari tomonidan yaratilgan raqamli darslik va materiallar", ru: "Цифровые учебники и материалы от преподавателей кафедр", en: "Digital textbooks and materials created by department staff", tr: "Bölüm öğretim üyelerinin dijital ders kitapları" },
    href: "/catalog", color: "#005A91",
  },
  {
    icon: <CalendarCheck size={22} />,
    title: { uz: "O'quv zali bron", ru: "Бронь читального зала", en: "Reading Room Booking", tr: "Okuma Salonu Rezervasyonu" },
    desc: { uz: "O'quv zalida joy band qilish, QR-kod orqali kirish", ru: "Бронирование места в читальном зале, вход по QR-коду", en: "Book a reading room seat with QR-code access", tr: "Okuma salonu rezervasyonu, QR kodlu giriş" },
    href: "/library/reading-room", color: "#003D66",
  },
  {
    icon: <Brain size={22} />,
    title: { uz: "AI kutubxonachi", ru: "ИИ-библиотекарь", en: "AI Librarian", tr: "Yapay Zeka Kütüphanecisi" },
    desc: { uz: "Sun'iy intellekt yordamida ilmiy manba tavsiyalari va APA iqtibos", ru: "Рекомендации научных источников и APA-цитирование с ИИ", en: "AI-powered academic source recommendations and APA citations", tr: "Yapay zeka destekli akademik kaynak önerileri ve APA atıfları" },
    href: "/ai", color: "#002B4A",
  },
  {
    icon: <BookOpen size={22} />,
    title: { uz: "Kitob buyurtma", ru: "Заказ книг", en: "Book Orders", tr: "Kitap Siparişleri" },
    desc: { uz: "Kutubxona fondidan kitob buyurtma berish va qaytarish", ru: "Заказ и возврат книг из библиотечного фонда", en: "Order and return books from the library collection", tr: "Kütüphane koleksiyonundan kitap sipariş etme ve iade" },
    href: "/catalog", color: "#004A6E",
  },
  {
    icon: <BarChart3 size={22} />,
    title: { uz: "Shaxsiy kabinet", ru: "Личный кабинет", en: "Personal Dashboard", tr: "Kişisel Pano" },
    desc: { uz: "Faol bronlar, qarz kitoblar va o'qish tarixi shaxsiy kabinetda", ru: "Активные брони, задолженности и история чтения в личном кабинете", en: "Active bookings, due items and reading history in personal dashboard", tr: "Aktif rezervasyonlar, borçlar ve okuma geçmişi" },
    href: "/dashboard/student", color: "#001E3C",
  },
];

export default function ELibrarySection() {
  const locale = useLocale() as Locale;

  return (
    <section className="py-14" style={{ background: "#001E3C" }}>
      <div className="max-w-[1680px] mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-px bg-[#F5B400]" />
              <span className="text-[#F5B400] text-[11px] font-bold uppercase tracking-widest">E-Lib</span>
              <span className="w-8 h-px bg-[#F5B400]" />
            </div>
            <h2 style={{ color: "#fff", fontFamily: "'Georgia',serif", fontSize: "clamp(22px,2.8vw,38px)", fontWeight: 800, marginBottom: "10px" }}>
              E-Lib — ATMU Smart UniLibrary
            </h2>
            <p style={{ color: "rgba(255,255,255,.5)", fontSize: "clamp(12px,1vw,15px)", maxWidth: "600px", lineHeight: 1.7 }}>
              {locale === "uz" && "ATMU ichki elektron kutubxona bo'limi — katalog, o'quv zali, AI kutubxonachi va shaxsiy kabinet."}
              {locale === "ru" && "Внутренний отдел электронной библиотеки АТМУ — каталог, читальный зал, ИИ-библиотекарь и личный кабинет."}
              {locale === "en" && "ATMU's internal e-library section — catalog, reading room, AI librarian and personal dashboard."}
              {locale === "tr" && "ATMU'nun dahili e-kütüphane bölümü — katalog, okuma salonu, yapay zeka kütüphanecisi ve kişisel pano."}
            </p>
          </div>
          <div className="flex gap-2.5">
            <Link href="/catalog"
              className="px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-all"
              style={{ background: "#F5B400", color: "#002B4A" }}>
              {locale === "uz" ? "Katalogga kirish" : locale === "ru" ? "Войти в каталог" : locale === "tr" ? "Kataloğa gir" : "Browse Catalog"}
            </Link>
            <Link href="/auth/login"
              className="px-5 py-2.5 rounded-xl text-[13px] font-semibold border border-white/20 text-white hover:bg-white/10 transition-all">
              {locale === "uz" ? "Kirish" : locale === "ru" ? "Войти" : locale === "tr" ? "Giriş" : "Login"}
            </Link>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((svc, i) => (
            <Link key={i} href={svc.href}
              className="group flex gap-4 p-5 rounded-2xl border border-white/8 hover:border-white/20 transition-all hover:bg-white/05 cursor-pointer"
              style={{ background: "rgba(255,255,255,.03)" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white"
                style={{ background: svc.color }}>
                {svc.icon}
              </div>
              <div className="min-w-0">
                <div className="text-white font-semibold text-[14px] mb-1 group-hover:text-[#F5B400] transition-colors">{t(svc.title, locale)}</div>
                <div className="text-white/42 text-[11px] leading-relaxed line-clamp-2">{t(svc.desc, locale)}</div>
              </div>
              <ArrowRight size={14} className="text-white/20 group-hover:text-white/60 flex-shrink-0 mt-1 transition-colors" />
            </Link>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-8 p-5 rounded-2xl border border-white/10 flex flex-wrap items-center justify-between gap-4"
          style={{ background: "rgba(245,180,0,.07)" }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#F5B400]/20 flex items-center justify-center text-[#F5B400]"><BookOpen size={18} /></div>
            <div>
              <div className="text-white font-bold text-[14px]">8 420+</div>
              <div className="text-white/40 text-[11px]">
                {locale === "uz" ? "Kutubxona fondi" : locale === "ru" ? "Книжный фонд" : locale === "tr" ? "Kütüphane fondu" : "Library collection"}
              </div>
            </div>
          </div>
          <Link href="/catalog"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold text-[#F5B400] border border-[#F5B400]/30 hover:bg-[#F5B400]/10 transition-all">
            {locale === "uz" ? "Barchasini ko'rish" : locale === "ru" ? "Посмотреть всё" : locale === "tr" ? "Tümünü gör" : "View all"}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
