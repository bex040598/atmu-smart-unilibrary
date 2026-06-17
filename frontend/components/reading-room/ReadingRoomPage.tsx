"use client";
import { useState, useCallback } from "react";
import { readingRoomApi } from "@/lib/api";
import { isAuthenticated } from "@/lib/auth";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Wifi, Zap, Monitor, Clock, CheckCircle, AlertCircle, MapPin,
  Calendar, ChevronRight, QrCode, Users, X
} from "lucide-react";

type Locale = "uz" | "ru" | "en" | "tr";

const T: Record<Locale, Record<string, string>> = {
  uz: {
    title: "O'quv zali bron qilish",
    subtitle: "Joyingizni onlayn band qiling va QR kod bilan kiring",
    rooms: "O'quv zallari",
    seats: "joy",
    available: "Mavjud",
    occupied: "Band",
    reserved: "Bron",
    selected: "Tanlangan",
    date: "Sana",
    start_time: "Boshlanish vaqti",
    end_time: "Tugash vaqti",
    reserve: "Joyni band qilish",
    login_req: "Bron qilish uchun tizimga kiring",
    success: "Joy muvaffaqiyatli band qilindi!",
    qr_hint: "QR kod emailingizga yuboriladi",
    select_seat: "Joyni tanlang",
    legend: "Belgilar",
    capacity: "Sig'im",
    open_hours: "Ish vaqti",
    facilities: "Qulayliklar",
    occupancy: "Band darajasi",
    upcoming: "Rejalashtirilgan bronlar",
    select_date_room: "Sana va zalni tanlang",
    booking_info: "Bron ma'lumotlari",
    no_seat: "Joy tanlanmagan",
  },
  ru: {
    title: "Бронирование читального зала",
    subtitle: "Забронируйте место онлайн и войдите по QR-коду",
    rooms: "Читальные залы",
    seats: "мест",
    available: "Свободно",
    occupied: "Занято",
    reserved: "Забронировано",
    selected: "Выбрано",
    date: "Дата",
    start_time: "Начало",
    end_time: "Конец",
    reserve: "Забронировать место",
    login_req: "Для бронирования войдите в систему",
    success: "Место успешно забронировано!",
    qr_hint: "QR-код будет отправлен на email",
    select_seat: "Выберите место",
    legend: "Обозначения",
    capacity: "Вместимость",
    open_hours: "Часы работы",
    facilities: "Удобства",
    occupancy: "Загруженность",
    upcoming: "Запланированные брони",
    select_date_room: "Выберите дату и зал",
    booking_info: "Информация о брони",
    no_seat: "Место не выбрано",
  },
  en: {
    title: "Reading Room Booking",
    subtitle: "Book your seat online and check in with QR code",
    rooms: "Reading Rooms",
    seats: "seats",
    available: "Available",
    occupied: "Occupied",
    reserved: "Reserved",
    selected: "Selected",
    date: "Date",
    start_time: "Start time",
    end_time: "End time",
    reserve: "Book this seat",
    login_req: "Please log in to book a seat",
    success: "Seat successfully booked!",
    qr_hint: "QR code will be sent to your email",
    select_seat: "Select a seat",
    legend: "Legend",
    capacity: "Capacity",
    open_hours: "Hours",
    facilities: "Facilities",
    occupancy: "Occupancy",
    upcoming: "Upcoming bookings",
    select_date_room: "Select date and room",
    booking_info: "Booking details",
    no_seat: "No seat selected",
  },
  tr: {
    title: "Okuma Salonu Rezervasyonu",
    subtitle: "Yerinizi çevrimiçi ayırtın ve QR kodla giriş yapın",
    rooms: "Okuma Salonları",
    seats: "koltuk",
    available: "Uygun",
    occupied: "Dolu",
    reserved: "Rezerve",
    selected: "Seçildi",
    date: "Tarih",
    start_time: "Başlangıç",
    end_time: "Bitiş",
    reserve: "Rezervasyon yap",
    login_req: "Rezervasyon için giriş yapın",
    success: "Koltuk başarıyla rezerve edildi!",
    qr_hint: "QR kod e-postanıza gönderilecek",
    select_seat: "Koltuk seçin",
    legend: "Lejant",
    capacity: "Kapasite",
    open_hours: "Çalışma saatleri",
    facilities: "Olanaklar",
    occupancy: "Doluluk",
    upcoming: "Planlanmış rezervasyonlar",
    select_date_room: "Tarih ve salon seçin",
    booking_info: "Rezervasyon bilgileri",
    no_seat: "Koltuk seçilmedi",
  },
};

const ROOMS = [
  { id: 1, name_uz: "Asosiy o'quv zali", name_ru: "Основной читальный зал", name_en: "Main Reading Room", floor: "1-qavat", capacity: 40, occupied: 17, opens: "08:00", closes: "20:00", hasWifi: true, hasPower: true, hasProjector: true, hasAC: true },
  { id: 2, name_uz: "Kompyuter o'quv zali", name_ru: "Компьютерный зал", name_en: "Computer Room", floor: "2-qavat", capacity: 25, occupied: 13, opens: "09:00", closes: "18:00", hasWifi: true, hasPower: true, hasProjector: false, hasAC: true },
  { id: 3, name_uz: "Jim o'quv zali", name_ru: "Тихий читальный зал", name_en: "Silent Room", floor: "3-qavat", capacity: 20, occupied: 8, opens: "08:00", closes: "22:00", hasWifi: true, hasPower: true, hasProjector: false, hasAC: false },
];

const TIME_SLOTS = ["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00"];

type SeatStatus = "available" | "occupied" | "reserved" | "selected";

function generateSeats(capacity: number, occupied: number, cols = 5) {
  const seats: Array<{ id: string; row: number; col: number; status: SeatStatus }> = [];
  const rows = Math.ceil(capacity / cols);
  let occ = 0;
  for (let r = 0; r < rows && seats.length < capacity; r++) {
    for (let c = 0; c < cols && seats.length < capacity; c++) {
      let status: SeatStatus = "available";
      if (occ < occupied) {
        status = Math.random() > 0.5 ? "occupied" : "reserved";
        occ++;
      }
      seats.push({ id: `${String.fromCharCode(65 + r)}${c + 1}`, row: r, col: c, status });
    }
  }
  return seats;
}

const SEAT_COLORS: Record<SeatStatus, string> = {
  available: "bg-emerald-100 border-emerald-300 text-emerald-700 hover:bg-emerald-200 cursor-pointer",
  occupied: "bg-red-100 border-red-300 text-red-400 cursor-not-allowed",
  reserved: "bg-amber-100 border-amber-300 text-amber-600 cursor-not-allowed",
  selected: "bg-[#1457A8] border-[#1457A8] text-white cursor-pointer ring-2 ring-[#1457A8]/30",
};

export default function ReadingRoomPage() {
  const locale = useLocale() as Locale;
  const L = T[locale] || T.uz;

  const [selectedRoom, setSelectedRoom] = useState(ROOMS[0]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("12:00");
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [seats, setSeats] = useState(() => generateSeats(ROOMS[0].capacity, ROOMS[0].occupied));
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleRoomChange = useCallback((room: typeof ROOMS[0]) => {
    setSelectedRoom(room);
    setSelectedSeat(null);
    setSeats(generateSeats(room.capacity, room.occupied));
  }, []);

  const handleSeatClick = (seatId: string, status: SeatStatus) => {
    if (status === "occupied" || status === "reserved") return;
    setSeats(prev => prev.map(s => ({
      ...s,
      status: s.id === seatId
        ? (s.status === "selected" ? "available" : "selected")
        : (s.status === "selected" ? "available" : s.status),
    })));
    setSelectedSeat(prev => prev === seatId ? null : seatId);
  };

  const handleReserve = async () => {
    if (!isAuthenticated()) { setError(L.login_req); return; }
    if (!selectedSeat) { setError(L.select_seat); return; }
    setLoading(true);
    setError("");
    try {
      await readingRoomApi.reserve({
        room_id: selectedRoom.id,
        seat_number: selectedSeat,
        date: selectedDate,
        start_time: startTime,
        end_time: endTime,
      });
      setSuccess(true);
    } catch {
      setError(L.login_req);
    } finally {
      setLoading(false);
    }
  };

  const roomName = (r: typeof ROOMS[0]) => locale === "ru" ? r.name_ru : locale === "en" ? r.name_en : r.name_uz;
  const occupancyPct = Math.round((selectedRoom.occupied / selectedRoom.capacity) * 100);

  const cols = selectedRoom.capacity <= 25 ? 5 : 5;
  const seatRows: typeof seats[] = [];
  for (let r = 0; r < Math.ceil(seats.length / cols); r++) {
    seatRows.push(seats.slice(r * cols, r * cols + cols));
  }

  const minDate = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Header */}
      <div className="gradient-navy py-10 px-4">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex items-center gap-1.5 text-white/50 text-xs mb-3">
            <Link href="/" className="hover:text-white/80 transition-colors">
              {locale === "uz" ? "Bosh sahifa" : locale === "ru" ? "Главная" : "Home"}
            </Link>
            <ChevronRight size={12} />
            <span className="text-white/80">{L.title}</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-1">{L.title}</h1>
          <p className="text-white/60 text-sm">{L.subtitle}</p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: Room list */}
          <div className="space-y-4">
            <h2 className="font-bold text-[#061B3A] text-sm uppercase tracking-wide">{L.rooms}</h2>
            {ROOMS.map((room) => {
              const pct = Math.round((room.occupied / room.capacity) * 100);
              const isSelected = selectedRoom.id === room.id;
              return (
                <button
                  key={room.id}
                  onClick={() => handleRoomChange(room)}
                  className={`w-full text-left portal-card p-4 transition-all ${isSelected ? "border-[#1457A8] ring-1 ring-[#1457A8]/20" : "hover:border-gray-300"}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-bold text-[#172033] text-[13px]">{roomName(room)}</div>
                      <div className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
                        <MapPin size={10} />{room.floor} · {room.opens}–{room.closes}
                      </div>
                    </div>
                    {isSelected && (
                      <span className="text-[10px] bg-[#1457A8] text-white px-2 py-0.5 rounded-full font-semibold">
                        {locale === "uz" ? "Tanlangan" : locale === "ru" ? "Выбран" : "Selected"}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2 mb-2">
                    {room.hasWifi && <span title="WiFi" className="text-[#1457A8]"><Wifi size={13} /></span>}
                    {room.hasPower && <span title="Power" className="text-amber-500"><Zap size={13} /></span>}
                    {room.hasProjector && <span title="Projector" className="text-purple-500"><Monitor size={13} /></span>}
                  </div>
                  <div className="flex items-center justify-between text-[11px] mb-1.5">
                    <span className="text-gray-500">{L.occupancy}</span>
                    <span className={`font-semibold ${pct > 70 ? "text-red-500" : pct > 40 ? "text-amber-500" : "text-emerald-600"}`}>
                      {room.capacity - room.occupied}/{room.capacity} {L.seats}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${pct > 70 ? "bg-red-400" : pct > 40 ? "bg-amber-400" : "bg-emerald-400"}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Center: Seat map */}
          <div className="lg:col-span-2 space-y-4">
            {/* Date + time */}
            <div className="portal-card p-5">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">{L.date}</label>
                  <input
                    type="date"
                    min={minDate}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-[13px] focus:outline-none focus:border-[#1457A8] text-gray-800"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">{L.start_time}</label>
                  <select
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-[13px] focus:outline-none focus:border-[#1457A8] text-gray-800"
                  >
                    {TIME_SLOTS.slice(0, -1).map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">{L.end_time}</label>
                  <select
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-[13px] focus:outline-none focus:border-[#1457A8] text-gray-800"
                  >
                    {TIME_SLOTS.slice(1).map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Seat grid */}
            <div className="portal-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[#061B3A] text-[15px]">{roomName(selectedRoom)}</h3>
                <div className="flex items-center gap-3 text-[11px]">
                  {(["available","reserved","occupied","selected"] as SeatStatus[]).map(s => (
                    <span key={s} className="flex items-center gap-1">
                      <span className={`w-3 h-3 rounded border ${
                        s === "available" ? "bg-emerald-100 border-emerald-300" :
                        s === "occupied" ? "bg-red-100 border-red-300" :
                        s === "reserved" ? "bg-amber-100 border-amber-300" :
                        "bg-[#1457A8] border-[#1457A8]"
                      }`} />
                      {L[s]}
                    </span>
                  ))}
                </div>
              </div>

              {/* Screen indicator */}
              <div className="text-center mb-5">
                <div className="inline-block bg-gray-200 text-gray-500 text-[11px] px-6 py-1 rounded-t-sm font-medium">
                  {locale === "uz" ? "Ekran" : locale === "ru" ? "Экран" : "Screen"}
                </div>
                <div className="h-1 bg-gray-300 rounded-full mx-auto max-w-[80%]" />
              </div>

              <div className="space-y-2 overflow-x-auto">
                {seatRows.map((row, ri) => (
                  <div key={ri} className="flex gap-2 justify-center">
                    <span className="text-[10px] text-gray-300 w-5 flex items-center justify-center font-mono">
                      {String.fromCharCode(65 + ri)}
                    </span>
                    {row.map(seat => (
                      <button
                        key={seat.id}
                        onClick={() => handleSeatClick(seat.id, seat.status)}
                        title={seat.id}
                        className={`w-9 h-8 rounded-lg border-2 text-[10px] font-bold transition-all ${SEAT_COLORS[seat.status]}`}
                      >
                        {seat.id}
                      </button>
                    ))}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
                <div className="text-[13px] text-gray-600">
                  {selectedSeat ? (
                    <span className="flex items-center gap-1.5 text-[#1457A8] font-semibold">
                      <CheckCircle size={14} />
                      {L.select_seat}: <strong>{selectedSeat}</strong>
                    </span>
                  ) : (
                    <span className="text-gray-400">{L.no_seat}</span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-[11px] text-gray-400">
                  <Users size={12} />
                  {selectedRoom.capacity - selectedRoom.occupied}/{selectedRoom.capacity} {L.available}
                </div>
              </div>
            </div>

            {/* Booking panel */}
            <div className="portal-card p-5">
              <h3 className="font-bold text-[#061B3A] mb-4">{L.booking_info}</h3>
              <div className="grid grid-cols-2 gap-3 mb-4 text-[13px]">
                <div className="bg-[#F5F7FA] rounded-xl p-3">
                  <div className="text-[11px] text-gray-400 mb-0.5">{locale === "uz" ? "Zal" : locale === "ru" ? "Зал" : "Room"}</div>
                  <div className="font-semibold text-[#172033]">{roomName(selectedRoom)}</div>
                </div>
                <div className="bg-[#F5F7FA] rounded-xl p-3">
                  <div className="text-[11px] text-gray-400 mb-0.5">{L.date}</div>
                  <div className="font-semibold text-[#172033]">{selectedDate}</div>
                </div>
                <div className="bg-[#F5F7FA] rounded-xl p-3">
                  <div className="text-[11px] text-gray-400 mb-0.5">{locale === "uz" ? "Vaqt" : locale === "ru" ? "Время" : "Time"}</div>
                  <div className="font-semibold text-[#172033]">{startTime} — {endTime}</div>
                </div>
                <div className="bg-[#F5F7FA] rounded-xl p-3">
                  <div className="text-[11px] text-gray-400 mb-0.5">{locale === "uz" ? "Joy" : locale === "ru" ? "Место" : "Seat"}</div>
                  <div className={`font-semibold ${selectedSeat ? "text-[#1457A8]" : "text-gray-400"}`}>
                    {selectedSeat || "—"}
                  </div>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-600 text-[13px] bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4">
                  <AlertCircle size={14} />{error}
                </div>
              )}

              {success ? (
                <div className="flex flex-col items-center py-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mb-3">
                    <CheckCircle className="w-7 h-7 text-emerald-600" />
                  </div>
                  <div className="font-bold text-emerald-700 mb-1">{L.success}</div>
                  <div className="text-gray-400 text-[13px] flex items-center gap-1.5">
                    <QrCode size={14} />{L.qr_hint}
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleReserve}
                  disabled={loading || !selectedSeat}
                  className="w-full py-3.5 bg-[#1457A8] text-white font-bold rounded-xl hover:bg-[#0B3D73] transition-colors disabled:opacity-40 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="flex gap-1">{[0,1,2].map(i=><span key={i} className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" style={{animationDelay:`${i*0.15}s`}}/>)}</span>
                  ) : (
                    <><QrCode size={16} />{L.reserve}</>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
