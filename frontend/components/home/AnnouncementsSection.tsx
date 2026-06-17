"use client";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Bell, BookOpen, Calendar } from "lucide-react";

const ANNOUNCEMENTS = [
  {
    id: 1,
    type: "announcement",
    icon: Bell,
    color: "text-blue-500 bg-blue-50",
    title: "ATMU Smart UniLibrary ishga tushdi!",
    content: "Hurmatli talabalar va o'qituvchilar! ATMU elektron kutubxona platformasi rasman ishga tushdi. Endi barcha darsliklar, ma'ruzalar va ilmiy materiallarni onlayn ko'rishingiz mumkin.",
    date: "Bugun",
  },
  {
    id: 2,
    type: "news",
    icon: BookOpen,
    color: "text-teal-500 bg-teal-50",
    title: "Axborot texnologiyalari kafedrasi: 15 ta yangi material",
    content: "AI, kiberxavfsizlik, web dasturlash va ma'lumotlar bazasi bo'yicha yangi o'quv materiallar tasdiqlandi.",
    date: "Bugun",
  },
  {
    id: 3,
    type: "event",
    icon: Calendar,
    color: "text-amber-500 bg-amber-50",
    title: "O'quv zali yangi jadval bilan ishlaydi",
    content: "Imtihon sessiyasi vaqtida o'quv zali soat 08:00 dan 22:00 gacha ochiq bo'ladi. Ish kunlari va dam olish kunlarida.",
    date: "17 iyun, 2024",
  },
];

export default function AnnouncementsSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-sm font-semibold text-[#1457A8] mb-2 uppercase tracking-wider">
              📢 E'lonlar
            </div>
            <h2 className="text-3xl font-bold text-[#061B3A]">Yangiliklar va e'lonlar</h2>
          </div>
          <Link href="/news" className="hidden md:flex items-center gap-2 text-sm font-medium text-[#1457A8]">
            Hammasini ko'rish <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ANNOUNCEMENTS.map((ann) => (
            <div key={ann.id} className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-lg transition-all card-hover">
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-9 h-9 rounded-xl ${ann.color} flex items-center justify-center shrink-0`}>
                  <ann.icon className="w-4.5 h-4.5" />
                </div>
                <div>
                  <div className="text-xs text-gray-400">{ann.date}</div>
                  <h4 className="font-bold text-sm text-[#172033] leading-snug mt-0.5">{ann.title}</h4>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{ann.content}</p>
              <button className="mt-3 text-xs font-medium text-[#1457A8] hover:underline">
                Batafsil o'qish →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
