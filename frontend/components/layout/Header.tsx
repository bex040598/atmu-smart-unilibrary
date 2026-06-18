"use client";
import { useState } from "react";
import { useLocale } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { isAuthenticated, getUser, clearAuth } from "@/lib/auth";
import {
  Search, User, Menu, X, ChevronDown, ChevronRight,
  Globe, BookOpen, Eye, LogOut, LayoutGrid,
  GraduationCap, UserCheck, BookMarked, CalendarCheck, Bell
} from "lucide-react";

type Locale = "uz" | "ru" | "en" | "tr";

const LANGS: { code: Locale; label: string; flag: string }[] = [
  { code: "uz", label: "O'zbek", flag: "🇺🇿" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "tr", label: "Türkçe", flag: "🇹🇷" },
];

const NAV_ITEMS = [
  {
    key: "news",
    label: { uz: "Axborot xizmati", ru: "Пресс-служба", en: "Press Service", tr: "Basın" },
    children: [
      { label: { uz: "Yangiliklar", ru: "Новости", en: "News", tr: "Haberler" }, href: "/" },
      { label: { uz: "E'lonlar", ru: "Объявления", en: "Announcements", tr: "Duyurular" }, href: "/" },
      { label: { uz: "Tadbirlar", ru: "Мероприятия", en: "Events", tr: "Etkinlikler" }, href: "/" },
      { label: { uz: "Fotogalereya", ru: "Фотогалерея", en: "Gallery", tr: "Galeri" }, href: "/" },
    ],
  },
  {
    key: "university",
    label: { uz: "Universitet", ru: "Университет", en: "University", tr: "Üniversite" },
    children: [
      { label: { uz: "Universitet haqida", ru: "Об университете", en: "About", tr: "Hakkında" }, href: "/" },
      { label: { uz: "Tarix", ru: "История", en: "History", tr: "Tarih" }, href: "/" },
      { label: { uz: "Rahbariyat", ru: "Руководство", en: "Leadership", tr: "Yönetim" }, href: "/" },
      { label: { uz: "Tuzilma", ru: "Структура", en: "Structure", tr: "Yapı" }, href: "/" },
      { label: { uz: "Hujjatlar", ru: "Документы", en: "Documents", tr: "Belgeler" }, href: "/" },
      { label: { uz: "Nizom", ru: "Устав", en: "Charter", tr: "Tüzük" }, href: "/" },
    ],
  },
  {
    key: "education",
    label: { uz: "Ta'lim", ru: "Образование", en: "Education", tr: "Eğitim" },
    children: [
      { label: { uz: "Bakalavriat", ru: "Бакалавриат", en: "Bachelor", tr: "Lisans" }, href: "/" },
      { label: { uz: "Magistratura", ru: "Магистратура", en: "Master's", tr: "Yüksek Lisans" }, href: "/" },
      { label: { uz: "Fakultetlar", ru: "Факультеты", en: "Faculties", tr: "Fakülteler" }, href: "/" },
      { label: { uz: "Kafedralar", ru: "Кафедры", en: "Departments", tr: "Bölümler" }, href: "/departments" },
      { label: { uz: "Dars jadvali", ru: "Расписание", en: "Schedule", tr: "Program" }, href: "/" },
      { label: { uz: "Qabul", ru: "Приёмная", en: "Admission", tr: "Kabul" }, href: "/" },
    ],
  },
  {
    key: "science",
    label: { uz: "Ilm-fan", ru: "Наука", en: "Science", tr: "Bilim" },
    children: [
      { label: { uz: "Ilmiy markazlar", ru: "Научные центры", en: "Research Centers", tr: "Araştırma" }, href: "/" },
      { label: { uz: "Nashrlar", ru: "Публикации", en: "Publications", tr: "Yayınlar" }, href: "/" },
      { label: { uz: "Dissertatsiyalar", ru: "Диссертации", en: "Dissertations", tr: "Tezler" }, href: "/" },
      { label: { uz: "Konferentsiyalar", ru: "Конференции", en: "Conferences", tr: "Konferanslar" }, href: "/" },
    ],
  },
  {
    key: "international",
    label: { uz: "Xalqaro aloqalar", ru: "Международные", en: "International", tr: "Uluslararası" },
    children: [
      { label: { uz: "Hamkorlar", ru: "Партнёры", en: "Partners", tr: "Ortaklar" }, href: "/" },
      { label: { uz: "Xalqaro dasturlar", ru: "Межд. программы", en: "Int'l Programs", tr: "Ulusl. Programlar" }, href: "/" },
      { label: { uz: "Akademik almashinuv", ru: "Акад. обмен", en: "Exchange", tr: "Değişim" }, href: "/" },
    ],
  },
  {
    key: "spirituality",
    label: { uz: "Ma'naviyat", ru: "Духовность", en: "Spirituality", tr: "Maneviyat" },
    children: [
      { label: { uz: "Yoshlar siyosati", ru: "Молодёжная политика", en: "Youth Policy", tr: "Gençlik Politikası" }, href: "/" },
      { label: { uz: "Madaniy tadbirlar", ru: "Культурные мероприятия", en: "Cultural Events", tr: "Kültürel Etkinlikler" }, href: "/" },
    ],
  },
  {
    key: "admission",
    label: { uz: "Qabul", ru: "Приёмная", en: "Admission", tr: "Kabul" },
    children: [
      { label: { uz: "Qabul qoidalari", ru: "Правила приёма", en: "Admission Rules", tr: "Kabul Kuralları" }, href: "/" },
      { label: { uz: "Yo'nalishlar ro'yxati", ru: "Список направлений", en: "Programs List", tr: "Program Listesi" }, href: "/" },
      { label: { uz: "Onlayn ariza", ru: "Онлайн заявка", en: "Online Apply", tr: "Online Başvuru" }, href: "/" },
    ],
  },
  {
    key: "elibrary",
    label: { uz: "E-Kutubxona", ru: "Эл. библиотека", en: "E-Library", tr: "E-Kütüphane" },
    children: [
      { label: { uz: "Elektron katalog", ru: "Эл. каталог", en: "E-Catalog", tr: "E-Katalog" }, href: "/catalog" },
      { label: { uz: "O'quv zali bron", ru: "Читальный зал", en: "Reading Room", tr: "Okuma Salonu" }, href: "/library/reading-room" },
      { label: { uz: "AI kutubxonachi", ru: "ИИ-библиотекарь", en: "AI Librarian", tr: "AI Kütüphaneci" }, href: "/ai" },
    ],
  },
];

export default function Header() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const [userOpen, setUserOpen] = useState(false);
  const [openNav, setOpenNav] = useState<string | null>(null);

  const authenticated = isAuthenticated();
  const user = authenticated ? getUser() : null;
  const role = user?.role || "";

  const switchLang = (code: Locale) => { router.push("/", { locale: code }); setLangOpen(false); };
  const handleLogout = () => { clearAuth(); router.push("/"); setUserOpen(false); };
  const t = (obj: Record<string, string>) => obj[locale] || obj.uz;
  const currentLang = LANGS.find(l => l.code === locale) || LANGS[0];

  const profileHref = role === "student" ? "/profile" : role === "teacher" ? "/profile" : "/profile";
  const dashboardHref = role === "student" ? "/dashboard/student"
    : role === "teacher" ? "/dashboard/teacher"
    : role === "librarian" ? "/dashboard/librarian"
    : role === "admin" ? "/dashboard/admin"
    : "/profile";
  const dashboardLabel = role === "student"
    ? { uz: "Talaba kabineti", ru: "Кабинет студента", en: "Student Cabinet", tr: "Öğrenci Kabineti" }
    : role === "teacher"
    ? { uz: "O'qituvchi kabineti", ru: "Кабинет преподавателя", en: "Teacher Cabinet", tr: "Öğretmen Kabineti" }
    : { uz: "Boshqaruv paneli", ru: "Панель управления", en: "Dashboard", tr: "Kontrol Paneli" };

  return (
    <>
      {/* ===== TOP BAR ===== */}
      <header className="portal-topbar">
        <div className="max-w-[1680px] mx-auto px-4 sm:px-6 h-full flex items-center gap-3">
          {/* Logo + Brand */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-white/20 border border-white/25">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <div className="text-white font-black text-[13px] leading-tight tracking-wide uppercase">ATMU</div>
              <div className="text-white/55 text-[9px] font-semibold uppercase tracking-widest leading-tight">Rasmiy portal</div>
            </div>
          </Link>

          {/* University name — center */}
          <div className="hidden xl:block flex-1 text-center px-6">
            <div className="text-white font-semibold text-[13px] leading-snug">
              {locale === "uz" && "Axborot texnologiyalari va menejment universiteti"}
              {locale === "ru" && "Университет информационных технологий и менеджмента"}
              {locale === "en" && "University of Information Technology and Management"}
              {locale === "tr" && "Bilgi Teknolojileri ve Yönetim Üniversitesi"}
            </div>
            <div className="text-white/40 text-[10px] mt-0.5">
              Qarshi, O'zbekiston · Digital University
            </div>
          </div>

          {/* Right quick links */}
          <div className="ml-auto flex items-center gap-0.5">
            {[
              { href: "/dashboard/student", label: { uz: "Talaba", ru: "Студент", en: "Student", tr: "Öğrenci" } },
              { href: "/dashboard/teacher", label: { uz: "Xodim", ru: "Сотрудник", en: "Staff", tr: "Personel" } },
              { href: "/catalog", label: { uz: "E-Lib", ru: "Э-Биб", en: "E-Lib", tr: "E-Ktp" } },
            ].map(item => (
              <Link key={item.href} href={item.href}
                className="hidden md:block text-white/70 hover:text-white text-[11px] font-semibold px-2.5 py-1.5 rounded-lg hover:bg-white/12 transition-colors">
                {t(item.label)}
              </Link>
            ))}

            <span className="w-px h-5 bg-white/20 mx-1.5 hidden md:block" />

            {/* Accessibility */}
            <button className="w-8 h-8 flex items-center justify-center text-white/55 hover:text-white hover:bg-white/12 rounded-lg transition-colors" title="Ko'rish rejimi">
              <Eye size={14} />
            </button>

            {/* Search */}
            <button onClick={() => setSearchOpen(!searchOpen)}
              className="w-8 h-8 flex items-center justify-center text-white/55 hover:text-white hover:bg-white/12 rounded-lg transition-colors">
              <Search size={14} />
            </button>

            {/* Language */}
            <div className="relative">
              <button onClick={() => { setLangOpen(!langOpen); setUserOpen(false); }}
                className="flex items-center gap-1 px-2.5 py-1.5 text-white/70 hover:text-white hover:bg-white/12 rounded-lg text-[11px] font-bold transition-colors">
                <Globe size={12} />
                {currentLang.code.toUpperCase()}
                <ChevronDown size={10} />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-2 w-38 bg-white rounded-2xl shadow-2xl border border-gray-100 py-1.5 z-[500]">
                  {LANGS.map(lang => (
                    <button key={lang.code} onClick={() => switchLang(lang.code)}
                      className={`w-full flex items-center gap-2.5 text-left px-4 py-2.5 text-[12.5px] hover:bg-blue-50 transition-colors ${lang.code === locale ? "text-[#0069A8] font-bold" : "text-gray-700"}`}>
                      <span>{lang.flag}</span>{lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User / Avatar */}
            <div className="relative">
              <button onClick={() => { setUserOpen(!userOpen); setLangOpen(false); }}
                className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg transition-colors ${authenticated ? "bg-white/15 hover:bg-white/25 border border-white/25" : "text-white/55 hover:text-white hover:bg-white/12"}`}>
                {authenticated ? (
                  <>
                    <div className="w-6 h-6 rounded-full bg-[#F5B400] flex items-center justify-center text-[#002B4A] font-black text-[10px]">
                      {user?.full_name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    <span className="hidden sm:block text-white text-[11px] font-semibold max-w-[80px] truncate">{user?.full_name?.split(" ")[0]}</span>
                    <ChevronDown size={10} className="text-white/60" />
                  </>
                ) : (
                  <User size={14} />
                )}
              </button>

              {userOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-gray-100 py-1.5 z-[500]">
                  {authenticated ? (
                    <>
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-xl bg-[#0069A8] flex items-center justify-center text-white font-black text-[13px]">
                            {user?.full_name?.charAt(0)?.toUpperCase() || "U"}
                          </div>
                          <div className="min-w-0">
                            <div className="text-[13px] font-bold text-gray-800 truncate">{user?.full_name}</div>
                            <div className="text-[10px] text-[#0069A8] font-semibold capitalize">{role}</div>
                          </div>
                        </div>
                      </div>
                      {[
                        { href: profileHref, icon: <User size={13}/>, label: { uz: "Mening profilim", ru: "Мой профиль", en: "My Profile", tr: "Profilim" } },
                        { href: dashboardHref, icon: <LayoutGrid size={13}/>, label: dashboardLabel },
                        { href: "/catalog", icon: <BookMarked size={13}/>, label: { uz: "Mening kitoblarim", ru: "Мои книги", en: "My Books", tr: "Kitaplarım" } },
                        { href: "/library/reading-room", icon: <CalendarCheck size={13}/>, label: { uz: "O'quv zali bronlari", ru: "Брони зала", en: "Room Bookings", tr: "Salon Rezervasyonları" } },
                      ].map((item, i) => (
                        <Link key={i} href={item.href} onClick={() => setUserOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-[12.5px] text-gray-700 hover:bg-blue-50 hover:text-[#005a91] transition-colors">
                          <span className="text-[#0069A8]">{item.icon}</span>
                          {t(item.label)}
                        </Link>
                      ))}
                      <div className="border-t border-gray-100 mt-1 pt-1">
                        <button onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[12.5px] text-red-600 hover:bg-red-50 transition-colors">
                          <LogOut size={13} />
                          {locale === "uz" ? "Chiqish" : locale === "ru" ? "Выйти" : locale === "tr" ? "Çıkış" : "Logout"}
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="px-4 py-3 text-center border-b border-gray-100">
                        <div className="text-[12px] text-gray-500">
                          {locale === "uz" ? "Tizimga kirish kerak" : locale === "ru" ? "Войдите в систему" : "Please login"}
                        </div>
                      </div>
                      <Link href="/auth/login" onClick={() => setUserOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-[12.5px] text-gray-700 hover:bg-blue-50 transition-colors">
                        <User size={13} className="text-[#0069A8]" />
                        {locale === "uz" ? "Kirish" : locale === "ru" ? "Войти" : locale === "tr" ? "Giriş" : "Login"}
                      </Link>
                      <Link href="/auth/register" onClick={() => setUserOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-[12.5px] text-gray-700 hover:bg-blue-50 transition-colors">
                        <GraduationCap size={13} className="text-[#0069A8]" />
                        {locale === "uz" ? "Ro'yxatdan o'tish" : locale === "ru" ? "Регистрация" : locale === "tr" ? "Kayıt" : "Register"}
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-8 h-8 flex items-center justify-center text-white/65 hover:text-white hover:bg-white/12 rounded-lg transition-colors ml-1">
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="bg-[#004880] border-t border-white/15 px-4 py-3">
            <div className="max-w-[600px] mx-auto flex gap-2">
              <input autoFocus value={searchQ} onChange={e => setSearchQ(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && searchQ.trim()) { router.push(`/catalog?search=${encodeURIComponent(searchQ)}`); setSearchOpen(false); }}}
                placeholder={locale === "uz" ? "Qidirish: kitob, resurs, kafedra..." : locale === "ru" ? "Поиск: книга, ресурс, кафедра..." : "Search: book, resource, department..."}
                className="flex-1 bg-white/12 text-white placeholder-white/40 px-4 py-2 rounded-xl text-[13px] border border-white/20 focus:outline-none focus:border-white/40" />
              <button onClick={() => { if (searchQ.trim()) { router.push(`/catalog?search=${encodeURIComponent(searchQ)}`); setSearchOpen(false); }}}
                className="bg-[#F5B400] text-[#002B4A] font-bold px-4 py-2 rounded-xl text-[13px] hover:bg-yellow-300 transition-colors whitespace-nowrap">
                {locale === "uz" ? "Izla" : locale === "ru" ? "Найти" : "Search"}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ===== MAIN NAV ===== */}
      <nav className="portal-mainnav hidden lg:block">
        <div className="max-w-[1680px] mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
          <div className="flex items-stretch h-full">
            {NAV_ITEMS.map(item => (
              <div
                key={item.key}
                className="nav-item flex items-stretch"
                onMouseEnter={() => item.children.length > 0 && setOpenNav(item.key)}
                onMouseLeave={() => setOpenNav(null)}
              >
                <button
                  className="nav-link"
                  onClick={() => setOpenNav(openNav === item.key ? null : item.key)}
                >
                  {t(item.label)}
                  {item.children.length > 0 && (
                    <ChevronDown
                      size={10}
                      className={`opacity-50 ml-0.5 transition-transform duration-200 ${openNav === item.key ? "rotate-180" : ""}`}
                    />
                  )}
                </button>

                {/* JS-controlled dropdown — always mounted, visibility via style */}
                {item.children.length > 0 && (
                  <div
                    className="dropdown-menu"
                    style={{
                      opacity: openNav === item.key ? 1 : 0,
                      visibility: openNav === item.key ? "visible" : "hidden",
                      transform: openNav === item.key ? "translateY(0)" : "translateY(-6px)",
                      pointerEvents: openNav === item.key ? "auto" : "none",
                    }}
                    onMouseEnter={() => setOpenNav(item.key)}
                    onMouseLeave={() => setOpenNav(null)}
                  >
                    {item.children.map((child, i) => (
                      <Link key={i} href={child.href} onClick={() => setOpenNav(null)}>
                        {t(child.label)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <button className="text-white/50 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-colors" title="Barcha xizmatlar">
            <LayoutGrid size={15} />
          </button>
        </div>
      </nav>

      {/* ===== MOBILE DRAWER ===== */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-[300] flex">
          <div className="flex-1 bg-black/55" onClick={() => setMobileOpen(false)} />
          <div className="w-72 bg-[#002B4A] h-full overflow-y-auto flex flex-col">
            <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
              <span className="text-white font-black text-[14px]">ATMU Portal</span>
              <button onClick={() => setMobileOpen(false)} className="text-white/60 hover:text-white"><X size={20} /></button>
            </div>

            {NAV_ITEMS.map(item => (
              <div key={item.key} className="border-b border-white/6">
                <button
                  onClick={() => setMobileExpanded(mobileExpanded === item.key ? null : item.key)}
                  className="w-full flex items-center justify-between px-4 py-3 text-white/85 font-semibold text-[13px] hover:bg-white/5">
                  {t(item.label)}
                  <ChevronDown size={13} className={`transition-transform ${mobileExpanded === item.key ? "rotate-180" : ""}`} />
                </button>
                {mobileExpanded === item.key && item.children.map((child, i) => (
                  <Link key={i} href={child.href} onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-6 py-2.5 text-white/55 hover:text-white text-[12.5px]">
                    <ChevronRight size={11} />{t(child.label)}
                  </Link>
                ))}
              </div>
            ))}

            <div className="p-4 border-t border-white/10 mt-auto">
              {authenticated ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 px-2 py-2 text-white/70 text-[12px]">
                    <div className="w-7 h-7 rounded-lg bg-[#F5B400] flex items-center justify-center text-[#002B4A] font-black text-[11px]">
                      {user?.full_name?.charAt(0)?.toUpperCase()}
                    </div>
                    {user?.full_name}
                  </div>
                  <button onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-red-400 hover:bg-red-900/20 rounded-xl text-[12px]">
                    <LogOut size={13} /> {locale === "uz" ? "Chiqish" : "Выйти"}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link href="/auth/login" onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-1 py-2 bg-[#0069A8] text-white rounded-xl text-[12px] font-semibold">
                    <User size={12} />{locale === "uz" ? "Kirish" : "Войти"}
                  </Link>
                  <Link href="/auth/register" onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-1 py-2 bg-white/10 text-white rounded-xl text-[12px] font-semibold">
                    {locale === "uz" ? "Ro'yxat" : "Регистр."}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
