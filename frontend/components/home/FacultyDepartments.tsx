"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, BookOpen, Library, Cpu, Globe, Calculator, Award, GraduationCap } from "lucide-react";

type Locale = "uz" | "ru" | "en" | "tr";

const T: Record<Locale, Record<string, string>> = {
  uz: {
    tag: "Kafedralar",
    title: "Fakultet va kafedralar",
    fac1: "Raqamli texnologiyalar fakulteti",
    fac2: "Ijtimoiy fanlar fakulteti",
    enter_lib: "Elektron kutubxonaga kirish",
    about: "Kafedra haqida",
    resources: "ta resurs",
    subjects: "ta fan",
    desc_it: "Axborot texnologiyalari, dasturlash, ma'lumotlar bazasi va raqamli tizimlar sohasida kadrlar tayyorlaydi.",
    desc_eco: "Bozor iqtisodiyoti, moliya, menejment va tadbirkorlik asoslarini o'rgatadi.",
    desc_math: "Matematika, statistika, ehtimollar nazariyasi va matematik modellashtirish fanlarini o'qitadi.",
    desc_phil: "O'zbek, rus, ingliz va boshqa tillar, adabiyot va lingvistika sohasida ta'lim beradi.",
    desc_hist: "O'zbekiston va jahon tarixi, siyosatshunoslik va ijtimoiy fanlar bo'yicha o'qitadi.",
    desc_ped: "Zamonaviy pedagogika metodlari, psixologiya va ta'lim texnologiyalari bo'yicha malaka oshiradi.",
    preview: "Elektron resurslar",
    preview_see: "Ko'rish",
  },
  ru: {
    tag: "Кафедры",
    title: "Факультеты и кафедры",
    fac1: "Факультет цифровых технологий",
    fac2: "Факультет социальных наук",
    enter_lib: "Электронная библиотека",
    about: "О кафедре",
    resources: "ресурсов",
    subjects: "дисциплин",
    desc_it: "Готовит специалистов в области ИТ, программирования, баз данных и цифровых систем.",
    desc_eco: "Обучает рыночной экономике, финансам, менеджменту и основам предпринимательства.",
    desc_math: "Преподаёт математику, статистику, теорию вероятностей и математическое моделирование.",
    desc_phil: "Обучение узбекскому, русскому, английскому языкам, литературе и лингвистике.",
    desc_hist: "История Узбекистана и мира, политология и социальные науки.",
    desc_ped: "Современные методы педагогики, психологии и образовательных технологий.",
    preview: "Электронные ресурсы",
    preview_see: "Смотреть",
  },
  en: {
    tag: "Departments",
    title: "Faculties and Departments",
    fac1: "Faculty of Digital Technologies",
    fac2: "Faculty of Social Sciences",
    enter_lib: "E-Library",
    about: "About Dept.",
    resources: "resources",
    subjects: "subjects",
    desc_it: "Trains specialists in IT, programming, databases and digital systems.",
    desc_eco: "Teaches market economics, finance, management and entrepreneurship basics.",
    desc_math: "Teaches mathematics, statistics, probability theory and mathematical modeling.",
    desc_phil: "Education in Uzbek, Russian, English languages, literature and linguistics.",
    desc_hist: "History of Uzbekistan and world, political science and social sciences.",
    desc_ped: "Modern pedagogy methods, psychology and educational technologies.",
    preview: "Electronic Resources",
    preview_see: "View",
  },
  tr: {
    tag: "Bölümler",
    title: "Fakülteler ve Bölümler",
    fac1: "Dijital Teknolojiler Fakültesi",
    fac2: "Sosyal Bilimler Fakültesi",
    enter_lib: "E-Kütüphane",
    about: "Bölüm Hakkında",
    resources: "kaynak",
    subjects: "ders",
    desc_it: "BT, programlama, veritabanı ve dijital sistemler alanında uzmanlar yetiştirir.",
    desc_eco: "Piyasa ekonomisi, finans, yönetim ve girişimcilik temellerini öğretir.",
    desc_math: "Matematik, istatistik, olasılık teorisi ve matematiksel modellemeyi öğretir.",
    desc_phil: "Özbek, Rus, İngilizce dilleri, edebiyat ve dilbilimi eğitimi.",
    desc_hist: "Özbekistan ve dünya tarihi, siyaset bilimi ve sosyal bilimler.",
    desc_ped: "Modern pedagoji yöntemleri, psikoloji ve eğitim teknolojileri.",
    preview: "Elektronik Kaynaklar",
    preview_see: "Görüntüle",
  },
};

const FACULTIES = [
  { id: 1, keyLabel: "fac1", deptIds: [1, 2, 3] },
  { id: 2, keyLabel: "fac2", deptIds: [4, 5, 6] },
];

const DEPTS = [
  {
    id: 1, slug: "axborot-texnologiyalari",
    icon: <Cpu size={20} />, color: "#1457A8",
    nameUz: "Axborot texnologiyalari", nameRu: "Информационные технологии", nameEn: "Information Technologies", nameTr: "Bilgi Teknolojileri",
    descKey: "desc_it",
    resources: 324, subjects: 18, facId: 1,
  },
  {
    id: 2, slug: "iqtisodiyot",
    icon: <Globe size={20} />, color: "#0E9F6E",
    nameUz: "Iqtisodiyot", nameRu: "Экономика", nameEn: "Economics", nameTr: "Ekonomi",
    descKey: "desc_eco",
    resources: 196, subjects: 14, facId: 1,
  },
  {
    id: 3, slug: "matematika",
    icon: <Calculator size={20} />, color: "#7C3AED",
    nameUz: "Matematika", nameRu: "Математика", nameEn: "Mathematics", nameTr: "Matematik",
    descKey: "desc_math",
    resources: 148, subjects: 10, facId: 1,
  },
  {
    id: 4, slug: "filologiya",
    icon: <BookOpen size={20} />, color: "#D6A84F",
    nameUz: "Filologiya", nameRu: "Филология", nameEn: "Philology", nameTr: "Filoloji",
    descKey: "desc_phil",
    resources: 184, subjects: 12, facId: 2,
  },
  {
    id: 5, slug: "tarix",
    icon: <Award size={20} />, color: "#EF4444",
    nameUz: "Tarix", nameRu: "История", nameEn: "History", nameTr: "Tarih",
    descKey: "desc_hist",
    resources: 162, subjects: 11, facId: 2,
  },
  {
    id: 6, slug: "pedagogika",
    icon: <GraduationCap size={20} />, color: "#0B3D73",
    nameUz: "Pedagogika", nameRu: "Педагогика", nameEn: "Pedagogy", nameTr: "Pedagoji",
    descKey: "desc_ped",
    resources: 233, subjects: 16, facId: 2,
  },
];

export default function FacultyDepartments() {
  const locale = useLocale() as Locale;
  const L = T[locale] || T.uz;
  const [activeFac, setActiveFac] = useState(1);
  const [hoveredDept, setHoveredDept] = useState<number | null>(null);

  const visibleDepts = DEPTS.filter((d) => d.facId === activeFac);
  const previewDept = hoveredDept ? DEPTS.find((d) => d.id === hoveredDept) : visibleDepts[0];

  const getName = (d: typeof DEPTS[0]) => {
    if (locale === "ru") return d.nameRu;
    if (locale === "en") return d.nameEn;
    if (locale === "tr") return d.nameTr;
    return d.nameUz;
  };

  const PREVIEW_RESOURCES = [
    { uz: "Ma'lumotlar bazasi asoslari", ru: "Основы баз данных", en: "Database Fundamentals", tr: "Veritabanı Temelleri", type: "PDF" },
    { uz: "Algoritm va ma'lumotlar tuzilmasi", ru: "Алгоритмы и структуры данных", en: "Algorithms & Data Structures", tr: "Algoritma ve Veri Yapıları", type: "E-book" },
    { uz: "Laboratoriya ishlari to'plami", ru: "Сборник лабораторных работ", en: "Laboratory Works Collection", tr: "Laboratuvar İşleri", type: "PDF" },
  ];

  const getPreviewTitle = (r: typeof PREVIEW_RESOURCES[0]) => {
    if (locale === "ru") return r.ru;
    if (locale === "en") return r.en;
    if (locale === "tr") return r.tr;
    return r.uz;
  };

  return (
    <section className="py-14 bg-[#F5F7FA]">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="mb-8">
          <div className="section-tag mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1457A8]" />
            {L.tag}
          </div>
          <h2 className="text-[#061B3A] text-2xl lg:text-3xl font-bold">{L.title}</h2>
          <div className="section-divider mt-2" />
        </div>

        {/* Faculty pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {FACULTIES.map((fac) => (
            <button
              key={fac.id}
              onClick={() => setActiveFac(fac.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                activeFac === fac.id
                  ? "bg-[#1457A8] text-white shadow-lg"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-[#1457A8] hover:text-[#1457A8]"
              }`}
            >
              {L[fac.keyLabel]}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {/* Dept cards */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleDepts.map((dept) => (
              <div
                key={dept.id}
                className="portal-card group cursor-pointer"
                onMouseEnter={() => setHoveredDept(dept.id)}
                onMouseLeave={() => setHoveredDept(null)}
              >
                {/* Image placeholder */}
                <div
                  className="h-28 relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${dept.color}20, ${dept.color}08)` }}
                >
                  <div
                    className="absolute top-3 left-3 w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: dept.color + "20" }}
                  >
                    <span style={{ color: dept.color }}>{dept.icon}</span>
                  </div>
                  <div className="absolute bottom-0 right-0 w-24 h-24 rounded-full opacity-10"
                    style={{ background: dept.color, transform: "translate(30%, 30%)" }} />
                </div>
                <div className="p-4">
                  <h3 className="text-[#172033] font-bold text-[13px] mb-1 group-hover:text-[#1457A8] transition-colors">
                    {getName(dept)}
                  </h3>
                  <p className="text-gray-500 text-[11px] leading-relaxed mb-3 line-clamp-2">
                    {L[dept.descKey]}
                  </p>
                  <div className="flex items-center gap-3 text-[11px] text-gray-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Library size={11} />
                      {dept.resources} {L.resources}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen size={11} />
                      {dept.subjects} {L.subjects}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/departments/${dept.slug}` as `/departments/${string}`}
                      className="flex-1 text-center text-[11px] font-semibold py-1.5 rounded-lg border border-[#1457A8] text-[#1457A8] hover:bg-[#1457A8] hover:text-white transition-colors"
                    >
                      {L.enter_lib}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Preview panel */}
          <div className="portal-card p-5">
            {previewDept && (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: previewDept.color + "20" }}
                  >
                    <span style={{ color: previewDept.color }}>{previewDept.icon}</span>
                  </div>
                  <div>
                    <div className="text-[11px] text-gray-400">{L.preview}</div>
                    <div className="text-[#172033] font-bold text-[13px]">{getName(previewDept)}</div>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  {PREVIEW_RESOURCES.map((r, i) => (
                    <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-gray-50 hover:bg-blue-50 cursor-pointer transition-colors">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-white"
                        style={{ background: previewDept.color }}
                      >
                        {r.type}
                      </div>
                      <span className="text-[12px] text-gray-700 line-clamp-1">{getPreviewTitle(r)}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href={`/departments/${previewDept.slug}` as `/departments/${string}`}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-[13px] font-semibold text-white transition-colors"
                  style={{ background: previewDept.color }}
                >
                  {L.preview_see} <ArrowRight size={13} />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
