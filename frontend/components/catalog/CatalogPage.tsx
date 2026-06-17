"use client";
import { useState, useEffect, useCallback } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { booksApi, resourcesApi } from "@/lib/api";
import { isAuthenticated } from "@/lib/auth";
import {
  Search, SlidersHorizontal, BookOpen, Download, Eye,
  Star, ChevronRight, Filter, X, BookMarked, Clock,
  LayoutGrid, List, ChevronDown, RefreshCw, Loader2
} from "lucide-react";
import ReserveModal from "./ReserveModal";

type Locale = "uz" | "ru" | "en" | "tr";

const T: Record<Locale, Record<string, string>> = {
  uz: {
    title: "Elektron katalog",
    subtitle: "ATMU kutubxona fondi — jismoniy kitoblar, elektron darsliklar va ilmiy maqolalar",
    search_ph: "Kitob, muallif, kafedra yoki fan bo'yicha qidirish...",
    filters: "Filtrlar",
    category: "Kategoriya",
    language: "Til",
    all: "Hammasi",
    sort: "Saralash",
    sort_new: "Yangi qo'shilgan",
    sort_views: "Ko'p ko'rilgan",
    sort_title: "Nomi bo'yicha",
    loading: "Yuklanmoqda...",
    no_results: "Natija topilmadi",
    read: "O'qish",
    download: "Yuklab olish",
    reserve: "Band qilish",
    details: "Batafsil",
    available: "Mavjud",
    borrowed: "Berilgan",
    reserved: "Band qilingan",
    copies: "nusxa",
    views: "ko'rish",
    downloads: "yuklash",
    type_book: "Kitob",
    type_resource: "E-Resurs",
    lang_uz: "O'zbek",
    lang_ru: "Rus",
    lang_en: "Ingliz",
    books_tab: "Kitoblar",
    resources_tab: "Elektron resurslar",
    results: "ta natija",
  },
  ru: {
    title: "Электронный каталог",
    subtitle: "Библиотечный фонд АТМУ — физические книги, электронные учебники и научные статьи",
    search_ph: "Поиск по книге, автору, кафедре или дисциплине...",
    filters: "Фильтры",
    category: "Категория",
    language: "Язык",
    all: "Все",
    sort: "Сортировка",
    sort_new: "Недавно добавленные",
    sort_views: "Наиболее просматриваемые",
    sort_title: "По названию",
    loading: "Загрузка...",
    no_results: "Результатов не найдено",
    read: "Читать",
    download: "Скачать",
    reserve: "Забронировать",
    details: "Подробнее",
    available: "Доступно",
    borrowed: "Выдано",
    reserved: "Забронировано",
    copies: "экз.",
    views: "просм.",
    downloads: "скач.",
    type_book: "Книга",
    type_resource: "Э-ресурс",
    lang_uz: "Узбекский",
    lang_ru: "Русский",
    lang_en: "Английский",
    books_tab: "Книги",
    resources_tab: "Электронные ресурсы",
    results: "результатов",
  },
  en: {
    title: "E-Catalog",
    subtitle: "ATMU Library Fund — physical books, e-textbooks and scientific articles",
    search_ph: "Search by book, author, department or subject...",
    filters: "Filters",
    category: "Category",
    language: "Language",
    all: "All",
    sort: "Sort",
    sort_new: "Recently Added",
    sort_views: "Most Viewed",
    sort_title: "By Title",
    loading: "Loading...",
    no_results: "No results found",
    read: "Read",
    download: "Download",
    reserve: "Reserve",
    details: "Details",
    available: "Available",
    borrowed: "Borrowed",
    reserved: "Reserved",
    copies: "copies",
    views: "views",
    downloads: "downloads",
    type_book: "Book",
    type_resource: "E-Resource",
    lang_uz: "Uzbek",
    lang_ru: "Russian",
    lang_en: "English",
    books_tab: "Books",
    resources_tab: "E-Resources",
    results: "results",
  },
  tr: {
    title: "E-Katalog",
    subtitle: "ATMU Kütüphane Fonu — fiziksel kitaplar, e-ders kitapları ve bilimsel makaleler",
    search_ph: "Kitap, yazar, bölüm veya derse göre arama...",
    filters: "Filtreler",
    category: "Kategori",
    language: "Dil",
    all: "Tümü",
    sort: "Sırala",
    sort_new: "Yeni Eklenenler",
    sort_views: "En Çok Görüntülenen",
    sort_title: "Başlığa Göre",
    loading: "Yükleniyor...",
    no_results: "Sonuç bulunamadı",
    read: "Oku",
    download: "İndir",
    reserve: "Rezerve Et",
    details: "Detaylar",
    available: "Mevcut",
    borrowed: "Ödünç",
    reserved: "Rezerve",
    copies: "nüsha",
    views: "görüntüleme",
    downloads: "indirme",
    type_book: "Kitap",
    type_resource: "E-Kaynak",
    lang_uz: "Özbekçe",
    lang_ru: "Rusça",
    lang_en: "İngilizce",
    books_tab: "Kitaplar",
    resources_tab: "E-Kaynaklar",
    results: "sonuç",
  },
};

const CATEGORIES_UZ = ["Hammasi","Dasturlash","Ma'lumotlar bazasi","Tarmoqlar","Algoritmlar","Kiberxavfsizlik","Iqtisodiyot","Matematika","Pedagogika","Filologiya","Tarix"];
const LANGS = [
  { value: "", labelKey: "all" },
  { value: "uz", labelKey: "lang_uz" },
  { value: "ru", labelKey: "lang_ru" },
  { value: "en", labelKey: "lang_en" },
];

function BookCard({ item, onReserve, L, isBook }: { item: any; onReserve: (b: any) => void; L: Record<string, string>; isBook: boolean }) {
  const available = isBook ? item.available_copies > 0 : true;
  const statusColor = available ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-red-50 text-red-700 border-red-200";
  const statusLabel = isBook ? (item.available_copies > 0 ? L.available : L.borrowed) : L.available;

  return (
    <div className="portal-card group flex flex-col">
      {/* Cover area */}
      <div
        className="h-40 relative overflow-hidden flex items-center justify-center flex-shrink-0"
        style={{ background: "linear-gradient(135deg, #061B3A 0%, #1457A8 100%)" }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-3 right-3 w-16 h-16 rounded-full border border-white" />
          <div className="absolute bottom-3 left-3 w-10 h-10 rounded-full border border-white/50" />
        </div>
        <BookOpen size={36} className="text-white/30" />
        <div className="absolute top-3 left-3">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusColor}`}>
            {statusLabel}
          </span>
        </div>
        {isBook && (
          <div className="absolute bottom-3 right-3 bg-white/10 text-white text-[10px] px-2 py-0.5 rounded-full">
            {item.available_copies || 0}/{item.total_copies || 0} {L.copies}
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-semibold text-[#1457A8] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
            {isBook ? L.type_book : L.type_resource}
          </span>
          {item.language && (
            <span className="text-[10px] text-gray-400 font-medium uppercase">{item.language}</span>
          )}
        </div>

        <h3 className="text-[#172033] font-bold text-[13px] leading-snug mb-1 group-hover:text-[#1457A8] transition-colors line-clamp-2 flex-1">
          {item.title}
        </h3>

        <div className="text-gray-500 text-[11px] mb-1">{item.author || item.department?.name_uz || ""}</div>

        {item.category && (
          <div className="text-[10px] text-gray-400 mb-2 line-clamp-1">{item.category}</div>
        )}

        {/* Stats */}
        <div className="flex items-center gap-3 text-[11px] text-gray-400 mb-3 border-t border-gray-50 pt-2 mt-auto">
          {item.view_count !== undefined && (
            <span className="flex items-center gap-0.5"><Eye size={11} />{item.view_count || 0}</span>
          )}
          {item.download_count !== undefined && (
            <span className="flex items-center gap-0.5"><Download size={11} />{item.download_count || 0}</span>
          )}
          {item.year && (
            <span className="flex items-center gap-0.5"><Clock size={11} />{item.year}</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-1.5">
          <button className="flex-1 flex items-center justify-center gap-1 text-[11px] font-semibold py-2 rounded-lg bg-[#1457A8] text-white hover:bg-[#0B3D73] transition-colors">
            <BookOpen size={12} />{L.read}
          </button>
          {item.download_allowed !== false && (
            <button className="flex items-center justify-center w-9 h-8 rounded-lg border border-gray-200 text-gray-500 hover:border-[#1457A8] hover:text-[#1457A8] transition-colors">
              <Download size={12} />
            </button>
          )}
          {isBook && available && (
            <button
              onClick={() => onReserve(item)}
              className="flex items-center justify-center w-9 h-8 rounded-lg border border-gray-200 text-gray-500 hover:border-emerald-500 hover:text-emerald-600 transition-colors"
            >
              <BookMarked size={12} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CatalogPage() {
  const locale = useLocale() as Locale;
  const L = T[locale] || T.uz;
  const [tab, setTab] = useState<"books" | "resources">("books");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [language, setLanguage] = useState("");
  const [sort, setSort] = useState("new");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [reserveBook, setReserveBook] = useState<any>(null);

  const fetchData = useCallback(() => {
    setLoading(true);
    const params: any = { limit: 24, offset: 0 };
    if (search) params.search = search;
    if (language) params.language = language;
    if (category && category !== "Hammasi") params.category = category;

    const api = tab === "books" ? booksApi.list(params) : resourcesApi.list({ ...params, status: "approved" });
    api.then((r: any) => {
      const data = Array.isArray(r.data) ? r.data : (r.data?.items || []);
      setItems(data);
      setTotal(r.data?.total || data.length);
    }).catch(() => setItems([])).finally(() => setLoading(false));
  }, [search, language, category, tab]);

  useEffect(() => {
    const t = setTimeout(fetchData, search ? 400 : 0);
    return () => clearTimeout(t);
  }, [fetchData]);

  const SEED_BOOKS = [
    { id: 1, title: "Algoritm va dasturlash", author: "Karimov A.K., Toshmatov B.S.", category: "Algoritmlar", language: "uz", year: 2023, total_copies: 5, available_copies: 3, view_count: 245, download_count: 0 },
    { id: 2, title: "Ma'lumotlar bazasini loyihalash", author: "Rahimov B.N.", category: "Ma'lumotlar bazasi", language: "uz", year: 2022, total_copies: 8, available_copies: 5, view_count: 312, download_count: 0 },
    { id: 3, title: "Компьютерные сети", author: "Таненбаум Э.", category: "Tarmoqlar", language: "ru", year: 2021, total_copies: 3, available_copies: 1, view_count: 198, download_count: 0 },
    { id: 4, title: "Introduction to Algorithms", author: "Cormen T.H., Leiserson C.E.", category: "Algoritmlar", language: "en", year: 2022, total_copies: 2, available_copies: 2, view_count: 421, download_count: 0 },
    { id: 5, title: "Kiberxavfsizlik: Nazariya va amaliyot", author: "Mirzayev D.A.", category: "Kiberxavfsizlik", language: "uz", year: 2024, total_copies: 4, available_copies: 4, view_count: 167, download_count: 0 },
    { id: 6, title: "Python dasturlash asoslari", author: "Yusupova N.K.", category: "Dasturlash", language: "uz", year: 2024, total_copies: 6, available_copies: 2, view_count: 389, download_count: 0 },
  ];

  const SEED_RESOURCES = [
    { id: 1, title: "Ma'lumotlar bazasi: To'liq kurs", author: "Dr. Nodira Yusupova", material_type: "textbook", language: "uz", course: 2, semester: 3, view_count: 342, download_count: 128, download_allowed: true },
    { id: 2, title: "Python dasturlash: Amaliy qo'llanma", author: "Dr. Nodira Yusupova", material_type: "study_guide", language: "uz", course: 1, semester: 1, view_count: 567, download_count: 234, download_allowed: true },
    { id: 3, title: "Sun'iy intellekt va Machine Learning asoslari", author: "Prof. Behruz Rahimov", material_type: "lecture", language: "uz", course: 4, semester: 7, view_count: 289, download_count: 97, download_allowed: true },
    { id: 4, title: "Kompyuter tarmoqlari: Laboratoriya ishlari", author: "Dr. Nodira Yusupova", material_type: "lab_work", language: "uz", course: 3, semester: 5, view_count: 198, download_count: 76, download_allowed: true },
    { id: 5, title: "Iqtisodiyot nazariyasi: Ma'ruzalar kursi", author: "Prof. Dilnoza Hasanova", material_type: "lecture", language: "uz", course: 1, semester: 2, view_count: 156, download_count: 54, download_allowed: true },
    { id: 6, title: "Matematik tahlil: To'plam va masalalar", author: "Dos. Sarvar Mirzayev", material_type: "problem_book", language: "uz", course: 2, semester: 3, view_count: 203, download_count: 88, download_allowed: true },
  ];

  const displayItems = items.length > 0 ? items : (tab === "books" ? SEED_BOOKS : SEED_RESOURCES);

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Page header */}
      <div className="gradient-navy py-10 px-4">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex items-center gap-1.5 text-white/50 text-xs mb-3">
            <Link href="/" className="hover:text-white/80 transition-colors">
              {locale === "uz" ? "Bosh sahifa" : locale === "ru" ? "Главная" : locale === "tr" ? "Ana Sayfa" : "Home"}
            </Link>
            <ChevronRight size={12} />
            <span className="text-white/80">{L.title}</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">{L.title}</h1>
          <p className="text-white/60 text-sm">{L.subtitle}</p>

          {/* Search */}
          <div className="mt-6 flex gap-0 max-w-2xl">
            <div className="flex-1 flex items-center bg-white rounded-l-xl overflow-hidden shadow-lg">
              <Search size={16} className="ml-4 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={L.search_ph}
                className="flex-1 px-3 py-3.5 text-gray-800 bg-transparent outline-none text-[13px]"
              />
              {search && (
                <button onClick={() => setSearch("")} className="px-3 text-gray-400 hover:text-gray-600">
                  <X size={14} />
                </button>
              )}
            </div>
            <button className="bg-yellow-400 hover:bg-yellow-300 text-[#061B3A] font-bold px-6 rounded-r-xl transition-colors text-[13px]">
              {locale === "uz" ? "Qidirish" : locale === "ru" ? "Поиск" : locale === "tr" ? "Ara" : "Search"}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 py-8">
        {/* Tab + tools */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1">
            <button
              onClick={() => setTab("books")}
              className={`px-4 py-2 rounded-lg text-[13px] font-semibold transition-all ${tab === "books" ? "bg-[#1457A8] text-white shadow-sm" : "text-gray-600 hover:text-[#1457A8]"}`}
            >
              {L.books_tab}
            </button>
            <button
              onClick={() => setTab("resources")}
              className={`px-4 py-2 rounded-lg text-[13px] font-semibold transition-all ${tab === "resources" ? "bg-[#1457A8] text-white shadow-sm" : "text-gray-600 hover:text-[#1457A8]"}`}
            >
              {L.resources_tab}
            </button>
          </div>

          <div className="flex items-center gap-3">
            {total > 0 && (
              <span className="text-gray-500 text-[13px]">
                {total} {L.results}
              </span>
            )}
            <div className="flex border border-gray-200 rounded-lg overflow-hidden bg-white">
              <button onClick={() => setViewMode("grid")} className={`px-3 py-2 ${viewMode === "grid" ? "bg-[#1457A8] text-white" : "text-gray-500 hover:text-[#1457A8]"}`}>
                <LayoutGrid size={14} />
              </button>
              <button onClick={() => setViewMode("list")} className={`px-3 py-2 ${viewMode === "list" ? "bg-[#1457A8] text-white" : "text-gray-500 hover:text-[#1457A8]"}`}>
                <List size={14} />
              </button>
            </div>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-lg text-[13px] text-gray-600 hover:border-[#1457A8] hover:text-[#1457A8] transition-colors lg:hidden">
              <Filter size={14} />{L.filters}
            </button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className={`${sidebarOpen ? "block" : "hidden"} lg:block w-56 shrink-0`}>
            <div className="portal-sidebar sticky top-24">
              <div className="sidebar-title">
                <SlidersHorizontal size={14} />
                {L.filters}
              </div>
              <div className="p-4 space-y-5">
                {/* Category */}
                <div>
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-2">{L.category}</div>
                  <div className="space-y-0.5">
                    {CATEGORIES_UZ.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setCategory(cat === "Hammasi" ? "" : cat)}
                        className={`sidebar-link w-full text-left text-[13px] ${(category === "" && cat === "Hammasi") || category === cat ? "active" : ""}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Language */}
                <div className="border-t border-gray-100 pt-4">
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-2">{L.language}</div>
                  <div className="space-y-0.5">
                    {LANGS.map((lang) => (
                      <button
                        key={lang.value}
                        onClick={() => setLanguage(lang.value)}
                        className={`sidebar-link w-full text-left text-[13px] ${language === lang.value ? "active" : ""}`}
                      >
                        {L[lang.labelKey]}
                      </button>
                    ))}
                  </div>
                </div>

                {(search || category || language) && (
                  <button
                    onClick={() => { setSearch(""); setCategory(""); setLanguage(""); }}
                    className="w-full flex items-center justify-center gap-1.5 text-[12px] text-red-500 border border-red-200 py-2 rounded-lg hover:bg-red-50 transition-colors mt-2"
                  >
                    <X size={12} />
                    {locale === "uz" ? "Filtrlarni tozalash" : locale === "ru" ? "Сбросить" : locale === "tr" ? "Sıfırla" : "Clear"}
                  </button>
                )}
              </div>
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="flex items-center justify-center h-48">
                <Loader2 className="animate-spin text-[#1457A8]" size={28} />
              </div>
            ) : displayItems.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <BookOpen size={40} className="mx-auto mb-3 opacity-30" />
                <div className="font-medium">{L.no_results}</div>
              </div>
            ) : (
              <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4" : "space-y-3"}>
                {displayItems.map((item) => (
                  <BookCard key={item.id} item={item} onReserve={setReserveBook} L={L} isBook={tab === "books"} />
                ))}
              </div>
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
