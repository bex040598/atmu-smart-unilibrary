"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Phone, Mail, MapPin, Clock, Send, ExternalLink } from "lucide-react";

type Locale = "uz" | "ru" | "en" | "tr";

const T: Record<Locale, Record<string, string>> = {
  uz: {
    about_short: "Axborot texnologiyalari va menejment universiteti raqamli ta'lim, elektron kutubxona va ilmiy faoliyatni yagona platformada uyg'unlashtirgan zamonaviy davlat universiteti.",
    services: "Xizmatlar",
    quick_links: "Tezkor havolalar",
    contacts: "Aloqa",
    address: "Toshkent shahri, Amir Temur shoh ko'chasi, 108-uy",
    working_hours: "Du-Ju: 8:00 - 18:00, Sha: 9:00 - 14:00",
    rights: "Barcha huquqlar himoyalangan.",
    catalog: "Elektron katalog",
    reading_room: "O'quv zali bron qilish",
    ai_lib: "AI kutubxonachi",
    dept_lib: "Kafedralar kutubxonasi",
    book_res: "Kitob band qilish",
    news: "Yangiliklar",
    about: "Universitet haqida",
    departments: "Kafedralar",
    faculties: "Fakultetlar",
    science: "Ilmiy markazlar",
    alumni: "Bitiruvchilar",
    admission: "Qabul",
    contact: "Aloqa",
    official_site: "Rasmiy sayt",
    smart_lib: "Smart UniLibrary",
  },
  ru: {
    about_short: "Университет информационных технологий и менеджмента — современный государственный университет, объединяющий цифровое образование, электронную библиотеку и научную деятельность.",
    services: "Услуги",
    quick_links: "Быстрые ссылки",
    contacts: "Контакты",
    address: "г. Ташкент, проспект Амира Темура, 108",
    working_hours: "Пн-Пт: 8:00 - 18:00, Сб: 9:00 - 14:00",
    rights: "Все права защищены.",
    catalog: "Электронный каталог",
    reading_room: "Бронирование зала",
    ai_lib: "AI библиотекарь",
    dept_lib: "Библиотеки кафедр",
    book_res: "Бронирование книги",
    news: "Новости",
    about: "Об университете",
    departments: "Кафедры",
    faculties: "Факультеты",
    science: "Научные центры",
    alumni: "Выпускники",
    admission: "Приём",
    contact: "Контакты",
    official_site: "Официальный сайт",
    smart_lib: "Smart UniLibrary",
  },
  en: {
    about_short: "University of Information Technologies and Management — a modern state university that integrates digital education, e-library and scientific activities on a single platform.",
    services: "Services",
    quick_links: "Quick Links",
    contacts: "Contacts",
    address: "Tashkent, Amir Temur Avenue, 108",
    working_hours: "Mon-Fri: 8:00 - 18:00, Sat: 9:00 - 14:00",
    rights: "All rights reserved.",
    catalog: "E-Catalog",
    reading_room: "Reading Room Booking",
    ai_lib: "AI Librarian",
    dept_lib: "Department Libraries",
    book_res: "Book Reservation",
    news: "News",
    about: "About University",
    departments: "Departments",
    faculties: "Faculties",
    science: "Scientific Centers",
    alumni: "Alumni",
    admission: "Admissions",
    contact: "Contact",
    official_site: "Official Site",
    smart_lib: "Smart UniLibrary",
  },
  tr: {
    about_short: "Bilgi Teknolojileri ve Yönetim Üniversitesi — dijital eğitimi, e-kütüphaneyi ve bilimsel faaliyetleri tek bir platformda birleştiren modern bir devlet üniversitesi.",
    services: "Hizmetler",
    quick_links: "Hızlı Bağlantılar",
    contacts: "İletişim",
    address: "Taşkent, Emir Timur Bulvarı, 108",
    working_hours: "Pzt-Cum: 8:00 - 18:00, Cmt: 9:00 - 14:00",
    rights: "Tüm hakları saklıdır.",
    catalog: "E-Katalog",
    reading_room: "Okuma Salonu Rezerv.",
    ai_lib: "AI Kütüphaneci",
    dept_lib: "Bölüm Kütüphaneleri",
    book_res: "Kitap Rezervasyonu",
    news: "Haberler",
    about: "Üniversite Hakkında",
    departments: "Bölümler",
    faculties: "Fakülteler",
    science: "Bilim Merkezleri",
    alumni: "Mezunlar",
    admission: "Kabul",
    contact: "İletişim",
    official_site: "Resmi Site",
    smart_lib: "Smart UniLibrary",
  },
};

export default function Footer() {
  const locale = useLocale() as Locale;
  const L = T[locale] || T.uz;
  const year = new Date().getFullYear();

  const serviceLinks = [
    { label: L.catalog, href: "/catalog" },
    { label: L.dept_lib, href: "/departments" },
    { label: L.book_res, href: "/catalog" },
    { label: L.reading_room, href: "/library/reading-room" },
    { label: L.ai_lib, href: "/ai" },
  ];

  const quickLinks = [
    { label: L.about, href: "/about" },
    { label: L.news, href: "/news" },
    { label: L.faculties, href: "/faculties" },
    { label: L.departments, href: "/departments" },
    { label: L.science, href: "/science/centers" },
    { label: L.alumni, href: "/alumni" },
    { label: L.admission, href: "/admission" },
    { label: L.contact, href: "/contact" },
  ];

  return (
    <footer style={{ background: "linear-gradient(135deg, #030C18 0%, #061B3A 40%, #0B3D73 100%)" }} className="text-white mt-0">
      {/* Top decoration */}
      <div style={{ height: "3px", background: "linear-gradient(90deg, #D6A84F 0%, #1457A8 50%, #D6A84F 100%)" }} />

      <div className="max-w-[1280px] mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & About */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5 group">
              <div className="w-11 h-11 rounded-full bg-white/90 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9">
                  <circle cx="22" cy="22" r="22" fill="#061B3A"/>
                  <path d="M11 16 L22 10 L33 16 L33 28 L22 34 L11 28 Z" fill="#1457A8" opacity="0.4"/>
                  <text x="22" y="26" textAnchor="middle" fill="#D6A84F" fontSize="10" fontWeight="bold" fontFamily="Arial">AT</text>
                  <circle cx="22" cy="22" r="20" stroke="#D6A84F" strokeWidth="0.7" fill="none" strokeDasharray="3 3"/>
                </svg>
              </div>
              <div>
                <div className="text-white font-bold text-sm leading-tight">ATMU Smart UniLibrary</div>
                <div className="text-yellow-400/60 text-[9px] uppercase tracking-widest mt-0.5">
                  {locale === "uz" ? "Rasmiy universiteti portali" : locale === "ru" ? "Официальный портал университета" : locale === "tr" ? "Resmi üniversite portalı" : "Official University Portal"}
                </div>
              </div>
            </Link>
            <p className="text-white/50 text-[12px] leading-relaxed mb-6">
              {L.about_short}
            </p>
            {/* Social */}
            <div className="flex items-center gap-2">
                      <a href="#" aria-label="Telegram" className="w-9 h-9 rounded-lg bg-white/8 hover:bg-white/15 flex items-center justify-center transition-colors border border-white/10">
                <Send size={14} className="text-white/60" />
              </a>
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-lg bg-white/8 hover:bg-white/15 flex items-center justify-center transition-colors border border-white/10">
                <ExternalLink size={14} className="text-white/60" />
              </a>
              <a href="#" aria-label="YouTube" className="w-9 h-9 rounded-lg bg-white/8 hover:bg-white/15 flex items-center justify-center transition-colors border border-white/10">
                <ExternalLink size={14} className="text-white/60" />
              </a>
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-lg bg-white/8 hover:bg-white/15 flex items-center justify-center transition-colors border border-white/10">
                <ExternalLink size={14} className="text-white/60" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-4">{L.services}</h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href as "/catalog" | "/departments" | "/library/reading-room" | "/ai"}
                    className="text-white/55 hover:text-white text-[13px] transition-colors hover:translate-x-0.5 inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-yellow-400/40 group-hover:bg-yellow-400 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-4">{L.quick_links}</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href as "/about" | "/news" | "/faculties" | "/departments" | "/science/centers" | "/alumni" | "/admission" | "/contact"}
                    className="text-white/55 hover:text-white text-[13px] transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-yellow-400/40 group-hover:bg-yellow-400 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-4">{L.contacts}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-[13px] text-white/55">
                <MapPin size={14} className="mt-0.5 flex-shrink-0 text-yellow-400/70" />
                {L.address}
              </li>
              <li>
                <a href="tel:+998712274800" className="flex items-center gap-3 text-[13px] text-white/55 hover:text-white transition-colors">
                  <Phone size={14} className="flex-shrink-0 text-yellow-400/70" />
                  +998 71 227-48-00
                </a>
              </li>
              <li>
                <a href="mailto:info@atmu.uz" className="flex items-center gap-3 text-[13px] text-white/55 hover:text-white transition-colors">
                  <Mail size={14} className="flex-shrink-0 text-yellow-400/70" />
                  info@atmu.uz
                </a>
              </li>
              <li>
                <a href="mailto:library@atmu.uz" className="flex items-center gap-3 text-[13px] text-white/55 hover:text-white transition-colors">
                  <Mail size={14} className="flex-shrink-0 text-yellow-400/70" />
                  library@atmu.uz
                </a>
              </li>
              <li className="flex items-center gap-3 text-[13px] text-white/55">
                <Clock size={14} className="flex-shrink-0 text-yellow-400/70" />
                {L.working_hours}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="max-w-[1280px] mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-white/30">
          <span>© {year} Axborot texnologiyalari va menejment universiteti. {L.rights}</span>
          <div className="flex items-center gap-3">
            <span className="text-white/20">|</span>
            <span>{L.smart_lib}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
