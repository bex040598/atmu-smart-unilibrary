"use client";

import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { Calendar, Bell, ArrowRight, ChevronRight, BookOpen, Award } from "lucide-react";

type Locale = "uz" | "ru" | "en" | "tr";

const NEWS = [
  {
    id: 1,
    catUz: "Yangilik", catRu: "Новость", catEn: "News", catTr: "Haber",
    catColor: "bg-blue-100 text-blue-700",
    date: "2026-06-12",
    titleUz: "ATMU Smart UniLibrary platformasi test rejimida muvaffaqiyatli ishga tushirildi",
    titleRu: "Платформа ATMU Smart UniLibrary успешно запущена в тестовом режиме",
    titleEn: "ATMU Smart UniLibrary platform successfully launched in testing mode",
    titleTr: "ATMU Smart UniLibrary platformu test modunda başarıyla başlatıldı",
    excerptUz: "Platforma talabalar va o'qituvchilar bilan sinov rejimida ishlatilmoqda. Barcha kafedralar elektron resurs bazasini shakllantirish boshladi.",
    excerptRu: "Платформа тестируется со студентами и преподавателями. Все кафедры приступили к формированию электронной ресурсной базы.",
    excerptEn: "The platform is being tested with students and teachers. All departments have started forming their electronic resource base.",
    excerptTr: "Platform öğrenciler ve öğretmenlerle test edilmektedir. Tüm bölümler elektronik kaynak tabanı oluşturmaya başladı.",
    featured: true,
    icon: <BookOpen size={13} />,
  },
  {
    id: 2,
    catUz: "E'lon", catRu: "Объявление", catEn: "Notice", catTr: "Duyuru",
    catColor: "bg-amber-100 text-amber-700",
    date: "2026-06-08",
    titleUz: "Kafedralar elektron resurs bazasini shakllantirish boshlandi",
    titleRu: "Начато формирование электронной базы ресурсов кафедр",
    titleEn: "Formation of the electronic resource base of departments has begun",
    titleTr: "Bölümlerin elektronik kaynak tabanının oluşturulmasına başlandı",
    excerptUz: "Barcha 6 kafedra o'z o'quv-uslubiy materiallarini Smart UniLibrary platformasiga yuklash jarayonini boshladi.",
    excerptRu: "Все 6 кафедр начали загрузку своих учебно-методических материалов на платформу Smart UniLibrary.",
    excerptEn: "All 6 departments began uploading their educational materials to the Smart UniLibrary platform.",
    excerptTr: "6 bölümün tamamı eğitim materyallerini Smart UniLibrary platformuna yüklemeye başladı.",
    featured: false,
    icon: <Award size={13} />,
  },
  {
    id: 3,
    catUz: "Xizmat", catRu: "Сервис", catEn: "Service", catTr: "Hizmet",
    catColor: "bg-green-100 text-green-700",
    date: "2026-06-05",
    titleUz: "Elektron katalog va kitob band qilish xizmati joriy qilindi",
    titleRu: "Введены электронный каталог и служба бронирования книг",
    titleEn: "Electronic catalog and book reservation service introduced",
    titleTr: "Elektronik katalog ve kitap rezervasyon hizmeti devreye alındı",
    excerptUz: "Kutubxona fondidagi 8 420+ kitobni onlayn band qilish va qaytarish muddatini kuzatish imkoniyati yaratildi.",
    excerptRu: "Создана возможность онлайн-бронирования и отслеживания сроков возврата 8420+ книг библиотечного фонда.",
    excerptEn: "Online reservation and return deadline tracking for 8,420+ library books has been enabled.",
    excerptTr: "Kütüphane fonundaki 8.420+ kitabın çevrimiçi rezervasyonu ve iade takibi mümkün hale getirildi.",
    featured: false,
    icon: <BookOpen size={13} />,
  },
  {
    id: 4,
    catUz: "Xizmat", catRu: "Сервис", catEn: "Service", catTr: "Hizmet",
    catColor: "bg-green-100 text-green-700",
    date: "2026-06-01",
    titleUz: "O'quv zali joylarini onlayn bron qilish imkoniyati yaratildi",
    titleRu: "Создана возможность онлайн-бронирования мест в читальном зале",
    titleEn: "Online booking of reading room seats has been introduced",
    titleTr: "Okuma salonu yer rezervasyonu çevrimiçi olarak mümkün hale getirildi",
    excerptUz: "Uch o'quv zalida jami 85 ta joy uchun onlayn bron qilish, QR check-in va joy xaritasi xizmati ishga tushirildi.",
    excerptRu: "Запущена онлайн-бронь, QR-check-in и карта мест для 85 мест в трёх читальных залах.",
    excerptEn: "Online booking, QR check-in and seat map launched for 85 seats across three reading rooms.",
    excerptTr: "Üç okuma salonundaki 85 koltuk için çevrimiçi rezervasyon, QR check-in ve koltuk haritası başlatıldı.",
    featured: false,
    icon: <Calendar size={13} />,
  },
  {
    id: 5,
    catUz: "Texnologiya", catRu: "Технология", catEn: "Technology", catTr: "Teknoloji",
    catColor: "bg-purple-100 text-purple-700",
    date: "2026-05-28",
    titleUz: "AI kutubxonachi moduli sinovdan o'tkazilmoqda",
    titleRu: "Модуль библиотекаря ИИ проходит тестирование",
    titleEn: "AI librarian module is being tested",
    titleTr: "AI kütüphaneci modülü test edilmektedir",
    excerptUz: "Sun'iy intellekt asosidagi qidiruv tizimi kafedra materiallari, fanlar va kurs bo'yicha resurslarni aniqlab beradi.",
    excerptRu: "Система поиска на основе ИИ находит ресурсы по материалам кафедр, дисциплинам и курсам.",
    excerptEn: "AI-based search system identifies resources by department materials, subjects and courses.",
    excerptTr: "Yapay zeka tabanlı arama sistemi bölüm materyalleri, dersler ve kurslara göre kaynakları belirler.",
    featured: false,
    icon: <Bell size={13} />,
  },
];

function formatDate(dateStr: string, locale: Locale) {
  const d = new Date(dateStr);
  if (locale === "ru") return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
  if (locale === "en") return d.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });
  if (locale === "tr") return d.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
  const months = ["Yanvar","Fevral","Mart","Aprel","May","Iyun","Iyul","Avgust","Sentabr","Oktabr","Noyabr","Dekabr"];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

const T = {
  uz: { section_tag: "Yangiliklar va e'lonlar", title: "Yangiliklar", all: "Barcha yangiliklar", more: "Batafsil" },
  ru: { section_tag: "Новости и объявления", title: "Новости", all: "Все новости", more: "Подробнее" },
  en: { section_tag: "News & Announcements", title: "News", all: "All news", more: "Read more" },
  tr: { section_tag: "Haberler ve Duyurular", title: "Haberler", all: "Tüm haberler", more: "Devamı" },
};

export default function AnnouncementsSection() {
  const locale = useLocale() as Locale;
  const L = T[locale] || T.uz;

  const getTitle = (n: typeof NEWS[0]) => {
    if (locale === "ru") return n.titleRu;
    if (locale === "en") return n.titleEn;
    if (locale === "tr") return n.titleTr;
    return n.titleUz;
  };

  const getExcerpt = (n: typeof NEWS[0]) => {
    if (locale === "ru") return n.excerptRu;
    if (locale === "en") return n.excerptEn;
    if (locale === "tr") return n.excerptTr;
    return n.excerptUz;
  };

  const getCat = (n: typeof NEWS[0]) => {
    if (locale === "ru") return n.catRu;
    if (locale === "en") return n.catEn;
    if (locale === "tr") return n.catTr;
    return n.catUz;
  };

  const featured = NEWS[0];
  const rest = NEWS.slice(1);

  return (
    <section className="py-14 bg-[#F5F7FA]">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="section-tag mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1457A8]" />
              {L.section_tag}
            </div>
            <h2 className="text-[#061B3A] text-2xl lg:text-3xl font-bold">{L.title}</h2>
            <div className="section-divider mt-2" />
          </div>
          <Link href="/news" className="hidden sm:flex items-center gap-1.5 text-[#1457A8] text-sm font-semibold">
            {L.all} <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid lg:grid-cols-5 gap-5">
          {/* Featured */}
          <div className="lg:col-span-2 portal-card p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${featured.catColor}`}>
                {featured.icon} {getCat(featured)}
              </span>
              <span className="flex items-center gap-1 text-gray-400 text-[11px]">
                <Calendar size={11} />{formatDate(featured.date, locale)}
              </span>
            </div>
            <h3 className="text-[#172033] font-bold text-base leading-snug mb-3 flex-1">
              {getTitle(featured)}
            </h3>
            <p className="text-gray-500 text-[13px] leading-relaxed mb-5">
              {getExcerpt(featured)}
            </p>
            <Link href="/news/1" className="flex items-center gap-1.5 text-[#1457A8] text-sm font-semibold">
              {L.more} <ArrowRight size={13} />
            </Link>
          </div>

          {/* List */}
          <div className="lg:col-span-3 space-y-3">
            {rest.map((n) => (
              <div key={n.id} className="portal-card p-4 flex gap-4 group cursor-pointer hover:border-[#1457A8]/30">
                <div className="flex-shrink-0 flex flex-col items-center justify-center w-12 pt-0.5">
                  <div className="text-[#1457A8] font-black text-lg leading-none">{new Date(n.date).getDate()}</div>
                  <div className="text-gray-400 text-[10px] font-medium">
                    {formatDate(n.date, locale).split(" ")[1]?.substring(0, 3)}
                  </div>
                </div>
                <div className="w-px bg-gray-100 self-stretch flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${n.catColor}`}>
                      {n.icon} {getCat(n)}
                    </span>
                  </div>
                  <h3 className="text-[#172033] font-semibold text-[13px] leading-snug group-hover:text-[#1457A8] transition-colors line-clamp-2">
                    {getTitle(n)}
                  </h3>
                </div>
                <ChevronRight size={14} className="flex-shrink-0 text-gray-300 group-hover:text-[#1457A8] mt-1 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
