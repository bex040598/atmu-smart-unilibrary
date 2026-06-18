"use client";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Calendar } from "lucide-react";

type Locale = "uz" | "ru" | "en" | "tr";
const t = (obj: Record<string, string>, locale: Locale) => obj[locale] || obj.uz;

const NEWS = [
  {
    id: 1, cat: { uz: "Xalqaro", ru: "Международное", en: "International", tr: "Uluslararası" }, catColor: "#0069A8",
    date: { uz: "16 Iyun 2026", ru: "16 Июня 2026", en: "June 16, 2026", tr: "16 Haziran 2026" },
    title: { uz: "ATMU xalqaro reyting tizimida O'zbekiston universitetlari o'rtasida top-10 ga kirdi", ru: "АТМУ вошёл в топ-10 вузов Узбекистана в международном рейтинге", en: "ATMU ranked top-10 among Uzbekistan universities in international ratings", tr: "ATMU, uluslararası sıralamada Özbekistan üniversiteleri arasında ilk 10'a girdi" },
    bg: "#002B4A", featured: true,
  },
  {
    id: 2, cat: { uz: "Qabul", ru: "Приём", en: "Admission", tr: "Kabul" }, catColor: "#F5B400",
    date: { uz: "12 Iyun 2026", ru: "12 Июня 2026", en: "June 12, 2026", tr: "12 Haziran 2026" },
    title: { uz: "2026-2027 o'quv yiliga qabul komissiyasi ishi boshlandi: 680 ta grant o'rni", ru: "Открыта приёмная комиссия на 2026-2027 учебный год: 680 грантовых мест", en: "Admission for 2026-2027 academic year opened: 680 grant places available", tr: "2026-2027 akademik yılı için kayıt başladı: 680 burslu yer" },
    bg: "#003D66", featured: false,
  },
  {
    id: 3, cat: { uz: "Ilm-fan", ru: "Наука", en: "Science", tr: "Bilim" }, catColor: "#00A3E0",
    date: { uz: "8 Iyun 2026", ru: "8 Июня 2026", en: "June 8, 2026", tr: "8 Haziran 2026" },
    title: { uz: "ATMU olimlari Xalqaro sun'iy intellekt konferentsiyasida 3 ta ilmiy maqola taqdim etdi", ru: "Учёные АТМУ представили 3 научные статьи на Международной конференции по ИИ", en: "ATMU scientists presented 3 research papers at International AI Conference", tr: "ATMU bilim insanları Uluslararası YZ Konferansı'nda 3 makale sundu" },
    bg: "#004A6E", featured: false,
  },
  {
    id: 4, cat: { uz: "Ta'lim", ru: "Образование", en: "Education", tr: "Eğitim" }, catColor: "#00A050",
    date: { uz: "3 Iyun 2026", ru: "3 Июня 2026", en: "June 3, 2026", tr: "3 Haziran 2026" },
    title: { uz: "Yangi o'quv yilidan «Kiberxavfsizlik» bakalavr yo'nalishi ochiladi", ru: "С нового учебного года открывается направление «Кибербезопасность»", en: "New bachelor's program in Cybersecurity opens from next academic year", tr: "Yeni akademik yıldan itibaren Siber Güvenlik lisans programı açılıyor" },
    bg: "#1A3A5E", featured: false,
  },
  {
    id: 5, cat: { uz: "Sport", ru: "Спорт", en: "Sports", tr: "Spor" }, catColor: "#8855CC",
    date: { uz: "28 May 2026", ru: "28 Мая 2026", en: "May 28, 2026", tr: "28 Mayıs 2026" },
    title: { uz: "ATMU talabasi respublika olimpiadasida oltin medal qo'lga kiritdi", ru: "Студент АТМУ завоевал золотую медаль на республиканской олимпиаде", en: "ATMU student wins gold medal at the national academic olympiad", tr: "ATMU öğrencisi ulusal olimpiyatta altın madalya kazandı" },
    bg: "#1A2A4A", featured: false,
  },
];

export default function UniversityNews() {
  const locale = useLocale() as Locale;
  const titleLabel = locale === "uz" ? "Universitet yangiliklari" : locale === "ru" ? "Университетские новости" : locale === "tr" ? "Üniversite Haberleri" : "University News";
  const allLabel = locale === "uz" ? "Barchasini ko'rish" : locale === "ru" ? "Все новости" : locale === "tr" ? "Tüm haberler" : "All news";

  return (
    <section className="py-14" style={{ background: "#F4F7FB" }}>
      <div className="max-w-[1680px] mx-auto px-5 sm:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="section-tag mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0069A8]" />
              {locale === "uz" ? "Yangiliklar" : locale === "ru" ? "Новости" : "News"}
            </div>
            <h2 className="section-blue-title">{titleLabel}</h2>
            <div className="section-divider mt-2" />
          </div>
          <Link href="/" className="hidden sm:flex items-center gap-1.5 text-[#0069A8] text-[13px] font-semibold hover:gap-2.5 transition-all">
            {allLabel} <ArrowRight size={14} />
          </Link>
        </div>

        {/* Masonry */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Featured */}
          <div
            className="news-card cursor-pointer"
            style={{ background: NEWS[0].bg, minHeight: 400, position: "relative" }}
          >
            <div className="absolute inset-0 rounded-[20px]" style={{ background: "linear-gradient(to top,rgba(0,0,0,.78) 0%,rgba(0,0,0,.1) 60%,transparent 100%)" }} />
            <div className="absolute top-0 right-0 w-36 h-36 rounded-full opacity-8 bg-white" style={{ transform: "translate(35%,-35%)" }} />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full text-white" style={{ background: NEWS[0].catColor }}>{t(NEWS[0].cat, locale)}</span>
                <span className="text-white/50 text-[11px] flex items-center gap-1"><Calendar size={10} />{t(NEWS[0].date, locale)}</span>
              </div>
              <h3 className="text-white font-bold leading-snug" style={{ fontSize: "clamp(15px,1.4vw,21px)" }}>{t(NEWS[0].title, locale)}</h3>
            </div>
          </div>

          {/* Right 2 cards */}
          <div className="grid grid-rows-2 gap-4">
            {NEWS.slice(1, 3).map(n => (
              <div key={n.id} className="news-card cursor-pointer" style={{ background: n.bg, minHeight: 188, position: "relative" }}>
                <div className="absolute inset-0 rounded-[20px]" style={{ background: "linear-gradient(to top,rgba(0,0,0,.72) 0%,transparent 70%)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white" style={{ background: n.catColor }}>{t(n.cat, locale)}</span>
                    <span className="text-white/45 text-[10px]">{t(n.date, locale)}</span>
                  </div>
                  <h3 className="text-white font-semibold text-[13px] leading-snug line-clamp-2">{t(n.title, locale)}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          {NEWS.slice(3, 5).map(n => (
            <div key={n.id} className="news-card cursor-pointer" style={{ background: n.bg, minHeight: 170, position: "relative" }}>
              <div className="absolute inset-0 rounded-[20px]" style={{ background: "linear-gradient(to top,rgba(0,0,0,.72) 0%,transparent 65%)" }} />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white mb-2 inline-block" style={{ background: n.catColor }}>{t(n.cat, locale)}</span>
                <h3 className="text-white font-semibold text-[12px] leading-snug line-clamp-2">{t(n.title, locale)}</h3>
              </div>
            </div>
          ))}
          <Link href="/" className="news-card flex flex-col items-center justify-center cursor-pointer" style={{ background: "#0069A8", minHeight: 170 }}>
            <ArrowRight size={28} className="text-white mb-2" />
            <span className="text-white font-bold text-[14px]">{allLabel}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
