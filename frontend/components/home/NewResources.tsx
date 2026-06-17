"use client";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Eye, Download, BookOpen } from "lucide-react";

const RESOURCES = [
  {
    id: 1,
    title: "Ma'lumotlar bazasi: To'liq kurs",
    type: "Darslik",
    dept: "Axborot texnologiyalari",
    author: "Dr. Nodira Yusupova",
    format: "PDF",
    views: 342,
    downloads: 128,
    lang: "🇺🇿",
    color: "bg-blue-50 text-[#1457A8]",
  },
  {
    id: 2,
    title: "Python dasturlash: Amaliy qo'llanma",
    type: "O'quv qo'llanma",
    dept: "Axborot texnologiyalari",
    author: "Dr. Nodira Yusupova",
    format: "PDF",
    views: 567,
    downloads: 234,
    lang: "🇺🇿",
    color: "bg-teal-50 text-[#008C95]",
  },
  {
    id: 3,
    title: "Sun'iy intellekt va Machine Learning asoslari",
    type: "Ma'ruza matni",
    dept: "Axborot texnologiyalari",
    author: "Prof. Behruz Rahimov",
    format: "PDF",
    views: 289,
    downloads: 97,
    lang: "🇺🇿",
    color: "bg-amber-50 text-[#D6A84F]",
  },
  {
    id: 4,
    title: "Kompyuter tarmoqlari: Laboratoriya ishlari",
    type: "Laboratoriya ishi",
    dept: "Axborot texnologiyalari",
    author: "Dr. Nodira Yusupova",
    format: "PDF",
    views: 198,
    downloads: 76,
    lang: "🇺🇿",
    color: "bg-emerald-50 text-[#0E9F6E]",
  },
];

export default function NewResources() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="text-sm font-semibold text-[#1457A8] mb-2 uppercase tracking-wider">
              🆕 Yangi materiallar
            </div>
            <h2 className="text-3xl font-bold text-[#061B3A]">Yangi qo'shilgan resurslar</h2>
            <p className="text-gray-500 mt-2">O'qituvchilar tomonidan tasdiqlangan so'nggi materiallar</p>
          </div>
          <Link href="/catalog" className="hidden md:flex items-center gap-2 text-sm font-medium text-[#1457A8]">
            Hammasini ko'rish <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {RESOURCES.map((r) => (
            <div key={r.id} className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-lg transition-all duration-300 card-hover group">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${r.color}`}>
                  {r.type}
                </span>
                <span className="text-lg">{r.lang}</span>
              </div>

              {/* Title */}
              <h4 className="font-bold text-[#172033] text-sm leading-snug mb-2 line-clamp-2 group-hover:text-[#1457A8] transition-colors">
                {r.title}
              </h4>

              {/* Meta */}
              <div className="text-xs text-gray-400 mb-1">{r.author}</div>
              <div className="text-xs text-[#008C95] font-medium mb-4">{r.dept}</div>

              {/* Stats */}
              <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" /> {r.views}
                </span>
                <span className="flex items-center gap-1">
                  <Download className="w-3.5 h-3.5" /> {r.downloads}
                </span>
                <span className="ml-auto px-2 py-0.5 bg-gray-50 rounded text-gray-500">{r.format}</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Link
                  href={`/catalog/${r.id}`}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-white bg-[#1457A8] rounded-lg hover:bg-[#0B3D73] transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  O'qish
                </Link>
                <button className="flex items-center justify-center p-2 text-gray-500 border border-gray-200 rounded-lg hover:border-[#1457A8] hover:text-[#1457A8] transition-colors">
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
