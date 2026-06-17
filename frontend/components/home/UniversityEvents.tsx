"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, ChevronRight } from "lucide-react";

type Locale = "uz" | "ru" | "en" | "tr";

const T: Record<Locale, Record<string, string>> = {
  uz: {
    tag: "Tadbirlar",
    title: "Kutilayotgan tadbirlar",
    all: "Barcha tadbirlar",
    more: "Batafsil",
    cat_seminar: "Seminar",
    cat_training: "Trening",
    cat_lesson: "Ochiq dars",
    cat_master: "Master-klass",
  },
  ru: {
    tag: "Мероприятия",
    title: "Предстоящие мероприятия",
    all: "Все мероприятия",
    more: "Подробнее",
    cat_seminar: "Семинар",
    cat_training: "Тренинг",
    cat_lesson: "Открытый урок",
    cat_master: "Мастер-класс",
  },
  en: {
    tag: "Events",
    title: "Upcoming Events",
    all: "All events",
    more: "Details",
    cat_seminar: "Seminar",
    cat_training: "Training",
    cat_lesson: "Open Lesson",
    cat_master: "Master Class",
  },
  tr: {
    tag: "Etkinlikler",
    title: "Yaklaşan Etkinlikler",
    all: "Tüm etkinlikler",
    more: "Detaylar",
    cat_seminar: "Seminer",
    cat_training: "Eğitim",
    cat_lesson: "Açık Ders",
    cat_master: "Usta Sınıfı",
  },
};

const EVENTS = [
  {
    id: 1,
    day: "25",
    month: { uz: "Iyun", ru: "Июня", en: "June", tr: "Haziran" },
    catKey: "cat_seminar",
    color: "#1457A8",
    bg: "linear-gradient(135deg, #061B3A, #1457A8)",
    titleUz: "Raqamli kutubxona va AI xizmatlari bo'yicha seminar",
    titleRu: "Семинар по цифровой библиотеке и услугам ИИ",
    titleEn: "Seminar on digital library and AI services",
    titleTr: "Dijital kütüphane ve AI hizmetleri semineri",
    big: true,
  },
  {
    id: 2,
    day: "28",
    month: { uz: "Iyun", ru: "Июня", en: "June", tr: "Haziran" },
    catKey: "cat_training",
    color: "#0E9F6E",
    bg: "linear-gradient(135deg, #0B3D73, #008C95)",
    titleUz: "Kafedralar elektron resurslarini shakllantirish bo'yicha trening",
    titleRu: "Тренинг по формированию электронных ресурсов кафедр",
    titleEn: "Training on forming department electronic resources",
    titleTr: "Bölüm elektronik kaynaklarının oluşturulması eğitimi",
    big: true,
  },
  {
    id: 3,
    day: "3",
    month: { uz: "Iyul", ru: "Июля", en: "July", tr: "Temmuz" },
    catKey: "cat_lesson",
    color: "#1457A8",
    titleUz: "Talabalar uchun elektron katalogdan foydalanish bo'yicha ochiq dars",
    titleRu: "Открытый урок по использованию электронного каталога для студентов",
    titleEn: "Open lesson on using the electronic catalog for students",
    titleTr: "Öğrenciler için elektronik katalog kullanımı açık dersi",
    big: false,
  },
  {
    id: 4,
    day: "10",
    month: { uz: "Iyul", ru: "Июля", en: "July", tr: "Temmuz" },
    catKey: "cat_master",
    color: "#7C3AED",
    titleUz: "Ilmiy maqolalar va bibliografiya bilan ishlash bo'yicha master-klass",
    titleRu: "Мастер-класс по работе с научными статьями и библиографией",
    titleEn: "Master class on working with scientific articles and bibliography",
    titleTr: "Bilimsel makaleler ve kaynakçayla çalışma ustası sınıfı",
    big: false,
  },
];

export default function UniversityEvents() {
  const locale = useLocale() as Locale;
  const L = T[locale] || T.uz;

  const getTitle = (e: typeof EVENTS[0]) => {
    if (locale === "ru") return e.titleRu;
    if (locale === "en") return e.titleEn;
    if (locale === "tr") return e.titleTr;
    return e.titleUz;
  };

  const bigEvents = EVENTS.filter((e) => e.big);
  const listEvents = EVENTS.filter((e) => !e.big);

  return (
    <section className="py-14" style={{ background: "#fff" }}>
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="section-tag mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1457A8]" />
              {L.tag}
            </div>
            <h2 className="text-[#061B3A] text-2xl lg:text-3xl font-bold">{L.title}</h2>
            <div className="section-divider mt-2" />
          </div>
          <Link href="/events" className="hidden sm:flex items-center gap-1.5 text-[#1457A8] text-sm font-semibold">
            {L.all} <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Left — 2 big event cards */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-5">
            {bigEvents.map((ev) => (
              <div key={ev.id} className="portal-card group cursor-pointer overflow-hidden">
                <div
                  className="h-48 relative"
                  style={{ background: ev.bg }}
                >
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 right-4 w-28 h-28 rounded-full border border-white/40" />
                    <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full border border-white/25" />
                  </div>
                  <div className="absolute top-4 left-4">
                    <span
                      className="px-2.5 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-wide"
                      style={{ background: ev.color + "cc" }}
                    >
                      {L[ev.catKey]}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 text-right">
                    <div className="text-white font-bold text-4xl leading-none">{ev.day}</div>
                    <div className="text-white/60 text-xs">{ev.month[locale]}</div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-[#172033] text-[13px] font-semibold leading-snug mb-3 group-hover:text-[#1457A8] transition-colors">
                    {getTitle(ev)}
                  </h3>
                  <span className="text-[#1457A8] text-xs font-semibold flex items-center gap-1">
                    {L.more} <ChevronRight size={12} />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right — vertical list */}
          <div className="lg:col-span-2 space-y-4">
            {listEvents.map((ev) => (
              <div
                key={ev.id}
                className="flex gap-4 items-start p-4 rounded-xl border border-gray-100 hover:border-[#1457A8]/30 hover:bg-blue-50/30 transition-all cursor-pointer group"
              >
                <div
                  className="flex-shrink-0 w-14 text-center py-2 rounded-lg"
                  style={{ background: ev.color + "15" }}
                >
                  <div className="font-bold text-xl" style={{ color: ev.color }}>{ev.day}</div>
                  <div className="text-[10px] font-semibold" style={{ color: ev.color + "99" }}>{ev.month[locale]}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <span
                    className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide mb-1.5"
                    style={{ background: ev.color + "15", color: ev.color }}
                  >
                    {L[ev.catKey]}
                  </span>
                  <h3 className="text-[#172033] text-[13px] font-semibold leading-snug group-hover:text-[#1457A8] transition-colors">
                    {getTitle(ev)}
                  </h3>
                  <span className="text-[#1457A8] text-[11px] font-semibold flex items-center gap-1 mt-2">
                    {L.more} <ChevronRight size={11} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
