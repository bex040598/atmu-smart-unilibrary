"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

type Locale = "uz" | "ru" | "en" | "tr";

const T: Record<Locale, { title: string; text: string; btn: string }> = {
  uz: {
    title: "ATMU haqida",
    text: "Axborot texnologiyalari va menejment universiteti raqamli texnologiyalar, boshqaruv, iqtisodiyot, pedagogika va zamonaviy ta'lim metodlarini uyg'unlashtirgan holda malakali kadrlar tayyorlashga yo'naltirilgan oliy ta'lim muassasasidir. Universitetda o'quv jarayoni, ilmiy faoliyat va elektron resurslardan foydalanish bosqichma-bosqich raqamli platformalar orqali boshqariladi. Smart UniLibrary platformasi kafedralarda yaratilgan o'quv-uslubiy materiallar, elektron darsliklar, laboratoriya ishlari va ilmiy maqolalar bilan ishlash jarayonini yagona muhitda tashkil etadi.",
    btn: "Batafsil o'qish",
  },
  ru: {
    title: "Об АТМУ",
    text: "Университет информационных технологий и менеджмента — высшее учебное заведение, ориентированное на подготовку квалифицированных кадров в области цифровых технологий, управления, экономики и современных методов образования. Учебный процесс, научная деятельность и использование электронных ресурсов поэтапно управляются через цифровые платформы. Платформа Smart UniLibrary организует работу с учебно-методическими материалами, электронными учебниками, лабораторными работами и научными статьями в единой среде.",
    btn: "Подробнее",
  },
  en: {
    title: "About ATMU",
    text: "The University of Information Technologies and Management is a higher education institution focused on training qualified professionals in the fields of digital technologies, management, economics and modern educational methods. The educational process, scientific activity and use of electronic resources are managed step by step through digital platforms. The Smart UniLibrary platform organizes work with educational materials, e-textbooks, laboratory works and scientific articles in a unified environment.",
    btn: "Learn more",
  },
  tr: {
    title: "ATMU Hakkında",
    text: "Bilgi Teknolojileri ve Yönetim Üniversitesi, dijital teknolojiler, yönetim, ekonomi ve modern eğitim yöntemleri alanında nitelikli uzmanlar yetiştirmeye odaklanmış bir yükseköğretim kurumudur. Eğitim süreci, bilimsel faaliyet ve elektronik kaynaklardan yararlanma dijital platformlar aracılığıyla yönetilmektedir.",
    btn: "Devamını oku",
  },
};

const STATS = [
  {
    icon: (
      <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none">
        <circle cx="16" cy="10" r="5" stroke="white" strokeWidth="1.8"/>
        <path d="M6 28c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    value: "2 318+",
    uz: "Talabalar", ru: "Студентов", en: "Students", tr: "Öğrenci",
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none">
        <rect x="6" y="8" width="20" height="16" rx="2" stroke="white" strokeWidth="1.8"/>
        <path d="M11 8V6M21 8V6" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M10 16h12M10 20h8" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    value: "126+",
    uz: "O'qituvchilar", ru: "Преподаватели", en: "Faculty", tr: "Öğretim Üyeleri",
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none">
        <path d="M8 6h16v20H8z" stroke="white" strokeWidth="1.8"/>
        <path d="M12 10h8M12 14h8M12 18h5" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    value: "48",
    uz: "Ta'lim yo'nalishlari", ru: "Направления", en: "Programs", tr: "Program",
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none">
        <path d="M16 4L28 10V22L16 28L4 22V10Z" stroke="white" strokeWidth="1.8"/>
        <path d="M16 4V28M4 10L28 22M28 10L4 22" stroke="white" strokeWidth="1.8" strokeOpacity="0.4"/>
      </svg>
    ),
    value: "6",
    uz: "Kafedralar", ru: "Кафедры", en: "Departments", tr: "Bölüm",
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none">
        <circle cx="16" cy="16" r="10" stroke="white" strokeWidth="1.8"/>
        <path d="M16 10v6l4 3" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    value: "1 247+",
    uz: "Elektron resurslar", ru: "Эл. ресурсов", en: "E-Resources", tr: "E-Kaynak",
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none">
        <path d="M6 8h20M6 14h20M6 20h14" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
        <rect x="4" y="4" width="24" height="24" rx="3" stroke="white" strokeWidth="1.8"/>
      </svg>
    ),
    value: "8 420+",
    uz: "Kutubxona fondi", ru: "Фонд библиотеки", en: "Library Fund", tr: "Kütüphane Fonu",
  },
];

export default function UniversityAbout() {
  const locale = useLocale() as Locale;
  const L = T[locale] || T.uz;

  const getLabel = (s: typeof STATS[0]) => {
    if (locale === "ru") return s.ru;
    if (locale === "en") return s.en;
    if (locale === "tr") return s.tr;
    return s.uz;
  };

  return (
    <section style={{ background: "linear-gradient(135deg, #061B3A 0%, #0B3D73 60%, #1058A0 100%)" }}>
      <div className="max-w-[1280px] mx-auto px-4 py-14">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-14">
          <div>
            <div className="text-yellow-400/70 text-[11px] font-bold uppercase tracking-widest mb-3">ATMU</div>
            <h2 className="text-white text-3xl lg:text-4xl font-bold mb-5 leading-tight">
              {L.title}
            </h2>
            <div className="w-12 h-0.5 bg-yellow-400/60 mb-6 rounded-full" />
            <p className="text-white/65 text-[15px] leading-7 mb-7">
              {L.text}
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 border border-yellow-400/50 text-yellow-300 hover:bg-yellow-400/10 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
            >
              {L.btn}
              <ArrowRight size={14} />
            </Link>
          </div>
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-[300px] h-[300px]">
              <div className="absolute inset-0 rounded-2xl border border-white/10" style={{ background: "rgba(255,255,255,0.04)" }} />
              <div className="absolute inset-6 rounded-xl border border-yellow-400/20" style={{ background: "rgba(214,168,79,0.04)" }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="w-40 h-40 opacity-25" fill="none">
                  <path d="M100 10L190 55V145L100 190L10 145V55Z" stroke="#D6A84F" strokeWidth="2"/>
                  <path d="M100 30L170 65V135L100 170L30 135V65Z" stroke="#1457A8" strokeWidth="1.5"/>
                  <path d="M100 50L150 75V125L100 150L50 125V75Z" stroke="#D6A84F" strokeWidth="1" strokeDasharray="4 4"/>
                  <circle cx="100" cy="100" r="15" stroke="#D6A84F" strokeWidth="1.5"/>
                  <text x="100" y="105" textAnchor="middle" fill="#D6A84F" fontSize="14" fontWeight="bold" fontFamily="Arial">AT</text>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {STATS.map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center p-5 rounded-xl border border-white/10 hover:border-yellow-400/30 transition-all"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              <div className="mb-3 opacity-80">{s.icon}</div>
              <div className="text-white font-bold text-2xl stat-counter mb-1">{s.value}</div>
              <div className="text-white/50 text-[11px] leading-tight">{getLabel(s)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
