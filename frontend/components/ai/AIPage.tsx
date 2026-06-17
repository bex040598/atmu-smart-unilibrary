"use client";
import { useState, useRef, useEffect } from "react";
import { aiApi } from "@/lib/api";
import { Bot, Send, BookOpen, Download, Sparkles, User, X } from "lucide-react";
import { useTranslations } from "next-intl";

interface Message {
  role: "user" | "ai";
  content: string;
  sources?: any[];
}

const SUGGESTIONS = [
  "Menga 2-kurs ma'lumotlar bazasi bo'yicha materiallar kerak",
  "Axborot texnologiyalari kafedrasida laboratoriya ishlari bormi?",
  "Kiberxavfsizlik bo'yicha o'zbekcha kitoblar top",
  "Diplom ishim uchun adabiyotlar tavsiya qil",
  "Shu resurs uchun APA citation yarat",
  "AI bo'yicha video darslar bormi?",
];

export default function AIPage() {
  const t = useTranslations("ai");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      content: "Salom! Men ATMU Smart UniLibrary AI kutubxonachisiman. Kitoblar, resurslar, fanlar yoki kafedralar haqida savollaringizga javob beraman. Nima qidirmoqchisiz?",
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
      const { data } = await aiApi.chat(msg, sessionToken, "uz");
      setMessages(prev => [...prev, {
        role: "ai",
        content: data.reply,
        sources: data.sources,
      }]);
    } catch {
      setMessages(prev => [...prev, {
        role: "ai",
        content: "Kechirasiz, hozir javob bera olmayapman. Iltimos, bir ozdan keyin qayta urinib ko'ring.",
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
          <div className="w-12 h-12 rounded-2xl bg-[#D6A84F] flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{t("title")}</h1>
            <p className="text-blue-300 text-sm">{t("subtitle")}</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-white/60 text-sm">Faol</span>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 flex flex-col gap-4">
        {/* Suggestions */}
        {messages.length === 1 && (
          <div>
            <div className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Tez savollar
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(s)}
                  className="text-left p-3 bg-white border border-gray-100 rounded-xl text-sm text-gray-700 hover:border-[#1457A8] hover:text-[#1457A8] hover:bg-blue-50 transition-all shadow-sm"
                >
                  💬 {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        <div
          ref={messagesRef}
          className="flex-1 space-y-4 overflow-y-auto"
        >
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === "ai" ? "bg-[#D6A84F]" : "bg-[#1457A8]"
              }`}>
                {msg.role === "ai" ? <Bot className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-white" />}
              </div>
              <div className={`max-w-[80%] ${msg.role === "user" ? "items-end" : ""} flex flex-col gap-2`}>
                <div className={`px-4 py-3 rounded-2xl text-sm ${
                  msg.role === "user"
                    ? "bg-[#1457A8] text-white rounded-tr-sm"
                    : "bg-white border border-gray-100 text-gray-800 rounded-tl-sm shadow-sm"
                }`}>
                  {msg.content}
                </div>
                {msg.sources && msg.sources.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-xs text-gray-400 font-medium">{t("sources")}:</div>
                    {msg.sources.map((src: any, j: number) => (
                      <div key={j} className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                          <BookOpen className="w-4 h-4 text-[#1457A8]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-xs text-[#172033] truncate">{src.title}</div>
                          <div className="text-xs text-gray-400 mt-0.5">
                            {src.author} · {src.material_type || src.type}
                          </div>
                        </div>
                        <button className="text-xs text-[#1457A8] font-medium shrink-0 hover:underline">{t("open")}</button>
                      </div>
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
                <div className="flex gap-1.5">
                  {[0, 1, 2].map(i => (
                    <div key={i} className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
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
              placeholder={t("placeholder")}
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
          <div className="text-xs text-gray-400 mt-2">Enter — yuborish · Shift+Enter — yangi qator</div>
        </div>
      </div>
    </div>
  );
}
