"use client";
import { useState, useEffect } from "react";
import { booksApi } from "@/lib/api";
import { Search, Filter, BookOpen, Download, Calendar, Eye, Star } from "lucide-react";
import { Link } from "@/i18n/navigation";
import ReserveModal from "./ReserveModal";

const CATEGORIES = ["Hammasi", "Dasturlash", "Ma'lumotlar bazasi", "Tarmoqlar", "Algoritmlar", "Kiberxavfsizlik"];
const LANGUAGES = ["Hammasi", "O'zbekcha", "Ruscha", "Inglizcha"];

const DEMO_BOOKS = [
  { id: 1, title: "Algoritm va dasturlash", author: "Karimov A.K., Toshmatov B.S.", year: 2023, language: "uz", category: "Dasturlash", available_copies: 3, total_copies: 5, description: "Algoritmlar va dasturlash asoslarini o'rgatuvchi darslik.", view_count: 234 },
  { id: 2, title: "Ma'lumotlar bazasini loyihalash", author: "Rahimov B.N.", year: 2022, language: "uz", category: "Ma'lumotlar bazasi", available_copies: 5, total_copies: 8, description: "Ma'lumotlar bazasini loyihalash va boshqarish asoslari.", view_count: 189 },
  { id: 3, title: "Компьютерные сети", author: "Таненбаум Э.", year: 2021, language: "ru", category: "Tarmoqlar", available_copies: 1, total_copies: 3, description: "Kompyuter tarmoqlari bo'yicha klassik darslik.", view_count: 312 },
  { id: 4, title: "Introduction to Algorithms", author: "Cormen T.H., Leiserson C.E.", year: 2022, language: "en", category: "Algoritmlar", available_copies: 2, total_copies: 2, description: "CLRS - algoritmlarning klassik qo'llanmasi.", view_count: 456 },
  { id: 5, title: "Kiberxavfsizlik: Nazariya va amaliyot", author: "Mirzayev D.A., Nazarov S.K.", year: 2024, language: "uz", category: "Kiberxavfsizlik", available_copies: 4, total_copies: 4, description: "Axborot xavfsizligining nazariy asoslari va amaliy mashqlar.", view_count: 167 },
  { id: 6, title: "Web dasturlash: HTML, CSS, JavaScript", author: "Toshmatova G.R.", year: 2023, language: "uz", category: "Dasturlash", available_copies: 0, total_copies: 3, description: "Zamonaviy web dasturlashning asoslari.", view_count: 289 },
];

export default function CatalogPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Hammasi");
  const [language, setLanguage] = useState("Hammasi");
  const [books, setBooks] = useState(DEMO_BOOKS);
  const [reserveBook, setReserveBook] = useState<any>(null);

  const filtered = books.filter(b => {
    const matchSearch = !search || b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "Hammasi" || b.category === category;
    const matchLang = language === "Hammasi" || (language === "O'zbekcha" && b.language === "uz") || (language === "Ruscha" && b.language === "ru") || (language === "Inglizcha" && b.language === "en");
    return matchSearch && matchCategory && matchLang;
  });

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Header */}
      <div className="gradient-navy py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">Elektron katalog</h1>
          <p className="text-blue-200">Barcha kitoblar va elektron resurslar</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Sidebar filters */}
          <div className="hidden lg:block w-56 shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm sticky top-20">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">Kategoriya</h3>
              <div className="space-y-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      category === cat ? "bg-blue-50 text-[#1457A8] font-semibold" : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="border-t border-gray-100 mt-4 pt-4">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Til</h3>
                <div className="space-y-1">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        language === lang ? "bg-blue-50 text-[#1457A8] font-semibold" : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main */}
          <div className="flex-1">
            {/* Search */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6 shadow-sm">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Kitob nomi, muallif bo'yicha qidiring..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1457A8]"
                />
              </div>
            </div>

            <div className="text-sm text-gray-500 mb-4">{filtered.length} ta kitob topildi</div>

            {/* Books grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((book) => (
                <div key={book.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all card-hover group">
                  {/* Book cover placeholder */}
                  <div className="h-32 bg-gradient-to-br from-[#061B3A] to-[#1457A8] flex items-center justify-center relative">
                    <BookOpen className="w-12 h-12 text-white/30" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          book.available_copies > 0 ? "bg-emerald-400 text-white" : "bg-red-400 text-white"
                        }`}>
                          {book.available_copies > 0 ? `${book.available_copies} mavjud` : "Mavjud emas"}
                        </span>
                        <span className="text-xs text-white/70">{book.year}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="text-xs text-[#008C95] font-semibold mb-1">{book.category}</div>
                    <h4 className="font-bold text-[#172033] text-sm leading-snug mb-1 group-hover:text-[#1457A8] transition-colors line-clamp-2">
                      {book.title}
                    </h4>
                    <div className="text-xs text-gray-400 mb-3">{book.author}</div>
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
                      <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{book.view_count}</span>
                      <span>{book.language === "uz" ? "🇺🇿" : book.language === "ru" ? "🇷🇺" : "🇬🇧"}</span>
                      <span className="ml-auto">{book.total_copies} nusxa</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setReserveBook(book)}
                        disabled={book.available_copies === 0}
                        className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors ${
                          book.available_copies > 0
                            ? "bg-[#1457A8] text-white hover:bg-[#0B3D73]"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        <Calendar className="w-3.5 h-3.5 inline mr-1" />
                        Band qilish
                      </button>
                      <button className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:text-[#1457A8] hover:border-[#1457A8] transition-colors">
                        <BookOpen className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {reserveBook && (
        <ReserveModal book={reserveBook} onClose={() => setReserveBook(null)} />
      )}
    </div>
  );
}
