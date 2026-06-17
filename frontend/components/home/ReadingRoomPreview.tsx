"use client";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Wifi, Zap } from "lucide-react";

const SEATS = [
  { id: "A1", status: "occupied" },
  { id: "A2", status: "available" },
  { id: "A3", status: "reserved" },
  { id: "A4", status: "available" },
  { id: "A5", status: "occupied" },
  { id: "B1", status: "available" },
  { id: "B2", status: "available" },
  { id: "B3", status: "occupied" },
  { id: "B4", status: "available" },
  { id: "B5", status: "reserved" },
  { id: "C1", status: "occupied" },
  { id: "C2", status: "available" },
  { id: "C3", status: "available" },
  { id: "C4", status: "available" },
  { id: "C5", status: "occupied" },
];

const STATUS_MAP = {
  available: "bg-emerald-400",
  reserved: "bg-amber-400",
  occupied: "bg-red-400",
};

export default function ReadingRoomPreview() {
  return (
    <section className="py-16 px-4 bg-[#F5F7FA]">
      <div className="max-w-3xl mx-auto lg:max-w-none lg:px-8">
        <div className="mb-6">
          <div className="text-sm font-semibold text-[#008C95] mb-2 uppercase tracking-wider">
            🪑 O'quv zali
          </div>
          <h2 className="text-2xl font-bold text-[#061B3A]">Joy band qilish</h2>
          <p className="text-gray-500 text-sm mt-1">Asosiy o'quv zali (1-qavat) — bugungi holat</p>
        </div>

        {/* Room info */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <Wifi className="w-4 h-4 text-[#1457A8]" />
            Wi-Fi
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <Zap className="w-4 h-4 text-amber-500" />
            Elektr
          </div>
          <div className="ml-auto flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-emerald-400 inline-block" />Bo'sh</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-amber-400 inline-block" />Band</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-400 inline-block" />Egallangan</span>
          </div>
        </div>

        {/* Seat grid */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4">
          <div className="grid grid-cols-5 gap-2 mb-3">
            {SEATS.map((seat) => (
              <button
                key={seat.id}
                disabled={seat.status !== "available"}
                className={`aspect-square rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                  seat.status === "available"
                    ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 hover:scale-105 cursor-pointer"
                    : seat.status === "reserved"
                    ? "bg-amber-100 text-amber-700 cursor-not-allowed opacity-80"
                    : "bg-red-100 text-red-400 cursor-not-allowed opacity-60"
                }`}
              >
                {seat.id}
              </button>
            ))}
          </div>
          <div className="text-center text-xs text-gray-400">
            📺 Ekran / Doskaga qarab o'tirish joyi
          </div>
        </div>

        {/* Availability */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center p-3 bg-emerald-50 rounded-xl">
            <div className="text-2xl font-bold text-emerald-600">9</div>
            <div className="text-xs text-emerald-700">Bo'sh</div>
          </div>
          <div className="text-center p-3 bg-amber-50 rounded-xl">
            <div className="text-2xl font-bold text-amber-600">2</div>
            <div className="text-xs text-amber-700">Band</div>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-xl">
            <div className="text-2xl font-bold text-red-600">4</div>
            <div className="text-xs text-red-700">Egallangan</div>
          </div>
        </div>

        <Link
          href="/library/reading-room"
          className="flex items-center justify-center gap-2 w-full py-3 bg-[#008C95] hover:bg-[#006d75] text-white text-sm font-semibold rounded-xl transition-colors"
        >
          Joy band qilish
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
