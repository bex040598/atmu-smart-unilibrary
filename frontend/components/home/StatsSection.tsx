"use client";

import { useEffect, useState, useRef } from "react";
import { reportsApi } from "@/lib/api";
import { useLocale } from "next-intl";

type Locale = "uz" | "ru" | "en" | "tr";

function AnimatedNumber({ target, duration = 1600 }: { target: number; duration?: number }) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (target === 0 || started.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = Date.now();
          const tick = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setCurrent(Math.round(ease * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{current.toLocaleString()}</span>;
}

const SEED_STATS = {
  total_resources: 1247,
  total_books: 8420,
  total_departments: 6,
  total_subjects: 48,
  total_teachers: 126,
  active_users: 2318,
};

const ITEMS_CONFIG = (locale: Locale) => [
  {
    value: SEED_STATS.total_resources,
    suffix: "+",
    label: { uz: "Elektron resurslar", ru: "Эл. ресурсов", en: "E-Resources", tr: "E-Kaynak" }[locale],
    color: "#1457A8",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
  },
  {
    value: SEED_STATS.total_books,
    suffix: "+",
    label: { uz: "Jismoniy kitoblar", ru: "Физ. книг", en: "Physical Books", tr: "Fiziksel Kitap" }[locale],
    color: "#0B3D73",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
      </svg>
    ),
  },
  {
    value: SEED_STATS.total_departments,
    suffix: "",
    label: { uz: "Kafedralar", ru: "Кафедр", en: "Departments", tr: "Bölüm" }[locale],
    color: "#008C95",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
  },
  {
    value: SEED_STATS.total_subjects,
    suffix: "",
    label: { uz: "Fanlar", ru: "Дисциплин", en: "Subjects", tr: "Ders" }[locale],
    color: "#0E9F6E",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
  },
  {
    value: SEED_STATS.total_teachers,
    suffix: "+",
    label: { uz: "O'qituvchilar", ru: "Преподавателей", en: "Faculty", tr: "Öğretim Üyesi" }[locale],
    color: "#D6A84F",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 10-16 0"/>
      </svg>
    ),
  },
  {
    value: SEED_STATS.active_users,
    suffix: "+",
    label: { uz: "Faol foydalanuvchilar", ru: "Активных польз.", en: "Active Users", tr: "Aktif Kullanıcı" }[locale],
    color: "#7C3AED",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
  },
];

export default function StatsSection() {
  const locale = useLocale() as Locale;
  const [serverStats, setServerStats] = useState<any>(null);

  useEffect(() => {
    reportsApi.publicStats().then((res: any) => {
      if (res?.data) setServerStats(res.data);
    }).catch(() => {});
  }, []);

  const items = ITEMS_CONFIG(locale).map((item, i) => {
    if (!serverStats) return item;
    const overrides: Record<number, number> = {
      0: serverStats.total_resources,
      1: serverStats.total_books,
      2: serverStats.total_departments,
    };
    return { ...item, value: overrides[i] ?? item.value };
  });

  return (
    <section className="bg-white border-b border-gray-100 py-10">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center py-5 px-3 rounded-2xl hover:bg-gray-50 transition-colors group"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"
                style={{ background: item.color + "15", color: item.color }}
              >
                {item.icon}
              </div>
              <div
                className="text-2xl lg:text-3xl font-black leading-none mb-1 stat-counter"
                style={{ color: item.color }}
              >
                <AnimatedNumber target={item.value} />
                {item.suffix}
              </div>
              <div className="text-gray-500 text-[11px] font-medium leading-tight">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
