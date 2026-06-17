"use client";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Phone, Mail, MapPin, Clock, ExternalLink, BookOpen } from "lucide-react";

type Locale = "uz" | "ru" | "en" | "tr";
const t = (obj: Record<string, string>, locale: Locale) => obj[locale] || obj.uz;

const QUICK_LINKS = [
  { label: { uz: "Bosh sahifa", ru: "Главная", en: "Home", tr: "Ana Sayfa" }, href: "/" },
  { label: { uz: "Elektron katalog", ru: "Эл. каталог", en: "E-Catalog", tr: "E-Katalog" }, href: "/catalog" },
  { label: { uz: "O'quv zali", ru: "Читальный зал", en: "Reading Room", tr: "Okuma Salonu" }, href: "/library/reading-room" },
  { label: { uz: "AI kutubxonachi", ru: "ИИ-библиотекарь", en: "AI Librarian", tr: "AI Kütüphaneci" }, href: "/ai" },
  { label: { uz: "Kafedralar", ru: "Кафедры", en: "Departments", tr: "Bölümler" }, href: "/departments" },
  { label: { uz: "Ro'yxatdan o'tish", ru: "Регистрация", en: "Register", tr: "Kayıt" }, href: "/auth/register" },
];

const SERVICES_LINKS = [
  { label: { uz: "Bakalavriat", ru: "Бакалавриат", en: "Bachelor", tr: "Lisans" }, href: "/" },
  { label: { uz: "Magistratura", ru: "Магистратура", en: "Master", tr: "Yüksek Lisans" }, href: "/" },
  { label: { uz: "HEMIS talaba", ru: "HEMIS студент", en: "HEMIS Student", tr: "HEMIS Öğrenci" }, href: "/" },
  { label: { uz: "Moodle", ru: "Moodle", en: "Moodle", tr: "Moodle" }, href: "/" },
  { label: { uz: "Dars jadvali", ru: "Расписание", en: "Schedule", tr: "Program" }, href: "/" },
  { label: { uz: "Qabul komissiyasi", ru: "Приёмная", en: "Admission", tr: "Kabul" }, href: "/" },
];

export default function Footer() {
  const locale = useLocale() as Locale;
  const copyright = locale === "uz"
    ? `© ${new Date().getFullYear()} Axborot texnologiyalari va menejment universiteti. Barcha huquqlar himoyalangan.`
    : locale === "ru"
    ? `© ${new Date().getFullYear()} Университет информационных технологий и менеджмента. Все права защищены.`
    : locale === "tr"
    ? `© ${new Date().getFullYear()} Bilgi Teknolojileri ve Yönetim Üniversitesi. Tüm haklar saklıdır.`
    : `© ${new Date().getFullYear()} University of Information Technology and Management. All rights reserved.`;

  return (
    <footer className="portal-footer">
      {/* Decorative overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-5" style={{ backgroundImage: "radial-gradient(circle,white 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom,rgba(0,26,56,.0) 0%,rgba(0,10,30,.4) 100%)" }} />

      <div className="relative z-10">
        {/* Main footer content */}
        <div className="max-w-[1680px] mx-auto px-5 sm:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Col 1: Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-black text-[15px]">ATMU</div>
                  <div className="text-white/45 text-[10px] font-medium uppercase tracking-widest">Smart UniLibrary</div>
                </div>
              </div>
              <p className="text-white/45 text-[13px] leading-relaxed mb-5">
                {locale === "uz"
                  ? "Axborot texnologiyalari va menejment universiteti — raqamli ta'lim va zamonaviy kutubxona xizmatlari."
                  : locale === "ru"
                  ? "Университет информационных технологий и менеджмента — цифровое образование и современные библиотечные услуги."
                  : locale === "tr"
                  ? "Bilgi Teknolojileri ve Yönetim Üniversitesi — dijital eğitim ve modern kütüphane hizmetleri."
                  : "University of Information Technology and Management — digital education and modern library services."}
              </p>
              {/* Social icons */}
              <div className="flex gap-2">
                {["T", "Y", "F", "I"].map((s, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-8 h-8 rounded-lg bg-white/8 border border-white/12 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/15 transition-colors text-[11px] font-bold"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>

            {/* Col 2: Quick links */}
            <div>
              <div className="text-white font-bold text-[13px] mb-4 uppercase tracking-widest border-b border-white/10 pb-3">
                {locale === "uz" ? "Tezkor havolalar" : locale === "ru" ? "Быстрые ссылки" : locale === "tr" ? "Hızlı Bağlantılar" : "Quick Links"}
              </div>
              <ul className="space-y-2">
                {QUICK_LINKS.map((link, i) => (
                  <li key={i}>
                    <Link href={link.href} className="text-white/50 hover:text-white text-[13px] transition-colors flex items-center gap-1.5 hover:gap-2.5">
                      <span className="w-1 h-1 rounded-full bg-[#e8a820] flex-shrink-0" />
                      {t(link.label, locale)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Services */}
            <div>
              <div className="text-white font-bold text-[13px] mb-4 uppercase tracking-widest border-b border-white/10 pb-3">
                {locale === "uz" ? "Xizmatlar" : locale === "ru" ? "Сервисы" : locale === "tr" ? "Hizmetler" : "Services"}
              </div>
              <ul className="space-y-2">
                {SERVICES_LINKS.map((link, i) => (
                  <li key={i}>
                    <Link href={link.href} className="text-white/50 hover:text-white text-[13px] transition-colors flex items-center gap-1.5 hover:gap-2.5">
                      <span className="w-1 h-1 rounded-full bg-[#e8a820] flex-shrink-0" />
                      {t(link.label, locale)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Contact */}
            <div>
              <div className="text-white font-bold text-[13px] mb-4 uppercase tracking-widest border-b border-white/10 pb-3">
                {locale === "uz" ? "Bog'lanish" : locale === "ru" ? "Контакты" : locale === "tr" ? "İletişim" : "Contact"}
              </div>
              <ul className="space-y-3.5">
                <li className="flex items-start gap-2.5 text-white/50 text-[13px]">
                  <MapPin size={14} className="mt-0.5 flex-shrink-0 text-[#e8a820]" />
                  <span>
                    {locale === "ru"
                      ? "г. Карши, ул. Кургон, 1"
                      : locale === "en"
                      ? "Qarshi, Ko'rg'on Street, 1"
                      : locale === "tr"
                      ? "Karshi, Kurgon Caddesi, 1"
                      : "Qarshi shahri, Ko'rg'on ko'chasi, 1-uy"}
                  </span>
                </li>
                <li className="flex items-center gap-2.5 text-white/50 text-[13px]">
                  <Phone size={14} className="flex-shrink-0 text-[#e8a820]" />
                  <a href="tel:+998554045555" className="hover:text-white transition-colors">+998 (55) 404-55-55</a>
                </li>
                <li className="flex items-center gap-2.5 text-white/50 text-[13px]">
                  <Mail size={14} className="flex-shrink-0 text-[#e8a820]" />
                  <a href="mailto:info@atmu.uz" className="hover:text-white transition-colors">info@atmu.uz</a>
                </li>
                <li className="flex items-center gap-2.5 text-white/50 text-[13px]">
                  <Mail size={14} className="flex-shrink-0 text-[#e8a820]" />
                  <a href="mailto:library@atmu.uz" className="hover:text-white transition-colors">library@atmu.uz</a>
                </li>
                <li className="flex items-center gap-2.5 text-white/50 text-[13px]">
                  <Clock size={14} className="flex-shrink-0 text-[#e8a820]" />
                  <span>
                    {locale === "uz" ? "Du–Ju: 08:00–18:00" : locale === "ru" ? "Пн–Пт: 08:00–18:00" : locale === "tr" ? "Pt–Cu: 08:00–18:00" : "Mon–Fri: 08:00–18:00"}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8">
          <div className="max-w-[1680px] mx-auto px-5 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-white/30 text-[11px] text-center sm:text-left">{copyright}</p>
            <div className="flex items-center gap-4">
              <a href="https://atmu.uz" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/60 text-[11px] flex items-center gap-1 transition-colors">
                atmu.uz <ExternalLink size={10} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
