"use client";
import { Link } from "@/i18n/navigation";
import { BookOpen, Calendar, Upload, Bot, BookMarked, Shield } from "lucide-react";

const ACTIONS = [
  {
    icon: BookOpen,
    title: "Kitob band qilish",
    desc: "Mavjud nusxani oldindan bron qiling",
    href: "/catalog",
    color: "bg-blue-50 text-[#1457A8]",
    border: "border-blue-100",
  },
  {
    icon: Calendar,
    title: "O'quv zali",
    desc: "Joy bron qiling va tekshiruvdan o'ting",
    href: "/library/reading-room",
    color: "bg-teal-50 text-[#008C95]",
    border: "border-teal-100",
  },
  {
    icon: Upload,
    title: "Resurs yuklash",
    desc: "O'qituvchilar uchun material yuklash",
    href: "/dashboard/teacher",
    color: "bg-emerald-50 text-[#0E9F6E]",
    border: "border-emerald-100",
  },
  {
    icon: Bot,
    title: "AI Kutubxonachi",
    desc: "Aqlli yordamchidan maslahat oling",
    href: "/ai",
    color: "bg-amber-50 text-[#D6A84F]",
    border: "border-amber-100",
  },
  {
    icon: BookMarked,
    title: "Mening kitoblarim",
    desc: "Faol ijaralar va muddatlar",
    href: "/profile/library",
    color: "bg-violet-50 text-[#8B5CF6]",
    border: "border-violet-100",
  },
  {
    icon: Shield,
    title: "Face ID",
    desc: "Biometrik identifikatsiya",
    href: "/profile/face-id",
    color: "bg-red-50 text-[#EF4444]",
    border: "border-red-100",
  },
];

export default function QuickActions() {
  return (
    <section className="py-8 bg-[#061B3A]/3">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {ACTIONS.map((action, i) => (
            <Link
              key={i}
              href={action.href}
              className={`group flex flex-col items-center text-center p-4 bg-white rounded-2xl border ${action.border} hover:shadow-lg transition-all duration-300 card-hover`}
            >
              <div className={`w-12 h-12 rounded-2xl ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <action.icon className="w-6 h-6" />
              </div>
              <div className="font-semibold text-sm text-[#172033] mb-1 leading-tight">{action.title}</div>
              <div className="text-xs text-gray-400 leading-tight hidden md:block">{action.desc}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
