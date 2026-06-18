"use client";
import { useState } from "react";
import { useLocale } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { authApi } from "@/lib/api";
import { saveTokens, saveUser, getDashboardPath } from "@/lib/auth";
import {
  Mail, Lock, Eye, EyeOff, AlertCircle, BookOpen,
  GraduationCap, ChevronLeft, Search, Brain, CalendarCheck, BookMarked
} from "lucide-react";

type Locale = "uz" | "ru" | "en" | "tr";

const ROLE_OPTIONS = [
  { val: "student", uz: "Talaba", ru: "Студент", en: "Student" },
  { val: "teacher", uz: "O'qituvchi", ru: "Преподаватель", en: "Teacher" },
  { val: "librarian", uz: "Kutubxonachi", ru: "Библиотекарь", en: "Librarian" },
  { val: "admin", uz: "Administrator", ru: "Администратор", en: "Admin" },
];

const ELIB_FEATURES = [
  { icon: <Search size={16} />, uz: "Elektron katalog", ru: "Электронный каталог" },
  { icon: <BookMarked size={16} />, uz: "Mening kitoblarim", ru: "Мои книги" },
  { icon: <BookOpen size={16} />, uz: "Resurs yuklash", ru: "Загрузка ресурсов" },
  { icon: <CalendarCheck size={16} />, uz: "O'quv zali bron", ru: "Бронь зала" },
  { icon: <Brain size={16} />, uz: "AI kutubxonachi", ru: "ИИ-библиотекарь" },
];

export default function LoginForm() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isDev = process.env.NODE_ENV === "development";

  const DEMO = isDev ? [
    { email: "student@atmu.uz", pw: "Student123!", role: "Talaba" },
    { email: "teacher@atmu.uz", pw: "Teacher123!", role: "O'qituvchi" },
    { email: "librarian@atmu.uz", pw: "Librarian123!", role: "Kutubxonachi" },
    { email: "admin@atmu.uz", pw: "Admin123!", role: "Admin" },
  ] : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await authApi.login(email, password);
      saveTokens(data.access_token, data.refresh_token);
      saveUser(data.user);
      router.push(getDashboardPath(data.user.role, locale));
    } catch {
      setError(
        locale === "uz" ? "Email yoki parol noto'g'ri. Qayta urinib ko'ring."
        : locale === "ru" ? "Неверный email или пароль. Попробуйте ещё раз."
        : "Incorrect email or password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: "linear-gradient(135deg,#001B3D 0%,#002B4A 50%,#003D66 100%)" }}>

      {/* ===== LEFT PANEL — university info ===== */}
      <div className="hidden lg:flex lg:w-[480px] xl:w-[520px] flex-col justify-between p-10 xl:p-12 relative overflow-hidden flex-shrink-0">
        {/* Background dots */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle,white 1px,transparent 1px)", backgroundSize: "24px 24px" }} />

        {/* University brand */}
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3 mb-8 hover:opacity-90 transition-opacity">
            <div className="w-11 h-11 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center">
              <BookOpen size={20} className="text-white" />
            </div>
            <div>
              <div className="text-white font-black text-[13px] uppercase tracking-wide">ATMU</div>
              <div className="text-white/50 text-[9px] font-semibold uppercase tracking-widest">Smart UniLibrary</div>
            </div>
          </Link>

          <div className="mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-6 h-px bg-[#F5B400]" />
              <span className="text-[#F5B400] text-[10px] font-bold uppercase tracking-widest">
                {locale === "uz" ? "Rasmiy portal" : locale === "ru" ? "Официальный портал" : "Official Portal"}
              </span>
            </div>
            <h2 style={{ color: "#fff", fontFamily: "'Georgia',serif", fontSize: "clamp(20px,2vw,28px)", fontWeight: 800, lineHeight: 1.2 }}>
              {locale === "uz" ? "Axborot texnologiyalari va menejment universiteti" : locale === "ru" ? "Университет информационных технологий и менеджмента" : "University of Information Technology and Management"}
            </h2>
            <p className="text-white/45 text-[13px] mt-3">Qarshi, O'zbekiston</p>
          </div>

          {/* E-Lib features */}
          <div className="border border-white/10 rounded-2xl p-5" style={{ background: "rgba(255,255,255,.04)" }}>
            <div className="text-[#F5B400] text-[11px] font-bold uppercase tracking-widest mb-4">E-Lib — Smart UniLibrary</div>
            <div className="space-y-2.5">
              {ELIB_FEATURES.map((f, i) => (
                <div key={i} className="flex items-center gap-3 text-white/60 text-[13px]">
                  <span className="text-[#F5B400]/70">{f.icon}</span>
                  {locale === "ru" ? f.ru : f.uz}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom quote */}
        <div className="relative z-10">
          <p className="text-white/25 text-[11px] leading-relaxed">
            {locale === "uz"
              ? "Universitetda o'quv jarayoni, ilmiy faoliyat va elektron kutubxona xizmatlari yagona raqamli portal orqali boshqariladi."
              : locale === "ru"
              ? "Учебный процесс, научная деятельность и электронные библиотечные услуги управляются через единый цифровой портал."
              : "Academic processes, research and e-library services are managed through a unified digital portal."}
          </p>
        </div>
      </div>

      {/* ===== RIGHT PANEL — login form ===== */}
      <div className="flex-1 flex flex-col items-center justify-center p-5 sm:p-8 relative">
        {/* Back to home */}
        <Link href="/"
          className="absolute top-5 left-5 flex items-center gap-1.5 text-white/50 hover:text-white text-[12px] transition-colors">
          <ChevronLeft size={14} />
          {locale === "uz" ? "Bosh sahifaga" : locale === "ru" ? "На главную" : "Home"}
        </Link>

        <div className="w-full max-w-[420px]">
          {/* Form card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Card header */}
            <div className="px-8 pt-8 pb-5 border-b border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
                  style={{ background: "#0069A8", color: "#fff" }}>
                  {locale === "uz" ? "Kirish" : locale === "ru" ? "Вход" : "Login"}
                </span>
              </div>
              <h1 className="font-black text-[#002B4A] text-[20px] sm:text-[22px] leading-tight">
                {locale === "uz" ? "Universitet portaliga kirish" : locale === "ru" ? "Вход в портал университета" : "University Portal Login"}
              </h1>
              <p className="text-gray-500 text-[12.5px] mt-1.5 leading-relaxed">
                {locale === "uz"
                  ? "Talaba, professor-o'qituvchi va xodimlar shaxsiy kabineti orqali elektron xizmatlardan foydalanishi mumkin."
                  : locale === "ru"
                  ? "Студенты, преподаватели и сотрудники могут пользоваться электронными услугами через личный кабинет."
                  : "Students, faculty and staff can access e-services through their personal cabinet."}
              </p>
            </div>

            <div className="px-8 py-6">
              {error && (
                <div className="flex items-start gap-2 p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-[12.5px] mb-5">
                  <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-[12px] font-bold text-gray-600 mb-2 uppercase tracking-wide">
                    {locale === "uz" ? "Email yoki login" : locale === "ru" ? "Email или логин" : "Email or login"}
                  </label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      placeholder="email@atmu.uz"
                      className="w-full pl-11 pr-4 rounded-xl border border-gray-200 text-[13.5px] text-gray-800 focus:outline-none focus:border-[#0069A8] focus:ring-2 focus:ring-[#0069A8]/15 transition-all"
                      style={{ height: "48px" }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-[12px] font-bold text-gray-600 uppercase tracking-wide">
                      {locale === "uz" ? "Parol" : locale === "ru" ? "Пароль" : "Password"}
                    </label>
                    <Link href="/" className="text-[11px] text-[#0069A8] hover:underline">
                      {locale === "uz" ? "Parolni unutdingizmi?" : locale === "ru" ? "Забыли пароль?" : "Forgot password?"}
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPw ? "text" : "password"}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      className="w-full pl-11 pr-11 rounded-xl border border-gray-200 text-[13.5px] text-gray-800 focus:outline-none focus:border-[#0069A8] focus:ring-2 focus:ring-[#0069A8]/15 transition-all"
                      style={{ height: "48px" }}
                    />
                    <button type="button" onClick={() => setShowPw(!showPw)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full font-bold text-[14px] text-white rounded-xl transition-all hover:opacity-90 disabled:opacity-60"
                  style={{ height: "48px", background: "linear-gradient(135deg,#0069A8,#003D66)" }}
                >
                  {loading
                    ? (locale === "uz" ? "Kirish..." : locale === "ru" ? "Вход..." : "Logging in...")
                    : (locale === "uz" ? "Kirish" : locale === "ru" ? "Войти" : "Login")}
                </button>
              </form>

              <p className="text-center text-[12.5px] text-gray-500 mt-5">
                {locale === "uz" ? "Hisobingiz yo'qmi?" : locale === "ru" ? "Нет аккаунта?" : "No account?"}{" "}
                <Link href="/auth/register" className="text-[#0069A8] font-bold hover:underline">
                  {locale === "uz" ? "Ro'yxatdan o'ting" : locale === "ru" ? "Зарегистрируйтесь" : "Register"}
                </Link>
              </p>

              {/* Demo accounts — DEVELOPMENT ONLY */}
              {isDev && (
                <div className="mt-5 p-4 bg-amber-50 border border-amber-200 rounded-2xl">
                  <div className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-3">
                    Dev only — Demo hisoblar
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {DEMO.map(acc => (
                      <button key={acc.email}
                        onClick={() => { setEmail(acc.email); setPassword(acc.pw); }}
                        className="text-left px-3 py-2 bg-white border border-amber-200 rounded-xl text-[11px] hover:border-amber-400 transition-colors">
                        <div className="font-semibold text-gray-700">{acc.role}</div>
                        <div className="text-gray-400 truncate text-[10px]">{acc.email}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer note */}
          <p className="text-center text-white/25 text-[11px] mt-5">
            © {new Date().getFullYear()} ATMU · Qarshi, O'zbekiston
          </p>
        </div>
      </div>
    </div>
  );
}
