"use client";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, BookOpen, Users, BarChart2, TrendingUp } from "lucide-react";

const DEPARTMENTS = [
  {
    slug: "axborot-texnologiyalari",
    name_uz: "Axborot texnologiyalari kafedrasi",
    faculty: "Raqamli texnologiyalar fakulteti",
    icon: "💻",
    color: "#1457A8",
    bg: "from-blue-600 to-blue-900",
    resources: 145,
    subjects: 18,
    teachers: 12,
    downloads: 2847,
    topSubject: "Ma'lumotlar bazasi",
    description: "Zamonaviy axborot texnologiyalari, dasturlash, sun'iy intellekt va ma'lumotlar bazasi sohalari bo'yicha oliy ta'lim.",
    isNew: true,
  },
  {
    slug: "matematika",
    name_uz: "Matematika kafedrasi",
    faculty: "Raqamli texnologiyalar fakulteti",
    icon: "📐",
    color: "#008C95",
    bg: "from-teal-500 to-teal-800",
    resources: 89,
    subjects: 12,
    teachers: 8,
    downloads: 1543,
    topSubject: "Oliy matematika",
    description: "Oliy matematika, diskret matematika, ehtimollar nazariyasi va matematik statistika.",
    isNew: false,
  },
  {
    slug: "iqtisodiyot",
    name_uz: "Iqtisodiyot kafedrasi",
    faculty: "Raqamli texnologiyalar fakulteti",
    icon: "📊",
    color: "#0E9F6E",
    bg: "from-emerald-500 to-emerald-800",
    resources: 112,
    subjects: 15,
    teachers: 10,
    downloads: 2103,
    topSubject: "Mikroiqtisodiyot",
    description: "Mikroiqtisodiyot, makroiqtisodiyot, moliya va bank ishi, menejment.",
    isNew: true,
  },
  {
    slug: "filologiya",
    name_uz: "Filologiya kafedrasi",
    faculty: "Ijtimoiy fanlar fakulteti",
    icon: "📚",
    color: "#D6A84F",
    bg: "from-amber-500 to-amber-800",
    resources: 78,
    subjects: 14,
    teachers: 9,
    downloads: 987,
    topSubject: "O'zbek tili",
    description: "O'zbek tili va adabiyoti, xorijiy tillar, tilshunoslik va adabiyotshunoslik.",
    isNew: false,
  },
  {
    slug: "tarix",
    name_uz: "Tarix kafedrasi",
    faculty: "Ijtimoiy fanlar fakulteti",
    icon: "🏛️",
    color: "#8B5CF6",
    bg: "from-violet-500 to-violet-800",
    resources: 65,
    subjects: 11,
    teachers: 7,
    downloads: 743,
    topSubject: "O'zbekiston tarixi",
    description: "O'zbekiston tarixi, jahon tarixi, arxeologiya va etnologiya.",
    isNew: false,
  },
  {
    slug: "pedagogika",
    name_uz: "Pedagogika kafedrasi",
    faculty: "Ijtimoiy fanlar fakulteti",
    icon: "🎓",
    color: "#EF4444",
    bg: "from-red-500 to-red-800",
    resources: 54,
    subjects: 10,
    teachers: 6,
    downloads: 612,
    topSubject: "Ta'lim texnologiyalari",
    description: "Ta'lim texnologiyalari, pedagogika va psixologiya, maktabgacha ta'lim.",
    isNew: false,
  },
];

export default function DepartmentsPage() {
  const t = useTranslations("departments");

  return (
    <div className="min-h-screen ornament-bg ornament-pattern">
      {/* Page header */}
      <div className="gradient-navy py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs text-white/50 mb-4">
            Bosh sahifa → Tuzilma → Kafedralar
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">{t("title")}</h1>
          <p className="text-blue-200">{t("subtitle")}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Faculty groups */}
        {[
          { name: "Raqamli texnologiyalar fakulteti", depts: DEPARTMENTS.filter(d => d.faculty === "Raqamli texnologiyalar fakulteti") },
          { name: "Ijtimoiy fanlar fakulteti", depts: DEPARTMENTS.filter(d => d.faculty === "Ijtimoiy fanlar fakulteti") },
        ].map((faculty) => (
          <div key={faculty.name} className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-gray-200" />
              <h2 className="text-lg font-bold text-[#061B3A] px-3">{faculty.name}</h2>
              <div className="h-px flex-1 bg-gray-200" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {faculty.depts.map((dept) => (
                <div key={dept.slug} className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden card-hover hover:shadow-xl transition-all duration-300">
                  <div className={`bg-gradient-to-br ${dept.bg} p-6 relative overflow-hidden`}>
                    <div className="absolute inset-0 opacity-10" style={{
                      backgroundImage: "radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
                      backgroundSize: "20px 20px"
                    }} />
                    <div className="relative">
                      <div className="flex items-start justify-between mb-4">
                        <div className="text-5xl">{dept.icon}</div>
                        {dept.isNew && (
                          <span className="px-2.5 py-1 rounded-full bg-white/25 text-white text-xs font-bold">
                            Yangi
                          </span>
                        )}
                      </div>
                      <h3 className="text-white font-bold text-base leading-snug">{dept.name_uz}</h3>
                      <p className="text-white/70 text-sm mt-2 line-clamp-2">{dept.description}</p>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="grid grid-cols-4 gap-2 mb-4">
                      {[
                        { icon: BookOpen, v: dept.resources, l: "resurs" },
                        { icon: BarChart2, v: dept.subjects, l: "fan" },
                        { icon: Users, v: dept.teachers, l: "o'qit." },
                        { icon: TrendingUp, v: dept.downloads, l: "yukl." },
                      ].map(({ icon: Icon, v, l }) => (
                        <div key={l} className="text-center">
                          <Icon className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                          <div className="font-bold text-sm text-[#061B3A]">{v}</div>
                          <div className="text-[10px] text-gray-400">{l}</div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-lg mb-4 text-xs">
                      <TrendingUp className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-gray-400">Faol fan:</span>
                      <span className="font-semibold text-gray-700">{dept.topSubject}</span>
                    </div>

                    <Link
                      href={`/departments/${dept.slug}`}
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold transition-all group-hover:shadow-md"
                      style={{ backgroundColor: `${dept.color}15`, color: dept.color }}
                    >
                      {t("enterLibrary")}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
