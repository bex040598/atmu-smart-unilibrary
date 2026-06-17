"use client";
import { useLocale } from "next-intl";
import { useEffect, useRef, useState } from "react";

type Locale = "uz" | "ru" | "en" | "tr";
const t = (obj: Record<string, string>, locale: Locale) => obj[locale] || obj.uz;

function AnimNum({ target, dur = 1600 }: { target: number; dur?: number }) {
  const [cur, setCur] = useState(target);
  useEffect(() => {
    setCur(0);
    const timer = setTimeout(() => {
      const s = Date.now();
      const tick = () => {
        const p = Math.min((Date.now() - s) / dur, 1);
        setCur(Math.round((1 - Math.pow(1 - p, 3)) * target));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, 300);
    return () => clearTimeout(timer);
  }, [target, dur]);
  return <span>{cur.toLocaleString()}</span>;
}

const STATS = [
  {
    val: 3, suffix: "",
    label: { uz: "Ilmiy markazlar", ru: "Научных центров", en: "Research Centers", tr: "Araştırma Merkezi" },
    icon: <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/><path d="M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12"/></svg>,
  },
  {
    val: 8420, suffix: "+",
    label: { uz: "Kutubxona fondi", ru: "Книжный фонд", en: "Library Fund", tr: "Kütüphane Fonu" },
    icon: <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>,
  },
  {
    val: 1247, suffix: "+",
    label: { uz: "Elektron resurslar", ru: "Электронных ресурсов", en: "E-Resources", tr: "Elektronik Kaynak" },
    icon: <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
  },
  {
    val: 326, suffix: "+",
    label: { uz: "Ilmiy maqolalar", ru: "Научных статей", en: "Scientific Articles", tr: "Bilimsel Makale" },
    icon: <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>,
  },
  {
    val: 42, suffix: "+",
    label: { uz: "Dissertatsiyalar", ru: "Диссертаций", en: "Dissertations", tr: "Tez" },
    icon: <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
  },
];

export default function ResearchSection() {
  const locale = useLocale() as Locale;
  const titleLabel = locale === "uz" ? "Tadqiqotlar" : locale === "ru" ? "Исследования" : locale === "tr" ? "Araştırmalar" : "Research";
  const desc = locale === "uz"
    ? "ATMU olimlari va tadqiqotchilari zamonaviy raqamli texnologiyalar, sun'iy intellekt va elektron kutubxona sohasida faol ilmiy faoliyat olib boradi."
    : locale === "ru"
    ? "Учёные и исследователи АТМУ ведут активную научную деятельность в области современных цифровых технологий, искусственного интеллекта и электронных библиотек."
    : locale === "tr"
    ? "ATMU bilim insanları ve araştırmacıları modern dijital teknolojiler, yapay zeka ve elektronik kütüphane alanlarında aktif bilimsel faaliyetler yürütür."
    : "ATMU scientists and researchers conduct active scientific activities in modern digital technologies, artificial intelligence and electronic library fields.";

  return (
    <section className="section-dark py-16">
      <div className="max-w-[1680px] mx-auto px-5 sm:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-px bg-[#e8a820]" />
            <span className="text-[#e8a820] text-[11px] font-bold uppercase tracking-widest">{locale === "uz" ? "Ilmiy faoliyat" : locale === "ru" ? "Научная деятельность" : "Research Activity"}</span>
            <span className="w-8 h-px bg-[#e8a820]" />
          </div>
          <h2 style={{ color: "#fff", fontFamily: "'Georgia',serif", fontSize: "clamp(24px,3vw,40px)", fontWeight: 800, marginBottom: "16px" }}>{titleLabel}</h2>
          <p style={{ color: "rgba(255,255,255,.55)", maxWidth: "700px", margin: "0 auto", lineHeight: 1.75, fontSize: "clamp(13px,1.1vw,16px)" }}>{desc}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-0 border border-white/10 rounded-2xl overflow-hidden">
          {STATS.map((s, i) => (
            <div
              key={i}
              className={`flex flex-col items-center text-center px-4 py-10 ${i < STATS.length - 1 ? "border-r border-white/08" : ""}`}
              style={{ background: i % 2 === 0 ? "rgba(255,255,255,.03)" : "transparent" }}
            >
              <div className="text-[#e8a820]/60 mb-4">{s.icon}</div>
              <div className="text-white font-black mb-1.5" style={{ fontSize: "clamp(28px,3vw,44px)", lineHeight: 1 }}>
                <AnimNum target={s.val} />{s.suffix}
              </div>
              <div className="text-white/40 text-[11px] font-medium uppercase tracking-wide leading-tight">{t(s.label, locale)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
