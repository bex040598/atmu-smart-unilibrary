"use client";
import { useState } from "react";
import { reservationsApi } from "@/lib/api";
import { X, Calendar, CheckCircle, AlertCircle } from "lucide-react";
import { isAuthenticated } from "@/lib/auth";

export default function ReserveModal({ book, onClose }: { book: any; onClose: () => void }) {
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleReserve = async () => {
    if (!isAuthenticated()) {
      setError("Kitob band qilish uchun tizimga kiring");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await reservationsApi.create({
        book_id: book.id,
        pickup_date: date || undefined,
        notes,
      });
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Xato yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="font-bold text-lg text-[#061B3A]">Kitob band qilish</h3>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {success ? (
          <div className="p-8 text-center">
            <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
            <h4 className="font-bold text-[#061B3A] text-lg mb-2">Muvaffaqiyatli band qilindi!</h4>
            <p className="text-gray-500 text-sm">Kutubxonachi tasdiqlagandan so'ng siz xabardor bo'lasiz.</p>
            <button onClick={onClose} className="mt-4 px-6 py-2.5 bg-[#1457A8] text-white rounded-xl font-semibold text-sm">
              Yopish
            </button>
          </div>
        ) : (
          <div className="p-6 space-y-4">
            <div className="p-3 bg-[#F5F7FA] rounded-xl">
              <div className="font-semibold text-sm text-[#172033]">{book.title}</div>
              <div className="text-xs text-gray-400 mt-0.5">{book.author}</div>
              <div className="mt-2 flex items-center gap-2 text-xs">
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full font-medium">
                  {book.available_copies} ta nusxa mavjud
                </span>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-xl text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Olish sanasi</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1457A8]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Izoh (ixtiyoriy)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Qo'shimcha izoh..."
                rows={2}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1457A8] resize-none"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={onClose} className="flex-1 py-3 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50">
                Bekor qilish
              </button>
              <button
                onClick={handleReserve}
                disabled={loading}
                className="flex-1 py-3 bg-[#1457A8] text-white font-semibold rounded-xl hover:bg-[#0B3D73] disabled:opacity-60"
              >
                {loading ? "Band qilinmoqda..." : "Band qilish"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
