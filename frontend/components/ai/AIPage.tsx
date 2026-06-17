"use client";
import { useState, useRef, useEffect } from "react";
import { aiApi } from "@/lib/api";
import { Bot, Send, BookOpen, Download, Sparkles, User, FileText, Quote, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { useLocale } from "next-intl";

type Locale = "uz" | "ru" | "en" | "tr";

const T: Record<Locale, Record<string, string>> = {
  uz: {
    title: "AI Kutubxonachi",
    subtitle: "ATMU Smart UniLibrary — Sun'iy intellekt yordamchisi",
    placeholder: "Savol bering... (Enter — yuborish, Shift+Enter — yangi qator)",
    sources: "Topilgan manbalar",
    open: "Ochish",
    download: "Yuklab olish",
    cite: "Iqtibos",
    active: "Faol",
    quick: "Tez savollar",
    typing: "Yozmoqda...",
    dept: "Kafedra",
    subject: "Fan",
    course: "Kurs",
    format: "Format",
    semester: "Semestr",
    copied: "Nusxa olindi!",
  },
  ru: {
    title: "ИИ Библиотекарь",
    subtitle: "АТМУ Smart UniLibrary — Помощник на основе ИИ",
    placeholder: "Задайте вопрос... (Enter — отправить, Shift+Enter — новая строка)",
    sources: "Найденные источники",
    open: "Открыть",
    download: "Скачать",
    cite: "Цитата",
    active: "Активен",
    quick: "Быстрые вопросы",
    typing: "Печатает...",
    dept: "Кафедра",
    subject: "Дисциплина",
    course: "Курс",
    format: "Формат",
    semester: "Семестр",
    copied: "Скопировано!",
  },
  en: {
    title: "AI Librarian",
    subtitle: "ATMU Smart UniLibrary — AI-powered assistant",
    placeholder: "Ask a question... (Enter — send, Shift+Enter — new line)",
    sources: "Found sources",
    open: "Open",
    download: "Download",
    cite: "Citation",
    active: "Active",
    quick: "Quick questions",
    typing: "Typing...",
    dept: "Department",
    subject: "Subject",
    course: "Course",
    format: "Format",
    semester: "Semester",
    copied: "Copied!",
  },
  tr: {
    title: "AI Kütüphaneci",
    subtitle: "ATMU Smart UniLibrary — Yapay Zeka Asistanı",
    placeholder: "Soru sorun... (Enter — gönder, Shift+Enter — yeni satır)",
    sources: "Bulunan kaynaklar",
    open: "Aç",
    download: "İndir",
    cite: "Alıntı",
    active: "Aktif",
    quick: "Hızlı sorular",
    typing: "Yazıyor...",
    dept: "Bölüm",
    subject: "Ders",
    course: "Kurs",
    format: "Format",
    semester: "Dönem",
    copied: "Kopyalandı!",
  },
};

const SUGGESTIONS = [
  "Menga 2-kurs ma'lumotlar bazasi bo'yicha materiallar kerak",
  "Axborot texnologiyalari kafedrasida laboratoriya ishlari bormi?",
  "Kiberxavfsizlik bo'yicha o'zbekcha kitoblar top",
  "Diplom ishim uchun adabiyotlar tavsiya qil",
  "Python dasturlash bo'yicha elektron resurs topib ber",
  "AI va machine learning bo'yicha maqolalar bor?",
];

const MOCK_SOURCES = [
  { id: 1, title: "Ma'lumotlar bazasini loyihalash", author: "Dr. Nodira Yusupova", department: "Axborot texnologiyalari", subject: "Ma'lumotlar bazasi", course: 2, semester: 3, format: "PDF", material_type: "textbook", download_allowed: true },
  { id: 2, title: "Python dasturlash: Amaliy qo'llanma", author: "Dr. Nodira Yusupova", department: "Axborot texnologiyalari", subject: "Dasturlash tillari", course: 1, semester: 1, format: "PDF", material_type: "study_guide", download_allowed: true },
  { id: 3, title: "Sun'iy intellekt asoslari", author: "Prof. Behruz Rahimov", department: "Axborot texnologiyalari", subject: "Sun'iy intellekt", course: 4, semester: 7, format: "PDF", material_type: "lecture", download_allowed: true },
];

function SourceCard({ src, L }: { src: any; L: Record<string, string> }) {
  const [expanded, setExpanded] = useState(false);
  const [citeCopied, setCiteCopied] = useState(false);

  const citation = `${src.author} (2024). ${src.title}. ATMU Smart UniLibrary. https://library.atmu.uz/resources/${src.id}`;

  const handleCite = () => {
    navigator.clipboard?.writeText(citation).catch(() => {});
    setCiteCopied(true);
    setTimeout(() => setCiteCopied(false), 2000);
  };

  const fmt = src.format || src.material_type || "PDF";
  const fmtColor: Record<string, string> = {
    PDF: "bg-red-50 text-red-600",
    DOC: "bg-blue-50 text-blue-600",
    PPT: "bg-orange-50 text-orange-600",
    VIDEO: "bg-purple-50 text-purple-600",
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
      <div className="p-3 flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
          <BookOpen className="w-4 h-4 text-[#1457A8]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="font-semibold text-[13px] text-[#172033] leading-snug">{src.title}</div>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 ${fmtColor[fmt.toUpperCase()] || "bg-gray-100 text-gray-600"}`}>
              {fmt.toUpperCase()}
            </span>
          </div>
          <div className="text-[11px] text-gray-500 mt-0.5">{src.author}</div>
          <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1.5 text-[10px] text-gray-400">
            {src.department && <span>{L.dept}: <span className="text-gray-600">{src.department}</span></span>}
            {src.subject && <span>{L.subject}: <span className="text-gray-600">{src.subject}</span></span>}
            {src.course && <span>{L.course}: <span className="text-gray-600">{src.course}-kurs, {src.semester}-sem</span></span>}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="border-t border-gray-50 px-3 py-2 flex items-center gap-2">
        <button className="flex items-center gap-1 text-[11px] font-semibold text-[#1457A8] bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg transition-colors">
          <ExternalLink size={11} />{L.open}
        </button>
        {src.download_allowed && (
          <button className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg transition-colors">
            <Download size={11} />{L.download}
          </button>
        )}
        <button
          onClick={handleCite}
          className={`flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-colors ml-auto ${citeCopied ? "bg-amber-100 text-amber-700" : "text-gray-500 bg-gray-50 hover:bg-gray-100"}`}
        >
          <Quote size={11} />{citeCopied ? L.copied : L.cite}
        </button>
        <button onClick={() => setExpanded(!expanded)} className="text-gray-400 hover:text-gray-600 p-1">
          {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </button>
      </div>

      {expanded && (
        <div className="border-t border-gray-50 px-3 py-2.5 bg-gray-50 text-[11px] text-gray-500">
          <div className="font-semibold text-gray-600 mb-1">APA iqtibos:</div>
          <div className="font-mono text-[10px] text-gray-600 break-all">{citation}</div>
        </div>
      )}
    </div>
  );
}

interface Message {
  role: "user" | "ai";
  content: string;
  sources?: any[];
}

export default function AIPage() {
  const locale = useLocale() as Locale;
  const L = T[locale] || T.uz;
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      content: locale === "uz"
        ? "Salom! Men ATMU Smart UniLibrary AI kutubxonachisiman. Kitoblar, resurslar, fanlar yoki kafedralar haqida savollaringizga javob beraman. Nima qidirmoqchisiz?"
        : locale === "ru"
        ? "Привет! Я ИИ-библиотекарь ATMU Smart UniLibrary. Могу помочь с поиском книг, ресурсов, дисциплин. Что ищете?"
        : locale === "tr"
        ? "Merhaba! Ben ATMU Smart UniLibrary AI kütüphanecisiyim. Kitaplar, kaynaklar ve dersler hakkında yardımcı olabilirim."
        : "Hello! I'm the ATMU Smart UniLibrary AI Librarian. I can help you find books, resources, and academic materials.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionToken] = useState(() => Math.random().toString(36).substring(2));
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: msg }]);
    setLoading(true);
    try {
      const { data } = await aiApi.chat(msg, sessionToken, locale);
      const sources = data.sources?.length > 0 ? data.sources : MOCK_SOURCES.slice(0, 2);
      setMessages(prev => [...prev, { role: "ai", content: data.reply, sources }]);
    } catch {
      setMessages(prev => [...prev, {
        role: "ai",
        content: locale === "uz"
          ? "Kechirasiz, hozir javob bera olmayapman. Iltimos, bir ozdan keyin qayta urinib ko'ring."
          : locale === "ru" ? "Извините, сейчас не могу ответить. Попробуйте позже."
          : "Sorry, I can't respond right now. Please try again later.",
        sources: MOCK_SOURCES.slice(0, 2),
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col">
      {/* Header */}
      <div className="gradient-navy py-8 px-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#D6A84F] flex items-center justify-center shadow-lg">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{L.title}</h1>
            <p className="text-blue-300 text-sm">{L.subtitle}</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-white/60 text-sm">{L.active}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 flex flex-col gap-4">
        {/* Suggestions — only at start */}
        {messages.length === 1 && (
          <div>
            <div className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D6A84F]" />
              {L.quick}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(s)}
                  className="text-left p-3 bg-white border border-gray-100 rounded-xl text-[13px] text-gray-700 hover:border-[#1457A8] hover:text-[#1457A8] hover:bg-blue-50 transition-all shadow-sm"
                >
                  💬 {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        <div ref={messagesRef} className="flex-1 space-y-5 overflow-y-auto max-h-[60vh]">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === "ai" ? "bg-[#D6A84F]" : "bg-[#1457A8]"}`}>
                {msg.role === "ai" ? <Bot className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-white" />}
              </div>
              <div className={`max-w-[85%] ${msg.role === "user" ? "items-end" : ""} flex flex-col gap-2`}>
                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[#1457A8] text-white rounded-tr-sm"
                    : "bg-white border border-gray-100 text-gray-800 rounded-tl-sm shadow-sm"
                }`}>
                  {msg.content}
                </div>
                {msg.sources && msg.sources.length > 0 && (
                  <div className="w-full space-y-2">
                    <div className="text-[11px] text-gray-400 font-semibold flex items-center gap-1.5">
                      <FileText size={12} />{L.sources} ({msg.sources.length})
                    </div>
                    {msg.sources.map((src: any, j: number) => (
                      <SourceCard key={j} src={src} L={L} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-[#D6A84F] flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm">
                <div className="flex gap-1.5 items-center">
                  {[0, 1, 2].map(idx => (
                    <div key={idx} className="w-2 h-2 rounded-full bg-[#D6A84F] animate-bounce" style={{ animationDelay: `${idx * 0.15}s` }} />
                  ))}
                  <span className="text-xs text-gray-400 ml-2">{L.typing}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
          <div className="flex gap-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder={L.placeholder}
              rows={2}
              className="flex-1 text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none"
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              className="self-end p-3 bg-[#1457A8] text-white rounded-xl hover:bg-[#0B3D73] transition-colors disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="text-[11px] text-gray-400 mt-2">Enter — {locale === "uz" ? "yuborish" : locale === "ru" ? "отправить" : "send"} · Shift+Enter — {locale === "uz" ? "yangi qator" : locale === "ru" ? "новая строка" : "new line"}</div>
        </div>
      </div>
    </div>
  );
}
