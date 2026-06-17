"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Calendar } from "lucide-react";

type Locale = "uz" | "ru" | "en" | "tr";

const T: Record<Locale, Record<string, string>> = {
  uz: {
    section_tag: "Yangiliklar",
    title: "Universitet yangiliklari",
    subtitle: "ATMUdagi eng so'nggi voqealar, loyihalar va akademik yangiliklar",
    all_news: "Barcha yangiliklar",
    read_more: "Batafsil",
    category_lib: "Kutubxona",
    category_edu: "Ta'lim",
    category_tech: "Texnologiya",
    category_sci: "Ilm-fan",
  },
  ru: {
    section_tag: "Новости",
    title: "Новости университета",
    subtitle: "Последние события, проекты и академические новости АТМУ",
    all_news: "Все новости",
    read_more: "Подробнее",
    category_lib: "Библиотека",
    category_edu: "Образование",
    category_tech: "Технологии",
    category_sci: "Наука",
  },
  en: {
    section_tag: "News",
    title: "University News",
    subtitle: "Latest events, projects and academic news from ATMU",
    all_news: "All news",
    read_more: "Read more",
    category_lib: "Library",
    category_edu: "Education",
    category_tech: "Technology",
    category_sci: "Science",
  },
  tr: {
    section_tag: "Haberler",
    title: "Üniversite Haberleri",
    subtitle: "ATMU'dan en son etkinlikler, projeler ve akademik haberler",
    all_news: "Tüm haberler",
    read_more: "Devamı",
    category_lib: "Kütüphane",
    category_edu: "Eğitim",
    category_tech: "Teknoloji",
    category_sci: "Bilim",
  },
};

const NEWS = [
  {
    id: 1,
    catKey: "category_lib",
    catColor: "#1457A8",
    date: "12 Iyun 2026",
    dateRu: "12 Июня 2026",
    dateEn: "June 12, 2026",
    dateTr: "12 Haziran 2026",
    titleUz: "ATMU Smart UniLibrary platformasi sinov rejimida muvaffaqiyatli ishga tushirildi",
    titleRu: "Платформа ATMU Smart UniLibrary успешно запущена в тестовом режиме",
    titleEn: "ATMU Smart UniLibrary platform successfully launched in testing mode",
    titleTr: "ATMU Smart UniLibrary platformu test modunda başarıyla başlatıldı",
    big: true,
    gradient: "linear-gradient(135deg, #061B3A, #1457A8)",
  },
  {
    id: 2,
    catKey: "category_edu",
    catColor: "#0E9F6E",
    date: "8 Iyun 2026",
    dateRu: "8 Июня 2026",
    dateEn: "June 8, 2026",
    dateTr: "8 Haziran 2026",
    titleUz: "Kafedralar elektron resurs bazasini shakllantirish boshlandi",
    titleRu: "Начато формирование электронной базы ресурсов кафедр",
    titleEn: "Formation of the electronic resource base of departments has begun",
    titleTr: "Bölümlerin elektronik kaynak tabanının oluşturulmasına başlandı",
    big: false,
    gradient: "linear-gradient(135deg, #0B3D73, #008C95)",
  },
  {
    id: 3,
    catKey: "category_tech",
    catColor: "#D6A84F",
    date: "5 Iyun 2026",
    dateRu: "5 Июня 2026",
    dateEn: "June 5, 2026",
    dateTr: "5 Haziran 2026",
    titleUz: "Elektron katalog va kitob band qilish xizmati joriy qilindi",
    titleRu: "Введены электронный каталог и служба бронирования книг",
    titleEn: "Electronic catalog and book reservation service introduced",
    titleTr: "Elektronik katalog ve kitap rezervasyon hizmeti devreye alındı",
    big: false,
    gradient: "linear-gradient(135deg, #1A1A2E, #D6A84F44)",
  },
  {
    id: 4,
    catKey: "category_lib",
    catColor: "#1457A8",
    date: "1 Iyun 2026",
    dateRu: "1 Июня 2026",
    dateEn: "June 1, 2026",
    dateTr: "1 Haziran 2026",
    titleUz: "O'quv zali joylarini onlayn bron qilish imkoniyati yaratildi",
    titleRu: "Создана возможность онлайн бронирования мест в читальном зале",
    titleEn: "Online booking of reading room seats has been introduced",
    titleTr: "Okuma salonu yer rezervasyonu çevrimiçi olarak mümkün hale getirildi",
    big: false,
    gradient: "linear-gradient(135deg, #061B3A, #1457A8)",
  },
  {
    id: 5,
    catKey: "category_sci",
    catColor: "#7C3AED",
    date: "28 May 2026",
    dateRu: "28 Мая 2026",
    dateEn: "May 28, 2026",
    dateTr: "28 Mayıs 2026",
    titleUz: "AI kutubxonachi moduli talabalar bilan testdan o'tkazilmoqda",
    titleRu: "Модуль библиотекаря ИИ проходит тестирование со студентами",
    titleEn: "AI librarian module is being tested with students",
    titleTr: "AI kütüphaneci modülü öğrencilerle test edilmektedir",
    big: false,
    gradient: "linear-gradient(135deg, #1A0B2E, #7C3AED44)",
  },
];

export default function UniversityNews() {
  const locale = useLocale() as Locale;
  const L = T[locale] || T.uz;

  const getTitle = (n: typeof NEWS[0]) => {
    if (locale === "ru") return n.titleRu;
    if (locale === "en") return n.titleEn;
    if (locale === "tr") return n.titleTr;
    return n.titleUz;
  };

  const getDate = (n: typeof NEWS[0]) => {
    if (locale === "ru") return n.dateRu;
    if (locale === "en") return n.dateEn;
    if (locale === "tr") return n.dateTr;
    return n.date;
  };

  const big = NEWS[0];
  const smalls = NEWS.slice(1);

  return (
    <section className="py-14 bg-[#F5F7FA]">
      <div className="max-w-[1280px] mx-auto px-4">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="section-tag mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1457A8]" />
              {L.section_tag}
            </div>
            <h2 className="text-[#061B3A] text-2xl lg:text-3xl font-bold">{L.title}</h2>
            <div className="section-divider mt-2" />
            <p className="text-gray-500 text-sm mt-3">{L.subtitle}</p>
          </div>
          <Link
            href="/news"
            className="hidden sm:flex items-center gap-1.5 text-[#1457A8] text-sm font-semibold hover:gap-2.5 transition-all"
          >
            {L.all_news} <ArrowRight size={14} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Big card */}
          <div className="lg:col-span-1 news-card group cursor-pointer">
            <div
              className="h-64 lg:h-80 relative overflow-hidden"
              style={{ background: big.gradient }}
            >
              {/* Decorative */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 right-4 w-32 h-32 rounded-full border border-white/50" />
                <div className="absolute bottom-8 left-6 w-20 h-20 rounded-full border border-white/30" />
              </div>
              <div className="absolute inset-0 p-6 flex flex-col justify-end"
                style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.7) 0%, transparent 60%)" }}>
                <span
                  className="inline-block px-2.5 py-0.5 rounded-full text-white text-[10px] font-bold uppercase tracking-wide mb-3 w-fit"
                  style={{ background: big.catColor }}
                >
                  {L[big.catKey]}
                </span>
                <div className="flex items-center gap-1.5 text-white/60 text-[11px] mb-2">
                  <Calendar size={11} />
                  {getDate(big)}
                </div>
                <h3 className="text-white font-bold text-base leading-snug group-hover:text-yellow-300 transition-colors">
                  {getTitle(big)}
                </h3>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between">
              <span className="text-[#1457A8] text-xs font-semibold flex items-center gap-1 hover:gap-2 transition-all cursor-pointer">
                {L.read_more} <ArrowRight size={12} />
              </span>
            </div>
          </div>

          {/* Small cards grid */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {smalls.map((n) => (
              <div key={n.id} className="news-card group cursor-pointer">
                <div
                  className="h-36 relative overflow-hidden"
                  style={{ background: n.gradient }}
                >
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-3 right-3 w-20 h-20 rounded-full border border-white/40" />
                  </div>
                  <div className="absolute bottom-3 left-4 right-4">
                    <span
                      className="inline-block px-2 py-0.5 rounded-full text-white text-[10px] font-bold uppercase tracking-wide mb-1"
                      style={{ background: n.catColor + "cc" }}
                    >
                      {L[n.catKey]}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-1.5 text-gray-400 text-[11px] mb-2">
                    <Calendar size={11} />
                    {getDate(n)}
                  </div>
                  <h3 className="text-[#172033] text-[13px] font-semibold leading-snug mb-3 group-hover:text-[#1457A8] transition-colors line-clamp-2">
                    {getTitle(n)}
                  </h3>
                  <span className="text-[#1457A8] text-xs font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                    {L.read_more} <ArrowRight size={11} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 sm:hidden">
          <Link
            href="/news"
            className="flex items-center justify-center gap-2 border border-[#1457A8] text-[#1457A8] py-3 rounded-xl text-sm font-semibold"
          >
            {L.all_news} <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
