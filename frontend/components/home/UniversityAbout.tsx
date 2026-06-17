"use client";
import { useLocale } from "next-intl";
import { useEffect, useRef, useState } from "react";

type Locale = "uz" | "ru" | "en" | "tr";
const t = (obj: Record<string, string>, locale: Locale) => obj[locale] || obj.uz;

function AnimNum({ target, dur = 1600 }: { target: number; dur?: number }) {
  const [cur, setCur] = useState(target); // show real value immediately
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    setCur(0); // reset then animate
    const timer = setTimeout(() => {
      const s = Date.now();
      const tick = () => {
        const p = Math.min((Date.now() - s) / dur, 1);
        setCur(Math.round((1 - Math.pow(1 - p, 3)) * target));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, 200);
    return () => clearTimeout(timer);
  }, [target, dur]);
  return <span ref={ref}>{cur.toLocaleString()}</span>;
}

const STATS = [
  {
    val: 10000, suffix: "+",
    label: { uz: "Talabalar", ru: "Студентов", en: "Students", tr: "Öğrenci" },
    icon: <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
  },
  {
    val: 126, suffix: "+",
    label: { uz: "Professor-o'qituvchilar", ru: "Преподавателей", en: "Faculty", tr: "Öğretim Üyesi" },
    icon: <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 10-16 0"/></svg>,
  },
  {
    val: 20, suffix: "+",
    label: { uz: "Bakalavr yo'nalishlari", ru: "Напр. бакалавриата", en: "Bachelor Directions", tr: "Lisans Yönelimi" },
    icon: <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
  },
  {
    val: 6, suffix: "",
    label: { uz: "Magistratura mutaxassisliklari", ru: "Магистратура", en: "Master Specializations", tr: "Yüksek Lisans" },
    icon: <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 2l10 5v6a10 10 0 01-20 0V7z"/></svg>,
  },
  {
    val: 6, suffix: "",
    label: { uz: "Kafedralar", ru: "Кафедр", en: "Departments", tr: "Bölümler" },
    icon: <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  },
  {
    val: 8420, suffix: "+",
    label: { uz: "Kutubxona fondi", ru: "Книжный фонд", en: "Library Fund", tr: "Kütüphane Fonu" },
    icon: <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>,
  },
];

const DESC = {
  uz: "Axborot texnologiyalari va menejment universiteti raqamli texnologiyalar, boshqaruv, iqtisodiyot, pedagogika va zamonaviy ta'lim metodlarini uyg'unlashtirgan holda malakali kadrlar tayyorlashga yo'naltirilgan oliy ta'lim muassasasidir. Universitetda o'quv jarayoni, ilmiy faoliyat va elektron resurslardan foydalanish bosqichma-bosqich raqamli platformalar orqali boshqariladi.",
  ru: "Университет информационных технологий и менеджмента — высшее учебное заведение, ориентированное на подготовку квалифицированных специалистов путём интеграции цифровых технологий, управления, экономики, педагогики и современных методов обучения. Учебный процесс, научная деятельность и использование электронных ресурсов поэтапно управляются через цифровые платформы.",
  en: "The University of Information Technology and Management is a higher education institution aimed at training qualified specialists by integrating digital technologies, management, economics, pedagogy and modern teaching methods. Academic processes, research activities and use of e-resources are managed step-by-step through digital platforms.",
  tr: "Bilgi Teknolojileri ve Yönetim Üniversitesi; dijital teknolojiler, yönetim, ekonomi, pedagoji ve modern öğretim yöntemlerini entegre ederek nitelikli uzmanlar yetiştirmeye yönelik bir yükseköğretim kurumudur. Öğretim süreci, bilimsel faaliyetler ve e-kaynaklardan yararlanma dijital platformlar aracılığıyla yönetilmektedir.",
};

export default function UniversityAbout() {
  const locale = useLocale() as Locale;

  return (
    <section style={{ background: "#003D66", padding: "90px 0" }}>
      <div className="max-w-[1680px] mx-auto px-5 sm:px-8">
        {/* Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-px bg-[#F5B400]" />
            <span className="text-[#F5B400] text-[11px] font-bold uppercase tracking-widest">
              {locale === "uz" ? "Biz haqimizda" : locale === "ru" ? "О нас" : locale === "tr" ? "Hakkımızda" : "About Us"}
            </span>
            <span className="w-8 h-px bg-[#F5B400]" />
          </div>
          <h2 style={{ color: "#fff", fontFamily: "'Georgia',serif", fontSize: "clamp(24px,3vw,42px)", fontWeight: 800, marginBottom: "20px" }}>
            {locale === "uz" ? "ATMU haqida" : locale === "ru" ? "Об АТМУ" : locale === "tr" ? "ATMU Hakkında" : "About ATMU"}
          </h2>
          <p style={{ color: "rgba(255,255,255,.6)", maxWidth: "800px", margin: "0 auto", lineHeight: 1.8, fontSize: "clamp(13px,1.1vw,16px)" }}>
            {DESC[locale] || DESC.uz}
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-0 border border-white/10 rounded-2xl overflow-hidden">
          {STATS.map((s, i) => (
            <div
              key={i}
              className={`flex flex-col items-center text-center px-4 py-8 ${i < STATS.length - 1 ? "border-r border-white/08" : ""}`}
              style={{ background: i % 2 === 0 ? "rgba(255,255,255,.03)" : "transparent" }}
            >
              <div className="text-[#F5B400]/65 mb-3">{s.icon}</div>
              <div className="text-white font-black mb-1.5 stat-counter" style={{ fontSize: "clamp(22px,2.2vw,34px)", lineHeight: 1 }}>
                <AnimNum target={s.val} />{s.suffix}
              </div>
              <div className="text-white/42 text-[10px] font-medium uppercase tracking-wide leading-tight">{t(s.label, locale)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
