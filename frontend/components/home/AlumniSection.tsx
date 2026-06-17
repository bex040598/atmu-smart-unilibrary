"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Locale = "uz" | "ru" | "en" | "tr";

const T: Record<Locale, Record<string, string>> = {
  uz: {
    tag: "Bitiruvchilar",
    title: "Faxriy bitiruvchilar",
    subtitle: "Universitet bitiruvchilari ta'lim, boshqaruv, axborot texnologiyalari va tadbirkorlik sohalarida faoliyat yuritmoqda.",
  },
  ru: {
    tag: "Выпускники",
    title: "Почётные выпускники",
    subtitle: "Выпускники университета работают в сферах образования, управления, информационных технологий и предпринимательства.",
  },
  en: {
    tag: "Alumni",
    title: "Honorary Alumni",
    subtitle: "University alumni work in the fields of education, management, information technologies and entrepreneurship.",
  },
  tr: {
    tag: "Mezunlar",
    title: "Onursal Mezunlar",
    subtitle: "Üniversite mezunları eğitim, yönetim, bilgi teknolojileri ve girişimcilik alanlarında çalışmaktadır.",
  },
};

const ALUMNI = [
  {
    initials: "NK",
    nameUz: "Nodir Karimov", nameRu: "Нодир Каримов", nameEn: "Nodir Karimov", nameTr: "Nodir Karimov",
    roleUz: "IT direktori, yirik texnologiya kompaniyasi", roleRu: "ИТ-директор, крупная IT-компания", roleEn: "IT Director, major tech company", roleTr: "BT Direktörü, büyük teknoloji şirketi",
    quoteUz: "ATMU da olgan bilim va ko'nikmalar meni raqamli texnologiyalar sohasida professional sifatida shakllantirishda muhim rol o'ynadi.",
    quoteRu: "Знания и навыки, полученные в АТМУ, сыграли важную роль в моём профессиональном становлении в сфере цифровых технологий.",
    quoteEn: "The knowledge and skills gained at ATMU played an important role in shaping me as a professional in the field of digital technologies.",
    quoteTr: "ATMU'da edindiğim bilgi ve beceriler, dijital teknolojiler alanında profesyonel olarak şekillenmemde önemli bir rol oynadı.",
    color: "#1457A8",
    year: "2019",
  },
  {
    initials: "SM",
    nameUz: "Sarvinoz Mirzayeva", nameRu: "Сарвиноз Мирзаева", nameEn: "Sarvinoz Mirzayeva", nameTr: "Sarvinoz Mirzayeva",
    roleUz: "Ta'lim muassasasi direktori", roleRu: "Директор образовательного учреждения", roleEn: "Director of Educational Institution", roleTr: "Eğitim Kurumu Müdürü",
    quoteUz: "Universitetdagi pedagogika va boshqaruv bo'yicha ta'lim menga zamonaviy ta'lim muassasasini boshqarishda mustahkam poydevor yaratdi.",
    quoteRu: "Образование по педагогике и управлению в университете создало мне прочный фундамент для руководства современным образовательным учреждением.",
    quoteEn: "Education in pedagogy and management at the university created a solid foundation for me to manage a modern educational institution.",
    quoteTr: "Üniversitedeki pedagoji ve yönetim eğitimi, modern bir eğitim kurumunu yönetmem için sağlam bir temel oluşturdu.",
    color: "#0E9F6E",
    year: "2020",
  },
  {
    initials: "RT",
    nameUz: "Ravshan Toshmatov", nameRu: "Равшан Тошматов", nameEn: "Ravshan Toshmatov", nameTr: "Ravshan Toshmatov",
    roleUz: "Tadbirkor, raqamli startap asoschisi", roleRu: "Предприниматель, основатель цифрового стартапа", roleEn: "Entrepreneur, digital startup founder", roleTr: "Girişimci, dijital startup kurucusu",
    quoteUz: "Iqtisodiyot va menejment kafedrasi bergan bilimlar tadbirkorlik yo'lida o'zimga bo'lgan ishonchimni mustahkamladi va startapimni qurishga yordam berdi.",
    quoteRu: "Знания кафедры экономики и менеджмента укрепили мою уверенность в предпринимательском пути и помогли построить стартап.",
    quoteEn: "The knowledge from the economics and management department strengthened my confidence in entrepreneurship and helped build my startup.",
    quoteTr: "Ekonomi ve yönetim bölümünden aldığım bilgiler, girişimcilik yolumda özgüvenimi pekiştirdi ve startup'ımı kurmama yardımcı oldu.",
    color: "#D6A84F",
    year: "2021",
  },
  {
    initials: "HY",
    nameUz: "Hulkar Yusupova", nameRu: "Хулкар Юсупова", nameEn: "Hulkar Yusupova", nameTr: "Hulkar Yusupova",
    roleUz: "Magistr, xalqaro tashkilot xodimi", roleRu: "Магистр, сотрудник международной организации", roleEn: "Master, international organization staff", roleTr: "Yüksek lisans mezunu, uluslararası kuruluş çalışanı",
    quoteUz: "Filologiya kafedrasi bergan chuqur til bilimlari va ilmiy maqolalar yozish ko'nikmasi xalqaro faoliyatimda muhim ahamiyat kasb etmoqda.",
    quoteRu: "Глубокие языковые знания и навык написания научных статей, полученные на кафедре филологии, имеют важное значение в моей международной деятельности.",
    quoteEn: "Deep language knowledge and scientific article writing skills gained at the philology department are of great importance in my international activities.",
    quoteTr: "Filoloji bölümünde edindiğim derin dil bilgisi ve bilimsel makale yazma becerisi, uluslararası faaliyetlerimde büyük önem taşımaktadır.",
    color: "#7C3AED",
    year: "2022",
  },
];

export default function AlumniSection() {
  const locale = useLocale() as Locale;
  const L = T[locale] || T.uz;
  const [active, setActive] = useState(0);

  const getName = (a: typeof ALUMNI[0]) => {
    if (locale === "ru") return a.nameRu;
    if (locale === "en") return a.nameEn;
    if (locale === "tr") return a.nameTr;
    return a.nameUz;
  };

  const getRole = (a: typeof ALUMNI[0]) => {
    if (locale === "ru") return a.roleRu;
    if (locale === "en") return a.roleEn;
    if (locale === "tr") return a.roleTr;
    return a.roleUz;
  };

  const getQuote = (a: typeof ALUMNI[0]) => {
    if (locale === "ru") return a.quoteRu;
    if (locale === "en") return a.quoteEn;
    if (locale === "tr") return a.quoteTr;
    return a.quoteUz;
  };

  const current = ALUMNI[active];

  return (
    <section className="py-14 bg-[#F5F7FA]">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="mb-10 text-center">
          <div className="section-tag mb-3 mx-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1457A8]" />
            {L.tag}
          </div>
          <h2 className="text-[#061B3A] text-2xl lg:text-3xl font-bold">{L.title}</h2>
          <div className="section-divider mx-auto mt-2" />
          <p className="text-gray-500 text-sm mt-3 max-w-xl mx-auto">{L.subtitle}</p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Slider */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-6">
            <div className="text-5xl font-serif mb-4" style={{ color: current.color }}>"</div>
            <p className="text-gray-700 text-[15px] leading-7 italic mb-6">{getQuote(current)}</p>
            <div className="flex items-center gap-4 pt-5 border-t border-gray-100">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-base flex-shrink-0"
                style={{ background: `linear-gradient(135deg, ${current.color}, ${current.color}88)` }}
              >
                {current.initials}
              </div>
              <div>
                <div className="text-[#172033] font-bold text-[14px]">{getName(current)}</div>
                <div className="text-gray-500 text-[12px]">{getRole(current)}</div>
                <div className="text-[11px] mt-0.5" style={{ color: current.color }}>
                  {locale === "uz" ? "Bitirgan yil:" : locale === "ru" ? "Выпуск:" : locale === "tr" ? "Mezuniyet:" : "Year:"} {current.year}
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setActive((a) => (a - 1 + ALUMNI.length) % ALUMNI.length)}
              className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:border-[#1457A8] hover:text-[#1457A8] transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-2">
              {ALUMNI.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === active ? "w-6 bg-[#1457A8]" : "bg-gray-300"}`}
                />
              ))}
            </div>
            <button
              onClick={() => setActive((a) => (a + 1) % ALUMNI.length)}
              className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:border-[#1457A8] hover:text-[#1457A8] transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Mini avatars */}
          <div className="flex justify-center gap-3 mt-6">
            {ALUMNI.map((a, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold transition-all ${i === active ? "ring-2 ring-offset-2 scale-110" : "opacity-60 hover:opacity-100"}`}
                style={{ background: a.color }}
              >
                {a.initials}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
