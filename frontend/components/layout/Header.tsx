"use client";
import { useState } from "react";
import { useLocale } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { isAuthenticated, getUser, clearAuth } from "@/lib/auth";
import {
  Search, User, Menu, X, ChevronDown, ChevronRight,
  Globe, BookOpen, Eye, LogOut, LayoutGrid
} from "lucide-react";

type Locale = "uz" | "ru" | "en" | "tr";

const LANGS: { code: Locale; label: string }[] = [
  { code: "uz", label: "O'zbek" },
  { code: "ru", label: "Русский" },
  { code: "en", label: "English" },
  { code: "tr", label: "Türkçe" },
];

const NAV_ITEMS = [
  {
    key: "news", label: { uz: "Axborot xizmati", ru: "Пресс-служба", en: "Press Service", tr: "Basın" },
    children: [
      { label: { uz: "Yangiliklar", ru: "Новости", en: "News", tr: "Haberler" }, href: "/" },
      { label: { uz: "E'lonlar", ru: "Объявления", en: "Announcements", tr: "Duyurular" }, href: "/" },
    ],
  },
  {
    key: "university", label: { uz: "Universitet", ru: "Университет", en: "University", tr: "Üniversite" },
    children: [
      { label: { uz: "Tarix", ru: "История", en: "History", tr: "Tarih" }, href: "/" },
      { label: { uz: "Rahbariyat", ru: "Руководство", en: "Leadership", tr: "Yönetim" }, href: "/" },
      { label: { uz: "Tuzilma", ru: "Структура", en: "Structure", tr: "Yapı" }, href: "/" },
      { label: { uz: "Hujjatlar", ru: "Документы", en: "Documents", tr: "Belgeler" }, href: "/" },
    ],
  },
  {
    key: "education", label: { uz: "Ta'lim", ru: "Образование", en: "Education", tr: "Eğitim" },
    children: [
      { label: { uz: "Bakalavriat", ru: "Бакалавриат", en: "Bachelor", tr: "Lisans" }, href: "/" },
      { label: { uz: "Magistratura", ru: "Магистратура", en: "Master", tr: "Lisansüstü" }, href: "/" },
      { label: { uz: "Kafedralar", ru: "Кафедры", en: "Departments", tr: "Bölümler" }, href: "/departments" },
      { label: { uz: "Dars jadvali", ru: "Расписание", en: "Schedule", tr: "Program" }, href: "/" },
    ],
  },
  {
    key: "science", label: { uz: "Ilm-fan", ru: "Наука", en: "Science", tr: "Bilim" },
    children: [
      { label: { uz: "Ilmiy markazlar", ru: "Научные центры", en: "Research Centers", tr: "Araştırma" }, href: "/" },
      { label: { uz: "Nashrlar", ru: "Публикации", en: "Publications", tr: "Yayınlar" }, href: "/" },
    ],
  },
  { key: "international", label: { uz: "Xalqaro aloqalar", ru: "Международные", en: "International", tr: "Uluslararası" }, children: [] },
  { key: "spirituality", label: { uz: "Ma'naviyat", ru: "Духовность", en: "Spirituality", tr: "Maneviyat" }, children: [] },
  { key: "admission", label: { uz: "Qabul", ru: "Приёмная", en: "Admission", tr: "Kabul" }, children: [] },
  {
    key: "elibrary", label: { uz: "Elektron kutubxona", ru: "Эл. библиотека", en: "E-Library", tr: "E-Kütüphane" },
    children: [
      { label: { uz: "Elektron katalog", ru: "Эл. каталог", en: "E-Catalog", tr: "E-Katalog" }, href: "/catalog" },
      { label: { uz: "O'quv zali", ru: "Читальный зал", en: "Reading Room", tr: "Okuma Salonu" }, href: "/library/reading-room" },
      { label: { uz: "AI kutubxonachi", ru: "ИИ-библиотекарь", en: "AI Librarian", tr: "AI Kütüphaneci" }, href: "/ai" },
    ],
  },
];

export default function Header() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const [userOpen, setUserOpen] = useState(false);
  const authenticated = isAuthenticated();
  const user = authenticated ? getUser() : null;

  const switchLang = (code: Locale) => {
    router.push("/", { locale: code });
    setLangOpen(false);
  };
  const handleLogout = () => { clearAuth(); router.push("/"); setUserOpen(false); };
  const currentLang = LANGS.find(l => l.code === locale) || LANGS[0];
  const t = (obj: Record<string, string>) => obj[locale] || obj.uz;

  return (
    <>
      {/* ===== TOP BAR ===== */}
      <header className="portal-topbar">
        <div className="max-w-[1680px] mx-auto px-4 h-full flex items-center gap-3">
          {/* Logo + Brand */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-white/15 border border-white/20">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <div className="text-white font-black text-[14px] leading-tight tracking-wider">ATMU</div>
              <div className="text-white/50 text-[9px] leading-tight font-medium uppercase tracking-widest">Smart UniLibrary</div>
            </div>
          </Link>

          {/* University name center */}
          <div className="hidden xl:block flex-1 text-center px-4">
            <div className="text-white font-semibold text-[13px]">
              {locale === "uz" && "Axborot texnologiyalari va menejment universiteti"}
              {locale === "ru" && "Университет информационных технологий и менеджмента"}
              {locale === "en" && "University of Information Technology and Management"}
              {locale === "tr" && "Bilgi Teknolojileri ve Yönetim Üniversitesi"}
            </div>
            <div className="text-white/40 text-[10px] mt-0.5">Qarshi, O'zbekiston · Digital University</div>
          </div>

          {/* Right actions */}
          <div className="ml-auto flex items-center gap-0.5">
            {[
              { href: "/dashboard/student", label: { uz: "Talaba", ru: "Студент", en: "Student", tr: "Öğrenci" } },
              { href: "/dashboard/teacher", label: { uz: "Xodim", ru: "Сотрудник", en: "Staff", tr: "Personel" } },
              { href: "/catalog", label: { uz: "E-Lib", ru: "Э-Биб", en: "E-Lib", tr: "E-Ktp" } },
            ].map(item => (
              <Link key={item.href} href={item.href}
                className="hidden md:block text-white/65 hover:text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors">
                {t(item.label)}
              </Link>
            ))}

            <span className="w-px h-5 bg-white/15 mx-1.5 hidden md:block" />

            <button className="w-8 h-8 flex items-center justify-center text-white/55 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
              <Eye size={14} />
            </button>

            <button onClick={() => setSearchOpen(!searchOpen)}
              className="w-8 h-8 flex items-center justify-center text-white/55 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
              <Search size={14} />
            </button>

            {/* Language dropdown */}
            <div className="relative">
              <button onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 px-2.5 py-1.5 text-white/65 hover:text-white hover:bg-white/10 rounded-lg text-[11px] font-bold transition-colors">
                <Globe size={12} />
                {currentLang.code.toUpperCase()}
                <ChevronDown size={10} />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-1 w-36 bg-white rounded-xl shadow-2xl border border-gray-100 py-1 z-[200]">
                  {LANGS.map(lang => (
                    <button key={lang.code} onClick={() => switchLang(lang.code)}
                      className={`w-full text-left px-3 py-2 text-[12px] hover:bg-blue-50 transition-colors ${lang.code === locale ? "text-[#00579f] font-bold" : "text-gray-700"}`}>
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User */}
            <div className="relative">
              <button onClick={() => setUserOpen(!userOpen)}
                className="w-8 h-8 flex items-center justify-center text-white/55 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                <User size={14} />
              </button>
              {userOpen && (
                <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl shadow-2xl border border-gray-100 py-1 z-[200]">
                  {authenticated ? (
                    <>
                      <div className="px-3 py-2 border-b border-gray-100">
                        <div className="text-[12px] font-semibold text-gray-800 truncate">{user?.full_name}</div>
                        <div className="text-[10px] text-gray-400 capitalize">{user?.role}</div>
                      </div>
                      <Link href="/profile" onClick={() => setUserOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-[12px] text-gray-700 hover:bg-blue-50 transition-colors">
                        <User size={12} />{locale === "uz" ? "Profil" : locale === "ru" ? "Профиль" : "Profile"}
                      </Link>
                      <button onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 text-[12px] text-red-600 hover:bg-red-50 transition-colors">
                        <LogOut size={12} />{locale === "uz" ? "Chiqish" : "Выйти"}
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href="/auth/login" onClick={() => setUserOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-[12px] text-gray-700 hover:bg-blue-50 transition-colors">
                        <User size={12} />{locale === "uz" ? "Kirish" : locale === "ru" ? "Войти" : "Login"}
                      </Link>
                      <Link href="/auth/register" onClick={() => setUserOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-[12px] text-gray-700 hover:bg-blue-50 transition-colors">
                        {locale === "uz" ? "Ro'yxatdan o'tish" : "Регистрация"}
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-8 h-8 flex items-center justify-center text-white/65 hover:text-white hover:bg-white/10 rounded-lg transition-colors ml-1">
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="bg-[#001428] border-t border-white/10 px-4 py-3">
            <div className="max-w-[1680px] mx-auto flex gap-2 max-w-xl">
              <input autoFocus value={searchQ} onChange={e => setSearchQ(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && searchQ.trim()) { router.push(`/catalog?search=${encodeURIComponent(searchQ)}`); setSearchOpen(false); }}}
                placeholder={locale === "uz" ? "Qidirish..." : locale === "ru" ? "Поиск..." : "Search..."}
                className="flex-1 max-w-lg bg-white/10 text-white placeholder-white/40 px-4 py-2 rounded-xl text-[13px] border border-white/20 focus:outline-none focus:border-white/40" />
              <button onClick={() => { if (searchQ.trim()) { router.push(`/catalog?search=${encodeURIComponent(searchQ)}`); setSearchOpen(false); }}}
                className="bg-[#e8a820] text-[#001d3d] font-bold px-4 py-2 rounded-xl text-[13px] hover:bg-yellow-300 transition-colors">
                {locale === "uz" ? "Izla" : locale === "ru" ? "Найти" : "Search"}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ===== MAIN NAV ===== */}
      <nav className="portal-mainnav hidden lg:block">
        <div className="max-w-[1680px] mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex items-stretch h-full">
            {NAV_ITEMS.map(item => (
              <div key={item.key} className="nav-item relative flex items-stretch">
                <button className="nav-link flex items-center gap-1">
                  {t(item.label)}
                  {item.children.length > 0 && <ChevronDown size={10} className="opacity-50" />}
                </button>
                {item.children.length > 0 && (
                  <div className="mega-menu">
                    <div className="max-w-[1680px] mx-auto px-6 py-5 grid grid-cols-4 gap-1">
                      {item.children.map((child, i) => (
                        <Link key={i} href={child.href}
                          className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-[13px] text-gray-700 hover:bg-blue-50 hover:text-[#00579f] transition-colors font-medium">
                          <ChevronRight size={12} className="text-[#00579f] opacity-50" />
                          {t(child.label)}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <button className="text-white/50 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-colors">
            <LayoutGrid size={15} />
          </button>
        </div>
      </nav>

      {/* ===== MOBILE DRAWER ===== */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-[300] flex">
          <div className="flex-1 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="w-72 bg-[#001d3d] h-full overflow-y-auto">
            <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
              <span className="text-white font-bold text-[13px]">ATMU</span>
              <button onClick={() => setMobileOpen(false)} className="text-white/60 hover:text-white"><X size={20} /></button>
            </div>
            {NAV_ITEMS.map(item => (
              <div key={item.key} className="border-b border-white/5">
                <div className="px-4 py-3 text-white/80 font-semibold text-[13px]">{t(item.label)}</div>
                {item.children.map((child, i) => (
                  <Link key={i} href={child.href} onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-6 py-2.5 text-white/55 hover:text-white text-[12px]">
                    <ChevronRight size={11} />{t(child.label)}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
