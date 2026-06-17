"use client";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Calendar } from "lucide-react";

type Locale = "uz" | "ru" | "en" | "tr";
const t = (obj: Record<string, string>, locale: Locale) => obj[locale] || obj.uz;

const NEWS = [
  {
    id: 1, cat: { uz: "Yangilik", ru: "Новость", en: "News", tr: "Haber" }, catColor: "#0069A8",
    date: { uz: "15 Iyun 2026", ru: "15 Июня 2026", en: "June 15, 2026", tr: "15 Haziran 2026" },
    title: { uz: "ATMUda yangi o'quv yili uchun raqamli xizmatlar yangilandi", ru: "В АТМУ обновлены цифровые сервисы для нового учебного года", en: "ATMU digital services updated for the new academic year", tr: "ATMU'da yeni akademik yıl için dijital hizmetler güncellendi" },
    bg: "#002B4A", featured: true,
  },
  {
    id: 2, cat: { uz: "E-Lib", ru: "E-Lib", en: "E-Lib", tr: "E-Kütüphane" }, catColor: "#F5B400",
    date: { uz: "10 Iyun 2026", ru: "10 Июня 2026", en: "June 10, 2026", tr: "10 Haziran 2026" },
    title: { uz: "Smart UniLibrary elektron kutubxona bo'limi test rejimida ishga tushirildi", ru: "Раздел электронной библиотеки Smart UniLibrary запущен в тестовом режиме", en: "Smart UniLibrary e-library section launched in testing mode", tr: "Smart UniLibrary e-kütüphane bölümü test modunda başlatıldı" },
    bg: "#003D66", featured: false,
  },
  {
    id: 3, cat: { uz: "Ta'lim", ru: "Образование", en: "Education", tr: "Eğitim" }, catColor: "#00A3E0",
    date: { uz: "5 Iyun 2026", ru: "5 Июня 2026", en: "June 5, 2026", tr: "5 Haziran 2026" },
    title: { uz: "Kafedralar o'quv-uslubiy resurslarini raqamlashtirish ishlari boshlandi", ru: "Начата оцифровка учебно-методических ресурсов кафедр", en: "Digitization of department educational resources has begun", tr: "Bölümlerin eğitim materyallerinin dijitalleştirilmesi başladı" },
    bg: "#004A6E", featured: false,
  },
  {
    id: 4, cat: { uz: "Seminar", ru: "Семинар", en: "Seminar", tr: "Seminer" }, catColor: "#00A050",
    date: { uz: "1 Iyun 2026", ru: "1 Июня 2026", en: "June 1, 2026", tr: "1 Haziran 2026" },
    title: { uz: "Talabalar uchun elektron katalogdan foydalanish bo'yicha seminar tashkil etildi", ru: "Для студентов организован семинар по использованию электронного каталога", en: "A seminar on using the e-catalog was organized for students", tr: "Öğrenciler için e-katalog kullanımı semineri düzenlendi" },
    bg: "#1A3A5E", featured: false,
  },
  {
    id: 5, cat: { uz: "Xodim", ru: "Персонал", en: "Staff", tr: "Personel" }, catColor: "#8855CC",
    date: { uz: "26 May 2026", ru: "26 Мая 2026", en: "May 26, 2026", tr: "26 Mayıs 2026" },
    title: { uz: "O'qituvchilar uchun resurs yuklash va tasdiqlash moduli sinovdan o'tkazilmoqda", ru: "Для преподавателей тестируется модуль загрузки и утверждения ресурсов", en: "Module for uploading and approving resources is being tested for teachers", tr: "Öğretmenler için kaynak yükleme ve onaylama modülü test edilmektedir" },
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
