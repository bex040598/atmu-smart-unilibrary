"use client";
import { useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { BookOpen, GraduationCap, ChevronRight, ArrowRight } from "lucide-react";

type Locale = "uz" | "ru" | "en" | "tr";
const t = (obj: Record<string, string>, locale: Locale) => obj[locale] || obj.uz;

const FACULTIES = [
  {
    id: 1,
    name: { uz: "Raqamli texnologiyalar fakulteti", ru: "Факультет цифровых технологий", en: "Faculty of Digital Technologies", tr: "Dijital Teknolojiler Fakültesi" },
    depts: [
      { slug: "axborot-texnologiyalari", name: { uz: "Axborot texnologiyalari kafedrasi", ru: "Кафедра информационных технологий", en: "Dept. of Information Technologies", tr: "Bilgi Teknolojileri Bölümü" }, resources: 487, subjects: 18, desc: { uz: "Dasturlash, ma'lumotlar bazasi, tarmoqlar va kiberxavfsizlik bo'yicha ta'lim", ru: "Образование в области программирования, баз данных, сетей и кибербезопасности", en: "Education in programming, databases, networks and cybersecurity", tr: "Programlama, veritabanları, ağlar ve siber güvenlik eğitimi" }, color: "#00579f" },
      { slug: "iqtisodiyot", name: { uz: "Iqtisodiyot kafedrasi", ru: "Кафедра экономики", en: "Dept. of Economics", tr: "Ekonomi Bölümü" }, resources: 312, subjects: 14, desc: { uz: "Milliy va xalqaro iqtisodiyot, moliya va bozor munosabatlari", ru: "Национальная и международная экономика, финансы и рыночные отношения", en: "National and international economics, finance and market relations", tr: "Ulusal ve uluslararası ekonomi, finans ve piyasa ilişkileri" }, color: "#007788" },
      { slug: "matematika", name: { uz: "Matematika kafedrasi", ru: "Кафедра математики", en: "Dept. of Mathematics", tr: "Matematik Bölümü" }, resources: 198, subjects: 10, desc: { uz: "Oliy matematika, algebra, geometriya va matematik tahlil", ru: "Высшая математика, алгебра, геометрия и математический анализ", en: "Higher mathematics, algebra, geometry and mathematical analysis", tr: "Yüksek matematik, cebir, geometri ve matematiksel analiz" }, color: "#8855cc" },
    ],
  },
  {
    id: 2,
    name: { uz: "Ijtimoiy fanlar fakulteti", ru: "Факультет социальных наук", en: "Faculty of Social Sciences", tr: "Sosyal Bilimler Fakültesi" },
    depts: [
      { slug: "filologiya", name: { uz: "Filologiya kafedrasi", ru: "Кафедра филологии", en: "Dept. of Philology", tr: "Filoloji Bölümü" }, resources: 156, subjects: 8, desc: { uz: "O'zbek va xorijiy tillar, adabiyot va tilshunoslik", ru: "Узбекский и иностранные языки, литература и языкознание", en: "Uzbek and foreign languages, literature and linguistics", tr: "Özbek ve yabancı diller, edebiyat ve dilbilim" }, color: "#cc6600" },
      { slug: "tarix", name: { uz: "Tarix kafedrasi", ru: "Кафедра истории", en: "Dept. of History", tr: "Tarih Bölümü" }, resources: 124, subjects: 8, desc: { uz: "O'zbekiston tarixi, jahon tarixi va tarixiy tadqiqotlar", ru: "История Узбекистана, всемирная история и исторические исследования", en: "History of Uzbekistan, world history and historical research", tr: "Özbekistan tarihi, dünya tarihi ve tarihsel araştırmalar" }, color: "#996622" },
      { slug: "pedagogika", name: { uz: "Pedagogika kafedrasi", ru: "Кафедра педагогики", en: "Dept. of Pedagogy", tr: "Pedagoji Bölümü" }, resources: 178, subjects: 10, desc: { uz: "Ta'lim metodikasi, psixologiya va raqamli pedagogika", ru: "Методика образования, психология и цифровая педагогика", en: "Educational methodology, psychology and digital pedagogy", tr: "Eğitim metodolojisi, psikoloji ve dijital pedagoji" }, color: "#cc2255" },
    ],
  },
];

export default function FacultyDepartments() {
  const locale = useLocale() as Locale;
  const [activeFaculty, setActiveFaculty] = useState(0);
  const [activeDepit, setActiveDept] = useState(0);

  const faculty = FACULTIES[activeFaculty];
  const dept = faculty.depts[activeDepit];

  const titleLabel = locale === "uz" ? "Fakultet va kafedralar" : locale === "ru" ? "Факультеты и кафедры" : locale === "tr" ? "Fakülteler ve Bölümler" : "Faculties & Departments";
  const resourcesLabel = locale === "uz" ? "resurs" : locale === "ru" ? "ресурсов" : locale === "tr" ? "kaynak" : "resources";
  const subjectsLabel = locale === "uz" ? "fan" : locale === "ru" ? "дисциплин" : locale === "tr" ? "ders" : "subjects";
  const enterLabel = locale === "uz" ? "Elektron kutubxonaga kirish" : locale === "ru" ? "Войти в эл. библиотеку" : locale === "tr" ? "E-kütüphaneye gir" : "Enter E-Library";

  return (
    <section className="py-14" style={{ background: "#f4f6f9" }}>
      <div className="max-w-[1680px] mx-auto px-5 sm:px-8">
        <div className="mb-8">
          <div className="section-tag mb-2"><span className="w-1.5 h-1.5 rounded-full bg-[#00579f]" />{locale === "uz" ? "Ta'lim" : locale === "ru" ? "Образование" : "Education"}</div>
          <h2 className="section-blue-title">{titleLabel}</h2>
          <div className="section-divider mt-2" />
        </div>

        {/* Faculty pills */}
        <div className="flex flex-wrap gap-3 mb-6">
          {FACULTIES.map((fac, fi) => (
            <button
              key={fi}
              onClick={() => { setActiveFaculty(fi); setActiveDept(0); }}
              className={`pill-tab ${activeFaculty === fi ? "active" : "inactive"}`}
            >
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center ${activeFaculty === fi ? "bg-white/25" : "bg-[#00579f]/10"}`}
              >
                <GraduationCap size={14} className={activeFaculty === fi ? "text-white" : "text-[#00579f]"} />
              </span>
              {t(fac.name, locale)}
            </button>
          ))}
        </div>

        {/* Panel */}
        <div className="rounded-2xl overflow-hidden border border-[#c8d8ec]" style={{ background: "#e8f0f8" }}>
          <div className="grid lg:grid-cols-3 gap-0">
            {/* Dept list */}
            <div className="lg:col-span-1 border-r border-[#c8d8ec] p-4">
              <div className="text-[11px] font-bold text-[#5a6a7e] uppercase tracking-widest mb-3 px-2">
                {locale === "uz" ? "Kafedralar" : locale === "ru" ? "Кафедры" : "Departments"}
              </div>
              <div className="space-y-1">
                {faculty.depts.map((dep, di) => (
                  <button
                    key={di}
                    onClick={() => setActiveDept(di)}
                    className={`w-full text-left px-3 py-3 rounded-xl flex items-center justify-between transition-all ${activeDepit === di ? "bg-white shadow-sm border border-[#c8d8ec]" : "hover:bg-white/60"}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: dep.color }} />
                      <span className={`text-[13px] font-semibold ${activeDepit === di ? "text-[#00579f]" : "text-[#3a4a5e]"}`}>
                        {t(dep.name, locale)}
                      </span>
                    </div>
                    <ChevronRight size={14} className={activeDepit === di ? "text-[#00579f]" : "text-gray-300"} />
                  </button>
                ))}
              </div>
            </div>

            {/* Dept detail */}
            <div className="lg:col-span-2 p-6 sm:p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: dept.color + "20" }}>
                  <BookOpen size={24} style={{ color: dept.color }} />
                </div>
                <div>
                  <h3 className="text-[#1a2332] font-bold text-lg mb-1">{t(dept.name, locale)}</h3>
                  <div className="flex items-center gap-3 text-[12px] text-[#5a6a7e]">
                    <span className="flex items-center gap-1 font-semibold" style={{ color: dept.color }}>
                      <BookOpen size={12} />{dept.resources} {resourcesLabel}
                    </span>
                    <span>·</span>
                    <span>{dept.subjects} {subjectsLabel}</span>
                  </div>
                </div>
              </div>

              <p className="text-[#5a6a7e] text-[14px] leading-relaxed mb-6">{t(dept.desc, locale)}</p>

              {/* Mini resource cards */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {["Darsliklar", "Lab ishlari", "Maqolalar"].map((type, ti) => (
                  <div key={ti} className="bg-white rounded-xl p-3 text-center border border-[#c8d8ec]">
                    <div className="text-[#00579f] font-black text-lg">{[Math.round(dept.resources * 0.45), Math.round(dept.resources * 0.3), Math.round(dept.resources * 0.25)][ti]}+</div>
                    <div className="text-[#5a6a7e] text-[10px] font-medium mt-0.5">
                      {locale === "uz" ? type : locale === "ru" ? ["Учебники", "Лаб. работы", "Статьи"][ti] : locale === "tr" ? ["Ders Kitapları", "Lab Çalışmaları", "Makaleler"][ti] : ["Textbooks", "Lab Works", "Articles"][ti]}
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href={`/departments/${dept.slug}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00579f] text-white rounded-xl font-semibold text-[13px] hover:bg-[#006dbb] transition-colors"
              >
                {enterLabel} <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
