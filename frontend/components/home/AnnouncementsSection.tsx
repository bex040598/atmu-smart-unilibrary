"use client";

import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { Calendar, Bell, ArrowRight, ChevronRight, BookOpen, Award, Users } from "lucide-react";

const NEWS = [
  {
    id: 1,
    category: { uz: "Yangilik", ru: "Новости", en: "News", tr: "Haber" },
    categoryColor: "bg-blue-100 text-blue-700",
    date: "2024-12-15",
    icon: <BookOpen size={14} />,
    title: {
      uz: "2024-2025 o'quv yili uchun yangi elektron resurslar qo'shildi",
      ru: "Добавлены новые электронные ресурсы на 2024-2025 учебный год",
      en: "New e-resources added for 2024-2025 academic year",
      tr: "2024-2025 akademik yılı için yeni e-kaynaklar eklendi",
    },
    excerpt: {
      uz: "Barcha kafedralar uchun 500 dan ortiq yangi elektron darslik va qo'llanmalar yuklab qo'yildi.",
      ru: "Загружено более 500 новых электронных учебников и пособий для всех кафедр.",
      en: "Over 500 new e-textbooks and manuals uploaded for all departments.",
      tr: "Tüm bölümler için 500'den fazla yeni e-ders kitabı ve kılavuz yüklendi.",
    },
    featured: true,
  },
  {
    id: 2,
    category: { uz: "E'lon", ru: "Объявление", en: "Notice", tr: "Duyuru" },
    categoryColor: "bg-amber-100 text-amber-700",
    date: "2024-12-10",
    icon: <Bell size={14} />,
    title: {
      uz: "O'qish zali ish vaqti o'zgartirildi",
      ru: "Изменено время работы читального зала",
      en: "Reading room working hours changed",
      tr: "Okuma salonu çalışma saatleri değiştirildi",
    },
    excerpt: {
      uz: "Yanvar oyidan boshlab o'qish zali du-shanba dan juma ga 8:00 dan 20:00 gacha ishlaydi.",
      ru: "С января читальный зал работает с понедельника по пятницу с 8:00 до 20:00.",
      en: "From January, the reading room is open Monday to Friday 8:00 to 20:00.",
      tr: "Ocak'tan itibaren okuma salonu Pazartesi-Cuma 8:00-20:00 açık.",
    },
    featured: false,
  },
  {
    id: 3,
    category: { uz: "Tadbir", ru: "Мероприятие", en: "Event", tr: "Etkinlik" },
    categoryColor: "bg-purple-100 text-purple-700",
    date: "2024-12-05",
    icon: <Award size={14} />,
    title: {
      uz: "Eng ko'p o'qigan talabalar mukofotlandi",
      ru: "Наиболее активные читатели получили награды",
      en: "Most active readers awarded",
      tr: "En çok okuyan öğrenciler ödüllendirildi",
    },
    excerpt: {
      uz: "2024 yil davomida kutubxonadan eng ko'p foydalangan 20 nafar talaba sovg'alar bilan taqdirlandi.",
      ru: "20 студентов, наиболее активно использовавших библиотеку в 2024 году, получили призы.",
      en: "20 students who used the library the most in 2024 were awarded prizes.",
      tr: "2024 yılında kütüphaneyi en çok kullanan 20 öğrenci ödülle takdim edildi.",
    },
    featured: false,
  },
  {
    id: 4,
    category: { uz: "Xizmat", ru: "Услуга", en: "Service", tr: "Hizmet" },
    categoryColor: "bg-emerald-100 text-emerald-700",
    date: "2024-11-28",
    icon: <Users size={14} />,
    title: {
      uz: "AI Yordamchi xizmati ishga tushirildi",
      ru: "Запущен сервис AI Ассистента",
      en: "AI Assistant service launched",
      tr: "AI Asistan hizmeti başlatıldı",
    },
    excerpt: {
      uz: "Endi kutubxona AI yordamchisi orqali kitob va resurslarni tezda topishingiz mumkin.",
      ru: "Теперь через ИИ-ассистента библиотеки можно быстро найти книги и ресурсы.",
      en: "Now you can quickly find books and resources through the library AI assistant.",
      tr: "Artık kütüphane AI asistanı aracılığıyla kitap ve kaynakları hızlıca bulabilirsiniz.",
    },
    featured: false,
  },
];

const SECTION_LABELS: Record<string, Record<string, string>> = {
  uz: { tag: "Yangiliklar", title: "So'nggi yangiliklar va e'lonlar", all: "Barchasini ko'rish" },
  ru: { tag: "Новости", title: "Последние новости и объявления", all: "Смотреть все" },
  en: { tag: "News", title: "Latest News & Announcements", all: "View all" },
  tr: { tag: "Haberler", title: "Son haberler ve duyurular", all: "Tümünü gör" },
};

function formatDate(dateStr: string, locale: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString(
    locale === "uz" ? "uz-UZ" : locale === "ru" ? "ru-RU" : locale === "tr" ? "tr-TR" : "en-US",
    { day: "numeric", month: "long", year: "numeric" }
  );
}

export default function AnnouncementsSection() {
  const locale = useLocale() as "uz" | "ru" | "en" | "tr";
  const s = SECTION_LABELS[locale] || SECTION_LABELS.uz;
  const featured = NEWS[0];
  const rest = NEWS.slice(1);

  return (
    <section className="py-14 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="section-tag">
              <Bell size={11} />
              {s.tag}
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{s.title}</h2>
            <div className="section-divider" />
          </div>
          <Link href="/news" className="flex items-center gap-1 text-sm text-[#1457A8] font-semibold hover:underline">
            {s.all} <ChevronRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Featured large card */}
          <div className="lg:col-span-1 news-card group cursor-pointer">
            <div className="h-44 bg-gradient-to-br from-[#061B3A] to-[#1457A8] flex items-end p-5 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E\")"}} />
              <div className="relative">
                <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full mb-2 ${featured.categoryColor}`}>
                  {featured.icon}
                  {featured.category[locale]}
                </span>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-2">
                <Calendar size={11} />
                {formatDate(featured.date, locale)}
              </div>
              <h3 className="font-bold text-gray-900 text-base leading-snug mb-2 group-hover:text-[#1457A8] transition-colors">
                {featured.title[locale]}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                {featured.excerpt[locale]}
              </p>
              <div className="flex items-center gap-1 mt-4 text-[#1457A8] text-sm font-semibold">
                {locale === "uz" ? "Batafsil" : locale === "ru" ? "Подробнее" : locale === "tr" ? "Devamı" : "Read more"}
                <ArrowRight size={13} />
              </div>
            </div>
          </div>

          {/* 3 smaller news cards */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {rest.map((item) => (
              <div key={item.id} className="news-card group cursor-pointer flex gap-4 p-4">
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center flex-shrink-0 group-hover:from-blue-50 group-hover:to-indigo-100 transition-colors">
                  <span className="text-2xl">
                    {item.id === 2 ? "📅" : item.id === 3 ? "🏆" : "🤖"}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${item.categoryColor}`}>
                      {item.icon}
                      {item.category[locale]}
                    </span>
                    <span className="text-gray-400 text-xs flex items-center gap-1">
                      <Calendar size={10} />
                      {formatDate(item.date, locale)}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-1 group-hover:text-[#1457A8] transition-colors line-clamp-2">
                    {item.title[locale]}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
                    {item.excerpt[locale]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
