"use client";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, BookOpen, Users, GraduationCap, TrendingUp } from "lucide-react";

const DEPARTMENTS = [
  {
    slug: "axborot-texnologiyalari",
    name: "Axborot texnologiyalari kafedrasi",
    icon: "💻",
    color: "#1457A8",
    bg: "from-blue-600 to-blue-800",
    resources: 145,
    subjects: 18,
    teachers: 12,
    topSubject: "Ma'lumotlar bazasi",
    isNew: true,
  },
  {
    slug: "matematika",
    name: "Matematika kafedrasi",
    icon: "📐",
    color: "#008C95",
    bg: "from-teal-500 to-teal-700",
    resources: 89,
    subjects: 12,
    teachers: 8,
    topSubject: "Oliy matematika",
    isNew: false,
  },
  {
    slug: "iqtisodiyot",
    name: "Iqtisodiyot kafedrasi",
    icon: "📊",
    color: "#0E9F6E",
    bg: "from-emerald-500 to-emerald-700",
    resources: 112,
    subjects: 15,
    teachers: 10,
    topSubject: "Mikroiqtisodiyot",
    isNew: true,
  },
  {
    slug: "filologiya",
    name: "Filologiya kafedrasi",
    icon: "📚",
    color: "#D6A84F",
    bg: "from-amber-500 to-amber-700",
    resources: 78,
    subjects: 14,
    teachers: 9,
    topSubject: "O'zbek tili",
    isNew: false,
  },
  {
    slug: "tarix",
    name: "Tarix kafedrasi",
    icon: "🏛️",
    color: "#8B5CF6",
    bg: "from-violet-500 to-violet-700",
    resources: 65,
    subjects: 11,
    teachers: 7,
    topSubject: "O'zbekiston tarixi",
    isNew: false,
  },
  {
    slug: "pedagogika",
    name: "Pedagogika kafedrasi",
    icon: "🎓",
    color: "#EF4444",
    bg: "from-red-500 to-red-700",
    resources: 54,
    subjects: 10,
    teachers: 6,
    topSubject: "Ta'lim texnologiyalari",
    isNew: false,
  },
];

export default function DepartmentsHub() {
  const t = useTranslations("departments");

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="text-sm font-semibold text-[#1457A8] mb-2 uppercase tracking-wider">
              📚 Kafedralar kutubxonasi
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#061B3A]">{t("title")}</h2>
            <p className="text-gray-500 mt-2">{t("subtitle")}</p>
          </div>
          <Link
            href="/departments"
            className="hidden md:flex items-center gap-2 text-sm font-medium text-[#1457A8] hover:text-[#0B3D73] transition-colors"
          >
            Hammasini ko'rish <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEPARTMENTS.map((dept) => (
            <div
              key={dept.slug}
              className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden card-hover"
            >
              {/* Header */}
              <div className={`bg-gradient-to-br ${dept.bg} p-5 relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: "radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
                  backgroundSize: "20px 20px"
                }} />
                <div className="relative flex items-start justify-between">
                  <div className="text-4xl">{dept.icon}</div>
                  {dept.isNew && (
                    <span className="px-2.5 py-1 rounded-full bg-white/20 text-white text-xs font-bold">
                      {t("newBadge")}
                    </span>
                  )}
                </div>
                <h3 className="text-white font-bold text-sm mt-3 leading-tight">{dept.name}</h3>
              </div>

              {/* Stats */}
              <div className="p-5">
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center">
                    <div className="font-bold text-lg text-[#061B3A]">{dept.resources}</div>
                    <div className="text-xs text-gray-500">{t("resources")}</div>
                  </div>
                  <div className="text-center border-x border-gray-100">
                    <div className="font-bold text-lg text-[#061B3A]">{dept.subjects}</div>
                    <div className="text-xs text-gray-500">{t("subjects")}</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg text-[#061B3A]">{dept.teachers}</div>
                    <div className="text-xs text-gray-500">{t("teachers")}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-lg mb-4">
                  <TrendingUp className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs text-gray-500">Eng faol:</span>
                  <span className="text-xs font-semibold text-gray-700 truncate">{dept.topSubject}</span>
                </div>

                <Link
                  href={`/departments/${dept.slug}`}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold transition-all"
                  style={{
                    backgroundColor: `${dept.color}15`,
                    color: dept.color,
                  }}
                >
                  {t("enterLibrary")}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="md:hidden text-center mt-6">
          <Link
            href="/departments"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#1457A8]"
          >
            Hammasini ko'rish <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
