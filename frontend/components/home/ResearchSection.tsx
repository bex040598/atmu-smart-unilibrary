"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

type Locale = "uz" | "ru" | "en" | "tr";

const T: Record<Locale, Record<string, string>> = {
  uz: {
    tag: "Ilmiy faoliyat",
    title: "Tadqiqotlar",
    text: "ATMU ilmiy markazlari va kafedralari axborot texnologiyalari, ta'lim metodologiyasi, iqtisodiyot va ijtimoiy fanlar sohasida fundamental va amaliy tadqiqotlar olib boradi. Tadqiqot natijalari xalqaro ilmiy jurnallarda, konferensiyalarda va dissertatsiyalar shaklida chop etiladi.",
    btn: "Ilmiy markazlar",
    s1_label: "Ilmiy markazlar",
    s2_label: "Kutubxona fondi",
    s3_label: "Elektron resurslar",
    s4_label: "Maqolalar",
    s5_label: "Dissertatsiyalar",
  },
  ru: {
    tag: "Научная деятельность",
    title: "Исследования",
    text: "Научные центры и кафедры АТМУ проводят фундаментальные и прикладные исследования в области информационных технологий, методологии образования, экономики и социальных наук. Результаты исследований публикуются в международных научных журналах, конференциях и в форме диссертаций.",
    btn: "Научные центры",
    s1_label: "Научных центров",
    s2_label: "Фонд библиотеки",
    s3_label: "Эл. ресурсов",
    s4_label: "Статей",
    s5_label: "Диссертаций",
  },
  en: {
    tag: "Scientific Activity",
    title: "Research",
    text: "ATMU scientific centers and departments conduct fundamental and applied research in information technologies, educational methodology, economics and social sciences. Research results are published in international scientific journals, conferences and as dissertations.",
    btn: "Scientific Centers",
    s1_label: "Scientific Centers",
    s2_label: "Library Fund",
    s3_label: "E-Resources",
    s4_label: "Articles",
    s5_label: "Dissertations",
  },
  tr: {
    tag: "Bilimsel Faaliyet",
    title: "Araştırmalar",
    text: "ATMU bilim merkezleri ve bölümleri, bilgi teknolojileri, eğitim metodolojisi, ekonomi ve sosyal bilimler alanında temel ve uygulamalı araştırmalar yürütmektedir. Araştırma sonuçları uluslararası bilimsel dergilerde, konferanslarda ve tez olarak yayımlanmaktadır.",
    btn: "Bilim Merkezleri",
    s1_label: "Bilim Merkezi",
    s2_label: "Kütüphane Fonu",
    s3_label: "E-Kaynak",
    s4_label: "Makale",
    s5_label: "Tez",
  },
};

const STATS = [
  { key: "s1_label", value: "3" },
  { key: "s2_label", value: "8 420" },
  { key: "s3_label", value: "1 247" },
  { key: "s4_label", value: "326" },
  { key: "s5_label", value: "42" },
];

export default function ResearchSection() {
  const locale = useLocale() as Locale;
  const L = T[locale] || T.uz;

  return (
    <section style={{ background: "linear-gradient(135deg, #030C18 0%, #061B3A 40%, #0B3D73 100%)" }} className="py-14">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-yellow-300/70 text-[11px] font-bold uppercase tracking-widest mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse-slow" />
              {L.tag}
            </div>
            <h2 className="text-white text-3xl lg:text-4xl font-bold mb-5 leading-tight">
              {L.title}
            </h2>
            <div className="w-10 h-0.5 bg-yellow-400/50 mb-6 rounded-full" />
            <p className="text-white/60 text-[15px] leading-7 mb-7">
              {L.text}
            </p>
            <Link
              href="/science/centers"
              className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-[#061B3A] font-bold px-6 py-3 rounded-xl text-sm transition-colors"
            >
              {L.btn} <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {STATS.map((s, i) => (
              <div
                key={i}
                className={`rounded-2xl p-5 border border-white/10 text-center hover:border-yellow-400/30 transition-all ${i === 4 ? "col-span-2 sm:col-span-1" : ""}`}
                style={{ background: "rgba(255,255,255,0.05)" }}
              >
                <div className="text-white font-bold text-3xl stat-counter mb-1">{s.value}</div>
                <div className="text-white/50 text-[11px]">{L[s.key]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
