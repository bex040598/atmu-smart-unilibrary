"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useRouter } from "@/i18n/navigation";
import {
  Phone, Mail, Clock, ChevronDown, Menu, X, Search,
  BookOpen, GraduationCap, Building2, LogIn, ChevronRight,
  BookMarked, Layers, Star
} from "lucide-react";

const LOCALES = [
  { code: "uz", label: "UZ" },
  { code: "ru", label: "RU" },
  { code: "en", label: "EN" },
  { code: "tr", label: "TR" },
];

const DEPARTMENTS = [
  { id: 1, slug: "computer-engineering", icon: "💻", nameUz: "Kompyuter muhandisligi", nameRu: "Компьютерная инженерия", nameEn: "Computer Engineering" },
  { id: 2, slug: "information-systems", icon: "📊", nameUz: "Axborot tizimlari", nameRu: "Информационные системы", nameEn: "Information Systems" },
  { id: 3, slug: "software-engineering", icon: "⚙️", nameUz: "Dasturiy muhandislik", nameRu: "Программная инженерия", nameEn: "Software Engineering" },
  { id: 4, slug: "cybersecurity", icon: "🔒", nameUz: "Kiberxavfsizlik", nameRu: "Кибербезопасность", nameEn: "Cybersecurity" },
  { id: 5, slug: "artificial-intelligence", icon: "🤖", nameUz: "Sun'iy intellekt", nameRu: "Искусственный интеллект", nameEn: "Artificial Intelligence" },
  { id: 6, slug: "management", icon: "📋", nameUz: "Menejment", nameRu: "Менеджмент", nameEn: "Management" },
];

const LABELS: Record<string, Record<string, string>> = {
  uz: {
    catalog: "Katalog", departments: "Kafedralar", services: "Xizmatlar",
    about: "Biz haqimizda", contact: "Aloqa", login: "Kirish", news: "Yangiliklar",
    search_placeholder: "Kitob, resurs qidirish...", search: "Qidirish",
    working_hours: "Du-Ju: 8:00 - 18:00", all_departments: "Barcha kafedralar",
    books: "Kitoblar", resources: "Resurslar", reading_room: "O'qish zali", ai_assistant: "AI Yordamchi",
    university: "Axborot texnologiyalari va menejment universiteti",
    portal_name: "ATMU Elektron Kutubxona Portali",
  },
  ru: {
    catalog: "Каталог", departments: "Кафедры", services: "Услуги",
    about: "О нас", contact: "Контакты", login: "Войти", news: "Новости",
    search_placeholder: "Поиск книг, ресурсов...", search: "Поиск",
    working_hours: "Пн-Пт: 8:00 - 18:00", all_departments: "Все кафедры",
    books: "Книги", resources: "Ресурсы", reading_room: "Читальный зал", ai_assistant: "ИИ Ассистент",
    university: "Университет информационных технологий и менеджмента",
    portal_name: "Электронная библиотека АТМУ",
  },
  en: {
    catalog: "Catalog", departments: "Departments", services: "Services",
    about: "About", contact: "Contact", login: "Login", news: "News",
    search_placeholder: "Search books, resources...", search: "Search",
    working_hours: "Mon-Fri: 8:00 - 18:00", all_departments: "All departments",
    books: "Books", resources: "Resources", reading_room: "Reading Room", ai_assistant: "AI Assistant",
    university: "University of Information Technologies and Management",
    portal_name: "ATMU E-Library Portal",
  },
  tr: {
    catalog: "Katalog", departments: "Bölümler", services: "Hizmetler",
    about: "Hakkımızda", contact: "İletişim", login: "Giriş", news: "Haberler",
    search_placeholder: "Kitap, kaynak ara...", search: "Ara",
    working_hours: "Pzt-Cum: 8:00 - 18:00", all_departments: "Tüm bölümler",
    books: "Kitaplar", resources: "Kaynaklar", reading_room: "Okuma Salonu", ai_assistant: "AI Asistan",
    university: "Bilgi Teknolojileri ve Yönetim Üniversitesi",
    portal_name: "ATMU E-Kütüphanesi",
  },
};

export default function Header() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const L = LABELS[locale] || LABELS.uz;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  const switchLocale = (code: string) => {
    router.push(pathname, { locale: code });
  };

  const getDeptName = (dept: typeof DEPARTMENTS[0]) => {
    if (locale === "ru") return dept.nameRu;
    if (locale === "en") return dept.nameEn;
    return dept.nameUz;
  };

  const NAV_ITEMS = [
    {
      key: "catalog",
      label: L.catalog,
      href: "/catalog" as const,
      dropdown: [
        { label: L.books, href: "/catalog", icon: <BookMarked size={14} /> },
        { label: L.resources, href: "/resources", icon: <Layers size={14} /> },
        { label: L.reading_room, href: "/reading-room", icon: <Star size={14} /> },
        { label: L.ai_assistant, href: "/ai", icon: <GraduationCap size={14} /> },
      ],
    },
    {
      key: "departments",
      label: L.departments,
      href: "/departments" as const,
      mega: true,
      dropdown: null,
    },
    {
      key: "services",
      label: L.services,
      href: "/services" as const,
      dropdown: [
        { label: L.reading_room, href: "/reading-room", icon: <BookOpen size={14} /> },
        { label: L.ai_assistant, href: "/ai", icon: <GraduationCap size={14} /> },
      ],
    },
    { key: "news", label: L.news, href: "/news" as const, dropdown: null },
    { key: "about", label: L.about, href: "/about" as const, dropdown: null },
    { key: "contact", label: L.contact, href: "/contact" as const, dropdown: null },
  ];

  return (
    <header className="w-full sticky top-0 z-50 shadow-lg">
      {/* Topbar */}
      <div className="topbar text-white py-1.5 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-xs">
          <div className="flex items-center gap-5">
            <a href="tel:+998712274800" className="flex items-center gap-1.5 hover:text-yellow-300 transition-colors">
              <Phone size={11} />
              <span>+998 71 227-48-00</span>
            </a>
            <a href="mailto:library@atmu.uz" className="flex items-center gap-1.5 hover:text-yellow-300 transition-colors">
              <Mail size={11} />
              <span>library@atmu.uz</span>
            </a>
            <span className="flex items-center gap-1.5 text-white/50">
              <Clock size={11} />
              <span>{L.working_hours}</span>
            </span>
          </div>
          <div className="flex items-center gap-1">
            {LOCALES.map((loc) => (
              <button
                key={loc.code}
                onClick={() => switchLocale(loc.code)}
                className={`px-2 py-0.5 rounded text-xs font-bold transition-colors ${
                  locale === loc.code
                    ? "bg-yellow-400 text-[#061B3A]"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {loc.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Logo bar */}
      <div className="header-university text-white">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-4 group flex-shrink-0">
            <div className="w-14 h-14 rounded-full bg-white/95 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform flex-shrink-0 overflow-hidden">
              <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
                <circle cx="28" cy="28" r="28" fill="#061B3A"/>
                <path d="M14 20 L28 12 L42 20 L42 36 L28 44 L14 36 Z" fill="#1457A8" opacity="0.5"/>
                <path d="M28 16 L38 22 V34 L28 40 L18 34 V22 Z" fill="#0B3D73"/>
                <text x="28" y="32" textAnchor="middle" fill="#D6A84F" fontSize="11" fontWeight="bold" fontFamily="Arial">AT</text>
                <circle cx="28" cy="28" r="26" stroke="#D6A84F" strokeWidth="0.8" fill="none" strokeDasharray="3 3"/>
              </svg>
            </div>
            <div>
              <div className="text-yellow-300/90 text-[10px] font-semibold uppercase tracking-wider">
                {L.university}
              </div>
              <div className="text-white font-bold text-base lg:text-lg leading-tight">
                {L.portal_name}
              </div>
              <div className="text-white/40 text-[10px] tracking-wide">Smart UniLibrary</div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-3 ml-auto">
            {searchOpen ? (
              <div className="flex items-center bg-white/10 border border-white/25 rounded-lg overflow-hidden w-72">
                <input
                  ref={searchRef}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && searchQuery.trim()) {
                      router.push({ pathname: "/catalog", query: { search: searchQuery } });
                    }
                    if (e.key === "Escape") setSearchOpen(false);
                  }}
                  placeholder={L.search_placeholder}
                  className="flex-1 bg-transparent text-white placeholder-white/40 text-sm px-3 py-2 outline-none"
                />
                <button onClick={() => setSearchOpen(false)} className="px-3 py-2 text-white/60 hover:text-white">
                  <X size={15} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm px-4 py-2 rounded-lg transition-colors"
              >
                <Search size={15} />
                <span className="hidden xl:inline">{L.search}</span>
              </button>
            )}
            <Link
              href="/login"
              className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-[#061B3A] font-bold text-sm px-5 py-2 rounded-lg transition-colors"
            >
              <LogIn size={15} />
              {L.login}
            </Link>
          </div>

          <button
            className="lg:hidden text-white p-2 rounded-lg bg-white/10"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Main Nav */}
      <div className="nav-main text-white hidden lg:block" ref={menuRef}>
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.key}
                className="nav-item relative"
                onMouseEnter={() => (item.dropdown || item.mega) ? setActiveMenu(item.key) : undefined}
                onMouseLeave={() => setActiveMenu(null)}
              >
                {item.dropdown || item.mega ? (
                  <button
                    className={`flex items-center gap-1 px-4 py-4 text-sm font-medium transition-colors hover:text-yellow-300 hover:bg-white/5 ${
                      pathname.startsWith(item.href) ? "text-yellow-300 border-b-2 border-yellow-300" : "text-white/85"
                    }`}
                  >
                    {item.label}
                    <ChevronDown size={12} className="opacity-60 mt-0.5" />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-4 text-sm font-medium transition-colors hover:text-yellow-300 hover:bg-white/5 ${
                      pathname === item.href ? "text-yellow-300 border-b-2 border-yellow-300" : "text-white/85"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}

                {/* Regular dropdown */}
                {item.dropdown && activeMenu === item.key && (
                  <div className="absolute top-full left-0 bg-white border-t-2 border-[#1457A8] shadow-2xl rounded-b-xl min-w-[220px] py-2 z-50">
                    {item.dropdown.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href as "/catalog" | "/resources" | "/reading-room" | "/ai"}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#1457A8] transition-colors"
                      >
                        <span className="text-[#1457A8]">{sub.icon}</span>
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Mega menu */}
                {item.mega && activeMenu === item.key && (
                  <div className="absolute top-full left-0 bg-white border-t-2 border-[#1457A8] shadow-2xl rounded-b-xl z-50 py-5 px-5" style={{ width: "520px" }}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-bold uppercase text-gray-400 tracking-wider">{L.all_departments}</span>
                      <Link href="/departments" className="text-xs text-[#1457A8] hover:underline flex items-center gap-0.5">
                        Barchasi <ChevronRight size={11} />
                      </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      {DEPARTMENTS.map((dept) => (
                        <Link
                          key={dept.id}
                          href={`/departments/${dept.slug}` as `/departments/${string}`}
                          className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-blue-50 transition-colors group"
                        >
                          <span className="text-xl flex-shrink-0">{dept.icon}</span>
                          <span className="text-sm text-gray-700 group-hover:text-[#1457A8] font-medium leading-tight">
                            {getDeptName(dept)}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-[100] bg-[#061B3A] overflow-y-auto">
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <span className="text-white font-bold">ATMU Kutubxona</span>
            <button onClick={() => setMobileOpen(false)} className="text-white p-1">
              <X size={22} />
            </button>
          </div>
          <div className="p-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-sm"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/10">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 bg-yellow-400 text-[#061B3A] font-bold px-4 py-3 rounded-lg w-full"
              >
                <LogIn size={17} />
                {L.login}
              </Link>
            </div>
            <div className="pt-3 flex gap-2 justify-center">
              {LOCALES.map((loc) => (
                <button
                  key={loc.code}
                  onClick={() => { switchLocale(loc.code); setMobileOpen(false); }}
                  className={`px-3 py-1.5 rounded text-sm font-bold ${
                    locale === loc.code ? "bg-yellow-400 text-[#061B3A]" : "bg-white/10 text-white"
                  }`}
                >
                  {loc.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
