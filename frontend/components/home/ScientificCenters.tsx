"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

type Locale = "uz" | "ru" | "en" | "tr";

const T: Record<Locale, Record<string, string>> = {
  uz: {
    tag: "Markazlar",
    title: "Ilmiy markazlar",
    more: "Batafsil",
    all: "Barcha markazlar",
  },
  ru: {
    tag: "Центры",
    title: "Научные центры",
    more: "Подробнее",
    all: "Все центры",
  },
  en: {
    tag: "Centers",
    title: "Scientific Centers",
    more: "Details",
    all: "All centers",
  },
  tr: {
    tag: "Merkezler",
    title: "Bilim Merkezleri",
    more: "Detaylar",
    all: "Tüm merkezler",
  },
};

const CENTERS = [
  {
    id: 1,
    icon: "💻",
    color: "#1457A8",
    titleUz: "Raqamli ta'lim texnologiyalari markazi",
    titleRu: "Центр цифровых образовательных технологий",
    titleEn: "Center of Digital Educational Technologies",
    titleTr: "Dijital Eğitim Teknolojileri Merkezi",
    descUz: "Raqamli ta'lim platformalari, onlayn o'quv resurslari va zamonaviy pedagogika texnologiyalarini tadqiq etish va joriy etish bo'yicha faoliyat yuritadi.",
    descRu: "Занимается исследованием и внедрением цифровых образовательных платформ, онлайн-учебных ресурсов и современных педагогических технологий.",
    descEn: "Engaged in researching and implementing digital educational platforms, online learning resources and modern pedagogical technologies.",
    descTr: "Dijital eğitim platformları, çevrimiçi öğrenme kaynakları ve modern pedagojik teknolojilerin araştırılması ve uygulanmasıyla ilgilenmektedir.",
    bg: "linear-gradient(135deg, #061B3A, #1457A8)",
  },
  {
    id: 2,
    icon: "🤖",
    color: "#7C3AED",
    titleUz: "Sun'iy intellekt va ma'lumotlar tahlili laboratoriyasi",
    titleRu: "Лаборатория ИИ и анализа данных",
    titleEn: "AI and Data Analysis Laboratory",
    titleTr: "YZ ve Veri Analizi Laboratuvarı",
    descUz: "Mashinaviy o'rganish, ma'lumotlar tahlili, neyron tarmoqlar va amaliy sun'iy intellekt yechimlari ustida ilmiy tadqiqotlar olib boradi.",
    descRu: "Проводит научные исследования в области машинного обучения, анализа данных, нейронных сетей и прикладных решений ИИ.",
    descEn: "Conducts scientific research in machine learning, data analysis, neural networks and applied AI solutions.",
    descTr: "Makine öğrenimi, veri analizi, sinir ağları ve uygulamalı YZ çözümleri alanında bilimsel araştırmalar yürütür.",
    bg: "linear-gradient(135deg, #1A0B2E, #7C3AED)",
  },
  {
    id: 3,
    icon: "📚",
    color: "#0E9F6E",
    titleUz: "Elektron kutubxona va akademik resurslar markazi",
    titleRu: "Центр электронной библиотеки и академических ресурсов",
    titleEn: "Center of E-Library and Academic Resources",
    titleTr: "E-Kütüphane ve Akademik Kaynaklar Merkezi",
    descUz: "Elektron kutubxona fondini shakllantirish, akademik resurslarni kataloglashtirish, bibliografik xizmatlar va ilmiy axborot ta'minoti bilan shug'ullanadi.",
    descRu: "Занимается формированием фонда электронной библиотеки, каталогизацией академических ресурсов, библиографическими услугами и научным информационным обеспечением.",
    descEn: "Engaged in forming the electronic library fund, cataloging academic resources, bibliographic services and scientific information support.",
    descTr: "Elektronik kütüphane fonunun oluşturulması, akademik kaynakların kataloglanması, bibliyografik hizmetler ve bilimsel bilgi desteğiyle ilgilenmektedir.",
    bg: "linear-gradient(135deg, #0A2A1A, #0E9F6E)",
  },
];

export default function ScientificCenters() {
  const locale = useLocale() as Locale;
  const L = T[locale] || T.uz;

  const getTitle = (c: typeof CENTERS[0]) => {
    if (locale === "ru") return c.titleRu;
    if (locale === "en") return c.titleEn;
    if (locale === "tr") return c.titleTr;
    return c.titleUz;
  };

  const getDesc = (c: typeof CENTERS[0]) => {
    if (locale === "ru") return c.descRu;
    if (locale === "en") return c.descEn;
    if (locale === "tr") return c.descTr;
    return c.descUz;
  };

  return (
    <section style={{ background: "linear-gradient(135deg, #061B3A 0%, #0B3D73 60%, #1058A0 100%)" }} className="py-14">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-yellow-300/70 text-[11px] font-bold uppercase tracking-widest mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
              {L.tag}
            </div>
            <h2 className="text-white text-2xl lg:text-3xl font-bold">{L.title}</h2>
            <div className="w-10 h-0.5 bg-yellow-400/50 mt-3 rounded-full" />
          </div>
          <Link href="/science/centers" className="hidden sm:flex items-center gap-1.5 text-yellow-300 text-sm font-semibold hover:gap-2.5 transition-all">
            {L.all} <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {CENTERS.map((c) => (
            <div key={c.id} className="rounded-2xl overflow-hidden group cursor-pointer">
              {/* Image area */}
              <div className="h-44 relative" style={{ background: c.bg }}>
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 right-4 w-32 h-32 rounded-full border border-white" />
                  <div className="absolute bottom-4 left-4 w-20 h-20 rounded-full border border-white/50" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl opacity-30">{c.icon}</span>
                </div>
                <div className="absolute bottom-4 left-4 text-5xl">{c.icon}</div>
              </div>
              {/* Content */}
              <div
                className="p-5 border border-white/10 rounded-b-2xl"
                style={{ background: "rgba(255,255,255,0.06)" }}
              >
                <h3 className="text-white font-bold text-[14px] leading-snug mb-3 group-hover:text-yellow-300 transition-colors">
                  {getTitle(c)}
                </h3>
                <p className="text-white/55 text-[12px] leading-relaxed mb-4">
                  {getDesc(c)}
                </p>
                <span className="inline-flex items-center gap-1.5 text-yellow-300 text-[12px] font-semibold hover:gap-2.5 transition-all">
                  {L.more} <ArrowRight size={12} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
