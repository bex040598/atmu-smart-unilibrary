"use client";

import { useEffect, useState, useRef } from "react";
import { BookOpen, Building2, Users, BookMarked, Monitor, Award } from "lucide-react";
import { reportsApi } from "@/lib/api";
import { useLocale } from "next-intl";

interface Stats {
  total_resources: number;
  total_books: number;
  active_loans: number;
  total_departments: number;
  available_seats: number;
}

function AnimatedNumber({ target, duration = 1800 }: { target: number; duration?: number }) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (target === 0 || started.current) return;
    const observer = new IntersectionObserver(([entry]) => {
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
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{current.toLocaleString()}</span>;
}

const LABELS: Record<string, string[]> = {
  uz: ["Elektron resurslar", "Jismoniy kitoblar", "Faol o'quvchilar", "Kafedralar", "O'qish o'rindiqlari", "O'qituvchilar"],
  ru: ["Электронных ресурсов", "Физических книг", "Активных читателей", "Кафедр", "Мест в зале", "Преподавателей"],
  en: ["E-Resources", "Physical Books", "Active Readers", "Departments", "Reading Seats", "Teachers"],
  tr: ["E-Kaynaklar", "Fiziksel Kitap", "Aktif Okuyucu", "Bölüm", "Okuma Koltuğu", "Öğretmenler"],
};

export default function StatsSection() {
  const locale = useLocale();
  const [stats, setStats] = useState<Stats | null>(null);
  const labels = LABELS[locale] || LABELS.uz;

  useEffect(() => {
    reportsApi.publicStats().then((res: any) => setStats(res.data)).catch(() => {});
  }, []);

  const items = [
    { icon: <BookOpen size={26} />, value: stats?.total_resources ?? 12000, suffix: "+", label: labels[0], color: "text-blue-600", bg: "bg-blue-50" },
    { icon: <BookMarked size={26} />, value: stats?.total_books ?? 50000, suffix: "+", label: labels[1], color: "text-indigo-600", bg: "bg-indigo-50" },
    { icon: <Users size={26} />, value: stats?.active_loans ?? 3800, suffix: "+", label: labels[2], color: "text-emerald-600", bg: "bg-emerald-50" },
    { icon: <Building2 size={26} />, value: stats?.total_departments ?? 6, suffix: "", label: labels[3], color: "text-purple-600", bg: "bg-purple-50" },
    { icon: <Monitor size={26} />, value: stats?.available_seats ?? 200, suffix: "", label: labels[4], color: "text-teal-600", bg: "bg-teal-50" },
    { icon: <Award size={26} />, value: 280, suffix: "+", label: labels[5], color: "text-amber-600", bg: "bg-amber-50" },
  ];

  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {items.map((item, i) => (
            <div key={i} className="text-center group">
              <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                <span className={item.color}>{item.icon}</span>
              </div>
              <div className={`text-2xl lg:text-3xl font-black ${item.color} stat-counter leading-none`}>
                <AnimatedNumber target={item.value} />
                {item.suffix}
              </div>
              <div className="text-gray-500 text-xs mt-1 font-medium leading-tight">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
