"use client";

import { useLocale } from "next-intl";

type Locale = "uz" | "ru" | "en" | "tr";

const T: Record<Locale, Record<string, string>> = {
  uz: {
    tag: "Talaba hayoti",
    title: "Talabaning hayoti",
    subtitle: "Universitetda talabalar uchun ta'lim, ilmiy izlanish, ijodiy faoliyat va raqamli xizmatlardan foydalanish bo'yicha qulay muhit yaratilgan.",
    quote: "Elektron kutubxona va AI qidiruv xizmatlari darsliklar, laboratoriya ishlari va ilmiy manbalarni tez topishimga yordam beradi. Har bir kafedra uchun alohida resurslar mavjud bo'lgani juda qulay.",
    student_name: "Aziz Karimov",
    student_role: "ATMU, 3-kurs talabasi",
    card1: "Ilmiy tadqiqotlar",
    card2: "Raqamli ta'lim",
    card3: "Ijodiy faoliyat",
    card4: "Kutubxona xizmatlari",
  },
  ru: {
    tag: "Студенческая жизнь",
    title: "Жизнь студента",
    subtitle: "В университете создана комфортная среда для обучения, научных исследований, творческой деятельности и использования цифровых сервисов.",
    quote: "Электронная библиотека и сервис поиска ИИ помогают быстро находить учебники, лабораторные работы и научные источники. Очень удобно, что для каждой кафедры есть отдельные ресурсы.",
    student_name: "Азиз Каримов",
    student_role: "АТМУ, студент 3 курса",
    card1: "Научные исследования",
    card2: "Цифровое образование",
    card3: "Творческая деятельность",
    card4: "Библиотечные услуги",
  },
  en: {
    tag: "Student Life",
    title: "Student Life",
    subtitle: "The university provides a comfortable environment for education, scientific research, creative activities, and use of digital services.",
    quote: "The electronic library and AI search service help me quickly find textbooks, laboratory works and scientific sources. It is very convenient that there are separate resources for each department.",
    student_name: "Aziz Karimov",
    student_role: "ATMU, 3rd year student",
    card1: "Scientific Research",
    card2: "Digital Education",
    card3: "Creative Activities",
    card4: "Library Services",
  },
  tr: {
    tag: "Öğrenci Hayatı",
    title: "Öğrencinin Hayatı",
    subtitle: "Üniversite, eğitim, bilimsel araştırma, yaratıcı faaliyet ve dijital hizmetlerden yararlanmak için uygun bir ortam yaratmıştır.",
    quote: "Elektronik kütüphane ve AI arama hizmeti, ders kitaplarını, laboratuvar çalışmalarını ve bilimsel kaynakları hızlı bulmama yardımcı oluyor. Her bölüm için ayrı kaynakların olması çok elverişli.",
    student_name: "Aziz Karimov",
    student_role: "ATMU, 3. sınıf öğrencisi",
    card1: "Bilimsel Araştırma",
    card2: "Dijital Eğitim",
    card3: "Yaratıcı Faaliyet",
    card4: "Kütüphane Hizmetleri",
  },
};

const CARDS = [
  { key: "card1", bg: "linear-gradient(135deg, #061B3A, #1457A8)", icon: "🔬" },
  { key: "card2", bg: "linear-gradient(135deg, #0B3D73, #008C95)", icon: "💻" },
  { key: "card3", bg: "linear-gradient(135deg, #2D1B69, #7C3AED)", icon: "🎨" },
  { key: "card4", bg: "linear-gradient(135deg, #1A0A00, #D6A84F)", icon: "📚" },
];

export default function StudentLife() {
  const locale = useLocale() as Locale;
  const L = T[locale] || T.uz;

  return (
    <section className="py-14 bg-white">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="mb-8">
          <div className="section-tag mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1457A8]" />
            {L.tag}
          </div>
          <h2 className="text-[#061B3A] text-2xl lg:text-3xl font-bold">{L.title}</h2>
          <div className="section-divider mt-2" />
          <p className="text-gray-500 text-sm mt-3 max-w-2xl">{L.subtitle}</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
          {/* 2 small left */}
          <div className="flex flex-col gap-4">
            {CARDS.slice(0, 2).map((c) => (
              <div
                key={c.key}
                className="flex-1 rounded-2xl overflow-hidden relative p-5 flex flex-col justify-end"
                style={{ background: c.bg, minHeight: "140px" }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-10 border border-white" style={{ transform: "translate(30%,-30%)" }} />
                <div className="text-3xl mb-2">{c.icon}</div>
                <div className="text-white font-semibold text-[13px]">{L[c.key]}</div>
              </div>
            ))}
          </div>

          {/* Center big */}
          <div className="col-span-2 rounded-2xl overflow-hidden relative"
            style={{ background: "linear-gradient(160deg, #061B3A 0%, #0B3D73 50%, #1457A8 100%)", minHeight: "300px" }}>
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-8 left-8 w-40 h-40 rounded-full border border-white" />
              <div className="absolute bottom-8 right-8 w-60 h-60 rounded-full border border-white" />
            </div>
            <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
              <div className="w-20 h-20 rounded-full mb-4 flex items-center justify-center text-4xl border-2 border-yellow-400/30"
                style={{ background: "rgba(214,168,79,0.1)" }}>
                🎓
              </div>
              <div className="text-yellow-400 font-bold text-base mb-1">ATMU</div>
              <div className="text-white/60 text-xs mb-4">Smart University</div>
              <div className="grid grid-cols-3 gap-4 w-full">
                {[
                  { v: "2 318", l: locale === "uz" ? "Talabalar" : locale === "ru" ? "Студентов" : locale === "tr" ? "Öğrenci" : "Students" },
                  { v: "126", l: locale === "uz" ? "Ustoz" : locale === "ru" ? "Педагогов" : locale === "tr" ? "Öğretmen" : "Faculty" },
                  { v: "48", l: locale === "uz" ? "Yo'nalish" : locale === "ru" ? "Направлений" : locale === "tr" ? "Program" : "Programs" },
                ].map((s) => (
                  <div key={s.l} className="text-center">
                    <div className="text-white font-bold text-xl">{s.v}+</div>
                    <div className="text-white/50 text-[10px]">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — testimonial */}
          <div className="rounded-2xl border border-gray-100 p-5 flex flex-col"
            style={{ background: "linear-gradient(160deg, #F8FAFF, #EFF6FF)" }}>
            <div className="flex-1">
              <div className="text-[#1457A8] text-3xl font-serif mb-3 leading-none">"</div>
              <p className="text-gray-700 text-[12.5px] leading-relaxed italic">
                {L.quote}
              </p>
            </div>
            <div className="flex items-center gap-3 mt-5 pt-4 border-t border-gray-100">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1457A8] to-[#008C95] flex items-center justify-center text-white font-bold text-sm">
                {L.student_name[0]}
              </div>
              <div>
                <div className="text-[#172033] font-bold text-[13px]">{L.student_name}</div>
                <div className="text-gray-500 text-[11px]">{L.student_role}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
