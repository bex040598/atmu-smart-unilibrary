"use client";
import { useLocale } from "next-intl";

type Locale = "uz" | "ru" | "en" | "tr";
const t = (obj: Record<string, string>, locale: Locale) => obj[locale] || obj.uz;

const CARDS = [
  { bg: "#003a6e", title: { uz: "Ilmiy tadqiqotlar", ru: "Научные исследования", en: "Research", tr: "Araştırma" }, desc: { uz: "Talabalar ilmiy markazlar va laboratoriyalarda amaliy tajriba oladi", ru: "Студенты получают практический опыт в научных центрах и лабораториях", en: "Students gain hands-on experience in research centers and labs", tr: "Öğrenciler araştırma merkezlerinde pratik deneyim kazanır" } },
  { bg: "#0d3d2a", title: { uz: "Sport va madaniyat", ru: "Спорт и культура", en: "Sport & Culture", tr: "Spor & Kültür" }, desc: { uz: "Sport musobaqalari, madaniy tadbirlar va talabalar hayoti", ru: "Спортивные соревнования, культурные мероприятия и студенческая жизнь", en: "Sports competitions, cultural events and student life", tr: "Spor yarışmaları, kültürel etkinlikler ve öğrenci hayatı" } },
  { bg: "#002b4e", title: { uz: "Smart UniLibrary", ru: "Smart UniLibrary", en: "Smart UniLibrary", tr: "Smart UniLibrary" }, desc: { uz: "Elektron katalog, AI qidiruv va o'quv zali bron qilish xizmatlari", ru: "Электронный каталог, ИИ-поиск и бронирование мест в читальном зале", en: "E-catalog, AI search and reading room seat booking services", tr: "E-katalog, AI arama ve okuma salonu rezervasyonu hizmetleri" } },
];

export default function StudentLife() {
  const locale = useLocale() as Locale;
  const titleLabel = locale === "uz" ? "Talabaning hayoti" : locale === "ru" ? "Жизнь студента" : locale === "tr" ? "Öğrenci Hayatı" : "Student Life";
  const quote = locale === "uz"
    ? "Elektron kutubxona va AI qidiruv xizmatlari darsliklar, laboratoriya ishlari va ilmiy manbalarni tez topishimga yordam beradi. Bu tizim mening o'quv jarayonimni tubdan o'zgartirdi."
    : locale === "ru"
    ? "Электронная библиотека и ИИ-поиск помогают мне быстро находить учебники, лабораторные работы и научные источники. Эта система кардинально изменила мой учебный процесс."
    : locale === "tr"
    ? "Elektronik kütüphane ve AI arama hizmetleri ders kitapları, laboratuvar çalışmaları ve bilimsel kaynakları hızla bulmama yardımcı olur."
    : "The electronic library and AI search help me quickly find textbooks, lab manuals and research sources. This system fundamentally changed my learning process.";
  const author = locale === "uz" ? "Aziz Karimov" : locale === "ru" ? "Азиз Каримов" : "Aziz Karimov";
  const role = locale === "uz" ? "ATMU, 3-kurs talabasi · Axborot texnologiyalari" : locale === "ru" ? "АТМУ, 3-й курс · Информационные технологии" : locale === "tr" ? "ATMU, 3. Sınıf · Bilgi Teknolojileri" : "ATMU, 3rd Year · Information Technologies";

  return (
    <section className="py-14 bg-white">
      <div className="max-w-[1680px] mx-auto px-5 sm:px-8">
        <div className="mb-8">
          <div className="section-tag mb-2"><span className="w-1.5 h-1.5 rounded-full bg-[#00579f]" />{locale === "uz" ? "Campus hayoti" : locale === "ru" ? "Жизнь кампуса" : "Campus Life"}</div>
          <h2 className="section-blue-title">{titleLabel}</h2>
          <div className="section-divider mt-2" />
        </div>

        {/* Mosaic grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Left: 2 stacked */}
          <div className="flex flex-col gap-4">
            {CARDS.slice(0, 2).map((card, i) => (
              <div
                key={i}
                className="news-card flex-1 relative overflow-hidden"
                style={{ background: card.bg, minHeight: 180 }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-10 bg-white" style={{ transform: "translate(30%,-30%)" }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(0,0,0,.6) 0%,transparent 60%)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="text-white font-bold text-[14px] mb-1">{t(card.title, locale)}</div>
                  <div className="text-white/60 text-[12px] line-clamp-2">{t(card.desc, locale)}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Center: large */}
          <div
            className="news-card relative overflow-hidden"
            style={{ background: CARDS[2].bg, minHeight: 380 }}
          >
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10 bg-white" style={{ transform: "translate(30%,-30%)" }} />
            <div className="absolute bottom-0 left-0 w-28 h-28 rounded-full opacity-10 bg-white" style={{ transform: "translate(-30%,30%)" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(0,0,0,.7) 0%,rgba(0,0,0,.1) 60%,transparent 100%)" }} />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="text-white font-bold text-lg mb-2">{t(CARDS[2].title, locale)}</div>
              <div className="text-white/65 text-[13px] leading-relaxed">{t(CARDS[2].desc, locale)}</div>
            </div>
          </div>

          {/* Right: testimonial */}
          <div
            className="rounded-2xl overflow-hidden relative flex flex-col justify-end p-6"
            style={{ background: "linear-gradient(135deg,#001d3d 0%,#003a6e 100%)", minHeight: 380 }}
          >
            <div className="absolute top-0 left-0 right-0 bottom-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 30% 30%, white 1px, transparent 1px), radial-gradient(circle at 70% 70%, white 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

            {/* Big quote mark */}
            <div className="absolute top-5 left-5 text-white/10 font-black" style={{ fontSize: 80, lineHeight: 1, fontFamily: "Georgia,serif" }}>"</div>

            <div className="relative z-10">
              <p className="text-white/85 text-[14px] leading-relaxed italic mb-6">
                "{quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-white text-sm flex-shrink-0" style={{ background: "#e8a820" }}>
                  {author.charAt(0)}
                </div>
                <div>
                  <div className="text-white font-bold text-[13px]">{author}</div>
                  <div className="text-white/50 text-[11px]">{role}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
