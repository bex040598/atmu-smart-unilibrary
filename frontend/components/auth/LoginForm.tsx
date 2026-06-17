"use client";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { authApi } from "@/lib/api";
import { saveTokens, saveUser, getDashboardPath } from "@/lib/auth";
import { Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";

export default function LoginForm() {
  const t = useTranslations("auth");
  const locale = useLocale();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await authApi.login(email, password);
      saveTokens(data.access_token, data.refresh_token);
      saveUser(data.user);
      router.push(getDashboardPath(data.user.role, locale));
    } catch (err: any) {
      setError(err.response?.data?.detail || t("loginSuccess") === "" ? "Xato yuz berdi" : "Email yoki parol noto'g'ri");
    } finally {
      setLoading(false);
    }
  };

  const DEMO_ACCOUNTS = [
    { email: "student@atmu.uz", role: "Talaba" },
    { email: "teacher@atmu.uz", role: "O'qituvchi" },
    { email: "librarian@atmu.uz", role: "Kutubxonachi" },
    { email: "admin@atmu.uz", role: "Admin" },
  ];

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-2xl font-bold text-[#061B3A] mb-2">{t("login")}</h2>
        <p className="text-gray-500 text-sm mb-6">ATMU Smart UniLibrary tizimiga kiring</p>

        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm mb-4">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("email")}</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="email@atmu.uz"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1457A8]/20 focus:border-[#1457A8]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("password")}</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1457A8]/20 focus:border-[#1457A8]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#1457A8] hover:bg-[#0B3D73] text-white font-semibold rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Kirish..." : t("login")}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-500">
          {t("noAccount")}{" "}
          <Link href="/auth/register" className="text-[#1457A8] font-medium hover:underline">
            {t("register")}
          </Link>
        </div>

        {/* Demo accounts */}
        <div className="mt-6 p-4 bg-[#F5F7FA] rounded-xl">
          <div className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">Demo hisoblar</div>
          <div className="grid grid-cols-2 gap-2">
            {DEMO_ACCOUNTS.map((acc) => (
              <button
                key={acc.email}
                onClick={() => {
                  setEmail(acc.email);
                  const pwMap: Record<string, string> = {
                    "student@atmu.uz": "Student123!",
                    "teacher@atmu.uz": "Teacher123!",
                    "librarian@atmu.uz": "Librarian123!",
                    "admin@atmu.uz": "Admin123!",
                  };
                  setPassword(pwMap[acc.email] || "");
                }}
                className="text-left px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs hover:border-[#1457A8] hover:text-[#1457A8] transition-colors"
              >
                <div className="font-medium">{acc.role}</div>
                <div className="text-gray-400 truncate">{acc.email}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
