"use client";
import { useLocale } from "next-intl";
import { useEffect, useRef, useState } from "react";

type Locale = "uz" | "ru" | "en" | "tr";
const t = (obj: Record<string, string>, locale: Locale) => obj[locale] || obj.uz;

function AnimNum({ target, dur = 1800 }: { target: number; dur?: number }) {
  const [cur, setCur] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const s = Date.now();
        const tick = () => {
          const p = Math.min((Date.now() - s) / dur, 1);
          setCur(Math.round((1 - Math.pow(1 - p, 3)) * target));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, dur]);
  return <span ref={ref}>{cur.toLocaleString()}</span>;
}

const STATS = [
  { val: 2318, suffix: "+", label: { uz: "Talabalar", ru: "Студентов", en: "Students", tr: "Öğrenci" },
    icon: <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg> },
  { val: 126, suffix: "+", label: { uz: "O'qituvchilar", ru: "Преподавателей", en: "Faculty", tr: "Öğretim" },
    icon: <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 10-16 0"/></svg> },
  { val: 48, suffix: "", label: { uz: "Fanlar", ru: "Дисциплин", en: "Subjects", tr: "Dersler" },
    icon: <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg> },
  { val: 6, suffix: "", label: { uz: "Kafedralar", ru: "Кафедр", en: "Departments", tr: "Bölümler" },
    icon: <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg> },
  { val: 1247, suffix: "+", label: { uz: "Elektron resurslar", ru: "Эл. ресурсов", en: "E-Resources", tr: "E-Kaynak" },
    icon: <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg> },
  { val: 8420, suffix: "+", label: { uz: "Kutubxona fondi", ru: "Книжный фонд", en: "Library Fund", tr: "Kitap Fonu" },
    icon: <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg> },
];

const DESC = {
  uz: "Axborot texnologiyalari va menejment universiteti raqamli texnologiyalar, boshqaruv, iqtisodiyot, pedagogika va zamonaviy ta'lim metodlarini uyg'unlashtirgan holda malakali kadrlar tayyorlashga yo'naltirilgan oliy ta'lim muassasasidir.",
  ru: "Университет информационных технологий и менеджмента — высшее учебное заведение, ориентированное на подготовку квалифицированных кадров посредством интеграции цифровых технологий, управления, экономики, педагогики и современных методов обучения.",
  en: "The University of Information Technology and Management is a higher education institution aimed at training qualified specialists by integrating digital technologies, management, economics, pedagogy and modern teaching methods.",
  tr: "Bilgi Teknolojileri ve Yönetim Üniversitesi; dijital teknolojiler, yönetim, ekonomi, pedagoji ve modern öğretim yöntemlerini entegre ederek nitelikli uzmanlar yetiştirmeye yönelik bir yükseköğretim kurumudur.",
};

export default function UniversityAbout() {
  const locale = useLocale() as Locale;

  return (
    <section className="section-dark" style={{ padding: "80px 0" }}>
      <div className="max-w-[1680px] mx-auto px-5 sm:px-8">
        {/* Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-px bg-[#e8a820]" />
            <span className="text-[#e8a820] text-[11px] font-bold uppercase tracking-widest">
              {locale === "uz" ? "Biz haqimizda" : locale === "ru" ? "О нас" : locale === "tr" ? "Hakkımızda" : "About Us"}
            </span>
            <span className="w-8 h-px bg-[#e8a820]" />
          </div>
          <h2 style={{ color: "#fff", fontFamily: "'Georgia',serif", fontSize: "clamp(24px,3vw,40px)", fontWeight: 800, marginBottom: "20px" }}>
            {locale === "uz" ? "ATMU haqida" : locale === "ru" ? "Об АТМУ" : locale === "tr" ? "ATMU Hakkında" : "About ATMU"}
          </h2>
          <p style={{ color: "rgba(255,255,255,.6)", maxWidth: "780px", margin: "0 auto", lineHeight: 1.75, fontSize: "clamp(13px,1.1vw,16px)" }}>
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
              <div className="text-[#e8a820]/70 mb-3">{s.icon}</div>
              <div className="text-white font-black mb-1.5" style={{ fontSize: "clamp(24px,2.5vw,36px)", lineHeight: 1 }}>
                <AnimNum target={s.val} />{s.suffix}
              </div>
              <div className="text-white/45 text-[11px] font-medium uppercase tracking-wide leading-tight">{t(s.label, locale)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
