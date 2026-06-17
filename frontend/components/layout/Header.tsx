"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useRouter } from "@/i18n/navigation";
import {
  ChevronDown, Menu, X, Search, LogIn, User,
  Eye, Grid3X3, ChevronRight, BookOpen, Cpu,
  FlaskConical, Globe2, GraduationCap, Building,
  Library, Calendar, FileText, Microscope, Award,
  BookMarked, Bot, MapPin, Brain
} from "lucide-react";

const LOCALES = [
  { code: "uz", label: "O'zb" },
  { code: "ru", label: "Рус" },
  { code: "en", label: "Eng" },
  { code: "tr", label: "Türk" },
];

type Locale = "uz" | "ru" | "en" | "tr";

const T: Record<Locale, Record<string, string>> = {
  uz: {
    univ: "Axborot texnologiyalari va menejment universiteti",
    student: "Talaba",
    staff: "Xodim",
    elib: "E-Lib",
    alumni: "Bitiruvchilar",
    news_service: "Axborot xizmati",
    university: "Universitet",
    education: "Ta'lim",
    science: "Ilm-fan",
    international: "Xalqaro aloqalar",
    morality: "Ma'naviyat",
    admission: "Qabul komissiyasi",
    elibrary: "Elektron kutubxona",
    search_ph: "Qidirish...",
    login: "Kirish",
    // Universitet mega menu
    about_univ: "Universitet haqida",
    leadership: "Rahbariyat",
    structure: "Tuzilma",
    faculties: "Fakultetlar",
    departments: "Kafedralar",
    official_docs: "Rasmiy hujjatlar",
    // Ta'lim
    bachelor: "Bakalavriat",
    master: "Magistratura",
    distance: "Sirtqi ta'lim",
    schedule: "Dars jadvali",
    hemis: "HEMIS",
    moodle: "Moodle",
    // Ilm-fan
    sci_centers: "Ilmiy markazlar",
    sci_projects: "Ilmiy loyihalar",
    conferences: "Konferensiyalar",
    dissertations: "Dissertatsiyalar",
    articles: "Maqolalar",
    // Elektron kutubxona
    smart_lib: "Smart UniLibrary",
    e_catalog: "Elektron katalog",
    dept_lib: "Kafedralar kutubxonasi",
    book_reserve: "Kitob band qilish",
    room_reserve: "O'quv zali bron qilish",
    ai_lib: "AI kutubxonachi",
    face_id: "Face ID",
    all_depts: "Barcha kafedralar",
  },
  ru: {
    univ: "Университет информационных технологий и менеджмента",
    student: "Студент",
    staff: "Сотрудник",
    elib: "Э-Биб",
    alumni: "Выпускники",
    news_service: "Информационная служба",
    university: "Университет",
    education: "Образование",
    science: "Наука",
    international: "Международные связи",
    morality: "Духовность",
    admission: "Приёмная комиссия",
    elibrary: "Электронная библиотека",
    search_ph: "Поиск...",
    login: "Войти",
    about_univ: "Об университете",
    leadership: "Руководство",
    structure: "Структура",
    faculties: "Факультеты",
    departments: "Кафедры",
    official_docs: "Официальные документы",
    bachelor: "Бакалавриат",
    master: "Магистратура",
    distance: "Заочное обучение",
    schedule: "Расписание",
    hemis: "HEMIS",
    moodle: "Moodle",
    sci_centers: "Научные центры",
    sci_projects: "Научные проекты",
    conferences: "Конференции",
    dissertations: "Диссертации",
    articles: "Статьи",
    smart_lib: "Smart UniLibrary",
    e_catalog: "Электронный каталог",
    dept_lib: "Кафедральные библиотеки",
    book_reserve: "Бронирование книги",
    room_reserve: "Бронирование зала",
    ai_lib: "AI библиотекарь",
    face_id: "Face ID",
    all_depts: "Все кафедры",
  },
  en: {
    univ: "University of Information Technologies and Management",
    student: "Student",
    staff: "Staff",
    elib: "E-Lib",
    alumni: "Alumni",
    news_service: "News Service",
    university: "University",
    education: "Education",
    science: "Science",
    international: "International",
    morality: "Spirituality",
    admission: "Admissions",
    elibrary: "E-Library",
    search_ph: "Search...",
    login: "Login",
    about_univ: "About University",
    leadership: "Leadership",
    structure: "Structure",
    faculties: "Faculties",
    departments: "Departments",
    official_docs: "Official Documents",
    bachelor: "Bachelor",
    master: "Master",
    distance: "Distance Learning",
    schedule: "Schedule",
    hemis: "HEMIS",
    moodle: "Moodle",
    sci_centers: "Scientific Centers",
    sci_projects: "Scientific Projects",
    conferences: "Conferences",
    dissertations: "Dissertations",
    articles: "Articles",
    smart_lib: "Smart UniLibrary",
    e_catalog: "E-Catalog",
    dept_lib: "Department Libraries",
    book_reserve: "Book Reservation",
    room_reserve: "Reading Room Booking",
    ai_lib: "AI Librarian",
    face_id: "Face ID",
    all_depts: "All departments",
  },
  tr: {
    univ: "Bilgi Teknolojileri ve Yönetim Üniversitesi",
    student: "Öğrenci",
    staff: "Personel",
    elib: "E-Kütüp",
    alumni: "Mezunlar",
    news_service: "Haber Servisi",
    university: "Üniversite",
    education: "Eğitim",
    science: "Bilim",
    international: "Uluslararası",
    morality: "Maneviyat",
    admission: "Kabul Komisyonu",
    elibrary: "E-Kütüphane",
    search_ph: "Ara...",
    login: "Giriş",
    about_univ: "Üniversite Hakkında",
    leadership: "Yönetim",
    structure: "Yapı",
    faculties: "Fakülteler",
    departments: "Bölümler",
    official_docs: "Resmi Belgeler",
    bachelor: "Lisans",
    master: "Yüksek Lisans",
    distance: "Uzaktan Eğitim",
    schedule: "Ders Programı",
    hemis: "HEMIS",
    moodle: "Moodle",
    sci_centers: "Bilim Merkezleri",
    sci_projects: "Bilimsel Projeler",
    conferences: "Konferanslar",
    dissertations: "Tezler",
    articles: "Makaleler",
    smart_lib: "Smart UniLibrary",
    e_catalog: "E-Katalog",
    dept_lib: "Bölüm Kütüphaneleri",
    book_reserve: "Kitap Rezervasyonu",
    room_reserve: "Okuma Salonu Rezervasyonu",
    ai_lib: "AI Kütüphaneci",
    face_id: "Face ID",
    all_depts: "Tüm bölümler",
  },
};

const DEPARTMENTS = [
  { slug: "axborot-texnologiyalari", icon: <Cpu size={15} />, uz: "Axborot texnologiyalari kafedrasi", ru: "Кафедра ИТ", en: "IT Department" },
  { slug: "iqtisodiyot", icon: <Building size={15} />, uz: "Iqtisodiyot kafedrasi", ru: "Кафедра экономики", en: "Economics Dept." },
  { slug: "matematika", icon: <Microscope size={15} />, uz: "Matematika kafedrasi", ru: "Кафедра математики", en: "Mathematics Dept." },
  { slug: "filologiya", icon: <Globe2 size={15} />, uz: "Filologiya kafedrasi", ru: "Кафедра филологии", en: "Philology Dept." },
  { slug: "tarix", icon: <Award size={15} />, uz: "Tarix kafedrasi", ru: "Кафедра истории", en: "History Dept." },
  { slug: "pedagogika", icon: <GraduationCap size={15} />, uz: "Pedagogika kafedrasi", ru: "Кафедра педагогики", en: "Pedagogy Dept." },
];

export default function Header() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [megaOpen, setMegaOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const L = T[locale] || T.uz;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
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

  const getDeptName = (d: (typeof DEPARTMENTS)[0]) => {
    if (locale === "ru") return d.ru;
    if (locale === "en") return d.en;
    return d.uz;
  };

  const openMenu = (key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(key);
  };

  const closeMenu = () => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 120);
  };

  const MEGA_MENUS: Record<string, { title: string; items: { icon: React.ReactNode; label: string; href: string }[] }[]> = {
    university: [
      {
        title: L.university,
        items: [
          { icon: <Building size={14} />, label: L.about_univ, href: "/about" },
          { icon: <User size={14} />, label: L.leadership, href: "/leadership" },
          { icon: <Grid3X3 size={14} />, label: L.structure, href: "/structure" },
          { icon: <GraduationCap size={14} />, label: L.faculties, href: "/faculties" },
          { icon: <BookOpen size={14} />, label: L.departments, href: "/departments" },
          { icon: <FileText size={14} />, label: L.official_docs, href: "/documents" },
        ],
      },
    ],
    education: [
      {
        title: L.education,
        items: [
          { icon: <GraduationCap size={14} />, label: L.bachelor, href: "/bachelor" },
          { icon: <Award size={14} />, label: L.master, href: "/master" },
          { icon: <Globe2 size={14} />, label: L.distance, href: "/distance" },
          { icon: <Calendar size={14} />, label: L.schedule, href: "/schedule" },
          { icon: <Cpu size={14} />, label: L.hemis, href: "/hemis" },
          { icon: <Library size={14} />, label: L.moodle, href: "/moodle" },
        ],
      },
    ],
    science: [
      {
        title: L.science,
        items: [
          { icon: <FlaskConical size={14} />, label: L.sci_centers, href: "/science/centers" },
          { icon: <Microscope size={14} />, label: L.sci_projects, href: "/science/projects" },
          { icon: <Calendar size={14} />, label: L.conferences, href: "/science/conferences" },
          { icon: <FileText size={14} />, label: L.dissertations, href: "/science/dissertations" },
          { icon: <BookMarked size={14} />, label: L.articles, href: "/science/articles" },
        ],
      },
    ],
    elibrary: [
      {
        title: L.elibrary,
        items: [
          { icon: <Library size={14} />, label: L.smart_lib, href: "/" },
          { icon: <BookOpen size={14} />, label: L.e_catalog, href: "/catalog" },
          { icon: <Building size={14} />, label: L.dept_lib, href: "/departments" },
          { icon: <BookMarked size={14} />, label: L.book_reserve, href: "/catalog" },
          { icon: <MapPin size={14} />, label: L.room_reserve, href: "/library/reading-room" },
          { icon: <Bot size={14} />, label: L.ai_lib, href: "/ai" },
          { icon: <Brain size={14} />, label: L.face_id, href: "/profile" },
        ],
      },
    ],
  };

  const NAV = [
    { key: "news_service", label: L.news_service, href: "/news", mega: null },
    { key: "university", label: L.university, href: "/about", mega: "university" },
    { key: "education", label: L.education, href: "/education", mega: "education" },
    { key: "science", label: L.science, href: "/science", mega: "science" },
    { key: "international", label: L.international, href: "/international", mega: null },
    { key: "morality", label: L.morality, href: "/morality", mega: null },
    { key: "admission", label: L.admission, href: "/admission", mega: null },
    { key: "elibrary", label: L.elibrary, href: "/catalog", mega: "elibrary" },
  ];

  return (
    <header className="w-full sticky top-0 z-50 shadow-xl">
      {/* ── Row 1: Topbar ─────────────────────────────── */}
      <div className="bg-[#040D1A] border-b border-white/5 hidden md:block">
        <div className="max-w-[1280px] mx-auto px-4 h-9 flex items-center justify-between text-[11px] text-white/55">
          <div className="flex items-center gap-6">
            <span className="font-semibold text-yellow-400/90 tracking-wide">ATMU</span>
            <span className="text-white/30">|</span>
            <a href="/student-portal" className="hover:text-white transition-colors flex items-center gap-1">
              <User size={11} />{L.student}
            </a>
            <a href="/staff-portal" className="hover:text-white transition-colors flex items-center gap-1">
              <Building size={11} />{L.staff}
            </a>
            <a href="/catalog" className="hover:text-yellow-300 transition-colors flex items-center gap-1">
              <Library size={11} />{L.elib}
            </a>
            <a href="/alumni" className="hover:text-white transition-colors flex items-center gap-1">
              <Award size={11} />{L.alumni}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <button title="Ko'rish imkoniyati" className="hover:text-white p-1 transition-colors">
              <Eye size={12} />
            </button>
            <div className="flex items-center gap-0.5 ml-1">
              {LOCALES.map((loc) => (
                <button
                  key={loc.code}
                  onClick={() => switchLocale(loc.code)}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors ${
                    locale === loc.code
                      ? "bg-yellow-400/90 text-[#040D1A]"
                      : "text-white/40 hover:text-white/80"
                  }`}
                >
                  {loc.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Row 2: Logo + University Name ─────────────── */}
      <div
        className="text-white"
        style={{ background: "linear-gradient(90deg,#061B3A 0%,#0B3D73 55%,#1058A0 100%)", borderBottom: "3px solid #D6A84F" }}
      >
        <div className="max-w-[1280px] mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* Logo + name */}
          <Link href="/" className="flex items-center gap-4 group flex-shrink-0">
            <div className="w-[58px] h-[58px] rounded-full bg-white/95 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform flex-shrink-0 overflow-hidden">
              <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[50px] h-[50px]">
                <circle cx="28" cy="28" r="28" fill="#061B3A"/>
                <path d="M14 20 L28 12 L42 20 L42 36 L28 44 L14 36 Z" fill="#1457A8" opacity="0.45"/>
                <path d="M28 16 L38 22 V34 L28 40 L18 34 V22 Z" fill="#0B3D73"/>
                <text x="28" y="32" textAnchor="middle" fill="#D6A84F" fontSize="11" fontWeight="bold" fontFamily="Arial">AT</text>
                <circle cx="28" cy="28" r="26" stroke="#D6A84F" strokeWidth="0.8" fill="none" strokeDasharray="3 3"/>
              </svg>
            </div>
            <div>
              <div className="text-yellow-300/85 text-[9px] font-semibold uppercase tracking-widest mb-0.5">
                {L.univ}
              </div>
              <div className="text-white font-bold text-[17px] leading-tight tracking-wide">
                ATMU Smart University
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-white/35 text-[9px] tracking-wide">Smart UniLibrary</span>
                <span className="w-1 h-1 rounded-full bg-yellow-400/50" />
                <span className="text-white/35 text-[9px] tracking-wide">Digital University</span>
              </div>
            </div>
          </Link>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-2">
            {searchOpen ? (
              <div className="flex items-center bg-white/10 border border-white/25 rounded-lg overflow-hidden w-64">
                <Search size={14} className="ml-3 text-white/50 flex-shrink-0" />
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
                  placeholder={L.search_ph}
                  className="flex-1 bg-transparent text-white placeholder-white/35 text-sm px-2 py-2 outline-none"
                />
                <button onClick={() => setSearchOpen(false)} className="px-3 text-white/50 hover:text-white">
                  <X size={13} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/15 text-white/70 hover:text-white text-[13px] px-3 py-2 rounded-lg transition-colors"
              >
                <Search size={14} />
              </button>
            )}
            <Link
              href="/login"
              className="flex items-center gap-1.5 bg-yellow-400 hover:bg-yellow-300 text-[#061B3A] font-bold text-[13px] px-5 py-2 rounded-lg transition-colors"
            >
              <LogIn size={14} />
              {L.login}
            </Link>
            <button className="flex items-center justify-center w-9 h-9 bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/15">
              <Grid3X3 size={15} className="text-white/70" />
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-white p-2 rounded-lg bg-white/10"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Row 3: Main Navigation ─────────────────────── */}
      <div className="bg-[#0B3D73] border-b border-white/10 hidden lg:block" ref={navRef}>
        <div className="max-w-[1280px] mx-auto px-4">
          <nav className="flex items-center">
            {NAV.map((item) => (
              <div
                key={item.key}
                className="nav-item relative"
                onMouseEnter={() => item.mega ? openMenu(item.key) : undefined}
                onMouseLeave={() => item.mega ? closeMenu() : undefined}
              >
                {item.mega ? (
                  <button
                    className={`flex items-center gap-1 px-3.5 py-3.5 text-[12.5px] font-medium transition-colors whitespace-nowrap
                      ${activeMenu === item.key ? "text-yellow-300 bg-white/8" : "text-white/80 hover:text-yellow-300 hover:bg-white/5"}
                      ${pathname.startsWith(item.href) ? "text-yellow-300 border-b-2 border-yellow-300" : ""}
                    `}
                  >
                    {item.label}
                    <ChevronDown size={11} className="opacity-60" />
                  </button>
                ) : (
                  <Link
                    href={item.href as "/news" | "/about" | "/education" | "/science" | "/international" | "/morality" | "/admission" | "/catalog"}
                    className={`flex items-center px-3.5 py-3.5 text-[12.5px] font-medium transition-colors whitespace-nowrap
                      ${pathname === item.href ? "text-yellow-300 border-b-2 border-yellow-300" : "text-white/80 hover:text-yellow-300 hover:bg-white/5"}
                    `}
                  >
                    {item.label}
                  </Link>
                )}

                {/* Mega dropdown */}
                {item.mega && activeMenu === item.key && MEGA_MENUS[item.mega] && (
                  <div
                    className="absolute top-full left-0 bg-white border-t-3 shadow-2xl rounded-b-xl z-50 py-5 min-w-[260px]"
                    style={{ borderTop: "3px solid #1457A8" }}
                    onMouseEnter={() => openMenu(item.key)}
                    onMouseLeave={() => closeMenu()}
                  >
                    {MEGA_MENUS[item.mega].map((col) => (
                      <div key={col.title} className="px-4">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 pb-1 border-b border-gray-100">
                          {col.title}
                        </div>
                        {item.key === "university" && (
                          <div className="mb-2">
                            <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{L.all_depts}</div>
                            <div className="grid grid-cols-1 gap-0.5 mb-3">
                              {DEPARTMENTS.map((dept) => (
                                <Link
                                  key={dept.slug}
                                  href={`/departments/${dept.slug}` as `/departments/${string}`}
                                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-blue-50 text-[12px] text-gray-700 hover:text-[#1457A8] transition-colors"
                                >
                                  <span className="text-[#1457A8]">{dept.icon}</span>
                                  {getDeptName(dept)}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                        <div className="space-y-0.5">
                          {col.items.map((it) => (
                            <Link
                              key={it.label}
                              href={it.href as "/about" | "/leadership" | "/structure" | "/faculties" | "/departments" | "/documents" | "/bachelor" | "/master" | "/distance" | "/schedule" | "/hemis" | "/moodle" | "/science/centers" | "/science/projects" | "/science/conferences" | "/science/dissertations" | "/science/articles" | "/" | "/catalog" | "/library/reading-room" | "/ai" | "/profile"}
                              className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-blue-50 text-[13px] text-gray-700 hover:text-[#1457A8] transition-colors"
                            >
                              <span className="text-[#1457A8] flex-shrink-0">{it.icon}</span>
                              {it.label}
                              <ChevronRight size={10} className="ml-auto text-gray-300" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* ── Mobile Drawer ──────────────────────────────── */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-[200] bg-[#061B3A] overflow-y-auto">
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <span className="text-white font-bold text-sm">ATMU Smart University</span>
            <button onClick={() => setMobileOpen(false)} className="text-white p-1">
              <X size={22} />
            </button>
          </div>
          <div className="p-4 space-y-1">
            {NAV.map((item) => (
              <Link
                key={item.key}
                href={item.href as "/news" | "/about" | "/education" | "/science" | "/international" | "/morality" | "/admission" | "/catalog"}
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
                className="flex items-center justify-center gap-2 bg-yellow-400 text-[#061B3A] font-bold px-4 py-3 rounded-lg w-full text-sm"
              >
                <LogIn size={16} />
                {L.login}
              </Link>
            </div>
            <div className="pt-3 flex gap-2 flex-wrap">
              {LOCALES.map((loc) => (
                <button
                  key={loc.code}
                  onClick={() => { switchLocale(loc.code); setMobileOpen(false); }}
                  className={`px-3 py-1.5 rounded text-xs font-bold ${
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
