"use client";
import { useState } from "react";
import { useLocale } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Locale = "uz" | "ru" | "en" | "tr";
const t = (obj: Record<string, string>, locale: Locale) => obj[locale] || obj.uz;

const ALUMNI = [
  {
    initials: "JT",
    color: "#00579f",
    name: { uz: "Jahongir Toshmatov", ru: "Джахонгир Тошматов", en: "Jahongir Toshmatov", tr: "Jahongir Toshmatov" },
    role: { uz: "IT menejeri — Texnologiya kompaniyasi, 2022-yil bitiruvchi", ru: "IT-менеджер — технологическая компания, выпускник 2022", en: "IT Manager — Technology Company, 2022 Graduate", tr: "IT Müdürü — Teknoloji Şirketi, 2022 Mezunu" },
    quote: { uz: "ATMU da olgan ta'limim va Smart UniLibrary tizimi orqali o'rgangan ko'nikmalarim bugungi kasbiy faoliyatimning poydevori bo'ldi. Elektron resurslar va AI qidiruv tizimi o'quv jarayonini tubdan yaxshiladi.", ru: "Образование в АТМУ и навыки, приобретённые через систему Smart UniLibrary, стали основой моей сегодняшней профессиональной деятельности. Электронные ресурсы и ИИ-поиск кардинально улучшили учебный процесс.", en: "The education I received at ATMU and the skills I learned through the Smart UniLibrary system became the foundation of my professional career. E-resources and AI search fundamentally improved the learning process.", tr: "ATMU'daki eğitimim ve Smart UniLibrary sistemi aracılığıyla öğrendiğim beceriler mesleki kariyerimin temelini oluşturdu." },
  },
  {
    initials: "MR",
    color: "#8855cc",
    name: { uz: "Malika Rahimova", ru: "Малика Рахимова", en: "Malika Rahimova", tr: "Malika Rahimova" },
    role: { uz: "Ma'lumotlar tahlilchisi — Moliya sektori, 2021-yil bitiruvchi", ru: "Аналитик данных — финансовый сектор, выпускница 2021", en: "Data Analyst — Financial Sector, 2021 Graduate", tr: "Veri Analist — Finans Sektörü, 2021 Mezunu" },
    quote: { uz: "Universitetdagi raqamli kutubxona tizimi orqali ilmiy adabiyotlarga erkin kirish imkonim bo'ldi. Bu mening tadqiqot ko'nikmalarimi rivojlantirishga katta hissa qo'shdi va magistratura dissertatsiyamni yozishda asosiy vosita bo'ldi.", ru: "Через университетскую цифровую библиотеку я получила свободный доступ к научной литературе. Это внесло большой вклад в развитие моих исследовательских навыков и стало главным инструментом при написании магистерской диссертации.", en: "The university's digital library gave me free access to academic literature. This greatly contributed to developing my research skills and became the main tool for writing my master's dissertation.", tr: "Üniversitenin dijital kütüphanesi aracılığıyla akademik literatüre serbest erişim elde ettim. Bu, araştırma becerilerimi geliştirmeme büyük katkı sağladı." },
  },
  {
    initials: "BN",
    color: "#00a050",
    name: { uz: "Behruz Normatov", ru: "Бехруз Норматов", en: "Behruz Normatov", tr: "Behruz Normatov" },
    role: { uz: "Dasturchi — Davlat IT agentligi, 2023-yil bitiruvchi", ru: "Программист — Государственное IT-агентство, выпускник 2023", en: "Developer — State IT Agency, 2023 Graduate", tr: "Geliştirici — Devlet BT Ajansı, 2023 Mezunu" },
    quote: { uz: "ATMU Smart UniLibrary dasturlash va algoritmlar bo'yicha kerakli materiallarni tezda topishga yordam berdi. AI kutubxonachi xizmati ayniqsa diplom loyihasi davomida beqiyos yordam bo'ldi.", ru: "ATMU Smart UniLibrary помогла быстро найти нужные материалы по программированию и алгоритмам. Сервис ИИ-библиотекаря был особенно незаменим во время работы над дипломным проектом.", en: "ATMU Smart UniLibrary helped me quickly find the materials I needed on programming and algorithms. The AI librarian service was especially invaluable during my diploma project.", tr: "ATMU Smart UniLibrary programlama ve algoritmalar konusunda ihtiyacım olan materyalleri hızla bulmama yardımcı oldu." },
  },
  {
    initials: "NS",
    color: "#cc6600",
    name: { uz: "Nodira Sobirov", ru: "Нодира Собирова", en: "Nodira Sobirov", tr: "Nodira Sobirov" },
    role: { uz: "O'qituvchi — Mahalliy maktab, 2020-yil bitiruvchi", ru: "Учитель — местная школа, выпускница 2020", en: "Teacher — Local School, 2020 Graduate", tr: "Öğretmen — Yerel Okul, 2020 Mezunu" },
    quote: { uz: "Pedagogika kafedrasi elektron resurslari orqali o'qitish metodikasini chuqur o'rganish imkonim bo'ldi. Hozir o'zim o'quvchilarimga raqamli ta'lim usullarini o'rgatyapman.", ru: "Через электронные ресурсы кафедры педагогики у меня была возможность глубоко изучить методику преподавания. Теперь я сама обучаю своих учеников методам цифрового образования.", en: "Through the pedagogy department's e-resources I had the opportunity to deeply study teaching methodology. Now I myself teach my students digital education methods.", tr: "Pedagoji bölümünün e-kaynakları aracılığıyla öğretim metodolojisini derinlemesine inceleme fırsatım oldu." },
  },
];

export default function AlumniSection() {
  const locale = useLocale() as Locale;
  const [idx, setIdx] = useState(0);

  const prev = () => setIdx((idx - 1 + ALUMNI.length) % ALUMNI.length);
  const next = () => setIdx((idx + 1) % ALUMNI.length);

  const alumni = ALUMNI[idx];
  const titleLabel = locale === "uz" ? "Faxriy bitiruvchilar" : locale === "ru" ? "Выпускники" : locale === "tr" ? "Mezunlar" : "Alumni";

  return (
    <section className="py-14 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#001d3d 0%,#002b4e 50%,#001428 100%)" }}>
      {/* Background dots pattern */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle,white 1px,transparent 1px)", backgroundSize: "24px 24px" }} />

      <div className="max-w-[1680px] mx-auto px-5 sm:px-8 relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-px bg-[#e8a820]" />
            <span className="text-[#e8a820] text-[11px] font-bold uppercase tracking-widest">{titleLabel}</span>
            <span className="w-8 h-px bg-[#e8a820]" />
          </div>
          <h2 style={{ color: "#fff", fontFamily: "'Georgia',serif", fontSize: "clamp(22px,2.5vw,36px)", fontWeight: 800 }}>{titleLabel}</h2>
        </div>

        {/* Main testimonial */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/8 border border-white/12 rounded-3xl p-8 sm:p-10 text-center relative">
            {/* Quote mark */}
            <div className="text-[#e8a820]/20 font-black absolute top-4 left-6" style={{ fontSize: 80, lineHeight: 1, fontFamily: "Georgia,serif" }}>"</div>

            {/* Avatar */}
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center font-black text-white text-xl mx-auto mb-5"
              style={{ background: alumni.color }}
            >
              {alumni.initials}
            </div>

            <p className="text-white/80 text-[15px] sm:text-[17px] leading-relaxed italic mb-6 relative z-10">
              "{t(alumni.quote, locale)}"
            </p>

            <div className="text-white font-bold text-[15px] mb-1">{t(alumni.name, locale)}</div>
            <div className="text-white/45 text-[12px]">{t(alumni.role, locale)}</div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button onClick={prev} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors">
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-2">
                {ALUMNI.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    className={`rounded-full transition-all ${i === idx ? "w-6 h-2.5 bg-[#e8a820]" : "w-2.5 h-2.5 bg-white/25 hover:bg-white/45"}`}
                  />
                ))}
              </div>
              <button onClick={next} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Side avatars */}
          <div className="flex justify-center gap-3 mt-5">
            {ALUMNI.map((a, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`w-10 h-10 rounded-full font-bold text-[13px] text-white transition-all ${i === idx ? "ring-2 ring-[#e8a820] ring-offset-2 ring-offset-transparent scale-110" : "opacity-50 hover:opacity-80"}`}
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
