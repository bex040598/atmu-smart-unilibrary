"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, TrendingUp } from "lucide-react";
import { departmentsApi } from "@/lib/api";

const ICONS: Record<string, string> = {
  "axborot-texnologiyalari": "💻",
  "matematika": "📐",
  "iqtisodiyot": "📊",
  "filologiya": "📚",
  "tarix": "🏛️",
  "pedagogika": "🎓",
};

const COLORS: Record<string, { color: string; bg: string }> = {
  "axborot-texnologiyalari": { color: "#1457A8", bg: "from-blue-600 to-blue-800" },
  "matematika":              { color: "#008C95", bg: "from-teal-500 to-teal-700" },
  "iqtisodiyot":             { color: "#0E9F6E", bg: "from-emerald-500 to-emerald-700" },
  "filologiya":              { color: "#D6A84F", bg: "from-amber-500 to-amber-700" },
  "tarix":                   { color: "#8B5CF6", bg: "from-violet-500 to-violet-700" },
  "pedagogika":              { color: "#EF4444", bg: "from-red-500 to-red-700" },
};

const FALLBACK = [
  { id: 1, slug: "axborot-texnologiyalari", name_uz: "Axborot texnologiyalari kafedrasi", resource_count: 145, subject_count: 18, teacher_count: 12 },
  { id: 2, slug: "matematika", name_uz: "Matematika kafedrasi", resource_count: 89, subject_count: 12, teacher_count: 8 },
  { id: 3, slug: "iqtisodiyot", name_uz: "Iqtisodiyot kafedrasi", resource_count: 112, subject_count: 15, teacher_count: 10 },
  { id: 4, slug: "filologiya", name_uz: "Filologiya kafedrasi", resource_count: 78, subject_count: 14, teacher_count: 9 },
  { id: 5, slug: "tarix", name_uz: "Tarix kafedrasi", resource_count: 65, subject_count: 11, teacher_count: 7 },
  { id: 6, slug: "pedagogika", name_uz: "Pedagogika kafedrasi", resource_count: 54, subject_count: 10, teacher_count: 6 },
];

export default function DepartmentsHub() {
  const t = useTranslations("departments");
  const [departments, setDepartments] = useState<any[]>([]);

  useEffect(() => {
    departmentsApi.list()
      .then((r) => {
        const data = Array.isArray(r.data) ? r.data : [];
        setDepartments(data.length > 0 ? data : FALLBACK);
      })
      .catch(() => setDepartments(FALLBACK));
  }, []);

  const list = departments.length > 0 ? departments : FALLBACK;

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
            Hammasini ko&apos;rish <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((dept: any) => {
            const slug = dept.slug || "";
            const icon = ICONS[slug] || "🏫";
            const colors = COLORS[slug] || { color: "#1457A8", bg: "from-blue-600 to-blue-800" };
            const name = dept.name_uz || dept.name || slug;
            const isNew = (dept.resource_count || 0) > 100;

            return (
              <div
                key={dept.id || slug}
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden card-hover"
              >
                <div className={`bg-gradient-to-br ${colors.bg} p-5 relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: "radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
                    backgroundSize: "20px 20px"
                  }} />
                  <div className="relative flex items-start justify-between">
                    <div className="text-4xl">{icon}</div>
                    {isNew && (
                      <span className="px-2.5 py-1 rounded-full bg-white/20 text-white text-xs font-bold">
                        {t("newBadge")}
                      </span>
                    )}
                  </div>
                  <h3 className="text-white font-bold text-sm mt-3 leading-tight">{name}</h3>
                </div>

                <div className="p-5">
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center">
                      <div className="font-bold text-lg text-[#061B3A]">{dept.resource_count ?? dept.resources ?? 0}</div>
                      <div className="text-xs text-gray-500">{t("resources")}</div>
                    </div>
                    <div className="text-center border-x border-gray-100">
                      <div className="font-bold text-lg text-[#061B3A]">{dept.subject_count ?? dept.subjects ?? 0}</div>
                      <div className="text-xs text-gray-500">{t("subjects")}</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg text-[#061B3A]">{dept.teacher_count ?? dept.teachers ?? 0}</div>
                      <div className="text-xs text-gray-500">{t("teachers")}</div>
                    </div>
                  </div>

                  {dept.top_subject && (
                    <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-lg mb-4">
                      <TrendingUp className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-xs text-gray-500">Eng faol:</span>
                      <span className="text-xs font-semibold text-gray-700 truncate">{dept.top_subject}</span>
                    </div>
                  )}

                  <Link
                    href={`/departments/${slug}`}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold transition-all"
                    style={{ backgroundColor: `${colors.color}15`, color: colors.color }}
                  >
                    {t("enterLibrary")}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="md:hidden text-center mt-6">
          <Link href="/departments" className="inline-flex items-center gap-2 text-sm font-medium text-[#1457A8]">
            Hammasini ko&apos;rish <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
