"use client";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { Bot, Send, ArrowRight, BookOpen } from "lucide-react";

const SUGGESTIONS = [
  "Menga 2-kurs ma'lumotlar bazasi bo'yicha materiallar kerak",
  "Kiberxavfsizlik bo'yicha o'zbekcha kitoblar",
  "AI bo'yicha video darslar bormi?",
];

const DEMO_RESPONSE = {
  text: "Ma'lumotlar bazasi bo'yicha 3 ta resurs topildi:",
  sources: [
    { title: "Ma'lumotlar bazasi: To'liq kurs", type: "Darslik", author: "Dr. N. Yusupova" },
    { title: "SQL va PostgreSQL amaliyoti", type: "Laboratoriya", author: "B. Rahimov" },
  ],
};

export default function AIPreview() {
  const [message, setMessage] = useState("");
  const [chatStarted, setChatStarted] = useState(false);

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-[#061B3A] to-[#0B3D73]">
      <div className="max-w-3xl mx-auto lg:max-w-none lg:px-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-[#D6A84F] flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">AI Kutubxonachi</h2>
            <p className="text-blue-300 text-sm">Katalog va kafedra resurslari bilan bog'langan</p>
          </div>
        </div>

        {/* Chat demo */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-4 mb-4 min-h-[200px]">
          {!chatStarted ? (
            <div className="space-y-2">
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => { setMessage(s); setChatStarted(true); }}
                  className="w-full text-left px-4 py-3 bg-white/10 hover:bg-white/20 text-white/80 text-sm rounded-xl transition-colors border border-white/10"
                >
                  💬 {s}
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex justify-end">
                <div className="bg-[#1457A8] text-white text-sm px-4 py-2 rounded-2xl rounded-tr-sm max-w-[80%]">
                  {message}
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-[#D6A84F] flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="bg-white/20 text-white text-sm px-4 py-2 rounded-2xl rounded-tl-sm mb-2">
                    {DEMO_RESPONSE.text}
                  </div>
                  {DEMO_RESPONSE.sources.map((src, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 bg-white/10 rounded-lg mb-1.5 text-xs">
                      <BookOpen className="w-3.5 h-3.5 text-[#D6A84F]" />
                      <div className="flex-1 min-w-0">
                        <div className="text-white font-medium truncate">{src.title}</div>
                        <div className="text-white/50">{src.type} · {src.author}</div>
                      </div>
                      <button className="text-[#D6A84F] hover:underline shrink-0">Ochish</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Savol bering..."
            className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl text-sm focus:outline-none focus:border-white/50"
          />
          <button
            onClick={() => message && setChatStarted(true)}
            className="px-4 py-3 bg-[#D6A84F] text-white rounded-xl hover:bg-[#c49840] transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        <Link
          href="/ai"
          className="flex items-center justify-center gap-2 w-full py-3 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-xl transition-colors border border-white/20"
        >
          To'liq AI kutubxonachiga o'tish
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
