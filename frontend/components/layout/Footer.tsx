"use client";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Library, MapPin, Phone, Mail, Globe, Share2, Send } from "lucide-react";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-[#061B3A] text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <Library className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-lg">ATMU Smart UniLibrary</div>
                <div className="text-xs text-blue-300">Elektron kutubxona platformasi</div>
              </div>
            </div>
            <p className="text-sm text-blue-200 leading-relaxed max-w-xs">{t("about")}</p>
            <div className="flex gap-3 mt-4">
              {[Globe, Share2, Send].map((Icon, i) => (
                <button
                  key={i}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-blue-300">
              {t("quickLinks")}
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Bosh sahifa" },
                { href: "/departments", label: "Kafedralar" },
                { href: "/catalog", label: "Elektron katalog" },
                { href: "/library/reading-room", label: "O'quv zali" },
                { href: "/ai", label: "AI kutubxonachi" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-blue-200 hover:text-white transition-colors"
                  >
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-blue-300">
              {t("contacts")}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-blue-200">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-blue-400" />
                {t("address")}
              </li>
              <li className="flex items-center gap-2 text-sm text-blue-200">
                <Phone className="w-4 h-4 shrink-0 text-blue-400" />
                +998 71 123-45-67
              </li>
              <li className="flex items-center gap-2 text-sm text-blue-200">
                <Mail className="w-4 h-4 shrink-0 text-blue-400" />
                library@atmu.uz
              </li>
            </ul>
            <div className="mt-4 p-3 rounded-lg bg-white/5 border border-white/10">
              <div className="text-xs text-blue-300 mb-1">Ish vaqti</div>
              <div className="text-sm font-medium">Du-Jum: 8:00 – 20:00</div>
              <div className="text-sm text-blue-200">Shan: 9:00 – 18:00</div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-blue-300">{t("copyright")}</p>
          <p className="text-xs text-blue-400">{t("developer")}</p>
        </div>
      </div>
    </footer>
  );
}
