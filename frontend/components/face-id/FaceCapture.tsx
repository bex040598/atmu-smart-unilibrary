"use client";
import { useState, useRef, useCallback } from "react";
import { faceApi } from "@/lib/api";
import { Camera, X, CheckCircle, AlertTriangle, RefreshCw } from "lucide-react";
import { useTranslations } from "next-intl";

type Mode = "register" | "verify";

interface FaceCaptureProps {
  mode: Mode;
  onSuccess?: () => void;
}

export default function FaceCapture({ mode, onSuccess }: FaceCaptureProps) {
  const t = useTranslations("faceId");
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [cameraActive, setCameraActive] = useState(false);
  const [captured, setCaptured] = useState<string | null>(null);
  const [capturedBlob, setCapturedBlob] = useState<Blob | null>(null);
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const startCamera = async () => {
    if (!consent && mode === "register") {
      setError("Iltimos, biometrik ma'lumotlarni saqlashga rozilik bildiring");
      return;
    }
    setError("");
    try {
      // Check HTTPS/localhost
      const isSecure = window.location.protocol === "https:" || window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
      if (!isSecure) {
        setError(t("errors.security"));
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 640, height: 480 },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraActive(true);
    } catch (err: any) {
      const errName = err.name || "";
      if (errName === "NotAllowedError" || errName === "PermissionDeniedError") {
        setError(t("errors.notAllowed"));
      } else if (errName === "NotFoundError" || errName === "DevicesNotFoundError") {
        setError(t("errors.notFound"));
      } else if (errName === "NotReadableError" || errName === "TrackStartError") {
        setError(t("errors.notReadable"));
      } else if (errName === "SecurityError") {
        setError(t("errors.security"));
      } else {
        setError(t("errors.generic") + " " + err.message);
      }
    }
  };

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  }, []);

  const capture = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
    setCaptured(dataUrl);
    canvas.toBlob((blob) => {
      if (blob) setCapturedBlob(blob);
    }, "image/jpeg", 0.9);
    stopCamera();
  };

  const reset = () => {
    setCaptured(null);
    setCapturedBlob(null);
    setSuccess(false);
    setError("");
  };

  const submit = async () => {
    if (!capturedBlob) return;
    setLoading(true);
    setError("");
    try {
      const file = new File([capturedBlob], "face.jpg", { type: "image/jpeg" });
      if (mode === "register") {
        await faceApi.register(file);
        setSuccess(true);
        onSuccess?.();
      } else {
        const { data } = await faceApi.verify(file);
        setSuccess(data.verified);
        if (!data.verified) setError("Yuz tasdiqlanmadi. Qayta urinib ko'ring.");
        else onSuccess?.();
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || t("errors.generic"));
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center py-8">
        <CheckCircle className="w-16 h-16 text-emerald-500 mb-4" />
        <h3 className="text-xl font-bold text-[#061B3A] mb-2">
          {mode === "register" ? "Yuz ro'yxatdan o'tdi!" : "Yuz tasdiqlandi!"}
        </h3>
        <p className="text-gray-500 text-sm mb-4">{t("privacy")}</p>
        <button onClick={reset} className="text-sm text-[#1457A8] hover:underline">
          Qayta qilish
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Consent (register only) */}
      {mode === "register" && !cameraActive && !captured && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <p className="text-sm text-amber-700 mb-3">{t("privacy")}</p>
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="w-4 h-4 rounded"
            />
            <span className="text-sm text-gray-700">{t("consent")}</span>
          </label>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      {/* Camera view */}
      {cameraActive ? (
        <div className="relative">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full max-h-80 bg-black rounded-2xl object-cover"
          />
          {/* Face guide overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-48 h-56 border-4 border-white/80 rounded-full opacity-70" />
          </div>
          <canvas ref={canvasRef} className="hidden" />
          <div className="flex gap-3 mt-3">
            <button
              onClick={stopCamera}
              className="flex-1 py-2.5 border border-gray-200 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-50 flex items-center justify-center gap-2"
            >
              <X className="w-4 h-4" />
              Bekor qilish
            </button>
            <button
              onClick={capture}
              className="flex-1 py-2.5 bg-[#1457A8] text-white text-sm font-semibold rounded-xl hover:bg-[#0B3D73] flex items-center justify-center gap-2"
            >
              <Camera className="w-4 h-4" />
              {t("capture")}
            </button>
          </div>
        </div>
      ) : captured ? (
        <div>
          <img src={captured} alt="Captured face" className="w-full max-h-72 bg-black rounded-2xl object-cover" />
          <canvas ref={canvasRef} className="hidden" />
          <div className="flex gap-3 mt-3">
            <button
              onClick={reset}
              className="flex-1 py-2.5 border border-gray-200 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-50 flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Qayta olish
            </button>
            <button
              onClick={submit}
              disabled={loading}
              className="flex-1 py-2.5 bg-[#0E9F6E] text-white text-sm font-semibold rounded-xl hover:bg-emerald-700 disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? "Yuklanmoqda..." : mode === "register" ? t("register") : t("verify")}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <canvas ref={canvasRef} className="hidden" />
          <button
            onClick={startCamera}
            className="w-full py-4 bg-[#1457A8] hover:bg-[#0B3D73] text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Camera className="w-5 h-5" />
            {t("enableCamera")}
          </button>
          <p className="text-xs text-center text-gray-400 mt-2">
            Kamera faqat siz ruxsat berganingizda ochiladi
          </p>
        </div>
      )}
    </div>
  );
}
