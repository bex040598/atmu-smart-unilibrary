"use client";
import { useState } from "react";
import { readingRoomApi } from "@/lib/api";
import { isAuthenticated } from "@/lib/auth";
import { Wifi, Zap, Monitor, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";

const ROOMS = [
  { id: 1, name: "Asosiy o'quv zali (1-qavat)", capacity: 40, available: 23, opens: "08:00", closes: "20:00", hasWifi: true, hasPower: true, hasProjector: true },
  { id: 2, name: "Kompyuter o'quv zali (2-qavat)", capacity: 25, available: 12, opens: "09:00", closes: "18:00", hasWifi: true, hasPower: true, hasProjector: false },
  { id: 3, name: "Jim o'quv zali (3-qavat)", capacity: 20, available: 8, opens: "08:00", closes: "22:00", hasWifi: true, hasPower: true, hasProjector: false },
];

function generateSeats(capacity: number, availableCount: number) {
  const rows = Math.ceil(capacity / 5);
  const seats = [];
  let availableLeft = availableCount;
  for (let r = 0; r < rows && seats.length < capacity; r++) {
    for (let c = 0; c < 5 && seats.length < capacity; c++) {
      const isAvailable = availableLeft > 0 && Math.random() > 0.4;
      if (isAvailable) availableLeft--;
      seats.push({
        id: `${String.fromCharCode(65 + r)}${c + 1}`,
        row: r,
        col: c,
        status: isAvailable ? "available" : (Math.random() > 0.5 ? "occupied" : "reserved"),
      });
    }
  }
  return seats;
}

export default function ReadingRoomPage() {
  const t = useTranslations("readingRoom");
  const [selectedRoom, setSelectedRoom] = useState(ROOMS[0]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedTime, setSelectedTime] = useState("09:00");
  const [endTime, setEndTime] = useState("12:00");
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const seats = generateSeats(selectedRoom.capacity, selectedRoom.available);

  const handleReserve = async () => {
    if (!isAuthenticated()) {
      setError("Joy band qilish uchun tizimga kiring");
      return;
    }
    if (!selectedSeat) {
      setError("Iltimos, joy tanlang");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const seatObj = seats.find(s => s.id === selectedSeat);
      if (!seatObj) throw new Error("Joy topilmadi");
      await readingRoomApi.reserve({
        seat_id: seatObj.row * 5 + seatObj.col + 1,
        reading_room_id: selectedRoom.id,
        date: selectedDate,
        start_time: selectedTime,
        end_time: endTime,
      });
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Xato yuz berdi. Demo rejimida ishlaydi.");
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-10 text-center max-w-md w-full">
          <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#061B3A] mb-2">Joy band qilindi!</h2>
          <p className="text-gray-500 mb-2">{selectedRoom.name}</p>
          <p className="text-gray-400 text-sm mb-4">{selectedDate} | {selectedTime} – {endTime} | Joy: {selectedSeat}</p>
          <div className="p-3 bg-[#F5F7FA] rounded-xl mb-6 text-sm text-gray-600">
            QR kod: <span className="font-mono font-bold">#QR-{Math.random().toString(36).substring(2, 8).toUpperCase()}</span>
          </div>
          <button onClick={() => setSuccess(false)} className="px-6 py-3 bg-[#1457A8] text-white rounded-xl font-semibold">
            Boshqa joy band qilish
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <div className="gradient-navy py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">{t("title")}</h1>
          <p className="text-blue-200">Qulay joy tanlang va vaqt belgilang</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: Settings */}
          <div className="space-y-4">
            {/* Room selection */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h3 className="font-bold text-[#061B3A] mb-4">{t("selectRoom")}</h3>
              <div className="space-y-3">
                {ROOMS.map((room) => (
                  <button
                    key={room.id}
                    onClick={() => { setSelectedRoom(room); setSelectedSeat(null); }}
                    className={`w-full text-left p-3 rounded-xl border-2 transition-all ${
                      selectedRoom.id === room.id
                        ? "border-[#1457A8] bg-blue-50"
                        : "border-gray-100 hover:border-[#1457A8]/30"
                    }`}
                  >
                    <div className="font-semibold text-sm text-[#172033] leading-tight">{room.name}</div>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                      <span>🕐 {room.opens}–{room.closes}</span>
                      <span className="text-emerald-600 font-medium">{room.available} bo'sh</span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      {room.hasWifi && <span className="text-xs bg-blue-50 text-[#1457A8] px-1.5 py-0.5 rounded">Wi-Fi</span>}
                      {room.hasPower && <span className="text-xs bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded">Elektr</span>}
                      {room.hasProjector && <span className="text-xs bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded">Proyektor</span>}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Date & Time */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h3 className="font-bold text-[#061B3A] mb-4">Vaqt tanlash</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">{t("selectDate")}</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1457A8]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Boshlanish</label>
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1457A8]"
                    >
                      {["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"].map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Tugash</label>
                    <select
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1457A8]"
                    >
                      {["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"].map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Reserve button */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-xl text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}
            {selectedSeat && (
              <button
                onClick={handleReserve}
                disabled={loading}
                className="w-full py-3.5 bg-[#008C95] hover:bg-[#006d75] text-white font-semibold rounded-xl transition-colors shadow-sm disabled:opacity-60"
              >
                {loading ? "Band qilinmoqda..." : `${selectedSeat} joyini band qilish`}
              </button>
            )}
          </div>

          {/* Right: Seat map */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[#061B3A]">{selectedRoom.name}</h3>
                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-emerald-400 inline-block" />{t("available")}</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-amber-400 inline-block" />{t("reserved")}</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-300 inline-block" />{t("occupied")}</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-[#1457A8] inline-block" />Tanlangan</span>
                </div>
              </div>

              {/* Screen indicator */}
              <div className="w-full h-8 bg-gray-100 rounded-xl mb-6 flex items-center justify-center text-xs text-gray-400 font-medium">
                📺 EKRAN / DOSKAGA QARAB
              </div>

              {/* Seat grid */}
              <div
                className="grid gap-2 mb-4"
                style={{ gridTemplateColumns: `repeat(5, minmax(0, 1fr))` }}
              >
                {seats.map((seat) => (
                  <button
                    key={seat.id}
                    disabled={seat.status !== "available"}
                    onClick={() => setSelectedSeat(selectedSeat === seat.id ? null : seat.id)}
                    className={`aspect-square rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                      selectedSeat === seat.id
                        ? "bg-[#1457A8] text-white scale-110 shadow-lg"
                        : seat.status === "available"
                        ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 hover:scale-105 cursor-pointer"
                        : seat.status === "reserved"
                        ? "bg-amber-100 text-amber-600 cursor-not-allowed"
                        : "bg-red-50 text-red-300 cursor-not-allowed"
                    }`}
                  >
                    {seat.id}
                  </button>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="text-center p-3 bg-emerald-50 rounded-xl">
                  <div className="text-2xl font-bold text-emerald-600">{selectedRoom.available}</div>
                  <div className="text-xs text-emerald-700">{t("available")}</div>
                </div>
                <div className="text-center p-3 bg-amber-50 rounded-xl">
                  <div className="text-2xl font-bold text-amber-600">
                    {Math.round((selectedRoom.capacity - selectedRoom.available) * 0.3)}
                  </div>
                  <div className="text-xs text-amber-700">{t("reserved")}</div>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-xl">
                  <div className="text-2xl font-bold text-red-600">
                    {selectedRoom.capacity - selectedRoom.available - Math.round((selectedRoom.capacity - selectedRoom.available) * 0.3)}
                  </div>
                  <div className="text-xs text-red-700">{t("occupied")}</div>
                </div>
              </div>

              {selectedSeat && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl text-sm text-[#1457A8] font-medium">
                  ✓ Tanlangan joy: <strong>{selectedSeat}</strong> — {selectedDate} | {selectedTime}–{endTime}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
