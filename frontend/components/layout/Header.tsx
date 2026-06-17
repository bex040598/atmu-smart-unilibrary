"use client";
import { useState, useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/navigation";
import { getUser, clearAuth, isAuthenticated } from "@/lib/auth";
import {
  BookOpen, Search, Globe, ChevronDown, LogOut, User,
  LayoutDashboard, BookMarked, Calendar, Shield, Zap,
  Bell, Menu, X, Library
} from "lucide-react";
import { cn } from "@/lib/utils";

const LOCALES = [
  { code: "uz", label: "O'zbekcha", flag: "🇺🇿" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "tr", label: "Türkçe", flag: "🇹🇷" },
];

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setUser(getUser());
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    clearAuth();
    setUser(null);
    setDropdownOpen(false);
    router.push("/");
  };

  const handleLocaleChange = (newLocale: string) => {
    setLangOpen(false);
    router.replace(pathname, { locale: newLocale });
  };

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/departments", label: t("departments") },
    { href: "/catalog", label: "Katalog" },
    { href: "/library/reading-room", label: "O'quv zali" },
    { href: "/ai", label: "AI" },
    { href: "/news", label: t("news") },
  ];

  return (
    <header className={cn(
      "sticky top-0 z-50 transition-all duration-300",
      scrolled
        ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100"
        : "bg-white border-b border-gray-200"
    )}>
      {/* Top bar */}
      <div className="bg-[#061B3A] text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="opacity-70">Axborot texnologiyalari va menejment universiteti</span>
          <div className="flex items-center gap-4 opacity-70">
            <span>📞 +998 71 123-45-67</span>
            <span>📧 info@atmu.uz</span>
            <a href="https://atmu.uz" target="_blank" rel="noreferrer" className="hover:opacity-100 underline">
              atmu.uz
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#061B3A] to-[#1457A8] flex items-center justify-center shadow-md">
              <Library className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-bold text-[#061B3A] leading-tight">ATMU</div>
              <div className="text-xs text-[#008C95] font-semibold leading-tight">Smart UniLibrary</div>
            </div>
          </Link>

          {/* Nav */}
          <nav className="hidden lg:flex items-center gap-1 ml-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#1457A8] hover:bg-blue-50 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex-1" />

          {/* Search icon */}
          <button className="p-2 text-gray-500 hover:text-[#1457A8] hover:bg-blue-50 rounded-lg transition-colors">
            <Search className="w-5 h-5" />
          </button>

          {/* Language switcher */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 hover:text-[#1457A8] hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span className="hidden sm:block">{locale.toUpperCase()}</span>
              <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", langOpen && "rotate-180")} />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 py-1 min-w-[160px] z-50">
                {LOCALES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => handleLocaleChange(l.code)}
                    className={cn(
                      "w-full flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-blue-50 transition-colors",
                      locale === l.code ? "text-[#1457A8] font-semibold bg-blue-50" : "text-gray-700"
                    )}
                  >
                    <span>{l.flag}</span>
                    {l.label}
                    {locale === l.code && <span className="ml-auto text-[#1457A8]">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Auth */}
          {user ? (
            <div className="relative" ref={dropRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-blue-50 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1457A8] to-[#008C95] flex items-center justify-center text-white text-sm font-bold shadow-sm">
                  {user.full_name?.[0]?.toUpperCase() || "U"}
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-xs font-semibold text-gray-800 leading-tight">{user.full_name?.split(" ")[0]}</div>
                  <div className="text-[10px] text-[#008C95] leading-tight capitalize">{user.role}</div>
                </div>
                <ChevronDown className={cn("w-3.5 h-3.5 text-gray-400 transition-transform", dropdownOpen && "rotate-180")} />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 py-2 min-w-[220px] z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="font-semibold text-gray-900 text-sm">{user.full_name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{user.email}</div>
                    <div className="mt-1.5 inline-flex items-center px-2 py-0.5 rounded-full bg-blue-50 text-[#1457A8] text-xs font-medium capitalize">
                      {user.role}
                    </div>
                  </div>
                  <div className="py-1">
                    {[
                      { href: "/profile", icon: User, label: t("profile") },
                      { href: `/dashboard/${user.role === "student" ? "student" : user.role === "teacher" ? "teacher" : user.role === "librarian" ? "librarian" : user.role === "department_head" ? "department" : "admin"}`, icon: LayoutDashboard, label: t("dashboard") },
                      { href: "/profile/library", icon: BookMarked, label: t("myBooks") },
                      { href: "/profile/reservations", icon: BookOpen, label: t("myReservations") },
                      { href: "/library/reading-room", icon: Calendar, label: t("myReadingRoom") },
                      { href: "/profile/face-id", icon: Zap, label: t("faceId") },
                      { href: "/profile/security", icon: Shield, label: t("security") },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#1457A8] transition-colors"
                      >
                        <item.icon className="w-4 h-4 opacity-60" />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-gray-100 pt-1">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      {t("logout")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/auth/login"
                className="hidden sm:block px-4 py-2 text-sm font-medium text-[#1457A8] hover:bg-blue-50 rounded-lg transition-colors"
              >
                {t("login")}
              </Link>
              <Link
                href="/auth/register"
                className="px-4 py-2 text-sm font-medium text-white bg-[#1457A8] hover:bg-[#0B3D73] rounded-lg transition-colors shadow-sm"
              >
                {t("register")}
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-[#1457A8] hover:bg-blue-50 rounded-lg transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-[#1457A8] hover:bg-blue-50 rounded-lg transition-colors"
            >
              {link.label}
            </Link>
          ))}
          {!user && (
            <div className="flex gap-2 pt-2 border-t border-gray-100">
              <Link href="/auth/login" className="flex-1 px-4 py-2 text-center text-sm font-medium text-[#1457A8] border border-[#1457A8] rounded-lg">
                {t("login")}
              </Link>
              <Link href="/auth/register" className="flex-1 px-4 py-2 text-center text-sm font-medium text-white bg-[#1457A8] rounded-lg">
                {t("register")}
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
