"use client";
import { useState, useEffect, useCallback } from "react";
import { booksApi } from "@/lib/api";
import { Search, BookOpen, Calendar, Eye, Loader2, RefreshCw } from "lucide-react";
import ReserveModal from "./ReserveModal";

const CATEGORIES = ["Hammasi", "Dasturlash", "Ma'lumotlar bazasi", "Tarmoqlar", "Algoritmlar", "Kiberxavfsizlik"];
const LANGUAGES = [
  { label: "Hammasi", value: "" },
  { label: "O'zbekcha", value: "uz" },
  { label: "Ruscha", value: "ru" },
  { label: "Inglizcha", value: "en" },
];

export default function CatalogPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [language, setLanguage] = useState("");
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [total, setTotal] = useState(0);
  const [reserveBook, setReserveBook] = useState<any>(null);

  const fetchBooks = useCallback(() => {
    setLoading(true);
    setError("");
    const params: any = { limit: 50, offset: 0 };
    if (search) params.search = search;
    if (language) params.language = language;
    if (category && category !== "Hammasi") params.category = category;

    booksApi.list(params)
      .then((r) => {
        const data = Array.isArray(r.data) ? r.data : (r.data?.items || []);
        setBooks(data);
        setTotal(r.data?.total || data.length);
      })
      .catch(() => setError("Kitoblarni yuklashda xatolik. Qayta urinib ko'ring."))
      .finally(() => setLoading(false));
  }, [search, language, category]);

  useEffect(() => {
    const t = setTimeout(fetchBooks, search ? 400 : 0);
    return () => clearTimeout(t);
  }, [fetchBooks]);

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <div className="gradient-navy py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">Elektron katalog</h1>
          <p className="text-blue-200">Barcha kitoblar va elektron resurslar — {total > 0 ? `${total} ta` : ""}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="hidden lg:block w-56 shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm sticky top-20">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">Kategoriya</h3>
              <div className="space-y-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat === "Hammasi" ? "" : cat)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      (category === "" && cat === "Hammasi") || category === cat
                        ? "bg-blue-50 text-[#1457A8] font-semibold"
                        : "text-gray-600 hover:bg-gray-50"
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
                      key={lang.value}
                      onClick={() => setLanguage(lang.value)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        language === lang.value
                          ? "bg-blue-50 text-[#1457A8] font-semibold"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main */}
          <div className="flex-1">
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

            {/* Loading */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <Loader2 className="w-8 h-8 animate-spin mb-3" />
                <p className="text-sm">Kitoblar yuklanmoqda...</p>
              </div>
            )}

            {/* Error */}
            {error && !loading && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
                <p className="text-red-600 text-sm mb-3">{error}</p>
                <button
                  onClick={fetchBooks}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
                >
                  <RefreshCw className="w-4 h-4" /> Qayta urinish
                </button>
              </div>
            )}

            {/* Empty */}
            {!loading && !error && books.length === 0 && (
              <div className="text-center py-20 text-gray-400">
                <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="text-sm font-medium">Kitob topilmadi</p>
                <p className="text-xs mt-1">Qidiruv so&apos;rovini o&apos;zgartiring</p>
              </div>
            )}

            {/* Books grid */}
            {!loading && !error && books.length > 0 && (
              <>
                <div className="text-sm text-gray-500 mb-4">{books.length} ta kitob topildi</div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {books.map((book: any) => (
                    <div key={book.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all card-hover group">
                      <div className="h-32 bg-gradient-to-br from-[#061B3A] to-[#1457A8] flex items-center justify-center relative">
                        {book.cover_url
                          ? <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover" />
                          : <BookOpen className="w-12 h-12 text-white/30" />
                        }
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <div className="flex items-center justify-between">
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                              (book.available_copies ?? 1) > 0 ? "bg-emerald-400 text-white" : "bg-red-400 text-white"
                            }`}>
                              {(book.available_copies ?? 1) > 0 ? `${book.available_copies ?? "✓"} mavjud` : "Mavjud emas"}
                            </span>
                            <span className="text-xs text-white/70">{book.year}</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="text-xs text-[#008C95] font-semibold mb-1">{book.category || book.subject || "Umumiy"}</div>
                        <h4 className="font-bold text-[#172033] text-sm leading-snug mb-1 group-hover:text-[#1457A8] transition-colors line-clamp-2">
                          {book.title}
                        </h4>
                        <div className="text-xs text-gray-400 mb-3 line-clamp-1">
                          {Array.isArray(book.authors) ? book.authors.map((a: any) => a.full_name || a).join(", ") : book.author || ""}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
                          <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{book.view_count || 0}</span>
                          <span>{book.language === "uz" ? "🇺🇿" : book.language === "ru" ? "🇷🇺" : "🇬🇧"}</span>
                          {book.total_copies && <span className="ml-auto">{book.total_copies} nusxa</span>}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setReserveBook(book)}
                            disabled={(book.available_copies ?? 1) === 0}
                            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors ${
                              (book.available_copies ?? 1) > 0
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
              </>
            )}
          </div>
        </div>
      </div>

      {reserveBook && (
        <ReserveModal book={reserveBook} onClose={() => setReserveBook(null)} />
      )}
    </div>
  );
}
