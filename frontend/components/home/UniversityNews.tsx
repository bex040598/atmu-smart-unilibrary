"use client";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Calendar } from "lucide-react";

type Locale = "uz" | "ru" | "en" | "tr";
const t = (obj: Record<string, string>, locale: Locale) => obj[locale] || obj.uz;

const NEWS = [
  {
    id: 1,
    cat: { uz: "Yangilik", ru: "Новость", en: "News", tr: "Haber" },
    catColor: "#00579f",
    date: "12 Iyun 2026",
    dateRu: "12 Июня 2026",
    dateEn: "June 12, 2026",
    dateTr: "12 Haziran 2026",
    title: { uz: "ATMU Smart UniLibrary platformasi sinov rejimida muvaffaqiyatli ishga tushirildi", ru: "Платформа ATMU Smart UniLibrary успешно запущена в тестовом режиме", en: "ATMU Smart UniLibrary platform successfully launched in testing mode", tr: "ATMU Smart UniLibrary platformu test modunda başarıyla başlatıldı" },
    bg: "#003a6e",
    featured: true,
  },
  {
    id: 2,
    cat: { uz: "E'lon", ru: "Объявление", en: "Notice", tr: "Duyuru" },
    catColor: "#e8a820",
    date: "8 Iyun 2026",
    dateRu: "8 Июня 2026",
    dateEn: "June 8, 2026",
    dateTr: "8 Haziran 2026",
    title: { uz: "Kafedralar elektron resurs bazasini shakllantirish boshlandi", ru: "Начато формирование электронной ресурсной базы кафедр", en: "Formation of department electronic resource base has begun", tr: "Bölümlerin elektronik kaynak tabanı oluşturulmaya başlandı" },
    bg: "#1a3a5e",
    featured: false,
  },
  {
    id: 3,
    cat: { uz: "Xizmat", ru: "Сервис", en: "Service", tr: "Hizmet" },
    catColor: "#00a050",
    date: "5 Iyun 2026",
    dateRu: "5 Июня 2026",
    dateEn: "June 5, 2026",
    dateTr: "5 Haziran 2026",
    title: { uz: "Elektron katalog va kitob band qilish xizmati joriy qilindi", ru: "Введены электронный каталог и служба бронирования книг", en: "Electronic catalog and book reservation service launched", tr: "Elektronik katalog ve kitap rezervasyon hizmeti başlatıldı" },
    bg: "#0d3d2a",
    featured: false,
  },
  {
    id: 4,
    cat: { uz: "Xizmat", ru: "Сервис", en: "Service", tr: "Hizmet" },
    catColor: "#00a050",
    date: "1 Iyun 2026",
    dateRu: "1 Июня 2026",
    dateEn: "June 1, 2026",
    dateTr: "1 Haziran 2026",
    title: { uz: "O'quv zali joylarini onlayn bron qilish imkoniyati yaratildi", ru: "Создана возможность онлайн-бронирования мест в читальном зале", en: "Online reading room seat booking introduced", tr: "Okuma salonu çevrimiçi rezervasyonu başlatıldı" },
    bg: "#1a2a4a",
    featured: false,
  },
  {
    id: 5,
    cat: { uz: "Texnologiya", ru: "Технология", en: "Technology", tr: "Teknoloji" },
    catColor: "#8855cc",
    date: "28 May 2026",
    dateRu: "28 Мая 2026",
    dateEn: "May 28, 2026",
    dateTr: "28 Mayıs 2026",
    title: { uz: "AI kutubxonachi moduli sinovdan muvaffaqiyatli o'tkazilmoqda", ru: "Модуль ИИ-библиотекаря успешно проходит тестирование", en: "AI librarian module successfully undergoing testing", tr: "AI kütüphaneci modülü başarıyla test edilmektedir" },
    bg: "#2a1a4e",
    featured: false,
  },
];

function getDate(n: typeof NEWS[0], locale: Locale) {
  if (locale === "ru") return n.dateRu;
  if (locale === "en") return n.dateEn;
  if (locale === "tr") return n.dateTr;
  return n.date;
}

function CardOverlay({ n, height, locale }: { n: typeof NEWS[0]; height: number; locale: Locale }) {
  return (
    <div
      className="news-card w-full"
      style={{ height, background: n.bg, position: "relative" }}
    >
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10" style={{ background: "white", transform: "translate(30%,-30%)" }} />
      <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full opacity-10" style={{ background: "white", transform: "translate(-30%,30%)" }} />

      {/* Gradient overlay bottom */}
      <div className="absolute inset-0 rounded-[20px]" style={{ background: "linear-gradient(to top, rgba(0,0,0,.75) 0%, rgba(0,0,0,.2) 50%, transparent 100%)" }} />

      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full text-white" style={{ background: n.catColor }}>
            {t(n.cat, locale)}
          </span>
          <span className="text-white/55 text-[11px] flex items-center gap-1">
            <Calendar size={11} />{getDate(n, locale)}
          </span>
        </div>
        <h3 className="text-white font-bold leading-snug line-clamp-2" style={{ fontSize: n.featured ? "clamp(16px,1.4vw,20px)" : "clamp(13px,1vw,15px)" }}>
          {t(n.title, locale)}
        </h3>
      </div>
    </div>
  );
}

export default function UniversityNews() {
  const locale = useLocale() as Locale;
  const allNews = locale === "uz" ? "Barcha yangiliklar" : locale === "ru" ? "Все новости" : locale === "tr" ? "Tüm haberler" : "All news";
  const titleLabel = locale === "uz" ? "Universitet yangiliklari" : locale === "ru" ? "Университетские новости" : locale === "tr" ? "Üniversite Haberleri" : "University News";
  const sectionTag = locale === "uz" ? "Yangiliklar" : locale === "ru" ? "Новости" : locale === "tr" ? "Haberler" : "News";

  return (
    <section className="py-14" style={{ background: "#f4f6f9" }}>
      <div className="max-w-[1680px] mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="section-tag mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00579f]" />
              {sectionTag}
            </div>
            <h2 className="section-blue-title">{titleLabel}</h2>
            <div className="section-divider mt-2" />
          </div>
          <Link href="/" className="hidden sm:flex items-center gap-1.5 text-[#00579f] text-[13px] font-semibold hover:gap-2.5 transition-all">
            {allNews} <ArrowRight size={14} />
          </Link>
        </div>

        {/* Masonry grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Featured big card */}
          <div className="cursor-pointer">
            <CardOverlay n={NEWS[0]} height={420} locale={locale} />
          </div>

          {/* Right column: 2 cards stacked */}
          <div className="grid grid-rows-2 gap-4">
            <CardOverlay n={NEWS[1]} height={200} locale={locale} />
            <CardOverlay n={NEWS[2]} height={200} locale={locale} />
          </div>
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <CardOverlay n={NEWS[3]} height={180} locale={locale} />
          <CardOverlay n={NEWS[4]} height={180} locale={locale} />
          {/* CTA card */}
          <Link href="/" className="news-card flex flex-col items-center justify-center" style={{ height: 180, background: "#00579f", cursor: "pointer" }}>
            <ArrowRight size={32} className="text-white mb-3" />
            <span className="text-white font-bold text-[15px]">{allNews}</span>
            <span className="text-white/60 text-[12px] mt-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
