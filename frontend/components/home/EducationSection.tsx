"use client";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, GraduationCap, BookOpen, Users } from "lucide-react";

type Locale = "uz" | "ru" | "en" | "tr";
const t = (obj: Record<string, string>, locale: Locale) => obj[locale] || obj.uz;

const PROGRAMS = [
  {
    type: { uz: "Bakalavriat", ru: "Бакалавриат", en: "Bachelor", tr: "Lisans" },
    count: "20+",
    icon: <GraduationCap size={22} />,
    color: "#0069A8",
    items: [
      { uz: "Dasturiy injiniring", ru: "Программная инженерия", en: "Software Engineering", tr: "Yazılım Mühendisliği" },
      { uz: "Axborot xavfsizligi", ru: "Информационная безопасность", en: "Information Security", tr: "Bilgi Güvenliği" },
      { uz: "Iqtisodiyot", ru: "Экономика", en: "Economics", tr: "Ekonomi" },
      { uz: "Menejment", ru: "Менеджмент", en: "Management", tr: "Yönetim" },
      { uz: "Matematika o'qitish", ru: "Преподавание математики", en: "Mathematics Teaching", tr: "Matematik Öğretmenliği" },
      { uz: "Filologiya", ru: "Филология", en: "Philology", tr: "Filoloji" },
    ],
  },
  {
    type: { uz: "Magistratura", ru: "Магистратура", en: "Master's", tr: "Yüksek Lisans" },
    count: "6",
    icon: <BookOpen size={22} />,
    color: "#003D66",
    items: [
      { uz: "Dasturiy injiniring (magistr)", ru: "Программная инженерия", en: "Software Engineering (Master)", tr: "Yazılım Mühendisliği" },
      { uz: "Raqamli iqtisodiyot", ru: "Цифровая экономика", en: "Digital Economy", tr: "Dijital Ekonomi" },
      { uz: "Ta'lim menejment", ru: "Менеджмент в образовании", en: "Education Management", tr: "Eğitim Yönetimi" },
      { uz: "Axborot texnologiyalari", ru: "Информационные технологии", en: "Information Technology", tr: "Bilgi Teknolojileri" },
      { uz: "Matematika ta'limi", ru: "Математическое образование", en: "Mathematics Education", tr: "Matematik Eğitimi" },
      { uz: "Tilshunoslik", ru: "Языкознание", en: "Linguistics", tr: "Dilbilim" },
    ],
  },
];

export default function EducationSection() {
  const locale = useLocale() as Locale;

  return (
    <section className="py-14" style={{ background: "#F4F7FB" }}>
      <div className="max-w-[1680px] mx-auto px-5 sm:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="section-tag mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0069A8]" />
              {locale === "uz" ? "Ta'lim" : locale === "ru" ? "Образование" : locale === "tr" ? "Eğitim" : "Education"}
            </div>
            <h2 className="section-blue-title">
              {locale === "uz" ? "Ta'lim dasturlari" : locale === "ru" ? "Образовательные программы" : locale === "tr" ? "Eğitim Programları" : "Education Programs"}
            </h2>
            <div className="section-divider mt-2" />
          </div>
          <Link href="/" className="hidden sm:flex items-center gap-1.5 text-[#0069A8] text-[13px] font-semibold hover:gap-2.5 transition-all">
            {locale === "uz" ? "Barcha yo'nalishlar" : locale === "ru" ? "Все направления" : locale === "tr" ? "Tüm yönelimler" : "All programs"} <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {PROGRAMS.map((prog, pi) => (
            <div key={pi} className="portal-card overflow-hidden">
              {/* Header */}
              <div className="flex items-center gap-4 p-5" style={{ background: prog.color }}>
                <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center text-white">
                  {prog.icon}
                </div>
                <div>
                  <div className="text-white font-black text-xl leading-none">{prog.count}</div>
                  <div className="text-white/70 text-[12px] font-semibold mt-0.5">{t(prog.type, locale)}</div>
                </div>
              </div>

              {/* Items */}
              <div className="p-4 grid grid-cols-2 gap-2">
                {prog.items.map((item, ii) => (
                  <div key={ii}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-gray-100 hover:border-[#0069A8]/30 hover:bg-blue-50 transition-all cursor-pointer group">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: prog.color }} />
                    <span className="text-[12px] font-medium text-gray-700 group-hover:text-[#0069A8] line-clamp-2 leading-snug">{t(item, locale)}</span>
                  </div>
                ))}
              </div>

              <div className="px-4 pb-4">
                <Link href="/"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-[13px] font-semibold transition-all border hover:shadow-md"
                  style={{ color: prog.color, borderColor: `${prog.color}40` }}>
                  {locale === "uz" ? "Batafsil" : locale === "ru" ? "Подробнее" : locale === "tr" ? "Detaylar" : "Details"}
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          {[
            { icon: <GraduationCap size={20} />, val: "10 000+", label: { uz: "Talabalar", ru: "Студентов", en: "Students", tr: "Öğrenci" } },
            { icon: <Users size={20} />, val: "126+", label: { uz: "O'qituvchilar", ru: "Преподавателей", en: "Faculty", tr: "Öğretim Üyesi" } },
            { icon: <BookOpen size={20} />, val: "20+", label: { uz: "Bakalavriat", ru: "Бакалавриат", en: "Bachelor", tr: "Lisans" } },
            { icon: <GraduationCap size={20} />, val: "6", label: { uz: "Magistratura", ru: "Магистратура", en: "Master", tr: "Yüksek Lisans" } },
          ].map((s, i) => (
            <div key={i} className="portal-card p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-[#0069A8] bg-blue-50">{s.icon}</div>
              <div>
                <div className="text-[#002B4A] font-black text-lg leading-none">{s.val}</div>
                <div className="text-gray-500 text-[11px] mt-0.5">{t(s.label, locale)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
