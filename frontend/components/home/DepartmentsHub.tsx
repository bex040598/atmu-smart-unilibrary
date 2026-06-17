"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, ChevronRight, BookOpen } from "lucide-react";
import { departmentsApi } from "@/lib/api";

const STATIC_DEPARTMENTS = [
  { id: 1, slug: "computer-engineering", icon: "💻", name_uz: "Kompyuter muhandisligi", name_ru: "Компьютерная инженерия", name_en: "Computer Engineering", resource_count: 0, color: "from-blue-500 to-blue-700" },
  { id: 2, slug: "information-systems", icon: "📊", name_uz: "Axborot tizimlari", name_ru: "Информационные системы", name_en: "Information Systems", resource_count: 0, color: "from-indigo-500 to-indigo-700" },
  { id: 3, slug: "software-engineering", icon: "⚙️", name_uz: "Dasturiy muhandislik", name_ru: "Программная инженерия", name_en: "Software Engineering", resource_count: 0, color: "from-violet-500 to-violet-700" },
  { id: 4, slug: "cybersecurity", icon: "🔒", name_uz: "Kiberxavfsizlik", name_ru: "Кибербезопасность", name_en: "Cybersecurity", resource_count: 0, color: "from-red-500 to-rose-700" },
  { id: 5, slug: "artificial-intelligence", icon: "🤖", name_uz: "Sun'iy intellekt", name_ru: "Искусственный интеллект", name_en: "Artificial Intelligence", resource_count: 0, color: "from-teal-500 to-teal-700" },
  { id: 6, slug: "management", icon: "📋", name_uz: "Menejment", name_ru: "Менеджмент", name_en: "Management", resource_count: 0, color: "from-amber-500 to-orange-600" },
];

const LABELS: Record<string, Record<string, string>> = {
  uz: { tag: "Kafedralar", title: "Kafedra elektron kutubxonalari", subtitle: "Har bir kafedra o'z elektron resurslar bazasiga ega", all: "Barcha kafedralar", resources: "ta resurs" },
  ru: { tag: "Кафедры", title: "Электронные библиотеки кафедр", subtitle: "Каждая кафедра имеет собственную базу электронных ресурсов", all: "Все кафедры", resources: "ресурсов" },
  en: { tag: "Departments", title: "Department E-Libraries", subtitle: "Each department has its own digital resource base", all: "All departments", resources: "resources" },
  tr: { tag: "Bölümler", title: "Bölüm E-Kütüphaneleri", subtitle: "Her bölümün kendi dijital kaynak tabanı var", all: "Tüm bölümler", resources: "kaynak" },
};

export default function DepartmentsHub() {
  const locale = useLocale() as "uz" | "ru" | "en" | "tr";
  const L = LABELS[locale] || LABELS.uz;
  const [departments, setDepartments] = useState(STATIC_DEPARTMENTS);

  useEffect(() => {
    departmentsApi.list().then((res: any) => {
      const data = res.data || res;
      if (data && data.length > 0) {
        setDepartments(data.map((d: any, i: number) => ({
          ...STATIC_DEPARTMENTS[i % STATIC_DEPARTMENTS.length],
          ...d,
          icon: STATIC_DEPARTMENTS[i % STATIC_DEPARTMENTS.length].icon,
          color: STATIC_DEPARTMENTS[i % STATIC_DEPARTMENTS.length].color,
          slug: d.slug || STATIC_DEPARTMENTS[i % STATIC_DEPARTMENTS.length].slug,
        })));
      }
    }).catch(() => {});
  }, []);

  const getName = (dept: typeof STATIC_DEPARTMENTS[0]) => {
    if (locale === "ru" && dept.name_ru) return dept.name_ru;
    if (locale === "en" && dept.name_en) return dept.name_en;
    return dept.name_uz;
  };

  return (
    <section className="py-14 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="section-tag">
              <BookOpen size={11} />
              {L.tag}
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{L.title}</h2>
            <p className="text-gray-500 text-sm mt-1">{L.subtitle}</p>
            <div className="section-divider" />
          </div>
          <Link href="/departments" className="flex items-center gap-1 text-sm text-[#1457A8] font-semibold hover:underline flex-shrink-0">
            {L.all} <ChevronRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {departments.map((dept) => (
            <Link
              key={dept.id}
              href={`/departments/${dept.slug}` as `/departments/${string}`}
              className="portal-card flex items-center gap-4 p-5 group"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${dept.color} flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform shadow-md`}>
                {dept.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 text-sm leading-snug group-hover:text-[#1457A8] transition-colors">
                  {getName(dept)}
                </h3>
                {dept.resource_count > 0 && (
                  <p className="text-gray-400 text-xs mt-0.5">{dept.resource_count} {L.resources}</p>
                )}
              </div>
              <ArrowRight size={16} className="text-gray-300 group-hover:text-[#1457A8] group-hover:translate-x-1 transition-all flex-shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
