"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Phone, Mail, MapPin, Clock, ExternalLink, Globe } from "lucide-react";

const LABELS: Record<string, Record<string, string>> = {
  uz: {
    about: "Biz haqimizda",
    about_text: "ATMU Smart UniLibrary — zamonaviy elektron kutubxona platformasi. O'quv materiallari, ilmiy maqolalar va kitoblar bir joyda.",
    services: "Xizmatlar",
    contacts: "Aloqa",
    address: "Toshkent sh., Amir Temur ko'ch., 108-uy",
    working_hours: "Du-Ju: 8:00 - 18:00",
    rights: "Barcha huquqlar himoyalangan.",
    catalog: "Elektron katalog",
    reading_room: "O'qish zali",
    ai_help: "AI Yordamchi",
    books: "Kitoblar",
    resources: "Resurslar",
    departments: "Kafedralar",
  },
  ru: {
    about: "О нас",
    about_text: "ATMU Smart UniLibrary — современная электронная библиотечная платформа. Учебные материалы, научные статьи и книги в одном месте.",
    services: "Услуги",
    contacts: "Контакты",
    address: "г. Ташкент, ул. Амира Темура, 108",
    working_hours: "Пн-Пт: 8:00 - 18:00",
    rights: "Все права защищены.",
    catalog: "Электронный каталог",
    reading_room: "Читальный зал",
    ai_help: "ИИ Ассистент",
    books: "Книги",
    resources: "Ресурсы",
    departments: "Кафедры",
  },
  en: {
    about: "About",
    about_text: "ATMU Smart UniLibrary — modern electronic library platform. Study materials, research articles and books all in one place.",
    services: "Services",
    contacts: "Contacts",
    address: "Tashkent, Amir Temur st., 108",
    working_hours: "Mon-Fri: 8:00 - 18:00",
    rights: "All rights reserved.",
    catalog: "E-Catalog",
    reading_room: "Reading Room",
    ai_help: "AI Assistant",
    books: "Books",
    resources: "Resources",
    departments: "Departments",
  },
  tr: {
    about: "Hakkımızda",
    about_text: "ATMU Smart UniLibrary — modern elektronik kütüphane platformu. Çalışma materyalleri, araştırma makaleleri ve kitaplar tek bir yerde.",
    services: "Hizmetler",
    contacts: "İletişim",
    address: "Taşkent, Emir Timur cad., 108",
    working_hours: "Pzt-Cum: 8:00 - 18:00",
    rights: "Tüm hakları saklıdır.",
    catalog: "E-Katalog",
    reading_room: "Okuma Salonu",
    ai_help: "AI Asistan",
    books: "Kitaplar",
    resources: "Kaynaklar",
    departments: "Bölümler",
  },
};

export default function Footer() {
  const locale = useLocale() as "uz" | "ru" | "en" | "tr";
  const L = LABELS[locale] || LABELS.uz;
  const year = new Date().getFullYear();

  const serviceLinks = [
    { label: L.catalog, href: "/catalog" },
    { label: L.reading_room, href: "/reading-room" },
    { label: L.ai_help, href: "/ai" },
    { label: L.books, href: "/catalog" },
    { label: L.resources, href: "/resources" },
    { label: L.departments, href: "/departments" },
  ];

  return (
    <footer className="gradient-navy text-white mt-0">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
                  <circle cx="20" cy="20" r="20" fill="#061B3A"/>
                  <text x="20" y="25" textAnchor="middle" fill="#D6A84F" fontSize="10" fontWeight="bold" fontFamily="Arial">AT</text>
                </svg>
              </div>
              <div>
                <div className="font-bold text-sm leading-tight">ATMU Smart UniLibrary</div>
                <div className="text-white/40 text-[10px]">Electronic Library Portal</div>
              </div>
            </Link>
            <p className="text-white/55 text-sm leading-relaxed mb-5">
              {L.about_text}
            </p>
            <div className="flex items-center gap-2">
              <a href="#" className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors" aria-label="Website">
                <Globe size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors" aria-label="Telegram">
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-white/50 mb-4">{L.services}</h4>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href as "/catalog" | "/reading-room" | "/ai" | "/resources" | "/departments"}
                    className="text-white/60 hover:text-white text-sm transition-colors hover:translate-x-0.5 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-white/50 mb-4">{L.about}</h4>
            <ul className="space-y-2">
              {[
                { label: L.about, href: "/about" },
                { label: "ATMU.uz", href: "#" },
                { label: L.contacts, href: "/contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href as "/about" | "/contact"}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-white/50 mb-4">{L.contacts}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-white/60">
                <MapPin size={14} className="mt-0.5 flex-shrink-0 text-yellow-400" />
                {L.address}
              </li>
              <li>
                <a href="tel:+998712274800" className="flex items-center gap-2.5 text-sm text-white/60 hover:text-white transition-colors">
                  <Phone size={14} className="flex-shrink-0 text-yellow-400" />
                  +998 71 227-48-00
                </a>
              </li>
              <li>
                <a href="mailto:library@atmu.uz" className="flex items-center gap-2.5 text-sm text-white/60 hover:text-white transition-colors">
                  <Mail size={14} className="flex-shrink-0 text-yellow-400" />
                  library@atmu.uz
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/60">
                <Clock size={14} className="flex-shrink-0 text-yellow-400" />
                {L.working_hours}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40">
          <span>© {year} ATMU Smart UniLibrary. {L.rights}</span>
          <span className="text-white/25">Powered by Next.js + FastAPI</span>
        </div>
      </div>
    </footer>
  );
}
