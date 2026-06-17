"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, BookOpen, Building, BookMarked, MapPin, Bot } from "lucide-react";

type Locale = "uz" | "ru" | "en" | "tr";

const T: Record<Locale, Record<string, string>> = {
  uz: {
    tag: "Elektron kutubxona",
    title: "ATMU Smart UniLibrary",
    subtitle: "Elektron katalog, kafedralar kutubxonasi, kitob band qilish, o'quv zali bron qilish va AI kutubxonachi xizmatlari yagona platformada. Platforma ATMU kafedralarida yaratilgan o'quv-uslubiy materiallar, elektron darsliklar, laboratoriya ishlari, ilmiy maqolalar va kutubxona fondidagi bosma kitoblar bilan ishlash jarayonini yagona raqamli muhitda boshqarish uchun ishlab chiqilgan.",
    enter: "Kutubxonaga kirish",
    s1_title: "Elektron katalog",
    s1_desc: "1 247+ elektron resurs, darslik, maqola va laboratoriya ishlaridan iborat to'liq qidiruv bazasi.",
    s2_title: "Kafedralar kutubxonasi",
    s2_desc: "Har bir kafedra uchun alohida resurs bo'limi: o'quv dasturlari, uslubiy materiallar va fan materiallari.",
    s3_title: "Kitob band qilish",
    s3_desc: "Kutubxona fondidagi 8 420+ kitob va nashrlarni oldindan band qilish va muddatni kuzatish.",
    s4_title: "O'quv zali bron qilish",
    s4_desc: "Onlayn joy tanlash, QR check-in va o'quv zallarida band joylar xaritasi.",
    s5_title: "AI kutubxonachi",
    s5_desc: "Tabiiy savol yozing — AI kerakli resurslarni kafedra, fan va format bo'yicha topib beradi.",
  },
  ru: {
    tag: "Электронная библиотека",
    title: "ATMU Smart UniLibrary",
    subtitle: "Электронный каталог, библиотеки кафедр, бронирование книг, бронирование мест в читальном зале и услуги библиотекаря ИИ на единой платформе.",
    enter: "Войти в библиотеку",
    s1_title: "Электронный каталог",
    s1_desc: "Полная база поиска из 1 247+ электронных ресурсов, учебников, статей и лабораторных работ.",
    s2_title: "Библиотеки кафедр",
    s2_desc: "Отдельный раздел ресурсов для каждой кафедры: учебные программы, методические материалы и предметные материалы.",
    s3_title: "Бронирование книги",
    s3_desc: "Предварительное бронирование и отслеживание сроков 8 420+ книг и изданий фонда библиотеки.",
    s4_title: "Бронирование читального зала",
    s4_desc: "Онлайн-выбор мест, QR-check-in и карта занятых мест в читальных залах.",
    s5_title: "AI библиотекарь",
    s5_desc: "Напишите вопрос естественным языком — ИИ найдёт нужные ресурсы по кафедре, предмету и формату.",
  },
  en: {
    tag: "E-Library",
    title: "ATMU Smart UniLibrary",
    subtitle: "E-catalog, department libraries, book reservation, reading room booking and AI librarian services all on a single platform.",
    enter: "Enter Library",
    s1_title: "E-Catalog",
    s1_desc: "Complete search base of 1,247+ electronic resources, textbooks, articles and laboratory works.",
    s2_title: "Department Libraries",
    s2_desc: "Separate resource section for each department: curricula, methodical materials and subject materials.",
    s3_title: "Book Reservation",
    s3_desc: "Pre-booking and deadline tracking for 8,420+ books and publications in the library fund.",
    s4_title: "Reading Room Booking",
    s4_desc: "Online seat selection, QR check-in and map of booked seats in reading rooms.",
    s5_title: "AI Librarian",
    s5_desc: "Write a natural question — AI finds the needed resources by department, subject and format.",
  },
  tr: {
    tag: "E-Kütüphane",
    title: "ATMU Smart UniLibrary",
    subtitle: "Elektronik katalog, bölüm kütüphaneleri, kitap rezervasyonu, okuma salonu rezervasyonu ve AI kütüphaneci hizmetleri tek bir platformda.",
    enter: "Kütüphaneye Gir",
    s1_title: "E-Katalog",
    s1_desc: "1.247+ elektronik kaynak, ders kitabı, makale ve laboratuvar çalışmasından oluşan tam arama tabanı.",
    s2_title: "Bölüm Kütüphaneleri",
    s2_desc: "Her bölüm için ayrı kaynak bölümü: müfredatlar, metodolojik materyaller ve konu materyalleri.",
    s3_title: "Kitap Rezervasyonu",
    s3_desc: "Kütüphane fonundaki 8.420+ kitap ve yayın için ön rezervasyon ve son tarih takibi.",
    s4_title: "Okuma Salonu Rezervasyonu",
    s4_desc: "Çevrimiçi koltuk seçimi, QR check-in ve okuma salonlarındaki dolu koltukların haritası.",
    s5_title: "AI Kütüphaneci",
    s5_desc: "Doğal bir soru yazın — AI, bölüm, konu ve formata göre ihtiyaç duyulan kaynakları bulur.",
  },
};

const SERVICES = [
  { key: "s1", icon: <BookOpen size={22} />, href: "/catalog", color: "#1457A8" },
  { key: "s2", icon: <Building size={22} />, href: "/departments", color: "#0E9F6E" },
  { key: "s3", icon: <BookMarked size={22} />, href: "/catalog", color: "#D6A84F" },
  { key: "s4", icon: <MapPin size={22} />, href: "/library/reading-room", color: "#EF4444" },
  { key: "s5", icon: <Bot size={22} />, href: "/ai", color: "#7C3AED" },
];

export default function SmartLibrarySection() {
  const locale = useLocale() as Locale;
  const L = T[locale] || T.uz;

  return (
    <section className="py-14 bg-white">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="rounded-3xl overflow-hidden"
          style={{ background: "linear-gradient(135deg, #061B3A 0%, #0B3D73 50%, #1058A0 100%)" }}>
          <div className="p-8 lg:p-12">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
              <div>
                <div className="inline-flex items-center gap-2 text-yellow-300/70 text-[11px] font-bold uppercase tracking-widest mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                  {L.tag}
                </div>
                <h2 className="text-white text-2xl lg:text-4xl font-bold mb-3">{L.title}</h2>
                <div className="w-10 h-0.5 bg-yellow-400/50 mb-4 rounded-full" />
                <p className="text-white/60 text-[14px] leading-7 max-w-2xl">
                  {L.subtitle}
                </p>
              </div>
              <Link
                href="/catalog"
                className="flex-shrink-0 flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-[#061B3A] font-bold px-6 py-3 rounded-xl text-sm transition-colors"
              >
                {L.enter} <ArrowRight size={14} />
              </Link>
            </div>

            {/* Service cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {SERVICES.map((s) => (
                <Link
                  key={s.key}
                  href={s.href as "/catalog" | "/departments" | "/library/reading-room" | "/ai"}
                  className="group rounded-2xl p-5 border border-white/10 hover:border-yellow-400/40 transition-all hover:bg-white/5 cursor-pointer"
                  style={{ background: "rgba(255,255,255,0.04)" }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all group-hover:scale-110"
                    style={{ background: s.color + "25" }}
                  >
                    <span style={{ color: s.color }}>{s.icon}</span>
                  </div>
                  <h3 className="text-white font-bold text-[13px] mb-2 group-hover:text-yellow-300 transition-colors">
                    {L[s.key + "_title"]}
                  </h3>
                  <p className="text-white/50 text-[11px] leading-relaxed">
                    {L[s.key + "_desc"]}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-yellow-300/70 text-[11px] font-semibold group-hover:gap-2 transition-all">
                    {locale === "uz" ? "Kirish" : locale === "ru" ? "Перейти" : locale === "tr" ? "Gir" : "Enter"}
                    <ArrowRight size={10} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
