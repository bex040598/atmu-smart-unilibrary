"use client";
import { useState } from "react";
import { useLocale } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { authApi } from "@/lib/api";
import { saveTokens, saveUser, getDashboardPath } from "@/lib/auth";
import {
  ChevronLeft, ChevronRight, Check,
  UserCircle, BookOpen, GraduationCap, Lock, Library, Sparkles,
  Mail, Eye, EyeOff, AlertCircle, User, Phone, Building2
} from "lucide-react";

type Locale = "uz" | "ru" | "en";

const STEPS = [
  { icon: UserCircle, key: "role", uz: "Rol tanlash", ru: "Роль" },
  { icon: User, key: "personal", uz: "Shaxsiy", ru: "Личные данные" },
  { icon: GraduationCap, key: "academic", uz: "Akademik", ru: "Академические" },
  { icon: Lock, key: "security", uz: "Xavfsizlik", ru: "Безопасность" },
  { icon: Library, key: "elib", uz: "E-Lib", ru: "Э-Биб" },
  { icon: Sparkles, key: "finish", uz: "Yakunlash", ru: "Завершение" },
];

const ROLES = [
  { val: "student", uz: "Talaba", ru: "Студент", icon: GraduationCap, desc_uz: "Bakalavr, magistr yoki doktorantura talabasi", desc_ru: "Студент бакалавриата, магистратуры или докторантуры" },
  { val: "teacher", uz: "O'qituvchi", ru: "Преподаватель", icon: BookOpen, desc_uz: "Professor-o'qituvchi yoki tadqiqotchi", desc_ru: "Преподаватель или исследователь" },
];

const FACULTIES = [
  "Axborot texnologiyalari fakulteti",
  "Iqtisodiyot va menejment fakulteti",
  "Pedagogika fakulteti",
  "Tarix va ijtimoiy fanlar fakulteti",
];
const DEPARTMENTS: Record<string, string[]> = {
  "Axborot texnologiyalari fakulteti": ["Axborot texnologiyalari kafedrasi", "Dasturlash kafedrasi", "Kiberxavfsizlik kafedrasi"],
  "Iqtisodiyot va menejment fakulteti": ["Iqtisodiyot kafedrasi", "Menejment kafedrasi", "Moliya kafedrasi"],
  "Pedagogika fakulteti": ["Pedagogika kafedrasi", "Psixologiya kafedrasi"],
  "Tarix va ijtimoiy fanlar fakulteti": ["Tarix kafedrasi", "Filologiya kafedrasi"],
};

const ELIB_SERVICES = [
  { key: "catalog", uz: "Elektron katalog", ru: "Электронный каталог" },
  { key: "reading_room", uz: "O'quv zali bron", ru: "Бронь читального зала" },
  { key: "ai_assistant", uz: "AI kutubxonachi", ru: "ИИ-библиотекарь" },
  { key: "notifications", uz: "Bildirishnomalar", ru: "Уведомления" },
];

interface FormData {
  role: string;
  full_name: string;
  email: string;
  phone: string;
  faculty: string;
  department: string;
  course: string;
  group: string;
  student_id: string;
  password: string;
  confirm_password: string;
  elib_services: string[];
  agree_terms: boolean;
}

const INIT: FormData = {
  role: "",
  full_name: "", email: "", phone: "",
  faculty: "", department: "", course: "", group: "", student_id: "",
  password: "", confirm_password: "",
  elib_services: ["catalog", "notifications"],
  agree_terms: false,
};

export default function RegisterForm() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(INIT);
  const [showPw, setShowPw] = useState(false);
  const [showCpw, setShowCpw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k: keyof FormData, v: any) => setForm(f => ({ ...f, [k]: v }));

  const toggleService = (key: string) => {
    setForm(f => ({
      ...f,
      elib_services: f.elib_services.includes(key)
        ? f.elib_services.filter(s => s !== key)
        : [...f.elib_services, key],
    }));
  };

  const canNext = (): boolean => {
    if (step === 0) return !!form.role;
    if (step === 1) return !!form.full_name && !!form.email;
    if (step === 2) return !!form.faculty;
    if (step === 3) return form.password.length >= 6 && form.password === form.confirm_password;
    return true;
  };

  const handleNext = () => {
    setError("");
    if (!canNext()) {
      setError(locale === "uz" ? "Iltimos, majburiy maydonlarni to'ldiring." : "Пожалуйста, заполните обязательные поля.");
      return;
    }
    if (step < STEPS.length - 1) { setStep(s => s + 1); return; }
    handleSubmit();
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await authApi.register({
        email: form.email,
        password: form.password,
        full_name: form.full_name,
        role: form.role,
        phone: form.phone,
        faculty: form.faculty,
        department: form.department,
      });
      saveTokens(data.access_token, data.refresh_token);
      saveUser(data.user);
      router.push(getDashboardPath(data.user.role, locale));
    } catch (e: any) {
      setError(e?.response?.data?.detail || (locale === "uz" ? "Ro'yxatdan o'tishda xato yuz berdi." : "Ошибка при регистрации."));
      setStep(1);
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full rounded-xl border border-gray-200 text-[13.5px] text-gray-800 focus:outline-none focus:border-[#0069A8] focus:ring-2 focus:ring-[#0069A8]/15 transition-all px-4";
  const labelCls = "block text-[11.5px] font-bold text-gray-500 mb-1.5 uppercase tracking-wide";

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8"
      style={{ background: "linear-gradient(135deg,#001B3D 0%,#002B4A 60%,#003D66 100%)" }}>

      <div className="w-full max-w-[520px]">
        <Link href="/auth/login"
          className="flex items-center gap-1.5 text-white/45 hover:text-white text-[12px] mb-6 transition-colors">
          <ChevronLeft size={14} />
          {locale === "uz" ? "Kirish sahifasiga qaytish" : "Вернуться к входу"}
        </Link>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="px-8 pt-7 pb-5 border-b border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white"
                style={{ background: "#0069A8" }}>
                {locale === "uz" ? "Ro'yxatdan o'tish" : "Регистрация"}
              </span>
            </div>
            <h1 className="font-black text-[#002B4A] text-[18px] sm:text-[20px]">
              {locale === "uz" ? "Yangi hisob yaratish" : "Создание нового аккаунта"}
            </h1>

            {/* Step indicator */}
            <div className="flex items-center gap-1.5 mt-5">
              {STEPS.map((s, i) => (
                <div key={s.key} className="flex items-center">
                  <button
                    onClick={() => i < step && setStep(i)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${i < step ? "cursor-pointer" : "cursor-default"}`}
                    style={{
                      background: i === step ? "#0069A8" : i < step ? "#d1fae5" : "#f3f4f6",
                      color: i === step ? "#fff" : i < step ? "#166534" : "#9ca3af",
                    }}>
                    {i < step ? <Check size={13} /> : i + 1}
                  </button>
                  {i < STEPS.length - 1 && (
                    <div className={`h-px mx-1 ${i < step ? "bg-green-300" : "bg-gray-200"}`} style={{ width: "20px" }} />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-2 text-[11px] text-gray-400">
              {locale === "uz" ? `${step + 1}-qadam: ` : `Шаг ${step + 1}: `}
              <span className="font-semibold text-gray-600">{STEPS[step].uz}</span>
            </div>
          </div>

          <div className="px-8 py-6">
            {error && (
              <div className="flex items-start gap-2 p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-[12.5px] mb-5">
                <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
                {error}
              </div>
            )}

            {/* Step 0: Role */}
            {step === 0 && (
              <div className="space-y-3">
                <p className="text-gray-500 text-[13px] mb-4">
                  {locale === "uz" ? "Universitetdagi rolingizni tanlang." : "Выберите вашу роль в университете."}
                </p>
                {ROLES.map(r => (
                  <button key={r.val} onClick={() => set("role", r.val)}
                    className={`w-full flex items-start gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                      form.role === r.val ? "border-[#0069A8] bg-blue-50" : "border-gray-200 hover:border-gray-300"
                    }`}>
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${form.role === r.val ? "bg-[#0069A8]" : "bg-gray-100"}`}>
                      <r.icon size={20} className={form.role === r.val ? "text-white" : "text-gray-400"} />
                    </div>
                    <div className="flex-1">
                      <div className={`font-bold text-[14px] ${form.role === r.val ? "text-[#0069A8]" : "text-[#102033]"}`}>
                        {locale === "ru" ? r.ru : r.uz}
                      </div>
                      <div className="text-gray-400 text-[12px] mt-0.5">
                        {locale === "ru" ? r.desc_ru : r.desc_uz}
                      </div>
                    </div>
                    {form.role === r.val && (
                      <div className="w-5 h-5 rounded-full bg-[#0069A8] flex items-center justify-center flex-shrink-0">
                        <Check size={11} className="text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Step 1: Personal */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className={labelCls}>{locale === "uz" ? "To'liq ism *" : "ФИО *"}</label>
                  <div className="relative">
                    <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" value={form.full_name} onChange={e => set("full_name", e.target.value)}
                      placeholder={locale === "uz" ? "Familiya Ism Otasining ismi" : "Фамилия Имя Отчество"}
                      className={`${inputCls} pl-11`} style={{ height: "48px" }} />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Email *</label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="email" value={form.email} onChange={e => set("email", e.target.value)}
                      placeholder="email@atmu.uz"
                      className={`${inputCls} pl-11`} style={{ height: "48px" }} />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>{locale === "uz" ? "Telefon raqami" : "Номер телефона"}</label>
                  <div className="relative">
                    <Phone size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="tel" value={form.phone} onChange={e => set("phone", e.target.value)}
                      placeholder="+998 90 000 00 00"
                      className={`${inputCls} pl-11`} style={{ height: "48px" }} />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Academic */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className={labelCls}>{locale === "uz" ? "Fakultet *" : "Факультет *"}</label>
                  <div className="relative">
                    <Building2 size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <select value={form.faculty} onChange={e => { set("faculty", e.target.value); set("department", ""); }}
                      className={`${inputCls} pl-11 bg-white appearance-none`} style={{ height: "48px" }}>
                      <option value="">{locale === "uz" ? "Fakultetni tanlang" : "Выберите факультет"}</option>
                      {FACULTIES.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                  </div>
                </div>
                {form.faculty && (
                  <div>
                    <label className={labelCls}>{locale === "uz" ? "Kafedra" : "Кафедра"}</label>
                    <select value={form.department} onChange={e => set("department", e.target.value)}
                      className={`${inputCls} bg-white appearance-none`} style={{ height: "48px" }}>
                      <option value="">{locale === "uz" ? "Kafedreni tanlang" : "Выберите кафедру"}</option>
                      {(DEPARTMENTS[form.faculty] || []).map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                )}
                {form.role === "student" && (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={labelCls}>{locale === "uz" ? "Kurs" : "Курс"}</label>
                        <select value={form.course} onChange={e => set("course", e.target.value)}
                          className={`${inputCls} bg-white appearance-none`} style={{ height: "48px" }}>
                          <option value="">—</option>
                          {["1", "2", "3", "4"].map(c => <option key={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className={labelCls}>{locale === "uz" ? "Guruh" : "Группа"}</label>
                        <input type="text" value={form.group} onChange={e => set("group", e.target.value)}
                          placeholder="AT-21" className={inputCls} style={{ height: "48px" }} />
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>{locale === "uz" ? "Talaba ID (ixtiyoriy)" : "ID студента (необязательно)"}</label>
                      <input type="text" value={form.student_id} onChange={e => set("student_id", e.target.value)}
                        placeholder="2021-ATMU-0001" className={inputCls} style={{ height: "48px" }} />
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Step 3: Security */}
            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <label className={labelCls}>{locale === "uz" ? "Parol * (kamida 6 ta belgi)" : "Пароль * (минимум 6 символов)"}</label>
                  <div className="relative">
                    <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type={showPw ? "text" : "password"} value={form.password} onChange={e => set("password", e.target.value)}
                      placeholder="••••••••" className={`${inputCls} pl-11 pr-11`} style={{ height: "48px" }} />
                    <button type="button" onClick={() => setShowPw(!showPw)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                  {form.password && (
                    <div className="mt-2 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full rounded-full transition-all"
                        style={{
                          width: form.password.length < 6 ? "20%" : form.password.length < 10 ? "55%" : "100%",
                          background: form.password.length < 6 ? "#ef4444" : form.password.length < 10 ? "#f59e0b" : "#22c55e",
                        }} />
                    </div>
                  )}
                </div>
                <div>
                  <label className={labelCls}>{locale === "uz" ? "Parolni tasdiqlang *" : "Подтвердите пароль *"}</label>
                  <div className="relative">
                    <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type={showCpw ? "text" : "password"} value={form.confirm_password} onChange={e => set("confirm_password", e.target.value)}
                      placeholder="••••••••" className={`${inputCls} pl-11 pr-11`} style={{ height: "48px" }} />
                    <button type="button" onClick={() => setShowCpw(!showCpw)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showCpw ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                  {form.confirm_password && form.password !== form.confirm_password && (
                    <p className="text-red-500 text-[11.5px] mt-1.5">
                      {locale === "uz" ? "Parollar mos kelmaydi." : "Пароли не совпадают."}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Step 4: E-Lib */}
            {step === 4 && (
              <div>
                <p className="text-gray-500 text-[13px] mb-4">
                  {locale === "uz" ? "Foydalanmoqchi bo'lgan xizmatlarni tanlang (keyinchalik o'zgartirishingiz mumkin)." : "Выберите услуги (можно изменить позже)."}
                </p>
                <div className="space-y-2.5">
                  {ELIB_SERVICES.map(s => (
                    <button key={s.key} onClick={() => toggleService(s.key)}
                      className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                        form.elib_services.includes(s.key) ? "border-[#0069A8] bg-blue-50" : "border-gray-200 hover:border-gray-300"
                      }`}>
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 ${
                        form.elib_services.includes(s.key) ? "border-[#0069A8] bg-[#0069A8]" : "border-gray-300"
                      }`}>
                        {form.elib_services.includes(s.key) && <Check size={11} className="text-white" />}
                      </div>
                      <span className={`text-[13.5px] font-medium ${form.elib_services.includes(s.key) ? "text-[#0069A8]" : "text-gray-700"}`}>
                        {locale === "ru" ? s.ru : s.uz}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Finish */}
            {step === 5 && (
              <div>
                <div className="flex flex-col items-center text-center py-2 mb-6">
                  <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                    <Sparkles size={28} className="text-[#0069A8]" />
                  </div>
                  <h3 className="font-black text-[#002B4A] text-[18px] mb-2">
                    {locale === "uz" ? "Deyarli tayyor!" : "Почти готово!"}
                  </h3>
                  <p className="text-gray-400 text-[12.5px]">
                    {locale === "uz" ? "Ma'lumotlarni tekshirib, ro'yxatdan o'tishni yakunlang." : "Проверьте данные и завершите регистрацию."}
                  </p>
                </div>

                <div className="space-y-2.5 text-[12.5px] mb-5">
                  {[
                    { label: locale === "uz" ? "Rol" : "Роль", val: form.role === "student" ? "Talaba" : "O'qituvchi" },
                    { label: locale === "uz" ? "Ism" : "Имя", val: form.full_name },
                    { label: "Email", val: form.email },
                    { label: locale === "uz" ? "Fakultet" : "Факультет", val: form.faculty },
                    { label: locale === "uz" ? "Xizmatlar" : "Услуги", val: `${form.elib_services.length} ta` },
                  ].filter(r => r.val).map(r => (
                    <div key={r.label} className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-400">{r.label}</span>
                      <span className="font-semibold text-gray-700 text-right">{r.val}</span>
                    </div>
                  ))}
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <div
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      form.agree_terms ? "border-[#0069A8] bg-[#0069A8]" : "border-gray-300"
                    }`}
                    onClick={() => set("agree_terms", !form.agree_terms)}>
                    {form.agree_terms && <Check size={11} className="text-white" />}
                  </div>
                  <span className="text-[12.5px] text-gray-500 leading-snug">
                    {locale === "uz"
                      ? "ATMU foydalanish shartlari va maxfiylik siyosatiga roziman."
                      : "Я согласен с условиями использования и политикой конфиденциальности ATMU."}
                  </span>
                </label>
              </div>
            )}

            {/* Nav buttons */}
            <div className={`flex mt-7 gap-3 ${step > 0 ? "justify-between" : "justify-end"}`}>
              {step > 0 && (
                <button onClick={() => setStep(s => s - 1)}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-[13px] font-semibold hover:bg-gray-50 transition-colors">
                  <ChevronLeft size={15} />
                  {locale === "uz" ? "Orqaga" : "Назад"}
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={loading || (step === 5 && !form.agree_terms)}
                className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl font-bold text-[13px] text-white transition-all hover:opacity-90 disabled:opacity-50"
                style={{ background: "#0069A8", minWidth: "130px", justifyContent: "center" }}>
                {loading
                  ? (locale === "uz" ? "Yuklanmoqda..." : "Загрузка...")
                  : step === 5
                  ? (locale === "uz" ? "Yakunlash" : "Завершить")
                  : (locale === "uz" ? "Davom etish" : "Продолжить")}
                {!loading && step < 5 && <ChevronRight size={15} />}
                {!loading && step === 5 && <Check size={15} />}
              </button>
            </div>

            <p className="text-center text-[12px] text-gray-400 mt-4">
              {locale === "uz" ? "Hisobingiz bormi?" : "Уже есть аккаунт?"}{" "}
              <Link href="/auth/login" className="text-[#0069A8] font-bold hover:underline">
                {locale === "uz" ? "Kirish" : "Войти"}
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-white/25 text-[11px] mt-4">
          © {new Date().getFullYear()} ATMU · Qarshi, O'zbekiston
        </p>
      </div>
    </div>
  );
}
