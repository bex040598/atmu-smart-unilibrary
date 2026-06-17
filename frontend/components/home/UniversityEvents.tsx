"use client";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Calendar, ChevronRight } from "lucide-react";

type Locale = "uz" | "ru" | "en" | "tr";
const t = (obj: Record<string, string>, locale: Locale) => obj[locale] || obj.uz;

const EVENTS = [
  {
    id: 1,
    day: "25",
    month: { uz: "Iyun", ru: "Июн", en: "Jun", tr: "Haz" },
    cat: { uz: "Seminar", ru: "Семинар", en: "Seminar", tr: "Seminer" },
    title: { uz: "Raqamli kutubxona va AI xizmatlari bo'yicha seminar", ru: "Семинар по цифровой библиотеке и AI-сервисам", en: "Digital library and AI services seminar", tr: "Dijital kütüphane ve AI hizmetleri semineri" },
    date: { uz: "25 Iyun 2026, 10:00", ru: "25 Июня 2026, 10:00", en: "June 25, 2026, 10:00", tr: "25 Haziran 2026, 10:00" },
    bg: "#003a6e",
    big: true,
  },
  {
    id: 2,
    day: "28",
    month: { uz: "Iyun", ru: "Июн", en: "Jun", tr: "Haz" },
    cat: { uz: "Trening", ru: "Тренинг", en: "Training", tr: "Eğitim" },
    title: { uz: "Kafedralar elektron resurslarini shakllantirish bo'yicha trening", ru: "Тренинг по формированию электронных ресурсов кафедр", en: "Training on forming department e-resources", tr: "Bölüm e-kaynakları oluşturma eğitimi" },
    date: { uz: "28 Iyun 2026, 09:00", ru: "28 Июня 2026, 09:00", en: "June 28, 2026, 09:00", tr: "28 Haziran 2026, 09:00" },
    bg: "#1a3a5e",
    big: false,
  },
  {
    id: 3,
    day: "2",
    month: { uz: "Iyul", ru: "Июл", en: "Jul", tr: "Tem" },
    cat: { uz: "Ochiq dars", ru: "Открытый урок", en: "Open Class", tr: "Açık Ders" },
    title: { uz: "Talabalar uchun elektron katalogdan foydalanish bo'yicha ochiq dars", ru: "Открытый урок для студентов по работе с электронным каталогом", en: "Open class for students on using the e-catalog", tr: "Öğrenciler için e-katalog kullanımı açık dersi" },
    date: { uz: "2 Iyul 2026, 14:00", ru: "2 Июля 2026, 14:00", en: "July 2, 2026, 14:00", tr: "2 Temmuz 2026, 14:00" },
    bg: "#0d3d2a",
    big: false,
  },
  {
    id: 4,
    day: "5",
    month: { uz: "Iyul", ru: "Июл", en: "Jul", tr: "Tem" },
    cat: { uz: "Master-klass", ru: "Мастер-класс", en: "Master Class", tr: "Usta Sınıfı" },
    title: { uz: "Ilmiy maqolalar va bibliografiya bilan ishlash bo'yicha master-klass", ru: "Мастер-класс по работе с научными статьями и библиографией", en: "Master class on working with scientific articles and bibliography", tr: "Bilimsel makaleler ve bibliyografya ile çalışma ustalık sınıfı" },
    date: { uz: "5 Iyul 2026, 11:00", ru: "5 Июля 2026, 11:00", en: "July 5, 2026, 11:00", tr: "5 Temmuz 2026, 11:00" },
    bg: "#2a1a4e",
    big: false,
  },
];

export default function UniversityEvents() {
  const locale = useLocale() as Locale;
  const titleLabel = locale === "uz" ? "Kutilayotgan tadbirlar" : locale === "ru" ? "Предстоящие мероприятия" : locale === "tr" ? "Yaklaşan Etkinlikler" : "Upcoming Events";
  const sectionTag = locale === "uz" ? "Tadbirlar" : locale === "ru" ? "Мероприятия" : locale === "tr" ? "Etkinlikler" : "Events";
  const allEvents = locale === "uz" ? "Barcha tadbirlar" : locale === "ru" ? "Все мероприятия" : locale === "tr" ? "Tüm etkinlikler" : "All events";
  const details = locale === "uz" ? "Batafsil" : locale === "ru" ? "Подробнее" : locale === "tr" ? "Detaylar" : "Details";

  return (
    <section className="py-14 bg-white">
      <div className="max-w-[1680px] mx-auto px-5 sm:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="section-tag mb-2"><span className="w-1.5 h-1.5 rounded-full bg-[#00579f]" />{sectionTag}</div>
            <h2 className="section-blue-title">{titleLabel}</h2>
            <div className="section-divider mt-2" />
          </div>
          <Link href="/" className="hidden sm:flex items-center gap-1.5 text-[#00579f] text-[13px] font-semibold hover:gap-2.5 transition-all">
            {allEvents} <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid lg:grid-cols-5 gap-5">
          {/* Left: image cards */}
          <div className="lg:col-span-2 grid grid-rows-2 gap-4">
            {/* Big card */}
            <div className="news-card row-span-2" style={{ background: EVENTS[0].bg, minHeight: 320, position: "relative" }}>
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 bg-white" style={{ transform: "translate(30%,-30%)" }} />
              <div className="absolute inset-0 rounded-[20px]" style={{ background: "linear-gradient(to top,rgba(0,0,0,.7) 0%,rgba(0,0,0,.1) 60%,transparent 100%)" }} />
              <div className="absolute top-4 left-4">
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full text-white bg-[#e8a820]">{t(EVENTS[0].cat, locale)}</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center gap-1.5 text-white/55 text-[11px] mb-2">
                  <Calendar size={11} />{t(EVENTS[0].date, locale)}
                </div>
                <h3 className="text-white font-bold leading-snug" style={{ fontSize: "clamp(14px,1.2vw,17px)" }}>{t(EVENTS[0].title, locale)}</h3>
              </div>
            </div>

            {/* Two stacked cards */}
            {EVENTS.slice(1, 3).map(ev => (
              <div key={ev.id} className="news-card" style={{ background: ev.bg, minHeight: 140, position: "relative" }}>
                <div className="absolute inset-0 rounded-[20px]" style={{ background: "linear-gradient(to top,rgba(0,0,0,.7) 0%,transparent 100%)" }} />
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white bg-white/20">{t(ev.cat, locale)}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="text-white/55 text-[10px] flex items-center gap-1 mb-1"><Calendar size={10} />{t(ev.date, locale)}</div>
                  <h3 className="text-white font-semibold text-[12px] leading-snug line-clamp-2">{t(ev.title, locale)}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Right: event list */}
          <div className="lg:col-span-3 space-y-3">
            {EVENTS.map(ev => (
              <div key={ev.id} className="portal-card p-4 sm:p-5 group cursor-pointer" style={{ borderLeft: "3px solid #00579f" }}>
                <div className="flex gap-4">
                  {/* Date badge */}
                  <div className="flex-shrink-0 flex flex-col items-center justify-center w-14 text-center">
                    <div className="text-[#00579f] font-black text-2xl leading-none">{ev.day}</div>
                    <div className="text-gray-400 text-[11px] font-semibold uppercase">{t(ev.month, locale)}</div>
                  </div>
                  <div className="w-px bg-gray-100 self-stretch" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white bg-[#00579f]">{t(ev.cat, locale)}</span>
                      <span className="text-gray-400 text-[11px] flex items-center gap-1"><Calendar size={10} />{t(ev.date, locale)}</span>
                    </div>
                    <h3 className="text-[#1a2332] font-semibold text-[14px] leading-snug group-hover:text-[#00579f] transition-colors">
                      {t(ev.title, locale)}
                    </h3>
                  </div>
                  <div className="flex items-center flex-shrink-0">
                    <span className="text-[12px] text-[#00579f] font-semibold hidden sm:flex items-center gap-1 group-hover:gap-2 transition-all">
                      {details} <ChevronRight size={13} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
