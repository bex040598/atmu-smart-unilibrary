"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { BookOpen, Calendar, Upload, Bot, BookMarked, Search } from "lucide-react";

const ACTIONS_DATA = {
  uz: [
    { icon: <BookOpen size={28} />, label: "Katalog", sub: "Barcha kitoblar", href: "/catalog", color: "text-blue-600", bg: "bg-blue-50" },
    { icon: <BookMarked size={28} />, label: "Resurslar", sub: "Elektron materiallar", href: "/resources", color: "text-indigo-600", bg: "bg-indigo-50" },
    { icon: <Calendar size={28} />, label: "O'qish zali", sub: "O'rin bron qilish", href: "/reading-room", color: "text-teal-600", bg: "bg-teal-50" },
    { icon: <Bot size={28} />, label: "AI Yordamchi", sub: "Aqlli qidiruv", href: "/ai", color: "text-purple-600", bg: "bg-purple-50" },
    { icon: <Upload size={28} />, label: "Material yuklash", sub: "O'qituvchilar uchun", href: "/dashboard/teacher", color: "text-amber-600", bg: "bg-amber-50" },
    { icon: <Search size={28} />, label: "Tez qidiruv", sub: "Barcha resurslar", href: "/catalog", color: "text-rose-600", bg: "bg-rose-50" },
  ],
  ru: [
    { icon: <BookOpen size={28} />, label: "Каталог", sub: "Все книги", href: "/catalog", color: "text-blue-600", bg: "bg-blue-50" },
    { icon: <BookMarked size={28} />, label: "Ресурсы", sub: "Электронные материалы", href: "/resources", color: "text-indigo-600", bg: "bg-indigo-50" },
    { icon: <Calendar size={28} />, label: "Читальный зал", sub: "Бронирование места", href: "/reading-room", color: "text-teal-600", bg: "bg-teal-50" },
    { icon: <Bot size={28} />, label: "ИИ Ассистент", sub: "Умный поиск", href: "/ai", color: "text-purple-600", bg: "bg-purple-50" },
    { icon: <Upload size={28} />, label: "Загрузить материал", sub: "Для преподавателей", href: "/dashboard/teacher", color: "text-amber-600", bg: "bg-amber-50" },
    { icon: <Search size={28} />, label: "Быстрый поиск", sub: "Все ресурсы", href: "/catalog", color: "text-rose-600", bg: "bg-rose-50" },
  ],
  en: [
    { icon: <BookOpen size={28} />, label: "Catalog", sub: "All books", href: "/catalog", color: "text-blue-600", bg: "bg-blue-50" },
    { icon: <BookMarked size={28} />, label: "Resources", sub: "E-materials", href: "/resources", color: "text-indigo-600", bg: "bg-indigo-50" },
    { icon: <Calendar size={28} />, label: "Reading Room", sub: "Book a seat", href: "/reading-room", color: "text-teal-600", bg: "bg-teal-50" },
    { icon: <Bot size={28} />, label: "AI Assistant", sub: "Smart search", href: "/ai", color: "text-purple-600", bg: "bg-purple-50" },
    { icon: <Upload size={28} />, label: "Upload Material", sub: "For teachers", href: "/dashboard/teacher", color: "text-amber-600", bg: "bg-amber-50" },
    { icon: <Search size={28} />, label: "Quick Search", sub: "All resources", href: "/catalog", color: "text-rose-600", bg: "bg-rose-50" },
  ],
  tr: [
    { icon: <BookOpen size={28} />, label: "Katalog", sub: "Tüm kitaplar", href: "/catalog", color: "text-blue-600", bg: "bg-blue-50" },
    { icon: <BookMarked size={28} />, label: "Kaynaklar", sub: "E-materyaller", href: "/resources", color: "text-indigo-600", bg: "bg-indigo-50" },
    { icon: <Calendar size={28} />, label: "Okuma Salonu", sub: "Koltuk rezervasyon", href: "/reading-room", color: "text-teal-600", bg: "bg-teal-50" },
    { icon: <Bot size={28} />, label: "AI Asistan", sub: "Akıllı arama", href: "/ai", color: "text-purple-600", bg: "bg-purple-50" },
    { icon: <Upload size={28} />, label: "Materyal Yükle", sub: "Öğretmenler için", href: "/dashboard/teacher", color: "text-amber-600", bg: "bg-amber-50" },
    { icon: <Search size={28} />, label: "Hızlı Arama", sub: "Tüm kaynaklar", href: "/catalog", color: "text-rose-600", bg: "bg-rose-50" },
  ],
};

const SECTION_LABELS: Record<string, Record<string, string>> = {
  uz: { tag: "Xizmatlar", title: "Tezkor xizmatlar" },
  ru: { tag: "Услуги", title: "Быстрые услуги" },
  en: { tag: "Services", title: "Quick Services" },
  tr: { tag: "Hizmetler", title: "Hızlı Hizmetler" },
};

export default function QuickActions() {
  const locale = useLocale() as "uz" | "ru" | "en" | "tr";
  const actions = ACTIONS_DATA[locale] || ACTIONS_DATA.uz;
  const s = SECTION_LABELS[locale] || SECTION_LABELS.uz;

  return (
    <section className="py-12 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-7">
          <div className="section-tag">
            <BookOpen size={11} />
            {s.tag}
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{s.title}</h2>
          <div className="section-divider" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {actions.map((action) => (
            <Link
              key={action.label}
              href={action.href as "/catalog" | "/resources" | "/reading-room" | "/ai" | "/dashboard/teacher"}
              className="service-card"
            >
              <div className={`service-icon-bg w-14 h-14 ${action.bg} rounded-2xl flex items-center justify-center mx-auto mb-3`}>
                <span className={`service-icon ${action.color}`}>{action.icon}</span>
              </div>
              <div className={`service-label font-bold text-sm text-gray-900 leading-tight`}>{action.label}</div>
              <div className="text-xs text-gray-400 mt-0.5 service-label">{action.sub}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
