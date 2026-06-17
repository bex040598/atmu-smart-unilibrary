"use client";
import { useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";

type Locale = "uz" | "ru" | "en" | "tr";
const t = (obj: Record<string, string>, locale: Locale) => obj[locale] || obj.uz;

const CENTERS = [
  {
    bg: "#003a6e",
    accentBg: "#00579f",
    num: "01",
    title: { uz: "Raqamli ta'lim texnologiyalari markazi", ru: "Центр цифровых образовательных технологий", en: "Center of Digital Educational Technologies", tr: "Dijital Eğitim Teknolojileri Merkezi" },
    desc: { uz: "E-learning, LMS tizimlar va raqamli o'quv materiallar yaratish metodologiyasi ustida ilmiy tadqiqotlar olib boradi", ru: "Проводит научные исследования в области e-learning, LMS-систем и методологии создания цифровых учебных материалов", en: "Conducts research on e-learning, LMS systems and digital learning material creation methodology", tr: "E-öğrenme, LMS sistemleri ve dijital öğrenme materyali oluşturma metodolojisi üzerine araştırmalar yürütür" },
  },
  {
    bg: "#1a2a4e",
    accentBg: "#8855cc",
    num: "02",
    title: { uz: "Sun'iy intellekt va ma'lumotlar tahlili laboratoriyasi", ru: "Лаборатория искусственного интеллекта и анализа данных", en: "AI and Data Analytics Laboratory", tr: "Yapay Zeka ve Veri Analitiği Laboratuvarı" },
    desc: { uz: "Machine learning, NLP va big data texnologiyalari asosida ta'lim sohasida AI yechimlarini ishlab chiqadi", ru: "Разрабатывает AI-решения в образовании на основе machine learning, NLP и big data технологий", en: "Develops AI solutions in education based on machine learning, NLP and big data technologies", tr: "Makine öğrenimi, NLP ve büyük veri teknolojilerine dayalı eğitimde AI çözümleri geliştirir" },
  },
  {
    bg: "#0d3d2a",
    accentBg: "#00a050",
    num: "03",
    title: { uz: "Elektron kutubxona va akademik resurslar markazi", ru: "Центр электронной библиотеки и академических ресурсов", en: "E-Library and Academic Resources Center", tr: "E-Kütüphane ve Akademik Kaynaklar Merkezi" },
    desc: { uz: "Kutubxona fondini raqamlashtirish, elektron resurslarni kataloglash va bibliometrik tahlillar sohasida faoliyat yuritadi", ru: "Занимается оцифровкой библиотечного фонда, каталогизацией электронных ресурсов и библиометрическим анализом", en: "Works on library fund digitization, e-resource cataloging and bibliometric analyses", tr: "Kütüphane fonu sayısallaştırma, e-kaynak kataloglama ve bibliyometrik analizler üzerinde çalışır" },
  },
];

export default function ScientificCenters() {
  const locale = useLocale() as Locale;
  const titleLabel = locale === "uz" ? "Ilmiy markazlar" : locale === "ru" ? "Научные центры" : locale === "tr" ? "Araştırma Merkezleri" : "Research Centers";
  const detailsLabel = locale === "uz" ? "Batafsil" : locale === "ru" ? "Подробнее" : locale === "tr" ? "Detaylar" : "Details";

  return (
    <section className="py-14" style={{ background: "#001a38" }}>
      <div className="max-w-[1680px] mx-auto px-5 sm:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-px bg-[#e8a820]" />
            <span className="text-[#e8a820] text-[11px] font-bold uppercase tracking-widest">{titleLabel}</span>
            <span className="w-8 h-px bg-[#e8a820]" />
          </div>
          <h2 style={{ color: "#fff", fontFamily: "'Georgia',serif", fontSize: "clamp(22px,2.5vw,36px)", fontWeight: 800 }}>{titleLabel}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CENTERS.map((c, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden border border-white/10 group cursor-pointer transition-all hover:-translate-y-1 hover:border-white/25"
              style={{ background: c.bg }}
            >
              {/* Top accent */}
              <div className="h-1.5" style={{ background: c.accentBg }} />

              <div className="p-6 sm:p-7">
                <div className="text-[#e8a820]/30 font-black text-5xl mb-5 leading-none">{c.num}</div>
                <h3 className="text-white font-bold leading-snug mb-4" style={{ fontSize: "clamp(14px,1.2vw,17px)" }}>
                  {t(c.title, locale)}
                </h3>
                <p className="text-white/50 text-[13px] leading-relaxed mb-5">
                  {t(c.desc, locale)}
                </p>
                <button className="flex items-center gap-1.5 text-[13px] font-semibold transition-all group-hover:gap-3" style={{ color: c.accentBg === "#00579f" ? "#60aaff" : c.accentBg === "#8855cc" ? "#bb99ff" : "#44cc88" }}>
                  {detailsLabel} <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
